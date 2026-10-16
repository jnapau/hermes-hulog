import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth, loginUser, registerUser, logoutUser } from '../lib/users';
export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { currentUser } = useAuth();
  const [register, setRegister] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (isOpen) dialog.current?.showModal(); else dialog.current?.close(); }, [isOpen]);
  return <dialog ref={dialog} onCancel={onClose} onClose={onClose} className="auth-dialog" aria-labelledby="auth-title">
    <button aria-label="Close account" className="float-right p-2" onClick={onClose}><X size={20}/></button>
    <h2 id="auth-title" className="text-xl font-bold mb-2">{currentUser ? currentUser.username : register ? 'Start your Hulog habit' : 'Welcome back'}</h2>
    <p className="text-sm text-ink-muted mb-6">Your little daily steps, saved across devices.</p>
    {currentUser ? <div className="space-y-4">{currentUser.is_admin && <Link className="btn-ghost block" to="/admin" onClick={onClose}>Open Admin Panel</Link>}<button className="btn-flame w-full" onClick={() => { void logoutUser(); onClose(); }}>Log out</button></div> : <form className="space-y-4" onSubmit={async e => {
      e.preventDefault(); setBusy(true); setError(''); const form = new FormData(e.currentTarget);
      const result = await (register ? registerUser : loginUser)(String(form.get('username')), String(form.get('password')));
      setBusy(false); if (result.success) onClose(); else setError(result.message || 'Please retry.');
    }}>
      <label className="block text-sm font-semibold">Username<input autoFocus required name="username" autoComplete="username" pattern="[a-zA-Z0-9_]{3,24}" minLength={3} maxLength={24} className="field"/></label>
      <label className="block text-sm font-semibold">Password<input required name="password" type="password" autoComplete={register ? 'new-password' : 'current-password'} minLength={8} className="field"/></label>
      {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
      <button disabled={busy} className="btn-flame w-full">{busy ? 'Connecting…' : register ? 'Create account' : 'Log in'}</button>
      <button type="button" className="text-sm underline" onClick={() => { setRegister(!register); setError(''); }}>{register ? 'Already have an account? Log in' : 'New here? Create an account'}</button>
    </form>}
  </dialog>;
}
