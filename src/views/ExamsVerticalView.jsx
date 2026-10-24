import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  ArrowRight, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  Briefcase, 
  ExternalLink, 
  Download, 
  Bell, 
  Radio, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Share2, 
  Check, 
  FileText, 
  Layers, 
  Award, 
  BookOpen, 
  ChevronRight, 
  X,
  Building,
  ShieldCheck
} from 'lucide-react';
import { SARKARI_EXAMS, SARKARI_NEWS_ALERTS } from '../data/examData';
import { INDIAN_STATES_EXAM_DIRECTORY, REGIONS_LIST, getStateInfoBySlug } from '../data/indianStates';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import CyberpunkExamQuestHub from '../components/CyberpunkExamQuestHub';

export default function ExamsVerticalView({ navigate, initialStateSlug, initialCategory }) {
  const [selectedState, setSelectedState] = useState(initialStateSlug || 'all');
  const [selectedRegion, setSelectedRegion] = useState('All India');
  const [filterCategory, setFilterCategory] = useState(initialCategory || 'all');
  const [filterEducation, setFilterEducation] = useState('all');
  const [filterOrg, setFilterOrg] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const [stateSearchText, setStateSearchText] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [alertSubscribed, setAlertSubscribed] = useState(false);

  // Sync state if props change (e.g. from routing)
  useEffect(() => {
    setSelectedState(initialStateSlug || 'all');
  }, [initialStateSlug]);

  useEffect(() => {
    setFilterCategory(initialCategory || 'all');
  }, [initialCategory]);

  // Derived state info
  const activeStateInfo = selectedState !== 'all' ? getStateInfoBySlug(selectedState) : null;

  // Base scope exams (Filtered by State, Region, Education, Org, Search Query - but NOT restricted by Category)
  // This guarantees metric cards and tabs always reflect truthful counts for the active scope!
  const baseScopeExams = SARKARI_EXAMS.filter(exam => {
    // State Filter
    let matchesState = true;
    if (selectedState === 'central') {
      matchesState = exam.isCentral;
    } else if (selectedState !== 'all') {
      matchesState = exam.stateSlug?.toLowerCase() === selectedState.toLowerCase();
    }

    // Region Filter (if not 'All India' and state is 'all')
    let matchesRegion = true;
    if (selectedState === 'all' && selectedRegion !== 'All India') {
      if (selectedRegion === 'Central Govt') {
        matchesRegion = exam.isCentral;
      } else {
        const examStateInfo = getStateInfoBySlug(exam.stateSlug);
        matchesRegion = examStateInfo?.region === selectedRegion;
      }
    }

    // Education Filter
    const matchesEducation = filterEducation === 'all' || exam.educationLevel === filterEducation;

    // Org Filter
    const matchesOrg = filterOrg === 'all' || exam.orgSlug === filterOrg;

    // Search Query Filter
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      exam.postName.toLowerCase().includes(q) ||
      exam.org.toLowerCase().includes(q) ||
      exam.orgFullName.toLowerCase().includes(q) ||
      exam.qualification.toLowerCase().includes(q) ||
      exam.stateName.toLowerCase().includes(q);

    return matchesState && matchesRegion && matchesEducation && matchesOrg && matchesSearch;
  });

  // Category counts and lists derived from baseScopeExams
  const jobsList = baseScopeExams.filter(e => e.category === 'jobs');
  const admitCardList = baseScopeExams.filter(e => e.category === 'admit-card');
  const resultsList = baseScopeExams.filter(e => e.category === 'results');
  const answerKeysList = baseScopeExams.filter(e => e.category === 'answer-keys');

  // Filtered exams for rendering columns
  const filteredExams = baseScopeExams.filter(exam => {
    return filterCategory === 'all' || exam.category === filterCategory;
  });

  // Calculate live stats
  const totalActiveVacancies = SARKARI_EXAMS
    .filter(e => e.category === 'jobs')
    .reduce((acc, curr) => acc + (curr.vacancies || 0), 0);

  const scopeVacancies = jobsList.reduce((acc, curr) => acc + (curr.vacancies || 0), 0);

  // Handle WhatsApp / Telegram quick share
  const handleShare = (exam) => {
    const text = `📢 *${exam.org} ${exam.postName} (2026 Notification)*\n🎯 Vacancies: ${exam.vacancies > 0 ? exam.vacancies.toLocaleString('en-IN') : 'Eligibility'}\n📅 Last Date: ${exam.lastDateToApply}\n🎓 Qualification: ${exam.qualification}\n🔗 Direct Apply & PDF: ${window.location.origin}/exam-schedules/${exam.orgSlug}/${exam.postSlug}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(exam.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleSelectState = (slug) => {
    setSelectedState(slug);
    setIsStateModalOpen(false);
    if (slug === 'all') {
      navigate('/exam-schedules');
    } else if (slug === 'central') {
      navigate('/exam-schedules/central');
    } else {
      navigate(`/exam-schedules/state/${slug}`);
    }
  };

  const handleSelectCategory = (cat) => {
    setFilterCategory(cat);
    if (cat === 'all') {
      if (selectedState !== 'all') {
        navigate(selectedState === 'central' ? '/exam-schedules/central' : `/exam-schedules/state/${selectedState}`);
      } else {
        navigate('/exam-schedules');
      }
    } else {
      navigate(`/exam-schedules/category/${cat}`);
    }
  };

  const handleCardClick = (cat) => {
    handleSelectCategory(cat);
    setTimeout(() => {
      const gridElem = document.getElementById('sarkari-main-grid');
      if (gridElem) {
        gridElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  // Top Indian States for quick pill access
  const topStates = [
    { slug: 'all', label: 'All India' },
    { slug: 'central', label: 'Central Govt (UPSC/SSC/RRB)' },
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
    { slug: 'gujarat', label: 'Gujarat' },
    { slug: 'haryana', label: 'Haryana' },
    { slug: 'delhi', label: 'Delhi UT' }
  ];

  // Helper count active vacancies for any state
  const getStateVacancies = (slug) => {
    if (slug === 'all') return totalActiveVacancies;
    if (slug === 'central') {
      return SARKARI_EXAMS.filter(e => e.isCentral).reduce((a, c) => a + (c.vacancies || 0), 0);
    }
    return SARKARI_EXAMS.filter(e => e.stateSlug === slug).reduce((a, c) => a + (c.vacancies || 0), 0);
  };

  // Build breadcrumbs
  const breadcrumbItems = [{ label: "Sarkari Exams 2026", path: "/exam-schedules" }];
  if (selectedState === 'central') {
    breadcrumbItems.push({ label: "Central Govt Exams", path: "/exam-schedules/central" });
  } else if (activeStateInfo) {
    breadcrumbItems.push({ label: activeStateInfo.name, path: `/exam-schedules/state/${selectedState}` });
  }
  if (filterCategory !== 'all') {
    const catLabels = { 'jobs': 'Latest Jobs', 'admit-card': 'Admit Cards', 'results': 'Results', 'answer-keys': 'Answer Keys' };
    breadcrumbItems.push({ label: catLabels[filterCategory] || filterCategory, path: `/exam-schedules/category/${filterCategory}` });
  }

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} navigate={navigate} />

      <AdSlot slotType="leaderboard" slotId="exams-vertical-top-ad" />
 
      {/* FUTURISTIC CYBERPUNK HUD // UNREAL ENGINE iOS MOBILE APP DASHBOARD */}
      <CyberpunkExamQuestHub navigate={navigate} onFilterCategory={handleCardClick} />

      {/* Hero Banner with Live Sarkari Pulse */}
      <section style={{ 
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(30, 27, 75, 0.85))',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        borderRadius: '16px',
        padding: 'clamp(1.15rem, 3vw, 2rem) clamp(0.9rem, 3vw, 1.5rem)',
        marginBottom: '2rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient background glow */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25), transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            background: 'rgba(255, 42, 109, 0.15)', 
            color: '#ff4d82', 
            border: '1px solid rgba(255, 42, 109, 0.4)',
            padding: '3px 10px', 
            borderRadius: '9999px', 
            fontSize: '0.75rem', 
            fontFamily: 'var(--font-mono)',
            fontWeight: 800 
          }}>
            <span className="radar-beacon" style={{ color: '#ff2a6d' }} />
            ALL-INDIA SARKARI RADAR 2026
          </span>

          <span style={{ 
            fontSize: '0.75rem', 
            color: '#00ff9d', 
            background: 'rgba(0, 255, 157, 0.1)', 
            border: '1px solid rgba(0, 255, 157, 0.3)',
            padding: '3px 10px',
            borderRadius: '9999px',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <ShieldCheck size={12} />
            Official Government Portals Verified
          </span>
        </div>

        <h1 style={{ 
          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', 
          lineHeight: 1.2, 
          marginBottom: '0.75rem',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #ffffff 30%, #a5b4fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {selectedState === 'central'
            ? 'Central Government Exam Schedules, Admit Cards & Results 2026'
            : activeStateInfo
            ? `${activeStateInfo.name} Government Exams & Results 2026 (${activeStateInfo.code})`
            : 'All-India Exam Notifications, Admit Cards & Results 2026'}
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', maxWidth: '850px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          {activeStateInfo 
            ? `Official recruitment notices for ${activeStateInfo.name} Public Service Commission (${activeStateInfo.boards.map(b => b.code).join(', ')}), State Police, and Teacher Eligibility. One-click direct apply links, hall ticket downloads, and result PDFs.`
            : 'The definitive centralized portal for UPSC, SSC, Railways (RRB), IBPS Banking, Defence Agniveer, and all 28 State Public Service Commissions (UPPSC, BPSC, MPSC, TNPSC, RPSC, KPSC & more). Fast Sarkari format with direct registration links and PDF circulars.'}
        </p>

        {/* Live National & State Metric Cards HUD (Clickable navigation to filtered lists) */}
        <div className="hud-metrics-grid">
          {/* Card 1: ACTIVE VACANCIES */}
          <div 
            className={`hud-metric-card hud-crimson ${filterCategory === 'jobs' ? 'is-active' : ''}`}
            onClick={() => handleCardClick('jobs')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick('jobs'); } }}
            title="Click to explore all Active Vacancies & Job Circulars"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.04em' }}>
                ACTIVE VACANCIES
              </div>
              {filterCategory === 'jobs' && (
                <span style={{ 
                  fontSize: '0.62rem', 
                  background: 'rgba(255, 42, 109, 0.25)', 
                  color: '#ff4d82', 
                  border: '1px solid rgba(255, 42, 109, 0.5)',
                  padding: '1px 6px', 
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)' 
                }}>
                  ● VIEWING
                </span>
              )}
            </div>

            <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#ff4d82', marginTop: '0.35rem', lineHeight: 1.1 }}>
              {selectedState === 'all' 
                ? `${(totalActiveVacancies / 1000).toFixed(0)}k+ Posts`
                : `${getStateVacancies(selectedState).toLocaleString('en-IN')}`}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Verified across All Departments
            </div>

            <div className="hud-cta-link" style={{ color: '#ff4d82' }}>
              <span>View {jobsList.length} Job Circulars</span>
              <ArrowRight size={12} />
            </div>
          </div>

          {/* Card 2: ACTIVE JOBS */}
          <div 
            className={`hud-metric-card hud-cyan ${filterCategory === 'jobs' ? 'is-active' : ''}`}
            onClick={() => handleCardClick('jobs')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick('jobs'); } }}
            title="Click to apply online for Active Jobs"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.04em' }}>
                ACTIVE JOBS
              </div>
              {filterCategory === 'jobs' && (
                <span style={{ 
                  fontSize: '0.62rem', 
                  background: 'rgba(0, 240, 255, 0.2)', 
                  color: '#00f0ff', 
                  border: '1px solid rgba(0, 240, 255, 0.4)',
                  padding: '1px 6px', 
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)' 
                }}>
                  ● VIEWING
                </span>
              )}
            </div>

            <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#00f0ff', marginTop: '0.35rem', lineHeight: 1.1 }}>
              {jobsList.length} Active
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Apply Online Open Now
            </div>

            <div className="hud-cta-link" style={{ color: '#00f0ff' }}>
              <span>Apply Online Direct</span>
              <ArrowRight size={12} />
            </div>
          </div>

          {/* Card 3: ADMIT CARDS LIVE */}
          <div 
            className={`hud-metric-card hud-indigo ${filterCategory === 'admit-card' ? 'is-active' : ''}`}
            onClick={() => handleCardClick('admit-card')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick('admit-card'); } }}
            title="Click to view and download live Admit Cards & Hall Tickets"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.04em' }}>
                ADMIT CARDS LIVE
              </div>
              {filterCategory === 'admit-card' && (
                <span style={{ 
                  fontSize: '0.62rem', 
                  background: 'rgba(99, 102, 241, 0.25)', 
                  color: '#a5b4fc', 
                  border: '1px solid rgba(129, 140, 248, 0.5)',
                  padding: '1px 6px', 
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)' 
                }}>
                  ● VIEWING
                </span>
              )}
            </div>

            <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#a5b4fc', marginTop: '0.35rem', lineHeight: 1.1 }}>
              {admitCardList.length} Released
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Direct Download Links
            </div>

            <div className="hud-cta-link" style={{ color: '#a5b4fc' }}>
              <span>Download Hall Tickets</span>
              <ArrowRight size={12} />
            </div>
          </div>

          {/* Card 4: RESULTS DECLARED */}
          <div 
            className={`hud-metric-card hud-emerald ${filterCategory === 'results' ? 'is-active' : ''}`}
            onClick={() => handleCardClick('results')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick('results'); } }}
            title="Click to view declared Results, Merit Lists & Scorecards"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.04em' }}>
                RESULTS DECLARED
              </div>
              {filterCategory === 'results' && (
                <span style={{ 
                  fontSize: '0.62rem', 
                  background: 'rgba(0, 255, 157, 0.2)', 
                  color: '#00ff9d', 
                  border: '1px solid rgba(0, 255, 157, 0.4)',
                  padding: '1px 6px', 
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)' 
                }}>
                  ● VIEWING
                </span>
              )}
            </div>

            <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#00ff9d', marginTop: '0.35rem', lineHeight: 1.1 }}>
              {resultsList.length} Scorecards
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Merit Lists & Cutoffs
            </div>

            <div className="hud-cta-link" style={{ color: '#00ff9d' }}>
              <span>Check Scorecards & Cutoffs</span>
              <ArrowRight size={12} />
            </div>
          </div>
        </div>
      </section>

      {/* LIVE 2026 SARKARI BREAKING BULLETINS TICKER */}
      <section className="glass-panel" style={{ 
        padding: '1.25rem 1.5rem', 
        marginBottom: '2rem',
        borderColor: 'rgba(99, 102, 241, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              background: 'rgba(255, 42, 109, 0.15)', 
              color: '#ff4d82', 
              border: '1px solid rgba(255, 42, 109, 0.4)',
              padding: '3px 9px', 
              borderRadius: '4px', 
              fontSize: '0.72rem', 
              fontFamily: 'var(--font-mono)',
              fontWeight: 800 
            }}>
              <span className="radar-beacon" style={{ color: '#ff2a6d' }} />
              LIVE BREAKING CIRCULARS
            </span>
            <strong style={{ fontSize: '0.95rem' }}>Latest Official Recruitment Circulars & Exam Calendar</strong>
          </div>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Updated Today (24 Oct 2026)</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
          {SARKARI_NEWS_ALERTS.map(news => (
            <a
              key={news.id}
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(14, 17, 26, 0.7)',
                border: '1px solid var(--bg-card-border)',
                borderRadius: '8px',
                padding: '0.85rem',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.5)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--bg-card-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ 
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(99, 102, 241, 0.15)', 
                  color: '#a5b4fc', 
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  fontSize: '0.68rem', 
                  fontWeight: 800, 
                  padding: '2px 6px', 
                  borderRadius: '4px' 
                }}>
                  [{news.org}] {news.badge}
                </span>
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{news.date}</span>
              </div>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4, margin: 0 }}>
                {news.title}
              </p>
              <div style={{ fontSize: '0.72rem', color: '#00f0ff', fontFamily: 'var(--font-mono)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                <span>Official Authority Circular</span>
                <ExternalLink size={11} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ALL INDIA STATE SELECTOR & QUICK BAR */}
      <section style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={17} style={{ color: '#00f0ff' }} />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
              Select State / Central Exam Board:
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {selectedState !== 'all' && (
              <button 
                onClick={() => handleSelectState('all')}
                style={{
                  background: 'rgba(255, 42, 109, 0.15)',
                  color: '#ff4d82',
                  border: '1px solid rgba(255, 42, 109, 0.4)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <X size={12} />
                Clear State Filter ({activeStateInfo ? activeStateInfo.name : selectedState})
              </button>
            )}

            <button
              onClick={() => setIsStateModalOpen(true)}
              className="btn-gamer-action cyan"
              style={{ padding: '5px 12px', fontSize: '0.8rem' }}
            >
              <span>Browse All 28 States & UTs</span>
              <Layers size={13} />
            </button>
          </div>
        </div>

        {/* Scrollable Quick State Selector Pills */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          overflowX: 'auto', 
          paddingBottom: '8px',
          scrollbarWidth: 'thin'
        }}>
          {topStates.map(state => {
            const isSelected = selectedState === state.slug;
            return (
              <button
                key={state.slug}
                onClick={() => handleSelectState(state.slug)}
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'var(--bg-secondary)',
                  color: isSelected ? 'white' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid #818cf8' : '1px solid var(--bg-card-border)',
                  padding: '0.5rem 0.95rem',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 800 : 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 0 15px rgba(99, 102, 241, 0.4)' : 'none'
                }}
              >
                <span>{state.label}</span>
                {state.slug !== 'all' && (
                  <span style={{
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '1px 5px',
                    borderRadius: '9999px',
                    background: isSelected ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 240, 255, 0.12)',
                    color: isSelected ? 'white' : '#00f0ff'
                  }}>
                    {getStateVacancies(state.slug) > 0 
                      ? `${(getStateVacancies(state.slug) / 1000).toFixed(0)}k+` 
                      : 'Active'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* FILTER CONTROLS BAR: Category, Qualification, Organization, and Instant Search */}
      <section style={{ 
        background: 'var(--bg-secondary)',
        border: '1px solid var(--bg-card-border)',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem'
      }}>
        {/* Search Bar & Primary Category Tabs */}
        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'var(--bg-primary)', 
            border: '1px solid var(--bg-card-border)', 
            borderRadius: '8px', 
            padding: '0.55rem 1rem', 
            flex: 1, 
            minWidth: 'min(240px, 100%)' 
          }}>
            <Search size={16} style={{ color: '#00f0ff' }} />
            <input 
              type="text" 
              placeholder="Search exam, recruitment post, qualification (e.g., UP Police, CGL, 10th pass, BPSC)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '0.9rem' }}
            />
            {searchQuery && (
              <X size={15} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setSearchQuery('')} />
            )}
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Columns', count: baseScopeExams.length },
              { id: 'jobs', label: '⚡ Latest Jobs', count: jobsList.length },
              { id: 'admit-card', label: '🎫 Admit Cards', count: admitCardList.length },
              { id: 'results', label: '🏆 Results', count: resultsList.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleSelectCategory(tab.id)}
                style={{
                  background: filterCategory === tab.id ? 'var(--accent-blue, #6366f1)' : 'var(--bg-primary)',
                  color: filterCategory === tab.id ? 'white' : 'var(--text-secondary)',
                  border: filterCategory === tab.id ? '1px solid #818cf8' : '1px solid var(--bg-card-border)',
                  padding: '0.55rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{tab.label}</span>
                <span style={{ 
                  fontSize: '0.7rem', 
                  fontFamily: 'var(--font-mono)', 
                  background: 'rgba(0,0,0,0.25)', 
                  padding: '1px 5px', 
                  borderRadius: '4px' 
                }}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Qualification Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', paddingTop: '0.4rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Filter size={13} />
            By Eligibility:
          </span>
          {[
            { id: 'all', label: 'All Eligibility' },
            { id: '10th', label: '10th / Matric Pass' },
            { id: '12th', label: '12th / Inter Pass' },
            { id: 'graduate', label: 'Graduate (Any Degree)' },
            { id: 'teaching', label: 'Teaching (B.Ed / TET)' },
            { id: 'engineering', label: 'Engineering / ITI / Diploma' },
            { id: 'post-graduate', label: 'Post Graduate' }
          ].map(edu => (
            <button
              key={edu.id}
              onClick={() => setFilterEducation(edu.id)}
              style={{
                background: filterEducation === edu.id ? 'rgba(0, 240, 255, 0.18)' : 'transparent',
                color: filterEducation === edu.id ? '#00f0ff' : 'var(--text-muted)',
                border: filterEducation === edu.id ? '1px solid rgba(0, 240, 255, 0.5)' : '1px solid transparent',
                padding: '3px 9px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: filterEducation === edu.id ? 800 : 500,
                cursor: 'pointer'
              }}
            >
              {edu.label}
            </button>
          ))}
        </div>
      </section>

      {/* ACTIVE CATEGORY BANNER (when single category is focused) */}
      {filterCategory !== 'all' && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(20, 24, 39, 0.95), rgba(15, 23, 42, 0.9))',
          border: '1px solid var(--bg-card-border)',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ 
              fontSize: '1.3rem',
              display: 'inline-flex',
              padding: '6px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)'
            }}>
              {filterCategory === 'jobs' ? '⚡' : filterCategory === 'admit-card' ? '🎫' : '🏆'}
            </span>
            <div>
              <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#ffffff' }}>
                {filterCategory === 'jobs' && `Viewing All Active Jobs & Recruitment Notices (${jobsList.length} Active)`}
                {filterCategory === 'admit-card' && `Viewing Live Admit Cards & Hall Tickets (${admitCardList.length} Released)`}
                {filterCategory === 'results' && `Viewing Declared Exam Results & Scorecards (${resultsList.length} Declared)`}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                Targeted view active. Click "Show All 3 Columns" to see Jobs, Admit Cards, and Results side by side.
              </div>
            </div>
          </div>
          <button
            onClick={() => handleSelectCategory('all')}
            className="btn-gamer-action cyan"
            style={{ padding: '6px 14px', fontSize: '0.78rem' }}
          >
            <span>Show All 3 Columns</span>
            <ArrowRight size={13} />
          </button>
        </div>
      )}

      {/* SARKARI MULTI-COLUMN TACTICAL HUD GRID */}
      <div 
        id="sarkari-main-grid" 
        className="sarkari-grid"
        style={filterCategory !== 'all' ? { gridTemplateColumns: '1fr' } : {}}
      >
        {/* Column 1: Latest Jobs */}
        {(filterCategory === 'all' || filterCategory === 'jobs') && (
          <div className="sarkari-col">
            <div className="sarkari-col-header" style={{ background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(185, 28, 28, 0.1))', borderColor: 'rgba(239, 68, 68, 0.4)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="radar-beacon" style={{ color: '#ff2a6d' }} />
                <span>LATEST JOBS (APPLY ONLINE)</span>
              </span>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.7rem', 
                background: 'rgba(255, 42, 109, 0.2)', 
                color: '#ff4d82', 
                padding: '2px 7px', 
                borderRadius: '4px',
                border: '1px solid rgba(255, 42, 109, 0.4)',
                fontWeight: 800
              }}>
                {jobsList.length} Active
              </span>
            </div>

            <div className="sarkari-item-list">
              {jobsList.map(job => (
                <div key={job.id} className="sarkari-item" style={{ position: 'relative' }}>
                  {job.isTrending && (
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(255, 42, 109, 0.2)',
                      color: '#ff2a6d',
                      border: '1px solid rgba(255, 42, 109, 0.4)',
                      fontSize: '0.62rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      padding: '1px 5px',
                      borderRadius: '3px'
                    }}>
                      HOT
                    </span>
                  )}

                  <a 
                    href={`/exam-schedules/${job.orgSlug}/${job.postSlug}`}
                    onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${job.orgSlug}/${job.postSlug}`); }}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <span style={{ 
                        color: '#ff2a6d', 
                        fontWeight: 900, 
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem'
                      }}>
                        [{job.org}]
                      </span>
                      <span style={{ 
                        fontSize: '0.68rem', 
                        color: 'var(--text-muted)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '1px 6px',
                        borderRadius: '3px'
                      }}>
                        {job.stateName}
                      </span>
                    </div>

                    <div className="sarkari-item-title" style={{ fontSize: '0.92rem', fontWeight: 700, lineHeight: 1.35 }}>
                      {job.postName}
                    </div>

                    <div className="sarkari-item-meta" style={{ flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#ff4d82', fontWeight: 700 }}>
                        <Clock size={12} />
                        Last Date: {job.lastDateToApply}
                      </span>
                      <span>• {job.vacancies > 0 ? `${job.vacancies.toLocaleString('en-IN')} Vacancies` : 'Entrance'}</span>
                    </div>

                    <div style={{ marginTop: '0.35rem', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      <strong>Eligibility:</strong> {job.qualification}
                    </div>

                    {job.salaryScale && (
                      <div style={{ marginTop: '0.2rem', fontSize: '0.72rem', color: '#00ff9d', fontFamily: 'var(--font-mono)' }}>
                        Pay: {job.salaryScale}
                      </div>
                    )}
                  </a>

                  {/* Direct Action Links Bar */}
                  <div style={{ display: 'flex', gap: '6px', marginTop: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gamer-action crimson"
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      <span>Apply Online Direct</span>
                      <ExternalLink size={10} />
                    </a>

                    <a
                      href={job.notificationPdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--bg-card-border)',
                        color: 'var(--text-secondary)',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Download size={10} />
                      <span>Official PDF</span>
                    </a>

                    <a
                      href={`/exam-schedules/${job.orgSlug}/${job.postSlug}`}
                      onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${job.orgSlug}/${job.postSlug}`); }}
                      className="btn-gamer-action indigo"
                      style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                    >
                      <span>Details</span>
                    </a>

                    <button
                      onClick={() => handleShare(job)}
                      title="Share Exam on WhatsApp"
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--bg-card-border)',
                        color: copiedId === job.id ? '#00ff9d' : 'var(--text-muted)',
                        padding: '4px 7px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: 'auto'
                      }}
                    >
                      {copiedId === job.id ? <Check size={12} /> : <Share2 size={12} />}
                    </button>
                  </div>
                </div>
              ))}

              {jobsList.length === 0 && (
                <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  <AlertCircle size={24} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
                  <div>No active job notifications match current filters.</div>
                  <button 
                    onClick={() => { setSelectedState('all'); setFilterEducation('all'); setSearchQuery(''); }}
                    style={{ background: 'transparent', border: 'none', color: '#00f0ff', textDecoration: 'underline', cursor: 'pointer', marginTop: '0.5rem', fontSize: '0.8rem' }}
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Column 2: Admit Card / Hall Ticket */}
        {(filterCategory === 'all' || filterCategory === 'admit-card') && (
          <div className="sarkari-col">
            <div className="sarkari-col-header" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(79, 70, 229, 0.1))', borderColor: 'rgba(99, 102, 241, 0.4)' }}>
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
                border: '1px solid rgba(99, 102, 241, 0.4)',
                fontWeight: 800
              }}>
                {admitCardList.length} Live
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ color: '#818cf8', fontWeight: 900, fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                        [{card.org}]
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.05)', padding: '1px 6px', borderRadius: '3px' }}>
                        {card.stateName}
                      </span>
                    </div>

                    <div className="sarkari-item-title" style={{ fontSize: '0.92rem', fontWeight: 700, lineHeight: 1.35 }}>
                      {card.postName}
                    </div>

                    <div className="sarkari-item-meta" style={{ marginTop: '6px' }}>
                      <span style={{ color: '#00ff9d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={12} />
                        {card.admitCardStatus}
                      </span>
                    </div>

                    <div style={{ marginTop: '0.35rem', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      <strong>Exam Date:</strong> <span style={{ color: 'var(--text-primary)' }}>{card.examDate}</span>
                    </div>
                  </a>

                  {/* Direct Action Links Bar */}
                  <div style={{ display: 'flex', gap: '6px', marginTop: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <a
                      href={card.admitCardLink || card.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gamer-action cyan"
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      <span>Download Hall Ticket</span>
                      <Download size={10} />
                    </a>

                    <a
                      href={`/exam-schedules/${card.orgSlug}/${card.postSlug}`}
                      onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${card.orgSlug}/${card.postSlug}`); }}
                      className="btn-gamer-action indigo"
                      style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                    >
                      <span>Instructions</span>
                    </a>

                    <button
                      onClick={() => handleShare(card)}
                      title="Share on WhatsApp"
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--bg-card-border)',
                        color: copiedId === card.id ? '#00ff9d' : 'var(--text-muted)',
                        padding: '4px 7px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: 'auto'
                      }}
                    >
                      {copiedId === card.id ? <Check size={12} /> : <Share2 size={12} />}
                    </button>
                  </div>
                </div>
              ))}

              {admitCardList.length === 0 && (
                <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  <AlertCircle size={24} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
                  <div>No admit cards match current state / qualification filter.</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Column 3: Results & Scorecards */}
        {(filterCategory === 'all' || filterCategory === 'results') && (
          <div className="sarkari-col">
            <div className="sarkari-col-header" style={{ background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.2), rgba(4, 120, 87, 0.1))', borderColor: 'rgba(16, 185, 129, 0.4)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="radar-beacon" style={{ color: '#00ff9d' }} />
                <span>RESULTS & SCORE CARDS</span>
              </span>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.7rem', 
                background: 'rgba(0, 255, 157, 0.2)', 
                color: '#00ff9d', 
                padding: '2px 7px', 
                borderRadius: '4px',
                border: '1px solid rgba(0, 255, 157, 0.4)',
                fontWeight: 800
              }}>
                {resultsList.length} Declared
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ color: '#00ff9d', fontWeight: 900, fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                        [{result.org}]
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.05)', padding: '1px 6px', borderRadius: '3px' }}>
                        {result.stateName}
                      </span>
                    </div>

                    <div className="sarkari-item-title" style={{ fontSize: '0.92rem', fontWeight: 700, lineHeight: 1.35 }}>
                      {result.postName}
                    </div>

                    <div className="sarkari-item-meta" style={{ marginTop: '6px' }}>
                      <span style={{ color: '#00ff9d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Award size={12} />
                        {result.resultStatus}
                      </span>
                    </div>

                    <div style={{ marginTop: '0.35rem', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      Total Posts: <strong style={{ color: 'var(--text-primary)' }}>{result.vacancies > 0 ? result.vacancies.toLocaleString('en-IN') : 'Entrance Examination'}</strong>
                    </div>
                  </a>

                  {/* Direct Action Links Bar */}
                  <div style={{ display: 'flex', gap: '6px', marginTop: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <a
                      href={result.resultPdfLink || result.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gamer-action emerald"
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      <span>Check Result PDF</span>
                      <ExternalLink size={10} />
                    </a>

                    <a
                      href={`/exam-schedules/${result.orgSlug}/${result.postSlug}`}
                      onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${result.orgSlug}/${result.postSlug}`); }}
                      className="btn-gamer-action indigo"
                      style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                    >
                      <span>Cut-off Marks</span>
                    </a>

                    <button
                      onClick={() => handleShare(result)}
                      title="Share Result on WhatsApp"
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--bg-card-border)',
                        color: copiedId === result.id ? '#00ff9d' : 'var(--text-muted)',
                        padding: '4px 7px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: 'auto'
                      }}
                    >
                      {copiedId === result.id ? <Check size={12} /> : <Share2 size={12} />}
                    </button>
                  </div>
                </div>
              ))}

              {resultsList.length === 0 && (
                <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  <AlertCircle size={24} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
                  <div>No results declared match current state / search criteria.</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Free Exam Alert Subscription Banner */}
      <section style={{
        marginTop: '2.5rem',
        padding: '1.75rem 2rem',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(0, 240, 255, 0.08))',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem'
      }}>
        <div style={{ maxWidth: '650px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.35rem' }}>
            <Bell size={18} style={{ color: '#00f0ff' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
              Never Miss a Sarkari Exam Deadline or Result
            </h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Get instant real-time alerts for {activeStateInfo ? activeStateInfo.name : 'All-India'} government notifications, admit cards, and merit lists directly on WhatsApp & Push. 100% Free for all aspirants.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {alertSubscribed ? (
            <div style={{ 
              background: 'rgba(0, 255, 157, 0.2)', 
              color: '#00ff9d', 
              border: '1px solid rgba(0, 255, 157, 0.4)',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <CheckCircle2 size={16} />
              Alert Radar Active!
            </div>
          ) : (
            <button
              onClick={() => setAlertSubscribed(true)}
              className="btn-gamer-action cyan"
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
            >
              <Bell size={16} />
              <span>Enable Instant Exam Alerts</span>
            </button>
          )}
        </div>
      </section>

      {/* ALL-INDIA 28 STATES & UNION TERRITORIES MODAL */}
      {isStateModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--bg-card-border)',
            borderRadius: '16px',
            maxWidth: '850px',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--bg-card-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>
                  Select State or Central Authority
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
                  Browse official notifications for all 28 States, UTs & Central Government
                </p>
              </div>

              <button 
                onClick={() => setIsStateModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Search within Modal */}
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--bg-card-border)', background: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--bg-card-border)', borderRadius: '8px', padding: '0.5rem 1rem' }}>
                <Search size={16} style={{ color: '#00f0ff' }} />
                <input 
                  type="text" 
                  placeholder="Filter state by name or code (e.g., Uttar Pradesh, UP, Bihar, Tamil Nadu)..."
                  value={stateSearchText}
                  onChange={(e) => setStateSearchText(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '0.9rem' }}
                  autoFocus
                />
              </div>
            </div>

            {/* State Grid */}
            <div style={{ padding: '1.25rem 1.5rem', overflowY: 'auto', flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
                {INDIAN_STATES_EXAM_DIRECTORY
                  .filter(st => 
                    !stateSearchText || 
                    st.name.toLowerCase().includes(stateSearchText.toLowerCase()) ||
                    st.code.toLowerCase().includes(stateSearchText.toLowerCase()) ||
                    st.region.toLowerCase().includes(stateSearchText.toLowerCase())
                  )
                  .map(st => {
                    const vacancies = getStateVacancies(st.slug);
                    const isSelected = selectedState === st.slug;
                    return (
                      <button
                        key={st.slug}
                        onClick={() => handleSelectState(st.slug)}
                        style={{
                          background: isSelected ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                          border: isSelected ? '1px solid #818cf8' : '1px solid var(--bg-card-border)',
                          borderRadius: '10px',
                          padding: '0.85rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.5)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = isSelected ? '#818cf8' : 'var(--bg-card-border)'}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ 
                            fontSize: '0.68rem', 
                            fontFamily: 'var(--font-mono)', 
                            background: 'rgba(99, 102, 241, 0.2)', 
                            color: '#a5b4fc', 
                            padding: '1px 5px', 
                            borderRadius: '3px',
                            fontWeight: 800
                          }}>
                            {st.code}
                          </span>
                          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                            {st.region}
                          </span>
                        </div>

                        <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                          {st.name}
                        </strong>

                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                          <span>{st.boards.slice(0, 2).map(b => b.code).join(', ')}</span>
                          <span style={{ color: vacancies > 0 ? '#00ff9d' : 'var(--text-muted)', fontWeight: 700 }}>
                            {vacancies > 0 ? `${vacancies.toLocaleString('en-IN')} Posts` : 'Active'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Native In-Feed Ad Slot */}
      <AdSlot slotType="in-feed" slotId="exams-feed-mid-ad" />
    </div>
  );
}
