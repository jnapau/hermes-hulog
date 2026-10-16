import { HestiaLook } from './HestiaLook';
import { useAuth } from '../lib/users';
import { COLLECTIBLE_BY_ID } from '../data/collectibles';

export type HestiaPose = 'idle' | 'thinking' | 'working' | 'ok' | 'done' | 'paused' | 'hero';

interface HestiaMascotProps {
  pose?: HestiaPose;
  height?: number;
  alt?: string;
  className?: string;
  eager?: boolean;
  showLookBadge?: boolean;
}

export function HestiaMascot({
  pose = 'idle',
  height = 140,
  alt = 'Hestia Mascot',
  className = '',
  eager = false,
  showLookBadge = true,
}: HestiaMascotProps) {
  const { equippedLook } = useAuth();
  const currentLook = equippedLook ? COLLECTIBLE_BY_ID[equippedLook] : null;
  const src = `/mascots/hestia-${pose}.webp`;

  const isAswang = currentLook?.lookType === 'aswang';

  return (
    <div className="relative inline-flex flex-col items-center">
      {/* Mystical glow if an aswang look is equipped */}
      {isAswang && (
        <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl pointer-events-none anim-pulse" />
      )}

      {/* Main Mascot Visual */}
      <img
        src={src}
        alt={alt}
        width={height}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        className={`select-none object-contain transition-transform ${isAswang ? 'drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]' : ''} ${className}`}
        style={{ maxHeight: height }}
      />

      {currentLook && <HestiaLook id={currentLook.id}/>}
      {/* Floating look badge showing the equipped costume or aswang form */}
      {showLookBadge && currentLook && (
        <div className="absolute -bottom-2 z-10 flex items-center gap-1 rounded-full border border-amber-300 bg-white/95 px-2.5 py-0.5 text-[10px] font-black text-cocoa shadow-md backdrop-blur-xs">
          <span>{currentLook.emoji}</span>
          <span className="truncate max-w-[140px]">{currentLook.nameFilipino}</span>
        </div>
      )}
    </div>
  );
}
