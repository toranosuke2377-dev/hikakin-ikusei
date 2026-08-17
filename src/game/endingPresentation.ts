import type { EndingDefinition, GameState } from "./types";

/**
 * Ending IDs stay limited to the five designed destinies, while the displayed
 * epilogue reflects the concrete state that reached that destiny.
 */
export const getEndingPresentation = (
  ending: EndingDefinition,
  state: GameState
): EndingDefinition => {
  if (ending.id !== "street_beatboxer") return ending;

  if (state.stats.money <= 1_500_000) return ending;

  if (state.stats.money <= 5_000_000) {
    return {
      ...ending,
      title: "路上のビートボクサー・生活再建",
      body: [
        "動画活動は終わった。事務所と契約を清算したヒカキンは、生活を立て直すためスーパーへ戻った。手元には数か月をしのげる資金があるが、動画だけで暮らせる状態ではない。",
        "社員寮を選んだのは、今夜を越せないからではなく、家賃を抑えてもう一度生活の形を作るためだった。朝は品出しと清掃を行い、給料日とシフトで一か月を組み立てる。",
        "夜には古いマイクを持って駅前へ出る。足を止める人は少ない。それでも十八歳のころより上手くなったビートだけは、失敗したチャンネルとは別に残っている。",
        "最新動画は5,023再生で止まったまま。すぐに再挑戦できる勢いはないが、借金に追われてすべてを捨てたわけでもない。残った金を生活に使うか、最後の一本へ使うかはまだ決めていない。"
      ],
      finalQuote: "明日のシフトが終わったら、もう一回だけ撮ってみるか。"
    };
  }

  return {
    ...ending,
    title: "路上のビートボクサー・静かな撤退",
    category: "NORMAL",
    body: [
      "ヒカキンはYouTubeの日本一争いから退いた。事業の清算後も生活を選び直せるだけの貯金は残り、すぐに住む場所や食事を失う状態ではない。",
      "それでも、動画活動を続ければ制作費と人件費で残高を減らし続ける。ヒカキンはチャンネルを止め、スーパーの仕事で毎月の生活費を賄う道を選んだ。",
      "夜、古いマイクを持って駅前へ向かう。路上に立つのは金に困ったからではない。かつて何百万人へ届いた音を、数字が止まったあともやめられないからだった。",
      "最新動画は5,023再生。日本一にも伝説にもなれなかったが、残った貯金と仕事がある。完全な敗北ではなく、夢を仕事から切り離して持ち続ける、静かな撤退だった。"
    ],
    finalQuote: "金じゃなくて、まだこの音をやめられない。"
  };
};
