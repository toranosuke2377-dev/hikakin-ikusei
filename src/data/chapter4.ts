import type { StoryEvent } from "../game/types";
import { choice, event, when } from "./helpers";

const ch4 = (
  definition: Omit<StoryEvent, "chapter" | "oncePerRun">
): StoryEvent =>
  event({
    ...definition,
    chapter: 4,
    oncePerRun: true
  });

/**
 * 第4章「人気という怪物」
 * 第3章までの選択を危機の種類・責任の重さ・回復可能性へ変換する章。
 * マコト事件は被害を娯楽化せず、ヒカキンが加害へどう向き合うかに焦点を置く。
 */
export const chapter4Events: StoryEvent[] = [
  // ── slot 0: 成功の影が輪郭を持つ ─────────────────────
  ch4({
    id: "ch4_00_multiple_crises",
    slot: 0,
    title: "一つずつ先送りした朝",
    date: "2017年 秋",
    location: "制作オフィス",
    body: [
      "広告表記への質問、スタッフの勤務記録、共演者についての取材依頼。別々に先送りしてきた問題が、同じ朝の受信箱へ並んだ。",
      "登録者は増え続け、次の大型撮影も目前にある。どれか一つだけ説明しても、残りの沈黙が別の疑惑を育てる段階まで来ていた。"
    ],
    speaker: "ヒカキン",
    quote: "大きくなったから隠せるんじゃない。大きくなったから、全部見られる。",
    choices: [
      choice("ch4_00_multiple_audit", "予定を止め、第三者を入れて全件を調べる", [
        "公開予定を二週間止め、契約、勤務記録、過去映像を外部の専門家へ渡した。調査中は憶測も増えたが、自分に都合のよい結論だけを出す余地をなくす。",
        "損失は大きい。それでも、後に事実を説明する土台ができた。"
      ], {
        stats: { subscribers: -280_000, money: -2_000_000, trust: 9, energy: 5 },
        hidden: { controversy: -5, fatigue: -7, origin: 6 },
        routes: { stability: 6, strategy: 4 },
        relationships: { manager: 8 },
        addFlags: ["ch4_external_audit", "ch4_crisis_owned", "ch4_recovery_ready"]
      }, { tone: "steady", subtext: "短期の損失と引き換えに事実を確かめる" }),
      choice("ch4_00_multiple_prioritize", "被害や健康に関わる問題から対応する", [
        "数字への影響ではなく、人の安全へ影響する順に対応表を作った。スタッフの休息と関係者の相談窓口を先に確保し、広告問題は期限を示して後日に説明する。",
        "すべてを即時解決はできないが、優先順位そのものに責任を示した。"
      ], {
        stats: { trust: 7, money: -900_000, energy: 4, production: 3 },
        hidden: { controversy: -3, fatigue: -5, origin: 5 },
        routes: { stability: 5, network: 3 },
        relationships: { manager: 6 },
        addFlags: ["ch4_people_first", "ch4_crisis_owned", "ch4_recovery_ready"]
      }, { tone: "warm", subtext: "人への影響が大きい順に直す" }),
      choice("ch4_00_multiple_campaign", "大型企画で話題を上書きする", [
        "制作費を倍にし、ニュース欄を新記録で埋めた。数週間は疑問の声が押し流され、再生数だけは過去最大に増える。",
        "問題は解決されず、関係者には『数字で黙らせた』という記憶が残った。"
      ], {
        stats: { subscribers: 1_100_000, money: -1_300_000, trust: -15, energy: -12 },
        hidden: { controversy: 16, fatigue: 10, ambition: 10, origin: -9 },
        routes: { controversy: 8, mainstream: 5 },
        relationships: { manager: -8 },
        addFlags: ["ch4_scandal_buried", "ch4_crisis_denied", "ch4_evidence_pressure"]
      }, { tone: "risky", subtext: "話題は変わるが、問題は重くなる" })
    ],
    when: when({ flagsAny: ["ch4_multiple_crisis_seed", "ch3_problems_deferred"] }),
    priority: 35,
    tags: ["opening", "crisis", "consequence"],
    visual: {
      background: "bg/ch4_office_alerts",
      portrait: "portrait/hikakin",
      expression: "shaken",
      eventCg: "cg/ch4_inbox_three_crises",
      accent: "red"
    }
  }),
  ch4({
    id: "ch4_00_burnout_opening",
    slot: 0,
    title: "笑顔が始まらない",
    date: "2017年 秋",
    location: "撮影スタジオ",
    body: [
      "照明がつき、カメラが回り、いつもの挨拶の合図が出た。ヒカキンは口を開いたまま、最初の一言を出せなかった。台詞を忘れたのではない。笑顔になる理由が身体から消えていた。",
      "スタッフは『五分休みましょう』と言う。だが五分で戻る問題ではないことを、本人だけは分かっていた。"
    ],
    choices: [
      choice("ch4_00_burnout_pause", "期限を決めず活動を休止する", [
        "スポンサーと視聴者へ、詳細を飾らず『続けるために休む』と説明した。最初の一週間、ヒカキンは再生数を見るアプリも消す。",
        "登録者は減ったが、身体と動画を再び切り離して考える時間が生まれた。"
      ], {
        stats: { subscribers: -420_000, money: -1_100_000, energy: 30, trust: 10 },
        hidden: { fatigue: -28, origin: 9, perfectionism: -6 },
        routes: { stability: 8 },
        relationships: { manager: 8 },
        addFlags: ["ch4_burnout_pause", "ch4_health_reformed", "ch4_recovery_ready"]
      }, { tone: "warm", subtext: "復帰日より回復を優先する" }),
      choice("ch4_00_burnout_reduce", "出演本数を半分にし、制作へ比重を移す", [
        "毎週出ることをやめ、企画と最終確認だけを担当する回を増やした。表舞台から少し離れると、他人の魅力を引き出す自分の強みに気づく。",
        "健康は持ち直し、裏方としての道も具体的になった。"
      ], {
        stats: { subscribers: -150_000, production: 7, energy: 17, trust: 6 },
        hidden: { fatigue: -16, origin: 4 },
        routes: { strategy: 5, stability: 5 },
        relationships: { manager: 6 },
        addFlags: ["ch4_reduced_appearances", "mastermind_path_open", "ch4_health_reformed"]
      }, { tone: "steady", subtext: "出演を減らし、別の才能を育てる" }),
      choice("ch4_00_burnout_perform", "撮影が始まれば戻ると続行する", [
        "テイク三でいつもの笑顔を作れた。公開された動画から不調を見抜く視聴者はほとんどおらず、数字も伸びる。",
        "終わった瞬間に表情が消えることを、現場の全員が見ていた。"
      ], {
        stats: { subscribers: 520_000, money: 750_000, energy: -24, trust: -5 },
        hidden: { fatigue: 24, origin: -10, ambition: 7 },
        routes: { controversy: 4, mainstream: 4 },
        relationships: { manager: -6 },
        addFlags: ["ch4_burnout_denied", "ch4_collapse_seed"]
      }, { tone: "risky", subtext: "画面は守るが、本人が空になる" })
    ],
    when: when({ flagsAny: ["ch4_burnout_seed", "ch3_overwork_normalized"], minHidden: { fatigue: 35 } }),
    priority: 30,
    tags: ["opening", "health", "consequence"],
    visual: {
      background: "bg/ch4_studio_frozen",
      portrait: "portrait/hikakin",
      expression: "empty",
      eventCg: "cg/ch4_smile_will_not_start",
      accent: "red"
    }
  }),
  ch4({
    id: "ch4_00_popularity_monster",
    slot: 0,
    title: "人気という怪物",
    date: "2017年 秋",
    location: "撮影部屋",
    body: [
      "動画を出さない日は、登録者が減る気がした。新しいことをすれば変わったと言われ、同じことをすれば飽きたと言われる。数字は成功を教える道具から、毎朝機嫌を確かめる怪物へ変わっていた。",
      "そのすぐ後ろでは、はじめ課長が記録を更新している。親友の成功を祝う気持ちまで、順位表は競争へ変えようとする。"
    ],
    speaker: "ヒカキン",
    quote: "数字を見るなとは言えない。でも、数字だけに僕を決めさせたくない。",
    choices: [
      choice("ch4_00_monster_rules", "見る指標と時間を制限する", [
        "再生数を確認するのは公開後二回だけと決め、視聴者の感想と制作チームの振り返りも同じ重さで記録した。",
        "不安は消えないが、不安が一日の全判断を奪うことは減った。"
      ], {
        stats: { production: 4, energy: 10, trust: 4 },
        hidden: { fatigue: -8, origin: 5, ambition: -2 },
        routes: { stability: 5, strategy: 2 },
        addFlags: ["ch4_metrics_boundary", "ch4_recovery_ready"]
      }, { tone: "steady", subtext: "数字を捨てず、見る時間を決める" }),
      choice("ch4_00_monster_talk", "視聴者へ重圧を正直に話す", [
        "成功者の弱音だと批判する声もあったが、ヒカキンは感謝と苦しさが両立すると説明した。コメント欄には休みながら続けてほしいという声も集まる。",
        "視聴者を数字ではなく人として見直すきっかけになった。"
      ], {
        stats: { subscribers: 120_000, expression: 6, trust: 9, energy: 5 },
        hidden: { origin: 8, fatigue: -5 },
        routes: { mainstream: 3, network: 3 },
        addFlags: ["ch4_pressure_disclosed", "ch4_audience_dialogue"]
      }, { tone: "warm", subtext: "弱さを隠さず、視聴者と関係を作る" }),
      choice("ch4_00_monster_accelerate", "不安を消すため投稿数を増やす", [
        "毎日一本、短い動画も含めて画面を埋めた。アルゴリズム上の露出は増え、登録者も勢いを取り戻す。",
        "一本が伸びても安心できるのは数時間だけになり、怪物へ与える餌の量が増えた。"
      ], {
        stats: { subscribers: 680_000, money: 900_000, energy: -20 },
        hidden: { fatigue: 18, controversy: 6, ambition: 8, origin: -7 },
        routes: { mainstream: 5, controversy: 3 },
        addFlags: ["ch4_upload_treadmill", "ch4_burnout_seed"]
      }, { tone: "risky", subtext: "不安を数字で一時的に黙らせる" })
    ],
    priority: 0,
    tags: ["opening", "pressure", "fallback"],
    visual: {
      background: "bg/ch4_studio_metrics",
      portrait: "portrait/hikakin",
      expression: "anxious",
      eventCg: "cg/ch4_numbers_monster",
      accent: "blue"
    }
  }),

  // ── slot 1: 過去の選択が危機になる ───────────────────
  ch4({
    id: "ch4_01_ad_disclosure_scandal",
    slot: 1,
    title: "『おすすめ』の値段",
    date: "2018年 春",
    location: "事務所 会見準備室",
    body: [
      "過去の商品紹介に広告表記がなかったことを、契約資料とともに報じられた。実際に気に入った商品も含まれるが、報酬を受けた事実を視聴者が判断できなかったことは変わらない。",
      "担当者は当時の慣習だったと説明する案を出す。ヒカキン自身の声で、何が不十分だったかを言わなければ、信頼は企業の言葉に置き換えられる。"
    ],
    choices: [
      choice("ch4_01_ad_own", "全対象動画を示し、収益と契約を説明する", [
        "該当動画を一覧化し、広告収益の一部を消費者支援へ回した。商品の感想まで嘘だったとは言わず、表記不足という自分の責任を具体的に認める。",
        "登録者は大きく減ったが、説明後のルールを守る姿勢が時間をかけて信用を戻した。"
      ], {
        stats: { subscribers: -520_000, money: -2_200_000, trust: 10 },
        hidden: { controversy: -8, origin: 6 },
        routes: { stability: 6 },
        relationships: { manager: 4 },
        addFlags: ["ch4_ad_restitution", "ch4_crisis_owned", "ch4_recovery_ready"],
        removeFlags: ["ch4_ad_scandal_seed"]
      }, { tone: "steady", subtext: "範囲・利益・再発防止を具体的に示す" }),
      choice("ch4_01_ad_context", "当時の慣習を説明し、今後の基準だけ改める", [
        "法的問題と視聴者の納得を分け、当時の環境も含めて説明した。新しい表記ルールは明確になったが、過去の利益には触れない。",
        "炎上は収まったものの、古参視聴者の一部には言い逃れという印象が残る。"
      ], {
        stats: { subscribers: -180_000, money: -500_000, trust: 2, production: 3 },
        hidden: { controversy: -2, origin: -1 },
        routes: { strategy: 5, stability: 2 },
        relationships: { manager: 5 },
        addFlags: ["ch4_ad_policy_changed", "ch4_partial_accountability"]
      }, { tone: "steady", subtext: "制度は直すが、過去の利益は残す" }),
      choice("ch4_01_ad_deny", "契約上問題ないとして謝罪しない", [
        "違法ではないという声明を出すと、企業は契約を維持した。だが視聴者が問うていたのは法律だけではなく、判断材料を隠されたことだった。",
        "資料を出した側との応酬が続き、ヒカキンの動画外で再生される炎上が増えた。"
      ], {
        stats: { subscribers: 90_000, money: 1_100_000, trust: -18 },
        hidden: { controversy: 16, ambition: 4, origin: -8 },
        routes: { controversy: 8, stability: 2 },
        relationships: { shibata: 5, manager: -4 },
        addFlags: ["ch4_ad_denied", "ch4_crisis_denied", "ch4_sponsor_distrust"]
      }, { tone: "risky", subtext: "契約は守れても視聴者の問いを拒む" })
    ],
    when: when({ flagsAny: ["ch4_ad_scandal_seed", "ch3_undisclosed_ad", "ch3_scripted_endorsement"] }),
    priority: 35,
    tags: ["crisis", "advertising", "consequence"],
    visual: {
      background: "bg/ch4_press_room",
      portrait: "portrait/hikakin",
      expression: "serious",
      eventCg: "cg/ch4_ad_contract_exposed",
      accent: "red"
    }
  }),
  ch4({
    id: "ch4_01_safety_scandal",
    slot: 1,
    title: "切り抜かれた跳躍",
    date: "2018年 春",
    location: "制作オフィス",
    body: [
      "過去のアスレチック動画を真似した子供が怪我をしたと報じられた。動画には注意表示があったが、拡散された短い映像には安全装置も説明も映っていない。",
      "直接の因果を断定することはできない。それでも、子供に届くと分かって作った映像の影響を『真似した側の責任』だけで終わらせることはできない。"
    ],
    choices: [
      choice("ch4_01_safety_contact", "家族の意向を尊重し、非公開で支援を申し出る", [
        "家族を動画へ出すことも、事故の詳細を語ることも求めず、窓口を通して治療と再発防止への支援を行った。",
        "該当動画は一時停止し、シル子と専門家を交えて安全表示と切り抜き対策を全面的に見直す。"
      ], {
        stats: { subscribers: -380_000, money: -1_500_000, trust: 11 },
        hidden: { controversy: -7, origin: 6 },
        routes: { stability: 5, network: 4 },
        relationships: { shiruko: 13 },
        addFlags: ["ch4_safety_restitution", "shiruko_safety_path", "ch4_crisis_owned", "four_emperors_shiruko_seed"],
        removeFlags: ["ch4_safety_scandal_seed"]
      }, { tone: "warm", subtext: "被害を宣伝にせず、支援と再発防止を行う" }),
      choice("ch4_01_safety_reedit", "動画を再編集し、危険部分の拡散停止を要請する", [
        "本編を安全解説中心に差し替え、主要な転載先へ削除や文脈追加を依頼した。完全には止められないが、新しく見る人への危険は減る。",
        "説明責任は果たしたものの、家族への向き合い方は別に残った。"
      ], {
        stats: { subscribers: -120_000, production: 5, trust: 6, money: -500_000 },
        hidden: { controversy: -3 },
        routes: { strategy: 5, stability: 2 },
        relationships: { shiruko: 7 },
        addFlags: ["ch4_safety_reedited", "shiruko_safety_path", "ch4_partial_accountability"]
      }, { tone: "steady", subtext: "映像の危険を減らす技術対応" }),
      choice("ch4_01_safety_blame", "注意書きを根拠に責任を否定する", [
        "制作側の法的責任は限定的だという説明を出した。短期的にはスポンサーを守れたが、子供の怪我を前に自己防衛だけを語った印象が広がる。",
        "シル子はヒカキンとの共演動画を非公開にし、独自に安全改革を始めた。"
      ], {
        stats: { subscribers: 130_000, money: 800_000, trust: -20 },
        hidden: { controversy: 18, origin: -10 },
        routes: { controversy: 9 },
        relationships: { shiruko: -20, shibata: 4 },
        addFlags: ["ch4_safety_denied", "ch4_crisis_denied", "shiruko_break_with_hikakin"]
      }, { tone: "risky", subtext: "法的防御を優先し、子供と仲間の信用を失う" })
    ],
    when: when({ flagsAny: ["ch4_safety_scandal_seed", "shiruko_reckless_path"] }),
    priority: 30,
    tags: ["crisis", "safety", "children"],
    visual: {
      background: "bg/ch4_office_news",
      portrait: "portrait/hikakin",
      expression: "distressed",
      eventCg: "cg/ch4_clipped_jump_news",
      accent: "red"
    }
  }),
  ch4({
    id: "ch4_01_old_clip",
    slot: 1,
    title: "十秒だけの過去",
    date: "2018年 春",
    location: "撮影部屋",
    body: [
      "無名時代の動画から、いまなら配慮に欠ける冗談だけが十秒に切り抜かれ拡散された。全編を見れば意図は違うが、不快にさせた言葉まで消えるわけではない。",
      "昔の自分を現在の基準だけで裁く難しさと、昔だから無責任でよいわけではない現実が同時にある。"
    ],
    choices: [
      choice("ch4_01_clip_context_apology", "全編を示しつつ、言葉について謝る", [
        "意図を説明して終わらず、なぜ今は同じ言い方をしないかまで話した。動画を隠すのではなく注記を加え、過去の変化を見られる形にする。",
        "完璧な過去を演じず、学んだ現在を示したことで信用は持ち直した。"
      ], {
        stats: { subscribers: -90_000, trust: 8, expression: 4 },
        hidden: { controversy: -4, origin: 5 },
        routes: { stability: 4, mainstream: 2 },
        addFlags: ["ch4_old_clip_owned", "ch4_recovery_ready"]
      }, { tone: "steady", subtext: "文脈と責任を両方示す" }),
      choice("ch4_01_clip_delete", "過去動画を非公開にし、短く謝罪する", [
        "拡散元は残ったが、自分のチャンネルから同じ言葉が再生され続けることは止めた。詳しい説明を避けたため、判断は視聴者の間で分かれる。",
        "炎上は早く収まったが、何を学んだかは伝わりにくかった。"
      ], {
        stats: { subscribers: -60_000, trust: 2, production: 2 },
        hidden: { controversy: -1 },
        routes: { strategy: 4 },
        addFlags: ["ch4_old_clip_removed", "ch4_partial_accountability"]
      }, { tone: "steady", subtext: "拡散を止めるが、説明は最小限" }),
      choice("ch4_01_clip_mock", "切り抜きだと笑い飛ばす", [
        "反論動画はテンポよく、支持者には受けた。批判側を大げさな人々として扱ったことで、対立そのものが新しい再生源になる。",
        "柴田が『ヒカキンを救いたい』と便乗し、炎上は別の観客まで広がった。"
      ], {
        stats: { subscribers: 310_000, money: 450_000, trust: -11 },
        hidden: { controversy: 13, ambition: 4, origin: -6 },
        routes: { controversy: 8 },
        relationships: { shibata: 8 },
        addFlags: ["ch4_mocked_critics", "shibata_attention", "ch4_crisis_denied"]
      }, { tone: "risky", subtext: "批判を敵にして再生数へ変える" })
    ],
    priority: 0,
    tags: ["crisis", "past", "fallback"],
    visual: {
      background: "bg/ch4_studio_phone_glow",
      portrait: "portrait/hikakin",
      expression: "uneasy",
      eventCg: "cg/ch4_old_clip_ten_seconds",
      accent: "red"
    }
  }),

  // ── slot 2: 内部の危機 ───────────────────────────────
  ch4({
    id: "ch4_02_team_testimony",
    slot: 2,
    title: "公開日のために消えた夜",
    date: "2018年 夏",
    location: "制作オフィス",
    body: [
      "元編集者が、連日の徹夜と急な修正指示について証言した。ヒカキンが直接『徹夜しろ』と言った記録はない。それでも、本人が毎晩働く姿と絶対の公開日は、断れない命令として現場に伝わっていた。",
      "個人の根性で始めた制作が、他人の生活を削る仕組みになっていた。善意で差し入れをした記憶では、その責任を打ち消せない。"
    ],
    choices: [
      choice("ch4_02_team_compensate", "勤務記録を調べ、未払いと制度を是正する", [
        "第三者へ調査を委ね、未申告の作業も聞き取って補償した。公開本数を減らし、断っても評価が下がらない修正ルールを作る。",
        "ヒカキンは自分が知らなかったことも、知れる立場だった責任として認めた。"
      ], {
        stats: { subscribers: -360_000, money: -2_600_000, trust: 11, production: 3 },
        hidden: { controversy: -8, fatigue: -10, origin: 5 },
        routes: { stability: 7, network: 4 },
        relationships: { manager: 14 },
        addFlags: ["ch4_team_compensated", "ch4_team_reformed", "ch4_crisis_owned"],
        removeFlags: ["ch4_team_crisis_seed"]
      }, { tone: "warm", subtext: "知らなかった責任も含めて補償する" }),
      choice("ch4_02_team_interview", "全スタッフと個別面談して工程を減らす", [
        "名前を出さずに不満を集め、最も負担の大きい字幕と確認工程を半分にした。証言者への直接反論はしない。",
        "補償範囲には議論が残ったが、現場が意見を言える仕組みは生まれた。"
      ], {
        stats: { subscribers: -130_000, money: -900_000, trust: 6, production: 5, energy: 6 },
        hidden: { controversy: -3, fatigue: -7 },
        routes: { strategy: 5, stability: 4 },
        relationships: { manager: 9 },
        addFlags: ["ch4_team_reformed", "ch4_partial_accountability"]
      }, { tone: "steady", subtext: "工程を直すが、過去の補償は限定的" }),
      choice("ch4_02_team_counter", "自分も徹夜していたと反論する", [
        "『全員で頑張った』という動画には、当時の楽しそうな映像も使った。支持者は納得したが、雇う側と雇われる側の違いを無視した反論として批判が強まる。",
        "現役スタッフは、自分もいつか映像で反論されることを恐れて口を閉じた。"
      ], {
        stats: { subscribers: 180_000, money: 500_000, trust: -19 },
        hidden: { controversy: 18, origin: -11 },
        routes: { controversy: 9 },
        relationships: { manager: -18, shibata: 5 },
        addFlags: ["ch4_team_denied", "ch4_crisis_denied", "ch4_staff_silenced"]
      }, { tone: "risky", subtext: "努力を盾に立場の差を見落とす" })
    ],
    when: when({ flagsAny: ["ch4_team_crisis_seed", "ch3_staff_overworked"] }),
    priority: 35,
    tags: ["team", "labor", "consequence"],
    visual: {
      background: "bg/ch4_empty_edit_desks",
      portrait: "portrait/hikakin",
      expression: "ashamed",
      eventCg: "cg/ch4_editor_testimony",
      accent: "red"
    }
  }),
  ch4({
    id: "ch4_02_music_rights",
    slot: 2,
    title: "一億回の所有者",
    date: "2018年 夏",
    location: "兄弟の話し合い",
    body: [
      "『YouTubeテーマミュージック』の利用契約を巡り、ゼイキン側から正式な確認が届いた。曲が大きく使われるほど、曖昧だった作詞作曲と収益配分の問題も大きくなる。",
      "兄弟げんかとして笑って済ませれば、ゼイキンの仕事を家族という言葉で奪うことになる。ヒカキンはカメラを入れず、契約書を挟んで兄と向き合った。"
    ],
    choices: [
      choice("ch4_02_music_recalculate", "過去分まで共同権利として精算する", [
        "第三者に収益を計算してもらい、ゼイキンの貢献へ遡って配分した。ヒカキンは説明動画で自分の判断の誤りだけを話し、兄へ弁明を求めない。",
        "費用は大きかったが、二人は再び同じスタジオへ入れる関係を取り戻した。"
      ], {
        stats: { money: -3_200_000, subscribers: -180_000, trust: 10, beatbox: 2 },
        hidden: { controversy: -8, origin: 10 },
        routes: { network: 6, craft: 3 },
        relationships: { zeikin: 24 },
        addFlags: ["ch4_music_rights_repaired", "yt_theme_credit_repaired", "ch4_crisis_owned"],
        removeFlags: ["ch4_music_rights_seed", "yt_theme_credit_conflict"]
      }, { tone: "warm", subtext: "家族ではなく共同制作者として精算する" }),
      choice("ch4_02_music_future", "今後の契約だけを対等に直す", [
        "新しい利用分から共同権利に改め、過去分は当時の合意として残した。二人は仕事を再開したが、ゼイキンには完全に戻らないものがある。",
        "現実的な決着はついたものの、代表曲を語る声には少し距離が残った。"
      ], {
        stats: { money: -900_000, trust: 4, production: 3 },
        hidden: { controversy: -2, origin: 2 },
        routes: { strategy: 5, network: 2 },
        relationships: { zeikin: 9 },
        addFlags: ["ch4_music_future_terms", "ch4_partial_accountability"]
      }, { tone: "steady", subtext: "将来は直すが、過去は残す" }),
      choice("ch4_02_music_lawyer", "契約通りだとして代理人へ任せる", [
        "法的にはヒカキン側が有利だった。代理人同士のやり取りで利用は継続され、曲の再生数も落ちない。",
        "その代わり、ゼイキンから届く音は二度となくなり、視聴者にも兄弟の断絶が伝わった。"
      ], {
        stats: { money: 1_200_000, subscribers: 240_000, trust: -14 },
        hidden: { controversy: 13, origin: -15, ambition: 5 },
        routes: { controversy: 7, stability: 2 },
        relationships: { zeikin: -30 },
        addFlags: ["ch4_music_legal_victory", "zeikin_break_final", "ch4_crisis_denied"]
      }, { tone: "risky", subtext: "契約では勝ち、兄弟を失う" })
    ],
    when: when({ flagsAny: ["ch4_music_rights_seed", "yt_theme_credit_conflict"] }),
    priority: 30,
    tags: ["zeikin", "rights", "consequence"],
    visual: {
      background: "bg/ch4_family_contract_table",
      portrait: "portrait/zeikin",
      expression: "hurt",
      eventCg: "cg/ch4_song_rights_contract",
      accent: "violet"
    }
  }),
  ch4({
    id: "ch4_02_scale_stress",
    slot: 2,
    title: "公開を待つ百人",
    date: "2018年 夏",
    location: "大型撮影現場",
    body: [
      "撮影開始直前に、企画の安全確認へ見落としが見つかった。会場には百人のスタッフと高額な設備が揃い、延期すれば一日分の費用が消える。",
      "規模が大きいほど、一人の直感で押し切った失敗も大きくなる。ヒカキンが『大丈夫』と言えば、異議を唱えられる人は現場にほとんどいない。"
    ],
    choices: [
      choice("ch4_02_scale_stop", "責任者として撮影を中止する", [
        "損失額を自分で引き受け、見落としを報告した担当者を責めなかった。問題を言えば止められる前例が現場に残る。",
        "延期後の動画は安全に完成し、派手さより判断を支持する声が増えた。"
      ], {
        stats: { money: -2_300_000, subscribers: -100_000, trust: 11, production: 4 },
        hidden: { controversy: -5, origin: 5 },
        routes: { stability: 6, network: 3 },
        relationships: { manager: 12 },
        addFlags: ["ch4_stop_work_authority", "ch4_team_reformed"]
      }, { tone: "warm", subtext: "損失を背負い、止められる現場を作る" }),
      choice("ch4_02_scale_rewrite", "危険部分だけを即興で別企画へ変える", [
        "準備済みの設備を安全な範囲で使い、失敗した計画そのものを検証企画へ変えた。全員の専門性を活かし、予定時間内に撮り終える。",
        "危機対応が作品になったが、即興に頼らない事前確認の改善も必要になった。"
      ], {
        stats: { subscribers: 380_000, production: 7, trust: 6, energy: -9 },
        hidden: { fatigue: 5, controversy: -2 },
        routes: { strategy: 6, network: 3 },
        relationships: { manager: 7 },
        addFlags: ["ch4_safe_rewrite", "ch4_partial_reform"]
      }, { tone: "bold", subtext: "安全を守り、現場の知恵で救う" }),
      choice("ch4_02_scale_proceed", "責任は自分が取ると言って続行する", [
        "重大事故は起きず、予定通り公開された。ヒカキンの決断力は称賛され、再生数も伸びる。",
        "しかし『責任を取る』という言葉は、起きる前の事故を防ぐことも、怪我を元に戻すこともできない。現場には次も押し切られる恐怖が残った。"
      ], {
        stats: { subscribers: 540_000, money: 800_000, trust: -12 },
        hidden: { controversy: 12, fatigue: 5, ambition: 6 },
        routes: { controversy: 7 },
        relationships: { manager: -12 },
        addFlags: ["ch4_safety_gamble", "ch4_team_silenced"]
      }, { tone: "risky", subtext: "無事故でも危険な意思決定が残る" })
    ],
    priority: 0,
    tags: ["scale", "safety", "fallback"],
    visual: {
      background: "bg/ch4_large_set_halted",
      portrait: "portrait/hikakin",
      expression: "serious",
      eventCg: "cg/ch4_hundred_waiting",
      accent: "red"
    }
  }),

  // ── slot 3: 逮捕前、最後の兆候 ───────────────────────
  ch4({
    id: "ch4_03_makoto_after_confrontation",
    slot: 3,
    title: "『親友なら信じろ』",
    date: "2019年 冬",
    location: "ヒカキンの事務所",
    body: [
      "以前注意してから距離を置いていたマコトが、突然一人で訪ねてきた。周囲が自分を陥れようとしている、ヒカキンだけは味方でいてほしいと訴える。",
      "謝罪や行動の改善ではなく、求められているのは無条件の擁護だった。ヒカキンには彼を裁く権限はないが、自分の信用を貸すかどうかは選べる。"
    ],
    speaker: "マコト",
    quote: "親友なら、俺がそんな人間じゃないって言ってくれますよね。",
    choices: [
      choice("ch4_03_makoto_conditions", "擁護せず、専門的な支援と行動改善を求める", [
        "事実を知らない部分は断定しない一方、相談者を嘘と決めつける発言にも協力しなかった。マコトへ活動休止と第三者を交えた対応を勧める。",
        "彼は怒って去ったが、ヒカキンは会話の日時と内容を記録した。"
      ], {
        stats: { trust: 7, expression: 3 },
        hidden: { controversy: -2, origin: 5 },
        routes: { stability: 4 },
        relationships: { makoto: -16 },
        addFlags: ["makoto_final_boundary", "makoto_case_record_preserved", "makoto_distance"]
      }, { tone: "steady", subtext: "断定せず、信用も貸さない" }),
      choice("ch4_03_makoto_listen", "話は聞くが、公には何も言わない", [
        "感情的なマコトを落ち着かせ、相談先を渡した。公の擁護は断ったものの、関係機関への共有や記録までは行わない。",
        "その夜を境に連絡は減ったが、止めるために十分だったかという疑問が残る。"
      ], {
        stats: { trust: 3, energy: -4 },
        hidden: { controversy: 1, origin: 1 },
        routes: { stability: 3, network: 2 },
        relationships: { makoto: -5 },
        addFlags: ["makoto_final_boundary", "makoto_private_conversation"]
      }, { tone: "warm", subtext: "擁護はしないが、対応は私的な範囲に留める" }),
      choice("ch4_03_makoto_defend", "友人として信じると公に投稿する", [
        "具体的な事実を確認しないまま、『僕の知るマコトは違う』と発信した。その言葉は即座に拡散され、彼への批判を抑える材料として使われる。",
        "ヒカキンの信用が、相談した人々を黙らせる側へ働いてしまった。"
      ], {
        stats: { subscribers: 320_000, trust: -16 },
        hidden: { controversy: 17, origin: -11 },
        routes: { controversy: 8, network: 2 },
        relationships: { makoto: 15 },
        addFlags: ["makoto_publicly_defended", "makoto_enabled", "makoto_complicity_seed"]
      }, { tone: "risky", subtext: "友情の言葉が相談者への圧力になる" })
    ],
    when: when({ flagsAny: ["makoto_confronted_before_arrest", "makoto_concern_reported"] }),
    priority: 35,
    tags: ["makoto", "warning", "accountability"],
    visual: {
      background: "bg/ch4_office_rain",
      portrait: "portrait/makoto",
      expression: "desperate",
      eventCg: "cg/ch4_makoto_demands_loyalty",
      accent: "red"
    }
  }),
  ch4({
    id: "ch4_03_makoto_enabled_warning",
    slot: 3,
    title: "消してほしいメッセージ",
    date: "2019年 冬",
    location: "移動車内",
    body: [
      "マコトから『昔のやり取りを消してほしい』というメッセージが届いた。理由を尋ねても、誤解を生むからという説明しか返ってこない。ヒカキンとの共演映像や擁護発言は、彼の信用を支えてきた。",
      "消せば友人を守れるかもしれない。残せば自分にも不都合な事実が明らかになるかもしれない。それでも記録は、関係者が事実を確かめるためのものでもある。"
    ],
    choices: [
      choice("ch4_03_message_preserve", "削除せず、法的に保全する", [
        "担当者へ相談し、改変せず安全に記録を保存した。内容を動画のネタにも、交渉材料にも使わない。",
        "後に調査が始まったとき、ヒカキンの不利益も含めて事実確認へ役立つ資料になった。"
      ], {
        stats: { trust: 6, subscribers: -50_000 },
        hidden: { controversy: -1, origin: 4 },
        routes: { strategy: 4, stability: 3 },
        relationships: { makoto: -12, manager: 4 },
        addFlags: ["makoto_case_record_preserved", "makoto_final_boundary"]
      }, { tone: "steady", subtext: "自分に不利でも記録を守る" }),
      choice("ch4_03_message_ask", "理由と対象を文書で確認する", [
        "曖昧な依頼には応じず、何をなぜ消したいのか書面で求めた。マコトは返信を止めたが、依頼そのものが記録に残る。",
        "ヒカキンは共演予定を凍結し、自分の過去対応も見直し始めた。"
      ], {
        stats: { production: 2, trust: 5, subscribers: -30_000 },
        hidden: { controversy: 1, origin: 3 },
        routes: { strategy: 5 },
        relationships: { makoto: -10 },
        addFlags: ["makoto_deletion_request_recorded", "makoto_distance"]
      }, { tone: "steady", subtext: "曖昧な削除依頼を文書化する" }),
      choice("ch4_03_message_delete", "自分とのやり取りだけ削除する", [
        "友情と自己防衛の両方を理由に、メッセージ履歴を消した。後日バックアップの存在が判明し、削除した行為自体が疑惑として報じられる。",
        "何を隠したか以上に、なぜ記録を消したかが問われることになった。"
      ], {
        stats: { trust: -18, subscribers: 120_000 },
        hidden: { controversy: 20, origin: -12 },
        routes: { controversy: 10 },
        relationships: { makoto: 8 },
        addFlags: ["makoto_evidence_deleted", "makoto_complicity_seed", "ch4_evidence_pressure"]
      }, { tone: "risky", subtext: "記録を消し、削除自体を問題にする" })
    ],
    when: when({ flagsAny: ["makoto_enabled", "makoto_collab_archive"] }),
    priority: 30,
    tags: ["makoto", "warning", "evidence"],
    visual: {
      background: "bg/ch4_car_night",
      portrait: "portrait/hikakin",
      expression: "alarmed",
      eventCg: "cg/ch4_delete_message_request",
      accent: "red"
    }
  }),
  ch4({
    id: "ch4_03_makoto_last_collab",
    slot: 3,
    title: "完璧な笑顔の奥",
    date: "2019年 冬",
    location: "共同撮影スタジオ",
    body: [
      "マコトとの大型コラボ当日、出演予定の女性が直前に参加を取りやめた。制作側は体調不良と説明するが、本人からは『今後マコトと同じ現場にしないでほしい』という短い連絡が届く。",
      "ヒカキンには詳しい事情が分からない。しかし、事情が分からないことと、本人の安全に関する希望を無視することは別だ。"
    ],
    choices: [
      choice("ch4_03_last_cancel", "撮影を中止し、本人が相談できる窓口を案内する", [
        "理由を公表せず撮影を止め、本人の同意なく詳細を聞き出さなかった。制作側へは同席回避と相談体制を求める。",
        "マコトは激怒したが、現場の安全を再生数より先に置いた記録が残った。"
      ], {
        stats: { subscribers: -220_000, money: -1_000_000, trust: 9 },
        hidden: { controversy: -2, origin: 5 },
        routes: { stability: 5, network: 3 },
        relationships: { makoto: -18, manager: 5 },
        addFlags: ["makoto_warning_heard", "makoto_final_boundary", "makoto_staff_supported"]
      }, { tone: "warm", subtext: "詳細を消費せず、安全の希望を守る" }),
      choice("ch4_03_last_replace", "マコトを外し、企画内容を変更する", [
        "本人の事情は伏せたまま、ヒカキン一人の企画へ作り直した。損失を抑えながら同じ現場を避ける。",
        "マコトとは決裂したが、出演者へ説明責任を押しつけずに済んだ。"
      ], {
        stats: { subscribers: 80_000, money: -400_000, production: 5, trust: 7 },
        hidden: { controversy: -1, fatigue: 4 },
        routes: { strategy: 5, craft: 2 },
        relationships: { makoto: -16 },
        addFlags: ["makoto_warning_heard", "makoto_distance", "makoto_staff_supported"]
      }, { tone: "steady", subtext: "企画を救い、同席を避ける" }),
      choice("ch4_03_last_proceed", "代役を入れて予定通り共演する", [
        "撮影は成功し、マコトは画面上で非の打ち所がなかった。出演を断った人の希望も、表からは存在しなかったことになる。",
        "ヒカキンは違和感より予定を優先した事実を、自分の中にだけ残した。"
      ], {
        stats: { subscribers: 540_000, money: 850_000, trust: -10 },
        hidden: { controversy: 12, origin: -8, ambition: 6 },
        routes: { mainstream: 4, controversy: 6 },
        relationships: { makoto: 10 },
        addFlags: ["makoto_warning_heard", "makoto_enabled", "makoto_collab_archive"]
      }, { tone: "risky", subtext: "予定は守り、拒否の意味を消す" })
    ],
    priority: 0,
    tags: ["makoto", "warning", "fallback"],
    visual: {
      background: "bg/ch4_collab_studio",
      portrait: "portrait/hikakin",
      expression: "concerned",
      eventCg: "cg/ch4_empty_guest_chair",
      accent: "red"
    }
  }),

  // ── slot 4: マコト逮捕（固定事件） ───────────────────
  ch4({
    id: "ch4_04_makoto_arrest_prepared",
    slot: 4,
    title: "速報――マコト逮捕",
    date: "2019年 冬",
    location: "撮影部屋",
    body: [
      "女性への暴行容疑でマコトが逮捕されたという速報が流れた。被害を受けた人の安全と尊厳が最優先であり、彼の才能や人気が行為を軽くすることはない。",
      "ヒカキンは以前の懸念を記録し、距離を置いていた。それでも事件を防げなかった事実と、自分の名前を使って憶測を広げない責任が残る。"
    ],
    choices: [
      choice("ch4_04_prepared_cooperate", "記録を関係機関へ渡し、公開発言は控える", [
        "保存していた日時とやり取りを、求められた手続きに従って提出した。捜査中の内容を動画で語らず、被害者を特定する情報にも触れない。",
        "視聴者の好奇心には応えなかったが、事実確認に必要な責任を果たした。"
      ], {
        stats: { trust: 11, subscribers: -80_000 },
        hidden: { controversy: -7, origin: 6 },
        routes: { stability: 6 },
        relationships: { makoto: -20, manager: 5 },
        addFlags: ["makoto_arrested", "makoto_cooperated_officially", "makoto_victim_privacy_protected"]
      }, { tone: "steady", subtext: "証拠は適切に渡し、事件をコンテンツにしない" }),
      choice("ch4_04_prepared_general", "加害を否定し、被害者支援だけを案内する", [
        "マコト個人の未確認情報には触れず、『人気や関係性にかかわらず暴力は許されない』と短く述べた。相談窓口を固定欄へ載せる。",
        "自分が中心にならない言葉を選び、事件を視聴者獲得へ使わなかった。"
      ], {
        stats: { trust: 10, expression: 3, subscribers: 40_000 },
        hidden: { controversy: -5, origin: 7 },
        routes: { stability: 4, mainstream: 2 },
        addFlags: ["makoto_arrested", "makoto_victim_centered_statement", "makoto_victim_privacy_protected"]
      }, { tone: "warm", subtext: "被害を中心に置き、断定や憶測を避ける" }),
      choice("ch4_04_prepared_explain", "過去に注意した事実をすぐ公表する", [
        "自分の信用を守るため、以前の対応を詳しく説明した。事実ではあるが、事件直後に『自分は止めた』と強調したことで、被害より自己防衛が前へ出る。",
        "疑いは減った一方、被害を自分の評価へ使ったという批判も残った。"
      ], {
        stats: { subscribers: 180_000, trust: 1 },
        hidden: { controversy: 3, origin: -2 },
        routes: { strategy: 4, stability: 2 },
        addFlags: ["makoto_arrested", "makoto_self_protective_statement", "makoto_record_publicized"]
      }, { tone: "risky", subtext: "事実でも、語る時期と中心を誤る危険がある" })
    ],
    when: when({
      flagsAny: [
        "makoto_confronted_before_arrest",
        "makoto_concern_reported",
        "makoto_case_record_preserved",
        "makoto_final_boundary",
        "makoto_staff_supported"
      ],
      flagsNone: ["makoto_enabled", "makoto_publicly_defended", "makoto_evidence_deleted", "makoto_complicity_seed"]
    }),
    mandatory: true,
    priority: 60,
    tags: ["makoto", "arrest", "anchor"],
    visual: {
      background: "bg/ch4_studio_breaking_news",
      portrait: "portrait/hikakin",
      expression: "shocked",
      eventCg: "cg/ch4_makoto_arrest_news",
      video: "video/ch4_breaking_news",
      accent: "red"
    }
  }),
  ch4({
    id: "ch4_04_makoto_arrest_complicit",
    slot: 4,
    title: "速報と、消えない共演映像",
    date: "2019年 冬",
    location: "制作オフィス",
    body: [
      "女性への暴行容疑でマコトが逮捕された。被害は才能や人気と切り離して扱われるべきで、どれだけ面白い動画を作ったかが加害の言い訳になることはない。",
      "同時に、ヒカキンが彼の問題行動を聞いた後も共演し、時には擁護していた記録が掘り返された。事件の責任を肩代わりすることと、自分の黙認へ責任を持つことは別だ。"
    ],
    choices: [
      choice("ch4_04_complicit_admit", "知っていた範囲と誤った対応を具体的に認める", [
        "確認できなかったことまで断定せず、見聞きした兆候を軽く扱い、共演を続けた判断を謝罪した。被害者へ説明を求めず、自分の収益から支援を行う。",
        "激しい批判と登録解除を受けたが、回復へ進める唯一の地面を作った。"
      ], {
        stats: { subscribers: -900_000, money: -2_000_000, trust: 6 },
        hidden: { controversy: -7, origin: 5, ambition: -5 },
        routes: { stability: 5 },
        relationships: { makoto: -25, manager: 4 },
        addFlags: ["makoto_arrested", "makoto_complicity_admitted", "makoto_victim_centered_statement", "ch4_recovery_ready"]
      }, { tone: "steady", subtext: "加害を自分へ引き取らず、黙認だけを認める" }),
      choice("ch4_04_complicit_remove", "共演動画を止め、調査後に説明すると告知する", [
        "関連動画の収益化を止め、事実関係を確認する期限を示した。即答は避けたが、動画が利益を生み続ける状態だけは止める。",
        "対応の遅さを批判されつつも、記録を消さず調査へ渡す道が残った。"
      ], {
        stats: { subscribers: -520_000, money: -1_100_000, trust: 2 },
        hidden: { controversy: -2, origin: 1 },
        routes: { strategy: 4, stability: 3 },
        relationships: { makoto: -15 },
        addFlags: ["makoto_arrested", "makoto_collabs_demonetized", "makoto_review_promised", "ch4_partial_accountability"]
      }, { tone: "steady", subtext: "利益を止め、確認する時間を明示する" }),
      choice("ch4_04_complicit_deny", "逮捕はマコト個人の問題だと切り離す", [
        "ヒカキン自身は事件に関与していないという声明だけを出した。法的には正しくても、問題行動を知った後の共演については答えない。",
        "過去メッセージと映像が次々に公開され、沈黙が事実を隠す行為として見られ始めた。"
      ], {
        stats: { subscribers: -180_000, money: 600_000, trust: -22 },
        hidden: { controversy: 22, origin: -14 },
        routes: { controversy: 11 },
        relationships: { shibata: 8, manager: -12 },
        addFlags: ["makoto_arrested", "makoto_complicity_denied", "ch4_crisis_denied", "shibata_attention"]
      }, { tone: "risky", subtext: "法的な切断で、黙認への問いも拒む" })
    ],
    when: when({ flagsAny: ["makoto_enabled", "makoto_publicly_defended", "makoto_evidence_deleted", "makoto_complicity_seed"] }),
    mandatory: true,
    priority: 55,
    tags: ["makoto", "arrest", "anchor", "consequence"],
    visual: {
      background: "bg/ch4_office_breaking_news",
      portrait: "portrait/hikakin",
      expression: "devastated",
      eventCg: "cg/ch4_collab_archive_after_arrest",
      video: "video/ch4_breaking_news",
      accent: "red"
    }
  }),
  ch4({
    id: "ch4_04_makoto_arrest",
    slot: 4,
    title: "速報――才能は免罪符ではない",
    date: "2019年 冬",
    location: "撮影部屋",
    body: [
      "天才YouTuberと呼ばれたマコトが、女性への暴行容疑で逮捕された。ヒカキンは速報を見たまま、次の撮影を止めた。",
      "何百万回再生された動画も、容姿も、企画の才能も、被害を軽くする理由にはならない。事件を面白がる反応が広がる中、発信者として何を語らず、何を明確に言うかが問われた。"
    ],
    choices: [
      choice("ch4_04_arrest_victim_first", "暴力を否定し、被害者のプライバシー尊重を求める", [
        "未確認の詳細や人間関係を語らず、暴力を許容しないことと憶測で被害者を追わないことだけを伝えた。",
        "動画の収益化はせず、概要欄には専門的な相談先を載せた。"
      ], {
        stats: { trust: 10, expression: 3, subscribers: 60_000 },
        hidden: { controversy: -6, origin: 7 },
        routes: { stability: 5, mainstream: 2 },
        relationships: { makoto: -20 },
        addFlags: ["makoto_arrested", "makoto_victim_centered_statement", "makoto_victim_privacy_protected"]
      }, { tone: "warm", subtext: "事件を自分の物語にせず、加害を否定する" }),
      choice("ch4_04_arrest_silence", "事実が確認されるまで発言しない", [
        "憶測には加わらず、予定していた共演動画だけを停止した。沈黙は慎重さとして受け取る人と、立場を避けたと見る人に分かれる。",
        "後に何を語るかで、この沈黙の意味が決まることになった。"
      ], {
        stats: { subscribers: -70_000, trust: 1, energy: -3 },
        hidden: { controversy: 2 },
        routes: { stability: 3, strategy: 2 },
        relationships: { makoto: -10 },
        addFlags: ["makoto_arrested", "makoto_initial_silence", "makoto_collabs_paused"]
      }, { tone: "steady", subtext: "憶測は避けるが、態度は後に問われる" }),
      choice("ch4_04_arrest_reaction", "驚きと裏話を緊急動画で語る", [
        "知っている範囲を超えて印象や噂まで話した動画は、過去最速で再生された。切り抜きが増え、被害者を探す動きまで加速する。",
        "ヒカキンは事件を止められないまま、自分の再生数だけを増やした。"
      ], {
        stats: { subscribers: 720_000, money: 1_100_000, trust: -20 },
        hidden: { controversy: 24, origin: -15, ambition: 8 },
        routes: { controversy: 12 },
        relationships: { shibata: 10, makoto: -8 },
        addFlags: ["makoto_arrested", "makoto_event_monetized", "makoto_privacy_harmed", "shibata_attention"]
      }, { tone: "risky", subtext: "事件を速報コンテンツへ変えてしまう" })
    ],
    mandatory: true,
    priority: 50,
    tags: ["makoto", "arrest", "anchor", "fallback"],
    visual: {
      background: "bg/ch4_studio_breaking_news",
      portrait: "portrait/hikakin",
      expression: "shocked",
      eventCg: "cg/ch4_makoto_arrest_news",
      video: "video/ch4_breaking_news",
      accent: "red"
    }
  }),

  // ── slot 5: 逮捕後、何を中心に語るか ─────────────────
  ch4({
    id: "ch4_05_makoto_record_request",
    slot: 5,
    title: "語れることと、語るべきでないこと",
    date: "2019年 冬",
    location: "法律事務所",
    body: [
      "関係機関から、保存していたマコトとのやり取りについて協力を求められた。同じ日、複数の番組から独占インタビューの依頼が届く。提示された金額は大きい。",
      "公的な手続きへ渡す記録と、視聴者の好奇心へ売る情報は同じではない。被害者の安全を守りながら、自分の過去対応も検証される道を選ぶ必要がある。"
    ],
    choices: [
      choice("ch4_05_record_official", "記録は関係機関だけへ提出する", [
        "求められた範囲を改変せず提出し、メディアには内容を語らなかった。自分に有利な部分だけを先に公開することもしない。",
        "再生機会は失ったが、被害と調査を自分の番組にしない一線を守った。"
      ], {
        stats: { trust: 10, subscribers: -60_000 },
        hidden: { controversy: -6, origin: 7 },
        routes: { stability: 6 },
        relationships: { manager: 5 },
        addFlags: ["makoto_cooperated_officially", "makoto_victim_privacy_protected", "ch4_due_process_respected"]
      }, { tone: "steady", subtext: "証拠は渡し、内容は売らない" }),
      choice("ch4_05_record_summary", "対応の経緯だけを後日まとめる", [
        "調査を妨げない時期まで待ち、自分がいつ何を見てどう対応したかだけを説明した。被害者や証言者を特定できる情報は省く。",
        "ヒカキンの説明責任と、他人のプライバシーを両立する慎重な記録になった。"
      ], {
        stats: { trust: 8, expression: 4, subscribers: 80_000 },
        hidden: { controversy: -4, origin: 5 },
        routes: { strategy: 4, stability: 3 },
        addFlags: ["makoto_timeline_explained", "makoto_victim_privacy_protected", "ch4_due_process_respected"]
      }, { tone: "warm", subtext: "時期と範囲を選び、自分の対応だけを語る" }),
      choice("ch4_05_record_exclusive", "独占インタビューで全記録を見せる", [
        "番組は記録を刺激的な順へ編集し、ヒカキンの発言は大きな注目を集めた。匿名化したはずの情報から関係者を推測する動きも生まれる。",
        "自分の潔白は強調できたが、調査と被害者の安全を再生競争へ巻き込んだ。"
      ], {
        stats: { subscribers: 620_000, money: 1_800_000, trust: -15 },
        hidden: { controversy: 17, ambition: 7, origin: -11 },
        routes: { controversy: 9, mainstream: 3 },
        relationships: { shibata: 5 },
        addFlags: ["makoto_record_monetized", "makoto_privacy_harmed", "shibata_attention"]
      }, { tone: "risky", subtext: "自分を守る情報が他人を傷つける" })
    ],
    when: when({ flagsAny: ["makoto_case_record_preserved", "makoto_cooperated_officially"] }),
    priority: 35,
    tags: ["makoto", "aftermath", "privacy"],
    visual: {
      background: "bg/ch4_law_office",
      portrait: "portrait/hikakin",
      expression: "serious",
      eventCg: "cg/ch4_record_and_interview_offers",
      accent: "blue"
    }
  }),
  ch4({
    id: "ch4_05_makoto_complicity_exposed",
    slot: 5,
    title: "自分に向いたカメラ",
    date: "2019年 冬",
    location: "謝罪動画 撮影前",
    body: [
      "マコトを擁護した投稿と、問題を聞いた後の共演映像が一本の検証動画にまとめられた。ヒカキンが暴行を行ったわけではない。それでも、自分の信用が懸念を打ち消すために使われた責任は残る。",
      "台本には『知らなかった』という言葉が何度も並ぶ。知らなかった範囲と、知ろうとしなかった範囲を分けなければ、謝罪はまた事実を曖昧にする。"
    ],
    choices: [
      choice("ch4_05_complicity_specific", "擁護と黙認を時系列で認める", [
        "見たこと、聞いたこと、確認しなかったことを分けて説明した。事件の責任を自分のものに見せる演出はせず、自分が与えた信用の影響へだけ責任を取る。",
        "登録者は大幅に減ったが、虚偽なく再出発する可能性が残った。"
      ], {
        stats: { subscribers: -850_000, money: -1_000_000, trust: 7 },
        hidden: { controversy: -8, origin: 7, ambition: -5 },
        routes: { stability: 6 },
        relationships: { manager: 5 },
        addFlags: ["makoto_complicity_admitted", "makoto_victim_centered_statement", "ch4_recovery_ready"]
      }, { tone: "steady", subtext: "自分の責任だけを具体的に認める" }),
      choice("ch4_05_complicity_pause", "説明前に活動と関連収益を止める", [
        "急いだ弁明をせず、共演動画の収益化と活動を停止した。第三者の確認を終える期限を示し、その間の憶測には参加しない。",
        "沈黙への批判は続いたが、再生数を得ながら謝る矛盾は避けられた。"
      ], {
        stats: { subscribers: -600_000, money: -1_500_000, trust: 3, energy: 8 },
        hidden: { controversy: -3, fatigue: -6 },
        routes: { stability: 5, strategy: 2 },
        addFlags: ["makoto_collabs_demonetized", "makoto_review_promised", "ch4_accountability_pause"]
      }, { tone: "warm", subtext: "まず利益と活動を止める" }),
      choice("ch4_05_complicity_counterattack", "検証動画の誤りだけを突いて反論する", [
        "日時の小さな誤りを見つけ、動画全体が捏造であるかのように反論した。支持者は検証者を攻撃し、中心だった黙認の問いは対立に埋もれる。",
        "柴田が参戦し、事件は被害から離れた炎上合戦へ変わった。"
      ], {
        stats: { subscribers: 420_000, money: 700_000, trust: -21 },
        hidden: { controversy: 22, ambition: 6, origin: -14 },
        routes: { controversy: 12 },
        relationships: { shibata: 12 },
        addFlags: ["makoto_complicity_denied", "ch4_counterattack", "shibata_attention"]
      }, { tone: "risky", subtext: "小さな誤りで大きな問いを消す" })
    ],
    when: when({ flagsAny: ["makoto_complicity_seed", "makoto_publicly_defended", "makoto_evidence_deleted", "makoto_complicity_denied"] }),
    priority: 30,
    tags: ["makoto", "aftermath", "accountability"],
    visual: {
      background: "bg/ch4_apology_setup",
      portrait: "portrait/hikakin",
      expression: "ashamed",
      eventCg: "cg/ch4_camera_turns_on_hikakin",
      accent: "red"
    }
  }),
  ch4({
    id: "ch4_05_after_arrest",
    slot: 5,
    title: "次の動画を出す前に",
    date: "2019年 冬",
    location: "撮影部屋",
    body: [
      "事件から一週間、通常動画の公開予定日が来た。何事もなかったように商品を紹介すれば日常を戻せる。一方、事件について繰り返し語れば、被害をチャンネルの中心へ置き続けることになる。",
      "重要なのは沈黙か発言かの二択ではなく、誰のために何を語り、その後の行動をどう変えるかだった。"
    ],
    choices: [
      choice("ch4_05_after_policy", "短い方針説明後、制作体制を見直す", [
        "暴力を容認しないこと、相談を軽視しないこと、共演前の安全確認を具体的な規定へした。動画は簡潔にし、事件の細部や被害者情報には触れない。",
        "言葉を再生数で終わらせず、現場の仕組みへ変えた。"
      ], {
        stats: { trust: 9, production: 4, subscribers: 20_000 },
        hidden: { controversy: -6, origin: 6 },
        routes: { stability: 5, strategy: 3 },
        relationships: { manager: 6 },
        addFlags: ["makoto_victim_centered_statement", "ch4_safeguarding_policy", "ch4_recovery_ready"]
      }, { tone: "steady", subtext: "事件を語り続けず、行動規定へ変える" }),
      choice("ch4_05_after_rest", "今週は公開せず、関係者のケアを優先する", [
        "収録を止め、事件に近いスタッフへ休息と外部相談先を用意した。ヒカキン自身も、怒りや罪悪感を動画ではなく専門家との場で整理する。",
        "数字は落ちたが、現場が事件を娯楽として消費せずに済んだ。"
      ], {
        stats: { subscribers: -180_000, money: -500_000, energy: 14, trust: 8 },
        hidden: { fatigue: -10, origin: 6 },
        routes: { stability: 6, network: 2 },
        relationships: { manager: 8 },
        addFlags: ["ch4_care_week", "ch4_safeguarding_policy"]
      }, { tone: "warm", subtext: "公開より現場の回復を取る" }),
      choice("ch4_05_after_normal", "通常動画を予定通り公開する", [
        "事件へ触れず、明るい商品紹介を公開した。日常を待っていた視聴者には喜ばれたが、説明を待っていた人には逃避と映る。",
        "どちらとも決めない判断が、次の場面でより強い態度を求められる結果になった。"
      ], {
        stats: { subscribers: 260_000, money: 500_000, trust: -4, energy: -3 },
        hidden: { controversy: 5, origin: -3 },
        routes: { mainstream: 4, stability: 2 },
        addFlags: ["makoto_normal_upload_after", "ch4_unresolved_response"]
      }, { tone: "risky", subtext: "日常は戻るが、説明は未解決になる" })
    ],
    priority: 0,
    tags: ["makoto", "aftermath", "fallback"],
    visual: {
      background: "bg/ch4_studio_unlit",
      portrait: "portrait/hikakin",
      expression: "somber",
      eventCg: "cg/ch4_next_upload_waiting",
      accent: "blue"
    }
  }),

  // ── slot 6: 柴田の「救いたい」 ───────────────────────
  ch4({
    id: "ch4_06_shibata_controversy_invite",
    slot: 6,
    title: "『マコトを救いたい』",
    date: "2019年 冬",
    location: "柴田の撮影場所",
    body: [
      "元祖炎上系YouTuberの柴田が、赤い拳をサムネイルにした『マコトを救いたい』を公開した。被害より加害者の復活を中心に置き、最後にヒカキンへ公開レスリング対決を呼びかける。",
      "柴田の動画は不謹慎だと批判されながら、驚異的に伸びている。出演すれば自分の疑惑も説明できるという誘いは、再生数を必要とする今ほど魅力的に見えた。"
    ],
    speaker: "柴田",
    quote: "ヒカキン、お前も救ってやる。リングで全部話せ！",
    choices: [
      choice("ch4_06_shibata_join", "出演し、炎上の注目を利用する", [
        "派手な入場とレスリングの後、事件と自分の疑惑を短い言葉で語った。動画は記録的に伸びたが、被害は対決の前振りとして消費される。",
        "柴田はヒカキンを『数字が分かる男』と認め、次の炎上にも誘うようになった。"
      ], {
        stats: { subscribers: 900_000, money: 1_600_000, expression: 4, trust: -24 },
        hidden: { controversy: 28, ambition: 9, origin: -18 },
        routes: { controversy: 15 },
        relationships: { shibata: 22 },
        addFlags: ["shibata_joined", "makoto_event_monetized", "controversy_king_path_open"],
        video: { title: "マコトを救いたい――公開レスリング", views: 38_000_000, subscribersGained: 900_000, kind: "炎上・レスリング", chapter: 4 }
      }, { tone: "risky", subtext: "最大の注目と引き換えに事件を見世物にする" }),
      choice("ch4_06_shibata_debate", "被害を扱わない条件で公開討論する", [
        "個人情報や事件の推測を禁じ、自分の動画制作と炎上手法だけを議題にした。柴田は何度も話を逸らしたが、ヒカキンは便乗で誰が傷つくかを具体的に問い返す。",
        "大きな注目は集めた一方、柴田の舞台へ上がったことへの批判も残った。"
      ], {
        stats: { subscribers: 420_000, expression: 6, trust: 1 },
        hidden: { controversy: 7, origin: 1 },
        routes: { strategy: 4, controversy: 3 },
        relationships: { shibata: 5 },
        addFlags: ["shibata_debated", "ch4_public_boundary_tested"],
        video: { title: "炎上と救済を公開討論する", views: 19_000_000, subscribersGained: 420_000, kind: "公開討論", chapter: 4 }
      }, { tone: "bold", subtext: "場を借りる代償を負って反論する" }),
      choice("ch4_06_shibata_reject", "反応せず、動画の収益も得ない", [
        "名前を呼ばれても対抗動画を出さず、事件に関する自分の方針だけを固定欄へ残した。柴田は数日煽り続けたが、新しい材料がないと別の話題へ移る。",
        "短期の注目を捨てたことで、炎上の試合を成立させなかった。"
      ], {
        stats: { subscribers: -90_000, trust: 10, energy: 6 },
        hidden: { controversy: -9, origin: 7 },
        routes: { stability: 6, craft: 2 },
        relationships: { shibata: -12 },
        addFlags: ["shibata_rejected", "makoto_event_not_monetized"]
      }, { tone: "steady", subtext: "反応しないことで便乗の試合を止める" })
    ],
    when: when({ minHidden: { controversy: 28 } }),
    priority: 35,
    tags: ["shibata", "controversy", "temptation"],
    visual: {
      background: "bg/ch4_wrestling_gym",
      portrait: "portrait/shibata",
      expression: "provoking",
      eventCg: "cg/ch4_shibata_save_makoto",
      accent: "red"
    }
  }),
  ch4({
    id: "ch4_06_shibata_principled",
    slot: 6,
    title: "救済を名乗る便乗",
    date: "2019年 冬",
    location: "撮影部屋",
    body: [
      "柴田は『マコトを救いたい』の中で、ヒカキンが冷たい友人だと名指しした。コメント欄には反論動画を求める声が押し寄せる。",
      "ヒカキンが守りたいのは自分の評判か、被害をこれ以上コンテンツにしないことか。正しい反論でも、炎上の続きを作れば柴田の狙い通りになる。"
    ],
    choices: [
      choice("ch4_06_principled_no_reply", "柴田には返さず、支援情報だけ更新する", [
        "自分への批判に反応せず、相談窓口と制作現場の新しい安全規定を更新した。対立を待っていた視聴者は離れる。",
        "残った人には、言葉より行動で基準を示した。"
      ], {
        stats: { subscribers: -120_000, trust: 11, production: 3 },
        hidden: { controversy: -10, origin: 8 },
        routes: { stability: 6 },
        relationships: { shibata: -14 },
        addFlags: ["shibata_rejected", "ch4_actions_over_reaction"]
      }, { tone: "steady", subtext: "自己弁護より行動を更新する" }),
      choice("ch4_06_principled_one_line", "便乗には参加しないと一度だけ明言する", [
        "事件の当事者を題材にした対決や救済動画へ参加しないと、短い文章だけを出した。その後はどれだけ挑発されても返信しない。",
        "境界を言葉にしたことで、沈黙を逃避と見る声は減った。"
      ], {
        stats: { trust: 9, expression: 3, subscribers: -40_000 },
        hidden: { controversy: -7, origin: 6 },
        routes: { stability: 5, strategy: 2 },
        relationships: { shibata: -10 },
        addFlags: ["shibata_rejected", "ch4_public_boundary"]
      }, { tone: "warm", subtext: "一度だけ境界を伝え、その後は乗らない" }),
      choice("ch4_06_principled_response", "炎上便乗の構造を解説する", [
        "柴田個人を攻撃せず、怒りが再生数と広告収益へ変わる仕組みを解説した。教育的だと評価される一方、柴田の動画へ新しい流入も生む。",
        "反論には成功したが、完全に火を消すことはできなかった。"
      ], {
        stats: { subscribers: 230_000, production: 5, trust: 6 },
        hidden: { controversy: 1, origin: 4 },
        routes: { strategy: 6, craft: 2 },
        relationships: { shibata: -5 },
        addFlags: ["shibata_method_explained", "ch4_media_literacy"],
        video: { title: "炎上はどうやってお金に変わるのか", views: 12_000_000, subscribersGained: 230_000, kind: "解説", chapter: 4 }
      }, { tone: "bold", subtext: "個人攻撃を避け、仕組みを見せる" })
    ],
    when: when({ minStats: { trust: 68 }, maxHidden: { controversy: 27 } }),
    priority: 30,
    tags: ["shibata", "controversy", "trust"],
    visual: {
      background: "bg/ch4_studio_comment_storm",
      portrait: "portrait/hikakin",
      expression: "calm",
      eventCg: "cg/ch4_refuse_bait",
      accent: "blue"
    }
  }),
  ch4({
    id: "ch4_06_shibata_offer",
    slot: 6,
    title: "炎上のリング",
    date: "2019年 冬",
    location: "柴田からの動画メッセージ",
    body: [
      "世間の炎上へ『○○を救いたい』を次々と投稿する柴田が、マコト事件にも便乗した。今度はレスリング衣装で、ヒカキンへ直接対決を呼びかけている。",
      "怒り、反論、失言。そのすべてを再生数へ変えるのが柴田の技術だ。乗れば多くの人へ届くが、リングへ上がった時点で事件も勝敗の材料になる。"
    ],
    choices: [
      choice("ch4_06_offer_refuse", "被害を題材にした企画には出ない", [
        "理由を一度だけ伝え、挑発へ反応しなかった。柴田の動画は伸びたが、ヒカキン側から燃料を足さずに済む。",
        "視聴者の一部は退屈だと離れ、別の一部は一線を守る姿勢を支持した。"
      ], {
        stats: { subscribers: -80_000, trust: 9, energy: 5 },
        hidden: { controversy: -8, origin: 7 },
        routes: { stability: 5 },
        relationships: { shibata: -10 },
        addFlags: ["shibata_rejected", "makoto_event_not_monetized"]
      }, { tone: "steady", subtext: "対決を成立させない" }),
      choice("ch4_06_offer_other_topic", "事件を外し、レスリング企画だけ受ける", [
        "被害やマコトへ触れない契約を結び、純粋な体力企画として対戦した。柴田はぎりぎりの煽りを続けたが、ヒカキンは話題を戻し続ける。",
        "大きく伸びた一方、便乗相手と組むこと自体への批判は残った。"
      ], {
        stats: { subscribers: 390_000, money: 650_000, expression: 5, trust: -2 },
        hidden: { controversy: 6, fatigue: 5 },
        routes: { mainstream: 3, controversy: 3 },
        relationships: { shibata: 4 },
        addFlags: ["shibata_wrestled_clean", "ch4_public_boundary_tested"]
      }, { tone: "bold", subtext: "題材を切り離して共演する" }),
      choice("ch4_06_offer_join", "『救いたい』動画へ出演する", [
        "ヒカキンは自分の立場を話すつもりだったが、サムネイルも編集も柴田の文法で作られた。被害は背景へ追いやられ、二人の対立だけが切り抜かれる。",
        "過去最大級の再生数と、戻しにくい炎上系の視聴者を得た。"
      ], {
        stats: { subscribers: 760_000, money: 1_300_000, trust: -20 },
        hidden: { controversy: 24, origin: -15, ambition: 8 },
        routes: { controversy: 13 },
        relationships: { shibata: 18 },
        addFlags: ["shibata_joined", "makoto_event_monetized", "controversy_king_path_open"],
        video: { title: "『救いたい』に出演してすべて話します", views: 31_000_000, subscribersGained: 760_000, kind: "炎上", chapter: 4 }
      }, { tone: "risky", subtext: "説明のつもりでも炎上企画の出演者になる" })
    ],
    priority: 0,
    tags: ["shibata", "controversy", "fallback"],
    visual: {
      background: "bg/ch4_video_message",
      portrait: "portrait/shibata",
      expression: "provoking",
      eventCg: "cg/ch4_shibata_wrestling_callout",
      accent: "red"
    }
  }),

  // ── slot 7: 世間と企業の反応 ─────────────────────────
  ch4({
    id: "ch4_07_sponsors_return_trust",
    slot: 7,
    title: "数字ではなく基準を見せてください",
    date: "2020年 春",
    location: "スポンサー面談",
    body: [
      "危機後初めて、大手企業から長期契約の提案が届いた。担当者は登録者数より、広告表記、安全規定、スタッフ体制をどう変えたかを確認したいと言う。",
      "誠実な改革を企業の宣伝材料にすれば、また見せかけになる。実際に守れる基準だけを提示し、違反時に契約を止める条項まで受け入れるかが問われた。"
    ],
    choices: [
      choice("ch4_07_sponsor_binding", "違反時の停止条件まで契約へ入れる", [
        "公開前確認、広告表示、労働時間、安全審査を契約へ明記した。ヒカキン側にも不利な条項だが、言葉を実行へ変える証拠になる。",
        "契約は成立し、信用と収益がゆっくり戻り始めた。"
      ], {
        stats: { money: 2_200_000, subscribers: 280_000, trust: 10, production: 4 },
        hidden: { controversy: -7, origin: 5 },
        routes: { stability: 6, mainstream: 3 },
        relationships: { manager: 8 },
        addFlags: ["ch4_accountable_sponsor", "ch4_trust_rebuilt"]
      }, { tone: "steady", subtext: "自分にも効くルールへする" }),
      choice("ch4_07_sponsor_pilot", "一本だけ試し、結果を公開する", [
        "長期契約の前に小さな案件を行い、制作工程と改善点まで報告した。企業にとっては慎重すぎる進め方だが、視聴者は判断過程を見られる。",
        "大金は得られなかったものの、信頼を急いで買わない姿勢が評価された。"
      ], {
        stats: { money: 700_000, subscribers: 180_000, trust: 8, production: 5 },
        hidden: { controversy: -5, origin: 6 },
        routes: { strategy: 5, craft: 2 },
        addFlags: ["ch4_transparent_pilot", "ch4_trust_rebuilt"]
      }, { tone: "warm", subtext: "小さく試し、過程も公開する" }),
      choice("ch4_07_sponsor_image", "改革を前面に出した大型広告にする", [
        "『生まれ変わったヒカキン』を掲げた広告は大きく露出した。数字は戻ったが、変化よりイメージ戦略が先に立つ。",
        "次に小さなミスが起きた際、広告との落差がより強く批判される火種になった。"
      ], {
        stats: { money: 3_400_000, subscribers: 520_000, trust: -2 },
        hidden: { controversy: 5, ambition: 6 },
        routes: { mainstream: 5, strategy: 2 },
        addFlags: ["ch4_reform_marketed", "ch4_image_gap_seed"]
      }, { tone: "risky", subtext: "回復を広告にして速度を上げる" })
    ],
    when: when({ flagsAny: ["ch4_crisis_owned", "ch4_recovery_ready", "ch4_trust_rebuilt"], minStats: { trust: 58 } }),
    priority: 35,
    tags: ["sponsor", "recovery", "trust"],
    visual: {
      background: "bg/ch4_sponsor_meeting",
      portrait: "portrait/hikakin",
      expression: "careful",
      eventCg: "cg/ch4_new_contract_rules",
      accent: "green"
    }
  }),
  ch4({
    id: "ch4_07_sponsors_leave",
    slot: 7,
    title: "ロゴが消えた壁",
    date: "2020年 春",
    location: "空いた撮影スタジオ",
    body: [
      "説明を拒み続けた結果、複数のスポンサーが同日に契約終了を発表した。昨日まで壁に並んでいたロゴは外され、予定していた企画の予算も消える。",
      "柴田は『企業に捨てられたヒカキンを救いたい』を即日公開し、残った知名度を炎上へ変えれば金は作れると誘ってくる。"
    ],
    choices: [
      choice("ch4_07_leave_rebuild", "遅くても事実説明と補償からやり直す", [
        "広告、現場、マコトへの対応を分け、誤った部分だけを一つずつ認めた。失った契約がすぐ戻ることはない。",
        "それでも、炎上以外の道へ戻る最後の入口を開いた。"
      ], {
        stats: { subscribers: -480_000, money: -1_600_000, trust: 8 },
        hidden: { controversy: -10, origin: 7, ambition: -4 },
        routes: { stability: 5 },
        relationships: { manager: 4, shibata: -5 },
        addFlags: ["ch4_late_accountability", "ch4_recovery_ready"]
      }, { tone: "warm", subtext: "遅れても責任を具体化する" }),
      choice("ch4_07_leave_independent", "低予算の自主制作へ戻る", [
        "高価なセットを諦め、一人の部屋とビートボックスで動画を作った。疑惑への説明不足は残るが、企業の台本なしで話す声は以前より正直だった。",
        "原点へ戻ることで、作品から信頼を作り直す可能性が生まれた。"
      ], {
        stats: { money: -400_000, subscribers: 120_000, beatbox: 6, production: 4, trust: 3 },
        hidden: { origin: 12, controversy: -3 },
        routes: { craft: 7 },
        addFlags: ["ch4_independent_return", "legendary_video_seed"]
      }, { tone: "steady", subtext: "資金を失い、本人の表現へ戻る" }),
      choice("ch4_07_leave_shibata", "柴田と組み、企業を暴露する", [
        "契約交渉の裏側を刺激的に編集し、離れた企業を敵として名指しした。動画は急上昇し、投げ銭と新スポンサーで資金を取り戻す。",
        "チャンネルは商品より対立を売る場所へ変わり、柴田の視聴者が中心になった。"
      ], {
        stats: { subscribers: 760_000, money: 2_400_000, trust: -22 },
        hidden: { controversy: 25, origin: -14, ambition: 8 },
        routes: { controversy: 14 },
        relationships: { shibata: 18, manager: -12 },
        addFlags: ["shibata_joined", "ch4_sponsor_war", "controversy_king_path_open"]
      }, { tone: "risky", subtext: "契約喪失を対立ビジネスへ変える" })
    ],
    when: when({ flagsAny: ["ch4_crisis_denied", "makoto_complicity_denied", "ch4_staff_silenced"], maxStats: { trust: 44 } }),
    priority: 30,
    tags: ["sponsor", "collapse", "controversy"],
    visual: {
      background: "bg/ch4_empty_sponsor_wall",
      portrait: "portrait/hikakin",
      expression: "isolated",
      eventCg: "cg/ch4_logos_removed",
      accent: "red"
    }
  }),
  ch4({
    id: "ch4_07_public_crossroads",
    slot: 7,
    title: "戻ってきた撮影依頼",
    date: "2020年 春",
    location: "事務所",
    body: [
      "業界全体が揺れた数か月後、少しずつ撮影依頼が戻ってきた。以前と同じ条件で再開できる案件と、制作方針を自分で立て直す小さな案件がある。",
      "危機を過ぎたように見える時期ほど、何も変えず元へ戻る誘惑は強い。次の一本が、反省を一時的な言葉にするか日常の基準にするかを決める。"
    ],
    choices: [
      choice("ch4_07_cross_small", "小さくても方針を守れる案件を選ぶ", [
        "報酬より、広告表記と編集権を契約へ入れられる相手を選んだ。規模は小さいが、危機後の言葉を実際の制作で証明する。",
        "信用は派手に戻らず、一本ずつ積み直された。"
      ], {
        stats: { money: 650_000, subscribers: 150_000, trust: 8, production: 3 },
        hidden: { controversy: -5, origin: 5 },
        routes: { stability: 5, craft: 2 },
        addFlags: ["ch4_accountable_sponsor", "ch4_trust_rebuilt"]
      }, { tone: "steady", subtext: "言葉を毎回の契約で証明する" }),
      choice("ch4_07_cross_independent", "企業案件を休み、自主動画に集中する", [
        "所持金を削りながら、視聴者へ直接届けたい企画だけを作った。収益は不安定だが、台本の外で話す感覚が戻る。",
        "作品性と原点が強まり、別の最終到達点が見え始めた。"
      ], {
        stats: { money: -700_000, subscribers: 210_000, production: 5, beatbox: 3, trust: 6 },
        hidden: { origin: 10, fatigue: -3 },
        routes: { craft: 7 },
        addFlags: ["ch4_independent_return", "legendary_video_seed"]
      }, { tone: "warm", subtext: "不安定さと引き換えに自分の声を戻す" }),
      choice("ch4_07_cross_big", "最も大きい案件で復帰を印象づける", [
        "大規模な広告動画で『復活』を演出し、登録者も収益も早く戻った。実際の改革よりイメージが先行する。",
        "成功はしたが、次の小さな不備が以前より大きな裏切りとして見られるようになった。"
      ], {
        stats: { money: 2_600_000, subscribers: 520_000, trust: -3 },
        hidden: { controversy: 6, ambition: 7 },
        routes: { mainstream: 6, strategy: 2 },
        addFlags: ["ch4_reform_marketed", "ch4_image_gap_seed"]
      }, { tone: "risky", subtext: "回復速度を取り、検証される期待も上げる" })
    ],
    priority: 0,
    tags: ["sponsor", "recovery", "fallback"],
    visual: {
      background: "bg/ch4_office_spring",
      portrait: "portrait/hikakin",
      expression: "cautious_hope",
      accent: "green"
    }
  }),

  // ── slot 8: はじめ課長との友情と競争 ─────────────────
  ch4({
    id: "ch4_08_hajime_friend",
    slot: 8,
    title: "親分の隣に座る",
    date: "2020年 夏",
    location: "誰もいない撮影スタジオ",
    body: [
      "騒動の最中、はじめ課長はカメラを持たずに訪ねてきた。擁護動画もコラボも提案せず、ただ空いた椅子に座る。彼のチャンネルは今、ヒカキンへ最も近い登録者数まで伸びている。",
      "『親分を助けるために勝負を緩めたら、親分はもっと怒ると思って』。友情と競争を混ぜずに支えようとする言葉だった。"
    ],
    speaker: "はじめ課長",
    quote: "休むなら休んでください。でも戻ったら、俺は本気で抜きます。",
    choices: [
      choice("ch4_08_friend_honest", "弱さも悔しさも隠さず話す", [
        "事件への対応、登録解除の恐怖、彼に抜かれる焦りまで正直に話した。はじめ課長も日本一を目指す覚悟を隠さない。",
        "二人は互いの不幸ではなく、互いの最高を越えて勝つと約束した。"
      ], {
        stats: { energy: 12, trust: 7, expression: 4 },
        hidden: { fatigue: -8, ambition: 8, origin: 5 },
        routes: { network: 6, mainstream: 3 },
        relationships: { hajime: 18 },
        addFlags: ["hajime_friendship_intact", "hajime_fair_race", "four_emperors_hajime_ready"]
      }, { tone: "warm", subtext: "支え合いながら勝負は緩めない" }),
      choice("ch4_08_friend_joint", "復帰後の直接対決を約束する", [
        "同じ予算、同じ公開日、別々の企画で勝負する案を決めた。危機を友情動画で薄めず、回復後の作品で競う。",
        "目標ができたことでヒカキンの目に力が戻り、はじめ課長もさらに成長した。"
      ], {
        stats: { production: 4, energy: 8, subscribers: 180_000 },
        hidden: { ambition: 10, fatigue: -4 },
        routes: { mainstream: 5, network: 5 },
        relationships: { hajime: 15 },
        addFlags: ["hajime_fair_race", "hajime_final_duel_promised", "four_emperors_hajime_ready"]
      }, { tone: "bold", subtext: "回復後の作品で正面から競う" }),
      choice("ch4_08_friend_ask_cover", "今だけ自分を擁護する動画を頼む", [
        "はじめ課長は迷いながら、親分を信じるという動画を出した。支持者は落ち着いたが、彼の信用までヒカキンの説明不足を埋めるために使われる。",
        "友情には応えてくれた。しかし二人の対等な勝負には、小さな借りが残った。"
      ], {
        stats: { subscribers: 380_000, trust: -5 },
        hidden: { controversy: 6, origin: -5 },
        routes: { network: 3, controversy: 3 },
        relationships: { hajime: 3 },
        addFlags: ["hajime_defense_used", "hajime_friendship_burdened"]
      }, { tone: "risky", subtext: "親友の信用を借りて危機を凌ぐ" })
    ],
    when: when({ minRelationships: { hajime: 18 }, flagsAny: ["hajime_fair_rival_seed", "ch3_hajime_taught", "ch3_public_rivalry"] }),
    priority: 35,
    tags: ["hajime", "friendship", "rivalry"],
    visual: {
      background: "bg/ch4_empty_studio_chairs",
      portrait: "portrait/hajime",
      expression: "gentle_serious",
      eventCg: "cg/ch4_hajime_sits_beside",
      accent: "gold"
    }
  }),
  ch4({
    id: "ch4_08_hajime_wound",
    slot: 8,
    title: "先に公開された企画",
    date: "2020年 夏",
    location: "企画会議室",
    body: [
      "はじめ課長が発表した大型企画は、かつてヒカキンが彼へ伏せた案とよく似ていた。制作側は公開日を一日前へ動かせば、こちらが先に見せられると提案する。",
      "過去の傷がある二人には、偶然の一致も盗用に見えやすい。ここで速度を競えば、最後の日本一争いは作品ではなく疑いの勝負になる。"
    ],
    choices: [
      choice("ch4_08_wound_call", "公開前にはじめ課長へ直接確認する", [
        "二人の企画書を見比べると、発想は似ていても中心の遊び方は異なっていた。同日公開にして互いの動画を紹介することで合意する。",
        "疑いを会話へ変え、傷の残る関係から公平なライバルへ一歩戻った。"
      ], {
        stats: { trust: 7, subscribers: 260_000, production: 3 },
        hidden: { controversy: -4, ambition: 6 },
        routes: { network: 5, mainstream: 3 },
        relationships: { hajime: 14 },
        addFlags: ["hajime_fair_race", "hajime_wound_repaired", "four_emperors_hajime_ready"]
      }, { tone: "warm", subtext: "公開前に疑いを話す" }),
      choice("ch4_08_wound_different", "自分の企画を別の方向へ作り直す", [
        "規模ではなくビートボックスと視聴者参加を核に変え、比較されない一本へした。はじめ課長の記録には負けたが、真似という争いは生まれない。",
        "二人は違う強みで日本一を競う関係へ近づいた。"
      ], {
        stats: { subscribers: 310_000, beatbox: 4, production: 5, trust: 5 },
        hidden: { origin: 7, ambition: 4 },
        routes: { craft: 5, mainstream: 2 },
        relationships: { hajime: 7 },
        addFlags: ["hajime_distinct_paths", "hajime_fair_race"]
      }, { tone: "steady", subtext: "先着競争から降り、自分の強みで競う" }),
      choice("ch4_08_wound_rush", "一日前に公開して先行を取る", [
        "未完成部分を残したまま先に公開し、初日の検索結果を独占した。はじめ課長側は企画経緯を示し、視聴者同士の攻撃が始まる。",
        "数字は勝ったが、はじめ課長は以後ヒカキンを『親分』と呼ばなくなった。"
      ], {
        stats: { subscribers: 650_000, money: 900_000, trust: -14, energy: -9 },
        hidden: { controversy: 15, ambition: 10, origin: -8 },
        routes: { controversy: 8, strategy: 3 },
        relationships: { hajime: -22 },
        addFlags: ["hajime_idea_war", "hajime_friendship_broken"]
      }, { tone: "risky", subtext: "先着を取り、親友との呼び名を失う" })
    ],
    when: when({ flagsAny: ["hajime_rival_wound", "ch3_hajime_idea_withheld", "ch3_hajime_rushed_counter"] }),
    priority: 30,
    tags: ["hajime", "rivalry", "consequence"],
    visual: {
      background: "bg/ch4_planning_room",
      portrait: "portrait/hikakin",
      expression: "suspicious",
      eventCg: "cg/ch4_similar_thumbnails",
      accent: "red"
    }
  }),
  ch4({
    id: "ch4_08_hajime_challenge",
    slot: 8,
    title: "日本二位からの宣戦布告",
    date: "2020年 夏",
    location: "共同イベント 舞台裏",
    body: [
      "はじめ課長はついに日本二位の登録者数へ到達した。舞台裏でいつものように『親分』と呼んだ後、笑顔を消して宣言する。",
      "『親分が落ちてくるのを待つんじゃない。俺がそこまで上がって勝ちます』。ヒカキンにとって、最も嬉しく、最も怖い言葉だった。"
    ],
    choices: [
      choice("ch4_08_challenge_accept", "最高の自分で待っていると答える", [
        "二人は握手し、相手の失敗や炎上ではなく、自分の代表作で順位を動かすと約束した。",
        "親友を倒す相手ではなく、自分を頂上まで押し上げる存在として受け入れた。"
      ], {
        stats: { expression: 5, trust: 7, subscribers: 230_000 },
        hidden: { ambition: 11, origin: 5 },
        routes: { mainstream: 5, network: 5 },
        relationships: { hajime: 14 },
        addFlags: ["hajime_fair_race", "hajime_friendship_intact", "four_emperors_hajime_ready"]
      }, { tone: "warm", subtext: "互いの最高で順位を競う" }),
      choice("ch4_08_challenge_collab", "最後は同日公開で勝負しようと提案する", [
        "同じ期間、同じ予算で、それぞれ一本を作る将来の約束を交わした。視聴者に投票させるのではなく、登録者と長期再生で競う。",
        "第5章の日本一決定戦に、明確なルールが生まれた。"
      ], {
        stats: { production: 4, subscribers: 280_000, trust: 5 },
        hidden: { ambition: 12, fatigue: 2 },
        routes: { strategy: 4, network: 5 },
        relationships: { hajime: 12 },
        addFlags: ["hajime_fair_race", "hajime_final_duel_promised", "four_emperors_hajime_ready"]
      }, { tone: "bold", subtext: "最終決戦の公平なルールを作る" }),
      choice("ch4_08_challenge_guard", "企画情報をすべて秘密にする", [
        "友情と仕事を分け、制作チームにもはじめ課長との情報共有を禁じた。競争の公平さは守れるが、二人の雑談まで警戒の対象になる。",
        "関係は壊れなかったものの、親友より先にライバルとして見る癖がついた。"
      ], {
        stats: { production: 3, subscribers: 330_000 },
        hidden: { ambition: 10, origin: -2 },
        routes: { strategy: 5, mainstream: 3 },
        relationships: { hajime: -3 },
        addFlags: ["hajime_guarded_rivalry", "hajime_fair_race"]
      }, { tone: "steady", subtext: "公平さを守るが、友情に距離を置く" })
    ],
    priority: 0,
    tags: ["hajime", "rivalry", "fallback"],
    visual: {
      background: "bg/ch4_event_backstage",
      portrait: "portrait/hajime",
      expression: "determined",
      eventCg: "cg/ch4_hajime_number_two_declaration",
      accent: "gold"
    }
  }),

  // ── slot 9: 回復か、さらに深い転落か ─────────────────
  ch4({
    id: "ch4_09_recovery_work",
    slot: 9,
    title: "拍手のない改革",
    date: "2020年 秋",
    location: "制作オフィス",
    body: [
      "謝罪動画の再生数は大きかった。しかし、本当の回復作業はカメラのない会議室で続いた。広告契約の確認、勤務時間、安全担当、共演者が相談できる窓口。どれもサムネイルにはならない。",
      "改革を一本の感動動画にすれば、視聴者から早い許しを得られるかもしれない。だが、仕組みが機能する前に成功物語へ変えることは、再び言葉を先に売ることになる。"
    ],
    choices: [
      choice("ch4_09_recovery_six_months", "半年間運用してから結果を報告する", [
        "指標と失敗例を記録し、守れなかった項目も含めて公開した。美しい復活物語にはならないが、改善を検証可能な形にする。",
        "信用はゆっくり戻り、スタッフも改革を自分たちのものとして語れるようになった。"
      ], {
        stats: { subscribers: 260_000, money: -900_000, production: 6, trust: 12, energy: 6 },
        hidden: { controversy: -10, fatigue: -8, origin: 7 },
        routes: { stability: 7, strategy: 3 },
        relationships: { manager: 12 },
        addFlags: ["ch4_reform_verified", "ch4_trust_rebuilt", "ch5_redemption_available"]
      }, { tone: "steady", subtext: "実績ができてから報告する" }),
      choice("ch4_09_recovery_open", "外部委員とスタッフへ評価を委ねる", [
        "ヒカキン本人が合格を宣言せず、外部と現場の評価を公開した。厳しい指摘も残ったが、改善計画に期限をつける。",
        "自分で物語を支配しない姿勢が、失った信用を戻す強い一歩になった。"
      ], {
        stats: { subscribers: 190_000, money: -1_300_000, trust: 14, production: 4 },
        hidden: { controversy: -12, origin: 8 },
        routes: { stability: 8, network: 3 },
        relationships: { manager: 14 },
        addFlags: ["ch4_external_oversight", "ch4_trust_rebuilt", "ch5_redemption_available"]
      }, { tone: "warm", subtext: "評価する権利を自分の外へ置く" }),
      choice("ch4_09_recovery_movie", "改革の裏側を感動ドキュメンタリーにする", [
        "涙と決意を中心に編集した復活動画は大きく伸び、スポンサーも戻った。制度の細部よりヒカキンの苦悩が主役になる。",
        "再起の速度は上がったが、関係者からは『また自分の物語にした』という不満が残った。"
      ], {
        stats: { subscribers: 620_000, money: 1_500_000, trust: 1, expression: 5 },
        hidden: { controversy: 5, ambition: 7, origin: -2 },
        routes: { mainstream: 6, strategy: 3 },
        relationships: { manager: -3 },
        addFlags: ["ch4_recovery_documentary", "ch4_reform_marketed"]
      }, { tone: "risky", subtext: "回復を早めるが、本人中心の物語にする" })
    ],
    when: when({ flagsAny: ["ch4_crisis_owned", "ch4_recovery_ready", "ch4_team_reformed", "ch4_ad_restitution", "ch4_safety_restitution"] }),
    priority: 35,
    tags: ["recovery", "reform", "trust"],
    visual: {
      background: "bg/ch4_reform_meeting",
      portrait: "portrait/hikakin",
      expression: "focused",
      eventCg: "cg/ch4_unfilmed_reform",
      accent: "green"
    }
  }),
  ch4({
    id: "ch4_09_controversy_addiction",
    slot: 9,
    title: "低評価まで待ち遠しい",
    date: "2020年 秋",
    location: "配信部屋",
    body: [
      "柴田との動画以降、普通の商品紹介は以前ほど伸びなくなった。ところが誰かを名指しした瞬間だけ、通知も投げ銭も一気に増える。",
      "ヒカキンは批判される苦しさと同時に、数字が爆発する快感を覚えていた。次の標的候補には、低迷した知人や契約を切った企業の名前まで並ぶ。"
    ],
    choices: [
      choice("ch4_09_addiction_detox", "一か月配信を止め、炎上収益を手放す", [
        "関連動画の収益化を止め、数字から離れる期間を作った。戻った視聴者は少なかったが、自分が怒りを商品にしていたことを認められるようになる。",
        "炎上王への道から戻る最後の大きな機会になった。"
      ], {
        stats: { subscribers: -650_000, money: -1_800_000, energy: 20, trust: 8 },
        hidden: { controversy: -18, fatigue: -12, origin: 9 },
        routes: { stability: 6, controversy: -8 },
        relationships: { shibata: -12 },
        addFlags: ["ch4_controversy_detox", "ch4_recovery_ready"],
        removeFlags: ["controversy_king_path_open"]
      }, { tone: "warm", subtext: "数字と収益を失って依存を断つ" }),
      choice("ch4_09_addiction_self_analysis", "自分の炎上手法だけを検証する", [
        "他人を新しい題材にせず、自分のタイトル、煽り、収益の推移を公開した。言い訳ではなく、どの判断が誰を傷つけたかを整理する。",
        "完全な回復には遠いが、怒りを再生産せず説明する一本になった。"
      ], {
        stats: { subscribers: -220_000, production: 5, trust: 6 },
        hidden: { controversy: -10, origin: 6 },
        routes: { strategy: 4, stability: 3, controversy: -4 },
        relationships: { shibata: -6 },
        addFlags: ["ch4_controversy_accounted", "ch4_late_accountability"]
      }, { tone: "steady", subtext: "新しい標的を作らず、自分を検証する" }),
      choice("ch4_09_addiction_target", "裏切った企業を次の標的にする", [
        "契約資料の一部を切り抜き、企業の矛盾を暴く生配信を行った。反論が来るたび次の動画が作れ、視聴者は連日の対立を待つようになる。",
        "ヒカキンは低評価すら『反応』として喜び、炎上王の座へ近づいた。"
      ], {
        stats: { subscribers: 980_000, money: 2_100_000, trust: -24 },
        hidden: { controversy: 28, ambition: 9, origin: -18 },
        routes: { controversy: 16 },
        relationships: { shibata: 18, manager: -15 },
        addFlags: ["ch4_next_target", "controversy_king_path_open", "ch5_controversy_weapon"]
      }, { tone: "risky", subtext: "対立が永久に動画を供給する" })
    ],
    when: when({ flagsAny: ["shibata_joined", "controversy_king_path_open", "ch4_sponsor_war"], minHidden: { controversy: 35 } }),
    priority: 30,
    tags: ["controversy", "addiction", "recovery"],
    visual: {
      background: "bg/ch4_stream_room_red",
      portrait: "portrait/hikakin",
      expression: "wired",
      eventCg: "cg/ch4_waiting_for_dislikes",
      accent: "red"
    }
  }),
  ch4({
    id: "ch4_09_return_video",
    slot: 9,
    title: "復帰一本目",
    date: "2020年 秋",
    location: "撮影部屋",
    body: [
      "休止や騒動を経て、復帰一本目を選ぶ日が来た。豪華な企画なら大勢を呼び戻せる。原点のビートボックスなら、今の自分が以前と同じではないことまで音に出る。",
      "復帰は『元通り』を演じる場ではない。何を変え、何を変えないかを、説明ではなく一本の動画で示す機会だった。"
    ],
    choices: [
      choice("ch4_09_return_origin", "一人でビートボックスを録る", [
        "昔と同じ構図で、撮り直しを隠さず一本を完成させた。華やかな復活ではないが、最初から見てきた視聴者へ本人の音が届く。",
        "原点は逃げ場所ではなく、もう一度進むための基準になった。"
      ], {
        stats: { subscribers: 240_000, beatbox: 7, trust: 8, energy: 5 },
        hidden: { origin: 13, fatigue: -5 },
        routes: { craft: 8 },
        addFlags: ["ch4_origin_return", "legendary_video_seed"],
        video: { title: "ただいま。いまの僕のビートボックス", views: 11_000_000, subscribersGained: 240_000, kind: "復帰・ビートボックス", chapter: 4 }
      }, { tone: "warm", subtext: "昔を再現せず、今の音を見せる" }),
      choice("ch4_09_return_team", "改善したチームで通常動画を作る", [
        "新しい勤務時間と確認工程を守り、無理なら公開を遅らせる条件で一本を作った。画面だけを見れば以前と同じ明るい動画だ。",
        "変化を主張せず日常で守ることが、長い回復の始まりになった。"
      ], {
        stats: { subscribers: 300_000, production: 5, trust: 7, energy: 7 },
        hidden: { fatigue: -6, controversy: -4 },
        routes: { stability: 6, mainstream: 3 },
        relationships: { manager: 8 },
        addFlags: ["ch4_team_reformed", "ch4_trust_rebuilt"],
        video: { title: "復帰一本目の商品紹介", views: 13_000_000, subscribersGained: 300_000, kind: "復帰・商品紹介", chapter: 4 }
      }, { tone: "steady", subtext: "変化を宣伝せず、普段の制作で守る" }),
      choice("ch4_09_return_spectacle", "史上最大の復活企画を出す", [
        "大勢の出演者と派手な演出で帰還を宣言し、再生数は一晩で記録を更新した。視聴者は『完全復活』という物語に熱狂する。",
        "その速さは、解決しきっていない問題まで過去にしたように見せた。"
      ], {
        stats: { subscribers: 760_000, money: 1_200_000, expression: 5, trust: -4 },
        hidden: { controversy: 6, ambition: 8, fatigue: 5 },
        routes: { mainstream: 7 },
        addFlags: ["ch4_spectacle_return", "ch4_reform_marketed"],
        video: { title: "完全復活――史上最大の企画", views: 34_000_000, subscribersGained: 760_000, kind: "復帰・大型企画", chapter: 4 }
      }, { tone: "risky", subtext: "勢いは戻るが、回復を演出で完了させる" })
    ],
    priority: 0,
    tags: ["recovery", "return", "fallback"],
    visual: {
      background: "bg/ch4_studio_return",
      portrait: "portrait/hikakin",
      expression: "tentative_smile",
      eventCg: "cg/ch4_first_video_back",
      accent: "green"
    }
  }),

  // ── slot 10: 頂上直前の手段 ───────────────────────────
  ch4({
    id: "ch4_10_clean_title_race",
    slot: 10,
    title: "一位まで、あと百万人",
    date: "2021年 春",
    location: "登録者分析室",
    body: [
      "信用を積み直し、ヒカキンは日本一まで約百万人の位置へ戻った。はじめ課長もすぐ後ろにいる。分析担当は、家族層、音楽、世界配信の三方向なら正攻法で届くと示す。",
      "どれも成功の保証はない。過去の炎上のような爆発力を使わず、長い準備と視聴者の支持だけで最後の差を埋める勝負になる。"
    ],
    choices: [
      choice("ch4_10_clean_family", "家族で楽しめる一年企画へ投資する", [
        "安全と分かりやすさを徹底し、子供も大人も参加できるシリーズを始めた。急激ではないが登録者が毎週安定して増える。",
        "シル子との安全な遊び企画にもつながり、四皇時代の土台が強まった。"
      ], {
        stats: { subscribers: 820_000, money: -1_500_000, expression: 5, trust: 9 },
        hidden: { origin: 5, ambition: 9 },
        routes: { mainstream: 8, network: 3 },
        relationships: { shiruko: 8 },
        addFlags: ["ch4_family_title_push", "ch5_title_contender", "four_emperors_shiruko_seed"]
      }, { tone: "warm", subtext: "広い世代の信頼で差を埋める" }),
      choice("ch4_10_clean_world", "音と映像だけで伝わる世界企画を作る", [
        "言葉へ頼らず、ビートボックスと映像で各国の投稿者をつないだ。制作期間は長いが、海外の視聴者が再びチャンネルへ集まる。",
        "最初のゲーム音楽動画から続く、国境を越える強みが頂上への武器になった。"
      ], {
        stats: { subscribers: 900_000, money: -1_800_000, production: 6, beatbox: 6, trust: 7 },
        hidden: { origin: 10, ambition: 8, fatigue: 5 },
        routes: { craft: 5, mainstream: 5, network: 3 },
        addFlags: ["ch4_global_title_push", "ch5_title_contender", "legendary_video_seed"]
      }, { tone: "bold", subtext: "原点を世界規模へ育てる" }),
      choice("ch4_10_clean_steady", "普段の動画を崩さず一年続ける", [
        "一発の勝負ではなく、商品紹介、ゲーム、料理を決まった頻度と品質で出し続けた。派手なニュースにはならない。",
        "離れた視聴者が少しずつ戻り、ヒカキン本人を見に来る層が最も強くなった。"
      ], {
        stats: { subscribers: 720_000, money: 1_000_000, production: 5, trust: 10, energy: -5 },
        hidden: { origin: 7, ambition: 7, fatigue: 3 },
        routes: { mainstream: 6, stability: 5 },
        addFlags: ["ch4_consistent_title_push", "ch5_title_contender"]
      }, { tone: "steady", subtext: "一発より継続で頂上へ向かう" })
    ],
    when: when({ minStats: { trust: 65, subscribers: 5_000_000 }, flagsNone: ["controversy_king_path_open"] }),
    priority: 35,
    tags: ["title-race", "trust", "number-one"],
    visual: {
      background: "bg/ch4_analytics_room",
      portrait: "portrait/hikakin",
      expression: "determined",
      eventCg: "cg/ch4_one_million_gap",
      accent: "gold"
    }
  }),
  ch4({
    id: "ch4_10_dirty_title_offer",
    slot: 10,
    title: "一晩で一位になる方法",
    date: "2021年 春",
    location: "深夜の打ち合わせ",
    body: [
      "柴田が、業界の不正を暴くという未確認資料を持ち込んだ。はじめ課長を直接攻撃する内容ではないが、公開すればYouTuber全体への不信が広がり、最も知名度の高いヒカキンへ視線が集まる。",
      "真偽確認には数週間かかる。柴田は『確認したころには旬が終わる』と笑う。一位へ届く速度と、誰かの人生を壊す可能性が同じ封筒に入っていた。"
    ],
    choices: [
      choice("ch4_10_dirty_verify", "公開せず、資料を専門家へ渡す", [
        "自分で暴露せず、検証できる機関へ資料を渡した。結果が出るまで内容には触れず、順位争いと事実確認を切り離す。",
        "一位への近道は失ったが、捏造を広げる危険を止めた。"
      ], {
        stats: { subscribers: -100_000, trust: 10 },
        hidden: { controversy: -12, origin: 8, ambition: -3 },
        routes: { stability: 5, strategy: 3, controversy: -4 },
        relationships: { shibata: -16, hajime: 4 },
        addFlags: ["ch4_dirty_offer_rejected", "ch5_clean_race"]
      }, { tone: "steady", subtext: "旬より検証を優先する" }),
      choice("ch4_10_dirty_expose_method", "資料は見せず、誘惑された事実を話す", [
        "個人名や内容を伏せ、未確認情報が順位争いへ利用される仕組みだけを解説した。柴田との関係は完全に切れる。",
        "再生数は伸びたが、暴露の中身を求める声も増え、完全に無害ではなかった。"
      ], {
        stats: { subscribers: 220_000, production: 5, trust: 7 },
        hidden: { controversy: -5, origin: 6 },
        routes: { strategy: 6 },
        relationships: { shibata: -18, hajime: 3 },
        addFlags: ["ch4_dirty_offer_exposed", "ch5_clean_race"]
      }, { tone: "bold", subtext: "中身ではなく誘惑の構造を見せる" }),
      choice("ch4_10_dirty_publish", "旬を逃さず暴露動画を出す", [
        "『業界の闇をすべて話します』は過去最大の初速を記録した。後に資料の一部が加工されていたと判明する。",
        "訂正より元動画の方がはるかに広く届き、ヒカキンは真実より強い物語を売った人物になった。"
      ], {
        stats: { subscribers: 1_300_000, money: 2_600_000, trust: -30 },
        hidden: { controversy: 32, ambition: 12, origin: -20 },
        routes: { controversy: 18 },
        relationships: { shibata: 22, hajime: -12 },
        addFlags: ["ch4_false_expose", "controversy_king_path_open", "ch5_controversy_weapon"],
        video: { title: "業界の闇をすべて話します", views: 52_000_000, subscribersGained: 1_300_000, kind: "未確認暴露", chapter: 4 }
      }, { tone: "risky", subtext: "一位へ近づき、捏造の発信者になる" })
    ],
    when: when({ flagsAny: ["shibata_joined", "controversy_king_path_open", "ch4_next_target"], minHidden: { controversy: 32 } }),
    priority: 30,
    tags: ["title-race", "controversy", "shibata"],
    visual: {
      background: "bg/ch4_night_meeting",
      portrait: "portrait/shibata",
      expression: "smirking",
      eventCg: "cg/ch4_unverified_envelope",
      accent: "red"
    }
  }),
  ch4({
    id: "ch4_10_final_year_plan",
    slot: 10,
    title: "最後の一年を何に使うか",
    date: "2021年 春",
    location: "企画ボードの前",
    body: [
      "日本一への差は、もう遠い夢ではなく一年の計画で届く距離になった。同時に、信用を戻しきれていない問題、疲れた身体、磨いてきた制作力もある。",
      "すべてを一位へ集中すれば勝てるかもしれない。別の才能へ時間を使えば、登録者競争とは違う完成へ進める。"
    ],
    choices: [
      choice("ch4_10_plan_title", "登録者日本一へ全企画を集中する", [
        "広い世代へ届く投稿計画を組み、はじめ課長との正面勝負へ入った。休息と信用の基準も計画に含める。",
        "ヒカキンは最後の一年を、頂上への挑戦として明確に選んだ。"
      ], {
        stats: { subscribers: 650_000, production: 4, expression: 4, trust: 4, energy: -8 },
        hidden: { ambition: 12, fatigue: 5 },
        routes: { mainstream: 7, strategy: 3 },
        relationships: { hajime: 4 },
        addFlags: ["ch5_title_contender", "ch4_declared_final_race"]
      }, { tone: "bold", subtext: "全力で日本一を狙う" }),
      choice("ch4_10_plan_masterpiece", "順位を離れ、一本の作品へ集中する", [
        "日々の投稿を減らし、これまでの音、場所、失敗をつなぐ長期制作を始めた。登録者差は広がる。",
        "数字の競争を降りても、動画で何者になるかという問いは続いていた。"
      ], {
        stats: { subscribers: -140_000, production: 8, beatbox: 6, energy: -5 },
        hidden: { origin: 14, perfectionism: 5, ambition: 2 },
        routes: { craft: 10 },
        addFlags: ["ch5_legendary_project", "legendary_video_seed"]
      }, { tone: "steady", subtext: "順位ではなく作品の頂点へ向かう" }),
      choice("ch4_10_plan_produce", "自分より次世代の動画を育てる", [
        "出演時間を減らし、若い投稿者の企画と編集へ力を貸した。自分の登録者は伸びなくても、手がけたチャンネルが次々に注目される。",
        "裏方として人の魅力を見つける才能が、はっきり形になった。"
      ], {
        stats: { subscribers: -80_000, production: 9, trust: 7, energy: 4 },
        hidden: { origin: 7, ambition: -1 },
        routes: { strategy: 7, network: 6 },
        relationships: { manager: 6 },
        addFlags: ["ch5_mastermind_entry", "mastermind_path_open"]
      }, { tone: "warm", subtext: "自分の順位より他人の可能性を選ぶ" })
    ],
    priority: 0,
    tags: ["title-race", "direction", "fallback"],
    visual: {
      background: "bg/ch4_planning_board",
      portrait: "portrait/hikakin",
      expression: "resolved",
      eventCg: "cg/ch4_three_final_year_paths",
      accent: "gold"
    }
  }),

  // ── slot 11: 第5章への入口 ────────────────────────────
  ch4({
    id: "ch4_11_title_contender_close",
    slot: 11,
    title: "王座までの残り時間",
    date: "2021年 夏",
    location: "夜明けの撮影スタジオ",
    body: [
      "信頼を失う危機を越え、ヒカキンは再び日本一を狙える位置へ立った。はじめ課長は日本二位として、正面から追っている。テツとシル子も、それぞれの分野で時代を代表する存在へ育ちつつある。",
      "最後の章で必要なのは、過去をなかったことにする勝利ではない。選んだ責任も支えてくれた人も含めて、約二千万人が待つ一本を作ることだ。"
    ],
    choices: [
      choice("ch4_11_contender_promise", "はじめ課長へ公平な最終勝負を確認する", [
        "互いの企画を妨害せず、同じ公開期間で最高の一本を出す約束を交わした。はじめ課長は最後まで『親分』と呼びながら、本気で勝つと宣言する。",
        "友情を失わない日本一争いが始まった。"
      ], {
        stats: { subscribers: 420_000, trust: 8, expression: 4 },
        hidden: { ambition: 12, origin: 6 },
        routes: { mainstream: 6, network: 5 },
        relationships: { hajime: 14 },
        addFlags: ["ch5_entry_title_contender", "hajime_fair_race", "hajime_friendship_intact", "four_emperors_hajime_ready"]
      }, { tone: "warm", subtext: "親友の最高を越えて勝つ" }),
      choice("ch4_11_contender_four", "テツとシル子にも未来の企画を打診する", [
        "地元、遊び、大型挑戦、総合力を一つにする企画書を送った。全員が独自の活動を守りながら参加できる構成にする。",
        "四人が互いを引き上げる『四皇時代』の条件が揃い始めた。"
      ], {
        stats: { production: 6, trust: 9, subscribers: 360_000 },
        hidden: { ambition: 10, origin: 7 },
        routes: { network: 8, strategy: 3 },
        relationships: { hajime: 8, tetsu: 16, shiruko: 16 },
        addFlags: ["ch5_entry_title_contender", "four_emperors_collective_seed", "four_emperors_collab_ready"]
      }, { tone: "bold", subtext: "自分だけでなく時代の頂上を作る" }),
      choice("ch4_11_contender_solo", "最後は自分一人の企画で証明する", [
        "豪華な人脈を勝利条件にせず、一人で始めた技術と総合力を一本へまとめる。仲間には応援だけを頼んだ。",
        "四皇企画の可能性は下がったが、ヒカキン個人の日本一へ最も純粋な道が開いた。"
      ], {
        stats: { production: 6, beatbox: 5, subscribers: 390_000, trust: 6 },
        hidden: { origin: 11, ambition: 11, perfectionism: 4 },
        routes: { craft: 6, mainstream: 4 },
        relationships: { hajime: 5 },
        addFlags: ["ch5_entry_title_contender", "ch5_solo_final_seed"]
      }, { tone: "steady", subtext: "人脈ではなく本人の集大成で挑む" })
    ],
    when: when({
      flagsAny: ["ch5_title_contender", "ch4_declared_final_race"],
      minStats: { trust: 55, subscribers: 5_500_000 },
      maxHidden: { controversy: 44 }
    }),
    mandatory: true,
    priority: 50,
    tags: ["chapter-close", "title-contender", "anchor"],
    visual: {
      background: "bg/ch4_studio_dawn",
      portrait: "portrait/hikakin",
      expression: "determined",
      eventCg: "cg/ch4_throne_countdown",
      accent: "gold"
    }
  }),
  ch4({
    id: "ch4_11_controversy_close",
    slot: 11,
    title: "炎の上に立つ王",
    date: "2021年 夏",
    location: "炎上配信スタジオ",
    body: [
      "スポンサーと古い視聴者が去った後も、チャンネルの知名度は過去最大だった。柴田との暴露、対立、謝罪予告は、普通の動画より何倍も再生される。",
      "日本一へ届く可能性すら残っている。ただし今の視聴者が待つのはヒカキンの動画ではなく、次に誰が傷つくかだ。"
    ],
    choices: [
      choice("ch4_11_fire_last_exit", "全暴露企画を止め、再び謝罪と補償へ戻る", [
        "予定していた配信を中止し、資料の検証と被害を受けた関係者への連絡を始めた。登録者と収益は急落する。",
        "遅すぎる回復かもしれない。それでも炎上王以外の結末へ戻る細い道を選んだ。"
      ], {
        stats: { subscribers: -1_000_000, money: -2_400_000, trust: 8 },
        hidden: { controversy: -22, origin: 10, ambition: -6 },
        routes: { stability: 5, controversy: -10 },
        relationships: { shibata: -20 },
        addFlags: ["ch5_entry_recovery", "ch4_last_exit_taken"],
        removeFlags: ["controversy_king_path_open", "ch5_controversy_weapon"]
      }, { tone: "warm", subtext: "すべてを失ってでも炎上から降りる" }),
      choice("ch4_11_fire_independent", "柴田とも決別し、一人の炎上系として進む", [
        "柴田の台本を拒み、自分で標的と公開日を選ぶようになった。依存を断ったのではなく、手法を完全に自分のものにした。",
        "チャンネルは『元祖の後継』ではなく、独立した炎上王候補になる。"
      ], {
        stats: { subscribers: 780_000, money: 1_500_000, trust: -16 },
        hidden: { controversy: 22, ambition: 12, origin: -14 },
        routes: { controversy: 14 },
        relationships: { shibata: -5 },
        addFlags: ["ch5_entry_controversy", "controversy_king_path_open", "ch5_controversy_weapon"]
      }, { tone: "bold", subtext: "柴田を離れ、手法だけを継ぐ" }),
      choice("ch4_11_fire_alliance", "柴田と日本最大の暴露配信を予告する", [
        "未確認資料、企業名、過去の仲間。すべてを一夜で公開する告知は、開始前から百万件の待機を集めた。",
        "ヒカキンは誰かを楽しませるためでなく、注目を支配するためにカメラの前へ座った。"
      ], {
        stats: { subscribers: 1_400_000, money: 2_800_000, trust: -28 },
        hidden: { controversy: 32, ambition: 14, origin: -22 },
        routes: { controversy: 18 },
        relationships: { shibata: 20 },
        addFlags: ["ch5_entry_controversy", "controversy_king_path_open", "ch5_mega_expose_promised"]
      }, { tone: "risky", subtext: "炎上王の最終章へ進む" })
    ],
    when: when({
      flagsAny: ["controversy_king_path_open", "ch5_controversy_weapon", "ch4_false_expose"],
      minHidden: { controversy: 42 },
      maxStats: { trust: 48 }
    }),
    mandatory: true,
    priority: 45,
    tags: ["chapter-close", "controversy", "anchor"],
    visual: {
      background: "bg/ch4_stream_room_fire",
      portrait: "portrait/hikakin",
      expression: "cold_smile",
      eventCg: "cg/ch4_king_on_fire",
      accent: "red"
    }
  }),
  ch4({
    id: "ch4_11_what_remains",
    slot: 11,
    title: "最後の章へ持っていくもの",
    date: "2021年 夏",
    location: "夜の撮影部屋",
    body: [
      "成功、炎上、休止、回復。人気が何度形を変えても、机の上には一本のマイクと次の企画メモが残った。日本一へ進む道だけが、何者かになる答えではない。",
      "自分の作品を完成させる道、人の才能を育てる道、失った基盤を取り戻す道もある。第5章で何を証明するか、ヒカキンは最後に一つだけ選ぶ。"
    ],
    speaker: "ヒカキン",
    quote: "数字も失敗も消せない。全部持って、最後の一本を選ぶ。",
    choices: [
      choice("ch4_11_remain_art", "人生を一本の作品へまとめる", [
        "投稿頻度と順位を手放し、原点の音と身につけた制作技術を一つの企画へ集め始めた。",
        "第5章は、日本一ではなく伝説の一本を完成させる道から始まる。"
      ], {
        stats: { production: 7, beatbox: 6, subscribers: -120_000, trust: 5 },
        hidden: { origin: 14, perfectionism: 5, ambition: 1 },
        routes: { craft: 10 },
        addFlags: ["ch5_entry_craft", "ch5_legendary_project", "legendary_video_seed"]
      }, { tone: "steady", subtext: "順位を越える代表作へ進む" }),
      choice("ch4_11_remain_people", "他人の動画を成功させる側へ回る", [
        "出演者としての数字より、若い投稿者の声を引き出す企画会議に手応えを感じた。自分の更新を減らし、制作チームを育成の場へ変える。",
        "第5章では裏方としての才能が試される。"
      ], {
        stats: { production: 9, subscribers: -180_000, trust: 8, energy: 7 },
        hidden: { origin: 8, ambition: -2 },
        routes: { strategy: 8, network: 7 },
        relationships: { manager: 10 },
        addFlags: ["ch5_entry_mastermind", "mastermind_path_open"]
      }, { tone: "warm", subtext: "自分の画面より人の可能性を選ぶ" }),
      choice("ch4_11_remain_survive", "規模を落とし、活動基盤の再建を優先する", [
        "高額なスタジオとスタッフ契約を整理し、生活費と小さな撮影環境を守った。人気は大きく落ちるが、即座に活動が終わることは避ける。",
        "第5章は、再挑戦できるか、スーパーと路上へ戻るかの境界から始まる。"
      ], {
        stats: { money: 500_000, subscribers: -300_000, energy: 12, trust: 2 },
        hidden: { fatigue: -10, origin: 5, ambition: 2 },
        routes: { stability: 7 },
        relationships: { supermarket: 5 },
        addFlags: ["ch5_entry_recovery", "ch5_fragile_base"]
      }, { tone: "steady", subtext: "まず活動を終わらせない" })
    ],
    mandatory: true,
    priority: 0,
    tags: ["chapter-close", "anchor", "fallback"],
    visual: {
      background: "bg/ch4_studio_night_quiet",
      portrait: "portrait/hikakin",
      expression: "resolved",
      eventCg: "cg/ch4_what_remains",
      accent: "violet"
    }
  })
];
