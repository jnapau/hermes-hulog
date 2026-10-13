import { useState, useMemo } from 'react';
import { QUESTIONS, ALL_FORMATS } from '../../data/questions';
import { COURSES } from '../../data/courses';
import { buildAppearanceIndex, SCHEDULE_START } from '../../lib/schedule';
import { todayPH, addDays, formatShort } from '../../lib/date';
import { Search, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

export default function AdminQuestions() {
  const today = todayPH();
  const [search, setSearch] = useState('');
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
        q.answerLabel.toLowerCase().includes(search.toLowerCase()) ||
        q.why.toLowerCase().includes(search.toLowerCase());

      const matchCourse = courseFilter === 'ALL' || q.course.toString() === courseFilter;
      const matchFormat = formatFilter === 'ALL' || q.format === formatFilter;

      return matchSearch && matchCourse && matchFormat;
    });
  }, [search, courseFilter, formatFilter]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-black text-ink">Curriculum Question Bank</h2>
        <p className="text-xs text-ink-muted">
          Lahat ng 62 daily micro-learning cards mula sa Financial Resilience Program (FRP 101–108).
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="card p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-muted" />
            <input
              type="text"
              placeholder="Mag-search ng tanong, ID, o keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-stone-200 pl-9 pr-3 py-2 text-xs font-semibold focus:border-brand focus:outline-none"
            />
          </div>

          {/* FRP Filter */}
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="rounded-xl border border-stone-200 px-3 py-2 text-xs font-semibold bg-white text-ink focus:border-brand focus:outline-none"
          >
            <option value="ALL">Lahat ng FRP Courses</option>
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
            <option value="ALL">Lahat ng Formats</option>
            {ALL_FORMATS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between text-2xs text-ink-muted font-bold pt-1">
          <span>{filteredQuestions.length} cards nahanap</span>
          <span>Click to view show dates & details</span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedId === q.id;
          const apps = appearances.get(q.id) || [];
          const nextShow = apps.find((a) => a.date >= today);

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
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-xs text-brand">{q.id}</span>
                    <span className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-ink-muted">
                      FRP {q.course}
                    </span>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                      {q.format}
                    </span>
                    {nextShow && (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Next show: {nextShow.date} ({nextShow.date === today ? 'Ngayon!' : formatShort(nextShow.date)})
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-ink leading-snug line-clamp-2">
                    {q.prompt}
                  </p>
                </div>

                <button className="text-ink-muted hover:text-ink p-1">
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

              {/* Expanded Card Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-stone-100 bg-stone-50/50 space-y-3 text-xs">
                  {/* Options (if choices) */}
                  {q.options && (
                    <div>
                      <span className="font-bold text-ink-muted text-[10px] uppercase">
                        Mga Pagpipilian:
                      </span>
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-ink-muted font-medium">
                        {q.options.map((opt) => (
                          <li key={opt.key} className={opt.key === q.answer ? 'font-bold text-ink' : ''}>
                            <span className="text-ink font-bold">[{opt.key}]</span> {opt.text}
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
                          <div key={it.key} className="rounded bg-white p-1.5 border border-stone-200">
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
                      Tamang Sagot: {q.answerLabel}
                    </p>
                    <p className="text-ink-muted mt-1 leading-relaxed">
                      <strong>Bakit:</strong> {q.why}
                    </p>
                  </div>

                  {/* Isang Hakbang */}
                  <div className="rounded-xl bg-amber-50 p-3 border border-amber-200">
                    <p className="font-bold text-flame-deep text-[11px]">
                      Isang Hakbang (Real-world action):
                    </p>
                    <p className="text-ink text-xs mt-0.5">{q.hakbang}</p>
                  </div>

                  {/* Exact Dates Shown */}
                  <div>
                    <span className="font-bold text-ink-muted text-[10px] uppercase flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Eksaktong Show Dates sa Schedule:
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {apps.length > 0 ? (
                        apps.map((a, i) => (
                          <span
                            key={i}
                            className={`rounded-md px-2 py-0.5 text-[10px] font-bold border ${
                              a.date === today
                                ? 'bg-flame text-cocoa border-amber-500'
                                : a.date < today
                                ? 'bg-stone-200 text-stone-600 border-stone-300'
                                : 'bg-white text-brand border-stone-200'
                            }`}
                          >
                            {a.date} (Slot {a.slot} · {a.role})
                          </span>
                        ))
                      ) : (
                        <span className="text-stone-400 text-xs">Wala pang show dates sa window</span>
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
