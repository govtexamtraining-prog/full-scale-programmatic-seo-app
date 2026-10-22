// Programmatic SEO (pSEO) Core Engine
// Handles dynamic meta title, description, keywords, canonical URLs, JSON-LD schemas, and XML sitemaps

import { ALL_CITIES, STATES_AND_CITIES } from '../data/cities';
import { FUEL_DATA, NATIONAL_FUEL_AVERAGES } from '../data/fuelData';
import { GOLD_DATA, NATIONAL_GOLD_AVERAGES } from '../data/goldData';
import { SARKARI_EXAMS } from '../data/examData';
import { NICHES, getNicheBySlug, getServiceBySlugs } from '../data/servicesData';

export const APP_BASE_URL = typeof window !== 'undefined' && window.location.origin 
  ? (window.location.origin + (window.location.pathname.startsWith('/full-scale-programmatic-seo-app') ? '/full-scale-programmatic-seo-app' : ''))
  : "https://govtexamtraining-prog.github.io/full-scale-programmatic-seo-app";
export const CURRENT_MONTH_YEAR = "October 2026";
export const CURRENT_DATE_STRING = "22 October 2026";

export const STATE_CODE_MAP = {
  "tamil-nadu": "IN-TN",
  "maharashtra": "IN-MH",
  "karnataka": "IN-KA",
  "delhi": "IN-DL",
  "telangana": "IN-TG",
  "gujarat": "IN-GJ",
  "uttar-pradesh": "IN-UP",
  "west-bengal": "IN-WB",
  "kerala": "IN-KL",
  "rajasthan": "IN-RJ"
};

/**
 * Generate comprehensive SEO, VEO & GEO Metadata for any route
 */
export function generateSeoMetadata(route, params = {}, data = {}) {
  const currentPath = route || "/";

  // National India Baseline GEO Coordinates
  const defaultGeo = {
    region: "IN",
    placename: "India",
    position: "20.5937;78.9629",
    icbm: "20.5937, 78.9629"
  };

  // 1. Home / National Hub
  if (currentPath === "/" || route === "home") {
    return {
      title: `Google Antigravity: Sarkari Result 2026, Home Services, Coaching & Local Directory (${CURRENT_MONTH_YEAR})`,
      metaDescription: `India's Centralized Public Portal for 2026 Sarkari Exam schedules, admit cards, verified Home Services (AC repair, plumbing), Coaching Academies, Legal & CA retainers, and Wellness Hubs across 750+ districts.`,
      canonicalUrl: `${APP_BASE_URL}/`,
      h1: "Sarkari Exam Board & Verified Public Services Directory",
      h2: "Official 2026 Recruitment Notifications, Verified Home Services & Local Professional Directory",
      keywords: "sarkari result 2026, upsc prelims admit card, ssc cgl recruitment, ac repair service, coaching institutes, ca gst filing, top gyms india, public services directory",
      ogType: "website",
      geo: defaultGeo,
      openGraph: {
        title: `Google Antigravity: Sarkari Result 2026, Home Services, Coaching & Local Directory`,
        description: `India's Centralized Public Portal for 2026 Sarkari Exam schedules, admit cards, verified Home Services, Coaching Academies, Legal & CA retainers.`,
        url: `${APP_BASE_URL}/`,
        type: "website",
        siteName: "Google Antigravity: Sarkari Result & Services 2026"
      },
      twitter: {
        card: "summary_large_image",
        title: `Google Antigravity: Sarkari Result 2026, Home Services & Local Directory`,
        description: `India's Centralized Public Portal for 2026 Sarkari Exam schedules, admit cards, verified Home Services, Coaching Academies, Legal & CA retainers.`
      }
    };
  }

  // 2. Vertical: Fuel Prices Landing Page
  if (route === "fuel-hub" || currentPath === "/fuel-prices") {
    return {
      title: `Daily Fuel Prices in India Today (${CURRENT_MONTH_YEAR}) - Live Petrol & Diesel Rates`,
      metaDescription: `Check today's live Petrol and Diesel prices across all Indian states and cities. Updated daily at 06:00 AM IST. Compare city-wise fuel rates and calculate trip fuel expenses.`,
      canonicalUrl: `${APP_BASE_URL}/fuel-prices`,
      h1: "Live Daily Fuel Prices Across India (Petrol & Diesel)",
      h2: "State-wise Price Matrix, 7-Day Trend Charts & Nearby City Comparison",
      keywords: "fuel price india, petrol rate today, diesel rate in india, daily petrol price 06 am, cng rate today",
      ogType: "website"
    };
  }

  // 3. Localized Fuel City Route: /fuel-prices/[state]/[city]
  if (route === "fuel-city" && data) {
    const { cityName, stateName, petrolPrice, dieselPrice } = data;
    return {
      title: `${cityName} Fuel Prices Today (${CURRENT_MONTH_YEAR}) - Current Live Petrol & Diesel Price`,
      metaDescription: `Live Petrol price in ${cityName} is ₹${petrolPrice.toFixed(2)}/L and Diesel is ₹${dieselPrice.toFixed(2)}/L today (${CURRENT_DATE_STRING}). Check 7-day trend, state taxes, and cheaper nearby fuel stations in ${stateName}.`,
      canonicalUrl: `${APP_BASE_URL}/fuel-prices/${data.stateSlug}/${data.citySlug}`,
      h1: `${cityName} Fuel Prices Today (${CURRENT_DATE_STRING})`,
      h2: `Live Petrol, Diesel & CNG Rates in ${cityName}, ${stateName}`,
      keywords: `${cityName.toLowerCase()} petrol price, ${cityName.toLowerCase()} diesel rate today, fuel rate in ${cityName.toLowerCase()}, ${data.stateSlug} petrol tax`,
      ogType: "article"
    };
  }

  // 4. Vertical: Gold Rates Landing Page
  if (route === "gold-hub" || currentPath === "/gold-rates") {
    return {
      title: `Live Gold Rate in India Today (${CURRENT_MONTH_YEAR}) - 24K, 22K & 18K Precious Metals`,
      metaDescription: `Real-time 24 Carat, 22 Carat Hallmarked (916) Gold and Silver rates in India today. Dynamic weight calculators for 1g, 8g Sovereign, 10g Tola, and 100g with GST breakdown.`,
      canonicalUrl: `${APP_BASE_URL}/gold-rates`,
      h1: "Live 24K & 22K Gold Rates Across Indian Cities",
      h2: "Real-time IBJA Spot Bullion Rates, Sovereign Multiples & Hallmarking Guide",
      keywords: "gold rate today, 22k gold price per gram, 24 carat gold rate, silver rate india, gold sovereign price today",
      ogType: "website"
    };
  }

  // 5. Localized Gold City Route: /gold-rates/[state]/[city]
  if (route === "gold-city" && data) {
    const { cityName, stateName, gold24kPerGram, gold22kPerGram } = data;
    return {
      title: `${cityName} Gold Rates Today (${CURRENT_MONTH_YEAR}) - Current Live 22K & 24K Price`,
      metaDescription: `Today's live 22 Karat Gold rate in ${cityName} is ₹${gold22kPerGram.toLocaleString('en-IN')}/gram (₹${(gold22kPerGram * 8).toLocaleString('en-IN')} per 8g Sovereign). 24 Karat pure gold is ₹${gold24kPerGram.toLocaleString('en-IN')}/gram. Check making charge calculator & hallmarking notice.`,
      canonicalUrl: `${APP_BASE_URL}/gold-rates/${data.stateSlug}/${data.citySlug}`,
      h1: `${cityName} Gold Rate Today (${CURRENT_DATE_STRING})`,
      h2: `Current 22K & 24K Precious Metal Rates in ${cityName}, ${stateName}`,
      keywords: `${cityName.toLowerCase()} gold rate today, 22 carat gold price in ${cityName.toLowerCase()}, 1 pavan gold rate ${cityName.toLowerCase()}, 24k gold ${cityName.toLowerCase()}`,
      ogType: "article"
    };
  }

  // 6. Vertical: Sarkari Exams Hub
  if (route === "exam-hub" || currentPath === "/exam-schedules") {
    return {
      title: `Sarkari Exam Schedules, Admit Cards & Results 2026 - Central & State Government Jobs`,
      metaDescription: `Fast, clean Sarkari public notifications for UPSC, SSC, IBPS, RRB, and State PSC exams 2026. Official download links for Admit Cards, Notifications, and Result Scorecards.`,
      canonicalUrl: `${APP_BASE_URL}/exam-schedules`,
      h1: "Sarkari Exam Schedules, Admit Cards & Results 2026",
      h2: "Direct Official Registration Links, Exam Timelines & Vacancy Breakdown",
      keywords: "sarkari result, sarkari exam 2026, upsc notification 2026, ssc cgl admit card, ibps po result 2026",
      ogType: "website"
    };
  }

  // 7. Micro-Keyword Exam Detail: /exam-schedules/[org]/[slug]
  if (route === "exam-detail" && data) {
    const { org, postName, vacancies, lastDateToApply, qualification } = data;
    const canonical = `${APP_BASE_URL}/exam-schedules/${data.orgSlug}/${data.postSlug}`;

    return {
      title: `${org} ${postName} - Notification, Apply Online, Admit Card & Result 2026`,
      metaDescription: `${org} has announced recruitment for ${postName} with ${vacancies > 0 ? vacancies.toLocaleString('en-IN') + ' vacancies' : 'eligibility exam'}. Last date to apply is ${lastDateToApply}. Qualification: ${qualification}. Check eligibility, age limits & direct links.`,
      canonicalUrl: canonical,
      h1: `${org} ${postName}`,
      h2: `Official Recruitment Notification, Eligibility, Exam Date & Selection Process`,
      keywords: `${org.toLowerCase()} ${data.postSlug.replace(/-/g, ' ')}, ${org.toLowerCase()} exam date 2026, ${org.toLowerCase()} admit card, ${org.toLowerCase()} result link`,
      ogType: "article",
      geo: defaultGeo,
      openGraph: {
        title: `${org} ${postName} (2026 Notification & Apply Online)`,
        description: `Official Notification: ${vacancies > 0 ? vacancies.toLocaleString('en-IN') + ' vacancies' : 'National exam'}. Deadline: ${lastDateToApply}. Direct Hall Ticket & Apply Link.`,
        url: canonical,
        type: "article",
        siteName: "Google Antigravity & Sarkari Result Portal 2026"
      },
      twitter: {
        card: "summary_large_image",
        title: `${org} ${postName} (2026 Notification)`,
        description: `Official Notification: ${vacancies > 0 ? vacancies.toLocaleString('en-IN') + ' vacancies' : 'National exam'}. Deadline: ${lastDateToApply}.`
      }
    };
  }

  // 8. Services & Niches Directory Hub: /services or /directory
  if (route === "services-hub" || currentPath === "/services") {
    return {
      title: `Verified Home Services, Coaching, Legal & Wellness Directory India (${CURRENT_MONTH_YEAR})`,
      metaDescription: `All-India verified local services directory. Instant booking and rate cards for AC repair, certified electricians, plumbers, UPSC/NEET coaching academies, GST CA lawyers, and premium gyms across 30+ cities.`,
      canonicalUrl: `${APP_BASE_URL}/services`,
      h1: "Verified Services & High-Traffic Niches Directory",
      h2: "National Traffic Density Matrix, Fixed Rate Cards & Local Pro Dispatch",
      keywords: "home services india, coaching institutes near me, gst ca consultants, best gyms india, ac repair charges",
      ogType: "website",
      geo: defaultGeo
    };
  }

  // 9. Niche Vertical Hub: /[nicheSlug]
  if (route === "niche-hub" && data?.niche) {
    const { niche } = data;
    return {
      title: `${niche.name} Across Indian Cities (${CURRENT_MONTH_YEAR}) - Verified Rate Cards & Booking`,
      metaDescription: `${niche.description} Transparent pricing, background-verified professionals, and instant lead callback across major Indian cities.`,
      canonicalUrl: `${APP_BASE_URL}/${niche.slug}`,
      h1: `${niche.name} Across India`,
      h2: `Verified Service Providers, Standard Rate Cards & Doorstep Dispatch`,
      keywords: `${niche.slug.replace(/-/g, ' ')}, ${niche.shortName.toLowerCase()} india, verified ${niche.shortName.toLowerCase()}`,
      ogType: "website",
      geo: defaultGeo
    };
  }

  // 10. Localized Service City Route: /[nicheSlug]/[serviceSlug]/[stateSlug]/[citySlug]
  if (route === "service-city" && data) {
    const { niche, service, city, state } = data;
    const cityName = city?.name || "City";
    const stateName = city?.stateName || state?.stateName || "India";
    const serviceName = service ? service.name : niche?.name;
    const shortName = service ? service.shortName : niche?.shortName;
    const priceRange = service?.basePriceRange || "Best Market Rates";

    const cityGeo = {
      region: STATE_CODE_MAP[city?.stateSlug] || "IN-TN",
      placename: `${cityName}, ${stateName}`,
      position: `${city?.lat || 13.0827};${city?.lng || 80.2707}`,
      icbm: `${city?.lat || 13.0827}, ${city?.lng || 80.2707}`
    };

    const canonical = `${APP_BASE_URL}/${niche?.slug}/${service?.slug}/${city?.stateSlug}/${city?.slug}`;

    return {
      title: `${serviceName} in ${cityName} (${CURRENT_MONTH_YEAR}) - Charges ${priceRange} & Verified Pros`,
      metaDescription: `Looking for ${shortName} in ${cityName}, ${stateName}? Rates start at ${priceRange}. 100% background-checked pros, 30-min doorstep arrival, transparent rate card & 30-day warranty. Book now or call directly!`,
      canonicalUrl: canonical,
      h1: `${serviceName} in ${cityName}`,
      h2: `Verified Specialists, Standardized Price Matrix & Rapid Booking in ${cityName}, ${stateName}`,
      keywords: `${shortName.toLowerCase()} in ${cityName.toLowerCase()}, best ${shortName.toLowerCase()} ${cityName.toLowerCase()}, ${shortName.toLowerCase()} charges in ${cityName.toLowerCase()}, ${service?.searchIntent?.replace(/{city}/g, cityName.toLowerCase())}`,
      ogType: "article",
      geo: cityGeo,
      openGraph: {
        title: `${serviceName} in ${cityName} (${CURRENT_MONTH_YEAR}) - Charges ${priceRange}`,
        description: `Verified ${shortName} in ${cityName}, ${stateName}. Transparent rate cards starting ${priceRange}. Fast 30-min dispatch.`,
        url: canonical,
        type: "article",
        siteName: "Google Antigravity & Sarkari Result Portal 2026"
      },
      twitter: {
        card: "summary_large_image",
        title: `${serviceName} in ${cityName} (${CURRENT_MONTH_YEAR})`,
        description: `Verified ${shortName} in ${cityName}, ${stateName}. Transparent rate cards starting ${priceRange}.`
      }
    };
  }

  // 11. Localized Niche City Route: /[nicheSlug]/[stateSlug]/[citySlug]
  if (route === "niche-city" && data) {
    const { niche, city, state } = data;
    const cityName = city?.name || "City";
    const stateName = city?.stateName || state?.stateName || "India";

    return {
      title: `${niche?.name} in ${cityName}, ${stateName} (${CURRENT_MONTH_YEAR}) - Verified Local Directory`,
      metaDescription: `Directory of verified ${niche?.shortName} in ${cityName}. Compare rate cards, customer ratings, and book immediate callback with 30-day guarantee.`,
      canonicalUrl: `${APP_BASE_URL}/${niche?.slug}/${city?.stateSlug}/${city?.slug}`,
      h1: `${niche?.name} in ${cityName}`,
      h2: `Top Rated ${niche?.shortName} Specialists & Rate Cards in ${cityName}, ${stateName}`,
      keywords: `${niche?.shortName?.toLowerCase()} in ${cityName.toLowerCase()}, verified ${niche?.shortName?.toLowerCase()} ${cityName.toLowerCase()}`,
      ogType: "article"
    };
  }

  // 12. Dynamic XML Sitemap
  if (route === "sitemap" || currentPath === "/sitemap.xml") {
    return {
      title: `Programmatic XML Sitemap Index - Google Antigravity Crawler Directory`,
      metaDescription: `Real-time dynamically generated XML and HTML sitemap containing all programmatic routes for Google Search Engine indexing and micro-keyword discovery.`,
      canonicalUrl: `${APP_BASE_URL}/sitemap.xml`,
      h1: "Programmatic SEO XML Sitemap Engine",
      h2: "Dynamic Crawl-Budget Optimizer & Micro-Keyword Route Inventory",
      keywords: "sitemap.xml, programmatic seo urls, xml sitemap generator, crawl discovery",
      ogType: "website"
    };
  }

  // Default fallback
  return {
    title: `Google Antigravity - Real-time Public Data Portal`,
    metaDescription: `India's Centralized Public Data & Micro-Keyword Portal.`,
    canonicalUrl: `${APP_BASE_URL}${currentPath}`,
    h1: "Google Antigravity Portal",
    h2: "Real-time Public Data Platform",
    keywords: "public data, india rates, sarkari results, fuel prices",
    ogType: "website"
  };
}

/**
 * Auto-injects dynamic JSON-LD Structured Data for search engines
 */
export function generateJsonLdSchema(route, params = {}, data = {}) {
  // Breadcrumb schema generator
  const createBreadcrumbSchema = (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${APP_BASE_URL}${item.path}`
    }))
  });

  // 1. Home schema
  if (route === "home" || !route) {
    return [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Google Antigravity",
        "url": APP_BASE_URL,
        "description": "India's Ultimate Centralized Public Data & Micro-Keyword Portal",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${APP_BASE_URL}/?search={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      createBreadcrumbSchema([{ name: "Home", path: "/" }])
    ];
  }

  // 2. Fuel City Schema (Product, PriceSpecification & LocalBusiness)
  if (route === "fuel-city" && data) {
    const petrolPrice = data.petrolPrice || 100;
    const dieselPrice = data.dieselPrice || 90;
    return [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `Petrol in ${data.cityName}`,
        "description": `Live retail selling price of motor spirit (Petrol) in ${data.cityName}, ${data.stateName}.`,
        "category": "Energy > Fuel > Petroleum",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": petrolPrice.toFixed(2),
          "priceValidUntil": "2026-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": petrolPrice.toFixed(2),
            "priceCurrency": "INR",
            "unitCode": "LTR",
            "unitText": "Liter"
          }
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `Diesel in ${data.cityName}`,
        "description": `Live retail selling price of High Speed Diesel in ${data.cityName}, ${data.stateName}.`,
        "category": "Energy > Fuel > Diesel",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": dieselPrice.toFixed(2),
          "priceValidUntil": "2026-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": dieselPrice.toFixed(2),
            "priceCurrency": "INR",
            "unitCode": "LTR",
            "unitText": "Liter"
          }
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `${data.cityName} Fuel Distribution Market`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": data.cityName,
          "addressRegion": data.stateName,
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": data.lat || 13.08,
          "longitude": data.lng || 80.27
        }
      },
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Fuel Prices", path: "/fuel-prices" },
        { name: data.stateName, path: `/fuel-prices` },
        { name: `${data.cityName} Rates`, path: `/fuel-prices/${data.stateSlug}/${data.citySlug}` }
      ])
    ];
  }

  // 3. Gold City Schema (Commodity, PriceSpecification, LocalBusiness)
  if (route === "gold-city" && data) {
    return [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `22 Karat Hallmarked Gold in ${data.cityName}`,
        "description": `Current BIS 916 hallmarked 22 Karat gold bullion price per gram in ${data.cityName}, ${data.stateName}.`,
        "category": "Jewellery > Precious Metals > Gold",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": data.gold22kPerGram,
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": data.gold22kPerGram,
            "priceCurrency": "INR",
            "unitCode": "GRM",
            "unitText": "Gram"
          }
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `24 Karat Pure Gold in ${data.cityName}`,
        "description": `Current 999 fineness 24 Karat pure gold price per gram in ${data.cityName}, ${data.stateName}.`,
        "category": "Jewellery > Precious Metals > Gold",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": data.gold24kPerGram,
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": data.gold24kPerGram,
            "priceCurrency": "INR",
            "unitCode": "GRM",
            "unitText": "Gram"
          }
        }
      },
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Gold Rates", path: "/gold-rates" },
        { name: data.stateName, path: `/gold-rates` },
        { name: `${data.cityName} Gold`, path: `/gold-rates/${data.stateSlug}/${data.citySlug}` }
      ])
    ];
  }

  // 4. Sarkari Exam Schema (JobPosting, EducationEvent & Voice FAQ)
  if (route === "exam-detail" && data) {
    return [
      {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": `${data.org} ${data.postName}`,
        "description": `${data.orgFullName} has officially published notification for ${data.postName}. Total Vacancies: ${data.vacancies}. Minimum Qualification: ${data.qualification}. Age Limit: ${data.ageLimit}.`,
        "datePosted": data.notificationDate || "2026-01-01",
        "validThrough": data.lastDateIso || "2026-12-31T23:59:59+05:30",
        "employmentType": "FULL_TIME",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".speakable-summary", ".speakable-answer", "h1"]
        },
        "hiringOrganization": {
          "@type": "Organization",
          "name": data.orgFullName,
          "sameAs": data.officialWebsite
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
          }
        },
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "INR",
          "value": {
            "@type": "QuantitativeValue",
            "value": 56100,
            "unitText": "MONTH"
          }
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "EducationEvent",
        "name": `${data.org} ${data.postName} Examination 2026`,
        "description": `National Competitive Recruitment Examination for ${data.postName}.`,
        "startDate": data.examDate || "2026-05-24",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "organizer": {
          "@type": "Organization",
          "name": data.orgFullName,
          "url": data.officialWebsite
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `What is the exam date for ${data.org} ${data.postName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `The exam date for ${data.org} ${data.postName} is scheduled for ${data.examDate || '2026'}. Official notifications and hall tickets are issued directly via ${data.officialWebsite}.`
            }
          },
          {
            "@type": "Question",
            "name": `How many vacancies are notified for ${data.org} ${data.postName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `A total of ${data.vacancies > 0 ? data.vacancies.toLocaleString('en-IN') : 'announced'} vacancies are notified for ${data.postName} across India.`
            }
          },
          {
            "@type": "Question",
            "name": `What is the last date to apply for ${data.org} ${data.postName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `The last date to submit online application forms for ${data.org} ${data.postName} is ${data.lastDateToApply}.`
            }
          }
        ]
      },
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Exam Schedules", path: "/exam-schedules" },
        { name: data.org, path: `/exam-schedules` },
        { name: data.postName, path: `/exam-schedules/${data.orgSlug}/${data.postSlug}` }
      ])
    ];
  }

  // 5. Localized Service City Schema (LocalBusiness, GeoCoordinates, Speakable & FAQPage Schema)
  if (route === "service-city" && data) {
    const { niche, service, city, state } = data;
    const cityName = city?.name || "City";
    const stateName = city?.stateName || state?.stateName || "India";
    const serviceName = service ? service.name : niche?.name;
    const shortName = service ? service.shortName : niche?.shortName;

    // Determine specific schema type
    let schemaType = "LocalBusiness";
    if (niche?.id === "home-services") schemaType = "HomeAndConstructionBusiness";
    else if (niche?.id === "coaching-institutes") schemaType = "EducationalOrganization";
    else if (niche?.id === "legal-tax-services") schemaType = "LegalService";
    else if (niche?.id === "wellness-fitness") schemaType = "HealthAndBeautyBusiness";

    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": schemaType,
        "name": `Verified ${serviceName} Specialists in ${cityName}`,
        "description": `Certified and background-checked ${shortName} providers offering transparent rate cards in ${cityName}, ${stateName}.`,
        "url": `${APP_BASE_URL}/${niche?.slug}/${service?.slug}/${city?.stateSlug}/${city?.slug}`,
        "telephone": "+91-98000-00000",
        "priceRange": service?.basePriceRange || "₹299 - ₹2,499",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cityName,
          "addressRegion": stateName,
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": city?.lat || 13.0827,
          "longitude": city?.lng || 80.2707
        },
        "areaServed": {
          "@type": "City",
          "name": cityName
        },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".speakable-summary", ".speakable-answer", "h1", "h2"]
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "07:00",
            "closes": "22:00"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.85",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": service?.reviewsCount || "320"
        }
      }
    ];

    // Auto-inject FAQPage schema if FAQs are defined
    if (service?.faqs && service.faqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": service.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q.replace(/{city}/g, cityName),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a.replace(/{city}/g, cityName)
          }
        }))
      });
    }

    schemas.push(createBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: niche?.shortName || "Category", path: `/${niche?.slug}` },
      { name: `${cityName}`, path: `/${niche?.slug}/${service?.slug}/${city?.stateSlug}/${city?.slug}` }
    ]));

    return schemas;
  }

  // 6. Services Directory Hub Schema
  if (route === "services-hub") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Google Antigravity Services Directory",
        "url": `${APP_BASE_URL}/services`,
        "description": "All-India verified local services directory for Home Services, Coaching, Legal, Tax, and Wellness."
      },
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services Directory", path: "/services" }
      ])
    ];
  }

  // Generic fallback
  return [createBreadcrumbSchema([{ name: "Home", path: "/" }])];
}

/**
 * Generates all programmatic URLs for the XML Sitemap & search engine crawlers
 */
export function generateAllProgrammaticUrls() {
  const urls = [];

  // 1. Static Core Hubs
  urls.push({
    loc: `${APP_BASE_URL}/`,
    lastmod: "2026-10-20",
    changefreq: "hourly",
    priority: "1.0",
    title: "Google Antigravity Aggregator Hub",
    vertical: "Core"
  });

  urls.push({
    loc: `${APP_BASE_URL}/services`,
    lastmod: "2026-10-20",
    changefreq: "daily",
    priority: "0.95",
    title: "All India Verified Services Directory",
    vertical: "Services"
  });

  // Niche Category Hubs
  NICHES.forEach(niche => {
    urls.push({
      loc: `${APP_BASE_URL}/${niche.slug}`,
      lastmod: "2026-10-20",
      changefreq: "daily",
      priority: "0.9",
      title: `${niche.name} India Directory Hub`,
      vertical: "Services"
    });
  });

  urls.push({
    loc: `${APP_BASE_URL}/fuel-prices`,
    lastmod: "2026-10-20",
    changefreq: "hourly",
    priority: "0.9",
    title: "National Daily Fuel Rates Hub",
    vertical: "Fuel"
  });

  urls.push({
    loc: `${APP_BASE_URL}/gold-rates`,
    lastmod: "2026-10-20",
    changefreq: "hourly",
    priority: "0.9",
    title: "Live Precious Metals & Gold Rates Hub",
    vertical: "Gold"
  });

  urls.push({
    loc: `${APP_BASE_URL}/exam-schedules`,
    lastmod: "2026-10-20",
    changefreq: "daily",
    priority: "0.9",
    title: "Sarkari Exam Schedules & Results 2026",
    vertical: "Exams"
  });

  // 2. Programmatic Fuel Cities
  Object.values(FUEL_DATA).forEach(city => {
    urls.push({
      loc: `${APP_BASE_URL}/fuel-prices/${city.stateSlug}/${city.citySlug}`,
      lastmod: "2026-10-20",
      changefreq: "hourly",
      priority: "0.8",
      title: `${city.cityName} Petrol & Diesel Rates Today`,
      vertical: "Fuel",
      state: city.stateName
    });
  });

  // 3. Programmatic Gold Cities
  Object.values(GOLD_DATA).forEach(city => {
    urls.push({
      loc: `${APP_BASE_URL}/gold-rates/${city.stateSlug}/${city.citySlug}`,
      lastmod: "2026-10-20",
      changefreq: "hourly",
      priority: "0.8",
      title: `${city.cityName} 22K & 24K Gold Rate Today`,
      vertical: "Gold",
      state: city.stateName
    });
  });

  // 4. Programmatic Sarkari Exams
  SARKARI_EXAMS.forEach(exam => {
    urls.push({
      loc: `${APP_BASE_URL}/exam-schedules/${exam.orgSlug}/${exam.postSlug}`,
      lastmod: "2026-10-20",
      changefreq: "daily",
      priority: "0.85",
      title: `${exam.org} ${exam.postName} Notification 2026`,
      vertical: "Exams",
      org: exam.org
    });
  });

  // 5. Programmatic Services & Local City Landing Pages
  NICHES.forEach(niche => {
    niche.services.forEach(service => {
      ALL_CITIES.forEach(city => {
        urls.push({
          loc: `${APP_BASE_URL}/${niche.slug}/${service.slug}/${city.stateSlug}/${city.slug}`,
          lastmod: "2026-10-20",
          changefreq: "weekly",
          priority: "0.8",
          title: `${service.name} in ${city.name}`,
          vertical: "Services",
          state: city.stateName
        });
      });
    });
  });

  return urls;
}

/**
 * Builds standard XML sitemap output
 */
export function buildXmlSitemapString() {
  const urls = generateAllProgrammaticUrls();
  const xmlItems = urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<!-- Google Antigravity Programmatic SEO Dynamic Sitemap -->
<!-- Total Dynamic Micro-Keyword URLs: ${urls.length} -->
${xmlItems}
</urlset>`;
}
