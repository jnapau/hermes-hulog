/**
 * Philippine Cultural Heritage Collection & Hestia Wearable Attire.
 *
 * Six comprehensive exhibition tiers:
 * 1. Philippine Money (Salapi ng Pilipinas)
 * 2. National Symbols (Pambansang Sagisag at Bagay sa Pilipinas)
 * 3. Ancient Artifacts & Pottery (Sinaunang Kagamitan sa Pilipinas)
 * 4. Philippine Farm Life (Mga Kagamitan sa Bukid)
 * 5. National Costumes for Hestia (Wearable Pambansang Kasuotan)
 * 6. Aswang & Mythological Looks for Hestia (Wearable Philippine Mythical Looks)
 */

export type CollectibleKind =
  | 'ph-money'
  | 'national-symbols'
  | 'ancient-things'
  | 'farm-life'
  | 'national-costumes'
  | 'aswang-monsters';

export interface Collectible {
  id: string;
  kind: CollectibleKind;
  /** Authentic Filipino name of the item */
  nameFilipino: string;
  /** English translation/title */
  nameEnglish: string;
  emoji: string;
  shelfTier: string;
  material: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  /** Cultural backstory and historical significance */
  culturalStory: string;
  blurb: string;
  unlockRequirement: string;
  wearable?: boolean;
  lookType?: 'costume' | 'aswang';
}

export interface ShelfCategory {
  id: CollectibleKind;
  titleEnglish: string;
  titleFilipino: string;
  description: string;
  icon: string;
  woodTone: string;
  wearableCategory?: boolean;
}

export const SHELF_CATEGORIES: ShelfCategory[] = [
  {
    id: 'ph-money',
    titleEnglish: 'Philippine Money & Numismatics',
    titleFilipino: 'Salapi ng Pilipinas',
    description: 'Historic coins and banknotes reflecting Filipino sovereignty, resilience, and economic history.',
    icon: '🪙',
    woodTone: 'from-[#451A03] to-[#78350F]',
  },
  {
    id: 'national-symbols',
    titleEnglish: 'Philippine National Symbols & Treasures',
    titleFilipino: 'Pambansang mga Bagay sa Pilipinas',
    description: 'Official national symbols and cultural treasures that define Filipino pride and natural wealth.',
    icon: '🇵🇭',
    woodTone: 'from-[#3B1E08] to-[#5F3011]',
  },
  {
    id: 'farm-life',
    titleEnglish: 'Philippine Farm & Rural Life',
    titleFilipino: 'Karaniwang Makikita sa Bukid',
    description: 'Tools and implements that sustained generations of hardworking Filipino farmers in the countryside.',
    icon: '🌾',
    woodTone: 'from-[#361904] to-[#602D0A]',
  },
  {
    id: 'national-costumes',
    titleEnglish: "Hestia's National Costumes",
    titleFilipino: 'Pambansang Damit na Masusuot ni Hestia',
    description: 'Authentic traditional attire from Luzon, Visayas, and Mindanao that Hestia can wear on her daily journey.',
    icon: '👘',
    woodTone: 'from-[#5C2B09] to-[#854D0E]',
    wearableCategory: true,
  },
  {
    id: 'aswang-monsters',
    titleEnglish: "Philippine Aswang & Mythical Looks",
    titleFilipino: 'Mga Aswang at Nilalang (New Look ni Hestia)',
    description: 'Legendary creatures and mythological beings from Philippine folklore transformed into unique wearable avatars.',
    icon: '👹',
    woodTone: 'from-[#2A1005] to-[#451B08]',
    wearableCategory: true,
  },
];

const ALL_COLLECTIBLES: Collectible[] = [
  // ── 1. PHILIPPINE MONEY ──
  {
    id: 'salapi-piloncitos',
    kind: 'ph-money',
    nameFilipino: 'Piloncitos (Sinaunang Gintong Barya)',
    nameEnglish: 'Pre-Colonial Gold Piloncitos',
    emoji: '🟡',
    shelfTier: 'Shelf 1: Currency',
    material: 'Solid Native Gold Nugget',
    rarity: 'Legendary',
    culturalStory:
      'The earliest recognized indigenous coinage of the Philippines, dating back to 900–1200 CE. Stamped with the pre-colonial Baybayin character "Ma" (symbolizing the Kingdom of Ma-i), these pure gold beads proved flourishing pre-colonial maritime trade.',
    blurb: 'Pre-colonial pure gold currency engraved with ancient Baybayin calligraphy.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'salapi-1-piso-1903',
    kind: 'ph-money',
    nameFilipino: 'Pilak na Piso (1903)',
    nameEnglish: 'One Silver Peso (1903)',
    emoji: '🪙',
    shelfTier: 'Shelf 1: Currency',
    material: 'Pure Silver Coinage',
    rarity: 'Rare',
    culturalStory:
      'Minted under the Philippine Coinage Act of 1903. Depicts a Filipina artisan wielding a hammer upon an anvil with Mayon Volcano erupting in the background, immortalizing industrious labor and resilience.',
    blurb: 'Historical silver peso featuring Mayon Volcano and the blacksmith artisan at the anvil.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'salapi-emergency-notes-1942',
    kind: 'ph-money',
    nameFilipino: 'Salaping Pang-Kagipitan ng WWII (1942)',
    nameEnglish: 'WWII Guerilla Emergency Currency',
    emoji: '📜',
    shelfTier: 'Shelf 1: Currency',
    material: 'Local Fiber Paper & Forest Ink',
    rarity: 'Epic',
    culturalStory:
      'During World War II, provinces and resistance guerilla councils printed their own emergency currency to keep local barter and family economies alive during enemy occupation.',
    blurb: 'Authentic WWII emergency currency issued by guerilla resistance units.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'salapi-cbp-english-1949',
    kind: 'ph-money',
    nameFilipino: 'Unang Serye ng Bangko Sentral (1949)',
    nameEnglish: 'Central Bank English Series',
    emoji: '💵',
    shelfTier: 'Shelf 1: Currency',
    material: 'Abaca-Cotton Security Paper',
    rarity: 'Common',
    culturalStory:
      'Issued right after the establishment of the Central Bank of the Philippines in 1949, marking the foundation of national monetary autonomy and organized fiscal protection.',
    blurb: 'The foundational series from the newly established Central Bank in 1949.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'salapi-pilipino-1969',
    kind: 'ph-money',
    nameFilipino: 'Seryeng Pilipino (1969)',
    nameEnglish: 'Pilipino Series Banknote',
    emoji: '🧾',
    shelfTier: 'Shelf 1: Currency',
    material: 'Native Abaca Fiber Blend',
    rarity: 'Common',
    culturalStory:
      'The landmark banknote series where the Filipino national language was officially used across all denominations, proudly declaring "Republika ng Pilipinas".',
    blurb: 'The first banknote series written entirely in the national Filipino language.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'salapi-bagong-lipunan-1973',
    kind: 'ph-money',
    nameFilipino: 'Ang Bagong Lipunan Series (1973)',
    nameEnglish: 'Ang Bagong Lipunan Series',
    emoji: '💴',
    shelfTier: 'Shelf 1: Currency',
    material: 'Intaglio Security Paper',
    rarity: 'Common',
    culturalStory:
      'A widely recognized 1970s series showcasing Philippine historical heroes: Jose Rizal, Andres Bonifacio, and Apolinario Mabini.',
    blurb: 'Classic series honoring Philippine founding patriots and national heroes.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'salapi-ngc-2010',
    kind: 'ph-money',
    nameFilipino: 'Makabagong Serye: New Generation Currency (2010)',
    nameEnglish: 'New Generation Currency (NGC)',
    emoji: '💶',
    shelfTier: 'Shelf 1: Currency',
    material: 'Native Philippine Abaca Fiber',
    rarity: 'Rare',
    culturalStory:
      'Celebrates natural wonders like Tubbataha Reef, the Banaue Rice Terraces, the Chocolate Hills, and endemic fauna like the Tarsier and Whale Shark.',
    blurb: 'Modern BSP banknote series celebrating UNESCO world heritage sites.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'salapi-polymer-2022',
    kind: 'ph-money',
    nameFilipino: '1000-Piso Gintong Polimero (2022)',
    nameEnglish: '1000-Piso Polymer Note (Banknote of the Year)',
    emoji: '🪶',
    shelfTier: 'Shelf 1: Currency',
    material: 'Smudge-proof Recyclable Polymer',
    rarity: 'Legendary',
    culturalStory:
      'Winner of the prestigious International Bank Note Society "Banknote of the Year 2022". Highlights the critically endangered Philippine Eagle and Sampaguita flower on durable polymer.',
    blurb: 'Award-winning polymer banknote honoring the Philippine Eagle.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },

  // ── 2. NATIONAL SYMBOLS & TREASURES ──
  {
    id: 'sagisag-sampaguita',
    kind: 'national-symbols',
    nameFilipino: 'Sampaguita (Pambansang Bulaklak)',
    nameEnglish: 'Sampaguita (National Flower)',
    emoji: '🌸',
    shelfTier: 'Shelf 2: National Symbols',
    material: 'Fragrant White Jasmine',
    rarity: 'Common',
    culturalStory:
      'Proclaimed the National Flower of the Philippines in 1934. Its delicate white petals symbolize purity, simplicity, fidelity, and the cherished Filipino promise of "Sumpa kita" (I promise you).',
    blurb: 'Sweetly fragrant national blossom representing purity and devotion.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'sagisag-narra',
    kind: 'national-symbols',
    nameFilipino: 'Punong Narra (Pambansang Puno)',
    nameEnglish: 'Narra Hardwood (National Tree)',
    emoji: '🪵',
    shelfTier: 'Shelf 2: National Symbols',
    material: 'Indigenous Polished Hardwood',
    rarity: 'Rare',
    culturalStory:
      'The National Tree of the Philippines. Renowned for supreme durability and resistance to termites and rot, it represents the steadfast resilience of the Filipino family in overcoming any hardship.',
    blurb: 'Mighty indigenous hardwood embodying unwavering household fortitude.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'sagisag-agila',
    kind: 'national-symbols',
    nameFilipino: 'Agila ng Pilipinas (Pambansang Ibon)',
    nameEnglish: 'Philippine Eagle (National Bird)',
    emoji: '🦅',
    shelfTier: 'Shelf 2: National Symbols',
    material: 'Majestic Feathers of Mt. Apo',
    rarity: 'Legendary',
    culturalStory:
      'One of the largest, rarest, and most powerful eagles on the planet. Symbol of courage, noble vision, and the pinnacle of biodiversity in Philippine tropical rainforests.',
    blurb: 'Critically protected apex sovereign of Philippine skies.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'sagisag-anahaw',
    kind: 'national-symbols',
    nameFilipino: 'Dahon ng Anahaw (Pambansang Dahon)',
    nameEnglish: 'Anahaw Palm (National Leaf)',
    emoji: '🍃',
    shelfTier: 'Shelf 2: National Symbols',
    material: 'Broad Evergreen Palm Frond',
    rarity: 'Common',
    culturalStory:
      'The national leaf, famed for its broad fan shape. Woven into traditional hand fans (paypay), rain capes, and resilient thatched roofs, representing resourcefulness in everyday rural living.',
    blurb: 'Large pleated fan palm leaf widely used for shade, craft, and roofing.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'sagisag-arnis',
    kind: 'national-symbols',
    nameFilipino: 'Baston ng Arnis (Pambansang Laro)',
    nameEnglish: 'Arnis Baston (National Martial Art)',
    emoji: '🥢',
    shelfTier: 'Shelf 2: National Symbols',
    material: 'Hardened Rattan Kamagong',
    rarity: 'Rare',
    culturalStory:
      'Declared the National Martial Art and Sport of the Philippines under Republic Act 9850. Utilizes swift strikes and deflections with seasoned rattan sticks, honoring warrior self-defense traditions.',
    blurb: 'Traditional rattan martial arts sticks of indigenous defense.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'sagisag-kalabaw',
    kind: 'national-symbols',
    nameFilipino: 'Kalabaw (Pambansang Hayop)',
    nameEnglish: 'Carabao (Water Buffalo of Industry)',
    emoji: '🐃',
    shelfTier: 'Shelf 2: National Symbols',
    material: 'Living Symbol of Diligence',
    rarity: 'Common',
    culturalStory:
      'The ultimate partner of the Filipino farmer. Patient, tireless, and loyal, the carabao epitomizes honest work, agricultural heritage, and perseverance across Philippine history.',
    blurb: 'Revered national draft animal symbolizing patient and honest toil.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'sagisag-mangga',
    kind: 'national-symbols',
    nameFilipino: 'Manggang Kalabaw (Pambansang Prutas)',
    nameEnglish: 'Carabao Mango (National Fruit)',
    emoji: '🥭',
    shelfTier: 'Shelf 2: National Symbols',
    material: 'Golden Guimaras Mango',
    rarity: 'Common',
    culturalStory:
      'Guinness World Record holder for the sweetest fruit in the world. The golden carabao mango reflects tropical abundance, sunshine, and warm hospitality.',
    blurb: 'World-famous sweet golden mango of Guimaras and Zambales.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'sagisag-bahay-kubo',
    kind: 'national-symbols',
    nameFilipino: 'Bahay Kubo (Pambansang Bahay)',
    nameEnglish: 'Bahay Kubo (Nipa Hut & Bayanihan)',
    emoji: '🛖',
    shelfTier: 'Shelf 2: National Symbols',
    material: 'Bamboo, Nipa Fronds & Rattan Ties',
    rarity: 'Epic',
    culturalStory:
      'The architectural icon of Bayanihan—the community spirit of carrying a neighbor’s house together on their shoulders. Built with sustainable bamboo and thatch for tropical cross-ventilation.',
    blurb: 'Icon of community solidarity and sustainable vernacular architecture.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },

  // ── 3. ANCIENT ARTIFACTS & POTTERY ──
  {
    id: 'antigo-kawayang-alkansya',
    kind: 'ancient-things',
    nameFilipino: 'Kawayang Alkansya ng Benguet',
    nameEnglish: 'Benguet Bamboo Coin Tube Bank',
    emoji: '🎋',
    shelfTier: 'Shelf 3: Ancient Artifacts',
    material: 'Highland Spiny Bamboo',
    rarity: 'Common',
    culturalStory:
      'The original Filipino coin bank. Carved from thick mountain bamboo nodes with a single slit on top. Once a coin drops inside, it cannot be shaken out until the day the bamboo is ceremonially split.',
    blurb: 'Hand-carved Cordillera mountain bamboo bank—the original Filipino Alkansya.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'antigo-palayok',
    kind: 'ancient-things',
    nameFilipino: 'Palayok na Luwad ng Tiwi',
    nameEnglish: 'Tiwi Terracotta Clay Cooking & Savings Pot',
    emoji: '🏺',
    shelfTier: 'Shelf 3: Ancient Artifacts',
    material: 'Volcanic Terracotta Clay',
    rarity: 'Common',
    culturalStory:
      'Earthenware shaped by hand in Albay using volcanic red clay. In ancient traditions, emergency savings were sealed inside these clay pots; retrieving the coins required shattering the pot, deterring frivolous spending.',
    blurb: 'Authentic clay pottery that must be broken open to claim savings.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'antigo-manunggul-jar',
    kind: 'ancient-things',
    nameFilipino: 'Banga ng Manunggul (890–710 BC)',
    nameEnglish: 'Manunggul Burial Jar of Palawan',
    emoji: '⚱️',
    shelfTier: 'Shelf 3: Ancient Artifacts',
    material: 'Neolithic Fired Terracotta with Iron Pigment',
    rarity: 'Legendary',
    culturalStory:
      'Unearthed in the Tabon Caves of Palawan, this national cultural treasure depicts two souls paddling a canoe into the afterlife. Celebrated worldwide for its profound maritime spirituality and sculptural mastery.',
    blurb: 'World-renowned Neolithic burial vessel depicting the soul’s voyage across the sea.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'antigo-maitum-pottery',
    kind: 'ancient-things',
    nameFilipino: 'Palayok na May Mukha ng Maitum (5 BC)',
    nameEnglish: 'Maitum Anthropomorphic Jar',
    emoji: '🗿',
    shelfTier: 'Shelf 3: Ancient Artifacts',
    material: 'Mineral-Pigmented Earthenware',
    rarity: 'Epic',
    culturalStory:
      'Discovered in Ayub Cave in Sarangani, these pre-colonial terracotta vessels feature realistic facial expressions, ears, and piercings—unique in Southeast Asian archaeology.',
    blurb: 'Intricate pre-historic face-shaped terracotta jars from ancient Mindanao.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'antigo-gintong-tara',
    kind: 'ancient-things',
    nameFilipino: 'Gintong Tara ng Agusan (900–950 CE)',
    nameEnglish: 'Golden Tara of Agusan',
    emoji: '✨',
    shelfTier: 'Shelf 3: Ancient Artifacts',
    material: '21-Karat Solid Cast Gold',
    rarity: 'Legendary',
    culturalStory:
      'A four-pound solid 21-karat gold Buddhist-Hindu icon discovered in 1917 along the Wawa River in Agusan del Sur, proving sophisticated metallurgy and ancient trading networks.',
    blurb: 'Masterpiece 21-karat solid cast gold goddess sculpture of ancient Caraga.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'antigo-balangay',
    kind: 'ancient-things',
    nameFilipino: 'Balangay ng Butuan (320 CE)',
    nameEnglish: 'Butuan Balangay Boat',
    emoji: '⛵',
    shelfTier: 'Shelf 3: Ancient Artifacts',
    material: 'Doongon Hardwood Edge-Pegged Planks',
    rarity: 'Epic',
    culturalStory:
      'The earliest watercraft found in the Philippines. Built without a single metal nail—only wooden pegs and fiber lashings. The word "Barangay" was derived from these community sea-vessels.',
    blurb: 'Ancient edge-pegged plank boat that gave birth to the term "Barangay".',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'antigo-lantaka',
    kind: 'ancient-things',
    nameFilipino: 'Lantakang Tanso (Sinaunang Kanyon)',
    nameEnglish: 'Bronze Lantaka Swivel Cannon',
    emoji: '💥',
    shelfTier: 'Shelf 3: Ancient Artifacts',
    material: 'Cast Bronze & Ornate Brass Floral Scrollwork',
    rarity: 'Rare',
    culturalStory:
      'Muzzle-loading bronze swivel guns mounted on merchant balangays and fortresses across the Sulu and Maguindanao Sultanates to defend against coastal invaders.',
    blurb: 'Ornately cast pre-colonial bronze artillery of maritime kingdoms.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'antigo-sungka',
    kind: 'ancient-things',
    nameFilipino: 'Sinaunang Sungkaang Kahoy',
    nameEnglish: 'Ancient Wooden Sungka Board',
    emoji: '🪵',
    shelfTier: 'Shelf 3: Ancient Artifacts',
    material: 'Hand-Carved Molave Hardwood & Cowrie Shells',
    rarity: 'Common',
    culturalStory:
      'A traditional Philippine mancala board game. Players distribute sigay (cowrie shells) across pits, practicing mathematical discipline, foresight, and prudent resource calculation.',
    blurb: 'Carved wooden mathematical strategy game of shell redistribution.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },

  // ── 4. PHILIPPINE FARM & RURAL LIFE ──
  {
    id: 'farm-araro',
    kind: 'farm-life',
    nameFilipino: 'Araro at Pamatok ng Kalabaw',
    nameEnglish: 'Carabao Wooden Plow & Yoke',
    emoji: '🌾',
    shelfTier: 'Shelf 4: Farm Life',
    material: 'Forged Iron Tip & Hardwood Frame',
    rarity: 'Common',
    culturalStory:
      'The iconic wooden plow used across Central Luzon and the Visayas. Hitched to the carabao’s neck yoke, it breaks muddy paddy soils before planting seasonal palay.',
    blurb: 'Traditional rice-paddy plow representing the backbone of farming.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'farm-bilao',
    kind: 'farm-life',
    nameFilipino: 'Bilaong Kawayan at Bakol',
    nameEnglish: 'Woven Bamboo Bilao Winnowing Tray',
    emoji: '🧺',
    shelfTier: 'Shelf 4: Farm Life',
    material: 'Split Bamboo Strips & Rattan Trim',
    rarity: 'Common',
    culturalStory:
      'Round, flat woven bamboo trays used by farming families to winnow rice grain from chaff in the breeze, and to serve festive kakanin and pancit during barangay fiestas.',
    blurb: 'Multi-purpose bamboo tray for winnowing grain and festive dining.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'farm-itak',
    kind: 'farm-life',
    nameFilipino: 'Itak ng Magsasaka at Kaluban',
    nameEnglish: "Farmer's Machete (Itak) & Wooden Scabbard",
    emoji: '🗡️',
    shelfTier: 'Shelf 4: Farm Life',
    material: 'Recycled Leaf-Spring Carbon Steel & Guava Wood',
    rarity: 'Common',
    culturalStory:
      'The indispensable companion in the field. From clearing forest weeds and chopping bamboo to opening young coconuts for refreshing buko juice under the midday heat.',
    blurb: 'Hand-forged carbon steel machete worn daily by Filipino farmers.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'farm-karit',
    kind: 'farm-life',
    nameFilipino: 'Karit sa Pag-aani ng Palay',
    nameEnglish: 'Rice Harvesting Sickle',
    emoji: '🪝',
    shelfTier: 'Shelf 4: Farm Life',
    material: 'Curved Tempered Steel & Turned Wood Handle',
    rarity: 'Common',
    culturalStory:
      'Serrated curved blade gripped during golden harvest days. Farmers work in unison across the paddies to reap bundles of ripe palay under the October sun.',
    blurb: 'Curved harvesting blade for reaping golden rice fields.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'farm-dulos',
    kind: 'farm-life',
    nameFilipino: 'Dulos sa Paghahalaman',
    nameEnglish: 'Hand Trowel & Weeding Blade (Dulos)',
    emoji: '⛏️',
    shelfTier: 'Shelf 4: Farm Life',
    material: 'Blacksmith Forged Iron & Bamboo Grip',
    rarity: 'Common',
    culturalStory:
      'A compact pointed iron blade used for delicate garden soil loosening, weeding vegetable patches, and transplanting seedlings into backyard plots.',
    blurb: 'Handheld digging tool essential for backyard vegetable gardens.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'farm-kabyawan',
    kind: 'farm-life',
    nameFilipino: 'Kabyawan ng Tubo (Pigaan ng Asukal)',
    nameEnglish: 'Traditional Sugarcane Roller Mill',
    emoji: '🎍',
    shelfTier: 'Shelf 4: Farm Life',
    material: 'Solid Hardwood Rollers & Iron Cog System',
    rarity: 'Rare',
    culturalStory:
      'Found across Negros and Panay sugar haciendas. Turned by a walking carabao, the heavy wooden rollers crush sweet sugarcane stalks into rich brown muscovado juice.',
    blurb: 'Historic wooden roller mill for pressing fresh sugarcane juice.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'farm-bangko',
    kind: 'farm-life',
    nameFilipino: 'Bangkong Kahoy sa Silong',
    nameEnglish: "Farmer's Handcrafted Tree-Shade Bench",
    emoji: '🪑',
    shelfTier: 'Shelf 4: Farm Life',
    material: 'Solid Mango Slab with Pegged Joints',
    rarity: 'Common',
    culturalStory:
      'Resting beneath the broad shade of a mango tree, this simple bench offers weary farmers a place to take a midday nap and share coffee after dawn plowing.',
    blurb: 'Sturdy wooden bench for well-earned midday farm siestas.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },
  {
    id: 'farm-bayong',
    kind: 'farm-life',
    nameFilipino: 'Bayong na Banig ng Buri',
    nameEnglish: 'Woven Buri Palm Market Bayong',
    emoji: '🛍️',
    shelfTier: 'Shelf 4: Farm Life',
    material: 'Handwoven Buri Palm Leaves',
    rarity: 'Common',
    culturalStory:
      'The traditional eco-friendly market bag carried by mothers and farmers to the town palengke to bring home fresh vegetables, dried fish, and morning pan de sal.',
    blurb: 'Sturdy handwoven palm tote for farm harvest and market errands.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
  },

  // ── 5. HESTIA'S WEARABLE NATIONAL COSTUMES ──
  {
    id: 'damit-barot-saya',
    kind: 'national-costumes',
    nameFilipino: "Baro't Sayang Maria Clara",
    nameEnglish: "Maria Clara Baro't Saya (Wearable)",
    emoji: '👘',
    shelfTier: 'Shelf 5: Costumes',
    material: 'Woven Piña Cloth & Embroidered Jusi Silk',
    rarity: 'Rare',
    culturalStory:
      'The quintessential national costume of Filipino women, consisting of an airy baro blouse, a panuelo kerchief, and a sweeping saya skirt. Wearable by Hestia as an emblem of grace and elegance.',
    blurb: 'Exquisite pineapple-fiber formal dress wearable by Hestia.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
    wearable: true,
    lookType: 'costume',
  },
  {
    id: 'damit-barong-tagalog',
    kind: 'national-costumes',
    nameFilipino: 'Pormal na Barong Tagalog ni Hestia',
    nameEnglish: 'Embroidered Barong Tagalog (Wearable)',
    emoji: '👔',
    shelfTier: 'Shelf 5: Costumes',
    material: 'Hand-Embroidered Lumban Piña-Organza',
    rarity: 'Rare',
    culturalStory:
      'The formal national garment of the Philippines. Tailored with meticulous open-work embroidery (calado) from Lumban, Laguna. Hestia wears this dignified look during proud milestone celebrations.',
    blurb: 'Dignified hand-embroidered national attire wearable by Hestia.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
    wearable: true,
    lookType: 'costume',
  },
  {
    id: 'damit-terno',
    kind: 'national-costumes',
    nameFilipino: 'Traje de Mestiza na may Butterfly Sleeves',
    nameEnglish: 'Traje de Mestiza Butterfly Terno (Wearable)',
    emoji: '🦋',
    shelfTier: 'Shelf 5: Costumes',
    material: 'Sculpted Silk Satin & Crisp Organza Sleeves',
    rarity: 'Epic',
    culturalStory:
      'Featuring high, architecturally sculpted butterfly sleeves that symbolize the regal pride and modernization of Philippine couture.',
    blurb: 'Iconic butterfly-sleeve national dress wearable by Hestia.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
    wearable: true,
    lookType: 'costume',
  },
  {
    id: 'damit-tboli',
    kind: 'national-costumes',
    nameFilipino: "Kasuotang T'boli ng Lake Sebu",
    nameEnglish: "T'boli Sacred T'nalak Regalia (Wearable)",
    emoji: '🔔',
    shelfTier: 'Shelf 5: Costumes',
    material: "Sacred Dreamweaver's T'nalak & Brass Hawk Bells",
    rarity: 'Epic',
    culturalStory:
      "Woven by master Dreamweavers of Lake Sebu who receive geometric tapestry patterns in their dreams from the spirit Fu Dalu. Accented with tinkling brass hawk bells and colorful beaded headdresses.",
    blurb: "Sacred T'nalak regalia with jingling brass bells for Hestia.",
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
    wearable: true,
    lookType: 'costume',
  },
  {
    id: 'damit-inaul',
    kind: 'national-costumes',
    nameFilipino: 'Inaul na Malong ng Maguindanao',
    nameEnglish: 'Inaul Royal Woven Malong (Wearable)',
    emoji: '🥻',
    shelfTier: 'Shelf 5: Costumes',
    material: 'Royal Cotton & Metallic Gold Brocade Weave',
    rarity: 'Rare',
    culturalStory:
      'A luminous handwoven textile from Maguindanao. The vibrant colors and chevron patterns reflect royalty, bravery, and ancestral pride of the Bangsamoro people.',
    blurb: 'Majestic handwoven royal silk brocade wearable by Hestia.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
    wearable: true,
    lookType: 'costume',
  },
  {
    id: 'damit-yakan',
    kind: 'national-costumes',
    nameFilipino: 'Kasuotang Yakan ng Basilan',
    nameEnglish: 'Yakan Geometric Weave Attire (Wearable)',
    emoji: '🎨',
    shelfTier: 'Shelf 5: Costumes',
    material: 'Natural-Dyed Cotton with Seputangan Motif',
    rarity: 'Rare',
    culturalStory:
      'Hailing from the island of Basilan, Yakan weaving is celebrated for staggering mathematical precision in complex diamond and zigzag weaves that take months to complete.',
    blurb: 'Vibrant kaleidoscope geometric woven garments from Basilan.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
    wearable: true,
    lookType: 'costume',
  },
  {
    id: 'damit-salakot-kimona',
    kind: 'national-costumes',
    nameFilipino: 'Kimona at Salakot ng Kabisayaan',
    nameEnglish: 'Visayan Kimona & Beaded Salakot (Wearable)',
    emoji: '👒',
    shelfTier: 'Shelf 5: Costumes',
    material: 'Translucent Piña Blouse & Woven Nito Salakot',
    rarity: 'Common',
    culturalStory:
      'Lighthearted festive attire worn during folk celebrations like Tinikling and Subli, paired with a sun-shielding woven salakot hat.',
    blurb: 'Breezy traditional festive outfit with farmer salakot hat.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
    wearable: true,
    lookType: 'costume',
  },
  {
    id: 'damit-kalinga',
    kind: 'national-costumes',
    nameFilipino: 'Kasuotang Kalinga (Tapis at Pulseras)',
    nameEnglish: 'Kalinga Highlands Tapis & Headdress (Wearable)',
    emoji: '📿',
    shelfTier: 'Shelf 5: Costumes',
    material: 'Backstrap Woven Indigo Wool & Red Agate Beads',
    rarity: 'Epic',
    culturalStory:
      'Hand-loomed along the misty Cordillera ridges of Kalinga. Dominated by fiery red and indigo stripes representing courage, mountain rivers, and ancestral protection.',
    blurb: 'Highland backstrap-loomed warrior attire wearable by Hestia.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
    wearable: true,
    lookType: 'costume',
  },

  // ── 6. PHILIPPINE ASWANG & MYTHICAL LOOKS FOR HESTIA ──
  {
    id: 'aswang-tikbalang',
    kind: 'aswang-monsters',
    nameFilipino: 'Mistikong Tikbalang Look',
    nameEnglish: 'Forest Guardian Tikbalang Look (Wearable)',
    emoji: '🐴',
    shelfTier: 'Shelf 6: Aswang & Mythical',
    material: 'Spectral Mane & Ancient Forest Mist',
    rarity: 'Epic',
    culturalStory:
      'The tall, equine forest protector of Philippine folklore. Legend says that anyone who can pluck the golden needle spine from its mane gains its lifelong loyalty and guidance through unfamiliar paths.',
    blurb: "Noble equine guardian skin giving Hestia a powerful mythical stance.",
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
    wearable: true,
    lookType: 'aswang',
  },
  {
    id: 'aswang-manananggal',
    kind: 'aswang-monsters',
    nameFilipino: 'Pakpak ng Hating-Gabi: Manananggal Look',
    nameEnglish: 'Midnight Bat-Winged Manananggal Look (Wearable)',
    emoji: '🦇',
    shelfTier: 'Shelf 6: Aswang & Mythical',
    material: 'Leathery Midnight Wings & Starlit Shadows',
    rarity: 'Legendary',
    culturalStory:
      'The most famous creature of Philippine lore, transformed into a heroic nocturnal sky traveler with large leathery bat wings that glide above moonlit rooftops and protect against financial traps.',
    blurb: 'Dramatic midnight bat wings transforming Hestia into a night guardian.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
    wearable: true,
    lookType: 'aswang',
  },
  {
    id: 'aswang-kapre',
    kind: 'aswang-monsters',
    nameFilipino: 'Chieftain Kapre ng Balete',
    nameEnglish: 'Balete Chieftain Kapre Look (Wearable)',
    emoji: '🌳',
    shelfTier: 'Shelf 6: Aswang & Mythical',
    material: 'Mossy Balete Bark & Herbal Smoke Aura',
    rarity: 'Rare',
    culturalStory:
      'The gentle giant who resides high in century-old Balete trees, quietly observing passersby while puffing a giant cigar. Grants deep stillness, patience, and long-term asset accumulation wisdom.',
    blurb: 'Giant tree-dwelling look with mossy aura and peaceful composure.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
    wearable: true,
    lookType: 'aswang',
  },
  {
    id: 'aswang-bakunawa',
    kind: 'aswang-monsters',
    nameFilipino: 'Bakunawa: Dragon ng Pitong Buwan',
    nameEnglish: 'Bakunawa Moon-Swallowing Sea Dragon Look (Wearable)',
    emoji: '🐉',
    shelfTier: 'Shelf 6: Aswang & Mythical',
    material: 'Iridescent Abyssal Dragon Scales',
    rarity: 'Legendary',
    culturalStory:
      'The colossal serpentine sea dragon of ancient Visayan cosmology who swallowed the seven moons in the sky, creating eclipses until villagers banged their drums to save the light.',
    blurb: 'Breathtaking serpentine sea dragon avatar crowned with celestial moons.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
    wearable: true,
    lookType: 'aswang',
  },
  {
    id: 'aswang-sirena',
    kind: 'aswang-monsters',
    nameFilipino: 'Mahiwagang Sirena ng Karagatan',
    nameEnglish: 'Luminescent Coral Sirena / Mermaid Look (Wearable)',
    emoji: '🧜‍♀️',
    shelfTier: 'Shelf 6: Aswang & Mythical',
    material: 'Gleaming Mother-of-Pearl & Coral Filigree',
    rarity: 'Rare',
    culturalStory:
      'The mythical sea maiden who guards the secret treasures and pearl beds of the Philippine deep sea, guiding lost fishermen safely past treacherous storms.',
    blurb: 'Shimmering underwater pearl guardian look for Hestia.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
    wearable: true,
    lookType: 'aswang',
  },
  {
    id: 'aswang-diwata',
    kind: 'aswang-monsters',
    nameFilipino: 'Diwata ng Maria Makiling',
    nameEnglish: 'Mountain Sanctuary Diwata Look (Wearable)',
    emoji: '🌿',
    shelfTier: 'Shelf 6: Aswang & Mythical',
    material: 'Living Ferns, Orchids & Mountain Dew Mist',
    rarity: 'Epic',
    culturalStory:
      'The benevolent mountain guardian goddess who shields the flora, fauna, and generous villagers of Laguna. She reminds all families to care for nature and preserve their emergency cushions.',
    blurb: 'Enchanting floral and morning-mist forest goddess look.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
    wearable: true,
    lookType: 'aswang',
  },
  {
    id: 'aswang-nuno',
    kind: 'aswang-monsters',
    nameFilipino: 'Nuno sa Punso: Munting Bantay ng Lupa',
    nameEnglish: 'Earth Spirit Nuno sa Punso Look (Wearable)',
    emoji: '🍄',
    shelfTier: 'Shelf 6: Aswang & Mythical',
    material: 'Ancient Ant-Mound Earth & Weathered Staff',
    rarity: 'Common',
    culturalStory:
      'The ancient dwarf elder who lives inside earth mounds (punso). Revered with the respectful greeting "Tabi-tabi po", teaching travelers to walk respectfully and budget with prudence.',
    blurb: 'Wise little earth spirit look with miniature staff and beard.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
    wearable: true,
    lookType: 'aswang',
  },
  {
    id: 'aswang-tiyanak',
    kind: 'aswang-monsters',
    nameFilipino: 'Mapanlinlang na Tiyanak Look',
    nameEnglish: 'Clever Forest Imp Tiyanak Look (Wearable)',
    emoji: '🐾',
    shelfTier: 'Shelf 6: Aswang & Mythical',
    material: 'Playful Forest Shadows & Amber Eyes',
    rarity: 'Rare',
    culturalStory:
      'A mischievous trickster of the woods who tests whether travelers can discern reality from illusion—just like spotting deceptive online financial scams and phishing lures!',
    blurb: 'Cheeky mythical imp look equipped with scam-detecting vision.',
    unlockRequirement: 'Complete your daily drop on Sunday, then open the weekly reward.',
    wearable: true,
    lookType: 'aswang',
  },
];

const extras: Collectible[] = [
 ['farm-kalabaw','farm-life','Kalabaw','Water buffalo','🐃'],['farm-palay','farm-life','Palay','Rice plant','🌾'],['farm-mangga','farm-life','Mangga','Mango','🥭'],['farm-tubo','farm-life','Tubo','Sugar cane','🌱'],['farm-buko','farm-life','Buko','Young coconut','🥥'],['symbol-jeepney','national-symbols','Jeepney','Filipino jeepney','🚌'],['money-spanish-peso','ph-money','Pisong Pilak','Spanish-Filipino peso','🪙'],['damit-katipunero','national-costumes','Katipunero','Bandana and camisa de chino','👕']
].map(([id,kind,nameFilipino,nameEnglish,emoji]) => ({id,kind:kind as CollectibleKind,nameFilipino,nameEnglish,emoji,shelfTier:'Heritage collection',material:'Digital collectible',rarity:'Rare',culturalStory: nameEnglish+' is part of the Philippine cultural collection. Build your daily learning habit to discover it.',blurb:nameEnglish,unlockRequirement:'Complete a daily drop on Sunday, then open your weekly reward.',wearable:kind==='national-costumes',lookType:kind==='national-costumes'?'costume':undefined}));
export const COLLECTIBLES = [...ALL_COLLECTIBLES.filter(c => c.kind !== 'ancient-things'), ...extras];

export const COLLECTIBLE_BY_ID: Record<string, Collectible> = Object.fromEntries(
  COLLECTIBLES.map((c) => [c.id, c]),
);
