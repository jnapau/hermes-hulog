import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { todayPH } from '../lib/date';
import { getDaySchedule } from '../lib/schedule';
import { recordPlay, completeHakbang, useProgress } from '../lib/progress';
import { playClink, playSoft, unlockAudio } from '../lib/sound';
import { HestiaMascot } from '../components/HestiaMascot';
import { Alkansya } from '../components/Alkansya';
import { recordUserAnswer, getAllAnswerLogs, getCurrentUsername } from '../lib/users';
import { checkAnswer } from '../lib/checkAnswer';

const SORT_LABELS: Record<string,string> = {Need:'Pangangailangan',Want:'Kagustuhan',Obligation:'Obligasyon',Ipon:'Ipon'};
type Submission = { index: number; id: string; choice: string; status: 'pending' | 'saved' | 'error'; promise?: Promise<void> };

export default function Play() {
  const today = todayPH();
  const schedule = getDaySchedule(today);
  const progress = useProgress();
  const saved = schedule?.cards.map(c => getAllAnswerLogs().find(a => a.username === getCurrentUsername() && a.date === today && a.questionId === c.question.id)) || [];
  const missing = saved.findIndex(a => !a);
  const resume = saved.length === 3 && missing === -1;
  const [cardIndex, setCardIndex] = useState(resume ? 2 : Math.max(0, missing));
  const [results, setResults] = useState<(boolean | undefined)[]>(() => saved.map(a => a?.isCorrect));
  const [selected, setSelected] = useState<string | null>(resume ? saved[2]?.userChoice || null : null);
  const [mapping, setMapping] = useState<Record<string,string>>({});
  const [feedback, setFeedback] = useState(resume);
  const [complete, setComplete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [syncVersion, setSyncVersion] = useState(0);
  const [hakbang, setHakbang] = useState(false);
  const [dropping, setDropping] = useState(false);
  const submissions = useRef<Submission[]>([]);
  const locked = useRef(resume);
  const mounted = useRef(true);
  const coinTimer = useRef<ReturnType<typeof setTimeout>>();
  const nextButton = useRef<HTMLButtonElement>(null);
  const prompt = useRef<HTMLHeadingElement>(null);
  const question = schedule?.cards[cardIndex]?.question;
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; clearTimeout(coinTimer.current); }; }, []);
  useEffect(() => { if (feedback) nextButton.current?.focus(); else prompt.current?.focus(); }, [feedback, cardIndex]);

  function sync(entry: Submission) {
    entry.status = 'pending';
    entry.promise = recordUserAnswer(entry.id, entry.choice, false, today).then(correct => {
      entry.status = 'saved';
      if (mounted.current) setResults(old => { const next = [...old]; next[entry.index] = correct; return next; });
    }).catch(() => { entry.status = 'error'; }).finally(() => { if (mounted.current) setSyncVersion(v => v + 1); });
    return entry.promise;
  }
  function answer(choice: string) {
    if (!question || locked.current || busy) return;
    locked.current = true;
    const correct = checkAnswer(question, choice);
    unlockAudio(progress.sound);
    setSelected(choice);
    setResults(old => { const next = [...old]; next[cardIndex] = correct; return next; });
    setFeedback(true);
    if (correct) { playClink(progress.sound); setDropping(true); clearTimeout(coinTimer.current); coinTimer.current = setTimeout(() => setDropping(false), 900); }
    else playSoft(progress.sound);
    const entry: Submission = { index: cardIndex, id: question.id, choice, status: 'pending' };
    submissions.current.push(entry);
    void sync(entry);
  }
  async function next() {
    if (!feedback || busy) return;
    if (cardIndex < 2) { locked.current = false; setFeedback(false); setSelected(null); setMapping({}); setCardIndex(i => i + 1); return; }
    setBusy(true); setError('');
    try {
      await Promise.all(submissions.current.map(s => s.status === 'error' ? sync(s) : s.promise));
      if (submissions.current.some(s => s.status !== 'saved')) throw new Error('Your answers are still on this screen. Reconnect, then retry saving.');
      // save_progress computes the final score from server answer rows.
      await recordPlay(today, results.map(Boolean));
      if (mounted.current) setComplete(true);
    } catch (e) { if (mounted.current) setError((e as Error).message); }
    finally { if (mounted.current) setBusy(false); }
  }
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey || (event.target instanceof HTMLElement && /INPUT|TEXTAREA|SELECT/.test(event.target.tagName))) return;
      if (feedback && ['Enter', ' '].includes(event.key) && !complete) { event.preventDefault(); void next(); return; }
      if (feedback || complete || !question || question.kind === 'sort') return;
      const index = ['1','2','3'].includes(event.key) ? Number(event.key) - 1 : ['a','b','c'].indexOf(event.key.toLowerCase());
      const keys = question.format === 'Scam o Legit?' ? ['SCAM','LEGIT'] : question.kind === 'binary' ? ['TAMA','MALI'] : question.options?.map(o => o.key) || [];
      if (index >= 0 && keys[index]) { event.preventDefault(); answer(keys[index]); }
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  });
  const failed = submissions.current.some(s => s.status === 'error');
  const pending = submissions.current.some(s => s.status === 'pending');
  void syncVersion;
  if (!schedule || !question) return <div className="p-8 text-center"><p>Today’s cards could not load. Please refresh to retry.</p><Link to="/" className="btn-ghost mt-4">Return home</Link></div>;
  if (progress.plays[today] && !complete) return <div className="play-finished"><HestiaMascot pose="done" height={120}/><h1>Daily drop complete!</h1><Link to="/" className="btn-flame text-sm">Back to My Alkansya</Link></div>;
  if (complete) return <div className="play-finished"><Alkansya fillPercentage={75}/><h1>Well done! +{results.filter(Boolean).length} coins</h1><p className="text-sm">Three small lessons. One stronger habit.</p><div className="hakbang"><h2 className="font-bold">Isang Hakbang · +5 gold</h2><p className="text-sm my-3">{schedule.cards[2].question.hakbang}</p><button disabled={busy || hakbang} className="btn-flame text-sm py-3 w-full" onClick={async () => { setBusy(true); setError(''); try { await completeHakbang(today); setHakbang(true); playClink(progress.sound); } catch(e) { setError((e as Error).message); } finally { setBusy(false); } }}>{hakbang ? <><Check size={16}/>5 gold saved</> : busy ? 'Saving…' : 'I completed this step · +5 gold'}</button></div>{error && <p role="alert">{error}</p>}<Link to="/" className="btn-ghost w-full">Back to My Alkansya</Link></div>;
  const options = question.kind === 'binary' ? question.format === 'Scam o Legit?' ? [{key:'SCAM',text:'Scam'},{key:'LEGIT',text:'Legit'}] : [{key:'TAMA',text:'Tama · True'},{key:'MALI',text:'Mali · False'}] : question.options || [];
  return <div className="play-viewport">
    <header className="play-top"><Link to="/" aria-label="Exit daily drop"><ArrowLeft size={20}/></Link><span>{question.paydaySpecial ? 'Sweldo Hulog Special' : `FRP ${question.course} · ${question.tier}`}</span><b>{cardIndex + 1} / 3</b></header>
    <div className="play-progress" aria-label={`Card ${cardIndex + 1} of 3`}><i style={{width:`${(cardIndex + (feedback ? 1 : 0)) / 3 * 100}%`}}/></div>
    <div className="play-question"><p className="play-format">{question.format} · {['Warm-up','Core practice','Daily challenge'][cardIndex]}</p><h1 ref={prompt} tabIndex={-1}>{question.promptFilipino}</h1><p lang="en" className="english-context">{question.prompt}</p></div>
    {!feedback && <div className="play-answers">
      {question.kind !== 'sort' ? <div className={question.kind === 'binary' ? 'binary-answers' : 'choice-answers'}>{options.map((o, i) => <button key={o.key} aria-pressed={selected === o.key} onClick={() => answer(o.key)}><kbd>{i + 1}</kbd><span>{'textFilipino' in o ? o.textFilipino || o.text : o.text}</span></button>)}</div> : <><div className="sort-items">{question.items?.map(item => <fieldset key={item.key}><legend>{item.textFilipino || item.text}</legend><div>{question.categories?.map(cat => <button key={cat} aria-pressed={mapping[item.key] === cat} onClick={() => setMapping(m => ({...m,[item.key]:cat}))}>{SORT_LABELS[cat] || cat}</button>)}</div></fieldset>)}</div><button className="btn-flame text-sm py-3 w-full" disabled={!question.items?.every(i => mapping[i.key])} onClick={() => answer(JSON.stringify(mapping))}>Check my sort</button></>}
    </div>}
    {feedback && <section className="play-feedback" aria-label="Answer feedback"><div className="feedback-title"><strong role="status">{results[cardIndex] ? 'Correct! Coin on its way.' : 'A useful lesson for next time.'}</strong><div className="mini-bank"><Alkansya fillPercentage={50} animated={dropping}/></div></div><p className="text-xs font-bold text-cocoa">{question.answerLabel}</p><p className="feedback-why">{question.whyFilipino || question.why}</p><button ref={nextButton} disabled={busy} onClick={() => void next()} className="btn-flame w-full text-sm py-3">{busy ? 'Saving your drop…' : cardIndex < 2 ? 'Next Card →' : 'Save drop & view results →'}</button></section>}
    <footer className="play-sync" aria-live="polite">{error ? <p role="alert">{error}</p> : failed ? <p>Answer save interrupted. <button onClick={() => { submissions.current.filter(s => s.status === 'error').forEach(s => void sync(s)); setSyncVersion(v => v + 1); }}>Retry saving</button></p> : pending ? 'Syncing answers… You can keep playing.' : feedback ? 'Answers saved.' : 'Keys 1 / 2 / 3 or A / B / C · Enter to continue'}</footer>
  </div>;
}
