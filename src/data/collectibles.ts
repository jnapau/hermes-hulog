/**
 * Weekly Basag rewards — Filipino Cultural Heritage Collection.
 * Displayed on the virtual "Estante ng mga Gantimpala" (Collection Shelf).
 * Rewards are given in a fixed milestone sequence (zero loot-box mechanics).
 */
export type CollectibleKind = 'salapi' | 'kasuotan' | 'alkansya' | 'sagisag';

export interface Collectible {
  id: string;
  kind: CollectibleKind;
  /** Primary Authentic Filipino Name */
  nameFilipino: string;
  /** English Title */
  nameEnglish: string;
  emoji: string;
  shelfTier: string;
  material: string;
  rarity: 'Karaniwan' | 'Pambihira' | 'Bihira' | 'Maalamat';
  /** Cultural backstory in Filipino honoring Filipino heritage */
  culturalStory: string;
  /** English summary */
  blurb: string;
  unlockRequirement: string;
}

export const SHELF_CATEGORIES: {
  id: CollectibleKind;
  titleFilipino: string;
  titleEnglish: string;
  description: string;
  woodTone: string;
}[] = [
  {
    id: 'salapi',
    titleFilipino: 'Antikong Salapi ng Pilipinas',
    titleEnglish: 'Philippine Numismatic Heritage',
    description: 'Mga makasaysayang barya at salaping papel na nagpapatunay ng ating kasarinlan at sipag.',
    woodTone: 'from-[#451A03] to-[#78350F]',
  },
  {
    id: 'kasuotan',
    titleFilipino: 'Tradisyonal na Kasuotan ni Hestia',
    titleEnglish: "Traditional Folk Attire",
    description: 'Mga katutubong kasuotan at palamuting sumasalamin sa dangal ng manggagawang Pilipino.',
    woodTone: 'from-[#3B1E08] to-[#5F3011]',
  },
  {
    id: 'alkansya',
    titleFilipino: 'Katutubong Alkansya at Likhang-Kamay',
    titleEnglish: 'Artisanal Indigenous Alkansya',
    description: 'Mula sa kawayan ng Benguet hanggang sa capiz ng Kabisayaan, hinubog para sa masinop na bukas.',
    woodTone: 'from-[#4D2600] to-[#7C3F00]',
  },
  {
    id: 'sagisag',
    titleFilipino: 'Sagisag ng Katatagan at Tagumpay',
    titleEnglish: 'Milestone Badges of Resilience',
    description: 'Mga medalyon at parangal na ipinagkakaloob sa bawat linggong may malasakit at pagtitipid.',
    woodTone: 'from-[#361904] to-[#602D0A]',
  },
];

export const COLLECTIBLES: Collectible[] = [
  // ── 1. ANTIKONG SALAPI ──
  {
    id: 'salapi-1-piso-1903',
    kind: 'salapi',
    nameFilipino: 'Pilak na Piso (1903)',
    nameEnglish: 'One Silver Peso (1903)',
    emoji: '🪙',
    shelfTier: 'Estante 1: Salapi',
    material: 'Dalisay na Pilak (Silver)',
    rarity: 'Pambihira',
    culturalStory:
      'Ang pinakaunang pisong pilak sa ilalim ng Philippine Coinage Act of 1903. Tampok ang isang Pilipinang may hawak na martilyo sa ibabaw ng anvil habang sumisikat ang Bulkang Mayon—simbolo ng industriya at lakas ng manggagawa.',
    blurb: 'First silver peso minted under the 1903 Coinage Act, featuring Mayon Volcano and the artisan at the anvil.',
    unlockRequirement: 'Week 1 Sunday Basag',
  },
  {
    id: 'salapi-emergency-notes-1942',
    kind: 'salapi',
    nameFilipino: 'Salaping Pang-Kagipitan ng WWII (1942)',
    nameEnglish: 'WWII Guerilla Emergency Note',
    emoji: '📜',
    shelfTier: 'Estante 1: Salapi',
    material: 'Lokal na Papel at Tinta',
    rarity: 'Bihira',
    culturalStory:
      'Noong Ikalawang Digmaang Pandaigdig, naglimbag ang mga lalawigan ng sariling "Emergency Currency" sa tulong ng mga gerilya upang panatilihing buhay ang lokal na ekonomiya sa kabila ng pananakop. Patunay ito na ang pondo ng krisis ay buhay ng komunidad.',
    blurb: 'Authentic guerilla currency printed in Philippine provinces during WWII to maintain economic survival.',
    unlockRequirement: 'Week 2 Sunday Basag',
  },
  {
    id: 'salapi-cbp-english-1949',
    kind: 'salapi',
    nameFilipino: 'Unang Serye ng Bangko Sentral (1949)',
    nameEnglish: 'Central Bank English Series',
    emoji: '💵',
    shelfTier: 'Estante 1: Salapi',
    material: 'Abaca-Cotton Paper',
    rarity: 'Karaniwan',
    culturalStory:
      'Inilabas matapos maitatag ang Central Bank of the Philippines noong 1949. Dito unang naitatag ang pundasyon ng pambansang reserba at proteksyon sa halaga ng piso para sa bawat tahanan.',
    blurb: 'The foundational series from the newly established Central Bank of the Philippines in 1949.',
    unlockRequirement: 'Week 5 Sunday Basag',
  },
  {
    id: 'salapi-pilipino-1969',
    kind: 'salapi',
    nameFilipino: 'Seryeng Pilipino (1969)',
    nameEnglish: 'Pilipino Series Banknote',
    emoji: '🧾',
    shelfTier: 'Estante 1: Salapi',
    material: 'Katutubong Hibla ng Abaka',
    rarity: 'Pambihira',
    culturalStory:
      'Ang kauna-unahang serye ng pera kung saan Wikang Filipino ang ginamit sa lahat ng kasulatan, kabilang ang "Republika ng Pilipinas" at "Limampung Piso." Isang makasaysayang tagumpay ng ating pagkakakilanlan.',
    blurb: 'The first banknote series written entirely in the Filipino national language.',
    unlockRequirement: 'Week 8 Sunday Basag',
  },
  {
    id: 'salapi-bagong-lipunan-1973',
    kind: 'salapi',
    nameFilipino: 'Ang Bagong Lipunan Series (1973)',
    nameEnglish: 'Ang Bagong Lipunan Series',
    emoji: '💴',
    shelfTier: 'Estante 1: Salapi',
    material: 'Seguridad na Papel at Watermark',
    rarity: 'Karaniwan',
    culturalStory:
      'Tampok ang mga dakilang bayani tulad nina Jose Rizal, Andres Bonifacio, at Apolinario Mabini, pati na ang mga pambansang institusyon ng kalusugan at agrikultura.',
    blurb: 'Iconic 1970s series highlighting Philippine national heroes and agricultural heritage.',
    unlockRequirement: 'Week 12 Sunday Basag',
  },
  {
    id: 'salapi-ngc-2010',
    kind: 'salapi',
    nameFilipino: 'Makabagong Salapi: New Generation Currency (2010)',
    nameEnglish: 'New Generation Currency (NGC)',
    emoji: '💶',
    shelfTier: 'Estante 1: Salapi',
    material: 'Lokal na Abaka at OVD Strips',
    rarity: 'Bihira',
    culturalStory:
      'Itinatampok ang Tubbataha Reefs, Banaue Rice Terraces, Tarsier, at Butanding. Isang paalala na ang ating tunay na kayamanan ay ang kalikasan at ang masinop nating pangangalaga rito.',
    blurb: 'Modern BSP banknote series showcasing Philippine natural UNESCO heritage sites and biodiversity.',
    unlockRequirement: 'Week 16 Sunday Basag',
  },
  {
    id: 'salapi-polymer-2022',
    kind: 'salapi',
    nameFilipino: 'Gintong Polimero: Philippine Eagle (2022)',
    nameEnglish: '1000-Piso Polymer Note',
    emoji: '🪶',
    shelfTier: 'Estante 1: Salapi',
    material: 'Smudge-proof Recyclable Polymer',
    rarity: 'Maalamat',
    culturalStory:
      'Gantimpala sa Pandaigdigang Gawad para sa Pinakamagandang Perang Papel (Banknote of the Year 2022). Tampok ang marangal na Philippine Eagle at Sampaguita flower.',
    blurb: 'Award-winning polymer banknote honoring the critically endangered Philippine Eagle and Sampaguita.',
    unlockRequirement: 'Week 24 Sunday Basag',
  },

  // ── 2. TRADISYONAL NA KASUOTAN ──
  {
    id: 'kasuotan-salakot',
    kind: 'kasuotan',
    nameFilipino: 'Salakot ng Magsasaka',
    nameEnglish: "Farmer's Woven Salakot",
    emoji: '👒',
    shelfTier: 'Estante 2: Kasuotan',
    material: 'Hinabing Nito at Rattan',
    rarity: 'Karaniwan',
    culturalStory:
      'Pananggalang ng magsasakang Pilipino sa tindi ng sikat ng araw at hagupit ng ulan. Simbolo ito ng iyong Emergency Fund—ang iyong panangga sa anumang unos ng buhay.',
    blurb: 'Handwoven traditional Filipino broad-brimmed hat, symbolizing protection against storms and sun.',
    unlockRequirement: 'Week 3 Sunday Basag',
  },
  {
    id: 'kasuotan-katipunero',
    kind: 'kasuotan',
    nameFilipino: 'Pulang Bandana ng Katipunero',
    nameEnglish: 'Katipunero Bandana',
    emoji: '🧣',
    shelfTier: 'Estante 2: Kasuotan',
    material: 'Pulang Telang Kastila',
    rarity: 'Pambihira',
    culturalStory:
      'Isinusuot ng mga magigiting na Katipunero bilang tanda ng paninindigan at lakas ng loob. Isinusuot ni Hestia para sa mga pamilyang buong tapang na humaharap at nagbabayad sa kanilang mga utang.',
    blurb: 'Emblem of courage and determination, awarded for boldly managing household debt obligations.',
    unlockRequirement: 'Week 6 Sunday Basag',
  },
  {
    id: 'kasuotan-barot-saya',
    kind: 'kasuotan',
    nameFilipino: "Baro't Sayang Maria Clara",
    nameEnglish: "Traditional Baro't Saya",
    emoji: '👘',
    shelfTier: 'Estante 2: Kasuotan',
    material: 'Hinabing Piña at Jusi',
    rarity: 'Bihira',
    culturalStory:
      'Pambansang kasuotan ng kababaihang Pilipino. Ang telang piña ay mahinahon at masinsing hinabi mula sa dahon ng pinya, sagisag ng pasensya at tiyaga sa pagpapalago ng ipon.',
    blurb: 'Finely woven pineapple-fiber gown honoring patience, grace, and steady financial stewardship.',
    unlockRequirement: 'Week 10 Sunday Basag',
  },
  {
    id: 'kasuotan-barong-tagalog',
    kind: 'kasuotan',
    nameFilipino: 'Pormal na Barong Tagalog',
    nameEnglish: 'Embroidered Barong Tagalog',
    emoji: '👔',
    shelfTier: 'Estante 2: Kasuotan',
    material: 'Dalisay na Piña-Seda',
    rarity: 'Bihira',
    culturalStory:
      'Pormal na kasuotang pambansa na may burdang kamay mula sa Lumban, Laguna. Isinusuot tuwing ipinagdiriwang ang pagiging ganap na ligtas at matatag ng pamilya laban sa krisis.',
    blurb: 'Hand-embroidered formal national garment from Lumban, worn during major milestones.',
    unlockRequirement: 'Week 14 Sunday Basag',
  },
  {
    id: 'kasuotan-malong',
    kind: 'kasuotan',
    nameFilipino: 'Inaul na Malong ng Maguindanao',
    nameEnglish: 'Inaul Woven Malong',
    emoji: '🥻',
    shelfTier: 'Estante 2: Kasuotan',
    material: 'Burdang Sutla at Ginto',
    rarity: 'Bihira',
    culturalStory:
      'Tradisyonal na habing Mindanao na may makukulay na geometric pattern. Isang kasuotang maraming gamit—kumot, duyan, o panangga—katulad ng isang multi-purpose sinking fund.',
    blurb: 'Versatile royal handwoven textile from Maguindanao representing adaptable multi-purpose reserves.',
    unlockRequirement: 'Week 18 Sunday Basag',
  },
  {
    id: 'kasuotan-parol',
    kind: 'kasuotan',
    nameFilipino: 'Parol ng Paskong Masinop',
    nameEnglish: 'San Fernando Parol Aura',
    emoji: '⭐',
    shelfTier: 'Estante 2: Kasuotan',
    material: 'Kawayan, Papel de Hapon, at Ilaw',
    rarity: 'Maalamat',
    culturalStory:
      'Mula sa Pampanga, ang parol ay gabay sa dilim at liwanag ng pag-asa. Ipinagkakaloob sa may planadong 13th month pay na hindi nagpatangay sa gastos ng Kapaskuhan.',
    blurb: 'Radiant festive lantern aura celebrating mindful holiday budgeting and 13th month allocation.',
    unlockRequirement: 'Week 22 Sunday Basag',
  },

  // ── 3. KATUTUBONG ALKANSYA ──
  {
    id: 'alkansya-kawayang-benguet',
    kind: 'alkansya',
    nameFilipino: 'Alkansyang Kawayan ng Benguet',
    nameEnglish: 'Benguet Bamboo Coin Vault',
    emoji: '🎋',
    shelfTier: 'Estante 3: Alkansya',
    material: 'Matigas na Kawayang Kawayan-Tinik',
    rarity: 'Karaniwan',
    culturalStory:
      'Gawa sa matibay na kawayan mula sa kabundukan ng Cordillera. Ito ang pinakapayak ngunit pinakamabuting simula ng pag-iimpok ng bawat pamilyang Pilipino—isang hulog araw-araw.',
    blurb: 'Authentic mountain bamboo tube bank carved in the Cordilleras—the original Filipino piggy bank.',
    unlockRequirement: 'Default Starter Alkansya',
  },
  {
    id: 'alkansya-capiz-inlay',
    kind: 'alkansya',
    nameFilipino: 'Inlay na Capiz ng Roxas',
    nameEnglish: 'Capiz Shell Inlaid Vault',
    emoji: '🐚',
    shelfTier: 'Estante 3: Alkansya',
    material: 'Capiz Shells at Brass Framing',
    rarity: 'Pambihira',
    culturalStory:
      'Nagmumula sa baybayin ng Roxas City, Capiz. Ang bawat bintana ng capiz ay sumasala sa liwanag ng araw upang magbigay ng banayad na liwanag sa tahanan, katulad ng transparency sa badyet.',
    blurb: 'Lustrous mother-of-pearl windowpane oyster shell craft from Panay Island.',
    unlockRequirement: 'Week 4 Sunday Basag',
  },
  {
    id: 'alkansya-palayok-terracotta',
    kind: 'alkansya',
    nameFilipino: 'Palayok na Luwad ng Tiwi',
    nameEnglish: 'Tiwi Terracotta Clay Piggy',
    emoji: '🏺',
    shelfTier: 'Estante 3: Alkansya',
    material: 'Pula at Inihaw na Luwad',
    rarity: 'Karaniwan',
    culturalStory:
      'Hinubog sa kamay ng mga magpapalayok sa Albay gamit ang lupaing bulkaniko. Sa tradisyon ng ating mga ninuno, kailangang basagin ang palayok bago makuha ang ipon—tinitiyak na hindi magagalaw sa luho.',
    blurb: 'Traditional unglazed earthenware pot that must be ritually broken open to retrieve savings.',
    unlockRequirement: 'Week 7 Sunday Basag',
  },
  {
    id: 'alkansya-vigan-burnay',
    kind: 'alkansya',
    nameFilipino: 'Vigan Burnay Jar na Alkansya',
    nameEnglish: 'Ilocos Burnay Stoneware Jar',
    emoji: '🫙',
    shelfTier: 'Estante 3: Alkansya',
    material: 'Mataas na Init na Stoneware Clay',
    rarity: 'Bihira',
    culturalStory:
      'Ginawa sa makasaysayang Pagburnayan sa Vigan gamit ang sinaunang tapakan ng paa at hornong gubat. Kilala sa tibay na kayang tumagal ng ilang henerasyon nang hindi nababasag.',
    blurb: 'Legendary heavy-duty stoneware jar from Vigan City, crafted to preserve family assets for generations.',
    unlockRequirement: 'Week 13 Sunday Basag',
  },
  {
    id: 'alkansya-abaca-coffer',
    kind: 'alkansya',
    nameFilipino: 'Kaban na Hinabing Abaka ng Bikol',
    nameEnglish: 'Bicol Woven Abaca Coffer',
    emoji: '🧺',
    shelfTier: 'Estante 3: Alkansya',
    material: 'Manila Hemp (Abaca) at Narra Wood',
    rarity: 'Pambihira',
    culturalStory:
      'Ang abaka ng Pilipinas ang pinakamatibay na natural fiber sa daigdig—hindi nasisira kahit mababad sa tubig-dagat. Sagisag ng lakas ng isang household emergency fund.',
    blurb: 'Woven Manila hemp safe chest, revered worldwide for unmatched tensile strength and durability.',
    unlockRequirement: 'Week 17 Sunday Basag',
  },
  {
    id: 'alkansya-narra-wood',
    kind: 'alkansya',
    nameFilipino: 'Baul na Inukit na Narra',
    nameEnglish: 'Carved Narra Heirloom Chest',
    emoji: '🪵',
    shelfTier: 'Estante 3: Alkansya',
    material: 'Pambansang Punong Narra',
    rarity: 'Maalamat',
    culturalStory:
      'Ang Narra ang pambansang punongkahoy ng Pilipinas. Matigas, hindi inaanay, at lumalalim ang ganda habang tumatagal. Para sa mga pamilyang nakabuo na ng pangmatagalang yaman.',
    blurb: 'Masterpiece hardwood chest sculpted from Philippine Narra, handed down across generations.',
    unlockRequirement: 'Week 21 Sunday Basag',
  },

  // ── 4. SAGISAG NG KATATAGAN ──
  {
    id: 'sagisag-unang-basag',
    kind: 'sagisag',
    nameFilipino: 'Medalyon ng Unang Basag',
    nameEnglish: 'First Alkansya Break Token',
    emoji: '🏅',
    shelfTier: 'Estante 4: Sagisag',
    material: 'Tanso na may Inukit na Kawayan',
    rarity: 'Karaniwan',
    culturalStory:
      'Ipinagkakaloob sa kauna-unahang Linggo Basag. Patunay na may disiplina kang maghulog sa buong linggo. Simula pa lamang ito ng iyong panibagong lakbay.',
    blurb: 'Commemorates the completion of your very first week of daily Hulog drops.',
    unlockRequirement: 'First Sunday Alkansya Break',
  },
  {
    id: 'sagisag-masinop-na-linggo',
    kind: 'sagisag',
    nameFilipino: 'Gawad Masinop na Linggo',
    nameEnglish: 'Prudent Week Achievement',
    emoji: '🎖️',
    shelfTier: 'Estante 4: Sagisag',
    material: 'Pilak at Asul na Enamel',
    rarity: 'Pambihira',
    culturalStory:
      'Iginagawad kapag nakumpleto ang 5 o higit pang hulog sa loob ng isang linggo. Ipinapakita nito ang kapangyarihan ng maliliit na gawi na paulit-ulit na ginagawa.',
    blurb: 'Awarded for maintaining 5+ daily drops in a single week.',
    unlockRequirement: 'Earn 1 Week with 5+ drops',
  },
  {
    id: 'sagisag-haligi-ng-tahanan',
    kind: 'sagisag',
    nameFilipino: 'Sagisag Haligi ng Tahanan',
    nameEnglish: 'Pillar of the Household Seal',
    emoji: '🏛️',
    shelfTier: 'Estante 4: Sagisag',
    material: 'Ginto at Molave Wood',
    rarity: 'Bihira',
    culturalStory:
      'Parangal para sa masinop na breadwinner na nagtatakda ng hangganan, nag-iipon ng buffer para sa magulang at anak, at hindi sumusuko sa gitna ng hirap.',
    blurb: 'Honoring the dedicated household breadwinner who protects and sustains the family future.',
    unlockRequirement: 'Month 1 Milestone (30 Days)',
  },
  {
    id: 'sagisag-bagwis-ng-agila',
    kind: 'sagisag',
    nameFilipino: 'Plake ng Bagwis ng Katatagan',
    nameEnglish: "Eagle's Wing Resilience Plaque",
    emoji: '🦅',
    shelfTier: 'Estante 4: Sagisag',
    material: 'Solid Brass at Inukit na Narra',
    rarity: 'Maalamat',
    culturalStory:
      'Tulad ng Agila ng Pilipinas na lumilipad sa ibabaw ng mga bagyo, ikaw ay may sapat na emergency buffer at proteksyon upang hindi matakot sa anumang pagsubok ng ekonomiya.',
    blurb: 'Ultimate milestone for clearing advanced crisis shock simulations and securing a multi-month runway.',
    unlockRequirement: 'Month 3 Milestone (90 Days)',
  },
];

export const COLLECTIBLE_BY_ID: Record<string, Collectible> = Object.fromEntries(
  COLLECTIBLES.map((c) => [c.id, c]),
);
