# UrbanSarkari — India's #1 Sarkari Result & Verified Doorstep Services Hub

[![Brand: UrbanSarkari](https://img.shields.io/badge/Brand-UrbanSarkari-red.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)]()
[![Built with React & Vite](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Vanilla%20CSS-61dafb.svg)]()

**UrbanSarkari** is a high-traffic, mobile-responsive, production-grade consumer portal inspired by top Indian industry leaders (**Urban Company** + **Sarkari Result**). It combines real-time statutory examination circulars, admit cards, and recruitment notices with background-verified local home utilities, coaching academies, legal/tax consultants, and wellness hubs across 750+ Indian districts.

---

## ⚡ Core Features & Architectural Pillars

### 1. The 5 Core Verticals
- **Sarkari Result & Exam Board 2026 (`/exam-schedules`):** Official notifications, eligibility criteria, exam dates, syllabus breakdown, and instant ₹49 UPI test prep packets for UPSC, SSC, RRB, IBPS, and State PSCs.
- **Home Services & Utilities (`/home-services`):** Transparent rate cards (starting ₹499) for AC Repair & Gas Refill, Electricians, and Plumbers with 30-min doorstep arrival.
- **Coaching & Education Academies (`/coaching-institutes`):** UPSC, NEET, JEE, and Banking academy listings with faculty credentials and fee schedules.
- **Professional Services (`/legal-tax-services`):** Verified Chartered Accountants and Advocates for GST registration, ITR filing, and business compliance.
- **Wellness, Gyms & Lifestyle Hubs (`/wellness-fitness`):** Premium gym memberships, certified personal trainers, and free 1-day guest passes.

### 2. High-Traffic SEO, VEO & GEO Architecture
- **592 Pre-Rendered XML URLs (`/sitemap.xml`):** Automated sitemap crawler discovery targeting 30+ major Indian cities.
- **VEO (Voice Engine Optimization):** `SpeakableSpecification` schema and natural-language `.speakable-answer` blocks engineered for Google Assistant, Apple Siri, and Amazon Alexa.
- **GEO (Generative Engine Optimization & Local SEO):** Direct ingestion directives for AI engines (`GPTBot`, `PerplexityBot`, `ClaudeBot`) and hyper-local geo tags (`geo.region`, `geo.placename`, `ICBM`).

### 3. Monetization Engine & Admin Suite
- **Instant WhatsApp Lead Capture Modal:** Captures lead details and launches direct pre-filled WhatsApp click-to-chat links with local database persistence.
- **Instant ₹49 UPI Test Pack Payment:** Dynamic Bharat QR generator (`upi://pay`), payment verification, and automated study pack downloads.
- **Affiliate Card System:** High-converting affiliate partnerships for Testbook, Adda247, Urban Company, IndiaFilings, and Cult.fit.
- **Master Admin Console (`/admin`, PIN: `2026`):** Real-time monitoring of WhatsApp leads, UPI purchases, CSV export, and dynamic affiliate commission URL management.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build for production (automatically regenerates sitemap.xml)
npm run build
```
