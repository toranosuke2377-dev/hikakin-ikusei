import { describe, expect, it } from "vitest";
import { allEvents } from "../data";
import { endingDefinitions } from "../data/endings";
import { CHAPTERS, createInitialGameState, createInitialMeta } from "./constants";
import { getChapterPresentation } from "./chapterPresentation";
import { formatMoney } from "./format";
import { getEndingPresentation } from "./endingPresentation";
import {
  getBranchNotice,
  getDecisionPrompt,
  getOutcomePresentation
} from "./storyPresentation";
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

  it("選択した登録者と所持金の増減を現在値へ正確に反映する", () => {
    const state = initializeRun(createInitialGameState(10));
    const event = baseEvent({
      choices: [{
        id: "observable",
        text: "動画を公開する",
        result: ["動画が収益と新しい視聴者を連れてきた。"],
        effect: { stats: { subscribers: 12_345, money: 67_890 } }
      }]
    });
    const resolution = resolveChoice(state, event, event.choices[0]!);

    expect(resolution.before.stats.subscribers).toBe(0);
    expect(resolution.state.stats.subscribers).toBe(12_345);
    expect(resolution.before.stats.money).toBe(20_000);
    expect(resolution.state.stats.money).toBe(87_890);
  });

  it("節約しただけでは現金が増えず、初給料は全分岐で同じ月に入る", () => {
    for (const choiceId of [
      "ch1_s0_basic_protect_money",
      "ch1_s0_music_save_cash",
      "ch1_s1_envelope_cook_rice"
    ]) {
      const choice = allEvents.flatMap((event) => event.choices).find((item) => item.id === choiceId);
      expect(choice?.effect.stats?.money, choiceId).toBeUndefined();
    }

    const firstPaydayChoices = allEvents
      .filter((event) => event.chapter === 1 && event.slot === 2 && !event.tags?.includes("rare"))
      .flatMap((event) => event.choices);
    expect(firstPaydayChoices).toHaveLength(9);
    for (const choice of firstPaydayChoices) {
      expect(choice.effect.stats?.money, choice.id).toBeGreaterThanOrEqual(95_000);
      expect(choice.result.join("\n"), choice.id).toMatch(/給料|給料日/);
    }
  });

  it("結果画面で数字が動いた時期と理由を説明する", () => {
    const state = initializeRun(createInitialGameState(10));
    const event = baseEvent({
      tags: ["viral", "video"],
      choices: [{
        id: "publish",
        text: "動画を公開する",
        result: ["大きな反応が届いた。"],
        effect: {
          stats: { subscribers: 120_000, money: 80_000 },
          video: {
            title: "テスト動画",
            views: 1_000_000,
            subscribersGained: 120_000,
            kind: "テスト",
            chapter: 1
          },
          routes: { mainstream: 2 },
          addFlags: ["published"]
        }
      }]
    });
    const choice = event.choices[0]!;
    const resolution = resolveChoice(state, event, choice);
    const presentation = getOutcomePresentation(event, choice, resolution);

    expect(presentation.timing).toContain("一週間");
    expect(presentation.subscribersReason).toContain("テスト動画");
    expect(presentation.moneyReason).toContain("広告");
    expect(presentation.carryovers).toContain("後の物語分岐");
  });

  it("三択の前に場面に合う問いと過去選択による分岐理由を示す", () => {
    const event = baseEvent({
      tags: ["crisis"],
      when: { flagsAll: ["past_choice"] }
    });
    expect(getDecisionPrompt(event)).toContain("何を守り");
    expect(getBranchNotice(event)).toContain("以前の決断");
  });

  it("直前の結果に合わせて第2章と第5章の章題・導入を変える", () => {
    const chapter2 = CHAPTERS.find((chapter) => chapter.number === 2)!;
    const chapter5 = CHAPTERS.find((chapter) => chapter.number === 5)!;
    const state = initializeRun(createInitialGameState(10));

    state.flags.push("ch1_video_flop");
    expect(getChapterPresentation(chapter2, state).title).toBe("八百四十二回の次");
    expect(getChapterPresentation(chapter2, state).opening).not.toContain("大ヒット");

    state.flags = ["ch5_entry_controversy"];
    expect(getChapterPresentation(chapter5, state).title).toBe("燃え残った名前");
    expect(getChapterPresentation(chapter5, state).opening).toContain("炎上");
  });

  it("第3章と第4章も、それまでの生き方に合わせて導入が分岐する", () => {
    const chapter3 = CHAPTERS.find((chapter) => chapter.number === 3)!;
    const chapter4 = CHAPTERS.find((chapter) => chapter.number === 4)!;
    const state = initializeRun(createInitialGameState(10));

    state.hidden.fatigue = 35;
    expect(getChapterPresentation(chapter3, state).title).toBe("眠らない成功");

    state.hidden.fatigue = 10;
    state.routes.network = 15;
    expect(getChapterPresentation(chapter3, state).title).toBe("名前が増えた画面");

    state.hidden.controversy = 30;
    expect(getChapterPresentation(chapter4, state).title).toBe("燃え始めた人気");
  });

  it("同じ金額でも時代が進むほど収益と制作費の規模が大きくなる", () => {
    const event = baseEvent({
      choices: [{ id: "money", text: "収支を確定する", result: ["収支が動いた。"], effect: { stats: { money: 1_000_000 } } }]
    });
    const early = initializeRun(createInitialGameState(10));
    const late = { ...initializeRun(createInitialGameState(10)), chapter: 5 as const };

    expect(resolveChoice(early, event, event.choices[0]!).state.stats.money).toBe(1_020_000);
    expect(resolveChoice(late, { ...event, chapter: 5 }, event.choices[0]!).state.stats.money)
      .toBe(625_020_000);
    expect(formatMoney(10_027_384_615)).toBe("100億2,738万4,615円");
  });

  it("後半でも給料や食費などの生活金額は水増ししない", () => {
    const late = { ...initializeRun(createInitialGameState(10)), chapter: 5 as const };
    const salary = baseEvent({
      chapter: 5,
      choices: [{ id: "salary", text: "給料を受け取る", result: ["十万円が入った。"], effect: { stats: { money: 100_000 } } }]
    });

    expect(resolveChoice(late, salary, salary.choices[0]!).state.stats.money).toBe(120_000);
  });

  it("実額指定した制作報酬は後半でも書かれた円単位のまま反映する", () => {
    const late = { ...initializeRun(createInitialGameState(10)), chapter: 5 as const };
    const fee = baseEvent({
      chapter: 5,
      choices: [{ id: "fee", text: "制作報酬を受け取る", result: ["報酬が入った。"], effect: { moneyScale: "exact", stats: { money: 32_400_000 } } }]
    });

    expect(resolveChoice(late, fee, fee.choices[0]!).state.stats.money).toBe(32_420_000);
    expect(formatMoney(32_420_000)).toBe("3,242万円");
  });

  it("撤退費用は現在残高に比例し、その後の収入を加える", () => {
    const state = initializeRun(createInitialGameState(10));
    state.stats.money = 10_000_000;
    const closure = baseEvent({
      choices: [{
        id: "closure",
        text: "事業を清算する",
        result: ["残った資金で生活を立て直した。"],
        effect: { moneyMultiplier: 0.05, stats: { money: 300_000 } }
      }]
    });

    expect(resolveChoice(state, closure, closure.choices[0]!).state.stats.money).toBe(800_000);
  });

  it("制作費を払っても所持金は負の借金表示にならない", () => {
    const state = initializeRun(createInitialGameState(10));
    const expense = baseEvent({
      choices: [{ id: "expense", text: "機材を買う", result: ["手元資金を使った。"], effect: { stats: { money: -80_000 } } }]
    });

    expect(resolveChoice(state, expense, expense.choices[0]!).state.stats.money).toBe(0);
  });

  it("最後に選んだ運命だけを残し、路上と炎上などを同時成立させない", () => {
    const state = initializeRun(createInitialGameState(10));
    state.flags.push("ch5_street_fate");
    const turnToProducer = baseEvent({
      choices: [{
        id: "producer",
        text: "裏方へ進む",
        result: ["制作の道を選んだ。"],
        effect: { addFlags: ["ch5_mastermind_achieved"] }
      }]
    });

    const flags = resolveChoice(state, turnToProducer, turnToProducer.choices[0]!).state.flags;
    expect(flags).toContain("ch5_mastermind_achieved");
    expect(flags).not.toContain("ch5_street_fate");
  });

  it("路上エンドの文章を実残高に合わせて三段階に変える", () => {
    const ending = endingDefinitions.find((item) => item.id === "street_beatboxer")!;
    const state = initializeRun(createInitialGameState(10));

    state.stats.money = 1_000_000;
    expect(getEndingPresentation(ending, state).title).toBe("路上のビートボクサー");

    state.stats.money = 3_000_000;
    expect(getEndingPresentation(ending, state).title).toContain("生活再建");

    state.stats.money = 10_000_000;
    const retirement = getEndingPresentation(ending, state);
    expect(retirement.title).toContain("静かな撤退");
    expect(retirement.category).toBe("NORMAL");
    expect(retirement.body.join("\n")).not.toContain("部屋を維持できず");
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

  it("希少場面は初回から出現でき、本編slotを消費しない", () => {
    const story = baseEvent({ id: "story" });
    const rare = baseEvent({
      id: "rare",
      tags: ["rare"],
      oncePerRun: true
    });
    const firstMeta = createInitialMeta();
    let rareState = initializeRun(createInitialGameState(1));
    let selected = selectEvent([story, rare], rareState, firstMeta);
    for (let seed = 2; selected.id !== "rare" && seed < 200; seed += 1) {
      rareState = initializeRun(createInitialGameState(seed));
      selected = selectEvent([story, rare], rareState, firstMeta);
    }

    expect(selected.id).toBe("rare");
    const afterRare = resolveChoice(rareState, rare, rare.choices[0]!).state;
    expect(afterRare.slot).toBe(0);
    expect(selectEvent([story, rare], afterRare, firstMeta).id).toBe("story");
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
