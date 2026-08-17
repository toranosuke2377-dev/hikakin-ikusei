import { useEffect } from "react";
import { getVisibleChoices, type ChoiceResolution } from "../game/engine";
import type { EventChoice, GameState, MetaProgress, StoryEvent } from "../game/types";
import { ResultPanel } from "./ResultPanel";
import { VisualStage } from "./VisualStage";
import { getBranchNotice, getDecisionPrompt } from "../game/storyPresentation";

interface StorySceneProps {
  state: GameState;
  meta: MetaProgress;
  event: StoryEvent;
  chapterLabel: string;
  selected?: { choice: EventChoice; resolution: ChoiceResolution };
  interactionsBlocked?: boolean;
  onChoose: (choice: EventChoice) => void;
  onContinue: () => void;
}

export function StoryScene({
  state,
  meta,
  event,
  chapterLabel,
  selected,
  interactionsBlocked = false,
  onChoose,
  onContinue
}: StorySceneProps) {
  const choices = getVisibleChoices(event, state, meta);
  const isRare = event.tags?.includes("rare") ?? false;
  const isNewRare = isRare && !meta.seenEvents.includes(event.id);
  const branchNotice = getBranchNotice(event);
  const decisionPrompt = getDecisionPrompt(event);

  useEffect(() => {
    if (selected || interactionsBlocked) return undefined;
    const listener = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.altKey || keyboardEvent.ctrlKey || keyboardEvent.metaKey) return;
      const index = Number(keyboardEvent.key) - 1;
      const item = choices[index];
      if (item) onChoose(item);
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [choices, interactionsBlocked, onChoose, selected]);

  return (
    <main className="story-layout">
      <VisualStage event={event} chapterLabel={chapterLabel} />
      {selected ? (
        <ResultPanel
          event={event}
          choice={selected.choice}
          resolution={selected.resolution}
          onContinue={onContinue}
        />
      ) : (
        <section className="story-panel">
          <header>
            <span className="eyebrow">
              {isRare
                ? `${isNewRare ? "NEW " : ""}MEMORY · 希少な記憶`
                : `STORY ${String(state.slot + 1).padStart(2, "0")}`}
            </span>
            <h1>{event.title}</h1>
          </header>
          <div className="story-panel__body">
            {branchNotice ? <p className="branch-notice"><span>分岐発生</span>{branchNotice}</p> : null}
            {event.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {event.quote ? (
              <blockquote>
                {event.speaker ? <span>{event.speaker}</span> : null}
                「{event.quote}」
              </blockquote>
            ) : null}
          </div>
          <div className="decision-prompt">
            <span>DECISION</span>
            <strong>{decisionPrompt}</strong>
          </div>
          <div className="choice-list" aria-label="選択肢">
            {choices.map((item, index) => (
              <button
                className={`choice-button choice-button--${item.tone ?? "steady"}`}
                key={item.id}
                onClick={() => onChoose(item)}
                disabled={interactionsBlocked}
              >
                <span className="choice-button__number">{index + 1}</span>
                <span>
                  <strong>{item.text}</strong>
                  {item.subtext ? <small>{item.subtext}</small> : null}
                </span>
                <i>→</i>
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
