import { CHAPTERS } from "./constants";
import { meetsCondition } from "./condition";
import { seededUnit } from "./random";
import type {
  ChapterNumber,
  Effect,
  EventChoice,
  GameState,
  EndingDefinition,
  MetaProgress,
  StoryEvent,
  TrendKey
} from "./types";

const bounded = (value: number, minimum: number, maximum: number): number =>
  Math.max(minimum, Math.min(maximum, value));

const mergeNumbers = <T extends Record<string, number>>(
  current: T,
  delta: Partial<T>,
  minimum: number,
  maximum: number
): T => {
  const next = { ...current };
  for (const [key, amount] of Object.entries(delta)) {
    if (typeof amount !== "number") continue;
    const typedKey = key as keyof T;
    const currentValue = current[typedKey] ?? 0;
    next[typedKey] = bounded(currentValue + amount, minimum, maximum) as T[keyof T];
  }
  return next;
};

const unique = <T,>(values: T[]): T[] => [...new Set(values)];

const isReplayInterlude = (event: StoryEvent): boolean =>
  event.tags?.includes("replay") ?? false;

const shouldShowReplayInterlude = (
  state: GameState,
  meta: MetaProgress,
  candidates: StoryEvent[]
): boolean => {
  if (candidates.length === 0) return false;
  const hasUnseen = candidates.some((event) => !meta.seenEvents.includes(event.id));
  // New scenes arrive over several runs instead of all thirty appearing at once.
  // Already-viewed memories can return, but much more rarely.
  const chance = hasUnseen ? 0.42 : 0.08;
  return seededUnit(
    state.seed,
    `replay:${meta.completedRuns}:${state.chapter}:${state.slot}`
  ) < chance;
};

export const pickWorldTrends = (seed: number): TrendKey[] => {
  const trends: TrendKey[] = [
    "gaming",
    "family",
    "musicGlobal",
    "controversy",
    "brandDeals",
    "shortVideo",
    "challenge"
  ];
  return [...trends]
    .sort(
      (left, right) =>
        seededUnit(seed, `trend-${left}`) - seededUnit(seed, `trend-${right}`)
    )
    .slice(0, 2);
};

export const initializeRun = (state: GameState): GameState => ({
  ...state,
  worldTrends: pickWorldTrends(state.seed)
});

export const getVisibleChoices = (
  event: StoryEvent,
  state: GameState,
  meta: MetaProgress
): EventChoice[] => event.choices.filter((item) => meetsCondition(item.when, state, meta));

const weightedPick = (
  candidates: StoryEvent[],
  state: GameState,
  meta: MetaProgress
): StoryEvent => {
  const previouslySeen = new Set(meta.seenEvents);
  const scored = candidates.map((candidate) => ({
    candidate,
    priority: candidate.priority ?? 0
  }));
  const highestPriority = Math.max(...scored.map(({ priority }) => priority));
  const top = scored
    .filter(({ priority }) => priority === highestPriority)
    .map(({ candidate }) => candidate);

  const entries = top.map((candidate) => ({
    candidate,
    // A new play favours scenes absent from the persistent viewing history.
    weight: Math.max(1, candidate.weight ?? 10) * (previouslySeen.has(candidate.id) ? 1 : 4)
  }));
  const total = entries.reduce((sum, entry) => sum + entry.weight, 0);
  let cursor =
    seededUnit(state.seed, `${state.chapter}:${state.slot}:${state.history.length}`) * total;

  for (const entry of entries) {
    cursor -= entry.weight;
    if (cursor <= 0) return entry.candidate;
  }
  return entries.at(-1)?.candidate ?? candidates[0]!;
};

export const selectEvent = (
  allEvents: StoryEvent[],
  state: GameState,
  meta: MetaProgress
): StoryEvent => {
  if (state.queuedEvent) {
    const queued = allEvents.find(
      (item) => item.id === state.queuedEvent && meetsCondition(item.when, state, meta)
    );
    if (queued) return queued;
  }

  const eligible = allEvents.filter(
    (item) =>
      item.chapter === state.chapter &&
      item.slot === state.slot &&
      meetsCondition(item.when, state, meta) &&
      (!item.oncePerRun || !state.seenThisRun.includes(item.id))
  );

  if (eligible.length === 0) {
    throw new Error(`第${state.chapter}章 slot ${state.slot} に有効なイベントがありません。`);
  }

  const replayInterludes = eligible.filter(isReplayInterlude);
  if (shouldShowReplayInterlude(state, meta, replayInterludes)) {
    const unseen = replayInterludes.filter((item) => !meta.seenEvents.includes(item.id));
    return weightedPick(unseen.length > 0 ? unseen : replayInterludes, state, meta);
  }

  const storyEvents = eligible.filter((item) => !isReplayInterlude(item));
  if (storyEvents.length === 0) {
    throw new Error(
      `第${state.chapter}章 slot ${state.slot} に本編イベントがありません。`
    );
  }
  const mandatory = storyEvents.filter((item) => item.mandatory);
  return weightedPick(mandatory.length > 0 ? mandatory : storyEvents, state, meta);
};

const applyEffect = (state: GameState, effect: Effect): GameState => {
  const nextStats = mergeNumbers(state.stats, effect.stats ?? {}, -10_000_000, 100_000_000);

  if (effect.setStats) {
    Object.assign(nextStats, effect.setStats);
  }

  nextStats.subscribers = Math.max(0, nextStats.subscribers);
  nextStats.money = Math.max(-10_000_000, nextStats.money);
  nextStats.energy = bounded(nextStats.energy, 0, 100);
  nextStats.expression = bounded(nextStats.expression, 0, 100);
  nextStats.production = bounded(nextStats.production, 0, 100);
  nextStats.beatbox = bounded(nextStats.beatbox, 0, 100);
  nextStats.trust = bounded(nextStats.trust, 0, 100);

  return {
    ...state,
    stats: nextStats,
    hidden: mergeNumbers(state.hidden, effect.hidden ?? {}, 0, 100),
    routes: mergeNumbers(state.routes, effect.routes ?? {}, 0, 100),
    relationships: mergeNumbers(state.relationships, effect.relationships ?? {}, -100, 100),
    flags: unique([
      ...state.flags.filter((flag) => !(effect.removeFlags ?? []).includes(flag)),
      ...(effect.addFlags ?? [])
    ]),
    queuedEvent: effect.queueEvent,
    videos: effect.video ? [...state.videos, effect.video] : state.videos
  };
};

export interface ChoiceResolution {
  state: GameState;
  before: GameState;
}

export const resolveChoice = (
  state: GameState,
  event: StoryEvent,
  selected: EventChoice
): ChoiceResolution => {
  const before = structuredClone(state);
  const effected = applyEffect(state, selected.effect);
  const isExtraEvent = state.queuedEvent === event.id || isReplayInterlude(event);
  const nextSlot = isExtraEvent ? state.slot : state.slot + 1;

  return {
    before,
    state: {
      ...effected,
      slot: nextSlot,
      queuedEvent: selected.effect.queueEvent,
      seenThisRun: unique([...effected.seenThisRun, event.id]),
      history: [
        ...effected.history,
        {
          eventId: event.id,
          choiceId: selected.id,
          chapter: state.chapter,
          slot: state.slot
        }
      ]
    }
  };
};

export const isChapterComplete = (state: GameState): boolean => {
  const definition = CHAPTERS.find((chapter) => chapter.number === state.chapter);
  return Boolean(definition && state.slot >= definition.slots && !state.queuedEvent);
};

export const advanceChapter = (state: GameState): GameState => {
  if (state.chapter === 5) return { ...state, finished: true };

  return {
    ...state,
    chapter: (state.chapter + 1) as ChapterNumber,
    slot: 0,
    queuedEvent: undefined,
    stats: {
      ...state.stats,
      energy: bounded(state.stats.energy + 25, 0, 100)
    },
    hidden: {
      ...state.hidden,
      fatigue: bounded(state.hidden.fatigue - 8, 0, 100)
    }
  };
};

export const updateMetaAfterRun = (
  meta: MetaProgress,
  state: GameState
): MetaProgress => ({
  ...meta,
  completedRuns: meta.completedRuns + 1,
  seenEvents: unique([...meta.seenEvents, ...state.seenThisRun]),
  unlockedEndings: state.endingId
    ? unique([...meta.unlockedEndings, state.endingId])
    : meta.unlockedEndings,
  unlockedVideos: unique([
    ...meta.unlockedVideos,
    ...state.videos.map((video) => video.title)
  ]),
  bestSubscribers: Math.max(meta.bestSubscribers, state.stats.subscribers),
  fourEmperorsUnlocked:
    meta.fourEmperorsUnlocked || state.flags.includes("four_emperors_achieved")
});

export const selectEnding = (
  definitions: EndingDefinition[],
  state: GameState,
  meta: MetaProgress
): EndingDefinition => {
  const ending = [...definitions]
    .sort((left, right) => right.priority - left.priority)
    .find((definition) => meetsCondition(definition.when, state, meta));

  if (!ending) throw new Error("到達可能なエンディングが定義されていません。");
  return ending;
};
