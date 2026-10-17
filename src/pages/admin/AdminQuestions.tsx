import { useState, useMemo } from 'react';
import { ALL_FORMATS, ALL_TIERS } from '../../data/questions';
import { COURSES } from '../../data/courses';
import { TIER_STYLE, FinancialTier, CourseCode, CardKind } from '../../data/types';
import {
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Languages,
  PlusCircle,
  X,
  Trash2,
  CheckCircle,
} from 'lucide-react';
import {
  useAllQuestions,
  addCustomQuestion,
  deleteCustomQuestion,
  getCustomQuestions,
} from '../../lib/customQuestions';
import { getAllAnswerLogs } from '../../lib/users';

export default function AdminQuestions() {
  const allQuestions = useAllQuestions();
  const customQuestions = getCustomQuestions();
  const customIds = new Set(customQuestions.map((q) => q.id));
  const allLogs = getAllAnswerLogs();

  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('ALL');
  const [courseFilter, setCourseFilter] = useState<string>('ALL');
  const [formatFilter, setFormatFilter] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Modal state for adding a new question/game
  const [showAddModal, setShowAddModal] = useState(false);
  const [formatChoice, setFormatChoice] = useState<'Scam o Legit?' | 'Tama o Mali?' | 'choice' | 'Sweldo Sort'>('Scam o Legit?');
  const [courseChoice, setCourseChoice] = useState<CourseCode>(101);
  const [tierChoice, setTierChoice] = useState<FinancialTier>('Cash Management');
  const [promptEn, setPromptEn] = useState('');
  const [promptFil, setPromptFil] = useState('');
  const [binaryAnswer, setBinaryAnswer] = useState<'SCAM' | 'LEGIT' | 'TAMA' | 'MALI'>('SCAM');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctOpt, setCorrectOpt] = useState('A');
  const [sortItem1, setSortItem1] = useState('Electricity Bill');
  const [sortCat1, setSortCat1] = useState('Need');
  const [sortItem2, setSortItem2] = useState('Designer Bag');
  const [sortCat2, setSortCat2] = useState('Want');
  const [sortItem3, setSortItem3] = useState('Debt Amortization');
  const [sortCat3, setSortCat3] = useState('Obligation');
  const [sortItem4, setSortItem4] = useState('Emergency Buffer');
  const [sortCat4, setSortCat4] = useState('Ipon');
  const [whyEn, setWhyEn] = useState('');
  const [whyFil, setWhyFil] = useState('');
  const [hakbangAction, setHakbangAction] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      const matchSearch =
        q.id.toLowerCase().includes(search.toLowerCase()) ||
        q.prompt.toLowerCase().includes(search.toLowerCase()) ||
        q.promptFilipino?.toLowerCase().includes(search.toLowerCase()) ||
        q.answerLabel.toLowerCase().includes(search.toLowerCase()) ||
        q.why.toLowerCase().includes(search.toLowerCase());

      const matchTier = tierFilter === 'ALL' || q.tier === tierFilter;
      const matchCourse = courseFilter === 'ALL' || q.course.toString() === courseFilter;
      const matchFormat = formatFilter === 'ALL' || q.format === formatFilter;

      return matchSearch && matchTier && matchCourse && matchFormat;
    });
  }, [allQuestions, search, tierFilter, courseFilter, formatFilter]);

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    let kind: CardKind = 'binary';
    let answer: string | undefined = binaryAnswer;
    let answerLabel: string = binaryAnswer;
    let options = undefined;
    let items = undefined;
    let categories = undefined;

    if (formatChoice === 'Scam o Legit?') {
      kind = 'binary';
      answer = binaryAnswer === 'LEGIT' ? 'LEGIT' : 'SCAM';
      answerLabel = answer === 'SCAM' ? 'SCAM 🛑' : 'LEGIT ✅';
    } else if (formatChoice === 'Tama o Mali?') {
      kind = 'binary';
      answer = binaryAnswer === 'MALI' ? 'MALI' : 'TAMA';
      answerLabel = answer === 'TAMA' ? 'TRUE (Tama)' : 'FALSE (Mali)';
    } else if (formatChoice === 'choice') {
      kind = 'choice';
      answer = correctOpt;
      options = [
        { key: 'A', text: optA || 'Option A' },
        { key: 'B', text: optB || 'Option B' },
        { key: 'C', text: optC || 'Option C' },
        { key: 'D', text: optD || 'Option D' },
      ];
      const selected = options.find((o) => o.key === correctOpt);
      answerLabel = `Option [${correctOpt}]: ${selected?.text || ''}`;
    } else if (formatChoice === 'Sweldo Sort') {
      kind = 'sort';
      categories = ['Need', 'Want', 'Obligation', 'Ipon'];
      items = [
        { key: 'A', text: sortItem1, answer: sortCat1 },
        { key: 'B', text: sortItem2, answer: sortCat2 },
        { key: 'C', text: sortItem3, answer: sortCat3 },
        { key: 'D', text: sortItem4, answer: sortCat4 },
      ];
      answerLabel = `A=${sortCat1} · B=${sortCat2} · C=${sortCat3} · D=${sortCat4}`;
    }

    addCustomQuestion({
      course: courseChoice,
      tier: tierChoice,
      format: formatChoice === 'choice' ? "Ano'ng Gagawin Mo?" : formatChoice,
      kind,
      prompt: promptEn || 'Sample Question Prompt',
      promptFilipino: promptFil || promptEn || 'Tanong sa Filipino',
      answer,
      answerLabel,
      options,
      categories,
      items,
      why: whyEn || 'Sound financial habit and prudent planning prevents unexpected shocks.',
      whyFilipino: whyFil || 'Ang wastong pagpaplano ay nagbibigay ng kapanatagan sa pamilya.',
      hakbang: hakbangAction || 'Log this transaction in your Hermes budget companion.',
    });

    setSuccessMsg('New question added successfully to the Question Bank!');
    setTimeout(() => setSuccessMsg(''), 4000);
    setShowAddModal(false);

    // Reset inputs
    setPromptEn('');
    setPromptFil('');
    setWhyEn('');
    setWhyFil('');
    setHakbangAction('');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-ink">Curriculum Question Bank</h2>
          <p className="text-xs text-ink-muted">
            All {allQuestions.length} micro-learning cards across FRP 101–108 classified into the 6 Financial Pyramid Tiers.
          </p>
        </div>

        {/* Add Question Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-flame text-xs font-bold flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
        >
          <PlusCircle className="h-4 w-4" /> Add Question / Game
        </button>
      </div>

      {successMsg && (
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-3 text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

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
          <span>Click card to inspect bilingual details & sequence day</span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedId === q.id;
          const style = TIER_STYLE[q.tier] || TIER_STYLE['Cash Management'];
          const isCustom = customIds.has(q.id);

          // Get real registered user answer count for this question
          const qLogs = allLogs.filter((l) => l.questionId === q.id);
          const realAttempts = qLogs.length;
          const realCorrect = qLogs.filter((l) => l.isCorrect).length;
          const realAccuracy = realAttempts > 0 ? Math.round((realCorrect / realAttempts) * 100) : null;

          return (
            <div
              key={q.id}
              className={`card overflow-hidden border transition hover:border-stone-300 ${
                isCustom ? 'border-amber-300 bg-amber-50/20' : ''
              }`}
            >
              {/* Card Header Summary */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="p-4 cursor-pointer flex items-start justify-between gap-4 select-none"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-extrabold text-xs text-brand">{q.id}</span>
                    {isCustom && (
                      <span className="rounded-full bg-amber-400 px-2 py-0.5 text-2xs font-black text-cocoa shadow-2xs">
                        Admin Added
                      </span>
                    )}
                    <span className="rounded bg-stone-100 px-2 py-0.5 text-2xs font-bold text-ink-muted">
                      FRP {q.course}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-2xs font-black border ${style.pill}`}>
                      Tier: {q.tier}
                    </span>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-2xs font-bold text-amber-900">
                      {q.format}
                    </span>
                    {realAccuracy !== null ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-2xs font-bold text-emerald-800 flex items-center gap-1">
                        <BarChart3 className="h-3 w-3" />
                        {realAccuracy}% accuracy ({realAttempts} user answers)
                      </span>
                    ) : (
                      <span className="rounded-full bg-stone-100 px-2 py-0.5 text-2xs font-medium text-stone-500">
                        0 user answers
                      </span>
                    )}
                    {q.sequenceDay && <span className="text-xs text-sky-700"><Calendar className="inline h-3 w-3"/> Day {q.sequenceDay}</span>}
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

                <div className="flex items-center gap-2 shrink-0">
                  {isCustom && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete custom question ${q.id}?`)) {
                          deleteCustomQuestion(q.id);
                        }
                      }}
                      className="p-1 rounded text-rose-500 hover:bg-rose-100 transition"
                      title="Delete question"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                  <button className="text-ink-muted hover:text-ink p-1">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>
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

                  <p>Learning day: {q.sequenceDay ?? 'Calendar override'}. Players reach this card after completing the preceding drops.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add New Question / Game Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border-2 border-brand my-8">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-stone-400 hover:text-stone-700 transition"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-black text-ink flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-brand" /> Add New Question / Game
            </h3>
            <p className="text-xs text-ink-muted mt-0.5 mb-4">
              Add a new card to the question bank. It will instantly be live in the curriculum rotation.
            </p>

            <form onSubmit={handleCreateQuestion} className="space-y-3.5 text-xs">
              {/* Format & Tier */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-ink block mb-1">Game Format</label>
                  <select
                    value={formatChoice}
                    onChange={(e) => setFormatChoice(e.target.value as any)}
                    className="w-full rounded-xl border border-stone-300 p-2 text-xs font-semibold"
                  >
                    <option value="Scam o Legit?">Scam o Legit?</option>
                    <option value="Tama o Mali?">Tama o Mali? (True/False)</option>
                    <option value="choice">Multiple Choice (4 Options)</option>
                    <option value="Sweldo Sort">Sweldo Sort (Categorization)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-ink block mb-1">Financial Tier</label>
                  <select
                    value={tierChoice}
                    onChange={(e) => setTierChoice(e.target.value as any)}
                    className="w-full rounded-xl border border-stone-300 p-2 text-xs font-semibold"
                  >
                    {ALL_TIERS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* FRP Course */}
              <div>
                <label className="font-bold text-ink block mb-1">FRP Course Code</label>
                <select
                  value={courseChoice}
                  onChange={(e) => setCourseChoice(Number(e.target.value) as any)}
                  className="w-full rounded-xl border border-stone-300 p-2 text-xs font-semibold"
                >
                  {COURSES.map((c) => (
                    <option key={c.code} value={c.code}>
                      FRP {c.code}: {c.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* English Prompt */}
              <div>
                <label className="font-bold text-ink block mb-1">Question Prompt (English)</label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. A text claims you won ₱50,000 in a raffle you never entered..."
                  value={promptEn}
                  onChange={(e) => setPromptEn(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-xs font-semibold focus:border-brand focus:outline-none"
                />
              </div>

              {/* Filipino Prompt */}
              <div>
                <label className="font-bold text-ink block mb-1">Salin sa Filipino (Filipino Prompt)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. May nag-text na nanalo ka raw ng ₱50,000 sa raffle na hindi mo sinalihan..."
                  value={promptFil}
                  onChange={(e) => setPromptFil(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-xs font-semibold focus:border-brand focus:outline-none"
                />
              </div>

              {/* Format Specific Answers */}
              {formatChoice === 'Scam o Legit?' && (
                <div className="rounded-xl bg-amber-50 p-3 border border-amber-200">
                  <label className="font-bold text-ink block mb-1">Correct Answer:</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 font-bold cursor-pointer">
                      <input
                        type="radio"
                        name="scamLegit"
                        checked={binaryAnswer === 'SCAM'}
                        onChange={() => setBinaryAnswer('SCAM')}
                      />
                      <span>SCAM 🛑</span>
                    </label>
                    <label className="flex items-center gap-1.5 font-bold cursor-pointer">
                      <input
                        type="radio"
                        name="scamLegit"
                        checked={binaryAnswer === 'LEGIT'}
                        onChange={() => setBinaryAnswer('LEGIT')}
                      />
                      <span>LEGIT ✅</span>
                    </label>
                  </div>
                </div>
              )}

              {formatChoice === 'Tama o Mali?' && (
                <div className="rounded-xl bg-amber-50 p-3 border border-amber-200">
                  <label className="font-bold text-ink block mb-1">Correct Answer:</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 font-bold cursor-pointer">
                      <input
                        type="radio"
                        name="tamaMali"
                        checked={binaryAnswer === 'TAMA'}
                        onChange={() => setBinaryAnswer('TAMA')}
                      />
                      <span>TRUE (Tama)</span>
                    </label>
                    <label className="flex items-center gap-1.5 font-bold cursor-pointer">
                      <input
                        type="radio"
                        name="tamaMali"
                        checked={binaryAnswer === 'MALI'}
                        onChange={() => setBinaryAnswer('MALI')}
                      />
                      <span>FALSE (Mali)</span>
                    </label>
                  </div>
                </div>
              )}

              {formatChoice === 'choice' && (
                <div className="rounded-xl bg-stone-50 p-3 border border-stone-200 space-y-2">
                  <label className="font-bold text-ink block">Multiple Choice Options:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-ink-muted">Option A:</span>
                      <input
                        type="text"
                        placeholder="Option A text"
                        value={optA}
                        onChange={(e) => setOptA(e.target.value)}
                        className="w-full rounded-lg border border-stone-300 p-1.5 text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-ink-muted">Option B:</span>
                      <input
                        type="text"
                        placeholder="Option B text"
                        value={optB}
                        onChange={(e) => setOptB(e.target.value)}
                        className="w-full rounded-lg border border-stone-300 p-1.5 text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-ink-muted">Option C:</span>
                      <input
                        type="text"
                        placeholder="Option C text"
                        value={optC}
                        onChange={(e) => setOptC(e.target.value)}
                        className="w-full rounded-lg border border-stone-300 p-1.5 text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-ink-muted">Option D:</span>
                      <input
                        type="text"
                        placeholder="Option D text"
                        value={optD}
                        onChange={(e) => setOptD(e.target.value)}
                        className="w-full rounded-lg border border-stone-300 p-1.5 text-xs"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="font-bold text-ink block mb-1">Select Correct Choice:</span>
                    <select
                      value={correctOpt}
                      onChange={(e) => setCorrectOpt(e.target.value)}
                      className="rounded-lg border border-stone-300 p-1.5 text-xs font-bold"
                    >
                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                      <option value="C">Option C</option>
                      <option value="D">Option D</option>
                    </select>
                  </div>
                </div>
              )}

              {formatChoice === 'Sweldo Sort' && (
                <div className="rounded-xl bg-stone-50 p-3 border border-stone-200 space-y-2">
                  <label className="font-bold text-ink block">Sort Items & Categories:</label>
                  <div className="space-y-1.5">
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={sortItem1}
                        onChange={(e) => setSortItem1(e.target.value)}
                        className="flex-1 rounded-lg border border-stone-300 p-1.5 text-xs"
                      />
                      <select
                        value={sortCat1}
                        onChange={(e) => setSortCat1(e.target.value)}
                        className="rounded-lg border border-stone-300 p-1.5 text-xs font-bold"
                      >
                        <option value="Need">Need</option>
                        <option value="Want">Want</option>
                        <option value="Obligation">Obligation</option>
                        <option value="Ipon">Ipon</option>
                      </select>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={sortItem2}
                        onChange={(e) => setSortItem2(e.target.value)}
                        className="flex-1 rounded-lg border border-stone-300 p-1.5 text-xs"
                      />
                      <select
                        value={sortCat2}
                        onChange={(e) => setSortCat2(e.target.value)}
                        className="rounded-lg border border-stone-300 p-1.5 text-xs font-bold"
                      >
                        <option value="Need">Need</option>
                        <option value="Want">Want</option>
                        <option value="Obligation">Obligation</option>
                        <option value="Ipon">Ipon</option>
                      </select>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={sortItem3}
                        onChange={(e) => setSortItem3(e.target.value)}
                        className="flex-1 rounded-lg border border-stone-300 p-1.5 text-xs"
                      />
                      <select
                        value={sortCat3}
                        onChange={(e) => setSortCat3(e.target.value)}
                        className="rounded-lg border border-stone-300 p-1.5 text-xs font-bold"
                      >
                        <option value="Need">Need</option>
                        <option value="Want">Want</option>
                        <option value="Obligation">Obligation</option>
                        <option value="Ipon">Ipon</option>
                      </select>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={sortItem4}
                        onChange={(e) => setSortItem4(e.target.value)}
                        className="flex-1 rounded-lg border border-stone-300 p-1.5 text-xs"
                      />
                      <select
                        value={sortCat4}
                        onChange={(e) => setSortCat4(e.target.value)}
                        className="rounded-lg border border-stone-300 p-1.5 text-xs font-bold"
                      >
                        <option value="Need">Need</option>
                        <option value="Want">Want</option>
                        <option value="Obligation">Obligation</option>
                        <option value="Ipon">Ipon</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Explanation Why */}
              <div>
                <label className="font-bold text-ink block mb-1">Explanation / Why (English)</label>
                <input
                  type="text"
                  placeholder="e.g. Legitimate banks will never send urgent links asking for OTPs."
                  value={whyEn}
                  onChange={(e) => setWhyEn(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-ink block mb-1">Paliwanag / Bakit (Filipino)</label>
                <input
                  type="text"
                  placeholder="e.g. Hindi kailanman manghihingi ang tunay na bangko ng OTP sa text."
                  value={whyFil}
                  onChange={(e) => setWhyFil(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 p-2 text-xs"
                />
              </div>

              {/* Isang Hakbang Action */}
              <div>
                <label className="font-bold text-ink block mb-1">Isang Hakbang Action (Real-world step)</label>
                <input
                  type="text"
                  placeholder="e.g. Block the sender number immediately."
                  value={hakbangAction}
                  onChange={(e) => setHakbangAction(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 p-2 text-xs"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-ghost w-1/2 py-2.5 text-xs font-bold border-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-flame w-1/2 py-2.5 text-xs font-bold shadow-sm"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
