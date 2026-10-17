import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAllQuestions } from '../../lib/customQuestions';
import { CURRICULUM_DAYS, selectSequenceQuestions } from '../../lib/dailyQuestions';
import { TIER_STYLE } from '../../data/types';

export default function AdminCalendar() {
  const questions = useAllQuestions();
  const [startDay, setStartDay] = useState(1);
  const [daysCount, setDaysCount] = useState(15);
  const days = useMemo(() => Array.from(
    { length: Math.min(daysCount, CURRICULUM_DAYS - startDay + 1) },
    (_, offset) => ({ day: startDay + offset, cards: selectSequenceQuestions(questions, startDay + offset) }),
  ), [questions, startDay, daysCount]);
  const shift = (amount: number) => setStartDay(day => Math.max(1, Math.min(CURRICULUM_DAYS, day + amount)));

  return <section className="space-y-4 mt-8" aria-labelledby="curriculum-heading">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 id="curriculum-heading" className="text-xl font-bold text-ink">365-day learning curriculum</h2>
        <p className="text-sm text-ink-muted mt-1 max-w-2xl">From foundational money habits to advanced crisis resilience. Players advance one day per completed drop; missed calendar days never skip a lesson.</p>
      </div>
      <Link to="/admin" className="btn-ghost text-sm">View answer analytics</Link>
    </div>
    <div className="flex flex-wrap items-end justify-between gap-4 rounded-xl border border-stone-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <button type="button" aria-label="Previous sequence days" disabled={startDay === 1} onClick={() => shift(-daysCount)} className="btn-ghost p-2 disabled:opacity-40"><ChevronLeft size={18}/></button>
        <button type="button" onClick={() => setStartDay(1)} className="btn-ghost text-sm">Day 1</button>
        <button type="button" onClick={() => setStartDay(365)} className="btn-ghost text-sm">Day 365</button>
        <button type="button" aria-label="Next sequence days" disabled={startDay + daysCount > 365} onClick={() => shift(daysCount)} className="btn-ghost p-2 disabled:opacity-40"><ChevronRight size={18}/></button>
      </div>
      <div className="flex flex-wrap gap-3">
        <label className="text-sm font-semibold">Starting day
          <input className="field mt-1 w-24" type="number" min={1} max={365} value={startDay} onChange={event => { const value = event.currentTarget.valueAsNumber; if (Number.isFinite(value)) setStartDay(Math.max(1, Math.min(365, value))); }}/>
        </label>
        <label className="text-sm font-semibold">Show
          <select className="field mt-1" value={daysCount} onChange={event => setDaysCount(Number(event.target.value))}>
            {[15,30,90,365].map(count => <option key={count} value={count}>{count === 365 ? 'All 365 days' : `${count} days`}</option>)}
          </select>
        </label>
      </div>
    </div>
    <p role="status" className="text-sm text-ink-muted">Showing Day {startDay}–{Math.min(365, startDay + daysCount - 1)} of 365. Sweldo Hulog Special every 15th learning day.</p>
    {questions.length === 0 ? <p role="status">Loading curriculum…</p> : days.map(({day,cards}) => <article key={day} className="rounded-xl border border-stone-200 bg-white p-4">
      <header className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h3 className="font-bold text-ink">Day #{day} <span className="font-normal text-ink-muted">· FRP {cards[0]?.course ?? '—'} · {cards[0]?.progression ?? 'Unassigned'}</span></h3>
        {day % 15 === 0 && <span className="text-xs font-semibold text-amber-900">Sweldo Hulog Special</span>}
      </header>
      {cards.length !== 3 && <p role="alert" className="text-sm text-red-800 mb-3">This day needs exactly three cards. Check its sequence and slot assignments below.</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map(question => <div key={question.id} className="space-y-2 min-w-0">
          <p className="text-xs font-semibold text-ink-muted">Slot {question.slot} · {question.difficulty} · {question.id}</p>
          <span className={`inline-block rounded-md px-2 py-1 text-xs ${TIER_STYLE[question.tier].pill}`}>{question.tier}</span>
          <p className="text-sm font-semibold leading-relaxed">{question.prompt}</p>
          <p lang="fil" className="text-sm text-ink-muted leading-relaxed">{question.promptFilipino}</p>
          <p className="text-xs text-ink-muted">Answer: {question.answerLabel}</p>
        </div>)}
      </div>
    </article>)}
  </section>;
}
