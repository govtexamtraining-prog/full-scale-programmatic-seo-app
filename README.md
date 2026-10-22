# Google Antigravity — India's Ultimate Programmatic SEO (pSEO) Public Data Portal

[![pSEO Architecture](https://img.shields.io/badge/pSEO-Live%20Engine-brightgreen)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)]()
[![Built with React & Vite](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Vanilla%20CSS-61dafb.svg)]()

**Google Antigravity** is a high-traffic, mobile-responsive, production-ready web application built to automatically generate thousands of hyper-local, search-engine-optimized landing pages targeting high-intent micro-keywords across India (Daily Fuel Rates, Live BIS 916 Gold Prices, and Sarkari Government Examinations).

---

## ⚡ Core Features & Architectural Pillars

### 1. Programmatic SEO (pSEO) Routing Engine
Automated page generation targeting long-tail Indian search intent queries without manual content writing:
- **National Hub:** `/` (Aggregator dashboard with national tickers, 3-column Sarkari grid, and state directory)
- **Vertical Landing Hubs:**
  - `/fuel-prices` — State-wise comparison matrix, highest & lowest fuel rates in India
  - `/gold-rates` — Live 22K/24K spot bullion prices, sovereign & tola calculators
  - `/exam-schedules` — Central & State government recruitment notifications
- **Hyper-Local pSEO Routes (`/[vertical]/[state]/[city]`):**
  - `/fuel-prices/tamil-nadu/coimbatore`
  - `/fuel-prices/maharashtra/mumbai`
  - `/gold-rates/tamil-nadu/chennai`
  - `/gold-rates/karnataka/bengaluru`
  - *(Covers 30+ major Indian metropolitan cities across Tamil Nadu, Maharashtra, Karnataka, Delhi, Telangana, Gujarat, UP, West Bengal, Rajasthan, Kerala, and more)*
- **Micro-Keyword Exam Routes (`/exam-schedules/[org]/[postSlug]`):**
  - `/exam-schedules/upsc/civil-services-ias-prelims-2026`
  - `/exam-schedules/ssc/cgl-tier-1-2026`
  - `/exam-schedules/ibps/po-recruitment-2026`
  - `/exam-schedules/rrb/assistant-loco-pilot-alp-2026`
  - `/exam-schedules/tnpsc/group-4-services-vao-2026`

### 2. Auto-Injected JSON-LD Schema & Meta Tags
Every page dynamically injects rich structured microdata into the document `<head>`:
- `Product` & `UnitPriceSpecification` for Petrol, Diesel, and 22K/24K Gold.
- `LocalBusiness` & `GeoCoordinates` for municipal commodity territories.
- `JobPosting` & `EducationEvent` for Sarkari Exam schedules, deadlines, salaries, and organizing bodies.
- `BreadcrumbList` on every route for enhanced search engine breadcrumb trails.

### 3. Advanced Features
- **Live Google SERP & SEO Inspector:** Built-in drawer showing real-time mobile/desktop Google Search snippet previews, character counters, indexing signals, and a 1-click **Copy JSON-LD** schema button.
- **Automated 06:00 AM IST Sync & Stale Fallback:** Simulates the daily public data feed refresh with a resilient fallback mechanism that warns users with a subtle notification ribbon during upstream outages rather than throwing 404/500 errors.
- **Interactive Calculators:**
  - *Gold & Jewellery Billing Calculator:* Computes making charges (5–25%), mandatory BIS hallmarking fee (₹45), and 3% GST breakdown.
  - *Trip Fuel Cost & Mileage Calculator:* Computes required liters, cost-per-km, and fuel expenses.
- **Cheaper Nearby Cities Widget:** Identifies neighboring municipalities with lower fuel taxes to help commuters and fleet operators save on bulk refueling.
- **Universal Search Modal (Ctrl/Cmd + K):** Fuzzy search across all 30+ Indian cities, states, commodities, and examinations.
- **Dynamic XML Sitemap (`/sitemap.xml`):** Generates valid XML output meeting the `sitemaps.org 0.9` protocol, complete with visual crawl-budget inventory explorer and one-click download.
- **Zero Cumulative Layout Shift (CLS) Ad Placements:** Fixed-dimension containers for Leaderboard (728x90), Mid-content MPU (300x250), and Sticky Bottom bar.
- **Dark / Light Theme Engine:** Smooth transitions with persistent local storage.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build production bundle
npm run build
```

Open `http://localhost:5173/` in your browser.
