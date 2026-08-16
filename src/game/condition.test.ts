import { describe, expect, it } from "vitest";
import { createInitialGameState, createInitialMeta } from "./constants";
import { meetsCondition } from "./condition";

describe("meetsCondition", () => {
  it("能力・flag・trend・閲覧履歴をまとめて判定する", () => {
    const state = createInitialGameState(1);
    state.worldTrends = ["gaming", "musicGlobal"];
    state.flags.push("sample_flag");
    state.seenThisRun.push("this_run_event");
    const meta = createInitialMeta();
    meta.seenEvents.push("past_event");

    expect(
      meetsCondition(
        {
          minStats: { beatbox: 20 },
          maxStats: { trust: 60 },
          flagsAll: ["sample_flag"],
          trendsAll: ["gaming"],
          seenAll: ["past_event", "this_run_event"]
        },
        state,
        meta
      )
    ).toBe(true);
  });

  it("禁止flagがある場合はfalse", () => {
    const state = createInitialGameState(1);
    expect(meetsCondition({ flagsNone: ["ambition_never_nobody"] }, state)).toBe(false);
  });
});
