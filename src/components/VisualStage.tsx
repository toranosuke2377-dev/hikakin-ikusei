import type { StoryEvent } from "../game/types";
import { AssetImage } from "./AssetImage";
import { AssetVideo } from "./AssetVideo";

interface VisualStageProps {
  event: StoryEvent;
  chapterLabel: string;
}

export function VisualStage({ event, chapterLabel }: VisualStageProps) {
  const { visual } = event;
  const portraitKey = visual.portrait
    ? visual.expression && !/\.[a-z0-9]+$/i.test(visual.portrait)
      ? `${visual.portrait}_${visual.expression}`
      : visual.portrait
    : undefined;

  return (
    <section className={`visual-stage visual-stage--${visual.accent ?? "blue"}`}>
      <AssetImage assetKey={visual.background} className="visual-stage__background" alt="" />
      {visual.video ? <AssetVideo assetKey={visual.video} className="visual-stage__background" /> : null}
      <div className="visual-stage__wash" />
      {visual.eventCg ? (
        <AssetImage assetKey={visual.eventCg} className="visual-stage__event-cg" alt={event.title} />
      ) : null}
      {portraitKey ? (
        <AssetImage
          assetKey={portraitKey}
          className="visual-stage__portrait"
          alt={event.speaker ?? "ヒカキン"}
        />
      ) : null}
      <div className="visual-stage__placeholder" aria-hidden="true">
        <span>{chapterLabel}</span>
        <strong>{event.title}</strong>
        <small>ARTWORK SLOT · {visual.eventCg ?? visual.background}</small>
      </div>
      <div className="visual-stage__location">
        <span>{event.date}</span>
        <strong>{event.location}</strong>
      </div>
    </section>
  );
}
