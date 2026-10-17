import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, RotateCcw } from "lucide-react";
import { todayPH } from "../lib/date";
import { getDaySchedule, getPracticeSchedule } from "../lib/schedule";
import { activeSequenceDay, CURRICULUM_DAYS } from "../lib/dailyQuestions";
import { useAllQuestions } from "../lib/customQuestions";
import { recordPlay, completeHakbang, useProgress } from "../lib/progress";
import { playClink, playSoft, unlockAudio } from "../lib/sound";
import { Alkansya } from "../components/Alkansya";
import {
  recordUserAnswer,
  getAllAnswerLogs,
  getCurrentUsername,
  useAuth,
} from "../lib/users";
import { checkAnswer } from "../lib/checkAnswer";

const SORT_LABELS: Record<string, string> = {
  Need: "Pangangailangan",
  Want: "Kagustuhan",
  Obligation: "Obligasyon",
  Ipon: "Ipon",
};
type Submission = {
  index: number;
  id: string;
  choice: string;
  status: "pending" | "saved" | "error";
  promise?: Promise<void>;
};

export default function Play() {
  const questions = useAllQuestions();
  const today = todayPH();
  const progress = useProgress();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.is_admin === true;
  const [practiceDay, setPracticeDay] = useState(() => activeSequenceDay(today, progress.plays));
  const schedule = isAdmin ? getPracticeSchedule(today, practiceDay) : getDaySchedule(today, progress);
  const saved = isAdmin
    ? [undefined, undefined, undefined]
    : schedule?.cards.map((c) =>
        getAllAnswerLogs().find(
          (a) =>
            a.username === getCurrentUsername() &&
            a.date === today &&
            a.questionId === c.question.id,
        ),
      ) || [];
  const missing = saved.findIndex((a) => !a);
  const resume = !isAdmin && saved.length === 3 && missing === -1;
  const [cardIndex, setCardIndex] = useState(resume ? 2 : Math.max(0, missing));
  const [results, setResults] = useState<(boolean | undefined)[]>(() =>
    saved.map((a) => a?.isCorrect),
  );
  const [selected, setSelected] = useState<string | null>(
    resume ? saved[2]?.userChoice || null : null,
  );
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState(resume);
  const [complete, setComplete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [syncVersion, setSyncVersion] = useState(0);
  const [hakbang, setHakbang] = useState(false);
  const [dropping, setDropping] = useState(false);
  const [finaleCount, setFinaleCount] = useState(1);
  const submissions = useRef<Submission[]>([]);
  const locked = useRef(resume);
  const mounted = useRef(true);
  const coinTimer = useRef<ReturnType<typeof setTimeout>>();
  const clinkTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const nextButton = useRef<HTMLButtonElement>(null);
  const prompt = useRef<HTMLHeadingElement>(null);
  const question = schedule?.cards[cardIndex]?.question;

  const clearTimers = () => {
    clearTimeout(coinTimer.current);
    clinkTimers.current.forEach(clearTimeout);
    clinkTimers.current = [];
  };

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearTimers();
    };
  }, []);

  useEffect(() => {
    if (feedback) nextButton.current?.focus();
    else prompt.current?.focus();
  }, [feedback, cardIndex]);

  function triggerThreeCoinFinale() {
    clearTimers();
    setFinaleCount(3);
    setDropping(true);
    playClink(progress.sound);
    clinkTimers.current = [
      setTimeout(() => playClink(progress.sound), 300),
      setTimeout(() => playClink(progress.sound), 600),
    ];
    coinTimer.current = setTimeout(() => {
      if (mounted.current) {
        setDropping(false);
        setFinaleCount(1);
      }
    }, 1950);
  }

  function resetForReplay() {
    clearTimers();
    submissions.current = [];
    locked.current = false;
    setCardIndex(0);
    setResults([undefined, undefined, undefined]);
    setSelected(null);
    setMapping({});
    setFeedback(false);
    setComplete(false);
    setHakbang(false);
    setDropping(false);
    setFinaleCount(1);
    setError("");
  }

  function sync(entry: Submission) {
    if (isAdmin) {
      entry.status = "saved";
      entry.promise = Promise.resolve();
      return entry.promise;
    }
    entry.status = "pending";
    entry.promise = recordUserAnswer(entry.id, entry.choice, false, today)
      .then((correct) => {
        entry.status = "saved";
        if (mounted.current)
          setResults((old) => {
            const next = [...old];
            next[entry.index] = correct;
            return next;
          });
      })
      .catch(() => {
        entry.status = "error";
      })
      .finally(() => {
        if (mounted.current) setSyncVersion((v) => v + 1);
      });
    return entry.promise;
  }

  function answer(choice: string) {
    if (!question || locked.current || busy) return;
    locked.current = true;
    const correct = checkAnswer(question, choice);
    unlockAudio(progress.sound);
    setSelected(choice);
    setResults((old) => {
      const next = [...old];
      next[cardIndex] = correct;
      return next;
    });
    setFeedback(true);
    if (correct) {
      playClink(progress.sound);
      setFinaleCount(1);
      setDropping(true);
      clearTimeout(coinTimer.current);
      coinTimer.current = setTimeout(() => setDropping(false), 1250);
    } else playSoft(progress.sound);
    const entry: Submission = {
      index: cardIndex,
      id: question.id,
      choice,
      status: isAdmin ? "saved" : "pending",
    };
    submissions.current.push(entry);
    void sync(entry);
  }

  async function next() {
    if (!feedback || busy) return;
    if (cardIndex < 2) {
      locked.current = false;
      setFeedback(false);
      setSelected(null);
      setMapping({});
      setCardIndex((i) => i + 1);
      return;
    }
    setBusy(true);
    setError("");
    try {
      if (!isAdmin) {
        await Promise.all(
          submissions.current.map((s) =>
            s.status === "error" ? sync(s) : s.promise,
          ),
        );
        if (submissions.current.some((s) => s.status !== "saved"))
          throw new Error(
            "Your answers are still on this screen. Reconnect, then retry saving.",
          );
        await recordPlay(today, results.map(Boolean));
      }
      if (mounted.current) {
        setComplete(true);
        triggerThreeCoinFinale();
      }
    } catch (e) {
      if (mounted.current) setError((e as Error).message);
    } finally {
      if (mounted.current) setBusy(false);
    }
  }

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (
        event.repeat ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        (event.target instanceof HTMLElement &&
          /INPUT|TEXTAREA|SELECT/.test(event.target.tagName))
      )
        return;
      if (feedback && ["Enter", " "].includes(event.key) && !complete) {
        event.preventDefault();
        void next();
        return;
      }
      if (feedback || complete || !question || question.kind === "sort") return;
      const index = ["1", "2", "3"].includes(event.key)
        ? Number(event.key) - 1
        : ["a", "b", "c"].indexOf(event.key.toLowerCase());
      const keys =
        question.format === "Scam o Legit?"
          ? ["SCAM", "LEGIT"]
          : question.kind === "binary"
            ? ["TAMA", "MALI"]
            : question.options?.map((o) => o.key) || [];
      if (index >= 0 && keys[index]) {
        event.preventDefault();
        answer(keys[index]);
      }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  });

  const failed = submissions.current.some((s) => s.status === "error");
  const pending = submissions.current.some((s) => s.status === "pending");
  void syncVersion;
  const practiceControls = isAdmin && (
    <section className="admin-practice-controls" aria-label="Administrator practice">
      <label htmlFor="practice-day">Practice day</label>
      <select id="practice-day" className="field" value={practiceDay} disabled={busy || questions.length === 0} onChange={event => {
        resetForReplay();
        setPracticeDay(Number(event.target.value));
      }}>
        {Array.from({ length: CURRICULUM_DAYS }, (_, index) => <option key={index + 1} value={index + 1}>Day {index + 1}</option>)}
      </select>
      <p>Unlimited practice. Answers and personal progress are not saved.</p>
    </section>
  );
  if (!schedule || !question)
    return (
      <div className="p-8 text-center">
        {practiceControls}
        <p>Today’s cards could not load. Please refresh to retry.</p>
        <Link to="/" className="btn-ghost mt-4">
          Return home
        </Link>
      </div>
    );
  const finished = complete || (!isAdmin && Boolean(progress.plays[today]));
  if (finished)
    return (
      <div className="play-finished">
        {practiceControls}
        <Alkansya
          fillPercentage={isAdmin ? 0 : Math.min(
            100,
            Math.max(18, (progress.alkansyaCoins / 63) * 100),
          )}
          animated={!isAdmin && dropping}
          dropCount={finaleCount}
        />
        <h1>
          {isAdmin ? `Practice complete · ${results.filter(Boolean).length}/3 correct` : `Well done! +${progress.plays[today]?.barya ?? results.filter(Boolean).length} coins into your Alkansya`}
        </h1>
        {((!isAdmin && progress.plays[today]?.results.every(Boolean)) ||
          results.filter(Boolean).length === 3) && (
          <p className="perfect-hulog">{isAdmin ? 'Perfect practice round!' : 'Perfect Hulog · +1 bonus coin!'}</p>
        )}
        <p className="text-sm">Three small lessons. One stronger habit.</p>
        <div className="hakbang">
          <h2 className="font-bold">{isAdmin ? 'Isang Hakbang · Practice step' : 'Isang Hakbang · +5 coins'}</h2>
          <p className="text-sm mt-3 font-semibold">
            {schedule.cards[2].question.hakbangEnglish ||
              "Take one small money step today."}
          </p>
          <p lang="fil" className="translation">
            {schedule.cards[2].question.hakbang}
          </p>
          <button
            disabled={
              busy || hakbang || (!isAdmin && progress.plays[today]?.hakbang)
            }
            className="btn-flame text-sm py-3 w-full"
            onClick={async () => {
              setBusy(true);
              setError("");
              try {
                if (!isAdmin) await completeHakbang(today);
                setHakbang(true);
                playClink(progress.sound);
                setFinaleCount(1);
                setDropping(true);
                clearTimeout(coinTimer.current);
                coinTimer.current = setTimeout(() => setDropping(false), 1200);
              } catch (e) {
                setError((e as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            {hakbang || (!isAdmin && progress.plays[today]?.hakbang) ? (
              <>
                <Check size={16} />{isAdmin ? 'Practice step complete' : '5 coins saved in your Alkansya'}
              </>
            ) : busy ? (
              "Saving…"
            ) : (
              isAdmin ? 'I practiced this step' : "I completed this step · +5 coins"
            )}
          </button>
        </div>
        {error && <p role="alert">{error}</p>}
        {isAdmin && (
          <button
            type="button"
            onClick={resetForReplay}
            className="btn-flame w-full text-sm py-3"
          >
            <RotateCcw size={16} /> Play Again
          </button>
        )}
        <Link to="/" className="btn-ghost w-full">
          Back to My Alkansya
        </Link>
      </div>
    );
  const options =
    question.kind === "binary"
      ? question.format === "Scam o Legit?"
        ? [
            { key: "SCAM", text: "Scam", textFilipino: "Panlilinlang" },
            { key: "LEGIT", text: "Legit", textFilipino: "Ligtas na hakbang" },
          ]
        : [
            { key: "TAMA", text: "True", textFilipino: "Tama" },
            { key: "MALI", text: "False", textFilipino: "Mali" },
          ]
      : question.options || [];
  return (
    <div className="play-viewport">
      {practiceControls}
      <header className="play-top">
        <Link to="/" aria-label="Exit daily drop">
          <ArrowLeft size={20} />
        </Link>
        <span>
          {question.paydaySpecial
            ? "Sweldo Hulog Special"
            : `FRP ${question.course} · ${question.tier}`}
        </span>
        <b>Day {schedule.hulogNumber} · {cardIndex + 1} / 3</b>
      </header>
      <div className="play-progress" aria-label={`Card ${cardIndex + 1} of 3`}>
        <i
          style={{ width: `${((cardIndex + (feedback ? 1 : 0)) / 3) * 100}%` }}
        />
      </div>
      <div className="play-question">
        <p className="play-format">
          {question.format} ·{" "}
          {["Warm-up", "Core practice", "Daily challenge"][cardIndex]}
        </p>
        <h1 ref={prompt} tabIndex={-1}>
          {question.prompt}
        </h1>
        <p lang="fil" className="english-context">
          {question.promptFilipino}
        </p>
      </div>
      {!feedback && (
        <div className="play-answers">
          {question.kind !== "sort" ? (
            <div
              className={
                question.kind === "binary" ? "binary-answers" : "choice-answers"
              }
            >
              {options.map((o, i) => (
                <button
                  key={o.key}
                  aria-pressed={selected === o.key}
                  onClick={() => answer(o.key)}
                >
                  <kbd>{i + 1}</kbd>
                  <span>
                    <strong>{o.text}</strong>
                    {"textFilipino" in o && o.textFilipino && (
                      <small lang="fil">{o.textFilipino}</small>
                    )}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className="sort-items">
                {question.items?.map((item) => (
                  <fieldset key={item.key}>
                    <legend>{item.text}</legend>
                    {item.textFilipino && (
                      <p lang="fil" className="translation">
                        {item.textFilipino}
                      </p>
                    )}
                    <div>
                      {question.categories?.map((cat) => (
                        <button
                          key={cat}
                          aria-pressed={mapping[item.key] === cat}
                          onClick={() =>
                            setMapping((m) => ({ ...m, [item.key]: cat }))
                          }
                        >
                          <span>
                            {cat}
                            <small lang="fil">{SORT_LABELS[cat] || cat}</small>
                          </span>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                ))}
              </div>
              <button
                className="btn-flame text-sm py-3 w-full"
                disabled={!question.items?.every((i) => mapping[i.key])}
                onClick={() => answer(JSON.stringify(mapping))}
              >
                Check my sort
              </button>
            </>
          )}
        </div>
      )}
      {feedback && (
        <section className="play-feedback" aria-label="Answer feedback">
          <div className="feedback-title">
            <strong role="status">
              {results[cardIndex]
                ? (isAdmin ? "Correct!" : "Correct! Coin on its way.")
                : "A useful lesson for next time."}
            </strong>
            <div className="mini-bank">
              <Alkansya
                fillPercentage={isAdmin ? 0 : Math.min(
                  100,
                  (progress.alkansyaCoins / 63) * 100,
                )}
                animated={!isAdmin && dropping}
              />
            </div>
          </div>
          <p className="text-xs font-bold text-cocoa">{question.answerLabel}</p>
          <p className="feedback-why">{question.why}</p>
          <p lang="fil" className="translation">
            {question.whyFilipino}
          </p>
          <button
            ref={nextButton}
            disabled={busy}
            onClick={() => void next()}
            className="btn-flame w-full text-sm py-3"
          >
            {busy
              ? "Saving your drop…"
              : cardIndex < 2
                ? "Next Card →"
                : "Save drop & view results →"}
          </button>
        </section>
      )}
      <footer className="play-sync" aria-live="polite">
        {error ? (
          <p role="alert">{error}</p>
        ) : failed ? (
          <p>
            Answer save interrupted.{" "}
            <button
              onClick={() => {
                submissions.current
                  .filter((s) => s.status === "error")
                  .forEach((s) => void sync(s));
                setSyncVersion((v) => v + 1);
              }}
            >
              Retry saving
            </button>
          </p>
        ) : pending ? (
          "Syncing answers… You can keep playing."
        ) : feedback ? (
          isAdmin ? (
            "Admin test mode · answers not recorded."
          ) : (
            "Answers saved."
          )
        ) : (
          "Keys 1 / 2 / 3 or A / B / C · Enter to continue"
        )}
      </footer>
    </div>
  );
}
