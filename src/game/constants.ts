import type {
  ChapterDefinition,
  GameState,
  MetaProgress,
  Relationships,
  RouteScores
} from "./types";

export const SAVE_VERSION = 1;

export const CHAPTERS: ChapterDefinition[] = [
  {
    number: 1,
    title: "無名のビートボクサー",
    subtitle: "何者でもない。でも、何者かにはなってやる。",
    slots: 12,
    period: "2008 — 2010",
    opening: "所持金二万円。安いマイク。東京の社員寮から、すべてが始まる。"
  },
  {
    number: 2,
    title: "一千万回の向こう側",
    subtitle: "一度見つかった。次は、忘れられないために。",
    slots: 12,
    period: "2010 — 2013",
    opening: "突然の大ヒットは、成功ではなく期待という借金だった。"
  },
  {
    number: 3,
    title: "YouTuber新時代",
    subtitle: "一人で始めた夢が、巨大な産業へ変わっていく。",
    slots: 12,
    period: "2013 — 2017",
    opening: "仲間、企業、音楽、大型企画。画面の向こう側が一気に広がる。"
  },
  {
    number: 4,
    title: "人気という怪物",
    subtitle: "数字は味方だった。数字だけを見るまでは。",
    slots: 12,
    period: "2017 — 2021",
    opening: "頂点が見え始めたころ、成功の影もまた輪郭を持ち始めた。"
  },
  {
    number: 5,
    title: "何者になったのか",
    subtitle: "最後の一本に、選んできた人生のすべてを込める。",
    slots: 12,
    period: "2021 — 最終決戦",
    opening: "日本一まで、あと一歩。その一歩が、これまでで最も遠い。"
  }
];

const initialRoutes: RouteScores = {
  craft: 0,
  mainstream: 0,
  strategy: 0,
  network: 0,
  controversy: 0,
  stability: 0
};

const initialRelationships: Relationships = {
  hajime: 0,
  zeikin: 20,
  makoto: 0,
  shibata: 0,
  murai: 0,
  tetsu: 0,
  shiruko: 0,
  massuo: 15,
  danke: 0,
  manager: 0,
  supermarket: 0
};

export const createInitialGameState = (seed = Date.now()): GameState => ({
  version: SAVE_VERSION,
  seed,
  chapter: 1,
  slot: 0,
  stats: {
    subscribers: 0,
    money: 20_000,
    energy: 80,
    expression: 8,
    production: 6,
    beatbox: 28,
    trust: 50
  },
  hidden: {
    origin: 70,
    controversy: 0,
    perfectionism: 62,
    fatigue: 5,
    ambition: 90
  },
  routes: { ...initialRoutes },
  relationships: { ...initialRelationships },
  flags: ["ambition_never_nobody"],
  worldTrends: [],
  seenThisRun: [],
  history: [],
  videos: [],
  finished: false
});

export const createInitialMeta = (): MetaProgress => ({
  version: SAVE_VERSION,
  completedRuns: 0,
  seenEvents: [],
  unlockedEndings: [],
  unlockedVideos: [],
  bestSubscribers: 0,
  fourEmperorsUnlocked: false
});
