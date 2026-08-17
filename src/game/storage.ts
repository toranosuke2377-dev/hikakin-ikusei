import { createInitialMeta, SAVE_VERSION } from "./constants";
import type { GameState, MetaProgress } from "./types";

const SAVE_KEY = "beat-to-the-top:save";
const META_KEY = "beat-to-the-top:meta";

const safeParse = <T,>(value: string | null): T | null => {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

export const loadGame = (): GameState | null => {
  const saved = safeParse<GameState>(localStorage.getItem(SAVE_KEY));
  return saved?.version === SAVE_VERSION ? saved : null;
};

export const saveGame = (state: GameState): void => {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
};

export const clearGame = (): void => {
  localStorage.removeItem(SAVE_KEY);
};

export const loadMeta = (): MetaProgress => {
  const saved = safeParse<MetaProgress>(localStorage.getItem(META_KEY));
  return saved?.version === SAVE_VERSION ? saved : createInitialMeta();
};

export const saveMeta = (meta: MetaProgress): void => {
  localStorage.setItem(META_KEY, JSON.stringify(meta));
};
