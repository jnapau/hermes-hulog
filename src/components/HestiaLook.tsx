import { useId } from "react";
/** Garments use Hestia's 160 × 192 body coordinate system. */
export function HestiaLook({
  id,
  layer = "front",
}: {
  id: string;
  layer?: "back" | "front";
}) {
  const uid = useId().replace(/:/g, "");
  const has = (s: string) => id.includes(s);
  const barong = has("barong"),
    terno = has("terno"),
    clara = has("barot"),
    tboli = has("tboli"),
    inaul = has("inaul"),
    kalinga = has("kalinga"),
    yakan = has("yakan"),
    kimona = has("salakot"),
    katip = has("katipunero");
  const color =
    barong || kimona
      ? "#f7e8c6"
      : inaul
        ? "#754491"
        : tboli
          ? "#34292a"
          : kalinga
            ? "#9b3035"
            : yakan
              ? "#284a78"
              : clara
                ? "#287f85"
                : terno
                  ? "#b83d57"
                  : "#476d65";
  return (
    <svg
      viewBox="0 0 160 192"
      className={`hestia-costume hestia-${layer}`}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`${uid}-weave`}
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 6L6 0 12 6 6 12Z"
            fill="none"
            stroke="#e9b65f"
            strokeWidth="1.3"
          />
          <path d="M6 3V9M3 6H9" stroke="#e6ca9d" strokeWidth=".7" />
        </pattern>
        <clipPath id={`${uid}-body`}>
          <path d="M20 122Q80 132 140 122L145 165Q130 181 80 177Q30 181 15 165Z" />
        </clipPath>
      </defs>
      {layer === "back" ? (
        <>
          {has("manananggal") && (
            <g fill="#483456" stroke="#ba8cae" strokeWidth="1.4">
              <path d="M45 104Q10 48 2 83L0 133Q14 114 28 139Q30 118 49 138Z" />
              <path d="M115 104Q150 48 158 83L160 133Q146 114 132 139Q130 118 111 138Z" />
              <path d="M4 85L42 121M156 85L118 121" fill="none" />
            </g>
          )}
          {has("diwata") && (
            <g fill="none" stroke="#6d995d" strokeWidth="3">
              <ellipse cx="80" cy="91" rx="73" ry="78" />
              {Array.from({ length: 10 }, (_, i) => (
                <g key={i} transform={`rotate(${i * 36} 80 91)`}>
                  <path d="M80 13Q61 3 67 23Q75 33 80 13" fill="#719d66" />
                  <circle
                    cx="85"
                    cy="17"
                    r="6"
                    fill="#f8c5c5"
                    stroke="#fff1bf"
                    strokeWidth="2"
                  />
                </g>
              ))}
            </g>
          )}
          {has("bakunawa") && (
            <>
              <path
                d="M122 167C181 142 157 55 135 77C111 102 171 109 145 142C121 176 35 193 10 151Q-5 130 15 120"
                fill="none"
                stroke="#1f6b75"
                strokeWidth="17"
              />
              <path
                d="M122 167C181 142 157 55 135 77"
                fill="none"
                stroke="#93c8b4"
                strokeWidth="3"
              />
              {[24, 80, 135].map((x, i) => (
                <circle
                  key={x}
                  cx={x}
                  cy={20 + (i % 2) * 8}
                  r={8 - i}
                  fill="#f3dda1"
                />
              ))}
            </>
          )}
          {has("kapre") && (
            <g fill="none" strokeLinecap="round">
              <path
                d="M19 164C-6 122 28 110 12 77S33 23 43 53M140 169C165 137 131 105 150 68S119 20 120 49"
                stroke="#678261"
                strokeWidth="13"
                opacity=".55"
              />
              <path
                d="M14 164Q-4 90 30 68M147 166Q164 102 134 62"
                stroke="#b3c39a"
                strokeWidth="4"
                opacity=".7"
              />
            </g>
          )}
        </>
      ) : (
        <>
          {id.startsWith("damit-") && (
            <g stroke="#704b32" strokeWidth="1.4">
              {terno && (
                <path
                  d="M26 129Q-1 110 14 103Q35 99 47 130M134 129Q161 110 146 103Q125 99 113 130"
                  fill={color}
                />
              )}
              {(clara || kimona) && (
                <path
                  d="M31 124L15 139 34 153 48 135M129 124L145 139 126 153 112 135"
                  fill="#f4e4bc"
                />
              )}
              <path
                d="M20 124Q80 133 140 124L145 165Q130 181 80 177Q30 181 15 165Z"
                fill={color}
              />
              {(tboli || inaul || kalinga || yakan) && (
                <path
                  d="M20 124Q80 133 140 124L145 165Q130 181 80 177Q30 181 15 165Z"
                  fill={`url(#${uid}-weave)`}
                />
              )}
              {barong && (
                <>
                  <path
                    d="M63 125L80 139 97 125 91 143 80 139 69 143Z"
                    fill="#fff7e0"
                  />
                  <path d="M80 139V177" stroke="#ba9c65" />
                  {[147, 157, 167].map((y) => (
                    <circle key={y} cx="84" cy={y} r="1.5" fill="#b79352" />
                  ))}
                  <path
                    d="M47 143q12-12 21 1M94 143q12-12 21 1M45 151q12-12 21 1M96 151q12-12 21 1"
                    fill="none"
                    stroke="#c2a66e"
                  />
                </>
              )}
              {clara && (
                <path
                  d="M35 123L80 145 125 123 115 146 80 154 45 146Z"
                  fill="#fff1d1"
                />
              )}
              {terno && (
                <>
                  <path
                    d="M80 139V176M45 140L36 173M115 140L124 173"
                    stroke="#efb4b2"
                  />
                  {[46, 67, 90, 112].map((x) => (
                    <path key={x} d={`M${x} 157l4-4 4 4-4 4Z`} fill="#e7bd78" />
                  ))}
                </>
              )}
              {inaul && (
                <path d="M37 124L134 158 129 170 22 137Z" fill="#e7b54b" />
              )}
              {tboli &&
                [38, 55, 72, 89, 106, 123].map((x) => (
                  <g key={x}>
                    <path d={`M${x} 163v8`} stroke="#e4b444" />
                    <circle cx={x} cy="173" r="3" fill="#e4b444" />
                  </g>
                ))}
              {kalinga && (
                <path
                  d="M21 143H140M20 150H142M20 162H143"
                  stroke="#243850"
                  strokeWidth="5"
                />
              )}
            </g>
          )}
          {has("tikbalang") && (
            <g stroke="#80562b" strokeWidth="2" fill="#e8b951">
              <path d="M42 57L34 22 53 34 68 23 80 41 93 23 109 34 126 22 117 57 107 44 98 59 83 44 68 58 55 44Z" />
              <path d="M39 31L43 46M121 31L116 46" stroke="#be7751" />
            </g>
          )}
          {kimona && (
            <g fill="#caa062" stroke="#80592e" strokeWidth="2">
              <path d="M15 62Q80 4 145 62Q80 79 15 62Z" />
              <path d="M80 22L44 68M80 22L116 68M80 22V72" fill="none" />
              <path d="M34 59Q80 43 126 59" fill="none" />
            </g>
          )}
          {has("nuno") && (
            <>
              <path
                d="M18 60Q41 8 121 30Q119 66 18 60Z"
                fill="#638553"
                stroke="#395a39"
                strokeWidth="2"
              />
              <path
                d="M29 56L111 33M59 48L66 29M82 41L96 50"
                fill="none"
                stroke="#a0b67a"
              />
              <path
                d="M51 115Q80 132 109 115L102 143 92 137 80 157 68 137 58 143Z"
                fill="#f4e7cf"
                stroke="#b4a58a"
              />
            </>
          )}
          {has("sirena") && (
            <g stroke="#d9a36c" strokeWidth="2">
              <path
                d="M39 61L44 37 55 53 69 27 80 49 95 28 105 54 119 38 121 62"
                fill="none"
                stroke="#d27974"
                strokeWidth="5"
              />
              {[45, 62, 80, 98, 115].map((x, i) => (
                <circle
                  key={x}
                  cx={x}
                  cy={61 - Math.sin((i / 4) * Math.PI) * 9}
                  r="4"
                  fill="#fff1d9"
                />
              ))}
            </g>
          )}
          {katip && (
            <>
              <path
                d="M33 59Q80 43 127 59L124 72Q80 57 36 72Z"
                fill="#b63035"
              />
              <path d="M123 65L151 88 132 84 133 103 114 70" fill="#b63035" />
            </>
          )}
          {has("tiyanak") && (
            <g fill="#6c9a4c" stroke="#3a6343" strokeWidth="2">
              <path d="M32 64L19 38 51 52M109 52L141 38 128 64" />
              <path
                d="M65 113L69 121 73 113M87 113L91 121 95 113"
                fill="#fff3d2"
              />
            </g>
          )}
          {has("diwata") && (
            <g fill="#f3b7c1" stroke="#fff1bb" strokeWidth="2">
              {[42, 62, 82, 102, 122].map((x, i) => (
                <circle
                  key={x}
                  cx={x}
                  cy={53 - Math.sin((i / 4) * Math.PI) * 12}
                  r="6"
                />
              ))}
            </g>
          )}
          {has("bakunawa") && (
            <path
              d="M39 59L32 37 54 47 65 32 80 45 97 32 109 47 128 37 121 59"
              fill="#468b8b"
              stroke="#d6c785"
              strokeWidth="2"
            />
          )}
          {has("manananggal") && (
            <path
              d="M30 132L80 147 130 132 119 173 80 164 41 173Z"
              fill="#483456"
              stroke="#ba8cae"
              strokeWidth="2"
            />
          )}
          {has("kapre") && (
            <path
              d="M27 136Q44 118 54 135Q72 123 83 138Q100 125 114 139L133 135 135 170Q83 188 26 170Z"
              fill="#527344"
              stroke="#a0b67a"
              strokeWidth="2"
            />
          )}
        </>
      )}
    </svg>
  );
}
