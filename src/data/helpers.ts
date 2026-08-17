import type { Condition, Effect, EventChoice, StoryEvent } from "../game/types";

const INFLAMMATORY_FLAGS = new Set([
  "shibata_joined",
  "makoto_event_monetized",
  "ch4_false_expose",
  "ch5_final_scandal",
  "ch5_fabrication_started",
  "ch5_fabrication_completed",
  "ch5_scandal_released",
  "ch5_fabrication_published",
  "ch5_failure_monetized",
  "ch5_fire_never_ends",
  "ch5_comments_as_fuel"
]);

export const isInflammatoryEffect = (effect: Effect): boolean =>
  (effect.hidden?.controversy ?? 0) >= 10 ||
  (effect.routes?.controversy ?? 0) >= 7 ||
  (effect.addFlags ?? []).some((flag) => INFLAMMATORY_FLAGS.has(flag));

const withInflammationCost = (effect: Effect): Effect => {
  if (!isInflammatoryEffect(effect)) return effect;
  return {
    ...effect,
    stats: {
      ...(effect.stats ?? {}),
      subscribers: -500_000
    },
    video: effect.video
      ? { ...effect.video, subscribersGained: -500_000 }
      : undefined
  };
};

export const choice = (
  id: string,
  text: string,
  result: string | string[],
  effect: Effect,
  options: Pick<EventChoice, "subtext" | "tone" | "when"> = {}
): EventChoice => {
  const inflammatory = isInflammatoryEffect(effect);
  return {
    id,
    text,
    result: [
      ...(Array.isArray(result) ? result : [result]),
      ...(inflammatory
        ? ["炎上で再生数と注目は集まったが、解除が新規登録を上回り、登録者は約五十万人減少した。"]
        : [])
    ],
    effect: withInflammationCost(effect),
    ...options
  };
};

export const event = (definition: StoryEvent): StoryEvent => definition;

export const when = (condition: Condition): Condition => condition;
