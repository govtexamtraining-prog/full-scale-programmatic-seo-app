import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DataSyncRibbon from './components/DataSyncRibbon';
import UniversalSearchModal from './components/UniversalSearchModal';
import SeoInspectorDrawer from './components/SeoInspectorDrawer';
import AdSlot from './components/AdSlot';

import HomeView from './views/HomeView';
import FuelVerticalView from './views/FuelVerticalView';
import FuelCityView from './views/FuelCityView';
import GoldVerticalView from './views/GoldVerticalView';
import GoldCityView from './views/GoldCityView';
import ExamsVerticalView from './views/ExamsVerticalView';
import ExamDetailView from './views/ExamDetailView';
import ServicesDirectoryView from './views/ServicesDirectoryView';
import ServiceCityView from './views/ServiceCityView';
import SitemapView from './views/SitemapView';
import AdminView from './views/AdminView';
import LegalPagesView from './views/LegalPagesView';

import { LiveDataProvider, useLiveData } from './context/LiveDataContext';
import { MonetizationProvider } from './context/MonetizationContext';
import { generateSeoMetadata, generateJsonLdSchema } from './services/pseoEngine';
import { NICHES, getNicheBySlug, getServiceBySlugs } from './data/servicesData';
import { getCityBySlugs, getStateBySlug } from './data/cities';
import { SlidersHorizontal } from 'lucide-react';

const GITHUB_REPO_BASE = '/full-scale-programmatic-seo-app';

function getNormalizedPath() {
  // Check if redirected from public/404.html on GitHub Pages
  const redirected = sessionStorage.getItem('spa_redirect');
  if (redirected) {
    sessionStorage.removeItem('spa_redirect');
    return redirected;
  }
  let path = window.location.pathname || '/';
  if (path.startsWith(GITHUB_REPO_BASE)) {
    path = path.slice(GITHUB_REPO_BASE.length) || '/';
  }
  return path;
}

function AppContent() {
  const [currentPath, setCurrentPath] = useState(getNormalizedPath);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  const { getFuelForCity, getGoldForCity, getExam } = useLiveData();

  // Sync theme attribute on <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      let path = window.location.pathname || '/';
      if (path.startsWith(GITHUB_REPO_BASE)) {
        path = path.slice(GITHUB_REPO_BASE.length) || '/';
      }
      setCurrentPath(path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    if (path === currentPath) return;
    const isGhPages = window.location.pathname.startsWith(GITHUB_REPO_BASE);
    const fullTarget = (isGhPages ? GITHUB_REPO_BASE : '') + path;
    window.history.pushState({}, '', fullTarget);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Route matching logic
  const parseRoute = (path) => {
    const clean = path.replace(/\/$/, '') || '/';

    if (clean === '/') return { view: 'home', params: {} };
    if (clean === '/fuel-prices') return { view: 'fuel-hub', params: {} };
    if (clean === '/gold-rates') return { view: 'gold-hub', params: {} };
    if (clean === '/exam-schedules' || clean === '/exams' || clean === '/sarkari-results') {
      return { view: 'exam-hub', params: {} };
    }
    if (clean === '/exam-schedules/central' || clean === '/exams/central') {
      return { view: 'exam-hub', params: { stateSlug: 'central' } };
    }

    // Match /exam-schedules/state/[stateSlug] or /exams/state/[stateSlug]
    const examStateMatch = clean.match(/^\/(?:exam-schedules|exams)\/state\/([^/]+)$/);
    if (examStateMatch) {
      return { view: 'exam-hub', params: { stateSlug: examStateMatch[1] } };
    }

    // Match /exam-schedules/category/[category] or /exams/category/[category]
    const examCatMatch = clean.match(/^\/(?:exam-schedules|exams)\/category\/([^/]+)$/);
    if (examCatMatch) {
      return { view: 'exam-hub', params: { category: examCatMatch[1] } };
    }

    // Match /exam-schedules/[org]/[postSlug] or /exams/[org]/[postSlug]
    const examMatch = clean.match(/^\/(?:exam-schedules|exams)\/([^/]+)\/([^/]+)$/);
    if (examMatch) {
      if (examMatch[1] !== 'state' && examMatch[1] !== 'category') {
        return { 
          view: 'exam-detail', 
          params: { orgSlug: examMatch[1], postSlug: examMatch[2] } 
        };
      }
    }

    if (clean === '/services' || clean === '/directory') return { view: 'services-hub', params: {} };
    if (clean === '/admin') return { view: 'admin', params: {} };
    if (clean === '/sitemap.xml') return { view: 'sitemap', params: {} };
    if (clean === '/privacy-policy') return { view: 'legal', params: { page: 'privacy-policy' } };
    if (clean === '/terms-of-service') return { view: 'legal', params: { page: 'terms-of-service' } };
    if (clean === '/about-us') return { view: 'legal', params: { page: 'about-us' } };
    if (clean === '/contact-us') return { view: 'legal', params: { page: 'contact-us' } };
    if (clean === '/disclaimer') return { view: 'legal', params: { page: 'disclaimer' } };

    const validNicheSlugs = ['home-services', 'coaching-institutes', 'legal-tax-services', 'wellness-fitness'];

    // Match /[nicheSlug]
    const singleSlugMatch = clean.match(/^\/([^/]+)$/);
    if (singleSlugMatch && validNicheSlugs.includes(singleSlugMatch[1])) {
      return { view: 'niche-hub', params: { nicheSlug: singleSlugMatch[1] } };
    }

    // Match /fuel-prices/[state]/[city]
    const fuelMatch = clean.match(/^\/fuel-prices\/([^/]+)\/([^/]+)$/);
    if (fuelMatch) {
      return { 
        view: 'fuel-city', 
        params: { stateSlug: fuelMatch[1], citySlug: fuelMatch[2] } 
      };
    }

    // Match /gold-rates/[state]/[city]
    const goldMatch = clean.match(/^\/gold-rates\/([^/]+)\/([^/]+)$/);
    if (goldMatch) {
      return { 
        view: 'gold-city', 
        params: { stateSlug: goldMatch[1], citySlug: goldMatch[2] } 
      };
    }

    // Match /[nicheSlug]/[serviceSlug]/[stateSlug]/[citySlug]
    const serviceCityMatch = clean.match(/^\/([^/]+)\/([^/]+)\/([^/]+)\/([^/]+)$/);
    if (serviceCityMatch && validNicheSlugs.includes(serviceCityMatch[1])) {
      return {
        view: 'service-city',
        params: {
          nicheSlug: serviceCityMatch[1],
          serviceSlug: serviceCityMatch[2],
          stateSlug: serviceCityMatch[3],
          citySlug: serviceCityMatch[4]
        }
      };
    }

    // Match /[nicheSlug]/[stateSlug]/[citySlug]
    const nicheCityMatch = clean.match(/^\/([^/]+)\/([^/]+)\/([^/]+)$/);
    if (nicheCityMatch && validNicheSlugs.includes(nicheCityMatch[1])) {
      return {
        view: 'niche-city',
        params: {
          nicheSlug: nicheCityMatch[1],
          stateSlug: nicheCityMatch[2],
          citySlug: nicheCityMatch[3]
        }
      };
    }

    return { view: 'home', params: {} };
  };

  const routeInfo = parseRoute(currentPath);

  // Derive active dataset dynamically from live state
  let activeData = null;
  if (routeInfo.view === 'fuel-city') {
    activeData = getFuelForCity(routeInfo.params.stateSlug, routeInfo.params.citySlug);
  } else if (routeInfo.view === 'gold-city') {
    activeData = getGoldForCity(routeInfo.params.stateSlug, routeInfo.params.citySlug);
  } else if (routeInfo.view === 'exam-detail') {
    activeData = getExam(routeInfo.params.orgSlug, routeInfo.params.postSlug);
  } else if (routeInfo.view === 'service-city') {
    const niche = getNicheBySlug(routeInfo.params.nicheSlug);
    const service = getServiceBySlugs(routeInfo.params.nicheSlug, routeInfo.params.serviceSlug);
    const city = getCityBySlugs(routeInfo.params.stateSlug, routeInfo.params.citySlug);
    const state = getStateBySlug(routeInfo.params.stateSlug);
    activeData = { niche, service, city, state };
  } else if (routeInfo.view === 'niche-city') {
    const niche = getNicheBySlug(routeInfo.params.nicheSlug);
    const city = getCityBySlugs(routeInfo.params.stateSlug, routeInfo.params.citySlug);
    const state = getStateBySlug(routeInfo.params.stateSlug);
    activeData = { niche, city, state };
  } else if (routeInfo.view === 'niche-hub') {
    const niche = getNicheBySlug(routeInfo.params.nicheSlug);
    activeData = { niche };
  }

  // Generate dynamic SEO metadata & JSON-LD
  const seoMetadata = generateSeoMetadata(routeInfo.view, routeInfo.params, activeData);
  const jsonLdSchema = generateJsonLdSchema(routeInfo.view, routeInfo.params, activeData);

  // Auto-inject SEO, VEO, and GEO meta tags into document <head>
  useEffect(() => {
    document.title = seoMetadata.title;

    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard SEO Tags
    setMetaTag('name', 'description', seoMetadata.metaDescription);
    setMetaTag('name', 'keywords', seoMetadata.keywords);

    // Canonical URL
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', seoMetadata.canonicalUrl || window.location.href);

    // OpenGraph & Social Cards
    setMetaTag('property', 'og:title', seoMetadata.openGraph?.title || seoMetadata.title);
    setMetaTag('property', 'og:description', seoMetadata.openGraph?.description || seoMetadata.metaDescription);
    setMetaTag('property', 'og:url', seoMetadata.canonicalUrl || window.location.href);
    setMetaTag('property', 'og:type', seoMetadata.ogType || 'website');

    // Twitter Cards
    setMetaTag('name', 'twitter:title', seoMetadata.twitter?.title || seoMetadata.title);
    setMetaTag('name', 'twitter:description', seoMetadata.twitter?.description || seoMetadata.metaDescription);

    // GEO / Local Pack Tags
    if (seoMetadata.geo) {
      setMetaTag('name', 'geo.region', seoMetadata.geo.region);
      setMetaTag('name', 'geo.placename', seoMetadata.geo.placename);
      setMetaTag('name', 'geo.position', seoMetadata.geo.position);
      setMetaTag('name', 'ICBM', seoMetadata.geo.icbm);
    }

    // Update JSON-LD Script (Structured Data for Google, Bing & AI Engines)
    const jsonLdScript = document.getElementById('pseo-schema-jsonld');
    if (jsonLdScript) {
      jsonLdScript.textContent = JSON.stringify(jsonLdSchema);
    }
  }, [currentPath, seoMetadata, jsonLdSchema]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 06:00 AM IST Sync / Real-time Live Auto-Fetch Ribbon */}
      <DataSyncRibbon />

      {/* Main Navbar */}
      <Navbar 
        currentRoute={currentPath}
        navigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleTheme={toggleTheme}
        theme={theme}
        onOpenInspector={() => setIsInspectorOpen(true)}
      />

      {/* Content Container */}
      <main className="container" style={{ flex: 1 }}>
        {routeInfo.view === 'home' && <HomeView navigate={navigate} />}
        {routeInfo.view === 'fuel-hub' && <FuelVerticalView navigate={navigate} />}
        {routeInfo.view === 'fuel-city' && (
          <FuelCityView 
            stateSlug={routeInfo.params.stateSlug} 
            citySlug={routeInfo.params.citySlug} 
            navigate={navigate} 
          />
        )}
        {routeInfo.view === 'gold-hub' && <GoldVerticalView navigate={navigate} />}
        {routeInfo.view === 'gold-city' && (
          <GoldCityView 
            stateSlug={routeInfo.params.stateSlug} 
            citySlug={routeInfo.params.citySlug} 
            navigate={navigate} 
          />
        )}
        {routeInfo.view === 'exam-hub' && (
          <ExamsVerticalView 
            navigate={navigate} 
            initialStateSlug={routeInfo.params.stateSlug} 
            initialCategory={routeInfo.params.category} 
          />
        )}
        {routeInfo.view === 'exam-detail' && (
          <ExamDetailView 
            orgSlug={routeInfo.params.orgSlug} 
            postSlug={routeInfo.params.postSlug} 
            navigate={navigate} 
          />
        )}
        {routeInfo.view === 'services-hub' && <ServicesDirectoryView navigate={navigate} />}
        {routeInfo.view === 'niche-hub' && (
          <ServicesDirectoryView 
            navigate={navigate} 
            initialNicheSlug={routeInfo.params.nicheSlug} 
          />
        )}
        {routeInfo.view === 'service-city' && (
          <ServiceCityView 
            nicheSlug={routeInfo.params.nicheSlug}
            serviceSlug={routeInfo.params.serviceSlug}
            stateSlug={routeInfo.params.stateSlug}
            citySlug={routeInfo.params.citySlug}
            navigate={navigate}
          />
        )}
        {routeInfo.view === 'niche-city' && (
          <ServiceCityView 
            nicheSlug={routeInfo.params.nicheSlug}
            stateSlug={routeInfo.params.stateSlug}
            citySlug={routeInfo.params.citySlug}
            navigate={navigate}
          />
        )}
        {routeInfo.view === 'sitemap' && <SitemapView navigate={navigate} />}
        {routeInfo.view === 'admin' && <AdminView navigate={navigate} />}
        {routeInfo.view === 'legal' && <LegalPagesView page={routeInfo.params.page} navigate={navigate} />}
      </main>

      {/* High-Intent SEO Footer */}
      <Footer navigate={navigate} />

      {/* Zero CLS Sticky Bottom Ad Bar */}
      <AdSlot slotType="sticky-bottom" slotId="global-sticky-ad" />

      {/* Floating SEO Inspector Trigger */}
      <button 
        className="seo-inspector-btn"
        onClick={() => setIsInspectorOpen(true)}
        title="Inspect dynamic SERP snippet & JSON-LD schema"
      >
        <SlidersHorizontal size={15} />
        <span>pSEO SERP Audit</span>
      </button>

      {/* Universal Command+K Search Modal */}
      <UniversalSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        navigate={navigate}
      />

      {/* pSEO Inspector Drawer */}
      <SeoInspectorDrawer 
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        metadata={seoMetadata}
        schemaData={jsonLdSchema}
        currentRoute={currentPath}
      />
    </div>
  );
}

export default function App() {
  return (
    <LiveDataProvider>
      <MonetizationProvider>
        <AppContent />
      </MonetizationProvider>
    </LiveDataProvider>
  );
}
