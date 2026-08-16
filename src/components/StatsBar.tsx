import { formatMoney, formatSubscribers } from "../game/format";
import type { GameState } from "../game/types";

interface StatsBarProps {
  state: GameState;
}

export function StatsBar({ state }: StatsBarProps) {
  const quickStats = [
    { label: "登録者", value: formatSubscribers(state.stats.subscribers), detail: "人" },
    { label: "所持金", value: formatMoney(state.stats.money), detail: "" },
    { label: "体力", value: state.stats.energy, detail: "/100" },
    { label: "信用", value: state.stats.trust, detail: "/100" }
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
