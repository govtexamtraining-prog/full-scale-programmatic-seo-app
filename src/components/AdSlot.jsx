import React, { useState } from 'react';
import { ExternalLink, Info, X } from 'lucide-react';

export default function AdSlot({ 
  slotType = "leaderboard", // "leaderboard" | "mpu" | "sticky-bottom"
  slotId = "default-ad-slot" 
}) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed && slotType === "sticky-bottom") return null;

  if (slotType === "sticky-bottom") {
    return (
      <aside className="ad-bottom-sticky" id={slotId} aria-label="Sponsored Content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '960px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ 
              fontSize: '0.65rem', 
              background: 'var(--bg-tertiary)', 
              color: 'var(--text-muted)', 
              padding: '2px 5px', 
              borderRadius: '3px',
              fontWeight: 700 
            }}>
              SPONSORED
            </span>
            <div style={{ fontSize: '0.825rem' }}>
              <strong>Compare Car & Bike Insurance Online</strong> — Save up to 85% on premium with zero paperwork.
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a 
              href="#ad-click" 
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                background: 'var(--accent-blue)',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              Check Quotes
            </a>
            <button 
              onClick={() => setIsDismissed(true)}
              style={{ color: 'var(--text-muted)', padding: '2px' }}
              title="Close Ad"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  const isLeaderboard = slotType === "leaderboard";
  
  return (
    <div 
      className={`ad-slot-container ${isLeaderboard ? 'ad-leaderboard' : 'ad-mpu'}`} 
      id={slotId}
      aria-label="Sponsored Advertisement Area"
    >
      <div className="ad-label">Sponsored Advertisement Area (Google AdSense Slot - 0 CLS)</div>
      
      <div className="ad-mock-content" style={{ width: '94%', maxWidth: isLeaderboard ? '700px' : '280px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #1e40af, #3b82f6)', 
          color: 'white', 
          width: isLeaderboard ? '42px' : '36px', 
          height: isLeaderboard ? '42px' : '36px', 
          borderRadius: '8px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexShrink: 0,
          fontWeight: 800
        }}>
          Ad
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {isLeaderboard 
              ? "Open Free Demat Account & Trade Commodities (Gold / Silver) at ₹0 Brokerage" 
              : "Compare Best Fixed Deposit Rates in India (Up to 9.1% p.a.)"}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Instant digital KYC • Trusted by 1 Crore+ Indian Investors
          </div>
        </div>
        <a 
          href="#ad-action"
          onClick={(e) => e.preventDefault()}
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            background: 'var(--bg-tertiary)',
            color: 'var(--accent-blue)',
            border: '1px solid var(--bg-card-border)',
            padding: '6px 12px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap'
          }}
        >
          <span>Apply</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
