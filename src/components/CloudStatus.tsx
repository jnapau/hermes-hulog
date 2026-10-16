import { useEffect, useState } from 'react';
import { configured } from '../lib/supabase';
export function CloudStatus() {
  const [error, setError] = useState(configured ? '' : 'Account service needs setup. Configure the Supabase environment variables.');
  useEffect(() => { const show = (e: Event) => setError((e as CustomEvent<string>).detail); window.addEventListener('hulog:error', show); return () => window.removeEventListener('hulog:error', show); }, []);
  return error ? <div role="alert" className="cloud-error"><span>{error}</span><button onClick={() => location.reload()}>Retry</button><button aria-label="Dismiss message" onClick={() => setError('')}>×</button></div> : null;
}
