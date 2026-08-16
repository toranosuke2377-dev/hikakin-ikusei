import type { StoryEvent } from "../game/types";
import { choice, event as makeEvent } from "./helpers";

// 第5章は各slotが固定アンカー。全候補をmandatoryにそろえ、priorityでvariantを選ぶ。
const event = (definition: StoryEvent): StoryEvent =>
  makeEvent({ ...definition, mandatory: true });

/**
 * 第5章は過去四章の蓄積を「最後の一本」へ収束させる章。
 * 各slotには必ず無条件イベントを置き、条件variantを高priorityで上書きする。
 */
export const chapter5Events: StoryEvent[] = [
  // ───────────────────────── slot 0: 現在地 ─────────────────────────
  event({
    id: "ch5_opening_front_runner",
    chapter: 5,
    slot: 0,
    title: "頂上まで、あと一歩",
    date: "2021年・冬",
    location: "ヒカキンの撮影部屋",
    body: [
      "登録者数のグラフは、かつて想像さえできなかった高さまで伸びていた。けれど日本一の線だけが、画面の上でまだ遠い。",
      "机には安い初代マイクが置かれている。成功を飾る記念品ではない。迷った夜に、自分がどこから来たかを確かめるための道具だ。",
      "ヒカキンは次の企画書を閉じた。ここから先は、一本の失敗が何百万人の期待を裏切る。だからこそ、守るだけでは届かない。"
    ],
    speaker: "ヒカキン",
    quote: "何者かになりたかった。今度は、どんな何者になるかを決める番だ。",
    choices: [
      choice("ch5_front_runner_attack", "日本一を取りにいくと宣言する", ["目標を口にした瞬間、怖さは責任へ変わった。", "視聴者も競争相手も、次の一本を待ち始める。"], { stats: { subscribers: 250_000, trust: 2, energy: -5 }, hidden: { ambition: 6 }, routes: { mainstream: 5 }, addFlags: ["ch5_title_race_declared"] }, { tone: "bold" }),
      choice("ch5_front_runner_listen", "視聴者が今見たいものを調べる", ["数字ではなく、長く見続けた人の言葉から読み始めた。", "派手さの裏で求められていたのは、ヒカキン自身の実感だった。"], { stats: { production: 3, trust: 4, energy: -4 }, hidden: { origin: 3 }, routes: { strategy: 4 }, addFlags: ["ch5_audience_audit"] }, { tone: "steady" }),
      choice("ch5_front_runner_silence", "宣言せず、一本の試作を始める", ["誰にも見せないテスト撮影を重ねた。", "競争の音を消すと、口から出る一音だけが鮮明になった。"], { stats: { production: 4, beatbox: 3, energy: -8 }, hidden: { perfectionism: 3, origin: 4 }, routes: { craft: 5 }, addFlags: ["ch5_secret_prototype"] }, { tone: "steady" })
    ],
    when: { minStats: { subscribers: 10_000_000, trust: 58 }, maxHidden: { controversy: 54 } },
    priority: 80,
    oncePerRun: true,
    tags: ["opening", "title-race", "hikakin-focus"],
    visual: { background: "backgrounds/ch5/studio-night.webp", portrait: "portraits/hikakin/determined.webp", expression: "determined", accent: "gold" }
  }),
  event({
    id: "ch5_opening_wounded_channel",
    chapter: 5,
    slot: 0,
    title: "数字の傷跡",
    date: "2021年・冬",
    location: "編集室",
    body: [
      "登録者は多い。それでも新しい動画を公開するたび、過去の疑惑と批判がコメント欄へ戻ってくる。",
      "謝ったこと、黙ったこと、数字を選んだこと。消した動画よりも、選んだ態度のほうが長く残っていた。",
      "日本一へ走ることはできる。ただし、傷を隠したまま速さだけを上げれば、次に転ぶ場所はもっと高い。"
    ],
    speaker: "ヒカキン",
    quote: "忘れてもらうんじゃない。もう一度、信じてもらえるかだ。",
    choices: [
      choice("ch5_wounded_explain", "過去の判断を整理した動画を出す", ["言い訳に聞こえないよう、事実と責任を切り分けて話した。", "登録解除は増えたが、残った視聴者との関係は少し変わった。"], { stats: { subscribers: -180_000, trust: 9, production: 2 }, hidden: { controversy: -8, ambition: -2 }, routes: { stability: 4 }, addFlags: ["ch5_final_accountability"] }, { tone: "steady" }),
      choice("ch5_wounded_masterpiece", "説明より作品で信頼を取り戻す", ["言葉を減らし、完成度で応える準備を始めた。", "成功すれば強い。しかし失敗すれば、逃げたという評価だけが残る。"], { stats: { production: 5, energy: -10 }, hidden: { perfectionism: 5, controversy: -2 }, routes: { craft: 6 }, addFlags: ["ch5_redemption_by_work"] }, { tone: "bold" }),
      choice("ch5_wounded_provoke", "批判ごと話題へ変える", ["切り抜かれやすい言葉を選び、注目を奪い返した。", "再生数は戻った。ただし、信頼を回復する道はまた細くなった。"], { stats: { subscribers: 420_000, trust: -9, money: 1_200_000 }, hidden: { controversy: 10, ambition: 4 }, routes: { controversy: 8 }, addFlags: ["ch5_doubled_down"] }, { tone: "risky" })
    ],
    when: { flagsAny: ["ch5_entry_recovery", "ch5_entry_controversy", "ch5_redemption_available", "ch5_fragile_base", "ch4_sponsor_distrust", "makoto_complicity_seed", "makoto_complicity_denied", "shibata_joined"], minHidden: { controversy: 35 } },
    priority: 90,
    oncePerRun: true,
    tags: ["opening", "redemption", "controversy"],
    visual: { background: "backgrounds/ch5/edit-room-rain.webp", portrait: "portraits/hikakin/tired.webp", expression: "tired", accent: "red" }
  }),
  event({
    id: "ch5_opening_craftsman",
    chapter: 5,
    slot: 0,
    title: "まだ完成していない音",
    date: "2021年・冬",
    location: "防音スタジオ",
    body: [
      "登録者競争では、はじめ課長に差をつけられていた。それでもヒカキンの録音机には、毎日新しい音のメモが増えている。",
      "速く投稿する技術も、売れる見出しも覚えた。だが最後に残った執着は、十八歳のころと同じだった。自分にしか出せない一音を録ること。",
      "日本一を追うか。数字を超えて残る一本を追うか。まだ、両方を諦める必要はない。"
    ],
    speaker: "ヒカキン",
    quote: "遅れてる。でも、終わってはいない。",
    choices: [
      choice("ch5_craftsman_title", "技術を武器に日本一も狙う", "職人の精度を、大勢へ届く企画に変える方針を立てた。", { stats: { expression: 3, production: 3, energy: -5 }, hidden: { ambition: 5 }, routes: { craft: 3, mainstream: 3 }, addFlags: ["ch5_craft_to_crown"] }, { tone: "bold" }),
      choice("ch5_craftsman_lifework", "順位を忘れ、人生最高の一本を考える", "再生予測の欄を空白にした企画書へ、最初の一音を書き込んだ。", { stats: { beatbox: 5, production: 4, energy: -7 }, hidden: { origin: 7 }, routes: { craft: 7 }, addFlags: ["ch5_lifework_intent"] }, { tone: "steady" }),
      choice("ch5_craftsman_open_door", "若い制作者に試作を見せる", "自分では気づかなかった構成の強みを言葉にするうち、教える才能が輪郭を持った。", { stats: { production: 5, trust: 2 }, relationships: { manager: 3 }, routes: { strategy: 3, network: 3 }, addFlags: ["ch5_mentor_eye"] }, { tone: "warm" })
    ],
    when: { minRoutes: { craft: 45 }, minStats: { beatbox: 58, production: 48 }, maxStats: { subscribers: 13_999_999 }, flagsAny: ["ch5_entry_craft", "ch5_legendary_project", "legendary_video_seed"] },
    priority: 75,
    oncePerRun: true,
    tags: ["opening", "craft", "lifework"],
    visual: { background: "backgrounds/ch5/sound-studio.webp", portrait: "portraits/hikakin/focused.webp", expression: "focused", accent: "violet" }
  }),
  event({
    id: "ch5_opening_producer",
    chapter: 5,
    slot: 0,
    title: "カメラの反対側",
    date: "2021年・冬",
    location: "企画会議室",
    body: [
      "ヒカキンが助言した企画が、本人の動画より大きく伸びた。悔しさより先に、どの場面が視聴者の心をつかんだかが分かってしまう。",
      "画面に映る才能と、画面を作る才能は違う。日本一を目指した青年は今、誰かを日本一へ押し上げられる場所に立っていた。"
    ],
    speaker: "ヒカキン",
    quote: "僕が映らなくても、僕の作った面白さは残るのか。",
    choices: [
      choice("ch5_producer_self", "自分のチャンネルへ知見を戻す", "分析結果を、自分が主役になる最後の企画へ注ぎ込んだ。", { stats: { expression: 3, production: 4 }, hidden: { ambition: 4 }, routes: { mainstream: 4, strategy: 3 }, addFlags: ["ch5_producer_self_return"] }, { tone: "bold" }),
      choice("ch5_producer_team", "制作チームの育成を始める", "正解を渡さず、企画の理由を問い返すやり方で後進を鍛えた。", { stats: { production: 6, trust: 3 }, relationships: { manager: 6 }, routes: { strategy: 6, network: 4 }, addFlags: ["ch5_producer_path"] }, { tone: "warm" }),
      choice("ch5_producer_both", "出演と制作を半分ずつ続ける", "速度は落ちたが、自分が映る意味と作る意味を同時に検証できた。", { stats: { production: 3, expression: 2, energy: -7 }, hidden: { fatigue: 3 }, routes: { craft: 2, strategy: 2 }, addFlags: ["ch5_dual_role"] }, { tone: "steady" })
    ],
    when: { minStats: { production: 62 }, minRoutes: { strategy: 40 }, maxStats: { expression: 52 }, flagsAny: ["ch5_entry_mastermind", "mastermind_path_open", "mastermind_seed"] },
    priority: 70,
    oncePerRun: true,
    tags: ["opening", "producer", "mastermind"],
    visual: { background: "backgrounds/ch5/planning-room.webp", portrait: "portraits/hikakin/thoughtful.webp", expression: "thoughtful", accent: "blue" }
  }),
  event({
    id: "ch5_opening_fallback",
    chapter: 5,
    slot: 0,
    title: "最後の上り坂",
    date: "2021年・冬",
    location: "ヒカキンの撮影部屋",
    body: [
      "成功と呼ぶには十分な場所まで来た。それでも、日本一という言葉を口にすると、目の前の数字は急に小さく見える。",
      "何者かになると決めて上京した十八歳の自分なら、今の停滞をどう見るだろう。ヒカキンは古いマイクのスイッチを入れた。"
    ],
    speaker: "ヒカキン",
    quote: "ここまで来たからこそ、最後まで決めたい。",
    choices: [
      choice("ch5_open_fallback_charge", "日本一への計画を立て直す", "残り時間と必要な登録者を逆算し、勝負できる企画だけを残した。", { stats: { production: 3, energy: -4 }, hidden: { ambition: 5 }, routes: { strategy: 4 }, addFlags: ["ch5_title_race_declared"] }, { tone: "bold" }),
      choice("ch5_open_fallback_roots", "古い動画をすべて見直す", "粗い映像の中に、今の動画が失った勢いを見つけた。", { stats: { beatbox: 3, expression: 2 }, hidden: { origin: 5 }, routes: { craft: 4 }, addFlags: ["ch5_archive_review"] }, { tone: "steady" }),
      choice("ch5_open_fallback_rest", "一日だけ数字を見ずに休む", "休息は逃避ではなかった。疲れを認めたことで、考える力が戻った。", { stats: { energy: 14, trust: 1 }, hidden: { fatigue: -8, ambition: -1 }, routes: { stability: 4 }, addFlags: ["ch5_rest_before_final"] }, { tone: "warm" })
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["opening", "fallback", "hikakin-focus"],
    visual: { background: "backgrounds/ch5/studio-night.webp", portrait: "portraits/hikakin/default.webp", expression: "serious", accent: "blue" }
  }),

  // ───────────────────────── slot 1: 何を背負うか ─────────────────────────
  event({
    id: "ch5_old_viewer_letter",
    chapter: 5,
    slot: 1,
    title: "再生数47回目の人",
    date: "最終決戦まで11か月",
    location: "事務所・郵便室",
    body: [
      "一通の手紙に、初投稿の画面を印刷した紙が入っていた。再生数47、高評価4。差出人は当時、唯一コメントを残した視聴者だった。",
      "『日本一になっても、あの浴室の音が聞こえる動画を待っています』。要求ではなく、長い時間を一緒に歩いた人の確認だった。"
    ],
    speaker: "ヒカキン",
    quote: "最初の視聴者は、数字じゃなかった。",
    choices: [
      choice("ch5_letter_reply", "手書きで返事をする", "撮影の予定を一つずらし、今の言葉で礼を書いた。手紙は公開しなかった。", { stats: { trust: 6, energy: -3 }, hidden: { origin: 8 }, routes: { stability: 2 }, addFlags: ["ch5_first_viewer_remembered"] }, { tone: "warm" }),
      choice("ch5_letter_video", "手紙を許可を得て動画で紹介する", "一人の記憶を、多くの視聴者と共有する動画に変えた。", { stats: { subscribers: 180_000, expression: 3, trust: 3 }, hidden: { origin: 5 }, routes: { mainstream: 3 }, addFlags: ["ch5_first_viewer_story"] }, { tone: "warm" }),
      choice("ch5_letter_keep", "初代マイクの箱へしまう", "言葉にせず、最後の一本で返すと決めた。", { stats: { production: 3, beatbox: 2 }, hidden: { origin: 6, perfectionism: 2 }, routes: { craft: 4 }, addFlags: ["ch5_silent_reply"] }, { tone: "steady" })
    ],
    when: { minHidden: { origin: 58 }, flagsAny: ["ch1_first_foreign_comment", "ch1_first_comment_sound", "ch1_first_fan_remembered", "ch5_archive_review"] },
    priority: 75,
    oncePerRun: true,
    tags: ["viewer", "callback", "origin"],
    visual: { background: "backgrounds/ch5/mail-room.webp", portrait: "portraits/hikakin/moved.webp", expression: "moved", eventCg: "events/ch5/first-viewer-letter.webp", accent: "green" }
  }),
  event({
    id: "ch5_sponsor_ultimatum",
    chapter: 5,
    slot: 1,
    title: "空白を埋める契約",
    date: "最終決戦まで11か月",
    location: "オンライン会議",
    body: [
      "大手企業が、日本一になるまでの全動画を支援すると申し出た。予算は十分。ただし企画、公開日、言葉の一部まで承認が必要になる。",
      "担当者は『自由を奪うのではなく、失敗を減らす契約です』と言う。確かに合理的で、だからこそ迷う。"
    ],
    choices: [
      choice("ch5_sponsor_accept", "条件を受け、規模を手に入れる", "自由の一部と引き換えに、今まで不可能だった撮影が可能になった。", { stats: { money: 12_000_000, subscribers: 220_000, production: 2 }, hidden: { origin: -5 }, routes: { mainstream: 5 }, relationships: { manager: 3 }, addFlags: ["ch5_sponsor_backed"] }, { tone: "bold" }),
      choice("ch5_sponsor_negotiate", "企画への拒否権を交渉する", "予算は半分になったが、最後に公開ボタンを押す権利は守った。", { stats: { money: 5_000_000, trust: 3, production: 2 }, routes: { strategy: 5 }, relationships: { manager: 2 }, addFlags: ["ch5_sponsor_independent"] }, { tone: "steady" }),
      choice("ch5_sponsor_refuse", "自分の資金だけで作る", "規模の限界は受け入れた。代わりに、失敗も成功も自分の名前で背負える。", { stats: { trust: 3, money: -800_000 }, hidden: { origin: 5, ambition: 2 }, routes: { craft: 4 }, addFlags: ["ch5_self_funded_final"] }, { tone: "bold" })
    ],
    when: { minRoutes: { mainstream: 35 }, trendsAny: ["brandDeals"] },
    priority: 65,
    oncePerRun: true,
    tags: ["business", "choice-cost", "final-budget"],
    visual: { background: "backgrounds/ch5/online-meeting.webp", portrait: "portraits/hikakin/serious.webp", expression: "serious", accent: "gold" }
  }),
  event({
    id: "ch5_financial_edge",
    chapter: 5,
    slot: 1,
    title: "残高の音",
    date: "最終決戦まで11か月",
    location: "小さな編集室",
    body: [
      "撮影費と違約金が重なり、口座残高は活動を維持できる線を下回った。スタッフを守れば企画が止まり、企画を守れば人を切ることになる。",
      "スーパーの社員寮で、給料日まで小銭を数えた夜が戻ってくる。あのころと違うのは、自分以外の生活も背負っていることだった。"
    ],
    choices: [
      choice("ch5_finance_downsize", "規模を落として雇用を守る", "派手なセットを捨て、少人数で成立する企画へ戻した。", { stats: { money: 1_200_000, trust: 5, subscribers: -90_000 }, hidden: { origin: 4 }, routes: { stability: 6 }, relationships: { manager: 6 }, addFlags: ["ch5_team_protected"] }, { tone: "warm" }),
      choice("ch5_finance_personal_debt", "自分の資産を投入する", "猶予は得たが、最後の動画が失敗すれば戻る場所まで失う。", { stats: { money: -1_200_000, production: 4 }, hidden: { fatigue: 5, ambition: 5 }, routes: { craft: 3 }, addFlags: ["ch5_all_in_personally"] }, { tone: "risky" }),
      choice("ch5_finance_return_shift", "一時的にスーパーの仕事へ戻る", "早朝の品出しを終えてから編集する生活が再び始まった。屈辱より、続けられる安心が勝った。", { stats: { money: 700_000, energy: -12, trust: 2 }, hidden: { fatigue: 6, origin: 6 }, relationships: { supermarket: 8 }, routes: { stability: 8 }, addFlags: ["ch5_supermarket_returned"] }, { tone: "steady" })
    ],
    when: { maxStats: { money: 1_000_000 }, flagsAny: ["ch4_sponsor_distrust", "ch4_multiple_crisis_seed", "ch4_team_crisis_seed", "ch3_staff_overworked"] },
    priority: 85,
    oncePerRun: true,
    tags: ["money", "supermarket", "crisis"],
    visual: { background: "backgrounds/ch5/small-edit-room.webp", portrait: "portraits/hikakin/worried.webp", expression: "worried", accent: "red" }
  }),
  event({
    id: "ch5_archive_box_fallback",
    chapter: 5,
    slot: 1,
    title: "捨てられなかった箱",
    date: "最終決戦まで11か月",
    location: "倉庫",
    body: [
      "倉庫の整理中、社員寮から持ち出した段ボールが見つかった。安いケーブル、読めなくなったメモ、却下されたパートナー申請の印刷。",
      "成功の証拠より、成功する保証がなかったころの証拠のほうが重く感じられた。"
    ],
    choices: [
      choice("ch5_archive_restore", "古い機材を直して使う", "ノイズまで含めた音が、当時の集中を呼び戻した。", { stats: { beatbox: 4, production: 2, money: -120_000 }, hidden: { origin: 6 }, routes: { craft: 4 }, addFlags: ["ch5_old_mic_restored"] }, { tone: "steady" }),
      choice("ch5_archive_display", "撮影部屋にそのまま飾る", "過去を美化せず、失敗の跡が見えるまま置いた。", { stats: { trust: 2, expression: 2 }, hidden: { origin: 4 }, routes: { mainstream: 2 }, addFlags: ["ch5_archive_visible"] }, { tone: "warm" }),
      choice("ch5_archive_scan", "メモをデータ化して分析する", "十八歳の試行錯誤を分類すると、今も変わらない制作の癖が見えた。", { stats: { production: 5 }, hidden: { perfectionism: -2 }, routes: { strategy: 5 }, addFlags: ["ch5_archive_indexed"] }, { tone: "steady" })
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["origin", "archive", "fallback"],
    visual: { background: "backgrounds/ch5/storage-room.webp", portrait: "portraits/hikakin/nostalgic.webp", expression: "soft", eventCg: "events/ch5/archive-box.webp", accent: "violet" }
  }),

  // ───────────────────────── slot 2: はじめ課長 ─────────────────────────
  event({
    id: "ch5_hajime_best_friend_rival",
    chapter: 5,
    slot: 2,
    title: "親分に勝つ日",
    date: "最終決戦まで9か月",
    location: "閉館後の遊園地",
    body: [
      "大型コラボの撮影後、はじめ課長はスタッフを先に帰した。二人だけになった観覧車の下で、彼はいつもの呼び方のまま宣戦布告する。",
      "尊敬は遠慮ではない。助けてもらったからこそ、全力で追い抜く。それが、はじめ課長なりの恩返しだった。"
    ],
    speaker: "はじめ課長",
    quote: "親分が落ちてくるのを待たない。俺が二千万まで上がって、そこで勝ちます。",
    choices: [
      choice("ch5_hajime_promise", "頂上で待つと約束する", ["ヒカキンは握手を返した。", "競争は友情を壊す脅威ではなく、互いを止めない約束になった。"], { stats: { subscribers: 220_000, expression: 3, trust: 3 }, hidden: { ambition: 6 }, relationships: { hajime: 8 }, routes: { mainstream: 4, network: 3 }, addFlags: ["ch5_hajime_bond_intact", "ch5_hajime_race_declared"] }, { tone: "bold" }),
      choice("ch5_hajime_joint_then_race", "最後に一本だけ共同制作する", "互いの得意を全部出し、その後は別々の動画で決着をつけることにした。", { stats: { production: 4, subscribers: 360_000, energy: -8 }, relationships: { hajime: 6 }, routes: { network: 5 }, addFlags: ["ch5_hajime_last_collab", "ch5_hajime_bond_intact"] }, { tone: "warm" }),
      choice("ch5_hajime_no_mercy", "企画の話は決着後までしない", "友人だからこそ、勝負の情報は交換しない。二人は笑って別の出口から帰った。", { stats: { production: 3 }, hidden: { ambition: 8 }, relationships: { hajime: -2 }, routes: { strategy: 5 }, addFlags: ["ch5_hajime_clean_rivalry"] }, { tone: "steady" })
    ],
    when: { minRelationships: { hajime: 55 }, maxHidden: { controversy: 55 }, flagsAny: ["hajime_fair_race", "hajime_friendship_intact", "hajime_fair_rival_seed", "ch5_entry_title_contender"] },
    priority: 85,
    oncePerRun: true,
    tags: ["hajime", "friendship", "title-race"],
    visual: { background: "backgrounds/ch5/closed-theme-park.webp", portrait: "portraits/hajime/grinning.webp", expression: "grinning", eventCg: "events/ch5/rivals-handshake.webp", accent: "gold" }
  }),
  event({
    id: "ch5_hajime_broken_trust",
    chapter: 5,
    slot: 2,
    title: "呼ばれなかった名前",
    date: "最終決戦まで9か月",
    location: "記者会見の控室",
    body: [
      "ランキングについて聞かれたはじめ課長は、ヒカキンを『親分』と呼ばなかった。過去の企画先取りや炎上時の沈黙が、冗談で埋められない距離を作っていた。",
      "控室ですれ違っても、会話は数字の確認だけ。日本一を争う相手はいる。けれど親友と呼べるかは、今の行動にかかっている。"
    ],
    choices: [
      choice("ch5_hajime_apologize", "勝負の前に、自分の非を謝る", "順位に有利な情報は何も得なかった。それでも、はじめ課長は最後に一度だけ『親分』と呼んだ。", { stats: { trust: 6, subscribers: -80_000 }, hidden: { controversy: -5 }, relationships: { hajime: 12 }, routes: { stability: 3 }, addFlags: ["ch5_hajime_repair_started"] }, { tone: "warm" }),
      choice("ch5_hajime_public_duel", "公開対決で関係を清算する", "逃げずに同じ企画へ挑み、結果を視聴者へ委ねた。", { stats: { subscribers: 520_000, expression: 4, energy: -10 }, relationships: { hajime: 3 }, hidden: { ambition: 5 }, routes: { mainstream: 5 }, addFlags: ["ch5_hajime_public_duel"] }, { tone: "bold" }),
      choice("ch5_hajime_exploit_rift", "不仲を匂わせて注目を集める", "憶測動画は伸びた。二人の間に残っていた修復の余地は、広告の数字へ変わった。", { stats: { subscribers: 650_000, money: 2_000_000, trust: -10 }, hidden: { controversy: 12 }, relationships: { hajime: -15 }, routes: { controversy: 8 }, addFlags: ["ch5_hajime_rift_monetized"] }, { tone: "risky" })
    ],
    when: { maxRelationships: { hajime: 25 }, flagsAny: ["ch2_hajime_idea_taken", "hajime_rival_wound", "hajime_idea_war", "hajime_friendship_broken", "ch5_doubled_down"] },
    priority: 90,
    oncePerRun: true,
    tags: ["hajime", "broken-friendship", "consequence"],
    visual: { background: "backgrounds/ch5/press-backstage.webp", portrait: "portraits/hajime/cold.webp", expression: "cold", accent: "red" }
  }),
  event({
    id: "ch5_hajime_overtakes",
    chapter: 5,
    slot: 2,
    title: "追う側になった朝",
    date: "最終決戦まで9か月",
    location: "自宅リビング",
    body: [
      "午前六時、ランキングが更新された。はじめ課長が日本一。ヒカキンは初めて、背中を追う側として一日を始める。",
      "祝福の連絡を送れば格好をつけていると言われるかもしれない。黙れば嫉妬と書かれる。それでも選ぶのは、記事の見出しではなく二人の関係だ。"
    ],
    choices: [
      choice("ch5_overtake_congratulate", "誰より早く祝福する", "返事は『待ってます、親分』の一行だった。悔しさは消えず、濁りだけが消えた。", { stats: { trust: 5, expression: 2 }, hidden: { ambition: 7 }, relationships: { hajime: 7 }, routes: { network: 3 }, addFlags: ["ch5_hajime_bond_intact", "ch5_chasing_hajime"] }, { tone: "warm" }),
      choice("ch5_overtake_work", "連絡より先に撮影を始める", "祝福は動画を完成させてから送った。言葉より行動で追う一日になった。", { stats: { production: 5, energy: -9 }, hidden: { ambition: 8, fatigue: 3 }, routes: { craft: 4 }, addFlags: ["ch5_chasing_hajime"] }, { tone: "bold" }),
      choice("ch5_overtake_question_rank", "順位ではなく代表作で勝つと決める", "登録者の線から目を外し、十年後にも見られる企画だけを残した。", { stats: { production: 4, beatbox: 3 }, hidden: { origin: 6, ambition: -2 }, routes: { craft: 5 }, addFlags: ["ch5_lifework_intent"] }, { tone: "steady" })
    ],
    when: { maxStats: { subscribers: 9_999_999 }, minRelationships: { hajime: 26 } },
    priority: 60,
    oncePerRun: true,
    tags: ["hajime", "overtaken", "ambition"],
    visual: { background: "backgrounds/ch5/home-dawn.webp", portrait: "portraits/hikakin/stunned.webp", expression: "stunned", eventCg: "events/ch5/ranking-overtake.webp", accent: "blue" }
  }),
  event({
    id: "ch5_hajime_fallback_call",
    chapter: 5,
    slot: 2,
    title: "親分、勝負しましょう",
    date: "最終決戦まで9か月",
    location: "撮影後の駐車場",
    body: [
      "はじめ課長から電話が来た。巨大企画の相談かと思えば、要件は一つだけだった。日本一を本気で争いたい。",
      "後発だった青年は、もう教えを待つ後輩ではない。それでも最後に『親分』と付ける声だけは、出会ったころと変わらなかった。"
    ],
    speaker: "はじめ課長",
    quote: "負けても親分とは呼びます。でも、負ける気はないです。",
    choices: [
      choice("ch5_hajime_fallback_accept", "正面から受けて立つ", "二人は同じ公開日を決戦の日に決めた。", { stats: { subscribers: 180_000, trust: 2 }, hidden: { ambition: 6 }, relationships: { hajime: 4 }, routes: { mainstream: 4 }, addFlags: ["ch5_hajime_race_declared"] }, { tone: "bold" }),
      choice("ch5_hajime_fallback_learn", "互いの得意を語り合ってから競う", "勝負の前に、二人はなぜ動画を続けたかを初めて言葉にした。", { stats: { production: 3, expression: 2 }, hidden: { origin: 3 }, relationships: { hajime: 5 }, routes: { network: 4 }, addFlags: ["ch5_hajime_bond_intact"] }, { tone: "warm" }),
      choice("ch5_hajime_fallback_decline", "自分の戦いは順位ではないと断る", "はじめ課長は残念そうに笑い、それでも完成した一本を最初に見ると約束した。", { stats: { beatbox: 2, production: 2 }, hidden: { origin: 5, ambition: -3 }, relationships: { hajime: 2 }, routes: { craft: 5 }, addFlags: ["ch5_title_race_declined"] }, { tone: "steady" })
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["hajime", "title-race", "fallback"],
    visual: { background: "backgrounds/ch5/parking-night.webp", portrait: "portraits/hajime/smile.webp", expression: "smile", accent: "gold" }
  }),

  // ───────────────────────── slot 3: 原点の再解釈 ─────────────────────────
  event({
    id: "ch5_theme_music_after_hundred_million",
    chapter: 5,
    slot: 3,
    title: "一億回のあとで",
    date: "最終決戦まで8か月",
    location: "ゼイキンの音楽スタジオ",
    body: [
      "『YouTubeテーマミュージック』は一億再生を越えた。それでもゼイキンは、祝福より先にミックスの一か所を指さした。",
      "兄弟で作った曲は、数字の武器にも、二人の原点にもなれる。最後の企画へ使うなら、どちらとして持ち込むかを決めなければならない。"
    ],
    speaker: "ゼイキン",
    quote: "一億回聞かれた曲じゃなくて、二人で作った曲だろ。",
    choices: [
      choice("ch5_theme_new_arrangement", "人生を振り返る新アレンジを作る", "有名なサビをあえて崩し、社員寮で録った音を土台に再構築した。", { stats: { beatbox: 5, production: 5, energy: -8 }, hidden: { origin: 6 }, relationships: { zeikin: 7 }, routes: { craft: 5 }, addFlags: ["ch5_theme_reprise"] }, { tone: "warm" }),
      choice("ch5_theme_massive_sequel", "さらに大衆的な続編を作る", "一億再生の期待を正面から背負い、誰でも口ずさめる新曲へ挑んだ。", { stats: { subscribers: 480_000, expression: 4, money: -1_500_000 }, hidden: { ambition: 5 }, relationships: { zeikin: 3 }, routes: { mainstream: 5 }, addFlags: ["ch5_theme_sequel"] }, { tone: "bold" }),
      choice("ch5_theme_leave_untouched", "あの曲は完成済みとして使わない", "成功作へ寄りかからず、最後の一本には新しい音だけを持ち込むことにした。", { stats: { production: 4, trust: 2 }, hidden: { origin: 3 }, relationships: { zeikin: 2 }, routes: { strategy: 3 }, addFlags: ["ch5_theme_respected"] }, { tone: "steady" })
    ],
    when: { flagsAll: ["yt_theme_viral_100m"], minRelationships: { zeikin: 45 } },
    priority: 85,
    oncePerRun: true,
    tags: ["zeikin", "music", "callback"],
    visual: { background: "backgrounds/ch5/music-studio.webp", portrait: "portraits/zeikin/soft.webp", expression: "soft", eventCg: "events/ch5/theme-reprise.webp", accent: "violet" }
  }),
  event({
    id: "ch5_brothers_unfinished_song",
    chapter: 5,
    slot: 3,
    title: "完成しなかった兄弟曲",
    date: "最終決戦まで8か月",
    location: "ゼイキンの音楽スタジオ",
    body: [
      "棚の奥に、途中で止まった『YouTubeテーマミュージック』のデータが残っていた。成功しなかった理由は技術ではなく、二人が相手の言葉を聞かなかったことだ。",
      "ゼイキンは再生ボタンへ手を置いたまま、弟を見る。最終章でまで、昔の喧嘩を数字に変える必要はない。だが、直すなら今しかない。"
    ],
    choices: [
      choice("ch5_song_finish_together", "条件を決め直し、二人で完成させる", "収益も名義も先に紙へ書き、ようやく音の話だけができた。", { stats: { production: 5, beatbox: 4, energy: -9, money: -600_000 }, hidden: { origin: 5 }, relationships: { zeikin: 14 }, routes: { craft: 4 }, addFlags: ["ch5_brothers_reconciled", "ch5_theme_reprise"] }, { tone: "warm" }),
      choice("ch5_song_apologize_only", "曲ではなく、まず謝る", "完成の約束はしなかった。それでも兄弟として話せる場所まで戻った。", { stats: { trust: 4 }, hidden: { controversy: -3 }, relationships: { zeikin: 10 }, routes: { stability: 3 }, addFlags: ["ch5_brothers_reconciled"] }, { tone: "warm" }),
      choice("ch5_song_sample_alone", "過去データを自分の企画へ使う", "法的には使えても、兄の沈黙は同意ではなかった。音は強く、関係はさらに遠のいた。", { stats: { subscribers: 310_000, production: 3, trust: -5 }, hidden: { controversy: 5 }, relationships: { zeikin: -12 }, routes: { strategy: 3 }, addFlags: ["ch5_brother_sample_conflict"] }, { tone: "risky" })
    ],
    when: { flagsAny: ["yt_theme_delayed", "yt_theme_credit_conflict", "yt_theme_conflict_unresolved", "zeikin_offer_declined", "zeikin_break_final"] },
    priority: 80,
    oncePerRun: true,
    tags: ["zeikin", "unfinished-business", "relationship"],
    visual: { background: "backgrounds/ch5/music-studio-dark.webp", portrait: "portraits/zeikin/guarded.webp", expression: "guarded", accent: "blue" }
  }),
  event({
    id: "ch5_matchstick_anniversary",
    chapter: 5,
    slot: 3,
    title: "最初の一千万回",
    date: "最終決戦まで8か月",
    location: "人偏堂・資料室",
    body: [
      "人偏堂から『スーパーマッチ棒ブラザーズ』記念企画への招待が届いた。資料室には、最初に再現したBGMの譜面と開発機が残っている。",
      "あの動画は扉を開けた。しかし同じ扉をもう一度くぐるだけでは、最後の答えにならない。"
    ],
    choices: [
      choice("ch5_matchstick_exact_remake", "現在の技術で完全再現する", "昔の粗さを消した音は完璧だった。視聴者は、進歩と同時に失われた勢いにも気づいた。", { stats: { subscribers: 420_000, beatbox: 5, production: 3, energy: -8 }, hidden: { perfectionism: 4 }, routes: { craft: 5 }, addFlags: ["ch5_matchstick_remastered"] }, { tone: "steady" }),
      choice("ch5_matchstick_show_failures", "失敗テイクごと公開する", "千回近い失敗の向こうに一千万再生があったことを、初めて見せた。", { stats: { subscribers: 350_000, trust: 5, expression: 4 }, hidden: { origin: 5, perfectionism: -4 }, routes: { mainstream: 4 }, addFlags: ["ch5_failures_revealed"] }, { tone: "warm" }),
      choice("ch5_matchstick_new_creator", "若い制作者へ記念動画を任せる", "自分の思い出を説明し、別の世代の表現に変える仕事を選んだ。", { stats: { production: 6, trust: 3 }, routes: { strategy: 5, network: 3 }, addFlags: ["ch5_matchstick_produced"] }, { tone: "warm" })
    ],
    when: { flagsAll: ["ch1_video_10m"], minStats: { beatbox: 45 } },
    priority: 70,
    oncePerRun: true,
    tags: ["matchstick", "origin", "career-callback"],
    visual: { background: "backgrounds/ch5/game-archive.webp", portrait: "portraits/hikakin/nostalgic.webp", expression: "nostalgic", eventCg: "events/ch5/matchstick-score.webp", accent: "gold" }
  }),
  event({
    id: "ch5_sound_inventory_fallback",
    chapter: 5,
    slot: 3,
    title: "人生の音を並べる",
    date: "最終決戦まで8か月",
    location: "防音スタジオ",
    body: [
      "スーパーのレジ音、ゲーム機の起動音、安いマイクのノイズ、動画公開ボタンのクリック。ヒカキンは、人生の節目を音だけで書き出した。",
      "話せば数分で終わる経歴も、音にするとまだ未完成だった。"
    ],
    choices: [
      choice("ch5_inventory_record", "すべて自分の口で録音する", "一見似ている音にも、当時の呼吸の違いがあると分かった。", { stats: { beatbox: 5, energy: -7 }, hidden: { origin: 5 }, routes: { craft: 5 }, addFlags: ["ch5_life_sound_library"] }, { tone: "steady" }),
      choice("ch5_inventory_explain", "各時代の動画制作術を解説する", "経験を言語化するほど、他人へ技術を渡せる形になった。", { stats: { production: 6, expression: 2 }, routes: { strategy: 5 }, addFlags: ["ch5_method_documented"] }, { tone: "steady" }),
      choice("ch5_inventory_ask_audience", "視聴者の記憶に残る音を募集する", "自分が忘れていた場面を、何万人もの記憶が返してくれた。", { stats: { trust: 5, subscribers: 160_000, expression: 3 }, hidden: { origin: 3 }, routes: { network: 4 }, addFlags: ["ch5_audience_sound_archive"] }, { tone: "warm" })
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["origin", "sound", "fallback"],
    visual: { background: "backgrounds/ch5/sound-studio.webp", portrait: "portraits/hikakin/focused.webp", expression: "focused", accent: "violet" }
  }),

  // ───────────────────────── slot 4: 四皇候補の時代 ─────────────────────────
  event({
    id: "ch5_four_emperors_seed",
    chapter: 5,
    slot: 4,
    title: "四つの旗",
    date: "最終決戦まで7か月",
    location: "クリエイター合同会議",
    body: [
      "地方を背負う東大オンエアのテツ、子供たちの遊びを巨大企画へ育てた漁師たちのシル子、そして日本二位へ迫るはじめ課長。",
      "業界紙は三人とヒカキンを『次代の四強』と呼び始めた。だが四人が残るには、互いを踏み台にせず、それぞれの場所を育てる必要がある。"
    ],
    speaker: "テツ",
    quote: "東京の真似で勝つより、地元ごと面白くして勝ちたいんです。",
    choices: [
      choice("ch5_four_support_all", "四者合同企画で各自の強みを立てる", "ヒカキンは中央を独占せず、音で三者の企画をつないだ。四つの個性が競争ではなく時代として見えた。", { stats: { subscribers: 620_000, trust: 7, production: 5, money: -1_000_000 }, relationships: { hajime: 5, tetsu: 7, shiruko: 7 }, routes: { network: 8 }, addFlags: ["ch5_four_emperors_ready", "ch5_four_collab"] }, { tone: "warm" }),
      choice("ch5_four_share_safety", "企画・地域・安全の知見を交換する", "表に出ない会議を重ね、テツの地域連携とシル子の安全管理を持続できる仕組みにした。", { stats: { production: 5, trust: 8, energy: -5 }, relationships: { tetsu: 9, shiruko: 9, hajime: 3 }, routes: { strategy: 5, network: 5 }, addFlags: ["ch5_four_emperors_ready", "ch5_creator_standards"] }, { tone: "steady" }),
      choice("ch5_four_compete", "四人で同じ題材の再生数を競う", "同条件で個性が比較され、ヒカキンの総合力が注目された。ただし仲間というより順位表の印象が残った。", { stats: { subscribers: 780_000, expression: 4, trust: -2 }, hidden: { ambition: 5 }, relationships: { hajime: 2, tetsu: -1, shiruko: -1 }, routes: { mainstream: 6 }, addFlags: ["ch5_four_competition"] }, { tone: "bold" })
    ],
    when: { minRelationships: { hajime: 45, tetsu: 40, shiruko: 40 }, minStats: { trust: 62 }, flagsAny: ["four_emperors_collective_seed", "four_emperors_collab_ready", "four_emperors_hajime_ready", "tets_tourism_seed", "four_emperors_shiruko_seed", "hajime_fair_race", "hajime_fair_rival_seed"] },
    priority: 90,
    oncePerRun: true,
    tags: ["four-emperors", "tetsu", "shiruko", "hajime"],
    visual: { background: "backgrounds/ch5/creator-summit.webp", portrait: "portraits/hikakin/smile.webp", expression: "smile", eventCg: "events/ch5/four-creators.webp", accent: "gold" }
  }),
  event({
    id: "ch5_tetsu_ambassador",
    chapter: 5,
    slot: 4,
    title: "地元の看板",
    date: "最終決戦まで7か月",
    location: "東大オンエアの地元",
    body: [
      "テツから、観光大使就任前の記念動画へ誘われた。行政は失敗のない紹介を望み、東大オンエアは地元の欠点まで笑いにしたいと言う。",
      "ヒカキンが有名人として正解を決めれば早い。だが、この土地の主役はヒカキンではない。"
    ],
    choices: [
      choice("ch5_tetsu_follow_lead", "テツの判断を信じて脇へ回る", "ヒカキンは効果音と進行補助に徹し、動画の中心を六人と町の人へ渡した。", { stats: { trust: 5, production: 4 }, relationships: { tetsu: 10 }, routes: { network: 6 }, addFlags: ["ch5_tetsu_ambassador", "ch5_tetsu_rising"] }, { tone: "warm" }),
      choice("ch5_tetsu_polish", "行政にも届く構成へ整える", "尖りを残したまま説明を加え、企画は観光大使就任の決め手になった。", { stats: { production: 5, subscribers: 250_000, trust: 3 }, relationships: { tetsu: 6 }, routes: { strategy: 5 }, addFlags: ["ch5_tetsu_ambassador", "ch5_tetsu_rising"] }, { tone: "steady" }),
      choice("ch5_tetsu_take_center", "全国人気のため自分を前面に出す", "再生数は大きく伸びたが、地元企画なのにヒカキンしか残らない編集になった。", { stats: { subscribers: 430_000, expression: 3 }, relationships: { tetsu: -8 }, routes: { mainstream: 4 }, addFlags: ["ch5_tetsu_eclipsed"] }, { tone: "risky" })
    ],
    when: { minRelationships: { tetsu: 32 }, maxRelationships: { shiruko: 39 } },
    priority: 65,
    oncePerRun: true,
    tags: ["tetsu", "local", "leadership"],
    visual: { background: "backgrounds/ch5/local-city.webp", portrait: "portraits/tetsu/confident.webp", expression: "confident", accent: "green" }
  }),
  event({
    id: "ch5_shiruko_children_safety",
    chapter: 5,
    slot: 4,
    title: "子供が真似できる遊び",
    date: "最終決戦まで7か月",
    location: "漁師たち・アスレチック会場",
    body: [
      "シル子は最大規模の鬼ごっこを中止しようとしていた。安全検証で、子供が真似をした場合の危険が見つかったからだ。",
      "スポンサーは延期を嫌がり、視聴者は予告を待っている。リーダーが人気より安全を選べるか、ヒカキンの言葉も試される。"
    ],
    speaker: "シル子",
    quote: "面白いって、無事に帰ってから言えることでしょ。",
    choices: [
      choice("ch5_shiruko_redesign", "一緒に安全なルールへ作り直す", "派手さを競う代わりに、誰でも遊べるルールを発明した。動画は子供たちの新しい定番になった。", { stats: { production: 5, trust: 7, energy: -6 }, relationships: { shiruko: 10 }, routes: { network: 5 }, addFlags: ["ch5_shiruko_safe_leader", "ch5_shiruko_rising"] }, { tone: "warm" }),
      choice("ch5_shiruko_cancel", "中止を共同で発表する", "再生数より判断理由を説明し、失敗を隠さない姿勢が支持された。", { stats: { trust: 8, subscribers: -70_000 }, hidden: { controversy: -3 }, relationships: { shiruko: 8 }, routes: { stability: 4 }, addFlags: ["ch5_shiruko_safe_leader", "ch5_shiruko_rising"] }, { tone: "steady" }),
      choice("ch5_shiruko_adult_only", "大人限定として予定どおり撮る", "事故なく終えたが、子供人気を築いた理由と企画の刺激が少しずれ始めた。", { stats: { subscribers: 360_000, money: 900_000, trust: -3 }, relationships: { shiruko: -3 }, routes: { mainstream: 4 }, addFlags: ["ch5_shiruko_risked_brand"] }, { tone: "risky" })
    ],
    when: { minRelationships: { shiruko: 32 }, maxRelationships: { tetsu: 39 } },
    priority: 65,
    oncePerRun: true,
    tags: ["shiruko", "children", "safety"],
    visual: { background: "backgrounds/ch5/athletic-course.webp", portrait: "portraits/shiruko/serious.webp", expression: "serious", accent: "green" }
  }),
  event({
    id: "ch5_industry_mirror_fallback",
    chapter: 5,
    slot: 4,
    title: "それぞれの頂点",
    date: "最終決戦まで7か月",
    location: "クリエイター表彰式",
    body: [
      "地方で六人を率いるテツ、子供向け企画を進化させるシル子、大型企画を更新し続けるはじめ課長。壇上に並ぶ背中は、同じ成功の形をしていなかった。",
      "ヒカキンは、自分が勝つことと、この時代全体が豊かになることを分けて考える。両立は難しいが、不可能ではない。"
    ],
    choices: [
      choice("ch5_industry_connect", "互いの知見を共有する場を作る", "公開されない失敗談を交換する会が始まり、業界全体の事故と孤立が減った。", { stats: { trust: 6, production: 3, energy: -4 }, relationships: { hajime: 3, tetsu: 4, shiruko: 4 }, routes: { network: 6 }, addFlags: ["ch5_creator_roundtable"] }, { tone: "warm" }),
      choice("ch5_industry_observe", "三者の強みを自分の企画へ学ぶ", "規模、地域、遊び。模倣ではなく原理へ分解し、最後の動画の設計へ加えた。", { stats: { production: 6 }, routes: { strategy: 5 }, addFlags: ["ch5_four_strengths_studied"] }, { tone: "steady" }),
      choice("ch5_industry_outshine", "授賞式で日本一を宣言する", "会場の空気を奪う強い言葉は、切り抜きで何百万回も再生された。", { stats: { subscribers: 400_000, expression: 3, trust: -3 }, hidden: { ambition: 7 }, routes: { mainstream: 4 }, addFlags: ["ch5_public_crown_vow"] }, { tone: "bold" })
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["industry", "four-emperors", "fallback"],
    visual: { background: "backgrounds/ch5/award-stage.webp", portrait: "portraits/hikakin/thoughtful.webp", expression: "thoughtful", accent: "gold" }
  }),

  // ───────────────────────── slot 5: 最終企画 ─────────────────────────
  event({
    id: "ch5_final_concept_crown",
    chapter: 5,
    slot: 5,
    title: "二千万人への企画書",
    date: "最終決戦まで6か月",
    location: "企画会議室",
    body: [
      "日本一へ必要な登録者数、公開までの日数、予算、協力者。すべてを一枚の壁へ並べると、無謀さがはっきり見えた。",
      "ただ大きいだけの動画では届かない。ビートボックス、商品紹介、ゲーム実況、挑戦企画。身につけたものを、一つの理由でつなぐ必要がある。"
    ],
    choices: [
      choice("ch5_choose_nationwide_final", "日本中の『好きな音』をつなぐ生配信", "各地の視聴者から届く音を、ヒカキンが即興のビートで一つにする計画が始まった。", { stats: { production: 4, expression: 4, money: -3_000_000, energy: -8 }, hidden: { ambition: 6, origin: 3 }, routes: { mainstream: 6, network: 5 }, addFlags: ["ch5_final_nationwide"], removeFlags: ["ch5_final_lifework", "ch5_final_produce", "ch5_final_scandal"] }, { tone: "bold" }),
      choice("ch5_choose_all_genres", "全ジャンルを一日で完成させる超大型動画", "料理、ゲーム、商品、運動、音楽を一つの物語へ組む、過去最大の制作が動き出した。", { stats: { production: 5, money: -5_000_000, energy: -12 }, hidden: { fatigue: 5, ambition: 7 }, routes: { mainstream: 7 }, addFlags: ["ch5_final_all_genres"], removeFlags: ["ch5_final_lifework", "ch5_final_produce", "ch5_final_scandal"] }, { tone: "bold" }),
      choice("ch5_choose_lifework_from_crown", "競争を離れ、音だけの人生作品を作る", "二千万人への最短距離を捨て、二十年後にも残る一本へ進路を変えた。", { stats: { beatbox: 4, production: 3 }, hidden: { origin: 8, ambition: -6 }, routes: { craft: 7 }, addFlags: ["ch5_final_lifework"], removeFlags: ["ch5_final_nationwide", "ch5_final_all_genres", "ch5_final_scandal"] }, { tone: "steady" })
    ],
    when: { minStats: { subscribers: 10_000_000, expression: 52, production: 50 }, minHidden: { ambition: 60 }, maxHidden: { controversy: 60 } },
    priority: 80,
    oncePerRun: true,
    tags: ["final-concept", "number-one", "major-choice"],
    visual: { background: "backgrounds/ch5/war-room.webp", portrait: "portraits/hikakin/determined.webp", expression: "determined", eventCg: "events/ch5/final-plan-wall.webp", accent: "gold" }
  }),
  event({
    id: "ch5_final_concept_lifework",
    chapter: 5,
    slot: 5,
    title: "音が止まるまで",
    date: "最終決戦まで6か月",
    location: "空のスタジオ",
    body: [
      "企画書の仮題は『音が止まるまで』。十八歳から現在までを、言葉ではなく音と映像で一本につなぐ。",
      "初代マイク、社員寮の浴室を再現した壁、ゲームの記憶、商品を開ける音、歓声、沈黙。豪華なゲストではなく、ヒカキン自身の変化が主役になる。"
    ],
    choices: [
      choice("ch5_choose_lifework_one_take", "一度きりの長回しで撮る", "編集で失敗を隠さず、今の呼吸をそのまま作品に残すことにした。", { stats: { beatbox: 6, production: 4, energy: -9 }, hidden: { origin: 9, perfectionism: -3 }, routes: { craft: 8 }, addFlags: ["ch5_final_lifework", "ch5_lifework_one_take"], removeFlags: ["ch5_final_nationwide", "ch5_final_all_genres", "ch5_final_produce", "ch5_final_scandal"] }, { tone: "bold" }),
      choice("ch5_choose_lifework_layers", "各時代の音を精密に重ねる", "一秒ごとに過去の技術と現在の技術が対話する、編集芸術として設計した。", { stats: { production: 7, beatbox: 4, energy: -11 }, hidden: { origin: 7, perfectionism: 5 }, routes: { craft: 8 }, addFlags: ["ch5_final_lifework", "ch5_lifework_layers"], removeFlags: ["ch5_final_nationwide", "ch5_final_all_genres", "ch5_final_produce", "ch5_final_scandal"] }, { tone: "steady" }),
      choice("ch5_choose_lifework_audience", "視聴者の記憶の音も織り込む", "ヒカキンの人生と、それを見た人々の人生が交互に響く構成になった。", { stats: { trust: 5, expression: 4, production: 4 }, hidden: { origin: 7 }, routes: { network: 5, craft: 4 }, addFlags: ["ch5_final_lifework", "ch5_lifework_shared_memory"], removeFlags: ["ch5_final_nationwide", "ch5_final_all_genres", "ch5_final_produce", "ch5_final_scandal"] }, { tone: "warm" })
    ],
    when: { minStats: { beatbox: 60, production: 55 }, minHidden: { origin: 62 }, minRoutes: { craft: 42 }, flagsAny: ["ch5_legendary_project", "legendary_video_seed", "ch5_entry_craft", "ch5_lifework_intent"] },
    priority: 90,
    oncePerRun: true,
    tags: ["final-concept", "legendary-video", "major-choice"],
    visual: { background: "backgrounds/ch5/empty-stage.webp", portrait: "portraits/hikakin/inspired.webp", expression: "inspired", eventCg: "events/ch5/sound-until-silence-plan.webp", accent: "violet" }
  }),
  event({
    id: "ch5_final_concept_mastermind",
    chapter: 5,
    slot: 5,
    title: "主役を渡す企画",
    date: "最終決戦まで6か月",
    location: "若手クリエイターの作業場",
    body: [
      "出演者として伸び悩むヒカキンの前で、まだ無名の制作者が企画を諦めようとしていた。素材は弱くない。見せる順番と、本人が気づいていない魅力が埋もれている。",
      "最後の時間を自分の登録者へ使うか、一本の動画を生まれ変わらせるために使うか。"
    ],
    choices: [
      choice("ch5_choose_produce_full", "名前を出さず全面的にプロデュースする", "ヒカキンは企画、撮影、編集、音響を組み直し、主役だけは若者のままにした。", { stats: { production: 8, energy: -10, money: -800_000, trust: 3 }, routes: { strategy: 8, network: 4 }, addFlags: ["ch5_final_produce", "ch5_produced_anonymously"], removeFlags: ["ch5_final_nationwide", "ch5_final_all_genres", "ch5_final_lifework", "ch5_final_scandal"] }, { tone: "warm" }),
      choice("ch5_choose_produce_school", "制作過程そのものを公開講座にする", "正解だけでなく失敗の理由も見せ、一本の裏側から何百人もの制作者が学べる企画にした。", { stats: { production: 7, expression: 3, trust: 5, energy: -8 }, routes: { strategy: 7, network: 5 }, addFlags: ["ch5_final_produce", "ch5_open_production_method"], removeFlags: ["ch5_final_nationwide", "ch5_final_all_genres", "ch5_final_lifework", "ch5_final_scandal"] }, { tone: "steady" }),
      choice("ch5_choose_produce_co_star", "自分も出演して両方を伸ばす", "橋渡し役として出演し、若い主役へ視聴者を渡す設計にした。", { stats: { production: 5, expression: 4, subscribers: 180_000 }, routes: { strategy: 5, mainstream: 3 }, addFlags: ["ch5_final_produce", "ch5_produced_with_cameo"], removeFlags: ["ch5_final_nationwide", "ch5_final_all_genres", "ch5_final_lifework", "ch5_final_scandal"] }, { tone: "bold" })
    ],
    when: { minStats: { production: 68 }, minRoutes: { strategy: 48 }, maxStats: { expression: 56 }, flagsAny: ["mastermind_path_open", "mastermind_seed", "ch5_entry_mastermind", "ch5_producer_path"] },
    priority: 95,
    oncePerRun: true,
    tags: ["final-concept", "mastermind", "major-choice"],
    visual: { background: "backgrounds/ch5/young-creator-room.webp", portrait: "portraits/hikakin/mentor.webp", expression: "gentle", accent: "blue" }
  }),
  event({
    id: "ch5_final_concept_scandal",
    chapter: 5,
    slot: 5,
    title: "最も再生される嘘",
    date: "最終決戦まで6か月",
    location: "柴田のスタジオ",
    body: [
      "柴田は、業界全体を揺らす『証拠』を机へ置いた。断片的な事実に、証明できない物語を足せば、今年最大の動画になる。",
      "信用を取り戻すより、信用という競技から降りるほうが速い。ヒカキンは、その誘惑を理解できる場所まで来てしまった。"
    ],
    speaker: "柴田",
    quote: "真実が弱いなら、見たい真実にしてやればいい。お前なら王になれる。",
    choices: [
      choice("ch5_choose_scandal", "暴露動画を共同制作する", "事実と推測の境界を消し、最も怒りが広がる順番へ編集した。", { stats: { subscribers: 1_100_000, money: 5_000_000, trust: -16, production: 3 }, hidden: { controversy: 18, origin: -9 }, relationships: { shibata: 10 }, routes: { controversy: 10 }, addFlags: ["ch5_final_scandal", "ch5_fabrication_started"], removeFlags: ["ch5_final_nationwide", "ch5_final_all_genres", "ch5_final_lifework", "ch5_final_produce"] }, { tone: "risky" }),
      choice("ch5_choose_self_scandal", "自分の過去を刺激的に暴露する", "他人を傷つけない代わりに、自分の記憶を商品へ変えた。真実にも演出が足された。", { stats: { subscribers: 720_000, money: 2_500_000, trust: -9, expression: 4 }, hidden: { controversy: 10, origin: -4 }, routes: { controversy: 7 }, addFlags: ["ch5_final_scandal", "ch5_self_exploitation"] }, { tone: "risky" }),
      choice("ch5_reject_scandal", "証拠を置いて退出する", "柴田の企画から離れた。失った信用は戻らなくても、これ以上売らないものを決めた。", { stats: { trust: 5, subscribers: -140_000 }, hidden: { controversy: -8, origin: 5 }, relationships: { shibata: -12 }, routes: { stability: 5 }, addFlags: ["ch5_scandal_refused", "ch5_final_accountability"] }, { tone: "steady" })
    ],
    when: { minHidden: { controversy: 56 }, maxStats: { trust: 48 }, minRelationships: { shibata: 20 }, flagsAny: ["controversy_king_path_open", "ch5_controversy_weapon", "ch5_mega_expose_promised", "ch5_entry_controversy"] },
    priority: 95,
    oncePerRun: true,
    tags: ["final-concept", "controversy", "major-choice"],
    visual: { background: "backgrounds/ch5/shibata-studio.webp", portrait: "portraits/shibata/grin.webp", expression: "grin", eventCg: "events/ch5/evidence-envelope.webp", accent: "red" }
  }),
  event({
    id: "ch5_final_concept_fallback",
    chapter: 5,
    slot: 5,
    title: "残された三つの案",
    date: "最終決戦まで6か月",
    location: "ヒカキンの撮影部屋",
    body: [
      "予算も人気も、理想の企画には少し足りない。それでも残された時間で一本を作ることはできる。",
      "壁には三案。今ある力を集める動画、自分の技術を残す動画、誰かの才能を引き出す動画。どれを選んでも、別の可能性は閉じる。"
    ],
    choices: [
      choice("ch5_fallback_final_challenge", "今の全力で大型挑戦を作る", "届く範囲の規模へ削り、最後まで完成できる企画にした。", { stats: { production: 4, expression: 3, money: -1_200_000, energy: -7 }, hidden: { ambition: 5 }, routes: { mainstream: 5 }, addFlags: ["ch5_final_all_genres"], removeFlags: ["ch5_final_lifework", "ch5_final_produce", "ch5_final_scandal"] }, { tone: "bold" }),
      choice("ch5_fallback_final_sound", "ビートボックスで人生を一本にする", "派手な舞台を捨て、古いマイクから始まる個人的な作品を設計した。", { stats: { beatbox: 5, production: 3, energy: -6 }, hidden: { origin: 7 }, routes: { craft: 6 }, addFlags: ["ch5_final_lifework"], removeFlags: ["ch5_final_nationwide", "ch5_final_all_genres", "ch5_final_produce", "ch5_final_scandal"] }, { tone: "steady" }),
      choice("ch5_fallback_final_produce", "自分より伸びる一本を裏から作る", "自分の登録者には直結しない仕事へ、蓄積した制作技術をすべて注いだ。", { stats: { production: 6, trust: 3, energy: -6 }, routes: { strategy: 6 }, addFlags: ["ch5_final_produce"], removeFlags: ["ch5_final_nationwide", "ch5_final_all_genres", "ch5_final_lifework", "ch5_final_scandal"] }, { tone: "warm" })
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["final-concept", "fallback", "major-choice"],
    visual: { background: "backgrounds/ch5/studio-plan-board.webp", portrait: "portraits/hikakin/thoughtful.webp", expression: "thoughtful", accent: "blue" }
  }),

  // ───────────────────────── slot 6: 準備 ─────────────────────────
  event({
    id: "ch5_prepare_nationwide",
    chapter: 5,
    slot: 6,
    title: "日本中から届く音",
    date: "最終決戦まで4か月",
    location: "生配信管制室",
    body: [
      "学校のチャイム、港のエンジン、商店街のシャッター、赤ん坊の笑い声。全国から何万件もの『好きな音』が届いた。",
      "全部を使えば散漫になる。選びすぎれば、参加した人を置いていく。巨大企画の本質は、規模ではなく取捨選択だった。"
    ],
    choices: [
      choice("ch5_prepare_nationwide_story", "人生の時間順に音を構成する", "朝から夜、誕生から老いへ。誰の生活にもある一日として音をつないだ。", { stats: { production: 6, trust: 4, energy: -8 }, hidden: { origin: 3 }, routes: { strategy: 4 }, addFlags: ["ch5_final_coherent"] }, { tone: "steady" }),
      choice("ch5_prepare_nationwide_live", "当日の即興を最大限残す", "事故の余地ごと生配信の熱へ変える設計にした。", { stats: { expression: 6, beatbox: 4, energy: -10 }, hidden: { perfectionism: -3 }, routes: { mainstream: 5 }, addFlags: ["ch5_final_live_risk"] }, { tone: "bold" }),
      choice("ch5_prepare_nationwide_four", "はじめ・テツ・シル子へ各地を任せる", "三者の得意な場所から音が集まり、四人の個性が一本の中でぶつからず並んだ。", { stats: { production: 4, trust: 5, subscribers: 240_000 }, relationships: { hajime: 4, tetsu: 5, shiruko: 5 }, routes: { network: 6 }, addFlags: ["ch5_final_coherent", "ch5_four_final_roles"] }, { tone: "warm", when: { minRelationships: { hajime: 40, tetsu: 35, shiruko: 35 } } })
    ],
    when: { flagsAll: ["ch5_final_nationwide"] },
    priority: 85,
    oncePerRun: true,
    tags: ["production", "nationwide", "final-video"],
    visual: { background: "backgrounds/ch5/control-room.webp", portrait: "portraits/hikakin/focused.webp", expression: "focused", eventCg: "events/ch5/sound-map.webp", accent: "gold" }
  }),
  event({
    id: "ch5_prepare_lifework",
    chapter: 5,
    slot: 6,
    title: "浴室をもう一度作る",
    date: "最終決戦まで4か月",
    location: "再現セット",
    body: [
      "社員寮の浴室を、写真と記憶だけで再現した。壁の反響は似ているが、立っている人間はもう十八歳ではない。",
      "若い自分を演じれば嘘になる。今の自分だけを見せれば、ここを作った意味がない。作品は再現ではなく、時間の差を録る必要があった。"
    ],
    choices: [
      choice("ch5_prepare_life_keep_age", "今の声で最初のビートをやり直す", "昔より低くなった呼吸も、上手くなりすぎた技術も隠さなかった。", { stats: { beatbox: 6, trust: 3, energy: -7 }, hidden: { origin: 7, perfectionism: -3 }, routes: { craft: 6 }, addFlags: ["ch5_final_honest", "ch5_lifework_opening_ready"] }, { tone: "steady" }),
      choice("ch5_prepare_life_duet_past", "昔の録音と現在の音を重ねる", "ずれた二つのテンポが、途中で一つになる構成を発見した。", { stats: { production: 7, beatbox: 4, energy: -9 }, hidden: { origin: 6 }, routes: { craft: 6 }, addFlags: ["ch5_final_coherent", "ch5_lifework_opening_ready"] }, { tone: "bold" }),
      choice("ch5_prepare_life_include_silence", "失敗した時代を無音で表す", "炎上も停滞も説明で飾らず、音が消える時間として作品へ残した。", { stats: { production: 5, trust: 5 }, hidden: { controversy: -3, origin: 6 }, routes: { craft: 5 }, addFlags: ["ch5_final_honest", "ch5_lifework_silence"] }, { tone: "steady" })
    ],
    when: { flagsAll: ["ch5_final_lifework"] },
    priority: 90,
    oncePerRun: true,
    tags: ["production", "lifework", "final-video"],
    visual: { background: "backgrounds/ch5/dorm-bath-recreation.webp", portrait: "portraits/hikakin/quiet.webp", expression: "quiet", eventCg: "events/ch5/recreated-bathroom.webp", accent: "violet" }
  }),
  event({
    id: "ch5_prepare_mastermind",
    chapter: 5,
    slot: 6,
    title: "消すほど見える演出",
    date: "最終決戦まで4か月",
    location: "編集室",
    body: [
      "若い出演者の素材は、緊張した笑顔と説明の失敗ばかりだった。ところがヒカキンには、失敗の直後だけ見せる素の表情が主役だと分かる。",
      "足す編集ではなく、ヒカキン自身の出演部分まで削る編集が必要だった。"
    ],
    choices: [
      choice("ch5_prepare_mastermind_cut_self", "自分の出演をすべて切る", "ヒカキンの名前は概要欄の最後へ移り、若者の物語だけが残った。", { stats: { production: 8, trust: 4, subscribers: -100_000 }, hidden: { ambition: -5 }, routes: { strategy: 7 }, addFlags: ["ch5_production_selfless", "ch5_final_coherent"] }, { tone: "warm" }),
      choice("ch5_prepare_mastermind_sound", "ビートボックスを音響として忍ばせる", "歓声も緊張音も口で作り、姿を映さず自分の原点を作品へ残した。", { stats: { production: 6, beatbox: 5 }, hidden: { origin: 5 }, routes: { craft: 3, strategy: 5 }, addFlags: ["ch5_hidden_beatbox_signature"] }, { tone: "steady" }),
      choice("ch5_prepare_mastermind_teach", "編集判断を本人へ一つずつ教える", "完成は遅れたが、次からヒカキンなしでも作れる制作者が一人育った。", { stats: { production: 7, energy: -8, trust: 4 }, routes: { network: 5, strategy: 5 }, addFlags: ["ch5_successor_trained"] }, { tone: "warm" })
    ],
    when: { flagsAll: ["ch5_final_produce"] },
    priority: 88,
    oncePerRun: true,
    tags: ["production", "mastermind", "final-video"],
    visual: { background: "backgrounds/ch5/edit-suite.webp", portrait: "portraits/hikakin/mentor.webp", expression: "focused", accent: "blue" }
  }),
  event({
    id: "ch5_prepare_fallback",
    chapter: 5,
    slot: 6,
    title: "完成までの残り時間",
    date: "最終決戦まで4か月",
    location: "編集室",
    body: [
      "素材は増えたが、動画の中心が見えない。公開日を守るなら何かを捨て、完成度を守るなら何かを遅らせる必要がある。",
      "完璧主義は質を上げてきた。同時に、何本もの可能性を公開前に消してきた。"
    ],
    choices: [
      choice("ch5_prepare_deadline", "公開日を固定して削る", "核にならない場面を切り、一本として届く形を優先した。", { stats: { production: 5, energy: -7 }, hidden: { perfectionism: -5 }, routes: { strategy: 5 }, addFlags: ["ch5_final_coherent"] }, { tone: "steady" }),
      choice("ch5_prepare_quality", "公開を遅らせて完成度を上げる", "競争では不利になったが、映像と音の精度は一段上がった。", { stats: { production: 5, beatbox: 3, subscribers: -120_000, energy: -9 }, hidden: { perfectionism: 5 }, routes: { craft: 5 }, addFlags: ["ch5_final_polished"] }, { tone: "steady" }),
      choice("ch5_prepare_delegate", "信頼できる人へ編集を任せる", "自分の癖と違う切り方を受け入れ、公開までの道を守った。", { stats: { production: 3, energy: 5, money: -500_000 }, relationships: { manager: 5 }, routes: { network: 5 }, addFlags: ["ch5_final_delegated"] }, { tone: "warm" })
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["production", "deadline", "fallback"],
    visual: { background: "backgrounds/ch5/edit-suite-night.webp", portrait: "portraits/hikakin/tired.webp", expression: "tired", accent: "blue" }
  }),

  // ───────────────────────── slot 7: 制作危機 ─────────────────────────
  event({
    id: "ch5_crisis_body_limit",
    chapter: 5,
    slot: 7,
    title: "声が出ない朝",
    date: "公開まで21日",
    location: "診察室",
    body: [
      "起きても喉から音が出なかった。医師は、壊れたのではなく休まなければ壊れる状態だと言う。",
      "公開日は動かせる。日本一の勢いは動かせない。けれど、ビートボックスを失えば最後の一本どころか、その先もない。"
    ],
    choices: [
      choice("ch5_crisis_rest_voice", "全撮影を止めて休む", "公開は遅れ、登録者争いでは後退した。声は戻り、無理を美談にしない判断が残った。", { stats: { energy: 22, subscribers: -280_000, trust: 6 }, hidden: { fatigue: -18, ambition: -3 }, routes: { stability: 7 }, addFlags: ["ch5_voice_protected", "ch5_final_delayed"] }, { tone: "steady" }),
      choice("ch5_crisis_restructure_silent", "声を使わない場面から撮る", "休みながら進められる工程へ組み替え、制作を止めずに喉を守った。", { stats: { production: 6, energy: 9 }, hidden: { fatigue: -8 }, routes: { strategy: 6 }, addFlags: ["ch5_voice_protected", "ch5_crisis_restructured"] }, { tone: "steady" }),
      choice("ch5_crisis_push_voice", "一日だけ薬で押し切る", "必要なテイクは録れた。代わりに、その後の声はさらに不安定になった。", { stats: { beatbox: 3, production: 3, energy: -15 }, hidden: { fatigue: 15, ambition: 4 }, routes: { craft: 3 }, addFlags: ["ch5_voice_endangered"] }, { tone: "risky" })
    ],
    when: { maxStats: { energy: 28 }, minHidden: { fatigue: 55 } },
    priority: 95,
    oncePerRun: true,
    tags: ["health", "crisis", "consequence"],
    visual: { background: "backgrounds/ch5/clinic.webp", portrait: "portraits/hikakin/exhausted.webp", expression: "exhausted", accent: "red" }
  }),
  event({
    id: "ch5_crisis_live_system",
    chapter: 5,
    slot: 7,
    title: "止まった全国地図",
    date: "公開まで21日",
    location: "生配信リハーサル",
    body: [
      "全国から音を受け取るシステムが、本番と同じ負荷で停止した。復旧を優先すれば演出テストが減り、規模を下げれば企画の看板が変わる。",
      "画面の中心で待つヒカキンに、技術スタッフ全員の視線が集まった。"
    ],
    choices: [
      choice("ch5_crisis_live_reduce", "接続地域を絞り、確実性を取る", "参加できない地域には事前収録を依頼し、企画の意味を守った。", { stats: { production: 6, trust: 4, subscribers: -80_000 }, routes: { strategy: 6 }, addFlags: ["ch5_final_stable", "ch5_final_coherent"] }, { tone: "steady" }),
      choice("ch5_crisis_live_backup", "自費で二重システムを作る", "残り予算の大半を安全網へ使い、本番の規模を守った。", { stats: { money: -3_500_000, production: 4, trust: 2 }, routes: { stability: 4 }, addFlags: ["ch5_final_stable"] }, { tone: "bold" }),
      choice("ch5_crisis_live_gamble", "改善を信じ、規模を変えない", "成功すれば最大の瞬間になる。失敗すれば無音の生配信になる賭けを残した。", { stats: { subscribers: 160_000, energy: -5 }, hidden: { ambition: 5 }, routes: { mainstream: 4 }, addFlags: ["ch5_final_system_gamble"] }, { tone: "risky" })
    ],
    when: { flagsAll: ["ch5_final_nationwide"] },
    priority: 80,
    oncePerRun: true,
    tags: ["technical-crisis", "nationwide", "final-video"],
    visual: { background: "backgrounds/ch5/control-room-error.webp", portrait: "portraits/hikakin/worried.webp", expression: "worried", accent: "red" }
  }),
  event({
    id: "ch5_crisis_scandal_factcheck",
    chapter: 5,
    slot: 7,
    title: "存在しない二分間",
    date: "公開まで21日",
    location: "編集室",
    body: [
      "暴露動画の核になる証言には、二分間の空白があった。元データを確認すれば、柴田の語る筋書きとは別の可能性が見える。",
      "今なら止められる。だが公開予告はすでに今年最大の数字を生み、撤回すれば臆病者と笑われる。"
    ],
    choices: [
      choice("ch5_scandal_stop", "公開を中止し、経緯を説明する", "登録者は減ったが、捏造が完成品になる前に止めた。", { stats: { subscribers: -520_000, money: -1_800_000, trust: 8 }, hidden: { controversy: -12, origin: 5 }, relationships: { shibata: -15 }, routes: { stability: 6 }, addFlags: ["ch5_fabrication_stopped", "ch5_final_accountability"], removeFlags: ["ch5_final_scandal"] }, { tone: "steady" }),
      choice("ch5_scandal_reframe", "不確かな点を含めた検証動画へ変える", "断定の快感は失ったが、情報が作られる過程を見せる一本になった。", { stats: { subscribers: -120_000, production: 5, trust: 3 }, hidden: { controversy: -5 }, routes: { strategy: 5 }, addFlags: ["ch5_scandal_reframed", "ch5_final_honest"] }, { tone: "steady" }),
      choice("ch5_scandal_publish_anyway", "空白を隠して公開準備を続ける", "疑いを確信のように編集し、怒りが最大になるサムネイルを完成させた。", { stats: { subscribers: 680_000, money: 2_800_000, trust: -14 }, hidden: { controversy: 17, origin: -8 }, relationships: { shibata: 8 }, routes: { controversy: 9 }, addFlags: ["ch5_fabrication_completed"] }, { tone: "risky" })
    ],
    when: { flagsAll: ["ch5_final_scandal", "ch5_fabrication_started"] },
    priority: 100,
    oncePerRun: true,
    tags: ["controversy", "fabrication", "point-of-no-return"],
    visual: { background: "backgrounds/ch5/edit-suite-red.webp", portrait: "portraits/hikakin/uneasy.webp", expression: "uneasy", eventCg: "events/ch5/missing-two-minutes.webp", accent: "red" }
  }),
  event({
    id: "ch5_crisis_fallback_cut",
    chapter: 5,
    slot: 7,
    title: "最後に切るもの",
    date: "公開まで21日",
    location: "編集室",
    body: [
      "動画は予定より十八分長い。どの場面にも費用と努力があり、切る理由を探すほど、残したい理由ばかり見つかる。",
      "作品のために努力を捨てられるか。完成の直前で、制作者としての覚悟が問われた。"
    ],
    choices: [
      choice("ch5_cut_expensive", "最も高価な場面を切る", "予算ではなく物語に必要かで判断し、動画の中心が初めて見えた。", { stats: { production: 7, money: -500_000 }, hidden: { perfectionism: -3 }, routes: { craft: 4 }, addFlags: ["ch5_final_coherent"] }, { tone: "bold" }),
      choice("ch5_cut_personal", "自分が目立つ場面を切る", "動画全体は強くなったが、登録者を増やす見せ場は減った。", { stats: { production: 6, trust: 3, subscribers: -60_000 }, hidden: { ambition: -3 }, routes: { strategy: 4 }, addFlags: ["ch5_final_coherent", "ch5_production_selfless"] }, { tone: "warm" }),
      choice("ch5_keep_everything", "長編のまま公開する", "見たいものは全部ある。最後まで見てもらえる構成だけが足りない。", { stats: { subscribers: 120_000, production: -2 }, hidden: { perfectionism: 5 }, routes: { craft: 2 }, addFlags: ["ch5_final_overstuffed"] }, { tone: "risky" })
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["editing", "final-video", "fallback"],
    visual: { background: "backgrounds/ch5/edit-suite-night.webp", portrait: "portraits/hikakin/focused.webp", expression: "focused", accent: "blue" }
  }),

  // ───────────────────────── slot 8: 公開ボタン ─────────────────────────
  event({
    id: "ch5_release_hajime_same_time",
    chapter: 5,
    slot: 8,
    title: "同じ時刻の公開ボタン",
    date: "決戦当日・19時55分",
    location: "公開待機室",
    body: [
      "はじめ課長の大型動画も、二十時公開。残り五分で『親分、準備できました』とだけメッセージが届いた。",
      "予約公開なら触る必要はない。それでも最後の一秒までタイトルを変えられる。勝負の直前ほど、小さな迷いが巨大に見える。"
    ],
    choices: [
      choice("ch5_release_keep_title", "決めたタイトルのまま公開する", "煽り文句を足さず、動画の内容だけに賭けた。", { stats: { trust: 4, production: 2 }, hidden: { origin: 3 }, relationships: { hajime: 3 }, routes: { stability: 3 }, addFlags: ["ch5_release_clean"] }, { tone: "steady" }),
      choice("ch5_release_send_hajime", "『頂上で』と返して同時公開する", "二つの通知が同時に届き、長い競争が一本ずつの動画になった。", { stats: { subscribers: 220_000, expression: 3 }, hidden: { ambition: 4 }, relationships: { hajime: 5 }, routes: { mainstream: 4 }, addFlags: ["ch5_release_clean", "ch5_hajime_bond_intact"] }, { tone: "warm" }),
      choice("ch5_release_clickbait", "直前に対決を煽るタイトルへ変える", "初速は上がったが、動画が伝えたかったものより順位が先に見えた。", { stats: { subscribers: 400_000, trust: -4 }, hidden: { controversy: 5 }, relationships: { hajime: -3 }, routes: { controversy: 4 }, addFlags: ["ch5_release_baited"] }, { tone: "risky" })
    ],
    when: { flagsAny: ["ch5_hajime_race_declared", "ch5_hajime_public_duel", "ch5_hajime_clean_rivalry"] },
    priority: 80,
    oncePerRun: true,
    tags: ["release", "hajime", "title-race"],
    visual: { background: "backgrounds/ch5/publish-room.webp", portrait: "portraits/hikakin/determined.webp", expression: "determined", eventCg: "events/ch5/two-publish-buttons.webp", accent: "gold" }
  }),
  event({
    id: "ch5_release_lifework",
    chapter: 5,
    slot: 8,
    title: "『音が止まるまで』",
    date: "公開当日・23時58分",
    location: "再現された社員寮の浴室",
    body: [
      "サムネイルは、安いマイク一本。タイトルは『音が止まるまで』。説明欄には、撮影した年月だけを書いた。",
      "公開前の画面に映るヒカキンは、日本一を狙うスターではない。十八歳から何度も撮り直し、まだ納得していない一人の制作者だった。"
    ],
    choices: [
      choice("ch5_release_life_no_preview", "予告なしで静かに公開する", "通知だけが届き、最初の視聴者たちは意味を探しながら最後まで見た。", { stats: { trust: 5, production: 3 }, hidden: { origin: 6 }, routes: { craft: 5 }, addFlags: ["ch5_lifework_released", "ch5_release_clean"] }, { tone: "steady" }),
      choice("ch5_release_life_premiere", "視聴者と同時にプレミア公開を見る", "チャットの速さより、自分の呼吸が止まる場面で画面が静かになることに驚いた。", { stats: { subscribers: 260_000, expression: 3, trust: 4 }, hidden: { origin: 4 }, routes: { network: 4 }, addFlags: ["ch5_lifework_released", "ch5_lifework_shared_premiere"] }, { tone: "warm" }),
      choice("ch5_release_life_festival", "大規模な発表イベントで公開する", "作品は広く届いたが、静かな一音が歓声に飲まれる瞬間もあった。", { stats: { subscribers: 520_000, money: -1_000_000, expression: 3 }, hidden: { origin: -2 }, routes: { mainstream: 4 }, addFlags: ["ch5_lifework_released", "ch5_lifework_festival"] }, { tone: "bold" })
    ],
    when: { flagsAll: ["ch5_final_lifework"] },
    priority: 90,
    oncePerRun: true,
    tags: ["release", "lifework", "legendary-video"],
    visual: { background: "backgrounds/ch5/dorm-bath-recreation-night.webp", portrait: "portraits/hikakin/quiet.webp", expression: "quiet", eventCg: "events/ch5/lifework-thumbnail.webp", accent: "violet" }
  }),
  event({
    id: "ch5_release_scandal",
    chapter: 5,
    slot: 8,
    title: "『すべての真相を話します』",
    date: "公開当日・19時59分",
    location: "暗い配信室",
    body: [
      "黒い背景、白い文字、伏せられた人物名。公開前から待機人数は過去最高を更新している。",
      "本当かどうかより、誰が終わるかを見に来た人の数が増え続ける。公開ボタンの横で、訂正版のデータもまだ開いている。"
    ],
    choices: [
      choice("ch5_release_scandal_final_stop", "公開直前に中止する", "最大の数字を自分で消した。批判は浴びたが、嘘を公開した事実だけは残さなかった。", { stats: { subscribers: -650_000, money: -2_000_000, trust: 7 }, hidden: { controversy: -10, origin: 5 }, relationships: { shibata: -20 }, routes: { stability: 5 }, addFlags: ["ch5_fabrication_stopped", "ch5_final_accountability"], removeFlags: ["ch5_final_scandal"] }, { tone: "steady" }),
      choice("ch5_release_scandal_corrected", "不確かな部分を明示して公開する", "爆発的な初速は失った。代わりに、視聴者が事実と推測を区別できる動画になった。", { stats: { subscribers: 180_000, production: 4, trust: 2 }, hidden: { controversy: -4 }, routes: { strategy: 4 }, addFlags: ["ch5_scandal_reframed", "ch5_release_clean"] }, { tone: "steady" }),
      choice("ch5_release_scandal_publish", "予定どおり公開する", "数字は一秒ごとに跳ねた。訂正より怒りが速く届き、ヒカキンは画面を閉じられなくなった。", { stats: { subscribers: 1_500_000, money: 6_000_000, trust: -20 }, hidden: { controversy: 20, origin: -10 }, relationships: { shibata: 10 }, routes: { controversy: 10 }, addFlags: ["ch5_scandal_released", "ch5_fabrication_published"] }, { tone: "risky" })
    ],
    when: { flagsAll: ["ch5_final_scandal"] },
    priority: 100,
    oncePerRun: true,
    tags: ["release", "controversy", "point-of-no-return"],
    visual: { background: "backgrounds/ch5/dark-stream-room.webp", portrait: "portraits/hikakin/hollow.webp", expression: "hollow", eventCg: "events/ch5/truth-video.webp", accent: "red" }
  }),
  event({
    id: "ch5_release_fallback",
    chapter: 5,
    slot: 8,
    title: "公開",
    date: "公開当日・20時00分",
    location: "ヒカキンの撮影部屋",
    body: [
      "レンダリングは終わった。何年活動しても、公開ボタンだけは最初の投稿と同じ大きさで画面にある。",
      "完璧ではない。今の自分が完成させられる一本として、そこにある。"
    ],
    choices: [
      choice("ch5_release_now", "予定どおり公開する", "迷いが戻る前にクリックした。動画は視聴者の時間へ渡った。", { stats: { subscribers: 260_000, trust: 2, energy: -4 }, hidden: { perfectionism: -3 }, routes: { mainstream: 3 }, addFlags: ["ch5_final_released", "ch5_release_clean"] }, { tone: "bold" }),
      choice("ch5_release_watch_once", "最後に最初から一度だけ見る", "致命的なミスだけを直し、朝になる前に公開した。", { stats: { production: 3, subscribers: 140_000, energy: -7 }, hidden: { perfectionism: 2 }, routes: { craft: 3 }, addFlags: ["ch5_final_released", "ch5_final_polished"] }, { tone: "steady" }),
      choice("ch5_release_ask_team", "制作した全員の了承を確認する", "一本が自分だけのものではないと認めてから、公開ボタンを押した。", { stats: { trust: 4, energy: -3 }, relationships: { manager: 4 }, routes: { network: 4 }, addFlags: ["ch5_final_released", "ch5_team_credit_complete"] }, { tone: "warm" })
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["release", "final-video", "fallback"],
    visual: { background: "backgrounds/ch5/publish-room.webp", portrait: "portraits/hikakin/serious.webp", expression: "serious", eventCg: "events/ch5/publish-button.webp", accent: "blue" }
  }),

  // ───────────────────────── slot 9: 公開後 ─────────────────────────
  event({
    id: "ch5_result_nationwide_breakthrough",
    chapter: 5,
    slot: 9,
    title: "日本中が一つのリズムになる",
    date: "公開から24時間",
    location: "生配信管制室",
    body: [
      "遅延も途切れも乗り越え、全国の生活音がヒカキンのビートへ重なった。最後の一分、画面には投稿者の名前だけが流れる。",
      "切り抜きではなく本編が広がり、登録者の増加速度は過去最高を更新した。日本一の線が、初めて今日の延長に見える。"
    ],
    choices: [
      choice("ch5_result_nationwide_credit", "参加者全員の記録を公開する", "主役を分けたことで動画の寿命は伸び、各地から続編が生まれた。", { stats: { subscribers: 10_200_000, trust: 8, production: 4, money: 3_000_000 }, hidden: { origin: 4 }, routes: { network: 6 }, addFlags: ["ch5_final_massive_success", "ch5_nationwide_legacy"] }, { tone: "warm" }),
      choice("ch5_result_nationwide_push", "勢いのまま次の投稿を出す", "注目を逃さず、日本一までの距離を一気に縮めた。体は休めていない。", { stats: { subscribers: 10_800_000, money: 4_000_000, energy: -14 }, hidden: { fatigue: 9, ambition: 5 }, routes: { mainstream: 6 }, addFlags: ["ch5_final_massive_success", "ch5_title_surge"] }, { tone: "bold" }),
      choice("ch5_result_nationwide_pause", "一度休み、成功の理由を記録する", "熱狂から離れて構造を残し、次の世代にも再現できる知見にした。", { stats: { subscribers: 9_600_000, production: 7, energy: 12, trust: 5 }, hidden: { fatigue: -8 }, routes: { strategy: 5 }, addFlags: ["ch5_final_massive_success", "ch5_method_documented"] }, { tone: "steady" })
    ],
    when: { flagsAll: ["ch5_final_nationwide", "ch5_final_coherent"], minStats: { expression: 58, production: 58, trust: 55 } },
    priority: 95,
    oncePerRun: true,
    tags: ["result", "viral", "number-one"],
    visual: { background: "backgrounds/ch5/control-room-celebration.webp", portrait: "portraits/hikakin/overwhelmed.webp", expression: "overwhelmed", eventCg: "events/ch5/nationwide-live.webp", accent: "gold" }
  }),
  event({
    id: "ch5_result_all_genres_breakthrough",
    chapter: 5,
    slot: 9,
    title: "全部やったから、ヒカキンになった",
    date: "公開から24時間",
    location: "大型撮影スタジオ",
    body: [
      "料理、ゲーム、商品紹介、身体企画、そしてビートボックス。ばらばらに見えた活動が、何にでも本気で驚く一人の人生として一本につながった。",
      "視聴者は懐かしいジャンルを探して何度も見返し、新しい視聴者は一本の中でヒカキンの全時代を知った。動画は国内の記録を一日ごとに塗り替える。"
    ],
    choices: [
      choice("ch5_all_genres_credit", "全時代の協力者を最後に紹介する", "成功を一人の才能にせず、各時代の出会いまで一本の物語にした。", { stats: { subscribers: 9_900_000, trust: 8, production: 5, money: 3_500_000 }, relationships: { hajime: 3, zeikin: 3, manager: 4 }, routes: { network: 5 }, addFlags: ["ch5_final_massive_success", "ch5_all_eras_credited"] }, { tone: "warm" }),
      choice("ch5_all_genres_series", "未公開部分を連続企画にする", "一本の熱を一週間の連続投稿へ広げ、日本一までの最後の差を詰めた。", { stats: { subscribers: 10_600_000, money: 4_500_000, energy: -15 }, hidden: { fatigue: 10, ambition: 6 }, routes: { mainstream: 6 }, addFlags: ["ch5_final_massive_success", "ch5_title_surge"] }, { tone: "bold" }),
      choice("ch5_all_genres_explain", "なぜ全部を続けたか語る", "ビートボックスだけに閉じず、原点も捨てなかった理由が、動画の余韻を強くした。", { stats: { subscribers: 9_500_000, trust: 7, expression: 5 }, hidden: { origin: 5 }, routes: { craft: 3, mainstream: 3 }, addFlags: ["ch5_final_massive_success", "ch5_all_genres_meaning"] }, { tone: "steady" })
    ],
    when: { flagsAll: ["ch5_final_all_genres", "ch5_final_coherent"], minStats: { expression: 56, production: 58, trust: 52 } },
    priority: 92,
    oncePerRun: true,
    tags: ["result", "all-genres", "number-one"],
    visual: { background: "backgrounds/ch5/large-studio-celebration.webp", portrait: "portraits/hikakin/overwhelmed.webp", expression: "overwhelmed", eventCg: "events/ch5/all-genres-final.webp", accent: "gold" }
  }),
  event({
    id: "ch5_result_lifework_resonance",
    chapter: 5,
    slot: 9,
    title: "最後まで見た人の沈黙",
    date: "公開から一週間",
    location: "ヒカキンの撮影部屋",
    body: [
      "『音が止まるまで』は、公開直後の記録を塗り替えなかった。代わりに平均視聴時間が異常だった。多くの人が、無音の場面を飛ばさず最後まで見ている。",
      "音響家、映像作家、若い投稿者が構造を分析し始め、動画は再生数とは別の速度で文化へ沈んでいった。"
    ],
    choices: [
      choice("ch5_result_life_leave", "解説せず、作品だけを残す", "作者の答えを足さなかったことで、見る人ごとの記憶が作品の一部になった。", { stats: { subscribers: 1_100_000, trust: 7, production: 6 }, hidden: { origin: 8 }, routes: { craft: 7 }, addFlags: ["ch5_legendary_candidate", "ch5_lifework_unexplained"] }, { tone: "steady" }),
      choice("ch5_result_life_making", "失敗を含む制作記録を公開する", "完成品の神秘は少し薄れたが、挑戦を再現できる知識が広く渡った。", { stats: { subscribers: 1_350_000, production: 7, trust: 5 }, routes: { strategy: 5 }, addFlags: ["ch5_legendary_candidate", "ch5_lifework_making"] }, { tone: "warm" }),
      choice("ch5_result_life_compete", "反響を日本一争いへつなげる", "作品の余韻へ登録を呼びかけ、数字は伸びた。ただし一部の視聴者は、最後の一言を不要だと感じた。", { stats: { subscribers: 1_800_000, trust: -2 }, hidden: { ambition: 5, origin: -3 }, routes: { mainstream: 5 }, addFlags: ["ch5_legendary_candidate", "ch5_lifework_monetized"] }, { tone: "bold" })
    ],
    when: { flagsAll: ["ch5_lifework_released"], minStats: { production: 62, beatbox: 62 }, minHidden: { origin: 62 } },
    priority: 100,
    oncePerRun: true,
    tags: ["result", "lifework", "legendary-video"],
    visual: { background: "backgrounds/ch5/studio-morning.webp", portrait: "portraits/hikakin/moved.webp", expression: "moved", eventCg: "events/ch5/lifework-comments.webp", accent: "violet" }
  }),
  event({
    id: "ch5_result_produced_breakout",
    chapter: 5,
    slot: 9,
    title: "自分より伸びた一本",
    date: "公開から一週間",
    location: "編集室",
    body: [
      "プロデュースした動画は、若い制作者のチャンネル記録を何十倍も更新した。コメント欄はヒカキンではなく、初めて見つかった主役の名前で埋まっている。",
      "自分が映っていない成功を見て、悔しさより先に次の改善点が浮かんだ。それが答えなのかもしれない。"
    ],
    choices: [
      choice("ch5_result_produced_credit_creator", "成功をすべて本人へ返す", "取材でも自分の仕事を語らず、次の企画書だけを渡した。", { stats: { production: 8, trust: 7, subscribers: -80_000 }, hidden: { ambition: -5 }, routes: { strategy: 8 }, addFlags: ["ch5_mastermind_candidate", "ch5_creator_owns_success"] }, { tone: "warm" }),
      choice("ch5_result_produced_studio", "制作者を育てる小さなスタジオを作る", "出演者を囲うのではなく、自立できる制作環境へ資金を使った。", { stats: { production: 7, money: -2_000_000, trust: 5 }, relationships: { manager: 8 }, routes: { network: 6, strategy: 6 }, addFlags: ["ch5_mastermind_candidate", "ch5_creator_studio"] }, { tone: "warm" }),
      choice("ch5_result_produced_take_brand", "ヒカキン制作としてシリーズ化する", "次の仕事は急増した。若い主役より、制作ブランドの名前が先に売れ始めた。", { stats: { production: 6, money: 3_000_000, subscribers: 350_000 }, hidden: { ambition: 4 }, routes: { strategy: 5 }, addFlags: ["ch5_mastermind_candidate", "ch5_production_brand"] }, { tone: "bold" })
    ],
    when: { flagsAll: ["ch5_final_produce"], minStats: { production: 68 } },
    priority: 90,
    oncePerRun: true,
    tags: ["result", "mastermind", "producer"],
    visual: { background: "backgrounds/ch5/edit-suite-morning.webp", portrait: "portraits/hikakin/gentle.webp", expression: "gentle", eventCg: "events/ch5/young-channel-breakout.webp", accent: "blue" }
  }),
  event({
    id: "ch5_result_fallback_modest",
    chapter: 5,
    slot: 9,
    title: "伸びきらなかった一本",
    date: "公開から一週間",
    location: "ヒカキンの撮影部屋",
    body: [
      "動画は失敗ではない。だが日本一を動かす数字にも、時代を変える反響にも届かなかった。",
      "コメントには喜ぶ人がいて、口座には次を作れるだけの収益がある。残り時間で何を守るかが、結果より重要になった。"
    ],
    choices: [
      choice("ch5_modest_reedit", "短く再編集してもう一度届ける", "内容の核を見つけ直し、二度目の公開で少しずつ視聴者を増やした。", { stats: { subscribers: 420_000, production: 5, energy: -8 }, routes: { strategy: 4 }, addFlags: ["ch5_result_recovered"] }, { tone: "steady" }),
      choice("ch5_modest_accept", "結果を受け入れ、次を作らない", "最後の一本として不足を認めた。静かな決断が、別の生き方を考える余白になった。", { stats: { trust: 3, energy: 10 }, hidden: { ambition: -8, fatigue: -5 }, routes: { stability: 5 }, addFlags: ["ch5_result_accepted"] }, { tone: "steady" }),
      choice("ch5_modest_blame", "アルゴリズムのせいだと煽る", "怒りを共有する動画は本編より伸びた。作品ではなく不満を待つ視聴者が増えた。", { stats: { subscribers: 520_000, trust: -7, money: 900_000 }, hidden: { controversy: 8 }, routes: { controversy: 6 }, addFlags: ["ch5_failure_monetized"] }, { tone: "risky" })
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["result", "modest", "fallback"],
    visual: { background: "backgrounds/ch5/studio-rain.webp", portrait: "portraits/hikakin/disappointed.webp", expression: "disappointed", accent: "blue" }
  }),

  // ───────────────────────── slot 10: 最後の判定前夜 ─────────────────────────
  event({
    id: "ch5_twenty_million_countdown",
    chapter: 5,
    slot: 10,
    title: "あと一人",
    date: "最終決戦・深夜",
    location: "登録者カウント配信",
    body: [
      "十九、九百九十九万、九千九百九十九。カウンターが止まり、部屋の全員が息を止めた。",
      "はじめ課長の数字もすぐ下にある。勝敗を決める一人は、記号ではない。十八歳のヒカキンが会いたかった、画面の向こうの誰かだ。"
    ],
    choices: [
      choice("ch5_countdown_beatbox", "最初の動画と同じビートを刻む", "初代マイクへ一音を入れた瞬間、数字が二千万へ変わった。", { setStats: { subscribers: 20_000_000 }, stats: { trust: 5, beatbox: 3 }, hidden: { origin: 7 }, relationships: { hajime: 3 }, routes: { craft: 3 }, addFlags: ["ch5_number_one_achieved", "ch5_twenty_million"] }, { tone: "warm" }),
      choice("ch5_countdown_thank", "支えた全員の名前を読み上げる", "最後の一人を待つ時間が、これまでの人々へ返す時間になった。数字は二千万を越えた。", { setStats: { subscribers: 20_120_000 }, stats: { trust: 7, expression: 3 }, relationships: { hajime: 4, zeikin: 3, tetsu: 2, shiruko: 2 }, routes: { network: 4 }, addFlags: ["ch5_number_one_achieved", "ch5_twenty_million", "ch5_credits_spoken"] }, { tone: "warm" }),
      choice("ch5_countdown_next", "達成前に次の企画を発表する", "祝うより先に進む姿勢が熱狂を生み、カウンターは二千万を一気に通過した。", { setStats: { subscribers: 20_300_000 }, stats: { expression: 4, energy: -4 }, hidden: { ambition: 5 }, routes: { mainstream: 4 }, addFlags: ["ch5_number_one_achieved", "ch5_twenty_million", "ch5_never_stopped"] }, { tone: "bold" })
    ],
    when: { minStats: { subscribers: 15_000_000, trust: 60, expression: 55, production: 55 }, flagsAll: ["ch5_final_massive_success"], maxHidden: { controversy: 59 } },
    priority: 110,
    oncePerRun: true,
    tags: ["number-one", "twenty-million", "climax"],
    visual: { background: "backgrounds/ch5/countdown-live.webp", portrait: "portraits/hikakin/tearful.webp", expression: "tearful", eventCg: "events/ch5/twenty-million.webp", accent: "gold" }
  }),
  event({
    id: "ch5_lifework_enters_history",
    chapter: 5,
    slot: 10,
    title: "教科書のない授業",
    date: "公開から三か月",
    location: "映像制作の講義室",
    body: [
      "『音が止まるまで』を一時停止しながら、学生たちが音と沈黙の配置を分析していた。再生数ランキングでは一位ではない。だが作り手が学ぶ一本になっている。",
      "ヒカキンのもとには賞よりも、『これを見て初めて動画を撮った』という短い報告が届き続けた。"
    ],
    choices: [
      choice("ch5_history_no_answer", "作品の答えを語らない", "意味を固定せず、動画が見る人の経験とともに育つことを選んだ。", { stats: { trust: 5, production: 5 }, hidden: { origin: 7 }, routes: { craft: 6 }, addFlags: ["ch5_legendary_achieved", "ch5_legend_open_ended"] }, { tone: "steady" }),
      choice("ch5_history_masterclass", "制作ノートを無償公開する", "技法は秘密ではなくなった。模倣を越える作品が生まれる可能性を選んだ。", { stats: { production: 7, trust: 7 }, routes: { strategy: 5, network: 4 }, addFlags: ["ch5_legendary_achieved", "ch5_legend_methods_shared"] }, { tone: "warm" }),
      choice("ch5_history_restore_set", "再現浴室を若い制作者へ開放する", "原点の場所は展示物ではなく、次の誰かが失敗できる小さなスタジオになった。", { stats: { trust: 7, money: -700_000 }, hidden: { origin: 8 }, routes: { network: 5 }, addFlags: ["ch5_legendary_achieved", "ch5_origin_studio_open"] }, { tone: "warm" })
    ],
    when: { flagsAll: ["ch5_legendary_candidate"], minStats: { production: 66, beatbox: 64 }, minHidden: { origin: 68 }, maxHidden: { controversy: 52 } },
    priority: 105,
    oncePerRun: true,
    tags: ["legendary-video", "legacy", "climax"],
    visual: { background: "backgrounds/ch5/film-class.webp", portrait: "portraits/hikakin/quiet-smile.webp", expression: "quiet-smile", eventCg: "events/ch5/lifework-analysis.webp", accent: "violet" }
  }),
  event({
    id: "ch5_mastermind_offers",
    chapter: 5,
    slot: 10,
    title: "企画書が集まる机",
    date: "公開から三か月",
    location: "新しい制作室",
    body: [
      "自分のチャンネル更新より、相談の企画書が増えていった。出演者、編集者、地方の小さなチーム。それぞれの魅力を見つける瞬間だけは、疲れを忘れられる。",
      "カメラの前で日本一になる夢は届かなかった。だが動画を作る力には、別の頂上がある。"
    ],
    choices: [
      choice("ch5_mastermind_build_studio", "独立した制作スタジオを始める", "売れる型を押しつけず、一人ずつ違う強みを見つける場所を作った。", { stats: { production: 8, money: -1_500_000, trust: 5 }, relationships: { manager: 8 }, routes: { strategy: 7, network: 5 }, addFlags: ["ch5_mastermind_achieved", "ch5_independent_studio"] }, { tone: "warm" }),
      choice("ch5_mastermind_freelance", "名前を出さず作品ごとに支える", "ヒカキンが関わったと知られないヒットが、業界のあちこちに増えていった。", { stats: { production: 9, trust: 3 }, hidden: { ambition: -4 }, routes: { strategy: 8 }, addFlags: ["ch5_mastermind_achieved", "ch5_invisible_hits"] }, { tone: "steady" }),
      choice("ch5_mastermind_train", "後進育成へ軸足を移す", "一本の正解ではなく、試行錯誤を続ける方法を教える仕事を選んだ。", { stats: { production: 7, trust: 7 }, routes: { network: 7, strategy: 5 }, addFlags: ["ch5_mastermind_achieved", "ch5_successors_network"] }, { tone: "warm" })
    ],
    when: { flagsAll: ["ch5_mastermind_candidate"], minStats: { production: 72 }, minRoutes: { strategy: 52 } },
    priority: 100,
    oncePerRun: true,
    tags: ["mastermind", "producer", "climax"],
    visual: { background: "backgrounds/ch5/new-studio.webp", portrait: "portraits/hikakin/mentor.webp", expression: "gentle", eventCg: "events/ch5/stacked-pitches.webp", accent: "blue" }
  }),
  event({
    id: "ch5_scandal_collapse",
    chapter: 5,
    slot: 10,
    title: "嘘より速い訂正はない",
    date: "公開から48時間",
    location: "封鎖された事務所",
    body: [
      "元データが公開され、動画の筋書きが成立しないことが証明された。スポンサーは撤退し、出演者は声明を出し、柴田は自分もだまされたと次の動画を上げる。",
      "ヒカキンのチャンネルだけは過去最高のアクセスを記録した。見られている。信じられてはいない。"
    ],
    choices: [
      choice("ch5_collapse_confess", "捏造を認め、全動画を停止する", "遅すぎる告白だった。それでも最後に、再生数を言い訳にはしなかった。", { stats: { subscribers: -2_000_000, money: -7_000_000, trust: 4 }, hidden: { controversy: -7 }, relationships: { shibata: -15 }, routes: { stability: 3 }, addFlags: ["ch5_late_confession"] }, { tone: "steady" }),
      choice("ch5_collapse_attack", "反証した人々を攻撃する", "味方と敵を作るたび再生数は増え、事実を確かめる視聴者は減っていった。", { stats: { subscribers: 900_000, money: 4_000_000, trust: -15 }, hidden: { controversy: 18, origin: -8 }, relationships: { shibata: 5 }, routes: { controversy: 10 }, addFlags: ["ch5_controversy_king", "ch5_truth_abandoned"] }, { tone: "risky" }),
      choice("ch5_collapse_final_truth", "『すべての真相』という再反論を出す", "謝罪に見えるサムネイルで反論し、注目をさらに収益へ変えた。", { stats: { subscribers: 600_000, money: 3_000_000, trust: -12 }, hidden: { controversy: 15 }, routes: { controversy: 9 }, addFlags: ["ch5_controversy_king", "ch5_endless_truth_videos"] }, { tone: "risky" })
    ],
    when: { flagsAll: ["ch5_fabrication_published"], maxStats: { trust: 39 } },
    priority: 120,
    oncePerRun: true,
    tags: ["controversy", "collapse", "climax"],
    visual: { background: "backgrounds/ch5/sealed-office.webp", portrait: "portraits/hikakin/hollow.webp", expression: "hollow", eventCg: "events/ch5/sponsors-gone.webp", accent: "red" }
  }),
  event({
    id: "ch5_last_crossroads_fallback",
    chapter: 5,
    slot: 10,
    title: "続け方を選ぶ",
    date: "最終企画から三か月",
    location: "夜の撮影部屋",
    body: [
      "日本一には届かず、一本も伝説にはならなかった。それでも、ここまでに身につけたものは消えていない。",
      "もう一度自分を撮るか、誰かの作品を作るか、生活を立て直すか。何者かになるという言葉を、現実に合わせて選び直す夜が来た。"
    ],
    choices: [
      choice("ch5_crossroad_producer", "企画と編集の仕事を引き受ける", "出演の悔しさを抱えたまま、他人の魅力を見つける机へ向かった。", { stats: { production: 7, money: 800_000 }, routes: { strategy: 6 }, addFlags: ["ch5_mastermind_achieved", "ch5_mastermind_bittersweet"] }, { tone: "steady", when: { minStats: { production: 58 } } }),
      choice("ch5_crossroad_supermarket", "スーパーへ戻り、生活を立て直す", "かつての職場は華やかな経歴ではなく、働けるかどうかだけを見た。社員寮の鍵が再び手に乗った。", { stats: { money: 300_000, energy: -4 }, hidden: { origin: 3, ambition: -8 }, relationships: { supermarket: 10 }, routes: { stability: 8 }, addFlags: ["ch5_street_fate", "ch5_supermarket_dorm_again"] }, { tone: "steady" }),
      choice("ch5_crossroad_provoke", "失敗を炎上ネタにして続ける", "成功者への不満と暴露を話すたび、再生数だけは戻ってきた。", { stats: { subscribers: 450_000, trust: -10, money: 900_000 }, hidden: { controversy: 12 }, routes: { controversy: 8 }, addFlags: ["ch5_controversy_king"] }, { tone: "risky" })
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["crossroads", "ending-setup", "fallback"],
    visual: { background: "backgrounds/ch5/studio-empty-night.webp", portrait: "portraits/hikakin/quiet.webp", expression: "quiet", accent: "blue" }
  }),

  // ───────────────────────── slot 11: エピローグ直前 ─────────────────────────
  event({
    id: "ch5_four_emperors_crowning_massuo_note",
    chapter: 5,
    slot: 11,
    title: "四皇時代",
    date: "二千万人達成の翌日",
    location: "四者合同記念番組",
    body: [
      "ヒカキン、はじめ課長、東大オンエアのテツ、漁師たちのシル子。違う分野を頂点まで育てた四人を、視聴者は『YouTuber四皇』と呼び始めた。",
      "日本一はヒカキン、日本二位ははじめ課長。数字の順番はある。それでもテツの地域、シル子の子供人気は、同じ物差しでは測れない強さだった。",
      "収録直前、通知欄の隅に『もう笑うのをやめる――ダークまっすお』という幼なじみの新着動画が出た。ヒカキンは少し眉を上げ、あとで見る印を付ける。今は四人の撮影が始まる。"
    ],
    speaker: "はじめ課長",
    quote: "親分、日本一おめでとうございます。次は二千万人の上で勝ちます。",
    choices: [
      choice("ch5_four_crown_share", "四人で次の巨大コラボを発表する", "頂点は終点ではなく、違う強みが交わる新しいスタートになった。", { stats: { trust: 7, subscribers: 300_000 }, relationships: { hajime: 6, tetsu: 6, shiruko: 6, massuo: 1 }, routes: { network: 6 }, addFlags: ["ch5_four_emperors_achieved", "four_emperors_achieved", "ch5_dark_massuo_epilogue", "ch5_ending_ready"] }, { tone: "warm" }),
      choice("ch5_four_crown_each", "四人が別々であることを語る", "同じ型の王を四人作るのではない。それぞれの場所を守る言葉が、四皇という呼び名の意味になった。", { stats: { trust: 8, expression: 3 }, relationships: { hajime: 4, tetsu: 5, shiruko: 5 }, routes: { stability: 4 }, addFlags: ["ch5_four_emperors_achieved", "four_emperors_achieved", "ch5_dark_massuo_epilogue", "ch5_ending_ready"] }, { tone: "steady" }),
      choice("ch5_four_crown_beat", "四人の持ち味を即興ビートにする", "挑戦、地元、遊び、総合力。四つのリズムが重なり、記念番組のオープニングになった。", { stats: { beatbox: 4, expression: 4, subscribers: 220_000 }, hidden: { origin: 4 }, addFlags: ["ch5_four_emperors_achieved", "four_emperors_achieved", "ch5_dark_massuo_epilogue", "ch5_ending_ready"] }, { tone: "bold" })
    ],
    when: { flagsAll: ["ch5_number_one_achieved", "ch5_four_emperors_ready"], minRelationships: { hajime: 55, tetsu: 45, shiruko: 45, massuo: 30 }, minStats: { trust: 68 } },
    priority: 130,
    oncePerRun: true,
    tags: ["four-emperors", "number-one", "massuo-cameo", "ending"],
    visual: { background: "backgrounds/ch5/four-emperors-stage.webp", portrait: "portraits/hikakin/joy.webp", expression: "joy", eventCg: "events/ch5/four-emperors.webp", accent: "gold" }
  }),
  event({
    id: "ch5_four_emperors_crowning",
    chapter: 5,
    slot: 11,
    title: "四皇時代",
    date: "二千万人達成の翌日",
    location: "四者合同記念番組",
    body: [
      "ヒカキン、はじめ課長、東大オンエアのテツ、漁師たちのシル子。違う分野を頂点まで育てた四人を、視聴者は『YouTuber四皇』と呼び始めた。",
      "日本一はヒカキン、日本二位ははじめ課長。だがテツの地域、シル子の子供人気は、同じ物差しでは測れない強さだ。四人が並ぶことで、動画の時代そのものが広く見えた。"
    ],
    speaker: "はじめ課長",
    quote: "親分、日本一おめでとうございます。次は二千万人の上で勝ちます。",
    choices: [
      choice("ch5_four_plain_collab", "四人で次の巨大コラボを発表する", "頂点は終点ではなく、違う強みが交わる新しいスタートになった。", { stats: { trust: 7, subscribers: 300_000 }, relationships: { hajime: 6, tetsu: 6, shiruko: 6 }, routes: { network: 6 }, addFlags: ["ch5_four_emperors_achieved", "four_emperors_achieved", "ch5_ending_ready"] }, { tone: "warm" }),
      choice("ch5_four_plain_respect", "四人が別々であることを語る", "それぞれの場所を守る言葉が、四皇という呼び名の意味になった。", { stats: { trust: 8, expression: 3 }, relationships: { hajime: 4, tetsu: 5, shiruko: 5 }, routes: { stability: 4 }, addFlags: ["ch5_four_emperors_achieved", "four_emperors_achieved", "ch5_ending_ready"] }, { tone: "steady" }),
      choice("ch5_four_plain_beat", "四人の持ち味を即興ビートにする", "挑戦、地元、遊び、総合力。四つのリズムが重なった。", { stats: { beatbox: 4, expression: 4, subscribers: 220_000 }, hidden: { origin: 4 }, addFlags: ["ch5_four_emperors_achieved", "four_emperors_achieved", "ch5_ending_ready"] }, { tone: "bold" })
    ],
    when: { flagsAll: ["ch5_number_one_achieved", "ch5_four_emperors_ready"], minRelationships: { hajime: 55, tetsu: 45, shiruko: 45 }, minStats: { trust: 68 } },
    priority: 125,
    oncePerRun: true,
    tags: ["four-emperors", "number-one", "ending"],
    visual: { background: "backgrounds/ch5/four-emperors-stage.webp", portrait: "portraits/hikakin/joy.webp", expression: "joy", eventCg: "events/ch5/four-emperors.webp", accent: "gold" }
  }),
  event({
    id: "ch5_number_one_room",
    chapter: 5,
    slot: 11,
    title: "日本一の部屋",
    date: "二千万人達成の翌朝",
    location: "ヒカキンの撮影部屋",
    body: [
      "祝勝会を終え、ヒカキンは一人で撮影部屋へ戻った。日本一を示す盾の横に、安い初代マイクを置く。",
      "はじめ課長から届いた『次は勝ちます、親分』というメッセージへ、次の企画書の写真を返した。二千万人は結末ではない。"
    ],
    choices: [
      choice("ch5_number_one_record", "最初と同じビートを一本だけ録る", "今度は何百万人もの人が、その一音を待っていた。", { stats: { beatbox: 3, trust: 5 }, hidden: { origin: 6 }, relationships: { hajime: 3 }, addFlags: ["ch5_number_one_origin_kept", "ch5_ending_ready"] }, { tone: "warm" }),
      choice("ch5_number_one_plan", "すぐ次の企画書を開く", "日本一を守るためではなく、まだ見たことのない動画を作るために働き始めた。", { stats: { production: 4, expression: 2 }, hidden: { ambition: 4 }, addFlags: ["ch5_number_one_keeps_building", "ch5_ending_ready"] }, { tone: "bold" }),
      choice("ch5_number_one_call_family", "ゼイキンと家族へ電話する", "上京の日に二万円を渡された青年の声で、ようやく『日本一になった』と言えた。", { stats: { trust: 4, energy: 5 }, relationships: { zeikin: 5 }, addFlags: ["ch5_number_one_family", "ch5_ending_ready"] }, { tone: "warm" })
    ],
    when: { flagsAll: ["ch5_number_one_achieved"] },
    priority: 115,
    oncePerRun: true,
    tags: ["number-one", "ending", "origin"],
    visual: { background: "backgrounds/ch5/studio-sunrise.webp", portrait: "portraits/hikakin/tearful-smile.webp", expression: "tearful-smile", eventCg: "events/ch5/old-mic-and-crown.webp", accent: "gold" }
  }),
  event({
    id: "ch5_legend_final_frame",
    chapter: 5,
    slot: 11,
    title: "伝説になった一音",
    date: "数年後",
    location: "再現浴室スタジオ",
    body: [
      "『音が止まるまで』は、年間最多再生の動画ではなかった。それでも作り手が節目に見返す一本になり、模倣ではない新しい作品をいくつも生んだ。",
      "最後のフレームには、十八歳のころと同じ安いマイクが一本だけ映る。そこへ至るまでの音を知る人には、それがどんな豪華なセットより大きく見えた。"
    ],
    speaker: "ヒカキン",
    quote: "何者になれたかは分からない。でも、僕にしか作れない一本は作れた。",
    choices: [
      choice("ch5_legend_archive", "作品と全素材を永久保存する", "成功テイクだけでなく、迷いと失敗も次の時代へ残した。", { stats: { production: 4, trust: 5 }, hidden: { origin: 5 }, addFlags: ["ch5_legend_archive_complete", "ch5_ending_ready"] }, { tone: "steady" }),
      choice("ch5_legend_return_regular", "翌日から普通の商品紹介を撮る", "伝説を演じ続けず、一本を作った生活者として日常の動画へ戻った。", { stats: { expression: 3, trust: 4 }, routes: { mainstream: 3 }, addFlags: ["ch5_legend_stayed_human", "ch5_ending_ready"] }, { tone: "warm" }),
      choice("ch5_legend_leave_mic", "初代マイクをスタジオへ置いて帰る", "次にそこで撮る誰かのため、原点を自分だけの記念品にしなかった。", { stats: { trust: 5 }, hidden: { origin: 6 }, routes: { network: 3 }, addFlags: ["ch5_legend_mic_passed", "ch5_ending_ready"] }, { tone: "warm" })
    ],
    when: { flagsAll: ["ch5_legendary_achieved"] },
    priority: 110,
    oncePerRun: true,
    tags: ["legendary-video", "ending", "legacy"],
    visual: { background: "backgrounds/ch5/dorm-bath-recreation-empty.webp", portrait: "portraits/hikakin/quiet-smile.webp", expression: "quiet-smile", eventCg: "events/ch5/legend-final-frame.webp", accent: "violet" }
  }),
  event({
    id: "ch5_mastermind_signature",
    chapter: 5,
    slot: 11,
    title: "映らないヒカキン",
    date: "数年後",
    location: "制作スタジオ",
    body: [
      "ヒカキン本人のチャンネル更新は、いつしか止まった。代わりに、彼が企画した動画が毎週どこかでランキングへ上がる。",
      "出演者の魅力を奪わず、失敗の中から一番その人らしい瞬間を見つける。画面には映らなくても、動画を作る手つきは確かに残った。"
    ],
    speaker: "若い制作者",
    quote: "答えは教えてくれない。でも、自分の答えが映っている場所を見つけてくれる。",
    choices: [
      choice("ch5_mastermind_signature_sound", "作品に小さな口音だけを残す", "気づく人だけが気づく一音が、ヒカキン制作の署名になった。", { stats: { production: 4, beatbox: 3 }, hidden: { origin: 4 }, addFlags: ["ch5_mastermind_beat_signature", "ch5_ending_ready"] }, { tone: "steady" }),
      choice("ch5_mastermind_no_signature", "自分の痕跡を完全に消す", "作品の成功は出演者のものになり、ヒカキンは次の編集室へ向かった。", { stats: { production: 5, trust: 3 }, hidden: { ambition: -3 }, addFlags: ["ch5_mastermind_invisible", "ch5_ending_ready"] }, { tone: "warm" }),
      choice("ch5_mastermind_one_lecture", "年に一度だけ制作を語る", "完成品より失敗の分析を語る講義が、新しい投稿者の入口になった。", { stats: { production: 4, trust: 5, expression: 2 }, routes: { network: 4 }, addFlags: ["ch5_mastermind_teacher", "ch5_ending_ready"] }, { tone: "warm" })
    ],
    when: { flagsAll: ["ch5_mastermind_achieved"] },
    priority: 105,
    oncePerRun: true,
    tags: ["mastermind", "ending", "producer"],
    visual: { background: "backgrounds/ch5/production-studio.webp", portrait: "portraits/hikakin/mentor.webp", expression: "gentle", eventCg: "events/ch5/invisible-producer.webp", accent: "blue" }
  }),
  event({
    id: "ch5_controversy_throne",
    chapter: 5,
    slot: 11,
    title: "炎上王",
    date: "最終動画の翌月",
    location: "暗い配信室",
    body: [
      "スポンサーも友人も去った。代わりに通知は止まらない。何を話しても怒る人と擁護する人が集まり、動画は毎回ニュースになる。",
      "机の上には『すべての真相を話します』の次の台本。謝罪、反論、暴露。見出しは違っても、目的は同じだった。",
      "何者かにはなった。誰もが名前を知る、最も信用されない投稿者に。"
    ],
    speaker: "ヒカキン",
    quote: "今日も見てる。嫌いなのに、みんな僕を見てる。",
    choices: [
      choice("ch5_controversy_continue", "次の『真相』を公開する", "登録解除と新規登録が同時に増え、炎だけがチャンネルを動かし続けた。", { stats: { subscribers: 300_000, trust: -6, money: 900_000 }, hidden: { controversy: 8, origin: -5 }, addFlags: ["ch5_controversy_king", "ch5_ending_ready", "ch5_fire_never_ends"] }, { tone: "risky" }),
      choice("ch5_controversy_livestream", "批判コメントを読む生配信を始める", "怒りを読み上げる声に、昔のビートボックスの面影はなかった。", { stats: { subscribers: 180_000, trust: -5 }, hidden: { controversy: 7 }, routes: { controversy: 5 }, addFlags: ["ch5_controversy_king", "ch5_ending_ready", "ch5_comments_as_fuel"] }, { tone: "risky" }),
      choice("ch5_controversy_silence", "カメラの前で何も言えなくなる", "配信待機人数だけが増え続け、沈黙さえ切り抜きの材料になった。", { stats: { energy: -8, trust: -3 }, hidden: { fatigue: 8 }, addFlags: ["ch5_controversy_king", "ch5_ending_ready", "ch5_hollow_silence"] }, { tone: "steady" })
    ],
    when: { flagsAll: ["ch5_controversy_king"] },
    priority: 120,
    oncePerRun: true,
    tags: ["controversy", "ending", "bad"],
    visual: { background: "backgrounds/ch5/dark-stream-room.webp", portrait: "portraits/hikakin/hollow.webp", expression: "hollow", eventCg: "events/ch5/controversy-throne.webp", accent: "red" }
  }),
  event({
    id: "ch5_street_last_beat",
    chapter: 5,
    slot: 11,
    title: "路上のビートボクサー",
    date: "数年後・冬",
    location: "駅前の路上",
    body: [
      "昼はスーパーで品出しをし、給料から社員寮の家賃が引かれる。夜になると、ヒカキンは駅前へ古いマイクを持っていく。",
      "かつて何百万人が見た名前を覚えている人は、ほとんど通らない。動画の収益も、華やかな撮影部屋もない。",
      "それでも口から出る音だけは、十八歳のころより上手い。上手いことを証明する相手がいないまま、ビートは冷たい歩道へ消えていく。"
    ],
    speaker: "通りがかった子供",
    quote: "おじさん、YouTuberなの？",
    choices: [
      choice("ch5_street_say_past", "『昔ね』と答える", "子供が去ったあとも、過去形にできない音だけを続けた。", { stats: { energy: -3 }, hidden: { origin: 4, ambition: -8 }, relationships: { supermarket: 2 }, addFlags: ["ch5_street_fate", "ch5_ending_ready", "ch5_street_said_past"] }, { tone: "steady" }),
      choice("ch5_street_say_not_yet", "『これからなる』と答える", "何者かになるという言葉だけが、負けを認めないまま残っていた。", { stats: { beatbox: 2 }, hidden: { ambition: 5, origin: 3 }, addFlags: ["ch5_street_fate", "ch5_ending_ready", "ch5_street_still_dreams"] }, { tone: "bold" }),
      choice("ch5_street_answer_with_beat", "答えず、一番得意な音を鳴らす", "子供は少しだけ立ち止まり、やがて家族を追って走った。投げ銭箱は空のままだった。", { stats: { beatbox: 3 }, hidden: { origin: 5 }, addFlags: ["ch5_street_fate", "ch5_ending_ready", "ch5_street_wordless"] }, { tone: "steady" })
    ],
    when: { flagsAny: ["ch5_street_fate", "ch5_supermarket_dorm_again"], maxStats: { subscribers: 7_000_000, money: 1_500_000 } },
    priority: 100,
    oncePerRun: true,
    tags: ["street", "supermarket", "ending", "bad"],
    visual: { background: "backgrounds/ch5/station-street-winter.webp", portrait: "portraits/hikakin/older-tired.webp", expression: "tired", eventCg: "events/ch5/street-beatbox.webp", accent: "blue" }
  }),
  event({
    id: "ch5_epilogue_fallback",
    chapter: 5,
    slot: 11,
    title: "カメラを置いたあと",
    date: "最終企画の翌年",
    location: "空になった撮影部屋",
    body: [
      "日本一にも、伝説にも届かなかった。機材を箱へ戻すと、部屋は驚くほど普通の広さに見えた。",
      "残ったのは、動画を作る技術と、まだ捨てられないビートボックス。どちらを生活へ持っていくかで、次の名前が決まる。"
    ],
    choices: [
      choice("ch5_epilogue_edit_others", "他人の動画を編集する仕事を始める", "最初の依頼動画で、出演者本人も知らなかった魅力を一つ見つけた。", { stats: { production: 5, money: 500_000 }, routes: { strategy: 5 }, addFlags: ["ch5_mastermind_achieved", "ch5_mastermind_bittersweet", "ch5_ending_ready"] }, { tone: "steady", when: { minStats: { production: 52 } } }),
      choice("ch5_epilogue_return_store", "スーパーの社員寮へ戻る", "昼の仕事と夜の路上演奏だけが、もう一度一週間の形を作った。", { stats: { money: 250_000 }, hidden: { ambition: -6 }, relationships: { supermarket: 8 }, routes: { stability: 6 }, addFlags: ["ch5_street_fate", "ch5_supermarket_dorm_again", "ch5_ending_ready"] }, { tone: "steady" }),
      choice("ch5_epilogue_burn", "失敗を暴露話へ変える", "誰かの名前を出すたび視聴者が戻り、信用より注目を選ぶ生活が始まった。", { stats: { subscribers: 350_000, trust: -9, money: 600_000 }, hidden: { controversy: 10 }, routes: { controversy: 7 }, addFlags: ["ch5_controversy_king", "ch5_ending_ready"] }, { tone: "risky" })
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["ending", "fallback", "crossroads"],
    visual: { background: "backgrounds/ch5/empty-studio.webp", portrait: "portraits/hikakin/quiet.webp", expression: "quiet", accent: "blue" }
  })
];
