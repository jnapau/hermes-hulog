import { LearningCharts } from "../../components/LearningCharts";
import { useState } from "react";
import { refreshAccount, useAuth } from "../../lib/users";
import { useAllQuestions } from "../../lib/customQuestions";
import { todayPH } from "../../lib/date";
export default function DashboardAnalytics() {
  const { users, logs } = useAuth();
  const questions = useAllQuestions();
  const [error, setError] = useState("");
  const missed = questions
    .map((q) => ({
      q,
      count: logs.filter((l) => l.questionId === q.id && !l.isCorrect).length,
    }))
    .filter((r) => r.count)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">Overview & Analytics</h1>
      <p className="text-sm mb-5">
        Recorded player answers · Philippine calendar days
      </p>
      <button
        className="btn-ghost"
        onClick={() => void refreshAccount().catch((e) => setError(e.message))}
      >
        Refresh analytics
      </button>
      {error && <p role="alert">{error}</p>}
      <dl className="analytics-totals">
        <div>
          <dt>Registered users</dt>
          <dd>{users.length}</dd>
        </div>
        <div>
          <dt>Daily active players</dt>
          <dd>
            {
              new Set(
                logs.filter((l) => l.date === todayPH()).map((l) => l.username),
              ).size
            }
          </dd>
        </div>
        <div>
          <dt>Overall accuracy</dt>
          <dd>
            {logs.length
              ? `${Math.round((logs.filter((l) => l.isCorrect).length / logs.length) * 100)}%`
              : "No answers yet"}
          </dd>
        </div>
      </dl>
      <LearningCharts />
      <h2 className="text-lg font-bold mt-8 mb-4">
        Most commonly missed questions
      </h2>
      {missed.length ? (
        <ol className="space-y-4">
          {missed.map(({ q, count }) => (
            <li key={q.id}>
              <strong>{count} missed</strong> · {q.prompt}
              <p className="text-sm text-ink-muted">
                {q.tier} · FRP {q.course}
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <p>No missed questions recorded yet.</p>
      )}
      <p className="text-xs mt-8 text-ink-muted">
        Metrics are calculated from recorded player answers. Refresh to include
        new activity.
      </p>
    </section>
  );
}
