import { STAT_LABELS, formatMoney, formatSubscribers } from "../game/format";
import type { ChoiceResolution } from "../game/engine";
import type { EventChoice, StatKey, StoryEvent } from "../game/types";
import { getOutcomePresentation } from "../game/storyPresentation";

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
    .filter(({ key, value }) => value !== 0 && (key === "subscribers" || key === "money"));
  const presentation = getOutcomePresentation(event, choice, resolution);

  return (
    <section className="result-panel" aria-live="polite">
      <span className="eyebrow">選択の結果</span>
      <h2>{choice.text}</h2>
      <p className="outcome-timing"><span>TIME</span>{presentation.timing}</p>
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
        <div className="delta-row" aria-label="確認できる数字の変化">
          {deltas.map(({ key, value }) => (
            <span className={value > 0 ? "is-positive" : "is-negative"} key={key}>
              <b>{STAT_LABELS[key]} {formatDelta(key, value)}</b>
              <small>{key === "money" ? presentation.moneyReason : presentation.subscribersReason}</small>
            </span>
          ))}
        </div>
      ) : (
        <p className="result-panel__no-change">今回、登録者と所持金に変化はありません。</p>
      )}
      {presentation.carryovers.length > 0 ? (
        <div className="carryover-row" aria-label="後の物語に残る影響">
          <small>この決断は後にも残る</small>
          {presentation.carryovers.map((item) => <span key={item}>{item}</span>)}
        </div>
      ) : null}
      <div className="result-totals" aria-label="選択後の現在値">
        <span><small>現在の登録者</small><strong>{formatSubscribers(resolution.state.stats.subscribers)}人</strong></span>
        <span><small>現在の所持金</small><strong>{formatMoney(resolution.state.stats.money)}</strong></span>
      </div>
      <button className="primary-button primary-button--wide" onClick={onContinue} autoFocus>
        {event.chapter === 5 && resolution.state.slot >= 12 && !resolution.state.queuedEvent
          ? "結末を見る"
          : "物語を進める"}
        <span>→</span>
      </button>
    </section>
  );
}
