import type { StoryEvent } from "../game/types";
import { choice, event, when } from "./helpers";

/**
 * 第1章「無名のビートボクサー」
 *
 * 各slotには必ず条件なしのフォールバックを置き、過去の選択・能力・世界の流行で
 * 優先度の高い別場面へ差し替える。固定史実は「起こる／起こらない」ではなく、
 * そこへ至る意味と、その後に残る感情が変わるようにしている。
 */
export const chapter1Events: StoryEvent[] = [
  // ---------------------------------------------------------------------------
  // SLOT 0: 2008年3月、新潟から東京へ
  // ---------------------------------------------------------------------------
  event({
    id: "ch1_s0_departure_basic",
    chapter: 1,
    slot: 0,
    title: "二万円を握って",
    date: "2008年3月",
    location: "新潟発・東京行きの列車",
    body: [
      "高校を卒業したばかりのヒカキンは、雪の残る新潟を背に東京行きの列車へ乗った。小学三年から続け、全国大会でも上位へ食い込んだスキージャンプ。その特技で大学へ進む道ではなく、二件しかなかった東京の求人からスーパーへの就職を選んだ。",
      "鞄には着替えとビートボックスの練習ノート、足元には実家から持たされた食料の段ボール。銀行口座に貯金はなく、親から渡された封筒の二万円が使える現金のすべてだった。社員寮の家賃二万円は給料から引かれるが、初任給まではこの箱と封筒だけで生きることになる。",
      "YouTubeは、古いパソコンで海外のビートボクサーを見るための場所だった。中学から誰にも習わず、聞こえた音を見よう見まねで分解してきた。自分も投稿すれば、世界の輪へ参加できるかもしれない。",
      "動画を仕事にするという発想はまだない。ただ、窓に映る十八歳の顔へ向かって、声に出さず誓った。"
    ],
    speaker: "ヒカキン",
    quote: "絶対に何者かになってやる。何になるかは、まだ分からないけど。",
    choices: [
      choice(
        "ch1_s0_basic_protect_money",
        "二万円には手を付けず、まず生活を守る",
        [
          "封筒を鞄の一番奥へしまった。夢を追うにも、明日の食事と電車賃は必要だ。",
          "東京へ着いた夜、派手な街の灯りを社員寮の小さな窓から眺める。焦りはある。それでも、倒れずに続けることを最初の作戦にした。"
        ],
        {
          stats: { energy: 6 },
          hidden: { ambition: 2 },
          routes: { stability: 3 },
          addFlags: ["ch1_cash_guarded", "ch1_arrival_cautious", "ch1_ski_discipline", "ch1_food_box_arrival"],
          queueEvent: "ch1_s1_envelope_budget"
        },
        { tone: "steady", subtext: "生活の余裕を残し、長く続ける準備をする" }
      ),
      choice(
        "ch1_s0_basic_buy_mic",
        "今日のうちにマイクを探す",
        [
          "東京駅の人波を抜けると、そのまま中古機材店へ向かった。上京初日に夢へ金を使うことが、自分への宣言になる気がした。",
          "値札を見れば怖くなる。それでも、何者かになるために持ってきた二万円だと考え直した。"
        ],
        {
          stats: { money: -8_000, production: 2, beatbox: 1 },
          hidden: { ambition: 4 },
          routes: { craft: 3 },
          addFlags: ["ch1_mic_first", "ch1_arrival_bold", "ch1_self_taught_beatbox", "ch1_food_box_arrival"],
          queueEvent: "ch1_s1_mic_shop"
        },
        { tone: "bold", subtext: "生活費を削って、音に先行投資する" }
      ),
      choice(
        "ch1_s0_basic_find_stage",
        "東京のビートボックスイベントを探す",
        [
          "荷ほどきより先に、携帯電話で今夜の小さなイベントを探した。東京へ来た理由を、就職だけで終わらせたくなかった。",
          "知らない街で知らない人の前に立つ怖さより、何者にもならないまま帰る怖さの方が大きかった。"
        ],
        {
          stats: { money: -3_000, energy: -6, beatbox: 2 },
          hidden: { ambition: 5, origin: 3 },
          routes: { network: 2, craft: 2 },
          addFlags: ["ch1_first_stage_search", "ch1_arrival_bold", "ch1_school_stage_memory", "ch1_food_box_arrival"],
          queueEvent: "ch1_s1_live_house"
        },
        { tone: "risky", subtext: "腕試しと出会いを求めて街へ出る" }
      )
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["opening", "ambition", "arrival"],
    visual: {
      background: "bg/ch1_train_snow",
      portrait: "portrait/hikakin_young",
      expression: "determined",
      eventCg: "cg/ch1_departure_envelope",
      accent: "blue"
    }
  }),

  event({
    id: "ch1_s0_departure_music_world",
    chapter: 1,
    slot: 0,
    title: "窓ガラスの向こうの世界",
    date: "2008年3月",
    location: "新潟発・東京行きの列車",
    body: [
      "高校卒業直後、十八歳のヒカキンは東京のスーパーへ就職する列車で、保存しておいた海外ビートボクサーの動画をもう一度再生した。中学時代、テレビで偶然見た口だけの演奏に衝撃を受け、家族から『うるさい』と言われても毎日独学で続けてきた音だ。",
      "実家の古いパソコンは音声ファイルさえ満足に再生できず、通信も何度も途切れた。それでも画面の向こうには、出身も肩書も関係なく技術だけで発見される世界があった。",
      "見るために開いていたYouTubeへ自分も投稿すれば、誰かに見つけてもらえるかもしれない。二万円と安い機材しかなくても、世界へ届く一本を作れるという予感が野心へ変わった。"
    ],
    speaker: "ヒカキン",
    quote: "東京で終わるつもりはない。いつか、この画面の向こうまで行く。",
    choices: [
      choice(
        "ch1_s0_music_note_technique",
        "動画の音を一つずつノートへ書き取る",
        [
          "低音、破裂音、息の抜き方。揺れる車内で気づいた技術を、読めないほど細かな字で書き留めた。",
          "東京へ着く前から、最初の練習は始まっていた。このノートは後に、ゲームBGMを分解するときの原型になる。"
        ],
        {
          stats: { beatbox: 3, production: 1 },
          hidden: { perfectionism: 2, ambition: 3, origin: 2 },
          routes: { craft: 4 },
          addFlags: ["ch1_overseas_notebook", "ch1_sound_analysis", "ch1_self_taught_beatbox"],
          queueEvent: "ch1_s1_mic_shop"
        },
        { tone: "steady", subtext: "世界の技術を研究材料に変える" }
      ),
      choice(
        "ch1_s0_music_imagine_audience",
        "自分ならどう観客を沸かせるか想像する",
        [
          "技の正確さだけでなく、表情や間、驚かせる順番に目を向けた。上手いだけでは、人は最後まで見てくれない。",
          "隣の乗客に怪しまれながら、窓へ向かって表情まで練習した。人を楽しませるという発想が、初めて輪郭を持った。"
        ],
        {
          stats: { expression: 3, beatbox: 1 },
          hidden: { ambition: 3 },
          routes: { mainstream: 3 },
          addFlags: ["ch1_audience_imagined", "ch1_performance_minded", "ch1_school_stage_memory"],
          queueEvent: "ch1_s1_live_house"
        },
        { tone: "warm", subtext: "技術を見せる相手の顔まで考える" }
      ),
      choice(
        "ch1_s0_music_save_cash",
        "動画を閉じ、二万円の使い方を計算する",
        [
          "夢中になるほど、現実も見なければならない。食費、交通費、日用品を紙の端へ並べると、二万円は驚くほど早く消えた。",
          "今すぐ華やかな一歩を踏み出せなくても、練習を続けられる生活を作る。それも夢への投資だと決めた。"
        ],
        {
          stats: { energy: 4 },
          routes: { stability: 4, strategy: 1 },
          addFlags: ["ch1_cash_guarded", "ch1_budget_planned", "ch1_food_box_arrival"],
          queueEvent: "ch1_s1_envelope_budget"
        },
        { tone: "steady", subtext: "長く戦うため、まず暮らしを設計する" }
      )
    ],
    when: when({ trendsAny: ["musicGlobal"] }),
    mandatory: true,
    priority: 20,
    oncePerRun: true,
    tags: ["opening", "overseas", "ambition"],
    visual: {
      background: "bg/ch1_train_snow",
      portrait: "portrait/hikakin_young",
      expression: "inspired",
      eventCg: "cg/ch1_train_overseas_video",
      accent: "violet"
    }
  }),

  event({
    id: "ch1_s0_departure_game_memory",
    chapter: 1,
    slot: 0,
    title: "耳に残るメロディ",
    date: "2008年3月",
    location: "新潟発・東京行きの列車",
    body: [
      "高校卒業直後、十八歳で乗った東京行きの列車。その発車音を聞いた瞬間、ヒカキンは無意識に同じ音を口で返した。向かいの子供が遊ぶ携帯ゲームを見て、モンスター収集、電子ペット、対戦カード、改造する小さなレーサーに夢中だった少年時代を思い出す。",
      "どんな音でも、口の中で組み直せる。それだけが、自分の中で誰にも負けたくないと思えるものだった。",
      "これまでYouTubeは海外のビートボクサーを見る場所だった。しかし自分も投稿すれば、この得意技を誰かに見つけてもらえるかもしれない。",
      "親からもらった二万円を握り、東京で絶対に何者かになると決める。ただしその入口がゲームの音になることを、このときはまだ知らない。"
    ],
    speaker: "ヒカキン",
    quote: "何者になるか分からないなら、まず誰にも真似できない音を作る。",
    choices: [
      choice(
        "ch1_s0_game_record_train",
        "発車音をこっそり録音して研究する",
        [
          "安い携帯電話を鞄の陰へ置き、短い発車音を録った。音質は悪いが、何度も聞けば構造は分かる。",
          "身の回りの音を素材として見る癖が、この日から始まった。後にゲーム効果音へ着目する伏線になる。"
        ],
        {
          stats: { production: 2, beatbox: 2 },
          hidden: { perfectionism: 1 },
          routes: { strategy: 2, craft: 2 },
          addFlags: ["ch1_everyday_sound_hunter", "ch1_sound_analysis", "ch1_childhood_game_memory"],
          queueEvent: "ch1_s1_mic_shop"
        },
        { tone: "bold", subtext: "日常の音をすぐ素材にする" }
      ),
      choice(
        "ch1_s0_game_make_child_laugh",
        "子供へゲームの効果音を口で返す",
        [
          "小さく効果音を鳴らすと、向かいの子供が顔を上げて笑った。たった一人でも反応が返ると、練習部屋では得られない熱が残る。",
          "上手さを証明するだけでなく、人を楽しませる音にしたい。その感覚を東京まで持っていくことにした。"
        ],
        {
          stats: { expression: 2, trust: 1, beatbox: 1 },
          hidden: { origin: 3 },
          routes: { mainstream: 3 },
          addFlags: ["ch1_first_small_audience", "ch1_game_sound_memory", "ch1_childhood_game_memory"],
          queueEvent: "ch1_s1_live_house"
        },
        { tone: "warm", subtext: "最初の観客を笑顔にする" }
      ),
      choice(
        "ch1_s0_game_keep_vow",
        "誰にも見せず、胸の中で誓いを固める",
        [
          "音を返したい衝動を抑え、窓の外を見た。自信は口にした瞬間に薄くなる気がした。",
          "まず東京で生き残り、力を蓄える。静かな決意は、目立たないが折れにくい芯になった。"
        ],
        {
          stats: { energy: 4 },
          hidden: { ambition: 5, origin: 1 },
          routes: { stability: 3 },
          addFlags: ["ch1_silent_vow", "ch1_cash_guarded", "ch1_ski_discipline"],
          queueEvent: "ch1_s1_envelope_budget"
        },
        { tone: "steady", subtext: "衝動より継続を選ぶ" }
      )
    ],
    when: when({ trendsAny: ["gaming"] }),
    mandatory: true,
    priority: 18,
    oncePerRun: true,
    tags: ["opening", "gaming", "ambition"],
    visual: {
      background: "bg/ch1_train_snow",
      portrait: "portrait/hikakin_young",
      expression: "focused",
      eventCg: "cg/ch1_train_game_sound",
      accent: "green"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 1: 最初の二万円
  // ---------------------------------------------------------------------------
  event({
    id: "ch1_s1_first_budget_fallback",
    chapter: 1,
    slot: 1,
    title: "六畳間の作戦会議",
    date: "2008年3月",
    location: "スーパー社員寮・自室",
    body: [
      "社員寮の部屋は、ベッドと机を置けばほとんど埋まった。窓の外には知らない建物が並び、廊下からは同郷らしい先輩たちの話し声が聞こえる。実家から運んだ段ボールには、乾麺、ココアの粉、保存の利く食料が詰められていた。",
      "銀行に貯金はない。給料から家賃二万円が引かれるとはいえ、初任給まで手元の二万円で日用品も食事も機材も揃えなければならない。千円札を一枚減らすことさえ怖く、机に硬貨まで並べると、夢が初めて具体的な値段を持った。"
    ],
    speaker: "ヒカキン",
    quote: "二万円で人生は買えない。でも、最初の一歩くらいは買える。",
    choices: [
      choice(
        "ch1_s1_fallback_used_mic",
        "中古マイクへ八千円使う",
        [
          "店で一番安い中古マイクを選び、残った札の薄さに少し震えた。試しに低音を入れると、これまで潰れていた響きがわずかに残る。",
          "食事は切り詰めることになる。それでも、自分の音が昨日より正確に届くことが嬉しかった。"
        ],
        {
          stats: { money: -8_000, production: 3, beatbox: 1 },
          hidden: { ambition: 2 },
          routes: { craft: 3 },
          addFlags: ["ch1_bought_used_mic", "ch1_food_budget_tight"]
        },
        { tone: "bold", subtext: "音質を得る代わりに生活を削る" }
      ),
      choice(
        "ch1_s1_fallback_daily_goods",
        "生活用品と食料を揃える",
        [
          "布団、洗剤、米、安い保存食。買い物袋は重くなったが、部屋に生活の形ができた。",
          "高価な機材はない。それでも、空腹や寒さで練習を止めないための土台を手に入れた。"
        ],
        {
          stats: { money: -5_000, energy: 8 },
          hidden: { fatigue: -2 },
          routes: { stability: 4 },
          addFlags: ["ch1_dorm_prepared", "ch1_cash_guarded"]
        },
        { tone: "steady", subtext: "暮らしを整えて継続力を守る" }
      ),
      choice(
        "ch1_s1_fallback_internet",
        "通信環境だけは最優先で整える",
        [
          "動画を見ることも投稿することも、回線がなければ始まらない。契約書の細かな文字と格闘し、最小限のプランを選んだ。",
          "速度は決して速くないが、海外の映像を夜通し研究できる窓が開いた。"
        ],
        {
          stats: { money: -6_000, production: 2 },
          hidden: { ambition: 1 },
          routes: { strategy: 3 },
          addFlags: ["ch1_internet_first", "ch1_overseas_research_ready"]
        },
        { tone: "steady", subtext: "世界へつながる環境を買う" }
      )
    ],
    priority: 0,
    oncePerRun: true,
    tags: ["dorm", "money", "setup"],
    visual: {
      background: "bg/ch1_dorm_room_empty",
      portrait: "portrait/hikakin_young",
      expression: "thinking",
      accent: "blue"
    }
  }),

  event({
    id: "ch1_s1_mic_shop",
    chapter: 1,
    slot: 1,
    title: "夢の値札",
    date: "2008年3月",
    location: "東京・中古機材店",
    body: [
      "壁一面に並ぶマイクは、どれもヒカキンの二万円を簡単に超えていた。店員に予算を伝えると、棚の下から傷だらけの一本と、さらに安い展示処分品を出してくれる。",
      "音の違いは確かに分かる。だが良い方を選べば、給料日まで値引き食パンへ実家のココアを振りかける生活になる。何者かになるという決意が、初めて現実の値札に試された。"
    ],
    choices: [
      choice(
        "ch1_s1_mic_best_affordable",
        "傷だらけでも音の良い一本を買う",
        [
          "一万円札を手放すと、財布は急に軽くなった。寮へ戻り、息を一音入れただけで、低音の輪郭が違うと分かる。",
          "このマイクに見合う動画を作るまで、無駄遣いにはしない。空腹さえ、覚悟の証明に思えた。"
        ],
        {
          stats: { money: -10_000, production: 4, beatbox: 2, energy: -3 },
          hidden: { ambition: 3, perfectionism: 2 },
          routes: { craft: 4 },
          addFlags: ["ch1_bought_better_mic", "ch1_food_budget_tight"]
        },
        { tone: "risky", subtext: "最大の音質と、ぎりぎりの生活" }
      ),
      choice(
        "ch1_s1_mic_display",
        "安い展示処分品で妥協する",
        [
          "高音に少し雑音が乗るが、今までのマイクよりは良い。残った金でケーブルと簡単なスタンドも揃えた。",
          "最高ではなくても、今日から撮れる。完璧な道具を待たず工夫する姿勢が芽生えた。"
        ],
        {
          stats: { money: -6_000, production: 3, energy: 1 },
          hidden: { perfectionism: -2 },
          routes: { strategy: 2, craft: 1 },
          addFlags: ["ch1_bought_used_mic", "ch1_improvise_gear"]
        },
        { tone: "steady", subtext: "余力と制作環境を両立する" }
      ),
      choice(
        "ch1_s1_mic_leave_and_test",
        "買わずに、店員へ録音のコツを聞く",
        [
          "財布を戻し、安いマイクでも音を良くする方法を尋ねた。店員は壁との距離や布で反響を抑える方法を、紙へ図まで描いて教えてくれた。",
          "高い道具がないことを言い訳にしない。知識を持ち帰ったことで、所持金以上のものを得た気がした。"
        ],
        {
          stats: { production: 3, trust: 1 },
          hidden: { ambition: 1 },
          routes: { strategy: 3, stability: 2 },
          addFlags: ["ch1_shop_advice", "ch1_cash_guarded"]
        },
        { tone: "warm", subtext: "金の代わりに知識を持ち帰る" }
      )
    ],
    when: when({ flagsAny: ["ch1_mic_first", "ch1_overseas_notebook", "ch1_everyday_sound_hunter"] }),
    priority: 30,
    oncePerRun: true,
    tags: ["gear", "money", "craft"],
    visual: {
      background: "bg/ch1_used_audio_shop",
      portrait: "portrait/hikakin_young",
      expression: "awed",
      eventCg: "cg/ch1_mic_price_tag",
      accent: "gold"
    }
  }),

  event({
    id: "ch1_s1_envelope_budget",
    chapter: 1,
    slot: 1,
    title: "封筒に引いた線",
    date: "2008年3月",
    location: "スーパー社員寮・自室",
    body: [
      "ヒカキンは二万円を、食費、交通費、緊急用の三つに分けて封筒へ入れた。夢のための項目を作ろうとして、手が止まる。今は余白しか残っていない。",
      "廊下では先輩社員たちが、新潟の方言を交えて夕食へ誘っている。孤独を避けるのも、機材のために一円でも残すのも、どちらも東京で続けるために必要だった。"
    ],
    choices: [
      choice(
        "ch1_s1_envelope_join_dinner",
        "先輩たちと食事へ行く",
        [
          "同郷の先輩は、安い定食屋と寮の決まりを教えてくれた。ヒカキンがビートボックスをすると、最初は驚き、すぐにもう一度やってくれと笑った。",
          "東京で最初の観客は、ネットの向こうではなく同じ寮にいた。職場に頼れる顔ができ、緊張が少しほどけた。"
        ],
        {
          stats: { money: -1_500, energy: 5, expression: 1, trust: 1 },
          relationships: { supermarket: 5 },
          routes: { network: 2, stability: 2 },
          addFlags: ["ch1_dorm_seniors", "ch1_first_local_audience"]
        },
        { tone: "warm", subtext: "孤独を減らし、職場の居場所を作る" }
      ),
      choice(
        "ch1_s1_envelope_cook_rice",
        "自炊して、一円でも多く残す",
        [
          "慣れない炊飯器で米を少し焦がしたが、数日分の食事は確保できた。浮いた金額を封筒の余白へ書き込む。",
          "派手な上京初日ではない。それでも、こうして一日ずつ積み上げれば必ず機材へ届くと信じた。"
        ],
        {
          stats: { energy: 3 },
          hidden: { fatigue: -1 },
          routes: { stability: 4 },
          relationships: { supermarket: 1 },
          addFlags: ["ch1_self_catering", "ch1_budget_planned"]
        },
        { tone: "steady", subtext: "小さな節約を未来の機材へ変える" }
      ),
      choice(
        "ch1_s1_envelope_make_dream_fund",
        "五千円だけ『何者かになる金』に分ける",
        [
          "用途はまだ決めない。ただの五千円札へ、自分で名前を付けた。生活費とは違い、未来を動かす時にだけ使う金だ。",
          "封筒を見るたびに誓いを思い出せる。数字を管理する癖と、勝負どころまで待つ忍耐が身についた。"
        ],
        {
          stats: { production: 1 },
          hidden: { ambition: 4 },
          routes: { strategy: 3, stability: 1 },
          addFlags: ["ch1_dream_fund", "ch1_budget_planned"]
        },
        { tone: "bold", subtext: "未来の勝負に使う資金を確保する" }
      )
    ],
    when: when({ flagsAny: ["ch1_cash_guarded", "ch1_budget_planned", "ch1_silent_vow"] }),
    priority: 28,
    oncePerRun: true,
    tags: ["dorm", "money", "stability"],
    visual: {
      background: "bg/ch1_dorm_room_empty",
      portrait: "portrait/hikakin_young",
      expression: "calm",
      eventCg: "cg/ch1_three_envelopes",
      accent: "green"
    }
  }),

  event({
    id: "ch1_s1_live_house",
    chapter: 1,
    slot: 1,
    title: "東京で最初の八小節",
    date: "2008年3月",
    location: "都内の小さなライブハウス",
    body: [
      "高校では、同じくビートボックスをする友人と音楽室へ通い、文化祭や小さなライブにも立った。それでも東京の地下会場には、ヒカキンより派手で、自信に満ちた演者が何人もいる。受付へ参加費を払うと、手元の二万円が現実的に減っていった。",
      "飛び入り枠でもらえた時間はわずか八小節。東京で絶対に何者かになるという言葉が、今度は観客の前で試される。"
    ],
    choices: [
      choice(
        "ch1_s1_live_hardest_technique",
        "最も難しい技を最初から出す",
        [
          "緊張で一音だけ崩れたが、低音が決まると前列の演者が顔を上げた。拍手は大きくない。それでも技術を見ていた人には届いた。",
          "失敗した一音ばかりが頭に残り、寮へ戻る電車でも口の形を反復した。悔しさが精度を押し上げる。"
        ],
        {
          stats: { beatbox: 4, energy: -6 },
          hidden: { perfectionism: 4, ambition: 2 },
          routes: { craft: 4 },
          addFlags: ["ch1_stage_technical", "ch1_stage_one_mistake", "ch1_school_stage_memory"]
        },
        { tone: "bold", subtext: "失敗の危険ごと実力を見せる" }
      ),
      choice(
        "ch1_s1_live_read_crowd",
        "簡単なリズムで観客を巻き込む",
        [
          "手拍子を促し、観客が乗ったところで音を一度止めた。静寂の後の一発に、会場から笑いと声が返る。",
          "難しい技をすべて見せなくても、人の反応は作れる。カメラの向こうにも観客がいると考えるきっかけになった。"
        ],
        {
          stats: { expression: 4, beatbox: 1, trust: 1 },
          hidden: { origin: 2 },
          routes: { mainstream: 3, network: 1 },
          addFlags: ["ch1_stage_crowdwork", "ch1_audience_imagined", "ch1_school_stage_memory"]
        },
        { tone: "warm", subtext: "技術より観客の熱を選ぶ" }
      ),
      choice(
        "ch1_s1_live_watch_only",
        "今日は出演せず、全員を観察する",
        [
          "名前を呼ばれる前に飛び入りを辞退した。悔しさは残るが、立つ位置、マイクの距離、客が飽きる瞬間をノートへ書き続ける。",
          "逃げたのか、研究したのか。答えは次の一本で証明するしかない。観察した構成は、後の撮影へそのまま生きた。"
        ],
        {
          stats: { production: 3, beatbox: 1, energy: 2 },
          hidden: { ambition: 3 },
          routes: { strategy: 3 },
          addFlags: ["ch1_stage_observer", "ch1_performance_notes", "ch1_school_stage_memory"]
        },
        { tone: "steady", subtext: "悔しさを研究材料として持ち帰る" }
      )
    ],
    when: when({ flagsAny: ["ch1_first_stage_search", "ch1_audience_imagined", "ch1_first_small_audience"] }),
    priority: 29,
    oncePerRun: true,
    tags: ["beatbox", "stage", "origin"],
    visual: {
      background: "bg/ch1_small_live_house",
      portrait: "portrait/hikakin_young",
      expression: "nervous",
      eventCg: "cg/ch1_first_stage",
      accent: "red"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 2: スーパー勤務
  // ---------------------------------------------------------------------------
  event({
    id: "ch1_s2_first_shift_fallback",
    chapter: 1,
    slot: 2,
    title: "値札と段ボール",
    date: "2008年4月",
    location: "東京・スーパーマーケット",
    body: [
      "初出勤の日、ヒカキンは早朝から飲料の段ボールを運び、倉庫を整理し、商品を売り場へ出し続けた。レジへ入れば接客の言葉と商品の位置も覚える。朝九時の開店時点で、すでに一日分働いたように腕が重い。",
      "手取りは月十三〜十五万円ほど。そこから寮費が天引きされる。勤務後には足が震え、マイクを持つ余力もほとんど残っていなかった。それでもここで給料を得なければ、東京にも動画にも居続けられない。"
    ],
    choices: [
      choice(
        "ch1_s2_shift_learn_everything",
        "誰より早く仕事を覚える",
        [
          "品出しの順番をメモし、分からないことはその場で聞いた。数日後には先輩から、一人で任せられると言われる。",
          "撮影前に眠ってしまう夜は増えたが、東京で生活を続ける足場と職場の信用を得た。",
          "月末、寮費と最低限の生活費を差し引いた最初の給料が入り、所持金は十万円増えた。"
        ],
        {
          stats: { money: 100_000, energy: -10, trust: 2 },
          hidden: { fatigue: 4 },
          routes: { stability: 4 },
          relationships: { supermarket: 6 },
          addFlags: ["ch1_work_reliable", "ch1_shift_exhaustion"]
        },
        { tone: "steady", subtext: "生活基盤を固めるが、夜の力を失う" }
      ),
      choice(
        "ch1_s2_shift_save_energy",
        "仕事は最低限こなし、夜へ体力を残す",
        [
          "頼まれたことはこなすが、自分から残業は引き受けなかった。先輩の視線は少し冷たい。",
          "その夜はマイクの前に立てた。職場での評価と、自分が本当に使いたい時間の間に最初の溝ができる。",
          "月末、寮費と生活費を差し引いた給料が入り、手元には九万五千円が残った。"
        ],
        {
          stats: { money: 95_000, energy: 4, production: 1 },
          hidden: { ambition: 2 },
          routes: { craft: 2 },
          relationships: { supermarket: -3 },
          addFlags: ["ch1_work_minimum", "ch1_night_energy_saved"]
        },
        { tone: "risky", subtext: "仕事の信用を削り、制作時間を守る" }
      ),
      choice(
        "ch1_s2_shift_listen_customers",
        "売り場の会話や流行を観察する",
        [
          "品出しをしながら、子供が欲しがる菓子や、客が迷う商品の説明を覚えていった。売り場には、人が何へ反応するかという答えが毎日並んでいる。",
          "作業速度は少し落ちたが、普通の人の興味を動画へ変える視点を得た。",
          "月末、寮費と生活費を差し引いた給料が入り、手元には九万五千円が残った。"
        ],
        {
          stats: { money: 95_000, expression: 2, production: 2, energy: -5 },
          routes: { mainstream: 2, strategy: 2 },
          relationships: { supermarket: 2 },
          addFlags: ["ch1_store_observer", "ch1_customer_interests"]
        },
        { tone: "warm", subtext: "仕事場を企画研究の場所に変える" }
      )
    ],
    priority: 0,
    oncePerRun: true,
    tags: ["supermarket", "work", "stability"],
    visual: {
      background: "bg/ch1_supermarket_backroom",
      portrait: "portrait/hikakin_uniform",
      expression: "tired",
      accent: "green"
    }
  }),

  event({
    id: "ch1_s2_hunger_shift",
    chapter: 1,
    slot: 2,
    title: "空腹の閉店作業",
    date: "2008年4月",
    location: "東京・スーパーマーケット",
    body: [
      "機材へ金を使いすぎた週、朝食は肉まん一個。昼も夜も社員食堂で一番安い二百円の定食を選び、休日は実家から持ってきた業務用のそばを一食ずつ茹でた。周囲が外へ昼食に出ても、貯金を減らす怖さの方が勝った。",
      "閉店後、売れ残った弁当が規則どおり廃棄箱へ入れられていく。先輩は空腹に気づき、食事を奢る代わりに翌朝の早番を手伝ってほしいと言う。",
      "受ければ助かるが、夜の撮影と翌日の練習時間は消える。この二百円定食を何年続けることになるかも、まだ分からない。"
    ],
    choices: [
      choice(
        "ch1_s2_hunger_accept_help",
        "好意を受け取り、早番を引き受ける",
        [
          "温かい定食を食べると、体にようやく力が戻った。翌朝は眠かったが、約束どおり誰より先に売り場へ立つ。",
          "先輩は動画のことを面白がり、困った時は言えと話した。借りを返す関係が、職場での居場所になる。",
          "その月の給料から寮費と生活費を引くと、九万五千円が手元へ残った。奢られた食事そのものが金を増やしたわけではない。"
        ],
        {
          stats: { energy: 7, money: 95_000, trust: 2 },
          hidden: { fatigue: 2 },
          routes: { stability: 3, network: 1 },
          relationships: { supermarket: 7 },
          addFlags: ["ch1_senior_helped", "ch1_owed_early_shift", "ch1_two_hundred_yen_meal"]
        },
        { tone: "warm", subtext: "撮影時間と引き換えに人との支えを得る" }
      ),
      choice(
        "ch1_s2_hunger_refuse",
        "断って寮へ戻り、予定どおり撮影する",
        [
          "空腹をごまかすように水を飲み、浴室へマイクを持ち込んだ。低音を出すたび腹が鳴り、何度も録り直す。",
          "完成した音には意地が残った。生活を危うくしてまで作った経験は、強さにも危うさにもなる。",
          "空腹を選んでも給料日は同じように来た。寮費と生活費を引いた九万五千円が入り、ようやく残高だけは持ち直した。"
        ],
        {
          stats: { money: 95_000, energy: -9, beatbox: 3, production: 1 },
          hidden: { fatigue: 5, ambition: 3, perfectionism: 2 },
          routes: { craft: 4 },
          addFlags: ["ch1_hungry_recording", "ch1_self_reliant_to_fault", "ch1_two_hundred_yen_meal"]
        },
        { tone: "risky", subtext: "空腹のまま作品を優先する" }
      ),
      choice(
        "ch1_s2_hunger_extra_shift",
        "撮影を一週間休み、追加勤務で取り戻す",
        [
          "動画の予定を消し、空いた勤務をすべて引き受けた。財布は少し戻ったが、チャンネルには新しい動きがない。",
          "夢を守るために夢を休む。その判断ができた自分へ安堵しながらも、置いていかれる焦りは残った。",
          "月末には通常の給料に追加勤務分が加わり、寮費と生活費を引いて十万五千円が手元へ残った。"
        ],
        {
          stats: { money: 105_000, energy: -5 },
          hidden: { ambition: 2, fatigue: 2 },
          routes: { stability: 5 },
          relationships: { supermarket: 4 },
          addFlags: ["ch1_extra_shift", "ch1_upload_delayed_for_life", "ch1_two_hundred_yen_meal"]
        },
        { tone: "steady", subtext: "制作を止めて生活を立て直す" }
      )
    ],
    when: when({ flagsAny: ["ch1_food_budget_tight"], maxStats: { money: 14_000 } }),
    priority: 28,
    oncePerRun: true,
    tags: ["supermarket", "money", "sacrifice"],
    visual: {
      background: "bg/ch1_supermarket_closing",
      portrait: "portrait/hikakin_uniform",
      expression: "hungry",
      eventCg: "cg/ch1_discarded_bento",
      accent: "red"
    }
  }),

  event({
    id: "ch1_s2_hometown_seniors",
    chapter: 1,
    slot: 2,
    title: "新潟訛りの休憩室",
    date: "2008年4月",
    location: "スーパー・従業員休憩室",
    body: [
      "高校へ届いた東京の求人は、たった二件。そのうち新潟県出身者が多く、社員寮もあるスーパーを選んだ。休憩室には実際に同郷の社員が何人もいて、安い店や寮生活のコツを次々に教えてくれる。",
      "話の流れでビートボックスを披露すると、先輩の一人が携帯電話を向けた。ネットへ出すなら、職場の名前や制服が映らないようにしろとも釘を刺される。"
    ],
    choices: [
      choice(
        "ch1_s2_hometown_show_more",
        "リクエストに応えて休憩室を沸かせる",
        [
          "冷蔵庫の音やレジの電子音を口で再現すると、疲れていた同僚たちが笑った。誰かの一日を少し軽くできることが嬉しい。",
          "一方で、勤務中に遊んでいたと誤解されないよう、撮影データは投稿せず自分だけの練習資料にした。",
          "月末、寮費と生活費を差し引いた最初の給料から、九万五千円が手元へ残った。"
        ],
        {
          stats: { money: 95_000, expression: 3, beatbox: 1, trust: 2 },
          hidden: { origin: 2 },
          routes: { mainstream: 2, network: 2 },
          relationships: { supermarket: 6 },
          addFlags: ["ch1_breakroom_audience", "ch1_work_privacy_learned"]
        },
        { tone: "warm", subtext: "身近な人を楽しませる感覚を覚える" }
      ),
      choice(
        "ch1_s2_hometown_ask_rules",
        "動画活動と職場の線引きを先に確認する",
        [
          "制服、売り場、客の顔は絶対に映さない。店の名前も勝手に出さない。曖昧だった境界を、上司と一緒に紙へ書き出した。",
          "自由は少し狭くなったが、後で取り返せない問題を避ける習慣が身についた。",
          "月末、寮費と生活費を差し引いた最初の給料から、九万五千円が手元へ残った。"
        ],
        {
          stats: { money: 95_000, trust: 4, production: 1 },
          routes: { strategy: 2, stability: 2 },
          relationships: { supermarket: 7 },
          addFlags: ["ch1_work_permission_clear", "ch1_work_privacy_learned"]
        },
        { tone: "steady", subtext: "先にルールを作り、信用を守る" }
      ),
      choice(
        "ch1_s2_hometown_hide_channel",
        "動画のことは伏せ、仕事だけに集中する",
        [
          "笑って話題を変え、チャンネル名は教えなかった。職場と夢が混ざれば、どちらも失う気がした。",
          "静かに働くことで評価は得たが、成功しても相談できない秘密が一つ増えた。",
          "月末、寮費と生活費を差し引いた最初の給料から、九万五千円が手元へ残った。動画を隠したこと自体が収入を生んだわけではない。"
        ],
        {
          stats: { money: 95_000, energy: -4 },
          hidden: { ambition: 2 },
          routes: { stability: 3 },
          relationships: { supermarket: 2 },
          addFlags: ["ch1_channel_hidden_at_work", "ch1_double_life"]
        },
        { tone: "steady", subtext: "職場と夢を完全に切り分ける" }
      )
    ],
    when: when({ flagsAny: ["ch1_dorm_seniors", "ch1_first_local_audience"], minRelationships: { supermarket: 3 } }),
    priority: 27,
    oncePerRun: true,
    tags: ["supermarket", "relationships", "privacy"],
    visual: {
      background: "bg/ch1_supermarket_breakroom",
      portrait: "portrait/hikakin_uniform",
      expression: "smiling",
      accent: "green"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 3: 最初の撮影場所
  // ---------------------------------------------------------------------------
  event({
    id: "ch1_s3_recording_place_fallback",
    chapter: 1,
    slot: 3,
    title: "音を出せる場所",
    date: "2008年5月",
    location: "スーパー社員寮",
    body: [
      "仕事を終えた夜、ヒカキンは安いマイクを机へ置いた。木造の壁は隣人のくしゃみまで聞こえるほど薄く、自室で低音を鳴らせば、そのまま相手の生活へ入り込んでしまう。",
      "浴室なら音はよく響く。屋外なら遠慮なく声を出せる。どこを選んでも欠点があり、理想の環境を待っていては一本も始まらない。"
    ],
    choices: [
      choice(
        "ch1_s3_place_room",
        "自室を布で囲って撮る",
        [
          "毛布と服を壁へ掛け、机の下へマイクを置いた。見栄えは悪いが、生活音はかなり小さくなる。",
          "音がこもるたび位置を変え、狭い部屋そのものを録音機材として使う方法を覚えた。"
        ],
        {
          stats: { production: 3, energy: -3 },
          hidden: { perfectionism: 1 },
          routes: { strategy: 2, craft: 1 },
          addFlags: ["ch1_record_room", "ch1_blanket_booth"]
        },
        { tone: "steady", subtext: "工夫で雑音を抑える" }
      ),
      choice(
        "ch1_s3_place_bath",
        "浴室の反響を利用する",
        [
          "冷たい浴室へマイクを持ち込み、一音鳴らす。低音が壁を回って戻り、安い機材とは思えない厚みになった。",
          "ただし廊下へも同じ音が漏れている。短時間で決めなければ、寮中を観客にしてしまう。"
        ],
        {
          stats: { beatbox: 2, production: 2, energy: -4 },
          hidden: { perfectionism: 1 },
          routes: { craft: 3 },
          relationships: { supermarket: -1 },
          addFlags: ["ch1_record_bath", "ch1_bath_reverb"]
        },
        { tone: "bold", subtext: "最高の響きと騒音の危険を取る" }
      ),
      choice(
        "ch1_s3_place_outside",
        "終電後の高架下へ行く",
        [
          "人通りの消えた高架下で、電車の来ない時間を狙って録音した。風と車の音に何度も邪魔される。",
          "やり直すうち、偶然通りかかった一人が足を止めた。カメラの外に観客がいる緊張が、表情を少し変えた。"
        ],
        {
          stats: { expression: 2, beatbox: 2, energy: -10 },
          hidden: { fatigue: 4, origin: 2 },
          routes: { craft: 2, network: 1 },
          addFlags: ["ch1_record_outside", "ch1_stranger_stopped"]
        },
        { tone: "risky", subtext: "体力を使い、人前の緊張を得る" }
      )
    ],
    priority: 0,
    oncePerRun: true,
    tags: ["recording", "dorm", "craft"],
    visual: {
      background: "bg/ch1_dorm_room_night",
      portrait: "portrait/hikakin_young",
      expression: "focused",
      accent: "blue"
    }
  }),

  event({
    id: "ch1_s3_bathroom_acoustics",
    chapter: 1,
    slot: 3,
    title: "浴室という録音室",
    date: "2008年5月",
    location: "スーパー社員寮・共用浴室",
    body: [
      "隣人のくしゃみまで聞こえる薄い壁を避け、狭いユニットバスへ体を折るように入った。機材店で聞いた話やステージで覚えたマイク距離を試すと、浴室の反響はただ大きいだけではない。立つ位置を数十センチ変えるだけで、安いマイクの低音が変わった。",
      "廊下で社員とすれ違えば、ヒカキンは小さな声で丁寧に頭を下げる。だが浴室の扉を閉め、録画ランプが点くと姿勢が変わった。大勢の前では緊張しても、一人でカメラへ向かうと、世界中の誰かへ音を届ける自分になれる。問題は利用時間が短く、一つの音を追い込むほど誰かの睡眠を削ってしまうことだった。"
    ],
    choices: [
      choice(
        "ch1_s3_bath_one_take",
        "十分だけ借り、一発撮りに挑む",
        [
          "タイマーを置き、迷う時間ごと削った。完璧ではないが、最後まで勢いのある映像が一本残る。",
          "制限があるからこそ出る集中力を知り、何度でも撮り直す以外の完成方法を覚えた。"
        ],
        {
          stats: { expression: 2, production: 3, beatbox: 1 },
          hidden: { perfectionism: -3 },
          routes: { mainstream: 2, craft: 1 },
          relationships: { supermarket: 2 },
          addFlags: ["ch1_bath_one_take", "ch1_record_bath"]
        },
        { tone: "bold", subtext: "完璧さより一回の熱を残す" }
      ),
      choice(
        "ch1_s3_bath_measure_positions",
        "今夜は投稿せず、反響位置を測る",
        [
          "床へ小さな目印を付け、同じ音を位置ごとに録った。最も響く場所を見つけたころには、撮影できる時間は終わっていた。",
          "一本は遅れたが、次から再現できる録音手順を得る。研究は目立たなくても、後の大作を支える。"
        ],
        {
          stats: { production: 4, beatbox: 2, energy: -4 },
          hidden: { perfectionism: 3 },
          routes: { craft: 4, strategy: 1 },
          addFlags: ["ch1_bath_mapped", "ch1_upload_delayed_for_quality"]
        },
        { tone: "steady", subtext: "一本を犠牲に再現可能な技術を得る" }
      ),
      choice(
        "ch1_s3_bath_ask_permission",
        "寮の管理担当へ使用時間を相談する",
        [
          "事情を正直に話すと、清掃後の十五分だけならと許可が出た。条件は、苦情が一度でも来たらやめること。",
          "自由な時間は短いが、後ろめたさなく音を出せる。信用が制作環境を作る経験になった。"
        ],
        {
          stats: { trust: 3, production: 2 },
          routes: { stability: 2, strategy: 2 },
          relationships: { supermarket: 5 },
          addFlags: ["ch1_bath_permission", "ch1_record_bath"]
        },
        { tone: "warm", subtext: "交渉して小さな録音枠を得る" }
      )
    ],
    when: when({ flagsAny: ["ch1_shop_advice", "ch1_stage_technical", "ch1_performance_notes"], minRoutes: { craft: 2 } }),
    priority: 27,
    oncePerRun: true,
    tags: ["recording", "bathroom", "technique"],
    visual: {
      background: "bg/ch1_dorm_bathroom",
      portrait: "portrait/hikakin_young",
      expression: "concentrating",
      eventCg: "cg/ch1_bathroom_microphone",
      accent: "blue"
    }
  }),

  event({
    id: "ch1_s3_outdoor_interruption",
    chapter: 1,
    slot: 3,
    title: "高架下の一人目",
    date: "2008年5月",
    location: "社員寮近くの高架下",
    body: [
      "ライブハウスで人前の音を知ったヒカキンは、勤務後に高架下へ向かった。カメラを置くと、帰宅途中の会社員が少し離れて立ち止まる。",
      "録画を続ければ、知らない人の反応も映り込む。止めれば安全だが、人前で撮れる貴重な機会を逃す。"
    ],
    choices: [
      choice(
        "ch1_s3_outdoor_ask_consent",
        "撮影中だと伝え、映ってよいか尋ねる",
        [
          "会社員は顔を映さない条件で頷き、最後まで聞いてくれた。撮り終えると、技術はすごいが表情が怖いと率直に教えてくれる。",
          "許可を取る手間と、視聴者目線の助言。その両方が後の撮影習慣へ残った。"
        ],
        {
          stats: { expression: 3, trust: 3, production: 1 },
          routes: { network: 2, mainstream: 1 },
          addFlags: ["ch1_stranger_feedback", "ch1_consent_habit", "ch1_record_outside"]
        },
        { tone: "warm", subtext: "安全を確かめ、率直な感想を得る" }
      ),
      choice(
        "ch1_s3_outdoor_use_pressure",
        "観客がいる緊張ごと一発撮りする",
        [
          "カメラの範囲を狭め、会社員が映らない位置で演奏を続けた。緊張でテンポは速くなったが、普段にない勢いが生まれる。",
          "会社員の拍手まで音に入り、部屋では作れない映像になった。"
        ],
        {
          stats: { expression: 3, beatbox: 2, energy: -5 },
          hidden: { origin: 2 },
          routes: { mainstream: 2, craft: 1 },
          addFlags: ["ch1_outdoor_one_take", "ch1_record_outside"]
        },
        { tone: "bold", subtext: "偶然の観客を熱へ変える" }
      ),
      choice(
        "ch1_s3_outdoor_stop",
        "録画を止め、場所を譲る",
        [
          "映り込みの問題を避けるため、すぐカメラを止めた。会社員が去ったころには風が強まり、その夜の撮影は諦める。",
          "一本を失った悔しさは残る。それでも他人を勝手に素材にしない線だけは守った。"
        ],
        {
          stats: { trust: 4, energy: -4 },
          hidden: { origin: 1 },
          routes: { stability: 2 },
          addFlags: ["ch1_privacy_over_upload", "ch1_upload_delayed_for_ethics"]
        },
        { tone: "steady", subtext: "投稿より他人の権利を優先する" }
      )
    ],
    when: when({ flagsAny: ["ch1_stage_crowdwork", "ch1_stage_observer", "ch1_first_small_audience"] }),
    priority: 26,
    oncePerRun: true,
    tags: ["recording", "outside", "audience"],
    visual: {
      background: "bg/ch1_underpass_night",
      portrait: "portrait/hikakin_young",
      expression: "alert",
      eventCg: "cg/ch1_underpass_listener",
      accent: "violet"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 4: 初投稿
  // ---------------------------------------------------------------------------
  event({
    id: "ch1_s4_first_upload_fallback",
    chapter: 1,
    slot: 4,
    title: "再生数ゼロの公開ボタン",
    date: "2008年6月",
    location: "スーパー社員寮・自室",
    body: [
      "高校時代にも、浴室でビートボックスを撮って投稿したことがある。だが後から見返すと、恥ずかしいほど未熟に聞こえて削除した。今度こそ残せる一本にするため、社員寮で撮った三分の映像を編集画面へ置く。冒頭にはマイクを触る音が入り、最後の数秒ではリズムがわずかに走っている。",
      "チャンネル登録者はゼロ。待っている人は誰もいないからこそ、公開ボタンを押す理由は自分で作らなければならない。"
    ],
    speaker: "ヒカキン",
    quote: "誰も待ってない。だから、ここから待たれる人になる。",
    choices: [
      choice(
        "ch1_s4_first_post_now",
        "小さなミスごと、今夜公開する",
        [
          "震える指で公開を押した。再生ページを開き直しても数字はゼロのまま。それでも、自分の音が初めて世界へ置かれた。",
          "翌朝には三回。そのうち一回は自分かもしれない。それでも削除せず、次を作ることにした。"
        ],
        {
          stats: { subscribers: 1, production: 2, expression: 1 },
          hidden: { perfectionism: -3, origin: 4, ambition: 2 },
          routes: { mainstream: 2 },
          addFlags: ["ch1_first_upload_fast", "ch1_first_video_3_views", "ch1_deleted_early_video"],
          video: {
            title: "BEATBOX 001",
            views: 3,
            subscribersGained: 1,
            kind: "beatbox",
            chapter: 1
          }
        },
        { tone: "bold", subtext: "完成度より、世界へ出す一歩を優先" }
      ),
      choice(
        "ch1_s4_first_fix_ending",
        "悪い部分だけを撮り直す",
        [
          "最後の十五秒を録り直し、音のつながりを何度も確認した。最初からやり直すほどではないと、自分へ線を引く。",
          "公開翌日、再生数は十七。短い英語コメントが一つ付き、辞書を使って何度も読み返した。"
        ],
        {
          stats: { subscribers: 3, production: 3, beatbox: 1, energy: -4 },
          hidden: { perfectionism: 1, origin: 4 },
          routes: { craft: 2, strategy: 1 },
          addFlags: ["ch1_first_upload_balanced", "ch1_first_foreign_comment", "ch1_deleted_early_video"],
          video: {
            title: "Japanese Beatbox Practice #1",
            views: 17,
            subscribersGained: 3,
            kind: "beatbox",
            chapter: 1
          }
        },
        { tone: "steady", subtext: "修正範囲を決めて投稿まで進める" }
      ),
      choice(
        "ch1_s4_first_restart",
        "最初からすべて撮り直す",
        [
          "一音のズレを見逃せず、撮影データを消した。翌日も、その翌日も仕事の後に録り直し、完成まで二週間かかる。",
          "公開した動画は四十七回再生され、『音がすごい』というコメントが一つ付いた。その一文を、眠る前に何度も開いた。"
        ],
        {
          stats: { subscribers: 7, production: 3, beatbox: 3, energy: -9 },
          hidden: { perfectionism: 5, fatigue: 3, origin: 3 },
          routes: { craft: 4 },
          addFlags: ["ch1_first_upload_perfect", "ch1_first_comment_sound", "ch1_deleted_early_video"],
          video: {
            title: "JAPANESE BEATBOX",
            views: 47,
            subscribersGained: 7,
            kind: "beatbox",
            chapter: 1
          }
        },
        { tone: "risky", subtext: "時間と体力を払い、納得できる一本にする" }
      )
    ],
    priority: 0,
    oncePerRun: true,
    tags: ["upload", "origin", "first-video"],
    visual: {
      background: "bg/ch1_dorm_pc_night",
      portrait: "portrait/hikakin_young",
      expression: "nervous",
      eventCg: "cg/ch1_first_publish_button",
      accent: "blue"
    }
  }),

  event({
    id: "ch1_s4_bath_complaint",
    chapter: 1,
    slot: 4,
    title: "壁を三回叩く音",
    date: "2008年6月",
    location: "スーパー社員寮・浴室",
    body: [
      "低音を録り直している最中、隣の壁が三回鳴った。ヒカキンが音を止めると、廊下から夜勤明けの社員の咳払いが聞こえる。",
      "実家で練習を始めたころも、家族から毎日『うるさい』と言われた。それでも続け、最後には何も言われなくなった。だが社員寮の隣人へ、家族と同じ我慢を求めることはできない。録音はあと少しで完成する。"
    ],
    choices: [
      choice(
        "ch1_s4_bath_apologize",
        "すぐ止め、翌朝きちんと謝る",
        [
          "翌朝、菓子パンを持って隣室を訪ねた。相手は不機嫌そうだったが、時間を決めるなら構わないと譲ってくれる。",
          "動画は数日遅れた。しかし、後ろめたさなく撮れる時間帯と、約束を守る信用を得た。"
        ],
        {
          stats: { trust: 5, money: -500, production: 1 },
          routes: { stability: 3 },
          relationships: { supermarket: 5 },
          addFlags: ["ch1_neighbor_apology", "ch1_recording_hours_agreed"]
        },
        { tone: "warm", subtext: "完成を遅らせ、暮らす人との約束を作る" }
      ),
      choice(
        "ch1_s4_bath_finish_quick",
        "あと一回だけ録り切る",
        [
          "息を整える時間も惜しみ、一回で最後まで鳴らした。映像には切迫した勢いが残る。",
          "公開はできたが、翌日管理担当から注意を受けた。次に苦情が出れば浴室撮影は禁止される。"
        ],
        {
          stats: { subscribers: 4, expression: 2, energy: -4, trust: -2 },
          hidden: { controversy: 1 },
          routes: { mainstream: 2 },
          relationships: { supermarket: -5 },
          addFlags: ["ch1_bath_warning", "ch1_first_upload_fast"],
          video: {
            title: "BATHROOM BEATBOX",
            views: 31,
            subscribersGained: 4,
            kind: "beatbox",
            chapter: 1
          }
        },
        { tone: "risky", subtext: "一度の勢いと引き換えに警告を受ける" }
      ),
      choice(
        "ch1_s4_bath_move_room",
        "途中から自室へ移して編集でつなぐ",
        [
          "反響の違う二つの録音を、低性能なパソコンで夜明けまで調整した。境目を隠すため、不要な部分を切る技術を覚える。",
          "完成した動画は少し不自然だが、撮影環境の欠点を編集で補えるという発見が残った。"
        ],
        {
          stats: { production: 5, energy: -8 },
          hidden: { fatigue: 3 },
          routes: { strategy: 3, craft: 1 },
          addFlags: ["ch1_first_editing_solution", "ch1_record_room"]
        },
        { tone: "steady", subtext: "環境の差を編集技術へ変える" }
      )
    ],
    when: when({ flagsAny: ["ch1_record_bath", "ch1_bath_reverb"], flagsNone: ["ch1_bath_permission"] }),
    priority: 28,
    oncePerRun: true,
    tags: ["upload", "bathroom", "trust"],
    visual: {
      background: "bg/ch1_dorm_bathroom_night",
      portrait: "portrait/hikakin_young",
      expression: "startled",
      eventCg: "cg/ch1_wall_knock",
      accent: "red"
    }
  }),

  event({
    id: "ch1_s4_first_foreign_reply",
    chapter: 1,
    slot: 4,
    title: "読めない一行",
    date: "2008年6月",
    location: "スーパー社員寮・自室",
    body: [
      "初投稿には長い間何も起きなかった。寝る前にもう一度だけ更新すると、見慣れない英語のコメントが一つ増えている。",
      "翻訳サイトへ単語を一つずつ入れると、『日本人？　音がいい。もっと見たい』という意味らしい。遠い国の一人が、社員寮の浴室までたどり着いた。"
    ],
    choices: [
      choice(
        "ch1_s4_foreign_reply_english",
        "辞書を使い、英語で丁寧に返信する",
        [
          "短い返事を書くのに三十分かかった。翌日、相手からまた返事が届き、別の動画も見たと書かれている。",
          "言葉が不完全でも、届けようとすれば関係は続く。海外向けタイトルや説明文を意識するきっかけになった。"
        ],
        {
          stats: { subscribers: 3, trust: 2, production: 1 },
          hidden: { origin: 3 },
          routes: { network: 2, strategy: 2 },
          addFlags: ["ch1_replied_overseas", "ch1_overseas_title_seed", "ch1_first_foreign_comment"]
        },
        { tone: "warm", subtext: "一人の視聴者と国境を越えて話す" }
      ),
      choice(
        "ch1_s4_foreign_study_channel",
        "返信より先に、その人が見ている動画を調べる",
        [
          "相手の公開リストから、海外で人気のテンポや動画尺を何時間も分析した。返事は遅れたが、次の一本の構成が見えてくる。",
          "コメントを感想だけでなく、視聴者を知る入口として使う戦略が身についた。"
        ],
        {
          stats: { production: 3, energy: -3 },
          routes: { strategy: 4 },
          addFlags: ["ch1_overseas_viewer_research", "ch1_overseas_title_seed"]
        },
        { tone: "steady", subtext: "一つの反応から市場を読む" }
      ),
      choice(
        "ch1_s4_foreign_make_better_video",
        "返信せず、次の動画で応える",
        [
          "言葉に自信がなく、返事は書けなかった。その代わり、次はもっと正確な音を出すとノートへ記す。",
          "視聴者には沈黙に見えても、ヒカキンの中ではコメントが練習を続ける理由になった。"
        ],
        {
          stats: { beatbox: 3, energy: -2 },
          hidden: { perfectionism: 3, origin: 2 },
          routes: { craft: 4 },
          addFlags: ["ch1_answer_with_craft", "ch1_first_foreign_comment"]
        },
        { tone: "bold", subtext: "言葉ではなく次の作品で返す" }
      )
    ],
    when: when({ flagsAny: ["ch1_overseas_notebook", "ch1_overseas_research_ready", "ch1_internet_first"] }),
    priority: 26,
    oncePerRun: true,
    tags: ["upload", "overseas", "viewer"],
    visual: {
      background: "bg/ch1_dorm_pc_night",
      portrait: "portrait/hikakin_young",
      expression: "surprised_happy",
      eventCg: "cg/ch1_first_foreign_comment",
      accent: "violet"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 5: 月1〜2本の積み重ね
  // ---------------------------------------------------------------------------
  event({
    id: "ch1_s5_slow_months_fallback",
    chapter: 1,
    slot: 5,
    title: "月に一度の公開日",
    date: "2008年秋",
    location: "社員寮とスーパーマーケット",
    body: [
      "季節が変わっても、早朝の品出し、倉庫整理、接客が終わると夜から練習、撮影、編集が始まった。百パーセントうまくいったと思えるまで何度も撮り直し、睡眠を削っても公開できるのは月に一、二本だけだった。",
      "朝起きると真っ先に古いパソコンを開き、再生数、海外からのアクセス、コメントを確認する。一回でも増えていれば『よっしゃ』と呟き、その小さな勝利を持ってスーパーへ向かった。",
      "登録者はまだ両手で数えられるほど。誰にも知られない時間が長くなるほど、『何者かになる』という言葉は希望ではなく、自分へ課した宿題になっていく。"
    ],
    choices: [
      choice(
        "ch1_s5_months_research",
        "海外動画を一日一本、必ず分析する",
        [
          "再生回数に関係なく、導入、音、表情、コメントをノートへ写した。真似するのではなく、なぜ見続けてしまうのかを考える。",
          "投稿数は増えないが、一本を組み立てる目は確実に育っていった。"
        ],
        {
          stats: { production: 4, beatbox: 2, energy: -4 },
          hidden: { perfectionism: 2, fatigue: 2 },
          routes: { strategy: 3, craft: 2 },
          addFlags: ["ch1_daily_overseas_study", "ch1_slow_high_quality"]
        },
        { tone: "steady", subtext: "投稿できない日も研究を積み上げる" }
      ),
      choice(
        "ch1_s5_months_more_uploads",
        "完成度を下げても月四本へ増やす",
        [
          "一音のミスなら残し、短い映像も公開した。再生数が一桁の動画もあったが、コメントが付く題材と無反応の題材の差が見えてくる。",
          "完璧な一本では得られなかった、試して学ぶ速度を手に入れた。"
        ],
        {
          stats: { subscribers: 18, production: 3, expression: 2, energy: -6 },
          hidden: { perfectionism: -5, fatigue: 2 },
          routes: { mainstream: 3, strategy: 2 },
          addFlags: ["ch1_upload_frequency_up", "ch1_learned_from_small_data"],
          video: {
            title: "30 SECOND BEATBOX",
            views: 126,
            subscribersGained: 18,
            kind: "short-beatbox",
            chapter: 1
          }
        },
        { tone: "bold", subtext: "品質を少し譲り、反応から学ぶ" }
      ),
      choice(
        "ch1_s5_months_keep_pace",
        "月一〜二本のペースを崩さない",
        [
          "他人の伸び方を見ても、焦って粗い映像を出さなかった。仕事を休まず、納得した動画だけを静かに積み上げる。",
          "数字は遅い。それでも辞めなかった年月そのものが、後に更新を続ける力になる。"
        ],
        {
          stats: { subscribers: 8, beatbox: 3, trust: 2, energy: 2 },
          hidden: { origin: 3, ambition: 2, perfectionism: 1 },
          routes: { craft: 2, stability: 3 },
          addFlags: ["ch1_monthly_pace_kept", "ch1_consistency_proven"]
        },
        { tone: "steady", subtext: "遅くても生活と品質を共存させる" }
      )
    ],
    priority: 0,
    oncePerRun: true,
    tags: ["routine", "persistence", "upload"],
    visual: {
      background: "bg/ch1_dorm_calendar",
      portrait: "portrait/hikakin_young",
      expression: "tired_determined",
      eventCg: "cg/ch1_monthly_montage",
      accent: "blue"
    }
  }),

  event({
    id: "ch1_s5_double_life_pressure",
    chapter: 1,
    slot: 5,
    title: "二つの名前",
    date: "2008年秋",
    location: "スーパー・従業員入口",
    body: [
      "職場でチャンネルを隠してきたヒカキンは、休憩中に同僚が自分の動画を偶然再生しているのを見た。画面の中の浴室と、目の前の社員寮はすぐ結びつきそうだ。",
      "名乗れば応援してもらえるかもしれない。しかし勤務態度まで動画の評価と結びつけば、生活の逃げ場はなくなる。"
    ],
    choices: [
      choice(
        "ch1_s5_double_confess",
        "自分の動画だと打ち明ける",
        [
          "同僚は驚いた後、次の休憩までに全動画を見た。仕事中に宣伝はしないという約束で、静かに応援してくれる。",
          "秘密が一つ減り、低い再生数を笑わず見守る最初の身近な視聴者ができた。"
        ],
        {
          stats: { subscribers: 5, trust: 3, expression: 1 },
          hidden: { origin: 2 },
          routes: { network: 2 },
          relationships: { supermarket: 5 },
          addFlags: ["ch1_work_knows_channel", "ch1_coworker_first_fan"]
        },
        { tone: "warm", subtext: "秘密を明かし、身近な応援を得る" }
      ),
      choice(
        "ch1_s5_double_stay_silent",
        "気づかないふりをして通り過ぎる",
        [
          "イヤホンから自分の低音が漏れる横を、制服姿のまま通り過ぎた。胸は速く鳴ったが、同僚は気づかない。",
          "仕事と動画を切り分けることには成功した。その代わり、成功しても失敗しても一人で抱える癖が強くなる。"
        ],
        {
          stats: { energy: -2 },
          hidden: { ambition: 2, fatigue: 1 },
          routes: { stability: 2, craft: 1 },
          addFlags: ["ch1_channel_still_secret", "ch1_double_life_deepened"]
        },
        { tone: "steady", subtext: "生活の逃げ場を守る" }
      ),
      choice(
        "ch1_s5_double_ask_opinion",
        "正体を伏せたまま、動画の感想を聞く",
        [
          "『これ、何が面白い？』と何気なく尋ねると、同僚は音はすごいが最初が長いと答えた。本人だと知らないからこその率直さだった。",
          "少し傷つきながらも、次の動画では冒頭を短くした。普通の視聴者の感覚を知る貴重な実験になる。"
        ],
        {
          stats: { production: 3, expression: 2 },
          routes: { strategy: 3, mainstream: 1 },
          addFlags: ["ch1_anonymous_feedback", "ch1_shorter_intro_learned"]
        },
        { tone: "bold", subtext: "匿名の立場を利用して本音を聞く" }
      )
    ],
    when: when({ flagsAny: ["ch1_channel_hidden_at_work", "ch1_double_life"] }),
    priority: 26,
    oncePerRun: true,
    tags: ["routine", "supermarket", "identity"],
    visual: {
      background: "bg/ch1_supermarket_staff_entrance",
      portrait: "portrait/hikakin_uniform",
      expression: "frozen",
      eventCg: "cg/ch1_coworker_watching_phone",
      accent: "violet"
    }
  }),

  event({
    id: "ch1_s5_perfect_take_lost",
    chapter: 1,
    slot: 5,
    title: "消えた最高のテイク",
    date: "2008年冬",
    location: "スーパー社員寮・自室",
    body: [
      "何十回も録り直し、ようやく納得したテイクを保存しようとした瞬間、低性能なパソコンが固まった。再起動後、ファイルは開けない。",
      "仕事まで残り四時間。最初から録り直せば寝る時間は消える。失った一本をどう扱うかが、完璧主義の形を変える。"
    ],
    choices: [
      choice(
        "ch1_s5_lost_retake_now",
        "眠らず、今すぐ同じものを録り直す",
        [
          "疲れで精度は落ちたが、夜明け前に一本を取り戻した。出勤中、立ったまま眠りそうになって上司から注意される。",
          "動画を守る執念は強くなった。一方で、体を削ることを努力だと思い込む危険も残る。"
        ],
        {
          stats: { beatbox: 3, production: 2, energy: -14, trust: -2 },
          hidden: { fatigue: 7, perfectionism: 4, ambition: 2 },
          routes: { craft: 4 },
          relationships: { supermarket: -3 },
          addFlags: ["ch1_sleepless_retake", "ch1_burnout_seed"]
        },
        { tone: "risky", subtext: "体力を犠牲に作品を取り戻す" }
      ),
      choice(
        "ch1_s5_lost_publish_fragment",
        "残った短い断片だけを投稿する",
        [
          "壊れず残っていた二十秒を、『消えた動画の残骸』として公開した。完成品ではないのに、普段より気軽なコメントが付く。",
          "失敗を隠さず見せることが、視聴者との距離を縮める場合もあると知った。"
        ],
        {
          stats: { subscribers: 12, expression: 3, production: 1 },
          hidden: { perfectionism: -5, origin: 2 },
          routes: { mainstream: 3 },
          addFlags: ["ch1_failure_fragment_posted", "ch1_comedy_from_failure"],
          video: {
            title: "最高のテイクが消えました",
            views: 204,
            subscribersGained: 12,
            kind: "behind-the-scenes",
            chapter: 1
          }
        },
        { tone: "bold", subtext: "失敗そのものを一本に変える" }
      ),
      choice(
        "ch1_s5_lost_sleep_and_redesign",
        "今日は眠り、企画から作り直す",
        [
          "悔しさを抱えたままパソコンを閉じた。翌週、同じ演目ではなく短く強い構成へ作り直す。",
          "失った完成品を再現するより、次の完成品を良くする。切り替える力が制作の一部になった。"
        ],
        {
          stats: { energy: 8, production: 4 },
          hidden: { fatigue: -3, perfectionism: -2 },
          routes: { strategy: 3, stability: 1 },
          addFlags: ["ch1_redesigned_after_loss", "ch1_backup_lesson"]
        },
        { tone: "steady", subtext: "執着を手放し、次の構成へ進む" }
      )
    ],
    when: when({ minHidden: { perfectionism: 65 }, minRoutes: { craft: 3 } }),
    priority: 25,
    oncePerRun: true,
    tags: ["routine", "perfectionism", "failure"],
    visual: {
      background: "bg/ch1_dorm_pc_error",
      portrait: "portrait/hikakin_young",
      expression: "shocked",
      eventCg: "cg/ch1_corrupted_file",
      accent: "red"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 6: パートナー申請拒否（固定アンカー）
  // ---------------------------------------------------------------------------
  event({
    id: "ch1_s6_partner_rejected_fallback",
    chapter: 1,
    slot: 6,
    title: "参加基準を満たしていません",
    date: "2009年",
    location: "スーパー社員寮・自室",
    body: [
      "動画から収益を得られるパートナー制度を知り、ヒカキンは半信半疑で申請した。もし少額でも機材代になれば、仕事と投稿の間に余裕が生まれるかもしれない。",
      "数日後に届いた答えは短かった。『現在、あなたのチャンネルは参加基準を満たしていません』。誰にも見られていない事実を、運営側から正式に突きつけられた気がした。"
    ],
    speaker: "ヒカキン",
    quote: "一度断られたくらいで、何者にもなれないと決まったわけじゃない。",
    choices: [
      choice(
        "ch1_s6_reject_improve_skill",
        "技術が足りない。もっと上手くなる",
        [
          "拒否メールを印刷し、練習ノートの最初へ挟んだ。悔しさを再生数ではなく、一音ずつの精度へ向ける。",
          "申請のことは忘れない。ただ次に扉を叩くときは、断れない作品を持っていくと決めた。"
        ],
        {
          stats: { beatbox: 5, production: 2, energy: -5 },
          hidden: { ambition: 5, perfectionism: 3, origin: 2 },
          routes: { craft: 5 },
          addFlags: ["ch1_rejection_craft", "ch1_rejection_remembered"]
        },
        { tone: "bold", subtext: "悔しさを技術へ変える" }
      ),
      choice(
        "ch1_s6_reject_study_system",
        "何が足りないのか、仕組みから調べる",
        [
          "人気チャンネルの投稿間隔、題名、説明文、再生が伸びる経路を表へまとめた。技術だけでは発見されないことが数字から見えてくる。",
          "YouTubeを仕事とは考えていない。それでも、見てもらうための仕組みを理解することは演奏の一部だと思い直した。"
        ],
        {
          stats: { production: 5, energy: -4 },
          hidden: { ambition: 4 },
          routes: { strategy: 5 },
          addFlags: ["ch1_rejection_strategy", "ch1_algorithm_notes", "ch1_rejection_remembered"]
        },
        { tone: "steady", subtext: "感情ではなく構造を研究する" }
      ),
      choice(
        "ch1_s6_reject_ignore_money",
        "収益は忘れ、好きな音を投稿し続ける",
        [
          "メールを閉じ、いつもの練習動画を撮った。金にならなくても、この音を世界へ置きたいという気持ちは拒否されていない。",
          "遠回りになるかもしれない。それでも、数字より先に始めた理由を守った。"
        ],
        {
          stats: { trust: 2, beatbox: 3, energy: 1 },
          hidden: { origin: 7, controversy: -1 },
          routes: { craft: 2, stability: 1 },
          addFlags: ["ch1_rejection_origin", "ch1_money_not_motive", "ch1_rejection_remembered"]
        },
        { tone: "warm", subtext: "拒否されても、投稿理由は手放さない" }
      )
    ],
    mandatory: true,
    priority: 50,
    oncePerRun: true,
    tags: ["anchor", "partner", "rejection"],
    visual: {
      background: "bg/ch1_dorm_pc_day",
      portrait: "portrait/hikakin_young",
      expression: "hurt_determined",
      eventCg: "cg/ch1_partner_rejection_mail",
      accent: "red"
    }
  }),

  event({
    id: "ch1_s6_partner_rejected_perfectionist",
    chapter: 1,
    slot: 6,
    title: "四十七回では足りない",
    date: "2009年",
    location: "スーパー社員寮・自室",
    body: [
      "何十回も撮り直した動画に付いた再生数は四十七。そのチャンネルで申請したパートナー制度から、不合格のメールが届いた。",
      "ヒカキンには、四十七人へ届いた喜びと、何週間も費やして四十七回という現実の両方があった。完璧な音さえ作れば発見される、という信念が揺れる。"
    ],
    speaker: "ヒカキン",
    quote: "完成度を上げるだけじゃ、入口にすら立てないのか。",
    choices: [
      choice(
        "ch1_s6_perfect_double_down",
        "それでも、技術で黙らせる",
        [
          "再生数の画面を閉じ、一番苦手な低音を朝まで練習した。発見されないなら、発見された瞬間に忘れられない音を用意する。",
          "頑固さは深まったが、後のゲームBGM再現を成立させる精度もここで育つ。"
        ],
        {
          stats: { beatbox: 6, energy: -8 },
          hidden: { perfectionism: 5, fatigue: 3, ambition: 5 },
          routes: { craft: 6 },
          addFlags: ["ch1_rejection_craft", "ch1_unforgettable_sound_vow", "ch1_rejection_remembered"]
        },
        { tone: "risky", subtext: "発見後に忘れられない精度へ賭ける" }
      ),
      choice(
        "ch1_s6_perfect_learn_showing",
        "音だけでなく、見せ方を学ぶ",
        [
          "自分の動画を無音で再生すると、冒頭からほとんど表情が変わらない。上手さを伝える前に、視聴者が離れる理由が見えた。",
          "鏡の前で間と表情を練習する。職人であることを捨てず、見てもらう技術を足す道を選んだ。"
        ],
        {
          stats: { expression: 5, production: 3 },
          hidden: { perfectionism: -1, ambition: 3 },
          routes: { mainstream: 4, craft: 1 },
          addFlags: ["ch1_rejection_showmanship", "ch1_visual_performance_study", "ch1_rejection_remembered"]
        },
        { tone: "bold", subtext: "職人技へ伝える力を足す" }
      ),
      choice(
        "ch1_s6_perfect_post_experiments",
        "短い実験動画を増やして反応を見る",
        [
          "完成作の間に、十秒の効果音や練習断片を投稿した。粗い動画には批判も付いたが、何に人が反応するかが初めて比較できる。",
          "投稿を完成品の展示ではなく、視聴者と一緒に答えを探す場所として見るようになった。"
        ],
        {
          stats: { subscribers: 25, production: 4, expression: 2 },
          hidden: { perfectionism: -4 },
          routes: { strategy: 5 },
          addFlags: ["ch1_rejection_experiment", "ch1_effect_sound_tests", "ch1_rejection_remembered"]
        },
        { tone: "steady", subtext: "小さな投稿をデータに変える" }
      )
    ],
    when: when({ minHidden: { perfectionism: 68 }, flagsAny: ["ch1_first_upload_perfect", "ch1_slow_high_quality", "ch1_answer_with_craft"] }),
    mandatory: true,
    priority: 65,
    oncePerRun: true,
    tags: ["anchor", "partner", "perfectionism"],
    visual: {
      background: "bg/ch1_dorm_pc_day",
      portrait: "portrait/hikakin_young",
      expression: "frustrated",
      eventCg: "cg/ch1_partner_rejection_47",
      accent: "red"
    }
  }),

  event({
    id: "ch1_s6_partner_rejected_defiant",
    chapter: 1,
    slot: 6,
    title: "いつか向こうから来させる",
    date: "2009年",
    location: "スーパー社員寮・自室",
    body: [
      "申請を断る定型文を読んだ瞬間、落ち込むより先に腹が立った。何者かになるため東京へ来た自分を、数字だけで入口から追い返されたように感じる。",
      "もちろん、今のチャンネルが小さいことは事実だ。この怒りを作品へ向けるか、運営や世間への敵意へ向けるかで、野心の形が変わる。"
    ],
    speaker: "ヒカキン",
    quote: "次は申請しない。向こうから来るくらいの動画を作る。",
    choices: [
      choice(
        "ch1_s6_defiant_vow",
        "拒否メールを壁へ貼り、目標にする",
        [
          "机の正面へメールを貼った。嫌でも毎晩目に入り、そのたびに練習を始める理由になる。",
          "見返したいという感情を、誰かを攻撃するのではなく結果へ変えると決めた。"
        ],
        {
          stats: { beatbox: 3, production: 2 },
          hidden: { ambition: 8, controversy: -1 },
          routes: { craft: 3, strategy: 2 },
          addFlags: ["ch1_partner_must_invite_me", "ch1_rejection_on_wall", "ch1_rejection_remembered"]
        },
        { tone: "bold", subtext: "怒りを次の結果へ向ける" }
      ),
      choice(
        "ch1_s6_defiant_public_complaint",
        "拒否されたことを動画で話す",
        [
          "小さなチャンネルへ向けて、悔しさを隠さず話した。共感する声もあれば、『先に面白い動画を作れ』という厳しいコメントも付く。",
          "注目は少し増えたが、怒りを見せると再生が伸びるという危うい手応えも得てしまった。"
        ],
        {
          stats: { subscribers: 30, expression: 3, trust: -1 },
          hidden: { controversy: 4, ambition: 3 },
          routes: { controversy: 3, mainstream: 1 },
          addFlags: ["ch1_rejection_complaint_video", "ch1_attention_from_anger", "ch1_rejection_remembered"],
          video: {
            title: "パートナー申請を断られました",
            views: 612,
            subscribersGained: 30,
            kind: "talk",
            chapter: 1
          }
        },
        { tone: "risky", subtext: "本音で注目を得るが、怒りの成功体験が残る" }
      ),
      choice(
        "ch1_s6_defiant_ask_viewers",
        "視聴者へ、次に見たいものを尋ねる",
        [
          "拒否された事実より、『何なら最後まで見たいですか』と投稿した。少ない視聴者から、ゲームの音や身近な効果音という具体的な案が届く。",
          "見返す相手を運営だけにせず、待ってくれる人へ向き直れた。"
        ],
        {
          stats: { subscribers: 12, trust: 4, expression: 1 },
          hidden: { origin: 4, ambition: 3 },
          routes: { network: 2, strategy: 2 },
          addFlags: ["ch1_viewer_requests_open", "ch1_game_sound_requested", "ch1_rejection_remembered"]
        },
        { tone: "warm", subtext: "拒否した側でなく、見てくれる側を見る" }
      )
    ],
    when: when({ minHidden: { ambition: 95 }, flagsNone: ["ch1_money_not_motive"] }),
    mandatory: true,
    priority: 62,
    oncePerRun: true,
    tags: ["anchor", "partner", "ambition"],
    visual: {
      background: "bg/ch1_dorm_pc_day",
      portrait: "portrait/hikakin_young",
      expression: "angry_determined",
      eventCg: "cg/ch1_rejection_on_wall",
      accent: "red"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 7: 『スーパーマッチ棒ブラザーズ』との接点
  // ---------------------------------------------------------------------------
  event({
    id: "ch1_s7_game_discovery_fallback",
    chapter: 1,
    slot: 7,
    title: "口の中のゲーム画面",
    date: "2010年初頭",
    location: "スーパー社員寮・自室",
    body: [
      "勤務を終えた深夜、ヒカキンは気分転換に人偏堂の人気ゲーム『スーパーマッチ棒ブラザーズ』を起動した。何度も聞いたメインBGMを、無意識に口でなぞる。",
      "旋律、低音、打撃音。別々に出していた音を重ねれば、一人でゲームの世界を再現できるかもしれない。思いついた瞬間、眠気が消えた。"
    ],
    speaker: "ヒカキン",
    quote: "これ、全部口だけでできるかもしれない。",
    choices: [
      choice(
        "ch1_s7_game_main_theme",
        "メインBGMを忠実に再現する",
        [
          "楽曲を短い単位へ分け、一音ずつ口の形を決めた。派手さより、ゲームを知る人がすぐ分かる正確さを目指す。",
          "完成には時間がかかるが、ビートボックスとゲーム音楽が正面から結びついた。"
        ],
        {
          stats: { beatbox: 5, production: 3, energy: -6 },
          hidden: { perfectionism: 3, ambition: 3 },
          routes: { craft: 5 },
          addFlags: ["ch1_game_discovery_play", "ch1_game_plan_faithful"]
        },
        { tone: "steady", subtext: "ゲームファンが分かる精度へ集中する" }
      ),
      choice(
        "ch1_s7_game_medley",
        "BGMと効果音を一つのメドレーにする",
        [
          "開始音、攻撃音、勝利の旋律まで、一本の流れとしてノートへ並べた。難易度は跳ね上がるが、途中で何が起こるか分からない動画になる。",
          "技術だけでなく構成力まで試される、今までで最大の企画が始まった。"
        ],
        {
          stats: { production: 5, beatbox: 3, energy: -7 },
          hidden: { ambition: 5, perfectionism: 2 },
          routes: { craft: 3, strategy: 3 },
          addFlags: ["ch1_game_discovery_play", "ch1_game_plan_medley"]
        },
        { tone: "bold", subtext: "難しいが、一本で驚きが続く構成" }
      ),
      choice(
        "ch1_s7_game_commentary",
        "ゲーム実況の途中で効果音を口真似する",
        [
          "画面へ話しかけながら、攻撃のたびに効果音を重ねてみた。技術の再現よりも、遊んでいる本人の楽しさが前へ出る。",
          "カメラの前で話す弱点に向き合い、後のゲーム実況へつながる試作品になった。"
        ],
        {
          stats: { expression: 5, production: 2, beatbox: 2 },
          hidden: { perfectionism: -2 },
          routes: { mainstream: 4 },
          addFlags: ["ch1_game_discovery_play", "ch1_game_plan_commentary"]
        },
        { tone: "warm", subtext: "再現より遊ぶ楽しさを見せる" }
      )
    ],
    mandatory: true,
    priority: 50,
    oncePerRun: true,
    tags: ["anchor", "game", "discovery"],
    visual: {
      background: "bg/ch1_dorm_game_night",
      portrait: "portrait/hikakin_young",
      expression: "eureka",
      eventCg: "cg/ch1_game_bgm_discovery",
      accent: "gold"
    }
  }),

  event({
    id: "ch1_s7_game_discovery_supermarket",
    chapter: 1,
    slot: 7,
    title: "売り場で歌う子供",
    date: "2010年初頭",
    location: "スーパー・菓子売り場",
    body: [
      "品出し中、ゲーム菓子を手に取った子供が『スーパーマッチ棒ブラザーズ』のBGMを何度も口ずさんでいた。多少音程が違っても、周りの子供まで何の曲か分かっている。",
      "難しい技を知らない人にも、一度で届くメロディ。その曲を本気のビートボックスで再現すれば、技術の世界と普通の生活をつなげられるかもしれない。"
    ],
    speaker: "ヒカキン",
    quote: "上手い人にしか分からない音じゃなく、みんなが知ってる音で勝負する。",
    choices: [
      choice(
        "ch1_s7_store_test_coworker",
        "休憩中、同僚へ効果音を聞かせて当ててもらう",
        [
          "画面を見せずに音を鳴らすと、三つ目でようやくゲーム名が当たった。通じなかった二つは、どこが違うか率直に教えてもらう。",
          "専門家ではない耳を基準に直したことで、再現は分かりやすくなった。"
        ],
        {
          stats: { expression: 3, beatbox: 3, production: 2, trust: 1 },
          routes: { mainstream: 4, network: 1 },
          relationships: { supermarket: 3 },
          addFlags: ["ch1_game_discovery_store", "ch1_game_plan_accessible", "ch1_coworker_sound_test"]
        },
        { tone: "warm", subtext: "普通の聞き手へ伝わる音に直す" }
      ),
      choice(
        "ch1_s7_store_research_popularity",
        "売れ方と検索数を調べてから企画を決める",
        [
          "関連商品が売れる曜日、ゲーム名の検索量、海外で使われる題名を調べた。感覚だけでなく、今どれほど多くの人が曲を知っているか確かめる。",
          "流行が消える前に公開する締切を自分で設定し、制作を逆算した。"
        ],
        {
          stats: { production: 5, energy: -3 },
          hidden: { ambition: 3 },
          routes: { strategy: 5 },
          addFlags: ["ch1_game_discovery_store", "ch1_game_plan_trend", "ch1_release_deadline"]
        },
        { tone: "steady", subtext: "思いつきを公開計画へ落とし込む" }
      ),
      choice(
        "ch1_s7_store_remember_child",
        "子供が一度で笑える見せ方を考える",
        [
          "長い前置きを捨て、最初の数秒で有名な開始音を鳴らす構成にした。表情も、演奏会より遊びに近いものへ変える。",
          "売り場で見た笑顔を、画面の向こうへ再現することが目標になった。"
        ],
        {
          stats: { expression: 5, production: 2 },
          hidden: { origin: 4 },
          routes: { mainstream: 5 },
          addFlags: ["ch1_game_discovery_store", "ch1_game_plan_accessible", "ch1_hook_first_seconds"]
        },
        { tone: "warm", subtext: "子供にも一秒で届く入口を作る" }
      )
    ],
    when: when({ flagsAny: ["ch1_store_observer", "ch1_customer_interests", "ch1_breakroom_audience", "ch1_anonymous_feedback"] }),
    mandatory: true,
    priority: 66,
    oncePerRun: true,
    tags: ["anchor", "game", "supermarket"],
    visual: {
      background: "bg/ch1_supermarket_snack_aisle",
      portrait: "portrait/hikakin_uniform",
      expression: "eureka",
      eventCg: "cg/ch1_child_humming_game",
      accent: "green"
    }
  }),

  event({
    id: "ch1_s7_game_discovery_overseas",
    chapter: 1,
    slot: 7,
    title: "海外から先に聞こえた流行",
    date: "2010年初頭",
    location: "スーパー社員寮・自室",
    body: [
      "海外動画のコメント欄を巡っていたヒカキンは、『スーパーマッチ棒ブラザーズ』の音を再現する短い投稿が急に増えていることへ気づいた。日本のゲームなのに、日本語圏ではまだ本格的なビートボックス動画が見当たらない。",
      "先に気づいた時間は短い。英語題名まで用意して素早く出せば、海外から見つかる可能性がある。一方、急げば自分の求める精度には届かない。"
    ],
    choices: [
      choice(
        "ch1_s7_overseas_first_mover",
        "七日で完成させ、海外向けに公開する",
        [
          "カレンダーへ締切を赤く書き、演目を一曲に絞った。説明文は翻訳し、ゲーム名も海外表記へ合わせる。",
          "完璧ではなくても、波が来る前に立つ。初めて世界の時間を意識して制作した。"
        ],
        {
          stats: { production: 5, expression: 2, energy: -7 },
          hidden: { perfectionism: -2, ambition: 5 },
          routes: { strategy: 6 },
          addFlags: ["ch1_game_discovery_overseas", "ch1_game_plan_global_fast", "ch1_release_deadline"]
        },
        { tone: "bold", subtext: "精度を少し譲り、最初の波へ乗る" }
      ),
      choice(
        "ch1_s7_overseas_best_version",
        "海外の投稿をすべて研究し、誰より正確に作る",
        [
          "人気の再現動画を比較し、どれも省いている低音と効果音を見つけた。時間はかかっても、その欠点を全部埋める構成へする。",
          "最初ではなく、決定版になる。職人としての勝負を選んだ。"
        ],
        {
          stats: { beatbox: 6, production: 4, energy: -8 },
          hidden: { perfectionism: 5, ambition: 4 },
          routes: { craft: 6, strategy: 1 },
          addFlags: ["ch1_game_discovery_overseas", "ch1_game_plan_global_definitive"]
        },
        { tone: "risky", subtext: "速さではなく世界一の再現度を狙う" }
      ),
      choice(
        "ch1_s7_overseas_ask_requester",
        "以前の海外視聴者へ、好きな曲を尋ねる",
        [
          "拙い英語で連絡すると、相手はメインBGMだけでなく勝利時の短い旋律も好きだと返してきた。そこを最後に入れる構成を思いつく。",
          "一人との会話が、世界向けという曖昧な目標を具体的な観客へ変えた。"
        ],
        {
          stats: { trust: 4, production: 3, subscribers: 8 },
          hidden: { origin: 5 },
          routes: { network: 3, strategy: 2 },
          addFlags: ["ch1_game_discovery_overseas", "ch1_game_plan_global_personal", "ch1_overseas_viewer_callback"]
        },
        { tone: "warm", subtext: "世界ではなく、一人の好みから作る" }
      )
    ],
    when: when({ flagsAny: ["ch1_overseas_title_seed", "ch1_overseas_viewer_research", "ch1_daily_overseas_study", "ch1_replied_overseas"] }),
    mandatory: true,
    priority: 68,
    oncePerRun: true,
    tags: ["anchor", "game", "overseas"],
    visual: {
      background: "bg/ch1_dorm_overseas_forum",
      portrait: "portrait/hikakin_young",
      expression: "eureka",
      eventCg: "cg/ch1_overseas_game_trend",
      accent: "violet"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 8: バズ動画の制作
  // ---------------------------------------------------------------------------
  event({
    id: "ch1_s8_game_production_fallback",
    chapter: 1,
    slot: 8,
    title: "百回目の開始音",
    date: "2010年",
    location: "スーパー社員寮・自室",
    body: [
      "『スーパーマッチ棒ブラザーズ』の開始音だけで、録音は百回を超えた。ゲームの思い出を壊さない正確さと、動画として最後まで見たくなる勢いは同じではない。",
      "スーパーの勤務表には早番が続いている。限られた夜を、音、見せ方、公開速度のどこへ使うか決めなければならない。"
    ],
    choices: [
      choice(
        "ch1_s8_production_accuracy",
        "音の正確さへすべての時間を使う",
        [
          "ゲーム音を一つずつ波形で比べ、口の角度まで記録した。表情や背景は簡素だが、目を閉じても何の場面か分かる精度へ近づく。",
          "睡眠は削れた。代わりに、ゲームファンが検証したくなるほどの再現ができた。"
        ],
        {
          stats: { beatbox: 7, production: 2, energy: -11 },
          hidden: { perfectionism: 5, fatigue: 5, ambition: 3 },
          routes: { craft: 6 },
          addFlags: ["ch1_game_accuracy_max", "ch1_game_visual_plain"]
        },
        { tone: "risky", subtext: "体力と見た目を犠牲に、耳で勝つ" }
      ),
      choice(
        "ch1_s8_production_showmanship",
        "表情と画面の切り替えを作り込む",
        [
          "キャラクターごとに顔と姿勢を変え、効果音の瞬間に画面を寄せた。何度見ても自分の表情は恥ずかしいが、音を知らない人にも展開が伝わる。",
          "技を見せる映像から、人を楽しませる動画へ一段変わった。"
        ],
        {
          stats: { expression: 6, production: 4, energy: -8 },
          hidden: { perfectionism: 1 },
          routes: { mainstream: 6 },
          addFlags: ["ch1_game_showmanship", "ch1_game_accessible_edit"]
        },
        { tone: "bold", subtext: "音を知らない人にも届く映像へする" }
      ),
      choice(
        "ch1_s8_production_deadline",
        "一週間の締切を守り、今ある素材で完成させる",
        [
          "気になる箇所へ印を付けながらも、決めた日に編集を終えた。完璧ではないが、題材への関心が高い間に公開できる。",
          "自分で決めた締切を守れた経験は、後の定期投稿にも残る。"
        ],
        {
          stats: { production: 5, energy: -5 },
          hidden: { perfectionism: -3, ambition: 2 },
          routes: { strategy: 6 },
          addFlags: ["ch1_game_deadline_met", "ch1_game_trend_timing"]
        },
        { tone: "steady", subtext: "最高点より、公開できる完成を選ぶ" }
      )
    ],
    priority: 0,
    oncePerRun: true,
    tags: ["game-video", "production", "decision"],
    visual: {
      background: "bg/ch1_dorm_editing_game",
      portrait: "portrait/hikakin_young",
      expression: "exhausted_focused",
      eventCg: "cg/ch1_game_video_timeline",
      accent: "gold"
    }
  }),

  event({
    id: "ch1_s8_game_production_craft",
    chapter: 1,
    slot: 8,
    title: "決定版を作る一か月",
    date: "2010年",
    location: "社員寮・浴室と自室",
    body: [
      "海外の再現動画で省かれていた低音まで含めるには、一人で複数の音を重ねなければならない。ヒカキンは浴室で素材を録り、自室の古いパソコンで一音ずつ配置した。",
      "一か月の間、通常投稿は止まった。登録者から『辞めたのか』というコメントも来る。それでも中途半端な決定版では、最初に出す意味がない。"
    ],
    choices: [
      choice(
        "ch1_s8_craft_layer_everything",
        "必要な音をすべて自分で重ねる",
        [
          "一つの音も外部素材へ頼らず、低音から短い効果音まで口で作った。編集画面には自分の声だけが何十段も積み上がる。",
          "完成した瞬間、安いイヤホンでもゲーム画面が浮かんだ。技術型ヒットの核ができる。"
        ],
        {
          stats: { beatbox: 8, production: 6, energy: -13 },
          hidden: { perfectionism: 5, fatigue: 6, origin: 3 },
          routes: { craft: 7 },
          addFlags: ["ch1_game_all_mouth", "ch1_game_accuracy_max", "ch1_game_month_spent"]
        },
        { tone: "risky", subtext: "疲労と投稿停止を受け入れ、口だけで完結" }
      ),
      choice(
        "ch1_s8_craft_cut_to_best",
        "一曲に絞り、最も高い精度で仕上げる",
        [
          "メドレー案を捨て、誰もが知るメインBGMへ集中した。映像は短くなるが、一秒ごとの密度は上がる。",
          "全部を見せたい欲を抑え、最も強い部分だけを残す編集判断を覚えた。"
        ],
        {
          stats: { beatbox: 6, production: 5, energy: -8 },
          hidden: { perfectionism: 2 },
          routes: { craft: 5, strategy: 3 },
          addFlags: ["ch1_game_best_theme_only", "ch1_game_accuracy_max"]
        },
        { tone: "steady", subtext: "量を捨て、一曲の完成度へ集中" }
      ),
      choice(
        "ch1_s8_craft_show_work",
        "制作途中の失敗も短い予告として出す",
        [
          "音を外して笑ってしまった場面を、完成前の短い動画として公開した。視聴者は完成版を待つコメントを残す。",
          "職人の裏側を見せても技術の価値は下がらない。むしろ、完成まで一緒に待つ人ができた。"
        ],
        {
          stats: { subscribers: 65, expression: 4, trust: 3, production: 2 },
          hidden: { perfectionism: -2, origin: 3 },
          routes: { mainstream: 3, network: 2 },
          addFlags: ["ch1_game_making_preview", "ch1_game_audience_waiting"],
          video: {
            title: "あのゲーム音が難しすぎる",
            views: 2_840,
            subscribersGained: 65,
            kind: "making-of",
            chapter: 1
          }
        },
        { tone: "warm", subtext: "未完成の過程も視聴者と共有する" }
      )
    ],
    when: when({ flagsAny: ["ch1_game_plan_global_definitive", "ch1_game_plan_faithful"], minStats: { beatbox: 38 }, minRoutes: { craft: 5 } }),
    priority: 30,
    oncePerRun: true,
    tags: ["game-video", "craft", "production"],
    visual: {
      background: "bg/ch1_dorm_multitrack",
      portrait: "portrait/hikakin_young",
      expression: "obsessed",
      eventCg: "cg/ch1_layers_of_voice",
      accent: "violet"
    }
  }),

  event({
    id: "ch1_s8_game_production_global",
    chapter: 1,
    slot: 8,
    title: "世界へ通じる題名",
    date: "2010年",
    location: "スーパー社員寮・自室",
    body: [
      "映像は完成に近づいたが、題名と説明文が決まらない。日本語だけなら内容は伝えやすい。英語だけなら海外で見つかる可能性は増えるが、国内の視聴者には距離ができる。",
      "以前コメントをくれた海外視聴者は、短くても検索する単語を正確に入れるべきだと教えてくれた。一本の入口を、誰へ向けて開くか決める時だった。"
    ],
    choices: [
      choice(
        "ch1_s8_global_bilingual",
        "日本語と英語を一つの題名に入れる",
        [
          "題名は少し長くなったが、ゲーム名、BEATBOX、口だけという意味を両方の言葉で入れた。説明文にも短い英訳を付ける。",
          "国内と海外のどちらかを選ばず、両方の検索へ小さな橋を架けた。"
        ],
        {
          stats: { production: 5, trust: 2 },
          routes: { strategy: 6, network: 1 },
          addFlags: ["ch1_game_title_bilingual", "ch1_game_global_ready"]
        },
        { tone: "steady", subtext: "長くても両方へ届く入口を作る" }
      ),
      choice(
        "ch1_s8_global_english_first",
        "英語題名で海外を最優先する",
        [
          "『SUPER MATCHSTICK BROTHERS BEATBOX』という文字を先頭へ置いた。日本語の説明は下へ回し、海外掲示板で伝わる形に揃える。",
          "国内で無名のまま、先に世界へ投げる。逆輸入型ヒットの準備が整った。"
        ],
        {
          stats: { production: 4, subscribers: 15 },
          hidden: { ambition: 4 },
          routes: { strategy: 6 },
          addFlags: ["ch1_game_title_english", "ch1_game_global_ready", "ch1_reverse_import_seed"]
        },
        { tone: "bold", subtext: "国内より先に海外で発見される賭け" }
      ),
      choice(
        "ch1_s8_global_personal_note",
        "技術説明より、作った理由を短く書く",
        [
          "『日本の小さな部屋から、好きなゲームの音を全部口で作りました』。完璧な英語ではないが、誰がなぜ作ったかが伝わる文章にした。",
          "検索効率は少し落ちても、動画の向こうに一人の人間が見える入口になった。"
        ],
        {
          stats: { trust: 5, expression: 2, production: 2 },
          hidden: { origin: 5 },
          routes: { network: 3, mainstream: 1 },
          addFlags: ["ch1_game_title_personal", "ch1_game_global_ready"]
        },
        { tone: "warm", subtext: "検索語より、作り手の気持ちを届ける" }
      )
    ],
    when: when({ flagsAny: ["ch1_game_plan_global_fast", "ch1_game_plan_global_personal", "ch1_overseas_viewer_callback", "ch1_overseas_title_seed"] }),
    priority: 29,
    oncePerRun: true,
    tags: ["game-video", "overseas", "strategy"],
    visual: {
      background: "bg/ch1_dorm_upload_metadata",
      portrait: "portrait/hikakin_young",
      expression: "thinking",
      eventCg: "cg/ch1_bilingual_title",
      accent: "violet"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 9: 公開前夜
  // ---------------------------------------------------------------------------
  event({
    id: "ch1_s9_publish_decision_fallback",
    chapter: 1,
    slot: 9,
    title: "最後に残った一音",
    date: "2010年",
    location: "スーパー社員寮・自室",
    body: [
      "完成した動画を最初から見直すと、終盤の効果音がほんの少し遅れている。ゲームを知らない人なら気づかない。ヒカキン自身には、そこだけが大きく聞こえる。",
      "話題が動いている今夜に出すか、一晩だけ直すか、完璧になるまで待つか。公開ボタンの前で、これまでの完璧主義が最後の判断を迫る。"
    ],
    choices: [
      choice(
        "ch1_s9_publish_now",
        "勢いを信じ、今すぐ公開する",
        [
          "小さなズレも含めて、その夜の自分だと決めた。公開時刻を記録し、二度と取り消さないよう画面から手を離す。",
          "数分後、見慣れない速度で最初の再生が付いた。完璧でなくても届く瞬間が始まる。"
        ],
        {
          stats: { expression: 2, energy: 3 },
          hidden: { perfectionism: -4, ambition: 3 },
          routes: { strategy: 3, mainstream: 2 },
          addFlags: ["ch1_game_published_now", "ch1_game_tiny_mistake_left"]
        },
        { tone: "bold", subtext: "話題性と勢いを取る" }
      ),
      choice(
        "ch1_s9_publish_one_night",
        "修正は一晩だけと決める",
        [
          "直す箇所を一つに限定し、夜明け前に再出力した。ほかの欠点が見えても、決めた時刻に公開する。",
          "品質と速度の両方へ、自分なりの締切を引けた。"
        ],
        {
          stats: { production: 4, beatbox: 2, energy: -5 },
          hidden: { perfectionism: 1 },
          routes: { strategy: 3, craft: 2 },
          addFlags: ["ch1_game_published_balanced", "ch1_game_final_fix"]
        },
        { tone: "steady", subtext: "一箇所だけ直し、締切を守る" }
      ),
      choice(
        "ch1_s9_publish_until_perfect",
        "納得するまで公開しない",
        [
          "さらに三日、最後の数秒だけを作り直した。流行の速度に置いていかれる恐怖より、間違った音を残す恐怖が勝った。",
          "公開は遅れたが、検証されても崩れない完成度を手に入れた。"
        ],
        {
          stats: { beatbox: 5, production: 3, energy: -9 },
          hidden: { perfectionism: 5, fatigue: 3 },
          routes: { craft: 5 },
          addFlags: ["ch1_game_published_late", "ch1_game_no_compromise"]
        },
        { tone: "risky", subtext: "流行を失う危険と引き換えに完成度を守る" }
      )
    ],
    mandatory: true,
    priority: 50,
    oncePerRun: true,
    tags: ["anchor", "game-video", "publish"],
    visual: {
      background: "bg/ch1_dorm_publish_night",
      portrait: "portrait/hikakin_young",
      expression: "tense",
      eventCg: "cg/ch1_game_publish_button",
      accent: "gold"
    }
  }),

  event({
    id: "ch1_s9_publish_exhausted",
    chapter: 1,
    slot: 9,
    title: "眠ったままの公開画面",
    date: "2010年",
    location: "スーパー社員寮・自室",
    body: [
      "連日の勤務と編集で、ヒカキンは公開設定の途中に机で眠ってしまった。目を覚ますと出勤まで四十分。動画はまだ非公開のままだ。",
      "今すぐ確認せず出すことも、仕事を遅刻して見直すこともできる。夢と生活の両方を守る余裕は、もう残っていない。"
    ],
    choices: [
      choice(
        "ch1_s9_exhausted_schedule",
        "題名だけ確認し、予約公開して出勤する",
        [
          "説明文の誤字には気づかなかったが、流行が動く時間に公開できた。仕事にもぎりぎり間に合う。",
          "完璧な確認を捨てた不安と、二つの生活を守った安堵を抱えたまま、レジ裏で再生数を想像した。"
        ],
        {
          stats: { energy: -3, trust: 1 },
          hidden: { perfectionism: -3, fatigue: 2 },
          routes: { strategy: 3, stability: 2 },
          relationships: { supermarket: 2 },
          addFlags: ["ch1_game_scheduled_at_work", "ch1_game_tiny_metadata_error"]
        },
        { tone: "steady", subtext: "最低限を確認し、仕事も動画も落とさない" }
      ),
      choice(
        "ch1_s9_exhausted_call_sick",
        "体調不良と連絡し、動画を仕上げる",
        [
          "職場へ電話を入れた後、罪悪感を押し込めて細部まで直した。動画は最高の状態で公開できる。",
          "しかし後日、急な欠勤で同僚が残業したと知る。作品の完成度には、誰かの時間も含まれてしまった。"
        ],
        {
          stats: { production: 5, beatbox: 2, trust: -3, energy: 2 },
          hidden: { controversy: 2, perfectionism: 3 },
          routes: { craft: 4 },
          relationships: { supermarket: -7 },
          addFlags: ["ch1_called_off_for_video", "ch1_game_final_fix", "ch1_work_debt"]
        },
        { tone: "risky", subtext: "職場の信用で完成時間を買う" }
      ),
      choice(
        "ch1_s9_exhausted_delay_day",
        "今日は仕事へ行き、帰宅後に公開する",
        [
          "動画を閉じ、制服へ着替えた。勤務中に同じ題材の動画が先に出ないか何度も不安になる。",
          "帰宅後、落ち着いて確認して公開した。わずかな遅れは出たが、無理を常態化させない線を守った。"
        ],
        {
          stats: { trust: 3, energy: -2, production: 2 },
          hidden: { fatigue: -1 },
          routes: { stability: 3 },
          relationships: { supermarket: 3 },
          addFlags: ["ch1_game_published_after_shift", "ch1_work_kept_promise"]
        },
        { tone: "warm", subtext: "半日の遅れを受け入れ、約束を守る" }
      )
    ],
    when: when({ minHidden: { fatigue: 18 }, maxStats: { energy: 55 } }),
    mandatory: true,
    priority: 64,
    oncePerRun: true,
    tags: ["anchor", "publish", "fatigue"],
    visual: {
      background: "bg/ch1_dorm_publish_dawn",
      portrait: "portrait/hikakin_young",
      expression: "sleep_deprived",
      eventCg: "cg/ch1_asleep_at_upload",
      accent: "red"
    }
  }),

  event({
    id: "ch1_s9_publish_viewer_promise",
    chapter: 1,
    slot: 9,
    title: "待っている一人へ",
    date: "2010年",
    location: "スーパー社員寮・自室",
    body: [
      "完成直前、以前からコメントをくれる視聴者から『あのゲームの動画、楽しみにしている』と届いた。何万人ではない。名前を覚えている一人だ。",
      "ヒカキンは、数字を取りに行く動画である前に、その一人との約束になったことへ気づく。公開時の言葉も、作り直せる。"
    ],
    choices: [
      choice(
        "ch1_s9_promise_dedicate",
        "説明文の最後に感謝を書く",
        [
          "名前は出さず、『待ってくれた人へ』と一行加えた。公開後、その視聴者が最初のコメントを残す。",
          "巨大な数字が動き始めても、最初に待っていた一人を見失わない記憶になった。"
        ],
        {
          stats: { trust: 6, subscribers: 5 },
          hidden: { origin: 7 },
          routes: { network: 3 },
          addFlags: ["ch1_first_fan_thanked", "ch1_game_title_personal", "ch1_game_published_balanced"]
        },
        { tone: "warm", subtext: "最初の視聴者への約束として公開する" }
      ),
      choice(
        "ch1_s9_promise_send_preview",
        "限定公開で先に見せ、率直な反応を聞く",
        [
          "相手はすぐに、最初の十秒でゲーム名が分かると返した。技術的な欠点より、楽しかった瞬間を具体的に教えてくれる。",
          "最後の修正を視聴者目線で決められ、孤独だった制作に小さな共同作業が生まれた。"
        ],
        {
          stats: { production: 4, trust: 5, expression: 2 },
          hidden: { origin: 4 },
          routes: { network: 3, strategy: 2 },
          addFlags: ["ch1_first_fan_preview", "ch1_game_accessible_edit", "ch1_game_published_balanced"]
        },
        { tone: "steady", subtext: "一人の反応で最終調整する" }
      ),
      choice(
        "ch1_s9_promise_no_special_treatment",
        "誰にも見せず、自分の判断で公開する",
        [
          "感謝は胸に置き、完成品が公開されるまで誰にも渡さなかった。期待へ迎合せず、自分が最善だと思う形を守る。",
          "孤独な決断だが、作品の責任を自分で負う職人としての芯が強くなった。"
        ],
        {
          stats: { beatbox: 3, production: 2 },
          hidden: { origin: 3, perfectionism: 2 },
          routes: { craft: 4 },
          addFlags: ["ch1_game_self_judged", "ch1_game_published_balanced"]
        },
        { tone: "bold", subtext: "期待に合わせず、自分の完成を貫く" }
      )
    ],
    when: when({ flagsAny: ["ch1_replied_overseas", "ch1_coworker_first_fan", "ch1_game_audience_waiting", "ch1_viewer_requests_open"] }),
    mandatory: true,
    priority: 62,
    oncePerRun: true,
    tags: ["anchor", "publish", "viewer"],
    visual: {
      background: "bg/ch1_dorm_publish_night",
      portrait: "portrait/hikakin_young",
      expression: "soft_smile",
      eventCg: "cg/ch1_waiting_comment",
      accent: "green"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 10: 公開結果。準備・公開判断・時代の波で四つの人生へ分岐する。
  // ---------------------------------------------------------------------------
  event({
    id: "ch1_s10_delayed_breakout",
    chapter: 1,
    slot: 10,
    title: "三か月後の通知",
    date: "2010年・公開三か月後",
    location: "スーパーマーケット・休憩室",
    body: [
      "公開直後の再生数は数千回で止まった。ヒカキンは失敗を受け入れ、スーパーと次の動画へ戻った。三か月後、休憩中の携帯電話に見慣れない言語の通知が連続して届く。",
      "海外のゲーム動画紹介者が一本を取り上げたことをきっかけに、止まっていた数字が再び動き始めた。一週間で十万、さらに時間をかけて百万人へ届く。",
      "奇跡は公開日に来るとは限らない。だが、波が来た今も早番の勤務は変わらない。"
    ],
    speaker: "ヒカキン",
    quote: "終わったと思ってた動画が、まだ走ってる。",
    choices: [
      choice(
        "ch1_s10_delayed_followup",
        "休憩中に続編の構成を書き始める",
        "次の休みまで待たず、伝わった要素と直す箇所をノートへ書いた。遅れて来た波へ、今度は準備して乗ろうとする。",
        {
          stats: { subscribers: 82_000, production: 4, energy: -5 },
          hidden: { ambition: 6, fatigue: 2 },
          routes: { strategy: 5 },
          addFlags: ["ch1_viral_delayed", "ch1_video_1m", "ch1_delayed_followup_ready"],
          video: { title: "スーパーマッチ棒ブラザーズBGMをビートボックスで再現", views: 1_000_000, subscribersGained: 82_000, kind: "game-beatbox-delayed", chapter: 1 }
        },
        { tone: "bold", subtext: "来るのが遅かった波へ、すぐ次を返す" }
      ),
      choice(
        "ch1_s10_delayed_thank_curator",
        "紹介した投稿者へ、自分から礼を送る",
        "拙い英語でも、紹介で人生が動いたことを伝えた。一本の紹介が海外との長い縁へ変わり、次の動画を待つ入口ができる。",
        {
          stats: { subscribers: 76_000, trust: 6, expression: 2 },
          hidden: { origin: 5, ambition: 4 },
          routes: { network: 5 },
          addFlags: ["ch1_viral_delayed", "ch1_video_1m", "ch1_delayed_curator_contact"],
          video: { title: "スーパーマッチ棒ブラザーズBGMをビートボックスで再現", views: 1_000_000, subscribersGained: 76_000, kind: "game-beatbox-delayed", chapter: 1 }
        },
        { tone: "warm", subtext: "偶然を、一人との関係へ結び直す" }
      ),
      choice(
        "ch1_s10_delayed_finish_shift",
        "勤務を終えるまで、数字を見ない",
        "通知を切り、品出しへ戻った。勤務後には再生数がさらに一桁増えていた。遅れて来た成功にも、生活を奪わせない基準を守った。",
        {
          stats: { subscribers: 72_000, trust: 4, energy: 3 },
          hidden: { origin: 4, fatigue: -2 },
          routes: { stability: 5 },
          relationships: { supermarket: 4 },
          addFlags: ["ch1_viral_delayed", "ch1_video_1m", "ch1_delayed_work_kept"],
          video: { title: "スーパーマッチ棒ブラザーズBGMをビートボックスで再現", views: 1_000_000, subscribersGained: 72_000, kind: "game-beatbox-delayed", chapter: 1 }
        },
        { tone: "steady", subtext: "成功が遅くても、今日の約束を守る" }
      )
    ],
    when: when({ flagsAny: ["ch1_game_published_late", "ch1_game_published_after_shift", "ch1_game_tiny_metadata_error", "ch1_game_scheduled_at_work"] }),
    mandatory: true,
    priority: 75,
    oncePerRun: true,
    tags: ["anchor", "delayed-hit", "game-video"],
    visual: { background: "bg/ch1_supermarket_breakroom_phone", portrait: "portrait/hikakin_young", expression: "stunned_quiet", eventCg: "cg/ch1_delayed_counter", accent: "green" }
  }),

  event({
    id: "ch1_s10_niche_recognition",
    chapter: 1,
    slot: 10,
    title: "分かる人には分かる",
    date: "2010年・公開一か月後",
    location: "スーパー社員寮・自室",
    body: [
      "再生数は十二万回。一般の急上昇欄には届かなかったが、ビートボックスの掲示板とゲーム音再現の界隈では、細かな技術を検証する投稿が続いた。",
      "有名人にはなれない。それでも、自分より詳しい人たちが音を止め、戻し、語っている。広く届かなかった一本が、狭い場所では確かな基準になった。",
      "この評価を深く掘るか、専門外の人へ翻訳するかで、次の視聴者が変わる。"
    ],
    speaker: "ヒカキン",
    quote: "百万人じゃない。でも、この人たちは音を聞いてる。",
    choices: [
      choice(
        "ch1_s10_niche_deepen",
        "さらに難しい音へ挑戦する",
        "少人数でも技術を待つ人へ、次は誰も再現していない音を選んだ。職人としての名は濃くなる。",
        {
          stats: { subscribers: 9_500, beatbox: 5, energy: -4 },
          hidden: { origin: 4, perfectionism: 2 },
          routes: { craft: 6 },
          addFlags: ["ch1_viral_niche", "ch1_video_niche", "ch1_niche_deepen"],
          video: { title: "スーパーマッチ棒ブラザーズ完全再現", views: 120_000, subscribersGained: 9_500, kind: "game-beatbox-niche", chapter: 1 }
        },
        { tone: "bold", subtext: "少人数でも、最も深く届く音を選ぶ" }
      ),
      choice(
        "ch1_s10_niche_explain",
        "初心者にも分かる制作解説を作る",
        "専門用語を減らし、音を一つずつ分けて見せた。技術を薄めず、入口だけを広くする方法を探し始める。",
        {
          stats: { subscribers: 12_000, production: 4, expression: 3, trust: 4 },
          routes: { strategy: 4, mainstream: 2 },
          addFlags: ["ch1_viral_niche", "ch1_video_niche", "ch1_niche_explained"],
          video: { title: "ゲーム音を口だけで作る方法", views: 160_000, subscribersGained: 12_000, kind: "beatbox-explainer", chapter: 1 }
        },
        { tone: "warm", subtext: "専門技術を、初めて見る人へ翻訳する" }
      ),
      choice(
        "ch1_s10_niche_broaden",
        "次はビートボックス以外も試す",
        "技術を評価されたからこそ、その名前で別の動画を開いてもらえるか試すことにした。総合YouTuberへの細い道が生まれる。",
        {
          stats: { subscribers: 10_500, expression: 3, production: 2 },
          hidden: { ambition: 5 },
          routes: { mainstream: 4, strategy: 2 },
          addFlags: ["ch1_viral_niche", "ch1_video_niche", "ch1_niche_broaden"],
          video: { title: "スーパーマッチ棒ブラザーズBGMをビートボックスで再現", views: 140_000, subscribersGained: 10_500, kind: "game-beatbox-niche", chapter: 1 }
        },
        { tone: "steady", subtext: "狭い評価を、別ジャンルの入口にする" }
      )
    ],
    when: when({ flagsAny: ["ch1_game_accuracy_max", "ch1_game_all_mouth", "ch1_game_self_judged", "ch1_game_no_compromise", "ch1_game_best_theme_only"], maxStats: { beatbox: 41 } }),
    mandatory: true,
    priority: 69,
    oncePerRun: true,
    tags: ["anchor", "niche-hit", "game-video", "craft"],
    visual: { background: "bg/ch1_dorm_niche_forum", portrait: "portrait/hikakin_young", expression: "quiet_pride", eventCg: "cg/ch1_niche_comments", accent: "violet" }
  }),

  event({
    id: "ch1_s10_flop_fallback",
    chapter: 1,
    slot: 10,
    title: "八百四十二回",
    date: "2010年・公開三日後",
    location: "スーパー社員寮・自室",
    body: [
      "公開から三日。渾身の動画は八百四十二回で止まった。更新しても数字は変わらない。海外の掲示板にも、国内のゲームファンにも大きな波は起きなかった。",
      "ヒカキンはしばらく画面を見た後、何も言わずブラウザを閉じた。出勤時刻を確認し、鞄へ制服を入れる。泣く時間も、失敗を誰かのせいにする言葉も出てこない。",
      "その直後、机の引き出しから新しい企画ノートを取り出した。奇跡が来ない世界では、自分で次の入口を探すしかない。"
    ],
    speaker: "ヒカキン",
    quote: "……次、何を作ろう。",
    choices: [
      choice(
        "ch1_s10_flop_keep_public",
        "削除せず、八百四十二回を記録に残す",
        [
          "失敗した一本も、その時点の全力だった。数字を隠さず残し、次の企画ノートの一ページ目へ八百四十二と書いた。",
          "後にこの数字が、成功を測る最初の基準になる。"
        ],
        {
          stats: { subscribers: 84, trust: 2, energy: 1 },
          hidden: { origin: 6, ambition: 5 },
          routes: { stability: 2, craft: 1 },
          addFlags: ["ch1_video_flop", "ch1_flop_kept_public", "ch1_842_notebook"],
          video: {
            title: "スーパーマッチ棒ブラザーズBGMをビートボックスで再現",
            views: 842,
            subscribersGained: 84,
            kind: "game-beatbox",
            chapter: 1
          }
        },
        { tone: "steady", subtext: "失敗を消さず、次の基準にする" }
      ),
      choice(
        "ch1_s10_flop_delete",
        "動画を削除し、同じ題材を作り直す",
        [
          "公開した三日間までなかったことにし、音の弱かった箇所を最初から録り直した。",
          "完成度は上がる。しかし、誰にも見られなかった一本へ時間を重ねる判断が正しいかは、まだ分からない。"
        ],
        {
          stats: { subscribers: 20, production: 3, beatbox: 3, energy: -6 },
          hidden: { perfectionism: 5, ambition: 4 },
          routes: { craft: 5 },
          addFlags: ["ch1_video_flop", "ch1_flop_deleted", "ch1_flop_remake_seed"],
          video: {
            title: "スーパーマッチ棒ブラザーズBGMをビートボックスで再現",
            views: 842,
            subscribersGained: 20,
            kind: "game-beatbox",
            chapter: 1
          }
        },
        { tone: "risky", subtext: "失敗を消し、技術でもう一度挑む" }
      ),
      choice(
        "ch1_s10_flop_analyze",
        "八百四十二人がどこで離れたか調べる",
        [
          "再生が止まった秒数、検索された言葉、最後まで見た人の割合を紙へ書き出した。",
          "才能が否定されたと決めつけず、届かなかった理由を次の動画で試せる形へ変えた。"
        ],
        {
          stats: { subscribers: 84, production: 5, energy: -3 },
          hidden: { ambition: 6, perfectionism: -2 },
          routes: { strategy: 6 },
          addFlags: ["ch1_video_flop", "ch1_flop_analyzed", "ch1_second_breakthrough_seed"],
          video: {
            title: "スーパーマッチ棒ブラザーズBGMをビートボックスで再現",
            views: 842,
            subscribersGained: 84,
            kind: "game-beatbox",
            chapter: 1
          }
        },
        { tone: "steady", subtext: "失敗を次に使える材料へ変える" }
      )
    ],
    mandatory: true,
    priority: 40,
    oncePerRun: true,
    tags: ["anchor", "flop", "game-video"],
    visual: {
      background: "bg/ch1_dorm_analytics_night",
      portrait: "portrait/hikakin_young",
      expression: "quietly_hurt",
      eventCg: "cg/ch1_842_counter",
      accent: "blue"
    }
  }),

  event({
    id: "ch1_s10_viral_global",
    chapter: 1,
    slot: 10,
    title: "海の向こうから逆流する数字",
    date: "2010年・公開翌日",
    location: "社員寮からスーパーマーケットへ",
    body: [
      "最初に異変が起きたのは、日本が眠る時間だった。英語、スペイン語、見たことのない文字のコメントが増え、海外掲示板からのアクセスが一本の太い線になる。",
      "朝には国内でも『海外で話題の日本人』として共有され、二十四時間で約二十万アクセス。一週間で百万人、日本国内の月間アクセス一位まで逆流する。",
      "通勤途中の駅のホームで画面を更新すると、世界地図の点がまた増えた。古いパソコンで海外の音声さえ開けなかった少年が、今は海の向こうから見られている。目に涙がにじむ。それでも電車へ乗り、いつもの品出しへ向かった。",
      "長期的な再生数は一千万へ到達した。社員寮の小さな部屋から出した一本が、先に世界を回って帰ってきた。"
    ],
    speaker: "ヒカキン",
    quote: "東京で何者かになるつもりだった。音は、先に世界まで行ってしまった。",
    choices: [
      choice(
        "ch1_s10_global_reply_first_fan",
        "最初に応援してくれた海外視聴者へ返信する",
        [
          "通知に埋もれた古い名前を探し、『あなたが最初でした』と送った。相手は、自分のことを覚えていたのかと驚く。",
          "一千万という数字の起点を一人の顔へ戻せたことで、原点は強く残った。"
        ],
        {
          stats: { subscribers: 360_000, trust: 8, energy: -5 },
          hidden: { origin: 9, ambition: 5 },
          routes: { network: 5 },
          addFlags: ["ch1_viral_global", "ch1_video_10m", "ch1_first_fan_remembered", "ch1_domestic_monthly_number_one"],
          video: {
            title: "SUPER MATCHSTICK BROTHERS BEATBOX",
            views: 10_000_000,
            subscribersGained: 360_000,
            kind: "game-beatbox-global",
            chapter: 1
          }
        },
        { tone: "warm", subtext: "一千万の中から最初の一人を見つける" }
      ),
      choice(
        "ch1_s10_global_translate_everything",
        "主要コメントを訳し、国ごとの反応を分析する",
        [
          "技術を評価する国、表情に反応する国、ゲームへの思い出を語る国。夜通し分類すると、同じ一本でも見られ方が違うと分かる。",
          "世界的な注目を偶然で終わらせず、次の企画へ使える知識に変えた。"
        ],
        {
          stats: { subscribers: 380_000, production: 6, energy: -10 },
          hidden: { fatigue: 5, ambition: 7 },
          routes: { strategy: 6 },
          addFlags: ["ch1_viral_global", "ch1_video_10m", "ch1_global_audience_map", "ch1_domestic_monthly_number_one"],
          video: {
            title: "SUPER MATCHSTICK BROTHERS BEATBOX",
            views: 10_000_000,
            subscribersGained: 380_000,
            kind: "game-beatbox-global",
            chapter: 1
          }
        },
        { tone: "steady", subtext: "世界的ヒットを次へ使える地図にする" }
      ),
      choice(
        "ch1_s10_global_keep_shift",
        "いつもどおり出勤し、勤務後まで数字を見ない",
        [
          "携帯電話をロッカーへ入れ、いつもの売り場へ立った。客の誰も、目の前の店員の動画が世界を回っているとは知らない。",
          "勤務後に見ると百万人を越えていた。普通の生活を守った一日が、成功に飲まれない基準になる。"
        ],
        {
          stats: { subscribers: 350_000, trust: 6, energy: -2 },
          hidden: { origin: 6, fatigue: -1 },
          routes: { stability: 5 },
          relationships: { supermarket: 5 },
          addFlags: ["ch1_viral_global", "ch1_video_10m", "ch1_worked_during_viral", "ch1_domestic_monthly_number_one"],
          video: {
            title: "SUPER MATCHSTICK BROTHERS BEATBOX",
            views: 10_000_000,
            subscribersGained: 350_000,
            kind: "game-beatbox-global",
            chapter: 1
          }
        },
        { tone: "steady", subtext: "世界が騒いでも、今日の約束を守る" }
      )
    ],
    when: when({ flagsAll: ["ch1_game_global_ready"], flagsAny: ["ch1_game_title_english", "ch1_game_title_bilingual", "ch1_reverse_import_seed"] }),
    mandatory: true,
    priority: 70,
    oncePerRun: true,
    tags: ["anchor", "viral", "overseas", "ten-million"],
    visual: {
      background: "bg/ch1_dorm_analytics_world",
      portrait: "portrait/hikakin_young",
      expression: "overwhelmed_happy",
      eventCg: "cg/ch1_world_map_views",
      accent: "violet"
    }
  }),

  event({
    id: "ch1_s10_viral_technical",
    chapter: 1,
    slot: 10,
    title: "本当に口だけなのか",
    date: "2010年・公開翌日",
    location: "社員寮からスーパーマーケットへ",
    body: [
      "ゲームファンが音を比較し始めると、再現度への称賛と同時に『編集で本物の音を混ぜたのでは』という疑いが広がった。検証する投稿が検証を呼び、二十四時間で約二十万アクセスへ跳ねる。",
      "一週間で百万人、日本国内の月間アクセス一位。長期的には一千万再生へ届くが、ヒカキンの名前には『本物なら証明しろ』という言葉も付いて回る。",
      "スーパーへ向かう駅のホームで、疑いも称賛も混ざった数字を見つめた。誰にも習わず続けた音が、疑われるほど遠くへ届いた。悔しさと喜びで涙がにじんだが、電車が来ると携帯電話を閉じ、勤務へ向かった。",
      "技術が高すぎたから生まれた疑いを、誇りとして受け取るか、攻撃として受け取るかが次の道を分ける。"
    ],
    speaker: "ヒカキン",
    quote: "疑われるところまで来た。だったら、目の前でやればいい。",
    choices: [
      choice(
        "ch1_s10_technical_one_take_proof",
        "無編集の一発撮りをすぐ公開する",
        [
          "浴室へカメラを一台だけ置き、開始から終了まで手を触れず演奏した。小さなミスも残したことで、逆に口だけだと伝わる。",
          "疑いは完全には消えない。それでも技術で答えた姿勢が、濃い支持を生んだ。"
        ],
        {
          stats: { subscribers: 390_000, trust: 7, beatbox: 4, energy: -8 },
          hidden: { origin: 5, ambition: 5 },
          routes: { craft: 6 },
          addFlags: ["ch1_viral_technical", "ch1_video_10m", "ch1_one_take_proof", "ch1_domestic_monthly_number_one"],
          video: {
            title: "【無編集】本当に口だけで再現します",
            views: 10_000_000,
            subscribersGained: 390_000,
            kind: "game-beatbox-proof",
            chapter: 1
          }
        },
        { tone: "bold", subtext: "編集を捨て、技術だけで証明する" }
      ),
      choice(
        "ch1_s10_technical_explain_process",
        "制作工程を図解し、使った音を公開する",
        [
          "録音した声の層を一つずつ再生し、どの音を口のどこで作ったか説明した。疑いへの反論が、そのまま面白い制作動画になる。",
          "感情的に争わず、透明性を作品へ変えたことで信用と制作力が伸びる。"
        ],
        {
          stats: { subscribers: 370_000, trust: 9, production: 6, expression: 3, energy: -7 },
          hidden: { controversy: -2, ambition: 4 },
          routes: { strategy: 5, craft: 2 },
          addFlags: ["ch1_viral_technical", "ch1_video_10m", "ch1_process_transparent", "ch1_domestic_monthly_number_one"],
          video: {
            title: "口だけでゲーム音を作った方法",
            views: 10_000_000,
            subscribersGained: 370_000,
            kind: "game-beatbox-making",
            chapter: 1
          }
        },
        { tone: "steady", subtext: "疑惑を制作解説へ変える" }
      ),
      choice(
        "ch1_s10_technical_use_argument",
        "あえて反論せず、議論が伸びるのを待つ",
        [
          "コメント欄で肯定派と否定派が争い、再生数はさらに増えた。ヒカキンは答えを出さず、数字だけを見守る。",
          "一千万へは届いたが、疑いを放置すれば注目が増えるという成功体験が、小さく残った。"
        ],
        {
          stats: { subscribers: 420_000, trust: -5, production: 2 },
          hidden: { controversy: 7, ambition: 6 },
          routes: { controversy: 5, strategy: 2 },
          addFlags: ["ch1_viral_technical", "ch1_video_10m", "ch1_argument_left_open", "ch1_domestic_monthly_number_one"],
          video: {
            title: "スーパーマッチ棒ブラザーズ完全再現",
            views: 10_000_000,
            subscribersGained: 420_000,
            kind: "game-beatbox-controversial",
            chapter: 1
          }
        },
        { tone: "risky", subtext: "最大の数字と引き換えに疑いを残す" }
      )
    ],
    when: when({ flagsAny: ["ch1_game_accuracy_max", "ch1_game_all_mouth", "ch1_game_no_compromise"], minStats: { beatbox: 42 } }),
    mandatory: true,
    priority: 72,
    oncePerRun: true,
    tags: ["anchor", "viral", "technical", "ten-million"],
    visual: {
      background: "bg/ch1_dorm_analytics_debate",
      portrait: "portrait/hikakin_young",
      expression: "serious",
      eventCg: "cg/ch1_is_it_real_comments",
      accent: "red"
    }
  }),

  // ---------------------------------------------------------------------------
  // SLOT 11: 公開結果ごとに、次の質問そのものが変わる章末。
  // ---------------------------------------------------------------------------
  event({
    id: "ch1_s11_delayed_wave_decision",
    chapter: 1,
    slot: 11,
    title: "遅れて来た波に間に合うか",
    date: "2010年",
    location: "スーパー社員寮・自室",
    body: [
      "百万人へ届いたころ、YouTubeからパートナーへの案内が届いた。公開直後なら迷わず喜べたかもしれない。しかし今は、次の早番と三か月分の企画ノートが机にある。",
      "遅れて来た成功へ急いで合わせるか、紹介してくれた縁を育てるか、生活を崩さず次の休日を待つか。世界的大ヒットとは違う時間の使い方が必要だった。"
    ],
    choices: [
      choice("ch1_s11_delayed_sequel_now", "今夜、続編の撮影を始める", "契約を確認して承諾し、眠る時間を次の一本へ使った。波には間に合うが、成功と同時に無理をする癖が残る。", { stats: { money: 55_000, production: 4, energy: -9 }, hidden: { ambition: 7, fatigue: 4 }, routes: { strategy: 4 }, addFlags: ["ch1_partner_offer", "ch1_partner_accepted", "ch1_delayed_sequel_started", "ch1_chapter_complete"] }, { tone: "risky", subtext: "遅れた三か月を、一晩で取り戻そうとする" }),
      choice("ch1_s11_delayed_build_bridge", "海外の紹介者と次の企画を相談する", "契約を受けた後、紹介者へ次に見たい音を尋ねた。偶然の紹介を、一度きりでない海外との入口へ変える。", { stats: { money: 48_000, trust: 6, expression: 3 }, hidden: { origin: 4 }, routes: { network: 5 }, addFlags: ["ch1_partner_offer", "ch1_partner_accepted", "ch1_delayed_bridge_built", "ch1_chapter_complete"] }, { tone: "warm", subtext: "数字ではなく、波を起こした人とつながる" }),
      choice("ch1_s11_delayed_wait_dayoff", "勤務を守り、次の休日に一本作る", "契約条件を読み、撮影日は休日へ置いた。速度は落ちても、仕事の信用と続けられる生活を守る。", { stats: { money: 45_000, trust: 5, energy: 4 }, hidden: { fatigue: -3 }, routes: { stability: 6 }, relationships: { supermarket: 5 }, addFlags: ["ch1_partner_offer", "ch1_partner_accepted", "ch1_delayed_paced", "ch1_chapter_complete"] }, { tone: "steady", subtext: "成功しても、生活の速度を急に変えない" })
    ],
    when: when({ flagsAll: ["ch1_viral_delayed"] }),
    mandatory: true,
    priority: 75,
    oncePerRun: true,
    tags: ["anchor", "delayed-hit", "chapter-end"],
    visual: { background: "bg/ch1_dorm_delayed_plan", portrait: "portrait/hikakin_young", expression: "thinking", eventCg: "cg/ch1_delayed_choice", accent: "green" }
  }),

  event({
    id: "ch1_s11_niche_crossroads",
    chapter: 1,
    slot: 11,
    title: "狭い場所で、深く届いた",
    date: "2010年",
    location: "スーパー社員寮・自室",
    body: [
      "収益化を断られた事実は変わらない。だが今は、十二万回の再生と、技術を待つ少数の視聴者がいる。一般人気へ広げる前に、何を武器として持っていくか決める時だった。",
      "専門家として深く潜る道も、分かりやすく伝える道も、まったく別の動画へ挑む道もある。"
    ],
    choices: [
      choice("ch1_s11_niche_craft", "ビートボックスの技術をさらに磨く", "収益より先に、名前を見れば技術を期待される存在を目指した。小さな界隈で、ヒカキンの音が基準になり始める。", { stats: { beatbox: 5, subscribers: 4_000, energy: -4 }, hidden: { origin: 5, perfectionism: 2 }, routes: { craft: 7 }, addFlags: ["ch1_niche_craft_path", "ch1_chapter_complete"] }, { tone: "bold", subtext: "広さより、誰にも負けない深さを選ぶ" }),
      choice("ch1_s11_niche_reapply", "実績を添えて、収益化へ再申請する", "再生維持率と視聴者の反応を整理して申請した。すぐ生活は変わらなくても、技術を仕事へつなぐ入口が開く。", { stats: { money: 25_000, production: 4, trust: 3 }, routes: { strategy: 5 }, addFlags: ["ch1_partner_reapplied", "ch1_partner_accepted", "ch1_niche_strategy_path", "ch1_chapter_complete"] }, { tone: "steady", subtext: "狭い評価を、次の機会へ翻訳する" }),
      choice("ch1_s11_niche_expand", "次は商品紹介かゲーム実況を試す", "ビートボックスを捨てず、その名前で別の動画も開かれるか試す。総合YouTuberへの道は細いが、初めて具体的になった。", { stats: { expression: 4, production: 2, subscribers: 3_000 }, hidden: { ambition: 5 }, routes: { mainstream: 5 }, addFlags: ["ch1_niche_variety_path", "ch1_second_breakthrough_seed", "ch1_chapter_complete"] }, { tone: "warm", subtext: "専門の外へ、本人の魅力を持ち出す" })
    ],
    when: when({ flagsAll: ["ch1_viral_niche"] }),
    mandatory: true,
    priority: 74,
    oncePerRun: true,
    tags: ["anchor", "niche-hit", "chapter-end"],
    visual: { background: "bg/ch1_dorm_niche_notebook", portrait: "portrait/hikakin_young", expression: "determined", eventCg: "cg/ch1_niche_crossroads", accent: "violet" }
  }),

  event({
    id: "ch1_s11_flop_next_notebook",
    chapter: 1,
    slot: 11,
    title: "奇跡が来ない世界の次の一行",
    date: "2010年",
    location: "スーパー社員寮・自室",
    body: [
      "受信箱にパートナーの招待は来なかった。翌朝も再生数はほとんど動かない。ヒカキンは制服を椅子へ掛け、八百四十二と書いた企画ノートを開く。",
      "同じ技術を磨き直すか、YouTubeらしい別の動画へ進むか、画面の外で観客を探すか。ここから先は、最初の奇跡に選ばれなかった人間の物語になる。"
    ],
    choices: [
      choice("ch1_s11_flop_remake", "同じ曲を、最初から作り直す", "再生数ではなく、自分が聞いて納得できなかった箇所を理由に撮り直した。時間はかかるが、遅れて評価される職人の道が残る。", { stats: { beatbox: 5, production: 3, energy: -7 }, hidden: { origin: 5, perfectionism: 4 }, routes: { craft: 6 }, addFlags: ["ch1_flop_remake_path", "ch1_late_bloomer_open", "ch1_chapter_complete"] }, { tone: "risky", subtext: "誰も待っていなくても、音を完成させる" }),
      choice("ch1_s11_flop_product", "身近な商品を、自分の言葉で紹介する", "スーパーで客が迷う姿を思い出し、安い商品の違いを一人へ説明するように撮った。商品紹介から再出発する道が開く。", { stats: { expression: 4, production: 3, subscribers: 120 }, hidden: { ambition: 4 }, routes: { mainstream: 5, strategy: 2 }, addFlags: ["ch1_flop_product_path", "ch1_second_breakthrough_seed", "ch1_chapter_complete"] }, { tone: "steady", subtext: "売り場で覚えた客目線を、動画へ持ち込む" }),
      choice("ch1_s11_flop_gaming", "好きなゲームを、そのまま実況してみる", "上手に説明するより先に、本気で楽しむ自分を撮った。ビートボックスとは違う表情が、後のゲーム実況で第二の突破口につながる。", { stats: { expression: 5, subscribers: 150, energy: 2 }, hidden: { ambition: 4 }, routes: { mainstream: 4, network: 1 }, addFlags: ["ch1_flop_gaming_path", "ch1_murai_breakthrough_seed", "ch1_chapter_complete"] }, { tone: "warm", subtext: "技術ではなく、本当に楽しむ顔を出す" }),
      choice("ch1_s11_flop_street", "路上で、目の前の反応を確かめる", "画面の数字が動かないなら、人が通る場所で音を鳴らす。立ち止まる人は少ないが、スーパーと路上を往復する別の生活が始まる。", { stats: { beatbox: 3, money: -3_000, energy: -5 }, hidden: { origin: 4, fatigue: 2 }, routes: { stability: 3, craft: 2 }, addFlags: ["ch1_flop_street_path", "street_path_open", "ch1_chapter_complete"] }, { tone: "bold", subtext: "再生数ではなく、通行人の足で反応を見る" })
    ],
    when: when({ flagsAll: ["ch1_video_flop"] }),
    mandatory: true,
    priority: 73,
    oncePerRun: true,
    tags: ["anchor", "flop", "chapter-end"],
    visual: { background: "bg/ch1_dorm_842_notebook", portrait: "portrait/hikakin_young", expression: "quiet_determined", eventCg: "cg/ch1_new_notebook", accent: "blue" }
  }),

  event({
    id: "ch1_s11_partner_offer_fallback",
    chapter: 1,
    slot: 11,
    title: "今度は、向こうから",
    date: "2010年",
    location: "スーパー社員寮・自室",
    body: [
      "一週間で百万人が動画へ訪れた後、受信箱に英語のメールが届いた。以前パートナー申請を拒否したYouTubeから、今度は参加を求める正式なオファーだった。",
      "同じ社員寮、同じ安い机、同じスーパーの制服。変わったのは画面の数字と、動画が生活になるかもしれないという現実だけだ。",
      "最初からYouTubeを仕事にするつもりはなかった。だが『何者かになる』ための道が、初めて具体的に開いている。"
    ],
    speaker: "ヒカキン",
    quote: "動画が……仕事になるかもしれない。",
    choices: [
      choice(
        "ch1_s11_offer_accept",
        "条件を読み、パートナーになる",
        [
          "一度断られた記憶を思い出しながら、承諾ボタンを押した。すぐにスーパーを辞めるわけではない。それでも、動画に値段が付く日が始まる。",
          "収益は小さくても、自分の時間を次の一本へ戻せる可能性が生まれた。"
        ],
        {
          stats: { money: 80_000, trust: 2 },
          hidden: { ambition: 7 },
          routes: { strategy: 3, mainstream: 2 },
          addFlags: ["ch1_partner_offer", "ch1_partner_accepted", "ch1_chapter_complete"]
        },
        { tone: "bold", subtext: "仕事は続けながら、動画収益の入口へ立つ" }
      ),
      choice(
        "ch1_s11_offer_verify",
        "偽メールを疑い、徹底的に確認する",
        [
          "送信元、契約条件、過去の案内を一つずつ確かめた。本物だと分かっても、収益配分や権利の条項を読むまで署名しない。",
          "承諾は数日遅れたが、成功に浮かれて契約を見落とさない習慣を得た。"
        ],
        {
          stats: { money: 65_000, production: 2, trust: 4 },
          hidden: { ambition: 5 },
          routes: { strategy: 5, stability: 2 },
          addFlags: ["ch1_partner_offer", "ch1_partner_verified", "ch1_partner_accepted", "ch1_contract_reader", "ch1_chapter_complete"]
        },
        { tone: "steady", subtext: "機会を逃さず、条件も見落とさない" }
      ),
      choice(
        "ch1_s11_offer_ask_boss",
        "スーパーの上司へ先に相談する",
        [
          "上司は動画の規模に驚きつつ、勤務中の撮影と店名の無断使用をしないなら副業を応援すると話した。急に辞めず、収益が安定するまで働く道も示してくれる。",
          "夢を隠さず話したことで、スーパーは足かせではなく、次の挑戦を支える安全網になった。"
        ],
        {
          stats: { money: 60_000, trust: 6, energy: 2 },
          routes: { stability: 5, network: 2 },
          relationships: { supermarket: 8 },
          addFlags: ["ch1_partner_offer", "ch1_boss_consulted", "ch1_partner_accepted", "ch1_supermarket_safety_net", "ch1_chapter_complete"]
        },
        { tone: "warm", subtext: "今の生活へ筋を通して次へ進む" }
      )
    ],
    when: when({ flagsAll: ["ch1_video_10m"] }),
    mandatory: true,
    priority: 50,
    oncePerRun: true,
    tags: ["anchor", "partner", "chapter-end"],
    visual: {
      background: "bg/ch1_dorm_partner_offer",
      portrait: "portrait/hikakin_young",
      expression: "disbelieving_happy",
      eventCg: "cg/ch1_partner_offer_mail",
      accent: "gold"
    }
  }),

  event({
    id: "ch1_s11_partner_offer_vindication",
    chapter: 1,
    slot: 11,
    title: "壁から外す日",
    date: "2010年",
    location: "スーパー社員寮・自室",
    body: [
      "YouTubeから届いた招待メールの横には、以前印刷して壁へ貼った拒否メールがある。『向こうから来させる』と誓った夜の言葉が、そのまま現実になった。",
      "勝った気持ちは確かにある。しかしここで相手を見返すことをゴールにすれば、次の動画は怒りの残り物になる。二枚のメールをどう扱うかが、野心の向きを決める。"
    ],
    speaker: "ヒカキン",
    quote: "見返した。じゃあ次は、誰かに見てもらうために作ろう。",
    choices: [
      choice(
        "ch1_s11_vindication_keep_both",
        "二枚ともノートへ保管する",
        [
          "拒否も招待も、どちらか一方だけでは今の自分にならなかった。順番に重ねてノートへ挟む。",
          "悔しさを忘れず、同時に勝ち誇りすぎない。次の壁に向かうための記録に変えた。"
        ],
        {
          stats: { money: 85_000, trust: 4, production: 1 },
          hidden: { ambition: 7, controversy: -2, origin: 3 },
          routes: { craft: 2, strategy: 2 },
          addFlags: ["ch1_partner_offer", "ch1_partner_accepted", "ch1_rejection_and_offer_kept", "ch1_chapter_complete"]
        },
        { tone: "steady", subtext: "拒否も成功も、次へ進む資料にする" }
      ),
      choice(
        "ch1_s11_vindication_tell_story",
        "拒否から招待までを視聴者へ話す",
        [
          "数字を誇るのではなく、断られても投稿を続けた時間を短い動画で話した。小さな投稿者から『自分も続ける』というコメントが届く。",
          "自分の成功が、別の誰かの開始理由になり得ると初めて知った。"
        ],
        {
          stats: { money: 80_000, subscribers: 18_000, expression: 4, trust: 6 },
          hidden: { origin: 6, ambition: 5 },
          routes: { mainstream: 3, network: 3 },
          addFlags: ["ch1_partner_offer", "ch1_partner_accepted", "ch1_rejection_story_shared", "ch1_inspires_small_creators", "ch1_chapter_complete"],
          video: {
            title: "一度断られた僕に招待が届きました",
            views: 420_000,
            subscribersGained: 18_000,
            kind: "milestone-talk",
            chapter: 1
          }
        },
        { tone: "warm", subtext: "成功談ではなく、続けた時間を共有する" }
      ),
      choice(
        "ch1_s11_vindication_throw_rejection",
        "拒否メールを破り、過去を終わらせる",
        [
          "紙を細かく破ると、胸につかえていたものが少し消えた。もう断った側を見て動画を作る必要はない。",
          "ただし怒りを燃料にしてきた分、次の目標が空白になる。新しい理由を見つける必要が生まれた。"
        ],
        {
          stats: { money: 90_000, energy: 5 },
          hidden: { ambition: -3, controversy: -2, origin: 2 },
          routes: { mainstream: 2 },
          addFlags: ["ch1_partner_offer", "ch1_partner_accepted", "ch1_rejection_released", "ch1_needs_new_goal", "ch1_chapter_complete"]
        },
        { tone: "bold", subtext: "見返す目標を終え、次の意味を探す" }
      )
    ],
    when: when({ flagsAll: ["ch1_video_10m"], flagsAny: ["ch1_partner_must_invite_me", "ch1_rejection_on_wall", "ch1_rejection_complaint_video"] }),
    mandatory: true,
    priority: 68,
    oncePerRun: true,
    tags: ["anchor", "partner", "ambition", "chapter-end"],
    visual: {
      background: "bg/ch1_dorm_partner_offer",
      portrait: "portrait/hikakin_young",
      expression: "vindicated",
      eventCg: "cg/ch1_rejection_and_offer",
      accent: "gold"
    }
  }),

  event({
    id: "ch1_s11_partner_offer_after_doubt",
    chapter: 1,
    slot: 11,
    title: "疑惑の直後の招待状",
    date: "2010年",
    location: "スーパー社員寮・自室",
    body: [
      "『本当に口だけか』という議論が続く中、YouTubeからパートナーへの招待が届いた。運営から認められたようにも見えるが、招待は技術の真偽を証明するものではない。",
      "契約を発表すれば疑いへの勝利として使える。黙って技術で答えることもできる。注目の中心に立った最初の判断になる。"
    ],
    choices: [
      choice(
        "ch1_s11_doubt_accept_and_prove",
        "契約は受け、別の無編集動画で証明する",
        [
          "招待と疑惑を混ぜず、契約条件を確認して承諾した。その後、一本のカメラで新しい演奏を撮る。",
          "制度から得る機会と、作品で負う説明責任を分けたことで、信頼を守りながら前へ進めた。"
        ],
        {
          stats: { money: 95_000, trust: 8, beatbox: 3 },
          hidden: { controversy: -3, ambition: 5 },
          routes: { craft: 3, strategy: 2 },
          addFlags: ["ch1_partner_offer", "ch1_partner_accepted", "ch1_doubt_answered_cleanly", "ch1_chapter_complete"]
        },
        { tone: "steady", subtext: "契約と証明を別々に誠実に扱う" }
      ),
      choice(
        "ch1_s11_doubt_announce_validation",
        "『YouTube公認』として大きく発表する",
        [
          "招待メールの一部を見せ、運営に認められたと発信した。支持者は喜び、疑う側は論点が違うとさらに反発する。",
          "登録者は急増するが、権威を使って疑問を押し切った記録が残る。"
        ],
        {
          stats: { money: 110_000, subscribers: 25_000, trust: -4, expression: 3 },
          hidden: { controversy: 6, ambition: 6 },
          routes: { controversy: 4, mainstream: 2 },
          addFlags: ["ch1_partner_offer", "ch1_partner_accepted", "ch1_partner_used_as_proof", "ch1_chapter_complete"]
        },
        { tone: "risky", subtext: "大きな注目を得るが、疑問への答えは残る" }
      ),
      choice(
        "ch1_s11_doubt_delay_contract",
        "疑惑へ答えるまで契約を保留する",
        [
          "収益が発生する日を遅らせ、まず制作工程を公開した。反応が落ち着いてから契約へ進む。",
          "短期の金は失ったが、自分の技術を金より先に扱ったことで濃い信用を得た。"
        ],
        {
          stats: { money: 45_000, trust: 10, production: 4 },
          hidden: { origin: 6, controversy: -4 },
          routes: { craft: 3, stability: 1 },
          addFlags: ["ch1_partner_offer", "ch1_partner_delayed_for_proof", "ch1_partner_accepted", "ch1_process_transparent", "ch1_chapter_complete"]
        },
        { tone: "warm", subtext: "収益より先に、技術への信頼を取り戻す" }
      )
    ],
    when: when({ flagsAll: ["ch1_video_10m"], flagsAny: ["ch1_viral_technical", "ch1_argument_left_open", "ch1_one_take_proof", "ch1_process_transparent"] }),
    mandatory: true,
    priority: 70,
    oncePerRun: true,
    tags: ["anchor", "partner", "controversy", "chapter-end"],
    visual: {
      background: "bg/ch1_dorm_partner_offer",
      portrait: "portrait/hikakin_young",
      expression: "serious",
      eventCg: "cg/ch1_offer_amid_comments",
      accent: "red"
    }
  }),

  event({
    id: "ch1_s11_outcome_guard_fallback",
    chapter: 1,
    slot: 11,
    title: "次の一本を決める夜",
    date: "2010年",
    location: "スーパー社員寮・自室",
    body: [
      "公開結果がどうであっても、翌朝にはスーパーの勤務があり、夜には次の動画を作れる。ヒカキンは数字を閉じ、企画ノートを開いた。",
      "最初の一本を人生の答えにせず、次の行動を自分で決める。"
    ],
    choices: [
      choice("ch1_s11_guard_craft", "ビートボックスを磨き続ける", "見られた数に関係なく、唯一の武器を次の一本へ持っていく。", { stats: { beatbox: 3 }, routes: { craft: 3 }, addFlags: ["ch1_guard_craft", "ch1_chapter_complete"] }, { tone: "steady" }),
      choice("ch1_s11_guard_variety", "別の動画形式も試す", "音だけに答えを求めず、カメラの前の自分を育て始める。", { stats: { expression: 3 }, routes: { mainstream: 3 }, addFlags: ["ch1_guard_variety", "ch1_chapter_complete"] }, { tone: "bold" }),
      choice("ch1_s11_guard_life", "仕事を守りながら、月一〜二本を続ける", "生活を壊さず、見られない月にも投稿を止めない道を選ぶ。", { stats: { energy: 4 }, routes: { stability: 3 }, addFlags: ["ch1_guard_stability", "ch1_chapter_complete"] }, { tone: "warm" })
    ],
    mandatory: true,
    priority: 0,
    oncePerRun: true,
    tags: ["anchor", "chapter-end", "fallback"],
    visual: { background: "bg/ch1_dorm_next_notebook", portrait: "portrait/hikakin_young", expression: "determined", eventCg: "cg/ch1_next_line", accent: "blue" }
  }),
];
