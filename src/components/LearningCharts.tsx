import { useMemo } from "react";
import { useAuth, type AnswerLog } from "../lib/users";
import { useAllQuestions } from "../lib/customQuestions";
import { addDays, todayPH } from "../lib/date";
const colors = [
  "#477a65",
  "#ab5c48",
  "#bd8e36",
  "#626f9a",
  "#967450",
  "#5f8c91",
];
const summarize = (rows: AnswerLog[]) => ({
  attempts: rows.length,
  accuracy: rows.length
    ? Math.round((rows.filter((r) => r.isCorrect).length / rows.length) * 100)
    : null,
});
export function LearningCharts() {
  const { logs } = useAuth(),
    questions = useAllQuestions();
  const data = useMemo(() => {
    const byId = new Map(questions.map((q) => [q.id, q]));
    const recent = Array.from({ length: 14 }, (_, i) =>
      addDays(todayPH(), i - 13),
    ).map((date) => {
      const rows = logs.filter((l) => l.date === date);
      return {
        date,
        active: new Set(rows.map((r) => r.username)).size,
        ...summarize(rows),
      };
    });
    const tiers = [...new Set(questions.map((q) => q.tier))].map((tier) => ({
      name: tier,
      ...summarize(logs.filter((l) => byId.get(l.questionId)?.tier === tier)),
    }));
    const formats = [
      "Tama o Mali? .binary",
      "Ano'ng Gagawin Mo? .choice",
      "Scam o Legit? .scam",
    ].map((key, i) => ({
      name: key.split(" .")[0],
      ...summarize(
        logs.filter((l) => {
          const q = byId.get(l.questionId);
          return (
            q &&
            (i === 2
              ? q.format === "Scam o Legit?"
              : i === 0
                ? q.kind === "binary" && q.format !== "Scam o Legit?"
                : q.kind !== "binary")
          );
        }),
      ),
    }));
    const difficulties = ["easy", "medium", "challenge"].map((name) => ({
      name,
      ...summarize(
        logs.filter((l) => byId.get(l.questionId)?.difficulty === name),
      ),
    }));
    return { recent, tiers, formats, difficulties };
  }, [logs, questions]);
  const maxActive = Math.max(1, ...data.recent.map((d) => d.active)),
    x = (i: number) => 48 + i * 37,
    y = (a: number) => 184 - a * 1.5;
  return (
    <div className="learning-charts">
      <section className="trend-chart">
        <h2>Daily activity & accuracy</h2>
        <p>
          Last 14 Philippine calendar days · bars: active players · line:
          correct answers (%)
        </p>
        <div className="chart-scroll">
          <svg
            viewBox="0 0 600 235"
            role="img"
            aria-label="Daily active players as bars and answer accuracy as a line"
          >
            <title>Daily activity and accuracy, past 14 days</title>
            {[0, 25, 50, 75, 100].map((n) => (
              <g key={n}>
                <path d={`M31 ${y(n)}H563`} stroke="#e3d5c1" />
                <text x="572" y={y(n) + 4} fontSize="10" fill="#725c44">
                  {n}%
                </text>
              </g>
            ))}
            <text x="30" y="17" fontSize="11" fill="#477a65">
              Players (max {maxActive})
            </text>
            <text x="477" y="17" fontSize="11" fill="#b17b2d">
              Accuracy
            </text>
            {data.recent.map((d, i) => (
              <g key={d.date}>
                <title>
                  {d.date}: {d.active} active, {d.attempts} answers,{" "}
                  {d.accuracy === null
                    ? "no accuracy data"
                    : `${d.accuracy}% accuracy`}
                </title>
                <rect
                  x={x(i) - 9}
                  y={184 - (d.active / maxActive) * 150}
                  width="18"
                  height={(d.active / maxActive) * 150}
                  rx="3"
                  fill="#477a65"
                />
                <text
                  x={x(i)}
                  y="204"
                  textAnchor="middle"
                  fontSize="9"
                  fill="#725c44"
                >
                  {d.date.slice(5)}
                </text>
                {d.active > 0 && (
                  <text
                    x={x(i)}
                    y={178 - (d.active / maxActive) * 150}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#355e4f"
                  >
                    {d.active}
                  </text>
                )}
              </g>
            ))}
            {data.recent.map((d, i) =>
              d.accuracy !== null ? (
                <g key={d.date}>
                  {i > 0 && data.recent[i - 1].accuracy !== null && (
                    <path
                      d={`M${x(i - 1)} ${y(data.recent[i - 1].accuracy!)}L${x(i)} ${y(d.accuracy)}`}
                      fill="none"
                      stroke="#b17b2d"
                      strokeWidth="2.5"
                    />
                  )}
                  <circle
                    cx={x(i)}
                    cy={y(d.accuracy)}
                    r="4"
                    fill="#b17b2d"
                    stroke="#fff8e9"
                    strokeWidth="1.5"
                  />
                </g>
              ) : null,
            )}
          </svg>
        </div>
        {!data.recent.some((d) => d.attempts) && (
          <p>
            No answers recorded in this period. Accuracy appears after the first
            answer.
          </p>
        )}
        <details>
          <summary>View daily data</summary>
          <div className="chart-scroll">
            <table className="chart-data">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Players</th>
                  <th>Attempts</th>
                  <th>Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {data.recent.map((d) => (
                  <tr key={d.date}>
                    <td>{d.date}</td>
                    <td>{d.active}</td>
                    <td>{d.attempts}</td>
                    <td>
                      {d.accuracy === null ? "No data" : `${d.accuracy}%`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </section>
      <section className="tier-chart">
        <h2>Financial pyramid mastery</h2>
        <p>Accuracy among recorded answers · all six learning tiers</p>
        {data.tiers.map((t, i) => (
          <div key={t.name} className="tier-row">
            <div>
              <strong>{t.name}</strong>
              <span className="mastery-badge" style={{ color: colors[i] }}>
                {t.accuracy === null
                  ? "Not started"
                  : t.accuracy >= 80
                    ? "Strong"
                    : t.accuracy >= 50
                      ? "Building"
                      : "Practicing"}
              </span>
            </div>
            <svg
              preserveAspectRatio="none"
              viewBox="0 0 400 12"
              role="img"
              aria-label={`${t.name}: ${t.accuracy === null ? "no answers" : `${t.accuracy}% accuracy`}, ${t.attempts} attempts`}
            >
              <rect width="400" height="12" rx="6" fill="#ece2d1" />
              <rect
                width={(t.accuracy ?? 0) * 4}
                height="12"
                rx="6"
                fill={colors[i]}
              />
            </svg>
            <p>
              {t.accuracy === null ? "No data" : `${t.accuracy}% accuracy`} ·{" "}
              {t.attempts} attempts
            </p>
          </div>
        ))}
      </section>
      <section className="ring-chart">
        <h2>Question format accuracy</h2>
        <p>
          Colored arc: correct · remaining arc: incorrect · blank ring: no
          answers
        </p>
        <div className="accuracy-rings">
          {data.formats.map((d, i) => (
            <AccuracyRing key={d.name} {...d} color={colors[i]} />
          ))}
        </div>
        <h2>Difficulty accuracy</h2>
        <div className="accuracy-rings">
          {data.difficulties.map((d, i) => (
            <AccuracyRing key={d.name} {...d} color={colors[i + 3]} />
          ))}
        </div>
      </section>
    </div>
  );
}
function AccuracyRing({
  name,
  accuracy,
  attempts,
  color,
}: {
  name: string;
  accuracy: number | null;
  attempts: number;
  color: string;
}) {
  return (
    <figure>
      <svg
        viewBox="0 0 120 120"
        role="img"
        aria-label={`${name}: ${accuracy === null ? "no data" : `${accuracy}% accuracy`}, ${attempts} attempts`}
      >
        <circle
          cx="60"
          cy="60"
          r="44"
          stroke="#e7dcc9"
          strokeWidth="10"
          fill="none"
        />
        {accuracy !== null && (
          <circle
            cx="60"
            cy="60"
            r="44"
            stroke={color}
            strokeWidth="10"
            fill="none"
            pathLength="100"
            strokeDasharray={`${accuracy} 100`}
            transform="rotate(-90 60 60)"
          />
        )}
        <text
          x="60"
          y="65"
          textAnchor="middle"
          fontSize="21"
          fontWeight="700"
          fill="#513a28"
        >
          {accuracy === null ? "—" : `${accuracy}%`}
        </text>
      </svg>
      <figcaption>
        <strong>{name}</strong>
        <span>{attempts} attempts</span>
      </figcaption>
    </figure>
  );
}
