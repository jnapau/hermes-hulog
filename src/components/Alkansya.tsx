interface AlkansyaProps {
  fillPercentage?: number; // 0 to 100
  animated?: boolean;
  className?: string;
}

export function Alkansya({ fillPercentage = 25, animated = false, className = '' }: AlkansyaProps) {
  const clampedFill = Math.min(100, Math.max(0, fillPercentage));
  const fillHeight = (clampedFill / 100) * 110;

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 160 210"
        className="w-36 h-48 drop-shadow-md select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bambooBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4A6523" />
            <stop offset="25%" stopColor="#7FA145" />
            <stop offset="70%" stopColor="#8EAF50" />
            <stop offset="100%" stopColor="#445D1F" />
          </linearGradient>

          <linearGradient id="rimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9E7843" />
            <stop offset="50%" stopColor="#B68E56" />
            <stop offset="100%" stopColor="#7E5D30" />
          </linearGradient>

          <linearGradient id="goldCoinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="50%" stopColor="#F5A524" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <clipPath id="innerBodyClip">
            <rect x="25" y="38" width="110" height="135" rx="10" />
          </clipPath>
        </defs>

        {/* Alkansya Body */}
        <rect x="25" y="38" width="110" height="135" rx="12" fill="url(#bambooBody)" />

        {/* Bamboo Nodes / Rings */}
        <line x1="25" y1="85" x2="135" y2="85" stroke="#374E18" strokeWidth="2.5" opacity="0.6" />
        <line x1="25" y1="135" x2="135" y2="135" stroke="#374E18" strokeWidth="2.5" opacity="0.6" />

        {/* Inner Coins Window / Translucent Level */}
        <g clipPath="url(#innerBodyClip)">
          {/* Glass window background */}
          <rect x="40" y="50" width="80" height="110" rx="8" fill="#1E2E0D" fillOpacity="0.45" />

          {/* Liquid / Coin Fill Level */}
          <rect
            x="40"
            y={160 - fillHeight}
            width="80"
            height={fillHeight}
            fill="url(#goldCoinGrad)"
            fillOpacity="0.85"
            className="transition-all duration-700 ease-out"
          />

          {/* Coin details rendered inside */}
          {clampedFill > 10 && (
            <g opacity="0.7">
              <circle cx="65" cy="145" r="7" fill="#FFEAA7" stroke="#D97706" strokeWidth="1.5" />
              <circle cx="85" cy="148" r="8" fill="#FFD43B" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="102" cy="144" r="6" fill="#FFEAA7" stroke="#D97706" strokeWidth="1.5" />
            </g>
          )}
          {clampedFill > 35 && (
            <g opacity="0.75">
              <circle cx="55" cy="125" r="7" fill="#FFD43B" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="78" cy="122" r="8" fill="#FFEAA7" stroke="#D97706" strokeWidth="1.5" />
              <circle cx="98" cy="126" r="7" fill="#FFD43B" stroke="#B45309" strokeWidth="1.5" />
            </g>
          )}
          {clampedFill > 65 && (
            <g opacity="0.8">
              <circle cx="68" cy="98" r="7.5" fill="#FFEAA7" stroke="#D97706" strokeWidth="1.5" />
              <circle cx="90" cy="100" r="7.5" fill="#FFD43B" stroke="#B45309" strokeWidth="1.5" />
            </g>
          )}

          {/* Glass sheen highlight */}
          <path d="M 45 52 L 65 52 L 45 155 Z" fill="#FFFFFF" fillOpacity="0.15" />
        </g>

        {/* Top Rim & Coin Slit */}
        <ellipse cx="80" cy="38" rx="55" ry="14" fill="url(#rimGrad)" stroke="#5A3E1B" strokeWidth="2" />
        <ellipse cx="80" cy="38" rx="42" ry="8" fill="#5A3E1B" />
        {/* Slit */}
        <rect x="62" y="35" width="36" height="5.5" rx="2.5" fill="#1C1309" />

        {/* Bottom Base */}
        <ellipse cx="80" cy="173" rx="55" ry="12" fill="url(#rimGrad)" stroke="#5A3E1B" strokeWidth="2" />
      </svg>

      {/* Optional Dropping Coin Animation */}
      {animated && (
        <div className="absolute top-0 anim-coin-drop pointer-events-none">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-amber-600 shadow-md flex items-center justify-center font-bold text-cocoa text-xs">
            ₱
          </div>
        </div>
      )}
    </div>
  );
}
