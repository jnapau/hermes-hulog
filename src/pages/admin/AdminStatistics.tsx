import { useState, useMemo } from 'react';
import { getAnswerStatistics, exportAnswerStatsToCSV } from '../../lib/statistics';
import { ALL_TIERS } from '../../data/questions';
import { TIER_STYLE } from '../../data/types';
import { Download, Search, BarChart3, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function AdminStatistics() {
  const [tierFilter, setTierFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  const stats = useMemo(() => getAnswerStatistics(), []);

  const handleDownloadCSV = () => {
    const csv = exportAnswerStatsToCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `hulog-user-answer-statistics-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRows = useMemo(() => {
    return stats.rows.filter((r) => {
      const matchTier = tierFilter === 'ALL' || r.tier === tierFilter;
      const matchSearch =
        r.question.id.toLowerCase().includes(search.toLowerCase()) ||
        r.question.prompt.toLowerCase().includes(search.toLowerCase()) ||
        r.question.promptFilipino.toLowerCase().includes(search.toLowerCase()) ||
        r.topMisconception.toLowerCase().includes(search.toLowerCase());

      return matchTier && matchSearch;
    });
  }, [stats.rows, tierFilter, search]);

  return (
    <div className="space-y-6">
      {/* Header and Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-2xs font-extrabold uppercase tracking-wider text-emerald-800">
            Behavioral Learning Analytics
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-ink mt-1">
            User Answer Data & Statistics
          </h2>
          <p className="text-xs text-ink-muted">
            Aggregated answer distributions, accuracy rates, and common misconception traps across all 6 Financial Tiers.
          </p>
        </div>

        <button
          onClick={handleDownloadCSV}
          className="btn-flame text-xs font-bold flex items-center justify-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Download className="h-4 w-4" /> Export Answer Stats (CSV / Excel)
        </button>
      </div>

      {/* Top Level KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase text-ink-muted flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Overall Accuracy
          </span>
          <p className="text-2xl font-black text-emerald-700 mt-1">{stats.overallAccuracy}%</p>
          <span className="text-[11px] text-ink-muted font-medium">Across all sessions</span>
        </div>

        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase text-ink-muted flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5 text-brand" /> Total Answer Logs
          </span>
          <p className="text-2xl font-black text-brand mt-1">{stats.totalAttempts.toLocaleString()}</p>
          <span className="text-[11px] text-ink-muted font-medium">Player responses</span>
        </div>

        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase text-ink-muted flex items-center gap-1">
            <BarChart3 className="h-3.5 w-3.5 text-purple-600" /> Active Questions
          </span>
          <p className="text-2xl font-black text-purple-700 mt-1">{stats.rows.length}</p>
          <span className="text-[11px] text-ink-muted font-medium">Year-long curriculum</span>
        </div>

        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase text-ink-muted flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5 text-rose-500" /> Highest Trap Tier
          </span>
          <p className="text-lg font-black text-rose-600 mt-1">Debt Management</p>
          <span className="text-[11px] text-ink-muted font-medium">5-6 & CC minimum traps</span>
        </div>
      </div>

      {/* Financial Tier Performance Grid */}
      <div className="card p-5">
        <h3 className="text-sm font-black text-ink mb-3 flex items-center gap-1.5">
          <BarChart3 className="h-4 w-4 text-brand" /> Performance by Financial Tier
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
                  <span>{summary.totalAttempts.toLocaleString()} Attempts</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Questions Data & Filter Table */}
      <div className="card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-muted" />
            <input
              type="text"
              placeholder="Search question, ID, or trap..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-stone-200 pl-9 pr-3 py-2 text-xs font-semibold focus:border-brand focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-ink-muted">Filter Tier:</span>
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
          </div>
        </div>

        {/* Table of Question Response Stats */}
        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-ink-muted uppercase font-bold text-[10px]">
              <tr>
                <th className="py-2.5 px-3">ID & Tier</th>
                <th className="py-2.5 px-3">Question Prompt (EN & FIL)</th>
                <th className="py-2.5 px-3">Format</th>
                <th className="py-2.5 px-3 text-center">Accuracy</th>
                <th className="py-2.5 px-3">Top Misconception / Trap</th>
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
                      <p className="text-[11px] text-ink-muted italic line-clamp-1 mt-0.5">
                        🇵🇭 {r.question.promptFilipino}
                      </p>
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap text-ink-muted font-medium">
                      {r.question.format}
                    </td>
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <span className="font-black text-ink">{r.accuracyRate}%</span>
                      <div className="h-1 w-12 bg-stone-200 rounded-full mx-auto mt-1 overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full"
                          style={{ width: `${r.accuracyRate}%` }}
                        />
                      </div>
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
    </div>
  );
}
