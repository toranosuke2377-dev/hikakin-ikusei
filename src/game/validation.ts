import { CHAPTERS, createInitialGameState } from "./constants";
import type { EndingDefinition, StoryEvent } from "./types";

export interface ValidationIssue {
  severity: "error" | "warning";
  location: string;
  message: string;
}

const hasNoCondition = (event: StoryEvent): boolean =>
  !event.when || Object.keys(event.when).length === 0;

export const validateContent = (
  events: StoryEvent[],
  endings: EndingDefinition[]
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const eventIds = new Set<string>();
  const queueTargets: { source: string; target: string }[] = [];

  for (const event of events) {
    if (eventIds.has(event.id)) {
      issues.push({ severity: "error", location: event.id, message: "イベントIDが重複しています。" });
    }
    eventIds.add(event.id);

    if (event.body.length === 0 || event.body.join("").length < 18) {
      issues.push({ severity: "warning", location: event.id, message: "本文が短すぎます。" });
    }
    if (!event.visual.background) {
      issues.push({ severity: "error", location: event.id, message: "背景素材キーがありません。" });
    }
    if (event.choices.length < 2) {
      issues.push({ severity: "error", location: event.id, message: "選択肢が2個未満です。" });
    }

    const choiceIds = new Set<string>();
    for (const choice of event.choices) {
      if (choiceIds.has(choice.id)) {
        issues.push({
          severity: "error",
          location: `${event.id}/${choice.id}`,
          message: "同じイベント内で選択肢IDが重複しています。"
        });
      }
      choiceIds.add(choice.id);
      if (choice.result.length === 0 || choice.result.join("").length < 8) {
        issues.push({
          severity: "warning",
          location: `${event.id}/${choice.id}`,
          message: "選択結果の文章が短すぎます。"
        });
      }
      if (choice.effect.queueEvent) {
        queueTargets.push({ source: `${event.id}/${choice.id}`, target: choice.effect.queueEvent });
      }
    }
  }

  for (const target of queueTargets) {
    if (!eventIds.has(target.target)) {
      issues.push({
        severity: "error",
        location: target.source,
        message: `queue先 ${target.target} が存在しません。`
      });
    }
  }

  for (const chapter of CHAPTERS) {
    for (let slot = 0; slot < chapter.slots; slot += 1) {
      const candidates = events.filter(
        (event) => event.chapter === chapter.number && event.slot === slot
      );
      if (candidates.length === 0) {
        issues.push({
          severity: "error",
          location: `chapter${chapter.number}/slot${slot}`,
          message: "イベント候補がありません。"
        });
      } else if (!candidates.some(hasNoCondition)) {
        issues.push({
          severity: "error",
          location: `chapter${chapter.number}/slot${slot}`,
          message: "条件なしのfallbackイベントがありません。"
        });
      }
    }
  }

  const expectedEndingIds = new Set([
    "number_one",
    "legendary_video",
    "mastermind",
    "street_beatboxer",
    "controversy_king"
  ]);
  const endingIds = new Set(endings.map((ending) => ending.id));
  for (const expected of expectedEndingIds) {
    if (!endingIds.has(expected as EndingDefinition["id"])) {
      issues.push({ severity: "error", location: "endings", message: `${expected} がありません。` });
    }
  }
  if (endings.length !== expectedEndingIds.size) {
    issues.push({ severity: "error", location: "endings", message: "エンディングは5種類に限定します。" });
  }
  if (!endings.some((ending) => !ending.when)) {
    issues.push({ severity: "error", location: "endings", message: "fallbackエンディングがありません。" });
  }

  const initial = createInitialGameState(1);
  const knownFlags = new Set(initial.flags);
  for (const event of events) {
    for (const choice of event.choices) {
      for (const flag of choice.effect.addFlags ?? []) knownFlags.add(flag);
    }
  }
  for (const event of events) {
    const referenced = [
      ...(event.when?.flagsAll ?? []),
      ...(event.when?.flagsAny ?? []),
      ...(event.when?.flagsNone ?? []),
      ...event.choices.flatMap((choice) => [
        ...(choice.when?.flagsAll ?? []),
        ...(choice.when?.flagsAny ?? []),
        ...(choice.when?.flagsNone ?? [])
      ])
    ];
    for (const flag of referenced) {
      if (!knownFlags.has(flag)) {
        issues.push({
          severity: "warning",
          location: event.id,
          message: `参照flag ${flag} を追加する選択肢が見つかりません。`
        });
      }
    }
  }

  return issues;
};

export const summarizeContent = (events: StoryEvent[]) => ({
  totalEvents: events.length,
  totalChoices: events.reduce((sum, event) => sum + event.choices.length, 0),
  characters: new Set(events.map((event) => event.speaker).filter(Boolean)).size,
  eventsByChapter: CHAPTERS.map((chapter) => ({
    chapter: chapter.number,
    count: events.filter((event) => event.chapter === chapter.number).length
  }))
});

const searchableText = (event: StoryEvent): string =>
  [
    event.title,
    ...event.body,
    event.speaker ?? "",
    event.quote ?? "",
    ...event.choices.flatMap((choice) => [choice.text, ...choice.result])
  ].join("\n");

export const validateNarrativeContinuity = (events: StoryEvent[]): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const earlyText = events
    .filter((event) => event.chapter <= 2)
    .map(searchableText)
    .join("\n");
  const chapter1Text = events
    .filter((event) => event.chapter === 1)
    .map(searchableText)
    .join("\n");

  for (const name of ["ダンケ", "はじめ課長", "サックスむらい", "マコト", "柴田", "テツ", "シル子"]) {
    if (chapter1Text.includes(name)) {
      issues.push({
        severity: "error",
        location: "chapter1",
        message: `${name} はヒカキンの無名時代には直接登場させません。`
      });
    }
  }
  if (earlyText.includes("ダークまっすお")) {
    issues.push({ severity: "error", location: "chapter1-2", message: "ダークまっすおの登場が早すぎます。" });
  }

  const producers = new Map<string, number>();
  for (const event of events) {
    for (const choice of event.choices) {
      for (const flag of choice.effect.addFlags ?? []) {
        producers.set(flag, Math.min(producers.get(flag) ?? event.chapter, event.chapter));
      }
    }
  }
  for (const event of events) {
    const required = [
      ...(event.when?.flagsAll ?? []),
      ...(event.when?.flagsAny ?? []),
      ...event.choices.flatMap((choice) => [
        ...(choice.when?.flagsAll ?? []),
        ...(choice.when?.flagsAny ?? [])
      ])
    ];
    for (const flag of required) {
      const producedIn = producers.get(flag);
      if (producedIn && producedIn > event.chapter) {
        issues.push({
          severity: "error",
          location: event.id,
          message: `${flag} は第${producedIn}章で初めて作られるため、この条件には到達できません。`
        });
      }
    }
  }

  return issues;
};
