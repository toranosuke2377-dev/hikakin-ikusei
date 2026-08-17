import { STAT_LABELS, formatMoney, formatSubscribers } from "../game/format";
import type { ChoiceResolution } from "../game/engine";
import type { EventChoice, StatKey, StoryEvent } from "../game/types";

interface ResultPanelProps {
  event: StoryEvent;
  choice: EventChoice;
  resolution: ChoiceResolution;
  onContinue: () => void;
}

const formatDelta = (key: StatKey, value: number): string => {
  const sign = value > 0 ? "+" : "";
  if (key === "money") return `${sign}${formatMoney(value)}`;
  if (key === "subscribers") return `${sign}${formatSubscribers(value)}人`;
  return `${sign}${Math.round(value)}`;
};

export function ResultPanel({ event, choice, resolution, onContinue }: ResultPanelProps) {
  const deltas = (Object.keys(resolution.state.stats) as StatKey[])
    .map((key) => ({ key, value: resolution.state.stats[key] - resolution.before.stats[key] }))
    .filter(({ value }) => value !== 0);

  return (
    <section className="result-panel" aria-live="polite">
      <span className="eyebrow">DECISION</span>
      <h2>{choice.text}</h2>
      <div className="result-panel__copy">
        {choice.result.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {choice.effect.video ? (
        <div className="video-result">
          <span>NEW VIDEO</span>
          <strong>{choice.effect.video.title}</strong>
          <div>
            <b>{new Intl.NumberFormat("ja-JP").format(choice.effect.video.views)} 回再生</b>
            <small>
              登録者 {choice.effect.video.subscribersGained > 0 ? "+" : ""}
              {new Intl.NumberFormat("ja-JP").format(choice.effect.video.subscribersGained)}
            </small>
          </div>
        </div>
      ) : null}
      {deltas.length > 0 ? (
        <div className="delta-row" aria-label="能力の変化">
          {deltas.map(({ key, value }) => (
            <span className={value > 0 ? "is-positive" : "is-negative"} key={key}>
              {STAT_LABELS[key]} {formatDelta(key, value)}
            </span>
          ))}
        </div>
      ) : null}
      <button className="primary-button primary-button--wide" onClick={onContinue} autoFocus>
        {event.chapter === 5 && resolution.state.slot >= 12 && !resolution.state.queuedEvent
          ? "結末を見る"
          : "物語を進める"}
        <span>→</span>
      </button>
    </section>
  );
}
