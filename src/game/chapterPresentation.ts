import type { ChapterDefinition, GameState } from "./types";

const has = (state: GameState, flag: string): boolean => state.flags.includes(flag);

/**
 * 章の期間と番号は共通だが、章題と導入は直前の人生に合わせて変える。
 * 842再生の世界で「一千万回の向こう側」と表示される、といった
 * 物語上の矛盾をここで防ぐ。
 */
export const getChapterPresentation = (
  definition: ChapterDefinition,
  state: GameState
): ChapterDefinition => {
  if (definition.number === 2) {
    if (has(state, "ch1_video_flop")) {
      return {
        ...definition,
        title: "八百四十二回の次",
        subtitle: "奇跡が来なくても、次の一本は自分で作れる。",
        opening: "世界は変わらなかった。だからヒカキンは、閉じた画面の横で新しい企画ノートを開く。"
      };
    }
    if (has(state, "ch1_viral_niche")) {
      return {
        ...definition,
        title: "十二万人の濃い観客",
        subtitle: "広く知られなくても、待っている人はいる。",
        opening: "世間的な大ヒットではない。それでも一音の違いまで聞く視聴者が、次の投稿を待っていた。"
      };
    }
    if (has(state, "ch1_viral_delayed")) {
      return {
        ...definition,
        title: "遅れて来た百万人",
        subtitle: "終わったと思った動画が、もう一度走り始める。",
        opening: "公開から三か月。忘れかけた一本へ海外から通知が届き、止まっていた数字が動き出した。"
      };
    }
  }

  if (definition.number === 3) {
    if (state.hidden.fatigue >= 30) {
      return {
        ...definition,
        title: "眠らない成功",
        subtitle: "伸びるほど、眠る時間だけが消えていく。",
        opening: "一人で勝ち取った勢いを、一人の身体だけで支え続けることはできない。次の時代は、作り方そのものを選び直すところから始まる。"
      };
    }
    if (state.routes.network >= 12) {
      return {
        ...definition,
        title: "名前が増えた画面",
        subtitle: "友人もライバルも、自分の動画を一番に考えて走り始める。",
        opening: "まっすお、ダンケ、はじめ課長、サックスむらい。全員が別々のチャンネルを育てながら、必要な時だけ同じカメラの前へ集まる時代が来た。"
      };
    }
    if (state.routes.craft >= 15) {
      return {
        ...definition,
        title: "一人で磨いた音の外へ",
        subtitle: "完成度だけでは届かない場所に、仲間と仕事が待っている。",
        opening: "浴室で磨いた一音は強い武器になった。だが、企業、音楽、後輩、大型企画は、一人の完璧さとは違う答えを求めてくる。"
      };
    }
  }

  if (definition.number === 4) {
    if (state.hidden.controversy >= 25) {
      return {
        ...definition,
        title: "燃え始めた人気",
        subtitle: "注目は増えた。味方が増えたとは限らない。",
        opening: "強い見出しで得た再生は、次もさらに強い刺激を要求する。過去の小さなごまかしが、大きな名前の下で燃え始めた。"
      };
    }
    if (state.hidden.fatigue >= 45) {
      return {
        ...definition,
        title: "笑顔が始まらない",
        subtitle: "録画ランプが点けば笑える。消えたあとの自分が立てない。",
        opening: "年間八百本を超える動画を支えたのは努力だった。その努力が限界を隠す道具へ変わった時、人気は身体を食べ始める。"
      };
    }
    if (state.stats.trust >= 70) {
      return {
        ...definition,
        title: "信用が試される日",
        subtitle: "良い人と呼ばれるほど、一度の判断が重くなる。",
        opening: "積み上げた信用は盾ではない。広告、スタッフ、共演者、子供への影響に、過去より厳しい答えを求める責任になった。"
      };
    }
  }

  if (definition.number === 5) {
    if (has(state, "ch5_entry_controversy")) {
      return {
        ...definition,
        title: "燃え残った名前",
        subtitle: "見られてはいる。だが、もう作品を待たれてはいない。",
        opening: "炎上のたびに人が集まり、同じ数だけ信用が消えた。最後に残すのが動画か言い訳かを選ぶ。"
      };
    }
    if (has(state, "ch5_entry_craft")) {
      return {
        ...definition,
        title: "伝説の一本",
        subtitle: "一位ではなく、百年後にも残る一曲を作る。",
        opening: "ゼイキンの旋律と、ヒカキンが生きてきた音。二人の違う才能を一億再生の一本へ重ねる。"
      };
    }
    if (has(state, "ch5_entry_mastermind")) {
      return {
        ...definition,
        title: "カメラの反対側",
        subtitle: "自分が映らなくても、面白さは作れる。",
        opening: "日本一から遠ざかる一方で、他人の魅力を見つける制作力だけは誰にも負けないものになっていた。"
      };
    }
    if (has(state, "ch5_entry_recovery")) {
      return {
        ...definition,
        title: "残された道",
        subtitle: "失ったあとに何を選ぶかで、最後の名前が決まる。",
        opening: "数字も信用も最盛期には戻らない。それでも、謝ること、働くこと、もう一本作ることはできる。"
      };
    }
  }

  return definition;
};
