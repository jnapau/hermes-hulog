/**
 * Hulog Question Bank — Complete Year-Long Curriculum (FRP 101–108).
 *
 * Mapped to the 6 Financial Pyramid Tiers:
 * 1. Cash Management (FRP 101, 102, 103)
 * 2. Debt Management (FRP 105)
 * 3. Emergency & Savings (FRP 104)
 * 4. Accumulation & Net Worth (FRP 106)
 * 5. Protection & Insurance (FRP 107)
 * 6. Crisis Resilience (FRP 108 — 52 Sunday Boss Shock Simulations)
 *
 * Every single question features:
 * - English prompt matching hermes.exoasia.org
 * - Tagalog / Filipino translation (promptFilipino)
 * - Explicit Financial Tier label
 * - Anonymous Community Answer Statistics
 */
import type { FinancialTier, Question } from './types';

export const QUESTIONS: Question[] = [
  {
    "id": "Q-101-01",
    "course": 101,
    "tier": "Cash Management",
    "format": "Sweldo Sort",
    "kind": "sort",
    "prompt": "Sort your incoming payday expenses before the money runs out:",
    "promptFilipino": "I-sort ang mga sumusunod na bayarin sa sweldo bago maubos:",
    "categories": [
      "Need",
      "Want",
      "Obligation",
      "Ipon"
    ],
    "items": [
      {
        "key": "A",
        "text": "Electricity Bill (Meralco)",
        "textFilipino": "Kuryente (Meralco)",
        "answer": "Need"
      },
      {
        "key": "B",
        "text": "Café Specialty Coffee",
        "textFilipino": "Kape sa coffee shop",
        "answer": "Want"
      },
      {
        "key": "C",
        "text": "Parents Remittance (Padala)",
        "textFilipino": "Padala sa magulang",
        "answer": "Obligation"
      },
      {
        "key": "D",
        "text": "₱500 to Alkansya Savings",
        "textFilipino": "₱500 sa Alkansya",
        "answer": "Ipon"
      }
    ],
    "answerLabel": "A = Need · B = Want · C = Obligation · D = Ipon",
    "why": "Family padala is an obligation that must be planned in a dedicated budget envelope, not treated as an afterthought with whatever cash is left.",
    "whyFilipino": "Ang padala sa pamilya ay obligation na dapat pinaplano sa budget envelope, hindi kung ano lang ang matira.",
    "hakbang": "Set up a 'Family Support Envelope' in your Hermes safe-to-spend tracker.",
    "communityStats": {
      "correctPct": 82,
      "sampleSize": 1420,
      "topMisconception": "Treating family padala as a discretionary Want"
    }
  },
  {
    "id": "Q-101-02",
    "course": 101,
    "tier": "Cash Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Earning a high salary automatically makes you resilient and safe from financial shocks.",
    "promptFilipino": "Kapag malaki ang sweldo mo, automatic na resilient at ligtas ka na sa financial shock.",
    "answer": "MALI",
    "answerLabel": "FALSE (Income ≠ Resilience)",
    "why": "Even with a 6-digit income, if expenses match earnings and no buffer exists, a single emergency can push a household into debt.",
    "whyFilipino": "Kahit 6-digit ang kita, kung mas mataas ang gastusin at walang buffer, isang emergency lang ay baon agad sa utang.",
    "hakbang": "Review your Essential Monthly Spend number in the Hermes companion.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 1650,
      "topMisconception": "Equating high cash inflow with financial security"
    }
  },
  {
    "id": "Q-101-03",
    "course": 101,
    "tier": "Cash Management",
    "format": "Ano'ng Gagawin Mo?",
    "kind": "choice",
    "prompt": "You have ₱2,000 left before the next cut-off. An online app flashes a 50% flash sale on shoes you have been eyeing. What is your best move?",
    "promptFilipino": "May natira kang ₱2,000 bago ang susunod na cut-off. May sale sa online app na 50% off sa sapatos na matagal mo nang tinitingnan. Ano ang gagawin mo?",
    "options": [
      {
        "key": "A",
        "text": "Buy immediately to take advantage of 50% off",
        "textFilipino": "Bilhin agad dahil 50% off"
      },
      {
        "key": "B",
        "text": "Park in cart and wait for the 48-Hour Cooling Rule",
        "textFilipino": "I-park sa cart at mag-antay ng 48 hours"
      },
      {
        "key": "C",
        "text": "Use a credit card so your cash remains untouched",
        "textFilipino": "Gamitin ang credit card para 'di magalaw ang cash"
      }
    ],
    "answer": "B",
    "answerLabel": "B: 48-Hour Cooling Rule",
    "why": "The 48-hour cooling period is proven to dismantle impulse buys. If you still genuinely need it on the next payday, allocate it in your Wants envelope.",
    "whyFilipino": "Ang 48-hour cooling rule ay subok na panlaban sa impulse buying. Kung gusto mo pa rin sa susunod na sahod, planuhin sa Wants envelope.",
    "hakbang": "List one non-essential item in your Wishlist buffer instead of buying it today.",
    "communityStats": {
      "correctPct": 69,
      "sampleSize": 2100,
      "topMisconception": "Anchoring Bias on 50% discount label"
    }
  },
  {
    "id": "Q-101-04",
    "course": 101,
    "tier": "Cash Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Financial literacy (knowing financial formulas) and financial capability (practicing them daily) are the exact same thing.",
    "promptFilipino": "Ang financial literacy (alam ang formula) at financial capability (ginagawa sa totoong buhay) ay magkapareho.",
    "answer": "MALI",
    "answerLabel": "FALSE (Literacy ≠ Capability)",
    "why": "BSP surveys show 74% can calculate basic interest, but only 30% have an emergency fund. Real capability is what you practice every day.",
    "whyFilipino": "Ayon sa BSP survey, 74% ang marunong sa basic math, pero 30% lang ang may emergency fund. Ang mahalaga ay ang ginagawa araw-araw.",
    "hakbang": "Commit to a 1-minute daily Hulog habit check.",
    "communityStats": {
      "correctPct": 76,
      "sampleSize": 1840,
      "topMisconception": "Thinking knowledge alone guarantees financial success"
    }
  },
  {
    "id": "Q-101-05",
    "course": 101,
    "tier": "Cash Management",
    "format": "Sweldo Sort",
    "kind": "choice",
    "prompt": "Where does an entertainment streaming subscription belong in your household budget?",
    "promptFilipino": "Saan nabibilang ang video streaming subscription sa household budget mo?",
    "options": [
      {
        "key": "A",
        "text": "Essential Need (Utility bill)",
        "textFilipino": "Need (Kailangan sa bahay)"
      },
      {
        "key": "B",
        "text": "Discretionary Want (Pampalipas-oras)",
        "textFilipino": "Want (Pampalipas-oras)"
      },
      {
        "key": "C",
        "text": "Family Obligation",
        "textFilipino": "Obligation sa pamilya"
      }
    ],
    "answer": "B",
    "answerLabel": "B: Discretionary Want",
    "why": "Entertainment streaming is a luxury want. During financial strain or lean months, it is among the easiest subscriptions to pause.",
    "whyFilipino": "Ang streaming ay isang Want. Kapag gipit o kailangan magtipid, ito ang unang puwedeng i-pause pansamantala.",
    "hakbang": "Audit your active digital subscriptions and pause unused ones.",
    "communityStats": {
      "correctPct": 91,
      "sampleSize": 1320,
      "topMisconception": "Classifying home entertainment as an essential utility"
    }
  },
  {
    "id": "Q-101-06",
    "course": 101,
    "tier": "Cash Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "If you have irregular income (freelancer, commission, self-employed), you cannot maintain a budget.",
    "promptFilipino": "Kung pabago-bago (irregular) ang kita mo tulad ng freelancer o may negosyo, imposibleng mag-budget.",
    "answer": "MALI",
    "answerLabel": "FALSE (Baseline Budgeting)",
    "why": "Irregular earners budget around their \"Baseline Survival Spend\"—the lowest monthly income recorded over the past year.",
    "whyFilipino": "Ang irregular earners ay nagba-badyet gamit ang Baseline Minimum Expense mula sa kanilang pinakamababang buwanang kita.",
    "hakbang": "Compute your bare-minimum survival budget for 1 month.",
    "communityStats": {
      "correctPct": 84,
      "sampleSize": 1560,
      "topMisconception": "Assuming only fixed-salary employees can budget"
    }
  },
  {
    "id": "Q-101-07",
    "course": 101,
    "tier": "Cash Management",
    "format": "Sweldo Sort",
    "kind": "choice",
    "prompt": "When dividing your salary on payday, which sequence prevents you from running short before the 15th/30th?",
    "promptFilipino": "Sa paghahati ng sweldo sa araw ng sahod, aling pagkakasunod-sunod ang umiiwas sa petsa de peligro?",
    "options": [
      {
        "key": "A",
        "text": "Spend freely on wants, pay bills later, save leftovers",
        "textFilipino": "Gastusin sa luho, bayaran ang bills kung may matira, ipon ang huli"
      },
      {
        "key": "B",
        "text": "Pay essentials & savings first, set family envelope, spend remaining safe cash",
        "textFilipino": "Ibukod ang essentials at ipon, itabi ang padala, gastusin ang safe-to-spend"
      },
      {
        "key": "C",
        "text": "Leave everything in the ATM card and swipe until declined",
        "textFilipino": "Iwan lahat sa ATM at mag-swipe hanggang maubos"
      }
    ],
    "answer": "B",
    "answerLabel": "B: Pay Yourself & Essentials First",
    "why": "Reverse budgeting (Pay Yourself First + ring-fencing essentials) guarantees bills and savings are covered before leisure spending starts.",
    "whyFilipino": "Ang pagbubukod sa ipon at essential bills sa unang araw pa lang ay tinitiyak na hindi magagalaw ang pambayad.",
    "hakbang": "Automate a ₱500 savings transfer on your exact salary credit date.",
    "communityStats": {
      "correctPct": 93,
      "sampleSize": 1980,
      "topMisconception": "Saving whatever is left at the end of the cutoff"
    }
  },
  {
    "id": "Q-101-08",
    "course": 101,
    "tier": "Cash Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Setting a strict personal boundary on how much you can lend to relatives is selfish and unfilial.",
    "promptFilipino": "Ang pagtatakda ng limitasyon sa halagang maipapautang sa kamag-anak ay tanda ng pagiging maramot.",
    "answer": "MALI",
    "answerLabel": "FALSE (Healthy Boundaries)",
    "why": "A clear boundary protects you from sinking into debt yourself, allowing you to sustainably assist your family in true crises.",
    "whyFilipino": "Ang malinaw na limitasyon ay nagpoprotekta sa sarili mong katatagan upang patuloy kang makatulong nang hindi nalulubog sa utang.",
    "hakbang": "Decide your fixed monthly family support cap with Hermes.",
    "communityStats": {
      "correctPct": 78,
      "sampleSize": 2210,
      "topMisconception": "Guilt over refusing loan requests beyond personal means"
    }
  },
  {
    "id": "Q-101-09",
    "course": 101,
    "tier": "Cash Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Tracking every single peso for 30 consecutive days will cure all your financial stress permanently.",
    "promptFilipino": "Ang paglilista ng bawat sentimo araw-araw sa loob ng 30 araw ay permanenteng lulutas sa lahat ng problema sa pera.",
    "answer": "MALI",
    "answerLabel": "FALSE (Habit System > Obsessive Tracking)",
    "why": "Micro-tracking without structural envelopes leads to habit fatigue. What works is automated envelope allocation and a Safe-to-Spend limit.",
    "whyFilipino": "Ang sobrang paglilista nang walang sistema ay nakakapagod. Ang mas epektibo ay budget envelopes at Safe-to-Spend number.",
    "hakbang": "Focus on your daily Safe-to-Spend ceiling instead of logging every coin.",
    "communityStats": {
      "correctPct": 71,
      "sampleSize": 1190,
      "topMisconception": "Thinking tedious bookkeeping replaces structural budgeting"
    }
  },
  {
    "id": "Q-101-10",
    "course": 101,
    "tier": "Cash Management",
    "format": "Ano'ng Gagawin Mo?",
    "kind": "choice",
    "prompt": "You receive an unexpected ₱5,000 performance bonus at work. How should you allocate it?",
    "promptFilipino": "Nakatanggap ka ng hindi inaasahang ₱5,000 performance bonus sa trabaho. Paano mo ito hahatiin?",
    "options": [
      {
        "key": "A",
        "text": "Spend all of it immediately on a celebratory dinner",
        "textFilipino": "I-blowout agad sa mamahaling dinner"
      },
      {
        "key": "B",
        "text": "Allocate 80% to emergency buffer / debt and 20% for guilt-free celebration",
        "textFilipino": "80% sa emergency fund/utang, at 20% para sa masayang selebrasyon"
      },
      {
        "key": "C",
        "text": "Lend the whole ₱5,000 to a friend asking for capital",
        "textFilipino": "Ipautang ang buong ₱5,000 sa kaibigan"
      }
    ],
    "answer": "B",
    "answerLabel": "B: The 80/20 Windfall Rule",
    "why": "The 80/20 rule rewards your hard work while accelerating your household security and keeping lifestyle inflation in check.",
    "whyFilipino": "Ang 80/20 rule ay nagbibigay-buhay sa iyong pagsisikap habang pinapatibay ang iyong emergency buffer.",
    "hakbang": "Set up an 80/20 rule for any future bonuses or tax refunds.",
    "communityStats": {
      "correctPct": 86,
      "sampleSize": 1740,
      "topMisconception": "All-or-nothing thinking regarding unexpected bonuses"
    }
  },
  {
    "id": "Q-101-11",
    "course": 101,
    "tier": "Cash Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "A monthly household budget must always remain identical every month of the year.",
    "promptFilipino": "Ang buwanang badyet ng pamilya ay dapat palaging pareho sa bawat buwan ng taon.",
    "answer": "MALI",
    "answerLabel": "FALSE (Seasonal Adjustments)",
    "why": "Expenses shift with Philippine seasons (e.g. June tuition, December holidays, May electric cooling bills). A realistic budget flexes with seasonal sinking funds.",
    "whyFilipino": "Nagbabago ang gastusin ayon sa panahon tulad ng pasukan sa Hunyo at Pasko sa Disyembre. Dapat may sinking fund sa bawat okasyon.",
    "hakbang": "Check the upcoming seasonal expenses for next month in Hermes.",
    "communityStats": {
      "correctPct": 83,
      "sampleSize": 1410,
      "topMisconception": "Expecting fixed expenses never to fluctuate seasonally"
    }
  },
  {
    "id": "Q-101-12",
    "course": 101,
    "tier": "Cash Management",
    "format": "Sweldo Sort",
    "kind": "choice",
    "prompt": "You are helping your sibling with college expenses. Which category should this be categorized under?",
    "promptFilipino": "Tumutulong ka sa matrikula ng iyong kapatid sa kolehiyo. Saan ito dapat i-kategorya?",
    "options": [
      {
        "key": "A",
        "text": "Family Support Obligation Envelope",
        "textFilipino": "Family Support / Obligation Envelope"
      },
      {
        "key": "B",
        "text": "Personal Leisure Want",
        "textFilipino": "Personal na Luho / Want"
      },
      {
        "key": "C",
        "text": "Miscellaneous Spare Change",
        "textFilipino": "Sobra-sobrang barya lang"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Family Support Envelope",
    "why": "Education assistance is an important household commitment. Allocating a formal envelope prevents emergency fund cannibalization.",
    "whyFilipino": "Ang tulong sa pag-aaral ay isang obligasyon na dapat nakapaloob sa nakalaang envelope upang hindi magalaw ang emergency fund.",
    "hakbang": "Create a dedicated Education Sinking Fund for your sibling.",
    "communityStats": {
      "correctPct": 90,
      "sampleSize": 1530,
      "topMisconception": "Funding education out of emergency savings"
    }
  },
  {
    "id": "Q-101-13",
    "course": 101,
    "tier": "Cash Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Cutting small daily pleasures like instant coffee will magically make you a millionaire in 3 years.",
    "promptFilipino": "Ang pagtitipid sa maliit na kape araw-araw ay gagawin kang milyonaryo sa loob ng 3 taon.",
    "answer": "MALI",
    "answerLabel": "FALSE (Focus on Big Fixed Costs)",
    "why": "While daily savings help, major financial resilience comes from optimizing housing, debt interest, vehicle loans, and family remittances.",
    "whyFilipino": "Bagamat nakakatulong ang barya, ang malaking pagbabago ay nagmumula sa pag-ayos ng upa, interes sa utang, at malalaking bayarin.",
    "hakbang": "Examine your top 3 largest monthly expenses instead of depriving small joys.",
    "communityStats": {
      "correctPct": 79,
      "sampleSize": 1670,
      "topMisconception": "Blaming small coffee splurges for systemic debt problems"
    }
  },
  {
    "id": "Q-101-14",
    "course": 101,
    "tier": "Cash Management",
    "format": "Ano'ng Gagawin Mo?",
    "kind": "choice",
    "prompt": "Payday falls on a Friday, but your rent is due on the 5th of the following month. What is the safest action?",
    "promptFilipino": "Pumasok ang sahod sa Biyernes, pero sa ika-5 pa ng susunod na buwan ang upa sa bahay. Ano ang pinakaligtas gawin?",
    "options": [
      {
        "key": "A",
        "text": "Transfer the rent immediately to a separate digital bills account or landlord",
        "textFilipino": "Ihiwalay agad ang pambayad ng upa sa hiwalay na bills account o ibayad agad"
      },
      {
        "key": "B",
        "text": "Keep it in your wallet and trust you will not touch it over the weekend",
        "textFilipino": "Iwan sa pitaka at umasang hindi magagastos sa weekend"
      },
      {
        "key": "C",
        "text": "Treat friends because your ATM balance is temporarily high",
        "textFilipino": "Mag-treat sa barkada dahil marami pang laman ang ATM"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Ring-Fence Critical Rent",
    "why": "Rent is an essential survival expense. Separating it immediately protects you from the weekend spending illusion.",
    "whyFilipino": "Ang upa ay pangunahing pangangailangan. Ang paghihiwalay nito agad ay panangga sa maling akala na marami kang sobrang pera.",
    "hakbang": "Set an automated scheduled transfer for your rent on payday.",
    "communityStats": {
      "correctPct": 94,
      "sampleSize": 1820,
      "topMisconception": "Leaving rent cash in a primary daily-spending wallet"
    }
  },
  {
    "id": "Q-101-15",
    "course": 101,
    "tier": "Cash Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "A breadwinner has the right to know their household members’ actual needs before sending financial aid.",
    "promptFilipino": "May karapatan ang breadwinner na alamin ang eksaktong pangangailangan ng pamilya bago magpadala ng tulong.",
    "answer": "TAMA",
    "answerLabel": "TRUE (Transparent Family Support)",
    "why": "Transparency in family assistance ensures funds are used for medical or educational necessities rather than avoidable habits.",
    "whyFilipino": "Ang bukas na komunikasyon ay nagbibigay-daan upang ang tulong ay mapunta sa totoong pangangailangan tulad ng gamot o matrikula.",
    "hakbang": "Hold a calm, non-judgmental monthly family budget alignment.",
    "communityStats": {
      "correctPct": 87,
      "sampleSize": 1490,
      "topMisconception": "Feeling shame or guilt for asking where remittance money goes"
    }
  },
  {
    "id": "Q-101-16",
    "course": 101,
    "tier": "Cash Management",
    "format": "Sweldo Sort",
    "kind": "sort",
    "prompt": "Categorize these 4 routine household cash outflows before payday ends:",
    "promptFilipino": "I-uri ang 4 na karaniwang gastusin sa bahay bago matapos ang araw ng sahod:",
    "categories": [
      "Need",
      "Want",
      "Obligation",
      "Ipon"
    ],
    "items": [
      {
        "key": "A",
        "text": "Prescription Maintenance Medicine",
        "textFilipino": "Maintenance na gamot ng magulang",
        "answer": "Need"
      },
      {
        "key": "B",
        "text": "Weekend Samgyupsal with Coworkers",
        "textFilipino": "Samgyupsal kasama ang katrabaho",
        "answer": "Want"
      },
      {
        "key": "C",
        "text": "Monthly SSS Voluntary Contribution",
        "textFilipino": "Buwanang hulog sa SSS",
        "answer": "Obligation"
      },
      {
        "key": "D",
        "text": "₱1,000 to Emergency Sinking Fund",
        "textFilipino": "₱1,000 sa Emergency Sinking Fund",
        "answer": "Ipon"
      }
    ],
    "answerLabel": "A = Need · B = Want · C = Obligation · D = Ipon",
    "why": "Maintenance medicines protect life (Need), statutory contributions ensure future pensions (Obligation), while dining out is discretionary (Want).",
    "whyFilipino": "Ang gamot ay pangkaligtasan (Need), ang SSS ay pensyon (Obligation), habang ang pagkain sa labas ay pansariling luho (Want).",
    "hakbang": "Automate your monthly SSS contribution via GCash or Maya.",
    "communityStats": {
      "correctPct": 85,
      "sampleSize": 1390,
      "topMisconception": "Neglecting statutory contributions as optional"
    }
  },
  {
    "id": "Q-102-01",
    "course": 102,
    "tier": "Cash Management",
    "format": "Ano'ng Gagawin Mo?",
    "kind": "choice",
    "prompt": "An older sibling asks for ₱8,000 for your nephew’s tuition, but you only have ₱3,000 left in your Family Support envelope. What is your best response?",
    "promptFilipino": "Humihingi si Kuya ng ₱8,000 para sa tuition ng pamangkin, pero ₱3,000 na lang ang natitira sa iyong Family Support envelope ngayong kinsenas.",
    "options": [
      {
        "key": "A",
        "text": "Take an online lending loan to produce the full ₱8,000",
        "textFilipino": "Mangutang sa loan app para mabuo ang ₱8,000"
      },
      {
        "key": "B",
        "text": "Say calmly: 'Kuya, ₱3,000 is what I can safely provide now without debt; I can assist again next cutoff.'",
        "textFilipino": "Sabihing: 'Kuya, ₱3,000 ang kaya ko ngayon nang hindi nagigipit, at puwede ulit sa katapusan.'"
      },
      {
        "key": "C",
        "text": "Ghost their messages on chat out of shame and guilt",
        "textFilipino": "'Wag sumagot sa chat dahil nahihiya"
      }
    ],
    "answer": "B",
    "answerLabel": "B: Realistic Boundary",
    "why": "Clear, compassionate boundaries preserve family relationships while preventing you from drowning in predatory loans.",
    "whyFilipino": "Ang malinaw at kalmadong limitasyon ay nagpapanatili ng pagmamahalan sa pamilya nang hindi ka nababaon sa sariling utang.",
    "hakbang": "Save Hestia’s boundary conversation scripts in your notes.",
    "communityStats": {
      "correctPct": 74,
      "sampleSize": 2450,
      "topMisconception": "Borrowing money at high interest just to satisfy family requests"
    }
  },
  {
    "id": "Q-102-02",
    "course": 102,
    "tier": "Cash Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Present Bias makes human brains prioritize instant comfort today over long-term financial security 10 years from now.",
    "promptFilipino": "Ang Present Bias ay nagdudulot sa utak natin na unahin ang panandaliang sarap ngayon kaysa sa ipon para sa kinabukasan.",
    "answer": "TAMA",
    "answerLabel": "TRUE (Present Bias)",
    "why": "Behavioral psychology proves our brain discounts future rewards. Counteract this by automating savings so willpower is not required.",
    "whyFilipino": "Natural sa tao na unahin ang pangkasalukuyan. Labanan ito sa pamamagitan ng automated transfers upang hindi umasa sa willpower.",
    "hakbang": "Set an automatic transfer to your digital bank on payday morning.",
    "communityStats": {
      "correctPct": 89,
      "sampleSize": 1610,
      "topMisconception": "Believing poor saving habits stem purely from lack of intelligence"
    }
  },
  {
    "id": "Q-102-03",
    "course": 102,
    "tier": "Cash Management",
    "format": "Ano'ng Gagawin Mo?",
    "kind": "choice",
    "prompt": "All your colleagues at work are ordering expensive milk tea or dining at high-end restaurants daily. You feel pressured to join. What should you do?",
    "promptFilipino": "Lahat ng katrabaho mo ay araw-araw nag-oorder ng mamahaling kape o kumakain sa mamahaling restaurant. Nahihiya kang tumanggi. Ano ang gagawin mo?",
    "options": [
      {
        "key": "A",
        "text": "Join every single day and swipe your credit card so you fit in",
        "textFilipino": "Sumama araw-araw at mag-swipe ng card para hindi ma-outcast"
      },
      {
        "key": "B",
        "text": "Set a weekly social eating budget (e.g. join once a week on Fridays)",
        "textFilipino": "Magtakda ng social budget: sumama nang 1 beses kada linggo (tuwing Biyernes)"
      },
      {
        "key": "C",
        "text": "Resign immediately to avoid peer pressure completely",
        "textFilipino": "Mag-resign agad sa trabaho"
      }
    ],
    "answer": "B",
    "answerLabel": "B: Moderate Social Envelope",
    "why": "Social comparison (FOMO) causes lifestyle inflation. Capping participation to once weekly maintains camaraderie without wrecking your budget.",
    "whyFilipino": "Ang pakikisama ay mahalaga, ngunit ang pagtatakda ng limitasyon (tulad ng Biyernes lang) ay pumipigil sa pagkabaon sa utang.",
    "hakbang": "Designate your weekly dining-out budget with friends.",
    "communityStats": {
      "correctPct": 92,
      "sampleSize": 1890,
      "topMisconception": "Thinking pakikisama requires matching everyone else’s spending"
    }
  },
  {
    "id": "Q-102-04",
    "course": 102,
    "tier": "Cash Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "The Sunk Cost Fallacy makes people continue investing money into a failing business or relationship just because they already invested heavily before.",
    "promptFilipino": "Dahil sa Sunk Cost Fallacy, patuloy na naglalabas ng pera ang tao sa naluluging negosyo dahil nanghihinayang sa naunang nagastos.",
    "answer": "TAMA",
    "answerLabel": "TRUE (Sunk Cost Fallacy)",
    "why": "Past unrecoverable expenses should never dictate future decisions. Cut losses early when the business model is unsustainable.",
    "whyFilipino": "Ang perang nagastos na at hindi na maibabalik ay hindi dapat maging dahilan upang magpalugi pa lalo. Matutong huminto kung kinakailangan.",
    "hakbang": "Audit any personal project or subscription currently bleeding money.",
    "communityStats": {
      "correctPct": 81,
      "sampleSize": 1510,
      "topMisconception": "Throwing good money after bad out of emotional attachment"
    }
  },
  {
    "id": "Q-102-05",
    "course": 102,
    "tier": "Cash Management",
    "format": "Ano'ng Gagawin Mo?",
    "kind": "choice",
    "prompt": "You receive a salary raise of ₱10,000 per month. How do you prevent Lifestyle Creep?",
    "promptFilipino": "Nakatanggap ka ng promosyon at dagdag na ₱10,000 sa sweldo. Paano mo maiiwasan ang Lifestyle Creep?",
    "options": [
      {
        "key": "A",
        "text": "Upgrade your apartment and phone amortizations immediately to absorb the ₱10,000",
        "textFilipino": "Kumuha agad ng bagong hulugang phone at lumipat sa mas mahal na condo"
      },
      {
        "key": "B",
        "text": "Direct at least 50–70% of the raise automatically to emergency buffer & investments",
        "textFilipino": "I-direkta ang 50–70% ng dagdag-sahod sa emergency buffer at ipon bago gastusin ang natitira"
      },
      {
        "key": "C",
        "text": "Treat every single neighbor in your barangay",
        "textFilipino": "I-treat ang buong barangay"
      }
    ],
    "answer": "B",
    "answerLabel": "B: Capture the Raise First",
    "why": "If you capture at least half of any raise into building reserves, your wealth grows exponentially while still enjoying a modest lifestyle boost.",
    "whyFilipino": "Kapag itinabi mo ang kalahati ng dagdag-sahod sa unang araw pa lang, lalago ang iyong ipon nang hindi ka naiipit sa tumataas na gastusin.",
    "hakbang": "Increase your monthly automated savings by half of your recent raise.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 1980,
      "topMisconception": "Upgrading recurring fixed lifestyle costs to match higher income"
    }
  },
  {
    "id": "Q-102-06",
    "course": 102,
    "tier": "Cash Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Retail therapy (shopping when stressed, sad, or exhausted) provides permanent, lasting emotional relief.",
    "promptFilipino": "Ang retail therapy (pamimili kapag stressed o pagod sa trabaho) ay nagbibigay ng pangmatagalang kaluwagan sa damdamin.",
    "answer": "MALI",
    "answerLabel": "FALSE (Dopamine Spike vs Buyer Remorse)",
    "why": "Shopping delivers a fleeting dopamine burst that fades within hours, often replaced by guilt when credit card statements arrive.",
    "whyFilipino": "Panandaliang dopamine spike lang ang shopping. Paglipas ng ilang oras, napapalitan ito ng pagsisisi kapag dumating ang bill.",
    "hakbang": "Replace emotional spending with a 20-minute walk or a restorative hot shower.",
    "communityStats": {
      "correctPct": 91,
      "sampleSize": 1720,
      "topMisconception": "Mistaking impulse shopping for genuine self-care"
    }
  },
  {
    "id": "Q-102-07",
    "course": 102,
    "tier": "Cash Management",
    "format": "Ano'ng Gagawin Mo?",
    "kind": "choice",
    "prompt": "A neighbor brags on Facebook about earning 20% guaranteed returns every month through a crypto trading club. You feel left behind. What is the smartest reaction?",
    "promptFilipino": "Ipinagmamalaki ng kapitbahay sa Facebook na kumikita siya ng 20% kada buwan sa isang crypto club. Naiinggit ka. Ano ang dapat gawin?",
    "options": [
      {
        "key": "A",
        "text": "Mortgage your family lot to invest and match their earnings",
        "textFilipino": "Isangla ang lupa para makasabay sa kitaan"
      },
      {
        "key": "B",
        "text": "Recognize FOMO, verify with the SEC advisory list, and protect your hard-earned cash",
        "textFilipino": "Kilalanin ang FOMO, i-check ang SEC advisory, at protektahan ang ipon"
      },
      {
        "key": "C",
        "text": "Borrow from a lending app to invest immediately",
        "textFilipino": "Mangutang sa loan app para makasali agad"
      }
    ],
    "answer": "B",
    "answerLabel": "B: Guard Against FOMO & Check SEC",
    "why": "Unrealistic guaranteed monthly returns (20% monthly = 791% annualized) are classic hallmarks of Ponzi schemes. Comparison feeds scams.",
    "whyFilipino": "Ang garantisadong 20% kada buwan ay imposibleng lehitimo sa tradisyonal na pananalapi. Huwag magpadala sa inggit at silipin ang SEC advisories.",
    "hakbang": "Bookmark the SEC Philippines Enforcement and Investor Protection portal.",
    "communityStats": {
      "correctPct": 85,
      "sampleSize": 2130,
      "topMisconception": "Believing social media bragging reflects real, risk-free profit"
    }
  },
  {
    "id": "Q-102-08",
    "course": 102,
    "tier": "Cash Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Utang na loob requires you to sacrifice your children’s food and education to fund an extended relative’s lifestyle.",
    "promptFilipino": "Ang utang na loob ay nag-oobliga sa iyo na isakripisyo ang pagkain at kinabukasan ng sariling anak para sa kapritso ng kamag-anak.",
    "answer": "MALI",
    "answerLabel": "FALSE (Nuclear Household Priority)",
    "why": "True Filipino values cherish reciprocity, but your primary legal and moral obligation is the survival and security of your dependent children.",
    "whyFilipino": "Ang tunay na malasakit ay may limitasyon. Ang pangunahing moral at legal na tungkulin mo ay ang kapakanan ng iyong sariling mga anak.",
    "hakbang": "Ring-fence your children’s monthly basic sustenance before extending family loans.",
    "communityStats": {
      "correctPct": 86,
      "sampleSize": 2310,
      "topMisconception": "Distorting utang na loob into unconditional financial subservience"
    }
  },
  {
    "id": "Q-103-01",
    "course": 103,
    "tier": "Cash Management",
    "format": "Sweldo Sort",
    "kind": "sort",
    "prompt": "Distinguish between Fixed and Variable Expenses in your monthly household budget:",
    "promptFilipino": "Alin sa mga sumusunod ang Fixed Expense at alin ang Variable Expense?",
    "categories": [
      "Fixed",
      "Variable"
    ],
    "items": [
      {
        "key": "A",
        "text": "Apartment Rent (₱8,000/mo)",
        "textFilipino": "Upa sa apartment (₱8,000)",
        "answer": "Fixed"
      },
      {
        "key": "B",
        "text": "Summer Electricity Spike",
        "textFilipino": "Kuryente sa tag-init",
        "answer": "Variable"
      },
      {
        "key": "C",
        "text": "Daily Commute / Grab fares",
        "textFilipino": "Pamasahe / Grab",
        "answer": "Variable"
      },
      {
        "key": "D",
        "text": "Home Fiber Internet (₱1,499)",
        "textFilipino": "Internet plan (₱1,499)",
        "answer": "Fixed"
      }
    ],
    "answerLabel": "A, D = Fixed · B, C = Variable",
    "why": "Fixed expenses stay constant every month. Variable expenses fluctuate and provide immediate room for tactical savings during lean periods.",
    "whyFilipino": "Ang fixed expenses ay pareho buwan-buwan. Ang variable expenses ay nagbabago at puwedeng tipirin kapag gipit.",
    "hakbang": "Tag your recurring fixed bills in the Hermes safe-to-spend dashboard.",
    "communityStats": {
      "correctPct": 89,
      "sampleSize": 1670,
      "topMisconception": "Assuming utility bills with usage fluctuations are fixed"
    }
  },
  {
    "id": "Q-103-02",
    "course": 103,
    "tier": "Cash Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Your Safe-to-Spend number is the entire remaining balance shown on your ATM screen on payday.",
    "promptFilipino": "Ang Safe-to-Spend number mo ay ang kabuuang balanse na nakikita sa screen ng ATM sa araw ng sahod.",
    "answer": "MALI",
    "answerLabel": "FALSE (ATM Balance ≠ Safe-to-Spend)",
    "why": "Your ATM balance has not yet deducted upcoming rent, utility bills, or credit card dues due later in the cycle. Safe-to-Spend is after uncommitted bills.",
    "whyFilipino": "Ang nakikita sa ATM ay hindi pa bawas ang paparating na kuryente, upa, at bayarin. Ang Safe-to-Spend ay ang malinis na natitirang pera.",
    "hakbang": "Calculate your true Safe-to-Spend number for the next 14 days.",
    "communityStats": {
      "correctPct": 91,
      "sampleSize": 2200,
      "topMisconception": "Treating gross checking account balance as disposable cash"
    }
  },
  {
    "id": "Q-103-03",
    "course": 103,
    "tier": "Cash Management",
    "format": "Ano'ng Gagawin Mo?",
    "kind": "choice",
    "prompt": "It is 5 days before payday (kinsenas) and you only have ₱800 uncommitted cash left. How should you navigate this period?",
    "promptFilipino": "Limang araw bago ang kinsenas, ₱800 na lang ang natitirang uncommitted cash mo. Paano mo ito pamamahalaan?",
    "options": [
      {
        "key": "A",
        "text": "Take a high-interest online loan to live lavishly for 5 days",
        "textFilipino": "Mangutang sa loan app para makagastos nang maluwag"
      },
      {
        "key": "B",
        "text": "Activate Survival Mode: meal prep home staples, pause non-essential transit, and protect your ₱160/day ceiling",
        "textFilipino": "Mag-survival mode: magbaon ng lutong-bahay, magtipid sa biyahe, at panatilihin ang ₱160/araw na limit"
      },
      {
        "key": "C",
        "text": "Borrow against your Pag-IBIG MP2 account",
        "textFilipino": "I-withdraw ang Pag-IBIG MP2"
      }
    ],
    "answer": "B",
    "answerLabel": "B: Survival Mode & Daily Cap",
    "why": "Surviving a temporary lean stretch with home cooking and discipline preserves your credit history and avoids high borrowing costs.",
    "whyFilipino": "Ang pagluluto sa bahay at pagtitiis ng ilang araw bago ang sahod ay nagliligtas sa iyo sa patong-patong na interes ng utang.",
    "hakbang": "Plan a 3-day pantry meal plan using ingredients already at home.",
    "communityStats": {
      "correctPct": 87,
      "sampleSize": 1780,
      "topMisconception": "Resorting to payday loans for short temporary grocery cash gaps"
    }
  },
  {
    "id": "Q-103-04",
    "course": 103,
    "tier": "Cash Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "The Envelope Budgeting Method can only be practiced using physical paper envelopes and paper cash.",
    "promptFilipino": "Ang Envelope Budgeting Method ay magagawa lamang gamit ang pisikal na papel na sobre at perang papel.",
    "answer": "MALI",
    "answerLabel": "FALSE (Digital Sub-Accounts & Envelopes)",
    "why": "Modern Philippine digital banks and e-wallets allow creating multiple digital \"Pockets\", \"Stashes\", or \"Goals\" that act as virtual envelopes.",
    "whyFilipino": "Maraming modernong digital bank sa Pilipinas ang may digital pockets o stashes na gumaganap bilang virtual envelopes nang walang bawas sa interes.",
    "hakbang": "Open a digital sub-pocket for utility bills in your banking app.",
    "communityStats": {
      "correctPct": 83,
      "sampleSize": 1490,
      "topMisconception": "Believing envelope budgeting is outdated and cannot be done online"
    }
  },
  {
    "id": "Q-103-05",
    "course": 103,
    "tier": "Cash Management",
    "format": "Sweldo Sort",
    "kind": "choice",
    "prompt": "When is the optimal time to allocate your monthly savings deposit?",
    "promptFilipino": "Kailan ang tamang oras para magtabi ng buwanang ipon?",
    "options": [
      {
        "key": "A",
        "text": "At the exact minute your salary is credited (Pay Yourself First)",
        "textFilipino": "Sa oras mismo na pumasok ang sahod (Pay Yourself First)"
      },
      {
        "key": "B",
        "text": "On the 14th or 29th day right before the next cutoff if anything is left",
        "textFilipino": "Bago mag-sahod kung may matira"
      },
      {
        "key": "C",
        "text": "Whenever an insurance agent reminds you",
        "textFilipino": "Kapag pinaalalahanan ng ahente"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Pay Yourself First",
    "why": "Human nature dictates that whatever cash stays in an active wallet will be spent. Moving savings first protects your reserves.",
    "whyFilipino": "Kung ano ang matira sa pitaka, nagagastos. Ang pag-save sa unang oras ng sahod ang pinakamabisang gawi sa pag-iimpok.",
    "hakbang": "Schedule an automatic recurring transfer on your payday morning.",
    "communityStats": {
      "correctPct": 95,
      "sampleSize": 2400,
      "topMisconception": "Waiting until the end of the month to save leftover funds"
    }
  },
  {
    "id": "Q-103-06",
    "course": 103,
    "tier": "Cash Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Tracking cash flow weekly provides faster feedback and better adjustments than waiting for an entire month to pass.",
    "promptFilipino": "Ang pagsusuri ng cash flow linggo-linggo ay mas mabilis makapagtama ng labis na gastos kaysa sa paghihintay ng buong buwan.",
    "answer": "TAMA",
    "answerLabel": "TRUE (Weekly Feedback Loops)",
    "why": "Weekly check-ins catch budget leaks in days rather than letting 30 days of overspending spiral out of control.",
    "whyFilipino": "Ang lingguhang pagsusuri ay nagbibigay-daan upang agad maitama ang labis na gastos bago pa maubos ang buwanang sahod.",
    "hakbang": "Set a 5-minute Sunday ritual to review your weekly wallet balance.",
    "communityStats": {
      "correctPct": 90,
      "sampleSize": 1650,
      "topMisconception": "Only reviewing finances during annual tax season"
    }
  },
  {
    "id": "Q-104-01",
    "course": 104,
    "tier": "Emergency & Savings",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Your emergency fund should be placed in volatile stock market equities or cryptocurrency for high growth.",
    "promptFilipino": "Dapat ilagay ang buong emergency fund sa stock market o crypto para mabilis lumaki.",
    "answer": "MALI",
    "answerLabel": "FALSE (Safety & Liquidity)",
    "why": "Emergency funds are strictly for safety and immediate liquidity, not aggressive capital gains. It must be accessible within 1 hour during crises.",
    "whyFilipino": "Ang emergency fund ay para sa KALIGTASAN at LIQUIDITY, hindi para sa mataas na kita. Dapat ay mabilis itong ma-withdraw kung may sakuna.",
    "hakbang": "Ensure your starter emergency buffer is housed in a high-yield, PDIC-insured digital bank account.",
    "communityStats": {
      "correctPct": 86,
      "sampleSize": 2600,
      "topMisconception": "Chasing high investment returns with money needed for hospital deposits"
    }
  },
  {
    "id": "Q-104-02",
    "course": 104,
    "tier": "Emergency & Savings",
    "format": "Presyo Noon vs Ngayon",
    "kind": "choice",
    "prompt": "A traditional jeepney minimum fare was ₱1.50 in 1995. Today it is around ₱13.00 to ₱15.00. What economic force causes this loss of purchasing power?",
    "promptFilipino": "Ang pamasahe sa jeep noong 1995 ay ₱1.50 lang. Ngayon ay nasa ₱13.00 hanggang ₱15.00 na. Anong pwersa sa ekonomiya ang sanhi nito?",
    "options": [
      {
        "key": "A",
        "text": "Inflation (Pagbaba ng purchasing power ng bawat piso)",
        "textFilipino": "Inflation (Pagbaba ng halaga ng pera sa paglipas ng panahon)"
      },
      {
        "key": "B",
        "text": "Exchange rate fluctuations with the Japanese Yen only",
        "textFilipino": "Palitan lang ng Yen at Piso"
      },
      {
        "key": "C",
        "text": "Bank interest fees",
        "textFilipino": "Bayad sa bangko"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Inflation",
    "why": "Inflation relentlessly erodes the purchasing power of cash kept idle under a mattress. Beyond emergency cash, long-term reserves need interest.",
    "whyFilipino": "Inuubos ng inflation ang halaga ng perang nakatago lang sa ilalim ng kutson. Kailangan ng mga sasakyang kumikita ng interes tulad ng MP2.",
    "hakbang": "Check your digital savings interest rate to ensure it beats cash inflation.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 1950,
      "topMisconception": "Believing physical cash under a mattress never loses value"
    }
  },
  {
    "id": "Q-104-03",
    "course": 104,
    "tier": "Emergency & Savings",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "An emergency fund and a sinking fund for a Christmas vacation are the exact same thing.",
    "promptFilipino": "Ang Emergency Fund at ang Sinking Fund para sa bakasyon sa Pasko ay magkapareho lamang.",
    "answer": "MALI",
    "answerLabel": "FALSE (Emergency vs Sinking Fund)",
    "why": "Emergency funds protect against unpredictable catastrophes (illness, job loss). Sinking funds save for anticipated predictable expenses (Christmas, tuition, car renewal).",
    "whyFilipino": "Ang Emergency Fund ay para sa HINDI inaasahang sakuna. Ang Sinking Fund ay para sa INAASAHANG gastusin tulad ng Pasko, rehistro, at matrikula.",
    "hakbang": "Open a dedicated Sinking Fund pocket separate from your emergency stash.",
    "communityStats": {
      "correctPct": 81,
      "sampleSize": 1880,
      "topMisconception": "Raiding emergency cash to pay for planned holiday gifts"
    }
  },
  {
    "id": "Q-104-04",
    "course": 104,
    "tier": "Emergency & Savings",
    "format": "Hula ng Interes",
    "kind": "choice",
    "prompt": "Pag-IBIG MP2 has historically paid average tax-free dividends around 6% to 7% annually. If you deposit ₱50,000, approximately how much is it worth in 5 years with compounding dividends?",
    "promptFilipino": "Ang Pag-IBIG MP2 ay nagbibigay ng humigit-kumulang 6% hanggang 7% taunang dibidendo na tax-free. Kung naglagay ka ng ₱50,000, mga magkano ito pagkalipas ng 5 taon?",
    "options": [
      {
        "key": "A",
        "text": "Around ₱50,500 only",
        "textFilipino": "Mga ₱50,500 lang"
      },
      {
        "key": "B",
        "text": "Approximately ₱67,000 to ₱70,000 (Tax-free compounded growth)",
        "textFilipino": "Tinatayang ₱67,000 hanggang ₱70,000 dahil sa compounding"
      },
      {
        "key": "C",
        "text": "Over ₱500,000",
        "textFilipino": "Higit sa ₱500,000"
      }
    ],
    "answer": "B",
    "answerLabel": "B: ~₱67k–₱70k (Compounding Interest)",
    "why": "At 6.5% compounded annually, ₱50,000 earns around ₱18,000+ in tax-free dividends over 5 years without lifting a finger.",
    "whyFilipino": "Dahil sa compounding interest at pagiging tax-free ng MP2, lumalago ang pondo nang ligtas at garantisado ng gobyerno.",
    "hakbang": "Check your Pag-IBIG Virtual account or register an MP2 account online.",
    "communityStats": {
      "correctPct": 77,
      "sampleSize": 2150,
      "topMisconception": "Underestimating the compounding power of tax-free government yields"
    }
  },
  {
    "id": "Q-104-05",
    "course": 104,
    "tier": "Emergency & Savings",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Deposits in Philippine regulated banks are insured by the Philippine Deposit Insurance Corporation (PDIC) up to ₱500,000 per depositor per bank.",
    "promptFilipino": "Ang mga deposito sa bangko sa Pilipinas ay protektado ng PDIC hanggang ₱500,000 bawat depositor sa bawat bangko.",
    "answer": "TAMA",
    "answerLabel": "TRUE (PDIC Insurance Limit)",
    "why": "PDIC guarantees deposits up to ₱500,000 against bank closure. Keep individual accounts within this threshold for maximum peace of mind.",
    "whyFilipino": "Tinitiyak ng PDIC ang kaligtasan ng iyong pera sa bangko hanggang ₱500,000 sakaling magsara o malugi ang bangko.",
    "hakbang": "Verify that your savings bank is a legitimate PDIC member institution.",
    "communityStats": {
      "correctPct": 89,
      "sampleSize": 1990,
      "topMisconception": "Assuming all informal paluwagans have PDIC deposit insurance"
    }
  },
  {
    "id": "Q-104-06",
    "course": 104,
    "tier": "Emergency & Savings",
    "format": "Ano'ng Gagawin Mo?",
    "kind": "choice",
    "prompt": "You have zero emergency savings today. Your goal is 3 months of essential living expenses (₱60,000). What is your best first step?",
    "promptFilipino": "Wala kang emergency fund ngayon. Ang target mo ay 3 buwan ng panggastos (₱60,000). Ano ang pinakamagandang unang hakbang?",
    "options": [
      {
        "key": "A",
        "text": "Give up immediately because ₱60,000 feels impossible",
        "textFilipino": "Sumuko agad dahil napakalaki ng ₱60,000"
      },
      {
        "key": "B",
        "text": "Start with a starter milestone buffer of ₱5,000, saved at ₱500 per cutoff",
        "textFilipino": "Magsimula sa Starter Buffer na ₱5,000, sa halagang ₱500 kada kinsenas"
      },
      {
        "key": "C",
        "text": "Apply for a personal bank loan to fund the emergency deposit",
        "textFilipino": "Mangutang sa bangko para gawing emergency fund"
      }
    ],
    "answer": "B",
    "answerLabel": "B: Starter Buffer Milestone",
    "why": "Micro-milestones build momentum. Reaching your first ₱5,000 covers 80% of minor emergencies (flat tire, clinic visit) without debt.",
    "whyFilipino": "Ang pagsisimula sa maliit na ₱5,000 starter buffer ay nagbibigay ng agarang proteksyon laban sa maliliit na aberya.",
    "hakbang": "Set your starter emergency goal to ₱5,000 in Hermes.",
    "communityStats": {
      "correctPct": 93,
      "sampleSize": 2420,
      "topMisconception": "Believing you must save the entire 6-month fund overnight"
    }
  },
  {
    "id": "Q-104-07",
    "course": 104,
    "tier": "Emergency & Savings",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Storing your entire emergency reserve as gold jewelry is just as liquid and reliable as a digital bank savings account.",
    "promptFilipino": "Ang pag-iipon ng alahas bilang emergency fund ay kasing-bilis at kasing-dali ma-withdraw tulad ng pera sa digital bank.",
    "answer": "MALI",
    "answerLabel": "FALSE (Pawnshop Appraisals & Haircuts)",
    "why": "Pawnshops appraise jewelry at steep discounts (often 30–50% below retail gold price), and they are closed in the middle of the night.",
    "whyFilipino": "Binabarat ng mga sanglaan ang alahas (30-50% tapyas sa presyo) at sarado sila sa dis-oras ng gabi kung kailan madalas ang emergency.",
    "hakbang": "Keep cash reserves in a digital bank with an ATM card rather than relying solely on pawnable goods.",
    "communityStats": {
      "correctPct": 75,
      "sampleSize": 1810,
      "topMisconception": "Treating retail jewelry as 100% liquid emergency cash"
    }
  },
  {
    "id": "Q-104-08",
    "course": 104,
    "tier": "Emergency & Savings",
    "format": "Hula ng Interes",
    "kind": "choice",
    "prompt": "If you save ₱1,000 every month in an account earning 5% annual compound interest, how much will you accumulate in 10 years?",
    "promptFilipino": "Kung mag-iipon ka ng ₱1,000 buwan-buwan sa account na may 5% taunang interes, magkano ang maiipon mo sa loob ng 10 taon?",
    "options": [
      {
        "key": "A",
        "text": "Exactly ₱120,000 (No interest)",
        "textFilipino": "Eksaktong ₱120,000 (walang interes)"
      },
      {
        "key": "B",
        "text": "Approximately ₱155,000+ (₱35,000+ pure compound interest)",
        "textFilipino": "Tinatayang ₱155,000+ (mahigit ₱35,000 na libreng interes)"
      },
      {
        "key": "C",
        "text": "₱1,000,000",
        "textFilipino": "₱1,000,000"
      }
    ],
    "answer": "B",
    "answerLabel": "B: ~₱155,000+ (The Power of Time)",
    "why": "Consistency plus compounding turns modest ₱1,000 monthly contributions into over ₱155,000, with more than ₱35,000 generated purely by compound growth.",
    "whyFilipino": "Ang patuloy na paghuhulog ng ₱1,000 buwan-buwan ay nagbubunga ng mahigit ₱35,000 na dagdag na interes dahil sa compounding.",
    "hakbang": "Commit to saving ₱1,000 every month without fail.",
    "communityStats": {
      "correctPct": 79,
      "sampleSize": 1920,
      "topMisconception": "Thinking modest ₱1,000 monthly savings cannot compound into significant wealth"
    }
  },
  {
    "id": "Q-105-01",
    "course": 105,
    "tier": "Debt Management",
    "format": "Alin ang Mas Mahal?",
    "kind": "choice",
    "prompt": "You urgently need ₱5,000 for utility bills. Which borrowing option charges the highest effective annual interest rate?",
    "promptFilipino": "Kailangan mo ng ₱5,000 pambayad sa kuryente. Alin ang may pinakamataas na epektibong interes kada taon?",
    "options": [
      {
        "key": "A",
        "text": "5-6 informal lender: repay ₱6,000 after 1 month (20%/month)",
        "textFilipino": "5-6 lender: babayaran ng ₱6,000 pagkatapos ng 1 buwan (20% kada buwan)"
      },
      {
        "key": "B",
        "text": "SSS Salary Loan: ~10% annual interest rate",
        "textFilipino": "SSS Salary Loan: ~10% taunang interes"
      },
      {
        "key": "C",
        "text": "Credit card cash advance: ~3% monthly finance charge",
        "textFilipino": "Credit card cash advance: ~3% monthly finance charge"
      }
    ],
    "answer": "A",
    "answerLabel": "A: 5-6 Informal Lender (240% Annualized!)",
    "why": "5-6 charges 20% in a single month—translating to a staggering 240% annual percentage rate (APR)! This is the single fastest way Philippine families fall into debt spirals.",
    "whyFilipino": "Ang 5-6 ay may epektibong interes na 20% kada buwan o 240% sa isang taon! Ito ang pinakamabilis na nagpapabaon sa pamilya sa utang.",
    "hakbang": "List all existing debts and their respective monthly interest rates.",
    "communityStats": {
      "correctPct": 83,
      "sampleSize": 2540,
      "topMisconception": "Underestimating 20% per month as small compared to annual rates"
    }
  },
  {
    "id": "Q-105-02",
    "course": 105,
    "tier": "Debt Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Paying only the Minimum Amount Due on your credit card statement keeps you free from compounding finance charges.",
    "promptFilipino": "Kapag binayaran mo ang Minimum Amount Due sa credit card bill, ligtas ka na sa interes at finance charges.",
    "answer": "MALI",
    "answerLabel": "FALSE (Compounding Finance Trap)",
    "why": "Paying only the minimum leaves the remaining balance subject to 3% monthly compounding interest, often taking over 10–15 years to pay off a single purchase.",
    "whyFilipino": "Ang pagbabayad lang ng minimum ay nagpapataw ng 3% monthly interes sa buong natitirang balanse, na nagpapatagal sa utang nang maraming taon.",
    "hakbang": "Commit to paying your credit card Total Amount Due in full every billing cycle.",
    "communityStats": {
      "correctPct": 79,
      "sampleSize": 2180,
      "topMisconception": "Assuming the Minimum Amount Due waives finance charges"
    }
  },
  {
    "id": "Q-105-03",
    "course": 105,
    "tier": "Debt Management",
    "format": "Ano'ng Gagawin Mo?",
    "kind": "choice",
    "prompt": "You have 3 outstanding loans: ₱8,000 at 24% annual interest, ₱15,000 at 5% annual interest, and ₱3,000 at 50% interest. Under the Debt Avalanche method, which do you pay off first?",
    "promptFilipino": "May tatlo kang utang: ₱8,000 (24% interes), ₱15,000 (5% interes), at ₱3,000 (50% interes). Sa ilalim ng Debt Avalanche method, alin ang uunahing bayaran?",
    "options": [
      {
        "key": "A",
        "text": "The ₱15,000 loan because the principal is the largest",
        "textFilipino": "Ang ₱15,000 dahil ito ang pinakamalaki"
      },
      {
        "key": "B",
        "text": "The ₱3,000 loan with 50% interest (Highest Interest Rate First)",
        "textFilipino": "Ang ₱3,000 dahil ito ang may pinakamataas na interes (50%)"
      },
      {
        "key": "C",
        "text": "Split payments equally and pay none of them off",
        "textFilipino": "Hatiin nang pantay-pantay ang bayad"
      }
    ],
    "answer": "B",
    "answerLabel": "B: Highest Interest Rate (Avalanche)",
    "why": "The Debt Avalanche method attacks the highest-interest debt first while paying minimums on the rest, mathematically saving the most money in finance charges.",
    "whyFilipino": "Inaatake ng Debt Avalanche ang utang na may pinakamalaking interes muna, upang maiwasan ang malaking pagdurugo sa finance charges.",
    "hakbang": "Rank your debts by interest rate from highest to lowest in Hermes.",
    "communityStats": {
      "correctPct": 81,
      "sampleSize": 1870,
      "topMisconception": "Prioritizing loan balance size over the actual interest percentage"
    }
  },
  {
    "id": "Q-105-04",
    "course": 105,
    "tier": "Debt Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Online lending apps (OLAs) have the legal right to harass your contact list and threaten public humiliation to collect debts under Philippine law.",
    "promptFilipino": "Legal sa batas ng Pilipinas para sa mga online lending app na i-harass ang contacts mo at magbanta sa social media para maningil.",
    "answer": "MALI",
    "answerLabel": "FALSE (Prohibited Under SEC & NPC)",
    "why": "SEC Memorandum Circular No. 18 and the National Privacy Commission strictly prohibit public shaming, contacting uninvolved relatives, and abusive harassment.",
    "whyFilipino": "Ipinagbabawal ng SEC at Data Privacy Act ang pamamahiya, pag-text sa contacts, at pananakot. Labag ito sa batas ng Pilipinas.",
    "hakbang": "Report abusive lending harassment to the SEC Phishing & Consumer Complaints Desk.",
    "communityStats": {
      "correctPct": 94,
      "sampleSize": 3120,
      "topMisconception": "Believing borrowers forfeit privacy rights upon taking digital loans"
    }
  },
  {
    "id": "Q-105-05",
    "course": 105,
    "tier": "Debt Management",
    "format": "Alin ang Mas Mahal?",
    "kind": "choice",
    "prompt": "Compare Buy Now, Pay Later (BNPL) with 0% interest vs. a 3-month term with a 5% monthly processing fee. Which has a hidden cost trap?",
    "promptFilipino": "Paghambingin ang Buy Now Pay Later (BNPL) na 0% interes vs 3 buwang hulugan na may 5% monthly processing fee. Alin ang may patagong gastos?",
    "options": [
      {
        "key": "A",
        "text": "The 5% monthly processing fee (Amounts to 15% in 3 months = 60% per year!)",
        "textFilipino": "Ang may 5% processing fee (Aabot sa 15% sa 3 buwan = 60% kada taon!)"
      },
      {
        "key": "B",
        "text": "Both are completely free",
        "textFilipino": "Parehong libre"
      },
      {
        "key": "C",
        "text": "Paying full cash today",
        "textFilipino": "Ang pagbabayad ng buong cash ngayon"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Hidden Processing Fee Trap",
    "why": "Processing fees often disguise astronomical interest. A 5% monthly fee equates to a 60% annual interest rate.",
    "whyFilipino": "Ang \"processing fee\" ay madalas interes sa ibang anyo. Ang 5% kada buwan ay katumbas ng 60% taunang interes.",
    "hakbang": "Always compute the total final price (Principal + All Fees) before choosing installment plans.",
    "communityStats": {
      "correctPct": 86,
      "sampleSize": 1760,
      "topMisconception": "Assuming small processing fees do not count as interest"
    }
  },
  {
    "id": "Q-105-06",
    "course": 105,
    "tier": "Debt Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Under Republic Act No. 11765 (Financial Products and Services Consumer Protection Act), financial consumers have the right to transparent, fair disclosure of all borrowing charges.",
    "promptFilipino": "Sa ilalim ng RA 11765 (FCPA), may karapatan ang bawat Pilipinong nangungutang sa malinaw at buong paglalahad ng lahat ng bayarin at charges.",
    "answer": "TAMA",
    "answerLabel": "TRUE (Consumer Rights under RA 11765)",
    "why": "The FCPA empowers consumers against deceptive pricing, hidden charges, and unfair collection practices across all BSP and SEC regulated lenders.",
    "whyFilipino": "Pinoprotektahan ng FCPA ang mga mamamayan laban sa mapanlinlang na singil, tagong interes, at marahas na paniningil.",
    "hakbang": "Demand a full Disclosure Statement before signing any personal or auto loan.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 1640,
      "topMisconception": "Thinking lenders have no legal obligation to disclose effective rates"
    }
  },
  {
    "id": "Q-105-07",
    "course": 105,
    "tier": "Debt Management",
    "format": "Ano'ng Gagawin Mo?",
    "kind": "choice",
    "prompt": "A close coworker asks you to be their co-maker (co-borrower) on a ₱100,000 salary loan. What is your legal obligation if they stop paying?",
    "promptFilipino": "Nakiusap ang kaibigan na maging co-maker ka sa ₱100,000 na pautang. Kung hindi siya magbayad, ano ang legal na pananagutan mo?",
    "options": [
      {
        "key": "A",
        "text": "You have zero obligation; it was just a character reference",
        "textFilipino": "Wala kang pananagutan; character reference ka lang naman"
      },
      {
        "key": "B",
        "text": "You become 100% legally liable to pay the full remaining debt and interest out of your own pocket",
        "textFilipino": "Ikaw ang legal na mananagot magbayad ng buong natitirang utang at interes"
      },
      {
        "key": "C",
        "text": "The bank simply forgives the loan",
        "textFilipino": "Kakalimutan na lang ng bangko ang utang"
      }
    ],
    "answer": "B",
    "answerLabel": "B: 100% Joint Liability",
    "why": "Being a co-maker means signing joint and solidary liability. If the primary borrower absconds, the lender has full legal right to collect from you.",
    "whyFilipino": "Ang co-maker ay may solidary liability. Kapag hindi nagbayad ang nangutang, legal na ikaw ang sisingilin ng bangko o institusyon.",
    "hakbang": "Practice the gentle script: 'Pasensya na, personal policy ko na hindi maging co-maker upang maprotektahan ang pamilya.'",
    "communityStats": {
      "correctPct": 82,
      "sampleSize": 2890,
      "topMisconception": "Confusing a legally binding co-maker with a character reference"
    }
  },
  {
    "id": "Q-105-08",
    "course": 105,
    "tier": "Debt Management",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "The Debt Snowball method focuses on paying the smallest balance first to build emotional and psychological momentum.",
    "promptFilipino": "Ang Debt Snowball method ay nakatutok sa pagbabayad ng pinakamaliit na balanse muna upang magkaroon ng psychological momentum at sigla.",
    "answer": "TAMA",
    "answerLabel": "TRUE (Debt Snowball Psychology)",
    "why": "While Avalanche saves more interest, Snowball provides quick psychological wins that motivate borrowers to stay the course and finish paying debts.",
    "whyFilipino": "Bagamat mas nakakatipid sa interes ang Avalanche, ang Snowball ay nagbibigay ng maagang tagumpay na nagpapatatag sa disiplina ng tao.",
    "hakbang": "Pick either Avalanche or Snowball and stick with it consistently.",
    "communityStats": {
      "correctPct": 85,
      "sampleSize": 1720,
      "topMisconception": "Believing emotional motivation does not matter in debt elimination"
    }
  },
  {
    "id": "Q-106-01",
    "course": 106,
    "tier": "Accumulation & Net Worth",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Net Worth is calculated as total monthly salary received from your employer.",
    "promptFilipino": "Ang Net Worth ay ang kabuuang pera na kinikita mo bawat buwan mula sa kumpanya.",
    "answer": "MALI",
    "answerLabel": "FALSE (Assets Minus Liabilities)",
    "why": "Net Worth = Total Assets (what you own) MINUS Total Liabilities (what you owe). Salary is cash flow; Net Worth is your true accumulated solvency.",
    "whyFilipino": "Ang Net Worth ay Assets (lahat ng pag-aari mo) MINUS Liabilities (lahat ng utang mo). Ito ang totoong sukat ng iyong yaman, hindi ang sweldo.",
    "hakbang": "Take a calm, shame-free snapshot of your Net Worth in the Hermes app.",
    "communityStats": {
      "correctPct": 87,
      "sampleSize": 2100,
      "topMisconception": "Confusing gross monthly salary with true accumulated net worth"
    }
  },
  {
    "id": "Q-106-02",
    "course": 106,
    "tier": "Accumulation & Net Worth",
    "format": "Sweldo Sort",
    "kind": "sort",
    "prompt": "Classify whether each item is an Asset or a Liability on a household balance sheet:",
    "promptFilipino": "I-uri kung ang bawat isa ay Asset (Ari-arian) o Liability (Utang/Pananagutan):",
    "categories": [
      "Asset",
      "Liability"
    ],
    "items": [
      {
        "key": "A",
        "text": "Digital Bank High-Yield Savings",
        "textFilipino": "Ipon sa Digital Bank",
        "answer": "Asset"
      },
      {
        "key": "B",
        "text": "Outstanding Credit Card Balance",
        "textFilipino": "Natitirang balance sa Credit Card",
        "answer": "Liability"
      },
      {
        "key": "C",
        "text": "Fully-Paid Agricultural Lot in Province",
        "textFilipino": "Tituladong lupang sakahan sa probinsya",
        "answer": "Asset"
      },
      {
        "key": "D",
        "text": "Motorcycle 3-Year Installment Loan",
        "textFilipino": "Hulugang motor (remaining loan)",
        "answer": "Liability"
      }
    ],
    "answerLabel": "A, C = Asset · B, D = Liability",
    "why": "Assets put money in your pocket or have real recoverable market value. Liabilities are contractual debts that take cash out of your household.",
    "whyFilipino": "Ang Assets ay nagbibigay o may tunay na halaga. Ang Liabilities ay mga utang na humihigop ng pera palabas sa iyong tahanan.",
    "hakbang": "Review your total liabilities and compare against liquid assets.",
    "communityStats": {
      "correctPct": 92,
      "sampleSize": 1850,
      "topMisconception": "Counting a car with 80% remaining mortgage as a 100% asset"
    }
  },
  {
    "id": "Q-106-03",
    "course": 106,
    "tier": "Accumulation & Net Worth",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Having a lot of physical land in the province guarantees you will never suffer a cash crunch during a medical emergency.",
    "promptFilipino": "Ang pagkakaroon ng maraming lupang pamana sa probinsya ay garantiya na hindi ka magigipit sa gastusin sa ospital.",
    "answer": "MALI",
    "answerLabel": "FALSE (Liquidity Crisis)",
    "why": "Land is an illiquid asset—it often takes months or years to find a buyer and transfer titles. In emergencies, hospitals require cash, not title deeds.",
    "whyFilipino": "Ang lupa ay non-liquid asset. Tumatagal ng buwan o taon bago maibenta. Ang ospital ay nangangailangan ng agarang cash, hindi titulo.",
    "hakbang": "Ensure at least 3–6 months of living expenses are in liquid cash buffers.",
    "communityStats": {
      "correctPct": 83,
      "sampleSize": 1940,
      "topMisconception": "Assuming land ownership solves immediate cash liquidity crises"
    }
  },
  {
    "id": "Q-106-04",
    "course": 106,
    "tier": "Accumulation & Net Worth",
    "format": "Ano'ng Gagawin Mo?",
    "kind": "choice",
    "prompt": "You compute your net worth for the first time and find it is negative (-₱25,000) due to credit card and salary loans. What is the healthier emotional reaction?",
    "promptFilipino": "Kinalkula mo ang iyong net worth sa unang pagkakataon at nalaman mong negative (-₱25,000) ito dahil sa utang. Ano ang tamang saloobin?",
    "options": [
      {
        "key": "A",
        "text": "Feel intense shame, hide your head, and stop budgeting forever",
        "textFilipino": "Mahiya nang husto at itigil na ang pag-iipon"
      },
      {
        "key": "B",
        "text": "Accept the reality calmly without shame: you now know your baseline and can steadily track progress toward positive solvency",
        "textFilipino": "Tanggapin nang mahinahon nang walang hiya: alam mo na ang baseline at masusubaybayan mo na ang pag-asenso"
      },
      {
        "key": "C",
        "text": "Borrow another ₱100,000 to gamble and try to double it",
        "textFilipino": "Mangutang para magsugal"
      }
    ],
    "answer": "B",
    "answerLabel": "B: Shame-Free Baseline",
    "why": "A negative net worth is simply data, not a moral failure. Knowing your number is the courageous first step toward turning it positive.",
    "whyFilipino": "Ang negative net worth ay numero lang, hindi sukatan ng iyong pagkatao. Ang pag-alam sa numero ang simula ng tunay na pagbangon.",
    "hakbang": "Log your baseline net worth number without self-judgment.",
    "communityStats": {
      "correctPct": 91,
      "sampleSize": 1670,
      "topMisconception": "Treating a negative net worth as a personal character flaw"
    }
  },
  {
    "id": "Q-106-05",
    "course": 106,
    "tier": "Accumulation & Net Worth",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Solvency means your total assets exceed your total liabilities, meaning you can cover all debts if required.",
    "promptFilipino": "Ang ibig sabihin ng Solvency ay mas mataas ang kabuuang ari-arian mo kaysa sa iyong mga utang.",
    "answer": "TAMA",
    "answerLabel": "TRUE (Solvency Defined)",
    "why": "When Assets > Liabilities, your household is solvent. Growing this positive gap over time is how true generational resilience is achieved.",
    "whyFilipino": "Kapag mas malaki ang ari-arian kaysa utang, matatag ang iyong tahanan laban sa pagka-bangkarote.",
    "hakbang": "Review your Solvency Ratio in the Hermes financial position tab.",
    "communityStats": {
      "correctPct": 89,
      "sampleSize": 1420,
      "topMisconception": "Thinking solvency only applies to large commercial corporations"
    }
  },
  {
    "id": "Q-106-06",
    "course": 106,
    "tier": "Accumulation & Net Worth",
    "format": "Sweldo Sort",
    "kind": "choice",
    "prompt": "Which of the following represents an appreciating asset that generally gains value over time?",
    "promptFilipino": "Alin sa mga sumusunod ang appreciating asset na karaniwang tumataas ang halaga sa paglipas ng panahon?",
    "options": [
      {
        "key": "A",
        "text": "Brand-new sports car driven off the showroom floor",
        "textFilipino": "Brand-new na kotseng bumaba agad ang halaga"
      },
      {
        "key": "B",
        "text": "Government Pag-IBIG MP2 account with compounding dividends",
        "textFilipino": "Pag-IBIG MP2 account na may compounding dividends"
      },
      {
        "key": "C",
        "text": "Designer sneakers stored in a plastic bin",
        "textFilipino": "Sapatos na nabulok sa kahon"
      }
    ],
    "answer": "B",
    "answerLabel": "B: Compounding MP2 Savings",
    "why": "Vehicles and consumer items depreciate rapidly. Financial assets with compound dividends steadily grow your net worth.",
    "whyFilipino": "Ang sasakyan ay lumuluma at bumababa ang halaga. Ang mga produktong may compound dividends tulad ng MP2 ay patuloy na lumalago.",
    "hakbang": "Identify which items in your household truly appreciate vs depreciate.",
    "communityStats": {
      "correctPct": 93,
      "sampleSize": 1780,
      "topMisconception": "Assuming brand-new vehicles are wealth-building assets"
    }
  },
  {
    "id": "Q-107-01",
    "course": 107,
    "tier": "Protection & Insurance",
    "format": "Scam o Legit?",
    "kind": "binary",
    "prompt": "You receive an urgent SMS: \"GCash Alert: Your account is restricted within 24 hours. Verify your MPIN and OTP here: bit.ly/gcash-secure-portal\". Scam o Legit?",
    "promptFilipino": "Nakatanggap ka ng SMS: \"GCash Advisory: Your account will be restricted within 24 hours. Verify your MPIN and OTP here: bit.ly/gcash-secure-update\". Scam o Legit?",
    "answer": "SCAM",
    "answerLabel": "SCAM (Urgent Phishing Link)",
    "why": "Legitimate banks and e-wallets NEVER send clickable links requesting your MPIN, password, or One-Time PIN (OTP). This is smishing.",
    "whyFilipino": "Hinding-hindi magpapadala ang GCash o bangko ng link na humihingi ng MPIN o OTP. Phishing at smishing ito!",
    "hakbang": "Never click links in text messages. Report and block the sender immediately.",
    "communityStats": {
      "correctPct": 93,
      "sampleSize": 3410,
      "topMisconception": "Believing panic-inducing SMS alerts about account restriction"
    }
  },
  {
    "id": "Q-107-02",
    "course": 107,
    "tier": "Protection & Insurance",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "PhilHealth covers 100% of all private hospital doctor fees, room upgrades, and medicines with zero out-of-pocket costs.",
    "promptFilipino": "Sinasagot ng PhilHealth ang 100% ng lahat ng doctor fees, pribadong kwarto, at gamot nang walang anumang out-of-pocket cost.",
    "answer": "MALI",
    "answerLabel": "FALSE (Case Rate Deductions Only)",
    "why": "PhilHealth operates on standardized Case Rates (fixed deduction amount per illness). Patients must cover the remaining hospital balance out of pocket or via HMO.",
    "whyFilipino": "Case rate lamang ang binabawas ng PhilHealth. Ang sobra sa limitasyon ay babayaran mo gamit ang emergency fund o HMO.",
    "hakbang": "Check your PhilHealth Member Data Record (MDR) and verify active contribution status.",
    "communityStats": {
      "correctPct": 76,
      "sampleSize": 2840,
      "topMisconception": "Assuming PhilHealth pays the entirety of complex private hospital bills"
    }
  },
  {
    "id": "Q-107-03",
    "course": 107,
    "tier": "Protection & Insurance",
    "format": "Scam o Legit?",
    "kind": "binary",
    "prompt": "A Facebook job ad promises: \"Earn ₱1,500–₱3,000 daily from home just by liking YouTube videos and rating hotels on an app. Transfer ₱500 security deposit first.\" Scam o Legit?",
    "promptFilipino": "May ad sa Facebook: \"Kumita ng ₱1,500–₱3,000 araw-araw sa pag-like ng YouTube videos. Mag-deposit lang ng ₱500 security bond muna.\" Scam o Legit?",
    "answer": "SCAM",
    "answerLabel": "SCAM (Task Scam / Ponzi Trap)",
    "why": "Task Scams lure victims with small initial payouts, then demand increasingly large \"top-up deposits\" to unlock promised earnings, vanishing with your money.",
    "whyFilipino": "Ito ang Task Scam. Magbibigay ng maliit na payout sa simula, tapos hihingan ka ng libu-libong deposito bago tatakbuhan.",
    "hakbang": "Never send personal cash or deposit funds to secure a work-from-home job.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2950,
      "topMisconception": "Believing easy online tasks require upfront worker deposits"
    }
  },
  {
    "id": "Q-107-04",
    "course": 107,
    "tier": "Protection & Insurance",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "Life insurance is only necessary if other people (spouse, children, aging parents) depend financially on your income.",
    "promptFilipino": "Kailangan lamang ng life insurance kung may ibang tao (anak, asawa, matatandang magulang) na umaasa sa iyong sweldo.",
    "answer": "TAMA",
    "answerLabel": "TRUE (Income Replacement Purpose)",
    "why": "Life insurance replaces lost income for surviving dependents. Single individuals with zero dependents prioritize health/disability protection and emergency buffers first.",
    "whyFilipino": "Ang silbi ng life insurance ay palitan ang sweldo mo para sa pamilyang umaasa kung mawala ka. Kung walang dependent, unahin ang emergency buffer.",
    "hakbang": "Size your family’s protection gap in pesos using Hermes.",
    "communityStats": {
      "correctPct": 71,
      "sampleSize": 2190,
      "topMisconception": "Thinking single breadwinners with zero dependents need giant life policies"
    }
  },
  {
    "id": "Q-107-05",
    "course": 107,
    "tier": "Protection & Insurance",
    "format": "Scam o Legit?",
    "kind": "binary",
    "prompt": "A caller claiming to be your bank manager asks: \"We detected unauthorized transactions. Read to me the 6-digit OTP sent to your phone right now to cancel it.\" Scam o Legit?",
    "promptFilipino": "May tumawag na nagpapakilalang bank manager: \"May unauthorized transaction ka. Pakibasa ang 6-digit OTP na na-text sa iyo para ma-cancel.\" Scam o Legit?",
    "answer": "SCAM",
    "answerLabel": "SCAM (Vishing / OTP Theft)",
    "why": "Bank employees never request your One-Time PIN (OTP). An OTP is your personal digital signature—reading it over the phone authorizes the theft.",
    "whyFilipino": "Hinding-hindi hihingin ng bangko ang iyong OTP sa tawag. Kapag ibinigay mo ito, pinayagan mo silang ilipat ang laman ng iyong account.",
    "hakbang": "Hang up immediately and call your bank’s official 24/7 hotline directly.",
    "communityStats": {
      "correctPct": 95,
      "sampleSize": 3100,
      "topMisconception": "Trusting professional-sounding phone callers requesting OTPs"
    }
  },
  {
    "id": "Q-107-06",
    "course": 107,
    "tier": "Protection & Insurance",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "A Variable Universal Life (VUL) policy is purely a high-return investment and should replace your personal emergency cash fund.",
    "promptFilipino": "Ang VUL insurance policy ay purong mataas na investment at puwedeng ipalit sa iyong emergency cash fund.",
    "answer": "MALI",
    "answerLabel": "FALSE (Insurance with Cost of Insurance Charges)",
    "why": "VUL is insurance bundled with market investment units. Upfront premium charges, administrative fees, and cost of insurance reduce early cash surrender values significantly.",
    "whyFilipino": "Ang VUL ay may bawas para sa insurance charges at fees. Hindi ito liquid at hindi dapat gamiting emergency fund dahil bawas ang bawi sa unang mga taon.",
    "hakbang": "Review the policy charges and fees on your insurance proposal page.",
    "communityStats": {
      "correctPct": 68,
      "sampleSize": 2750,
      "topMisconception": "Treating VUL policies as liquid high-yield savings accounts"
    }
  },
  {
    "id": "Q-107-07",
    "course": 107,
    "tier": "Protection & Insurance",
    "format": "Scam o Legit?",
    "kind": "binary",
    "prompt": "A seller on Facebook Marketplace sells a high-end phone for 80% below retail and demands ₱5,000 GCash downpayment before shipping. Scam o Legit?",
    "promptFilipino": "May nagtitinda sa Facebook Marketplace ng mamahaling iPhone na 80% discount pero humihingi ng ₱5,000 GCash downpayment bago i-deliver. Scam o Legit?",
    "answer": "SCAM",
    "answerLabel": "SCAM (Advance Fee Fake Seller)",
    "why": "Advance fee fraud relies on unrealistically cheap luxury goods to bait victims into sending unrecoverable e-wallet transfers before blocking them.",
    "whyFilipino": "Advance-fee scam ito. Kapag na-send mo ang pera sa GCash, iba-block ka agad ng seller at walang darating na package.",
    "hakbang": "Opt for Cash on Delivery (COD) with inspection or verified official platforms.",
    "communityStats": {
      "correctPct": 92,
      "sampleSize": 2280,
      "topMisconception": "Believing 80% discounted brand-new luxury items online"
    }
  },
  {
    "id": "Q-107-08",
    "course": 107,
    "tier": "Protection & Insurance",
    "format": "Tama o Mali?",
    "kind": "binary",
    "prompt": "In the Philippines, statutory SSS Sickness and Disability benefits provide daily cash allowances if you are confined or unable to work due to medical reasons.",
    "promptFilipino": "Ang SSS Sickness Benefit ay nagbibigay ng daily cash allowance kapag naospital o nagkasakit ka at hindi makapagtrabaho.",
    "answer": "TAMA",
    "answerLabel": "TRUE (Statutory SSS Sickness Benefit)",
    "why": "Active SSS members who meet the contribution requirements can claim up to 120 days of daily sickness allowance per calendar year.",
    "whyFilipino": "May SSS Sickness Benefit ang mga aktibong miyembro na nagbibigay ng porsyento ng sweldo para sa mga araw na hindi nakapasok sa sakit.",
    "hakbang": "Verify your SSS contribution history online via My.SSS portal.",
    "communityStats": {
      "correctPct": 78,
      "sampleSize": 1890,
      "topMisconception": "Not knowing SSS pays cash allowances for outpatient or hospital illnesses"
    }
  },
  {
    "id": "Q-108-01",
    "week": 1,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 1 SIMULATION: A family parent is hospitalized with a ₱25,000 out-of-pocket medical bill. What is the correct protocol for deploying household resources?",
    "promptFilipino": "SIMULASYON LINGGO 1: Biglang naospital ang magulang at may out-of-pocket bill na ₱25,000. Ano ang tamang pagkakasunod-sunod ng paggamit ng pondo?",
    "options": [
      {
        "key": "A",
        "text": "Apply statutory PhilHealth/HMO deductions first → Liquid Emergency Fund → Family Support buffer balance",
        "textFilipino": "PhilHealth/HMO deduction muna → Emergency Fund → Family envelope balance"
      },
      {
        "key": "B",
        "text": "Borrow immediately from a 5-6 informal lender so personal savings stay untouched",
        "textFilipino": "5-6 loan agad para 'di magalaw ang ipon"
      },
      {
        "key": "C",
        "text": "Sell the ancestral home immediately to raise quick cash",
        "textFilipino": "Ibenta agad ang bahay"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Tiered Statutory & Buffer Response",
    "why": "Always deplete statutory healthcare coverage (PhilHealth/HMO) first, then tap liquid emergency reserves. Never incur predatory debt when cash reserves exist.",
    "whyFilipino": "Laging simulan sa statutory benefits (PhilHealth/HMO), sundan ng liquid emergency reserves. Huwag mangungutang kung may sariling pondo.",
    "hakbang": "Review your step-by-step Emergency Action Plan in Hermes.",
    "communityStats": {
      "correctPct": 91,
      "sampleSize": 3100,
      "topMisconception": "Taking loans out of fear of touching emergency savings"
    }
  },
  {
    "id": "Q-108-02",
    "week": 2,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 2 SIMULATION: A severe typhoon rips off several roof sheets, causing water damage. Repair costs ₱12,000. How do you fund the repair safely?",
    "promptFilipino": "SIMULASYON LINGGO 2: Sinalanta ng bagyo ang bubong ng bahay at kailangan ng ₱12,000 sa materyales at karpintero. Paano ito popondohan nang ligtas?",
    "options": [
      {
        "key": "A",
        "text": "Deploy Home Maintenance Sinking Fund + Starter Emergency Buffer, pausing non-essential leisure envelopes",
        "textFilipino": "Gamitin ang Home Sinking Fund + Emergency Buffer, at i-pause ang luho"
      },
      {
        "key": "B",
        "text": "Apply for 3 online lending apps with 20% weekly rates to finance the contractor",
        "textFilipino": "Mangutang sa 3 lending app na may 20% interes kada linggo"
      },
      {
        "key": "C",
        "text": "Ignore the leak and let water destroy the appliances inside",
        "textFilipino": "Pabayaan ang tulo hanggang masira ang gamit"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Sinking Fund & Emergency Buffer",
    "why": "Emergency buffers exist precisely for unforeseen physical property damage. Pausing discretionary wants replenishes the buffer quickly without loan charges.",
    "whyFilipino": "Ang emergency buffer ay nilikha para sa mga sakunang tulad nito. Ang pag-pause sa luho ay nagbibigay-daan upang agad mapunuan muli ang alkansya.",
    "hakbang": "Create a dedicated ₱1,000/month Home & Calamity Sinking Fund pocket.",
    "communityStats": {
      "correctPct": 89,
      "sampleSize": 2850,
      "topMisconception": "Resorting to payday loans for storm repairs"
    }
  },
  {
    "id": "Q-108-03",
    "week": 3,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 3 SIMULATION: You receive a retrenchment notice due to company downsizing, with 1 month separation pay. What is your immediate financial survival plan?",
    "promptFilipino": "SIMULASYON LINGGO 3: Natanggal ka sa trabaho dahil sa downsizing at may 1 buwang separation pay. Ano ang agarang plano sa pananalapi?",
    "options": [
      {
        "key": "A",
        "text": "Calculate monthly Essential Spend runway → cut non-essentials → claim SSS Involuntary Separation Benefit (up to ₱20k/mo for 2 mos)",
        "textFilipino": "Kalkulahin ang Essential Runway → gupitin ang luho → mag-file ng SSS Involuntary Separation Benefit"
      },
      {
        "key": "B",
        "text": "Book a luxury resort vacation to relieve employment stress",
        "textFilipino": "Mag-book ng mamahaling bakasyon para mawala ang stress"
      },
      {
        "key": "C",
        "text": "Spend the separation pay gambling on high-risk memecoins",
        "textFilipino": "Isugal ang separation pay sa crypto"
      }
    ],
    "answer": "A",
    "answerLabel": "A: SSS Separation Benefit & Runway Sizing",
    "why": "SSS pays up to ₱20,000/month for 2 months for involuntarily separated workers. Combining this with survival budgeting extends your job-search runway significantly.",
    "whyFilipino": "May SSS Involuntary Separation Benefit na nagbibigay ng tulong pinansyal. Ang pagtitipid at pagkuha ng statutory aid ay nagpapahaba ng iyong runway.",
    "hakbang": "Verify SSS unemployment benefit guidelines on the SSS web portal.",
    "communityStats": {
      "correctPct": 86,
      "sampleSize": 2740,
      "topMisconception": "Unaware of the DOLE/SSS Involuntary Separation Cash Benefit"
    }
  },
  {
    "id": "Q-108-04",
    "week": 4,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 4 SIMULATION: A cousin in the province requests ₱15,000 for emergency hospitalization, but giving it will empty your entire personal food and rent money. What do you do?",
    "promptFilipino": "SIMULASYON LINGGO 4: Nanghihingi ang pinsan ng ₱15,000 pampa-ospital pero kapag ibinigay mo, mauubos ang pambayad mo sa sariling upa at pagkain. Ano ang gagawin?",
    "options": [
      {
        "key": "A",
        "text": "Send what you can safely spare from your Family Envelope (₱3,000) and help connect them to DSWD / Malasakit Center / PCSO aid",
        "textFilipino": "Ipadala ang kaya mula sa Family Envelope (₱3,000) at tulungang lumapit sa Malasakit Center / PCSO"
      },
      {
        "key": "B",
        "text": "Starve yourself and default on your apartment rent to send ₱15,000",
        "textFilipino": "Magpagutom at huwag magbayad ng upa para maibigay ang buo"
      },
      {
        "key": "C",
        "text": "Borrow ₱15,000 from a loan shark under your own name",
        "textFilipino": "Mangutang sa 5-6 para may maipadala"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Cap Remittance & Leverage Public Aid",
    "why": "Government safety nets like Malasakit Centers and PCSO Medical Assistance exist for heavy hospital bills. Never sacrifice your primary food and shelter to finance loans.",
    "whyFilipino": "May Malasakit Center at PCSO para sa malalaking gastusin sa ospital. Ibigay lamang ang nakalaang tulong nang hindi isinasakripisyo ang sariling tahanan.",
    "hakbang": "Save Malasakit Center and PCSO document requirements in your notes.",
    "communityStats": {
      "correctPct": 83,
      "sampleSize": 2620,
      "topMisconception": "Thinking personal borrowing is the only avenue for family medical aid"
    }
  },
  {
    "id": "Q-108-05",
    "week": 5,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 5 SIMULATION: You notice an unauthorized ₱4,500 transfer from your e-wallet. What is the immediate crisis containment sequence?",
    "promptFilipino": "SIMULASYON LINGGO 5: May napansin kang hindi awtorisadong ₱4,500 bawas sa iyong e-wallet. Ano ang agarang hakbang sa krisis na ito?",
    "options": [
      {
        "key": "A",
        "text": "Immediately change MPIN / passwords → unlink connected bank cards → report reference number to 24/7 hotline and file a BSP Consumer complaint ticket",
        "textFilipino": "Palitan agad ang MPIN → i-unlink ang bank accounts → itawag sa hotline at i-report sa BSP"
      },
      {
        "key": "B",
        "text": "Post angrily on public Facebook groups and wait for comments",
        "textFilipino": "Mag-post sa social media at maghintay"
      },
      {
        "key": "C",
        "text": "Transfer another ₱5,000 to see if it also disappears",
        "textFilipino": "Mag-transfer pa ng pera para subukan"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Freeze, Unlink & Formal Dispute",
    "why": "Cutting off compromised access points prevents secondary unauthorized drains, while early logging with the e-wallet and BSP Consumer Affairs establishes a formal dispute trail.",
    "whyFilipino": "Ang mabilis na pagpapalit ng MPIN at pag-unlink sa mga bangko ay humaharang sa patuloy na pagnanakaw bago mag-file ng pormal na reklamo sa BSP.",
    "hakbang": "Set biometric fingerprint / facial recognition logins for all financial apps.",
    "communityStats": {
      "correctPct": 92,
      "sampleSize": 2480,
      "topMisconception": "Venting on social media before securing and freezing compromised credentials"
    }
  },
  {
    "id": "Q-108-06",
    "week": 6,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 6 SIMULATION: Your motorcycle engine overheats on your daily work commute. The repair estimate is ₱6,500. How do you handle transportation and repair?",
    "promptFilipino": "SIMULASYON LINGGO 6: Tumirik ang motor mo papuntang trabaho at kailangan ng ₱6,500 sa pyesa. Paano mo pamamahalaan ang biyahe at pagawa?",
    "options": [
      {
        "key": "A",
        "text": "Pay repair from Transportation Sinking Fund + take public MRT/jeepney transit for 1 week while funds normalize",
        "textFilipino": "Bayaran mula sa Transportation Buffer + mag-commute sa MRT/jeep nang 1 linggo"
      },
      {
        "key": "B",
        "text": "Take an expensive Grab car everywhere on credit card debt for the next month",
        "textFilipino": "Mag-Grab araw-araw gamit ang utang sa credit card"
      },
      {
        "key": "C",
        "text": "Abandon the motorcycle on the highway and walk away",
        "textFilipino": "Iwan ang motor sa kalsada"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Vehicle Sinking Fund & Transit Pivot",
    "why": "Vehicles require regular maintenance buffers. Temporarily switching to public transit prevents debt while rebuilding the reserve.",
    "whyFilipino": "Kailangan ng pondo para sa maintenance ng sasakyan. Ang pansamantalang pag-commute ay pumipigil sa paglobo ng bayarin.",
    "hakbang": "Set aside ₱500 per paycheck into a Vehicle Maintenance Sinking Fund.",
    "communityStats": {
      "correctPct": 90,
      "sampleSize": 2210,
      "topMisconception": "Failing to budget for routine maintenance on vehicles"
    }
  },
  {
    "id": "Q-108-07",
    "week": 7,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 7 SIMULATION: An informal 5-6 lender threatens you at your house on Sunday for an overdue ₱10,000 debt. What is your legal and financial course of action?",
    "promptFilipino": "SIMULASYON LINGGO 7: Sumugod sa bahay ang 5-6 lender at nananakot para sa ₱10,000 na utang. Ano ang tamang legal at pinansyal na hakbang?",
    "options": [
      {
        "key": "A",
        "text": "Calmly document the harassment → seek Barangay mediation (Lupong Tagapamayapa) to negotiate principal-only repayment schedule → avoid physical confrontation",
        "textFilipino": "I-dokumento ang pananakot → dumulog sa Barangay para sa maayos na payment plan sa principal → umiwas sa gulo"
      },
      {
        "key": "B",
        "text": "Borrow from another 5-6 lender to pay the first lender in full (Debt Spiral)",
        "textFilipino": "Mangutang sa isa pang 5-6 para bayaran ang naunang utang"
      },
      {
        "key": "C",
        "text": "Hide under the bed and flee the town forever",
        "textFilipino": "Lumikas at magtago"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Barangay Mediation & Principal Plan",
    "why": "Barangay mediation provides an official, safe forum to curb harassment and negotiate realistic, interest-frozen installment payments directly on the principal balance.",
    "whyFilipino": "Ang barangay mediation ay nagbibigay ng ligtas na proteksyon laban sa karahasan at nagtatakda ng makatarungang hulog sa principal balance.",
    "hakbang": "Know your rights against usurious interest and harassment under the Katarungang Pambarangay Law.",
    "communityStats": {
      "correctPct": 86,
      "sampleSize": 2650,
      "topMisconception": "Rolling over informal loans by borrowing from secondary lenders"
    }
  },
  {
    "id": "Q-108-08",
    "week": 8,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 8 SIMULATION: Your landlord suddenly increases your monthly rent by 30% with only 1 week notice. What does Philippine law state?",
    "promptFilipino": "SIMULASYON LINGGO 8: Biglang itinaas ng landlord ang upa nang 30% at nagbigay lang ng 1 linggong abiso. Ano ang sinasabi ng batas sa Pilipinas?",
    "options": [
      {
        "key": "A",
        "text": "Residential Rent Control Act caps rent hikes on covered units (usually max 4-7% annually) and requires formal advance notice",
        "textFilipino": "May Rent Control Act na nagtatakda ng limitasyon sa pagtaas ng upa (karaniwang 4-7% lang kada taon) at nangangailangan ng pormal na abiso"
      },
      {
        "key": "B",
        "text": "Landlords have absolute divine power to raise rent by any percentage at any second",
        "textFilipino": "Kahit anong oras ay puwedeng itaas ng landlord ang upa nang walang limit"
      },
      {
        "key": "C",
        "text": "Burn down the apartment complex",
        "textFilipino": "Sunugin ang inuupahang bahay"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Rent Control Act Rights",
    "why": "The Philippine National Human Settlements and Urban Development guidelines cap annual rent increases on residential units below specific rental thresholds.",
    "whyFilipino": "Pinoprotektahan ng Rent Control Act ang mga umuupa laban sa biglaang pagsirit ng upa na higit sa legal na limitasyon ng gobyerno.",
    "hakbang": "Keep a copy of your signed lease agreement and rental receipts.",
    "communityStats": {
      "correctPct": 79,
      "sampleSize": 2190,
      "topMisconception": "Believing tenants have zero legal protection against arbitrary rent spikes"
    }
  },
  {
    "id": "Q-108-09",
    "week": 9,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 9 SIMULATION: The company HR announces payroll is delayed by 14 days due to technical banking migrations. How does a resilient household survive?",
    "promptFilipino": "SIMULASYON LINGGO 9: Nag-anunsyo ang kumpanya na maantala ang sweldo nang 14 araw dahil sa system migration. Paano ito haharapin nang matatag?",
    "options": [
      {
        "key": "A",
        "text": "Activate 14-day survival buffer → inform utility companies / landlord early to request grace periods → cook home reserves",
        "textFilipino": "Gamitin ang survival buffer → maagang abisuhan ang landlord/bills para sa grace period → magluto sa bahay"
      },
      {
        "key": "B",
        "text": "Take high-interest cash loans from 4 different mobile loan apps",
        "textFilipino": "Mangutang sa 4 na lending apps"
      },
      {
        "key": "C",
        "text": "Stop reporting to work out of rage and forfeit the delayed pay",
        "textFilipino": "Mag-walkout at huwag nang pumasok"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Proactive Communication & Survival Buffer",
    "why": "Landlords and utility providers readily grant short extensions when notified transparently ahead of due dates. An emergency buffer bridges the gap effortlessly.",
    "whyFilipino": "Ang maagang pakikipag-usap sa landlord bago ang takdang araw ay nagbibigay ng palugit nang walang multa, habang may emergency buffer ka.",
    "hakbang": "Maintain a 1-month cash buffer so a delayed payroll never causes hunger.",
    "communityStats": {
      "correctPct": 91,
      "sampleSize": 2340,
      "topMisconception": "Hiding from bills instead of requesting formal grace periods"
    }
  },
  {
    "id": "Q-108-10",
    "week": 10,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 10 SIMULATION: School tuition enrollment deadline arrives with a ₱14,000 cash balance required. How do you prevent debt shock?",
    "promptFilipino": "SIMULASYON LINGGO 10: Dumating ang deadline ng matrikula sa eskwela at kailangan ng ₱14,000 cash. Paano maiiwasan ang pagkabaon sa utang?",
    "options": [
      {
        "key": "A",
        "text": "Withdraw from your planned 10-month Education Sinking Fund (saved at ₱1,400/month) with zero panic or borrowing",
        "textFilipino": "Ilabas ang naipong Education Sinking Fund (₱1,400/buwan) nang walang kaba o utang"
      },
      {
        "key": "B",
        "text": "Pawn family jewelry at 50% loss",
        "textFilipino": "Isangla ang alahas sa barat na presyo"
      },
      {
        "key": "C",
        "text": "Take an informal 5-6 loan with 20% interest",
        "textFilipino": "Mag-5-6 na may 20% interes"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Planned Sinking Fund Execution",
    "why": "Tuition is an entirely predictable expense. Saving ₱1,400 monthly for 10 months makes enrollment stress-free and debt-free.",
    "whyFilipino": "Ang tuition ay predictable expense. Kapag nag-ipon ng ₱1,400 buwan-buwan, handa ka na sa pasukan nang hindi nangungutang.",
    "hakbang": "Set up an automated monthly sinking fund for school fees starting today.",
    "communityStats": {
      "correctPct": 95,
      "sampleSize": 2790,
      "topMisconception": "Treating annual tuition deadlines as emergency shocks"
    }
  },
  {
    "id": "Q-108-11",
    "week": 11,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 11 SIMULATION: Sari-Sari Store Informal Credit — Managing neighbor credit defaults by enforcing strict cash-only terms. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 11: Sari-Sari Store Informal Credit — Managing neighbor credit defaults by enforcing strict cash-only terms. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2365,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-12",
    "week": 12,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 12 SIMULATION: SSS Sickness Cash Benefit — Filing for official medical income replacement during prolonged clinic recovery. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 12: SSS Sickness Cash Benefit — Filing for official medical income replacement during prolonged clinic recovery. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2380,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-13",
    "week": 13,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 13 SIMULATION: Family Bereavement Sinking Fund — Honoring a passing relative through dignified prep without predatory funeral debt. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 13: Family Bereavement Sinking Fund — Honoring a passing relative through dignified prep without predatory funeral debt. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2395,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-14",
    "week": 14,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 14 SIMULATION: Emergency Dental Extraction — Navigating out-of-network dental care using emergency buffers. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 14: Emergency Dental Extraction — Navigating out-of-network dental care using emergency buffers. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2410,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-15",
    "week": 15,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 15 SIMULATION: Online Shopping Dispute — Securing chargeback refunds from e-commerce delivery parcel fraud. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 15: Online Shopping Dispute — Securing chargeback refunds from e-commerce delivery parcel fraud. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2425,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-16",
    "week": 16,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 16 SIMULATION: Credit Card Minimum Trap — Breaking the cycle of revolving credit charges by freezing card usage. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 16: Credit Card Minimum Trap — Breaking the cycle of revolving credit charges by freezing card usage. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2440,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-17",
    "week": 17,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 17 SIMULATION: Freelance Tech Breakdown — Sinking fund replacement for income-generating laptops and work tools. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 17: Freelance Tech Breakdown — Sinking fund replacement for income-generating laptops and work tools. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2455,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-18",
    "week": 18,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 18 SIMULATION: Pag-IBIG Calamity Loan — Accessing low-interest 5.95% government emergency calamity funds after flooding. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 18: Pag-IBIG Calamity Loan — Accessing low-interest 5.95% government emergency calamity funds after flooding. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2470,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-19",
    "week": 19,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 19 SIMULATION: Veterinary Emergency Care — Treating family pet crises with dedicated pet care reserves. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 19: Veterinary Emergency Care — Treating family pet crises with dedicated pet care reserves. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2485,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-20",
    "week": 20,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 20 SIMULATION: Entourage Peer Pressure — Gracefully declining expensive wedding entourage roles outside personal budget. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 20: Entourage Peer Pressure — Gracefully declining expensive wedding entourage roles outside personal budget. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2500,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-21",
    "week": 21,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 21 SIMULATION: Summer Energy Consumption — Managing air conditioning electric surges through proactive kilowatt monitoring. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 21: Summer Energy Consumption — Managing air conditioning electric surges through proactive kilowatt monitoring. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2515,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-22",
    "week": 22,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 22 SIMULATION: Informal Paluwagan Collapse — Recovering losses and pivoting to regulated PDIC-insured savings vaults. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 22: Informal Paluwagan Collapse — Recovering losses and pivoting to regulated PDIC-insured savings vaults. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2530,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-23",
    "week": 23,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 23 SIMULATION: Major Appliance Breakdown — Repair vs replacement analysis on essential kitchen refrigerators. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 23: Major Appliance Breakdown — Repair vs replacement analysis on essential kitchen refrigerators. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2545,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-24",
    "week": 24,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 24 SIMULATION: Critical Illness Protection Gap — Sizing medical coverage beyond basic PhilHealth limits for major diagnoses. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 24: Critical Illness Protection Gap — Sizing medical coverage beyond basic PhilHealth limits for major diagnoses. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2560,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-25",
    "week": 25,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 25 SIMULATION: Barangay Fiesta Expectations — Hosting mindful celebrations within cash envelopes without borrowing. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 25: Barangay Fiesta Expectations — Hosting mindful celebrations within cash envelopes without borrowing. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2575,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-26",
    "week": 26,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 26 SIMULATION: Mid-Year Debt Restructuring — Consolidating micro-loans into single low-interest credit union facilities. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 26: Mid-Year Debt Restructuring — Consolidating micro-loans into single low-interest credit union facilities. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2590,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-27",
    "week": 27,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 27 SIMULATION: PhilHealth Co-Pay Verification — Auditing hospital bill statement of accounts for proper case rate credits. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 27: PhilHealth Co-Pay Verification — Auditing hospital bill statement of accounts for proper case rate credits. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2605,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-28",
    "week": 28,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 28 SIMULATION: Stolen Smartphone Account Lockout — Executing emergency SIM replacement and remote device wiping. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 28: Stolen Smartphone Account Lockout — Executing emergency SIM replacement and remote device wiping. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2620,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-29",
    "week": 29,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 29 SIMULATION: Sinking Fund Buffer Depletion — Rebuilding emergency cash reserves using progressive micro-targets. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 29: Sinking Fund Buffer Depletion — Rebuilding emergency cash reserves using progressive micro-targets. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2635,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-30",
    "week": 30,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 30 SIMULATION: Insurance Grace Period Defense — Preventing life policy lapsing by utilizing 31-day statutory grace buffers. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 30: Insurance Grace Period Defense — Preventing life policy lapsing by utilizing 31-day statutory grace buffers. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2650,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-31",
    "week": 31,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 31 SIMULATION: Predatory Lending App Defense — Invoking National Privacy Commission protections against illegal contact scraping. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 31: Predatory Lending App Defense — Invoking National Privacy Commission protections against illegal contact scraping. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2665,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-32",
    "week": 32,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 32 SIMULATION: SSS Salary Loan Offset — Accelerating payroll loan amortization to restore full net take-home pay. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 32: SSS Salary Loan Offset — Accelerating payroll loan amortization to restore full net take-home pay. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2680,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-33",
    "week": 33,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 33 SIMULATION: Hospital ER Anti-Deposit Law — Asserting RA 10932 prohibiting advance deposits for emergency patient treatment. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 33: Hospital ER Anti-Deposit Law — Asserting RA 10932 prohibiting advance deposits for emergency patient treatment. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2695,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-34",
    "week": 34,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 34 SIMULATION: Community Fire Document Vault — Securing digital encrypted cloud backups of birth certificates and property titles. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 34: Community Fire Document Vault — Securing digital encrypted cloud backups of birth certificates and property titles. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2710,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-35",
    "week": 35,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 35 SIMULATION: Office Paluwagan Default — Exiting informal workplace money pools in favor of high-yield digital banks. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 35: Office Paluwagan Default — Exiting informal workplace money pools in favor of high-yield digital banks. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2725,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-36",
    "week": 36,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 36 SIMULATION: Commute Fare & Fuel Inflation — Adjusting monthly transit envelopes during sudden global oil price surges. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 36: Commute Fare & Fuel Inflation — Adjusting monthly transit envelopes during sudden global oil price surges. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2740,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-37",
    "week": 37,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 37 SIMULATION: Real Property Tax (Amilyar) — Availing 10-20% municipal prompt-payment tax discounts via sinking funds. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 37: Real Property Tax (Amilyar) — Availing 10-20% municipal prompt-payment tax discounts via sinking funds. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2755,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-38",
    "week": 38,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 38 SIMULATION: Co-Maker Demand Letter — Handling joint liability notices with formal legal mediation and settlement. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 38: Co-Maker Demand Letter — Handling joint liability notices with formal legal mediation and settlement. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2770,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-39",
    "week": 39,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 39 SIMULATION: Water Utility Concealed Leak — Filing water bill dispute adjustments for concealed underground pipe fractures. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 39: Water Utility Concealed Leak — Filing water bill dispute adjustments for concealed underground pipe fractures. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2785,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-40",
    "week": 40,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 40 SIMULATION: WhatsApp Task Recruitment Scam — Identifying fraudulent hotel review schemes requiring security deposits. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 40: WhatsApp Task Recruitment Scam — Identifying fraudulent hotel review schemes requiring security deposits. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2800,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-41",
    "week": 41,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 41 SIMULATION: Disaster Relief Phishing Fraud — Verifying DSWD and Red Cross donation channels during calamity drives. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 41: Disaster Relief Phishing Fraud — Verifying DSWD and Red Cross donation channels during calamity drives. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2815,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-42",
    "week": 42,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 42 SIMULATION: Bank Account KYC Freeze — Maintaining active updated valid IDs to prevent automated banking freezes. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 42: Bank Account KYC Freeze — Maintaining active updated valid IDs to prevent automated banking freezes. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2830,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-43",
    "week": 43,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 43 SIMULATION: Credit Card Annual Fee Waiver — Requesting formal annual fee waivers based on consistent payment history. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 43: Credit Card Annual Fee Waiver — Requesting formal annual fee waivers based on consistent payment history. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2845,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-44",
    "week": 44,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 44 SIMULATION: 13th Month Pay Advance Spending — Refusing advance loans against future 13th month bonuses. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 44: 13th Month Pay Advance Spending — Refusing advance loans against future 13th month bonuses. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2860,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-45",
    "week": 45,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 45 SIMULATION: 11.11 / Black Friday Flash Sales — Applying 48-hour cooling cart rules during massive e-commerce marketing. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 45: 11.11 / Black Friday Flash Sales — Applying 48-hour cooling cart rules during massive e-commerce marketing. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2875,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-46",
    "week": 46,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 46 SIMULATION: Holiday Aguinaldo Sinking Fund — Capping holiday gift budgets to pre-funded envelopes. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 46: Holiday Aguinaldo Sinking Fund — Capping holiday gift budgets to pre-funded envelopes. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2890,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-47",
    "week": 47,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 47 SIMULATION: Provincial Holiday Travel — Booking bus and ferry tickets early to bypass holiday fare gouging. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 47: Provincial Holiday Travel — Booking bus and ferry tickets early to bypass holiday fare gouging. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2905,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-48",
    "week": 48,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 48 SIMULATION: Holiday Personal Loan Avoidance — Refusing high-interest holiday credit to finance gift exchanges. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 48: Holiday Personal Loan Avoidance — Refusing high-interest holiday credit to finance gift exchanges. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2920,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-49",
    "week": 49,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 49 SIMULATION: Balikbayan Party Peer Pressure — Setting gentle financial boundaries with returning overseas relatives. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 49: Balikbayan Party Peer Pressure — Setting gentle financial boundaries with returning overseas relatives. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2935,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-50",
    "week": 50,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 50 SIMULATION: BIR ₱90k 13th Month Tax Exemption — Maximizing the statutory ₱90,000 tax-free bonus ceiling under TRAIN law. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 50: BIR ₱90k 13th Month Tax Exemption — Maximizing the statutory ₱90,000 tax-free bonus ceiling under TRAIN law. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2950,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-51",
    "week": 51,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 51 SIMULATION: New Year Eve Emergency Reserve — Ring-fencing emergency cash for holiday accidents and hospital clinics. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 51: New Year Eve Emergency Reserve — Ring-fencing emergency cash for holiday accidents and hospital clinics. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2965,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  },
  {
    "id": "Q-108-52",
    "week": 52,
    "course": 108,
    "tier": "Crisis Resilience",
    "format": "Linggo Boss: Shock Simulator",
    "kind": "choice",
    "prompt": "WEEK 52 SIMULATION: Year-End Solvency & Goal Reset — Auditing net worth and launching next year’s financial resilience roadmap. What is the most resilient household decision?",
    "promptFilipino": "SIMULASYON LINGGO 52: Year-End Solvency & Goal Reset — Auditing net worth and launching next year’s financial resilience roadmap. Ano ang pinakamatatag na hakbang para sa pamilya?",
    "options": [
      {
        "key": "A",
        "text": "Follow structured Hermes financial resilience protocol: rely on pre-funded envelopes, verify statutory rights, and avoid predatory loans",
        "textFilipino": "Sundin ang Hermes resilience protocol: gamitin ang nakalaang pondo, alamin ang karapatan sa batas, at iwasan ang patong-patong na utang"
      },
      {
        "key": "B",
        "text": "Borrow urgently from an informal 5-6 lender at 20% interest per month",
        "textFilipino": "Mangutang agad sa 5-6 na may 20% interes kada buwan"
      },
      {
        "key": "C",
        "text": "Panic and spend all remaining savings on retail therapy",
        "textFilipino": "Mag-panic at ubusin ang natitirang pera"
      }
    ],
    "answer": "A",
    "answerLabel": "A: Systematic Resilience Protocol",
    "why": "Structured preparation, statutory knowledge, and boundary enforcement protect Filipino households from spiraling into crisis.",
    "whyFilipino": "Ang maagang paghahanda, kaalaman sa mga batas ng proteksyon, at disiplina sa pondo ang sandata ng bawat matatag na pamilyang Pilipino.",
    "hakbang": "Review your household action plan for this crisis scenario in Hermes.",
    "communityStats": {
      "correctPct": 88,
      "sampleSize": 2980,
      "topMisconception": "Acting impulsively instead of utilizing statutory consumer protections"
    }
  }
];

export const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q]),
);

/** Sunday "Linggo Boss" cards are kept out of the weekday rotation. */
export const isBossCard = (q: Question) =>
  q.format.startsWith('Linggo Boss') || q.course === 108;

export const ALL_FORMATS: string[] = Array.from(
  new Set(QUESTIONS.map((q) => q.format)),
).sort();

export const ALL_TIERS: FinancialTier[] = [
  'Cash Management',
  'Debt Management',
  'Emergency & Savings',
  'Accumulation & Net Worth',
  'Protection & Insurance',
  'Crisis Resilience',
];
