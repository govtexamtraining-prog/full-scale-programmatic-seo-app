import React from 'react';
import { AlertTriangle, CheckCircle, RefreshCw, Clock, Zap, Radio } from 'lucide-react';
import { useLiveData } from '../context/LiveDataContext';

export default function DataSyncRibbon() {
  const { 
    isLoadingLive, 
    lastSyncTime, 
    liveDataSource, 
    isStaleFallback, 
    autoSyncCount,
    fetchLiveData, 
    toggleFallbackMode 
  } = useLiveData();

  if (isStaleFallback) {
    return (
      <div className="sync-ribbon stale">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={15} />
          <span>
            <strong>Stale Data Fallback Notice:</strong> Upstream public API feeds simulated outage. Serving cached historical records verified as of {lastSyncTime}.
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={() => fetchLiveData(true)}
            style={{ 
              background: '#e11d48', 
              color: 'white', 
              padding: '2px 8px', 
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <RefreshCw size={11} className={isLoadingLive ? 'spin-anim' : ''} />
            Retry Live Connection
          </button>
          <button
            onClick={toggleFallbackMode}
            style={{ textDecoration: 'underline', color: 'inherit', fontSize: '0.75rem' }}
          >
            Dismiss Simulation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sync-ribbon live">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {isLoadingLive ? (
          <>
            <RefreshCw size={14} className="spin-anim" style={{ color: 'var(--accent-blue)' }} />
            <span>
              <strong>Auto-Fetching Live Data:</strong> Synchronizing latest Indian bullion spot rates & OMC fuel prices...
            </span>
          </>
        ) : (
          <>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '4px', 
              background: 'var(--green-primary)', 
              color: 'white', 
              padding: '1px 6px', 
              borderRadius: '4px', 
              fontSize: '0.7rem', 
              fontWeight: 800 
            }}>
              <Radio size={11} className="spin-anim" /> LIVE AUTO-FETCHED
            </span>
            <span>
              <strong>Real-Time Data Synchronized:</strong> Live fuel rates & gold spot prices updated automatically at <strong>{lastSyncTime || 'Just Now'}</strong> ({liveDataSource}).
            </span>
          </>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem' }}>
        <button
          onClick={() => fetchLiveData(true)}
          disabled={isLoadingLive}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'var(--bg-secondary)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: 'var(--green-primary)',
            padding: '2px 8px',
            borderRadius: '4px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
          title="Click to manually re-fetch live rates from public feeds"
        >
          <RefreshCw size={11} className={isLoadingLive ? 'spin-anim' : ''} />
          <span>{isLoadingLive ? "Fetching..." : "Fetch Latest Now"}</span>
        </button>

        <button
          onClick={toggleFallbackMode}
          style={{ textDecoration: 'underline', color: 'inherit', fontSize: '0.75rem', opacity: 0.8 }}
          title="Simulate upstream failure to inspect resilient fallback ribbon"
        >
          [Simulate Fallback]
        </button>
      </div>
    </div>
  );
}
