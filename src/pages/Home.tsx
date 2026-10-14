import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Sparkles, CheckCircle2, User } from 'lucide-react';
import { useProgress, canBasag, doBasag } from '../lib/progress';
import { todayPH, weekStart, addDays, DAY_SHORT } from '../lib/date';
import { getDaySchedule } from '../lib/schedule';
import { HestiaMascot } from '../components/HestiaMascot';
import { Alkansya } from '../components/Alkansya';
import { playBasag } from '../lib/sound';
import { COLLECTIBLE_BY_ID } from '../data/collectibles';
import { useAuth } from '../lib/users';

export default function Home() {
  const progress = useProgress();
  const { currentUser } = useAuth();
  const today = todayPH();
  const playedToday = Boolean(progress.plays[today]);
  const schedule = getDaySchedule(today);

  const [basagReward, setBasagReward] = useState<string | null>(null);

  // Weekly tracker days
  const startOfThisWeek = weekStart(today);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfThisWeek, i));
  const readyToBasag = canBasag(progress, today);

  const handleBasag = () => {
    playBasag(progress.sound);
    const rewardId = doBasag(today);
    if (rewardId) {
      setBasagReward(rewardId);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-6 sm:px-6">
      {/* Top Welcome / Player Header (Clean, No Inaccurate Stats) */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-100/70 px-3.5 py-1.5 text-xs font-bold text-cocoa shadow-2xs">
          <User className="h-3.5 w-3.5 text-amber-700" />
          <span>{currentUser ? currentUser.username : 'Guest Player'}</span>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold text-ink-muted">Hulog #{schedule?.hulogNumber ?? 1}</span>
        </div>
      </div>

      {/* Main Sanctuary Card */}
      <div className="card p-6 flex flex-col items-center relative overflow-hidden bg-gradient-to-b from-white via-cream to-cream-deep/40 shadow-sm border border-amber-200/70">
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        {/* Hestia message bubble */}
        <div className="relative mb-3 max-w-[280px] rounded-2xl bg-white px-3.5 py-2 text-center text-xs font-medium text-ink shadow-2xs border border-amber-200">
          <p>
            {playedToday
              ? "Magaling! You've dropped your coin for today. See you tomorrow!"
              : 'Isang hulog araw-araw. Ready for your 60-second micro-learning habit?'}
          </p>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-amber-200 rotate-45" />
        </div>

        {/* Mascot & Alkansya Center Stage */}
        <div className="flex items-end justify-center gap-1 my-3">
          <Alkansya fillPercentage={playedToday ? 80 : 45} />
          <div className="-ml-8 mb-2">
            <HestiaMascot
              pose={playedToday ? 'done' : 'idle'}
              height={125}
              showLookBadge={true}
              className={`transition-transform hover:scale-105 ${playedToday ? 'hestia-lit' : ''}`}
            />
          </div>
        </div>

        {/* Action Button: Play or Done */}
        <div className="w-full max-w-xs mt-2 mb-4">
          {!playedToday ? (
            <Link
              to="/play"
              className="btn-flame w-full text-center flex items-center justify-center gap-2 group shadow-md py-3 text-sm"
            >
              <Play className="h-5 w-5 fill-cocoa group-hover:scale-110 transition-transform" />
              <span>Drop a coin today · 60s</span>
            </Link>
          ) : (
            <div className="space-y-2">
              <div className="rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-center text-sm font-bold text-emerald-800 flex items-center justify-center gap-2 shadow-2xs">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>You've completed your daily drop!</span>
              </div>
              <p className="text-center text-xs font-semibold text-ink-muted">
                See you tomorrow! One drop each day.
              </p>
            </div>
          )}
        </div>

        {/* Sunday Basag Ritual Banner */}
        {readyToBasag && (
          <div className="mt-2 w-full rounded-2xl bg-gradient-to-r from-amber-400 to-flame p-4 text-center shadow-md animate-bounce">
            <h4 className="font-extrabold text-cocoa text-sm flex items-center justify-center gap-1.5">
              <Sparkles className="h-4 w-4" /> Break the Alkansya! (Sunday Basag)
            </h4>
            <p className="text-xs text-cocoa/90 my-1">
              You saved consistently all week. Reveal your special cultural reward!
            </p>
            <button
              onClick={handleBasag}
              className="mt-2 rounded-xl bg-cocoa px-4 py-2 text-xs font-bold text-amber-200 hover:bg-cocoa/90 shadow transition"
            >
              Break the Alkansya 🎋
            </button>
          </div>
        )}

        {/* Basag reward reveal modal */}
        {basagReward && COLLECTIBLE_BY_ID[basagReward] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm anim-pop">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center border-4 border-amber-300 shadow-2xl">
              <div className="text-5xl my-2">{COLLECTIBLE_BY_ID[basagReward].emoji}</div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-800">
                New Cultural Collectible!
              </span>
              <h3 className="text-lg font-black text-ink mt-2">
                {COLLECTIBLE_BY_ID[basagReward].nameFilipino}
              </h3>
              <p className="text-xs font-bold text-cocoa">
                {COLLECTIBLE_BY_ID[basagReward].nameEnglish}
              </p>
              <p className="text-xs text-ink-muted mt-2 mb-4 leading-relaxed">
                {COLLECTIBLE_BY_ID[basagReward].culturalStory}
              </p>
              <button
                onClick={() => setBasagReward(null)}
                className="btn-flame w-full py-2.5 text-sm font-bold"
              >
                Place on Collection Shelf ✨
              </button>
            </div>
          </div>
        )}

        {/* Week Day Tracker */}
        <div className="mt-4 w-full border-t border-[#F0E3CC] pt-4">
          <p className="text-center text-[11px] font-bold text-ink-muted uppercase tracking-wider mb-2">
            Weekly Drops (Mon - Sun)
          </p>
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekDays.map((dateStr, idx) => {
              const played = Boolean(progress.plays[dateStr]);
              const isCurrentDay = dateStr === today;
              return (
                <div key={dateStr} className="flex flex-col items-center gap-1">
                  <span
                    className={`text-[10px] font-bold ${
                      isCurrentDay ? 'text-flame-deep underline' : 'text-ink-muted'
                    }`}
                  >
                    {DAY_SHORT[(idx + 1) % 7]}
                  </span>
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      played
                        ? 'bg-amber-400 text-cocoa shadow-2xs scale-105'
                        : isCurrentDay
                        ? 'border-2 border-dashed border-amber-400 bg-white text-ink-muted'
                        : 'bg-surface-sunk text-stone-300'
                    }`}
                  >
                    {played ? '₱' : '·'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
