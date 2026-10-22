import React, { useState } from 'react';
import { 
  Fuel, 
  Coins, 
  GraduationCap, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  Zap, 
  CheckCircle, 
  FileText, 
  Radio, 
  RefreshCw,
  Wrench,
  Briefcase,
  HeartPulse
} from 'lucide-react';
import { ALL_CITIES, STATES_AND_CITIES } from '../data/cities';
import { NICHES } from '../data/servicesData';
import { useLiveData } from '../context/LiveDataContext';
import AdSlot from '../components/AdSlot';
import AffiliateBanner from '../components/AffiliateBanner';

export default function HomeView({ navigate }) {
  const [selectedState, setSelectedState] = useState('tamil-nadu');
  const { 
    fuelData, 
    goldData, 
    nationalFuelAvg, 
    nationalGoldAvg, 
    examsData,
    lastSyncTime,
    isLoadingLive,
    fetchLiveData 
  } = useLiveData();

  const jobsList = examsData.filter(e => e.category === 'jobs');
  const admitCardList = examsData.filter(e => e.category === 'admit-card');
  const resultsList = examsData.filter(e => e.category === 'results');

  const currentStateCities = ALL_CITIES.filter(c => c.stateSlug === selectedState);

  return (
    <div>
      {/* Above the fold Leaderboard Ad */}
      <AdSlot slotType="leaderboard" slotId="home-top-leaderboard" />

      {/* Hero Banner */}
      <section className="hero-banner">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <div className="hero-tag" style={{ margin: 0 }}>
            <Zap size={14} />
            <span>Centralized Indian Public Data Engine</span>
          </div>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '5px', 
            background: 'var(--green-bg)', 
            color: 'var(--green-primary)', 
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '0.35rem 0.8rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700
          }}>
            <Radio size={12} className="spin-anim" />
            <span>Auto-Fetched: {lastSyncTime || 'Today'}</span>
          </div>
        </div>

        <h1 className="hero-title">
          India's Live Public Data & Micro-Keyword Portal
        </h1>
        <p className="hero-subtitle">
          Real-time daily fuel rates, live 22K/24K gold bullion spot prices, and Sarkari examination schedules across 30+ Indian metropolitan hubs.
        </p>

        {/* Quick Vertical Switchers */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => navigate('/fuel-prices')} 
            className="glass-panel"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '0.75rem 1.25rem', 
              fontWeight: 600,
              fontSize: '0.9rem' 
            }}
          >
            <Fuel size={18} style={{ color: 'var(--accent-blue)' }} />
            <span>Daily Fuel Rates Matrix</span>
          </button>
          <button 
            onClick={() => navigate('/gold-rates')} 
            className="glass-panel"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '0.75rem 1.25rem', 
              fontWeight: 600,
              fontSize: '0.9rem' 
            }}
          >
            <Coins size={18} style={{ color: 'var(--gold-primary)' }} />
            <span>22K & 24K Gold Rates</span>
          </button>
          <button 
            onClick={() => navigate('/exam-schedules')} 
            className="glass-panel"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '0.75rem 1.25rem', 
              fontWeight: 600,
              fontSize: '0.9rem' 
            }}
          >
            <GraduationCap size={18} style={{ color: '#dc2626' }} />
            <span>Sarkari Result Hub</span>
          </button>
        </div>
      </section>

      {/* Key National Metrics Strip (Dynamically bound to live data) */}
      <div className="metrics-grid">
        {/* National Petrol */}
        <div className="metric-card glass-panel">
          <div className="metric-header">
            <span>National Avg Petrol</span>
            <Fuel size={16} />
          </div>
          <div className="metric-val">₹{nationalFuelAvg.petrolAverage.toFixed(2)}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Per Liter (All India Avg)</span>
            <span className="metric-change down">● Live OMC Rate</span>
          </div>
        </div>

        {/* National Diesel */}
        <div className="metric-card glass-panel green">
          <div className="metric-header">
            <span>National Avg Diesel</span>
            <Fuel size={16} />
          </div>
          <div className="metric-val">₹{nationalFuelAvg.dieselAverage.toFixed(2)}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Per Liter (All India Avg)</span>
            <span className="metric-change down">● Live OMC Rate</span>
          </div>
        </div>

        {/* 22K Gold Sovereign */}
        <div className="metric-card glass-panel gold">
          <div className="metric-header">
            <span>22K Gold (8g Sovereign / Pavan)</span>
            <Coins size={16} />
          </div>
          <div className="metric-val">₹{(nationalGoldAvg.gold22kAvg * 8).toLocaleString('en-IN')}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>₹{nationalGoldAvg.gold22kAvg.toLocaleString('en-IN')}/gram</span>
            <span className="metric-change up">+₹160 (8g)</span>
          </div>
        </div>

        {/* Silver 1kg */}
        <div className="metric-card glass-panel">
          <div className="metric-header">
            <span>Silver (1 KG Bar)</span>
            <Coins size={16} />
          </div>
          <div className="metric-val">₹{(nationalGoldAvg.silverAvg * 1000).toLocaleString('en-IN')}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>₹{nationalGoldAvg.silverAvg.toFixed(2)}/gram</span>
            <span className="metric-change up">+₹500/kg</span>
          </div>
        </div>
      </div>

      {/* SARKARI EXAM 3-COLUMN LEGACY GRID */}
      <section style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap style={{ color: '#dc2626' }} />
              <span>Sarkari Result & Exam Board 2026</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Direct government exam registration portals, download links & answer keys
            </p>
          </div>
          <button 
            onClick={() => navigate('/exam-schedules')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px', 
              color: 'var(--accent-blue)', 
              fontWeight: 600,
              fontSize: '0.875rem' 
            }}
          >
            <span>View All Exams</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="sarkari-grid">
          {/* Column 1: Latest Jobs */}
          <div className="sarkari-col">
            <div className="sarkari-col-header">
              <span>LATEST JOBS (ACTIVE)</span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                {jobsList.length} Active
              </span>
            </div>
            <div className="sarkari-item-list">
              {jobsList.map(job => (
                <div key={job.id} className="sarkari-item">
                  <a 
                    href={`/exam-schedules/${job.orgSlug}/${job.postSlug}`}
                    onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${job.orgSlug}/${job.postSlug}`); }}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div className="sarkari-item-title">
                      <span style={{ color: '#dc2626', fontWeight: 800 }}>[{job.org}]</span> {job.postName}
                    </div>
                    <div className="sarkari-item-meta" style={{ flexWrap: 'wrap' }}>
                      <span>Last Date: <strong>{job.lastDateToApply}</strong></span>
                      <span>• {job.vacancies.toLocaleString('en-IN')} Posts</span>
                    </div>
                  </a>
                  
                  {/* Direct Official Action Links */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: '#dc2626',
                        color: 'white',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <span>Apply Online</span>
                      <ArrowRight size={10} />
                    </a>
                    <a
                      href={`/exam-schedules/${job.orgSlug}/${job.postSlug}`}
                      onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${job.orgSlug}/${job.postSlug}`); }}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--bg-card-border)',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      Eligibility & Fee
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Admit Card */}
          <div className="sarkari-col">
            <div className="sarkari-col-header">
              <span>ADMIT CARD / HALL TICKET</span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                Live
              </span>
            </div>
            <div className="sarkari-item-list">
              {admitCardList.map(card => (
                <div key={card.id} className="sarkari-item">
                  <a 
                    href={`/exam-schedules/${card.orgSlug}/${card.postSlug}`}
                    onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${card.orgSlug}/${card.postSlug}`); }}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div className="sarkari-item-title">
                      <span style={{ color: '#1e40af', fontWeight: 800 }}>[{card.org}]</span> {card.postName}
                    </div>
                    <div className="sarkari-item-meta">
                      <span style={{ color: 'var(--green-primary)', fontWeight: 600 }}>● {card.admitCardStatus}</span>
                    </div>
                  </a>

                  {/* Direct Official Action Links */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    <a
                      href={card.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: '#1e40af',
                        color: 'white',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <span>Download Hall Ticket</span>
                      <ArrowRight size={10} />
                    </a>
                    <a
                      href={`/exam-schedules/${card.orgSlug}/${card.postSlug}`}
                      onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${card.orgSlug}/${card.postSlug}`); }}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--bg-card-border)',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      Exam Dates
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Results */}
          <div className="sarkari-col">
            <div className="sarkari-col-header">
              <span>RESULTS & MERIT LIST</span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                Declared
              </span>
            </div>
            <div className="sarkari-item-list">
              {resultsList.map(result => (
                <div key={result.id} className="sarkari-item">
                  <a 
                    href={`/exam-schedules/${result.orgSlug}/${result.postSlug}`}
                    onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${result.orgSlug}/${result.postSlug}`); }}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div className="sarkari-item-title">
                      <span style={{ color: '#065f46', fontWeight: 800 }}>[{result.org}]</span> {result.postName}
                    </div>
                    <div className="sarkari-item-meta">
                      <span style={{ color: 'var(--green-primary)', fontWeight: 600 }}>● {result.resultStatus}</span>
                    </div>
                  </a>

                  {/* Direct Official Action Links */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    <a
                      href={result.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: '#065f46',
                        color: 'white',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <span>Check Scorecard</span>
                      <ArrowRight size={10} />
                    </a>
                    <a
                      href={`/exam-schedules/${result.orgSlug}/${result.postSlug}`}
                      onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${result.orgSlug}/${result.postSlug}`); }}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--bg-card-border)',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      Cutoff Marks
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verified Partner Monetization Offers (Gold Loan, Digital Gold, Mock Tests) */}
      <AffiliateBanner category="all" limit={2} variant="bento" />

      {/* TRAFFIC DENSITY MATRIX & HIGH-TRAFFIC NICHES SECTION */}
      <section style={{ marginTop: '3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--accent-blue-light)', color: 'var(--accent-blue)', fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', marginBottom: '0.35rem' }}>
              <TrendingUp size={13} />
              <span>High-Traffic Niches Engine (All India)</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap style={{ color: '#ea580c' }} size={24} />
              <span>Traffic Density Matrix & Verified Services</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Targeting high-intent search queries: Home Services, Coaching Academies, Legal Retainers & Wellness Hubs
            </p>
          </div>
          <button 
            onClick={() => navigate('/services')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px', 
              color: 'var(--accent-blue)', 
              fontWeight: 600,
              fontSize: '0.875rem' 
            }}
          >
            <span>Explore All Services & Matrix</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 4 Niche Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          {NICHES.map(niche => (
            <div 
              key={niche.id}
              className="glass-panel"
              style={{ 
                padding: '1.5rem', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                borderTop: `4px solid ${niche.color}` 
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    color: niche.color, 
                    background: niche.bgColor, 
                    padding: '3px 8px', 
                    borderRadius: '4px' 
                  }}>
                    {niche.trafficBadge}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Comp: {niche.competitionLevel}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  {niche.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.4 }}>
                  {niche.description}
                </p>

                <div style={{ background: 'var(--bg-tertiary)', borderRadius: '6px', padding: '0.5rem 0.75rem', marginBottom: '1rem', fontSize: '0.75rem' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 700 }}>
                    Monetisation Model
                  </div>
                  <strong style={{ color: 'var(--text-primary)' }}>{niche.monetizationStrategy}</strong>
                </div>

                {/* Popular service chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '1.25rem' }}>
                  {niche.services.slice(0, 3).map(s => (
                    <a
                      key={s.slug}
                      href={`/${niche.slug}/${s.slug}/tamil-nadu/coimbatore`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/${niche.slug}/${s.slug}/tamil-nadu/coimbatore`);
                      }}
                      style={{
                        fontSize: '0.72rem',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-secondary)',
                        padding: '2px 7px',
                        borderRadius: '4px',
                        textDecoration: 'none'
                      }}
                    >
                      {s.shortName}
                    </a>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate(`/${niche.slug}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: niche.color,
                  color: 'white',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.825rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span>Browse {niche.shortName} Hub</span>
                <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Mid-content fixed MPU Ad */}
      <AdSlot slotType="mpu" slotId="home-mid-mpu" />

      {/* STATE-WISE PROGRAMMATIC MICRO-KEYWORD DIRECTORY */}
      <section style={{ marginTop: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin style={{ color: 'var(--accent-blue)' }} />
              <span>Explore Hyper-Local City pSEO Hubs</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Select your state to view live commodity rates and fuel pricing templates
            </p>
          </div>

          {/* State dropdown */}
          <select 
            className="form-select"
            value={selectedState} 
            onChange={(e) => setSelectedState(e.target.value)}
            style={{ width: 'auto', minWidth: '220px' }}
          >
            {STATES_AND_CITIES.map(s => (
              <option key={s.stateSlug} value={s.stateSlug}>
                {s.stateName} ({s.cities.length} Cities)
              </option>
            ))}
          </select>
        </div>

        {/* City cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {currentStateCities.map(city => {
            const fuel = fuelData[city.id];
            const gold = goldData[city.id];

            return (
              <div 
                key={city.id}
                className="glass-panel"
                style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '1.2rem' }}>{city.name}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{city.stateName}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Petrol</div>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                      ₹{fuel?.petrolPrice?.toFixed(2) || '101.40'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>22K Gold (1g)</div>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--gold-primary)' }}>
                      ₹{gold?.gold22kPerGram?.toLocaleString('en-IN') || '6,680'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                  <button
                    onClick={() => navigate(`/fuel-prices/${city.stateSlug}/${city.slug}`)}
                    style={{
                      flex: 1,
                      padding: '6px',
                      borderRadius: '6px',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--bg-card-border)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <Fuel size={13} style={{ color: 'var(--accent-blue)' }} />
                    <span>Fuel Rate</span>
                  </button>

                  <button
                    onClick={() => navigate(`/gold-rates/${city.stateSlug}/${city.slug}`)}
                    style={{
                      flex: 1,
                      padding: '6px',
                      borderRadius: '6px',
                      background: 'var(--gold-bg)',
                      border: '1px solid rgba(217,119,6,0.2)',
                      color: 'var(--gold-primary)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <Coins size={13} />
                    <span>Gold Rate</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
