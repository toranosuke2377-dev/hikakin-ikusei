import type { StoryEvent } from "../game/types";
import { choice, event, when } from "./helpers";

const ch3 = (
  definition: Omit<StoryEvent, "chapter" | "oncePerRun">
): StoryEvent =>
  event({
    ...definition,
    chapter: 3,
    oncePerRun: true
  });

/**
 * 第3章「YouTuber新時代」
 * 各slotには必ず無条件イベントがあり、上に並ぶ条件付きイベントほど
 * その周回で築いたヒカキンの方針を濃く反映する。
 */
export const chapter3Events: StoryEvent[] = [
  // ── slot 0: 新時代の入口 ─────────────────────────────
  ch3({
    id: "ch3_00_craft_opening",
    slot: 0,
    title: "一人で作った画面の外へ",
    date: "2013年 春",
    location: "新しい撮影部屋",
    body: [
      "カメラ、照明、机の上の商品。そのすべてをヒカキンは自分の手が届く位置に置いていた。動画の規模は大きくなったのに、録画ボタンを押す指だけは社員寮のころと変わらない。",
      "企業や編集者から届くメールは日に日に増えている。一本を一人で磨き抜く時間と、待っている視聴者の数が、初めて正面からぶつかり始めた。"
    ],
    speaker: "ヒカキン",
    quote: "人が増えたからって、僕の音まで誰かに任せたくはない。",
    choices: [
      choice("ch3_00_craft_keep", "核になる動画は一人で作り続ける", [
        "投稿間隔は延びたが、完成した一本には細部までヒカキンの癖が残った。視聴者は『待てば、この人にしか作れないものが来る』と受け止める。",
        "一方で、撮影から公開までを抱え込む生活は、目に見えない疲労を積み上げた。"
      ], {
        stats: { subscribers: 180_000, production: 5, energy: -12, trust: 3 },
        hidden: { origin: 5, perfectionism: 5, fatigue: 9 },
        routes: { craft: 6 },
        addFlags: ["ch3_production_solo", "ch3_authored_style"]
      }, { tone: "steady", subtext: "作品性は守れるが、疲労を抱え込む" }),
      choice("ch3_00_craft_assistant", "単純作業だけを手伝ってもらう", [
        "データ整理と字幕確認だけを任せ、企画と最終編集は自分で握った。動画の温度を失わず、公開までの時間を少し短縮できた。",
        "『任せることも制作の一部だ』という感覚が、ヒカキンの中に初めて芽生えた。"
      ], {
        stats: { subscribers: 230_000, money: -280_000, production: 4, energy: -4, trust: 2 },
        hidden: { origin: 3, fatigue: 3 },
        routes: { craft: 3, network: 3 },
        relationships: { manager: 4 },
        addFlags: ["ch3_small_team", "ch3_final_cut_kept"]
      }, { tone: "warm", subtext: "作家性と速度の両立を試す" }),
      choice("ch3_00_craft_workshop", "制作工程を公開する動画に変える", [
        "何十回もの撮り直しや細かな音調整まで一本の動画にした。完成品だけでは見えなかった努力が伝わり、若い投稿者から質問が殺到する。",
        "ヒカキンは自分の技術が、他人の動画を強くする可能性にも気づいた。"
      ], {
        stats: { subscribers: 260_000, expression: 3, production: 6, trust: 4, energy: -7 },
        hidden: { origin: 4, ambition: 2, fatigue: 4 },
        routes: { craft: 4, strategy: 2 },
        addFlags: ["ch3_process_shared", "mastermind_seed"]
      }, { tone: "bold", subtext: "技術を見せること自体を企画にする" })
    ],
    when: when({ minRoutes: { craft: 10 } }),
    priority: 30,
    tags: ["opening", "craft", "production"],
    visual: {
      background: "bg/ch3_studio_night",
      portrait: "portrait/hikakin",
      expression: "focused",
      eventCg: "cg/ch3_solo_editing",
      accent: "violet"
    }
  }),
  ch3({
    id: "ch3_00_network_opening",
    slot: 0,
    title: "通知欄に並ぶ名前",
    date: "2013年 春",
    location: "撮影部屋",
    body: [
      "はじめ課長、まっすお、ダンケ、サックスむらい。動画を始めたころは海外の投稿者しか並ばなかった画面に、今では知っている名前が次々と現れる。",
      "誘いを一つ受ければ新しい景色が撮れる。しかし、その一日は自分の動画を作れない一日でもある。ヒカキンは今週だけで七件のコラボ依頼を見比べた。"
    ],
    speaker: "ヒカキン",
    quote: "全部会いたい。でも、僕のチャンネルも僕が動かさないと止まる。",
    choices: [
      choice("ch3_00_network_curate", "自分が学べる相手だけに絞る", [
        "知名度ではなく、企画にない強みを持つ相手を三人選んだ。断った相手には自分の言葉で理由を伝え、関係を切らずに済ませる。",
        "交流は減ったが、一回ごとの密度が上がった。"
      ], {
        stats: { subscribers: 260_000, production: 4, expression: 3, trust: 4 },
        hidden: { ambition: 3, fatigue: 2 },
        routes: { strategy: 3, network: 4 },
        relationships: { hajime: 2, murai: 2, danke: 2 },
        addFlags: ["ch3_curated_network"]
      }, { tone: "steady", subtext: "広さより意味を選ぶ" }),
      choice("ch3_00_network_all", "来た誘いをできる限り受ける", [
        "月の半分を誰かの撮影現場で過ごし、ヒカキンの顔は一気に広い層へ届いた。どの現場でも空気を読み、短い出番で結果を残した。",
        "ただ、自分の編集画面を開くころには深夜になっていた。"
      ], {
        stats: { subscribers: 430_000, expression: 5, energy: -15, trust: 2 },
        hidden: { fatigue: 11, origin: -2 },
        routes: { network: 7, mainstream: 3 },
        relationships: { hajime: 3, tetsu: 2, shiruko: 2 },
        addFlags: ["ch3_everywhere_guest", "ch3_overbooked"]
      }, { tone: "bold", subtext: "急拡大する代わりに自分の時間を失う" }),
      choice("ch3_00_network_host", "自分の部屋に皆を招く企画を立てる", [
        "相手の企画へ乗るだけでなく、異なる投稿者の特技が交わる番組を自分で設計した。ヒカキンは司会として場を回し、全員に見せ場を作った。",
        "再生数以上に、業界で『一緒に仕事をしやすい人』という評判が広がった。"
      ], {
        stats: { subscribers: 350_000, money: -420_000, expression: 5, production: 5, trust: 5 },
        hidden: { fatigue: 5, ambition: 3 },
        routes: { network: 5, mainstream: 3 },
        relationships: { hajime: 3, tetsu: 3, shiruko: 3, manager: 2 },
        addFlags: ["ch3_generous_host", "mastermind_seed"]
      }, { tone: "warm", subtext: "ヒカキンが交流の中心を作る" })
    ],
    when: when({ minRoutes: { network: 10 } }),
    priority: 25,
    tags: ["opening", "network"],
    visual: {
      background: "bg/ch3_studio_day",
      portrait: "portrait/hikakin",
      expression: "thinking",
      eventCg: "cg/ch3_collaboration_inbox",
      accent: "green"
    }
  }),
  ch3({
    id: "ch3_00_new_era",
    slot: 0,
    title: "仕事になった遊び",
    date: "2013年 春",
    location: "撮影部屋",
    body: [
      "商品紹介、ゲーム実況、検証、料理。あの安いマイクに向かって音を鳴らしていた青年は、いまや毎週まったく違う動画を待たれている。",
      "同時に、企業から企画書が届き、知らない投稿者から共演を求められ、公開日には数字が仕事として問われる。YouTubeはもう、誰かの趣味が並ぶだけの場所ではなかった。"
    ],
    speaker: "ヒカキン",
    quote: "大きくなった。でも、面白くする責任は僕のままだ。",
    choices: [
      choice("ch3_00_new_broaden", "扱うジャンルをさらに広げる", [
        "食べ物から玩具、ゲームから街歩きまで、初めての題材を恐れず試した。大外れもあったが、チャンネルを一言で説明できないことが個性になる。",
        "幅広い視聴者が定着し、国民的な人気への土台ができた。"
      ], {
        stats: { subscribers: 360_000, expression: 5, production: 2, energy: -7 },
        hidden: { ambition: 4, fatigue: 4 },
        routes: { mainstream: 6, strategy: 2 },
        addFlags: ["ch3_general_creator"]
      }, { tone: "bold", subtext: "総合YouTuberとして前へ出る" }),
      choice("ch3_00_new_signature", "ビートボックスを全ジャンルの署名にする", [
        "料理の効果音、ゲームの失敗、商品の開封音。見せびらかさず、必要な瞬間だけ原点の音を混ぜた。",
        "視聴者はジャンルが変わっても、短い一音で『ヒカキンの動画だ』と分かるようになる。"
      ], {
        stats: { subscribers: 290_000, production: 4, beatbox: 5, trust: 3 },
        hidden: { origin: 7, perfectionism: 2 },
        routes: { craft: 4, mainstream: 3 },
        addFlags: ["ch3_beatbox_signature"]
      }, { tone: "steady", subtext: "原点を、型ではなく個性として残す" }),
      choice("ch3_00_new_business", "制作を事業として組み直す", [
        "企画日、撮影日、編集日を分け、収支と再生予測まで表にした。偶然だった成功を再現可能な仕事へ変え始める。",
        "数字は安定したが、予定表にない衝動を動画にする余白は減った。"
      ], {
        stats: { subscribers: 320_000, money: 650_000, production: 5, energy: 2 },
        hidden: { origin: -3, ambition: 4 },
        routes: { strategy: 6, stability: 3 },
        addFlags: ["ch3_business_system"]
      }, { tone: "steady", subtext: "成功を仕組みに変える" })
    ],
    priority: 0,
    tags: ["opening", "fallback"],
    visual: {
      background: "bg/ch3_studio_day",
      portrait: "portrait/hikakin",
      expression: "determined",
      eventCg: "cg/ch3_creator_new_era",
      accent: "blue"
    }
  }),

  // ── slot 1: 制作体制 ─────────────────────────────────
  ch3({
    id: "ch3_01_fatigue_breakpoint",
    slot: 1,
    title: "午前四時、書き出し残り八分",
    date: "2013年 夏",
    location: "編集机",
    body: [
      "撮影を終え、字幕を入れ、音量を直したころには午前四時だった。画面には『書き出し残り八分』と出ているが、ヒカキンの指はマウスの上で止まっていた。",
      "翌朝にも撮影がある。ここで眠れば公開が遅れ、続ければ身体が先に止まる。『全部できる』と『全部やるべきだ』は違うと、ようやく認める時が来た。"
    ],
    choices: [
      choice("ch3_01_fatigue_hire", "正式に編集者を一人雇う", [
        "技術試験ではなく、自分の失敗まで率直に指摘できる人を選んだ。最初の数本は直す方が時間がかかったが、やがて二人だけの編集言語が生まれた。",
        "費用は増えたものの、ヒカキンは撮影後に眠れる夜を取り戻した。"
      ], {
        stats: { money: -1_200_000, production: 5, energy: 15, trust: 2 },
        hidden: { fatigue: -14, perfectionism: -3 },
        routes: { network: 5, stability: 3 },
        relationships: { manager: 10 },
        addFlags: ["ch3_hired_editor", "ch3_staff_fair_start"]
      }, { tone: "warm", subtext: "費用を払い、長く続ける体制を作る" }),
      choice("ch3_01_fatigue_pause", "一本休んで工程を整理する", [
        "公開予定を一度だけ白紙にし、作業時間を一つずつ記録した。撮り直しの半分は視聴者に伝わらない細部へ使われていた。",
        "休止を説明したことで登録者はわずかに減ったが、次の一本は無理なく期限に間に合った。"
      ], {
        stats: { subscribers: -40_000, production: 7, energy: 18, trust: 5 },
        hidden: { fatigue: -12, perfectionism: -6, origin: 2 },
        routes: { strategy: 5, craft: 2 },
        addFlags: ["ch3_workflow_reformed", "ch3_rest_explained"]
      }, { tone: "steady", subtext: "短期の数字を捨て、工程を直す" }),
      choice("ch3_01_fatigue_push", "今は勢いを止めず、一人で完成させる", [
        "夜明け前に公開された動画は急上昇へ入り、数字だけを見れば判断は正しかった。ヒカキンは机で一時間眠り、そのまま次の現場へ向かった。",
        "『無理をすれば間に合う』という成功体験が、危険な癖として残った。"
      ], {
        stats: { subscribers: 420_000, money: 380_000, production: 3, energy: -24 },
        hidden: { fatigue: 18, perfectionism: 4, ambition: 4 },
        routes: { craft: 4, controversy: 1 },
        addFlags: ["ch3_production_solo", "ch3_overwork_normalized"]
      }, { tone: "risky", subtext: "今週は勝てるが、限界を先送りする" })
    ],
    when: when({ minHidden: { fatigue: 35 } }),
    priority: 30,
    tags: ["production", "fatigue"],
    visual: {
      background: "bg/ch3_edit_room_dawn",
      portrait: "portrait/hikakin",
      expression: "exhausted",
      eventCg: "cg/ch3_export_at_four",
      accent: "red"
    }
  }),
  ch3({
    id: "ch3_01_business_offer",
    slot: 1,
    title: "百人で作る『ヒカキン』",
    date: "2013年 夏",
    location: "制作会社 会議室",
    body: [
      "制作会社が示した組織図には、企画、撮影、編集、営業、広報まで名前が並んでいた。担当者は『あなたは出演に集中してください』と自信たっぷりに言う。",
      "毎週安定した大作を出せる提案だ。しかし台本のサンプルには、ヒカキンなら言わない大げさな言葉がすでに書かれていた。"
    ],
    choices: [
      choice("ch3_01_business_contract", "条件を受け入れ、制作会社へ任せる", [
        "公開本数と映像の規模は一気に増えた。企業案件も途切れず、チャンネルは数字の面で過去最高の安定を得る。",
        "その一方、撮影で初めて読む台詞が増え、ヒカキン自身も完成動画を公開日に見ることがあった。"
      ], {
        stats: { subscribers: 620_000, money: 2_400_000, expression: 2, energy: 12 },
        hidden: { origin: -10, fatigue: -3, ambition: 5 },
        routes: { mainstream: 6, stability: 6 },
        relationships: { manager: 8 },
        addFlags: ["ch3_corporate_team", "ch3_corporate_dependency"]
      }, { tone: "bold", subtext: "規模と安定を得るが、主導権を渡す" }),
      choice("ch3_01_business_negotiate", "最終決定権を条件に交渉する", [
        "台本、サムネイル、公開判断の最終承認を契約へ書き加えた。会社側は難色を示したが、ヒカキンの数字を失うわけにはいかず譲歩する。",
        "管理の仕事は増えたものの、規模と本人らしさを同じ机に載せる基盤ができた。"
      ], {
        stats: { subscribers: 450_000, money: 1_050_000, production: 5, energy: 4, trust: 3 },
        hidden: { origin: 2, fatigue: 3, ambition: 4 },
        routes: { strategy: 5, mainstream: 3 },
        relationships: { manager: 5 },
        addFlags: ["ch3_managed_team", "ch3_final_cut_kept"]
      }, { tone: "steady", subtext: "拡大しながら決定権を守る" }),
      choice("ch3_01_business_decline", "契約を断り、小さなチームを自分で作る", [
        "紹介された人材ではなく、過去動画を本当に見ている数人へ声をかけた。給与も設備も大企業には及ばないが、企画会議で誰も『ヒカキンらしく』という曖昧な言葉を使わなかった。",
        "成長は緩やかになったが、自分たちで失敗できるチームが生まれた。"
      ], {
        stats: { subscribers: 300_000, money: -800_000, production: 6, trust: 5 },
        hidden: { origin: 5, fatigue: 4 },
        routes: { network: 5, craft: 3 },
        relationships: { manager: 7 },
        addFlags: ["ch3_small_team", "ch3_staff_fair_start"]
      }, { tone: "warm", subtext: "速度より文化を選ぶ" })
    ],
    when: when({ minRoutes: { strategy: 10 } }),
    priority: 25,
    tags: ["production", "business"],
    visual: {
      background: "bg/ch3_corporate_meeting",
      portrait: "portrait/hikakin",
      expression: "guarded",
      eventCg: "cg/ch3_org_chart",
      accent: "gold"
    }
  }),
  ch3({
    id: "ch3_01_hands_not_enough",
    slot: 1,
    title: "手が二本では足りない",
    date: "2013年 夏",
    location: "撮影部屋",
    body: [
      "企画メモは増えたのに、公開できる動画の数は変わらない。撮影中にメールが鳴り、編集を始めれば次の打ち合わせ時刻が迫る。",
      "一人で始めたことは誇りだが、一人で続けることまで美徳とは限らない。ヒカキンは初めて、自分以外の手を制作へ入れるか考えた。"
    ],
    choices: [
      choice("ch3_01_hands_editor", "編集者を一人だけ採用する", [
        "最初は字幕の位置一つまで直したが、互いの意図を言葉にするうち、ヒカキン自身の制作理論も明確になった。",
        "投稿は安定し、編集者にも無理のない締切を設定できた。"
      ], {
        stats: { money: -900_000, production: 5, energy: 10, subscribers: 280_000 },
        hidden: { fatigue: -7, perfectionism: -2 },
        routes: { network: 4, stability: 3 },
        relationships: { manager: 8 },
        addFlags: ["ch3_hired_editor", "ch3_staff_fair_start"]
      }, { tone: "warm", subtext: "最小のチームから始める" }),
      choice("ch3_01_hands_outsource", "動画ごとに専門家へ外注する", [
        "料理には料理撮影、音楽には録音技師と、必要な技術だけを借りた。企画ごとの完成度は跳ね上がったが、予算管理と意思疎通が新しい仕事になった。",
        "ヒカキンは人の強みを配置する面白さを覚えた。"
      ], {
        stats: { money: -1_300_000, production: 7, subscribers: 360_000, trust: 2 },
        hidden: { fatigue: 1, ambition: 3 },
        routes: { strategy: 4, network: 3 },
        relationships: { manager: 4 },
        addFlags: ["ch3_specialist_network", "mastermind_seed"]
      }, { tone: "bold", subtext: "企画ごとに最適な人を組む" }),
      choice("ch3_01_hands_solo", "まだ一人でやれると決める", [
        "公開本数を減らし、一本ごとの密度を上げた。制作の隅々まで自分の判断が通り、古参視聴者からは以前の空気が戻ったと喜ばれる。",
        "ただし、休みは予定表から静かに消えた。"
      ], {
        stats: { production: 5, beatbox: 2, energy: -14, trust: 3, subscribers: 170_000 },
        hidden: { origin: 5, fatigue: 12, perfectionism: 4 },
        routes: { craft: 6 },
        addFlags: ["ch3_production_solo"]
      }, { tone: "steady", subtext: "個性は濃く、負担も重くなる" })
    ],
    priority: 0,
    tags: ["production", "fallback"],
    visual: {
      background: "bg/ch3_studio_cluttered",
      portrait: "portrait/hikakin",
      expression: "overwhelmed",
      accent: "blue"
    }
  }),

  // ── slot 2: はじめ課長の急成長 ───────────────────────
  ch3({
    id: "ch3_02_hajime_close_friend",
    slot: 2,
    title: "親分の企画ノート",
    date: "2014年 冬",
    location: "ファミリーレストラン",
    body: [
      "はじめ課長は使い込まれたノートをテーブルへ置いた。巨大化、百個比較、深夜の検証。まだ粗いが、どれも本人が本気で確かめたがっている企画だった。",
      "『親分なら、どれを捨てます？』。慕う声の奥に、いつか追い越したい熱がある。ヒカキンは教えたことが、そのまま未来のライバルを強くすると分かっていた。"
    ],
    speaker: "はじめ課長",
    quote: "親分に教わって、いつか親分よりでかい動画を撮りたいんです。",
    choices: [
      choice("ch3_02_hajime_teach", "失敗も含めて企画の考え方を教える", [
        "再生数ではなく『見終えた人が何を話すか』から逆算する方法を伝えた。はじめ課長はノートを埋め尽くし、その翌月に代表作を当てる。",
        "強い競争相手を自分で育てたが、二人の間には隠し事のない信頼が残った。"
      ], {
        stats: { production: 5, trust: 4, subscribers: 260_000 },
        hidden: { ambition: 5, origin: 2 },
        routes: { network: 6 },
        relationships: { hajime: 14 },
        addFlags: ["ch3_hajime_taught", "hajime_fair_rival_seed"]
      }, { tone: "warm", subtext: "友情もライバルも同時に育てる" }),
      choice("ch3_02_hajime_one_hint", "一つだけヒントを渡し、自分で考えさせる", [
        "『一番お金のかかる案ではなく、一番君が確かめたい案を選べ』とだけ答えた。はじめ課長は迷った末、自分の言葉で一本を完成させる。",
        "依存させずに背中を押したことで、対等な距離ができた。"
      ], {
        stats: { production: 3, subscribers: 220_000, trust: 3 },
        hidden: { ambition: 4 },
        routes: { strategy: 3, network: 3 },
        relationships: { hajime: 10 },
        addFlags: ["ch3_hajime_coached", "hajime_fair_rival_seed"]
      }, { tone: "steady", subtext: "答えではなく判断軸を渡す" }),
      choice("ch3_02_hajime_hold_back", "自分の未公開案に近い企画は伏せる", [
        "似ていた二案だけは曖昧に流した。数週間後、ヒカキンが先にその企画を公開し、大きな再生数を得る。",
        "はじめ課長は笑って『さすが親分』と言ったが、ノートを閉じる音だけが少し強かった。"
      ], {
        stats: { subscribers: 430_000, money: 520_000, trust: -3 },
        hidden: { ambition: 6, controversy: 2 },
        routes: { strategy: 4, controversy: 2 },
        relationships: { hajime: -8 },
        addFlags: ["ch3_hajime_idea_withheld", "hajime_rival_wound"]
      }, { tone: "risky", subtext: "先行利益を取るが、友情に傷を残す" })
    ],
    when: when({ minRelationships: { hajime: 12 } }),
    priority: 30,
    tags: ["hajime", "rivalry", "friendship"],
    visual: {
      background: "bg/ch3_family_restaurant",
      portrait: "portrait/hajime",
      expression: "eager",
      eventCg: "cg/ch3_hajime_notebook",
      accent: "gold"
    }
  }),
  ch3({
    id: "ch3_02_hajime_competitor",
    slot: 2,
    title: "一晩で抜かれた記録",
    date: "2014年 冬",
    location: "撮影部屋",
    body: [
      "ヒカキンが一週間かけた検証動画の再生記録を、はじめ課長の巨大実験が一晩で抜いた。画面越しの彼は、いつも通り『親分のおかげです』と笑っている。",
      "祝う気持ちと、置いていかれたくない気持ちは同時に存在した。次の公開枠には、はじめ課長と似た企画がすでに準備されている。"
    ],
    choices: [
      choice("ch3_02_hajime_congratulate", "直接祝い、次は負けないと伝える", [
        "電話口で悔しさまで正直に話すと、はじめ課長は一瞬黙り、『それでこそ親分です』と答えた。",
        "二人は数字を隠さず競い合う約束をし、ライバル関係そのものが視聴者に愛され始めた。"
      ], {
        stats: { expression: 3, trust: 5, subscribers: 230_000 },
        hidden: { ambition: 6 },
        routes: { mainstream: 3, network: 4 },
        relationships: { hajime: 12 },
        addFlags: ["hajime_fair_rival_seed", "ch3_public_rivalry"]
      }, { tone: "warm", subtext: "悔しさを友情の燃料にする" }),
      choice("ch3_02_hajime_counter", "似た企画を先に公開して対抗する", [
        "編集を急ぎ、翌日に対抗動画を出した。二本が並んだことで注目は集まったが、どちらが真似をしたのかという議論も起きる。",
        "数字では勝ったものの、はじめ課長からの連絡はしばらく途絶えた。"
      ], {
        stats: { subscribers: 520_000, money: 620_000, energy: -12, trust: -4 },
        hidden: { controversy: 5, ambition: 7, fatigue: 5 },
        routes: { controversy: 3, strategy: 3 },
        relationships: { hajime: -10 },
        addFlags: ["ch3_hajime_rushed_counter", "hajime_rival_wound"]
      }, { tone: "risky", subtext: "今の記録を取りに行く" }),
      choice("ch3_02_hajime_different", "似た企画を捨て、自分だけの一本へ戻る", [
        "公開予定を取り下げ、ビートボックスと商品紹介を組み合わせた別企画を作り直した。初速は負けたが、長く見られる一本になる。",
        "はじめ課長との勝負を、同じ競技である必要はないと理解した。"
      ], {
        stats: { subscribers: 300_000, production: 4, beatbox: 3, trust: 3 },
        hidden: { origin: 5, ambition: 3 },
        routes: { craft: 4, mainstream: 2 },
        relationships: { hajime: 4 },
        addFlags: ["ch3_distinct_from_hajime"]
      }, { tone: "steady", subtext: "比較されても自分の型を選ぶ" })
    ],
    when: when({ maxRelationships: { hajime: 11 } }),
    priority: 25,
    tags: ["hajime", "rivalry"],
    visual: {
      background: "bg/ch3_studio_night",
      portrait: "portrait/hikakin",
      expression: "frustrated",
      eventCg: "cg/ch3_view_counter_rivalry",
      accent: "red"
    }
  }),
  ch3({
    id: "ch3_02_hajime_growth",
    slot: 2,
    title: "『親分』の後ろから",
    date: "2014年 冬",
    location: "大型撮影スタジオ",
    body: [
      "後発だったはじめ課長の撮影には、もう大勢のスタッフが動いていた。百個の道具を本気で試し、失敗すれば本人が一番大きく笑う。その映像には、真似ではない勢いがある。",
      "撮影後、彼は昔と同じ調子でヒカキンを『親分』と呼び、次の企画について相談してきた。教えれば彼はもっと強くなる。断れば、二人の距離は守れるかもしれない。"
    ],
    choices: [
      choice("ch3_02_hajime_share", "自分の失敗談まで全部話す", [
        "機材事故、赤字企画、公開を後悔した動画まで隠さず話した。はじめ課長は成功例より失敗例を熱心に書き留める。",
        "後に彼は同じ落とし穴を避け、さらに速く成長する。ヒカキンには、真正面から競える親友ができた。"
      ], {
        stats: { trust: 5, production: 3, subscribers: 190_000 },
        hidden: { origin: 3, ambition: 4 },
        routes: { network: 6 },
        relationships: { hajime: 13 },
        addFlags: ["ch3_hajime_taught", "hajime_fair_rival_seed"]
      }, { tone: "warm", subtext: "未来の強敵を信頼で育てる" }),
      choice("ch3_02_hajime_collab", "教える代わりに直接対決動画を提案する", [
        "二人が同じ条件で巨大商品を使い切る対決は大当たりした。勝敗より、互いの違いが見える構成が話題になる。",
        "『親分対課長』は恒例企画となり、友情と競争を同時に見せる舞台ができた。"
      ], {
        stats: { subscribers: 470_000, money: 520_000, expression: 4, trust: 3 },
        hidden: { ambition: 6, fatigue: 4 },
        routes: { mainstream: 4, network: 4 },
        relationships: { hajime: 10 },
        addFlags: ["ch3_public_rivalry", "hajime_fair_rival_seed"]
      }, { tone: "bold", subtext: "競争そのものを面白くする" }),
      choice("ch3_02_hajime_distance", "自分で学ぶべきだと距離を置く", [
        "『もう君なら一人で考えられる』と答えた。言葉は正しかったが、はじめ課長が求めていたのは答えより会話だった。",
        "彼は自力でさらに伸びたものの、ヒカキンへ相談する回数は減った。"
      ], {
        stats: { production: 2, subscribers: 260_000 },
        hidden: { ambition: 4 },
        routes: { craft: 2, stability: 2 },
        relationships: { hajime: -3 },
        addFlags: ["ch3_hajime_independent"]
      }, { tone: "steady", subtext: "互いの独立を優先する" })
    ],
    priority: 0,
    tags: ["hajime", "fallback"],
    visual: {
      background: "bg/ch3_large_studio",
      portrait: "portrait/hajime",
      expression: "admiring",
      accent: "gold"
    }
  }),

  // ── slot 3: 企業案件と誠実さ ─────────────────────────
  ch3({
    id: "ch3_03_corporate_script",
    slot: 3,
    title: "台本にない感想",
    date: "2014年 秋",
    location: "企業タイアップ撮影",
    body: [
      "制作会社から届いた台本には、まだ開封していない商品を『今年最高』と褒める一文があった。担当者は『広告では普通です』と笑い、公開枠と高額な契約金を示す。",
      "大勢のスタッフの予定がこの日に合わせられている。ここで止めれば損失は出るが、言えば自分の言葉として残り続ける。"
    ],
    choices: [
      choice("ch3_03_script_refuse_line", "その場で台本の表現を拒否する", [
        "撮影は二時間止まった。ヒカキンは良かった点だけでなく不便だった点も話せる条件を譲らず、企業側が折れる。",
        "公開された動画は派手さを欠いたが、『この人の感想なら聞ける』という信用を得た。"
      ], {
        stats: { money: 450_000, trust: 9, expression: 4, subscribers: 190_000 },
        hidden: { origin: 5, ambition: 1 },
        routes: { mainstream: 3, craft: 2 },
        relationships: { manager: -2 },
        addFlags: ["ch3_brand_honest", "ch3_ad_disclosed"]
      }, { tone: "steady", subtext: "契約より自分の言葉を守る" }),
      choice("ch3_03_script_negotiate", "実演結果に応じて台詞を決める", [
        "カメラを止めたまま全機能を試し、使えた部分だけを台本へ戻した。担当者にも視聴者にも説明できる落とし所を作る。",
        "企業案件を断つのではなく、誠実に成立させる交渉力が身についた。"
      ], {
        stats: { money: 1_100_000, trust: 6, production: 4, subscribers: 260_000 },
        hidden: { origin: 3, fatigue: 3 },
        routes: { strategy: 5, mainstream: 3 },
        relationships: { manager: 3 },
        addFlags: ["ch3_brand_honest", "ch3_ad_disclosed", "ch3_contract_negotiator"]
      }, { tone: "warm", subtext: "広告と本音を両立させる" }),
      choice("ch3_03_script_read", "契約を優先して台本通りに読む", [
        "動画は予定通り公開され、広告として大きな成果を出した。報酬で次の大型企画も準備できる。",
        "だが、普段から見ている視聴者は声のわずかな固さに気づき、コメント欄に『本当に使った？』という疑問が残った。"
      ], {
        stats: { money: 2_800_000, subscribers: 410_000, trust: -9, energy: 4 },
        hidden: { controversy: 6, origin: -8, ambition: 5 },
        routes: { stability: 5, controversy: 3 },
        relationships: { manager: 7 },
        addFlags: ["ch3_scripted_endorsement", "ch4_ad_scandal_seed"]
      }, { tone: "risky", subtext: "資金と安定を得るが、疑惑を残す" })
    ],
    when: when({ flagsAny: ["ch3_corporate_team", "ch3_corporate_dependency"] }),
    priority: 30,
    tags: ["brand", "trust", "corporate"],
    visual: {
      background: "bg/ch3_ad_set",
      portrait: "portrait/hikakin",
      expression: "uneasy",
      eventCg: "cg/ch3_scripted_praise",
      accent: "red"
    }
  }),
  ch3({
    id: "ch3_03_low_money_offer",
    slot: 3,
    title: "断れば作れない動画",
    date: "2014年 秋",
    location: "小さな事務所",
    body: [
      "大型企画の見積書は、今の所持金を大きく上回っていた。同じ日に、食品会社から十分すぎる広告費の提案が届く。商品に問題はないが、動画の半分を宣伝へ使う条件だ。",
      "契約すれば夢だった企画を撮れる。断れば視聴者へ自然な一本を出せるが、挑戦は数か月先へ延びる。"
    ],
    choices: [
      choice("ch3_03_money_accept_clear", "広告だと明示して受ける", [
        "冒頭で提供をはっきり伝え、広告部分も普段と同じ基準で作った。再生数は予測を下回ったが、得た資金で翌月に大型企画を実現する。",
        "視聴者との約束を崩さず、広告を挑戦へ変える前例になった。"
      ], {
        stats: { money: 1_900_000, subscribers: 180_000, trust: 6, production: 3 },
        hidden: { origin: 3 },
        routes: { stability: 4, strategy: 3 },
        addFlags: ["ch3_ad_disclosed", "ch3_brand_honest", "ch3_large_project_funded"]
      }, { tone: "steady", subtext: "透明性を保って資金を得る" }),
      choice("ch3_03_money_hide", "普段の動画に見えるよう宣伝を混ぜる", [
        "広告色を隠したことで視聴維持率は高く、大型企画の予算も手に入った。表面上は誰も損をしていないように見える。",
        "しかし契約書と未公開台本は残り、後に説明を求められる火種になった。"
      ], {
        stats: { money: 2_400_000, subscribers: 370_000, trust: -7 },
        hidden: { controversy: 7, origin: -6, ambition: 4 },
        routes: { controversy: 4, strategy: 2 },
        addFlags: ["ch3_undisclosed_ad", "ch4_ad_scandal_seed", "ch3_large_project_funded"]
      }, { tone: "risky", subtext: "成果は大きいが、後から証拠が返る" }),
      choice("ch3_03_money_wait", "広告を断り、企画規模を縮める", [
        "百人で行う予定だった検証を、身近な道具だけで成立する形へ組み直した。予算の不足が制約ではなく、発想の焦点になる。",
        "大記録には届かなかったが、古参視聴者から『昔の面白さがある』と支持された。"
      ], {
        stats: { money: -350_000, subscribers: 220_000, production: 6, trust: 6 },
        hidden: { origin: 6, perfectionism: 2 },
        routes: { craft: 5 },
        addFlags: ["ch3_brand_refused", "ch3_low_budget_invention"]
      }, { tone: "warm", subtext: "制約を企画へ変える" })
    ],
    when: when({ maxStats: { money: 1_500_000 } }),
    priority: 25,
    tags: ["brand", "money"],
    visual: {
      background: "bg/ch3_small_office",
      portrait: "portrait/hikakin",
      expression: "thinking",
      eventCg: "cg/ch3_budget_and_contract",
      accent: "gold"
    }
  }),
  ch3({
    id: "ch3_03_first_major_brand",
    slot: 3,
    title: "おすすめと言う責任",
    date: "2014年 秋",
    location: "タイアップ打ち合わせ",
    body: [
      "全国で売られる商品の紹介依頼が届いた。報酬はこれまでの動画収益数か月分。担当者は自由に作ってよいと言うが、視聴者には広告と日常動画の境目が見えにくい。",
      "ヒカキンの『おすすめ』は、もう友達一人への助言ではない。何十万人もの買い物を動かす言葉になっていた。"
    ],
    choices: [
      choice("ch3_03_brand_test", "一週間使ってから受けるか決める", [
        "良い部分と不便な部分を記録し、企業へそのまま伝えた。条件を受け入れた企業とだけ撮影したため、公開本数は減った。",
        "一本ごとの説得力は増し、商品紹介が長く支持される柱になる。"
      ], {
        stats: { money: 1_000_000, production: 3, trust: 8, subscribers: 240_000 },
        hidden: { origin: 4, fatigue: 3 },
        routes: { mainstream: 4, craft: 2 },
        addFlags: ["ch3_brand_honest", "ch3_ad_disclosed"]
      }, { tone: "steady", subtext: "自分で確かめた言葉だけを使う" }),
      choice("ch3_03_brand_entertain", "広告であること自体を面白くする", [
        "提供表示を隠さず、商品説明をビートボックスと寸劇に組み込んだ。宣伝を邪魔な時間ではなく一本の企画へ変える。",
        "企業にも視聴者にも好評で、ヒカキンらしい案件形式として定着した。"
      ], {
        stats: { money: 1_500_000, subscribers: 360_000, expression: 5, production: 4, trust: 6 },
        hidden: { origin: 4, fatigue: 2 },
        routes: { mainstream: 5, craft: 2 },
        addFlags: ["ch3_ad_disclosed", "ch3_branded_entertainment"]
      }, { tone: "bold", subtext: "宣伝も作品にする" }),
      choice("ch3_03_brand_cash", "高額な条件を優先して受ける", [
        "契約金で設備は一新され、次の三本も大規模にできた。数字は伸び、仕事としては明確な成功だった。",
        "しかし使い込んでいない商品を褒めた映像に、自分で見返してもわずかな違和感が残った。"
      ], {
        stats: { money: 2_600_000, subscribers: 420_000, trust: -6, energy: 5 },
        hidden: { controversy: 5, origin: -5, ambition: 5 },
        routes: { stability: 5, controversy: 2 },
        addFlags: ["ch3_scripted_endorsement", "ch4_ad_scandal_seed"]
      }, { tone: "risky", subtext: "設備は得るが、本音が曖昧になる" })
    ],
    priority: 0,
    tags: ["brand", "fallback"],
    visual: {
      background: "bg/ch3_brand_meeting",
      portrait: "portrait/hikakin",
      expression: "serious",
      accent: "green"
    }
  }),

  // ── slot 4: ゼイキンからの提案 ───────────────────────
  ch3({
    id: "ch3_04_zeikin_close",
    slot: 4,
    title: "兄から届いた十六小節",
    date: "2015年 春",
    location: "ヒカキンの自宅",
    body: [
      "ゼイキンから『まだ途中』という件名の音源が届いた。歌と旋律は完成していないのに、ヒカキンの歩いてきた時間だけは不思議なほど聞こえる。",
      "電話をかけると、兄は照れ隠しのように『弟のビートが入れば曲になる』と言った。兄弟だから遠慮なく作れる。同時に、兄弟だからこそ傷つける言葉も深く刺さる。"
    ],
    speaker: "ゼイキン",
    quote: "お前が動画で作った場所を、今度は二人で歌にしないか。",
    choices: [
      choice("ch3_04_zeikin_equal", "対等な兄弟作品として始める", [
        "名義、収益、作詞作曲、最終判断を最初に二人で書き出した。事務的に見える確認が、制作中に本音を言える安全網になる。",
        "『YouTubeテーマミュージック』という仮題のフォルダが、二人の共有画面に作られた。"
      ], {
        stats: { production: 3, beatbox: 3, trust: 4, money: -300_000 },
        hidden: { origin: 7, ambition: 4 },
        routes: { craft: 4, network: 4 },
        relationships: { zeikin: 14 },
        addFlags: ["yt_theme_started", "yt_theme_equal_credit", "yt_theme_title_fixed"]
      }, { tone: "warm", subtext: "権利も決定も二人で分ける" }),
      choice("ch3_04_zeikin_music_lead", "音楽は兄へ全面的に任せる", [
        "ヒカキンは視聴者目線と映像に集中し、音楽面ではゼイキンの判断を尊重した。兄の旋律は妥協なく磨かれ、ヒカキンの普段の動画にはない広がりを得る。",
        "ただ、公開戦略まで任せたわけではない。その境界は後で話し合う必要が残った。"
      ], {
        stats: { beatbox: 4, production: 2, energy: -4 },
        hidden: { origin: 6, perfectionism: 3 },
        routes: { craft: 5 },
        relationships: { zeikin: 11 },
        addFlags: ["yt_theme_started", "yt_theme_zeikin_music_lead", "yt_theme_title_fixed"]
      }, { tone: "steady", subtext: "兄の音楽性を信じる" }),
      choice("ch3_04_zeikin_audience", "視聴者に届く形へ大きく直す", [
        "サビを早め、動画向けの短い掛け声を足し、誰でも口ずさめる構成を提案した。ゼイキンは何度か反論したが、最後は二つの案を録音して比べる。",
        "大衆性は増した一方、兄は『数字のためだけには変えるな』と釘を刺した。"
      ], {
        stats: { expression: 4, production: 4, beatbox: 2 },
        hidden: { ambition: 6, origin: -1 },
        routes: { mainstream: 5, strategy: 3 },
        relationships: { zeikin: 5 },
        addFlags: ["yt_theme_started", "yt_theme_pop_arrangement", "yt_theme_title_fixed"]
      }, { tone: "bold", subtext: "届く曲を狙うが、音楽性と衝突する" })
    ],
    when: when({ minRelationships: { zeikin: 25 } }),
    priority: 30,
    tags: ["zeikin", "music", "family"],
    visual: {
      background: "bg/ch3_home_evening",
      portrait: "portrait/zeikin",
      expression: "gentle",
      eventCg: "cg/ch3_demo_sixteen_bars",
      accent: "violet"
    }
  }),
  ch3({
    id: "ch3_04_zeikin_distant",
    slot: 4,
    title: "仕事のメールになった兄弟",
    date: "2015年 春",
    location: "事務所",
    body: [
      "ゼイキンから曲のデモが届いた。本文は『使えそうなら』の一行だけで、昔のような冗談も電話もない。忙しさの中で、二人の連絡はいつしか家族より仕事相手に近づいていた。",
      "曲にはヒカキンのビートが入る空白が残されている。埋めるには、制作の話より先に、話してこなかった時間を埋めなければならない。"
    ],
    choices: [
      choice("ch3_04_distant_visit", "予定を空けて兄に会いに行く", [
        "カメラもスタッフも連れず、二人で昔の音源を聞いた。どちらが売れているかではなく、なぜ音を始めたかを話した夜に、曲の核が決まる。",
        "制作は遅れたが、兄弟の作品として再出発できた。"
      ], {
        stats: { energy: 8, beatbox: 3, trust: 3, subscribers: -30_000 },
        hidden: { origin: 9, fatigue: -4 },
        routes: { network: 4, craft: 3 },
        relationships: { zeikin: 18 },
        addFlags: ["yt_theme_started", "yt_theme_reconciled", "yt_theme_title_fixed"]
      }, { tone: "warm", subtext: "公開より先に兄弟へ戻る" }),
      choice("ch3_04_distant_remote", "データだけで制作を進める", [
        "互いの予定を崩さず、ファイルを送り合って曲を形にした。技術的には整ったが、修正コメントだけが積み重なり、作品の意味を話す機会はなかった。",
        "完成は近づいたものの、名義と収益の話は曖昧なまま残る。"
      ], {
        stats: { production: 4, beatbox: 3, subscribers: 120_000 },
        hidden: { origin: -2, fatigue: 4 },
        routes: { stability: 3, strategy: 3 },
        relationships: { zeikin: 2 },
        addFlags: ["yt_theme_started", "yt_theme_remote", "yt_theme_credit_unclear", "yt_theme_title_fixed"]
      }, { tone: "steady", subtext: "効率よく進むが、火種を残す" }),
      choice("ch3_04_distant_decline", "今は通常動画を優先すると断る", [
        "『今の更新を止められない』と正直に伝えた。ゼイキンは短く了解し、デモ音源を自分のフォルダへ戻す。",
        "チャンネルは勢いを維持したが、二人にしか作れない曲の時期は遠のいた。"
      ], {
        stats: { subscribers: 340_000, money: 520_000, energy: -3 },
        hidden: { ambition: 5, origin: -6 },
        routes: { mainstream: 4, stability: 3 },
        relationships: { zeikin: -9 },
        addFlags: ["yt_theme_delayed", "zeikin_offer_declined"]
      }, { tone: "risky", subtext: "今の成長を守り、曲を先送りする" })
    ],
    when: when({ maxRelationships: { zeikin: 24 } }),
    priority: 25,
    tags: ["zeikin", "music", "family"],
    visual: {
      background: "bg/ch3_office_night",
      portrait: "portrait/hikakin",
      expression: "lonely",
      eventCg: "cg/ch3_zeikin_short_email",
      accent: "blue"
    }
  }),
  ch3({
    id: "ch3_04_zeikin_proposal",
    slot: 4,
    title: "兄弟でしか作れない音",
    date: "2015年 春",
    location: "ヒカキンの自宅",
    body: [
      "実兄のゼイキンが、歌のデモを持ってきた。歌唱力だけでなく、音の重なりや間の使い方まで、弟とは違う種類の音楽的センスがある。",
      "『お前のビートボックスを真ん中に置きたい』。その曲はYouTubeで出会った人々へ向けた、兄弟なりのテーマソングだった。"
    ],
    speaker: "ゼイキン",
    quote: "名前は仮だけどさ。『YouTubeテーマミュージック』ってどうだ？",
    choices: [
      choice("ch3_04_proposal_accept", "通常動画を減らして本気で作る", [
        "毎週の投稿を一本減らし、録音と作詞へ時間を移した。短期の再生数は落ちたが、兄弟は誰にも急かされず音を磨く。",
        "代表作になりうる楽曲の制作が始まった。"
      ], {
        stats: { subscribers: -50_000, money: -500_000, beatbox: 5, production: 4, energy: -7 },
        hidden: { origin: 8, perfectionism: 4 },
        routes: { craft: 6, network: 2 },
        relationships: { zeikin: 12 },
        addFlags: ["yt_theme_started", "yt_theme_quality_focus", "yt_theme_title_fixed"]
      }, { tone: "warm", subtext: "更新を減らし、代表曲を狙う" }),
      choice("ch3_04_proposal_schedule", "普段の投稿と並行して短期間で作る", [
        "制作日を先に固定し、二人の得意部分を分担した。完成度と勢いの折り合いをつけながら、公開可能な形まで一気に進む。",
        "休みは減ったが、流行と視聴者の熱がある時期を逃さなかった。"
      ], {
        stats: { subscribers: 220_000, money: -250_000, beatbox: 3, production: 3, energy: -13 },
        hidden: { origin: 4, fatigue: 8, ambition: 5 },
        routes: { strategy: 4, mainstream: 3 },
        relationships: { zeikin: 8 },
        addFlags: ["yt_theme_started", "yt_theme_fast_track", "yt_theme_title_fixed"]
      }, { tone: "bold", subtext: "勢いを逃さず、負担を引き受ける" }),
      choice("ch3_04_proposal_wait", "今は早いと考え、デモを保管する", [
        "『もっと多くの人に届く場所まで行ってから出したい』と伝えた。ゼイキンは納得したように見えたが、曲は時期まで含めて作品だとも答えた。",
        "チャンネル成長へ集中できる一方、曲が完成する保証はなくなった。"
      ], {
        stats: { subscribers: 300_000, money: 450_000, energy: 3 },
        hidden: { ambition: 6, origin: -3 },
        routes: { mainstream: 4, stability: 2 },
        relationships: { zeikin: -3 },
        addFlags: ["yt_theme_delayed"]
      }, { tone: "steady", subtext: "曲を将来へ預ける" })
    ],
    priority: 0,
    tags: ["zeikin", "music", "fallback"],
    visual: {
      background: "bg/ch3_home_evening",
      portrait: "portrait/zeikin",
      expression: "hopeful",
      eventCg: "cg/ch3_youtube_theme_demo",
      accent: "violet"
    }
  }),

  // ── slot 5: 楽曲制作 ─────────────────────────────────
  ch3({
    id: "ch3_05_theme_family_session",
    slot: 5,
    title: "兄弟げんかのテイク七",
    date: "2015年 夏",
    location: "録音スタジオ",
    body: [
      "ゼイキンは歌の余韻を残したい。ヒカキンは動画の冒頭から掴みたい。テイク七で二人の意見は真っ向からぶつかり、エンジニアが静かに席を外した。",
      "相手の案を潰せば作業は進む。しかし、この曲が兄弟で作る意味まで薄くなる。二人とも譲らないまま、録音ランプだけが赤く灯っている。"
    ],
    choices: [
      choice("ch3_05_theme_two_versions", "両方を録り、翌日に聞き比べる", [
        "その場で勝敗を決めず、二つの完成形を持ち帰った。翌朝、二人とも相手案の良さを認め、歌の余韻からビートへ滑り込む第三案にたどり着く。",
        "衝突を消さず、作品の材料へ変えたことで曲の完成度が跳ね上がった。"
      ], {
        stats: { production: 6, beatbox: 5, energy: -7, money: -450_000 },
        hidden: { perfectionism: 4, origin: 7, fatigue: 3 },
        routes: { craft: 6, strategy: 2 },
        relationships: { zeikin: 10 },
        addFlags: ["yt_theme_quality_high", "yt_theme_conflict_resolved"]
      }, { tone: "steady", subtext: "対立から第三の音を作る" }),
      choice("ch3_05_theme_zeikin_choice", "今回は兄の音楽判断を通す", [
        "ヒカキンは映像演出へ回り、歌が呼吸できる長さを守った。公開向けとしてはゆっくりだが、ゼイキンの歌唱が最も映える録音になる。",
        "兄は譲られたのではなく信じられたと感じ、最後のサビへ新しい旋律を加えた。"
      ], {
        stats: { beatbox: 3, production: 3, trust: 3, money: -320_000 },
        hidden: { origin: 6 },
        routes: { craft: 4, network: 3 },
        relationships: { zeikin: 13 },
        addFlags: ["yt_theme_quality_high", "yt_theme_zeikin_music_lead"]
      }, { tone: "warm", subtext: "兄の得意分野を信頼する" }),
      choice("ch3_05_theme_hikakin_choice", "視聴者データを根拠に短く直す", [
        "離脱率のグラフを示し、冒頭を半分に削った。曲は一度で覚えやすくなり、短い映像にも使いやすい構造になる。",
        "ゼイキンは結果を認めたが、『次は曲を数字に合わせる前に話せ』と不満を残した。"
      ], {
        stats: { expression: 5, production: 4, subscribers: 130_000 },
        hidden: { ambition: 5, origin: -2 },
        routes: { strategy: 5, mainstream: 3 },
        relationships: { zeikin: -4 },
        addFlags: ["yt_theme_pop_arrangement", "yt_theme_conflict_unresolved"]
      }, { tone: "bold", subtext: "届きやすさを取るが、兄弟に棘を残す" })
    ],
    when: when({ flagsAll: ["yt_theme_started"], minRelationships: { zeikin: 20 } }),
    priority: 35,
    tags: ["zeikin", "music", "production"],
    visual: {
      background: "bg/ch3_recording_studio",
      portrait: "portrait/zeikin",
      expression: "frustrated",
      eventCg: "cg/ch3_brothers_take_seven",
      accent: "violet"
    }
  }),
  ch3({
    id: "ch3_05_theme_credit_crack",
    slot: 5,
    title: "誰の名前を先に置くか",
    date: "2015年 夏",
    location: "事務所 会議室",
    body: [
      "完成間近の曲を前に、担当者が『ヒカキン名義の方が伸びます』と提案した。ゼイキンの作詞作曲と歌唱は説明欄へ記載し、サムネイルには弟だけを出す案だ。",
      "数字の理屈は正しい。だが、兄が作った旋律を弟の知名度だけで売れば、公開後に消せない傷が残る。"
    ],
    choices: [
      choice("ch3_05_credit_equal", "兄弟の共同名義を契約へ明記する", [
        "公開規模が下がる可能性を受け入れ、画面にも権利表記にも二人の名を同じ大きさで置いた。",
        "ゼイキンは何も大げさに言わず、帰り際に『これなら最後まで歌える』とだけ答えた。"
      ], {
        stats: { trust: 7, subscribers: 80_000, production: 3 },
        hidden: { origin: 7, ambition: -1 },
        routes: { network: 5, craft: 3 },
        relationships: { zeikin: 18 },
        addFlags: ["yt_theme_equal_credit", "yt_theme_credit_resolved"]
      }, { tone: "warm", subtext: "数字より共同制作者の権利を守る" }),
      choice("ch3_05_credit_feature", "ヒカキン名義＋ゼイキン参加で公開する", [
        "検索上はヒカキンを先に置きつつ、冒頭映像と説明欄でゼイキンの役割を明確にした。完全な対等ではないが、本人同士で収益配分まで合意する。",
        "現実的な折衷案で公開へ進んだ。"
      ], {
        stats: { subscribers: 180_000, trust: 3, production: 3 },
        hidden: { ambition: 3 },
        routes: { strategy: 5 },
        relationships: { zeikin: 6 },
        addFlags: ["yt_theme_feature_credit", "yt_theme_credit_resolved"]
      }, { tone: "steady", subtext: "届きやすさと権利を調整する" }),
      choice("ch3_05_credit_hikakin", "成長を優先し、ヒカキン単独名義にする", [
        "担当者の提案通りに進めると、宣伝枠は最大まで広がった。ゼイキンは録音を終えたが、公開告知を自分の言葉では行わなかった。",
        "曲の数字が増えるほど、『誰の作品か』という問いが兄弟の間へ残った。"
      ], {
        stats: { subscribers: 420_000, money: 900_000, trust: -5 },
        hidden: { origin: -9, controversy: 5, ambition: 7 },
        routes: { mainstream: 5, controversy: 3 },
        relationships: { zeikin: -18 },
        addFlags: ["yt_theme_hikakin_only_credit", "yt_theme_credit_conflict", "ch4_music_rights_seed"]
      }, { tone: "risky", subtext: "最大露出と引き換えに兄弟の権利問題を残す" })
    ],
    when: when({ flagsAny: ["yt_theme_credit_unclear", "yt_theme_remote"] }),
    priority: 30,
    tags: ["zeikin", "music", "credit"],
    visual: {
      background: "bg/ch3_office_meeting",
      portrait: "portrait/hikakin",
      expression: "conflicted",
      eventCg: "cg/ch3_credit_order_contract",
      accent: "red"
    }
  }),
  ch3({
    id: "ch3_05_music_or_uploads",
    slot: 5,
    title: "曲に使う一週間",
    date: "2015年 夏",
    location: "撮影部屋",
    body: [
      "『YouTubeテーマミュージック』はまだサビの手前で止まっている。同じ一週間を使えば、普段の動画を二本公開できる。",
      "視聴者は曲の存在を知らない。作らなくても失望する人はいないからこそ、目の前の数字と見えない代表作のどちらを選ぶかが問われた。"
    ],
    choices: [
      choice("ch3_05_music_week", "一週間を丸ごと曲へ使う", [
        "通常動画を休み、ゼイキンと朝から夜まで録音した。一本分の再生機会は失ったが、ビートと歌が初めて最後までつながる。",
        "誰にも見えていなかった曲が、公開できる作品になった。"
      ], {
        stats: { subscribers: -70_000, money: -400_000, beatbox: 6, production: 5, energy: -9 },
        hidden: { origin: 8, perfectionism: 4 },
        routes: { craft: 7 },
        relationships: { zeikin: 10 },
        addFlags: ["yt_theme_started", "yt_theme_quality_high", "yt_theme_ready"]
      }, { tone: "steady", subtext: "見えない作品へ時間を賭ける" }),
      choice("ch3_05_music_split", "午前は動画、夜は曲を作る", [
        "更新を止めずに制作を進めたが、録音の後半では声にも判断にも疲れが出た。それでも公開時期には間に合う形へ整う。",
        "速度は得た。完成度と身体には小さな借金が残った。"
      ], {
        stats: { subscribers: 250_000, beatbox: 3, production: 3, energy: -18 },
        hidden: { fatigue: 12, ambition: 5, origin: 3 },
        routes: { mainstream: 4, strategy: 3 },
        relationships: { zeikin: 5 },
        addFlags: ["yt_theme_started", "yt_theme_fast_track", "yt_theme_ready"]
      }, { tone: "bold", subtext: "両方進むが、疲労を背負う" }),
      choice("ch3_05_music_shelve", "通常投稿へ戻り、曲を保留する", [
        "今伸びている動画を優先し、曲のフォルダを閉じた。チャンネルは順調に成長する一方、ゼイキンのデモは更新されなくなる。",
        "後で再開できるはずという言葉だけが残った。"
      ], {
        stats: { subscribers: 390_000, money: 600_000, energy: 3 },
        hidden: { ambition: 6, origin: -5 },
        routes: { mainstream: 5, stability: 3 },
        relationships: { zeikin: -7 },
        addFlags: ["yt_theme_delayed", "yt_theme_not_ready"]
      }, { tone: "risky", subtext: "今の成長を守り、代表曲を遠ざける" })
    ],
    priority: 0,
    tags: ["music", "fallback"],
    visual: {
      background: "bg/ch3_studio_split_screen",
      portrait: "portrait/hikakin",
      expression: "thinking",
      eventCg: "cg/ch3_music_or_uploads",
      accent: "violet"
    }
  }),

  // ── slot 6: YouTubeテーマミュージック公開 ────────────
  ch3({
    id: "ch3_06_theme_hundred_million",
    slot: 6,
    title: "一億回目の再生",
    date: "2015年 秋",
    location: "兄弟の録音スタジオ",
    body: [
      "『YouTubeテーマミュージック』は公開直後から、普段の動画とは違う速度で国境を越えた。視聴者が歌い、投稿者が映像を作り、ヒカキンのビートとゼイキンの声が無数の動画へ受け継がれていく。",
      "やがて再生数は一億回へ届く。ヒカキンは数字より先に、隣で同じ画面を見ている兄の顔を確かめた。この記録が誰か一人のものになれば、曲の意味が変わってしまう。"
    ],
    speaker: "ゼイキン",
    quote: "一億回だってさ。最初の一回は、あの部屋で二人で聞いたのにな。",
    choices: [
      choice("ch3_06_hundred_share", "兄と視聴者へ感謝する記念動画を出す", [
        "制作途中の衝突や失敗音源まで二人で振り返り、この記録が共同作品と二人を広めた視聴者のものだと伝えた。",
        "祝福は新しい競争ではなく、兄弟の原点を共有する場になった。"
      ], {
        stats: { subscribers: 1_500_000, money: 3_500_000, trust: 10, expression: 5 },
        hidden: { origin: 10, ambition: 5, fatigue: -3 },
        routes: { mainstream: 7, network: 5, craft: 3 },
        relationships: { zeikin: 18 },
        addFlags: ["yt_theme_viral_100m", "yt_theme_shared_glory", "ch3_signature_work"],
        video: { title: "YouTubeテーマミュージック", views: 100_000_000, subscribersGained: 1_500_000, kind: "音楽", chapter: 3 }
      }, { tone: "warm", subtext: "一億回を共同作品として刻む" }),
      choice("ch3_06_hundred_next", "熱があるうちに次の兄弟曲を発表する", [
        "翌週には新曲制作を告知し、音楽への期待をチャンネル成長へつなげた。勢いは続いたが、ゼイキンは一作目の余韻を味わう間もなく次の締切へ入る。",
        "大きな成功を止まらない仕事に変える選択だった。"
      ], {
        stats: { subscribers: 1_850_000, money: 4_200_000, beatbox: 4, energy: -15 },
        hidden: { ambition: 9, fatigue: 12, origin: -2 },
        routes: { mainstream: 8, strategy: 4 },
        relationships: { zeikin: 5 },
        addFlags: ["yt_theme_viral_100m", "yt_theme_followup_rushed", "ch3_signature_work"],
        video: { title: "YouTubeテーマミュージック", views: 100_000_000, subscribersGained: 1_850_000, kind: "音楽", chapter: 3 }
      }, { tone: "bold", subtext: "記録を次の成長へ変える" }),
      choice("ch3_06_hundred_silent", "二人だけで静かに祝い、通常動画へ戻る", [
        "派手な生配信をせず、昔使っていたマイクの前で一曲だけ録った。その映像は公開せず、兄弟の記憶として残す。",
        "翌日からヒカキンは商品紹介へ戻ったが、どの動画にも一億回を作った自信が宿った。"
      ], {
        stats: { subscribers: 1_250_000, money: 3_000_000, beatbox: 6, trust: 6, energy: 7 },
        hidden: { origin: 12, ambition: 3, fatigue: -6 },
        routes: { craft: 7, mainstream: 3 },
        relationships: { zeikin: 14 },
        addFlags: ["yt_theme_viral_100m", "yt_theme_private_celebration", "ch3_signature_work"],
        video: { title: "YouTubeテーマミュージック", views: 100_000_000, subscribersGained: 1_250_000, kind: "音楽", chapter: 3 }
      }, { tone: "steady", subtext: "記録を騒がず、自信として持つ" })
    ],
    when: when({
      flagsAll: ["yt_theme_started", "yt_theme_quality_high"],
      flagsNone: ["yt_theme_credit_conflict"],
      minRelationships: { zeikin: 22 },
      minStats: { production: 24, beatbox: 42 }
    }),
    mandatory: true,
    priority: 50,
    tags: ["zeikin", "music", "anchor", "success"],
    visual: {
      background: "bg/ch3_recording_studio_night",
      portrait: "portrait/hikakin_zeikin",
      expression: "tearful_smile",
      eventCg: "cg/ch3_theme_100m",
      video: "video/ch3_theme_counter",
      accent: "gold"
    }
  }),
  ch3({
    id: "ch3_06_theme_troubled_release",
    slot: 6,
    title: "伸びる曲、ほどける兄弟",
    date: "2015年 秋",
    location: "事務所",
    body: [
      "『YouTubeテーマミュージック』は公開初日から大きく伸びた。ところがコメント欄には、ゼイキンの役割が分からないという声と、弟の人気だけで売れたという議論が並ぶ。",
      "担当者は『数字は成功です』と言う。ヒカキンがいま修正すれば、宣伝計画に影響する。それでも、後から説明するほど兄の傷は深くなる。"
    ],
    choices: [
      choice("ch3_06_troubled_correct", "公開中の映像と権利表記をすぐ直す", [
        "急上昇中の動画を一度止め、共同名義と制作内訳を画面に追加した。再生の勢いは落ちたが、ヒカキンは自分の判断だったと説明する。",
        "ゼイキンはすぐには笑わなかったものの、二人で話し直す席には戻ってきた。"
      ], {
        stats: { subscribers: 520_000, money: 1_200_000, trust: 8 },
        hidden: { origin: 7, controversy: -4, ambition: -2 },
        routes: { network: 5, craft: 3 },
        relationships: { zeikin: 14 },
        addFlags: ["yt_theme_credit_repaired", "yt_theme_released_mid"],
        removeFlags: ["yt_theme_credit_conflict", "ch4_music_rights_seed"],
        video: { title: "YouTubeテーマミュージック（共同名義版）", views: 35_000_000, subscribersGained: 520_000, kind: "音楽", chapter: 3 }
      }, { tone: "warm", subtext: "勢いを落としてでも権利を直す" }),
      choice("ch3_06_troubled_explain_later", "記録達成後に説明動画を出す", [
        "宣伝期間を終えてから、二人で制作経緯を語った。動画自体は数千万回へ伸びたが、『問題になったから直した』という印象は消えない。",
        "数字と兄弟関係の両方を部分的に守る、遅い決着になった。"
      ], {
        stats: { subscribers: 850_000, money: 2_400_000, trust: 1 },
        hidden: { controversy: 2, origin: -2, ambition: 4 },
        routes: { strategy: 5, mainstream: 4 },
        relationships: { zeikin: 2 },
        addFlags: ["yt_theme_released_big", "yt_theme_late_explanation", "ch4_music_rights_seed"],
        video: { title: "YouTubeテーマミュージック", views: 60_000_000, subscribersGained: 850_000, kind: "音楽", chapter: 3 }
      }, { tone: "steady", subtext: "数字を保つが、説明は遅れる" }),
      choice("ch3_06_troubled_ignore", "成功した数字を理由に問題を無視する", [
        "曲はさらに伸び、ヒカキンの代表作としてだけ紹介され続けた。企業もニュースも、最も大きな名前を見出しに使う。",
        "ゼイキンは次の録音を断り、権利について第三者を通して連絡してきた。"
      ], {
        stats: { subscribers: 1_200_000, money: 3_100_000, trust: -12 },
        hidden: { controversy: 10, origin: -12, ambition: 8 },
        routes: { controversy: 6, mainstream: 5 },
        relationships: { zeikin: -24 },
        addFlags: ["yt_theme_released_big", "yt_theme_credit_conflict", "ch4_music_rights_seed"],
        video: { title: "YouTubeテーマミュージック", views: 85_000_000, subscribersGained: 1_200_000, kind: "音楽", chapter: 3 }
      }, { tone: "risky", subtext: "代表作は得るが、兄弟の決裂を招く" })
    ],
    when: when({ flagsAny: ["yt_theme_credit_conflict", "yt_theme_hikakin_only_credit"] }),
    mandatory: true,
    priority: 45,
    tags: ["zeikin", "music", "anchor", "conflict"],
    visual: {
      background: "bg/ch3_office_night",
      portrait: "portrait/hikakin",
      expression: "distressed",
      eventCg: "cg/ch3_theme_credit_comments",
      accent: "red"
    }
  }),
  ch3({
    id: "ch3_06_big_release_window",
    slot: 6,
    title: "代表作を出す窓",
    date: "2015年 秋",
    location: "公開前の編集室",
    body: [
      "音楽、ゲーム、大型検証。これまで温めてきた企画のうち、年内に大きく宣伝できるのは一本だけだった。スタッフは最も予測再生数の高い案を推す。",
      "ヒカキンには、数字では測れないまま残してきた兄弟曲もある。いま何を代表作として世に出すかで、次の数年のイメージまで決まる。"
    ],
    choices: [
      choice("ch3_06_window_theme", "ゼイキンとの曲を完成させて公開する", [
        "遅れていた録音を再開し、兄弟で権利と役割を確認してから公開した。完璧な条件ではないが、歌とビートが大勢へ届く。",
        "再生は数千万回へ伸び、次の挑戦につながる大きな代表作になった。"
      ], {
        stats: { subscribers: 760_000, money: 1_800_000, beatbox: 5, trust: 6 },
        hidden: { origin: 8, fatigue: 6 },
        routes: { craft: 5, mainstream: 5, network: 2 },
        relationships: { zeikin: 12 },
        addFlags: ["yt_theme_started", "yt_theme_released_mid", "yt_theme_equal_credit", "ch3_signature_work"],
        video: { title: "YouTubeテーマミュージック", views: 42_000_000, subscribersGained: 760_000, kind: "音楽", chapter: 3 }
      }, { tone: "warm", subtext: "一億には届かなくても兄弟の代表曲を作る" }),
      choice("ch3_06_window_spectacle", "最も大規模な検証動画を選ぶ", [
        "予算とスタッフを集中し、チャンネル史上最大の画面を作った。初週の再生記録を更新し、企業からの問い合わせも増える。",
        "ヒカキンは総合YouTuberとして強くなったが、兄弟曲のデモは再びフォルダの奥へ移った。"
      ], {
        stats: { subscribers: 880_000, money: 2_300_000, production: 5, expression: 4 },
        hidden: { ambition: 8, origin: -4, fatigue: 7 },
        routes: { mainstream: 7, strategy: 4 },
        relationships: { zeikin: -5 },
        addFlags: ["ch3_spectacle_hit", "yt_theme_delayed"],
        video: { title: "個人動画史上最大の大検証", views: 31_000_000, subscribersGained: 880_000, kind: "大型検証", chapter: 3 }
      }, { tone: "bold", subtext: "今の最大記録を取りに行く" }),
      choice("ch3_06_window_personal", "一人で原点を撮り直す", [
        "豪華な案を外し、古いマイクとビートボックスだけで一本を作った。急上昇一位にはならなかったが、長年見てきた視聴者の言葉がコメント欄を埋める。",
        "規模が増えても一人で画面を成立させられることを、自分自身へ証明した。"
      ], {
        stats: { subscribers: 390_000, beatbox: 7, production: 4, trust: 7 },
        hidden: { origin: 12, fatigue: -2 },
        routes: { craft: 8 },
        addFlags: ["ch3_origin_masterpiece_seed", "legendary_video_seed"],
        video: { title: "いま、もう一度ビートボックス", views: 9_800_000, subscribersGained: 390_000, kind: "ビートボックス", chapter: 3 }
      }, { tone: "steady", subtext: "記録より、失っていないものを映す" })
    ],
    mandatory: true,
    priority: 0,
    tags: ["release", "anchor", "fallback"],
    visual: {
      background: "bg/ch3_edit_room_release",
      portrait: "portrait/hikakin",
      expression: "determined",
      eventCg: "cg/ch3_three_projects",
      accent: "gold"
    }
  }),

  // ── slot 7: 東大オンエアとテツ ───────────────────────
  ch3({
    id: "ch3_07_tets_network_visit",
    slot: 7,
    title: "六人の雑音を一つの企画に",
    date: "2016年 春",
    location: "東大オンエアの地元",
    body: [
      "東大オンエアの撮影現場では、六人が同時に別の案を叫んでいた。まとまりがないように見えて、リーダーのテツだけは全員の得意と嫌がることを正確に覚えている。",
      "都会のスタジオへ移れば効率は上がる。だが彼らの面白さは、友人と地元の距離感から生まれている。テツはヒカキンに、全国へ出る方法を尋ねた。"
    ],
    speaker: "テツ",
    quote: "六人を東京へ運ぶんじゃなくて、ここを全国に見せる方法ってありますか。",
    choices: [
      choice("ch3_07_tets_local_story", "地元そのものを主役にする企画を提案する", [
        "商店街、川、古い遊園地を六人の役割に合わせてつないだ。地元の人にも撮影前に説明し、出演するかを一軒ずつ確認する。",
        "動画は観光案内ではなく、彼らに会いに行きたくなる物語になり、行政からも連絡が届いた。"
      ], {
        stats: { subscribers: 260_000, production: 5, trust: 6 },
        hidden: { origin: 4 },
        routes: { network: 6, mainstream: 2 },
        relationships: { tetsu: 16 },
        addFlags: ["tets_local_path", "tets_tourism_seed", "tets_group_stable"],
        video: { title: "東大オンエアと地元を一日まるごと遊んでみた", views: 14_000_000, subscribersGained: 260_000, kind: "地方コラボ", chapter: 3 }
      }, { tone: "warm", subtext: "地元を捨てず、全国へ見せる" }),
      choice("ch3_07_tets_roles", "六人の役割分担を一緒に整理する", [
        "司会、発想、実験、撮影交渉と、固定しすぎない担当表を作った。テツ一人の負担が減り、他の五人も企画へ責任を持つようになる。",
        "ヒカキンは自分のチームにも応用できる、集団の活かし方を学んだ。"
      ], {
        stats: { production: 6, energy: 4, trust: 4, subscribers: 190_000 },
        hidden: { fatigue: -2 },
        routes: { network: 5, strategy: 3 },
        relationships: { tetsu: 13, manager: 3 },
        addFlags: ["tets_group_stable", "tets_roles_shared", "mastermind_seed"],
        video: { title: "六人六役・地元横断チャレンジ", views: 11_500_000, subscribersGained: 190_000, kind: "集団企画", chapter: 3 }
      }, { tone: "steady", subtext: "リーダーが抱え込まない形を作る" }),
      choice("ch3_07_tets_tokyo", "東京拠点との二重生活を勧める", [
        "仕事の多い日は東京、普段の撮影は地元という案を出した。企業案件は増えたが、移動と予定調整が六人の時間を削る。",
        "知名度は急伸した一方、地元との距離をどう守るかが新しい課題になった。"
      ], {
        stats: { subscribers: 420_000, money: 650_000, production: 3 },
        hidden: { ambition: 4, fatigue: 4 },
        routes: { strategy: 4, network: 3 },
        relationships: { tetsu: 7 },
        addFlags: ["tets_dual_base", "tets_tourism_seed"],
        video: { title: "東京と地元を一日で往復してみた", views: 18_000_000, subscribersGained: 420_000, kind: "地方コラボ", chapter: 3 }
      }, { tone: "bold", subtext: "機会を増やすが、地元との距離が揺れる" })
    ],
    when: when({ minRoutes: { network: 15 } }),
    priority: 30,
    tags: ["tetsu", "group", "local"],
    visual: {
      background: "bg/ch3_local_riverside",
      portrait: "portrait/tetsu",
      expression: "earnest",
      eventCg: "cg/ch3_tets_six_ideas",
      accent: "green"
    }
  }),
  ch3({
    id: "ch3_07_tets_complaint",
    slot: 7,
    title: "商店街からの一本の電話",
    date: "2016年 春",
    location: "東大オンエアの地元商店街",
    body: [
      "東大オンエアとの街中企画が伸びた翌朝、商店街から苦情が入った。撮影を知らなかった店の前に視聴者が集まり、営業を妨げてしまったという。",
      "テツは動画を消す覚悟で頭を下げている。ヒカキンにも共同出演者として、再生数の恩恵だけでなく後始末を引き受ける責任がある。"
    ],
    choices: [
      choice("ch3_07_complaint_visit", "撮影を止め、全店舗へ二人で謝りに行く", [
        "動画の公開を一時停止し、迷惑を受けた店から順に事情を聞いた。再公開時には混雑を避ける案内と、地域の店を支える導線を加える。",
        "短期の数字は落ちたが、後に地域と正式な企画を作れる信頼が生まれた。"
      ], {
        stats: { subscribers: -80_000, money: -300_000, trust: 11 },
        hidden: { origin: 4, controversy: -3 },
        routes: { network: 5, stability: 2 },
        relationships: { tetsu: 15 },
        addFlags: ["tets_local_path", "tets_tourism_seed", "tets_complaint_repaired"]
      }, { tone: "warm", subtext: "数字より地域との関係を直す" }),
      choice("ch3_07_complaint_guide", "動画を残し、来訪ルールをすぐ発信する", [
        "概要欄、固定コメント、次の動画で混雑時間と撮影禁止場所を具体的に伝えた。完全な解決ではないが、視聴者の流れは落ち着く。",
        "テツは対応の速さを学び、地域側との定例連絡を始めた。"
      ], {
        stats: { subscribers: 120_000, trust: 6, production: 3 },
        hidden: { controversy: -1 },
        routes: { strategy: 5, network: 3 },
        relationships: { tetsu: 10 },
        addFlags: ["tets_local_path", "tets_visitor_rules", "tets_tourism_seed"]
      }, { tone: "steady", subtext: "公開を保ちつつ具体策を出す" }),
      choice("ch3_07_complaint_leave", "対応をテツたちへ任せ、次の撮影へ戻る", [
        "共同企画でも地元の問題は彼らの責任だと整理した。ヒカキンの投稿予定は守られたが、東大オンエアは六人だけで謝罪と削除判断を背負う。",
        "テツは解決したものの、助言を求めて連絡することはなくなった。"
      ], {
        stats: { subscribers: 250_000, energy: 6, trust: -6 },
        hidden: { origin: -5, controversy: 4 },
        routes: { stability: 3, controversy: 2 },
        relationships: { tetsu: -14 },
        addFlags: ["tets_abandoned_in_crisis", "tets_group_strained"]
      }, { tone: "risky", subtext: "自分の予定を守り、地域問題から離れる" })
    ],
    when: when({ minHidden: { controversy: 12 } }),
    priority: 25,
    tags: ["tetsu", "local", "crisis"],
    visual: {
      background: "bg/ch3_shopping_street",
      portrait: "portrait/tetsu",
      expression: "worried",
      eventCg: "cg/ch3_shop_complaint",
      accent: "red"
    }
  }),
  ch3({
    id: "ch3_07_tets_invitation",
    slot: 7,
    title: "東京へ来ない六人",
    date: "2016年 春",
    location: "地方駅前",
    body: [
      "地方を拠点にする六人組、東大オンエアからコラボの誘いが届いた。リーダーのテツは、東京のスタジオではなく自分たちの街へ来てほしいと言う。",
      "効率だけなら彼らが上京する方がよい。それでも、駅に降りた瞬間から六人の動画が始まっている理由を、ヒカキンは現地で知った。"
    ],
    choices: [
      choice("ch3_07_invite_local", "地元を使った一日企画へ参加する", [
        "名所ではなく、六人が普段遊んでいる場所を巡った。土地と人間関係が企画を生む様子に触れ、ヒカキンも背景を物語にする技術を学ぶ。",
        "動画は全国へ広がり、地元からも次の撮影を歓迎された。"
      ], {
        stats: { subscribers: 330_000, production: 4, expression: 3, trust: 5, energy: -8 },
        hidden: { origin: 3 },
        routes: { network: 5, mainstream: 3 },
        relationships: { tetsu: 12 },
        addFlags: ["tets_local_path", "tets_tourism_seed"]
      }, { tone: "warm", subtext: "場所と関係性から企画を学ぶ" }),
      choice("ch3_07_invite_challenge", "六人対一人の企画で勝負する", [
        "地元全体を使う謎解き対決をヒカキンが提案した。六人の連携と一人の工夫が対照的に映り、双方の視聴者が楽しめる一本になる。",
        "テツはヒカキンを外から来た有名人ではなく、対等な企画者として認めた。"
      ], {
        stats: { subscribers: 420_000, money: 450_000, production: 5, energy: -10 },
        hidden: { ambition: 4, fatigue: 5 },
        routes: { network: 4, strategy: 3 },
        relationships: { tetsu: 10 },
        addFlags: ["tets_group_stable", "ch3_group_challenge_hit"]
      }, { tone: "bold", subtext: "違いが見える対決にする" }),
      choice("ch3_07_invite_remote", "移動時間を理由に東京撮影を提案する", [
        "六人は東京へ来て、整ったスタジオで企画を撮った。映像は綺麗だったが、彼らの普段の勢いはどこか小さく見える。",
        "数字は得たものの、テツが守りたいものを理解する機会は逃した。"
      ], {
        stats: { subscribers: 270_000, money: 380_000, energy: 3 },
        hidden: { origin: -2 },
        routes: { stability: 3, mainstream: 2 },
        relationships: { tetsu: 4 },
        addFlags: ["tets_tokyo_collab"]
      }, { tone: "steady", subtext: "効率はよいが、彼らの土地を見ない" })
    ],
    priority: 0,
    tags: ["tetsu", "group", "fallback"],
    visual: {
      background: "bg/ch3_local_station",
      portrait: "portrait/tetsu",
      expression: "welcoming",
      eventCg: "cg/ch3_todai_onair_six",
      accent: "green"
    }
  }),

  // ── slot 8: 漁師たちとシル子 ─────────────────────────
  ch3({
    id: "ch3_08_shiruko_safety_leader",
    slot: 8,
    title: "子供が真似する高さ",
    date: "2016年 夏",
    location: "巨大アスレチック会場",
    body: [
      "漁師たちの鬼ごっこ企画は、公開前から子供向け番組並みの注目を集めていた。リーダーのシル子は、高所から飛び降りる案の前で一人だけ黙っている。",
      "安全装置は基準を満たしている。それでも、画面には装置の見えない角度が使われ、真似をする子供には危険だけが伝わる。ヒカキンの一言で撮影時間も予算も変わる。"
    ],
    speaker: "シル子",
    quote: "できるかじゃなくて、見せていいかを決めたい。",
    choices: [
      choice("ch3_08_safety_redesign", "高さを下げず、安全装置も企画として見せる", [
        "専門家の点検、命綱、練習過程まで面白く編集し、『準備した大人だからできる』ことを動画の一部にした。",
        "迫力を失わず模倣の危険を下げ、シル子は安全を面白さへ変えるリーダーとして評価される。"
      ], {
        stats: { subscribers: 360_000, production: 6, trust: 9, money: -450_000 },
        hidden: { origin: 4, fatigue: 3 },
        routes: { network: 5, strategy: 3 },
        relationships: { shiruko: 16 },
        addFlags: ["shiruko_safety_path", "shiruko_kids_trust", "four_emperors_shiruko_seed"],
        video: { title: "安全装置まで全部見せる巨大アスレチック", views: 17_000_000, subscribersGained: 360_000, kind: "アスレチック", chapter: 3 }
      }, { tone: "warm", subtext: "安全対策そのものをエンタメにする" }),
      choice("ch3_08_safety_replace", "高所案を捨て、頭脳鬼ごっこへ変える", [
        "会場の仕掛けを使った音当て鬼ごっこへ変更し、ヒカキンのビートもルールに組み込んだ。派手な落下はないが、子供が家でも遊べる企画になる。",
        "再生数は予測を少し下回ったものの、親世代から強い支持を得た。"
      ], {
        stats: { subscribers: 290_000, beatbox: 3, expression: 4, trust: 10 },
        hidden: { origin: 5 },
        routes: { mainstream: 4, network: 4 },
        relationships: { shiruko: 14 },
        addFlags: ["shiruko_safety_path", "shiruko_kids_trust", "four_emperors_shiruko_seed"],
        video: { title: "ビートの音だけで逃げる頭脳鬼ごっこ", views: 13_000_000, subscribersGained: 290_000, kind: "鬼ごっこ", chapter: 3 }
      }, { tone: "steady", subtext: "危険ではなく遊びの発明で勝つ" }),
      choice("ch3_08_safety_original", "注意表示を入れ、予定通り飛ぶ", [
        "撮影は成功し、公開直後から驚異的に伸びた。注意書きも表示したが、切り抜き映像では安全装置も説明も消えて拡散される。",
        "数字の裏で模倣事故が報じられ、シル子は自分の判断を悔やんだ。"
      ], {
        stats: { subscribers: 680_000, money: 950_000, trust: -13 },
        hidden: { controversy: 12, fatigue: 4, ambition: 6 },
        routes: { controversy: 6, mainstream: 4 },
        relationships: { shiruko: -11 },
        addFlags: ["shiruko_reckless_path", "ch4_safety_scandal_seed"],
        video: { title: "過去最高地点からアスレチックに挑戦", views: 32_000_000, subscribersGained: 680_000, kind: "危険企画", chapter: 3 }
      }, { tone: "risky", subtext: "大記録と、模倣される責任を背負う" })
    ],
    when: when({ minStats: { trust: 62 } }),
    priority: 30,
    tags: ["shiruko", "safety", "children"],
    visual: {
      background: "bg/ch3_athletic_high",
      portrait: "portrait/shiruko",
      expression: "serious",
      eventCg: "cg/ch3_child_imitation_height",
      accent: "green"
    }
  }),
  ch3({
    id: "ch3_08_shiruko_reckless_offer",
    slot: 8,
    title: "危険な方が伸びる",
    date: "2016年 夏",
    location: "閉園後の遊園地",
    body: [
      "漁師たちとの夜間鬼ごっこで、制作側は立入禁止区域まで使う案を出した。許可の確認は曖昧だが、そこへ入る映像がサムネイルになれば大きく伸びるという。",
      "シル子はメンバーを見回し、ヒカキンへ判断を求めた。勢いのある現場ほど、止める人間は空気を壊す役になる。"
    ],
    choices: [
      choice("ch3_08_reckless_stop", "撮影を止め、許可範囲を確認する", [
        "一時間の中断で日没後の撮影枠は短くなったが、施設側と安全範囲を引き直した。限られた区画を逆に密度の高い迷路へ作り変える。",
        "シル子は止める判断もリーダーの仕事だと学び、以後の企画に安全担当を置いた。"
      ], {
        stats: { subscribers: 180_000, production: 5, trust: 10, money: -300_000 },
        hidden: { controversy: -4, origin: 3 },
        routes: { network: 5, stability: 3 },
        relationships: { shiruko: 15 },
        addFlags: ["shiruko_safety_path", "shiruko_kids_trust", "four_emperors_shiruko_seed"]
      }, { tone: "steady", subtext: "現場の勢いより許可と安全を取る" }),
      choice("ch3_08_reckless_reframe", "禁止区域を使わず、境界を罠にする", [
        "入れない場所をルール上の壁とし、追う側と逃げる側が駆け引きする構造へ変えた。危険を避けながら企画性が増す。",
        "ヒカキンとシル子の即興判断が高く評価された。"
      ], {
        stats: { subscribers: 340_000, production: 7, trust: 7, energy: -5 },
        hidden: { origin: 4 },
        routes: { strategy: 5, network: 4 },
        relationships: { shiruko: 13 },
        addFlags: ["shiruko_safety_path", "shiruko_rule_invention", "four_emperors_shiruko_seed"]
      }, { tone: "bold", subtext: "制約をルールへ変える" }),
      choice("ch3_08_reckless_enter", "短時間だけならと撮影を続ける", [
        "誰も怪我をせず、映像はこの章最大級の再生数になった。成功したことで、次の現場ではさらに危険な提案が当然のように出る。",
        "シル子との間には『あの時は大丈夫だった』という最も危険な前例が残った。"
      ], {
        stats: { subscribers: 720_000, money: 1_100_000, trust: -11 },
        hidden: { controversy: 14, ambition: 6 },
        routes: { controversy: 7, mainstream: 3 },
        relationships: { shiruko: -7 },
        addFlags: ["shiruko_reckless_path", "ch4_safety_scandal_seed"]
      }, { tone: "risky", subtext: "無事故の成功が危険な前例になる" })
    ],
    when: when({ minHidden: { controversy: 18 } }),
    priority: 25,
    tags: ["shiruko", "safety", "controversy"],
    visual: {
      background: "bg/ch3_amusement_park_night",
      portrait: "portrait/shiruko",
      expression: "uneasy",
      eventCg: "cg/ch3_restricted_zone",
      accent: "red"
    }
  }),
  ch3({
    id: "ch3_08_fishermen_chase",
    slot: 8,
    title: "本気の大人を追いかける子供たち",
    date: "2016年 夏",
    location: "巨大アスレチック",
    body: [
      "六人組YouTuber『漁師たち』は、アスレチックや鬼ごっこで子供たちの人気を集めていた。リーダーのシル子は、体力だけでなく全員の安全確認まで一人で背負っている。",
      "ヒカキンとのコラボには、過去最大の会場が用意された。迫力を優先する案と、子供が真似できる遊びへ変える案が並ぶ。"
    ],
    choices: [
      choice("ch3_08_chase_family", "親子参加型の安全な鬼ごっこにする", [
        "走力だけでなく音当てや隠し道具を入れ、小さな子供も活躍できるルールにした。ヒカキンはビートで開始合図を担当する。",
        "記録的な爆発はなかったが、家族で安心して見られるシリーズが生まれた。"
      ], {
        stats: { subscribers: 380_000, expression: 5, beatbox: 2, trust: 8 },
        hidden: { origin: 4 },
        routes: { mainstream: 6, network: 4 },
        relationships: { shiruko: 13 },
        addFlags: ["shiruko_safety_path", "shiruko_kids_trust", "four_emperors_shiruko_seed"]
      }, { tone: "warm", subtext: "子供が参加できる遊びへ育てる" }),
      choice("ch3_08_chase_pro", "安全チームを雇い、本格アスレチックに挑む", [
        "監修者と救護班を入れ、危険箇所は練習映像も含めて見せた。予算は膨らんだが、迫力と責任を両立した一本になる。",
        "シル子は規模が増えるほど安全へ投資すべきだと確信した。"
      ], {
        stats: { subscribers: 520_000, money: -850_000, production: 5, trust: 8, energy: -8 },
        hidden: { fatigue: 3 },
        routes: { network: 5, strategy: 3 },
        relationships: { shiruko: 14 },
        addFlags: ["shiruko_safety_path", "shiruko_professional_safety", "four_emperors_shiruko_seed"]
      }, { tone: "steady", subtext: "予算を安全へ使い、迫力も守る" }),
      choice("ch3_08_chase_extreme", "最も危険なコースをサムネイルに使う", [
        "高所から飛ぶ瞬間を中心に編集し、動画は驚異的な初速を記録した。子供から真似したいというコメントが大量に届く。",
        "注意書きだけで責任を果たしたと言えるのか、公開後も答えは出なかった。"
      ], {
        stats: { subscribers: 650_000, money: 900_000, trust: -9 },
        hidden: { controversy: 10, ambition: 5 },
        routes: { controversy: 5, mainstream: 4 },
        relationships: { shiruko: 1 },
        addFlags: ["shiruko_reckless_path", "ch4_safety_scandal_seed"]
      }, { tone: "risky", subtext: "最大初速と模倣リスクを選ぶ" })
    ],
    priority: 0,
    tags: ["shiruko", "children", "fallback"],
    visual: {
      background: "bg/ch3_athletic_day",
      portrait: "portrait/shiruko",
      expression: "energetic",
      eventCg: "cg/ch3_fishermen_chase",
      accent: "green"
    }
  }),

  // ── slot 9: マコトの台頭と兆候 ───────────────────────
  ch3({
    id: "ch3_09_makoto_private_warning",
    slot: 9,
    title: "カメラが止まった後の声",
    date: "2016年 秋",
    location: "打ち上げ会場の廊下",
    body: [
      "天才イケメンYouTuberとして急成長したマコトは、カメラの前では誰より気さくだった。だが打ち上げの廊下で、断っている女性スタッフへ執拗に連絡先を求め、進路を塞ぐ姿をヒカキンは目撃する。",
      "女性は笑って場を収めようとしているが、表情は明らかに固い。人気や酔いは同意の代わりにはならない。ヒカキンがここで何をするかは、動画には映らない。"
    ],
    choices: [
      choice("ch3_09_makoto_intervene", "間に入り、女性をその場から離す", [
        "ヒカキンは会話を遮り、スタッフへ別室の仕事を頼む形で安全な場所へ移した。その後マコトに、拒否を無視した行為は許されないと明確に伝える。",
        "マコトは『大げさだ』と反発したが、女性側には連絡先と相談窓口を残した。"
      ], {
        stats: { trust: 8, expression: 3 },
        hidden: { controversy: -3, origin: 5 },
        routes: { network: 3, stability: 2 },
        relationships: { makoto: -14 },
        addFlags: ["makoto_warning_seen", "makoto_confronted_before_arrest", "makoto_staff_supported"]
      }, { tone: "steady", subtext: "安全を確保し、行為を明確に否定する" }),
      choice("ch3_09_makoto_report", "主催者へ伝え、記録を残す", [
        "女性の意向を確認してから責任者へ同行し、日時と状況を記録した。噂として広めず、再発を防ぐ対応を求める。",
        "マコトとの関係は壊れたが、後に『誰も知らなかった』では済ませない証拠が残った。"
      ], {
        stats: { trust: 10, production: 1 },
        hidden: { controversy: -2, origin: 5 },
        routes: { stability: 3, strategy: 2 },
        relationships: { makoto: -20, manager: 3 },
        addFlags: ["makoto_warning_seen", "makoto_concern_reported", "makoto_staff_supported"]
      }, { tone: "warm", subtext: "本人の意向を確認し、組織へ記録する" }),
      choice("ch3_09_makoto_joke", "場を壊さないよう冗談で流す", [
        "ヒカキンが軽い冗談を挟むと、女性はその隙に離れた。目の前の状況は終わったが、マコトへ何が問題だったかは伝わらない。",
        "後日、似た話を聞いたとき、止めたつもりだった自分の対応が実質的には黙認だったと気づく。"
      ], {
        stats: { expression: 2, trust: -6 },
        hidden: { controversy: 8, origin: -6 },
        routes: { controversy: 4, stability: 2 },
        relationships: { makoto: 5 },
        addFlags: ["makoto_warning_seen", "makoto_enabled", "makoto_bystander_regret"]
      }, { tone: "risky", subtext: "その場は収まるが、問題を止めない" })
    ],
    when: when({ minRelationships: { makoto: 8 } }),
    mandatory: true,
    priority: 40,
    tags: ["makoto", "warning", "anchor"],
    visual: {
      background: "bg/ch3_party_corridor",
      portrait: "portrait/hikakin",
      expression: "alarmed",
      eventCg: "cg/ch3_makoto_corridor_warning",
      accent: "red"
    }
  }),
  ch3({
    id: "ch3_09_makoto_party_distance",
    slot: 9,
    title: "招待状の裏側",
    date: "2016年 秋",
    location: "都内イベント会場",
    body: [
      "マコト主催の華やかな会には、企業幹部や若い出演希望者まで集まっていた。彼はヒカキンを親友のように紹介し、その信用を自分の場へ重ねようとする。",
      "スタッフから、マコトが立場の弱い相手へ強引に接しているという話も耳に入る。まだ断片的な情報だが、人気を理由に軽く扱ってよい内容ではない。"
    ],
    choices: [
      choice("ch3_09_party_ask", "具体的な状況を当事者の安全に配慮して確認する", [
        "噂を動画やSNSへ流さず、相談したスタッフへ記録と専門窓口を案内した。自分が判断者にならず、必要な支援へつなぐ。",
        "マコトとは距離を置き、共演予定も一度止めた。"
      ], {
        stats: { trust: 8, subscribers: -80_000 },
        hidden: { origin: 5, controversy: -2 },
        routes: { stability: 4 },
        relationships: { makoto: -12, manager: 4 },
        addFlags: ["makoto_warning_heard", "makoto_distance", "makoto_concern_reported"]
      }, { tone: "steady", subtext: "噂として消費せず、安全な相談へつなぐ" }),
      choice("ch3_09_party_confront", "マコト本人へ行動を改めるよう迫る", [
        "ヒカキンは人気や酒を言い訳にできないと伝えた。マコトは否定し、『証拠もないのに疑うのか』と関係を切る。",
        "問題を公に断定はしなかったが、共演を止めた理由は記録として残した。"
      ], {
        stats: { trust: 6, expression: 3, subscribers: -40_000 },
        hidden: { controversy: 1, origin: 4 },
        routes: { network: 2, craft: 1 },
        relationships: { makoto: -18 },
        addFlags: ["makoto_warning_heard", "makoto_confronted_before_arrest", "makoto_distance"]
      }, { tone: "bold", subtext: "関係を失っても行動を問題にする" }),
      choice("ch3_09_party_stay", "確証がないとして共演を続ける", [
        "マコトとの動画は大きく伸び、ヒカキンにも新しい視聴者が流れた。断片的な話は、自分が見ていないことを理由に棚へ上げる。",
        "その判断は、後に共演動画とともに何度も問い直されることになる。"
      ], {
        stats: { subscribers: 620_000, money: 850_000, trust: -8 },
        hidden: { controversy: 10, ambition: 7, origin: -7 },
        routes: { mainstream: 4, controversy: 5 },
        relationships: { makoto: 12 },
        addFlags: ["makoto_warning_heard", "makoto_enabled", "makoto_collab_archive"]
      }, { tone: "risky", subtext: "成長を取るが、聞いた後の黙認になる" })
    ],
    when: when({ minRoutes: { mainstream: 15 } }),
    mandatory: true,
    priority: 35,
    tags: ["makoto", "warning", "anchor"],
    visual: {
      background: "bg/ch3_luxury_party",
      portrait: "portrait/makoto",
      expression: "charming",
      eventCg: "cg/ch3_makoto_party",
      accent: "red"
    }
  }),
  ch3({
    id: "ch3_09_makoto_rise",
    slot: 9,
    title: "天才と呼ばれる男",
    date: "2016年 秋",
    location: "授賞イベント 控室",
    body: [
      "マコトは容姿、トーク、企画力のすべてを持ち、初対面の相手にも自然に距離を詰める天才だった。一本出すたびに記録を塗り替え、周囲は彼の多少の無理を『勢い』として笑う。",
      "控室で、若いスタッフへの乱暴な言葉遣いをヒカキンは耳にした。直後にカメラが回ると、マコトは完璧な笑顔へ戻る。"
    ],
    speaker: "マコト",
    quote: "売れれば、細かいことを言う人も黙りますよ。",
    choices: [
      choice("ch3_09_rise_warn", "成功と敬意は別だとその場で伝える", [
        "ヒカキンはスタッフの前で怒鳴り返さず、二人になった場所で具体的な言動を挙げた。マコトは笑って流したが、ヒカキンは共演条件として改善を求める。",
        "関係には距離ができたものの、見て見ぬふりはしなかった。"
      ], {
        stats: { trust: 6, expression: 2 },
        hidden: { origin: 4 },
        routes: { network: 3, stability: 2 },
        relationships: { makoto: -8 },
        addFlags: ["makoto_warning_seen", "makoto_confronted_before_arrest"]
      }, { tone: "steady", subtext: "人格ではなく具体的な行動を注意する" }),
      choice("ch3_09_rise_distance", "今後の共演を控える", [
        "公に断罪はせず、自分のチャンネルへ招かないと決めた。理由を尋ねられても、確認できない話を再生数へ変えない。",
        "急成長する相手との機会は失ったが、自分の現場へ同じ空気を持ち込まずに済んだ。"
      ], {
        stats: { subscribers: -90_000, trust: 5, energy: 3 },
        hidden: { origin: 4, controversy: -2 },
        routes: { craft: 2, stability: 3 },
        relationships: { makoto: -10 },
        addFlags: ["makoto_warning_seen", "makoto_distance"]
      }, { tone: "warm", subtext: "噂を使わず、自分の場を守る" }),
      choice("ch3_09_rise_collab", "才能を優先して大型コラボを組む", [
        "二人の企画力が噛み合い、コラボは記録的な再生数を得た。マコトの態度は撮影中だけ完璧で、スタッフも表立って異議を言わない。",
        "ヒカキンは違和感を抱えながら、結果が出たことを理由に次の約束もした。"
      ], {
        stats: { subscribers: 700_000, money: 950_000, expression: 4, trust: -7 },
        hidden: { controversy: 9, ambition: 7, origin: -5 },
        routes: { mainstream: 5, controversy: 4 },
        relationships: { makoto: 14 },
        addFlags: ["makoto_warning_seen", "makoto_enabled", "makoto_collab_archive"]
      }, { tone: "risky", subtext: "才能の恩恵と黙認の責任を抱える" })
    ],
    mandatory: true,
    priority: 10,
    tags: ["makoto", "warning", "anchor", "fallback"],
    visual: {
      background: "bg/ch3_award_backstage",
      portrait: "portrait/makoto",
      expression: "confident",
      eventCg: "cg/ch3_makoto_two_faces",
      accent: "red"
    }
  }),

  // ── slot 10: 成功を支える現場 ─────────────────────────
  ch3({
    id: "ch3_10_staff_deadline",
    slot: 10,
    title: "眠っていない編集者",
    date: "2017年 春",
    location: "制作オフィス",
    body: [
      "朝の確認会で、編集者が同じ字幕を三度見落とした。責める前に聞くと、二日間ほとんど眠らず、公開本数を守るため自宅でも作業していたという。",
      "ヒカキン自身が無理をして成功した過去が、チームの基準として広がっていた。『僕もやった』は、雇う側が言えば命令になる。"
    ],
    choices: [
      choice("ch3_10_staff_stop", "今日の公開を延期し、全員を休ませる", [
        "スポンサーへ自分で頭を下げ、公開日を変更した。数字は落ちたが、残業申請と休息日を形だけでなく運用する制度へ改める。",
        "スタッフは失敗を隠さず報告できるようになり、長期的には動画事故も減った。"
      ], {
        stats: { subscribers: -120_000, money: -700_000, trust: 10, energy: 10, production: 4 },
        hidden: { fatigue: -10, origin: 5, controversy: -4 },
        routes: { stability: 5, network: 4 },
        relationships: { manager: 14 },
        addFlags: ["ch3_staff_reformed", "ch3_staff_fair", "ch4_team_crisis_prevented"]
      }, { tone: "warm", subtext: "損失を引き受け、働き方を変える" }),
      choice("ch3_10_staff_outsource", "今週だけ外部チームへ引き継ぐ", [
        "公開日は守り、内部スタッフには休みを取らせた。緊急対応としては機能したが、同じ本数を続ければ再発することも明らかになる。",
        "ヒカキンは翌月までに工程を減らす約束をした。"
      ], {
        stats: { money: -1_100_000, subscribers: 180_000, production: 3, trust: 5, energy: 4 },
        hidden: { fatigue: -4 },
        routes: { strategy: 5, stability: 3 },
        relationships: { manager: 8 },
        addFlags: ["ch3_staff_temporary_fix", "ch4_team_crisis_seed"]
      }, { tone: "steady", subtext: "公開を守るが、根本解決は次へ残る" }),
      choice("ch3_10_staff_finish", "今回だけ全員で完成させる", [
        "ヒカキンも徹夜へ加わり、予定通り公開した。現場には一体感が生まれ、動画も大きく伸びる。",
        "しかし『今回だけ』は翌月にも繰り返され、働き方を問題として語る人がいなくなった。"
      ], {
        stats: { subscribers: 520_000, money: 1_000_000, production: 3, energy: -18 },
        hidden: { fatigue: 17, controversy: 9, ambition: 5 },
        routes: { controversy: 4, mainstream: 3 },
        relationships: { manager: -6 },
        addFlags: ["ch3_staff_overworked", "ch4_team_crisis_seed"]
      }, { tone: "risky", subtext: "成功するほど無理が標準になる" })
    ],
    when: when({ flagsAny: ["ch3_hired_editor", "ch3_corporate_team", "ch3_small_team"] }),
    priority: 30,
    tags: ["team", "labor", "crisis-seed"],
    visual: {
      background: "bg/ch3_office_dawn",
      portrait: "portrait/hikakin",
      expression: "concerned",
      eventCg: "cg/ch3_exhausted_editor",
      accent: "red"
    }
  }),
  ch3({
    id: "ch3_10_solo_body_warning",
    slot: 10,
    title: "声が出ない朝",
    date: "2017年 春",
    location: "自宅 洗面所",
    body: [
      "収録日の朝、ヒカキンは挨拶の声すら出せなかった。熱はない。医師は疲労と喉の酷使を指摘し、休めば戻るが続ければ長引くと告げる。",
      "今日の企画には多くの費用がかかっている。代わりの出演者はいない。一人であることを強みにしてきたチャンネルは、一人が止まれば全部止まる。"
    ],
    choices: [
      choice("ch3_10_body_cancel", "損失を受け入れ、完全に休む", [
        "撮影を中止し、声を出さない一週間を取った。事情を字幕だけの短い動画で説明すると、視聴者から休んでほしいという声が集まる。",
        "復帰後は撮影日数を制限し、休息を制作計画へ組み込んだ。"
      ], {
        stats: { money: -1_300_000, subscribers: -70_000, energy: 25, trust: 9 },
        hidden: { fatigue: -20, origin: 4, perfectionism: -4 },
        routes: { stability: 6 },
        addFlags: ["ch3_health_reformed", "ch4_burnout_prevented"]
      }, { tone: "warm", subtext: "今週を失い、活動寿命を守る" }),
      choice("ch3_10_body_silent", "喋らず成立する動画へ作り直す", [
        "説明をすべて字幕とビートボックスのリズムへ置き換えた。制約から生まれた一本は独創的で、喉を休めながら公開にも間に合う。",
        "ただし根本の働き方までは変わっておらず、休息は翌週に持ち越された。"
      ], {
        stats: { subscribers: 430_000, production: 7, beatbox: 5, energy: 6, trust: 5 },
        hidden: { fatigue: -4, origin: 8 },
        routes: { craft: 7, strategy: 2 },
        addFlags: ["ch3_silent_masterpiece", "ch4_burnout_seed"]
      }, { tone: "bold", subtext: "制約を作品にするが、休養は不十分" }),
      choice("ch3_10_body_medicate", "薬で声を戻し、予定通り撮影する", [
        "撮影中は笑顔を保ち、誰にも不調を悟らせなかった。動画は記録を更新したが、終了後は一言も話せなくなる。",
        "『止まれない人』という自己像が、成功と一緒にさらに強くなった。"
      ], {
        stats: { subscribers: 560_000, money: 850_000, energy: -25 },
        hidden: { fatigue: 22, perfectionism: 4, ambition: 6 },
        routes: { craft: 3, controversy: 3 },
        addFlags: ["ch3_overwork_normalized", "ch4_burnout_seed"]
      }, { tone: "risky", subtext: "公開は守るが、身体の警告を無視する" })
    ],
    when: when({ flagsAny: ["ch3_production_solo", "ch3_overwork_normalized"] }),
    priority: 25,
    tags: ["health", "solo", "crisis-seed"],
    visual: {
      background: "bg/ch3_bathroom_morning",
      portrait: "portrait/hikakin",
      expression: "sick",
      eventCg: "cg/ch3_no_voice_morning",
      accent: "red"
    }
  }),
  ch3({
    id: "ch3_10_scale_question",
    slot: 10,
    title: "大きくするもの、残すもの",
    date: "2017年 春",
    location: "制作会議",
    body: [
      "動画一本に関わる人数も予算も、社員寮時代とは比べられないほど増えた。だが会議で最も多く聞かれるのは『前回より大きく』という言葉だった。",
      "規模は分かりやすい成長になる。一方で、小さな発想を丁寧に見せる時間は減っている。次の半年を何へ使うか、ヒカキンが方針を決める番だ。"
    ],
    choices: [
      choice("ch3_10_scale_people", "人材と安全へ予算を使う", [
        "派手なセットを一つ減らし、編集者の増員、休息、専門監修へ回した。画面上の規模は変わらなくても、現場の精度と余裕が増す。",
        "長く続けられる制作文化が、目に見えない代表作になった。"
      ], {
        stats: { money: -1_200_000, production: 5, energy: 10, trust: 7 },
        hidden: { fatigue: -10, origin: 4 },
        routes: { stability: 6, network: 3 },
        relationships: { manager: 10 },
        addFlags: ["ch3_staff_fair", "ch3_health_reformed", "ch4_team_crisis_prevented"]
      }, { tone: "warm", subtext: "画面ではなく現場を強くする" }),
      choice("ch3_10_scale_spectacle", "日本最大級のセットへ投資する", [
        "一目で規模が伝わる巨大企画を作り、テレビでも取り上げられた。ヒカキンは個人投稿者の枠を越える。",
        "次回も同じ規模を期待され、制作費とプレッシャーは新しい基準へ上がった。"
      ], {
        stats: { money: -2_000_000, subscribers: 760_000, production: 4, expression: 3 },
        hidden: { ambition: 8, fatigue: 7, origin: -3 },
        routes: { mainstream: 7 },
        addFlags: ["ch3_spectacle_standard", "ch3_budget_pressure"]
      }, { tone: "bold", subtext: "個人動画の限界を広げる" }),
      choice("ch3_10_scale_small", "小さな部屋で成立する企画へ戻る", [
        "商品一つ、カメラ一台、ヒカキン一人。制約を戻すと、表情と間の使い方が以前より成長していることに気づく。",
        "再生記録ではなく、『この人を見たい』という視聴者が増えた。"
      ], {
        stats: { subscribers: 340_000, expression: 6, beatbox: 3, trust: 6, energy: 5 },
        hidden: { origin: 10, fatigue: -5 },
        routes: { craft: 6, mainstream: 3 },
        addFlags: ["ch3_small_room_return", "legendary_video_seed"]
      }, { tone: "steady", subtext: "規模を下げ、本人の成長を映す" })
    ],
    priority: 0,
    tags: ["scale", "production", "fallback"],
    visual: {
      background: "bg/ch3_production_meeting",
      portrait: "portrait/hikakin",
      expression: "thoughtful",
      accent: "blue"
    }
  }),

  // ── slot 11: 第3章の帰結 ─────────────────────────────
  ch3({
    id: "ch3_11_four_paths_seed",
    slot: 11,
    title: "同じ時代を登る者たち",
    date: "2017年 夏",
    location: "動画投稿者イベント 屋上",
    body: [
      "はじめ課長は大型企画で記録を追い、テツは六人と地元を結び、シル子は子供が安心して夢中になれる遊びを作っている。全員が違う道を選びながら、同じ時代の頂上へ近づいていた。",
      "イベントの帰り、三人はヒカキンへ『次は何をするのか』と尋ねる。ここで交わす言葉は、いつか四人が並ぶ未来の最初の約束になる。"
    ],
    choices: [
      choice("ch3_11_four_compete", "全員で違う日本一を目指そうと答える", [
        "登録者、規模、地域、子供人気。比べられない強さを持ち寄り、互いに手加減せず成長することを約束した。",
        "ヒカキンは先頭に立つだけでなく、業界全体が強くなる未来を望むようになる。"
      ], {
        stats: { trust: 10, expression: 4, subscribers: 360_000 },
        hidden: { ambition: 8, origin: 6 },
        routes: { network: 7, mainstream: 4 },
        relationships: { hajime: 8, tetsu: 8, shiruko: 8 },
        addFlags: ["four_emperors_collective_seed", "ch3_healthy_ecosystem", "hajime_fair_rival_seed"]
      }, { tone: "warm", subtext: "誰かを落とさず、全員で頂上を高くする" }),
      choice("ch3_11_four_top", "自分が頂点を取ると宣言する", [
        "冗談ではなく、登録者も代表作も日本一になると言い切った。はじめ課長は笑いながら『親分の次じゃなく、親分を抜きます』と返す。",
        "明確な競争が四人を強くし、ヒカキンの野心にも名前がついた。"
      ], {
        stats: { subscribers: 470_000, expression: 5 },
        hidden: { ambition: 12, origin: 1 },
        routes: { mainstream: 6, network: 3 },
        relationships: { hajime: 6, tetsu: 4, shiruko: 4 },
        addFlags: ["ch3_declared_number_one", "four_emperors_collective_seed", "hajime_fair_rival_seed"]
      }, { tone: "bold", subtext: "友情の中に明確な勝負を置く" }),
      choice("ch3_11_four_collab", "四人の大型コラボを今から構想する", [
        "それぞれの強みが必要になる企画をノートへ描いた。今は会場も予算も足りないが、誰も不可能だとは言わない。",
        "この未完成の企画書は、数年後に『四皇』が揃う舞台の原型になる。"
      ], {
        stats: { production: 6, trust: 8, subscribers: 330_000 },
        hidden: { ambition: 7, origin: 5 },
        routes: { network: 8, strategy: 3 },
        relationships: { hajime: 7, tetsu: 9, shiruko: 9 },
        addFlags: ["four_emperors_collective_seed", "four_emperors_collab_blueprint", "ch3_healthy_ecosystem"]
      }, { tone: "steady", subtext: "未来の共演を設計する" })
    ],
    when: when({
      flagsAll: ["tets_tourism_seed", "four_emperors_shiruko_seed"],
      minRelationships: { hajime: 10, tetsu: 8, shiruko: 8 }
    }),
    mandatory: true,
    priority: 45,
    tags: ["chapter-close", "four-emperors", "anchor"],
    visual: {
      background: "bg/ch3_event_rooftop_sunset",
      portrait: "portrait/four_future_emperors",
      expression: "hopeful",
      eventCg: "cg/ch3_four_paths_seed",
      accent: "gold"
    }
  }),
  ch3({
    id: "ch3_11_shadow_success",
    slot: 11,
    title: "拍手の後ろの静けさ",
    date: "2017年 夏",
    location: "イベント会場 控室",
    body: [
      "ステージでは過去最大の拍手を受けた。控室へ戻ると、返せていない兄の連絡、疲れたスタッフ、マコトについて聞いた不穏な話が同じ画面に並ぶ。",
      "成功は問題を消していない。ただ、数字の光で見えにくくしていた。次の時代へ進む前に、ヒカキンは何を最優先で直すか決めなければならない。"
    ],
    choices: [
      choice("ch3_11_shadow_people", "まず人間関係と現場を修復する", [
        "公開本数を減らし、ゼイキン、スタッフ、関係者と一人ずつ話した。すべては戻らなかったが、問題を記録の陰へ押し込めずに済む。",
        "第4章を、傷を認めた状態から始めることになった。"
      ], {
        stats: { subscribers: -180_000, money: -500_000, trust: 9, energy: 8 },
        hidden: { controversy: -6, fatigue: -8, origin: 6 },
        routes: { stability: 5, network: 4 },
        relationships: { zeikin: 8, manager: 8 },
        addFlags: ["ch3_preemptive_repair", "ch4_recovery_ready"]
      }, { tone: "warm", subtext: "成長を緩め、傷へ向き合う" }),
      choice("ch3_11_shadow_statement", "制作と行動の原則を公表する", [
        "広告表記、安全確認、スタッフの働き方について、自分のチャンネルで守る基準を文章にした。過去の不十分さも認める。",
        "公表した言葉は、後にヒカキン自身を守るだけでなく、逸脱したときの厳しい物差しにもなった。"
      ], {
        stats: { trust: 8, production: 3, subscribers: 90_000 },
        hidden: { controversy: -4, ambition: 2 },
        routes: { strategy: 5, stability: 3 },
        relationships: { manager: 5 },
        addFlags: ["ch3_public_principles", "ch4_recovery_ready"]
      }, { tone: "steady", subtext: "自分を縛る基準を言葉にする" }),
      choice("ch3_11_shadow_numbers", "今は数字を伸ばし、問題は後で処理する", [
        "次月の大型企画へ全員を戻し、勢いを保った。記録は更新され、懸念を口にする人も忙しさの中で黙る。",
        "未処理の問題は消えず、第4章で同時に表面化する準備を整えた。"
      ], {
        stats: { subscribers: 760_000, money: 1_400_000, trust: -9, energy: -10 },
        hidden: { controversy: 12, fatigue: 12, ambition: 9, origin: -7 },
        routes: { controversy: 6, mainstream: 5 },
        relationships: { manager: -5 },
        addFlags: ["ch3_problems_deferred", "ch4_multiple_crisis_seed"]
      }, { tone: "risky", subtext: "勢いを守り、問題を一つの未来へ送る" })
    ],
    when: when({
      flagsAny: ["ch3_overwork_normalized", "ch3_staff_overworked", "yt_theme_credit_conflict", "makoto_enabled"],
      minHidden: { fatigue: 28 }
    }),
    mandatory: true,
    priority: 40,
    tags: ["chapter-close", "crisis-seed", "anchor"],
    visual: {
      background: "bg/ch3_backstage_empty",
      portrait: "portrait/hikakin",
      expression: "weary",
      eventCg: "cg/ch3_applause_and_messages",
      accent: "red"
    }
  }),
  ch3({
    id: "ch3_11_new_era_closes",
    slot: 11,
    title: "頂上が見え始めた日",
    date: "2017年 夏",
    location: "撮影部屋",
    body: [
      "数年前には存在しなかった職業を、いまでは大勢の子供が夢として口にする。ヒカキンの動画も、個人の趣味から社会へ影響する仕事になっていた。",
      "はじめ課長はすぐ後ろまで伸び、テツやシル子もそれぞれの分野で名前を上げている。頂上が見えた瞬間、その場所へ持っていけない問題の影も見え始めた。"
    ],
    speaker: "ヒカキン",
    quote: "何者かにはなれた。次は、どんな人で居続けるかだ。",
    choices: [
      choice("ch3_11_close_trust", "信用を成長の中心に置く", [
        "再生予測だけでなく、視聴者、スタッフ、共演者へ説明できるかを企画基準へ加えた。派手な案がいくつか消える。",
        "速度はわずかに落ちたが、次の危機で戻れる場所ができた。"
      ], {
        stats: { trust: 10, production: 3, subscribers: 180_000 },
        hidden: { origin: 6, controversy: -4 },
        routes: { stability: 5, mainstream: 2 },
        addFlags: ["ch3_public_principles", "ch4_recovery_ready"]
      }, { tone: "steady", subtext: "説明できる成功を目指す" }),
      choice("ch3_11_close_number_one", "日本一を次の明確な目標にする", [
        "曖昧だった野心へ『日本一』という名前をつけた。はじめ課長にも隠さず伝え、同じ頂上を競う覚悟を決める。",
        "目標は判断を速くする一方、数字がすべてに見える危険も連れてきた。"
      ], {
        stats: { subscribers: 480_000, expression: 4 },
        hidden: { ambition: 12, origin: -1 },
        routes: { mainstream: 6, strategy: 2 },
        relationships: { hajime: 5 },
        addFlags: ["ch3_declared_number_one", "hajime_fair_rival_seed"]
      }, { tone: "bold", subtext: "野心に日本一という名前をつける" }),
      choice("ch3_11_close_work", "次の一本だけに集中する", [
        "業界や順位の話を閉じ、机の前で次の台本を開いた。大きな肩書きより、一つの間、一つの音を良くする。",
        "その姿勢は遠回りに見えて、後に伝説的な一本を作る芯として残った。"
      ], {
        stats: { production: 6, beatbox: 4, trust: 5, subscribers: 220_000 },
        hidden: { origin: 10, perfectionism: 3 },
        routes: { craft: 7 },
        addFlags: ["legendary_video_seed", "ch3_next_video_first"]
      }, { tone: "warm", subtext: "肩書きより制作へ戻る" })
    ],
    mandatory: true,
    priority: 0,
    tags: ["chapter-close", "anchor", "fallback"],
    visual: {
      background: "bg/ch3_studio_sunset",
      portrait: "portrait/hikakin",
      expression: "determined",
      eventCg: "cg/ch3_summit_visible",
      accent: "blue"
    }
  })
];
