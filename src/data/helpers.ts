import type { Condition, Effect, EventChoice, StoryEvent } from "../game/types";

export const choice = (
  id: string,
  text: string,
  result: string | string[],
  effect: Effect,
  options: Pick<EventChoice, "subtext" | "tone" | "when"> = {}
): EventChoice => ({
  id,
  text,
  result: Array.isArray(result) ? result : [result],
  effect,
  ...options
});

export const event = (definition: StoryEvent): StoryEvent => definition;

export const when = (condition: Condition): Condition => condition;
