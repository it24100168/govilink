# 🌾 GoviLink — Hyperlocal Sri Lankan Produce Platform

> **A hyperlocal agriculture platform connecting home-level growers and small-scale farmers having 5–20 kg surplus harvests directly with nearby small buyers.**

[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Live_Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://govilink-seven.vercel.app/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

---

## 🔗 Project Links

- 🌐 **Deployed Application**: [https://govilink-seven.vercel.app/](https://govilink-seven.vercel.app/)
- 🎥 **Demonstration Video**: [Watch Demo on Google Drive](https://drive.google.com/drive/folders/1UQKSbUaJUYEmwCieFpiZ-Opdj2Kd2NPg?usp=sharing)

---

## 📌 The Selected Problem

In Sri Lanka, millions of home gardeners, rooftop growers, and smallholders harvest surplus produce (papaya, gotukola, green chillies, bananas, drumsticks, etc.) in quantities ranging from **5 to 20 kg**.

- **Wholesale Market Barrier**: Major economic centres (Dambulla, Manning Market, Meegoda) handle large wholesale consignments (500+ kg). A 10 kg batch is economically impractical to transport over long distances.
- **High Post-Harvest Waste**: Due to the lack of immediate local visibility, fresh surplus often spoils in backyards.
- **Inflated Retail Prices & Lost Freshness**: Nearby consumers (households, boarding houses, local kaddes, and small eateries) buy produce that has traveled hundreds of kilometers through intermediaries, paying high prices for diminished nutritional quality.

---

## 💡 The Proposed Solution

**GoviLink** eliminates the wholesale intermediary barrier by enabling direct **hyperlocal discovery** within a 1–5 km radius:

1. **Right-Sized for 5–20 kg**: Purpose-built for small home garden batches.
2. **Hyperlocal Discovery**: Matches small growers with neighbours and local food businesses within walking or short driving distance.
3. **Farm-to-Table in Hours**: Consumers receive peak-freshness produce within hours of picking.
4. **Fair Pricing**: Growers earn more than farm-gate wholesale rates, while buyers pay less than retail supermarket prices.

---

## ✨ Main Features

### 1. 🚜 Farmer Post-Harvest Portal (`/post-harvest`)
- Simple listing creation tailored for 5–20 kg harvest batches.
- Input validation: Required fields, positive quantity/price, valid Sri Lankan phone number format (`07XXXXXXXX` / `+947XXXXXXXX`).
- One-click **"Use My Current Location"** button utilizing the browser Geolocation API to attach GPS coordinates.
- Real-time feedback with instant success notification and graceful error handling.

### 2. 🔍 Buyer Produce Finder (`/find-produce`)
- Search by produce name (English, Sinhala, or Tamil common names).
- Minimum quantity filter (`quantity_kg >= required_quantity`).
- **Proximity-Based Sorting**: Computes Haversine distance in kilometers and sorts matching batches from **nearest to farthest**.
- Direct **"Call Farmer"** action using native `tel:` links for immediate phone coordination.

### 3. 🛒 Live Available Produce Marketplace (`/listings`)
- Real-time catalog feed querying active (`available = true`) harvest listings from Supabase.
- Instant category filter tabs (*All Produce*, *Vegetables*, *Fruits*, *Leafy Greens*, *Spices*).
- Interactive **Batch Details Modal** displaying batch size, unit & total pricing, grower name, location, and direct call action.

### 4. 📍 Geolocation & Distance Calculation Engine
- Haversine formula calculation computing geodesic distance in kilometers between buyer and farmer coordinates.
- Robust, non-blocking fallbacks when GPS access is disabled or unavailable.

### 5. 🎨 Responsive Agriculture Design System
- Modern Sri Lankan agricultural color palette (emerald green, forest green, harvest amber, and clean neutrals).
- Custom typography using Google Fonts (*Outfit* and *Plus Jakarta Sans*).
- Mobile-first responsive UI tested across mobile, tablet, and desktop viewports.

---

## 🛠️ Technologies Used

- **Frontend**: React.js (React 19), Vite, JavaScript (ES6+), HTML5, CSS3
- **Backend & Database**: Supabase, PostgreSQL, Supabase JS SDK (`@supabase/supabase-js`), Row Level Security (RLS)
- **Location & Matching**: Browser Geolocation API, Haversine Distance Formula Algorithm
- **Version Control**: Git & GitHub
- **Deployment & Hosting**: Vercel

| Technology / Tool | Purpose |
|---|---|
| **React 19 & Vite** | Modern component-based frontend framework and fast build tool |
| **JavaScript (ES6+) & CSS3** | Dynamic application logic, responsive design tokens, and layout styling |
| **React Router v7** | Single Page Application (SPA) client-side routing and navigation |
| **Supabase (PostgreSQL)** | Cloud database backend, REST APIs, real-time data persistence, and RLS |
| **Browser Geolocation API** | Device GPS coordinate acquisition for proximity matching |
| **Git & GitHub** | Source code version control and team collaboration |
| **Vercel** | Continuous production deployment with SPA rewrites (`vercel.json`) |

---

## 🤖 AI Tools Used

- **ChatGPT / GitHub Copilot / Google Gemini**:
  - Architectural design assistance and modular feature planning.
  - Code scaffolding for reusable UI components and CSS layout styling.
  - Implementation of regex validation patterns and Haversine distance calculation logic.
  - Git conflict resolution and production deployment configuration (`vercel.json` SPA routing).

---

## 👥 Team Member Details & Contributions

| Student ID | Name | Feature / Module | Contribution Details |
|---|---|---|---|
| **IT24100168** | **HAMDHAN M.H** | **Harvest Module** | • Developed the Farmer Harvest Listing form (`HarvestForm.jsx`).<br>• Implemented client-side validation (regex, numeric constraints).<br>• Configured the Supabase client (`src/lib/supabase.js`) and database schema integration.<br>• Managed production deployment to Vercel and SPA rewrite routing. |
| **IT24100382** | **HERATH H.M.P.C.B.** | **Finder Module** | • Developed the Buyer Produce Finder (`ProduceFinder.jsx`).<br>• Implemented crop query search and required quantity filtering logic.<br>• Integrated direct "Call Farmer" phone actions (`tel:` links).<br>• Built empty and error state feedback UI. |
| **IT24103606** | **RATHNAYAKE R.M.P.T** | **Location Module** | • Implemented Geolocation API integration (`getCurrentLocation`).<br>• Developed the mathematical Haversine distance calculation utility in kilometers.<br>• Created the `sortByNearest` nearest-to-farthest sorting engine.<br>• Handled denied and unavailable location permission fallbacks. |
| **IT24102876** | **NAWARATHNA I.G.D.S** | **Marketplace Module** | • Developed the Available Produce feed (`MarketplaceListingsPlaceholder.jsx`).<br>• Built real-time Supabase catalog queries.<br>• Implemented active category filtering tabs.<br>• Created the interactive Batch Details modal dialog. |

---

## 📂 Project Structure

```
govilink/
├── public/
│   └── _redirects                      # Netlify SPA routing rewrite
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx & .css       # Responsive navigation bar
│   │   │   ├── Button.jsx & .css       # Multi-variant button component
│   │   │   ├── Input.jsx & .css        # Form input component with prefix/suffix
│   │   │   ├── PageHeader.jsx & .css   # Standardized page banner
│   │   │   ├── ProduceCard.jsx & .css  # Agriculture produce card
│   │   │   └── Footer.jsx & .css       # Agricultural community footer
│   │   └── index.js                    # Shared component barrel export
│   ├── features/
│   │   ├── harvest/                    # Farmer Harvest Submission feature
│   │   │   ├── HarvestForm.jsx
│   │   │   ├── harvest.css
│   │   │   └── index.js
│   │   ├── finder/                     # Buyer Produce Finder feature
│   │   │   ├── ProduceFinder.jsx
│   │   │   ├── finder.css
│   │   │   └── index.js
│   │   ├── location/                   # Geolocation & Distance Matching feature
│   │   │   ├── locationUtils.js
│   │   │   ├── location.css
│   │   │   └── index.js
│   │   └── marketplace/                # Live Marketplace & Catalog feature
│   │       ├── MarketplaceListingsPlaceholder.jsx
│   │       ├── marketplace.css
│   │       └── index.js
│   ├── pages/                          # Application route views
│   │   ├── HomePage.jsx & .css
│   │   ├── PostHarvestPage.jsx
│   │   ├── FindProducePage.jsx
│   │   ├── ListingsPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── lib/
│   │   └── supabase.js                 # Supabase client singleton
│   ├── App.jsx                         # React Router route definitions
│   ├── App.css                         # Global container styles
│   ├── index.css                       # Design tokens & typography reset
│   └── main.jsx                        # React root entry point
├── .env.example                        # Environment variables template
├── vercel.json                         # Vercel SPA routing rewrite rules
└── package.json
```

---

## 🚀 Installation & Execution Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- `npm` (bundled with Node.js)
- A Supabase account with a `harvest_listings` table

### Step-by-Step Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/it24100168/govilink.git
   cd govilink/govilink
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Database Table Schema**:
   In your Supabase SQL Editor, run the following table definition:
   ```sql
   CREATE TABLE IF NOT EXISTS harvest_listings (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     farmer_name TEXT NOT NULL,
     produce TEXT NOT NULL,
     quantity_kg NUMERIC NOT NULL,
     price_per_kg NUMERIC NOT NULL,
     location_name TEXT NOT NULL,
     latitude FLOAT8,
     longitude FLOAT8,
     phone TEXT NOT NULL,
     harvest_date DATE NOT NULL,
     available BOOLEAN DEFAULT true,
     created_at TIMESTAMPTZ DEFAULT now()
   );
   ```

5. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

6. **Build for Production**:
   ```bash
   npm run build
   ```
   The compiled production output will be in the `dist/` directory.

---

## 📄 License

This project was developed for academic and educational evaluation as part of the **SE3090 Mini Hackathon**. All rights reserved © 2026 GoviLink Sri Lanka.
