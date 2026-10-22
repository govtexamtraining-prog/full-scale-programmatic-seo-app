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
  HeartPulse
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
    { label: "Sarkari Exams", route: "/exam-schedules", icon: GraduationCap },
    { label: "Home Services", route: "/home-services", icon: Wrench },
    { label: "Coaching Hub", route: "/coaching-institutes", icon: Briefcase },
    { label: "Legal & CA", route: "/legal-tax-services", icon: FileText },
    { label: "Wellness & Gyms", route: "/wellness-fitness", icon: HeartPulse }
  ];

  return (
    <header className="navbar">
      {/* Brand */}
      <div className="nav-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <div className="brand-badge">
          <Zap size={18} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 800, letterSpacing: '-0.03em' }}>Google Antigravity</span>
            <span style={{ 
              fontSize: '0.62rem', 
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
              color: 'white', 
              padding: '1px 5px', 
              borderRadius: '4px',
              fontWeight: 800,
              letterSpacing: '0.04em'
            }}>
              PRO
            </span>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            India Public Data Engine
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
            >
              <Icon size={14} />
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
        >
          <Search size={14} />
          <span style={{ display: 'inline-block' }}>Search...</span>
          <span className="kbd-shortcut">⌘K</span>
        </button>

        {/* Live Status Pill */}
        <div 
          onClick={() => toggleFallbackMode()}
          title="Live auto-fetch status (click to toggle simulated outage)"
          style={{ 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '4px 9px',
            borderRadius: 'var(--radius-full)',
            border: isStaleFallback ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid rgba(16, 185, 129, 0.3)',
            background: isStaleFallback ? 'var(--red-bg)' : 'var(--green-bg)',
            color: isStaleFallback ? 'var(--red-primary)' : 'var(--green-primary)'
          }}
        >
          <span style={{ 
            width: '6px', 
            height: '6px', 
            borderRadius: '50%', 
            background: isStaleFallback ? 'var(--red-primary)' : 'var(--green-primary)',
            boxShadow: isStaleFallback ? '0 0 8px var(--red-primary)' : '0 0 8px var(--green-primary)'
          }} />
          <span>{isStaleFallback ? "Fallback" : "Live"}</span>
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
