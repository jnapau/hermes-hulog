/**
 * Weekly Basag rewards — purely visual collectibles (no cash value, ever).
 * Rewards are given in a fixed order (not random) so there is no loot-box feel.
 */
export type CollectibleKind = 'pera' | 'outfit' | 'shell' | 'badge';

export interface Collectible {
  id: string;
  kind: CollectibleKind;
  name: string;
  emoji: string;
  blurb: string;
}

export const KIND_LABEL: Record<CollectibleKind, string> = {
  pera: 'Pera ng Pilipinas',
  outfit: 'Hestia Outfit',
  shell: 'Alkansya Shell',
  badge: 'Milestone Badge',
};

export const COLLECTIBLES: Collectible[] = [
  { id: 'pera-1-piso-1903', kind: 'pera', name: '1 Peso (1903)', emoji: '🪙', blurb: 'Ang unang piso sa ilalim ng Philippine Coinage Act of 1903 — gawa sa pilak.' },
  { id: 'outfit-salakot', kind: 'outfit', name: 'Salakot', emoji: '👒', blurb: 'Pananggalang ni Hestia sa init at ulan — tulad ng emergency fund mo.' },
  { id: 'shell-benguet', kind: 'shell', name: 'Benguet Bamboo', emoji: '🎋', blurb: 'Hand-carved na kawayan mula sa Cordillera.' },
  { id: 'pera-emergency-notes', kind: 'pera', name: 'Emergency Notes (1942)', emoji: '📜', blurb: 'Gerilyang pera noong WWII — patunay na ang ipon ay pang-krisis.' },
  { id: 'badge-unang-basag', kind: 'badge', name: 'Unang Basag', emoji: '🏅', blurb: 'Una mong nabasag ang alkansya. Simula pa lang ito!' },
  { id: 'outfit-katipunero', kind: 'outfit', name: 'Katipunero Bandana', emoji: '🧣', blurb: 'Para sa matapang na humaharap sa sariling numero.' },
  { id: 'pera-english-series', kind: 'pera', name: 'English Series (1949)', emoji: '💵', blurb: 'Unang serye ng pera ng Central Bank of the Philippines.' },
  { id: 'shell-capiz', kind: 'shell', name: 'Capiz Inlay', emoji: '🐚', blurb: 'Kumikinang na alkansya na may capiz mula sa Roxas City.' },
  { id: 'outfit-barot-saya', kind: 'outfit', name: "Baro't Saya", emoji: '👘', blurb: 'Pormal na kasuotan ni Hestia para sa malalaking milestone.' },
  { id: 'pera-pilipino-series', kind: 'pera', name: 'Pilipino Series (1969)', emoji: '🧾', blurb: 'Unang serye na Filipino ang nakasulat sa pera.' },
  { id: 'badge-masinop-week', kind: 'badge', name: 'Masinop na Linggo', emoji: '🎖️', blurb: 'Isang linggong may 5+ hulog. Ganyan ang tuloy-tuloy!' },
  { id: 'shell-terracotta', kind: 'shell', name: 'Terracotta Jar', emoji: '🏺', blurb: 'Palayok-style na alkansya, tulad ng sa lola.' },
  { id: 'outfit-parol', kind: 'outfit', name: 'Parol Theme', emoji: '⭐', blurb: 'Pang-Pasko — Paskong Masinop!' },
  { id: 'pera-ang-bagong-lipunan', kind: 'pera', name: 'Ang Bagong Lipunan (1973)', emoji: '💴', blurb: 'Serye ng 1970s–80s na may mga bayani at landmark.' },
  { id: 'shell-palay-clay', kind: 'shell', name: 'Palay Clay', emoji: '🌾', blurb: 'Alkansyang hinubog mula sa luwad ng palayan.' },
  { id: 'pera-ngc', kind: 'pera', name: 'New Generation Currency (2010)', emoji: '💶', blurb: 'Ang kasalukuyang serye ng BSP na may mga pambansang yaman.' },
];

export const COLLECTIBLE_BY_ID: Record<string, Collectible> = Object.fromEntries(COLLECTIBLES.map((c) => [c.id, c]));
