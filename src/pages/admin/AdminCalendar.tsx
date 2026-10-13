import { useState, useMemo } from 'react';
import { scheduleRange, scheduleToCSV, SCHEDULE_START } from '../../lib/schedule';
import { todayPH, addDays, formatLong, dayOfWeek, DAY_SHORT } from '../../lib/date';
import { Download, ChevronLeft, ChevronRight, Tag } from 'lucide-react';

export default function AdminCalendar() {
  const today = todayPH();
  const [startDate, setStartDate] = useState(today);
  const [daysCount, setDaysCount] = useState(30);

  const days = useMemo(() => {
    return scheduleRange(startDate, addDays(startDate, daysCount - 1));
  }, [startDate, daysCount]);

  const handleDownloadCSV = () => {
    const csv = scheduleToCSV(days);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `hulog-schedule-${startDate}-${daysCount}days.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <h2 className="text-xl font-black text-ink">Calendar & Show Dates</h2>
          <p className="text-xs text-ink-muted">
            Pang-araw-araw na rotasyon ng 3 cards sa buong Pilipinas.
          </p>
        </div>

        <button
          onClick={handleDownloadCSV}
          className="btn-ghost text-xs font-bold self-start sm:self-auto flex items-center gap-1.5 border-brand text-brand hover:bg-brand/5"
        >
          <Download className="h-3.5 w-3.5" /> I-export sa CSV (Excel)
        </button>
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
            <option value={14}>14 araw (2 linggo)</option>
            <option value={30}>30 araw (1 buwan)</option>
            <option value={60}>60 araw (2 buwan)</option>
            <option value={90}>90 araw (1 quarter)</option>
          </select>
        </div>
      </div>

      {/* Days Table / Grid */}
      <div className="space-y-3">
        {days.map((day) => {
          const isToday = day.date === today;
          const dow = dayOfWeek(day.date);
          const isSunday = dow === 0;

          return (
            <div
              key={day.date}
              className={`card p-4 border transition ${
                isToday ? 'border-brand ring-2 ring-brand/20 bg-blue-50/20' : isSunday ? 'border-amber-300 bg-amber-50/20' : ''
              }`}
            >
              {/* Day Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                      isToday
                        ? 'bg-brand text-white'
                        : isSunday
                        ? 'bg-amber-400 text-cocoa'
                        : 'bg-stone-200 text-ink-muted'
                    }`}
                  >
                    {DAY_SHORT[dow]}
                  </span>
                  <h3 className="text-xs font-black text-ink">
                    {formatLong(day.date)} {isToday && '(Ngayon)'}
                  </h3>
                  <span className="text-[10px] font-extrabold text-ink-muted">
                    · Hulog #{day.hulogNumber}
                  </span>
                </div>

                {/* Seasonal Tags */}
                {day.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {day.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-amber-100/80 px-2 py-0.5 text-[10px] font-bold text-amber-900 flex items-center gap-1"
                      >
                        <Tag className="h-2.5 w-2.5" /> {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 3 Scheduled Cards for this Day */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {day.cards.map((c, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-stone-200/90 bg-white p-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-black text-brand">
                          Slot {idx + 1}
                        </span>
                        <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[9px] font-bold text-ink-muted uppercase">
                          {c.role}
                        </span>
                      </div>
                      <h4 className="text-xs font-black text-ink">{c.question.format}</h4>
                      <p className="text-[11px] text-ink-muted mt-1 line-clamp-2 leading-tight">
                        {c.question.prompt}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px]">
                      <span className="font-extrabold text-cocoa">{c.question.id}</span>
                      <span className="font-bold text-emerald-700 truncate max-w-[140px]">
                        {c.question.answerLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
