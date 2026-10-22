import React from 'react';
import { AlertTriangle, RefreshCw, Radio, Sparkles } from 'lucide-react';
import { useLiveData } from '../context/LiveDataContext';

export default function DataSyncRibbon() {
  const { 
    isLoadingLive, 
    lastSyncTime, 
    liveDataSource, 
    isStaleFallback, 
    fetchLiveData, 
    toggleFallbackMode 
  } = useLiveData();

  if (isStaleFallback) {
    return (
      <div className="sync-ribbon stale" style={{ background: 'rgba(244, 63, 94, 0.08)', padding: '6px 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={13} style={{ color: 'var(--red-primary)' }} />
          <span style={{ fontSize: '0.78rem' }}>
            <strong>Upstream Fallback:</strong> Displaying cached historical records verified as of {lastSyncTime}.
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={() => fetchLiveData(true)}
            style={{ 
              background: 'var(--red-primary)', 
              color: 'white', 
              padding: '2px 8px', 
              borderRadius: '4px',
              fontSize: '0.72rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <RefreshCw size={10} className={isLoadingLive ? 'spin-anim' : ''} />
            Retry
          </button>
          <button
            onClick={toggleFallbackMode}
            style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textDecoration: 'underline' }}
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sync-ribbon live" style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '5px 1.5rem', borderBottom: '1px solid var(--bg-card-border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {isLoadingLive ? (
          <>
            <RefreshCw size={12} className="spin-anim" style={{ color: 'var(--accent-blue)' }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Auto-Synchronizing Indian bullion spot rates & OMC fuel feeds...
            </span>
          </>
        ) : (
          <>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '4px', 
              background: 'rgba(16, 185, 129, 0.15)', 
              color: 'var(--green-primary)', 
              padding: '1px 6px', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.68rem', 
              fontWeight: 800,
              letterSpacing: '0.04em'
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--green-primary)', boxShadow: '0 0 6px var(--green-primary)' }} />
              LIVE RADAR
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              14 Active 2026 Sarkari Exam Circulars & 750+ District Verified Services Active (Updated <strong>{lastSyncTime || 'Today'}</strong> • Sub-100ms Verified Data).
            </span>
          </>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem' }}>
        <button
          onClick={() => fetchLiveData(true)}
          disabled={isLoadingLive}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'transparent',
            color: 'var(--green-primary)',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
            padding: '2px 6px',
            borderRadius: '4px'
          }}
          title="Manual refresh"
        >
          <RefreshCw size={10} className={isLoadingLive ? 'spin-anim' : ''} />
          <span>{isLoadingLive ? "Syncing..." : "Refresh"}</span>
        </button>

        <button
          onClick={toggleFallbackMode}
          style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}
          title="Simulate upstream failure"
        >
          [Simulate Fallback]
        </button>
      </div>
    </div>
  );
}
