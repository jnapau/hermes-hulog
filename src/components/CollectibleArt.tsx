import { useId, type ReactNode } from "react";
import { COLLECTIBLES, type Collectible } from "../data/collectibles";
import { HestiaLook } from "./HestiaLook";
/** Individually composed vector silhouettes; no emoji or external image dependencies. */
export function CollectibleArt({
  item,
  className = "",
}: {
  item: Collectible;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const id = item.id;
  const gold = `url(#${uid}-gold)`;
  const artwork: Record<string, () => ReactNode> = {
    "sagisag-sampaguita": () => (
      <>
        <path
          d="M61 91Q38 68 64 43M60 75Q82 68 88 52"
          stroke="#50764e"
          strokeWidth="5"
        />
        {[
          [45, 33],
          [76, 48],
          [59, 68],
        ].map(([x, y]) => (
          <g
            key={y}
            transform={`translate(${x} ${y})`}
            fill="#fff6de"
            stroke="#c0ae83"
          >
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse
                key={a}
                cy="-8"
                rx="5"
                ry="10"
                transform={`rotate(${a})`}
              />
            ))}
            <circle r="4" fill="#e4b64d" />
          </g>
        ))}
      </>
    ),
    "sagisag-narra": () => (
      <>
        <path d="M55 98L58 46 72 46 76 98Z" fill="#8f5935" />
        <path d="M63 65L37 40M68 60L94 35" stroke="#8f5935" strokeWidth="7" />
        <path
          d="M18 40Q9 16 36 19Q47-5 66 13Q95-4 104 22Q128 30 107 51Q101 69 78 58Q52 76 41 56Q17 62 18 40"
          fill="#57784b"
        />
        <path
          d="M29 35Q49 18 59 30M73 32Q87 17 100 32"
          fill="none"
          stroke="#88a164"
          strokeWidth="4"
        />
      </>
    ),
    "sagisag-agila": () => (
      <>
        <path
          d="M51 62Q20 66 8 31L46 43 64 33 82 43 120 31Q108 68 77 64L84 92 64 81 45 92Z"
          fill="#714d35"
        />
        <path d="M50 47Q46 22 65 19Q83 19 80 46L67 58Z" fill="#f0dfb4" />
        <path d="M71 37L90 44 71 49" fill="#c9a15b" />
        <circle cx="69" cy="33" r="3" fill="#2a241e" />
        <path d="M20 43L45 54M109 43L84 54" stroke="#b48e64" strokeWidth="3" />
      </>
    ),
    "sagisag-anahaw": () => (
      <>
        <path d="M64 100V49" stroke="#8b6535" strokeWidth="5" />
        <path
          d="M64 63L17 40 19 19 39 29 45 7 62 24 78 7 85 29 108 19 112 41Z"
          fill="#62854e"
          stroke="#355b3a"
          strokeWidth="2"
        />
        {[19, 39, 62, 85, 108].map((x) => (
          <path key={x} d={`M64 63L${x} 25`} stroke="#a0b875" />
        ))}
      </>
    ),
    "sagisag-arnis": () => (
      <g transform="rotate(-15 64 55)" stroke="#70482e" strokeWidth="2">
        <rect x="31" y="7" width="13" height="95" rx="6" fill="#d2a261" />
        <rect x="77" y="7" width="13" height="95" rx="6" fill="#b47c44" />
        {[26, 44, 62, 80].map((y) => (
          <path
            key={y}
            d={`M31 ${y}h13M77 ${y}h13`}
            stroke="#80522f"
            strokeWidth="3"
          />
        ))}
      </g>
    ),
    "sagisag-kalabaw": () => (
      <>
        <path
          d="M24 56Q22 32 71 37L96 48 105 75 91 82 83 63 74 72 71 99H59L56 74 42 73 39 99H27Z"
          fill="#696c66"
        />
        <path
          d="M87 53Q75 42 82 24Q86 43 99 43Q112 42 116 23Q122 46 107 55"
          fill="#ded5b9"
        />
        <ellipse cx="98" cy="62" rx="16" ry="19" fill="#84877c" />
        <path d="M91 72h13" stroke="#3e473e" strokeWidth="3" />
        <circle cx="92" cy="58" r="2" fill="#252d28" />
      </>
    ),
    "sagisag-mangga": () => (
      <>
        <path
          d="M42 29Q84 7 97 39Q112 81 57 95Q23 92 26 63Q26 42 42 29"
          fill={gold}
          stroke="#b47c29"
          strokeWidth="2"
        />
        <path d="M62 27Q51 2 87 7Q86 28 62 27" fill="#62804b" />
        <path
          d="M40 57Q35 73 48 81"
          stroke="#fff0ac"
          strokeWidth="5"
          fill="none"
        />
      </>
    ),
    "sagisag-bahay-kubo": () => (
      <>
        <path d="M25 51H103V89H25Z" fill="#b3814c" />
        <path
          d="M10 53L64 10 118 53Z"
          fill="#c3a165"
          stroke="#715333"
          strokeWidth="3"
        />
        <path d="M31 89V104M97 89V104" stroke="#6c4c32" strokeWidth="5" />
        <path d="M53 61H75V89H53Z" fill="#5d4834" />
        <path d="M31 61H44V74H31M84 61H97V74H84" fill="#e9d49b" />
        <path
          d="M35 42L64 20 93 42"
          fill="none"
          stroke="#e7c78a"
          strokeWidth="3"
        />
      </>
    ),
    "antigo-kawayang-alkansya": () => (
      <>
        <rect
          x="41"
          y="20"
          width="48"
          height="76"
          rx="7"
          fill="#a9a45c"
          stroke="#68703d"
          strokeWidth="2"
        />
        <path d="M42 41H89M42 77H89" stroke="#68703d" strokeWidth="5" />
        <ellipse cx="65" cy="20" rx="24" ry="7" fill="#d5c182" />
        <path d="M54 20H76" stroke="#433d26" strokeWidth="4" />
        <path
          d="M53 32V37M53 48V70M53 84V90"
          stroke="#e4d5a3"
          strokeWidth="3"
        />
      </>
    ),
    "antigo-palayok": () => (
      <>
        <path
          d="M39 36Q21 37 22 66Q22 96 64 98Q106 96 106 66Q107 37 89 36"
          fill="#a45d40"
          stroke="#633e2d"
          strokeWidth="3"
        />
        <ellipse cx="64" cy="35" rx="33" ry="9" fill="#c58155" />
        <path
          d="M35 51Q27 73 44 82"
          stroke="#ddaa75"
          strokeWidth="4"
          fill="none"
        />
        <path d="M53 22Q65 11 77 22L86 29H42Z" fill="#9e573e" />
      </>
    ),
    "antigo-manunggul-jar": () => (
      <>
        <path
          d="M38 42Q28 55 34 85Q35 99 64 100Q93 99 94 85Q100 55 90 42Z"
          fill="#b68561"
          stroke="#785139"
          strokeWidth="2"
        />
        <path
          d="M34 48Q64 27 94 48M35 57Q64 42 93 57M35 73Q64 87 94 73"
          fill="none"
          stroke="#6c503b"
          strokeWidth="3"
        />
        <path d="M34 28Q64 46 94 28L88 41H40Z" fill="#a6714c" />
        {[55, 73].map((x) => (
          <g key={x} fill="#bb9672">
            <circle cx={x} cy="13" r="6" />
            <path d={`M${x - 5} 20h10v14h-10Z`} />
          </g>
        ))}
      </>
    ),
    "antigo-maitum-pottery": () => (
      <>
        <path
          d="M41 43Q21 67 35 93Q64 107 93 93Q107 67 87 43"
          fill="#a77d63"
          stroke="#5d473b"
          strokeWidth="2"
        />
        <path d="M41 40Q33 5 64 6Q95 5 87 40Z" fill="#c19a7b" />
        <path
          d="M45 23L54 20M74 20L83 23M64 23L59 34H69M55 39Q64 44 74 39"
          stroke="#5d473b"
          fill="none"
          strokeWidth="3"
        />
        <path
          d="M36 62Q64 52 92 62M38 83Q64 94 90 83"
          fill="none"
          stroke="#d1ad8b"
          strokeWidth="4"
        />
      </>
    ),
    "antigo-gintong-tara": () => (
      <g fill={gold} stroke="#a77c32" strokeWidth="2">
        <path d="M51 35L48 17 59 21 65 4 73 21 83 17 79 35Z" />
        <circle cx="65" cy="42" r="13" />
        <path d="M53 55L43 79 23 89 39 97H92L107 89 85 79 78 55Z" />
        <path
          d="M51 62L30 68 21 52M79 62L99 68 109 51"
          fill="none"
          strokeWidth="7"
        />
        <path
          d="M47 83L77 94M83 83L53 94"
          fill="none"
          stroke="#fbe4a0"
          strokeWidth="3"
        />
      </g>
    ),
    "antigo-balangay": () => (
      <>
        <path
          d="M9 71Q64 88 119 65L100 95Q62 110 25 92Z"
          fill="#905c39"
          stroke="#593d2a"
          strokeWidth="3"
        />
        <path d="M64 19V78M26 44L102 83" stroke="#64442d" strokeWidth="4" />
        <path d="M68 18L68 65 106 60Z" fill="#dfc792" />
        <path
          d="M14 79Q63 95 112 76M25 89Q61 102 102 88"
          fill="none"
          stroke="#c69a62"
          strokeWidth="2"
        />
      </>
    ),
    "antigo-lantaka": () => (
      <g transform="rotate(-18 64 55)">
        <path
          d="M16 38H110V59H16Z"
          fill="#9c874a"
          stroke="#564c32"
          strokeWidth="3"
        />
        <ellipse cx="109" cy="49" rx="8" ry="14" fill="#c0a963" />
        <ellipse cx="111" cy="49" rx="4" ry="8" fill="#403c2a" />
        <path d="M31 38V59M86 38V59" stroke="#dac184" strokeWidth="5" />
        <path d="M61 61V92M41 96H82" stroke="#725739" strokeWidth="8" />
        <path
          d="M46 37Q61 13 78 37"
          stroke="#b79d59"
          strokeWidth="5"
          fill="none"
        />
      </g>
    ),
    "antigo-sungka": () => (
      <g transform="rotate(-12 64 55)">
        <rect
          x="7"
          y="31"
          width="114"
          height="48"
          rx="24"
          fill="#8d5835"
          stroke="#583921"
          strokeWidth="3"
        />
        {[31, 44, 57, 70, 83, 96].flatMap((x) =>
          [44, 64].map((y) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="5" fill="#432e20" />
              <circle cx={x - 1} cy={y - 1} r="1.5" fill="#f0e2bd" />
            </g>
          )),
        )}
        <ellipse cx="18" cy="54" rx="6" ry="12" fill="#432e20" />
        <ellipse cx="110" cy="54" rx="6" ry="12" fill="#432e20" />
      </g>
    ),
    "antigo-laguna-copperplate": () => (
      <>
        <path
          d="M17 19L110 11 114 91 23 101Z"
          fill="#9f8660"
          stroke="#53796a"
          strokeWidth="4"
        />
        {[29, 40, 51, 62, 73, 84].map((y, i) => (
          <path
            key={y}
            d={`M31 ${y}l7-3 3 6 6-8 7 3 5-3 5 5 4-6 8 3 6-3 7 4 9-5`}
            stroke={i % 2 ? "#516b5a" : "#5d503b"}
            fill="none"
            strokeWidth="2"
          />
        ))}
      </>
    ),
    "farm-araro": () => (
      <>
        <path
          d="M17 26L88 77 72 98 108 91 94 74 116 22"
          fill="#9b7047"
          stroke="#5d442d"
          strokeWidth="6"
        />
        <path
          d="M8 22Q25 11 39 25M98 20L124 29"
          fill="none"
          stroke="#b49a68"
          strokeWidth="8"
        />
      </>
    ),
    "farm-bilao": () => (
      <>
        <ellipse
          cx="64"
          cy="58"
          rx="52"
          ry="36"
          fill="#c8a063"
          stroke="#805732"
          strokeWidth="5"
        />
        {[31, 43, 55, 67, 79].map((y) => (
          <path key={y} d={`M22 ${y}H106`} stroke="#a37b46" strokeWidth="2" />
        ))}
        {[28, 40, 52, 64, 76, 88, 100].map((x) => (
          <path key={x} d={`M${x} 28V86`} stroke="#efd093" strokeWidth="2" />
        ))}
      </>
    ),
    "farm-itak": () => (
      <>
        <path
          d="M36 72L81 13Q110 35 56 84Z"
          fill="#c9c9b5"
          stroke="#797e73"
          strokeWidth="3"
        />
        <path
          d="M49 77L27 103 18 97 38 70Z"
          fill="#7b5034"
          stroke="#4e3829"
          strokeWidth="2"
        />
        <path
          d="M65 83L106 36 115 46 77 96Z"
          fill="#b48652"
          stroke="#735230"
          strokeWidth="2"
        />
      </>
    ),
    "farm-karit": () => (
      <>
        <path
          d="M35 64Q8 15 61 11Q112 6 109 57Q88 19 56 37Q42 45 48 65Z"
          fill="#b8c1b5"
          stroke="#5b6b60"
          strokeWidth="3"
        />
        <path
          d="M37 60L49 63 65 101 49 105Z"
          fill="#a47a49"
          stroke="#654c31"
          strokeWidth="3"
        />
      </>
    ),
    "farm-dulos": () => (
      <>
        <path
          d="M50 59L41 85 64 105 87 85 78 59Z"
          fill="#a2b1a3"
          stroke="#5b6b60"
          strokeWidth="3"
        />
        <path d="M60 25H69V76H60Z" fill="#9e7647" />
        <path
          d="M48 10H80V28H48Z"
          fill="none"
          stroke="#6b5034"
          strokeWidth="7"
        />
      </>
    ),
    "farm-kabyawan": () => (
      <>
        <path
          d="M22 95V48H105V95M12 98H116"
          fill="none"
          stroke="#825938"
          strokeWidth="7"
        />
        {[43, 70].map((x) => (
          <rect
            key={x}
            x={x}
            y="37"
            width="16"
            height="46"
            rx="6"
            fill="#b6a07a"
            stroke="#64523c"
            strokeWidth="2"
          />
        ))}
        <path
          d="M50 37V21L99 9M31 88L102 68"
          stroke="#786039"
          strokeWidth="5"
        />
        <path d="M12 61L118 48" stroke="#89a45d" strokeWidth="4" />
      </>
    ),
    "farm-bangko": () => (
      <>
        <path
          d="M14 56L96 40 117 53 34 73Z"
          fill="#bb8f59"
          stroke="#785333"
          strokeWidth="3"
        />
        <path
          d="M34 73V100M105 61V89M22 63V88M90 69V98"
          stroke="#765132"
          strokeWidth="7"
        />
        <path d="M35 57L91 48M48 62L103 53" stroke="#e2b979" strokeWidth="2" />
      </>
    ),
    "farm-bayong": () => (
      <>
        <path
          d="M40 42V27Q64 0 88 27V42"
          fill="none"
          stroke="#89683f"
          strokeWidth="7"
        />
        <path
          d="M23 39H105L96 100H32Z"
          fill="#c29d64"
          stroke="#775a34"
          strokeWidth="3"
        />
        {[51, 63, 75, 87].map((y) => (
          <path key={y} d={`M30 ${y}H98`} stroke="#e6c68d" strokeWidth="4" />
        ))}
        {[40, 53, 66, 79, 92].map((x) => (
          <path key={x} d={`M${x} 42V96`} stroke="#9b793f" strokeWidth="3" />
        ))}
      </>
    ),
    "farm-basnig": () => (
      <>
        <path
          d="M13 20L115 20 98 91Q64 112 30 91Z"
          fill="#bbd0bd"
          fillOpacity=".55"
          stroke="#5a7f70"
          strokeWidth="3"
        />
        {[31, 47, 63, 79, 95].map((x) => (
          <path
            key={x}
            d={`M${x} 20L${128 - x} 96M13 ${x}H113`}
            stroke="#7d9c88"
            strokeWidth="1.5"
          />
        ))}
        <path d="M5 19H123M17 8V39M111 8V39" stroke="#80613c" strokeWidth="5" />
        <path
          d="M53 66Q68 53 79 65L88 58V75L79 69Q64 81 53 66"
          fill="#ae9859"
        />
      </>
    ),
    "farm-habihan": () => (
      <>
        <path
          d="M20 16H108V98H20ZM20 36H108M20 84H108"
          fill="none"
          stroke="#8a5b37"
          strokeWidth="7"
        />
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d={`M${30 + i * 6} 24V92`}
            stroke={i % 3 === 0 ? "#b84748" : "#d9b678"}
            strokeWidth="3"
          />
        ))}
        <path d="M28 56H100V74H28Z" fill="#ae4146" />
        <path d="M30 60L98 70M30 70L98 60" stroke="#e9bb65" strokeWidth="2" />
        <path d="M42 43L91 47 87 54 38 49Z" fill="#71472f" />
      </>
    ),
    "merienda-halo-halo": () => (
      <>
        <path
          d="M34 43H94L84 92H44Z"
          fill="#e8cf9d"
          stroke="#966345"
          strokeWidth="2"
        />
        <path d="M39 65H89L85 84H43Z" fill="#b56787" />
        <path d="M40 78H88M42 87H85" stroke="#f4c568" strokeWidth="6" />
        <path d="M37 43Q33 20 58 24Q66 3 83 24Q104 24 94 45Z" fill="#f2e7ca" />
        <ellipse cx="65" cy="27" rx="18" ry="13" fill="#9273ad" />
        <path d="M89 36L112 8" stroke="#6b9187" strokeWidth="5" />
        <path d="M48 97H80" stroke="#966345" strokeWidth="4" />
        <circle cx="48" cy="50" r="5" fill="#d38455" />
      </>
    ),
    "merienda-taho": () => (
      <>
        <path
          d="M35 23H93L86 98H42Z"
          fill="#e5d2b2"
          stroke="#a38e70"
          strokeWidth="2"
        />
        <path d="M39 46H90L88 61H41Z" fill="#a9653e" />
        <path d="M41 62H89L87 77H42Z" fill="#f7edcf" />
        <path d="M42 80H87L86 96H43Z" fill="#bc834c" />
        {[49, 60, 71, 81].map((x) => (
          <circle key={x} cx={x} cy="88" r="3" fill="#6e4734" />
        ))}
        <path d="M78 33L95 5" stroke="#a78a54" strokeWidth="4" />
        <ellipse cx="64" cy="23" rx="29" ry="6" fill="#fbf0d3" />
      </>
    ),
    "merienda-bibingka": () => (
      <>
        <path d="M10 75Q17 39 69 48L87 78Q44 112 10 75" fill="#688653" />
        <ellipse
          cx="46"
          cy="66"
          rx="31"
          ry="22"
          fill="#d7a74d"
          stroke="#ac7638"
          strokeWidth="3"
        />
        <path d="M29 57L41 51 49 62 36 66Z" fill="#fff0b1" />
        <path d="M38 70L51 63 62 70 49 78Z" fill="#f9e9ab" />
        <path
          d="M69 76L95 28M80 81L108 33M91 85L118 40"
          stroke="#80608e"
          strokeWidth="9"
        />
        <path d="M66 76L116 44" stroke="#e8d7ba" strokeWidth="2" />
      </>
    ),
    "merienda-sorbetes": () => (
      <>
        <path
          d="M21 53H107V85H21Z"
          fill="#b64c44"
          stroke="#734c32"
          strokeWidth="2"
        />
        <path d="M29 56H98V66H29Z" fill="#eac463" />
        <path d="M27 16H101L119 42H9Z" fill="#e2b55c" />
        {[30, 54, 78, 102].map((x) => (
          <path key={x} d={`M${x} 16l9 26h-12Z`} fill="#ad493f" />
        ))}
        <path d="M25 43V53M103 43V53" stroke="#775a3d" strokeWidth="4" />
        {[37, 91].map((x) => (
          <g key={x}>
            <circle cx={x} cy="89" r="13" fill="#4d574b" />
            <circle cx={x} cy="89" r="6" fill="#e7d3a3" />
          </g>
        ))}
        <path d="M48 71H80" stroke="#f8df9f" strokeWidth="4" />
      </>
    ),
    "merienda-pandesal": () => (
      <>
        <ellipse cx="51" cy="84" rx="43" ry="13" fill="#d9d4b8" />
        {[29, 50, 70].map((x, i) => (
          <g key={x}>
            <ellipse
              cx={x}
              cy={69 - (i % 2) * 10}
              rx="17"
              ry="12"
              fill="#d7aa63"
              stroke="#af7e44"
              strokeWidth="2"
            />
            <path
              d={`M${x - 4} ${61 - (i % 2) * 10}l5 9`}
              stroke="#f6d597"
              strokeWidth="3"
            />
          </g>
        ))}
        <path
          d="M83 38H114V69Q99 82 83 69Z"
          fill="#f0dfbe"
          stroke="#997b58"
          strokeWidth="2"
        />
        <path
          d="M114 43Q135 51 114 63"
          fill="none"
          stroke="#b69d78"
          strokeWidth="5"
        />
        <ellipse cx="99" cy="38" rx="15" ry="5" fill="#614331" />
        <path
          d="M92 28Q83 17 94 8M104 27Q113 17 103 8"
          fill="none"
          stroke="#b7a98c"
          strokeWidth="2"
        />
      </>
    ),
    "merienda-turon": () => (
      <>
        <path d="M13 84L104 64 119 82 27 102Z" fill="#698354" />
        {[
          [24, 56, -18],
          [49, 44, 8],
          [70, 53, 22],
        ].map(([x, y, r]) => (
          <g key={x} transform={`rotate(${r} ${x} ${y})`}>
            <rect
              x={x}
              y={y}
              width="20"
              height="44"
              rx="6"
              fill="#d59a42"
              stroke="#9e652e"
              strokeWidth="2"
            />
            <path
              d={`M${x + 4} ${y + 8}l12 24M${x + 14} ${y + 6}l-9 30`}
              stroke="#edbd62"
              strokeWidth="2"
            />
            <circle cx={x + 8} cy={y + 19} r="2" fill="#996034" />
          </g>
        ))}
      </>
    ),
  };
  const moneyIndex = COLLECTIBLES.filter(
    (c) => c.kind === "ph-money",
  ).findIndex((c) => c.id === id);
  let art = artwork[id]?.();
  if (item.kind === "ph-money") {
    if (id.includes("piloncitos"))
      art = (
        <>
          <path
            d="M33 37Q31 8 67 12Q108 17 101 63Q95 98 51 97Q17 89 23 61Z"
            fill={gold}
            stroke="#ac7c32"
            strokeWidth="3"
          />
          <path
            d="M42 37L59 29 62 48 78 33 85 48 67 67 48 61Z"
            stroke="#966326"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M42 80Q71 91 88 63"
            stroke="#ffe1a1"
            strokeWidth="4"
            fill="none"
          />
        </>
      );
    else if (id.includes("1903"))
      art = (
        <>
          <circle
            cx="64"
            cy="55"
            r="43"
            fill="#b5beb5"
            stroke="#69786f"
            strokeWidth="4"
          />
          <circle
            cx="64"
            cy="55"
            r="36"
            fill="#dce0cf"
            stroke="#879387"
            strokeDasharray="2 3"
          />
          <path
            d="M73 66L87 38 103 69H56M40 45L55 39 64 67 48 73 36 61M52 70V87M63 68L71 87"
            fill="#9aa79a"
            stroke="#6f7f71"
            strokeWidth="2"
          />
          <path
            d="M30 33Q39 20 56 19"
            stroke="#fff6d9"
            strokeWidth="4"
            fill="none"
          />
        </>
      );
    else {
      const colors = [
        "#8a7863",
        "#4b7866",
        "#80577c",
        "#a6714d",
        "#49768a",
        "#527d93",
      ];
      const color = colors[(moneyIndex - 2) % colors.length];
      art = (
        <>
          <rect
            x="6"
            y="23"
            width="116"
            height="66"
            rx="5"
            fill={color}
            stroke="#e0c693"
            strokeWidth="3"
          />
          <rect
            x="13"
            y="30"
            width="102"
            height="52"
            rx="3"
            fill="none"
            stroke="#d3c6a2"
            strokeDasharray={`${moneyIndex + 1} 2`}
          />
          <ellipse
            cx="45"
            cy="56"
            rx={17 + (moneyIndex % 3)}
            ry="22"
            fill="#d5c29d"
          />
          <path
            d={`M${31 + moneyIndex} 67Q24 52 42 40Q57 38 57 54L62 59 54 61 53 71Z`}
            fill={color}
          />
          <path d={`M78 42l${moneyIndex + 4} -7 14 10-14 12Z`} fill="#c9b780" />
          <path d="M76 67H106M76 73H99" stroke="#ded1ac" strokeWidth="3" />
          <circle cx="107" cy="37" r={(moneyIndex % 4) + 2} fill="#f2dea2" />
        </>
      );
    }
  }
  return (
    <svg
      viewBox={item.wearable ? "0 0 160 192" : "0 0 128 112"}
      className={`collectible-art ${className}`}
      role="img"
      aria-label={item.nameEnglish}
    >
      <defs>
        <linearGradient id={`${uid}-gold`} x2="1" y2="1">
          <stop stopColor="#fff0a2" />
          <stop offset=".5" stopColor="#dfb450" />
          <stop offset="1" stopColor="#a76c27" />
        </linearGradient>
      </defs>
      {item.wearable ? (
        <>
          <HestiaLook id={id} layer="back" />
          <path
            d="M35 124Q80 112 125 124L131 166Q80 183 29 166Z"
            fill="#efc077"
          />
          <HestiaLook id={id} />
        </>
      ) : (
        art
      )}
    </svg>
  );
}

