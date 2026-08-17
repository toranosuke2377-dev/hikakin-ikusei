import { describe, expect, it } from "vitest";
import { createInitialGameState, createInitialMeta } from "./constants";
import {
  advanceChapter,
  initializeRun,
  isChapterComplete,
  pickWorldTrends,
  resolveChoice,
  selectEvent
} from "./engine";
import type { StoryEvent } from "./types";

const baseEvent = (overrides: Partial<StoryEvent> = {}): StoryEvent => ({
  id: "test_event",
  chapter: 1,
  slot: 0,
  title: "テスト",
  date: "2008年",
  location: "社員寮",
  body: ["テスト本文"],
  visual: { background: "bg/test" },
  choices: [
    {
      id: "choose",
      text: "選ぶ",
      result: ["結果"],
      effect: {
        stats: { subscribers: 10, energy: -200 },
        hidden: { origin: 5 },
        routes: { craft: 3 },
        relationships: { zeikin: 4 },
        addFlags: ["chosen"]
      }
    }
  ],
  ...overrides
});

describe("game engine", () => {
  it("同じseedでは同じ世界トレンドを二つ選ぶ", () => {
    expect(pickWorldTrends(42)).toEqual(pickWorldTrends(42));
    expect(new Set(pickWorldTrends(42)).size).toBe(2);
  });

  it("選択結果を適用し、能力値を範囲内に保つ", () => {
    const state = initializeRun(createInitialGameState(10));
    const event = baseEvent();
    const resolution = resolveChoice(state, event, event.choices[0]!);

    expect(resolution.state.stats.subscribers).toBe(10);
    expect(resolution.state.stats.energy).toBe(0);
    expect(resolution.state.hidden.origin).toBe(75);
    expect(resolution.state.routes.craft).toBe(3);
    expect(resolution.state.relationships.zeikin).toBe(24);
    expect(resolution.state.flags).toContain("chosen");
    expect(resolution.state.slot).toBe(1);
    expect(resolution.state.history).toHaveLength(1);
  });

  it("条件を満たす高priorityイベントを選ぶ", () => {
    const state = initializeRun(createInitialGameState(10));
    const events = [
      baseEvent({ id: "fallback", priority: 0 }),
      baseEvent({
        id: "conditional",
        priority: 10,
        when: { minHidden: { ambition: 80 } }
      })
    ];

    expect(selectEvent(events, state, createInitialMeta()).id).toBe("conditional");
  });

  it("周回済みの場面より未閲覧の場面を優先する", () => {
    const state = initializeRun(createInitialGameState(10));
    const meta = createInitialMeta();
    meta.seenEvents.push("seen");
    const events = [
      baseEvent({ id: "seen", weight: 1 }),
      baseEvent({ id: "unseen", weight: 1 })
    ];

    // With the deterministic seed used here, a 4:1 unseen weighting must
    // select the unviewed event.  (The old inverse weighting selected seen.)
    expect(selectEvent(events, state, meta).id).toBe("unseen");
  });

  it("queueイベントを追加場面として処理する", () => {
    const state = initializeRun(createInitialGameState(10));
    const first = baseEvent({
      choices: [
        {
          id: "queue",
          text: "続ける",
          result: ["続く"],
          effect: { queueEvent: "followup" }
        }
      ]
    });
    const afterFirst = resolveChoice(state, first, first.choices[0]!).state;
    const followup = baseEvent({ id: "followup", slot: 99 });

    expect(selectEvent([first, followup], afterFirst, createInitialMeta()).id).toBe("followup");
    const afterFollowup = resolveChoice(afterFirst, followup, followup.choices[0]!).state;
    expect(afterFollowup.slot).toBe(afterFirst.slot);
    expect(afterFollowup.queuedEvent).toBeUndefined();
  });

  it("周回場面は初回には出ず、二周目以降も本編slotを消費しない", () => {
    const story = baseEvent({ id: "story" });
    const replay = baseEvent({
      id: "replay",
      tags: ["replay"],
      oncePerRun: true,
      when: { minCompletedRuns: 1 }
    });
    const firstMeta = createInitialMeta();
    const firstState = initializeRun(createInitialGameState(10));
    expect(selectEvent([story, replay], firstState, firstMeta).id).toBe("story");

    const replayMeta = createInitialMeta();
    replayMeta.completedRuns = 1;
    let replayState = initializeRun(createInitialGameState(1));
    let selected = selectEvent([story, replay], replayState, replayMeta);
    for (let seed = 2; selected.id !== "replay" && seed < 200; seed += 1) {
      replayState = initializeRun(createInitialGameState(seed));
      selected = selectEvent([story, replay], replayState, replayMeta);
    }

    expect(selected.id).toBe("replay");
    const afterReplay = resolveChoice(replayState, replay, replay.choices[0]!).state;
    expect(afterReplay.slot).toBe(0);
    expect(selectEvent([story, replay], afterReplay, replayMeta).id).toBe("story");
  });

  it("最終slotでqueueされた後日談を章終了前に処理する", () => {
    const state = initializeRun(createInitialGameState(10));
    state.slot = 11;
    const finale = baseEvent({
      slot: 11,
      choices: [{ id: "epilogue", text: "続ける", result: ["続く"], effect: { queueEvent: "extra" } }]
    });
    const after = resolveChoice(state, finale, finale.choices[0]!).state;
    expect(after.slot).toBe(12);
    expect(after.queuedEvent).toBe("extra");
    expect(isChapterComplete(after)).toBe(false);
  });

  it("章を進めると休息し、次章slot 0へ移る", () => {
    const state = initializeRun(createInitialGameState(10));
    state.stats.energy = 25;
    state.hidden.fatigue = 40;
    const next = advanceChapter(state);

    expect(next.chapter).toBe(2);
    expect(next.slot).toBe(0);
    expect(next.stats.energy).toBe(50);
    expect(next.hidden.fatigue).toBe(32);
  });
});
