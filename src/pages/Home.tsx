import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, CheckCircle2, X } from "lucide-react";
import {
  useProgress,
  canBasag,
  doBasag,
  currentStreak,
} from "../lib/progress";
import { todayPH, weekStart, addDays, DAY_SHORT } from "../lib/date";
import { HestiaMascot } from "../components/HestiaMascot";
import { Alkansya } from "../components/Alkansya";
import { Modal } from "../components/Modal";
import { CollectibleArt } from "../components/CollectibleArt";
import { playBasag } from "../lib/sound";
import { COLLECTIBLE_BY_ID } from "../data/collectibles";
import { useAuth } from "../lib/users";
import { AuthModal } from "../components/AuthModal";
import { activeSequenceDay } from "../lib/dailyQuestions";

export default function Home() {
  const progress = useProgress(),
    { currentUser, ownedIds, loading } = useAuth(),
    today = todayPH();
  const isAdmin = currentUser?.is_admin === true;
  const played = !isAdmin && Boolean(progress.plays[today]);
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
        <div className="sanctuary-scene">
          <Alkansya
            fillPercentage={Math.min(100, (progress.alkansyaCoins / 63) * 100)}
          />
          <HestiaMascot pose={played ? "done" : "idle"} height={112} />
        </div>
        {played ? (
          <>
            <p className="drop-complete">
              <CheckCircle2 size={18} />
              Daily drop complete.
            </p>
            {!progress.plays[today]?.hakbang && (
              <Link to="/play" className="btn-flame sanctuary-cta">
                Finish Isang Hakbang · +5 coins
              </Link>
            )}
          </>
        ) : (
          <Link to="/play" className="btn-flame sanctuary-cta">
            <Play size={18} />
            <span>{isAdmin ? 'Practice any day · Days 1–365' : `Day ${activeSequenceDay(today, progress.plays)} · Today’s daily drop`}</span>
          </Link>
        )}
        <dl className="player-stats">
          <div>
            <dt>Alkansya</dt>
            <dd>{progress.alkansyaCoins} coins</dd>
          </div>
          <div>
            <dt>Wallet</dt>
            <dd>{currentUser.coins} coins</dd>
          </div>
          <div>
            <dt>Streak</dt>
            <dd>{currentStreak(progress, today)} days</dd>
          </div>
        </dl>
        {goal && !ownedIds.includes(goal.id) ? (
          <Link className="savings-goal" to="/koleksyon">
            <CollectibleArt item={goal} />
            <div>
              <strong>
                Saving for: {goal.nameEnglish} ·{" "}
                {Math.min(
                  goal.price,
                  currentUser.coins + progress.alkansyaCoins,
                )}
                /{goal.price} coins
              </strong>
              <progress
                max={goal.price}
                value={currentUser.coins + progress.alkansyaCoins}
                aria-label={`Saving for ${goal.nameEnglish}`}
              />
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
        {ready && (
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
        )}
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
