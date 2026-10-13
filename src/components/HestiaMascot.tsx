export type HestiaPose = 'idle' | 'thinking' | 'working' | 'ok' | 'done' | 'paused' | 'hero';

interface HestiaMascotProps {
  pose?: HestiaPose;
  height?: number;
  alt?: string;
  className?: string;
  eager?: boolean;
}

export function HestiaMascot({
  pose = 'idle',
  height = 140,
  alt = 'Hestia Mascot',
  className = '',
  eager = false,
}: HestiaMascotProps) {
  const src = `/mascots/hestia-${pose}.webp`;

  return (
    <img
      src={src}
      alt={alt}
      width={height}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      className={`select-none object-contain ${className}`}
      style={{ maxHeight: height }}
    />
  );
}
