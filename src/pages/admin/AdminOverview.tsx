import { Link } from 'react-router-dom';
import { ALL_FORMATS, ALL_TIERS } from '../../data/questions';
import { COURSES } from '../../data/courses';
import { getDaySchedule, ROLE_LABEL, ROLE_STYLE } from '../../lib/schedule';
import { todayPH } from '../../lib/date';
import { TIER_STYLE } from '../../data/types';
import { HestiaMascot } from '../../components/HestiaMascot';
import { Clock, ArrowRight, BarChart3, Layers, Users, TrendingUp } from 'lucide-react';
import { useAllQuestions } from '../../lib/customQuestions';
import { getAnswerStatistics } from '../../lib/statistics';
import { useAuth } from '../../lib/users';

export default function AdminOverview() {
  const today = todayPH();
  const scheduleToday = getDaySchedule(today);
  const allQuestions = useAllQuestions();
  const { logs, users } = useAuth();
  const stats = getAnswerStatistics();
  const totalCards = allQuestions.length;
  const totalCourses = COURSES.length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl border border-hairline bg-white p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="rounded-full bg-brand/10 px-2.5 py-1 text-2xs font-extrabold uppercase tracking-wider text-brand">
            Curriculum Administration & User Analytics
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-ink mt-2">
            Hulog Question Bank & Learning Monitor
          </h2>
          <p className="text-xs text-ink-muted mt-1 max-w-xl">
            Track all {totalCards} daily micro-learning cards mapped to the 6 Financial Pyramid Tiers and FRP 101–108. Add custom questions, view live answer statistics from registered users, and inspect national schedules.
          </p>

          <div className="flex items-center gap-3 mt-4">
            <Link
              to="/admin/questions"
              className="btn-flame text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              Manage Questions & Add Game
            </Link>
            <Link
              to="/admin/statistics"
              className="btn-ghost text-xs font-bold border-stone-300 text-ink hover:bg-stone-50 flex items-center gap-1.5"
            >
              <BarChart3 className="h-4 w-4 text-brand" /> Registered User Analytics
            </Link>
          </div>
        </div>
        <HestiaMascot pose="ok" height={110} className="shrink-0 drop-shadow-md" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase text-ink-muted flex items-center gap-1">
            <Users className="h-3 w-3 text-brand" /> Registered Users
          </span>
          <p className="text-2xl font-black text-brand mt-1">{stats.totalRegisteredUsers}</p>
          <span className="text-[11px] text-ink-muted font-medium">Sample accounts</span>
        </div>

        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase text-ink-muted flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-emerald-700" /> Answer Submissions
          </span>
          <p className="text-2xl font-black text-emerald-700 mt-1">{stats.totalAttempts}</p>
          <span className="text-[11px] text-ink-muted font-medium">{stats.overallAccuracy}% overall accuracy</span>
        </div>

        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase text-ink-muted">Total Questions</span>
          <p className="text-2xl font-black text-cocoa mt-1">{totalCards}</p>
          <span className="text-[11px] text-ink-muted font-medium">Curriculum + custom</span>
        </div>

        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase text-ink-muted">Financial Tiers</span>
          <p className="text-2xl font-black text-flame-deep mt-1">{ALL_TIERS.length}</p>
          <span className="text-[11px] text-ink-muted font-medium">6 Pyramid tiers</span>
        </div>
      </div>

      {/* Today's Live Schedule Card */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-black text-ink flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand" />
              Scheduled for Today ({today})
            </h3>
            <p className="text-xs text-ink-muted">
              The exact 3 cards served to all active players today:
            </p>
          </div>
          <Link
            to="/admin/calendar"
            className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
          >
            Full Year Calendar <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {scheduleToday ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {scheduleToday.cards.map((c, idx) => {
              const style = TIER_STYLE[c.question.tier] || TIER_STYLE['Cash Management'];
              return (
                <div
                  key={c.question.id}
                  className="rounded-2xl border border-stone-200 bg-stone-50/60 p-3.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                      <span
                        className={`rounded-full border px-2 py-0.5 text-2xs font-extrabold ${
                          ROLE_STYLE[c.role]
                        }`}
                      >
                        Slot {idx + 1} · {ROLE_LABEL[c.role]}
                      </span>
                      <span className={`rounded-full px-1.5 py-0.2 text-[9px] font-black ${style.pill}`}>
                        {c.question.tier}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-2xs font-bold text-ink-muted mb-1">
                      <span>{c.question.id}</span>
                      <span>{c.question.format}</span>
                    </div>

                    <h4 className="text-xs font-black text-ink">{c.question.prompt}</h4>
                    <p className="text-[11px] text-ink-muted italic line-clamp-2 mt-1">
                      🇵🇭 {c.question.promptFilipino}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-200/80 flex items-center justify-between text-2xs">
                    <span className="font-extrabold text-cocoa">
                      Ans: {c.question.answerLabel}
                    </span>
                    <span className="text-sky-700 font-bold">
                      {c.question.communityStats.correctPct}% accuracy
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-ink-muted">No schedule found for today.</p>
        )}
      </div>

      {/* 6 Financial Pyramid Tiers Overview */}
      <div className="card p-6">
        <h3 className="text-base font-black text-ink mb-1 flex items-center gap-2">
          <Layers className="h-4 w-4 text-emerald-600" />
          The 6 Financial Pyramid Tiers
        </h3>
        <p className="text-xs text-ink-muted mb-4">
          Hermes Academy curriculum maps all micro-cards systematically through these tiers:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ALL_TIERS.map((tier) => {
            const count = QUESTIONS.filter((q) => q.tier === tier).length;
            const style = TIER_STYLE[tier];
            return (
              <div
                key={tier}
                className={`rounded-2xl border p-4 ${style.bg} ${style.border}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-2.5 py-0.5 text-2xs font-black ${style.pill}`}>
                    {tier}
                  </span>
                  <span className="text-xs font-black text-ink">{count} cards</span>
                </div>
                <p className="text-xs text-ink font-semibold mt-2">
                  {tier === 'Cash Management' && 'Household foundations, budgeting, needs vs wants, and behavioral psychology (FRP 101–103).'}
                  {tier === 'Debt Management' && '5-6 escapes, credit card finance charges, and borrower consumer protections (FRP 105).'}
                  {tier === 'Emergency & Savings' && 'Liquid buffers, sinking funds, PDIC safety, and Pag-IBIG MP2 compounding (FRP 104).'}
                  {tier === 'Accumulation & Net Worth' && 'Assets vs liabilities, solvency ratios, and shame-free net worth tracking (FRP 106).'}
                  {tier === 'Protection & Insurance' && 'Anti-fraud scam recognition, PhilHealth case rates, and SSS protections (FRP 107).'}
                  {tier === 'Crisis Resilience' && 'Comprehensive 52-week Sunday Boss shock scenarios and crisis budget execution (FRP 108).'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
