import { useState, useMemo } from 'react';
import { QUESTIONS, ALL_FORMATS, ALL_TIERS } from '../../data/questions';
import { COURSES } from '../../data/courses';
import { buildAppearanceIndex, SCHEDULE_START } from '../../lib/schedule';
import { todayPH, addDays, formatShort } from '../../lib/date';
import { TIER_STYLE } from '../../data/types';
import { Search, Calendar, ChevronDown, ChevronUp, BarChart3, Languages } from 'lucide-react';

export default function AdminQuestions() {
  const today = todayPH();
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('ALL');
  const [courseFilter, setCourseFilter] = useState<string>('ALL');
  const [formatFilter, setFormatFilter] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Compute 90 days of appearances from today so the admin can see upcoming show dates
  const appearances = useMemo(() => {
    return buildAppearanceIndex(SCHEDULE_START, addDays(today, 90));
  }, [today]);

  const filteredQuestions = useMemo(() => {
    return QUESTIONS.filter((q) => {
      const matchSearch =
        q.id.toLowerCase().includes(search.toLowerCase()) ||
        q.prompt.toLowerCase().includes(search.toLowerCase()) ||
        q.promptFilipino.toLowerCase().includes(search.toLowerCase()) ||
        q.answerLabel.toLowerCase().includes(search.toLowerCase()) ||
        q.why.toLowerCase().includes(search.toLowerCase());

      const matchTier = tierFilter === 'ALL' || q.tier === tierFilter;
      const matchCourse = courseFilter === 'ALL' || q.course.toString() === courseFilter;
      const matchFormat = formatFilter === 'ALL' || q.format === formatFilter;

      return matchSearch && matchTier && matchCourse && matchFormat;
    });
  }, [search, tierFilter, courseFilter, formatFilter]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-black text-ink">Curriculum Question Bank</h2>
        <p className="text-xs text-ink-muted">
          All {QUESTIONS.length} micro-learning cards across FRP 101–108 classified into the 6 Financial Pyramid Tiers.
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="card p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative sm:col-span-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-muted" />
            <input
              type="text"
              placeholder="Search prompt, ID, keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-stone-200 pl-9 pr-3 py-2 text-xs font-semibold focus:border-brand focus:outline-none"
            />
          </div>

          {/* Tier Filter */}
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="rounded-xl border border-stone-200 px-3 py-2 text-xs font-semibold bg-white text-ink focus:border-brand focus:outline-none"
          >
            <option value="ALL">All Financial Tiers</option>
            {ALL_TIERS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* FRP Filter */}
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="rounded-xl border border-stone-200 px-3 py-2 text-xs font-semibold bg-white text-ink focus:border-brand focus:outline-none"
          >
            <option value="ALL">All FRP Courses</option>
            {COURSES.map((c) => (
              <option key={c.code} value={c.code.toString()}>
                FRP {c.code} · {c.title.slice(0, 24)}...
              </option>
            ))}
          </select>

          {/* Format Filter */}
          <select
            value={formatFilter}
            onChange={(e) => setFormatFilter(e.target.value)}
            className="rounded-xl border border-stone-200 px-3 py-2 text-xs font-semibold bg-white text-ink focus:border-brand focus:outline-none"
          >
            <option value="ALL">All Formats</option>
            {ALL_FORMATS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between text-2xs text-ink-muted font-bold pt-1">
          <span>{filteredQuestions.length} cards matching criteria</span>
          <span>Click card to inspect bilingual details & schedule dates</span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedId === q.id;
          const apps = appearances.get(q.id) || [];
          const nextShow = apps.find((a) => a.date >= today);
          const style = TIER_STYLE[q.tier] || TIER_STYLE['Cash Management'];

          return (
            <div
              key={q.id}
              className="card overflow-hidden border transition hover:border-stone-300"
            >
              {/* Card Header Summary */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="p-4 cursor-pointer flex items-start justify-between gap-4 select-none"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-extrabold text-xs text-brand">{q.id}</span>
                    <span className="rounded bg-stone-100 px-2 py-0.5 text-2xs font-bold text-ink-muted">
                      FRP {q.course}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-2xs font-black border ${style.pill}`}>
                      Tier: {q.tier}
                    </span>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-2xs font-bold text-amber-900">
                      {q.format}
                    </span>
                    {q.communityStats && (
                      <span className="rounded-full bg-sky-50 px-2 py-0.5 text-2xs font-bold text-sky-800 flex items-center gap-1">
                        <BarChart3 className="h-3 w-3" />
                        {q.communityStats.correctPct}% accuracy
                      </span>
                    )}
                    {nextShow && (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-2xs font-bold text-emerald-700 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Next show: {nextShow.date} ({nextShow.date === today ? 'Today!' : formatShort(nextShow.date)})
                      </span>
                    )}
                  </div>
                  
                  {/* English Prompt */}
                  <p className="text-xs font-bold text-ink leading-snug">
                    {q.prompt}
                  </p>
                  
                  {/* Filipino Translation Preview */}
                  {q.promptFilipino && (
                    <p className="text-[11px] text-ink-muted italic line-clamp-1">
                      🇵🇭 {q.promptFilipino}
                    </p>
                  )}
                </div>

                <button className="text-ink-muted hover:text-ink p-1">
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

              {/* Expanded Card Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-stone-100 bg-stone-50/50 space-y-3 text-xs">
                  {/* Dual Language Box */}
                  <div className="rounded-xl bg-amber-50/70 p-3 border border-amber-200">
                    <span className="text-[10px] font-extrabold text-amber-900 uppercase tracking-wide flex items-center gap-1 mb-1">
                      <Languages className="h-3 w-3" /> Bilingual Translations:
                    </span>
                    <p className="text-xs font-bold text-ink">
                      <strong>EN:</strong> {q.prompt}
                    </p>
                    <p className="text-xs font-medium text-cocoa italic mt-1">
                      <strong>FIL:</strong> {q.promptFilipino}
                    </p>
                  </div>

                  {/* Options (if choices) */}
                  {q.options && (
                    <div>
                      <span className="font-bold text-ink-muted text-[10px] uppercase">
                        Options & Choices:
                      </span>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-ink-muted font-medium">
                        {q.options.map((opt) => (
                          <li key={opt.key} className={opt.key === q.answer ? 'font-bold text-ink' : ''}>
                            <span className="text-brand font-bold">[{opt.key}]</span> {opt.text}
                            {opt.textFilipino && opt.textFilipino !== opt.text && (
                              <span className="text-[11px] text-ink-muted italic ml-1">
                                ({opt.textFilipino})
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Items (if sort) */}
                  {q.items && (
                    <div>
                      <span className="font-bold text-ink-muted text-[10px] uppercase">
                        Sort Items:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 mt-1">
                        {q.items.map((it) => (
                          <div key={it.key} className="rounded-lg bg-white p-2 border border-stone-200">
                            <span className="font-bold text-ink">{it.text}:</span>{' '}
                            <span className="text-brand font-bold">{it.answer}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Answer & Explanation */}
                  <div className="rounded-xl bg-white p-3 border border-amber-200">
                    <p className="font-extrabold text-cocoa">
                      Correct Answer: {q.answerLabel}
                    </p>
                    <p className="text-ink-muted mt-1 leading-relaxed">
                      <strong>Hestia's Why:</strong> {q.why}
                    </p>
                    {q.whyFilipino && (
                      <p className="text-[11px] text-ink-muted italic mt-1 leading-relaxed">
                        🇵🇭 {q.whyFilipino}
                      </p>
                    )}
                  </div>

                  {/* Isang Hakbang Action */}
                  <div className="rounded-xl bg-emerald-50 p-2.5 border border-emerald-200">
                    <p className="text-emerald-900 font-bold text-xs">
                      <strong>Real-World Action (Isang Hakbang):</strong> {q.hakbang}
                    </p>
                  </div>

                  {/* Community Learning Data */}
                  {q.communityStats && (
                    <div className="rounded-xl bg-sky-50 p-2.5 border border-sky-200 flex items-center justify-between text-2xs text-sky-900">
                      <span><strong>Community Benchmark:</strong> {q.communityStats.correctPct}% correct ({q.communityStats.sampleSize} attempts)</span>
                      {q.communityStats.topMisconception && (
                        <span><strong>Trap:</strong> {q.communityStats.topMisconception}</span>
                      )}
                    </div>
                  )}

                  {/* Appearance dates */}
                  <div>
                    <span className="font-bold text-ink-muted text-[10px] uppercase">
                      Scheduled Show Dates (Next 90 Days):
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {apps.length === 0 ? (
                        <span className="text-ink-muted italic text-[11px]">No shows in next 90 days</span>
                      ) : (
                        apps.map((a, i) => (
                          <span
                            key={i}
                            className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                              a.date === today
                                ? 'bg-amber-400 text-cocoa'
                                : a.date > today
                                ? 'bg-stone-200 text-ink'
                                : 'bg-stone-100 text-stone-400'
                            }`}
                          >
                            {a.date} ({a.role})
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
