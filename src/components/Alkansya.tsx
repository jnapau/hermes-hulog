import { useId } from "react";
interface AlkansyaProps {
  fillPercentage?: number; // 0 to 100
  animated?: boolean;
  className?: string;
}

export function Alkansya({
  fillPercentage = 25,
  animated = false,
  className = "",
}: AlkansyaProps) {
  const uid = useId().replace(/:/g, "");
  const clampedFill = Math.min(100, Math.max(0, fillPercentage));
  const fillHeight = (clampedFill / 100) * 110;

  return (
    <div
      className={`relative flex flex-col items-center justify-center ${className}`}
    >
      <svg
        role="img"
        aria-label="Your bamboo coin bank"
        viewBox="0 0 160 210"
        className="w-36 h-48 drop-shadow-md select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={`${uid}-bambooBody`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#705029" />
            <stop offset="25%" stopColor="#bd944e" />
            <stop offset="70%" stopColor="#e3bf77" />
            <stop offset="100%" stopColor="#76502a" />
          </linearGradient>

          <linearGradient
            id={`${uid}-rimGrad`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#8b6335" />
            <stop offset="50%" stopColor="#efcf8a" />
            <stop offset="100%" stopColor="#99652b" />
          </linearGradient>

          <linearGradient
            id={`${uid}-goldCoinGrad`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="50%" stopColor="#F5A524" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <clipPath id={`${uid}-innerBodyClip`}>
            <rect x="25" y="38" width="110" height="135" rx="10" />
          </clipPath>
          <clipPath id={`${uid}-slotLip`}>
            <rect x="0" y="-70" width="160" height="109" />
          </clipPath>
        </defs>

        <g className={animated ? "bamboo-bounce" : ""}>
          {/* Alkansya Body */}
          <rect
            x="25"
            y="38"
            width="110"
            height="135"
            rx="12"
            fill={`url(#${uid}-bambooBody)`}
          />

          {Array.from({ length: 9 }, (_, i) => (
            <path
              key={i}
              d={`M${32 + i * 12} 45 Q${28 + i * 12} 100 ${34 + i * 12} 170`}
              stroke="#6e4a25"
              strokeWidth="0.7"
              opacity="0.35"
            />
          ))}
          <rect
            x="25"
            y="69"
            width="110"
            height="9"
            rx="3"
            fill={`url(#${uid}-rimGrad)`}
          />
          <rect
            x="25"
            y="144"
            width="110"
            height="9"
            rx="3"
            fill={`url(#${uid}-rimGrad)`}
          />
          {/* Bamboo Nodes / Rings */}
          <line
            x1="25"
            y1="85"
            x2="135"
            y2="85"
            stroke="#374E18"
            strokeWidth="2.5"
            opacity="0.6"
          />
          <line
            x1="25"
            y1="135"
            x2="135"
            y2="135"
            stroke="#374E18"
            strokeWidth="2.5"
            opacity="0.6"
          />

          {/* Inner Coins Window / Translucent Level */}
          <g clipPath={`url(#${uid}-innerBodyClip)`}>
            {/* Glass window background */}
            <rect
              x="40"
              y="50"
              width="80"
              height="110"
              rx="8"
              fill="#1E2E0D"
              fillOpacity="0.45"
            />

            {/* Liquid / Coin Fill Level */}
            <rect
              x="40"
              y={160 - fillHeight}
              width="80"
              height={fillHeight}
              fill={`url(#${uid}-goldCoinGrad)`}
              fillOpacity="0.85"
              className="transition-all duration-700 ease-out"
            />

            {/* Coin details rendered inside */}
            {clampedFill > 10 && (
              <g opacity="0.7">
                <circle
                  cx="65"
                  cy="145"
                  r="7"
                  fill="#FFEAA7"
                  stroke="#D97706"
                  strokeWidth="1.5"
                />
                <circle
                  cx="85"
                  cy="148"
                  r="8"
                  fill="#FFD43B"
                  stroke="#B45309"
                  strokeWidth="1.5"
                />
                <circle
                  cx="102"
                  cy="144"
                  r="6"
                  fill="#FFEAA7"
                  stroke="#D97706"
                  strokeWidth="1.5"
                />
              </g>
            )}
            {clampedFill > 35 && (
              <g opacity="0.75">
                <circle
                  cx="55"
                  cy="125"
                  r="7"
                  fill="#FFD43B"
                  stroke="#B45309"
                  strokeWidth="1.5"
                />
                <circle
                  cx="78"
                  cy="122"
                  r="8"
                  fill="#FFEAA7"
                  stroke="#D97706"
                  strokeWidth="1.5"
                />
                <circle
                  cx="98"
                  cy="126"
                  r="7"
                  fill="#FFD43B"
                  stroke="#B45309"
                  strokeWidth="1.5"
                />
              </g>
            )}
            {clampedFill > 65 && (
              <g opacity="0.8">
                <circle
                  cx="68"
                  cy="98"
                  r="7.5"
                  fill="#FFEAA7"
                  stroke="#D97706"
                  strokeWidth="1.5"
                />
                <circle
                  cx="90"
                  cy="100"
                  r="7.5"
                  fill="#FFD43B"
                  stroke="#B45309"
                  strokeWidth="1.5"
                />
              </g>
            )}

            {/* Glass sheen highlight */}
            {animated && (
              <g
                className="bank-landing-coin"
                style={
                  {
                    "--landing": `${Math.max(62, 151 - fillHeight)}px`,
                  } as React.CSSProperties
                }
              >
                <circle
                  cx="80"
                  cy="0"
                  r="7"
                  fill={`url(#${uid}-goldCoinGrad)`}
                  stroke="#fff0ab"
                  strokeWidth="1.5"
                />
                <text
                  x="80"
                  y="3"
                  textAnchor="middle"
                  fill="#946021"
                  fontSize="8"
                  fontWeight="bold"
                >
                  ₱
                </text>
              </g>
            )}
            <path
              d="M 45 52 L 65 52 L 45 155 Z"
              fill="#FFFFFF"
              fillOpacity="0.15"
            />
          </g>

          {/* Top Rim & Coin Slit */}
          <ellipse
            cx="80"
            cy="38"
            rx="55"
            ry="14"
            fill={`url(#${uid}-rimGrad)`}
            stroke="#5A3E1B"
            strokeWidth="2"
          />
          <ellipse cx="80" cy="38" rx="42" ry="8" fill="#5A3E1B" />
          {/* Slit */}
          <rect x="62" y="35" width="36" height="5.5" rx="2.5" fill="#1C1309" />
          {animated && (
            <>
              <ellipse
                cx="80"
                cy="38"
                rx="24"
                ry="5"
                fill="none"
                stroke="#ffe7a0"
                strokeWidth="3"
                className="slot-glow"
              />
              <g clipPath={`url(#${uid}-slotLip)`}>
                <g className="peso-flight">
                  <g className="peso-spin">
                    <circle cx="82" cy="0" r="12" fill="#a96819" />
                    <circle
                      cx="80"
                      cy="0"
                      r="12"
                      fill={`url(#${uid}-goldCoinGrad)`}
                      stroke="#fff0a3"
                      strokeWidth="1.4"
                    />
                    <circle
                      cx="80"
                      cy="0"
                      r="9"
                      fill="none"
                      stroke="#bb802c"
                      strokeDasharray="1 1.6"
                    />
                    <text
                      x="80"
                      y="5"
                      textAnchor="middle"
                      fontSize="16"
                      fontWeight="bold"
                      fill="#85551d"
                    >
                      ₱
                    </text>
                  </g>
                </g>
              </g>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <circle
                  key={i}
                  cx="80"
                  cy="38"
                  r="2"
                  fill="#ffdf75"
                  className="slot-spark"
                  style={
                    {
                      "--dx": `${Math.cos((i * Math.PI) / 3) * 29}px`,
                      "--dy": `${Math.sin((i * Math.PI) / 3) * 15 - 12}px`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </>
          )}

          {/* Bottom Base */}
          <ellipse
            cx="80"
            cy="173"
            rx="55"
            ry="12"
            fill={`url(#${uid}-rimGrad)`}
            stroke="#5A3E1B"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}
