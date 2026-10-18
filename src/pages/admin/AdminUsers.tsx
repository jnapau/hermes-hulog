import { useState } from 'react';
import { CURRICULUM_DAYS } from '../../lib/dailyQuestions';
import { refreshAccount, setAdmin, setUserQuestionDay, useAuth } from '../../lib/users';

export default function AdminUsers() {
  const { users, currentUser } = useAuth();
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">Users Data</h1>
      <p className="text-sm mb-6">
        Manage accounts, administrator access, and player Question Day (1–365) or reset today’s answers for QA testing.
      </p>
      <button
        className="btn-ghost mb-4"
        onClick={() => {
          setError('');
          setNotice('');
          void refreshAccount().catch(e => setError(e.message));
        }}
      >
        Refresh users
      </button>
      {error && <p role="alert" className="text-sm text-red-800 mb-3">{error}</p>}
      {notice && <p role="status" className="text-sm font-semibold mb-3">{notice}</p>}
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              {['Username', 'Date created', 'Alkansya (Banked)', 'Wallet', 'Streak', 'Collection', 'Question Day (QA)', 'Role'].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.registeredAt.slice(0, 10)}</td>
                <td>{u.is_admin ? '—' : `${u.alkansyaCoins} coins`}</td>
                <td>{u.is_admin ? '—' : `${u.coins} coins`}</td>
                <td>{u.is_admin ? '—' : u.streak}</td>
                <td>{u.unlocked}</td>
                <td>
                  {u.is_admin ? (
                    'Practice mode (1–365)'
                  ) : (
                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        aria-label={`Question Day for ${u.username}`}
                        className="field-input py-1 px-2 text-xs w-auto"
                        disabled={Boolean(busy)}
                        value={u.questionDay}
                        onChange={async e => {
                          const nextDay = Number(e.target.value);
                          setBusy(`day:${u.id}`);
                          setError('');
                          setNotice('');
                          try {
                            await setUserQuestionDay(u.id, nextDay);
                            setNotice(`Set ${u.username} to Day ${nextDay} and cleared today’s answers.`);
                          } catch (err) {
                            setError((err as Error).message);
                          } finally {
                            setBusy('');
                          }
                        }}
                      >
                        {Array.from({ length: CURRICULUM_DAYS }, (_, i) => i + 1).map(d => (
                          <option key={d} value={d}>
                            Day {d}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="btn-ghost text-xs"
                        disabled={Boolean(busy) || (!u.todayCompleted && u.todayAnswered === 0)}
                        onClick={async () => {
                          setBusy(`reset:${u.id}`);
                          setError('');
                          setNotice('');
                          try {
                            await setUserQuestionDay(u.id, u.questionDay);
                            setNotice(`Reset today’s progress for ${u.username} (Day ${u.questionDay} is unanswered again).`);
                          } catch (err) {
                            setError((err as Error).message);
                          } finally {
                            setBusy('');
                          }
                        }}
                      >
                        {busy === `reset:${u.id}` || busy === `day:${u.id}`
                          ? 'Saving…'
                          : u.todayCompleted
                            ? 'Reset Today (Completed)'
                            : u.todayAnswered > 0
                              ? `Reset Today (${u.todayAnswered}/3)`
                              : 'Unanswered today'}
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  <button
                    className="btn-ghost text-xs"
                    disabled={Boolean(busy) || u.id === currentUser?.id}
                    onClick={async () => {
                      setBusy(u.id);
                      setError('');
                      setNotice('');
                      try {
                        await setAdmin(u.id, !u.is_admin);
                      } catch (e) {
                        setError((e as Error).message);
                      } finally {
                        setBusy('');
                      }
                    }}
                  >
                    {busy === u.id ? 'Saving…' : u.is_admin ? 'Demote to player' : 'Promote to admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!users.length && <p>No registered users yet.</p>}
    </section>
  );
}
