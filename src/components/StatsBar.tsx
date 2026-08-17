import { formatMoney, formatSubscribers } from "../game/format";
import type { GameState } from "../game/types";

interface StatsBarProps {
  state: GameState;
}

export function StatsBar({ state }: StatsBarProps) {
  const quickStats = [
    { label: "登録者", value: formatSubscribers(state.stats.subscribers), detail: "人" },
    { label: "所持金", value: formatMoney(state.stats.money), detail: "" }
  ];

  return (
    <div className="stats-bar" aria-label="現在の状態">
      {quickStats.map((stat) => (
        <div className="quick-stat" key={stat.label}>
          <span>{stat.label}</span>
          <strong>
            {stat.value}
            <small>{stat.detail}</small>
          </strong>
        </div>
      ))}
    </div>
  );
}
