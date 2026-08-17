import { writeFile } from "node:fs/promises";
import { allEvents, endingDefinitions } from "../src/data";
import { createInitialMeta } from "../src/game/constants";
import { updateMetaAfterRun } from "../src/game/engine";
import { formatSubscribers } from "../src/game/format";
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

for (const strategy of strategies) {
  const results = [];
  const runs = strategy.key === "random" ? 5_000 : 100;
  let strategyMeta = createInitialMeta();
  for (let index = 0; index < runs; index += 1) {
    const result = simulateRun(
      allEvents,
      endingDefinitions,
      strategy.key,
      (index + 1) * 93_109,
      strategyMeta
    );
    results.push(result);
    strategyMeta = updateMetaAfterRun(strategyMeta, result.state);
  }
  const sceneCounts = results.map((result) => result.eventIds.length);
  const subscribers = results.map((result) => result.state.stats.subscribers);
  const endingCounts = new Map<string, number>();
  let totalCharacters = 0;

  for (const result of results) {
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
}

report.push(
  "",
  "## イベント網羅",
  "",
  `- 全イベント: ${allEvents.length}件`,
  `- 5,500周で到達: ${globallySeen.size}件`,
  `- 到達率: ${((globallySeen.size / allEvents.length) * 100).toFixed(1)}%`,
  "",
  "周回イベントは初回には出現せず、二周目以降に本編slotを消費しない追加場面として低確率で挿入される。到達しない通常イベントは条件の希少性を個別確認する。",
  ""
);

await writeFile("docs/balance-report.md", report.join("\n"), "utf8");
console.log(report.join("\n"));
