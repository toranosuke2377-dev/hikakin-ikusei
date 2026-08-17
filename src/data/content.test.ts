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

  it("初回から全イベント候補が開き、周回数によるロックを持たない", () => {
    const locked = allEvents.flatMap((event) => {
      const locations = event.when?.minCompletedRuns || event.when?.maxCompletedRuns
        ? [event.id]
        : [];
      return [
        ...locations,
        ...event.choices
          .filter((choice) => choice.when?.minCompletedRuns || choice.when?.maxCompletedRuns)
          .map((choice) => `${event.id}/${choice.id}`)
      ];
    });

    expect(locked).toEqual([]);
  });

  it("第1章の五結果ごとに第2章冒頭の質問そのものが変わる", () => {
    const expectedBranches = [
      ["ch1_s10_viral_global", "ch1_viral_global", "ch2_s0_after_global_viral"],
      ["ch1_s10_viral_technical", "ch1_viral_technical", "ch2_s0_after_technical_viral"],
      ["ch1_s10_delayed_breakout", "ch1_viral_delayed", "ch2_s0_after_delayed_hit"],
      ["ch1_s10_niche_recognition", "ch1_viral_niche", "ch2_s0_after_niche_hit"],
      ["ch1_s10_flop_fallback", "ch1_video_flop", "ch2_s0_after_flop"]
    ] as const;

    for (const [resultId, routeFlag, questionId] of expectedBranches) {
      const result = allEvents.find((event) => event.id === resultId);
      const question = allEvents.find((event) => event.id === questionId);
      expect(result, resultId).toBeDefined();
      expect(
        result?.choices.every((choice) => choice.effect.addFlags?.includes(routeFlag)),
        `${resultId} must always set ${routeFlag}`
      ).toBe(true);
      expect(question?.chapter, questionId).toBe(2);
      expect(question?.slot, questionId).toBe(0);
      expect(
        [...(question?.when?.flagsAll ?? []), ...(question?.when?.flagsAny ?? [])],
        `${questionId} must depend on ${routeFlag}`
      ).toContain(routeFlag);
    }

    const openingTitles = expectedBranches.map(([, , questionId]) =>
      allEvents.find((event) => event.id === questionId)?.title
    );
    expect(new Set(openingTitles).size).toBe(expectedBranches.length);
  });

  it("本文と選択結果に壊れた文字列や未完成の文章を残さない", () => {
    const failures: string[] = [];
    const broken = /�|\[object Object\]|undefined|NaN|TODO|TBD|。。。|、、/;
    const completeEnding = /[。！？!?）」』]$/;

    for (const event of allEvents) {
      const paragraphs = [
        ...event.body.map((text, index) => [`${event.id}/body/${index}`, text] as const),
        ...event.choices.flatMap((choice) =>
          choice.result.map((text, index) => [`${event.id}/${choice.id}/result/${index}`, text] as const)
        )
      ];
      for (const [location, text] of paragraphs) {
        if (text.length < 10) failures.push(`${location}: 短すぎる文章「${text}」`);
        if (broken.test(text)) failures.push(`${location}: 壊れた文字列「${text}」`);
        if (!completeEnding.test(text)) failures.push(`${location}: 文末が未完成「${text}」`);
      }
    }

    expect(failures, failures.join("\n")).toEqual([]);
  });

  it("確定した人物関係と結末に反する旧文章を残さない", () => {
    const corpus = [
      ...allEvents.flatMap((event) => [
        event.title,
        event.location,
        event.speaker ?? "",
        ...event.body,
        ...event.choices.flatMap((choice) => [choice.text, ...choice.result])
      ]),
      ...endingDefinitions.flatMap((ending) => [ending.title, ...ending.body, ending.finalQuote])
    ].join("\n");

    for (const obsolete of [
      "音が止まるまで",
      "おじさん、YouTuberなの？",
      "親分のおかげです",
      "未来のライバルを育てる",
      "未来の強敵を信頼で育てる",
      "互いを引き上げる『四皇時代』"
    ]) {
      expect(corpus, obsolete).not.toContain(obsolete);
    }

    expect(allEvents.some((event) => event.speaker === "柴田")).toBe(false);
    expect(allEvents.some((event) => event.location.includes("柴田"))).toBe(false);
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

  it("日本一ルートで実残高が100億円を超えた時だけ達成動画へ進む", () => {
    const hundredBillion = allEvents.find((event) => event.id === "ch5_hundred_billion_video");
    expect(hundredBillion).toBeDefined();
    expect(hundredBillion?.body.join("\n")).toContain("百億円");
    expect(hundredBillion?.choices).toHaveLength(3);
    for (const choice of hundredBillion?.choices ?? []) {
      expect(choice.effect.setStats?.money, choice.id).toBeUndefined();
      expect(choice.effect.video?.title, choice.id).toContain("100億円");
    }
    expect(hundredBillion?.when?.minStats?.money).toBe(10_000_000_000);

    for (const eventId of [
      "ch5_four_emperors_crowning_massuo_note",
      "ch5_four_emperors_crowning",
      "ch5_number_one_room"
    ]) {
      const event = allEvents.find((item) => item.id === eventId);
      expect(event, eventId).toBeDefined();
      for (const choice of event?.choices ?? []) {
        expect(choice.effect.queueEvent, choice.id).toBe("ch5_hundred_billion_video");
      }
    }

    const result = simulateRun(allEvents, endingDefinitions, "numberOne", 93_109);
    const finalDayIndex = Math.max(
      result.eventIds.indexOf("ch5_four_emperors_crowning_massuo_note"),
      result.eventIds.indexOf("ch5_four_emperors_crowning"),
      result.eventIds.indexOf("ch5_number_one_room")
    );
    expect(finalDayIndex).toBeGreaterThanOrEqual(0);
    expect(result.eventIds.indexOf("ch5_hundred_billion_video")).toBeGreaterThan(finalDayIndex);
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

  it("ヒカキンのカメラ内外と五章の成長線を保つ", () => {
    const corpus = allEvents
      .flatMap((event) => [
        ...event.body,
        ...event.choices.flatMap((choice) => [choice.text, ...choice.result])
      ])
      .join("\n");

    for (const marker of [
      "録画ランプが点くと姿勢が変わった",
      "子供のように笑った",
      "いや、それはさすがにやめてください",
      "年間八百本を超える動画",
      "……何者かには、なれたのかな"
    ]) {
      expect(corpus, marker).toContain(marker);
    }
    expect(endingDefinitions.find((ending) => ending.id === "number_one")?.finalQuote)
      .toBe("……何者かには、なれたのかな。");
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
    // 500程度では希少イベントの偏りが数ポイント出るため、設計値の監視は
    // 2,000seedで行う。生成レポートではさらに5,000seedを使用する。
    const runs = 2_000;
    const terminalFlags = [
      "ch5_controversy_king",
      "ch5_number_one_achieved",
      "ch5_legendary_achieved",
      "ch5_mastermind_achieved",
      "ch5_street_fate"
    ];
    for (let seed = 1; seed <= runs; seed += 1) {
      const result = simulateRun(
        allEvents,
        endingDefinitions,
        "random",
        seed * 104_729
      );
      const endingId = result.ending.id;
      counts.set(endingId, (counts.get(endingId) ?? 0) + 1);

      expect(
        terminalFlags.filter((flag) => result.state.flags.includes(flag)),
        `seed ${seed} で複数の最終運命が同時に確定した`
      ).toHaveLength(1);

      if (endingId === "number_one") {
        expect(result.state.flags).toContain("ch5_hundred_billion_achieved");
        expect(result.state.stats.money).toBeGreaterThanOrEqual(10_000_000_000);
      }
      if (endingId === "legendary_video" || endingId === "mastermind") {
        expect(result.state.stats.money).toBeLessThan(100_000_000);
      }
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
  }, 15_000);
});
