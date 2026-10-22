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
  Radio
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
    { label: "Fuel Prices", route: "/fuel-prices", icon: Fuel },
    { label: "Gold Rates", route: "/gold-rates", icon: Coins },
    { label: "Sarkari Exams", route: "/exam-schedules", icon: GraduationCap },
    { label: "Services Hub", route: "/services", icon: Wrench },
    { label: "XML Sitemap", route: "/sitemap.xml", icon: FileCode }
  ];

  return (
    <header className="navbar">
      <div className="nav-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <div className="brand-badge">
          <Zap size={20} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Google Antigravity</span>
            <span style={{ 
              fontSize: '0.65rem', 
              background: 'linear-gradient(135deg, #10b981, #059669)', 
              color: 'white', 
              padding: '1px 6px', 
              borderRadius: '4px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '3px'
            }}>
              <Radio size={9} className="spin-anim" /> AUTO-LIVE
            </span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            India Public Data & Rates Portal
          </div>
        </div>
      </div>

      <nav className="nav-links" style={{ display: 'flex', gap: '4px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.route || (item.route !== '/' && currentRoute.startsWith(item.route));
          return (
            <button
              key={item.route}
              onClick={() => navigate(item.route)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Quick Search Button */}
        <button className="search-trigger-btn" onClick={onOpenSearch}>
          <Search size={15} />
          <span style={{ display: 'inline-block' }}>Search 30+ Cities & Exams</span>
          <span className="kbd-shortcut">Ctrl+K</span>
        </button>

        {/* Live Auto-Sync Status Badge */}
        <div 
          onClick={() => toggleFallbackMode()}
          title="Click to toggle simulated live vs stale fallback mode"
          style={{ 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.78rem',
            fontWeight: 700,
            padding: '4px 8px',
            borderRadius: '6px',
            border: `1px solid ${isStaleFallback ? '#fca5a5' : '#86efac'}`,
            background: isStaleFallback ? 'var(--red-bg)' : 'var(--green-bg)',
            color: isStaleFallback ? 'var(--red-primary)' : 'var(--green-primary)'
          }}
        >
          {isStaleFallback ? (
            <>
              <AlertTriangle size={13} />
              <span>Stale Cache</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={13} />
              <span>{lastSyncTime ? `Live ${lastSyncTime.split(' ')[0]}` : "Auto-Live"}</span>
            </>
          )}
        </div>

        {/* Manual Re-fetch Live Button */}
        <button 
          onClick={() => fetchLiveData(true)}
          disabled={isLoadingLive}
          title="Re-fetch live data immediately from public feeds"
          style={{
            padding: '6px 8px',
            borderRadius: '6px',
            border: '1px solid var(--bg-card-border)',
            background: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.75rem',
            fontWeight: 600
          }}
        >
          <RefreshCw size={13} className={isLoadingLive ? 'spin-anim' : ''} />
          <span style={{ display: 'none', sm: 'inline' }}>{isLoadingLive ? 'Syncing...' : 'Sync'}</span>
        </button>

        {/* SEO Inspector Trigger */}
        <button
          onClick={onOpenInspector}
          title="Inspect Programmatic SEO & SERP Schema"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '5px 10px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #059669, #0d9488)',
            color: 'white',
            fontSize: '0.78rem',
            fontWeight: 700
          }}
        >
          <SlidersHorizontal size={13} />
          <span>SEO Inspector</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          title="Toggle Dark / Light Mode"
          style={{
            padding: '6px',
            borderRadius: '6px',
            border: '1px solid var(--bg-card-border)',
            background: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)'
          }}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
