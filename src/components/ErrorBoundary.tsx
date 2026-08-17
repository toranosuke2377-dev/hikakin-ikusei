import { Component, type ErrorInfo, type ReactNode } from "react";
import { clearGame } from "../game/storage";

interface Props {
  children: ReactNode;
}

interface State {
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {};

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Game render failure", error, info);
  }

  private reset = () => {
    clearGame();
    window.location.reload();
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="fatal-error">
        <span className="eyebrow">RECOVERY MODE</span>
        <h1>物語の読み込みに失敗しました</h1>
        <p>{this.state.error.message}</p>
        <button className="primary-button" onClick={this.reset}>セーブを初期化して戻る</button>
      </main>
    );
  }
}
