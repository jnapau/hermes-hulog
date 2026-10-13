import { useState } from 'react';
import { useProgress, updateSettings, resetProgress, rankFor } from '../lib/progress';
import { HestiaMascot } from '../components/HestiaMascot';
import { Bell, Volume2, RotateCcw, ShieldCheck, Heart } from 'lucide-react';

export default function Settings() {
  const progress = useProgress();
  const [time, setTime] = useState(progress.checkinTime);
  const [ritual, setRitual] = useState(progress.ritual);
  const [sound, setSound] = useState(progress.sound);
  const [saved, setSaved] = useState(false);

  const daysPlayed = Object.keys(progress.plays).length;
  const { current, next } = rankFor(daysPlayed);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ checkinTime: time, ritual, sound });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Sigurado ka ba? Buburahin nito ang iyong mga nasagutan at babalik sa Day 1.')) {
      resetProgress();
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-6 sm:px-6">
      <div className="text-center mb-6">
        <HestiaMascot pose="idle" height={100} className="mx-auto mb-2" />
        <h1 className="text-xl font-black text-ink">Aking Ritwal & Settings</h1>
        <p className="text-xs text-ink-muted">
          I-set ang iyong oras para sa magiliw na paalala ni Hestia.
        </p>
      </div>

      {/* Personal Rank Card */}
      <div className="card p-4 mb-4 border-amber-200 bg-white">
        <span className="text-[10px] uppercase font-bold text-ink-muted tracking-wider">
          Kasalukuyang Ranggo
        </span>
        <div className="flex items-center justify-between mt-1">
          <div>
            <h3 className="text-base font-black text-cocoa">
              {current?.name || 'Baguhan'} ({current?.en || 'Beginner'})
            </h3>
            <p className="text-[11px] text-ink-muted">
              {daysPlayed} Hulog days natapos
            </p>
          </div>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">
            Tier {current ? 1 : 0}
          </span>
        </div>
        {next && (
          <p className="mt-2 text-[11px] text-emerald-800 bg-emerald-50 rounded-lg p-2 font-medium">
            🎯 Susunod na antas: <strong>{next.name}</strong> sa {next.days} days ({next.days - daysPlayed} araw pa).
          </p>
        )}
      </div>

      {/* Habit Stacking Form */}
      <form onSubmit={handleSave} className="card p-5 space-y-4 bg-white">
        <div>
          <label className="block text-xs font-bold text-ink mb-1 flex items-center gap-1.5">
            <Bell className="h-4 w-4 text-flame" /> Oras ng Daily Check-in
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs font-bold text-ink focus:border-flame focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-ink mb-1 flex items-center gap-1.5">
            <Heart className="h-4 w-4 text-rose-500" /> Habit Stacking (Konektadong Gawain)
          </label>
          <input
            type="text"
            value={ritual}
            onChange={(e) => setRitual(e.target.value)}
            placeholder="hal. pagtimpla ng kape, pagsakay sa MRT"
            className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs text-ink focus:border-flame focus:outline-none"
          />
          <p className="text-[10px] text-ink-muted mt-1 italic">
            "Maghuhulog ako tuwing {time || '7:15 AM'} pagkatapos kong {ritual || 'mag-almusal'}."
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <label className="text-xs font-bold text-ink flex items-center gap-1.5">
            <Volume2 className="h-4 w-4 text-emerald-600" /> Sound Effects & Haptics
          </label>
          <input
            type="checkbox"
            checked={sound}
            onChange={(e) => setSound(e.target.checked)}
            className="h-4 w-4 rounded text-flame focus:ring-flame"
          />
        </div>

        <button type="submit" className="btn-flame w-full py-2.5 text-xs font-bold">
          {saved ? 'Na-save na! ✓' : 'I-save ang Ritwal'}
        </button>
      </form>

      {/* Privacy Guarantee info box */}
      <div className="mt-4 rounded-2xl border border-stone-200 bg-white/70 p-4 text-left">
        <h4 className="text-xs font-black text-ink flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-600" /> Privacy Note
        </h4>
        <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
          Ang Hulog ay 100% individual personal sanctuary. Ang iyong score, streak, at alkansya ay hindi kailanman ibabahagi sa pamilya o sa kahit kaninong advisor.
        </p>

        <button
          onClick={handleReset}
          className="mt-4 flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:underline"
        >
          <RotateCcw className="h-3 w-3" /> I-reset ang aking progress (Local Storage)
        </button>
      </div>
    </div>
  );
}
