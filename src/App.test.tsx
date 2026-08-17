import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import App from "./App";
import { createInitialGameState, createInitialMeta } from "./game/constants";
import { initializeRun } from "./game/engine";

describe("App", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => cleanup());

  it("タイトルから第1章の最初の選択まで進める", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText("ヒカキン育成ゲーム")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "物語を始める" }));
    expect(screen.getByRole("heading", { name: "絶対に、何者かになる。" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /東京へ向かう/ }));
    expect(screen.getByRole("heading", { name: "無名のビートボクサー" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /第1章を始める/ }));
    expect(screen.getByText("STORY 01")).toBeInTheDocument();
    expect(screen.getAllByRole("button").filter((button) => /^\d/.test(button.textContent ?? "")).length).toBeGreaterThanOrEqual(2);
  });

  it("選択後に結果を表示しオートセーブする", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "物語を始める" }));
    await user.click(screen.getByRole("button", { name: /東京へ向かう/ }));
    await user.click(screen.getByRole("button", { name: /第1章を始める/ }));

    const choices = screen.getAllByRole("button").filter((button) => /^\d/.test(button.textContent ?? ""));
    await user.click(choices[0]!);

    expect(screen.getByText("DECISION")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /物語を進める/ })).toBeInTheDocument();
    expect(localStorage.getItem("beat-to-the-top:save")).not.toBeNull();
  });

  it("プロフィールを開くとフォーカスを閉じるボタン内へ移し、閉じた後に戻す", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "物語を始める" }));
    await user.click(screen.getByRole("button", { name: /東京へ向かう/ }));
    await user.click(screen.getByRole("button", { name: /第1章を始める/ }));

    const trigger = screen.getByRole("button", { name: "プロフィール" });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "ヒカキン" });
    const close = within(dialog).getByRole("button", { name: "閉じる" });
    await waitFor(() => expect(close).toHaveFocus());

    await user.tab({ shift: true });
    expect(close).toHaveFocus();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("章の最後の結果画面で再読み込みしても次章へ復帰できる", async () => {
    const user = userEvent.setup();
    const saved = initializeRun(createInitialGameState(77));
    saved.slot = 12;
    localStorage.setItem("beat-to-the-top:save", JSON.stringify(saved));

    render(<App />);
    await user.click(screen.getByRole("button", { name: /つづきから/ }));

    expect(
      screen.getByRole("heading", { name: "一千万回の向こう側" })
    ).toBeInTheDocument();
  });

  it("第5章の最終結果画面で再読み込みしてもエンディングへ復帰できる", async () => {
    const user = userEvent.setup();
    const saved = initializeRun(createInitialGameState(88));
    saved.chapter = 5;
    saved.slot = 12;
    localStorage.setItem("beat-to-the-top:save", JSON.stringify(saved));

    render(<App />);
    await user.click(screen.getByRole("button", { name: /つづきから/ }));

    expect(
      screen.getByRole("heading", { name: "路上のビートボクサー" })
    ).toBeInTheDocument();
  });

  it("周回記録に発見済みエンディングと代表動画を表示する", async () => {
    const user = userEvent.setup();
    const meta = createInitialMeta();
    meta.completedRuns = 1;
    meta.unlockedEndings = ["number_one"];
    meta.unlockedVideos = ["スーパーマッチ棒ブラザーズ BGM Beatbox"];
    meta.bestSubscribers = 20_000_000;
    localStorage.setItem("beat-to-the-top:meta", JSON.stringify(meta));

    render(<App />);
    await user.click(screen.getByRole("button", { name: "記録" }));

    expect(screen.getByRole("heading", { name: "日本一のYouTuber" })).toBeInTheDocument();
    expect(screen.getByText("スーパーマッチ棒ブラザーズ BGM Beatbox")).toBeInTheDocument();
    expect(screen.getByText("2000万", { exact: false })).toBeInTheDocument();
  });
});
