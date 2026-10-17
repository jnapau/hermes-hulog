import { useState } from 'react';
import { Lock, X, Shirt } from 'lucide-react';
import { Modal } from '../components/Modal';
import { HestiaMascot } from '../components/HestiaMascot';
import { COLLECTIBLES, SHELF_CATEGORIES, type Collectible, type CollectibleKind } from '../data/collectibles';
import { useAuth, setEquippedLook } from '../lib/users';

export default function Collection() {
  const { currentUser, equippedLook, ownedIds: savedOwnedIds } = useAuth();
  const owned = new Set(currentUser?.is_admin ? COLLECTIBLES.map(c => c.id) : savedOwnedIds);
  const [selected, setSelected] = useState<Collectible | null>(null);
  const [activeShelf, setActiveShelf] = useState<'all' | CollectibleKind>('all');
  const [equipping, setEquipping] = useState(false);
  const categories = activeShelf === 'all' ? SHELF_CATEGORIES : SHELF_CATEGORIES.filter(c => c.id === activeShelf);
  return <div className="collection-page mx-auto max-w-2xl px-4 py-5 sm:px-6">
    <header className="collection-heading"><div><h1 className="text-2xl font-bold text-cocoa">Aparador</h1><p className="text-xs text-ink-muted mt-1">Little treasures, earned one day at a time.</p><p className="text-xs font-semibold text-cocoa mt-2">{owned.size} / {COLLECTIBLES.length} unlocked</p></div><HestiaMascot pose="ok" height={76} showLookBadge/></header>
    <div className="shelf-tabs" aria-label="Collection shelves">
      <button aria-pressed={activeShelf === 'all'} onClick={() => setActiveShelf('all')}>All shelves</button>
      {SHELF_CATEGORIES.map(c => <button key={c.id} aria-pressed={activeShelf === c.id} onClick={() => setActiveShelf(c.id)}>{({'ph-money':'Philippine Money','national-symbols':'National Symbols','farm-life':'Farm Life','aswang-monsters':'Mythical Looks','national-costumes':'Traditional Attire'} as Record<string,string>)[c.id] || c.titleEnglish}</button>)}
    </div>
    <div className={`aparador ${activeShelf === 'all' ? 'aparador-all' : 'aparador-category'}`} aria-label="Classic wooden collection cabinet">
      <div className="aparador-cornice" aria-hidden="true"><span>❧</span><i/><span>❧</span></div>
      <div className="aparador-interior">{categories.map(cat => <section key={cat.id} className="aparador-tier" aria-label={cat.titleEnglish}>
        {activeShelf !== 'all' && <div className="shelf-heading"><h2>{cat.titleFilipino}</h2><p>{cat.description}</p></div>}
        <div className="shelf-curios">{COLLECTIBLES.filter(c => c.kind === cat.id).map(item => <button key={item.id} onClick={() => setSelected(item)} className={`curio ${owned.has(item.id) ? 'curio-owned' : 'curio-locked'}`} aria-label={`${item.nameFilipino}, ${owned.has(item.id) ? 'unlocked' : 'locked'}${equippedLook === item.id ? ', currently worn' : ''}`}>
          <span className="curio-visual" aria-hidden="true">{item.emoji}</span>
          {!owned.has(item.id) && <Lock size={10} className="curio-lock" aria-hidden="true"/>}
          {equippedLook === item.id && <span className="curio-equipped" aria-hidden="true"/>}
          {activeShelf !== 'all' && <span className="curio-label"><strong>{item.nameFilipino}</strong><span>{item.nameEnglish}</span></span>}
        </button>)}</div>
        <div className="shelf-plank" aria-hidden="true"/>
      </section>)}</div>
      <div className="aparador-base" aria-hidden="true"/>
    </div>
    <p className="text-center text-xs text-ink-muted mt-4">Tap a treasure to discover its story.{equippedLook && ' A golden dot marks Hestia’s look.'}</p>
    {selected && <Modal onClose={() => setSelected(null)} label="Collection item details"><div className="collection-detail">
      <button className="absolute right-3 top-3 p-2" aria-label="Close details" onClick={() => setSelected(null)}><X size={20}/></button>
      <div className="text-6xl my-3" aria-hidden="true">{selected.emoji}</div>
      <p className="text-xs text-cocoa">{selected.rarity} · {selected.material}</p>
      <h2 className="text-xl font-bold mt-2">{selected.nameFilipino}</h2><p className="text-sm text-cocoa">{selected.nameEnglish}</p>
      <p className="text-sm text-left leading-relaxed my-5">{selected.culturalStory}</p>
      {!owned.has(selected.id) && <p className="text-xs text-ink-muted mb-4">How to unlock: {selected.unlockRequirement}</p>}
      {selected.wearable && owned.has(selected.id) && <button disabled={equipping} className="btn-flame w-full text-sm py-3" onClick={async () => { setEquipping(true); try { await setEquippedLook(equippedLook === selected.id ? null : selected.id); } finally { setEquipping(false); } }}><Shirt size={16}/>{equipping ? 'Saving look…' : equippedLook === selected.id ? 'Remove this look' : 'Wear this Look on Hestia'}</button>}
    </div></Modal>}
  </div>;
}
