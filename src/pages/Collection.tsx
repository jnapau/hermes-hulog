import { useState } from 'react';
import { useProgress, totalBarya, strongWeeks } from '../lib/progress';
import {
  COLLECTIBLES,
  SHELF_CATEGORIES,
  Collectible,
  CollectibleKind,
} from '../data/collectibles';
import { HestiaMascot } from '../components/HestiaMascot';
import { Sparkles, Lock, X, Award, Compass } from 'lucide-react';

export default function Collection() {
  const progress = useProgress();
  const ownedIds = new Set(Object.values(progress.basag || {}));
  const barya = totalBarya(progress);
  const weeksCount = strongWeeks(progress);

  const [selectedItem, setSelectedItem] = useState<Collectible | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | CollectibleKind>('all');

  const filteredCategories =
    activeTab === 'all'
      ? SHELF_CATEGORIES
      : SHELF_CATEGORIES.filter((c) => c.id === activeTab);

  const totalUnlocked = COLLECTIBLES.filter((c) => ownedIds.has(c.id)).length;

  return (
    <div className="mx-auto max-w-lg px-4 py-6 sm:px-6">
      {/* Filipino Wooden Plaque Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#3E1F09] via-[#2A1405] to-[#1F0D03] p-6 text-center text-amber-100 shadow-xl border-4 border-[#854D0E]/80">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px]" />

        <HestiaMascot pose="ok" height={90} className="mx-auto mb-2 drop-shadow-md" />
        
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-2xs font-extrabold tracking-wider uppercase text-amber-300 border border-amber-500/30">
          <Award className="h-3.5 w-3.5" /> Dambana ng Pag-iimpok
        </span>
        
        <h1 className="text-2xl font-black text-amber-200 tracking-tight mt-1">
          Estante ng mga Gantimpala
        </h1>
        <p className="text-xs text-amber-100/80 max-w-sm mx-auto mt-1 leading-relaxed">
          Mga pamanang pangkultura at sagisag ng sipag at katatagan mula sa iyong Linggo Basag.
        </p>

        {/* Heritage Stats Plaque */}
        <div className="grid grid-cols-4 gap-2 mt-5 text-center">
          <div className="rounded-2xl bg-black/40 p-2.5 border border-amber-500/20 backdrop-blur-xs">
            <span className="text-[10px] uppercase font-bold text-amber-300/80 block">Ginto</span>
            <p className="text-sm font-black text-amber-400 mt-0.5">{progress.ginto} 🪙</p>
          </div>
          <div className="rounded-2xl bg-black/40 p-2.5 border border-amber-500/20 backdrop-blur-xs">
            <span className="text-[10px] uppercase font-bold text-amber-300/80 block">Hulog</span>
            <p className="text-sm font-black text-amber-200 mt-0.5">{barya} barya</p>
          </div>
          <div className="rounded-2xl bg-black/40 p-2.5 border border-amber-500/20 backdrop-blur-xs">
            <span className="text-[10px] uppercase font-bold text-amber-300/80 block">Linggo</span>
            <p className="text-sm font-black text-emerald-400 mt-0.5">{weeksCount} wk</p>
          </div>
          <div className="rounded-2xl bg-black/40 p-2.5 border border-amber-500/20 backdrop-blur-xs">
            <span className="text-[10px] uppercase font-bold text-amber-300/80 block">Nalutas</span>
            <p className="text-sm font-black text-flame-deep mt-0.5">{totalUnlocked}/{COLLECTIBLES.length}</p>
          </div>
        </div>
      </div>

      {/* Shelf Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-4 scrollbar-none">
        <button
          onClick={() => setActiveTab('all')}
          className={`rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition ${
            activeTab === 'all'
              ? 'bg-[#78350F] text-amber-100 shadow'
              : 'bg-white/80 text-ink-muted border border-[#E5D5BA] hover:bg-white'
          }`}
        >
          Lahat ng Estante
        </button>
        {SHELF_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition ${
              activeTab === cat.id
                ? 'bg-[#78350F] text-amber-100 shadow'
                : 'bg-white/80 text-ink-muted border border-[#E5D5BA] hover:bg-white'
            }`}
          >
            {cat.titleFilipino.split(' ')[0]} {cat.titleFilipino.split(' ')[1]}
          </button>
        ))}
      </div>

      {/* The Filipino Wooden Shelves */}
      <div className="space-y-6">
        {filteredCategories.map((cat) => {
          const items = COLLECTIBLES.filter((c) => c.kind === cat.id);
          return (
            <div
              key={cat.id}
              className="relative rounded-3xl bg-[#FDFBF7] p-4 border-2 border-[#D7C19D] shadow-md overflow-hidden"
            >
              {/* Shelf Category Header */}
              <div className="flex items-start justify-between mb-3 border-b border-[#EADCC7] pb-2">
                <div>
                  <h3 className="text-sm font-black text-[#5C2B09] flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-600" />
                    {cat.titleFilipino}
                  </h3>
                  <p className="text-[11px] font-semibold text-cocoa/70">
                    {cat.titleEnglish}
                  </p>
                </div>
                <span className="text-[10px] font-extrabold bg-[#EFE3CF] text-[#5C2B09] px-2 py-0.5 rounded-full">
                  {items.filter((i) => ownedIds.has(i.id)).length} / {items.length} Nalutas
                </span>
              </div>

              {/* Items on Wooden Shelf Planks */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {items.map((it) => {
                  const isUnlocked = ownedIds.has(it.id);
                  return (
                    <button
                      key={it.id}
                      onClick={() => setSelectedItem(it)}
                      className={`group relative flex flex-col items-center justify-between rounded-2xl p-3 text-center transition-all ${
                        isUnlocked
                          ? 'bg-gradient-to-b from-amber-50 to-[#FFF3DC] border-2 border-amber-300 shadow-sm hover:scale-[1.02] hover:shadow-md'
                          : 'bg-stone-100/70 border border-stone-200/80 opacity-65 hover:opacity-85'
                      }`}
                    >
                      {/* Wooden Stand Top Glow */}
                      {isUnlocked && (
                        <div className="absolute top-1 w-10 h-1 bg-amber-400/40 rounded-full blur-xs" />
                      )}

                      {/* Collectible Visual */}
                      <div className="text-4xl my-2 relative transition-transform group-hover:scale-110">
                        {it.emoji}
                        {!isUnlocked && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full backdrop-blur-[1px]">
                            <Lock className="h-4 w-4 text-stone-700 drop-shadow" />
                          </div>
                        )}
                      </div>

                      {/* Filipino Name Tag */}
                      <div className="w-full">
                        <span className="block text-xs font-black text-[#451A03] line-clamp-1">
                          {it.nameFilipino}
                        </span>
                        <span className="block text-[10px] font-medium text-ink-muted line-clamp-1">
                          {it.material}
                        </span>
                      </div>

                      {/* Wooden Shelf Ledge Effect at Bottom of Card */}
                      <div className="mt-2 h-1.5 w-full rounded-full bg-gradient-to-r from-[#78350F] via-[#9A3412] to-[#78350F] opacity-80" />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cultural Heritage Backstory Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm anim-pop">
          <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#FBF4E6] p-6 text-center border-4 border-[#854D0E] shadow-2xl">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-stone-500 hover:bg-stone-200 transition"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Large Visual Emoji */}
            <div className="text-6xl my-2 drop-shadow-md">{selectedItem.emoji}</div>

            {/* Rarity & Shelf Badge */}
            <div className="flex items-center justify-center gap-1.5 my-1">
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-black text-amber-900 border border-amber-300">
                {selectedItem.rarity}
              </span>
              <span className="rounded-full bg-stone-200/80 px-2.5 py-0.5 text-[10px] font-bold text-stone-800">
                {selectedItem.shelfTier}
              </span>
            </div>

            {/* Filipino Name & English Subtitle */}
            <h3 className="text-xl font-black text-[#451A03] mt-2">
              {selectedItem.nameFilipino}
            </h3>
            <p className="text-xs font-bold text-cocoa/80 mb-3">
              {selectedItem.nameEnglish} · {selectedItem.material}
            </p>

            {/* Cultural Story */}
            <div className="rounded-2xl border border-[#DEC49F] bg-[#FAF2E3] p-4 text-left my-3 shadow-inner">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#854D0E] flex items-center gap-1 mb-1">
                <Compass className="h-3.5 w-3.5" /> Kasaysayan at Diwa ng Pilipino
              </span>
              <p className="text-xs text-ink leading-relaxed">
                {selectedItem.culturalStory}
              </p>
            </div>

            {/* Unlocking Condition */}
            <p className="text-[11px] text-ink-muted italic mb-4">
              {ownedIds.has(selectedItem.id)
                ? '✨ Kasama na sa iyong Aking Estante!'
                : `🔒 Paano makuha: ${selectedItem.unlockRequirement}`}
            </p>

            <button
              onClick={() => setSelectedItem(null)}
              className="btn-flame w-full py-2.5 text-xs font-bold"
            >
              Isara ang Detalye
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
