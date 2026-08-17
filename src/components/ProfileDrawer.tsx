import { useEffect, useRef } from "react";
import { TREND_LABELS, formatMoney, formatNumber, formatSubscribers } from "../game/format";
import type { GameState } from "../game/types";

interface ProfileDrawerProps {
  state: GameState;
  open: boolean;
  onClose: () => void;
}

export function ProfileDrawer({ state, open, onClose }: ProfileDrawerProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    // Defer until the click that opened the drawer has fully completed;
    // otherwise the browser can restore focus to the trigger afterwards.
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    const handleDialogKeys = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") {
        keyboardEvent.preventDefault();
        onClose();
        return;
      }
      if (keyboardEvent.key !== "Tab") return;

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]):not([tabindex="-1"]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (keyboardEvent.shiftKey && document.activeElement === first) {
        keyboardEvent.preventDefault();
        last.focus();
      } else if (!keyboardEvent.shiftKey && document.activeElement === last) {
        keyboardEvent.preventDefault();
        first.focus();
      } else if (!dialogRef.current?.contains(document.activeElement)) {
        keyboardEvent.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleDialogKeys);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleDialogKeys);
      previouslyFocused?.focus();
    };
  }, [onClose, open]);

  return (
    <div className={`drawer-shell ${open ? "drawer-shell--open" : ""}`} aria-hidden={!open}>
      <button className="drawer-shell__backdrop" onClick={onClose} aria-label="閉じる" tabIndex={open ? 0 : -1} />
      <aside id="profile-drawer" ref={dialogRef} className="profile-drawer" aria-labelledby="profile-title" role="dialog" aria-modal="true">
        <header>
          <div>
            <span className="eyebrow">STATUS</span>
            <h2 id="profile-title">ヒカキン</h2>
            <p>登録者 {formatSubscribers(state.stats.subscribers)}人</p>
            <p>所持金 {formatMoney(state.stats.money)}</p>
          </div>
          <button ref={closeButtonRef} className="icon-button" onClick={onClose} aria-label="閉じる" tabIndex={open ? 0 : -1}>×</button>
        </header>

        <section>
          <h3>この物語の原点</h3>
          <ul className="relationship-list profile-origin-list">
            <li><span>生まれ</span><strong>1989年4月・新潟</strong></li>
            <li><span>競技歴</span><strong>小3〜高校・スキージャンプ全国8位</strong></li>
            <li><span>最初の武器</span><strong>独学のビートボックス</strong></li>
            <li><span>上京時</span><strong>所持金2万円・スーパー社員寮</strong></li>
          </ul>
        </section>

        <section>
          <h3>時代の流れ</h3>
          <div className="tag-cloud tag-cloud--trend">
            {state.worldTrends.map((trend) => <span key={trend}>{TREND_LABELS[trend]}</span>)}
          </div>
        </section>

        <section>
          <h3>代表動画</h3>
          {state.videos.length > 0 ? (
            <ul className="video-list">
              {[...state.videos].reverse().slice(0, 5).map((video, index) => (
                <li key={`${video.title}-${index}`}>
                  <span>{video.title}</span>
                  <strong>{formatNumber(video.views)}回再生</strong>
                </li>
              ))}
            </ul>
          ) : <p className="empty-copy">まだ代表動画はありません。</p>}
        </section>
      </aside>
    </div>
  );
}
