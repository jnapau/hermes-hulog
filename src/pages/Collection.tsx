import { useProgress, totalBarya, strongWeeks } from '../lib/progress';
import { COLLECTIBLES, KIND_LABEL, CollectibleKind } from '../data/collectibles';
import { HestiaMascot } from '../components/HestiaMascot';
import { Sparkles, Lock } from 'lucide-react';

export default function Collection() {
  const progress = useProgress();
  const ownedIds = new Set(Object.values(progress.basag));
  const barya = totalBarya(progress);
  const weeksCount = strongWeeks(progress);

  const kinds: CollectibleKind[] = ['pera', 'outfit', 'shell', 'badge'];

  return (
    <div className="mx-auto max-w-md px-4 py-6 sm:px-6">
      {/* Header Stat */}
      <div className="text-center mb-6">
        <HestiaMascot pose="ok" height={100} className="mx-auto mb-2" />
        <h1 className="text-xl font-black text-ink">Aking Koleksyon</h1>
        <p className="text-xs text-ink-muted">
          Mga nakamit mula sa Linggo Basag at masinop na paghuhulog.
        </p>

        <div className="flex justify-center gap-3 mt-4">
          <div className="card px-4 py-2 border-amber-200">
            <span className="text-[10px] uppercase font-bold text-ink-muted">Gintong Barya</span>
            <p className="text-sm font-black text-flame-deep">{progress.ginto} 🪙</p>
          </div>
          <div className="card px-4 py-2 border-amber-200">
            <span className="text-[10px] uppercase font-bold text-ink-muted">Total Drops</span>
            <p className="text-sm font-black text-cocoa">{barya} barya</p>
          </div>
          <div className="card px-4 py-2 border-amber-200">
            <span className="text-[10px] uppercase font-bold text-ink-muted">Masinop Weeks</span>
            <p className="text-sm font-black text-emerald-700">{weeksCount} linggo</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {kinds.map((k) => {
          const items = COLLECTIBLES.filter((c) => c.kind === k);
          return (
            <div key={k} className="card p-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-cocoa mb-3 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-flame" />
                {KIND_LABEL[k]}
              </h3>

              <div className="grid grid-cols-2 gap-2.5">
                {items.map((it) => {
                  const isUnlocked = ownedIds.has(it.id);
                  return (
                    <div
                      key={it.id}
                      className={`rounded-2xl border p-3 flex flex-col items-center text-center transition ${
                        isUnlocked
                          ? 'border-amber-300 bg-amber-50/60 shadow-xs'
                          : 'border-stone-200 bg-stone-50/60 opacity-60'
                      }`}
                    >
                      <div className="text-3xl my-1 relative">
                        {it.emoji}
                        {!isUnlocked && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-full">
                            <Lock className="h-4 w-4 text-stone-500" />
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-extrabold text-ink line-clamp-1">{it.name}</span>
                      <p className="text-[10px] text-ink-muted mt-1 leading-tight line-clamp-2">
                        {isUnlocked ? it.blurb : 'Mabubuksan sa Linggo Basag'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
