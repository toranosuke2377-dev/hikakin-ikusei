import type { Condition, GameState, MetaProgress } from "./types";

const meetsMinimums = <T extends Record<string, number>>(
  values: T,
  minimums: Partial<T> | undefined
): boolean =>
  !minimums ||
  Object.entries(minimums).every(([key, minimum]) => {
    const current = values[key as keyof T];
    return typeof current === "number" && Number(current) >= Number(minimum ?? 0);
  });

const meetsMaximums = <T extends Record<string, number>>(
  values: T,
  maximums: Partial<T> | undefined
): boolean =>
  !maximums ||
  Object.entries(maximums).every(([key, maximum]) => {
    const current = values[key as keyof T];
    return typeof current === "number" && Number(current) <= Number(maximum ?? 0);
  });

export const meetsCondition = (
  condition: Condition | undefined,
  state: GameState,
  meta?: MetaProgress
): boolean => {
  if (!condition) return true;

  const flags = new Set(state.flags);
  const seen = new Set([...(meta?.seenEvents ?? []), ...state.seenThisRun]);
  const completedRuns = meta?.completedRuns ?? 0;

  return (
    (condition.minCompletedRuns === undefined ||
      completedRuns >= condition.minCompletedRuns) &&
    (condition.maxCompletedRuns === undefined ||
      completedRuns <= condition.maxCompletedRuns) &&
    meetsMinimums(state.stats, condition.minStats) &&
    meetsMaximums(state.stats, condition.maxStats) &&
    meetsMinimums(state.hidden, condition.minHidden) &&
    meetsMaximums(state.hidden, condition.maxHidden) &&
    meetsMinimums(state.routes, condition.minRoutes) &&
    meetsMaximums(state.routes, condition.maxRoutes) &&
    meetsMinimums(state.relationships, condition.minRelationships) &&
    meetsMaximums(state.relationships, condition.maxRelationships) &&
    (!condition.flagsAll || condition.flagsAll.every((flag) => flags.has(flag))) &&
    (!condition.flagsAny || condition.flagsAny.some((flag) => flags.has(flag))) &&
    (!condition.flagsNone || condition.flagsNone.every((flag) => !flags.has(flag))) &&
    (!condition.trendsAny ||
      condition.trendsAny.some((trend) => state.worldTrends.includes(trend))) &&
    (!condition.trendsAll ||
      condition.trendsAll.every((trend) => state.worldTrends.includes(trend))) &&
    (!condition.seenAll || condition.seenAll.every((eventId) => seen.has(eventId))) &&
    (!condition.seenNone || condition.seenNone.every((eventId) => !seen.has(eventId)))
  );
};
