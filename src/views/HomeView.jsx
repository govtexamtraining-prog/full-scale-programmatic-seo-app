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

  const [examStateFilter, setExamStateFilter] = useState('all');

  const homeFilteredExams = examsData.filter(e => {
    if (examStateFilter === 'all') return true;
    if (examStateFilter === 'central') return e.isCentral;
    return e.stateSlug === examStateFilter;
  });

  const jobsList = homeFilteredExams.filter(e => e.category === 'jobs').slice(0, 8);
  const admitCardList = homeFilteredExams.filter(e => e.category === 'admit-card').slice(0, 8);
  const resultsList = homeFilteredExams.filter(e => e.category === 'results').slice(0, 8);

  const currentStateCities = ALL_CITIES.filter(c => c.stateSlug === selectedState);

  return (
    <div>
      {/* Above the fold Leaderboard Ad */}
      <AdSlot slotType="leaderboard" slotId="home-top-leaderboard" />

      {/* Hero Banner */}
      <section className="hero-banner">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div className="hero-tag" style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em' }}>
            <Zap size={13} style={{ color: '#00f0ff' }} />
            <span>SARKARI QUEST ENGINE 2026</span>
          </div>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            background: 'rgba(0, 255, 157, 0.1)', 
            color: '#00ff9d', 
            border: '1px solid rgba(0, 255, 157, 0.35)',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            letterSpacing: '0.05em'
          }}>
            <span className="radar-beacon" style={{ color: '#00ff9d' }} />
            <span>RADAR_ACTIVE // 750+ DISTRICTS</span>
          </div>
        </div>

        <h1 className="hero-title" style={{ maxWidth: '960px', margin: '0 auto 1rem' }}>
          Sarkari Exam Board & Verified Public Directory
        </h1>
        <p className="hero-subtitle">
          Centralized tactical portal for 2026 Sarkari exam notifications, hall tickets, results, and verified local professionals across India.
        </p>

        {/* 5 Core Vertical Switchers - Gamer HUD Dock */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => navigate('/exam-schedules')} 
            className="glass-panel"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '0.75rem 1.25rem', 
              fontWeight: 700,
              fontSize: '0.85rem',
              borderColor: 'rgba(255, 42, 109, 0.4)',
              background: 'rgba(255, 42, 109, 0.06)'
            }}
          >
            <GraduationCap size={17} style={{ color: '#ff2a6d' }} />
            <span>Sarkari Result & Exams</span>
          </button>

          <button 
            onClick={() => navigate('/home-services')} 
            className="glass-panel"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '0.75rem 1.25rem', 
              fontWeight: 700,
              fontSize: '0.85rem',
              borderColor: 'rgba(245, 158, 11, 0.4)',
              background: 'rgba(245, 158, 11, 0.06)'
            }}
          >
            <Wrench size={16} style={{ color: '#f59e0b' }} />
            <span>Home Services & Utilities</span>
          </button>

          <button 
            onClick={() => navigate('/coaching-institutes')} 
            className="glass-panel"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '0.75rem 1.25rem', 
              fontWeight: 700,
              fontSize: '0.85rem',
              borderColor: 'rgba(99, 102, 241, 0.4)',
              background: 'rgba(99, 102, 241, 0.06)'
            }}
          >
            <Briefcase size={16} style={{ color: '#6366f1' }} />
            <span>Coaching Academies</span>
          </button>

          <button 
            onClick={() => navigate('/legal-tax-services')} 
            className="glass-panel"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '0.75rem 1.25rem', 
              fontWeight: 700,
              fontSize: '0.85rem',
              borderColor: 'rgba(168, 85, 247, 0.4)',
              background: 'rgba(168, 85, 247, 0.06)'
            }}
          >
            <FileText size={16} style={{ color: '#a855f7' }} />
            <span>Legal, Tax & CA</span>
          </button>

          <button 
            onClick={() => navigate('/wellness-fitness')} 
            className="glass-panel"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '0.75rem 1.25rem', 
              fontWeight: 700,
              fontSize: '0.85rem',
              borderColor: 'rgba(0, 255, 157, 0.4)',
              background: 'rgba(0, 255, 157, 0.06)'
            }}
          >
            <HeartPulse size={16} style={{ color: '#00ff9d' }} />
            <span>Wellness, Gyms & Spas</span>
          </button>
        </div>
      </section>

      {/* 4 Pillars National KPI Metrics Bento Strip with Micro Gamer Meters */}
      <div className="metrics-grid">
        {/* Pillar 1: Sarkari Exams Active */}
        <div 
          className="metric-card glass-panel"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/exam-schedules')}
        >
          <div className="metric-header">
            <span style={{ fontFamily: 'var(--font-mono)' }}>[01] SARKARI EXAM BOARD</span>
            <GraduationCap size={16} style={{ color: '#ff2a6d' }} />
          </div>
          <div className="metric-val" style={{ color: '#ff2a6d' }}>
            {examsData.length} Active Notices
          </div>
          <div className="gamer-meter">
            <div className="gamer-meter-fill" style={{ width: '92%', background: 'linear-gradient(90deg, #ff2a6d, #ff6b8b)', boxShadow: '0 0 8px rgba(255, 42, 109, 0.8)' }}></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>UPSC, SSC, IBPS, RRB & TNPSC</span>
            <span className="metric-change down" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>● LIVE RECRUITMENT</span>
          </div>
        </div>

        {/* Pillar 2: Home Services & Utilities */}
        <div 
          className="metric-card glass-panel"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/home-services')}
        >
          <div className="metric-header">
            <span style={{ fontFamily: 'var(--font-mono)' }}>[02] HOME SERVICES</span>
            <Wrench size={16} style={{ color: '#f59e0b' }} />
          </div>
          <div className="metric-val" style={{ color: '#f59e0b' }}>
            ₹499 Starting
          </div>
          <div className="gamer-meter">
            <div className="gamer-meter-fill" style={{ width: '85%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', boxShadow: '0 0 8px rgba(245, 158, 11, 0.8)' }}></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AC Repair, Plumbing & Electrical</span>
            <span className="metric-change up" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>⚡ 15-MIN DISPATCH</span>
          </div>
        </div>

        {/* Pillar 3: Coaching Academies */}
        <div 
          className="metric-card glass-panel"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/coaching-institutes')}
        >
          <div className="metric-header">
            <span style={{ fontFamily: 'var(--font-mono)' }}>[03] COACHING HUBS</span>
            <Briefcase size={16} style={{ color: '#6366f1' }} />
          </div>
          <div className="metric-val" style={{ color: '#6366f1' }}>
            2026 Batches Open
          </div>
          <div className="gamer-meter">
            <div className="gamer-meter-fill" style={{ width: '78%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', boxShadow: '0 0 8px rgba(99, 102, 241, 0.8)' }}></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>NEET, JEE, IAS & Bank Exam</span>
            <span className="metric-change up" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>🎓 FREE ADVICE</span>
          </div>
        </div>

        {/* Pillar 4: Legal & CA Retainers */}
        <div 
          className="metric-card glass-panel"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/legal-tax-services')}
        >
          <div className="metric-header">
            <span style={{ fontFamily: 'var(--font-mono)' }}>[04] LEGAL & TAX CA</span>
            <FileText size={16} style={{ color: '#00ff9d' }} />
          </div>
          <div className="metric-val" style={{ color: '#00ff9d' }}>
            Verified Advocates
          </div>
          <div className="gamer-meter">
            <div className="gamer-meter-fill" style={{ width: '95%', background: 'linear-gradient(90deg, #00ff9d, #00f0ff)', boxShadow: '0 0 8px rgba(0, 255, 157, 0.8)' }}></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GST, Property Law & Trademark</span>
            <span className="metric-change up" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>⚖️ CONFIDENTIAL</span>
          </div>
        </div>
      </div>

      {/* SARKARI EXAM 3-COLUMN GAMER HUD QUEST GRID */}
      <section style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap style={{ color: '#ff2a6d' }} />
              <span>Sarkari Result & Exam Board 2026</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Direct government exam registration portals, download links & answer keys
            </p>
          </div>
          <button 
            onClick={() => navigate('/exam-schedules')}
            className="btn-gamer-action indigo"
            style={{ fontSize: '0.75rem', padding: '6px 12px' }}
          >
            <span>VIEW ALL 2026 EXAMS</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* All India State Switcher Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '1.25rem', scrollbarWidth: 'thin' }}>
          {[
            { slug: 'all', label: 'All India' },
            { slug: 'central', label: 'Central Govt' },
            { slug: 'uttar-pradesh', label: 'Uttar Pradesh' },
            { slug: 'bihar', label: 'Bihar' },
            { slug: 'rajasthan', label: 'Rajasthan' },
            { slug: 'madhya-pradesh', label: 'Madhya Pradesh' },
            { slug: 'maharashtra', label: 'Maharashtra' },
            { slug: 'tamil-nadu', label: 'Tamil Nadu' },
            { slug: 'karnataka', label: 'Karnataka' },
            { slug: 'andhra-pradesh', label: 'Andhra Pradesh' },
            { slug: 'telangana', label: 'Telangana' },
            { slug: 'west-bengal', label: 'West Bengal' },
            { slug: 'delhi', label: 'Delhi UT' }
          ].map(st => (
            <button
              key={st.slug}
              onClick={() => setExamStateFilter(st.slug)}
              style={{
                background: examStateFilter === st.slug ? '#6366f1' : 'var(--bg-secondary)',
                color: examStateFilter === st.slug ? 'white' : 'var(--text-secondary)',
                border: examStateFilter === st.slug ? '1px solid #818cf8' : '1px solid var(--bg-card-border)',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: examStateFilter === st.slug ? 800 : 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {st.label}
            </button>
          ))}
          <button
            onClick={() => navigate('/exam-schedules')}
            style={{
              background: 'rgba(0, 240, 255, 0.12)',
              color: '#00f0ff',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            All 28 States & UTs →
          </button>
        </div>

        <div className="sarkari-grid">
          {/* Column 1: Latest Jobs (Quests) */}
          <div className="sarkari-col">
            <div className="sarkari-col-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="radar-beacon" style={{ color: '#ff2a6d' }} />
                <span>LATEST JOBS (ACTIVE)</span>
              </span>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.7rem', 
                background: 'rgba(255, 42, 109, 0.2)', 
                color: '#ff4d82', 
                padding: '2px 7px', 
                borderRadius: '4px',
                border: '1px solid rgba(255, 42, 109, 0.4)'
              }}>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                      <span style={{ color: '#ff2a6d', fontWeight: 800 }}>[{job.org}]</span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.06)', padding: '1px 5px', borderRadius: '3px' }}>
                        {job.stateName}
                      </span>
                    </div>
                    <div className="sarkari-item-title">
                      {job.postName}
                    </div>
                    <div className="sarkari-item-meta" style={{ flexWrap: 'wrap' }}>
                      <span>Last Date: <strong style={{ color: 'var(--text-primary)' }}>{job.lastDateToApply}</strong></span>
                      <span>• {job.vacancies > 0 ? `${job.vacancies.toLocaleString('en-IN')} Posts` : 'Entrance'}</span>
                    </div>
                  </a>
                  
                  {/* Direct Tactical Action Links */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '0.65rem', flexWrap: 'wrap' }}>
                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gamer-action crimson"
                    >
                      <span>Apply Online</span>
                      <ArrowRight size={11} />
                    </a>
                    <a
                      href={`/exam-schedules/${job.orgSlug}/${job.postSlug}`}
                      onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${job.orgSlug}/${job.postSlug}`); }}
                      className="btn-gamer-action indigo"
                    >
                      <span>Eligibility & Fee</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Admit Card */}
          <div className="sarkari-col">
            <div className="sarkari-col-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="radar-beacon" style={{ color: '#6366f1' }} />
                <span>ADMIT CARD / HALL TICKET</span>
              </span>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.7rem', 
                background: 'rgba(99, 102, 241, 0.2)', 
                color: '#a5b4fc', 
                padding: '2px 7px', 
                borderRadius: '4px',
                border: '1px solid rgba(99, 102, 241, 0.4)'
              }}>
                Live Unlocked
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
                      <span style={{ color: '#818cf8', fontWeight: 800 }}>[{card.org}]</span> {card.postName}
                    </div>
                    <div className="sarkari-item-meta">
                      <span style={{ color: '#00ff9d', fontWeight: 600 }}>● {card.admitCardStatus}</span>
                    </div>
                  </a>

                  {/* Direct Tactical Action Links */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '0.65rem', flexWrap: 'wrap' }}>
                    <a
                      href={card.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gamer-action cyan"
                    >
                      <span>Download Hall Ticket</span>
                      <ArrowRight size={11} />
                    </a>
                    <a
                      href={`/exam-schedules/${card.orgSlug}/${card.postSlug}`}
                      onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${card.orgSlug}/${card.postSlug}`); }}
                      className="btn-gamer-action indigo"
                    >
                      <span>Exam Dates</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Results */}
          <div className="sarkari-col">
            <div className="sarkari-col-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="radar-beacon" style={{ color: '#00ff9d' }} />
                <span>RESULTS & MERIT LIST</span>
              </span>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.7rem', 
                background: 'rgba(0, 255, 157, 0.2)', 
                color: '#00ff9d', 
                padding: '2px 7px', 
                borderRadius: '4px',
                border: '1px solid rgba(0, 255, 157, 0.4)'
              }}>
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
                      <span style={{ color: '#00ff9d', fontWeight: 800 }}>[{result.org}]</span> {result.postName}
                    </div>
                    <div className="sarkari-item-meta">
                      <span style={{ color: '#00ff9d', fontWeight: 600 }}>● {result.resultStatus}</span>
                    </div>
                  </a>

                  {/* Direct Tactical Action Links */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '0.65rem', flexWrap: 'wrap' }}>
                    <a
                      href={result.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gamer-action emerald"
                    >
                      <span>Check Scorecard</span>
                      <ArrowRight size={11} />
                    </a>
                    <a
                      href={`/exam-schedules/${result.orgSlug}/${result.postSlug}`}
                      onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${result.orgSlug}/${result.postSlug}`); }}
                      className="btn-gamer-action indigo"
                    >
                      <span>Merit Cutoffs</span>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.25rem' }}>
          {currentStateCities.map(city => (
            <div 
              key={city.id}
              className="glass-panel"
              style={{ 
                padding: '1.25rem', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.85rem',
                border: '1px solid var(--bg-card-border)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{city.name}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📍 {city.stateName}</span>
              </div>

              {/* Verified Local Service Sectors */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.75rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Home Services:</span>
                  <div style={{ fontWeight: 700, color: '#ea580c' }}>AC, Plumber, Electrical</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Coaching:</span>
                  <div style={{ fontWeight: 700, color: '#2563eb' }}>NEET, JEE, UPSC</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Legal & Tax:</span>
                  <div style={{ fontWeight: 700, color: '#7c3aed' }}>GST, CA, Property</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Wellness:</span>
                  <div style={{ fontWeight: 700, color: '#10b981' }}>Top Gyms & Yoga</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                <button
                  onClick={() => navigate(`/home-services/ac-repair-service/${city.stateSlug}/${city.slug}`)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '6px',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--bg-card-border)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <Wrench size={13} style={{ color: '#ea580c' }} />
                  <span>Book Services</span>
                </button>

                <button
                  onClick={() => navigate(`/services`)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '6px',
                    background: 'rgba(99, 102, 241, 0.15)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    color: 'var(--accent-indigo)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <span>All Niches Hub →</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
