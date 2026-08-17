export type ChapterNumber = 1 | 2 | 3 | 4 | 5;

export type StatKey =
  | "subscribers"
  | "money"
  | "energy"
  | "expression"
  | "production"
  | "beatbox"
  | "trust";

export type HiddenKey =
  | "origin"
  | "controversy"
  | "perfectionism"
  | "fatigue"
  | "ambition";

export type RouteKey =
  | "craft"
  | "mainstream"
  | "strategy"
  | "network"
  | "controversy"
  | "stability";

export type CharacterKey =
  | "hajime"
  | "zeikin"
  | "makoto"
  | "shibata"
  | "murai"
  | "tetsu"
  | "shiruko"
  | "massuo"
  | "danke"
  | "manager"
  | "supermarket";

export type TrendKey =
  | "gaming"
  | "family"
  | "musicGlobal"
  | "controversy"
  | "brandDeals"
  | "shortVideo"
  | "challenge";

export interface GameStats extends Record<StatKey, number> {}
export interface HiddenStats extends Record<HiddenKey, number> {}
export interface RouteScores extends Record<RouteKey, number> {}
export interface Relationships extends Record<CharacterKey, number> {}

export interface Condition {
  minCompletedRuns?: number;
  maxCompletedRuns?: number;
  minStats?: Partial<GameStats>;
  maxStats?: Partial<GameStats>;
  minHidden?: Partial<HiddenStats>;
  maxHidden?: Partial<HiddenStats>;
  minRoutes?: Partial<RouteScores>;
  maxRoutes?: Partial<RouteScores>;
  minRelationships?: Partial<Relationships>;
  maxRelationships?: Partial<Relationships>;
  flagsAll?: string[];
  flagsAny?: string[];
  flagsNone?: string[];
  trendsAny?: TrendKey[];
  trendsAll?: TrendKey[];
  seenAll?: string[];
  seenNone?: string[];
}

export interface VideoRecord {
  title: string;
  views: number;
  subscribersGained: number;
  kind: string;
  chapter: ChapterNumber;
}

export interface Effect {
  stats?: Partial<GameStats>;
  setStats?: Partial<GameStats>;
  hidden?: Partial<HiddenStats>;
  routes?: Partial<RouteScores>;
  relationships?: Partial<Relationships>;
  addFlags?: string[];
  removeFlags?: string[];
  queueEvent?: string;
  video?: VideoRecord;
}

export interface EventChoice {
  id: string;
  text: string;
  subtext?: string;
  tone?: "steady" | "bold" | "warm" | "risky";
  when?: Condition;
  result: string[];
  effect: Effect;
}

export interface VisualCue {
  background: string;
  portrait?: string;
  expression?: string;
  eventCg?: string;
  video?: string;
  accent?: "blue" | "gold" | "red" | "green" | "violet";
}

export interface StoryEvent {
  id: string;
  chapter: ChapterNumber;
  slot: number;
  title: string;
  date: string;
  location: string;
  body: string[];
  speaker?: string;
  quote?: string;
  choices: EventChoice[];
  when?: Condition;
  mandatory?: boolean;
  priority?: number;
  weight?: number;
  oncePerRun?: boolean;
  tags?: string[];
  visual: VisualCue;
}

export interface EventHistoryItem {
  eventId: string;
  choiceId: string;
  chapter: ChapterNumber;
  slot: number;
}

export interface GameState {
  version: number;
  seed: number;
  chapter: ChapterNumber;
  slot: number;
  stats: GameStats;
  hidden: HiddenStats;
  routes: RouteScores;
  relationships: Relationships;
  flags: string[];
  worldTrends: TrendKey[];
  seenThisRun: string[];
  history: EventHistoryItem[];
  videos: VideoRecord[];
  queuedEvent?: string;
  finished: boolean;
  endingId?: EndingId;
}

export type EndingId =
  | "number_one"
  | "legendary_video"
  | "mastermind"
  | "street_beatboxer"
  | "controversy_king";

export interface EndingDefinition {
  id: EndingId;
  title: string;
  category: "HAPPY" | "NORMAL" | "BAD";
  priority: number;
  when?: Condition;
  body: string[];
  finalQuote: string;
  visual: VisualCue;
}

export interface MetaProgress {
  version: number;
  completedRuns: number;
  seenEvents: string[];
  unlockedEndings: EndingId[];
  unlockedVideos: string[];
  bestSubscribers: number;
  fourEmperorsUnlocked: boolean;
}

export interface ChapterDefinition {
  number: ChapterNumber;
  title: string;
  subtitle: string;
  slots: number;
  period: string;
  opening: string;
}
