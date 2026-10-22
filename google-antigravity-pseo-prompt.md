# Prompt to Generate a Full-Scale Programmatic SEO (pSEO) App for "Google Antigravity"

Copy and paste the entire prompt below into your AI app builder (such as Replit Agent, Lovable, Bolt.new, v0, or Cursor) to generate the complete application.

---

```text
Act as an expert Full-Stack Software Architect and Programmatic SEO (pSEO) Specialist. I want to build a high-traffic, mobile-responsive, production-ready web application called "Google Antigravity" (India's Ultimate Centralized Public Data & Micro-Keyword Portal). 

The application must automatically generate thousands of optimized, dynamic, and hyper-local informational pages using structured database templates to target high-intent micro-keywords all over India.

Target Audience & Vibe:
- Target Users: Indian citizens, job seekers, students, daily commuters, and small business owners looking for immediate, real-time public data.
- User Experience: Clean, lightning-fast, and minimalist (similar to Sarkari Result or ILovePDF). It must use a mobile-first UI with high contrast, clear tabular structures, and rapid structural caching.

===================================================================
1. HIGH-TRAFFIC PROGRAMMATIC SEO (pSEO) ENGINE & ROUTING
===================================================================
The core architectural framework must support automated page generation without manual article creation. 

- Dynamic Routing Structure:
  * National / Global Hubs: `/` (Main Aggregator Dashboard)
  * Vertical Landing Pages: `/[vertical]` (e.g., `/gold-rates`, `/fuel-prices`, `/exam-schedules`)
  * Localized / Tiered pSEO Routes: `/[vertical]/[state]/[city]` (e.g., `/fuel-prices/tamil-nadu/coimbatore`, `/gold-rates/maharashtra/mumbai`)
  * Micro-Keyword Exams: `/exam-schedules/[organization]/[post-name]-2026` (e.g., `/exam-schedules/upsc/ias-prelims-2026`)

- Subelement Generation Strategy:
  * Combine elements from the internal database to auto-generate Meta Title, H1, H2, and URL slugs based on precise search intent strings.
  * Meta Title Pattern: "[City] [Vertical] Today ([Month] 2026) - Current Live [Asset] Price"
  * Schema Markup Auto-Injection: Every local page must automatically embed structured JSON-LD data (LocalBusiness schema for cities, Product/PriceSpecification schema for commodities, and EducationEvent/JobPosting schema for exams).

===================================================================
2. SYSTEM ARCHITECTURE & CORE VERTICALS
===================================================================
Configure a relational database structure (or a mock JSON database state that persists) containing three core automated public data verticals:

A. Daily Fuel Prices Vertical (Petrol & Diesel):
   - Database Schema Fields: City_ID, City_Name, State_Name, Petrol_Price, Diesel_Price, Last_Updated, Percentage_Change.
   - UI Component: A high-contrast comparison table showing Petrol vs Diesel rates, a historical trend line chart (last 7 days), and a "Cheaper Nearby Cities" cross-linking widget.

B. Live Gold & Precious Metal Rates Vertical:
   - Database Schema Fields: City_ID, City_Name, State_Name, Gold_24K_PerGram, Gold_22K_PerGram, Silver_PerGram, Price_Status (Up/Down), Timestamp.
   - UI Component: Clean commodity metric cards, weight conversion calculator (1g, 8g, 10g, 100g), and local jeweller market warning notices.

C. Upcoming Exam Schedules & Results (Sarkari Style):
   - Database Schema Fields: Exam_ID, Organization (e.g., UPSC, SSC, IBPS), Post_Name, Notification_Date, Last_Date_To_Apply, Admit_Card_Status, Result_Link.
   - UI Component: A structured grid broken down into three legacy columns: "Latest Jobs", "Admit Card", and "Results". Each exam details page must have a prominent download/apply button layout.

===================================================================
3. HIGH-PERFORMANCE DATA ARCHITECTURE
===================================================================
- Automated API Simulation / Pulling:
  * Implement an automated data fetching simulator (or integrate a public API cron scheduler) that updates fuel rates, gold prices, and exam statuses daily at 06:00 AM IST.
  * If live API fails, fallback to cached historical data with a subtle "Stale Data Warning" ribbon rather than returning a 404 or 500 error.
- Internal Cross-Linking Grid Generator:
  * To maximize search engine crawl budget, every page must automatically generate contextual internal links at the bottom.
  * Example on `/fuel-prices/tamil-nadu/coimbatore`: Automatically link to neighboring hubs like `/fuel-prices/tamil-nadu/chennai`, `/fuel-prices/tamil-nadu/madurai`.

===================================================================
4. MONETIZATION & CORE UI STATES
===================================================================
- Programmatic Ad Placements (Google AdSense Mockups):
  * Allocate explicit, fixed-size container slots above the fold, mid-content, and in sticky bottom positions to prevent cumulative layout shift (CLS).
  * Label these blocks clearly as "Sponsored Advertisement Area" with seamless fallback placeholders.
- Empty & Loading States:
  * Provide skeleton loaders for tables during real-time filtering or background API sync operations.
  * Create a comprehensive XML Sitemap Generator View available at `/sitemap.xml` that automatically lists all programmatically mapped URLs for search engine discovery.

Build out this entire codebase ensuring 100% testable separation between the data arrays and the presentation layouts.
```