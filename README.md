# Hermes Hulog — Hestia's Daily Money Game (Standalone Web App)

> **"Isang hulog araw-araw."** Isang 60-segundong micro-learning habit game sa ilalim ng **Hermes Academy** (Exoasia Innovation Hub). 
> Standalone web application para sa PC/Laptop at Mobile, may kasamang buong **Admin Panel** para sa question bank at schedule.

---

## 🚀 Live Demo & Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Plus Jakarta Sans + Hermes Brand Tokens (`#1B50D8`, Hestia Honey, Bamboo Alkansya)
- **Deployment**: Vercel ready (with `vercel.json` SPA rewrites)
- **State & Data**: Client-side localStorage (100% Private Sanctuary guarantee) + Deterministic nationwide schedule

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
│   │   ├── collectibles.ts    # Pera ng Pilipinas & Sunday Basag rewards
│   │   └── types.ts           # TypeScript interfaces for questions & courses
│   ├── lib/
│   │   ├── date.ts            # Asia/Manila uniform date calculations
│   │   ├── schedule.ts        # Nationwide deterministic 3-card daily schedule
│   │   ├── progress.ts        # LocalStorage progress, streaks & "Apoy ni Hestia"
│   │   └── sound.ts           # WebAudio coin clink & Sunday basag sounds
│   ├── components/
│   │   ├── Alkansya.tsx       # SVG bamboo coin bank with fill levels & coin drop
│   │   ├── HestiaMascot.tsx   # Mascot display component supporting all poses
│   │   ├── Header.tsx         # Responsive Hermes Academy top navigation
│   │   └── PlayerLayout.tsx   # Mobile-friendly layout with bottom navigation bar
│   ├── pages/
│   │   ├── Home.tsx           # Alkansya home, streak flame & Sunday Basag
│   │   ├── Play.tsx           # 3-card interactive micro-game (Scam, Sort, etc.)
│   │   ├── Collection.tsx     # Collectibles gallery (Pera ng Pilipinas, Outfits)
│   │   ├── Settings.tsx       # Daily checkin habit stacking & local reset
│   │   └── admin/
│   │       ├── AdminLayout.tsx    # Admin passcode gate (Default: hestia2026)
│   │       ├── AdminOverview.tsx  # Curriculum metrics & today's schedule
│   │       ├── AdminQuestions.tsx # Filterable bank with show dates per question
│   │       └── AdminCalendar.tsx  # Full year schedule & CSV export
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── vercel.json                # Vercel SPA routing rewrite configuration
├── package.json
└── vite.config.ts
```

---

## 🔑 Admin Panel Access

1. Pumunta sa `/admin` sa web browser (o i-click ang **Admin Panel** button sa header).
2. Ilagay ang admin passcode:
   ```text
   hestia2026
   ```
   *(Puwede itong baguhin gamit ang `VITE_ADMIN_PASSCODE` sa Vercel Environment Variables).*
3. Sa Admin Panel, maaari mong:
   - Tingnan ang lahat ng 62 questions na naka-map sa FRP 101–108.
   - I-filter ayon sa format (*Scam o Legit?*, *Sweldo Sort*, *Tama o Mali?*, *Alin ang Mas Mahal?*).
   - Makikita ang **eksaktong mga petsa** kung kailan lalabas ang bawat tanong.
   - I-export ang buong schedule sa **CSV** (compatible sa Microsoft Excel o Google Sheets).

---

## ☁️ Paano I-deploy sa Vercel (Step-by-Step Guide)

Kung bago ka pa sa Vercel, narito ang madaling paraan para mai-upload ito:

### Option A: Gamit ang GitHub (Pinakamadali at Recommended)

1. **Gumawa ng bagong repository sa GitHub**:
   - Mag-log in sa [github.com](https://github.com) at gumawa ng bagong repository (hal. `hermes-hulog`).
2. **I-upload ang laman ng folder na ito**:
   - I-upload o i-commit ang buong folder ng `hermes-hulog` sa iyong GitHub repo.
3. **Pumunta sa Vercel**:
   - Mag-log in sa [vercel.com](https://vercel.com) gamit ang iyong GitHub account.
   - I-click ang **"Add New..."** → **"Project"**.
   - Piliin ang iyong `hermes-hulog` repository at i-click ang **"Import"**.
4. **Build & Output Settings**:
   - Kusang madedetect ng Vercel na ito ay **Vite**.
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - *(Optional)* Sa **Environment Variables**, maaari mong idagdag:
     - Key: `VITE_ADMIN_PASSCODE`
     - Value: `ang-iyong-sikretong-passcode`
5. **I-click ang "Deploy"**:
   - Pagkatapos ng humigit-kumulang 30 segundo, bibigyan ka ng Vercel ng live URL (halimbawa: `https://hermes-hulog.vercel.app`).

### Option B: Gamit ang Vercel CLI (Diretso mula sa Terminal)

Kung may Node.js at Vercel CLI ka:
```bash
# 1. Buksan ang terminal sa folder ng hermes-hulog
cd hermes-hulog

# 2. I-install ang vercel CLI kung wala pa
npm install -g vercel

# 3. I-deploy
vercel
```
Sundin lang ang prompts sa terminal (default enter lang).

---

## 💻 Local Development

```bash
# Mag-install ng dependencies
npm install

# Patakbuhin ang dev server
npm run dev
```
Buksan ang `http://localhost:5173` sa iyong browser.
