import type { StatKey, TrendKey } from "./types";

export const formatNumber = (value: number): string =>
  new Intl.NumberFormat("ja-JP").format(Math.round(value));

export const formatSubscribers = (value: number): string => {
  if (value >= 100_000_000) return `${(value / 100_000_000).toFixed(2)}億`;
  if (value >= 10_000) return `${(value / 10_000).toFixed(value >= 1_000_000 ? 0 : 1)}万`;
  return formatNumber(value);
};

export const formatMoney = (value: number): string => {
  const sign = value < 0 ? "−" : "";
  const absolute = Math.abs(value);
  if (absolute >= 100_000_000) return `${sign}${(absolute / 100_000_000).toFixed(1)}億円`;
  if (absolute >= 10_000) return `${sign}${(absolute / 10_000).toFixed(absolute >= 1_000_000 ? 0 : 1)}万円`;
  return `${sign}${formatNumber(absolute)}円`;
};

export const STAT_LABELS: Record<StatKey, string> = {
  subscribers: "登録者",
  money: "所持金",
  energy: "体力",
  expression: "表現力",
  production: "制作力",
  beatbox: "ビートボックス",
  trust: "信用"
};

export const TREND_LABELS: Record<TrendKey, string> = {
  gaming: "ゲーム実況ブーム",
  family: "ファミリー視聴の拡大",
  musicGlobal: "音楽動画の海外流行",
  controversy: "炎上動画ブーム",
  brandDeals: "企業案件の急増",
  shortVideo: "短尺動画の台頭",
  challenge: "大型チャレンジ流行"
};
