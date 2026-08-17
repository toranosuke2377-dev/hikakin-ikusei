import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dataDirectory = join(projectRoot, "src", "data");
const outputFile = join(projectRoot, "docs", "asset-manifest.md");

const sourceFiles = (await readdir(dataDirectory))
  .filter((name) => name.endsWith(".ts") && name !== "helpers.ts" && name !== "index.ts")
  .sort();

const assets = new Map([
  ["ui", new Set(["ui/title_hero"])],
  ["background", new Set()],
  ["portrait", new Set()],
  ["eventCg", new Set()],
  ["video", new Set()]
]);

for (const sourceFile of sourceFiles) {
  const source = await readFile(join(dataDirectory, sourceFile), "utf8");
  const expression = /(background|portrait|eventCg|video)\s*:\s*["']([^"']+)["']/g;
  for (const match of source.matchAll(expression)) {
    assets.get(match[1])?.add(match[2]);
  }

  const visualBlock = /visual\s*:\s*\{([\s\S]*?)\}/g;
  for (const block of source.matchAll(visualBlock)) {
    const portrait = block[1].match(/portrait\s*:\s*["']([^"']+)["']/)?.[1];
    const expressionName = block[1].match(/expression\s*:\s*["']([^"']+)["']/)?.[1];
    if (portrait && expressionName && !/\.[a-z0-9]+$/i.test(portrait)) {
      assets.get("portrait")?.delete(portrait);
      assets.get("portrait")?.add(`${portrait}_${expressionName}`);
    }
  }
}

const withExtension = (value, extension) => /\.[a-z0-9]+$/i.test(value) ? value : `${value}.${extension}`;

const section = (title, values, extension) => [
  `## ${title}（${values.size}点）`,
  "",
  ...[...values].sort().map((value) => `- \`public/assets/${withExtension(value, extension)}\``),
  ""
];

const output = [
  "# 素材マニフェスト",
  "",
  "このファイルは `npm run assets:manifest` でシナリオデータから自動生成されます。",
  "立ち絵はイベントの `expression` に応じて `_表情名` をファイル名へ追加します。",
  "",
  ...section("UI", assets.get("ui"), "webp"),
  ...section("背景", assets.get("background"), "webp"),
  ...section("立ち絵（基本キー）", assets.get("portrait"), "webp"),
  ...section("イベントCG", assets.get("eventCg"), "webp"),
  ...section("動画", assets.get("video"), "mp4")
].join("\n");

await writeFile(outputFile, output, "utf8");
console.log(`${relative(projectRoot, outputFile)} を生成しました。`);
