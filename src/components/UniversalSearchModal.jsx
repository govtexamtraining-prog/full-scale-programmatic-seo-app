import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Fuel, Coins, GraduationCap, ArrowRight, Wrench, Sparkles } from 'lucide-react';
import { ALL_CITIES } from '../data/cities';
import { SARKARI_EXAMS } from '../data/examData';
import { NICHES } from '../data/servicesData';

export default function UniversalSearchModal({ isOpen, onClose, navigate }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(false); // toggle
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  // Search cities
  const matchedCities = cleanQuery === '' 
    ? ALL_CITIES.slice(0, 6)
    : ALL_CITIES.filter(c => 
        c.name.toLowerCase().includes(cleanQuery) || 
        c.stateName.toLowerCase().includes(cleanQuery)
      ).slice(0, 8);

  // Search exams
  const matchedExams = cleanQuery === ''
    ? SARKARI_EXAMS.slice(0, 3)
    : SARKARI_EXAMS.filter(e => 
        e.postName.toLowerCase().includes(cleanQuery) ||
        e.org.toLowerCase().includes(cleanQuery)
      ).slice(0, 4);

  // Search services across all 4 niches
  const allServices = NICHES.flatMap(n => n.services.map(s => ({
    ...s,
    nicheSlug: n.slug,
    nicheShortName: n.shortName,
    nicheColor: n.color
  })));

  const matchedServices = cleanQuery === ''
    ? allServices.slice(0, 4)
    : allServices.filter(s => 
        s.name.toLowerCase().includes(cleanQuery) ||
        s.shortName.toLowerCase().includes(cleanQuery) ||
        s.searchIntent.toLowerCase().includes(cleanQuery)
      ).slice(0, 5);

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div 
      className="inspector-drawer" 
      style={{ alignItems: 'flex-start', justifyContent: 'center', paddingTop: '5vh' }}
      onClick={onClose}
    >
      <div 
        className="glass-panel" 
        style={{ 
          width: '92%', 
          maxWidth: '680px', 
          background: 'var(--bg-secondary)', 
          padding: '0', 
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '1rem 1.25rem', 
          borderBottom: '1px solid var(--bg-card-border)',
          gap: '0.75rem'
        }}>
          <Search size={20} style={{ color: 'var(--text-muted)' }} />
          <input 
            ref={inputRef}
            type="text"
            placeholder="Type city (e.g. Coimbatore, Mumbai, Delhi) or exam (UPSC, SSC)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: '1.05rem',
              color: 'var(--text-primary)',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
          <button onClick={onClose} style={{ color: 'var(--text-muted)', padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Results Area */}
        <div style={{ overflowY: 'auto', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Cities Section */}
          <div>
            <div style={{ 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              color: 'var(--text-muted)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em',
              marginBottom: '0.5rem' 
            }}>
              Cities & Local pSEO Pages
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
              {matchedCities.map((city) => (
                <div 
                  key={city.id}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid var(--bg-card-border)',
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} style={{ color: 'var(--accent-blue)' }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{city.name}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{city.stateName}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={() => handleSelect(`/fuel-prices/${city.stateSlug}/${city.slug}`)}
                      style={{
                        fontSize: '0.7rem',
                        padding: '3px 6px',
                        borderRadius: '4px',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--bg-card-border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px'
                      }}
                      title={`View ${city.name} Fuel Prices`}
                    >
                      <Fuel size={11} /> Fuel
                    </button>
                    <button
                      onClick={() => handleSelect(`/gold-rates/${city.stateSlug}/${city.slug}`)}
                      style={{
                        fontSize: '0.7rem',
                        padding: '3px 6px',
                        borderRadius: '4px',
                        background: 'var(--gold-bg)',
                        color: 'var(--gold-primary)',
                        border: '1px solid rgba(217,119,6,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        fontWeight: 600
                      }}
                      title={`View ${city.name} Gold Rates`}
                    >
                      <Coins size={11} /> Gold
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sarkari Exams Section */}
          <div>
            <div style={{ 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              color: 'var(--text-muted)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em',
              marginBottom: '0.5rem' 
            }}>
              Sarkari Exams & Micro-Keywords
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {matchedExams.map((exam) => (
                <div
                  key={exam.id}
                  onClick={() => handleSelect(`/exam-schedules/${exam.orgSlug}/${exam.postSlug}`)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid var(--bg-card-border)',
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <GraduationCap size={16} style={{ color: '#dc2626' }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                        <span style={{ color: '#dc2626', marginRight: '6px' }}>[{exam.org}]</span>
                        {exam.postName}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                        Last Date: {exam.lastDateToApply} • {exam.vacancies > 0 ? `${exam.vacancies} Vacancies` : 'Eligibility Test'}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Verified Services & High-Traffic Niches Section */}
          <div>
            <div style={{ 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              color: 'var(--text-muted)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em',
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>Verified Services & High-Traffic Niches</span>
              <button 
                onClick={() => handleSelect('/services')}
                style={{ color: 'var(--accent-blue)', fontSize: '0.72rem', textTransform: 'none', fontWeight: 600 }}
              >
                View Density Matrix →
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {matchedServices.map((srv) => (
                <div
                  key={`${srv.nicheSlug}-${srv.slug}`}
                  onClick={() => handleSelect(`/${srv.nicheSlug}/${srv.slug}/tamil-nadu/chennai`)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid var(--bg-card-border)',
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Wrench size={16} style={{ color: srv.nicheColor }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                        <span style={{ color: srv.nicheColor, marginRight: '6px' }}>[{srv.nicheShortName}]</span>
                        {srv.name}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                        Rates: <strong style={{ color: 'var(--green-primary)' }}>{srv.basePriceRange}</strong> • Avg Response: {srv.avgResponseTime}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Help */}
        <div style={{ 
          padding: '0.75rem 1.25rem', 
          borderTop: '1px solid var(--bg-card-border)', 
          background: 'var(--bg-primary)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>Press <strong>ESC</strong> to exit search</span>
          <span>Targeting 1,000+ Indian micro-keywords dynamically</span>
        </div>
      </div>
    </div>
  );
}
