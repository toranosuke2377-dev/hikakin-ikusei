import { describe, expect, it } from "vitest";
import { allEvents, endingDefinitions } from ".";
import { simulateRun, type SimulationStrategy } from "../game/simulation";
import {
  summarizeContent,
  validateContent,
  validateNarrativeContinuity
} from "../game/validation";
import { isInflammatoryEffect } from "./helpers";

describe("scenario content", () => {
  it("全章・全slot・5エンディングの構造が有効", () => {
    const issues = validateContent(allEvents, endingDefinitions);
    const errors = issues.filter((issue) => issue.severity === "error");
    expect(errors, JSON.stringify(errors, null, 2)).toEqual([]);
  });

  it("条件式が実在しないflagを参照しない", () => {
    const warnings = validateContent(allEvents, endingDefinitions).filter(
      (issue) => issue.severity === "warning"
    );
    expect(warnings, JSON.stringify(warnings, null, 2)).toEqual([]);
  });

  it("条件flagは参照する場面より前に獲得できる", () => {
    const producers = new Map<string, { chapter: number; slot: number }[]>();
    for (const event of allEvents) {
      for (const choice of event.choices) {
        for (const flag of choice.effect.addFlags ?? []) {
          producers.set(flag, [
            ...(producers.get(flag) ?? []),
            { chapter: event.chapter, slot: event.slot }
          ]);
        }
      }
    }

    const failures: string[] = [];
    const producedBefore = (flag: string, chapter: number, slot: number) =>
      (producers.get(flag) ?? []).some(
        (producer) =>
          producer.chapter < chapter ||
          (producer.chapter === chapter && producer.slot < slot)
      );

    for (const event of allEvents) {
      const conditions = [
        { location: event.id, when: event.when },
        ...event.choices.map((choice) => ({
          location: `${event.id}/${choice.id}`,
          when: choice.when
        }))
      ];
      for (const { location, when } of conditions) {
        for (const flag of when?.flagsAll ?? []) {
          if (!producedBefore(flag, event.chapter, event.slot)) {
            failures.push(`${location}: ${flag} を獲得前にflagsAllで参照`);
          }
        }
        if (
          when?.flagsAny?.length &&
          !when.flagsAny.some((flag) => producedBefore(flag, event.chapter, event.slot))
        ) {
          failures.push(`${location}: flagsAnyの候補を事前獲得できない`);
        }
      }
    }

    expect(failures, failures.join("\n")).toEqual([]);
  });

  it("登場時期と伏線flagの時系列が矛盾しない", () => {
    const errors = validateNarrativeContinuity(allEvents).filter(
      (issue) => issue.severity === "error"
    );
    expect(errors, JSON.stringify(errors, null, 2)).toEqual([]);
  });

  it("一時間作品と周回に必要な量を持つ", () => {
    const summary = summarizeContent(allEvents);
    expect(summary.totalEvents).toBeGreaterThanOrEqual(175);
    expect(summary.totalChoices).toBeGreaterThanOrEqual(500);
    for (const chapter of summary.eventsByChapter) {
      expect(chapter.count).toBeGreaterThanOrEqual(30);
    }
  });

  it("各方針を多数seedで最後まで自動プレイできる", () => {
    const strategies: SimulationStrategy[] = [
      "random",
      "numberOne",
      "craft",
      "mastermind",
      "controversy",
      "collapse"
    ];

    for (const strategy of strategies) {
      for (let seed = 1; seed <= 12; seed += 1) {
        const result = simulateRun(allEvents, endingDefinitions, strategy, seed * 7_919);
        expect(result.state.finished).toBe(true);
        expect(result.eventIds.length).toBeGreaterThanOrEqual(60);
        expect(result.eventIds.length).toBeLessThan(160);
      }
    }
  });

  it("用意した5種類の結末へ到達できる", () => {
    const strategies: SimulationStrategy[] = [
      "random",
      "numberOne",
      "craft",
      "mastermind",
      "controversy",
      "collapse"
    ];
    const reached = new Set<string>();

    for (const strategy of strategies) {
      for (let seed = 1; seed <= 80; seed += 1) {
        reached.add(
          simulateRun(allEvents, endingDefinitions, strategy, seed * 104_729).ending.id
        );
      }
    }

    expect(reached).toEqual(
      new Set([
        "number_one",
        "legendary_video",
        "mastermind",
        "street_beatboxer",
        "controversy_king"
      ])
    );
  });

  it("二千万人到達フラグを立てた周回は日本一エンドで完結する", () => {
    for (let seed = 1; seed <= 100; seed += 1) {
      const result = simulateRun(
        allEvents,
        endingDefinitions,
        "numberOne",
        seed * 93_109
      );
      if (result.state.flags.includes("ch5_number_one_achieved")) {
        expect(result.ending.id).toBe("number_one");
      }
    }
  });

  it("最終章で確定した運命とエンディング表示が食い違わない", () => {
    const expectedByFlag = {
      ch5_controversy_king: "controversy_king",
      ch5_number_one_achieved: "number_one",
      ch5_legendary_achieved: "legendary_video",
      ch5_mastermind_achieved: "mastermind"
    } as const;

    for (const strategy of ["random", "numberOne", "craft", "mastermind", "controversy", "collapse"] as const) {
      for (let seed = 1; seed <= 100; seed += 1) {
        const result = simulateRun(
          allEvents,
          endingDefinitions,
          strategy,
          seed * 65_537
        );
        for (const [flag, endingId] of Object.entries(expectedByFlag)) {
          if (result.state.flags.includes(flag)) {
            expect(result.ending.id, `${strategy}/${seed}/${flag}`).toBe(endingId);
            break;
          }
        }
      }
    }
  });

  it("二組の全メンバーを描きながらヒカキンを場面の中心に保つ", () => {
    const roster = [
      "テツ",
      "としみち",
      "丸眼鏡",
      "yo!!",
      "柴竜",
      "ユメマール",
      "シル子",
      "ウダホ",
      "masa",
      "ザ顔",
      "ダーマン",
      "もとけ"
    ];
    const fullCorpus = allEvents
      .flatMap((event) => [
        ...event.body,
        ...event.choices.flatMap((choice) => [choice.text, ...choice.result])
      ])
      .join("\n");

    for (const name of roster) expect(fullCorpus, name).toContain(name);

    const groupEvents = allEvents.filter((event) =>
      event.tags?.some((tag) => tag === "tetsu" || tag === "shiruko")
    );
    expect(groupEvents.length).toBeGreaterThanOrEqual(8);
    for (const event of groupEvents) {
      const eventCorpus = [
        ...event.body,
        ...event.choices.flatMap((choice) => [choice.text, ...choice.result])
      ].join("\n");
      expect(eventCorpus, event.id).toContain("ヒカキン");
    }
  });

  it("炎上する選択は一回につき登録者約50万人を失う", () => {
    const inflammatoryChoices = allEvents.flatMap((event) =>
      event.choices.filter((choice) => isInflammatoryEffect(choice.effect))
    );

    expect(inflammatoryChoices.length).toBeGreaterThanOrEqual(30);
    for (const choice of inflammatoryChoices) {
      expect(choice.effect.stats?.subscribers, choice.id).toBe(-500_000);
      if (choice.effect.video) {
        expect(choice.effect.video.subscribersGained, choice.id).toBe(-500_000);
      }
    }
  });

  it("炎上王は登録者約400万人で終わる", () => {
    for (let seed = 1; seed <= 80; seed += 1) {
      const result = simulateRun(
        allEvents,
        endingDefinitions,
        "controversy",
        seed * 83_449
      );
      expect(result.ending.id).toBe("controversy_king");
      expect(result.state.stats.subscribers).toBe(4_000_000);
    }
  });

  it("初見相当のランダム選択で5結末が狙った範囲に分布する", () => {
    const counts = new Map<string, number>();
    const runs = 500;
    for (let seed = 1; seed <= runs; seed += 1) {
      const endingId = simulateRun(
        allEvents,
        endingDefinitions,
        "random",
        seed * 104_729
      ).ending.id;
      counts.set(endingId, (counts.get(endingId) ?? 0) + 1);
    }

    const rate = (endingId: string) => (counts.get(endingId) ?? 0) / runs;
    expect(rate("number_one")).toBeGreaterThanOrEqual(0.04);
    expect(rate("number_one")).toBeLessThanOrEqual(0.09);
    expect(rate("legendary_video")).toBeGreaterThanOrEqual(0.21);
    expect(rate("legendary_video")).toBeLessThanOrEqual(0.3);
    expect(rate("mastermind")).toBeGreaterThanOrEqual(0.18);
    expect(rate("mastermind")).toBeLessThanOrEqual(0.26);
    expect(rate("controversy_king")).toBeGreaterThanOrEqual(0.25);
    expect(rate("controversy_king")).toBeLessThanOrEqual(0.34);
    expect(rate("street_beatboxer")).toBeGreaterThanOrEqual(0.13);
    expect(rate("street_beatboxer")).toBeLessThanOrEqual(0.22);
  });
});
