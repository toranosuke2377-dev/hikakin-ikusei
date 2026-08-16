import type { StoryEvent } from "../game/types";
import { chapter1Events } from "./chapter1";
import { chapter2Events } from "./chapter2";
import { chapter3Events } from "./chapter3";
import { chapter4Events } from "./chapter4";
import { chapter5Events } from "./chapter5";
import { endingDefinitions } from "./endings";
import { replayEvents } from "./replayEvents";

export const allEvents: StoryEvent[] = [
  ...chapter1Events,
  ...chapter2Events,
  ...chapter3Events,
  ...chapter4Events,
  ...chapter5Events,
  ...replayEvents
];

export { endingDefinitions };
