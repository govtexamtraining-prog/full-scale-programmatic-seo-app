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

import { LiveDataProvider, useLiveData } from './context/LiveDataContext';
import { generateSeoMetadata, generateJsonLdSchema } from './services/pseoEngine';
import { NICHES, getNicheBySlug, getServiceBySlugs } from './data/servicesData';
import { getCityBySlugs, getStateBySlug } from './data/cities';
import { SlidersHorizontal } from 'lucide-react';

function AppContent() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
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
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    if (path === currentPath) return;
    window.history.pushState({}, '', path);
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
    if (clean === '/exam-schedules') return { view: 'exam-hub', params: {} };
    if (clean === '/services' || clean === '/directory') return { view: 'services-hub', params: {} };
    if (clean === '/sitemap.xml') return { view: 'sitemap', params: {} };

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

    // Match /exam-schedules/[org]/[postSlug]
    const examMatch = clean.match(/^\/exam-schedules\/([^/]+)\/([^/]+)$/);
    if (examMatch) {
      return { 
        view: 'exam-detail', 
        params: { orgSlug: examMatch[1], postSlug: examMatch[2] } 
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

  // Auto-inject meta tags into document <head>
  useEffect(() => {
    document.title = seoMetadata.title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = seoMetadata.metaDescription;

    // Update JSON-LD Script
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
        {routeInfo.view === 'exam-hub' && <ExamsVerticalView navigate={navigate} />}
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
      <AppContent />
    </LiveDataProvider>
  );
}
