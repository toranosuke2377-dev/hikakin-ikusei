import type { EndingDefinition } from "../game/types";

/**
 * 判定はpriority降順。street_beatboxerは、ほかの到達条件を満たさなかった場合の
 * 最終fallbackでもある。各ending内の細かなエピローグ差分はch5_* flagsで描画する。
 */
export const endingDefinitions: EndingDefinition[] = [
  {
    id: "controversy_king",
    title: "炎上王",
    category: "BAD",
    priority: 500,
    when: {
      flagsAll: ["ch5_controversy_king"]
    },
    body: [
      "ヒカキンは日本で最も名前を知られた投稿者の一人になった。だが登録者は約四百万人。炎上するたびおよそ五十万人が去り、かつて一千万人を超えたチャンネルには、燃える瞬間だけを待つ人々が残った。",
      "新しい動画を出せばニュースになり、批判する人も擁護する人も公開時刻を待つ。瞬間的な再生数だけを見れば負けていないが、次の炎上が起きるたび登録者カウンターは目に見えて減っていく。",
      "だが、その数字は作品を待つ人の数ではなくなっていた。誰が傷つくのか、どんな嘘が暴かれるのか、次はどこまで落ちるのか。それを確かめるための視線だった。",
      "捏造が明らかになると、スポンサーと仲間は去った。柴田は自分も被害者だったという動画を出し、さらに再生数を稼いだ。ヒカキンは謝罪動画を撮るはずだったカメラの前で、最も離脱されにくい言い訳の順番を考えている。",
      "画面へ表示された次のタイトルは『すべての真相を話します』。投稿直後から過去最高の速さで数字が増え、その横で登録解除も増え続ける。",
      "十八歳の彼は、絶対に何者かになると決めて上京した。その願いは叶った。ただし、名前以外を信じてもらえない王として。"
    ],
    finalQuote: "嫌いでも見てる。だったら、まだ僕の勝ちだ。",
    visual: {
      background: "backgrounds/endings/dark-stream-room.webp",
      portrait: "portraits/hikakin/hollow.webp",
      expression: "hollow",
      eventCg: "endings/controversy-king.webp",
      video: "videos/endings/controversy-counter.webm",
      accent: "red"
    }
  },
  {
    id: "number_one",
    title: "日本一のYouTuber",
    category: "HAPPY",
    priority: 400,
    when: {
      flagsAll: ["ch5_number_one_achieved"]
    },
    body: [
      "登録者カウンターが二千万へ変わる。十八歳で東京へ来たときの所持金は二万円、登録者はゼロ人。社員寮の浴室で鳴らした音が、長い時間をかけて日本中へ届いた。",
      "日本二位となったはじめ課長から、誰より早く連絡が届く。『親分、おめでとうございます。次は二千万人の上で勝ちます』。勝負は終わっても、二人の競争は互いを止めない約束として残った。",
      "ヒカキンは商品紹介、ゲーム実況、料理、挑戦、音楽を渡り歩いた。何でもやったから何者でもなくなったのではない。すべての企画を、自分の驚きと一音へ戻せる人になった。",
      "撮影部屋には、日本一を示す記念品と安い初代マイクが並ぶ。豪華な機材を前にしても、公開ボタンの大きさは最初の日から変わらない。"
    ],
    finalQuote: "日本一になった。じゃあ次は、日本一面白い一本を作ろう。",
    visual: {
      background: "backgrounds/endings/studio-sunrise.webp",
      portrait: "portraits/hikakin/tearful-smile.webp",
      expression: "tearful-smile",
      eventCg: "endings/twenty-million.webp",
      video: "videos/endings/number-one.webm",
      accent: "gold"
    }
  },
  {
    id: "legendary_video",
    title: "伝説の一本",
    category: "HAPPY",
    priority: 300,
    when: {
      flagsAll: ["ch5_legendary_achieved"]
    },
    body: [
      "ヒカキンは登録者数で日本一にならなかった。最終決戦の日、はじめ課長の数字は遠ざかり、ランキングの記事から彼の名前は少しずつ下へ移った。",
      "その代わりに完成したのが『音が止まるまで』だった。社員寮の浴室を再現した狭い空間、一本の安いマイク、十八歳の最初の録音。そこからゲームBGM、商品を開ける音、レジの電子音、笑い声、『YouTubeテーマミュージック』の旋律、炎上後の長い無音まで、ヒカキン自身の人生が音だけでつながっていく。",
      "有名人を並べた記念映像ではない。成功した場面だけを選んだ自伝でもない。上手くなった現在の呼吸と、荒い過去の録音が途中で同じテンポになり、最後は初投稿と同じ一音だけを残して暗転する。",
      "公開直後の記録は塗り替えなかった。けれど視聴者は無音を飛ばさず、映像作家や音響家は構造を研究し、若い投稿者は『これを見て初めて撮った』と語った。数年後にも、新しい作品の中からあの一音への返事が聞こえる。",
      "最も見られた動画ではない。最も多く模倣された動画でもない。動画という表現でしか残せなかった一人の人生として、時代の基準を一度だけ動かした一本だった。"
    ],
    finalQuote: "何者になれたかは分からない。でも、僕にしか作れない一本は作れた。",
    visual: {
      background: "backgrounds/endings/recreated-bathroom.webp",
      portrait: "portraits/hikakin/quiet-smile.webp",
      expression: "quiet-smile",
      eventCg: "endings/sound-until-silence.webp",
      video: "videos/endings/legendary-video.webm",
      accent: "violet"
    }
  },
  {
    id: "mastermind",
    title: "裏方の天才",
    category: "NORMAL",
    priority: 200,
    when: {
      flagsAll: ["ch5_mastermind_achieved"]
    },
    body: [
      "ヒカキン自身のチャンネルは、日本一へ届かなかった。カメラの前で笑い、驚き、話す力だけなら、彼より華やかな人は何人もいた。",
      "しかし、誰かが噛んだ直後に見せる素の顔、長すぎる素材に一度だけ現れる本音、企画者本人も説明できない面白さを、ヒカキンは誰より早く見つけた。",
      "彼が組み直した一本を境に、無名だった投稿者が発見される。次に地方の小さなチーム、その次に出演を諦めかけた制作者。ヒカキンの名前を前へ出さない動画まで、毎週どこかでランキングへ上がった。",
      "やがて本人のチャンネル更新は止まる。代わりに、彼が育てた制作者たちが互いを教え、新しい動画の作り方を増やしていく。出演者を同じ型へ入れるのではなく、一人ずつ違う強みを見つけることが、彼の作品になった。",
      "いくつかの動画には、効果音に紛れて小さなビートボックスが入っている。気づく人だけが、それをカメラの反対側にいるヒカキンの署名だと知っていた。"
    ],
    finalQuote: "僕が映らなくても、この人が面白いって伝われば、それで動画は勝てる。",
    visual: {
      background: "backgrounds/endings/production-studio.webp",
      portrait: "portraits/hikakin/mentor.webp",
      expression: "gentle",
      eventCg: "endings/mastermind.webp",
      video: "videos/endings/mastermind.webm",
      accent: "blue"
    }
  },
  {
    id: "street_beatboxer",
    title: "路上のビートボクサー",
    category: "BAD",
    priority: 0,
    body: [
      "動画活動は終わった。残った資金では部屋を維持できず、ヒカキンは再びスーパーへ就職した。給料から家賃を引かれ、社員寮で眠り、朝になれば制服へ着替える。",
      "一度は大勢に知られた経歴も、売り場では何の役にも立たない。日々の品出しと清掃だけが、今月を暮らすための金になる。以前の動画を覚えている客が、時々顔を二度見る。声をかける人はほとんどいない。",
      "夜、ヒカキンは古いマイクを持って駅前へ出る。投げ銭箱を置き、ビートボックスを始める。技術だけなら、十八歳のころよりはるかに上手い。だが通行人の足は止まらず、音は電車と信号に混ざって消える。",
      "一人の子供が少しだけ立ち止まり、『おじさん、YouTuberなの？』と聞く。ヒカキンは答えを探す。昔そうだったのか、まだそうなのか、自分でも分からない。",
      "何者かになるため上京した青年は、同じ社員寮へ戻った。それでも唯一の特技だけを捨てられず、誰も見ていない路上で、次の一音を鳴らす。"
    ],
    finalQuote: "……昔ね。",
    visual: {
      background: "backgrounds/endings/station-street-winter.webp",
      portrait: "portraits/hikakin/older-tired.webp",
      expression: "tired",
      eventCg: "endings/street-beatboxer.webp",
      video: "videos/endings/street-night.webm",
      accent: "blue"
    }
  }
];
