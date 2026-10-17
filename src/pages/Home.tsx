import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, CheckCircle2, X } from "lucide-react";
import {
  useProgress,
  canBasag,
  doBasag,
  currentStreak,
  heritageRank,
} from "../lib/progress";
import { todayPH, weekStart, addDays, DAY_SHORT, dayOfWeek } from "../lib/date";
import { getDaySchedule } from "../lib/schedule";
import { HestiaMascot } from "../components/HestiaMascot";
import { Alkansya } from "../components/Alkansya";
import { Modal } from "../components/Modal";
import { CollectibleArt } from "../components/CollectibleArt";
import { playBasag } from "../lib/sound";
import { COLLECTIBLE_BY_ID, COLLECTIBLES } from "../data/collectibles";
import { useAuth } from "../lib/users";
import { AuthModal } from "../components/AuthModal";
export default function Home() {
  const progress = useProgress(),
    { currentUser, ownedIds, loading } = useAuth(),
    today = todayPH();
  const played = Boolean(progress.plays[today]),
    schedule = getDaySchedule(today);
  const [claiming, setClaiming] = useState(false),
    [reward, setReward] = useState<{
      saved: number;
      passive: number;
      total: number;
    } | null>(null),
    [error, setError] = useState("");
  const week = Array.from({ length: 7 }, (_, i) =>
      addDays(weekStart(today), i),
    ),
    ready = canBasag(progress, today);
  const goal = progress.targetGoal
    ? COLLECTIBLE_BY_ID[progress.targetGoal]
    : null;
  const passive = Math.min(
      6,
      COLLECTIBLES.filter(
        (c) => c.financialRole === "Asset" && ownedIds.includes(c.id),
      ).length,
    ),
    rank = heritageRank(ownedIds);
  if (loading)
    return (
      <p role="status" className="p-8 text-center">
        Loading your sanctuary…
      </p>
    );
  if (!currentUser)
    return (
      <div className="landing-auth">
        <HestiaMascot height={100} />
        <AuthModal inline isOpen onClose={() => {}} />
      </div>
    );
  return (
    <div className="home-sanctuary">
      <div className="sanctuary-card">
        <h1>
          {played
            ? "A little wiser, every day."
            : "One small drop. A stronger tomorrow."}
        </h1>
        <p className="text-xs text-ink-muted">
          {schedule
            ? `Hulog #${schedule.hulogNumber} · Three cards, one daily habit`
            : "Your daily money habit"}
        </p>
        <div className="sanctuary-scene">
          <Alkansya
            fillPercentage={Math.min(100, (progress.alkansyaCoins / 63) * 100)}
          />
          <HestiaMascot pose={played ? "done" : "idle"} height={112} />
        </div>
        <p className="bank-balance">
          <strong>{progress.alkansyaCoins} coins</strong> inside your Alkansya
        </p>
        {played ? (
          <>
            <p className="drop-complete">
              <CheckCircle2 size={18} />
              Daily drop complete.
            </p>
            {!progress.plays[today].hakbang && (
              <Link to="/play" className="btn-flame sanctuary-cta">
                Finish Isang Hakbang · +5 coins
              </Link>
            )}
          </>
        ) : (
          <Link to="/play" className="btn-flame sanctuary-cta">
            <Play size={18} />
            <span>Today’s daily drop · 3 minutes</span>
          </Link>
        )}
        <dl className="player-stats">
          <div>
            <dt>Spendable Wallet</dt>
            <dd>{currentUser.coins} coins</dd>
          </div>
          <div>
            <dt>Current streak</dt>
            <dd>{currentStreak(progress, today)} days</dd>
          </div>
          <div>
            <dt>Sunday asset bonus</dt>
            <dd>+{passive} coins</dd>
          </div>
        </dl>
        {goal && !ownedIds.includes(goal.id) ? (
          <Link className="savings-goal" to="/koleksyon">
            <CollectibleArt item={goal} />
            <div>
              <strong>Saving for: {goal.nameEnglish}</strong>
              <p>
                {Math.min(
                  goal.price,
                  currentUser.coins + progress.alkansyaCoins,
                )}{" "}
                / {goal.price} coins
              </p>
              <progress
                max={goal.price}
                value={currentUser.coins + progress.alkansyaCoins}
                aria-label={`Saving for ${goal.nameEnglish}`}
              />
              <small>Wallet + bank savings · collect on Sunday to spend</small>
            </div>
          </Link>
        ) : (
          <Link className="goal-link" to="/koleksyon">
            Choose a treasure to save for →
          </Link>
        )}
        <div
          aria-label="Weekly drops, Monday to Sunday"
          className="weekly-tracker"
        >
          {week.map((date, i) => (
            <div
              key={date}
              aria-label={`${date}${progress.plays[date] ? ", completed" : ""}`}
              aria-current={date === today ? "date" : undefined}
            >
              <span>{DAY_SHORT[(i + 1) % 7]}</span>
              <b className={progress.plays[date] ? "filled" : ""}>
                {progress.plays[date] ? "₱" : "·"}
              </b>
            </div>
          ))}
        </div>
        {ready ? (
          <button
            disabled={claiming}
            className="weekly-reward"
            onClick={async () => {
              setClaiming(true);
              setError("");
              try {
                const payout = await doBasag(today);
                if (payout) {
                  playBasag(progress.sound);
                  setReward(payout);
                }
              } catch (e) {
                setError((e as Error).message);
              } finally {
                setClaiming(false);
              }
            }}
          >
            {claiming ? "Collecting…" : "Open Alkansya & Collect Coins"}
            <small lang="fil">Buksan ang Alkansya</small>
          </button>
        ) : (
          <p className="bank-help">
            {progress.cashouts[weekStart(today)]
              ? "This week’s coins are in your Wallet. New deposits stay safe until next Sunday."
              : dayOfWeek(today) === 0
                ? "Finish today’s three cards to open your Alkansya."
                : "Your savings carry over. Complete Sunday’s drop to collect."}
          </p>
        )}
        {played && !progress.plays[today].hakbang && ready && (
          <p className="bank-help">
            Tip: finish Isang Hakbang before collecting to include today’s +5.
          </p>
        )}
        <p className="heritage-summary">
          {rank.name} · {rank.worth} Heritage Net Worth · {progress.restTokens}{" "}
          Pahinga shields
        </p>
        {error && (
          <p role="alert" className="text-sm text-red-800">
            {error}
          </p>
        )}
      </div>
      {reward && (
        <Modal onClose={() => setReward(null)} label="Sunday coin payout">
          <div className="collection-detail">
            <button
              className="absolute right-3 top-3 p-2"
              aria-label="Close payout"
              onClick={() => setReward(null)}
            >
              <X size={20} />
            </button>
            <Alkansya fillPercentage={0} />
            <h2 className="text-2xl font-bold">
              +{reward.total} Wallet coins!
            </h2>
            <p lang="fil" className="translation">
              Naipon mo. Gamitin ayon sa iyong layunin.
            </p>
            <dl className="payout-summary">
              <div>
                <dt>Saved in your Alkansya</dt>
                <dd>{reward.saved}</dd>
              </div>
              <div>
                <dt>Productive Asset bonus</dt>
                <dd>+{reward.passive}</dd>
              </div>
              <div>
                <dt>Collected into Wallet</dt>
                <dd>{reward.total}</dd>
              </div>
            </dl>
            <Link to="/koleksyon" className="btn-flame w-full text-sm">
              Visit the Aparador
            </Link>
            <button
              className="btn-ghost w-full mt-2"
              onClick={() => setReward(null)}
            >
              Keep saving
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
