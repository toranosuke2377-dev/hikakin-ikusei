import type { StoryEvent } from "../game/types";
import { choice, event } from "./helpers";

const rare = (
  definition: Omit<StoryEvent, "oncePerRun" | "weight">
): StoryEvent =>
  event({
    ...definition,
    when: {
      minCompletedRuns: 1,
      ...definition.when
    },
    oncePerRun: true,
    weight: 1
  });

/**
 * 周回用の希少場面。一周の主筋を奪わないようpriority 5〜8に抑え、
 * メタ進行側で未閲覧候補を優先する。全場面がヒカキン自身の生活・制作・
 * 視聴者との接点、または動画時代の変化を描く。
 */
export const replayEvents: StoryEvent[] = [
  // ───────────────────────── Chapter 1 ─────────────────────────
  rare({
    id: "replay_ch1_train_notebook",
    chapter: 1,
    slot: 1,
    title: "列車に残したノート",
    date: "2008年3月",
    location: "東京駅・忘れ物窓口",
    body: [
      "上京の列車で、ビートボックスの練習ノートを座席へ置き忘れた。音を文字で表した記号と、海外動画から写した研究だけが詰まっている。",
      "忘れ物窓口の締切は、社員寮の入居説明と同じ時刻だった。東京最初の日から、生活と音のどちらを先にするかを迫られる。"
    ],
    choices: [
      choice("replay_ch1_train_retrieve", "入居説明へ遅れても取りに戻る", "ノートは見つかった。寮では注意されたが、東京へ持ってきた理由を失わずに済んだ。", { stats: { beatbox: 3, energy: -5 }, hidden: { origin: 5 }, relationships: { supermarket: -2 }, routes: { craft: 3 }, addFlags: ["replay_notebook_recovered"] }, { tone: "bold" }),
      choice("replay_ch1_train_rewrite", "記憶だけで一から書き直す", "失った技術を思い出すうち、ただの写しではない自分の練習法が生まれた。", { stats: { production: 2, beatbox: 2, energy: -4 }, hidden: { perfectionism: -2 }, routes: { strategy: 3 }, addFlags: ["replay_notebook_rewritten"] }, { tone: "steady" })
    ],
    priority: 6,
    tags: ["replay", "rare", "origin", "daily-life"],
    visual: { background: "backgrounds/replay/tokyo-lost-found.webp", portrait: "portraits/hikakin/young-worried.webp", expression: "worried", eventCg: "events/replay/lost-notebook.webp", accent: "blue" }
  }),
  rare({
    id: "replay_ch1_bathroom_echo_map",
    chapter: 1,
    slot: 5,
    title: "浴室の反響地図",
    date: "2008年・春",
    location: "スーパー社員寮・浴室",
    body: [
      "浴室の立つ位置を十センチずつ変えると、低音の響きが違う。ヒカキンは床へ水で印をつけ、安いマイクでも最も太く録れる場所を探した。",
      "翌朝には乾いて消える地図だ。だから毎晩、耳だけを頼りに同じ場所を探し直す。"
    ],
    choices: [
      choice("replay_ch1_echo_measure", "巻尺で位置を記録する", "感覚を数字へ変え、狭い部屋を一つの録音機材として扱えるようになった。", { stats: { production: 3, beatbox: 2 }, hidden: { perfectionism: 2 }, routes: { strategy: 2, craft: 2 }, addFlags: ["replay_echo_mapped"] }, { tone: "steady" }),
      choice("replay_ch1_echo_body", "印を付けず、体で覚える", "足の裏と壁から返る音だけで、最良の位置へ立てるようになった。", { stats: { beatbox: 4, energy: -3 }, hidden: { origin: 3 }, routes: { craft: 3 }, addFlags: ["replay_echo_embodied"] }, { tone: "steady" })
    ],
    when: { flagsAny: ["ch1_record_bath", "ch1_bath_reverb", "ch1_bath_one_take", "ch1_bath_mapped", "ch1_bath_permission"] },
    priority: 7,
    tags: ["replay", "rare", "beatbox", "craft"],
    visual: { background: "backgrounds/replay/dorm-bathroom.webp", portrait: "portraits/hikakin/young-focused.webp", expression: "focused", eventCg: "events/replay/echo-map.webp", accent: "violet" }
  }),
  rare({
    id: "replay_ch1_bent_price_tag",
    chapter: 1,
    slot: 4,
    title: "曲がった値札",
    date: "2008年・夏",
    location: "スーパー・閉店後",
    body: [
      "閉店後の売り場で、貼り替えた値札が一枚だけ曲がっていることに気づいた。勤務はもう終わり、寮では撮影時間が待っている。",
      "動画の一音を何度も直す自分と、誰も気づかない値札を直す自分は、同じなのかもしれない。"
    ],
    choices: [
      choice("replay_ch1_tag_fix", "戻って貼り直す", "数十秒の仕事を終えると、誰にも見られていない努力へ少し自信が持てた。", { stats: { trust: 2, energy: -2 }, hidden: { perfectionism: 2 }, relationships: { supermarket: 4 }, routes: { stability: 2 }, addFlags: ["replay_small_work_finished"] }, { tone: "steady" }),
      choice("replay_ch1_tag_leave", "今夜の撮影を優先する", "値札を背に寮へ走った。限られた時間では、全部を完璧にはできない。", { stats: { beatbox: 2, energy: 1 }, hidden: { perfectionism: -2, ambition: 2 }, relationships: { supermarket: -1 }, routes: { craft: 2 }, addFlags: ["replay_time_chosen"] }, { tone: "bold" })
    ],
    priority: 5,
    tags: ["replay", "rare", "supermarket", "perfectionism"],
    visual: { background: "backgrounds/replay/supermarket-closing.webp", portrait: "portraits/hikakin/young-tired.webp", expression: "tired", accent: "green" }
  }),
  rare({
    id: "replay_ch1_one_earbud",
    chapter: 1,
    slot: 6,
    title: "片耳だけのイヤホン",
    date: "2009年",
    location: "社員寮・自室",
    body: [
      "愛用のイヤホンが片方だけ聞こえなくなった。買い替える金はあるが、次の給料日までは食費を削ることになる。",
      "片耳で海外のビートを研究すると、低音と高音の位置関係がいつもと違って聞こえた。故障にも、学べることはある。"
    ],
    choices: [
      choice("replay_ch1_earbud_replace", "中古のイヤホンを買う", "正確に聞ける環境を取り戻し、細かな音の違いを研究した。", { stats: { money: -4_000, beatbox: 3, production: 1 }, routes: { craft: 2 }, addFlags: ["replay_earbuds_replaced"] }, { tone: "steady" }),
      choice("replay_ch1_earbud_mono", "給料日まで片耳で研究する", "不便を逆手に取り、音を一つずつ分解して聞く癖がついた。", { stats: { beatbox: 2, production: 2 }, hidden: { ambition: 2 }, routes: { strategy: 3 }, addFlags: ["replay_mono_study"] }, { tone: "bold" })
    ],
    priority: 6,
    tags: ["replay", "rare", "money", "research"],
    visual: { background: "backgrounds/replay/dorm-desk-night.webp", portrait: "portraits/hikakin/young-focused.webp", expression: "focused", eventCg: "events/replay/broken-earbud.webp", accent: "blue" }
  }),
  rare({
    id: "replay_ch1_zero_view_midnight",
    chapter: 1,
    slot: 8,
    title: "再生数ゼロの午前二時",
    date: "2009年・冬",
    location: "社員寮・自室",
    body: [
      "公開から六時間。再生数はゼロのままだった。自分で確認した一回を数えない表示が、世界に存在していない証明のように見える。",
      "翌朝は早番。待っていても数字は動かない。それでも、眠る前にできることが一つだけある。"
    ],
    choices: [
      choice("replay_ch1_zero_translate", "拙い英語で説明文を足す", "辞書を引いて短い一文を加えた。朝、海外から最初の一回が付いていた。", { stats: { subscribers: 1, expression: 1, energy: -3 }, hidden: { origin: 4, ambition: 3 }, routes: { strategy: 2 }, addFlags: ["replay_first_overseas_view"] }, { tone: "warm" }),
      choice("replay_ch1_zero_sleep", "数字を閉じ、明日の練習に備える", "見られない夜にも生活を崩さず、続けるための眠りを選んだ。", { stats: { energy: 7 }, hidden: { fatigue: -3, ambition: 1 }, routes: { stability: 3 }, addFlags: ["replay_zero_view_endured"] }, { tone: "steady" })
    ],
    priority: 6,
    tags: ["replay", "rare", "first-viewer", "persistence"],
    visual: { background: "backgrounds/replay/dorm-monitor-zero.webp", portrait: "portraits/hikakin/young-lonely.webp", expression: "lonely", eventCg: "events/replay/zero-views.webp", accent: "blue" }
  }),
  rare({
    id: "replay_ch1_first_dislike",
    chapter: 1,
    slot: 10,
    title: "最初の低評価",
    date: "2010年",
    location: "社員寮・自室",
    body: [
      "初めて低評価が一つ付いた。高評価より小さな数字なのに、ヒカキンの目はそこから離れない。",
      "理由は書かれていない。直すべき欠点なのか、誰かに届いた証拠なのかも分からない。"
    ],
    choices: [
      choice("replay_ch1_dislike_rewatch", "欠点を探して全編を見直す", "音割れを一か所見つけた。ただし、低評価の理由かどうかは最後まで分からなかった。", { stats: { production: 2, energy: -3 }, hidden: { perfectionism: 4 }, routes: { craft: 2 }, addFlags: ["replay_first_dislike_analyzed"] }, { tone: "steady" }),
      choice("replay_ch1_dislike_accept", "一人に届いた証拠として受け止める", "無反応より、好き嫌いが生まれたことを前進と考えた。", { stats: { expression: 2, energy: 2 }, hidden: { perfectionism: -3, ambition: 2 }, routes: { mainstream: 2 }, addFlags: ["replay_first_dislike_survived"] }, { tone: "bold" })
    ],
    priority: 5,
    tags: ["replay", "rare", "viewer", "perfectionism"],
    visual: { background: "backgrounds/replay/dorm-monitor-night.webp", portrait: "portraits/hikakin/young-worried.webp", expression: "worried", eventCg: "events/replay/first-dislike.webp", accent: "red" }
  }),

  // ───────────────────────── Chapter 2 ─────────────────────────
  rare({
    id: "replay_ch2_frozen_dinner",
    chapter: 2,
    slot: 1,
    title: "冷めた祝勝会",
    date: "2010年",
    location: "スーパー社員寮・自室",
    body: [
      "一千万再生へ向かう数字を見ながら、ヒカキンは値引き弁当を一人で食べた。祝いの連絡は増えたが、勤務時間も部屋も昨日と同じだ。",
      "大成功を実感するために、派手な何かを買うべきなのか。変わらない夜を記憶すべきなのか。"
    ],
    choices: [
      choice("replay_ch2_dinner_camera", "冷めた弁当ごと短い動画を撮る", "成功の現実を飾らず残した映像が、後に何度も引用される原点になった。", { stats: { expression: 3, trust: 3, subscribers: 8_000 }, hidden: { origin: 5 }, routes: { mainstream: 2 }, addFlags: ["replay_viral_night_recorded"] }, { tone: "warm" }),
      choice("replay_ch2_dinner_save", "カメラを回さず、一人で覚えておく", "見せない記憶を一つ持つことで、人生の全部を動画にしない境界ができた。", { stats: { energy: 4 }, hidden: { origin: 4 }, routes: { stability: 3 }, addFlags: ["replay_viral_night_private"] }, { tone: "steady" })
    ],
    priority: 7,
    tags: ["replay", "rare", "viral", "daily-life"],
    visual: { background: "backgrounds/replay/dorm-celebration.webp", portrait: "portraits/hikakin/young-stunned.webp", expression: "stunned", eventCg: "events/replay/cold-bento.webp", accent: "gold" }
  }),
  rare({
    id: "replay_ch2_caption_accident",
    chapter: 2,
    slot: 3,
    title: "字幕が作った別の音",
    date: "2011年",
    location: "編集画面",
    body: [
      "自動字幕がビートボックスを奇妙な文章へ変換し、その画面が海外で笑われていた。技術の失敗だが、見た人はヒカキンの動画へ戻ってくる。",
      "誤変換を消すか、偶然の面白さとして残すか。"
    ],
    choices: [
      choice("replay_ch2_caption_correct", "正しい字幕と解説を追加する", "笑いで来た人へ技術まで伝え、海外視聴者が少し定着した。", { stats: { subscribers: 18_000, production: 3, trust: 2 }, routes: { strategy: 3 }, addFlags: ["replay_captions_corrected"] }, { tone: "steady" }),
      choice("replay_ch2_caption_play", "誤字幕を読み上げる続編を作る", "失敗を自分から笑いへ変え、表情とトークを期待する視聴者が増えた。", { stats: { subscribers: 32_000, expression: 4, trust: 1 }, routes: { mainstream: 4 }, addFlags: ["replay_caption_comedy"] }, { tone: "bold" })
    ],
    when: { flagsAny: ["ch1_viral_global", "ch1_overseas_title_seed", "ch1_game_title_english", "ch1_replied_overseas"] },
    priority: 7,
    tags: ["replay", "rare", "internet-culture", "overseas"],
    visual: { background: "backgrounds/replay/caption-screen.webp", portrait: "portraits/hikakin/amused.webp", expression: "amused", eventCg: "events/replay/broken-captions.webp", accent: "green" }
  }),
  rare({
    id: "replay_ch2_first_tax_form",
    chapter: 2,
    slot: 5,
    title: "再生数を金額に書く日",
    date: "2011年・冬",
    location: "社員寮・机",
    body: [
      "初めて確定申告の書類を前にした。動画の収益が、趣味の数字から生活の数字へ変わったことを実感する。",
      "領収書は散らばり、安いマイクをいつ買ったかも曖昧だ。面白い動画を作る力と、続けられる活動を作る力は別だった。"
    ],
    choices: [
      choice("replay_ch2_tax_learn", "一晩かけて自分で仕組みを学ぶ", "時間は失ったが、お金と契約を他人任せにしない基礎を得た。", { stats: { production: 2, money: 60_000, energy: -5 }, routes: { strategy: 4 }, addFlags: ["replay_finance_literacy"] }, { tone: "steady" }),
      choice("replay_ch2_tax_ask", "専門家へ相談する", "費用と引き換えに、本来使うべき制作時間を守った。", { stats: { money: -80_000, energy: 4 }, relationships: { manager: 2 }, routes: { network: 2, stability: 3 }, addFlags: ["replay_first_accountant"] }, { tone: "warm" })
    ],
    priority: 5,
    tags: ["replay", "rare", "money", "career"],
    visual: { background: "backgrounds/replay/tax-desk.webp", portrait: "portraits/hikakin/confused.webp", expression: "confused", eventCg: "events/replay/first-tax-form.webp", accent: "blue" }
  }),
  rare({
    id: "replay_ch2_lost_drive",
    chapter: 2,
    slot: 7,
    title: "消えた三日分",
    date: "2012年",
    location: "編集机",
    body: [
      "外付けドライブが認識されず、三日かけた編集データが消えた。公開予定は翌日。完成版を書き出す前の素材だけが辛うじて残っている。",
      "同じものを急いで作り直すか、失敗を企画へ変えるか。"
    ],
    choices: [
      choice("replay_ch2_drive_rebuild", "徹夜で同じ編集を再現する", "細部は違っても、予定日に一本を届けた。体力と引き換えに継続への自信がついた。", { stats: { production: 4, energy: -14, subscribers: 20_000 }, hidden: { fatigue: 7, perfectionism: 2 }, routes: { craft: 3 }, addFlags: ["replay_edit_rebuilt"] }, { tone: "bold" }),
      choice("replay_ch2_drive_failure_video", "データ消失そのものを動画にする", "壊れた画面と撮り直す姿を見せ、完成品とは違う親しみが生まれた。", { stats: { expression: 4, trust: 3, subscribers: 28_000, production: 2 }, hidden: { perfectionism: -3 }, routes: { mainstream: 3 }, addFlags: ["replay_failure_became_video"] }, { tone: "warm" })
    ],
    priority: 6,
    tags: ["replay", "rare", "editing", "failure"],
    visual: { background: "backgrounds/replay/drive-error.webp", portrait: "portraits/hikakin/shocked.webp", expression: "shocked", eventCg: "events/replay/dead-drive.webp", accent: "red" }
  }),
  rare({
    id: "replay_ch2_wrong_train_fan",
    chapter: 2,
    slot: 9,
    title: "反対方向の電車",
    date: "2012年",
    location: "郊外の駅",
    body: [
      "撮影帰り、考え事をして反対方向の電車へ乗った。降りた小さな駅で、制服姿の視聴者から初めて声をかけられる。",
      "その人は有名な動画ではなく、再生数の少ない商品紹介の一言を覚えていた。"
    ],
    choices: [
      choice("replay_ch2_train_talk", "次の電車まで話を聞く", "遅い動画でも、誰かの日常へ深く残ることがあると知った。", { stats: { trust: 4, expression: 2, energy: -2 }, hidden: { origin: 4 }, routes: { network: 2 }, addFlags: ["replay_small_video_fan"] }, { tone: "warm" }),
      choice("replay_ch2_train_photo", "写真を撮り、急いで戻る", "短い交流でも、画面の向こうが実在する人だと実感できた。", { stats: { trust: 2, subscribers: 4_000 }, hidden: { origin: 2 }, routes: { mainstream: 1 }, addFlags: ["replay_station_photo"] }, { tone: "warm" })
    ],
    priority: 5,
    tags: ["replay", "rare", "viewer", "daily-life"],
    visual: { background: "backgrounds/replay/suburban-platform.webp", portrait: "portraits/hikakin/surprised.webp", expression: "surprised", eventCg: "events/replay/first-street-fan.webp", accent: "green" }
  }),
  rare({
    id: "replay_ch2_upload_without_thumbnail",
    chapter: 2,
    slot: 10,
    title: "顔のないサムネイル",
    date: "2013年",
    location: "動画管理画面",
    body: [
      "誤操作で、顔も文字もない机の写真をサムネイルにして公開してしまった。気づいたころには普段より高い視聴維持率が出ている。",
      "派手な表情が正解だと思っていたが、視聴者の好奇心は別の形でも動くらしい。"
    ],
    choices: [
      choice("replay_ch2_thumbnail_keep", "一日だけそのまま検証する", "先入観を疑うデータが集まり、サムネイルを感覚だけで決めなくなった。", { stats: { production: 3, subscribers: 12_000 }, routes: { strategy: 4 }, addFlags: ["replay_thumbnail_experiment"] }, { tone: "steady" }),
      choice("replay_ch2_thumbnail_fix", "いつもの顔入りへ直す", "再生数は安定した。偶然に賭けず、育ててきた型を守った。", { stats: { expression: 2, subscribers: 16_000 }, routes: { mainstream: 3 }, addFlags: ["replay_thumbnail_format_kept"] }, { tone: "steady" })
    ],
    priority: 5,
    tags: ["replay", "rare", "analytics", "production"],
    visual: { background: "backgrounds/replay/video-dashboard.webp", portrait: "portraits/hikakin/curious.webp", expression: "curious", eventCg: "events/replay/blank-thumbnail.webp", accent: "blue" }
  }),

  // ───────────────────────── Chapter 3 ─────────────────────────
  rare({
    id: "replay_ch3_first_credit_roll",
    chapter: 3,
    slot: 1,
    title: "初めて増えた名前",
    date: "2013年",
    location: "編集室",
    body: [
      "他人へ初めて編集の一部を任せた動画が完成した。エンドロールへ名前を入れると、自分一人のチャンネルだった画面に別の人生が加わる。",
      "公開速度は上がる。一方で、どこまでがヒカキンの作品かという問いも始まった。"
    ],
    choices: [
      choice("replay_ch3_credit_front", "冒頭でも制作メンバーを紹介する", "視聴者は動画がチームで作られることを早くから知り、スタッフも意見を言いやすくなった。", { stats: { trust: 4, production: 3 }, relationships: { manager: 5 }, routes: { network: 4 }, addFlags: ["replay_team_credit_visible"] }, { tone: "warm" }),
      choice("replay_ch3_credit_end", "作品を先に見せ、最後だけ名前を出す", "ヒカキンの画面という印象を守りながら、協力を記録へ残した。", { stats: { production: 3, subscribers: 20_000 }, relationships: { manager: 2 }, routes: { craft: 2 }, addFlags: ["replay_team_credit_end"] }, { tone: "steady" })
    ],
    // Chapter 3 slot 0で字幕整理などを初めて任せた直後から発生できる。
    // 10ではChapter 2の希少イベントまで重ねない限り届かず、実質的に封鎖されていた。
    when: { minRelationships: { manager: 4 } },
    priority: 6,
    tags: ["replay", "rare", "team", "credit"],
    visual: { background: "backgrounds/replay/edit-room-credits.webp", portrait: "portraits/hikakin/thoughtful.webp", expression: "thoughtful", eventCg: "events/replay/first-credit-roll.webp", accent: "blue" }
  }),
  rare({
    id: "replay_ch3_hotel_corridor_edit",
    chapter: 3,
    slot: 3,
    title: "廊下のコンセント",
    date: "2014年",
    location: "地方ホテルの廊下",
    body: [
      "ロケ先の部屋で電源が落ち、公開まで残り二時間。廊下の清掃用コンセントだけが使えた。",
      "宿泊客が通るたびパソコンを抱えて避けながら、ヒカキンは字幕を入れ続ける。成功後にも、動画はこんな場所で完成する。"
    ],
    choices: [
      choice("replay_ch3_corridor_finish", "廊下で最後まで仕上げる", "予定時刻に公開できた。華やかなロケ映像の裏に、誰も知らない二時間が残った。", { stats: { production: 4, energy: -8, subscribers: 24_000 }, hidden: { fatigue: 4 }, routes: { craft: 3 }, addFlags: ["replay_corridor_upload"] }, { tone: "bold" }),
      choice("replay_ch3_corridor_delay", "事情を伝え、翌日に延ばす", "視聴者へ正直に遅延を知らせ、無理を習慣にしない判断をした。", { stats: { trust: 3, energy: 5, subscribers: -6_000 }, hidden: { fatigue: -3 }, routes: { stability: 3 }, addFlags: ["replay_honest_delay"] }, { tone: "steady" })
    ],
    priority: 5,
    tags: ["replay", "rare", "editing", "travel"],
    visual: { background: "backgrounds/replay/hotel-corridor.webp", portrait: "portraits/hikakin/tired.webp", expression: "tired", eventCg: "events/replay/corridor-edit.webp", accent: "blue" }
  }),
  rare({
    id: "replay_ch3_camera_off_laugh",
    chapter: 3,
    slot: 5,
    title: "カメラが止まった後の笑い",
    date: "2015年",
    location: "撮影スタジオ",
    body: [
      "大型企画の収録は予定どおり終わった。録画停止の直後、失敗を片づけながら出た笑い声だけが、完成した本編より自然だった。",
      "スタッフはカメラを回し直すか尋ねる。もう一度やれば、同じ笑いにはならない。"
    ],
    choices: [
      choice("replay_ch3_off_recreate", "同じ流れを再現して撮る", "完全に同じではなくても、本編へ温度を足す場面になった。", { stats: { expression: 3, production: 2, energy: -3 }, hidden: { perfectionism: 2 }, routes: { mainstream: 3 }, addFlags: ["replay_laugh_recreated"] }, { tone: "steady" }),
      choice("replay_ch3_off_leave", "撮らず、現場だけの記憶にする", "すべてを素材にしない選択が、チームにカメラの外で休める場所を作った。", { stats: { trust: 4, energy: 3 }, relationships: { manager: 4 }, routes: { stability: 3 }, addFlags: ["replay_off_camera_boundary"] }, { tone: "warm" })
    ],
    priority: 6,
    tags: ["replay", "rare", "team", "authenticity"],
    visual: { background: "backgrounds/replay/studio-wrap.webp", portrait: "portraits/hikakin/laughing.webp", expression: "laughing", accent: "green" }
  }),
  rare({
    id: "replay_ch3_foreign_fan_phonetic",
    chapter: 3,
    slot: 7,
    title: "読めない手紙のリズム",
    date: "2015年",
    location: "撮影部屋",
    body: [
      "読めない言語で書かれた手紙が届いた。翻訳すると、意味より先に発音の並びがビートのように聞こえる。",
      "最初のゲーム音楽動画が海外へ届いたあとも、言葉の壁は残っている。音なら、その壁へ別の入口を作れる。"
    ],
    choices: [
      choice("replay_ch3_letter_rhythm", "手紙の音を尊重して短いビートを返す", "意味を勝手に変えないよう確認し、言葉と音の返信を公開した。", { stats: { beatbox: 3, trust: 3, subscribers: 30_000 }, hidden: { origin: 4 }, routes: { network: 3 }, addFlags: ["replay_fan_language_beat"] }, { tone: "warm" }),
      choice("replay_ch3_letter_private_reply", "翻訳した返事を個人的に送る", "企画にはせず、一人の視聴者との往復として大切にした。", { stats: { trust: 4 }, hidden: { origin: 3 }, routes: { stability: 2 }, addFlags: ["replay_foreign_reply_private"] }, { tone: "warm" })
    ],
    when: { minStats: { beatbox: 35 } },
    priority: 6,
    tags: ["replay", "rare", "viewer", "global"],
    visual: { background: "backgrounds/replay/fan-mail-desk.webp", portrait: "portraits/hikakin/moved.webp", expression: "moved", eventCg: "events/replay/foreign-letter.webp", accent: "violet" }
  }),
  rare({
    id: "replay_ch3_algorithm_winter",
    chapter: 3,
    slot: 9,
    title: "おすすめ欄の冬",
    date: "2016年",
    location: "分析画面",
    body: [
      "動画の質も投稿頻度も変えていないのに、おすすめからの流入が半分になった。視聴者の気持ちではなく、表示の仕組みが変わったらしい。",
      "攻略法を追えば戻せるかもしれない。だが次の変更で、また同じことが起きる。"
    ],
    choices: [
      choice("replay_ch3_algorithm_adapt", "新しい表示傾向を徹底検証する", "タイトルと冒頭を調整し、再生数を回復させた。変化を読む力も制作力の一部になった。", { stats: { subscribers: 70_000, production: 4 }, routes: { strategy: 5 }, addFlags: ["replay_algorithm_adapted"] }, { tone: "steady" }),
      choice("replay_ch3_algorithm_core", "固定視聴者へ届く動画を守る", "短期の数字は落ちたが、通知を待つ人との関係は強くなった。", { stats: { subscribers: -20_000, trust: 5 }, hidden: { origin: 4 }, routes: { craft: 3, stability: 3 }, addFlags: ["replay_algorithm_resisted"] }, { tone: "bold" })
    ],
    priority: 7,
    tags: ["replay", "rare", "algorithm", "era-change"],
    visual: { background: "backgrounds/replay/analytics-drop.webp", portrait: "portraits/hikakin/serious.webp", expression: "serious", eventCg: "events/replay/recommendation-drop.webp", accent: "blue" }
  }),
  rare({
    id: "replay_ch3_unopened_product",
    chapter: 3,
    slot: 11,
    title: "開けなかった商品",
    date: "2017年",
    location: "商品棚のある撮影部屋",
    body: [
      "紹介依頼の商品が棚へ積み上がる中、説明資料と実物の印象がどうしても一致しない一箱があった。契約上は、良い点だけを紹介しても違反ではない。",
      "箱を開ければ撮影が始まる。開けなければ、大きな報酬と企業関係を失う。"
    ],
    choices: [
      choice("replay_ch3_product_return", "未開封のまま返送する", "目先の報酬を失ったが、使っていないものを勧めない基準を守った。", { stats: { money: -400_000, trust: 5 }, hidden: { origin: 3 }, routes: { stability: 4 }, addFlags: ["replay_product_refused"] }, { tone: "steady" }),
      choice("replay_ch3_product_honest", "欠点も話せる条件へ交渉する", "契約額は下がったが、視聴者へ判断材料を渡せる動画になった。", { stats: { money: 150_000, production: 3, trust: 4 }, routes: { strategy: 4 }, addFlags: ["replay_product_terms_changed"] }, { tone: "bold" })
    ],
    when: { trendsAny: ["brandDeals"] },
    priority: 7,
    tags: ["replay", "rare", "business", "trust"],
    visual: { background: "backgrounds/replay/product-shelf.webp", portrait: "portraits/hikakin/uneasy.webp", expression: "uneasy", eventCg: "events/replay/unopened-product.webp", accent: "gold" }
  }),

  // ───────────────────────── Chapter 4 ─────────────────────────
  rare({
    id: "replay_ch4_old_private_video",
    chapter: 4,
    slot: 1,
    title: "限定公開の十八秒",
    date: "2018年",
    location: "動画管理画面",
    body: [
      "無名時代に限定公開へ変えた十八秒の動画が、古いリンクから発見された。荒い言葉も問題行動もない。ただ、今の完璧なイメージとは違う不機嫌な顔が映っている。",
      "消せば隠したと見られ、残せば勝手な物語を付けられる。過去の普通の表情まで、人気者には説明を求められる。"
    ],
    choices: [
      choice("replay_ch4_private_open", "当時の説明を添えて公開へ戻す", "若い自分を理想化せず、変化も含めて見せた。", { stats: { trust: 5, expression: 2, subscribers: 25_000 }, hidden: { origin: 4, controversy: -2 }, routes: { stability: 3 }, addFlags: ["replay_old_video_context"] }, { tone: "steady" }),
      choice("replay_ch4_private_keep", "私的な記録として非公開を守る", "何でも公開する義務はないと説明し、境界線を引いた。", { stats: { trust: 3, energy: 3 }, hidden: { origin: 2 }, routes: { stability: 4 }, addFlags: ["replay_privacy_boundary"] }, { tone: "bold" })
    ],
    priority: 6,
    tags: ["replay", "rare", "archive", "privacy"],
    visual: { background: "backgrounds/replay/private-video-page.webp", portrait: "portraits/hikakin/uneasy.webp", expression: "uneasy", eventCg: "events/replay/eighteen-seconds.webp", accent: "blue" }
  }),
  rare({
    id: "replay_ch4_moderator_message",
    chapter: 4,
    slot: 3,
    title: "消す人の夜",
    date: "2018年",
    location: "コメント管理室",
    body: [
      "深夜、コメント管理を担当するスタッフから『人の悪意を一日読むのがつらい』と連絡が来た。画面を健全に保つ裏で、誰かが汚れた言葉をすべて先に見ている。",
      "投稿を続けるなら必要な仕事だ。しかし必要であることと、一人へ背負わせてよいことは違う。"
    ],
    choices: [
      choice("replay_ch4_moderator_rotate", "担当を交代制にし、休養を設ける", "費用は増えたが、誰か一人の心でチャンネルを守る構造をやめた。", { stats: { money: -500_000, trust: 5 }, hidden: { fatigue: -2 }, relationships: { manager: 7 }, routes: { stability: 5 }, addFlags: ["replay_moderation_reformed"] }, { tone: "warm" }),
      choice("replay_ch4_moderator_join", "自分も一晩コメント管理へ入る", "普段見えない言葉を読み、動画を出した後にも制作の責任が続くと知った。", { stats: { trust: 4, energy: -7 }, hidden: { controversy: -3, fatigue: 4 }, relationships: { manager: 5 }, routes: { network: 3 }, addFlags: ["replay_hikakin_moderated"] }, { tone: "steady" })
    ],
    priority: 7,
    tags: ["replay", "rare", "staff", "mental-health"],
    visual: { background: "backgrounds/replay/moderation-room.webp", portrait: "portraits/hikakin/concerned.webp", expression: "concerned", eventCg: "events/replay/moderator-message.webp", accent: "red" }
  }),
  rare({
    id: "replay_ch4_day_without_phone",
    chapter: 4,
    slot: 5,
    title: "数字のない二十四時間",
    date: "2019年",
    location: "自宅",
    body: [
      "起動しなくなった携帯電話の交換に一日かかる。登録者、再生数、速報、連絡。そのすべてを確認できない日が突然できた。",
      "不安で何もできないと思っていたのに、昼過ぎには机の音だけで新しいビートを作っていた。"
    ],
    choices: [
      choice("replay_ch4_phone_record", "別の機材で生まれた音を録る", "数字を見ない時間が作品へ変わり、久しぶりに目的のない練習を楽しめた。", { stats: { beatbox: 4, energy: 8 }, hidden: { origin: 5, fatigue: -5 }, routes: { craft: 3 }, addFlags: ["replay_offline_beat"] }, { tone: "warm" }),
      choice("replay_ch4_phone_reconnect", "借りた端末ですぐ管理へ戻る", "危機への対応は早かったが、休める偶然まで仕事で埋めた。", { stats: { production: 2, subscribers: 20_000, energy: -3 }, hidden: { fatigue: 3 }, routes: { strategy: 2 }, addFlags: ["replay_always_connected"] }, { tone: "steady" })
    ],
    priority: 5,
    tags: ["replay", "rare", "rest", "daily-life"],
    visual: { background: "backgrounds/replay/home-no-phone.webp", portrait: "portraits/hikakin/relaxed.webp", expression: "relaxed", eventCg: "events/replay/dead-phone.webp", accent: "green" }
  }),
  rare({
    id: "replay_ch4_voice_clone",
    chapter: 4,
    slot: 7,
    title: "自分が言っていない声",
    date: "2020年",
    location: "制作オフィス",
    body: [
      "ヒカキンの声を合成した偽の商品広告が拡散された。口調も笑いも本物に近く、説明を読む前に信じた人が商品を買っている。",
      "削除要請だけでは次が生まれる。技術を恐れるだけでも、視聴者を守れない。"
    ],
    choices: [
      choice("replay_ch4_clone_explain", "偽物の見分け方を実演する", "自分の声を素材に検証し、視聴者が確認できる手順を伝えた。", { stats: { production: 5, trust: 7, subscribers: 40_000 }, routes: { strategy: 5 }, addFlags: ["replay_media_literacy_video"] }, { tone: "steady" }),
      choice("replay_ch4_clone_legal", "被害窓口と削除対応を優先する", "動画にする前に、購入した人が相談できる場所を整えた。", { stats: { money: -700_000, trust: 8 }, hidden: { controversy: -2 }, routes: { stability: 5 }, addFlags: ["replay_clone_victims_supported"] }, { tone: "warm" })
    ],
    priority: 8,
    tags: ["replay", "rare", "era-change", "trust"],
    visual: { background: "backgrounds/replay/fake-ad-screen.webp", portrait: "portraits/hikakin/shocked.webp", expression: "shocked", eventCg: "events/replay/voice-clone.webp", accent: "red" }
  }),
  rare({
    id: "replay_ch4_repaired_old_mic",
    chapter: 4,
    slot: 9,
    title: "半田ごての匂い",
    date: "2020年",
    location: "機材修理店",
    body: [
      "初代マイクのケーブルが断線した。修理店は、新品を買うほうが安く音も良いと説明する。",
      "性能だけなら捨てるべき機材だ。だが録音されたノイズまで、無名時代の記憶につながっている。"
    ],
    choices: [
      choice("replay_ch4_mic_repair", "費用をかけて修理する", "半田ごての匂いとともに、古いノイズがもう一度スピーカーから返った。", { stats: { money: -120_000, beatbox: 2 }, hidden: { origin: 6 }, routes: { craft: 3 }, addFlags: ["replay_old_mic_repaired"] }, { tone: "warm" }),
      choice("replay_ch4_mic_archive", "直さず、壊れた状態で保存する", "使えないものも歴史だと受け入れ、今の機材で次の音を作ることにした。", { stats: { production: 2 }, hidden: { origin: 3, perfectionism: -2 }, routes: { stability: 2 }, addFlags: ["replay_old_mic_archived"] }, { tone: "steady" })
    ],
    priority: 6,
    tags: ["replay", "rare", "origin", "equipment"],
    visual: { background: "backgrounds/replay/repair-shop.webp", portrait: "portraits/hikakin/nostalgic.webp", expression: "nostalgic", eventCg: "events/replay/mic-repair.webp", accent: "violet" }
  }),
  rare({
    id: "replay_ch4_empty_premiere_seat",
    chapter: 4,
    slot: 11,
    title: "一席だけの試写会",
    date: "2021年",
    location: "小さな試写室",
    body: [
      "大型動画の完成試写で、ヒカキンはスタッフを先に帰し、客席の中央へ一人で座った。歓声もコメントもない画面では、見せ場の間にある空白が長く感じる。",
      "数字を予測する目ではなく、一人の視聴者として最後まで楽しめるかを確かめる。"
    ],
    choices: [
      choice("replay_ch4_premiere_recute", "退屈した箇所を正直に切る", "高価な場面も例外にせず、一本の流れを強くした。", { stats: { production: 5, money: -200_000, energy: -4 }, hidden: { perfectionism: -2 }, routes: { craft: 3 }, addFlags: ["replay_one_viewer_cut"] }, { tone: "steady" }),
      choice("replay_ch4_premiere_note", "切らず、次作への反省として残す", "公開日を守りながら、自分の退屈を忘れないよう企画ノートへ書いた。", { stats: { production: 3, subscribers: 30_000 }, routes: { strategy: 3 }, addFlags: ["replay_one_viewer_note"] }, { tone: "steady" })
    ],
    priority: 5,
    tags: ["replay", "rare", "production", "self-review"],
    visual: { background: "backgrounds/replay/private-screening.webp", portrait: "portraits/hikakin/serious.webp", expression: "serious", eventCg: "events/replay/one-seat-premiere.webp", accent: "blue" }
  }),

  // ───────────────────────── Chapter 5 ─────────────────────────
  rare({
    id: "replay_ch5_cable_knot",
    chapter: 5,
    slot: 1,
    title: "ほどけない結び目",
    date: "最終決戦の年",
    location: "機材倉庫",
    body: [
      "初代マイクのケーブルに、昔からほどけない小さな結び目がある。急いで片づけた社員寮の夜、たまたまできたものだ。",
      "新品へ交換すれば録音は安定する。結び目を残せば、最後の撮影で接触不良が起きるかもしれない。"
    ],
    choices: [
      choice("replay_ch5_knot_keep", "結び目ごと補強して使う", "不完全な形を残したまま、壊れないよう今の技術で支えた。", { stats: { beatbox: 2, production: 3, money: -80_000 }, hidden: { origin: 5 }, routes: { craft: 3 }, addFlags: ["replay_old_cable_kept"] }, { tone: "warm" }),
      choice("replay_ch5_knot_replace", "ケーブルだけ新品へ替える", "原点は形ではなく、次の音を出すためにあると考えた。", { stats: { production: 3, beatbox: 2 }, hidden: { origin: 2, perfectionism: -2 }, routes: { strategy: 2 }, addFlags: ["replay_old_cable_replaced"] }, { tone: "steady" })
    ],
    priority: 6,
    tags: ["replay", "rare", "origin", "equipment"],
    visual: { background: "backgrounds/replay/ch5-equipment-storage.webp", portrait: "portraits/hikakin/nostalgic.webp", expression: "nostalgic", eventCg: "events/replay/cable-knot.webp", accent: "violet" }
  }),
  rare({
    id: "replay_ch5_staff_first_upload",
    chapter: 5,
    slot: 3,
    title: "登録者ゼロの相談",
    date: "最終決戦の年",
    location: "撮影後のスタジオ",
    body: [
      "若いスタッフが、誰にも言わず自分の動画を一本作っていた。登録者はゼロ。公開ボタンを押せず、ヒカキンへ完成品を見せる。",
      "日本一を争う人の助言は、初心者には重すぎるかもしれない。必要なのは正解より、最初の一回を押す理由だ。"
    ],
    choices: [
      choice("replay_ch5_staff_one_note", "良かった一か所だけを伝える", "直す点より、その人にしかない瞬間を一つ示した。スタッフは自分で公開ボタンを押した。", { stats: { production: 4, trust: 3 }, routes: { network: 4, strategy: 2 }, addFlags: ["replay_zero_creator_encouraged", "mastermind_seed"] }, { tone: "warm" }),
      choice("replay_ch5_staff_full_review", "プロとして徹底的に添削する", "一本は強くなったが、公開までさらに一か月かかった。教える精度と待つ難しさを知った。", { stats: { production: 5, energy: -4 }, hidden: { perfectionism: 2 }, routes: { strategy: 4 }, addFlags: ["replay_zero_creator_reviewed"] }, { tone: "steady" })
    ],
    priority: 7,
    tags: ["replay", "rare", "mastermind", "creator"],
    visual: { background: "backgrounds/replay/ch5-empty-studio.webp", portrait: "portraits/hikakin/mentor.webp", expression: "gentle", eventCg: "events/replay/zero-subscriber-video.webp", accent: "blue" }
  }),
  rare({
    id: "replay_ch5_night_stocking",
    chapter: 5,
    slot: 4,
    title: "閉店後の品出し",
    date: "最終決戦の年",
    location: "かつてのスーパー",
    body: [
      "撮影許可の下見で、かつて働いたスーパーを訪れた。閉店後、欠員が出た売り場で、体が自然に段ボールを運び始める。",
      "有名になっても、商品を前へそろえる手順を覚えていた。昔と違うのは、作業を見つめるスタッフとカメラがいることだ。"
    ],
    choices: [
      choice("replay_ch5_stock_no_camera", "カメラを止めて最後まで手伝う", "思い出を企画にせず、一人の元従業員として閉店作業を終えた。", { stats: { energy: -5, trust: 4 }, hidden: { origin: 6 }, relationships: { supermarket: 7 }, routes: { stability: 3 }, addFlags: ["replay_stocking_private"] }, { tone: "warm" }),
      choice("replay_ch5_stock_document", "許可を取り、働く手元だけ撮る", "成功前の生活を美談にせず、仕事を覚えた時間として映像へ残した。", { stats: { production: 3, trust: 4, subscribers: 30_000 }, hidden: { origin: 5 }, relationships: { supermarket: 5 }, routes: { craft: 2 }, addFlags: ["replay_stocking_documented"] }, { tone: "steady" })
    ],
    priority: 7,
    tags: ["replay", "rare", "supermarket", "origin"],
    visual: { background: "backgrounds/replay/ch5-supermarket-night.webp", portrait: "portraits/hikakin/working.webp", expression: "focused", eventCg: "events/replay/night-stocking.webp", accent: "green" }
  }),
  rare({
    id: "replay_ch5_unlisted_draft",
    chapter: 5,
    slot: 6,
    title: "公開しなかった最高点",
    date: "最終決戦の年",
    location: "動画アーカイブ",
    body: [
      "過去の未公開フォルダから、技術的には当時最高だったビートボックス動画が見つかった。公開しなかった理由は、最後の一音が気に入らなかったから。",
      "今聞けば未熟だが、その未熟さには現在では作れない勢いがある。"
    ],
    choices: [
      choice("replay_ch5_draft_release_raw", "未修正のまま公開する", "完成しなかった自分も活動の一部として渡し、完璧主義に一つ区切りをつけた。", { stats: { subscribers: 80_000, trust: 4, beatbox: 2 }, hidden: { perfectionism: -6, origin: 5 }, routes: { craft: 3 }, addFlags: ["replay_old_draft_released"] }, { tone: "bold" }),
      choice("replay_ch5_draft_duet", "現在の自分が最後の一音を足す", "過去を直すのではなく、時間を隔てた共演として一本へ完成させた。", { stats: { production: 5, beatbox: 4, subscribers: 60_000 }, hidden: { origin: 6 }, routes: { craft: 4 }, addFlags: ["replay_past_self_duet"] }, { tone: "warm" })
    ],
    priority: 7,
    tags: ["replay", "rare", "archive", "perfectionism"],
    visual: { background: "backgrounds/replay/ch5-archive-screen.webp", portrait: "portraits/hikakin/moved.webp", expression: "moved", eventCg: "events/replay/unlisted-draft.webp", accent: "violet" }
  }),
  rare({
    id: "replay_ch5_comment_from_future",
    chapter: 5,
    slot: 7,
    title: "十年後に見る人へ",
    date: "最終決戦の年",
    location: "編集室",
    body: [
      "最終動画の字幕を確認中、ヒカキンは『公開日の視聴者』ばかり想像していることに気づく。十年後、当時を知らない人が偶然開く可能性もある。",
      "流行の説明を足せば長く伝わるが、今の速度は落ちる。"
    ],
    choices: [
      choice("replay_ch5_future_context", "時代背景を映像の中へ自然に残す", "現在の熱と未来の理解を両立する小さな場面を加えた。", { stats: { production: 5, energy: -3 }, hidden: { origin: 3 }, routes: { craft: 3 }, addFlags: ["replay_future_viewer_context"] }, { tone: "steady" }),
      choice("replay_ch5_future_now", "今の視聴者に全力で届ける", "説明で勢いを止めず、この時代の空気ごと保存することにした。", { stats: { expression: 3, subscribers: 40_000 }, hidden: { ambition: 2 }, routes: { mainstream: 3 }, addFlags: ["replay_present_tense_final"] }, { tone: "bold" })
    ],
    priority: 6,
    tags: ["replay", "rare", "legacy", "production"],
    visual: { background: "backgrounds/replay/ch5-edit-timeline.webp", portrait: "portraits/hikakin/thoughtful.webp", expression: "thoughtful", eventCg: "events/replay/future-viewer.webp", accent: "blue" }
  }),
  rare({
    id: "replay_ch5_counter_unplugged",
    chapter: 5,
    slot: 10,
    title: "消えたカウンター",
    date: "最終決戦の夜",
    location: "登録者カウント配信",
    body: [
      "大台の直前、登録者カウンターを映すモニターだけが消えた。配信は続き、視聴者にはヒカキンの顔だけが見えている。",
      "数字を待つため集まった人々へ、数字がない数分間に何を見せるか。"
    ],
    choices: [
      choice("replay_ch5_counter_acoustic", "マイクなしでビートボックスを始める", "機材も表示もない音が部屋へ響き、視聴者は復旧を急かす代わりに耳を澄ませた。", { stats: { beatbox: 4, expression: 3, trust: 4 }, hidden: { origin: 6 }, routes: { craft: 3 }, addFlags: ["replay_countdown_unplugged"] }, { tone: "warm" }),
      choice("replay_ch5_counter_story", "上京した日の二万円を語る", "用意していない言葉で、ゼロ人だったころからの距離を初めて実感した。", { stats: { expression: 5, trust: 4 }, hidden: { origin: 5, ambition: 3 }, routes: { mainstream: 3 }, addFlags: ["replay_countdown_origin_story"] }, { tone: "warm" })
    ],
    when: { minStats: { subscribers: 10_000_000 } },
    priority: 8,
    tags: ["replay", "rare", "number-one", "origin"],
    visual: { background: "backgrounds/replay/ch5-dark-counter-room.webp", portrait: "portraits/hikakin/calm.webp", expression: "calm", eventCg: "events/replay/counter-blackout.webp", accent: "gold" }
  })
];
