import { useCallback, useMemo, useState } from "react";
import { ProfileDrawer } from "./components/ProfileDrawer";
import { AssetImage } from "./components/AssetImage";
import { AssetVideo } from "./components/AssetVideo";
import { StatsBar } from "./components/StatsBar";
import { StoryScene } from "./components/StoryScene";
import { allEvents, endingDefinitions } from "./data";
import { CHAPTERS, createInitialGameState } from "./game/constants";
import {
  advanceChapter,
  initializeRun,
  isChapterComplete,
  resolveChoice,
  selectEnding,
  selectEvent,
  updateMetaAfterRun,
  type ChoiceResolution
} from "./game/engine";
import { formatSubscribers } from "./game/format";
import { loadGame, loadMeta, saveGame, saveMeta } from "./game/storage";
import type {
  EndingDefinition,
  EventChoice,
  GameState,
  MetaProgress,
  StoryEvent
} from "./game/types";

type Screen = "title" | "prologue" | "chapter" | "story" | "chapterEnd" | "ending" | "archive";

interface SelectedDecision {
  event: StoryEvent;
  choice: EventChoice;
  resolution: ChoiceResolution;
}

const legalText =
  "本作品はフィクションです。登場する人物・団体・名称・出来事は架空のものであり、実在する人物・団体とは一切関係ありません。";

function App() {
  const [meta, setMeta] = useState<MetaProgress>(() => loadMeta());
  const [game, setGame] = useState<GameState | null>(() => loadGame());
  const [screen, setScreen] = useState<Screen>("title");
  const [selected, setSelected] = useState<SelectedDecision | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [ending, setEnding] = useState<EndingDefinition | null>(() => {
    const saved = loadGame();
    return saved?.endingId
      ? endingDefinitions.find((item: EndingDefinition) => item.id === saved.endingId) ?? null
      : null;
  });

  const chapter = game
    ? CHAPTERS.find((definition) => definition.number === game.chapter)
    : undefined;

  const activeEvent = useMemo(() => {
    if (!game || screen !== "story") return null;
    if (selected) return selected.event;
    if (isChapterComplete(game)) return null;
    return selectEvent(allEvents, game, meta);
  }, [game, meta, screen, selected]);

  const beginNewGame = useCallback(() => {
    if (game && !game.finished && !window.confirm("現在のプレイを破棄して、最初から始めますか？")) {
      return;
    }
    const next = initializeRun(createInitialGameState(Date.now()));
    setGame(next);
    setSelected(null);
    setEnding(null);
    saveGame(next);
    setScreen("prologue");
  }, [game]);

  const handleChoose = useCallback(
    (choice: EventChoice) => {
      if (!game || !activeEvent || selected) return;
      const resolution = resolveChoice(game, activeEvent, choice);
      setGame(resolution.state);
      saveGame(resolution.state);
      setSelected({ event: activeEvent, choice, resolution });
    },
    [activeEvent, game, selected]
  );

  const finishRun = useCallback(
    (current: GameState) => {
      const selectedEnding = selectEnding(endingDefinitions, current, meta);
      const fourEmperors =
        selectedEnding.id === "number_one" &&
        current.flags.includes("ch5_four_emperors_ready") &&
        current.relationships.hajime >= 55 &&
        current.relationships.tetsu >= 45 &&
        current.relationships.shiruko >= 45;
      const finalState: GameState = {
        ...current,
        finished: true,
        endingId: selectedEnding.id,
        flags: fourEmperors
          ? [...new Set([...current.flags, "four_emperors_achieved"])]
          : current.flags
      };
      const nextMeta = updateMetaAfterRun(meta, finalState);
      setGame(finalState);
      setMeta(nextMeta);
      setEnding(selectedEnding);
      saveGame(finalState);
      saveMeta(nextMeta);
      setSelected(null);
      setScreen("ending");
    },
    [meta]
  );

  const continueGame = useCallback(() => {
    if (!game) return;

    setSelected(null);

    // Screen state is intentionally not stored.  A reload immediately after a
    // final choice therefore resumes from a completed chapter, not from a
    // story event.  Routing that state back through the chapter/ending flow
    // prevents the app from rendering an empty screen.
    if (game.finished) {
      if (ending) {
        setScreen("ending");
      } else {
        finishRun(game);
      }
      return;
    }

    if (isChapterComplete(game)) {
      if (game.chapter === 5) {
        finishRun(game);
      } else {
        setScreen("chapterEnd");
      }
      return;
    }

    setScreen("story");
  }, [ending, finishRun, game]);

  const handleResultContinue = useCallback(() => {
    if (!game) return;
    if (!isChapterComplete(game)) {
      setSelected(null);
      return;
    }
    if (game.chapter === 5) {
      finishRun(game);
      return;
    }
    setSelected(null);
    setScreen("chapterEnd");
  }, [finishRun, game]);

  const enterNextChapter = useCallback(() => {
    if (!game) return;
    const next = advanceChapter(game);
    setGame(next);
    saveGame(next);
    setScreen("chapter");
  }, [game]);

  if (screen === "title") {
    return (
      <div className="title-screen">
        <AssetImage assetKey="ui/title_hero" className="title-screen__hero" alt="" />
        <div className="title-screen__content">
          <div className="title-screen__kicker">A ONE-HOUR CREATOR LIFE</div>
          <h1>BEAT TO <span>THE TOP</span></h1>
          <h2>ヒカキン育成ゲーム</h2>
          <p className="title-screen__intro">
            所持金二万円、登録者ゼロ、武器はビートボックスだけ。
            選んだ動画、守った約束、利用した炎上。そのすべてが、最後の一本へつながる。
          </p>
          <div className="title-actions">
            {game ? (
              <button className="primary-button" onClick={continueGame}>
                {game.finished ? "エンディングを見る" : "つづきから"}<span>→</span>
              </button>
            ) : null}
            <button className={game ? "ghost-button" : "primary-button"} onClick={beginNewGame}>
              {game ? "最初から" : "物語を始める"}
            </button>
            <button className="ghost-button" onClick={() => setScreen("archive")}>記録</button>
          </div>
        </div>
        <p className="legal-note">{legalText}</p>
      </div>
    );
  }

  if (screen === "archive") {
    return (
      <div className="archive-screen">
        <header className="archive-screen__header">
          <div><span className="eyebrow">ARCHIVE</span><h1>周回記録</h1></div>
          <button className="ghost-button" onClick={() => setScreen("title")}>タイトルへ戻る</button>
        </header>
        <div className="archive-grid">
          {endingDefinitions.map((item: EndingDefinition) => {
            const unlocked = meta.unlockedEndings.includes(item.id);
            return (
              <article className={`archive-card ${unlocked ? "" : "archive-card--locked"}`} key={item.id}>
                <span>{unlocked ? item.category : "LOCKED"}</span>
                <h2>{unlocked ? item.title : "？？？？？？"}</h2>
                <p>{unlocked ? item.finalQuote : "まだ見ていない人生です。違う選択を試してください。"}</p>
              </article>
            );
          })}
          <article className="archive-card">
            <span>CAREER DATA</span>
            <h2>{meta.completedRuns}周完了</h2>
            <p>
              発見したイベント {meta.seenEvents.length} / {allEvents.length}件
              <br />最高登録者 {formatSubscribers(meta.bestSubscribers)}人
              {meta.fourEmperorsUnlocked ? <><br />四皇時代 解放済み</> : null}
            </p>
          </article>
        </div>
        <section className="archive-library" aria-labelledby="video-library-title">
          <header>
            <div>
              <span className="eyebrow">VIDEO LIBRARY</span>
              <h2 id="video-library-title">発見した代表動画</h2>
            </div>
            <strong>{meta.unlockedVideos.length}本</strong>
          </header>
          {meta.unlockedVideos.length > 0 ? (
            <div className="archive-video-grid">
              {meta.unlockedVideos.map((title, index) => (
                <span key={title}><i>{String(index + 1).padStart(2, "0")}</i>{title}</span>
              ))}
            </div>
          ) : (
            <p className="empty-copy">動画を完成させると、ここへタイトルが記録されます。</p>
          )}
        </section>
      </div>
    );
  }

  if (!game || !chapter) return null;

  if (screen === "prologue") {
    return (
      <div className="interstitial">
        <div className="interstitial__number">0</div>
        <div className="interstitial__content">
          <span className="eyebrow">PROLOGUE · 2008年3月</span>
          <h1>絶対に、何者かになる。</h1>
          <p>
            高校を卒業した十八歳のヒカキンは、親から渡された二万円を握りしめ、新潟から東京へ向かっていた。
            YouTubeを仕事にする発想はない。ただ、何者でもないまま終わるつもりだけはなかった。
          </p>
          <button className="primary-button" onClick={() => setScreen("chapter")}>
            東京へ向かう<span>→</span>
          </button>
        </div>
      </div>
    );
  }

  if (screen === "chapter" || screen === "chapterEnd") {
    const isEnd = screen === "chapterEnd";
    const nextChapter = isEnd
      ? CHAPTERS.find((item) => item.number === game.chapter + 1)
      : chapter;
    return (
      <div className="interstitial">
        <div className="interstitial__number">{nextChapter?.number}</div>
        <div className="interstitial__content">
          <span className="eyebrow">CHAPTER {nextChapter?.number} · {nextChapter?.period}</span>
          <h1>{nextChapter?.title}</h1>
          <h2>{nextChapter?.subtitle}</h2>
          <p>{nextChapter?.opening}</p>
          <button
            className="primary-button"
            onClick={() => isEnd ? enterNextChapter() : setScreen("story")}
          >
            第{nextChapter?.number}章を始める<span>→</span>
          </button>
        </div>
      </div>
    );
  }

  if (screen === "ending" && ending) {
    const fourEmperors = game.flags.includes("four_emperors_achieved");
    const darkMassuo =
      game.stats.subscribers >= 18_000_000 &&
      !game.flags.includes("ch5_dark_massuo_epilogue");
    const endingPortrait = ending.visual.portrait
      ? ending.visual.expression && !/\.[a-z0-9]+$/i.test(ending.visual.portrait)
        ? `${ending.visual.portrait}_${ending.visual.expression}`
        : ending.visual.portrait
      : undefined;
    return (
      <div className="ending-screen">
        <AssetImage assetKey={ending.visual.background} className="ending-screen__art" alt="" />
        {ending.visual.eventCg ? <AssetImage assetKey={ending.visual.eventCg} className="ending-screen__art" alt="" /> : null}
        {ending.visual.video ? <AssetVideo assetKey={ending.visual.video} className="ending-screen__art" /> : null}
        {endingPortrait ? <AssetImage assetKey={endingPortrait} className="ending-screen__portrait" alt="" /> : null}
        <div className="ending-screen__content">
          <span className="ending-screen__category">{ending.category} END</span>
          <h1>{fourEmperors ? `${ending.title}・四皇時代` : ending.title}</h1>
          <div className="ending-screen__body">
            {ending.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {fourEmperors ? (
              <p>四人は同じ型の王にはならなかった。総合力、挑戦、地域、子供たちの遊び。それぞれの頂点を守りながら互いを引き上げる時代が、のちに「YouTuber四皇」の名で語られた。</p>
            ) : null}
            {darkMassuo ? (
              <p>その頃、再生数五千回まで落ちていたまっすおが、笑顔を捨てた一本を公開する。「ダークまっすお」の名が、静かに急上昇欄へ戻ってきた。</p>
            ) : null}
          </div>
          <blockquote>「{ending.finalQuote}」</blockquote>
          <div className="ending-screen__stats">
            <span>登録者 {formatSubscribers(game.stats.subscribers)}人</span>
            <span>信用 {game.stats.trust}</span>
            <span>制作力 {game.stats.production}</span>
            <span>見たイベント {game.seenThisRun.length}件</span>
          </div>
          <div className="title-actions">
            <button className="primary-button" onClick={beginNewGame}>別の人生を始める<span>→</span></button>
            <button className="ghost-button" onClick={() => setScreen("archive")}>周回記録</button>
            <button className="ghost-button" onClick={() => setScreen("title")}>タイトルへ</button>
          </div>
        </div>
      </div>
    );
  }

  if (!activeEvent) return null;

  const progress = ((game.slot + (game.chapter - 1) * 12) / 60) * 100;

  return (
    <div className="app-shell">
      <header className="game-header">
        <div className="game-header__brand"><strong>BEAT TO THE TOP</strong><span>CH.{game.chapter}</span></div>
        <StatsBar state={game} />
        <div className="game-header__actions">
          <button className="ghost-button ghost-button--desktop" onClick={() => setScreen("title")}>保存して終了</button>
          <button className="ghost-button ghost-button--desktop" onClick={() => setProfileOpen(true)}>能力・人間関係</button>
          <button
            className="icon-button"
            onClick={() => setProfileOpen(true)}
            aria-label="プロフィール"
            aria-expanded={profileOpen}
            aria-controls="profile-drawer"
          >☰</button>
        </div>
      </header>
      <div className="progress-strip">
        <span>第{game.chapter}章　{chapter.title}</span>
        <div className="progress-strip__track"><i style={{ width: `${progress}%` }} /></div>
        <span>{Math.min(60, (game.chapter - 1) * 12 + game.slot + 1)} / 60</span>
      </div>
      <StoryScene
        state={game}
        meta={meta}
        event={activeEvent}
        chapterLabel={`CHAPTER ${game.chapter}`}
        selected={selected ? { choice: selected.choice, resolution: selected.resolution } : undefined}
        interactionsBlocked={profileOpen}
        onChoose={handleChoose}
        onContinue={handleResultContinue}
      />
      <ProfileDrawer state={game} open={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  );
}

export default App;
