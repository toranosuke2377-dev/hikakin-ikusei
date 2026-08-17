import type { ChoiceResolution } from "./engine";
import type { EventChoice, StoryEvent } from "./types";

const hasTag = (event: StoryEvent, ...tags: string[]): boolean =>
  tags.some((tag) => event.tags?.includes(tag));

export const getDecisionPrompt = (event: StoryEvent): string => {
  if (hasTag(event, "ending")) return "この人生の最後に、何を残す？";
  if (hasTag(event, "crisis", "safety", "collapse")) return "何を守り、何を諦める？";
  if (hasTag(event, "controversy", "scandal")) return "注目を取るか、信用を守るか。どう動く？";
  if (hasTag(event, "rivalry", "hajime")) return "友人でありライバルでもある相手へ、どう向き合う？";
  if (hasTag(event, "work", "supermarket", "money", "stability")) {
    return "限られた時間とお金を、どこへ使う？";
  }
  if (hasTag(event, "viral", "hit", "result", "chapter-end")) {
    return "この結果を、次の一本へどうつなぐ？";
  }
  if (hasTag(event, "rare", "memory", "origin")) return "この瞬間を、どんな行動として残す？";
  return "ここで、ヒカキンはどう動く？";
};

export const getBranchNotice = (event: StoryEvent): string | undefined => {
  const condition = event.when;
  if (!condition || Object.keys(condition).length === 0) return undefined;
  if (condition.flagsAll?.length || condition.flagsAny?.length || condition.flagsNone?.length) {
    return "以前の決断が、この場面を呼び込んだ。";
  }
  if (condition.minRelationships || condition.maxRelationships) {
    return "ここまで築いた人間関係によって、展開が変わった。";
  }
  if (condition.trendsAll?.length || condition.trendsAny?.length) {
    return "このプレイで選ばれた時代の流行が、展開へ影響している。";
  }
  if (condition.minRoutes || condition.maxRoutes) {
    return "積み重ねた活動方針によって、別の展開へ入った。";
  }
  if (condition.minStats || condition.maxStats || condition.minHidden || condition.maxHidden) {
    return "これまでの成長と代償が、この場面の内容を変えた。";
  }
  return "過去のプレイ内容によって、この場面へ分岐した。";
};

export interface OutcomePresentation {
  timing: string;
  moneyReason?: string;
  subscribersReason?: string;
  carryovers: string[];
}

const getTiming = (
  event: StoryEvent,
  choice: EventChoice,
  resolution: ChoiceResolution
): string => {
  const resultText = choice.result.join("\n");
  const subscriberDelta = Math.abs(
    resolution.state.stats.subscribers - resolution.before.stats.subscribers
  );
  const moneyDelta = Math.abs(resolution.state.stats.money - resolution.before.stats.money);
  if (choice.effect.moneyMultiplier !== undefined) return "契約や事業の清算後";
  if (choice.effect.setStats?.subscribers !== undefined) return "その後の長い活動を経て";
  if (choice.effect.video) {
    if (choice.effect.video.views >= 10_000_000) return "公開から数週間後";
    if (choice.effect.video.views >= 1_000_000) return "公開から一週間後";
    return "動画公開後の集計";
  }
  const statedTiming = resultText.match(/(数年後|一年後|半年後|三か月後|翌月|数週間後|一週間後|数日後|翌朝|翌日|月末)/)?.[1];
  if (statedTiming) return statedTiming;
  if (/公開から|翌月|数年後|一週間後|三か月/.test(event.date)) return event.date;
  if (subscriberDelta >= 1_000_000) return "数か月にわたる反応のあと";
  if (subscriberDelta >= 100_000) return "数週間後";
  if (subscriberDelta > 0) return "次の反応が落ち着いたころ";
  if (moneyDelta >= 1_000_000) return "企画と契約の精算後";
  if (moneyDelta > 0) return "その月の収支を反映";
  return "選択直後";
};

const getMoneyReason = (event: StoryEvent, choice: EventChoice): string => {
  const corpus = `${choice.text}\n${choice.result.join("\n")}`;
  const authored = choice.effect.stats?.money ?? 0;
  if (choice.effect.moneyMultiplier !== undefined) {
    return "税金、契約解除、スタッフへの支払い、機材売却などをまとめて清算したため。";
  }
  if (authored < 0) {
    if (/違約|補償|返金|精算|是正|支援/.test(corpus)) return "補償・違約金・精算に実際の資金を使ったため。";
    if (/雇|外注|スタッフ|制作会社|チーム/.test(corpus)) return "人件費や外注費を支払ったため。";
    if (/マイク|機材|商品|買|購入|食事|定食|生活用品|通信/.test(corpus)) return "機材・商品・生活に必要な代金を支払ったため。";
    if (/企画|撮影|動画|公開|イベント|スタジオ|セット/.test(corpus)) return "企画・撮影・制作の費用を支払ったため。";
    return "生活費または活動費として実際に支出したため。";
  }
  if (/予約金|返金|固定費|取り戻|使わずに済/.test(corpus)) {
    return "予定していた支出を取りやめ、返金・削減できた分が手元へ戻ったため。";
  }
  if (/給料|勤務|仕事|シフト|スーパー|残業|早番/.test(corpus) || hasTag(event, "work", "supermarket")) {
    return "給料から寮費と生活費を引いた、手元に残る収入を反映したため。";
  }
  if (/契約|案件|企業|広告|スポンサー|パートナー|報酬|収益/.test(corpus) || hasTag(event, "partner")) {
    return "契約成立後の報酬と広告収入を受け取ったため。";
  }
  if (choice.effect.video || /動画|公開|投稿|再生|ヒット/.test(corpus)) {
    return "公開した動画の広告・関連収益が入ったため。";
  }
  if (/節約|自炊|守る|残す/.test(corpus)) {
    return "新しく稼いだ金ではなく、支出を抑えて残った差額を表している。";
  }
  return "その期間の活動収入から必要経費を引いた差額を反映したため。";
};

const getSubscribersReason = (event: StoryEvent, choice: EventChoice): string => {
  const corpus = `${choice.text}\n${choice.result.join("\n")}`;
  const delta = choice.effect.stats?.subscribers ?? 0;
  if (choice.effect.setStats?.subscribers !== undefined) {
    return "一回の行動ではなく、その後の長期間に起きた登録と解除を最終値へ反映したため。";
  }
  if (delta < 0) return "炎上・反発・期待外れによる登録解除が、新規登録を上回ったため。";
  if (choice.effect.video) return `動画「${choice.effect.video.title}」を見た人が新しく登録したため。`;
  if (hasTag(event, "viral", "ten-million", "hit")) {
    return "直前の大ヒット動画が拡散され続け、新しい視聴者が流入したため。";
  }
  if (/コラボ|共演|対決|一緒/.test(corpus)) return "コラボ公開後に、相手側の視聴者にも知られたため。";
  if (/公開|投稿|動画|再生|企画|実況|紹介/.test(corpus)) {
    return "この方針で公開した動画への反応を、一定期間集計したため。";
  }
  return "行動そのものではなく、その後に公開した関連動画への反応を反映したため。";
};

export const getOutcomePresentation = (
  event: StoryEvent,
  choice: EventChoice,
  resolution: ChoiceResolution
): OutcomePresentation => {
  const moneyDelta = resolution.state.stats.money - resolution.before.stats.money;
  const subscriberDelta =
    resolution.state.stats.subscribers - resolution.before.stats.subscribers;
  const authoredMoney = choice.effect.stats?.money ?? 0;
  const careerScaledMoney =
    choice.effect.moneyScale !== "exact" &&
    event.chapter >= 3 &&
    Math.abs(authoredMoney) >= 400_000;
  const carryovers: string[] = [];
  if (choice.effect.relationships && Object.keys(choice.effect.relationships).length > 0) carryovers.push("人間関係");
  if (choice.effect.routes && Object.keys(choice.effect.routes).length > 0) carryovers.push("活動方針");
  if (choice.effect.stats?.trust) carryovers.push("信用");
  if (choice.effect.stats?.energy || choice.effect.hidden?.fatigue) carryovers.push("体調");
  if (choice.effect.stats?.expression || choice.effect.stats?.production || choice.effect.stats?.beatbox) carryovers.push("能力成長");
  if ((choice.effect.addFlags?.length ?? 0) > 0 || choice.effect.hidden) carryovers.push("後の物語分岐");

  return {
    timing: getTiming(event, choice, resolution),
    moneyReason: moneyDelta === 0
      ? undefined
      : `${getMoneyReason(event, choice)}${careerScaledMoney
        ? " 表示額は一回分ではなく、この時期のチャンネル規模で数週間から数か月動いた総額。"
        : ""}`,
    subscribersReason:
      subscriberDelta === 0 ? undefined : getSubscribersReason(event, choice),
    carryovers: [...new Set(carryovers)]
  };
};
