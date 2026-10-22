import React, { useState, useEffect } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Globe, 
  Smartphone, 
  Monitor, 
  Code, 
  CheckCircle2, 
  Search, 
  Share2 
} from 'lucide-react';

export default function SeoInspectorDrawer({ isOpen, onClose, metadata, schemaData, currentRoute }) {
  const [copied, setCopied] = useState(false);
  const [deviceMode, setDeviceMode] = useState('desktop'); // desktop | mobile
  const [activeTab, setActiveTab] = useState('serp'); // serp | schema | variables

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const schemaJsonString = JSON.stringify(schemaData, null, 2);

  const handleCopySchema = () => {
    navigator.clipboard.writeText(schemaJsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="inspector-drawer" onClick={onClose}>
      <aside className="inspector-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-card-border)', paddingBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={20} style={{ color: 'var(--green-primary)' }} />
              <h2 style={{ fontSize: '1.25rem' }}>pSEO Inspector & SERP Simulator</h2>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Real-time Google search engine preview and structured JSON-LD validation
            </p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--bg-card-border)', paddingBottom: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('serp')}
            className={`nav-item ${activeTab === 'serp' ? 'active' : ''}`}
            style={{ fontSize: '0.85rem' }}
          >
            Google SERP Snippet
          </button>
          <button 
            onClick={() => setActiveTab('schema')}
            className={`nav-item ${activeTab === 'schema' ? 'active' : ''}`}
            style={{ fontSize: '0.85rem' }}
          >
            JSON-LD Schema ({schemaData?.length || 1})
          </button>
          <button 
            onClick={() => setActiveTab('variables')}
            className={`nav-item ${activeTab === 'variables' ? 'active' : ''}`}
            style={{ fontSize: '0.85rem' }}
          >
            Dynamic Slug & Intent
          </button>
        </div>

        {/* TAB 1: GOOGLE SERP PREVIEW */}
        {activeTab === 'serp' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                SERP RENDERING PREVIEW
              </span>
              <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-tertiary)', padding: '2px', borderRadius: '6px' }}>
                <button 
                  onClick={() => setDeviceMode('desktop')}
                  style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    background: deviceMode === 'desktop' ? 'var(--bg-secondary)' : 'transparent',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Monitor size={12} /> Desktop
                </button>
                <button 
                  onClick={() => setDeviceMode('mobile')}
                  style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    background: deviceMode === 'mobile' ? 'var(--bg-secondary)' : 'transparent',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Smartphone size={12} /> Mobile
                </button>
              </div>
            </div>

            {/* Google SERP Card */}
            <div 
              className="serp-card" 
              style={{ maxWidth: deviceMode === 'mobile' ? '380px' : '100%', margin: deviceMode === 'mobile' ? '0 auto' : '0' }}
            >
              <div className="serp-url">
                <span style={{ background: '#202124', color: 'white', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>⚡</span>
                <span style={{ color: '#202124', fontSize: '12px' }}>urbansarkari.in</span>
                <span style={{ color: '#70757a', fontSize: '12px' }}>› {currentRoute.replace(/^\//, '').replace(/\//g, ' › ')}</span>
              </div>
              <div className="serp-title">
                {metadata?.title || "Page Title"}
              </div>
              <div className="serp-snippet">
                {metadata?.metaDescription || "Meta description here"}
              </div>
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', background: '#e8f0fe', color: '#1967d2', padding: '1px 6px', borderRadius: '4px' }}>
                  ✓ In Stock / Live Rate
                </span>
                <span style={{ fontSize: '11px', background: '#fce8e6', color: '#c5221f', padding: '1px 6px', borderRadius: '4px' }}>
                  06:00 AM IST Update
                </span>
              </div>
            </div>

            {/* Meta tags quality audit */}
            <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--bg-card-border)', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--green-primary)' }} />
                <span>Search Engine Quality Signals</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--text-secondary)' }}>
                <li>• <strong>Meta Title:</strong> {metadata?.title?.length} chars (Optimal: 50-60)</li>
                <li>• <strong>Meta Description:</strong> {metadata?.metaDescription?.length} chars (Optimal: 120-160)</li>
                <li>• <strong>Canonical URL:</strong> <code>{metadata?.canonicalUrl}</code></li>
                <li>• <strong>Indexing Directive:</strong> <code>index, follow, max-snippet:-1, max-image-preview:large</code></li>
                <li>• <strong>Cumulative Layout Shift (CLS):</strong> <code>0.00 (Zero layout shifts guaranteed)</code></li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: JSON-LD SCHEMA */}
        {activeTab === 'schema' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, minHeight: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                AUTO-INJECTED STRUCTURED DATA
              </span>
              <button 
                onClick={handleCopySchema}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--bg-card-border)',
                  fontSize: '0.78rem',
                  fontWeight: 600
                }}
              >
                {copied ? <Check size={13} style={{ color: 'var(--green-primary)' }} /> : <Copy size={13} />}
                <span>{copied ? "Copied Schema!" : "Copy JSON-LD"}</span>
              </button>
            </div>

            <pre style={{
              background: '#0a0f1d',
              color: '#38bdf8',
              padding: '1rem',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.4,
              flex: 1,
              maxHeight: '400px'
            }}>
              {schemaJsonString}
            </pre>
          </div>
        )}

        {/* TAB 3: DYNAMIC VARIABLES */}
        {activeTab === 'variables' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              This page was generated through <strong>UrbanSarkari's Automated Public Directory Engine</strong> without manual content writing.
            </div>

            <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--bg-card-border)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                Active Route Elements:
              </div>
              <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '4px 0', color: 'var(--text-muted)' }}>Target Micro-Intent:</td>
                    <td style={{ fontWeight: 600 }}><code>{metadata?.keywords?.split(',')[0]}</code></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 0', color: 'var(--text-muted)' }}>Current Canonical:</td>
                    <td style={{ fontWeight: 600 }}><code>{metadata?.canonicalUrl}</code></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 0', color: 'var(--text-muted)' }}>Open Graph Type:</td>
                    <td style={{ fontWeight: 600 }}><code>{metadata?.ogType}</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              💡 <strong>Programmatic Scale Tip:</strong> By combining 30+ major Indian cities across 2 commodities (Fuel & Gold) with Sarkari exams, this single codebase compiles into hundreds of crawlable, indexable landing pages targeting zero-competition long-tail search intent strings.
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
