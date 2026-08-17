import { writeFile } from "node:fs/promises";
import { allEvents, endingDefinitions } from "../src/data";
import { formatMoney, formatSubscribers } from "../src/game/format";
import { simulateRun, type SimulationStrategy } from "../src/game/simulation";

const strategies: { key: SimulationStrategy; label: string }[] = [
  { key: "random", label: "ランダム" },
  { key: "numberOne", label: "日本一志向" },
  { key: "craft", label: "職人志向" },
  { key: "mastermind", label: "裏方志向" },
  { key: "controversy", label: "炎上志向" },
  { key: "collapse", label: "破綻志向" }
];

const eventMap = new Map(allEvents.map((event) => [event.id, event]));
const generatedAt = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  dateStyle: "long",
  timeStyle: "medium"
}).format(new Date());
const report: string[] = [
  "# 自動バランス検証",
  "",
  `生成日時: ${generatedAt}（Asia/Tokyo）`,
  "",
  "ランダム選択を5,000seed、各方針を100seedずつ、合計5,500周自動プレイした結果。",
  "",
  "| 方針 | 平均場面 | 推定時間 | 平均登録者 | 最小 | 最大 | 主な結末 |",
  "|---|---:|---:|---:|---:|---:|---|"
];

const globallySeen = new Set<string>();
const moneySummaries: string[] = [];
const randomEndingBalances = new Map<string, number[]>();

for (const strategy of strategies) {
  const results = [];
  const runs = strategy.key === "random" ? 5_000 : 100;
  for (let index = 0; index < runs; index += 1) {
    const result = simulateRun(
      allEvents,
      endingDefinitions,
      strategy.key,
      (index + 1) * 93_109
    );
    results.push(result);
  }
  const sceneCounts = results.map((result) => result.eventIds.length);
  const subscribers = results.map((result) => result.state.stats.subscribers);
  const balances = results.map((result) => result.state.stats.money);
  const endingCounts = new Map<string, number>();
  let totalCharacters = 0;

  for (const result of results) {
    if (strategy.key === "random") {
      const balances = randomEndingBalances.get(result.ending.title) ?? [];
      balances.push(result.state.stats.money);
      randomEndingBalances.set(result.ending.title, balances);
    }
    for (const historyItem of result.state.history) {
      const event = eventMap.get(historyItem.eventId);
      if (!event) continue;
      globallySeen.add(event.id);
      const chosen = event.choices.find((choice) => choice.id === historyItem.choiceId);
      totalCharacters += [
        event.title,
        ...event.body,
        event.quote ?? "",
        ...event.choices.flatMap((choice) => [choice.text, choice.subtext ?? ""]),
        ...(chosen?.result ?? [])
      ].join("").length;
    }
    endingCounts.set(result.ending.title, (endingCounts.get(result.ending.title) ?? 0) + 1);
  }

  const averageScenes = sceneCounts.reduce((sum, value) => sum + value, 0) / results.length;
  const averageSubscribers = subscribers.reduce((sum, value) => sum + value, 0) / results.length;
  const readingMinutes = totalCharacters / results.length / 560;
  // Players read every option, compare stats and pause on chapter screens.
  // A range is more honest than a single value for a choice-heavy story.
  const lowerMinutes = readingMinutes + averageScenes * 0.24 + 4;
  const upperMinutes = readingMinutes + averageScenes * 0.45 + 7;
  const endings = [...endingCounts.entries()]
    .sort((left, right) => right[1] - left[1])
    .map(([name, count]) => `${name} ${((count / results.length) * 100).toFixed(1)}%`)
    .join(" / ");

  report.push(
    `| ${strategy.label} | ${averageScenes.toFixed(1)} | 約${Math.round(lowerMinutes)}〜${Math.round(upperMinutes)}分 | ${formatSubscribers(averageSubscribers)} | ${formatSubscribers(Math.min(...subscribers))} | ${formatSubscribers(Math.max(...subscribers))} | ${endings} |`
  );
  const hundredBillionVideos = results.filter((result) =>
    result.state.flags.includes("ch5_hundred_billion_achieved")
  ).length;
  moneySummaries.push(
    `| ${strategy.label} | ${formatMoney(balances.reduce((sum, value) => sum + value, 0) / balances.length)} | ${formatMoney(Math.min(...balances))} | ${formatMoney(Math.max(...balances))} | ${((hundredBillionVideos / results.length) * 100).toFixed(1)}% |`
  );
}

report.push(
  "",
  "## 所持金の変動",
  "",
  "最終所持金はエンディングごとの固定値ではない。上京時の2万円へ、各選択の収益、生活費、制作費、投資、清算を順番に反映した結果。",
  "",
  "| 方針 | 平均所持金 | 最小 | 最大 | 100億円達成動画 |",
  "|---|---:|---:|---:|---:|",
  ...moneySummaries,
  "",
  "### ランダム選択時のエンディング別残高",
  "",
  "| エンディング | 最小 | 最大 |",
  "|---|---:|---:|",
  ...[...randomEndingBalances.entries()]
    .sort(([left], [right]) => left.localeCompare(right, "ja"))
    .map(([ending, balances]) =>
      `| ${ending} | ${formatMoney(Math.min(...balances))} | ${formatMoney(Math.max(...balances))} |`
    ),
  "",
  "## イベント網羅",
  "",
  `- 全イベント: ${allEvents.length}件`,
  `- 5,500周で到達: ${globallySeen.size}件`,
  `- 到達率: ${((globallySeen.size / allEvents.length) * 100).toFixed(1)}%`,
  "",
  ...(() => {
    const unseen = allEvents.filter((event) => !globallySeen.has(event.id));
    const unseenConditional = unseen.filter(
      (event) => event.when && Object.keys(event.when).length > 0
    );
    return [
      `- 未観測: ${unseen.map((event) => `\`${event.id}\``).join("、") || "なし"}`,
      "",
      unseenConditional.length === 0
        ? "未観測イベントはすべて、どの条件付き候補にも入れなかった場合だけ使う安全用フォールバックである。条件を持つ物語分岐は全件到達した。"
        : `条件付きで未観測のイベント: ${unseenConditional.map((event) => `\`${event.id}\``).join("、")}`
    ];
  })(),
  "",
  "希少イベントも初回から出現候補に入り、本編slotを消費しない追加場面として低確率で挿入される。未閲覧場面は抽選で優先されるが、周回数によるロックはない。",
  ""
);

await writeFile("docs/balance-report.md", report.join("\n"), "utf8");
console.log(report.join("\n"));
