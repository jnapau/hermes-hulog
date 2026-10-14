import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { scheduleRange, SCHEDULE_START, ROLE_LABEL, ROLE_STYLE } from '../../lib/schedule';
import { todayPH, addDays, formatLong, dayOfWeek, DAY_SHORT } from '../../lib/date';
import { TIER_STYLE } from '../../data/types';
import { ChevronLeft, ChevronRight, Tag, BarChart3 } from 'lucide-react';

export default function AdminCalendar() {
  const today = todayPH();
  const [startDate, setStartDate] = useState(today);
  const [daysCount, setDaysCount] = useState(30);

  const days = useMemo(() => {
    return scheduleRange(startDate, addDays(startDate, daysCount - 1));
  }, [startDate, daysCount]);

  const handleShiftDays = (amount: number) => {
    const next = addDays(startDate, amount);
    if (next >= SCHEDULE_START) {
      setStartDate(next);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-ink">Curriculum Calendar & Show Dates</h2>
          <p className="text-xs text-ink-muted">
            Daily deterministic rotation of 3 micro-learning cards across all 365 days of the Philippine calendar year.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            to="/admin/statistics"
            className="btn-flame text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <BarChart3 className="h-3.5 w-3.5" /> View Live Answer Analytics
          </Link>
        </div>
      </div>

      {/* Date Range Navigation Controls */}
      <div className="card p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleShiftDays(-7)}
            className="rounded-lg p-1.5 border border-stone-200 text-ink-muted hover:bg-surface-sunk"
            title="7 days back"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setStartDate(today)}
            className="rounded-lg border border-stone-200 px-2.5 py-1 text-xs font-bold text-ink hover:bg-surface-sunk"
          >
            Jump to Today
          </button>
          <button
            onClick={() => handleShiftDays(7)}
            className="rounded-lg p-1.5 border border-stone-200 text-ink-muted hover:bg-surface-sunk"
            title="7 days forward"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span>Starting:</span>
          <input
            type="date"
            value={startDate}
            min={SCHEDULE_START}
            onChange={(e) => e.target.value && setStartDate(e.target.value)}
            className="rounded-xl border border-stone-200 px-2.5 py-1 text-xs font-bold text-ink focus:border-brand focus:outline-none"
          />

          <span className="ml-2">Duration:</span>
          <select
            value={daysCount}
            onChange={(e) => setDaysCount(Number(e.target.value))}
            className="rounded-xl border border-stone-200 px-2.5 py-1 text-xs font-bold text-ink focus:border-brand focus:outline-none"
          >
            <option value={14}>14 days (2 weeks)</option>
            <option value={30}>30 days (1 month)</option>
            <option value={90}>90 days (1 quarter)</option>
            <option value={180}>180 days (6 months)</option>
            <option value={365}>365 days (Full Year Curriculum)</option>
          </select>
        </div>
      </div>

      {/* Days Schedule List */}
      <div className="space-y-4">
        {days.map((d) => {
          const isToday = d.date === today;
          return (
            <div
              key={d.date}
              className={`card p-4 space-y-3 transition ${
                isToday ? 'border-2 border-brand bg-brand/5 shadow-xs' : ''
              }`}
            >
              {/* Day Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-lg px-2.5 py-1 text-xs font-black ${
                      isToday ? 'bg-brand text-white' : 'bg-stone-200 text-cocoa'
                    }`}
                  >
                    Hulog #{d.hulogNumber}
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-ink">
                      {formatLong(d.date)} ({DAY_SHORT[dayOfWeek(d.date)]})
                    </h3>
                  </div>
                </div>

                {/* Seasonal Tags */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {d.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-amber-100 px-2 py-0.5 text-2xs font-extrabold text-amber-900 flex items-center gap-1"
                    >
                      <Tag className="h-2.5 w-2.5" /> {t}
                    </span>
                  ))}
                  {d.isSunday && (
                    <span className="rounded-full bg-rose-100 px-2 py-0.5 text-2xs font-black text-rose-800">
                      Sunday Boss & Basag Day
                    </span>
                  )}
                </div>
              </div>

              {/* 3 Scheduled Cards for this Day */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {d.cards.map((c, slotIdx) => {
                  const style = TIER_STYLE[c.question.tier] || TIER_STYLE['Cash Management'];
                  return (
                    <div
                      key={slotIdx}
                      className="rounded-2xl border border-stone-200 bg-white p-3.5 flex flex-col justify-between shadow-2xs"
                    >
                      <div>
                        {/* Role & Tier Header */}
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                          <span
                            className={`rounded-full border px-2 py-0.5 text-2xs font-extrabold ${
                              ROLE_STYLE[c.role]
                            }`}
                          >
                            Slot {slotIdx + 1} · {ROLE_LABEL[c.role]}
                          </span>
                          <span className={`rounded-full px-1.5 py-0.2 text-[9px] font-black ${style.pill}`}>
                            {c.question.tier}
                          </span>
                        </div>

                        {/* Question ID & Format */}
                        <div className="flex items-center justify-between text-2xs font-bold text-ink-muted mb-1">
                          <span>{c.question.id}</span>
                          <span>{c.question.format}</span>
                        </div>

                        {/* Prompt */}
                        <p className="text-xs font-bold text-ink leading-snug line-clamp-2">
                          {c.question.prompt}
                        </p>
                        <p className="text-[11px] text-ink-muted italic line-clamp-1 mt-0.5">
                          🇵🇭 {c.question.promptFilipino}
                        </p>
                      </div>

                      {/* Answer & Community Benchmark */}
                      <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-2xs">
                        <span className="font-extrabold text-cocoa line-clamp-1">
                          Ans: {c.question.answerLabel}
                        </span>
                        <span className="text-sky-700 font-bold shrink-0">
                          {c.question.communityStats.correctPct}% acc
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
