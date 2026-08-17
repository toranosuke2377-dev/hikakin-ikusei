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
      "捏造が明らかになると、スポンサーと仲間は去った。別の炎上系投稿者たちは彼を題材にした動画を次々と出す。ヒカキンは謝罪動画を撮るはずだったカメラの前で、最も離脱されにくい言い訳の順番を考えている。",
      "画面へ表示された次のタイトルは『すべての真相を話します』。投稿直後から過去最高の速さで数字が増え、その横で登録解除も増え続ける。",
      "炎上で広告収益と投げ銭を得る一方、違約金と失った案件で所持金も大きく動いた。最後に残る金額は、それまで誰を燃やし、どこで引き返したかによって変わる。それでも次の収入を作るには、また誰かを燃やすしかなかった。",
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
      "配信終了後、撮影部屋は急に静かになった。日本一を示す記念品と安い初代マイクを並べ、ヒカキンは画面の外にいるときの小さな声で自分へ問いかける。廊下から仲間の笑い声が届くと、少し笑ってもう一度録画ボタンを押した。"
    ],
    finalQuote: "……何者かには、なれたのかな。",
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
      "その代わりに完成したのが、兄ゼイキンと作った『YouTubeテーマミュージック』だった。ゼイキンが歌と旋律と編曲を導き、ヒカキンはビートボックス、効果音、映像で人生を刻んだ。どちらか一人では成立しない曲だった。",
      "社員寮の浴室、スキージャンプ台の風、スーパーのレジ、通勤電車、商品を開ける音、安いマイクのノイズ。十八歳から積み重ねた音が一つの楽曲へ戻り、失敗した録音さえリズムの一部になった。",
      "動画は一億再生へ届いた。登録者数では日本一になれなくても、国境を越えて歌われ、映像作家や若い投稿者が何年も構造を研究した。ゼイキンの音楽的才能を正面から認め、互いの名前を同じ大きさで残したことも伝説の一部になった。",
      "楽曲、映像、長く見られる過去動画の収益は、その後も所持金へ少しずつ加わった。同時に制作費や権利収入の分け方も選択どおり残る。一本が長い時間をかけて価値を生み続ける人生だった。",
      "最も多く投稿した人でも、最後まで一位だった人でもない。それでも動画という表現でしか残せなかった一人の人生として、時代の基準を動かした一本だった。"
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
      "制作会社と編集スタジオは利益を生むが、若い制作者へ投資すれば所持金は減る。最後の残高には、表に出ない成功の対価と、誰かへ使った金の両方が残った。",
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
      "夜、ヒカキンは古いマイクを持って駅前へ出る。投げ銭箱を置き、ビートボックスを始める。技術だけなら、十八歳のころよりはるかに上手い。だが誰の足も止まらず、音は電車と信号に混ざって消える。",
      "帰り道で最新動画を確認する。再生数は5,023回。更新しても数字は動かなかった。かつてのコメント欄も、もう数日前から止まっている。",
      "給料日前の残高は、それまで残した貯金と今月の出費で変わる。家賃と生活費を払えば、動画へ使える金はほとんど残らない。",
      "ヒカキンはマイクを鞄へしまい、明日のスーパーのシフトを確認した。何者かになるため上京した青年は、同じ社員寮へ戻り、誰も待っていない歩道を一人で帰る。"
    ],
    finalQuote: "……帰るか。",
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
