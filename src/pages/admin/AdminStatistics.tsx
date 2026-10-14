import { useState, useMemo } from 'react';
import { getAnswerStatistics, UserSummaryRow } from '../../lib/statistics';
import { ALL_TIERS } from '../../data/questions';
import { TIER_STYLE } from '../../data/types';
import { Search, BarChart3, Users, CheckCircle2, TrendingUp, AlertTriangle, Eye, X } from 'lucide-react';
import { useAuth, AnswerLog } from '../../lib/users';

export default function AdminStatistics() {
  const { logs, users } = useAuth();
  const [tierFilter, setTierFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [selectedUserLogs, setSelectedUserLogs] = useState<{ user: UserSummaryRow; logs: AnswerLog[] } | null>(null);

  // Recalculate statistics reactively when logs/users change
  const stats = useMemo(() => getAnswerStatistics(), [logs, users]);

  const filteredRows = useMemo(() => {
    return stats.rows.filter((r) => {
      const matchTier = tierFilter === 'ALL' || r.tier === tierFilter;
      const matchSearch =
        r.question.id.toLowerCase().includes(search.toLowerCase()) ||
        r.question.prompt.toLowerCase().includes(search.toLowerCase()) ||
        r.question.promptFilipino?.toLowerCase().includes(search.toLowerCase()) ||
        r.topMisconception.toLowerCase().includes(search.toLowerCase());

      return matchTier && matchSearch;
    });
  }, [stats.rows, tierFilter, search]);

  const handleInspectUser = (row: UserSummaryRow) => {
    const userLogs = logs.filter((l) => l.username.toLowerCase() === row.user.username.toLowerCase());
    setSelectedUserLogs({ user: row, logs: userLogs });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-2xs font-extrabold uppercase tracking-wider text-emerald-800">
            Registered User Analytics & Response Data
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-ink mt-1">
            Registered Users & Learning Statistics
          </h2>
          <p className="text-xs text-ink-muted">
            Live answer metrics gathered directly from registered users across all 6 Financial Pyramid Tiers.
          </p>
        </div>
      </div>

      {/* Top Level Real-Time KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase text-ink-muted flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-brand" /> Registered Users
          </span>
          <p className="text-2xl font-black text-brand mt-1">{stats.totalRegisteredUsers}</p>
          <span className="text-[11px] text-ink-muted font-medium">Sample player accounts</span>
        </div>

        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase text-ink-muted flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-600" /> Answer Submissions
          </span>
          <p className="text-2xl font-black text-emerald-700 mt-1">{stats.totalAttempts}</p>
          <span className="text-[11px] text-ink-muted font-medium">Recorded user responses</span>
        </div>

        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase text-ink-muted flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" /> Overall Accuracy
          </span>
          <p className="text-2xl font-black text-purple-700 mt-1">{stats.overallAccuracy}%</p>
          <span className="text-[11px] text-ink-muted font-medium">Across all registered users</span>
        </div>

        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase text-ink-muted flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5 text-rose-500" /> Active Questions
          </span>
          <p className="text-2xl font-black text-rose-600 mt-1">{stats.rows.length}</p>
          <span className="text-[11px] text-ink-muted font-medium">In curriculum bank</span>
        </div>
      </div>

      {/* 1. REGISTERED USERS ACTIVITY TABLE */}
      <div className="card p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
          <div>
            <h3 className="text-sm font-black text-ink flex items-center gap-1.5">
              <Users className="h-4 w-4 text-brand" /> Registered Users Summary
            </h3>
            <p className="text-[11px] text-ink-muted">
              Users registered on this sample app (Username & Password) and their question performance.
            </p>
          </div>
          <span className="rounded-full bg-brand/10 text-brand px-2 py-0.5 text-xs font-black">
            {stats.userSummaries.length} Users
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-ink-muted uppercase font-bold text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Username</th>
                <th className="py-2.5 px-3">Joined Date</th>
                <th className="py-2.5 px-3 text-center">Questions Answered</th>
                <th className="py-2.5 px-3 text-center">Correct Answers</th>
                <th className="py-2.5 px-3 text-center">Accuracy</th>
                <th className="py-2.5 px-3">Last Active</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {stats.userSummaries.map((uRow) => (
                <tr key={uRow.user.username} className="hover:bg-amber-50/30 transition">
                  <td className="py-2.5 px-3 font-extrabold text-ink flex items-center gap-1.5">
                    <span className="h-6 w-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black">
                      {uRow.user.username.charAt(0).toUpperCase()}
                    </span>
                    <span>{uRow.user.username}</span>
                  </td>
                  <td className="py-2.5 px-3 text-ink-muted font-medium">
                    {uRow.user.registeredAt.slice(0, 10)}
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-ink">
                    {uRow.totalAttempts}
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-emerald-700">
                    {uRow.correctAnswers}
                  </td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span className="font-black text-ink">{uRow.accuracyRate}%</span>
                    <div className="h-1 w-12 bg-stone-200 rounded-full mx-auto mt-1 overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${uRow.accuracyRate}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-ink-muted text-2xs font-semibold">
                    {uRow.lastActive}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => handleInspectUser(uRow)}
                      className="rounded-lg bg-stone-100 hover:bg-stone-200 px-2.5 py-1 text-2xs font-bold text-ink flex items-center gap-1 ml-auto transition"
                    >
                      <Eye className="h-3 w-3" /> View Answers
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. PERFORMANCE BY FINANCIAL TIER */}
      <div className="card p-5">
        <h3 className="text-sm font-black text-ink mb-3 flex items-center gap-1.5">
          <BarChart3 className="h-4 w-4 text-brand" /> Accuracy by Financial Pyramid Tier (User Data)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ALL_TIERS.map((t) => {
            const summary = stats.tierSummaries[t];
            const style = TIER_STYLE[t];
            return (
              <div
                key={t}
                className={`rounded-2xl border p-3.5 flex flex-col justify-between ${style.bg} ${style.border}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`rounded-full px-2 py-0.5 text-2xs font-black ${style.pill}`}>
                      {t}
                    </span>
                    <span className="text-xs font-black text-ink">{summary.accuracyRate}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden my-1.5">
                    <div
                      className="h-full bg-brand transition-all duration-500 rounded-full"
                      style={{ width: `${summary.accuracyRate}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-2xs text-ink-muted pt-2 border-t border-black/5 mt-1">
                  <span>{summary.questionCount} Questions</span>
                  <span>{summary.totalAttempts} Recorded Attempts</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. QUESTION RESPONSES ANALYTICS TABLE */}
      <div className="card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-ink">Question Responses Data Table</h3>
            <p className="text-[11px] text-ink-muted">
              Live statistics based on actual registered user answers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-60">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-ink-muted" />
              <input
                type="text"
                placeholder="Search prompt, ID, or trap..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-stone-200 pl-8 pr-3 py-1.5 text-xs font-semibold focus:border-brand focus:outline-none"
              />
            </div>

            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="rounded-xl border border-stone-200 px-2.5 py-1.5 text-xs font-semibold bg-white text-ink focus:border-brand focus:outline-none"
            >
              <option value="ALL">All Tiers</option>
              {ALL_TIERS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-ink-muted uppercase font-bold text-[10px]">
              <tr>
                <th className="py-2.5 px-3">ID & Tier</th>
                <th className="py-2.5 px-3">Question Prompt (EN & FIL)</th>
                <th className="py-2.5 px-3">Format</th>
                <th className="py-2.5 px-3 text-center">User Attempts</th>
                <th className="py-2.5 px-3 text-center">Accuracy</th>
                <th className="py-2.5 px-3">Common Trap / Recorded Errors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredRows.map((r) => {
                const style = TIER_STYLE[r.tier];
                return (
                  <tr key={r.question.id} className="hover:bg-amber-50/30 transition">
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="font-extrabold text-ink block">{r.question.id}</span>
                      <span className={`inline-block rounded-full px-1.5 py-0.2 text-[9px] font-bold ${style.pill} mt-0.5`}>
                        {r.tier}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 max-w-md">
                      <p className="font-bold text-ink line-clamp-1">{r.question.prompt}</p>
                      {r.question.promptFilipino && (
                        <p className="text-[11px] text-ink-muted italic line-clamp-1 mt-0.5">
                          🇵🇭 {r.question.promptFilipino}
                        </p>
                      )}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap text-ink-muted font-medium">
                      {r.question.format}
                    </td>
                    <td className="py-2.5 px-3 text-center whitespace-nowrap font-bold text-ink">
                      {r.totalAttempts}
                    </td>
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      {r.totalAttempts > 0 ? (
                        <>
                          <span className="font-black text-ink">{r.accuracyRate}%</span>
                          <div className="h-1 w-12 bg-stone-200 rounded-full mx-auto mt-1 overflow-hidden">
                            <div
                              className="h-full bg-emerald-600 rounded-full"
                              style={{ width: `${r.accuracyRate}%` }}
                            />
                          </div>
                        </>
                      ) : (
                        <span className="text-stone-400 font-medium">No logs</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-ink-muted leading-tight">
                      <span className="text-[11px] text-cocoa font-semibold block">
                        {r.topMisconception}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Answer Inspection Modal */}
      {selectedUserLogs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border-2 border-stone-200 max-h-[85vh] flex flex-col">
            <button
              onClick={() => setSelectedUserLogs(null)}
              className="absolute right-4 top-4 rounded-full p-1 text-stone-400 hover:text-stone-700 transition"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-3">
              <span className="text-[10px] font-black uppercase text-brand tracking-wider">
                User Answer Log Inspection
              </span>
              <h3 className="text-lg font-black text-ink">
                Player: {selectedUserLogs.user.user.username}
              </h3>
              <p className="text-xs text-ink-muted">
                {selectedUserLogs.logs.length} answers submitted across sessions.
              </p>
            </div>

            <div className="overflow-y-auto space-y-2 pr-1 flex-1">
              {selectedUserLogs.logs.length === 0 ? (
                <p className="text-xs text-ink-muted italic py-6 text-center">
                  This user has not answered any questions yet.
                </p>
              ) : (
                selectedUserLogs.logs.map((log) => {
                  const q = stats.rows.find((r) => r.question.id === log.questionId)?.question;
                  return (
                    <div
                      key={log.id}
                      className={`rounded-xl p-3 border text-xs flex items-start justify-between gap-3 ${
                        log.isCorrect ? 'bg-emerald-50/70 border-emerald-200' : 'bg-rose-50/70 border-rose-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-ink">{log.questionId}</span>
                          <span className="text-[10px] text-ink-muted">· {log.date}</span>
                        </div>
                        {q && <p className="font-semibold text-ink line-clamp-2">{q.prompt}</p>}
                        <p className="text-[11px] text-ink-muted">
                          Player answered: <span className="font-bold text-ink">{log.userChoice}</span>
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-2 py-0.5 text-2xs font-black shrink-0 ${
                          log.isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                        }`}
                      >
                        {log.isCorrect ? 'Correct ✓' : 'Incorrect ✕'}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            <button
              onClick={() => setSelectedUserLogs(null)}
              className="btn-ghost w-full py-2 text-xs font-bold mt-3 border-stone-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
