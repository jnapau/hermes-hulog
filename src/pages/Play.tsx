import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check, Sparkles, BarChart3, Languages } from 'lucide-react';
import { todayPH } from '../lib/date';
import { getDaySchedule, ROLE_LABEL, ROLE_STYLE } from '../lib/schedule';
import { recordPlay, completeHakbang, useProgress } from '../lib/progress';
import { playClink, playSoft } from '../lib/sound';
import { HestiaMascot } from '../components/HestiaMascot';
import { Alkansya } from '../components/Alkansya';
import { TIER_STYLE } from '../data/types';

import { recordUserAnswer, getAllAnswerLogs } from '../lib/users';

export default function Play() {
  const navigate = useNavigate();
  const today = todayPH();
  const schedule = getDaySchedule(today);
  const progress = useProgress();

  const [cardIndex, setCardIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [sortMapping, setSortMapping] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hakbangDone, setHakbangDone] = useState(false);
  const [droppingCoin, setDroppingCoin] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);

  if (!schedule) {
    return (
      <div className="mx-auto max-w-md p-6 text-center">
        <p className="text-sm font-bold text-ink">The daily Hulog schedule has not yet started.</p>
        <Link to="/" className="btn-flame mt-4">Return Home</Link>
      </div>
    );
  }

  // Already played today check
  if (progress.plays[today] && !isCompleted) {
    return (
      <div className="mx-auto max-w-md p-6 text-center">
        <HestiaMascot pose="done" height={130} className="mx-auto mb-3" />
        <h2 className="text-lg font-black text-ink">You've completed today's drop!</h2>
        <p className="text-xs text-ink-muted mt-1 mb-4">
          Come back tomorrow to keep Hestia's flame glowing strong.
        </p>
        <Link to="/" className="btn-flame text-sm py-2.5">
          Return to Alkansya
        </Link>
      </div>
    );
  }

  const currentScheduledCard = schedule.cards[cardIndex];
  const question = currentScheduledCard.question;
  const tierStyle = TIER_STYLE[question.tier] || TIER_STYLE['Cash Management'];

  const handleSelectAnswer = (ansKey: string) => {
    if (showFeedback) return;
    setSelectedAnswer(ansKey);
    const isCorrect = ansKey === question.answer;

    // Record answer under active registered user
    recordUserAnswer(question.id, ansKey, isCorrect, today);

    if (isCorrect) {
      playClink(progress.sound);
      setDroppingCoin(true);
      setTimeout(() => setDroppingCoin(false), 900);
    } else {
      playSoft(progress.sound);
    }

    const nextResults = [...results, isCorrect];
    setResults(nextResults);
    setShowFeedback(true);
  };

  const handleSortItem = (itemKey: string, category: string) => {
    if (showFeedback) return;
    setSortMapping((prev) => ({ ...prev, [itemKey]: category }));
  };

  const handleSortSubmit = () => {
    if (showFeedback) return;
    const items = question.items || [];
    const isAllCorrect = items.every((item) => sortMapping[item.key] === item.answer);

    if (isAllCorrect) {
      playClink(progress.sound);
      setDroppingCoin(true);
      setTimeout(() => setDroppingCoin(false), 900);
    } else {
      playSoft(progress.sound);
    }

    const nextResults = [...results, isAllCorrect];
    setResults(nextResults);
    recordUserAnswer(question.id, isAllCorrect ? 'SORT_CORRECT' : 'SORT_INCORRECT', isAllCorrect, today);
    setShowFeedback(true);
  };

  const handleNextCard = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setSortMapping({});

    if (cardIndex < 2) {
      setCardIndex(cardIndex + 1);
    } else {
      // Completed all 3 cards!
      recordPlay(today, results);
      setIsCompleted(true);
    }
  };

  const handleHakbangClaim = () => {
    completeHakbang(today);
    setHakbangDone(true);
    playClink(progress.sound);
  };

  // --- RESULT VIEW ---
  if (isCompleted) {
    const baryaWon = results.filter(Boolean).length;
    return (
      <div className="mx-auto max-w-md px-4 py-8 anim-pop">
        <div className="card p-6 text-center border-2 border-amber-300">
          <Alkansya fillPercentage={75} animated={droppingCoin} />

          <h2 className="text-2xl font-black text-ink mt-3">
            {baryaWon === 3 ? 'Perfect! +3 coins' : `Well Done! +${baryaWon} coins`}
          </h2>
          <p className="text-xs text-ink-muted mt-1">
            Deposited into your bamboo alkansya for the upcoming Sunday break.
          </p>

          {/* 3 Results Dots */}
          <div className="flex justify-center gap-2 my-4">
            {results.map((r, i) => (
              <div
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black shadow-xs ${
                  r ? 'bg-amber-400 text-cocoa' : 'bg-stone-200 text-stone-500'
                }`}
              >
                {r ? '₱' : '✕'}
              </div>
            ))}
          </div>

          {/* Isang Hakbang Action Bridge */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-left my-4">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-flame-deep uppercase tracking-wider">
              <Sparkles className="h-4 w-4" /> One Step / Isang Hakbang (+5 Gold Coins)
            </div>
            <p className="text-xs font-semibold text-ink mt-1.5 leading-snug">
              {schedule.cards[2]?.question.hakbang || 'Review your monthly essential expense baseline.'}
            </p>

            {!hakbangDone ? (
              <button
                onClick={handleHakbangClaim}
                className="mt-3 w-full rounded-xl bg-cocoa py-2.5 text-xs font-bold text-amber-100 hover:bg-cocoa/90 transition shadow-sm"
              >
                I will do this / Completed (+5 Gold Coins)
              </button>
            ) : (
              <div className="mt-3 flex items-center justify-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 py-2 rounded-xl">
                <Check className="h-4 w-4" /> +5 Gold Coins credited to your collection!
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/')}
            className="btn-flame w-full py-3 text-sm mt-2"
          >
            Back to My Alkansya
          </button>
        </div>
      </div>
    );
  }

  // --- QUESTION CARD VIEW ---
  const isSort = question.kind === 'sort';
  const sortItems = question.items || [];
  const sortReady = isSort && sortItems.every((it) => sortMapping[it.key]);

  return (
    <div className="mx-auto max-w-md px-4 py-4 min-h-screen flex flex-col justify-between">
      {/* Top Bar: Progress and Back */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigate('/')}
            className="rounded-lg p-1.5 text-ink-muted hover:bg-black/5 transition"
            title="Exit Session"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                ROLE_STYLE[currentScheduledCard.role]
              }`}
            >
              {ROLE_LABEL[currentScheduledCard.role]}
            </span>
            <span className="text-xs font-extrabold text-cocoa">
              {cardIndex + 1} of 3
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-stone-200 overflow-hidden mb-3">
          <div
            className="h-full bg-flame transition-all duration-300"
            style={{ width: `${((cardIndex + (showFeedback ? 1 : 0)) / 3) * 100}%` }}
          />
        </div>

        {/* Question Header & Explicit Tier Label */}
        <div className="text-center mb-3 flex flex-col items-center gap-1.5">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border shadow-2xs ${tierStyle.pill}`}
            >
              Tier: {question.tier}
            </span>
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-ink-muted">
              FRP {question.course}
            </span>
          </div>
          <h2 className="text-sm font-black text-ink uppercase tracking-wide">
            {question.format}
          </h2>
        </div>

        {/* Question Prompt Card */}
        <div className="card p-5 mb-3 shadow-sm border border-amber-200/90 relative">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-bold text-ink leading-relaxed">
              {question.prompt}
            </p>
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="shrink-0 p-1 rounded-lg text-ink-muted hover:text-ink hover:bg-amber-100/50 transition"
              title="Toggle Filipino Translation"
            >
              <Languages className="h-4 w-4" />
            </button>
          </div>

          {/* Filipino / Tagalog Translation of the Question */}
          {showTranslation && question.promptFilipino && (
            <div className="mt-3 pt-3 border-t border-amber-100 bg-amber-50/70 -mx-2 -mb-2 p-3 rounded-xl border border-amber-200/60">
              <div className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-800 mb-1">
                <span>🇵🇭 Salin sa Filipino (Translation):</span>
              </div>
              <p className="text-xs font-semibold text-cocoa leading-relaxed italic">
                "{question.promptFilipino}"
              </p>
            </div>
          )}

          {/* Mascot pose listening */}
          <div className="absolute -bottom-3 right-3 opacity-20 pointer-events-none">
            <HestiaMascot pose="thinking" height={42} />
          </div>
        </div>

        {/* Interactive Play Formats */}
        {/* 1. SCAM O LEGIT? */}
        {question.format === 'Scam o Legit?' && (
          <div className="grid grid-cols-2 gap-3 my-3">
            <button
              onClick={() => handleSelectAnswer('SCAM')}
              disabled={showFeedback}
              className={`rounded-2xl border-2 py-3.5 text-center font-black text-sm shadow-btn transition active:translate-y-[2px] ${
                selectedAnswer === 'SCAM'
                  ? 'border-scam bg-scam text-white'
                  : 'border-scam/60 bg-red-50 text-scam hover:bg-red-100'
              }`}
            >
              SCAM 🛑
            </button>
            <button
              onClick={() => handleSelectAnswer('LEGIT')}
              disabled={showFeedback}
              className={`rounded-2xl border-2 py-3.5 text-center font-black text-sm shadow-btn transition active:translate-y-[2px] ${
                selectedAnswer === 'LEGIT'
                  ? 'border-legit bg-legit text-white'
                  : 'border-legit/60 bg-emerald-50 text-legit hover:bg-emerald-100'
              }`}
            >
              LEGIT ✅
            </button>
          </div>
        )}

        {/* 2. TAMA O MALI? */}
        {question.format === 'Tama o Mali?' && (
          <div className="grid grid-cols-2 gap-3 my-3">
            <button
              onClick={() => handleSelectAnswer('TAMA')}
              disabled={showFeedback}
              className={`rounded-2xl border-2 py-3.5 text-center font-black text-sm shadow-btn transition active:translate-y-[2px] ${
                selectedAnswer === 'TAMA'
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              TRUE (Tama)
            </button>
            <button
              onClick={() => handleSelectAnswer('MALI')}
              disabled={showFeedback}
              className={`rounded-2xl border-2 py-3.5 text-center font-black text-sm shadow-btn transition active:translate-y-[2px] ${
                selectedAnswer === 'MALI'
                  ? 'border-rose-600 bg-rose-600 text-white'
                  : 'border-rose-300 bg-rose-50 text-rose-800 hover:bg-rose-100'
              }`}
            >
              FALSE (Mali)
            </button>
          </div>
        )}

        {/* 3. MULTIPLE CHOICE / LINGGO BOSS */}
        {question.kind === 'choice' && question.options && (
          <div className="space-y-2.5 my-3">
            {question.options.map((opt) => (
              <button
                key={opt.key}
                onClick={() => handleSelectAnswer(opt.key)}
                disabled={showFeedback}
                className={`w-full text-left rounded-2xl border p-3.5 text-xs font-bold transition shadow-xs flex items-center justify-between ${
                  selectedAnswer === opt.key
                    ? 'border-flame bg-amber-100 text-cocoa'
                    : 'border-hairline bg-white text-ink hover:bg-surface-sunk'
                }`}
              >
                <div className="pr-2">
                  <span>{opt.text}</span>
                  {opt.textFilipino && opt.textFilipino !== opt.text && (
                    <span className="block text-[11px] font-normal text-ink-muted italic mt-0.5">
                      {opt.textFilipino}
                    </span>
                  )}
                </div>
                <span className="h-5 w-5 shrink-0 rounded-full border border-stone-300 flex items-center justify-center text-[10px]">
                  {opt.key}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* 4. SWELDO SORT */}
        {isSort && (
          <div className="space-y-3 my-2">
            <div className="space-y-2">
              {sortItems.map((item) => (
                <div
                  key={item.key}
                  className="rounded-xl border border-hairline bg-white p-2.5 shadow-xs flex flex-col gap-1.5"
                >
                  <div>
                    <span className="text-xs font-bold text-ink">{item.text}</span>
                    {item.textFilipino && item.textFilipino !== item.text && (
                      <span className="text-[11px] text-ink-muted italic block">
                        {item.textFilipino}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {question.categories?.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleSortItem(item.key, cat)}
                        disabled={showFeedback}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition border ${
                          sortMapping[item.key] === cat
                            ? 'bg-flame border-amber-500 text-cocoa'
                            : 'bg-surface-sunk border-stone-200 text-ink-muted hover:bg-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {!showFeedback && (
              <button
                onClick={handleSortSubmit}
                disabled={!sortReady}
                className="btn-flame w-full py-3 text-xs mt-2 disabled:opacity-50"
              >
                Submit Category Sort
              </button>
            )}
          </div>
        )}
      </div>

      {/* FEEDBACK BOTTOM DRAWER */}
      {showFeedback && (
        <div className="card p-4 border-2 border-amber-300 bg-white shadow-xl anim-up mt-4">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                results[results.length - 1] ? 'bg-emerald-600' : 'bg-rose-500'
              }`}
            >
              {results[results.length - 1] ? '✓' : '✕'}
            </div>
            <h3 className="font-extrabold text-xs text-ink">
              {results[results.length - 1] ? 'Correct! +1 coin' : 'Not quite — here is what to know'}
            </h3>
          </div>

          <p className="text-xs font-bold text-cocoa mb-1">
            Correct Answer: {question.answerLabel}
          </p>
          <p className="text-xs text-ink-muted leading-relaxed">
            {question.why}
          </p>

          {/* Tanong ng Bayan: Registered User Statistics */}
          {(() => {
            const questionLogs = getAllAnswerLogs().filter((l) => l.questionId === question.id);
            const totalAttempts = questionLogs.length;
            const correctAttempts = questionLogs.filter((l) => l.isCorrect).length;
            const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : (question.communityStats?.correctPct ?? 100);
            const wrongLog = questionLogs.find((l) => !l.isCorrect);
            const trap = wrongLog ? `Common trap: Player chose "${wrongLog.userChoice}"` : question.communityStats?.topMisconception;

            return (
              <div className="my-2.5 rounded-xl border border-sky-200 bg-sky-50/70 p-2.5 text-left">
                <div className="flex items-center justify-between text-[10px] font-extrabold text-sky-800 uppercase tracking-wider mb-1">
                  <span className="flex items-center gap-1">
                    <BarChart3 className="h-3.5 w-3.5 text-sky-600" /> Tanong ng Bayan (Registered User Data)
                  </span>
                  <span>
                    {accuracy}% correct ({totalAttempts} {totalAttempts === 1 ? 'user log' : 'user logs'})
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-sky-200 overflow-hidden mb-1">
                  <div
                    className="h-full bg-sky-600 transition-all duration-500 rounded-full"
                    style={{ width: `${accuracy}%` }}
                  />
                </div>
                {trap && (
                  <p className="text-[11px] text-sky-900 font-medium leading-tight">
                    💡 <strong>{trap}</strong>
                  </p>
                )}
              </div>
            );
          })()}

          <button
            onClick={handleNextCard}
            className="btn-flame w-full py-2.5 text-xs font-bold mt-2"
          >
            {cardIndex < 2 ? 'Next Card →' : 'View Session Results 🏆'}
          </button>
        </div>
      )}
    </div>
  );
}
