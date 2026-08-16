import { createInitialGameState, createInitialMeta } from "./constants";
import {
  advanceChapter,
  getVisibleChoices,
  initializeRun,
  isChapterComplete,
  resolveChoice,
  selectEnding,
  selectEvent
} from "./engine";
import { seededUnit } from "./random";
import type {
  EndingDefinition,
  EventChoice,
  GameState,
  MetaProgress,
  StoryEvent
} from "./types";

export type SimulationStrategy =
  | "random"
  | "numberOne"
  | "craft"
  | "mastermind"
  | "controversy"
  | "collapse";

const flagScore = (choice: EventChoice, terms: string[]): number =>
  (choice.effect.addFlags ?? []).reduce(
    (score, flag) => score + (terms.some((term) => flag.includes(term)) ? 28 : 0),
    0
  );

const scoreChoice = (
  choice: EventChoice,
  strategy: SimulationStrategy,
  state: GameState,
  salt: string
): number => {
  const stats = choice.effect.stats ?? {};
  const hidden = choice.effect.hidden ?? {};
  const routes = choice.effect.routes ?? {};
  const relationships = choice.effect.relationships ?? {};
  const noise = seededUnit(state.seed, `${salt}:${choice.id}`) * 3;

  if (strategy === "random") return seededUnit(state.seed, `${salt}:random:${choice.id}`) * 100;

  if (strategy === "numberOne") {
    return (
      (stats.subscribers ?? 0) / Math.max(1, 50_000 * state.chapter) +
      (stats.trust ?? 0) * 2.2 +
      (stats.expression ?? 0) * 2 +
      (stats.production ?? 0) * 2 +
      (stats.beatbox ?? 0) +
      (routes.mainstream ?? 0) * 3 +
      (routes.network ?? 0) * 2.5 +
      (relationships.hajime ?? 0) * 1.5 +
      (relationships.tetsu ?? 0) +
      (relationships.shiruko ?? 0) +
      flagScore(choice, ["number_one", "four_emperors", "safe", "trust", "hajime_friend"]) +
      noise
    );
  }

  if (strategy === "craft") {
    return (
      (stats.production ?? 0) * 3 +
      (stats.beatbox ?? 0) * 3 +
      (hidden.origin ?? 0) * 3 +
      (routes.craft ?? 0) * 4 +
      (stats.trust ?? 0) +
      flagScore(choice, ["legend", "origin", "masterpiece", "craft"]) +
      noise
    );
  }

  if (strategy === "mastermind") {
    return (
      (stats.production ?? 0) * 4 +
      (routes.strategy ?? 0) * 3 +
      (routes.network ?? 0) * 2 +
      (relationships.manager ?? 0) * 2 +
      (stats.expression ?? 0) * -0.5 +
      flagScore(choice, ["mastermind", "producer", "behind", "mentor"]) +
      noise
    );
  }

  if (strategy === "controversy") {
    return (
      (stats.subscribers ?? 0) / Math.max(1, 35_000 * state.chapter) +
      (stats.trust ?? 0) * -2.5 +
      (hidden.controversy ?? 0) * 4 +
      (routes.controversy ?? 0) * 5 +
      (relationships.shibata ?? 0) * 2 +
      flagScore(choice, ["controversy", "shibata", "fabricat", "expose", "flame"]) +
      noise
    );
  }

  return (
    (stats.subscribers ?? 0) * -0.0002 +
    (stats.money ?? 0) * -0.00005 +
    (stats.energy ?? 0) * -2 +
    (stats.trust ?? 0) * -1.5 +
    (hidden.fatigue ?? 0) * 5 +
    (hidden.origin ?? 0) * -5 +
    (hidden.ambition ?? 0) * -4 +
    (hidden.controversy ?? 0) * -6 +
    (stats.production ?? 0) * -7 +
    (stats.beatbox ?? 0) * -5 +
    (stats.expression ?? 0) * -4 +
    (routes.craft ?? 0) * -18 +
    (routes.mainstream ?? 0) * -9 +
    (routes.strategy ?? 0) * -9 +
    (routes.network ?? 0) * -7 +
    (routes.controversy ?? 0) * -10 +
    (routes.stability ?? 0) * 12 +
    (relationships.supermarket ?? 0) * 5 +
    flagScore(choice, [
      "quit",
      "collapse",
      "street",
      "supermarket",
      "return",
      "stop",
      "rest",
      "stability",
      "housing",
      "income"
    ]) +
    flagScore(choice, [
      "legend",
      "lifework",
      "mastermind",
      "producer",
      "number_one",
      "controversy_king",
      "flame"
    ]) * -4 +
    noise
  );
};

export interface SimulationResult {
  state: GameState;
  ending: EndingDefinition;
  eventIds: string[];
}

export const simulateRun = (
  events: StoryEvent[],
  endings: EndingDefinition[],
  strategy: SimulationStrategy,
  seed: number,
  meta: MetaProgress = createInitialMeta()
): SimulationResult => {
  let state = initializeRun(createInitialGameState(seed));
  const eventIds: string[] = [];
  let safety = 0;

  while (!state.finished && safety < 200) {
    safety += 1;
    if (isChapterComplete(state)) {
      if (state.chapter === 5) break;
      state = advanceChapter(state);
      continue;
    }

    const event = selectEvent(events, state, meta);
    eventIds.push(event.id);
    const choices = getVisibleChoices(event, state, meta);
    if (choices.length === 0) {
      throw new Error(`${event.id} に選択可能な選択肢がありません。`);
    }
    const selected = [...choices].sort(
      (left, right) =>
        scoreChoice(right, strategy, state, event.id) -
        scoreChoice(left, strategy, state, event.id)
    )[0]!;
    state = resolveChoice(state, event, selected).state;
  }

  if (safety >= 200) throw new Error("シミュレーションが200イベントを超えました。queue循環の可能性があります。");
  const ending = selectEnding(endings, state, meta);
  state = { ...state, finished: true, endingId: ending.id };
  return { state, ending, eventIds };
};
