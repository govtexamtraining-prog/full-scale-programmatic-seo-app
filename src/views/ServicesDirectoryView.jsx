import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  GraduationCap, 
  Briefcase, 
  HeartPulse, 
  Search, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles,
  PhoneCall,
  ShieldAlert,
  Zap,
  Filter
} from 'lucide-react';
import { NICHES } from '../data/servicesData';
import { ALL_CITIES, STATES_AND_CITIES } from '../data/cities';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';

export default function ServicesDirectoryView({ navigate, initialNicheSlug = null }) {
  const [selectedNiche, setSelectedNiche] = useState(initialNicheSlug || 'all');
  const [selectedCitySlug, setSelectedCitySlug] = useState('chennai');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialNicheSlug) {
      setSelectedNiche(initialNicheSlug);
    } else {
      setSelectedNiche('all');
    }
  }, [initialNicheSlug]);

  // Selected city object
  const currentCity = ALL_CITIES.find(c => c.slug === selectedCitySlug) || ALL_CITIES[0];

  const filteredNiches = NICHES.filter(n => {
    if (selectedNiche !== 'all' && n.slug !== selectedNiche) return false;
    return true;
  });

  const getIcon = (iconName, color) => {
    const props = { size: 22, style: { color } };
    switch (iconName) {
      case 'Wrench': return <Wrench {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'HeartPulse': return <HeartPulse {...props} />;
      default: return <Wrench {...props} />;
    }
  };

  return (
    <div>
      <Breadcrumbs 
        items={initialNicheSlug ? [
          { label: "Services Matrix", path: "/services" },
          { label: NICHES.find(n => n.slug === initialNicheSlug)?.name || "Services Hub", path: `/${initialNicheSlug}` }
        ] : [
          { label: "India Services & Traffic Density Matrix", path: "/services" }
        ]} 
        navigate={navigate} 
      />

      <AdSlot slotType="leaderboard" slotId="services-directory-top-ad" />

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--accent-blue-light)', color: 'var(--accent-blue)', fontSize: '0.78rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', marginBottom: '0.5rem' }}>
          <TrendingUp size={14} />
          <span>High-Intent pSEO Directory Hub (All India)</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', marginBottom: '0.5rem' }}>
          Verified Services & High-Traffic Niches Directory
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '850px' }}>
          Explore localized high-intent micro-keyword landing pages across Indian cities. Designed for instant search engine ranking, transparent rate cards, and direct lead acquisition.
        </p>
      </div>

      {/* TRAFFIC DENSITY MATRIX TABLE (Explicitly requested by user) */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={20} style={{ color: '#ea580c' }} />
              <span>National Traffic Density & Monetisation Matrix</span>
            </h2>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Keyword volume, lead acquisition model & organic search competition by vertical
            </p>
          </div>
          <span style={{ fontSize: '0.75rem', background: 'var(--bg-tertiary)', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
            India pSEO Index 2026
          </span>
        </div>

        <div className="data-table-wrapper" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Niche Category</th>
                <th>Micro-Keyword Traffic Potential</th>
                <th>Monetisation Strategy</th>
                <th>Competition Level</th>
                <th>Target Services</th>
                <th>Explore pSEO Pages</th>
              </tr>
            </thead>
            <tbody>
              {NICHES.map(niche => (
                <tr key={niche.id} style={{ background: selectedNiche === niche.slug ? 'var(--bg-tertiary)' : undefined }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '8px', 
                        background: niche.bgColor, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}>
                        {getIcon(niche.iconName, niche.color)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{niche.name}</div>
                        <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{niche.services.length} Core Verticals</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      fontWeight: 700, 
                      fontSize: '0.85rem',
                      color: niche.trafficDensity.includes('Massive') ? '#dc2626' : niche.trafficDensity.includes('High') ? '#ea580c' : '#d97706' 
                    }}>
                      {niche.trafficDensity}
                    </span>
                  </td>
                  <td>
                    <span style={{ 
                      background: 'var(--bg-tertiary)', 
                      padding: '3px 8px', 
                      borderRadius: '4px', 
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      {niche.monetizationStrategy}
                    </span>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {niche.leadPriceEstimate}
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: niche.competitionLevel === 'Very High' ? 'var(--red-bg)' : niche.competitionLevel === 'High' ? 'rgba(234, 88, 12, 0.1)' : 'var(--green-bg)',
                      color: niche.competitionLevel === 'Very High' ? 'var(--red-primary)' : niche.competitionLevel === 'High' ? '#ea580c' : 'var(--green-primary)'
                    }}>
                      {niche.competitionLevel}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {niche.services.slice(0, 4).map(s => (
                        <a
                          key={s.slug}
                          href={`/${niche.slug}/${s.slug}/${currentCity.stateSlug}/${currentCity.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/${niche.slug}/${s.slug}/${currentCity.stateSlug}/${currentCity.slug}`);
                          }}
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--bg-card-border)',
                            padding: '2px 7px',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            display: 'inline-block',
                            transition: 'all 0.15s ease'
                          }}
                          title={`Explore ${s.name} in ${currentCity.name}`}
                        >
                          {s.shortName}
                        </a>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedNiche(niche.slug);
                          const el = document.getElementById('services-grid-section');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          } else {
                            navigate(`/${niche.slug}`);
                          }
                        }}
                        style={{
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          background: niche.color,
                          padding: '6px 12px',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: `0 2px 10px ${niche.color}50`,
                          transition: 'all 0.18s ease'
                        }}
                        title={`View ${niche.name} cards in ${currentCity.name}`}
                      >
                        <span>View Services</span>
                        <ArrowRight size={12} />
                      </button>

                      <a
                        href={`/${niche.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/${niche.slug}`);
                        }}
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--bg-card-border)',
                          padding: '5px 9px',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          transition: 'all 0.18s ease'
                        }}
                        title={`Open dedicated ${niche.name} Hub`}
                      >
                        <span>Hub</span>
                        <ArrowRight size={10} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FILTER & CITY CONTROLS */}
      <section style={{ 
        background: 'var(--bg-secondary)', 
        border: '1px solid var(--bg-card-border)', 
        borderRadius: '16px', 
        padding: '1.5rem', 
        marginBottom: '2.5rem' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>
              Select City & Explore Programmatic Landing Pages
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Instantly preview how each local pSEO page ranks for high-intent search queries in your target city
            </p>
          </div>

          {/* City Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} style={{ color: 'var(--accent-blue)' }} />
            <select
              className="form-select"
              value={selectedCitySlug}
              onChange={(e) => setSelectedCitySlug(e.target.value)}
              style={{ minWidth: '220px', fontWeight: 600 }}
            >
              {STATES_AND_CITIES.map(state => (
                <optgroup key={state.stateSlug} label={`🇮🇳 ${state.stateName}`}>
                  {state.cities.map(c => (
                    <option key={c.slug} value={c.slug}>
                      {c.name} ({state.stateName})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* Niche Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderBottom: '1px solid var(--bg-card-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
          <button
            onClick={() => setSelectedNiche('all')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: selectedNiche === 'all' ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
              color: selectedNiche === 'all' ? 'white' : 'var(--text-primary)'
            }}
          >
            All 4 Niches
          </button>
          {NICHES.map(n => (
            <button
              key={n.id}
              onClick={() => setSelectedNiche(n.slug)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: selectedNiche === n.slug ? n.color : 'var(--bg-tertiary)',
                color: selectedNiche === n.slug ? 'white' : 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{n.shortName}</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.85 }}>({n.services.length})</span>
            </button>
          ))}
        </div>

        {/* Search within services */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-tertiary)', border: '1px solid var(--bg-card-border)', borderRadius: '8px', padding: '0.5rem 0.85rem' }}>
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder={`Search service (e.g. AC gas refill, UPSC batch, GST filing, Gyms) in ${currentCity.name}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem' }}
          />
        </div>
      </section>

      {/* High-CTR Native In-Feed Ad Unit */}
      <AdSlot slotType="in-feed" slotId="services-directory-mid-feed" />

      {/* SERVICES GRID ORGANIZED BY NICHE */}
      <div 
        id="services-grid-section" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '3rem', 
          marginBottom: '3rem',
          scrollMarginTop: '100px'
        }}
      >
        {filteredNiches.map(niche => {
          const matchedServices = niche.services.filter(s => {
            if (!searchQuery) return true;
            return s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   s.searchIntent.toLowerCase().includes(searchQuery.toLowerCase());
          });

          if (matchedServices.length === 0) return null;

          return (
            <div key={niche.id}>
              {/* Niche Section Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '10px', 
                    background: niche.bgColor, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    {getIcon(niche.iconName, niche.color)}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.4rem' }}>{niche.name} in {currentCity.name}</h2>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                      {niche.description}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: niche.bgColor, color: niche.color }}>
                    {niche.trafficBadge}
                  </span>
                  <a
                    href={`/${niche.slug}/${currentCity.stateSlug}/${currentCity.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/${niche.slug}/${currentCity.stateSlug}/${currentCity.slug}`);
                    }}
                    style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--accent-blue)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>View All {currentCity.name} Hub</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Service Cards Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                gap: '1.25rem' 
              }}>
                {matchedServices.map(service => {
                  const targetUrl = `/${niche.slug}/${service.slug}/${currentCity.stateSlug}/${currentCity.slug}`;

                  return (
                    <div 
                      key={service.slug}
                      className="glass-panel"
                      style={{ 
                        padding: '1.5rem', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                      }}
                    >
                      <div>
                        {/* Top Meta Bar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                          <span style={{ 
                            fontSize: '0.725rem', 
                            fontWeight: 700, 
                            color: niche.color, 
                            background: niche.bgColor,
                            padding: '2px 8px',
                            borderRadius: '4px' 
                          }}>
                            {service.shortName}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            ⭐ {service.satisfactionRate} ({service.reviewsCount}+ reviews)
                          </span>
                        </div>

                        {/* Service Title */}
                        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                          <a 
                            href={targetUrl}
                            onClick={(e) => { e.preventDefault(); navigate(targetUrl); }}
                            style={{ color: 'inherit', textDecoration: 'none' }}
                          >
                            {service.name} in {currentCity.name}
                          </a>
                        </h3>

                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.4 }}>
                          Target Intent: <em>"{service.searchIntent.replace(/{city}/g, currentCity.name)}"</em>
                        </p>

                        {/* Price & Speed Matrix */}
                        <div style={{ 
                          background: 'var(--bg-tertiary)', 
                          borderRadius: '8px', 
                          padding: '0.75rem', 
                          marginBottom: '1rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '0.825rem'
                        }}>
                          <div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Estimated Price</div>
                            <strong style={{ color: 'var(--green-primary)', fontSize: '0.95rem' }}>{service.basePriceRange}</strong>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Avg Response</div>
                            <strong>{service.avgResponseTime}</strong>
                          </div>
                        </div>

                        {/* Rate card sample bullet */}
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CheckCircle2 size={13} style={{ color: 'var(--green-primary)' }} />
                            <span>{service.rateCard[0]?.service} ({service.rateCard[0]?.price})</span>
                          </div>
                          {service.rateCard[1] && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <CheckCircle2 size={13} style={{ color: 'var(--green-primary)' }} />
                              <span>{service.rateCard[1]?.service} ({service.rateCard[1]?.price})</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Direct pSEO CTA Button */}
                      <a
                        href={targetUrl}
                        onClick={(e) => { e.preventDefault(); navigate(targetUrl); }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          background: niche.color,
                          color: 'white',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          textDecoration: 'none',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      >
                        <span>View Verified {service.shortName} in {currentCity.name}</span>
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* POPULAR CITIES QUICK JUMP GRID */}
      <section className="crosslink-section">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>
          Explore High-Intent Services in Top Indian Metros
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Targeting Tier-1 and Tier-2 city search queries for maximum organic search traffic
        </p>

        <div className="crosslink-grid">
          {ALL_CITIES.slice(0, 15).map(c => (
            <button
              key={c.id}
              className="crosslink-chip"
              onClick={() => {
                setSelectedCitySlug(c.slug);
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
            >
              <MapPin size={13} style={{ color: 'var(--accent-blue)' }} />
              <span>{c.name} ({c.stateName}) Services</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
