# Hermes Hulog — Hestia's Daily Money Game (Standalone Web App)

> **"Isang hulog araw-araw."** A 60-second micro-learning habit game under **Hermes Academy** (Exoasia Innovation Hub). 
> Standalone web application for Desktop and Mobile, complete with a comprehensive **Admin Portal** for questions, curriculum management, and registered player analytics.

---

## 🚀 Overview & Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Plus Jakarta Sans + Hermes Brand Tokens (`#1B50D8`, Hestia Honey, Bamboo Alkansya)
- **Player Accounts & Storage**: Registered player session tracking (Username & Password, sample integration) + Local answer logging + Deterministic nationwide schedule
- **Admin Portal**: Passcode-gated administration panel (`/admin`) for adding custom questions, managing curriculum, and auditing real user answer analytics

---

## 📁 Repository Structure

```
hermes-hulog/
├── public/
│   ├── mascots/               # Official Hestia poses (idle, done, thinking, etc.)
│   ├── fonts/                 # Plus Jakarta Sans OFL web fonts
│   └── hermes-mark.svg        # Official Hermes Wing glyph
├── src/
│   ├── data/
│   │   ├── courses.ts         # FRP 101–108 course titles & metadata
│   │   ├── questions.ts       # 62 daily micro-learning cards & answer keys
│   │   ├── collectibles.ts    # 6 Cultural Exhibition categories & wearable attire
│   │   └── types.ts           # TypeScript interfaces for questions & courses
│   ├── lib/
│   │   ├── users.ts           # Player registration, login, and answer event logging
│   │   ├── customQuestions.ts # Admin dynamic question engine (+ Add Question)
│   │   ├── statistics.ts      # Real-time answer analytics computed from user data
│   │   ├── date.ts            # Asia/Manila uniform date calculations
│   │   ├── schedule.ts        # Nationwide deterministic 3-card daily schedule
│   │   ├── progress.ts        # Local player progression & Sunday Basag rewards
│   │   └── sound.ts           # WebAudio coin clink & Sunday basag audio
│   ├── components/
│   │   ├── Alkansya.tsx       # SVG bamboo coin bank with fill levels & coin drop
│   │   ├── HestiaMascot.tsx   # Mascot display supporting poses & equipped looks
│   │   ├── Header.tsx         # Hermes Academy top navigation & player profile modal
│   │   └── PlayerLayout.tsx   # Mobile-friendly layout with bottom navigation bar
│   ├── pages/
│   │   ├── Home.tsx           # Clean Alkansya sanctuary home & daily drop action
│   │   ├── Play.tsx           # 3-card interactive micro-game (Scam, Sort, etc.)
│   │   ├── Collection.tsx     # English exhibition shelf with 6 heritage categories
│   │   └── admin/
│   │       ├── AdminLayout.tsx    # Admin passcode gate (Default: hestia2026)
│   │       ├── AdminOverview.tsx  # Curriculum metrics & today's schedule
│   │       ├── AdminQuestions.tsx # Filterable bank with "+ Add Question" modal
│   │       ├── AdminCalendar.tsx  # Full year calendar schedule viewer
│   │       └── AdminStatistics.tsx# Registered user data table & response analytics
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── vite.config.ts
```

---

## 🏛️ Collection Shelf Exhibition & Hestia Wearable Attire

The Collection Shelf features 6 authentic exhibition categories in English, showcasing authentic Filipino items:

1. **Philippine Money & Numismatics** (*Salapi ng Pilipinas*): Piloncitos, 1903 Silver Peso, WWII Guerilla Emergency Note, Central Bank 1949 Series, Ang Bagong Lipunan, New Generation Currency, 1000-Piso Polymer Eagle.
2. **Philippine National Symbols & Treasures** (*Pambansang mga Bagay sa Pilipinas*): Sampaguita, Narra, Agila ng Pilipinas, Anahaw, Arnis Baston, Kalabaw, Manggang Kalabaw, Bahay Kubo.
3. **Ancient Philippine Artifacts & Pottery** (*Sinaunang Kagamitan at Antigo*): Kawayang Alkansya, Palayok na Luwad ng Tiwi, Manunggul Burial Jar, Maitum Anthropomorphic Pottery, Golden Tara of Agusan, Butuan Balangay, Lantaka Swivel Cannon, Sungkaang Kahoy.
4. **Philippine Farm & Rural Life** (*Karaniwang Makikita sa Bukid*): Araro at Pamatok, Bilaong Kawayan at Bakol, Itak ng Magsasaka, Karit sa Pag-aani, Dulos, Kabyawan ng Tubo, Bangkong Kahoy sa Silong, Bayong na Banig.
5. **Hestia's Wearable National Costumes** (*Pambansang Damit na Masusuot ni Hestia*): Baro't Sayang Maria Clara, Embroidered Barong Tagalog, Traje de Mestiza with Butterfly Sleeves, T'boli T'nalak Regalia with Hawk Bells, Inaul Royal Malong, Yakan Weave, Visayan Kimona & Salakot, Kalinga Tapis.
6. **Philippine Aswang & Mythical Looks** (*Mga Aswang at Nilalang — New Look ni Hestia*): Mistikong Tikbalang, Midnight Bat-Winged Manananggal, Balete Chieftain Kapre, Bakunawa Moon-Dragon, Luminescent Coral Sirena, Maria Makiling Diwata, Nuno sa Punso Earth Spirit, Clever Tiyanak Imp.

> **Dress-Up Feature**: Clicking any costume or aswang mythical look allows players to click **"Wear this Look on Hestia"**. Hestia's active avatar immediately wears the equipped look throughout the application!

---

## 🔑 Admin Portal

1. Navigate to `/admin` in your web browser (or click the **Admin** button in the header).
2. Enter the admin passcode:
   ```text
   hestia2026
   ```
   *(Can be customized via `VITE_ADMIN_PASSCODE` in environment variables).*
3. In the Admin Portal:
   - **Add Questions / Games**: Click `+ Add Question / Game` to dynamically create new cards (Scam o Legit?, Tama o Mali?, Multiple Choice, Sweldo Sort) without modifying code.
   - **Registered Users Table**: View all registered sample players, joined dates, total questions answered, correct responses, and personal accuracy rates.
   - **User Answer History**: Inspect individual user response logs to see exact choices and answers submitted.
   - **Question Performance Table**: View accuracy rates, attempt counts, and common misconceptions generated from registered user answers.
   - **Curriculum Calendar**: View the daily 3-card schedule rotation across all 365 days of the year.

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build
```

Open `http://localhost:5173` in your web browser to start exploring Hermes Hulog.
