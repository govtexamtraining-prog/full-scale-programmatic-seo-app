import React from 'react';
import { ExternalLink, Sparkles, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { useMonetization } from '../context/MonetizationContext';

export default function AffiliateBanner({ 
  category = 'all', 
  limit = 2,
  variant = 'bento' // 'bento' | 'strip'
}) {
  const { getAffiliatesByCategory, settings } = useMonetization();

  if (!settings.enableAffiliates) return null;

  const items = getAffiliatesByCategory(category).slice(0, limit);

  if (!items || items.length === 0) return null;

  if (variant === 'strip') {
    const item = items[0];
    return (
      <aside 
        style={{
          background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.12) 0%, rgba(244, 63, 94, 0.1) 100%)',
          border: '1px solid var(--bg-card-border)',
          borderRadius: '12px',
          padding: '0.85rem 1.25rem',
          margin: '1.5rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
        aria-label="Affiliate Partner Offer"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ 
            fontSize: '0.7rem', 
            background: item.accentColor || 'var(--accent-indigo)', 
            color: 'white', 
            padding: '2px 7px', 
            borderRadius: '4px',
            fontWeight: 800 
          }}>
            {item.badge}
          </span>
          <div>
            <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.title}</strong>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
              — {item.description}
            </span>
          </div>
        </div>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--text-primary)',
            color: 'var(--bg-primary)',
            padding: '7px 14px',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.8rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          <span>{item.ctaText}</span>
          <ExternalLink size={13} />
        </a>
      </aside>
    );
  }

  return (
    <div style={{ margin: '2rem 0' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '1rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ 
            fontSize: '0.68rem', 
            fontWeight: 800, 
            letterSpacing: '0.05em', 
            textTransform: 'uppercase', 
            background: 'rgba(255,255,255,0.06)', 
            padding: '2px 8px', 
            borderRadius: '4px',
            color: 'var(--text-muted)'
          }}>
            Verified Partner Offers
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Selected high-value tools for Indian citizens & aspirants
          </span>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: items.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.25rem' 
      }}>
        {items.map((item) => (
          <div
            key={item.id}
            className="bento-card"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            {/* Top Accent bar */}
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              height: '3px', 
              background: item.accentColor || 'var(--accent-indigo)' 
            }} />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ 
                  fontSize: '0.72rem', 
                  fontWeight: 800, 
                  background: 'rgba(255,255,255,0.06)', 
                  color: item.accentColor || 'var(--text-primary)', 
                  padding: '3px 8px', 
                  borderRadius: '6px',
                  border: `1px solid ${item.accentColor ? `${item.accentColor}33` : 'rgba(255,255,255,0.1)'}`
                }}>
                  {item.badge}
                </span>

                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <ShieldCheck size={12} style={{ color: 'var(--green-primary)' }} /> Partner Verified
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {item.title}
              </h3>

              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {item.description}
              </p>
            </div>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                background: item.accentColor || 'var(--accent-indigo)',
                color: item.accentColor === '#fbbf24' || item.accentColor === '#f59e0b' ? '#09090b' : 'white',
                padding: '11px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.875rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s ease'
              }}
            >
              <span>{item.ctaText}</span>
              <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
