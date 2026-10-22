import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [], navigate }) {
  if (!items || items.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '6px', 
        fontSize: '0.825rem', 
        color: 'var(--text-muted)',
        marginBottom: '1.25rem',
        flexWrap: 'wrap'
      }}
    >
      <button 
        onClick={() => navigate('/')} 
        style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'inherit' }}
      >
        <Home size={14} />
        <span>Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight size={13} style={{ opacity: 0.6 }} />
            {isLast ? (
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                {item.label}
              </span>
            ) : (
              <button 
                onClick={() => navigate(item.path)} 
                style={{ color: 'inherit' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-blue)'}
                onMouseLeave={(e) => e.target.style.color = 'inherit'}
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
