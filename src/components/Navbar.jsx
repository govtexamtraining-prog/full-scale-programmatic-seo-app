import React from 'react';
import { 
  Zap, 
  Search, 
  Sun, 
  Moon, 
  Fuel, 
  Coins, 
  GraduationCap, 
  Wrench,
  FileCode, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  SlidersHorizontal,
  Radio,
  Lock,
  Briefcase,
  FileText,
  HeartPulse,
  Building,
  Award,
  Download
} from 'lucide-react';
import { useLiveData } from '../context/LiveDataContext';

export default function Navbar({ 
  currentRoute, 
  navigate, 
  onOpenSearch, 
  onToggleTheme, 
  theme,
  onOpenInspector 
}) {
  const { 
    isLoadingLive, 
    lastSyncTime, 
    isStaleFallback, 
    fetchLiveData, 
    toggleFallbackMode 
  } = useLiveData();

  const navItems = [
    { label: "Dashboard", route: "/", icon: Zap },
    { label: "All Sarkari Exams", route: "/exam-schedules", icon: GraduationCap },
    { label: "Central Govt", route: "/exam-schedules/central", icon: Building },
    { label: "Admit Cards", route: "/exam-schedules/category/admit-card", icon: Download },
    { label: "Results", route: "/exam-schedules/category/results", icon: Award },
    { label: "Local Services", route: "/services", icon: Wrench }
  ];

  return (
    <header className="navbar">
      {/* Brand */}
      <div className="nav-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <div className="brand-badge" style={{
          background: 'linear-gradient(135deg, #6366f1, #00f0ff)',
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.3)',
          border: '1px solid rgba(0, 240, 255, 0.5)'
        }}>
          <Zap size={18} style={{ color: '#07090e', filter: 'drop-shadow(0 0 2px white)' }} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ 
              fontWeight: 900, 
              letterSpacing: '-0.035em', 
              fontSize: '1.2rem',
              background: 'linear-gradient(135deg, #ffffff 40%, #a5b4fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              UrbanSarkari
            </span>
            <span style={{ 
              fontSize: '0.62rem', 
              fontFamily: 'var(--font-mono)',
              background: 'rgba(0, 240, 255, 0.12)', 
              color: '#00f0ff', 
              border: '1px solid rgba(0, 240, 255, 0.4)',
              padding: '1px 6px', 
              borderRadius: '4px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              PRO HUD
            </span>
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#00ff9d' }}></span>
            <span>Sarkari Result & Verified Public Services</span>
          </div>
        </div>
      </div>

      {/* Center Nav Pill Dock */}
      <nav className="nav-links">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.route || (item.route !== '/' && currentRoute.startsWith(item.route));
          return (
            <button
              key={item.route}
              onClick={() => navigate(item.route)}
              className={`nav-item ${isActive ? 'active' : ''}`}
              style={isActive ? {
                boxShadow: '0 0 15px rgba(99, 102, 241, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(99, 102, 241, 0.6)'
              } : {}}
            >
              <Icon size={14} style={isActive ? { color: '#00f0ff' } : {}} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        {/* Sleek Search Button */}
        <button 
          className="search-trigger-btn" 
          onClick={onOpenSearch}
          title="Search 30+ Indian cities, commodities, exams and services (Ctrl+K)"
          style={{
            background: 'rgba(14, 17, 26, 0.7)',
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <Search size={14} style={{ color: '#00f0ff' }} />
          <span style={{ display: 'inline-block' }}>Search...</span>
          <span className="kbd-shortcut" style={{ borderColor: 'rgba(0, 240, 255, 0.3)', color: '#00f0ff' }}>⌘K</span>
        </button>

        {/* Live Status Pill with Radar Beacon */}
        <div 
          onClick={() => toggleFallbackMode()}
          title="Live auto-fetch status (click to toggle simulated outage)"
          style={{ 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            border: isStaleFallback ? '1px solid rgba(255, 42, 109, 0.5)' : '1px solid rgba(0, 255, 157, 0.4)',
            background: isStaleFallback ? 'rgba(255, 42, 109, 0.12)' : 'rgba(0, 255, 157, 0.1)',
            color: isStaleFallback ? '#ff2a6d' : '#00ff9d',
            letterSpacing: '0.04em'
          }}
        >
          <span className="radar-beacon" style={{ color: isStaleFallback ? '#ff2a6d' : '#00ff9d' }} />
          <span>{isStaleFallback ? "SIM_FALLBACK" : "LIVE_NODE"}</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          title={theme === 'dark' ? "Switch to Porcelain Light Mode" : "Switch to Void Dark Mode"}
          style={{
            padding: '7px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--bg-card-border)',
            background: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          {theme === 'dark' ? (
            <Sun size={15} style={{ color: 'var(--gold-primary)' }} />
          ) : (
            <Moon size={15} style={{ color: 'var(--accent-blue)' }} />
          )}
        </button>

        {/* Admin Master Console Trigger */}
        <button
          onClick={() => navigate('/admin')}
          title="Admin Master Console (/admin)"
          style={{
            padding: '7px',
            borderRadius: 'var(--radius-full)',
            border: currentRoute === '/admin' ? '1px solid var(--accent-indigo)' : '1px solid var(--bg-card-border)',
            background: currentRoute === '/admin' ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-tertiary)',
            color: currentRoute === '/admin' ? 'var(--accent-indigo)' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Lock size={14} />
        </button>
      </div>
    </header>
  );
}
