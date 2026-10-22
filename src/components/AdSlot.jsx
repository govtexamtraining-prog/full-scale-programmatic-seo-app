import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Info, X, Zap, ShieldCheck } from 'lucide-react';
import { useMonetization } from '../context/MonetizationContext';

const HIGH_CPC_PREVIEWS = {
  leaderboard: [
    {
      badge: 'FINANCE & DEMAT',
      headline: 'Open Free Demat Account & Trade Commodities (Gold / Silver) at ₹0 Brokerage',
      subtext: 'Instant 5-Min Paperless KYC • Trusted by 1.5 Crore+ Indian Investors',
      cta: 'Open Account',
      tagColor: '#3b82f6'
    },
    {
      badge: 'GOVT EXAMS 2026',
      headline: 'Testbook Pass Pro 2026: 50,000+ Mock Tests & PYQs for UPSC, SSC & RRB',
      subtext: 'Full Bilingual Test Series, Live Ranks & AI Performance Scorecard',
      cta: 'Claim 50% Off',
      tagColor: '#6366f1'
    },
    {
      badge: 'TAX & LEGAL',
      headline: 'File GST & Income Tax Return Online with Top Chartered Accountants',
      subtext: '100% Notice-Safe E-Filing • Direct Expert Consultation in 15 Mins',
      cta: 'Consult CA',
      tagColor: '#8b5cf6'
    }
  ],
  mpu: [
    {
      badge: 'HOME CARE AMC',
      headline: 'Doorstep AC Gas Refill & Summer Protection Plan at ₹399',
      subtext: 'Certified Technicians • 90-Day Service Guarantee',
      cta: 'Book Slot',
      tagColor: '#ea580c'
    },
    {
      badge: 'BANKING & LOANS',
      headline: 'Check Free CIBIL Score & Pre-Approved Instant Personal Loan up to ₹10 Lakh',
      subtext: 'Interest Rate from 10.49% p.a. • Zero Pre-Payment Penalty',
      cta: 'Check Eligibility',
      tagColor: '#10b981'
    }
  ],
  'in-feed': [
    {
      badge: 'SPONSORED PARTNER',
      headline: 'India’s #1 Live Test Series & Study Notes for All State & Central Exams',
      subtext: 'Access updated mock tests for 750+ government exams with daily bilingual current affairs and cut-off analyses.',
      cta: 'Start Free Mock',
      tagColor: '#f59e0b'
    }
  ],
  'sticky-bottom': [
    {
      badge: 'COMMERCIAL OFFER',
      headline: 'Compare Car & Bike Insurance Online — Save up to 85% on Premium with Zero Paperwork',
      cta: 'Check Instant Quotes',
      tagColor: '#3b82f6'
    }
  ]
};

export default function AdSlot({ 
  slotType = "leaderboard", // "leaderboard" | "mpu" | "in-feed" | "sticky-bottom"
  slotId = "default-ad-slot",
  customAdUnitId = ""
}) {
  const { settings } = useMonetization();
  const [isDismissed, setIsDismissed] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const adRef = useRef(null);
  const adPushedRef = useRef(false);

  // Rotate preview ad randomly or on mount
  useEffect(() => {
    const list = HIGH_CPC_PREVIEWS[slotType] || HIGH_CPC_PREVIEWS.leaderboard;
    setPreviewIndex(Math.floor(Math.random() * list.length));
  }, [slotType]);

  // Check if live AdSense is active
  const isAdSenseActive = Boolean(
    settings?.enableAdSense && 
    settings?.adSenseClientId && 
    settings.adSenseClientId.trim().startsWith('ca-pub-')
  );

  // Dynamic Google AdSense Script Injection & push({})
  useEffect(() => {
    if (!isAdSenseActive) return;

    // Check if script already exists
    const scriptId = 'google-adsense-script';
    let scriptEl = document.getElementById(scriptId);

    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.adSenseClientId.trim()}`;
      scriptEl.async = true;
      scriptEl.crossOrigin = 'anonymous';
      document.head.appendChild(scriptEl);
    }

    // Push ad if not pushed yet
    if (!adPushedRef.current && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adPushedRef.current = true;
      } catch (err) {
        console.warn('AdSense slot init info:', err);
      }
    }
  }, [isAdSenseActive, settings?.adSenseClientId]);

  // If ads are disabled globally
  if (settings && settings.enableAdSense === false) {
    return null;
  }

  // Sticky bottom check
  if (slotType === "sticky-bottom") {
    if (settings && settings.enableStickyAd === false) return null;
    if (isDismissed) return null;

    const stickyPreview = HIGH_CPC_PREVIEWS['sticky-bottom'][0];

    return (
      <aside className="ad-bottom-sticky" id={slotId} aria-label="Sponsored Advertisement">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '980px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <span style={{ 
              fontSize: '0.62rem', 
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', 
              color: 'white', 
              padding: '2px 6px', 
              borderRadius: '4px',
              fontWeight: 800,
              letterSpacing: '0.04em',
              flexShrink: 0
            }}>
              SPONSORED
            </span>
            <div style={{ fontSize: '0.825rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-primary)' }}>
              <strong>{stickyPreview.headline.split('—')[0]}</strong>
              {stickyPreview.headline.includes('—') && ` — ${stickyPreview.headline.split('—')[1]}`}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <a 
              href="#ad-action" 
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                color: 'white',
                padding: '5px 12px',
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.35)'
              }}
            >
              {stickyPreview.cta}
            </a>
            <button 
              onClick={() => setIsDismissed(true)}
              style={{ color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px' }}
              title="Close Sponsored Ad"
              aria-label="Close Sponsored Ad"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  // In-Feed Native Unit
  if (slotType === "in-feed") {
    if (settings && settings.enableInFeedAds === false) return null;
    const inFeedPreview = HIGH_CPC_PREVIEWS['in-feed'][0];

    return (
      <div 
        className="ad-infeed" 
        id={slotId}
        aria-label="Sponsored In-Feed Advertisement"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.06), transparent 70%), var(--bg-card)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRadius: '16px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '220px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ 
              fontSize: '0.65rem', 
              background: 'rgba(59, 130, 246, 0.15)', 
              color: 'var(--accent-blue)', 
              padding: '3px 8px', 
              borderRadius: '4px',
              fontWeight: 800,
              letterSpacing: '0.05em'
            }}>
              {inFeedPreview.badge}
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              Google AdSense High-CTR Placement
            </span>
          </div>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.35, color: 'var(--text-primary)' }}>
            {inFeedPreview.headline}
          </h3>

          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
            {inFeedPreview.subtext}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--bg-card-border)' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Zap size={12} style={{ color: '#f59e0b' }} /> Verified Commercial Partner
          </span>
          <a
            href="#sponsored"
            onClick={(e) => e.preventDefault()}
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              background: 'var(--accent-blue)',
              color: 'white',
              padding: '6px 14px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none'
            }}
          >
            <span>{inFeedPreview.cta}</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    );
  }

  // Standard Leaderboard or MPU Unit
  const isLeaderboard = slotType === "leaderboard";
  const slotList = HIGH_CPC_PREVIEWS[slotType] || HIGH_CPC_PREVIEWS.leaderboard;
  const currentMock = slotList[previewIndex % slotList.length];

  // Specific Slot ID resolution
  const resolvedAdSlotId = customAdUnitId || 
    (isLeaderboard ? settings?.adSenseLeaderboardSlotId : settings?.adSenseMpuSlotId) || 
    '';

  return (
    <div 
      className={`ad-slot-container ${isLeaderboard ? 'ad-leaderboard' : 'ad-mpu'}`} 
      id={slotId}
      aria-label="Google AdSense Advertisement Unit"
    >
      <div className="ad-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span>Sponsored Ad Unit</span>
        <span>•</span>
        <span style={{ color: 'var(--green-primary)' }}>0 CLS Optimized</span>
        {isAdSenseActive && <span style={{ color: 'var(--accent-indigo)' }}>(Live AdSense Active)</span>}
      </div>

      {isAdSenseActive && resolvedAdSlotId ? (
        /* Real Google AdSense Tag */
        <div style={{ width: '100%', minHeight: isLeaderboard ? '90px' : '250px', overflow: 'hidden' }}>
          <ins 
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', minHeight: isLeaderboard ? '90px' : '250px' }}
            data-ad-client={settings.adSenseClientId.trim()}
            data-ad-slot={resolvedAdSlotId}
            data-ad-format={isLeaderboard ? "horizontal" : "rectangle"}
            data-full-width-responsive="true"
          />
        </div>
      ) : (
        /* High-Converting Realistic Mock Ad Unit (Shows prior to AdSense ID setup or approval) */
        <div className="ad-mock-content" style={{ width: '96%', maxWidth: isLeaderboard ? '720px' : '285px' }}>
          <div style={{ 
            background: `linear-gradient(135deg, ${currentMock.tagColor}, #1e3a8a)`, 
            color: 'white', 
            width: isLeaderboard ? '44px' : '38px', 
            height: isLeaderboard ? '44px' : '38px', 
            borderRadius: '10px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0,
            fontWeight: 800,
            fontSize: '0.8rem',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
          }}>
            Ad
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ 
              fontWeight: 700, 
              fontSize: isLeaderboard ? '0.85rem' : '0.8rem', 
              color: 'var(--text-primary)', 
              whiteSpace: isLeaderboard ? 'nowrap' : 'normal', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis',
              lineHeight: 1.3
            }}>
              {currentMock.headline}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {currentMock.subtext}
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
            <span>{currentMock.cta}</span>
            <ExternalLink size={12} />
          </a>
        </div>
      )}
    </div>
  );
}
