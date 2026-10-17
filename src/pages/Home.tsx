import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, CheckCircle2 } from 'lucide-react';
import { useProgress, canBasag, doBasag, currentStreak } from '../lib/progress';
import { todayPH, weekStart, addDays, DAY_SHORT } from '../lib/date';
import { getDaySchedule } from '../lib/schedule';
import { HestiaMascot } from '../components/HestiaMascot';
import { Alkansya } from '../components/Alkansya';
import { Modal } from '../components/Modal';
import { playBasag } from '../lib/sound';
import { COLLECTIBLE_BY_ID } from '../data/collectibles';
import { useAuth } from '../lib/users';
import { AuthModal } from '../components/AuthModal';

export default function Home() {
  const progress = useProgress();
  const { currentUser, ownedIds, loading } = useAuth();
  const today = todayPH();
  const played = Boolean(progress.plays[today]);
  const schedule = getDaySchedule(today);
  const [claiming, setClaiming] = useState(false);
  const [reward, setReward] = useState<string | null>(null);
  const [error, setError] = useState('');
  const week = Array.from({ length: 7 }, (_, i) => addDays(weekStart(today), i));
  const ready = canBasag(progress, today) && ownedIds.length < Object.keys(COLLECTIBLE_BY_ID).length;
  if (loading) return <p role="status" className="p-8 text-center">Loading your sanctuary…</p>;
  if (!currentUser) return <div className="landing-auth"><HestiaMascot pose="idle" height={100}/><AuthModal inline isOpen onClose={() => {}}/></div>;
  const item = reward ? COLLECTIBLE_BY_ID[reward] : null;
  return <div className="home-sanctuary">
    <div className="sanctuary-card">
      <h1>{played ? 'A little wiser, every day.' : 'One small drop. A stronger tomorrow.'}</h1>
      <p className="text-xs text-ink-muted">{schedule ? `Hulog #${schedule.hulogNumber} · Three cards, one daily habit` : 'Your daily money habit'}</p>
      <div className="sanctuary-scene"><Alkansya fillPercentage={played ? 80 : 15} animated={Boolean(reward)}/><HestiaMascot pose={played ? 'done' : 'idle'} height={112} showLookBadge/></div>
      {played ? <p className="drop-complete"><CheckCircle2 size={18}/>Daily drop complete. See you tomorrow!</p> : <Link to="/play" className="btn-flame sanctuary-cta"><Play size={18}/><span>Drop a coin today · 60s</span></Link>}
      <dl className="player-stats"><div><dt>Total coins</dt><dd>{currentUser.coins}</dd></div><div><dt>Current streak</dt><dd>{currentStreak(progress, today)} days</dd></div><div><dt>Collection</dt><dd>{ownedIds.length} items</dd></div></dl>
      <div aria-label="Weekly drops, Monday to Sunday" className="weekly-tracker">{week.map((date, i) => <div key={date} aria-label={`${date}${progress.plays[date] ? ', completed' : ''}`} aria-current={date === today ? 'date' : undefined}><span>{DAY_SHORT[(i + 1) % 7]}</span><b className={progress.plays[date] ? 'filled' : ''}>{progress.plays[date] ? '₱' : '·'}</b></div>)}</div>
      {ready && <button disabled={claiming} className="weekly-reward" onClick={async () => { setClaiming(true); setError(''); try { const id = await doBasag(today); if (id) { playBasag(progress.sound); setReward(id); } } catch (e) { setError((e as Error).message); } finally { setClaiming(false); } }}>{claiming ? 'Opening…' : 'Open your weekly reward'}</button>}
      {error && <p role="alert" className="text-xs text-red-800">{error}</p>}
    </div>
    {item && <Modal onClose={() => setReward(null)} label="Weekly collection reward"><div className="auth-inline text-center"><div className="text-5xl">{item.emoji}</div><h2 className="text-xl font-bold mt-3">{item.nameFilipino}</h2><p>{item.nameEnglish}</p><p className="text-sm my-4">{item.culturalStory}</p><Link to="/koleksyon" className="btn-flame text-sm">View in your collection</Link></div></Modal>}
  </div>;
}
