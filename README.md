# GoviLink — Hyperlocal Sri Lankan Produce Platform

GoviLink is a Sri Lankan hyperlocal agriculture platform designed to connect home-level growers and small-scale farmers having **5–20 kg surplus harvests** directly with nearby small buyers (households, boarding houses, local kaddes, and neighbourhood eateries).

---

## 🌾 The Problem & Solution

- **The Problem:** Small growers harvest 5–20 kg of produce (papaya, gotukola, chilli, bananas, etc.) which is impractical to transport to distant wholesale economic centres (Dambulla, Manning Market), leading to high post-harvest loss or heavy middleman markups.
- **The Solution:** GoviLink provides direct hyperlocal discovery within a 1–5 km radius, enabling same-day farm-to-table transactions with zero wholesale intermediaries.

---

## 🚀 Routes & Pages

| Route | Page / Purpose | Feature Module |
|---|---|---|
| `/` | Landing / Home Page | Landing presentation & overview |
| `/post-harvest` | Grower harvest submission | `src/features/harvest` |
| `/find-produce` | Buyer search & radius filtering | `src/features/finder` |
| `/listings` | Available produce directory | `src/features/marketplace` |

---

## 👥 4-Developer Branch Structure

To minimize Git merge conflicts, developers should work within their designated feature folders:

1. **Harvest Team (`features/harvest`)**:
   - Location: `src/features/harvest/`
   - Scope: Crop submission, harvest freshness, 5–20 kg batch logic, photo upload.

2. **Finder / Search Team (`features/finder`)**:
   - Location: `src/features/finder/`
   - Scope: Buyer query search, radius filtering (1km/3km/5km), buyer matching.

3. **Location Team (`features/location`)**:
   - Location: `src/features/location/`
   - Scope: Device geolocation API, GN division/town picker, distance calculation.

4. **Marketplace Team (`features/marketplace`)**:
   - Location: `src/features/marketplace/`
   - Scope: Supabase live queries, listing feed, category filters, batch reserving.

---

## 🧩 Shared Reusable Components

Located in `src/components/` (and re-exported via `src/components/index.js`):

- **`Navbar`**: Responsive header with navigation links, brand logo, and mobile drawer.
- **`Button`**: Primary, secondary, amber, outline, and ghost variants with size and icon support.
- **`Input`**: Accessible inputs with label, helper, error, and unit prefix/suffix (e.g. `kg`, `Rs.`).
- **`PageHeader`**: Inner page header banner with badge, breadcrumb back link, and action area.
- **`ProduceCard`**: Agriculture produce card displaying batch size, price/kg, distance, freshness, and grower.
- **`Footer`**: Sri Lankan community footer.

---

## 🛠️ Development

Run the local development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```
