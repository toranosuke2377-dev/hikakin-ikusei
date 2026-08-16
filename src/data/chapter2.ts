import type { StoryEvent } from "../game/types";
import { choice, event, when } from "./helpers";

/**
 * 第2章「一千万回の向こう側」
 *
 * 一度のバズを「入口」に変えられるかを扱う。まっすお、ダンケ、サックスむらい、
 * はじめ課長は、ヒカキン自身の方針を映す接点として限定的に登場する。
 */
export const chapter2Events: StoryEvent[] = [
  // ---------------------------------------------------------------------------
  // SLOT 0: バズの翌週
  // ---------------------------------------------------------------------------
  event({
    id: "ch2_s0_after_viral_fallback",
    chapter: 2,
    slot: 0,
    title: "期待という借金",
    date: "2010年",
    location: "スーパー社員寮・自室",
    body: [
      "ゲームBGMのビートボックス動画が国内月間アクセス一位になってから、チャンネルの空気は別物になった。以前は一件のコメントを待っていたのに、今は『次はいつだ』という声が秒単位で増える。",
      "ヒカキンの技術や企画力が一夜で何倍にもなったわけではない。知名度だけが先に走り、追いつけなければ一発屋として忘れられる。",
      "制服を脱いだ机の前で、最初の大ヒットより難しい二本目を考え始めた。"
    ],
    speaker: "ヒカキン",
    quote: "一度は見つかった。次は、忘れられない人にならないと。",
    choices: [
      choice(
        "ch2_s0_after_repeat_game",
        "同じゲームの別BGMをすぐ再現する",
        [
          "視聴者が今求めているものへ、最短で応えることにした。前作の制作メモを使えるため、準備も早い。",
          "再生数は安定するが、『ゲーム音楽の人』という印象はさらに強くなる。一発屋を脱するための一歩が、同時に型を固定した。"
        ],
        {
          stats: { subscribers: 95_000, money: 100_000, beatbox: 3, energy: -7 },
          hidden: { perfectionism: 1, ambition: 4 },
          routes: { craft: 3, strategy: 2 },
          addFlags: ["ch2_followup_same_game", "ch2_game_label_stronger"],
          queueEvent: "ch2_s1_followup_immediate",
          video: {
            title: "スーパーマッチ棒ブラザーズ・別ステージBGM再現",
            views: 2_600_000,
            subscribersGained: 95_000,
            kind: "game-beatbox",
            chapter: 2
          }
        },
        { tone: "steady", subtext: "期待へ確実に応えるが、印象が狭くなる" }
      ),
      choice(
        "ch2_s0_after_new_genre",
        "あえて、まったく違う動画を出す",
        [
          "安い商品の紹介を一人で撮り、慣れない言葉で良さを説明した。ビートボックスを待っていた視聴者の一部は離れる。",
          "再生数は前作の十分の一にも届かない。それでも、技術一本ではない自分を作るための最初の失敗になった。"
        ],
        {
          stats: { subscribers: 22_000, money: 45_000, expression: 4, production: 2, trust: 2 },
          hidden: { ambition: 4, origin: 1 },
          routes: { mainstream: 5 },
          addFlags: ["ch2_early_genre_break", "ch2_product_trial", "ch2_followup_underperformed"],
          video: {
            title: "東京で買った激安イヤホンを本気で紹介",
            views: 148_000,
            subscribersGained: 22_000,
            kind: "product-review",
            chapter: 2
          }
        },
        { tone: "bold", subtext: "数字を落としても総合YouTuberへの幅を作る" }
      ),
      choice(
        "ch2_s0_after_listen",
        "一週間、コメントと視聴データを調べる",
        [
          "国、年齢、離脱時間、繰り返し見られた場面。すべてを表へまとめると、音だけでなく驚いた表情にも反応が集まっている。",
          "一本遅れる代わりに、次から何を残し、何を変えるべきかの地図を作った。"
        ],
        {
          stats: { production: 5, energy: -4, trust: 1 },
          hidden: { ambition: 3 },
          routes: { strategy: 6 },
          addFlags: ["ch2_postviral_analysis", "ch2_audience_map", "ch2_followup_delayed"]
        },
        { tone: "steady", subtext: "勢いを一度止め、次の勝ち方を調べる" }
      )
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["chapter-opening", "viral", "expectation"],
    visual: {
      background: "bg/ch2_dorm_notifications",
      portrait: "portrait/hikakin_rising",
      expression: "overwhelmed",
      eventCg: "cg/ch2_expectation_notifications",
      accent: "gold"
    }
  }),

  event({
    id: "ch2_s0_after_global_viral",
    chapter: 2,
    slot: 0,
    title: "日本語の通じない観客席",
    date: "2010年",
    location: "スーパー社員寮・自室",
    body: [
      "一千万再生の大半は、海外から始まった。受信箱には各国から取材依頼らしいメールが届くが、正確な意味さえ分からない。国内では『海外で偶然当たった人』という扱いもある。",
      "世界へ残るには海外向けを続ける必要があり、日本で何者かになるには国内の観客へ顔と声を覚えてもらう必要がある。二つの入口が、反対方向へ開いていた。"
    ],
    speaker: "ヒカキン",
    quote: "世界で見られた。でも、僕自身を見てもらえたかは分からない。",
    choices: [
      choice(
        "ch2_s0_global_double_down",
        "英語題名の音楽動画を続ける",
        [
          "短い説明文を翻訳し、次のゲーム音楽も言葉を使わず見られる構成にした。海外の視聴者は残り、国内での伸びは緩やかになる。",
          "世界へ通じる職人として輪郭が強くなった一方、日常を話す力は育たない。"
        ],
        {
          stats: { subscribers: 180_000, money: 180_000, beatbox: 4, production: 3 },
          hidden: { origin: 2, ambition: 5 },
          routes: { craft: 3, strategy: 4 },
          addFlags: ["ch2_global_continued", "ch2_game_label_stronger"],
          queueEvent: "ch2_s1_followup_immediate",
          video: {
            title: "ANOTHER JAPANESE GAME BEATBOX",
            views: 4_800_000,
            subscribersGained: 180_000,
            kind: "game-beatbox-global",
            chapter: 2
          }
        },
        { tone: "steady", subtext: "世界の固定視聴者を守る" }
      ),
      choice(
        "ch2_s0_global_return_domestic",
        "日本語で、自分の生活を話す動画を出す",
        [
          "スーパー勤務と社員寮での撮影を、店名や他人を出さずに話した。海外視聴者の多くは見なくなるが、国内から『同じ普通の人だった』という声が集まる。",
          "技ではなく人柄を見てもらう怖さと、総合YouTuberへ進む可能性を得た。"
        ],
        {
          stats: { subscribers: 70_000, money: 70_000, expression: 6, trust: 5 },
          hidden: { origin: 5 },
          routes: { mainstream: 6 },
          addFlags: ["ch2_domestic_self_intro", "ch2_personality_visible"],
          video: {
            title: "スーパーで働きながら動画を作っています",
            views: 920_000,
            subscribersGained: 70_000,
            kind: "personal-talk",
            chapter: 2
          }
        },
        { tone: "warm", subtext: "世界的な技より、国内へ人柄を見せる" }
      ),
      choice(
        "ch2_s0_global_bilingual_series",
        "映像中心にして、両方の言語へ字幕を付ける",
        [
          "話す量を抑え、画面と音だけでも流れが分かる動画へした。字幕作業は倍になり、睡眠時間が削られる。",
          "どちらも捨てない構成は強いが、一人制作の限界が早く見え始めた。"
        ],
        {
          stats: { subscribers: 145_000, money: 120_000, production: 6, energy: -10 },
          hidden: { fatigue: 6, ambition: 5 },
          routes: { strategy: 5, mainstream: 2 },
          addFlags: ["ch2_bilingual_series", "ch2_workload_warning"],
          queueEvent: "ch2_s1_followup_immediate",
          video: {
            title: "口だけでゲームの一日を再現 / GAME DAY BEATBOX",
            views: 3_100_000,
            subscribersGained: 145_000,
            kind: "bilingual-variety",
            chapter: 2
          }
        },
        { tone: "risky", subtext: "両方へ届くが、制作負担が倍になる" }
      )
    ],
    when: when({ flagsAll: ["ch1_viral_global", "ch1_video_10m"] }),
    mandatory: true,
    priority: 30,
    oncePerRun: true,
    tags: ["chapter-opening", "global", "expectation"],
    visual: {
      background: "bg/ch2_dorm_world_comments",
      portrait: "portrait/hikakin_rising",
      expression: "uncertain",
      eventCg: "cg/ch2_two_audiences",
      accent: "violet"
    }
  }),

  event({
    id: "ch2_s0_after_technical_viral",
    chapter: 2,
    slot: 0,
    title: "証明の次に作るもの",
    date: "2010年",
    location: "スーパー社員寮・自室",
    body: [
      "無編集の証明や制作工程を出したことで、『口だけなのか』という疑いは落ち着き始めた。代わりに視聴者は、前作以上の技術を当然のように求めている。",
      "難しい音を更新し続ければ職人として残れる。しかし、毎回証明する人生では、ヒカキン本人の面白さは育たない。"
    ],
    speaker: "ヒカキン",
    quote: "疑いには答えた。次は、僕が何をしたいかで選ばないと。",
    choices: [
      choice(
        "ch2_s0_technical_harder",
        "誰も再現できない難曲へ挑む",
        [
          "前作より速く、音数の多い曲を選んだ。視聴者の期待へ技術で正面から応える。",
          "濃い支持は増えるが、一本ごとの制作期間も長くなった。"
        ],
        {
          stats: { subscribers: 130_000, money: 130_000, beatbox: 6, energy: -10 },
          hidden: { perfectionism: 4, fatigue: 4 },
          routes: { craft: 6 },
          addFlags: ["ch2_technical_escalation", "ch2_slow_masterpieces"],
          video: {
            title: "最高難度ステージBGMを口だけで完全再現",
            views: 3_700_000,
            subscribersGained: 130_000,
            kind: "technical-beatbox",
            chapter: 2
          }
        },
        { tone: "risky", subtext: "技術の頂点へ進むが、制作負担が増える" }
      ),
      choice(
        "ch2_s0_technical_teach",
        "初心者向けに音の出し方を教える",
        [
          "難しい音を分解し、誰でも試せる三つの練習へした。再現動画ほどの爆発はないが、真似した動画が少しずつ増える。",
          "技術を独占せず、伝える力へ変えたことで表現者としての幅が生まれた。"
        ],
        {
          stats: { subscribers: 85_000, money: 90_000, expression: 5, trust: 6, beatbox: 2 },
          hidden: { origin: 4 },
          routes: { mainstream: 4, network: 2 },
          addFlags: ["ch2_beatbox_tutorial", "ch2_teacher_seed"],
          video: {
            title: "ゲームの開始音を口で出す方法",
            views: 1_600_000,
            subscribersGained: 85_000,
            kind: "tutorial",
            chapter: 2
          }
        },
        { tone: "warm", subtext: "技術を誰かの開始点へ変える" }
      ),
      choice(
        "ch2_s0_technical_leave_proof",
        "証明動画を最後に、別ジャンルへ進む",
        [
          "口だけであることはもう示した。次は安い商品を、自分の声と表情だけで面白く紹介してみる。",
          "技術ファンの反発はあるが、証明に縛られない方向転換が始まった。"
        ],
        {
          stats: { subscribers: 45_000, money: 55_000, expression: 6, trust: 2 },
          hidden: { perfectionism: -3, ambition: 4 },
          routes: { mainstream: 6 },
          addFlags: ["ch2_technical_chapter_closed", "ch2_product_trial", "ch2_followup_underperformed"]
        },
        { tone: "bold", subtext: "証明の役目を終え、人物として勝負する" }
      )
    ],
    when: when({ flagsAny: ["ch1_viral_technical", "ch1_one_take_proof", "ch1_process_transparent"] }),
    mandatory: true,
    priority: 32,
    oncePerRun: true,
    tags: ["chapter-opening", "technical", "expectation"],
    visual: {
      background: "bg/ch2_dorm_proof_video",
      portrait: "portrait/hikakin_rising",
      expression: "resolved",
      eventCg: "cg/ch2_after_proof",
      accent: "blue"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 1: 二本目以降の壁
  // ---------------------------------------------------------------------------
  event({
    id: "ch2_s1_second_video_fallback",
    chapter: 2,
    slot: 1,
    title: "百万人の次の十二万人",
    date: "2010年",
    location: "スーパー社員寮・自室",
    body: [
      "次の動画を公開すると、最初の一日で十二万回再生された。以前なら想像もできない成功なのに、一千万と比べた瞬間、失敗に見える。",
      "コメントには『一発屋だった』『またゲームの曲をやって』という言葉が混じる。比較する基準を、過去最高の一本だけに置けば、これから出すすべてが敗北になる。"
    ],
    choices: [
      choice(
        "ch2_s1_second_accept_scale",
        "十二万人へ届いた事実を受け止める",
        [
          "一千万の画面を閉じ、今作を見てくれた人の反応だけを読んだ。数字が下がっても、十二万人は消えない。",
          "最大値ではなく、続けて届く基準を作ることで焦りが少し和らいだ。"
        ],
        {
          stats: { trust: 4, energy: 5, subscribers: 18_000 },
          hidden: { origin: 5, fatigue: -2, ambition: -1 },
          routes: { stability: 3 },
          addFlags: ["ch2_sustainable_expectations", "ch2_second_video_accepted"]
        },
        { tone: "warm", subtext: "過去最高ではなく、今の観客を見る" }
      ),
      choice(
        "ch2_s1_second_chase_peak",
        "一千万を超えるまで同系統を連投する",
        [
          "人気ゲームの音を次々に録り、投稿間隔を一気に縮めた。登録者は増えるが、一本ごとの驚きは薄くなる。",
          "勢いを守る代わりに、数字が下がるたびさらに本数を増やす循環へ入った。"
        ],
        {
          stats: { subscribers: 160_000, money: 140_000, beatbox: 3, energy: -12 },
          hidden: { fatigue: 7, ambition: 6, perfectionism: -2 },
          routes: { strategy: 4, craft: 2 },
          addFlags: ["ch2_peak_chasing", "ch2_game_upload_spree", "ch2_workload_warning"]
        },
        { tone: "risky", subtext: "成長速度と引き換えに消耗が始まる" }
      ),
      choice(
        "ch2_s1_second_ask_why",
        "視聴者が前作を共有した理由を調べる",
        [
          "技術、ゲームの知名度、驚く表情、短い尺。共有した人の言葉を集めると、ヒットは一つの理由では説明できない。",
          "再現ではなく、複数の強みを別ジャンルへ移す考え方を得た。"
        ],
        {
          stats: { production: 5, expression: 2, energy: -3 },
          routes: { strategy: 6 },
          addFlags: ["ch2_hit_components_mapped", "ch2_diversification_ready"]
        },
        { tone: "steady", subtext: "ヒットの構造を次のジャンルへ持ち出す" }
      )
    ],
    priority: 0,
    oncePerRun: true,
    tags: ["followup", "expectation", "one-hit"],
    visual: {
      background: "bg/ch2_dorm_analytics_drop",
      portrait: "portrait/hikakin_rising",
      expression: "disappointed",
      eventCg: "cg/ch2_views_comparison",
      accent: "blue"
    }
  }),

  event({
    id: "ch2_s1_followup_immediate",
    chapter: 2,
    slot: 1,
    title: "成功から七十二時間",
    date: "2010年",
    location: "社員寮・浴室",
    body: [
      "前作が伸びてから七十二時間後、ヒカキンはもう次の動画を録っていた。通知音を切っても、壁の向こうから数字が追いかけてくる感覚がある。",
      "準備不足のまま公開すれば勢いは使える。作り直せば期待へ応えられるが、最も注目される数日を逃す。"
    ],
    choices: [
      choice(
        "ch2_s1_immediate_release",
        "荒さを承知で七十二時間以内に出す",
        [
          "音のズレを一つ残したまま、最速の続編として公開した。再生は大きく伸びるが、前作より雑だという批判も目立つ。",
          "速度が数字を作る手応えと、信用を少しずつ削る感覚を同時に得た。"
        ],
        {
          stats: { subscribers: 150_000, money: 130_000, production: 2, trust: -3, energy: -8 },
          hidden: { controversy: 3, fatigue: 4 },
          routes: { strategy: 4, mainstream: 2 },
          addFlags: ["ch2_fast_followup", "ch2_quality_criticism"],
          video: {
            title: "話題のゲームBGMをすぐ口で再現",
            views: 3_000_000,
            subscribersGained: 150_000,
            kind: "fast-followup",
            chapter: 2
          }
        },
        { tone: "risky", subtext: "最大の勢いと引き換えに粗さを残す" }
      ),
      choice(
        "ch2_s1_immediate_delay_quality",
        "予告だけ出し、完成まで一週間使う",
        [
          "制作中だと伝える短い映像を出し、完成日は約束した。待つ声が増えるほど怖くなるが、決めた日に品質の高い続編を公開する。",
          "前作は超えなくても、偶然ではない技術だという評価を固めた。"
        ],
        {
          stats: { subscribers: 120_000, money: 110_000, beatbox: 4, production: 3, trust: 4, energy: -7 },
          hidden: { perfectionism: 2, fatigue: 3 },
          routes: { craft: 4, strategy: 2 },
          addFlags: ["ch2_followup_promised", "ch2_quality_consistent"],
          video: {
            title: "ゲームBGMビートボックス第2弾",
            views: 2_400_000,
            subscribersGained: 120_000,
            kind: "quality-followup",
            chapter: 2
          }
        },
        { tone: "steady", subtext: "期待を管理し、品質を守る" }
      ),
      choice(
        "ch2_s1_immediate_stop_series",
        "続編の録音を止め、方向性を考え直す",
        [
          "録音途中のデータを保存し、公開予定を白紙にした。勢いを失う恐怖はあるが、求められたものだけを作る人生へ早くも違和感がある。",
          "登録者の伸びは止まる。その代わり、自分の幅を作る時間が生まれた。"
        ],
        {
          stats: { energy: 7, production: 3 },
          hidden: { origin: 5, ambition: -1, fatigue: -3 },
          routes: { mainstream: 2, strategy: 1 },
          addFlags: ["ch2_followup_cancelled", "ch2_diversification_ready"]
        },
        { tone: "bold", subtext: "勢いより長期の方向性を選ぶ" }
      )
    ],
    when: when({
      flagsAny: [
        "ch1_followup_immediate",
        "ch2_followup_same_game",
        "ch2_bilingual_series",
        "ch2_global_continued"
      ]
    }),
    priority: 30,
    oncePerRun: true,
    tags: ["followup", "speed", "pressure"],
    visual: {
      background: "bg/ch2_bathroom_rushed_recording",
      portrait: "portrait/hikakin_rising",
      expression: "rushed",
      eventCg: "cg/ch2_72_hours",
      accent: "red"
    }
  }),

  event({
    id: "ch2_s1_goal_after_vindication",
    chapter: 2,
    slot: 1,
    title: "見返した後の空白",
    date: "2010年",
    location: "社員寮・自室",
    body: [
      "一度拒否したYouTubeから招待を受け、『向こうから来させる』という目標は実現した。壁から拒否メールを外した翌日、練習を始める理由が以前ほど強くない。",
      "何者かになるという野心は残っている。だが誰かを見返すだけでは、その先の姿を決められない。新しい目標を言葉にする必要がある。"
    ],
    choices: [
      choice(
        "ch2_s1_goal_entertain_people",
        "『もっと多くの人を楽しませる』と書く",
        [
          "技術の証明ではなく、見た人が笑うことを次の基準にした。商品紹介や日常動画も、ビートボックスと同じ本気で研究する。",
          "総合YouTuberへ向かう言葉が、机の正面へ新しく貼られた。"
        ],
        {
          stats: { expression: 4, trust: 3 },
          hidden: { origin: 5, ambition: 4 },
          routes: { mainstream: 5 },
          addFlags: ["ch2_goal_entertain", "ch2_diversification_ready"]
        },
        { tone: "warm", subtext: "勝利ではなく視聴者の楽しさを目標にする" }
      ),
      choice(
        "ch2_s1_goal_live_from_video",
        "『動画だけで暮らせるようになる』と書く",
        [
          "必要な生活費と広告収益を計算し、漠然とした夢を数字へ変えた。スーパーを辞める日が、初めて現実的な目標になる。",
          "収益を追うことは悪ではない。ただ数字が目的を飲み込まないよう、計画が必要になった。"
        ],
        {
          stats: { production: 2, money: 20_000 },
          hidden: { ambition: 6 },
          routes: { strategy: 5, stability: 2 },
          addFlags: ["ch2_goal_fulltime", "ch2_income_target_set"]
        },
        { tone: "steady", subtext: "専業化を計算可能な目標へする" }
      ),
      choice(
        "ch2_s1_goal_be_number_one",
        "まだ遠くても『日本一』と書く",
        [
          "自分で書いた言葉の大きさに笑いそうになった。それでも消さず、登録者一位のチャンネルまでの差を記録する。",
          "何者かという空白に、初めて日本一のYouTuberという名前が入った。"
        ],
        {
          stats: { expression: 1, production: 2 },
          hidden: { ambition: 10, origin: 2 },
          routes: { strategy: 3, mainstream: 2 },
          addFlags: ["ch2_goal_number_one", "ch2_number_one_vow"]
        },
        { tone: "bold", subtext: "届かない距離を、最初から目標にする" }
      )
    ],
    when: when({ flagsAny: ["ch1_rejection_released", "ch1_needs_new_goal"] }),
    priority: 28,
    oncePerRun: true,
    tags: ["followup", "ambition", "goal"],
    visual: {
      background: "bg/ch2_dorm_blank_wall",
      portrait: "portrait/hikakin_rising",
      expression: "reflective",
      eventCg: "cg/ch2_new_goal_note",
      accent: "blue"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 2: 初収益とスーパー
  // ---------------------------------------------------------------------------
  event({
    id: "ch2_s2_first_revenue_fallback",
    chapter: 2,
    slot: 2,
    title: "給料とは違う入金",
    date: "2010年",
    location: "スーパー・従業員休憩室",
    body: [
      "パートナーとして初めての広告収益が振り込まれた。まだ毎月の生活をすべて賄える額ではないが、安いマイク代を超えている。",
      "同じ日にスーパーの給与明細も受け取った。決まった勤務への確かな給料と、再生数で大きく揺れる収益。どちらもヒカキンの働いた時間から生まれた金だった。"
    ],
    choices: [
      choice(
        "ch2_s2_revenue_new_camera",
        "収益をすべて新しいカメラへ使う",
        [
          "初収益を記念品にせず、次の一本へ戻した。映像は明るくなり、表情の細かな変化まで見える。",
          "貯金は増えないが、動画の収益が動画を育てる循環が初めて始まった。"
        ],
        {
          stats: { money: -90_000, production: 6, expression: 2 },
          hidden: { ambition: 4 },
          routes: { craft: 3, mainstream: 2 },
          addFlags: ["ch2_first_revenue_reinvested", "ch2_new_camera"]
        },
        { tone: "bold", subtext: "生活ではなく、次の作品へ全額戻す" }
      ),
      choice(
        "ch2_s2_revenue_save",
        "専業化のために貯金する",
        [
          "収益専用の口座を作り、一円も生活費に混ぜなかった。毎月の最低額を記録し、辞めても暮らせる月数を計算する。",
          "派手な変化はないが、スーパーを辞める判断を感情ではなく数字で行う準備が進む。"
        ],
        {
          stats: { money: 100_000, production: 1 },
          hidden: { ambition: 3 },
          routes: { stability: 5, strategy: 3 },
          addFlags: ["ch2_first_revenue_saved", "ch2_fulltime_fund"]
        },
        { tone: "steady", subtext: "自由を買う資金として積み立てる" }
      ),
      choice(
        "ch2_s2_revenue_family_gift",
        "最初の収益で家族へ贈り物をする",
        [
          "上京時の二万円への礼として、小さな贈り物を新潟へ送った。電話口で家族は、無理だけはするなと何度も言う。",
          "収益が数字ではなく、支えてくれた人へ返せるものだと実感した。兄のゼイキンとも音楽の話が長く続く。"
        ],
        {
          stats: { money: -25_000, trust: 5, energy: 4 },
          hidden: { origin: 6 },
          routes: { network: 3 },
          relationships: { zeikin: 5 },
          addFlags: ["ch2_first_revenue_family", "ch2_zeikin_music_talk"]
        },
        { tone: "warm", subtext: "最初の成果を支えてくれた家族へ返す" }
      )
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["revenue", "supermarket", "career"],
    visual: {
      background: "bg/ch2_supermarket_payslips",
      portrait: "portrait/hikakin_uniform",
      expression: "amazed",
      eventCg: "cg/ch2_two_payments",
      accent: "green"
    }
  }),

  event({
    id: "ch2_s2_boss_support",
    chapter: 2,
    slot: 2,
    title: "売り場の向こうの応援",
    date: "2010年",
    location: "スーパー・事務室",
    body: [
      "上司は、勤務中に客から動画の人かと尋ねられる例が増えたと話した。仕事へ支障が出る前に、勤務日数を調整する案を出してくれる。",
      "職場の信用を積み上げてきたから得られた提案だった。時間を減らせば給料は落ちるが、動画へまとまった日を使える。"
    ],
    choices: [
      choice(
        "ch2_s2_boss_reduce_shifts",
        "週の勤務を一日減らしてもらう",
        [
          "最初の休みは、朝から夜まで一本の動画だけに使えた。給料は減ったが、細切れではない制作時間の価値を知る。",
          "スーパーと動画の間に、辞める以外の段階が作られた。"
        ],
        {
          stats: { money: -30_000, energy: 8, production: 5, trust: 2 },
          hidden: { fatigue: -3 },
          routes: { stability: 3, craft: 2 },
          relationships: { supermarket: 5 },
          addFlags: ["ch2_reduced_shifts", "ch2_supermarket_supportive"]
        },
        { tone: "steady", subtext: "給料を減らし、制作日を買う" }
      ),
      choice(
        "ch2_s2_boss_keep_fulltime",
        "今は同じ勤務を続ける",
        [
          "収益が何か月続くか分からない以上、生活を急に変えないと決めた。上司は、必要になった時また話そうと応じる。",
          "安全網は守られたが、次の流行へ対応する速度は上がらない。"
        ],
        {
          stats: { money: 75_000, energy: -5, trust: 3 },
          hidden: { fatigue: 2 },
          routes: { stability: 6 },
          relationships: { supermarket: 5 },
          addFlags: ["ch2_full_shift_kept", "ch2_supermarket_supportive"]
        },
        { tone: "steady", subtext: "収益の継続が見えるまで生活を変えない" }
      ),
      choice(
        "ch2_s2_boss_set_exit_goal",
        "半年後の退職条件を一緒に決める",
        [
          "収益が給与を連続で上回ること、引き継ぎを終えること、貯金を残すこと。三つを紙に書き、半年後に再度話すと約束した。",
          "夢を応援してもらうだけでなく、責任を果たして出ていく計画ができた。"
        ],
        {
          stats: { production: 3, trust: 5 },
          hidden: { ambition: 5 },
          routes: { strategy: 4, stability: 3 },
          relationships: { supermarket: 7 },
          addFlags: ["ch2_exit_conditions_set", "ch2_supermarket_supportive", "ch2_responsible_exit_seed"]
        },
        { tone: "warm", subtext: "応援を曖昧にせず、退職条件へ変える" }
      )
    ],
    when: when({ flagsAny: ["ch1_boss_consulted", "ch1_supermarket_safety_net", "ch1_work_kept_promise"], minRelationships: { supermarket: 8 } }),
    mandatory: true,
    priority: 30,
    oncePerRun: true,
    tags: ["revenue", "supermarket", "support"],
    visual: {
      background: "bg/ch2_supermarket_office",
      portrait: "portrait/hikakin_uniform",
      expression: "grateful",
      eventCg: "cg/ch2_boss_schedule_offer",
      accent: "green"
    }
  }),

  event({
    id: "ch2_s2_work_conflict",
    chapter: 2,
    slot: 2,
    title: "レジ前の『動画の人』",
    date: "2010年",
    location: "スーパーマーケット・売り場",
    body: [
      "勤務中、客がヒカキンに携帯電話を向け、『あのゲーム動画の人だ』と声を上げた。ほかの客まで集まり、売り場の通路が塞がる。",
      "上司は、動画活動そのものではなく仕事への影響を問題にした。過去の急な欠勤や注意もあり、このまま両立するなら明確な対策を求められる。"
    ],
    choices: [
      choice(
        "ch2_s2_conflict_apologize_plan",
        "謝罪し、勤務中の対応ルールを作る",
        [
          "写真や会話は休憩時間だけ、売り場では仕事を優先すると掲示方法まで相談した。視聴者にも店へ来ないよう動画で説明する。",
          "人気を理由に特別扱いを求めず、仕事と視聴者の両方へ境界を示した。"
        ],
        {
          stats: { trust: 7, expression: 2, production: 1 },
          hidden: { controversy: -2 },
          routes: { strategy: 3, stability: 2 },
          relationships: { supermarket: 5 },
          addFlags: ["ch2_work_fan_rules", "ch2_conflict_repaired"]
        },
        { tone: "steady", subtext: "人気の扱い方を自分から決める" }
      ),
      choice(
        "ch2_s2_conflict_quit_impulsively",
        "迷惑をかける前に、退職を申し出る",
        [
          "十分な貯金も計画もないまま、退職の意思を伝えた。上司は引き止めず、引き継ぎ期間だけは守るよう求める。",
          "制作時間は手に入る。しかし動画収益が落ちれば、社員寮も生活も同時に失う賭けになった。"
        ],
        {
          stats: { energy: 10, money: -40_000, trust: -1 },
          hidden: { ambition: 8, fatigue: -2 },
          routes: { craft: 2, mainstream: 2 },
          relationships: { supermarket: -5 },
          addFlags: ["ch2_quit_announced_early", "ch2_housing_risk", "ch2_fulltime_risky"]
        },
        { tone: "risky", subtext: "時間を得る代わりに生活基盤を賭ける" }
      ),
      choice(
        "ch2_s2_conflict_blame_fans",
        "動画で、職場へ来た視聴者を強く非難する",
        [
          "職場へ来ないでほしいという正当な要望に、怒りまで乗せて話した。支持する声は多いが、晒されたと感じた客との言い争いが広がる。",
          "境界は示せたものの、怒りを強く出すほど再生が伸びる手応えも残った。"
        ],
        {
          stats: { subscribers: 35_000, trust: -4, expression: 3 },
          hidden: { controversy: 6, ambition: 2 },
          routes: { controversy: 4 },
          relationships: { supermarket: -2 },
          addFlags: ["ch2_fan_conflict_video", "ch2_attention_from_conflict"]
        },
        { tone: "risky", subtext: "境界を強く示すが、対立を拡散する" }
      )
    ],
    when: when({ flagsAny: ["ch1_called_off_for_video", "ch1_bath_warning", "ch1_partner_used_as_proof"], maxRelationships: { supermarket: 5 } }),
    mandatory: true,
    priority: 32,
    oncePerRun: true,
    tags: ["revenue", "supermarket", "conflict"],
    visual: {
      background: "bg/ch2_supermarket_crowded_aisle",
      portrait: "portrait/hikakin_uniform",
      expression: "cornered",
      eventCg: "cg/ch2_fan_at_work",
      accent: "red"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 3: 動画ジャンルを広げる
  // ---------------------------------------------------------------------------
  event({
    id: "ch2_s3_genre_crossroads_fallback",
    chapter: 2,
    slot: 3,
    title: "ビートボックス以外の顔",
    date: "2011年",
    location: "社員寮・新しく整えた撮影机",
    body: [
      "ビートボックス動画だけでは、投稿間隔も題材も限られる。ヒカキンは机へ、ゲーム、食品、日用品、安い調理器具を並べた。",
      "どれも専門家ではない。だが普通の生活にあるものを、自分なりに面白く見せられれば、『ゲーム音楽の人』から一人のYouTuberへ変われる。"
    ],
    choices: [
      choice(
        "ch2_s3_genre_product",
        "身近な商品を本気で紹介する",
        [
          "値段、使い方、正直な欠点を順番に話し、最後に商品の音を口で再現した。派手ではないが、買う前に役立ったというコメントが付く。",
          "説明する力と信用が、ビートボックスとは別の柱になり始めた。"
        ],
        {
          stats: { subscribers: 85_000, money: 95_000, expression: 5, trust: 5, production: 3 },
          routes: { mainstream: 6 },
          addFlags: ["ch2_genre_product", "ch2_honest_reviews", "ch2_beatbox_as_flavor"],
          video: {
            title: "新発売のお菓子を音まで本気レビュー",
            views: 1_300_000,
            subscribersGained: 85_000,
            kind: "product-review",
            chapter: 2
          }
        },
        { tone: "warm", subtext: "生活に役立つ説明へ個性を足す" }
      ),
      choice(
        "ch2_s3_genre_gaming",
        "ゲーム実況に挑戦する",
        [
          "プレイしながら話すと、音だけの動画より何倍も言葉に詰まった。失敗のたび効果音を口で付けると、そこだけコメントが盛り上がる。",
          "得意技を橋にしながら、反応とトークを鍛える道が開いた。"
        ],
        {
          stats: { subscribers: 100_000, money: 80_000, expression: 6, beatbox: 1, energy: -5 },
          routes: { mainstream: 4, strategy: 2 },
          addFlags: ["ch2_genre_gaming", "ch2_game_commentary_started"],
          video: {
            title: "音を全部口で付けながらゲーム実況",
            views: 1_650_000,
            subscribersGained: 100_000,
            kind: "gaming",
            chapter: 2
          }
        },
        { tone: "bold", subtext: "苦手なトークをゲームで鍛える" }
      ),
      choice(
        "ch2_s3_genre_challenge",
        "料理と検証を組み合わせる",
        [
          "スーパーで買える材料だけで巨大な菓子を作り、調理音をすべて口で足した。完成は歪だが、失敗も含めて一本の物語になる。",
          "技術を披露するのではなく、企画を面白くする道具として使う感覚を得た。"
        ],
        {
          stats: { subscribers: 120_000, money: 60_000, expression: 6, production: 5, energy: -7 },
          hidden: { perfectionism: -2 },
          routes: { mainstream: 6 },
          addFlags: ["ch2_genre_variety", "ch2_food_challenge", "ch2_beatbox_as_flavor"],
          video: {
            title: "巨大お菓子を作って効果音も全部口で付けてみた",
            views: 2_100_000,
            subscribersGained: 120_000,
            kind: "food-challenge",
            chapter: 2
          }
        },
        { tone: "risky", subtext: "費用と失敗ごと、企画の物語にする" }
      )
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["genre", "diversification", "identity"],
    visual: {
      background: "bg/ch2_dorm_genre_table",
      portrait: "portrait/hikakin_rising",
      expression: "curious",
      eventCg: "cg/ch2_genre_choices",
      accent: "gold"
    }
  }),

  event({
    id: "ch2_s3_gaming_wave",
    chapter: 2,
    slot: 3,
    title: "パズトラの夜",
    date: "2011年",
    location: "社員寮・自室",
    body: [
      "パズルゲーム『パズトラ』が急速に流行し、攻略動画が毎日伸びている。ヒカキンも遊んでいるが、腕前も知識も専門実況者には遠く及ばない。",
      "一千万再生の知名度で流行へ乗れば、最初は見てもらえる。しかし中身がなければ、便乗しただけだとすぐ見抜かれる。"
    ],
    choices: [
      choice(
        "ch2_s3_pazutora_beginner",
        "初心者の失敗を隠さず実況する",
        [
          "上手く見せるのを諦め、間違えるたび自分で効果音を付けた。攻略には役立たないが、一緒に始めた感覚が受ける。",
          "技術のない分野でも、正直な立場と反応で動画を作れると分かった。"
        ],
        {
          stats: { subscribers: 125_000, money: 85_000, expression: 7, trust: 4 },
          hidden: { perfectionism: -3 },
          routes: { mainstream: 6 },
          addFlags: ["ch2_genre_gaming", "ch2_pazutora_beginner", "ch2_honest_beginner"],
          video: {
            title: "初心者がパズトラを始めたら失敗だらけだった",
            views: 2_000_000,
            subscribersGained: 125_000,
            kind: "pazutora-gaming",
            chapter: 2
          }
        },
        { tone: "warm", subtext: "下手さを隠さず、一緒に始める" }
      ),
      choice(
        "ch2_s3_pazutora_study",
        "一週間、攻略を研究してから撮る",
        [
          "能力値、盤面、人気実況の説明順までノートへまとめた。動画では初心者がつまずく場所を先回りして説明する。",
          "公開は遅れたが、ただの便乗ではない準備が伝わり、ゲーム視聴者が定着し始めた。"
        ],
        {
          stats: { subscribers: 105_000, money: 90_000, production: 6, expression: 3, energy: -6 },
          routes: { strategy: 6 },
          addFlags: ["ch2_genre_gaming", "ch2_pazutora_researched", "ch2_gaming_serious"]
        },
        { tone: "steady", subtext: "流行へ敬意を払い、最低限の知識を作る" }
      ),
      choice(
        "ch2_s3_pazutora_skip",
        "流行には乗らず、別の企画を作る",
        [
          "検索上位にパズトラが並ぶ間、日用品の音を使った検証動画を作った。再生数はゲーム実況ほど伸びない。",
          "流行を逃した代わりに、何でも追う人ではないという輪郭を守った。"
        ],
        {
          stats: { subscribers: 45_000, production: 4, trust: 3 },
          hidden: { origin: 4 },
          routes: { craft: 2, mainstream: 2 },
          addFlags: ["ch2_pazutora_skipped", "ch2_genre_variety", "ch2_independent_taste"]
        },
        { tone: "bold", subtext: "最大の流行を捨て、自分の題材を守る" }
      )
    ],
    when: when({ trendsAny: ["gaming"], flagsAny: ["ch2_diversification_ready", "ch2_game_commentary_started", "ch2_audience_map"] }),
    mandatory: true,
    priority: 30,
    oncePerRun: true,
    tags: ["genre", "gaming", "pazutora"],
    visual: {
      background: "bg/ch2_dorm_pazutora",
      portrait: "portrait/hikakin_rising",
      expression: "competitive",
      eventCg: "cg/ch2_pazutora_screen",
      accent: "violet"
    }
  }),

  event({
    id: "ch2_s3_store_to_camera",
    chapter: 2,
    slot: 3,
    title: "売り場で覚えた説明",
    date: "2011年",
    location: "社員寮・撮影机",
    body: [
      "スーパーで何度も商品の場所や違いを説明してきたヒカキンは、接客の言葉をカメラへ向ければよいと気づいた。専門用語より、買う人が最初に迷う点を話せる。",
      "ただし商品を褒めるだけなら広告と変わらない。正直な欠点を言えば信用は増えるが、将来企業から声がかかりにくくなる可能性もある。"
    ],
    choices: [
      choice(
        "ch2_s3_store_honest_review",
        "良い点と悪い点を同じ長さで話す",
        [
          "便利な点を試した後、壊れやすい部分も映した。視聴者は買う判断に役立ったと評価する。",
          "企業へ好かれることより、見る人へ役立つことを基準にした結果、商品紹介の信用が育った。"
        ],
        {
          stats: { subscribers: 95_000, money: 80_000, expression: 5, trust: 8, production: 3 },
          hidden: { origin: 4 },
          routes: { mainstream: 5 },
          addFlags: ["ch2_genre_product", "ch2_honest_reviews", "ch2_consumer_first"],
          video: {
            title: "話題の日用品を良い所も悪い所も全部レビュー",
            views: 1_500_000,
            subscribersGained: 95_000,
            kind: "product-review",
            chapter: 2
          }
        },
        { tone: "warm", subtext: "企業より、買う人の判断を優先する" }
      ),
      choice(
        "ch2_s3_store_make_entertaining",
        "商品の特徴をビートボックスで表現する",
        [
          "開封音、動作音、驚きを短いビートへまとめた。説明だけの動画より記憶に残り、ゲーム音楽から来た視聴者も楽しめる。",
          "ビートボックスを主役から個性へ移す、ヒカキンらしい商品紹介が生まれた。"
        ],
        {
          stats: { subscribers: 135_000, money: 90_000, expression: 6, beatbox: 2, production: 4 },
          hidden: { origin: 5 },
          routes: { mainstream: 6, craft: 1 },
          addFlags: ["ch2_genre_product", "ch2_beatbox_as_flavor", "ch2_signature_review"],
          video: {
            title: "新商品を音だけでレビューしてみた",
            views: 2_300_000,
            subscribersGained: 135_000,
            kind: "signature-review",
            chapter: 2
          }
        },
        { tone: "bold", subtext: "原点を別ジャンルの個性へ変える" }
      ),
      choice(
        "ch2_s3_store_exaggerate",
        "題名とリアクションを大きくする",
        [
          "『人生が変わる』と題名へ入れ、普段以上に驚いて見せた。再生数は伸びるが、実物はそこまでではないという批判が付く。",
          "誇張が入口を広げる手応えと、期待を裏切る危険を同時に覚えた。"
        ],
        {
          stats: { subscribers: 155_000, money: 120_000, expression: 6, trust: -5 },
          hidden: { controversy: 5, ambition: 3 },
          routes: { controversy: 3, mainstream: 4 },
          addFlags: ["ch2_genre_product", "ch2_exaggerated_review", "ch2_clickbait_seed"],
          video: {
            title: "【衝撃】これで人生が変わりました",
            views: 3_100_000,
            subscribersGained: 155_000,
            kind: "exaggerated-review",
            chapter: 2
          }
        },
        { tone: "risky", subtext: "最大の入口と引き換えに期待を誇張する" }
      )
    ],
    when: when({ flagsAny: ["ch1_store_observer", "ch1_customer_interests", "ch2_product_trial", "ch2_goal_entertain"] }),
    mandatory: true,
    priority: 28,
    oncePerRun: true,
    tags: ["genre", "product", "supermarket"],
    visual: {
      background: "bg/ch2_dorm_product_desk",
      portrait: "portrait/hikakin_rising",
      expression: "presenting",
      eventCg: "cg/ch2_first_real_review",
      accent: "green"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 4: ゲーム実況という別の技術
  // ---------------------------------------------------------------------------
  event({
    id: "ch2_s4_gaming_learning_fallback",
    chapter: 2,
    slot: 4,
    title: "遊びながら話す難しさ",
    date: "2011年",
    location: "社員寮・自室",
    body: [
      "ゲーム実況を撮ってみると、プレイへ集中した瞬間に言葉が完全に止まった。後から見返せば、無言の画面と突然の効果音だけが続いている。",
      "ビートボックスは一人で完成まで練習できた。実況は失敗した瞬間の言葉まで作品になる。別の技術として鍛えなければ、知名度だけで最初の再生を得ても続かない。"
    ],
    choices: [
      choice(
        "ch2_s4_gaming_script",
        "話す項目を事前に台本へ書く",
        [
          "開始の挨拶、今日の目標、失敗時に説明することを短く書いた。台本を読みすぎる場面はあるが、長い沈黙は減る。",
          "即興の弱さを準備で補い、実況を制作の一部として扱えるようになった。"
        ],
        {
          stats: { expression: 4, production: 5, energy: -4 },
          routes: { strategy: 5 },
          addFlags: ["ch2_gaming_scripted", "ch2_genre_gaming"]
        },
        { tone: "steady", subtext: "即興を準備で支える" }
      ),
      choice(
        "ch2_s4_gaming_live_reactions",
        "上手く話そうとせず、反応をそのまま出す",
        [
          "失敗した時の声も、黙り込んだ後の笑いも切らずに残した。攻略としては弱いが、視聴者は一緒に遊んでいるようだと反応する。",
          "完璧な演奏とは違う、偶然を受け入れる表現力が伸びた。"
        ],
        {
          stats: { subscribers: 75_000, expression: 7, trust: 3, energy: -3 },
          hidden: { perfectionism: -4, origin: 2 },
          routes: { mainstream: 5 },
          addFlags: ["ch2_gaming_natural", "ch2_genre_gaming"],
          video: {
            title: "初見ゲームで声が出なくなりました",
            views: 1_100_000,
            subscribersGained: 75_000,
            kind: "natural-gaming",
            chapter: 2
          }
        },
        { tone: "warm", subtext: "完成された言葉より素の反応を残す" }
      ),
      choice(
        "ch2_s4_gaming_keep_as_side",
        "実況は月一回だけの挑戦にする",
        [
          "無理に専門実況者を目指さず、普段の動画の間へゲームを置いた。急成長はしないが、苦手を少しずつ試せる。",
          "ビートボックス、商品紹介、実況を一人のチャンネルで共存させるリズムができ始めた。"
        ],
        {
          stats: { subscribers: 40_000, expression: 3, energy: 4 },
          routes: { stability: 3, mainstream: 2 },
          addFlags: ["ch2_gaming_monthly", "ch2_multi_genre_balance"]
        },
        { tone: "steady", subtext: "専門化せず、長く試す枠を作る" }
      )
    ],
    priority: 0,
    oncePerRun: true,
    tags: ["gaming", "learning", "expression"],
    visual: {
      background: "bg/ch2_dorm_game_capture",
      portrait: "portrait/hikakin_rising",
      expression: "awkward",
      accent: "blue"
    }
  }),

  event({
    id: "ch2_s4_murai_first_contact",
    chapter: 2,
    slot: 4,
    title: "パズトラの研究者",
    date: "2011年",
    location: "動画投稿者向け小規模イベント",
    body: [
      "『パズトラ』の攻略と検証で急速に人気を集めるサックスむらいから声をかけられた。名前に反して、動画の中心はほぼゲーム実況で、サックスの話を振ると『今それはいいでしょう』と即座に流す。",
      "彼はヒカキンの知名度ではなく、初心者が迷う瞬間を映像に残している点を評価した。その上で、感覚だけで撮らず、一回の実況にも検証の目的を持つべきだと助言する。"
    ],
    speaker: "サックスむらい",
    quote: "上手い必要はありません。でも、何を確かめる動画かは決めましょう。サックスの話は後で。",
    choices: [
      choice(
        "ch2_s4_murai_learn_analysis",
        "実況データの見方を教わる",
        [
          "視聴者が離れた秒数と、その直前に何を話したかを一緒に確認した。感覚では面白いと思った長話で、多くの人が離れている。",
          "厳しい数字を人格への否定ではなく、構成を直す材料として読む方法を覚えた。"
        ],
        {
          stats: { production: 6, expression: 2, energy: -3 },
          routes: { strategy: 6 },
          relationships: { murai: 7 },
          addFlags: ["ch2_murai_met", "ch2_murai_analytics", "ch2_gaming_serious"]
        },
        { tone: "steady", subtext: "感覚と数字を照らし合わせる" }
      ),
      choice(
        "ch2_s4_murai_collab_beginner",
        "初心者対攻略者のパズトラ動画を撮る",
        [
          "むらいが論理的に盤面を説明し、ヒカキンが予定外の失敗と反応を生む。二人の違いが、どちらか一人では作れないテンポになった。",
          "コラボ後、攻略目的の視聴者の一部がヒカキンのほかの動画にも残る。"
        ],
        {
          stats: { subscribers: 190_000, money: 145_000, expression: 6, production: 3, trust: 3 },
          routes: { network: 5, mainstream: 3 },
          relationships: { murai: 10 },
          addFlags: ["ch2_murai_met", "ch2_murai_collab", "ch2_pazutora_collab"],
          video: {
            title: "パズトラの達人に初心者が全部聞いてみた",
            views: 3_800_000,
            subscribersGained: 190_000,
            kind: "pazutora-collab",
            chapter: 2
          }
        },
        { tone: "warm", subtext: "知識と素の反応を掛け合わせる" }
      ),
      choice(
        "ch2_s4_murai_keep_distance",
        "攻略の型に寄りすぎないよう、助言だけ受け取る",
        [
          "礼を言い、長期シリーズの誘いは断った。ゲームを数字だけで分析すれば、自分が遊んでいる楽しさまで消えそうだった。",
          "関係を閉じずに距離を保ち、得意な音と表情を中心に実況を続ける。"
        ],
        {
          stats: { production: 3, expression: 3, trust: 2 },
          hidden: { origin: 4 },
          routes: { craft: 2, stability: 1 },
          relationships: { murai: 4 },
          addFlags: ["ch2_murai_met", "ch2_murai_respected_distance", "ch2_independent_gaming"]
        },
        { tone: "bold", subtext: "学びつつ、自分の実況の中心を守る" }
      )
    ],
    when: when({ flagsAny: ["ch2_genre_gaming", "ch2_pazutora_beginner", "ch2_pazutora_researched"], flagsNone: ["ch2_pazutora_skipped"] }),
    priority: 32,
    oncePerRun: true,
    tags: ["gaming", "murai", "pazutora"],
    visual: {
      background: "bg/ch2_creator_small_event",
      portrait: "portrait/murai",
      expression: "analytical_smile",
      eventCg: "cg/ch2_murai_meeting",
      accent: "violet"
    }
  }),

  event({
    id: "ch2_s4_murai_challenges_numbers",
    chapter: 2,
    slot: 4,
    title: "攻略動画の一秒",
    date: "2011年",
    location: "動画投稿者向け小規模イベント",
    body: [
      "綿密にパズトラを研究してきたヒカキンの動画を、サックスむらいは途中で止めた。『ここ、正しいけど長いです』。知識量ではなく、視聴者が理解できる速度を指摘する。",
      "名前の由来を聞く隙もないほど、むらいは一秒単位で説明を分解していく。ヒカキンと同じ研究型でも、研究の向く先が違った。"
    ],
    speaker: "サックスむらい",
    quote: "全部知っている人より、必要な一つを今言える人の方が実況では強いです。",
    choices: [
      choice(
        "ch2_s4_murai_reedit",
        "その場で動画を半分の長さに編集し直す",
        [
          "重複した説明を切り、見せる盤面を三つに絞った。知識を失った気がしたが、完成版は驚くほど理解しやすい。",
          "蓄えた情報を全部出すのではなく、選ぶことが制作力だと学んだ。"
        ],
        {
          stats: { production: 7, expression: 3, energy: -5 },
          routes: { strategy: 6 },
          relationships: { murai: 8 },
          addFlags: ["ch2_murai_met", "ch2_murai_edit_lesson", "ch2_concise_explanations"]
        },
        { tone: "steady", subtext: "知識を捨て、伝わる情報だけを残す" }
      ),
      choice(
        "ch2_s4_murai_defend_depth",
        "長さにも意味があると、自分の構成を守る",
        [
          "初心者が途中で置いていかれないため、あえて基礎から話していると説明した。むらいは納得せずとも、目的が明確なら試す価値はあると認める。",
          "助言へ従うだけでなく、自分の意図を言葉にする力が育った。"
        ],
        {
          stats: { trust: 3, expression: 4, production: 2 },
          hidden: { ambition: 2 },
          routes: { craft: 3 },
          relationships: { murai: 4 },
          addFlags: ["ch2_murai_met", "ch2_longform_defended", "ch2_creator_intent_clear"]
        },
        { tone: "bold", subtext: "正解を借りず、自分の意図を説明する" }
      ),
      choice(
        "ch2_s4_murai_test_versions",
        "短い版と長い版を別々に試す",
        [
          "同じ題材を、短い攻略と詳しい解説に分けた。視聴者層は異なり、どちらにも残る人がいると分かる。",
          "議論を勝敗にせず、実験で確かめる二人の関係が始まった。"
        ],
        {
          stats: { subscribers: 115_000, production: 6, energy: -7 },
          routes: { strategy: 7 },
          relationships: { murai: 10 },
          addFlags: ["ch2_murai_met", "ch2_murai_ab_test", "ch2_gaming_formats_split"],
          video: {
            title: "パズトラ初心者向け・1分版と完全版",
            views: 2_200_000,
            subscribersGained: 115_000,
            kind: "pazutora-guide",
            chapter: 2
          }
        },
        { tone: "warm", subtext: "意見の違いを二つの動画で検証する" }
      )
    ],
    when: when({ flagsAny: ["ch2_pazutora_researched", "ch2_gaming_scripted"], minRoutes: { strategy: 8 } }),
    priority: 34,
    oncePerRun: true,
    tags: ["gaming", "murai", "strategy"],
    visual: {
      background: "bg/ch2_creator_editing_table",
      portrait: "portrait/murai",
      expression: "serious",
      eventCg: "cg/ch2_murai_pauses_video",
      accent: "blue"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 5: 幼なじみ・まっすおとの距離
  // ---------------------------------------------------------------------------
  event({
    id: "ch2_s5_massuo_phone_fallback",
    chapter: 2,
    slot: 5,
    title: "幼なじみからの着信",
    date: "2011年",
    location: "社員寮・帰宅途中",
    body: [
      "勤務後、幼なじみのまっすおから電話が来た。ヒカキンが売れ始めたのと同じ頃、彼も自分のチャンネルへ動画を出し、明るい話し方で少しずつ視聴者を増やしている。",
      "二人は別々に撮影し、別々に編集する個人YouTuberだ。友達であることと、同じ仕事をすることをどこまで混ぜるかは決まっていない。"
    ],
    speaker: "まっすお",
    quote: "今度さ、普通に遊ぼうよ。撮るかどうかは、その時決めればいいじゃん。",
    choices: [
      choice(
        "ch2_s5_massuo_play_no_camera",
        "カメラを持たず、普通に遊ぶ",
        [
          "久しぶりに再生数を確認せず食事をした。まっすおも投稿の悩みを話すが、最後は高校時代のどうでもいい話で笑う。",
          "動画にならない時間が、人気とは別の関係を守った。"
        ],
        {
          stats: { energy: 8, trust: 2 },
          hidden: { fatigue: -4, origin: 4 },
          routes: { stability: 2, network: 2 },
          relationships: { massuo: 8 },
          addFlags: ["ch2_massuo_private_friendship", "ch2_friendship_off_camera"]
        },
        { tone: "warm", subtext: "再生されない友人の時間を守る" }
      ),
      choice(
        "ch2_s5_massuo_small_collab",
        "遊びの最後に短いコラボを撮る",
        [
          "予定を固めず、二人で買った食べ物を自然に紹介した。作り込んだ動画とは違う空気が受け、まっすおのチャンネルにも視聴者が流れる。",
          "一緒に伸びる感覚は嬉しいが、今後も数字目的だと思われない線引きが必要になる。"
        ],
        {
          stats: { subscribers: 90_000, expression: 5, energy: 2 },
          routes: { network: 5, mainstream: 2 },
          relationships: { massuo: 9 },
          addFlags: ["ch2_massuo_collab", "ch2_massuo_growing_alongside"],
          video: {
            title: "幼なじみと東京で普通に遊んだ日",
            views: 1_700_000,
            subscribersGained: 90_000,
            kind: "friend-collab",
            chapter: 2
          }
        },
        { tone: "warm", subtext: "友達らしさを壊さない小さな共演" }
      ),
      choice(
        "ch2_s5_massuo_decline_busy",
        "次の動画を優先し、今回は断る",
        [
          "撮影予定が詰まっていると正直に伝えた。まっすおは明るく了承するが、電話を切った後の沈黙が少し長い。",
          "成長速度は守れた。友人に使える時間は、成功するほど意識して残さなければ消える。"
        ],
        {
          stats: { production: 4, subscribers: 35_000, energy: -3 },
          hidden: { ambition: 3 },
          routes: { craft: 2, strategy: 1 },
          relationships: { massuo: -3 },
          addFlags: ["ch2_massuo_declined", "ch2_success_time_cost"]
        },
        { tone: "steady", subtext: "制作速度を守るが、友人との時間を失う" }
      )
    ],
    priority: 0,
    oncePerRun: true,
    tags: ["massuo", "friendship", "boundary"],
    visual: {
      background: "bg/ch2_station_phone_night",
      portrait: "portrait/hikakin_rising",
      expression: "soft_smile",
      accent: "green"
    }
  }),

  event({
    id: "ch2_s5_massuo_collab_growth",
    chapter: 2,
    slot: 5,
    title: "同じ坂を別々に上る",
    date: "2011年",
    location: "レンタル撮影室",
    body: [
      "ヒカキンが伸び始めた時期に、まっすおの明るい日常動画も少しずつ見られるようになった。二人の登録者数には差があるが、どちらも無名だったころから同じ時代を上っている。",
      "コラボの提案には、『幼なじみを売名に使うな』という反応も予想される。どちらを主役にするかで、友情にも視聴者の見方にも違いが出る。"
    ],
    choices: [
      choice(
        "ch2_s5_massuo_feature_him",
        "まっすおの得意な日常企画を主役にする",
        [
          "ヒカキンは進行を譲り、まっすおの自然な明るさが出る題材を選んだ。自分の動画としては数字が少し弱いが、相手のチャンネルへ確かな視聴者が残る。",
          "助けたのではなく、相手の強みを見つけた経験が、後のプロデュース能力の種になる。"
        ],
        {
          stats: { subscribers: 65_000, production: 6, trust: 6, expression: 2 },
          routes: { network: 6 },
          relationships: { massuo: 12 },
          addFlags: ["ch2_massuo_collab", "ch2_massuo_featured", "ch2_producer_seed"]
        },
        { tone: "warm", subtext: "自分より、幼なじみの魅力を引き出す" }
      ),
      choice(
        "ch2_s5_massuo_equal_channels",
        "同じ企画を各自のチャンネルで別視点にする",
        [
          "撮影は一緒でも、編集と語り口は別々にした。同じ出来事が二本の違う動画になり、互いの視聴者が行き来する。",
          "一つのグループにはならず、独立した個人同士で協力する形が定まった。"
        ],
        {
          stats: { subscribers: 105_000, production: 4, trust: 4 },
          routes: { network: 5, strategy: 2 },
          relationships: { massuo: 10 },
          addFlags: ["ch2_massuo_collab", "ch2_massuo_independent_equals", "ch2_separate_channels_clear"]
        },
        { tone: "steady", subtext: "友達でもチャンネルは別という形を守る" }
      ),
      choice(
        "ch2_s5_massuo_use_hit_format",
        "ヒットしたゲーム音楽企画へ出演してもらう",
        [
          "知名度の高い形式へまっすおを呼び、リアクション役を任せた。動画は大きく伸び、彼の登録者も一気に増える。",
          "成功はしたが、まっすお自身の力かヒカキンの隣だからかという疑問を、本人の中へ残す可能性もある。"
        ],
        {
          stats: { subscribers: 150_000, money: 110_000, expression: 4 },
          hidden: { ambition: 3 },
          routes: { network: 4, strategy: 3 },
          relationships: { massuo: 6 },
          addFlags: ["ch2_massuo_collab", "ch2_massuo_hit_boost", "ch2_massuo_comparison_seed"],
          video: {
            title: "幼なじみはゲーム効果音だけで内容を当てられるか",
            views: 3_200_000,
            subscribersGained: 150_000,
            kind: "friend-game-collab",
            chapter: 2
          }
        },
        { tone: "risky", subtext: "二人とも伸びるが、比較の影を残す" }
      )
    ],
    when: when({
      minRelationships: { massuo: 15 },
      minRoutes: { network: 4 },
      flagsAny: [
        "ch2_genre_product",
        "ch2_genre_gaming",
        "ch2_genre_variety",
        "ch2_domestic_self_intro"
      ]
    }),
    priority: 30,
    oncePerRun: true,
    tags: ["massuo", "collab", "growth"],
    visual: {
      background: "bg/ch2_small_rental_studio",
      portrait: "portrait/massuo_early",
      expression: "bright_smile",
      eventCg: "cg/ch2_massuo_collab_setup",
      accent: "green"
    }
  }),

  event({
    id: "ch2_s5_massuo_boundary",
    chapter: 2,
    slot: 5,
    title: "友達を企画にする前に",
    date: "2011年",
    location: "都内の食堂",
    body: [
      "幼なじみのまっすおと食事中、ヒカキンは面白い会話が出るたび『今の撮りたかった』と思う自分に気づいた。友達との時間まで、無意識に素材として見始めている。",
      "二人で最初の本格的なコラボを考える前に、まっすおは笑いながらも『カメラを回す時は先に言ってほしい』と伝えた。小さな頼みだが、人気が大きくなるほど重要な境界になる。"
    ],
    choices: [
      choice(
        "ch2_s5_boundary_promise",
        "私生活では許可なく撮らないと約束する",
        [
          "携帯電話を鞄へしまい、撮影のない食事を続けた。企画にしたい時は、翌日改めて相談すると決める。",
          "面白い瞬間を一つ逃しても、長く本音を話せる友人を守る方が大きいと考えた。"
        ],
        {
          stats: { trust: 6, energy: 4 },
          hidden: { origin: 4, controversy: -2 },
          routes: { stability: 2, network: 2 },
          relationships: { massuo: 10 },
          addFlags: ["ch2_massuo_boundary_respected", "ch2_private_camera_rule"]
        },
        { tone: "warm", subtext: "一つの映像より本音を言える関係を守る" }
      ),
      choice(
        "ch2_s5_boundary_content_days",
        "撮影日と遊ぶ日を最初から分ける",
        [
          "予定表へ撮影と私用を別の色で入れた。撮影日は互いに企画へ集中し、遊ぶ日は数字の話もなるべくしない。",
          "友情と仕事を感覚でなく運用で分ける、二人なりの方法ができた。"
        ],
        {
          stats: { production: 3, trust: 5, energy: 2 },
          routes: { strategy: 3, network: 2 },
          relationships: { massuo: 8 },
          addFlags: ["ch2_massuo_boundary_respected", "ch2_friend_content_schedule"]
        },
        { tone: "steady", subtext: "友情を守る仕組みを予定へ入れる" }
      ),
      choice(
        "ch2_s5_boundary_keep_spontaneous",
        "自然な瞬間こそ動画になると説得する",
        [
          "撮られて困る時だけ言ってほしいと提案した。まっすおは完全には納得しないが、その場では笑って流す。",
          "自然な映像は増えるかもしれない。その代わり、相手が断る責任を背負う関係になった。"
        ],
        {
          stats: { expression: 3, trust: -4 },
          hidden: { controversy: 4, ambition: 2 },
          routes: { mainstream: 2 },
          relationships: { massuo: -7 },
          addFlags: ["ch2_massuo_boundary_blurred", "ch2_private_content_risk"]
        },
        { tone: "risky", subtext: "自然さを得る代わりに相手へ断る負担を置く" }
      )
    ],
    when: when({
      minRelationships: { massuo: 15 },
      flagsAny: [
        "ch2_postviral_analysis",
        "ch2_hit_components_mapped",
        "ch2_audience_map",
        "ch2_personality_visible"
      ]
    }),
    priority: 28,
    oncePerRun: true,
    tags: ["massuo", "friendship", "privacy"],
    visual: {
      background: "bg/ch2_casual_restaurant",
      portrait: "portrait/massuo_early",
      expression: "gentle_serious",
      eventCg: "cg/ch2_phone_face_down",
      accent: "blue"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 6: ダンケとの初対面
  // ---------------------------------------------------------------------------
  event({
    id: "ch2_s6_danke_meet_fallback",
    chapter: 2,
    slot: 6,
    title: "PDF合同会社の人",
    date: "2011年",
    location: "動画投稿者の小規模交流会",
    body: [
      "互いに少し名前が知られ始めたころ、ヒカキンは動画投稿者の小さな交流会でダンケと初めて会った。二人はそれまで知り合いではない。",
      "日本とイギリスのハーフで筋肉質な彼は、個人チャンネルを『PDF合同会社』と名乗っている。後に友人となる三人の中では、ダンケが最も早く小さな注目を得ていた。チャンネル名の理由を聞いても、『覚えたなら勝ち』としか答えない。",
      "ダンケはゲーム音楽動画を褒めた後、『途中の一音、少し違わない？』と遠慮なく指摘した。"
    ],
    speaker: "ダンケ",
    quote: "有名な一本より、次に何をやる人なのかが気になる。",
    choices: [
      choice(
        "ch2_s6_danke_accept_critique",
        "間違いを一緒に聞き直す",
        [
          "二人でイヤホンを片方ずつ使い、問題の一秒を何度も再生した。結論は出ないが、ダンケが名前ではなく動画を細かく見ていることは分かる。",
          "遠慮のない批評を言い合える投稿者仲間として、友人関係の入口ができた。"
        ],
        {
          stats: { beatbox: 2, production: 3, trust: 2 },
          routes: { network: 4, craft: 1 },
          relationships: { danke: 9 },
          addFlags: ["ch2_danke_met", "ch2_danke_honest_critique"]
        },
        { tone: "warm", subtext: "称賛より厳しい一秒を共有する" }
      ),
      choice(
        "ch2_s6_danke_ask_channel",
        "PDF合同会社の動画を見せてもらう",
        [
          "筋力企画と海外文化紹介が混在し、整ってはいないが行動の速さがある。ヒカキンは編集の改善点を伝え、ダンケは考えすぎて遅いと返す。",
          "違う強みを持つ二人が、互いの欠点も見える距離へ近づいた。"
        ],
        {
          stats: { production: 4, expression: 2 },
          routes: { network: 5 },
          relationships: { danke: 10 },
          addFlags: ["ch2_danke_met", "ch2_danke_mutual_feedback", "ch2_danke_friend_seed"]
        },
        { tone: "warm", subtext: "相手の個人チャンネルも同じ熱量で見る" }
      ),
      choice(
        "ch2_s6_danke_exchange_contacts",
        "連絡先だけ交換し、今日は深く組まない",
        [
          "互いの活動を続けながら、面白い案があれば連絡すると決めた。すぐに三人組や共同チャンネルを作る話にはならない。",
          "独立した個人同士の距離を保ったまま、後で自然に遊びやコラボができる関係が残った。"
        ],
        {
          stats: { trust: 2, energy: 2 },
          routes: { network: 2, stability: 1 },
          relationships: { danke: 5 },
          addFlags: ["ch2_danke_met", "ch2_danke_contacts", "ch2_independent_creators"]
        },
        { tone: "steady", subtext: "急いで組まず、独立した友人として始める" }
      )
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["danke", "first-meeting", "creator"],
    visual: {
      background: "bg/ch2_creator_meetup",
      portrait: "portrait/danke_early",
      expression: "confident_grin",
      eventCg: "cg/ch2_danke_first_meeting",
      accent: "violet"
    }
  }),

  event({
    id: "ch2_s6_danke_global_bridge",
    chapter: 2,
    slot: 6,
    title: "英語の向こうの冗談",
    date: "2011年",
    location: "動画投稿者の小規模交流会",
    body: [
      "海外向け企画の相談相手を探していたヒカキンは、『PDF合同会社』で二人より一足早く小さな注目を得ていたダンケを紹介された。ヒカキンやまっすおとの旧知ではなく、二人が会うのはこの日が初めてだった。",
      "ダンケは英訳自体より、日本語では笑える間が英語圏では説明不足になる点を指摘した。字幕を付ければ同じ動画になるわけではない。",
      "ヒカキンの世界的ヒットと、ダンケの海外文化という別々の強みが、初対面の机で交差する。"
    ],
    choices: [
      choice(
        "ch2_s6_danke_rewrite_global",
        "海外向け部分を一緒に構成から書き直す",
        [
          "字幕の翻訳だけでなく、説明の順番と冗談の見せ方まで変えた。国内版とは別の編集になるが、海外コメントの理解度が上がる。",
          "ダンケを便利な翻訳役ではなく、企画を作る一人として扱ったことで信頼が生まれた。"
        ],
        {
          stats: { subscribers: 130_000, production: 6, trust: 5, energy: -5 },
          routes: { network: 5, strategy: 3 },
          relationships: { danke: 12 },
          addFlags: ["ch2_danke_met", "ch2_danke_global_partner", "ch2_global_format_adapted"],
          video: {
            title: "日本の変な商品を日英で本気レビュー",
            views: 2_700_000,
            subscribersGained: 130_000,
            kind: "global-collab",
            chapter: 2
          }
        },
        { tone: "warm", subtext: "翻訳ではなく共同企画として頼る" }
      ),
      choice(
        "ch2_s6_danke_subtitle_check",
        "字幕の確認だけ頼み、動画は一人で作る",
        [
          "誤解される表現だけをダンケに直してもらい、撮影と編集は自分で行った。彼も自分の動画へ戻る。",
          "必要な部分だけ助け合い、互いの個人活動を中心にする距離が定まった。"
        ],
        {
          stats: { production: 4, trust: 3 },
          routes: { strategy: 3, network: 2 },
          relationships: { danke: 7 },
          addFlags: ["ch2_danke_met", "ch2_danke_subtitle_help", "ch2_independent_creators"]
        },
        { tone: "steady", subtext: "助け合っても制作の主語は各自に置く" }
      ),
      choice(
        "ch2_s6_danke_trade_lessons",
        "英語の代わりに編集を教える",
        [
          "ダンケは題名と字幕を直し、ヒカキンは彼の動画から長い部分を切る方法を見せた。金ではなく、互いの得意を交換する。",
          "仕事の契約より先に、対等な投稿者仲間として関係が始まった。"
        ],
        {
          stats: { production: 5, expression: 1, trust: 4 },
          routes: { network: 6 },
          relationships: { danke: 11 },
          addFlags: ["ch2_danke_met", "ch2_danke_skill_trade", "ch2_danke_friend_seed", "ch2_producer_seed"]
        },
        { tone: "warm", subtext: "得意を対等に交換する" }
      )
    ],
    when: when({ flagsAny: ["ch1_viral_global", "ch2_global_continued", "ch2_bilingual_series"], minRoutes: { network: 2 } }),
    mandatory: true,
    priority: 32,
    oncePerRun: true,
    tags: ["danke", "first-meeting", "global"],
    visual: {
      background: "bg/ch2_creator_meetup",
      portrait: "portrait/danke_early",
      expression: "thoughtful_grin",
      eventCg: "cg/ch2_danke_subtitle_notes",
      accent: "violet"
    }
  }),

  event({
    id: "ch2_s6_danke_physical_collab",
    chapter: 2,
    slot: 6,
    title: "音と筋肉の初対面",
    date: "2011年",
    location: "動画投稿者の小規模交流会",
    body: [
      "交流会で、筋肉質なダンケが重い撮影機材を一人で運んでいるのが目に入った。『PDF合同会社』という個人チャンネルで体当たり企画を出し、後に友人となる三人の中では最も早く小さな注目を得ている。",
      "ヒカキンとまっすおの知人ではなく、この日が初対面だ。ダンケは挨拶の直後、ビートの速さに合わせて筋力種目をする企画を提案した。"
    ],
    speaker: "ダンケ",
    quote: "君が音を止めたら、俺も動きを止める。単純だけど映像になるだろ？",
    choices: [
      choice(
        "ch2_s6_danke_try_collab",
        "その場で短い試作品を撮る",
        [
          "ビートが速くなるほどダンケの動きが崩れ、最後は二人とも笑って終わった。技術も筋力も本物なのに、失敗が一番面白い。",
          "計画しすぎない行動力を学び、後日正式なコラボをする約束ができた。"
        ],
        {
          stats: { subscribers: 115_000, expression: 6, production: 3, energy: -4 },
          routes: { network: 5, mainstream: 2 },
          relationships: { danke: 11 },
          addFlags: ["ch2_danke_met", "ch2_danke_physical_collab", "ch2_spontaneous_collab"],
          video: {
            title: "ビートが速いほど筋トレも速くなる",
            views: 2_200_000,
            subscribersGained: 115_000,
            kind: "physical-collab",
            chapter: 2
          }
        },
        { tone: "bold", subtext: "完璧な準備なしで相性を試す" }
      ),
      choice(
        "ch2_s6_danke_plan_safe",
        "安全と構成を決めてから後日撮る",
        [
          "負荷、時間、止める合図を紙へ書き、無茶をしない範囲へ企画を調整した。ダンケは慎重すぎると笑うが、約束には従う。",
          "行動力を借りつつ、事故を面白さの条件にしない共同制作が始まった。"
        ],
        {
          stats: { production: 5, trust: 5, energy: -2 },
          routes: { network: 4, strategy: 2 },
          relationships: { danke: 9 },
          addFlags: ["ch2_danke_met", "ch2_danke_safe_collab", "ch2_safety_planning_seed"]
        },
        { tone: "steady", subtext: "勢いを残しながら安全を設計する" }
      ),
      choice(
        "ch2_s6_danke_just_talk",
        "今日は企画にせず、互いの活動を話す",
        [
          "撮影せず、なぜ動画を始めたか、何が伸びなかったかを話した。ダンケは最初に少し注目された時の孤独も率直に語る。",
          "動画にならない会話から、成功の速さを競わない友人関係が始まった。"
        ],
        {
          stats: { energy: 5, trust: 3 },
          hidden: { origin: 4 },
          routes: { network: 4 },
          relationships: { danke: 10 },
          addFlags: ["ch2_danke_met", "ch2_danke_friend_seed", "ch2_danke_off_camera_start"]
        },
        { tone: "warm", subtext: "最初の出会いを動画にせず友人になる" }
      )
    ],
    when: when({ flagsAny: ["ch2_genre_variety", "ch2_food_challenge", "ch2_goal_entertain"], minStats: { expression: 18 } }),
    mandatory: true,
    priority: 30,
    oncePerRun: true,
    tags: ["danke", "first-meeting", "challenge"],
    visual: {
      background: "bg/ch2_creator_meetup",
      portrait: "portrait/danke_early",
      expression: "energetic_grin",
      eventCg: "cg/ch2_danke_strength_pitch",
      accent: "red"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 7: 一人制作の限界
  // ---------------------------------------------------------------------------
  event({
    id: "ch2_s7_one_person_limit_fallback",
    chapter: 2,
    slot: 7,
    title: "一人分しかない二十四時間",
    date: "2012年",
    location: "社員寮・自室",
    body: [
      "企画、買い出し、撮影、編集、字幕、コメント確認。動画の種類が増えるほど、一人で行う作業も増えた。人気が上がったのに、投稿までの時間は以前より長い。",
      "自分の手で全部作るからこそ個性が残る。だが一本へ全時間を使えば、生活も次の企画も止まる。"
    ],
    choices: [
      choice(
        "ch2_s7_limit_keep_all",
        "すべて一人で作り続ける",
        [
          "編集を他人へ任せる想像ができず、睡眠時間を削って全工程を抱えた。細部まで自分の判断で揃う。",
          "動画の密度は上がるが、疲労と投稿間隔も増える。後に大きなチームを持つかどうかへ影響する選択になった。"
        ],
        {
          stats: { production: 6, beatbox: 2, energy: -12 },
          hidden: { fatigue: 8, perfectionism: 3 },
          routes: { craft: 6 },
          addFlags: ["ch2_solo_production_kept", "ch2_workload_warning", "ch2_creator_control_high"]
        },
        { tone: "risky", subtext: "個性を完全に守り、体力を差し出す" }
      ),
      choice(
        "ch2_s7_limit_templates",
        "編集の型を作り、迷う時間を減らす",
        [
          "冒頭、字幕、音量、公開確認を手順書へした。毎回新しく考えなくても一定の品質を出せる。",
          "一人制作は続けながら、努力を根性ではなく仕組みに変えた。"
        ],
        {
          stats: { production: 7, energy: 3 },
          hidden: { fatigue: -3, perfectionism: -1 },
          routes: { strategy: 6 },
          addFlags: ["ch2_editing_templates", "ch2_solo_systemized"]
        },
        { tone: "steady", subtext: "一人のまま、工程を再利用可能にする" }
      ),
      choice(
        "ch2_s7_limit_test_editor",
        "一本だけ、編集協力を頼んでみる",
        [
          "信頼できる編集者へ素材と意図を渡した。完成版には自分なら残さない間があり、同時に自分では思いつかないテンポもある。",
          "全面的には任せなくても、他人へ狙いを伝える新しい制作力が必要だと分かった。"
        ],
        {
          stats: { money: -70_000, production: 6, energy: 8, trust: 2 },
          routes: { network: 4, strategy: 2 },
          relationships: { manager: 5 },
          addFlags: ["ch2_editor_trial", "ch2_delegation_seed", "ch2_producer_seed"]
        },
        { tone: "bold", subtext: "費用を払い、他人へ意図を伝える練習をする" }
      )
    ],
    priority: 0,
    oncePerRun: true,
    tags: ["production", "workload", "solo"],
    visual: {
      background: "bg/ch2_dorm_editing_clutter",
      portrait: "portrait/hikakin_rising",
      expression: "exhausted",
      eventCg: "cg/ch2_one_person_tasks",
      accent: "blue"
    }
  }),

  event({
    id: "ch2_s7_perfection_deadline",
    chapter: 2,
    slot: 7,
    title: "公開日を三度消す",
    date: "2012年",
    location: "社員寮・自室",
    body: [
      "新しい大型動画の公開日を、ヒカキンは三度延期した。視聴者は最初こそ待ってくれたが、三度目には『また完成しないのか』という声が増える。",
      "修正するたび作品は良くなる。しかし完成させない限り、誰にも届かない。完璧主義を捨てるのではなく、終わらせる規則が必要だった。"
    ],
    choices: [
      choice(
        "ch2_s7_deadline_lock",
        "次の公開日時を宣言し、絶対に動かさない",
        [
          "残り時間から逆算し、直す項目を三つに絞った。公開後に小さなミスは見つかったが、約束した時刻に視聴者と見られる。",
          "品質だけでなく、待つ人との約束も完成度の一部だと覚えた。"
        ],
        {
          stats: { production: 5, trust: 6, energy: -5 },
          hidden: { perfectionism: -4 },
          routes: { strategy: 5 },
          addFlags: ["ch2_public_deadline_kept", "ch2_perfection_managed"]
        },
        { tone: "steady", subtext: "約束を完成の条件へ入れる" }
      ),
      choice(
        "ch2_s7_deadline_no_announce",
        "今後は完成するまで公開日を言わない",
        [
          "制作中の予告をやめ、完成した時だけ知らせることにした。期待を裏切る回数は減るが、投稿間隔はさらに読めなくなる。",
          "職人としての自由は守られ、日常的に待ってもらう関係は弱くなった。"
        ],
        {
          stats: { production: 4, beatbox: 3, trust: -1, energy: 2 },
          hidden: { perfectionism: 4 },
          routes: { craft: 5 },
          addFlags: ["ch2_no_release_promises", "ch2_slow_masterpieces"]
        },
        { tone: "bold", subtext: "約束を減らし、作品の時間を守る" }
      ),
      choice(
        "ch2_s7_deadline_show_unfinished",
        "未完成の理由と途中映像を公開する",
        [
          "言い訳ではなく、どこで詰まったかを画面で見せた。視聴者から解決案が集まり、一本の制作過程自体が別動画になる。",
          "失敗を隠す負担が減り、完成までを共有する関係ができた。"
        ],
        {
          stats: { subscribers: 75_000, expression: 5, trust: 5, production: 3 },
          hidden: { perfectionism: -2, origin: 3 },
          routes: { network: 4, mainstream: 2 },
          addFlags: ["ch2_unfinished_shared", "ch2_audience_in_process"]
        },
        { tone: "warm", subtext: "遅れを隠さず、制作過程へ変える" }
      )
    ],
    when: when({ minHidden: { perfectionism: 70 }, flagsAny: ["ch2_slow_masterpieces", "ch2_quality_consistent", "ch2_technical_escalation"] }),
    priority: 30,
    oncePerRun: true,
    tags: ["production", "perfectionism", "deadline"],
    visual: {
      background: "bg/ch2_dorm_calendar_crossed",
      portrait: "portrait/hikakin_rising",
      expression: "strained",
      eventCg: "cg/ch2_three_delays",
      accent: "red"
    }
  }),

  event({
    id: "ch2_s7_collab_not_group",
    chapter: 2,
    slot: 7,
    title: "一緒に撮っても、一人で帰る",
    date: "2012年",
    location: "撮影後の駅前",
    body: [
      "まっすおやダンケとの撮影が増えても、三人は固定グループではない。撮影が終われば、それぞれ自分の家へ戻り、自分の素材を一人で編集する。",
      "視聴者から共同チャンネルを望む声もある。始めれば投稿量も話題も増えるかもしれないが、三人の人生を一つの看板へ縛ることになる。"
    ],
    choices: [
      choice(
        "ch2_s7_no_joint_channel",
        "共同チャンネルは作らないと決める",
        [
          "一緒に撮りたい時だけ集まり、活動の責任は各自で持つと三人で確認した。視聴者には少し物足りなくても、友情へ運営義務を乗せない。",
          "個人YouTuberとしてのヒカキンを中心に、友人とのコラボだけが自然に残った。"
        ],
        {
          stats: { trust: 5, production: 2, energy: 3 },
          hidden: { origin: 4 },
          routes: { stability: 3, network: 2 },
          relationships: { massuo: 5, danke: 5 },
          addFlags: ["ch2_no_joint_channel", "ch2_independent_creators", "ch2_friendships_preserved"]
        },
        { tone: "steady", subtext: "友情へ共同運営の義務を足さない" }
      ),
      choice(
        "ch2_s7_recurring_collab",
        "季節ごとに一度だけ三人で撮る",
        [
          "固定グループではなく、年に数回集まる特別企画にした。普段は各自の活動があるからこそ、集まる回に変化が出る。",
          "共同生活のような近さではなく、独立した友人の再会としてコラボが定着した。"
        ],
        {
          stats: { subscribers: 100_000, expression: 4, energy: -2 },
          routes: { network: 5, mainstream: 1 },
          relationships: { massuo: 7, danke: 7 },
          addFlags: ["ch2_seasonal_friend_collab", "ch2_independent_creators"],
          video: {
            title: "久しぶりに三人で遊んだら企画になった",
            views: 2_000_000,
            subscribersGained: 100_000,
            kind: "occasional-friend-collab",
            chapter: 2
          }
        },
        { tone: "warm", subtext: "個人活動を中心に、特別な時だけ集まる" }
      ),
      choice(
        "ch2_s7_joint_special_only",
        "大型企画だけ、制作チームとして協力する",
        [
          "常設の看板は作らず、必要な企画ごとに役割を決めた。ダンケは行動、まっすおは自然な進行、ヒカキンは構成と音を担当する。",
          "組めば強いことを知りつつ、解散できる形にして個人の自由を守った。"
        ],
        {
          stats: { production: 6, expression: 3, subscribers: 80_000, energy: -3 },
          routes: { network: 6, strategy: 2 },
          relationships: { massuo: 5, danke: 5 },
          addFlags: ["ch2_project_based_team", "ch2_independent_creators", "ch2_delegation_seed"]
        },
        { tone: "bold", subtext: "企画の時だけ強みを組み合わせる" }
      )
    ],
    when: when({ flagsAll: ["ch2_danke_met"], flagsAny: ["ch2_massuo_collab", "ch2_massuo_private_friendship"], minRoutes: { network: 5 } }),
    priority: 28,
    oncePerRun: true,
    tags: ["production", "friends", "independence"],
    visual: {
      background: "bg/ch2_station_after_filming",
      portrait: "portrait/hikakin_rising",
      expression: "content_tired",
      eventCg: "cg/ch2_friends_go_separate_ways",
      accent: "green"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 8: スーパーを辞めるか
  // ---------------------------------------------------------------------------
  event({
    id: "ch2_s8_supermarket_crossroads_fallback",
    chapter: 2,
    slot: 8,
    title: "制服を脱ぐ日を決める",
    date: "2012年",
    location: "スーパー社員寮・自室",
    body: [
      "動画収益がスーパーの給料を上回る月が出てきた。一方、翌月も同じ額になる保証はなく、退職すれば社員寮も出なければならない。",
      "勤務を続ければ生活は守れるが、投稿の速度と規模には限界がある。辞めることは夢への勇気にも、成功に浮かれた賭けにもなり得た。"
    ],
    choices: [
      choice(
        "ch2_s8_quit_now",
        "今、退職して動画へ集中する",
        [
          "上司へ退職を申し出て、引き継ぎと社員寮を出る日を決めた。新しい部屋の初期費用で貯金は大きく減る。",
          "初めて朝から撮影できる日、自由の大きさと収入が止まる怖さを同時に感じた。"
        ],
        {
          stats: { money: -350_000, energy: 18, production: 5 },
          hidden: { ambition: 8, fatigue: -4 },
          routes: { mainstream: 3, craft: 2 },
          relationships: { supermarket: -2 },
          addFlags: ["ch2_left_supermarket_early", "ch2_moved_from_dorm", "ch2_fulltime_creator", "ch2_housing_paid"]
        },
        { tone: "risky", subtext: "一日のすべてを得る代わりに給料と寮を失う" }
      ),
      choice(
        "ch2_s8_keep_job",
        "収益が一年安定するまで続ける",
        [
          "どれほど忙しくても、給与明細を安全網として残した。投稿は遅れるが、再生数が落ちた月も生活は揺れない。",
          "慎重さは成長を遅らせる。それでも焦りで作る動画を減らし、断る自由を守った。"
        ],
        {
          stats: { money: 180_000, energy: -9, trust: 3 },
          hidden: { fatigue: 5, ambition: -1 },
          routes: { stability: 7 },
          relationships: { supermarket: 5 },
          addFlags: ["ch2_kept_supermarket", "ch2_dual_life_continues", "ch2_income_patience"]
        },
        { tone: "steady", subtext: "成長速度を譲り、選べる生活を残す" }
      ),
      choice(
        "ch2_s8_negotiate_parttime",
        "勤務日数を減らせないか交渉する",
        [
          "週の勤務を半分にし、給料と寮の条件も見直した。完全な自由ではないが、まとまった撮影日を得る。",
          "辞めるか残るかの二択にせず、動画の成長に合わせて生活も段階的に変えた。"
        ],
        {
          stats: { money: 60_000, energy: 10, production: 4, trust: 3 },
          hidden: { fatigue: -2 },
          routes: { stability: 5, strategy: 3 },
          relationships: { supermarket: 4 },
          addFlags: ["ch2_parttime_supermarket", "ch2_gradual_fulltime"]
        },
        { tone: "warm", subtext: "給料を一部残し、制作日を増やす" }
      )
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["supermarket", "career", "housing"],
    visual: {
      background: "bg/ch2_dorm_uniform_hanging",
      portrait: "portrait/hikakin_rising",
      expression: "conflicted",
      eventCg: "cg/ch2_uniform_and_camera",
      accent: "gold"
    }
  }),

  event({
    id: "ch2_s8_responsible_exit",
    chapter: 2,
    slot: 8,
    title: "最後の品出し",
    date: "2012年",
    location: "スーパーマーケット",
    body: [
      "半年前に上司と決めた条件をすべて満たした。動画収益は連続して給料を上回り、貯金も引っ越し費用もあり、担当売り場の引き継ぎも終わっている。",
      "最後の勤務日、同僚たちは小さな寄せ書きを渡してくれた。浴室の騒音を注意されたころから知る人もいる。制服を脱ぐことは、過去を捨てることではなかった。"
    ],
    speaker: "スーパーの上司",
    quote: "戻る場所を残すためじゃない。戻らなくていいように、ちゃんとやってこい。",
    choices: [
      choice(
        "ch2_s8_exit_thank_everyone",
        "一人ずつ礼を言い、静かに退職する",
        [
          "動画にはせず、休憩室で一人ずつ頭を下げた。最初の観客や、空腹の時に助けてくれた先輩の顔がある。",
          "専業YouTuberへの出発を、再生数ではなく支えられた時間と一緒に迎えた。"
        ],
        {
          stats: { money: -220_000, energy: 16, trust: 9 },
          hidden: { origin: 9, fatigue: -5 },
          routes: { network: 3, stability: 3 },
          relationships: { supermarket: 12 },
          addFlags: ["ch2_left_supermarket_responsibly", "ch2_moved_from_dorm", "ch2_fulltime_creator", "ch2_supermarket_bonds_kept"]
        },
        { tone: "warm", subtext: "退職をコンテンツにせず、人へ返す" }
      ),
      choice(
        "ch2_s8_exit_document_room",
        "許可を得て、社員寮の自室だけ記録する",
        [
          "職場や同僚を映さず、空になった六畳間と浴室を撮った。安いマイクを置いた位置、壁へ貼った紙を一つずつ話す。",
          "成功の自慢ではなく、何もなかった場所の記録として視聴者へ残した。後の原点回帰に使える映像になる。"
        ],
        {
          stats: { subscribers: 120_000, money: -230_000, expression: 5, trust: 7, production: 3, energy: 12 },
          hidden: { origin: 10, fatigue: -4 },
          routes: { mainstream: 3, craft: 2 },
          relationships: { supermarket: 10 },
          addFlags: ["ch2_left_supermarket_responsibly", "ch2_moved_from_dorm", "ch2_fulltime_creator", "ch2_dorm_archive_video"],
          video: {
            title: "この部屋から始まりました",
            views: 2_500_000,
            subscribersGained: 120_000,
            kind: "origin-documentary",
            chapter: 2
          }
        },
        { tone: "warm", subtext: "許可を取り、原点の場所だけを記録する" }
      ),
      choice(
        "ch2_s8_exit_promise_return",
        "成功したら客として戻ると約束する",
        [
          "大げさな恩返しは言わず、いつか普通に買い物へ来ると話した。上司は、有名になっても通路を塞ぐなと笑う。",
          "成功後も日常へ帰れる関係を残し、社員寮の鍵を返した。"
        ],
        {
          stats: { money: -210_000, energy: 18, trust: 8 },
          hidden: { origin: 8, fatigue: -5 },
          routes: { stability: 3, network: 2 },
          relationships: { supermarket: 11 },
          addFlags: ["ch2_left_supermarket_responsibly", "ch2_moved_from_dorm", "ch2_fulltime_creator", "ch2_return_as_customer_promise"]
        },
        { tone: "warm", subtext: "華やかな恩返しより、戻れる日常を残す" }
      )
    ],
    when: when({ flagsAny: ["ch2_exit_conditions_set", "ch2_responsible_exit_seed"], minStats: { money: 300_000 }, minRelationships: { supermarket: 10 } }),
    mandatory: true,
    priority: 35,
    oncePerRun: true,
    tags: ["supermarket", "career", "responsible-exit"],
    visual: {
      background: "bg/ch2_supermarket_last_shift",
      portrait: "portrait/hikakin_uniform",
      expression: "tearful_smile",
      eventCg: "cg/ch2_last_stocking_shift",
      accent: "green"
    }
  }),

  event({
    id: "ch2_s8_housing_crisis",
    chapter: 2,
    slot: 8,
    title: "寮の鍵と残高",
    date: "2012年",
    location: "スーパー社員寮・自室",
    body: [
      "勢いで退職を申し出た後、社員寮を出る期限が通知された。新居の初期費用を払えば、再生数が落ちた月の生活費はほとんど残らない。",
      "専業化を撤回して頭を下げることも、安い部屋へ移って賭けを続けることもできる。大ヒットがあっても、生活は自動では守られない。"
    ],
    choices: [
      choice(
        "ch2_s8_crisis_cheap_room",
        "郊外の狭い部屋へ移り、専業を続ける",
        [
          "撮影音を出せるかだけを確認し、駅から遠い部屋を契約した。家具を買わず、段ボールを机にして編集する。",
          "生活水準は落ちたが、一日を動画へ使える。失敗すれば戻る余裕はほとんどない。"
        ],
        {
          stats: { money: -180_000, energy: 8, production: 3 },
          hidden: { ambition: 9, fatigue: 1 },
          routes: { craft: 3, mainstream: 2 },
          relationships: { supermarket: -2 },
          addFlags: ["ch2_left_supermarket_early", "ch2_fulltime_creator", "ch2_cheap_room", "ch2_financial_risk_high"]
        },
        { tone: "risky", subtext: "生活を最小化し、動画へ賭け続ける" }
      ),
      choice(
        "ch2_s8_crisis_withdraw_resignation",
        "上司へ謝り、退職を撤回できないか頼む",
        [
          "見通しが甘かったと認めると、勤務条件は以前より厳しくなるが残る道を与えられた。恥ずかしさより、立て直す時間を選ぶ。",
          "動画の勢いは落ちる。それでも失敗を認めて戻る力が、最悪の転落を防いだ。"
        ],
        {
          stats: { money: 100_000, energy: -8, trust: 2 },
          hidden: { ambition: -4, controversy: -1 },
          routes: { stability: 7 },
          relationships: { supermarket: 3 },
          addFlags: ["ch2_resignation_withdrawn", "ch2_kept_supermarket", "ch2_humility_after_risk"]
        },
        { tone: "steady", subtext: "勢いを失っても、生活を立て直す" }
      ),
      choice(
        "ch2_s8_crisis_take_brand_offer",
        "届いた企業案件を受け、初期費用を作る",
        [
          "十分に使っていない商品を紹介する条件で、まとまった報酬が提示された。動画では案件だと明記したが、感想は企業の台本に寄る。",
          "住居は確保できた。一方、必要な金のために評価を曲げた最初の記録が残る。"
        ],
        {
          stats: { money: 350_000, subscribers: 45_000, trust: -6, expression: 2 },
          hidden: { controversy: 5, ambition: 4 },
          routes: { strategy: 3, controversy: 3 },
          addFlags: ["ch2_brand_deal_for_housing", "ch2_fulltime_creator", "ch2_moved_from_dorm", "ch2_sponsor_pressure_seed"],
          video: {
            title: "新生活に必要だった便利商品を紹介",
            views: 1_200_000,
            subscribersGained: 45_000,
            kind: "sponsored-review",
            chapter: 2
          }
        },
        { tone: "risky", subtext: "住居を守る代わりに商品評価を曲げる" }
      )
    ],
    when: when({ flagsAny: ["ch2_quit_announced_early", "ch2_housing_risk"], maxStats: { money: 280_000 } }),
    mandatory: true,
    priority: 37,
    oncePerRun: true,
    tags: ["supermarket", "housing", "crisis"],
    visual: {
      background: "bg/ch2_dorm_packed_boxes",
      portrait: "portrait/hikakin_rising",
      expression: "worried",
      eventCg: "cg/ch2_dorm_key_and_balance",
      accent: "red"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 9: はじめ課長との最初の接点
  // ---------------------------------------------------------------------------
  event({
    id: "ch2_s9_hajime_contact_fallback",
    chapter: 2,
    slot: 9,
    title: "『親分』から始まるメール",
    date: "2012年",
    location: "撮影部屋・受信箱",
    body: [
      "後発の動画投稿者から、長い企画相談のメールが届いた。名前は、はじめ課長。ヒカキンのゲーム音楽動画を見て本気でYouTuberを目指し始め、文面の最初から『親分』と呼んでいる。",
      "企画は『百本の炭酸飲料を全部混ぜる』という大胆だが、準備も安全確認も足りないものだった。無視することも、止めることも、面白くなる形へ直すこともできる。"
    ],
    speaker: "はじめ課長",
    quote: "親分、百本全部混ぜたら、たぶん誰も見たことない色になります！",
    choices: [
      choice(
        "ch2_s9_hajime_advise",
        "危険な点を直し、企画の組み方を教える",
        [
          "量を減らし、飲まず、結果を分かりやすく比較する構成を返した。はじめ課長は翌日、修正版の企画書を送ってくる。",
          "素直さと行動の速さに、将来の強いライバルの片鱗を感じた。親分と弟分のような友情が始まる。"
        ],
        {
          stats: { production: 5, trust: 4, energy: -2 },
          routes: { network: 5 },
          relationships: { hajime: 12 },
          addFlags: ["ch2_hajime_met", "ch2_hajime_advised", "ch2_hajime_friend_seed", "ch2_hajime_safety_lesson"]
        },
        { tone: "warm", subtext: "止めるだけでなく、成立する企画へ直す" }
      ),
      choice(
        "ch2_s9_hajime_collab",
        "一緒に撮って、現場で教える",
        [
          "買い出しから片付けまで一緒に行い、はじめ課長の行動力をヒカキンの構成力で支えた。失敗も多いが、画面には新しい勢いがある。",
          "動画は大きく伸び、はじめ課長も一気に知られる。自分で未来のライバルへ追い風を送った。"
        ],
        {
          stats: { subscribers: 220_000, money: 100_000, expression: 5, production: 4, energy: -8 },
          routes: { network: 6, mainstream: 2 },
          relationships: { hajime: 14 },
          addFlags: ["ch2_hajime_met", "ch2_hajime_first_collab", "ch2_hajime_friend_seed", "ch2_hajime_growth_accelerated"],
          video: {
            title: "百種類の炭酸を安全に混ぜたら何色になる？",
            views: 4_600_000,
            subscribersGained: 220_000,
            kind: "hajime-collab",
            chapter: 2
          }
        },
        { tone: "bold", subtext: "自分の視聴者を渡し、未来のライバルを育てる" }
      ),
      choice(
        "ch2_s9_hajime_decline",
        "危険なのでやめるべきだとだけ返信する",
        [
          "短く断ると、はじめ課長は『自分で安全な方法を探します』と返した。企画を諦めず、別の投稿者へ相談して形にする。",
          "接点は薄いままだが、止められても動く行動力がヒカキンの記憶に残った。"
        ],
        {
          stats: { trust: 2, energy: 2 },
          routes: { stability: 2 },
          relationships: { hajime: 2 },
          addFlags: ["ch2_hajime_met", "ch2_hajime_distant", "ch2_hajime_independent_growth"]
        },
        { tone: "steady", subtext: "安全は守るが、関係は深めない" }
      )
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["hajime", "first-contact", "rival"],
    visual: {
      background: "bg/ch2_studio_inbox",
      portrait: "portrait/hajime_early",
      expression: "eager_smile",
      eventCg: "cg/ch2_hajime_email",
      accent: "gold"
    }
  }),

  event({
    id: "ch2_s9_hajime_kindred_ambition",
    chapter: 2,
    slot: 9,
    title: "親分と呼ぶ挑戦者",
    date: "2012年",
    location: "都内の安い食堂",
    body: [
      "企画相談へ返信したヒカキンは、はじめ課長と初めて直接会った。彼は親分と慕いながらも、登録者や再生数を隠さず比較し、『いつか追いつく』と言う。",
      "尊敬と競争心が同じ言葉に入っている。教えれば強い競争相手になるが、遠ざければ別の場所で勝手に育つ人間だと分かる。"
    ],
    speaker: "はじめ課長",
    quote: "親分に勝ちたいです。親分が落ちてくるんじゃなく、俺がそこまで上がって。",
    choices: [
      choice(
        "ch2_s9_hajime_welcome_rival",
        "『なら本気で来い』と答える",
        [
          "ヒカキンが手を差し出すと、はじめ課長は迷わず握った。助け合っても数字では競う、不思議な約束ができる。",
          "日本一という目標が、初めて具体的な顔を持つライバルとの関係へ変わった。"
        ],
        {
          stats: { expression: 3, trust: 4 },
          hidden: { ambition: 8 },
          routes: { network: 5, mainstream: 1 },
          relationships: { hajime: 15 },
          addFlags: ["ch2_hajime_met", "ch2_hajime_friend_seed", "ch2_hajime_rival_seed", "ch2_friendly_rivalry"]
        },
        { tone: "bold", subtext: "友情と競争を同時に受け入れる" }
      ),
      choice(
        "ch2_s9_hajime_share_failures",
        "成功談ではなく、失敗した企画を教える",
        [
          "伸びなかった題材、録音失敗、仕事との両立を率直に話した。はじめ課長はメモを取り、同じ失敗を避けるだけでなく別の企画へ変える。",
          "自分の遠回りが誰かの近道になる嬉しさと、追いつかれる速さへの緊張を味わった。"
        ],
        {
          stats: { production: 5, trust: 6 },
          hidden: { origin: 4, ambition: 4 },
          routes: { network: 6 },
          relationships: { hajime: 14 },
          addFlags: ["ch2_hajime_met", "ch2_hajime_friend_seed", "ch2_hajime_shared_failures", "ch2_hajime_growth_accelerated"]
        },
        { tone: "warm", subtext: "失敗まで渡し、対等に育つ" }
      ),
      choice(
        "ch2_s9_hajime_withhold_strategy",
        "核心の企画ノウハウは教えない",
        [
          "一般的な助言だけを話し、自分が使う構成表は見せなかった。友好的には接しても、競争相手への警戒が先に立つ。",
          "はじめ課長は気づかないふりをして笑う。友情の入口に、最初から小さな秘密が残った。"
        ],
        {
          stats: { production: 2 },
          hidden: { ambition: 6 },
          routes: { strategy: 4 },
          relationships: { hajime: 5 },
          addFlags: ["ch2_hajime_met", "ch2_hajime_rival_seed", "ch2_hajime_strategy_withheld"]
        },
        { tone: "risky", subtext: "優位を守るが、友情へ秘密を残す" }
      )
    ],
    when: when({ flagsAny: ["ch2_goal_number_one", "ch2_number_one_vow"], minHidden: { ambition: 95 } }),
    mandatory: true,
    priority: 35,
    oncePerRun: true,
    tags: ["hajime", "first-contact", "ambition"],
    visual: {
      background: "bg/ch2_cheap_restaurant",
      portrait: "portrait/hajime_early",
      expression: "earnest",
      eventCg: "cg/ch2_hajime_handshake",
      accent: "red"
    }
  }),

  event({
    id: "ch2_s9_hajime_student_of_variety",
    chapter: 2,
    slot: 9,
    title: "百本を一本にする方法",
    date: "2012年",
    location: "ヒカキンの撮影部屋",
    body: [
      "商品紹介や検証企画を見てきた後発投稿者・はじめ課長が、『親分』と呼びながら企画書を持ってきた。百個の題材が並ぶが、動画の結末がない。",
      "ヒカキンは、数の大きさだけでは一本にならず、途中の変化と最後の答えが必要だと説明する。教えている間に、自分が無意識に身につけた構成力にも気づく。"
    ],
    choices: [
      choice(
        "ch2_s9_hajime_rebuild_together",
        "企画書を一緒に最初から組み直す",
        [
          "百個を試す順番と、途中で予想を変える場面を作った。はじめ課長は変更を恐れず、その場で買い出しへ向かう。",
          "企画を渡しただけでなく、考え方を共有したことで親友とライバルの関係が強く始まった。"
        ],
        {
          stats: { production: 7, trust: 4, energy: -4 },
          routes: { network: 6 },
          relationships: { hajime: 15 },
          addFlags: ["ch2_hajime_met", "ch2_hajime_friend_seed", "ch2_hajime_story_structure", "ch2_hajime_growth_accelerated", "ch2_producer_seed"]
        },
        { tone: "warm", subtext: "答えでなく企画の考え方を教える" }
      ),
      choice(
        "ch2_s9_hajime_give_one_hint",
        "結末だけ考え直すよう、一つヒントを出す",
        [
          "全部を直さず、『最後に何が分かれば視聴者は満足する？』とだけ聞いた。はじめ課長は一晩考え、自分の答えを持って戻る。",
          "自力で育つ余白を残したことで、上下ではなく長く競える相手になった。"
        ],
        {
          stats: { production: 4, trust: 5, energy: 1 },
          routes: { network: 4, strategy: 2 },
          relationships: { hajime: 12 },
          addFlags: ["ch2_hajime_met", "ch2_hajime_friend_seed", "ch2_hajime_independent_growth", "ch2_hajime_rival_seed"]
        },
        { tone: "steady", subtext: "相手が自力で答えへ届く余白を残す" }
      ),
      choice(
        "ch2_s9_hajime_take_idea",
        "企画が強いと判断し、自分の動画で先に使う",
        [
          "規模を整え、自分のチャンネルで先に公開した。動画は伸びるが、はじめ課長は『親分ならもっと違う形にしてほしかった』と静かに言う。",
          "短期の数字と引き換えに、慕ってくれた相手との信頼を傷つけた。"
        ],
        {
          stats: { subscribers: 240_000, money: 170_000, production: 4, trust: -7 },
          hidden: { controversy: 5, ambition: 6 },
          routes: { strategy: 3, controversy: 3 },
          relationships: { hajime: -10 },
          addFlags: ["ch2_hajime_met", "ch2_hajime_idea_taken", "ch2_hajime_rival_seed"],
          video: {
            title: "百種類を全部試したら最後に残るのは？",
            views: 5_000_000,
            subscribersGained: 240_000,
            kind: "large-challenge",
            chapter: 2
          }
        },
        { tone: "risky", subtext: "最大の数字を得て、未来の親友を傷つける" }
      )
    ],
    when: when({ flagsAny: ["ch2_genre_product", "ch2_genre_variety", "ch2_hit_components_mapped"], minStats: { production: 22 } }),
    mandatory: true,
    priority: 33,
    oncePerRun: true,
    tags: ["hajime", "first-contact", "production"],
    visual: {
      background: "bg/ch2_studio_planning_table",
      portrait: "portrait/hajime_early",
      expression: "eager",
      eventCg: "cg/ch2_hajime_hundred_items_plan",
      accent: "gold"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 10: 一発屋という呼び名
  // ---------------------------------------------------------------------------
  event({
    id: "ch2_s10_one_hit_crisis_fallback",
    chapter: 2,
    slot: 10,
    title: "検索候補の『一発屋』",
    date: "2012年末",
    location: "撮影部屋・パソコン前",
    body: [
      "ヒカキンの名前を検索すると、候補に『一発屋』と表示された。新しい動画も数十万から数百万回見られている。それでも最初の一千万だけが、外から見た代表作だった。",
      "否定するために同じ規模を狙うか、呼び名を受け入れて続けるか、別の代表シリーズを作るか。次の一本は、数字以上に自分の肩書きを変える必要がある。"
    ],
    choices: [
      choice(
        "ch2_s10_one_hit_build_series",
        "身近な商品紹介を定期シリーズにする",
        [
          "毎週同じ曜日に、買いやすい商品を正直に試した。一本で一千万には届かないが、視聴者が次週も戻ってくる。",
          "偶然の大当たりではなく、待たれる習慣を作ったことで一発屋の呼び名が薄れ始めた。"
        ],
        {
          stats: { subscribers: 420_000, money: 300_000, expression: 6, trust: 7, production: 4, energy: -7 },
          hidden: { ambition: 5 },
          routes: { mainstream: 7 },
          addFlags: ["ch2_one_hit_escape", "ch2_regular_review_series", "ch2_repeat_audience"],
          video: {
            title: "今週の本気レビュー #1",
            views: 4_200_000,
            subscribersGained: 420_000,
            kind: "regular-review",
            chapter: 2
          }
        },
        { tone: "steady", subtext: "最大値ではなく戻ってくる習慣を作る" }
      ),
      choice(
        "ch2_s10_one_hit_attempt_sequel",
        "原点のゲームBGMで一千万超えを狙う",
        [
          "新作ゲームの音を一か月かけて再現し、前作以上の精度で公開した。技術は評価されるが、最初の驚きまでは再現できない。",
          "六百万再生は大成功だ。それでも過去の一千万と比べる癖を止めなければ、成功を失敗として扱い続ける。"
        ],
        {
          stats: { subscribers: 300_000, money: 240_000, beatbox: 6, production: 4, energy: -11 },
          hidden: { perfectionism: 4, fatigue: 5, ambition: 6 },
          routes: { craft: 6 },
          addFlags: ["ch2_game_masterpiece_sequel", "ch2_one_hit_label_lingers", "ch2_past_peak_comparison"],
          video: {
            title: "人偏堂新作BGMを口だけで完全再現",
            views: 6_200_000,
            subscribersGained: 300_000,
            kind: "game-beatbox-sequel",
            chapter: 2
          }
        },
        { tone: "risky", subtext: "大成功しても過去最高との比較は終わらない" }
      ),
      choice(
        "ch2_s10_one_hit_say_yes",
        "『一発あっただけ幸運』と動画で認める",
        [
          "強がって否定せず、一千万回の幸運と、その前後の地道な投稿を話した。自虐だけで終えず、次の一発も努力して探すと締める。",
          "言葉を奪われる前に自分で引き受けたことで、批判の力が少し弱くなった。"
        ],
        {
          stats: { subscribers: 170_000, expression: 7, trust: 8, energy: 3 },
          hidden: { origin: 7, controversy: -3, ambition: 3 },
          routes: { mainstream: 4 },
          addFlags: ["ch2_one_hit_owned", "ch2_humble_success_story"],
          video: {
            title: "僕は一発屋なのか、正直に話します",
            views: 3_400_000,
            subscribersGained: 170_000,
            kind: "honest-talk",
            chapter: 2
          }
        },
        { tone: "warm", subtext: "呼び名を自分の言葉で引き受ける" }
      )
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["one-hit", "identity", "career"],
    visual: {
      background: "bg/ch2_search_suggestions",
      portrait: "portrait/hikakin_rising",
      expression: "hurt",
      eventCg: "cg/ch2_one_hit_search",
      accent: "red"
    }
  }),

  event({
    id: "ch2_s10_diverse_success",
    chapter: 2,
    slot: 10,
    title: "ゲームを使わない百万回",
    date: "2012年末",
    location: "新しい撮影部屋",
    body: [
      "商品紹介、料理、検証を続けた結果、ゲーム名もビートボックスも題名に入っていない一本が百万人に届いた。最初の一千万より小さい数字なのに、ヒカキンには別の意味がある。",
      "一発目の題材ではなく、自分の説明、表情、構成を見に来る人が生まれた。総合YouTuberとしての土台が、初めて数字で確認できる。"
    ],
    choices: [
      choice(
        "ch2_s10_diverse_expand_all",
        "複数ジャンルを同じチャンネルで続ける",
        [
          "曜日ごとに商品、ゲーム、検証を分け、どれを見てもヒカキンらしい音と反応を残した。視聴者層が広がる。",
          "専門性は薄まるが、何をしても見てもらえる人物へ近づいた。"
        ],
        {
          stats: { subscribers: 520_000, money: 360_000, expression: 7, production: 6, energy: -8 },
          hidden: { ambition: 6, origin: 4 },
          routes: { mainstream: 8, strategy: 2 },
          addFlags: ["ch2_one_hit_escape", "ch2_multi_genre_established", "ch2_personality_audience"],
          video: {
            title: "一週間、巨大なものだけで生活してみた",
            views: 5_500_000,
            subscribersGained: 520_000,
            kind: "variety-challenge",
            chapter: 2
          }
        },
        { tone: "bold", subtext: "専門ではなく人物をチャンネルの軸にする" }
      ),
      choice(
        "ch2_s10_diverse_choose_signature",
        "最も反応の良い商品紹介を主軸にする",
        [
          "幅広く試した結果から、説明とリアクションの強い商品紹介へ投稿の半分を集めた。ビートボックスは効果音として残す。",
          "自由を少し絞る代わりに、次も見たい理由が明確なチャンネルになった。"
        ],
        {
          stats: { subscribers: 460_000, money: 410_000, expression: 6, trust: 6, production: 4 },
          routes: { mainstream: 7, strategy: 3 },
          addFlags: ["ch2_one_hit_escape", "ch2_product_signature", "ch2_beatbox_as_flavor"],
          video: {
            title: "新商品を一日使って本気レビュー",
            views: 4_900_000,
            subscribersGained: 460_000,
            kind: "signature-review",
            chapter: 2
          }
        },
        { tone: "steady", subtext: "試行錯誤から一つの強い柱を選ぶ" }
      ),
      choice(
        "ch2_s10_diverse_return_origin",
        "成長した表現力で、もう一度ビートボックスを撮る",
        [
          "以前のような無表情の演奏ではなく、動画企画として間と見せ場を作った。古い視聴者と新しい視聴者が同じコメント欄へ集まる。",
          "原点へ戻ることが後退ではなく、身につけたものを持ち帰る行為になった。"
        ],
        {
          stats: { subscribers: 400_000, money: 300_000, expression: 5, beatbox: 5, trust: 5 },
          hidden: { origin: 9 },
          routes: { craft: 4, mainstream: 4 },
          addFlags: ["ch2_one_hit_escape", "ch2_origin_reintegrated", "ch2_balanced_identity"],
          video: {
            title: "今の僕が、最初のビートをやり直します",
            views: 4_400_000,
            subscribersGained: 400_000,
            kind: "origin-return",
            chapter: 2
          }
        },
        { tone: "warm", subtext: "新しい技術を持って原点へ戻る" }
      )
    ],
    when: when({ flagsAny: ["ch2_multi_genre_balance", "ch2_genre_product", "ch2_genre_variety", "ch2_signature_review"], minStats: { expression: 22, production: 20 } }),
    mandatory: true,
    priority: 35,
    oncePerRun: true,
    tags: ["one-hit", "diversification", "success"],
    visual: {
      background: "bg/ch2_studio_million_views",
      portrait: "portrait/hikakin_rising",
      expression: "proud_smile",
      eventCg: "cg/ch2_non_game_million",
      accent: "gold"
    }
  }),

  event({
    id: "ch2_s10_game_label_trap",
    chapter: 2,
    slot: 10,
    title: "『あのゲームだけやって』",
    date: "2012年末",
    location: "撮影部屋・コメント画面",
    body: [
      "ゲーム音楽やパズトラ実況を続けた結果、ゲーム関連以外の動画を出すたび低評価が増えるようになった。視聴者はヒカキンを嫌っているのではなく、期待する役割が狭く固定されている。",
      "専門チャンネルとして突き詰めれば安定する。別ジャンルへ出るなら、数字が落ちる期間を耐えなければならない。"
    ],
    choices: [
      choice(
        "ch2_s10_label_accept_gaming",
        "ゲーム実況と音楽に専門化する",
        [
          "ゲーム情報、実況、BGM再現を一つの流れへ揃えた。視聴者は安定し、サックスむらいとの接点も増える。",
          "強い専門性を得る代わりに、国民的な総合YouTuberへの幅は後から取り戻す必要がある。"
        ],
        {
          stats: { subscribers: 430_000, money: 350_000, production: 5, beatbox: 3 },
          routes: { strategy: 5, craft: 3 },
          relationships: { murai: 4 },
          addFlags: ["ch2_game_specialist", "ch2_game_label_accepted", "ch2_one_hit_escape_partial"],
          video: {
            title: "今週のパズトラ検証と口だけBGM",
            views: 4_100_000,
            subscribersGained: 430_000,
            kind: "gaming-series",
            chapter: 2
          }
        },
        { tone: "steady", subtext: "専門性を取り、総合路線を後回しにする" }
      ),
      choice(
        "ch2_s10_label_transition_slowly",
        "ゲーム動画二本ごとに別ジャンルを一本入れる",
        [
          "視聴者が離れすぎない頻度で、商品紹介と料理を混ぜた。最初は数字が弱いが、少しずつ両方を見る人が増える。",
          "急な方向転換ではなく、期待そのものを時間をかけて広げる道を選んだ。"
        ],
        {
          stats: { subscribers: 320_000, money: 270_000, expression: 5, production: 4, trust: 4 },
          routes: { strategy: 6, mainstream: 3 },
          addFlags: ["ch2_gradual_diversification", "ch2_game_bridge", "ch2_one_hit_escape"]
        },
        { tone: "steady", subtext: "既存の期待を壊さず、少しずつ広げる" }
      ),
      choice(
        "ch2_s10_label_break_abruptly",
        "一か月、ゲーム動画を完全に休む",
        [
          "登録解除が目に見えて増える中、商品、料理、日常だけを投稿した。再生数は大きく落ち、精神的にも苦しい。",
          "残った視聴者は、題材ではなくヒカキン本人を見ている。小さくても強い土台を作り直した。"
        ],
        {
          stats: { subscribers: -80_000, money: 90_000, expression: 7, trust: 3, energy: -5 },
          hidden: { ambition: 5, fatigue: 2 },
          routes: { mainstream: 6 },
          addFlags: ["ch2_game_break", "ch2_personality_core_small", "ch2_one_hit_escape_costly"]
        },
        { tone: "risky", subtext: "大勢を失い、人物を見ている層だけ残す" }
      )
    ],
    when: when({ flagsAny: ["ch2_game_label_stronger", "ch2_game_upload_spree", "ch2_game_specialist", "ch2_technical_escalation"], minRoutes: { craft: 6 } }),
    mandatory: true,
    priority: 33,
    oncePerRun: true,
    tags: ["one-hit", "gaming", "identity"],
    visual: {
      background: "bg/ch2_game_comments_wall",
      portrait: "portrait/hikakin_rising",
      expression: "trapped",
      eventCg: "cg/ch2_only_play_that_game",
      accent: "red"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 11: 一発屋の先へ（章末）
  // ---------------------------------------------------------------------------
  event({
    id: "ch2_s11_identity_fallback",
    chapter: 2,
    slot: 11,
    title: "名前で押される再生ボタン",
    date: "2013年",
    location: "撮影部屋",
    body: [
      "三年前はゲーム名がなければ誰も動画を開かなかった。今は題名にヒカキンの名前があるだけで、公開を待つ人がいる。まだ日本一には遠く、一発屋という声も完全には消えていない。",
      "それでも商品、ゲーム、料理、検証のいずれかで、次も見る理由を作り始めた。ビートボックスは唯一の動画ジャンルから、どの企画にも戻れる原点へ変わりつつある。",
      "同じ時代には、サックスむらい、まっすお、ダンケ、そして『親分』と呼ぶはじめ課長が、それぞれ別のチャンネルを伸ばしていた。主役は変わらずヒカキン自身だ。"
    ],
    speaker: "ヒカキン",
    quote: "一千万回の次に必要だったのは、もう一千万回じゃない。次も見たいと思われる自分だった。",
    choices: [
      choice(
        "ch2_s11_identity_mainstream",
        "幅広い企画で、誰でも見られるチャンネルを作る",
        [
          "子供も大人も分かる言葉、正直な商品紹介、失敗を笑える企画を中心に据えた。ビートボックスは要所で個性として使う。",
          "次の時代、より大きな企業やグループと並んでも通用する王道路線が固まった。"
        ],
        {
          stats: { subscribers: 520_000, money: 500_000, expression: 7, production: 5, trust: 6 },
          hidden: { ambition: 7, origin: 5 },
          routes: { mainstream: 8 },
          addFlags: ["ch2_identity_mainstream", "ch2_one_hit_escape", "ch2_ready_new_era", "ch2_chapter_complete"]
        },
        { tone: "warm", subtext: "誰でも入れる間口と、自分らしい音を両立" }
      ),
      choice(
        "ch2_s11_identity_creator",
        "制作精度と独自企画で、一本ずつ勝負する",
        [
          "本数を無理に増やさず、構成と編集へ時間を使う方針を明言した。待つ視聴者は減っても、公開日は大きな出来事になる。",
          "新時代の大型制作へ進む職人路線と、裏方の才能へつながる土台ができた。"
        ],
        {
          stats: { subscribers: 360_000, money: 350_000, production: 8, beatbox: 4, trust: 4 },
          hidden: { perfectionism: 3, origin: 6 },
          routes: { craft: 7, strategy: 2 },
          addFlags: ["ch2_identity_creator", "ch2_slow_masterpieces", "ch2_ready_new_era", "ch2_chapter_complete"]
        },
        { tone: "steady", subtext: "投稿量より公開一本の意味を強くする" }
      ),
      choice(
        "ch2_s11_identity_network",
        "個人活動を中心に、必要な時だけ人と組む",
        [
          "固定グループには入らず、企画ごとに適切な相手と協力する方針を選んだ。普段の撮影と編集は一人で続ける。",
          "友人を脇役に消費せず、それぞれの強みが必要な時だけ交わるチャンネルになった。"
        ],
        {
          stats: { subscribers: 440_000, money: 390_000, expression: 5, production: 6, trust: 6 },
          hidden: { origin: 5 },
          routes: { network: 7, mainstream: 3 },
          addFlags: ["ch2_identity_networked_individual", "ch2_independent_creators", "ch2_ready_new_era", "ch2_chapter_complete"]
        },
        { tone: "bold", subtext: "一人を主語にしたまま、人の力も活かす" }
      )
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["chapter-end", "identity", "transition"],
    visual: {
      background: "bg/ch2_studio_morning",
      portrait: "portrait/hikakin_rising",
      expression: "confident",
      eventCg: "cg/ch2_name_as_reason",
      accent: "gold"
    }
  }),

  event({
    id: "ch2_s11_fulltime_launch",
    chapter: 2,
    slot: 11,
    title: "朝から動画を撮る日",
    date: "2013年",
    location: "新しい撮影部屋",
    body: [
      "スーパーを辞めてから初めて、目覚ましを勤務時間ではなく撮影開始へ合わせた。窓の光があるうちにカメラを回せることだけで、映像の色が変わる。",
      "一日を自由に使えるからこそ、誰も働けとは言わない。投稿しない日も、休む日も、すべて自分の責任になる。",
      "机の横には社員寮から持ってきた安いマイクがある。自由を得た今こそ、最初の継続力が試される。"
    ],
    choices: [
      choice(
        "ch2_s11_fulltime_schedule",
        "勤務表のように制作予定を組む",
        [
          "撮影、編集、研究、休養を曜日ごとに分けた。会社を辞めても、積み上げる仕組みまでは捨てない。",
          "投稿速度と健康が安定し、次章の大型企画へ耐えられる制作基盤ができた。"
        ],
        {
          stats: { subscribers: 500_000, money: 420_000, production: 7, energy: 10, trust: 4 },
          hidden: { fatigue: -6, ambition: 6 },
          routes: { strategy: 6, stability: 3 },
          addFlags: ["ch2_fulltime_schedule", "ch2_fulltime_stable", "ch2_ready_new_era", "ch2_chapter_complete"]
        },
        { tone: "steady", subtext: "会社で得た規律を自由な仕事へ持ち込む" }
      ),
      choice(
        "ch2_s11_fulltime_daily_upload",
        "自由な時間を使い、毎日投稿へ挑戦する",
        [
          "短い企画も含め毎日カメラを回した。登録者は一気に増え、日常のすべてが動画の題材になる。",
          "成長は速いが、休むと忘れられるという恐怖も同じ速度で育った。"
        ],
        {
          stats: { subscribers: 680_000, money: 560_000, expression: 7, production: 5, energy: -12 },
          hidden: { fatigue: 9, ambition: 8, perfectionism: -3 },
          routes: { mainstream: 8 },
          addFlags: ["ch2_daily_upload", "ch2_fulltime_fast_growth", "ch2_burnout_seed", "ch2_ready_new_era", "ch2_chapter_complete"]
        },
        { tone: "risky", subtext: "最大の成長と引き換えに休めない癖がつく" }
      ),
      choice(
        "ch2_s11_fulltime_big_project",
        "本数を増やさず、最初の大型企画を作る",
        [
          "数週間を一つの検証へ使い、場所、費用、安全、結末まで設計した。投稿の空白はできるが、完成した一本が新しい規模を示す。",
          "個人の部屋から始まった制作が、次章の大型企画時代へ踏み出した。"
        ],
        {
          stats: { subscribers: 560_000, money: 260_000, production: 9, expression: 5, energy: -7 },
          hidden: { ambition: 8, perfectionism: 2 },
          routes: { craft: 5, mainstream: 4 },
          addFlags: ["ch2_first_large_project", "ch2_fulltime_craft", "ch2_ready_new_era", "ch2_chapter_complete"]
        },
        { tone: "bold", subtext: "自由な時間を一本の規模へ変える" }
      )
    ],
    when: when({ flagsAny: ["ch2_fulltime_creator", "ch2_left_supermarket_early", "ch2_left_supermarket_responsibly"] }),
    mandatory: true,
    priority: 35,
    oncePerRun: true,
    tags: ["chapter-end", "fulltime", "transition"],
    visual: {
      background: "bg/ch2_new_studio_daylight",
      portrait: "portrait/hikakin_rising",
      expression: "free_nervous",
      eventCg: "cg/ch2_first_fulltime_morning",
      accent: "gold"
    }
  }),

  event({
    id: "ch2_s11_dual_life_mastery",
    chapter: 2,
    slot: 11,
    title: "制服のポケットの企画メモ",
    date: "2013年",
    location: "スーパーマーケット・閉店後",
    body: [
      "ヒカキンはまだスーパーにいる。登録者が増えても、品出しの順番と閉店作業は変わらない。制服のポケットには、客の会話から思いついた企画メモが増えていく。",
      "専業の投稿者より使える時間は少ない。それでも生活者として売り場に立つことが、商品紹介や普通の人の感覚を支えている。",
      "いつ辞めるかという問いは残るが、残っている時間を停滞ではなく独自性へ変える方法もある。"
    ],
    choices: [
      choice(
        "ch2_s11_dual_set_final_date",
        "半年後を最後の勤務日と決める",
        [
          "貯金と引き継ぎの目標をもう一度設定し、上司へ日付を伝えた。今度は勢いではなく準備した退職になる。",
          "残る半年を、生活と企画の両方を学ぶ最後の期間として使う。"
        ],
        {
          stats: { money: 400_000, production: 5, trust: 5, energy: -4 },
          hidden: { ambition: 7 },
          routes: { strategy: 5, stability: 4 },
          relationships: { supermarket: 6 },
          addFlags: ["ch2_final_exit_date", "ch2_responsible_exit_seed", "ch2_ready_new_era", "ch2_chapter_complete"]
        },
        { tone: "steady", subtext: "残る期間にも期限と意味を与える" }
      ),
      choice(
        "ch2_s11_dual_use_store_insight",
        "仕事で得た視点を商品動画へ磨く",
        [
          "客が迷う点、説明が必要な機能、価格への本音を、個人情報を出さず企画へ反映した。売り場で働く経験が動画の信用になる。",
          "時間では不利でも、専業にはない生活感を武器として新時代へ進む。"
        ],
        {
          stats: { subscribers: 450_000, money: 480_000, expression: 6, trust: 8, production: 5, energy: -8 },
          hidden: { origin: 6, fatigue: 4 },
          routes: { mainstream: 7, stability: 3 },
          relationships: { supermarket: 6 },
          addFlags: ["ch2_store_insight_signature", "ch2_dual_life_strength", "ch2_ready_new_era", "ch2_chapter_complete"],
          video: {
            title: "買う前に知りたい五つを正直レビュー",
            views: 4_700_000,
            subscribersGained: 450_000,
            kind: "consumer-review",
            chapter: 2
          }
        },
        { tone: "warm", subtext: "残っている生活を動画の信用へ変える" }
      ),
      choice(
        "ch2_s11_dual_accept_promotion",
        "職場の昇進を受け、動画を月二本へ戻す",
        [
          "安定した役職と収入を選び、投稿頻度を初期と同じ月一〜二本へ戻した。一本に使える体力は減るが、制作管理の経験は増える。",
          "頂点への道は遠くなる。それでも後に再挑戦する余地と、裏方の管理能力につながる別の成長が始まった。"
        ],
        {
          stats: { money: 650_000, production: 6, trust: 5, energy: -10 },
          hidden: { ambition: -8, fatigue: 5 },
          routes: { stability: 8 },
          relationships: { supermarket: 10 },
          addFlags: ["ch2_supermarket_promoted", "ch2_uploads_slowed", "ch2_management_experience", "ch2_ready_new_era", "ch2_chapter_complete"]
        },
        { tone: "risky", subtext: "頂点への速度を失い、安定と管理経験を得る" }
      )
    ],
    when: when({ flagsAny: ["ch2_kept_supermarket", "ch2_dual_life_continues", "ch2_resignation_withdrawn"] }),
    mandatory: true,
    priority: 34,
    oncePerRun: true,
    tags: ["chapter-end", "supermarket", "dual-life"],
    visual: {
      background: "bg/ch2_supermarket_closing_notes",
      portrait: "portrait/hikakin_uniform",
      expression: "steady_determined",
      eventCg: "cg/ch2_idea_note_in_uniform",
      accent: "green"
    }
  }),
];
