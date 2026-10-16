import { useState } from 'react';
import { refreshAccount, setAdmin, useAuth } from '../../lib/users';
export default function AdminUsers() {
  const { users, currentUser } = useAuth();
  const [busy, setBusy] = useState(''); const [error, setError] = useState('');
  return <section><h1 className="text-2xl font-bold mb-2">Users Data</h1><p className="text-sm mb-6">Manage accounts and administrator access.</p><button className="btn-ghost mb-4" onClick={() => void refreshAccount().catch(e => setError(e.message))}>Refresh users</button>{error && <p role="alert">{error}</p>}<div className="overflow-x-auto"><table className="data-table"><thead><tr>{['Username', 'Date created', 'Coins', 'Streak', 'Collection', 'Role'].map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{users.map(u => <tr key={u.id}><td>{u.username}</td><td>{u.registeredAt.slice(0,10)}</td><td>{u.coins}</td><td>{u.streak}</td><td>{u.unlocked}</td><td><button className="btn-ghost text-xs" disabled={Boolean(busy) || u.id === currentUser?.id} onClick={async () => { setBusy(u.id); setError(''); try { await setAdmin(u.id, !u.is_admin); } catch(e) { setError((e as Error).message); } finally { setBusy(''); } }}>{busy === u.id ? 'Saving…' : u.is_admin ? 'Demote to player' : 'Promote to admin'}</button></td></tr>)}</tbody></table></div>{!users.length && <p>No registered users yet.</p>}</section>;
}
