import { useState } from 'react';
import { useProgress, totalBarya, strongWeeks } from '../lib/progress';
import {
  COLLECTIBLES,
  SHELF_CATEGORIES,
  Collectible,
  CollectibleKind,
} from '../data/collectibles';
import { HestiaMascot } from '../components/HestiaMascot';
import { Lock, X, Award, Compass, Shirt, Eye } from 'lucide-react';
import { useAuth, setEquippedLook } from '../lib/users';

export default function Collection() {
  const progress = useProgress();
  const { equippedLook } = useAuth();
  const barya = totalBarya(progress);
  const weeksCount = strongWeeks(progress);

  // Allow custom demo unlocked state stored in localStorage for instant testing
  const [demoUnlockedAll, setDemoUnlockedAll] = useState(() => {
    return localStorage.getItem('hulog.demo_unlocked_all') === 'true';
  });

  const baseOwnedIds = new Set(Object.values(progress.basag || {}));
  // If demo unlocked is true, all items are unlocked for inspection & dress-up demo
  const ownedIds = demoUnlockedAll
    ? new Set(COLLECTIBLES.map((c) => c.id))
    : new Set([...baseOwnedIds, 'antigo-kawayang-alkansya']); // starter item always unlocked

  const [selectedItem, setSelectedItem] = useState<Collectible | null>(null);
  const [activeShelf, setActiveShelf] = useState<'all' | CollectibleKind>('all');

  const filteredCategories =
    activeShelf === 'all'
      ? SHELF_CATEGORIES
      : SHELF_CATEGORIES.filter((c) => c.id === activeShelf);

  const totalUnlocked = COLLECTIBLES.filter((c) => ownedIds.has(c.id)).length;

  const handleToggleDemoUnlock = () => {
    const next = !demoUnlockedAll;
    setDemoUnlockedAll(next);
    localStorage.setItem('hulog.demo_unlocked_all', String(next));
  };

  const handleEquipLook = (item: Collectible) => {
    if (equippedLook === item.id) {
      setEquippedLook(null);
    } else {
      setEquippedLook(item.id);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      {/* Filipino Wooden Showcase Plaque Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#3E1F09] via-[#2A1405] to-[#1F0D03] p-6 text-center text-amber-100 shadow-xl border-4 border-[#854D0E]/80">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="flex justify-center mb-2">
          <HestiaMascot pose="ok" height={100} showLookBadge={true} className="drop-shadow-lg" />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-2xs font-extrabold tracking-wider uppercase text-amber-300 border border-amber-500/30">
          <Award className="h-3.5 w-3.5" /> Cultural Heritage Sanctuary
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-amber-200 tracking-tight mt-1">
          Collection Shelf Display
        </h1>
        <p className="text-xs text-amber-100/80 max-w-md mx-auto mt-1 leading-relaxed">
          Exhibition of Philippine currency, national symbols, ancient pottery, farm life, and wearable traditional attire & mythical looks for Hestia.
        </p>

        {/* Active Equipped Look Banner */}
        {equippedLook && (
          <div className="mt-4 mx-auto max-w-sm rounded-2xl bg-amber-400/20 border border-amber-400/40 p-2.5 flex items-center justify-between text-left">
            <div className="flex items-center gap-2">
              <Shirt className="h-4 w-4 text-amber-300 shrink-0" />
              <div className="text-2xs">
                <span className="text-amber-300/80 block uppercase font-bold">Hestia's Equipped Look:</span>
                <span className="font-black text-amber-100">
                  {COLLECTIBLES.find((c) => c.id === equippedLook)?.nameFilipino || 'Custom Attire'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setEquippedLook(null)}
              className="rounded-lg bg-black/40 hover:bg-black/60 px-2 py-1 text-[10px] font-bold text-amber-200 transition"
            >
              Unequip
            </button>
          </div>
        )}

        {/* Heritage Metrics Plaque (in English) */}
        <div className="grid grid-cols-4 gap-2 mt-5 text-center">
          <div className="rounded-2xl bg-black/40 p-2.5 border border-amber-500/20 backdrop-blur-xs">
            <span className="text-[10px] uppercase font-bold text-amber-300/80 block">Gold</span>
            <p className="text-sm font-black text-amber-400 mt-0.5">{progress.ginto} 🪙</p>
          </div>
          <div className="rounded-2xl bg-black/40 p-2.5 border border-amber-500/20 backdrop-blur-xs">
            <span className="text-[10px] uppercase font-bold text-amber-300/80 block">Coins</span>
            <p className="text-sm font-black text-amber-200 mt-0.5">{barya} coins</p>
          </div>
          <div className="rounded-2xl bg-black/40 p-2.5 border border-amber-500/20 backdrop-blur-xs">
            <span className="text-[10px] uppercase font-bold text-amber-300/80 block">Weeks</span>
            <p className="text-sm font-black text-emerald-400 mt-0.5">{weeksCount} wks</p>
          </div>
          <div className="rounded-2xl bg-black/40 p-2.5 border border-amber-500/20 backdrop-blur-xs">
            <span className="text-[10px] uppercase font-bold text-amber-300/80 block">Unlocked</span>
            <p className="text-sm font-black text-flame-deep mt-0.5">{totalUnlocked}/{COLLECTIBLES.length}</p>
          </div>
        </div>

        {/* Sample / Demo Toggle for evaluators */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={handleToggleDemoUnlock}
            className="rounded-full bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1 text-[11px] font-bold text-amber-200 flex items-center gap-1.5 transition"
            title="Toggle to view all collectibles and dress up Hestia immediately in this demo"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>{demoUnlockedAll ? 'Reset Unlocked (Normal View)' : 'Sample Mode: Unlock All for Demo ✨'}</span>
          </button>
        </div>
      </div>

      {/* Visual Display Shelf Selector Bar */}
      <div className="my-5">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-black uppercase tracking-wider text-cocoa">
            Display Shelf Showcase:
          </span>
          <span className="text-2xs font-bold text-ink-muted">
            {activeShelf === 'all' ? 'Grand Exhibition Cabinet' : `${filteredCategories[0]?.titleEnglish}`}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveShelf('all')}
            className={`rounded-2xl px-3.5 py-2 text-xs font-extrabold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeShelf === 'all'
                ? 'bg-gradient-to-r from-[#78350F] to-[#9A3412] text-amber-100 shadow-md ring-2 ring-amber-400'
                : 'bg-white text-ink-muted border border-[#E5D5BA] hover:bg-amber-50'
            }`}
          >
            <span>🏛️</span>
            <span>All Shelves (Grand Cabinet)</span>
          </button>

          {SHELF_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveShelf(cat.id)}
              className={`rounded-2xl px-3.5 py-2 text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                activeShelf === cat.id
                  ? 'bg-gradient-to-r from-[#78350F] to-[#9A3412] text-amber-100 shadow-md ring-2 ring-amber-400'
                  : 'bg-white text-ink-muted border border-[#E5D5BA] hover:bg-amber-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.titleEnglish.split(' ')[0]} {cat.titleEnglish.split(' ')[1] || ''}</span>
            </button>
          ))}
        </div>
      </div>

      {/* The Multi-Tier Wooden Display Cabinet */}
      <div className="space-y-6">
        {filteredCategories.map((cat) => {
          const items = COLLECTIBLES.filter((c) => c.kind === cat.id);
          const categoryUnlocked = items.filter((i) => ownedIds.has(i.id)).length;

          return (
            <div
              key={cat.id}
              className="relative rounded-3xl bg-gradient-to-b from-[#FDFBF7] to-[#F5ECE0] p-4 sm:p-5 border-4 border-[#C7A87A] shadow-lg overflow-hidden"
            >
              {/* Wooden Shelf Header with Brass Bracket Accents */}
              <div className="flex items-start justify-between mb-3 border-b-2 border-[#D7C19D] pb-3">
                <div className="pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{cat.icon}</span>
                    <h3 className="text-base font-black text-[#5C2B09]">
                      {cat.titleEnglish}
                    </h3>
                  </div>
                  <p className="text-xs font-bold text-amber-900/80 italic mt-0.5">
                    🇵🇭 {cat.titleFilipino}
                  </p>
                  <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <span className="inline-block text-[11px] font-black bg-[#EFE3CF] text-[#5C2B09] px-2.5 py-1 rounded-full border border-[#D7C19D]">
                    {categoryUnlocked} / {items.length} Unlocked
                  </span>
                  {cat.wearableCategory && (
                    <span className="block text-[10px] font-bold text-emerald-700 mt-1">
                      ✨ Wearable Look
                    </span>
                  )}
                </div>
              </div>

              {/* Wooden Display Planks (Shelf Display) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-2">
                {items.map((it) => {
                  const isUnlocked = ownedIds.has(it.id);
                  const isEquipped = equippedLook === it.id;

                  return (
                    <button
                      key={it.id}
                      onClick={() => setSelectedItem(it)}
                      className={`group relative flex flex-col items-center justify-between rounded-2xl p-3 text-center transition-all ${
                        isEquipped
                          ? 'bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-flame shadow-md ring-2 ring-flame'
                          : isUnlocked
                          ? 'bg-gradient-to-b from-white to-[#FFF6E6] border-2 border-amber-300 shadow-sm hover:scale-[1.03] hover:shadow-md'
                          : 'bg-stone-100/80 border border-stone-300/80 opacity-60 hover:opacity-80'
                      }`}
                    >
                      {/* Wooden Stand Top Glow */}
                      {isUnlocked && (
                        <div className="absolute top-1.5 w-12 h-1 bg-amber-400/40 rounded-full blur-xs" />
                      )}

                      {/* Wearable Tag */}
                      {it.wearable && isUnlocked && (
                        <span className="absolute top-2 right-2 text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-900 border border-amber-400/40">
                          {isEquipped ? 'Worn' : 'Fit'}
                        </span>
                      )}

                      {/* Collectible Visual */}
                      <div className="text-4xl sm:text-5xl my-2 relative transition-transform group-hover:scale-110">
                        {it.emoji}
                        {!isUnlocked && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/25 rounded-full backdrop-blur-[1px]">
                            <Lock className="h-4 w-4 text-stone-700 drop-shadow" />
                          </div>
                        )}
                      </div>

                      {/* Authentic Filipino Name Tag */}
                      <div className="w-full">
                        <span className="block text-xs font-black text-[#451A03] line-clamp-1">
                          {it.nameFilipino}
                        </span>
                        <span className="block text-[10px] font-medium text-ink-muted line-clamp-1 italic">
                          {it.nameEnglish}
                        </span>
                      </div>

                      {/* Polished Wooden Shelf Ledge Effect at Bottom of Card */}
                      <div className="mt-2.5 h-2 w-full rounded-full bg-gradient-to-r from-[#692F0C] via-[#9A3412] to-[#692F0C] shadow-inner" />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cultural Heritage Backstory & Wearable Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm anim-pop">
          <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#FBF4E6] p-6 text-center border-4 border-[#854D0E] shadow-2xl">
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
                {selectedItem.rarity} Rarity
              </span>
              <span className="rounded-full bg-stone-200/80 px-2.5 py-0.5 text-[10px] font-bold text-stone-800">
                {selectedItem.shelfTier}
              </span>
            </div>

            {/* Authentic Filipino Name in Large Bold Typography */}
            <h3 className="text-xl sm:text-2xl font-black text-[#451A03] mt-2">
              {selectedItem.nameFilipino}
            </h3>
            <p className="text-xs font-bold text-cocoa/90 mb-3">
              {selectedItem.nameEnglish} · {selectedItem.material}
            </p>

            {/* Cultural Story in English */}
            <div className="rounded-2xl border border-[#DEC49F] bg-[#FAF2E3] p-4 text-left my-3 shadow-inner">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#854D0E] flex items-center gap-1 mb-1">
                <Compass className="h-3.5 w-3.5" /> Philippine Cultural Heritage & Meaning
              </span>
              <p className="text-xs text-ink leading-relaxed">
                {selectedItem.culturalStory}
              </p>
            </div>

            {/* Unlocking Condition */}
            <p className="text-[11px] text-ink-muted italic mb-4">
              {ownedIds.has(selectedItem.id)
                ? '✨ Unlocked and displayed on your Collection Shelf!'
                : `🔒 How to Unlock: ${selectedItem.unlockRequirement}`}
            </p>

            {/* Wearable Button if this is a Costume or Aswang Look */}
            {selectedItem.wearable && ownedIds.has(selectedItem.id) && (
              <div className="mb-3">
                <button
                  onClick={() => handleEquipLook(selectedItem)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition ${
                    equippedLook === selectedItem.id
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'btn-flame'
                  }`}
                >
                  <Shirt className="h-4 w-4" />
                  <span>
                    {equippedLook === selectedItem.id
                      ? '✓ Currently Worn by Hestia (Click to Unequip)'
                      : `Wear this Look on Hestia ✨`}
                  </span>
                </button>
              </div>
            )}

            <button
              onClick={() => setSelectedItem(null)}
              className="btn-ghost w-full py-2 text-xs font-bold border-stone-300"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
