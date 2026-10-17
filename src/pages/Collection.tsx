import { useState } from "react";
import { Lock, X, Shirt, Pin, Coins } from "lucide-react";
import { Modal } from "../components/Modal";
import { HestiaMascot } from "../components/HestiaMascot";
import { CollectibleArt } from "../components/CollectibleArt";
import {
  COLLECTIBLES,
  SHELF_CATEGORIES,
  ROLE_INFO,
  type Collectible,
  type CollectibleKind,
} from "../data/collectibles";
import { useAuth, setEquippedLook } from "../lib/users";
import {
  useProgress,
  purchaseCollectible,
  pinGoal,
  heritageRank,
} from "../lib/progress";
export default function Collection() {
  const { currentUser, equippedLook, ownedIds } = useAuth(),
    progress = useProgress(),
    owned = new Set(ownedIds);
  const [selected, setSelected] = useState<Collectible | null>(null),
    [activeShelf, setActiveShelf] = useState<"all" | CollectibleKind>("all"),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [notice, setNotice] = useState("");
  const categories =
      activeShelf === "all"
        ? SHELF_CATEGORIES
        : SHELF_CATEGORIES.filter((c) => c.id === activeShelf),
    rank = heritageRank(ownedIds);
  async function act(fn: () => Promise<unknown>, message: string) {
    setBusy(true);
    setError("");
    try {
      await fn();
      setNotice(message);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="collection-page mx-auto max-w-2xl px-4 py-5 sm:px-6">
      <header className="collection-heading">
        <div>
          <h1 className="text-2xl font-bold text-cocoa">Aparador</h1>
          <p className="text-sm text-ink-muted mt-1">
            Save with purpose. Enjoy what you earn.
          </p>
          <p className="text-sm font-semibold text-cocoa mt-2">
            <Coins size={16} className="inline" /> Wallet:{" "}
            {currentUser?.coins ?? 0} coins · {owned.size}/{COLLECTIBLES.length}{" "}
            owned
          </p>
        </div>
        <HestiaMascot height={76} />
      </header>
      <p className="heritage-summary">
        {rank.name} · {rank.worth} Heritage Net Worth · {progress.restTokens}{" "}
        Pahinga shields
      </p>
      <div className="shelf-tabs" aria-label="Collection shelves">
        <button
          aria-pressed={activeShelf === "all"}
          onClick={() => setActiveShelf("all")}
        >
          All shelves
        </button>
        {SHELF_CATEGORIES.map((c) => (
          <button
            key={c.id}
            aria-pressed={activeShelf === c.id}
            onClick={() => setActiveShelf(c.id)}
          >
            {
              (
                {
                  "ph-money": "Money",
                  "national-symbols": "National Treasures",
                  "ancient-things": "Ancient Artifacts",
                  "farm-life": "Livelihood Assets",
                  merienda: "Merienda",
                  "national-costumes": "National Costumes",
                  "aswang-monsters": "Mythical Looks",
                } as Record<string, string>
              )[c.id]
            }
          </button>
        ))}
      </div>
      <div
        className={`aparador ${activeShelf === "all" ? "aparador-all" : "aparador-category"}`}
        aria-label="Wooden collection cabinet"
      >
        <div className="aparador-cornice" aria-hidden="true">
          <i />
        </div>
        <div className="aparador-interior">
          {categories.map((cat) => (
            <section
              key={cat.id}
              className="aparador-tier"
              aria-label={cat.titleEnglish}
            >
              <div className="shelf-heading">
                <h2>{cat.titleEnglish}</h2>
                <p lang="fil">{cat.titleFilipino}</p>
              </div>
              <div className="shelf-curios">
                {COLLECTIBLES.filter((c) => c.kind === cat.id).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelected(item);
                      setError("");
                      setNotice("");
                    }}
                    className={`curio ${owned.has(item.id) ? "curio-owned" : "curio-locked"}`}
                    aria-label={`${item.nameEnglish}, ${item.financialRole}, ${item.price} coins, ${owned.has(item.id) ? "owned" : "available to buy"}`}
                  >
                    <span className="curio-visual">
                      <CollectibleArt item={item} />
                    </span>
                    {!owned.has(item.id) && (
                      <Lock
                        size={10}
                        className="curio-lock"
                        aria-hidden="true"
                      />
                    )}
                    {equippedLook === item.id && (
                      <span className="curio-equipped" />
                    )}
                    <span className="curio-label">
                      <strong>{item.nameFilipino}</strong>
                      <span>
                        {owned.has(item.id) ? "Owned" : `${item.price} coins`} ·{" "}
                        {item.financialRole}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="shelf-plank" aria-hidden="true" />
            </section>
          ))}
        </div>
        <div className="aparador-base" aria-hidden="true" />
      </div>
      <p className="text-center text-xs text-ink-muted mt-4">
        Choose a treasure to read its story, pin a goal, or buy.
      </p>
      {selected && (
        <Modal
          onClose={() => {
            if (!busy) setSelected(null);
          }}
          label={`${selected.nameEnglish} details`}
        >
          <div className="collection-detail">
            <button
              disabled={busy}
              className="absolute right-3 top-3 p-2"
              aria-label="Close details"
              onClick={() => setSelected(null)}
            >
              <X size={20} />
            </button>
            <CollectibleArt item={selected} className="detail-art" />
            <p className="text-xs text-cocoa">
              {selected.rarity} · {selected.price} coins
            </p>
            <h2 className="text-xl font-bold mt-2">{selected.nameEnglish}</h2>
            <p lang="fil" className="text-sm text-cocoa">
              {selected.nameFilipino}
            </p>
            <p
              className={`financial-role role-${selected.financialRole.toLowerCase()}`}
            >
              {selected.financialRole} ·{" "}
              {ROLE_INFO[selected.financialRole].label}
            </p>
            <p className="text-sm text-left leading-relaxed my-4">
              {selected.culturalStory}
            </p>
            <div className="role-lesson">
              <p>{ROLE_INFO[selected.financialRole].lesson}</p>
              <strong>
                {selected.financialRole === "Want" && !selected.wearable
                  ? "A cultural treat to enjoy in your cabinet."
                  : ROLE_INFO[selected.financialRole].perk}
              </strong>
              {selected.financialRole === "Reserve" && (
                <small>Shields protect missed days · hold up to 3.</small>
              )}
            </div>
            {!owned.has(selected.id) && (
              <div className="shop-actions">
                <button
                  disabled={busy || (currentUser?.coins ?? 0) < selected.price}
                  className="btn-flame w-full py-3 text-sm"
                  onClick={() =>
                    void act(
                      () => purchaseCollectible(selected.id),
                      `${selected.nameEnglish} is yours!`,
                    )
                  }
                >
                  <Coins size={16} />
                  {busy ? "Saving…" : `Buy for ${selected.price} coins`}
                </button>
                {(currentUser?.coins ?? 0) < selected.price && (
                  <p className="text-xs text-ink-muted">
                    {selected.price - (currentUser?.coins ?? 0)} more Wallet
                    coins to go. Collect your Alkansya on Sunday.
                  </p>
                )}
                <button
                  disabled={busy}
                  className="btn-ghost w-full py-3 text-sm"
                  onClick={() =>
                    void act(
                      () =>
                        pinGoal(
                          progress.targetGoal === selected.id
                            ? null
                            : selected.id,
                        ),
                      "Savings goal updated.",
                    )
                  }
                >
                  <Pin size={16} />
                  {progress.targetGoal === selected.id
                    ? "Unpin savings goal"
                    : "Pin as my savings goal"}
                </button>
              </div>
            )}
            {selected.wearable && owned.has(selected.id) && (
              <button
                disabled={busy}
                className="btn-flame w-full text-sm py-3"
                onClick={() =>
                  void act(
                    () =>
                      setEquippedLook(
                        equippedLook === selected.id ? null : selected.id,
                      ),
                    "Hestia’s look is saved.",
                  )
                }
              >
                <Shirt size={16} />
                {busy
                  ? "Saving…"
                  : equippedLook === selected.id
                    ? "Remove this look"
                    : "Wear on Hestia"}
              </button>
            )}
            {owned.has(selected.id) && !selected.wearable && (
              <p className="text-sm font-bold">In your collection</p>
            )}
            {error && (
              <p role="alert" className="text-sm text-red-800 mt-3">
                {error}
              </p>
            )}
            {notice && (
              <p role="status" className="text-sm mt-3">
                {notice}
              </p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
