import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://govtexamtraining-prog.github.io/full-scale-programmatic-seo-app";
const TODAY = "2026-10-22";

import { ALL_CITIES } from '../src/data/cities.js';
import { SARKARI_EXAMS } from '../src/data/examData.js';
import { NICHES } from '../src/data/servicesData.js';

const urls = [];

// 1. Core National Portals
urls.push(
  { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'hourly' },
  { loc: `${BASE_URL}/exam-schedules`, priority: '0.95', changefreq: 'hourly' },
  { loc: `${BASE_URL}/services`, priority: '0.95', changefreq: 'daily' },
  { loc: `${BASE_URL}/home-services`, priority: '0.90', changefreq: 'daily' },
  { loc: `${BASE_URL}/coaching-institutes`, priority: '0.90', changefreq: 'daily' },
  { loc: `${BASE_URL}/legal-tax-services`, priority: '0.90', changefreq: 'daily' },
  { loc: `${BASE_URL}/wellness-fitness`, priority: '0.90', changefreq: 'daily' },
  { loc: `${BASE_URL}/privacy-policy`, priority: '0.80', changefreq: 'monthly' },
  { loc: `${BASE_URL}/terms-of-service`, priority: '0.80', changefreq: 'monthly' },
  { loc: `${BASE_URL}/about-us`, priority: '0.80', changefreq: 'monthly' },
  { loc: `${BASE_URL}/contact-us`, priority: '0.80', changefreq: 'monthly' },
  { loc: `${BASE_URL}/disclaimer`, priority: '0.80', changefreq: 'monthly' }
);

// 2. Sarkari Exam 2026 Micro-Pages
SARKARI_EXAMS.forEach(exam => {
  urls.push({
    loc: `${BASE_URL}/exam-schedules/${exam.orgSlug}/${exam.postSlug}`,
    priority: '0.95',
    changefreq: 'daily'
  });
});

// 3. Programmatic City & Service Pages across 30+ Indian Cities
NICHES.forEach(niche => {
  niche.services.forEach(service => {
    ALL_CITIES.forEach(city => {
      urls.push({
        loc: `${BASE_URL}/${niche.slug}/${service.slug}/${city.stateSlug}/${city.slug}`,
        priority: '0.85',
        changefreq: 'weekly'
      });
    });
  });
});

const xmlEntries = urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- UrbanSarkari Programmatic Engine Sitemap -->
  <!-- Total High-Traffic Indexed URLs: ${urls.length} -->
${xmlEntries}
</urlset>`;

const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
console.log(`[UrbanSarkari Sitemap Generator] Generated ${urls.length} URLs in public/sitemap.xml successfully!`);
