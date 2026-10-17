import { HestiaLook } from "./HestiaLook";
import { useAuth } from "../lib/users";
import { COLLECTIBLE_BY_ID } from "../data/collectibles";
export type HestiaPose =
  | "idle"
  | "thinking"
  | "working"
  | "ok"
  | "done"
  | "paused"
  | "hero";
interface Props {
  pose?: HestiaPose;
  height?: number;
  alt?: string;
  className?: string;
  eager?: boolean;
  showLookBadge?: boolean;
}
export function HestiaMascot({
  pose = "idle",
  height = 140,
  alt = "Hestia",
  className = "",
  eager = true,
  showLookBadge = false,
}: Props) {
  const { equippedLook } = useAuth();
  const look = equippedLook ? COLLECTIBLE_BY_ID[equippedLook] : null;
  return (
    <div
      className={`hestia-stage ${className}`}
      style={{ height, width: (height * 160) / 192 }}
      role="img"
      aria-label={`${alt}${look ? `, wearing ${look.nameEnglish}` : ""}`}
    >
      {look && <HestiaLook id={look.id} layer="back" />}
      <img
        src={`/mascots/hestia-${pose}.webp`}
        alt=""
        loading={eager ? "eager" : "lazy"}
        draggable={false}
      />
      {look && <HestiaLook id={look.id} />}
      {showLookBadge && look && (
        <span className="hestia-look-caption">{look.nameFilipino}</span>
      )}
    </div>
  );
}
