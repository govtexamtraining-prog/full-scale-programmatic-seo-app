import React, { useState } from 'react';
import { 
  FileCode, 
  Copy, 
  Download, 
  Check, 
  Search, 
  ExternalLink, 
  Layers, 
  Globe, 
  Bot,
  Sparkles
} from 'lucide-react';
import { generateAllProgrammaticUrls, buildXmlSitemapString } from '../services/pseoEngine';
import Breadcrumbs from '../components/Breadcrumbs';

export default function SitemapView({ navigate }) {
  const [viewMode, setViewMode] = useState('visual'); // visual | raw-xml
  const [copied, setCopied] = useState(false);
  const [filterVertical, setFilterVertical] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const urls = generateAllProgrammaticUrls();
  const xmlString = buildXmlSitemapString();

  const handleCopyXml = () => {
    navigator.clipboard.writeText(xmlString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadXml = () => {
    const blob = new Blob([xmlString], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredUrls = urls.filter(u => {
    const matchesVertical = filterVertical === 'all' || u.vertical === filterVertical;
    const matchesSearch = u.loc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesVertical && matchesSearch;
  });

  return (
    <div>
      <Breadcrumbs items={[{ label: "XML Sitemap Generator & Discovery Index", path: "/sitemap.xml" }]} navigate={navigate} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
            <span style={{ 
              background: 'var(--accent-blue-light)', 
              color: 'var(--accent-blue)', 
              fontWeight: 700, 
              fontSize: '0.75rem', 
              padding: '2px 8px', 
              borderRadius: '4px' 
            }}>
              Search Engine Discovery
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Standard sitemaps.org 0.9 Protocol
            </span>
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>
            Programmatic SEO XML Sitemap Engine
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '750px' }}>
            Live index of <strong>{urls.length}</strong> dynamically compiled programmatic URLs. Optimized for rapid crawl-budget discovery by Googlebot and Bingbot.
          </p>
        </div>

        {/* View Mode & Actions */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setViewMode(viewMode === 'visual' ? 'raw-xml' : 'visual')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--bg-card-border)',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileCode size={15} />
            <span>{viewMode === 'visual' ? "View Raw XML" : "View Explorer"}</span>
          </button>

          <button
            onClick={handleCopyXml}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--bg-card-border)',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {copied ? <Check size={15} style={{ color: 'var(--green-primary)' }} /> : <Copy size={15} />}
            <span>{copied ? "Copied!" : "Copy XML"}</span>
          </button>

          <button
            onClick={handleDownloadXml}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'var(--accent-blue)',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Download size={15} />
            <span>Download sitemap.xml</span>
          </button>
        </div>
      </div>

      {/* RAW XML VIEW */}
      {viewMode === 'raw-xml' && (
        <div style={{ position: 'relative' }}>
          <div style={{ 
            background: '#0a0f1d', 
            color: '#38bdf8', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.85rem', 
            maxHeight: '650px', 
            overflowY: 'auto',
            lineHeight: 1.5,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <pre>{xmlString}</pre>
          </div>
        </div>
      )}

      {/* VISUAL EXPLORER VIEW */}
      {viewMode === 'visual' && (
        <div>
          {/* Stats bar */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem', 
            marginBottom: '1.5rem' 
          }}>
            <div className="glass-panel" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Total Indexed URLs
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--accent-blue)' }}>
                {urls.length}
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Fuel Price Routes
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                {urls.filter(u => u.vertical === 'Fuel').length}
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Gold Price Routes
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--gold-primary)' }}>
                {urls.filter(u => u.vertical === 'Gold').length}
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Sarkari Exam Endpoints
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#dc2626' }}>
                {urls.filter(u => u.vertical === 'Exams').length}
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--bg-card-border)', borderRadius: '8px', padding: '0.5rem 1rem', flex: 1, minWidth: '240px' }}>
              <Search size={16} style={{ color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search sitemap URL slug or title..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-primary)', width: '100%' }}
              />
            </div>

            <select 
              className="form-select"
              value={filterVertical} 
              onChange={(e) => setFilterVertical(e.target.value)}
              style={{ width: 'auto', minWidth: '160px' }}
            >
              <option value="all">All Verticals ({urls.length})</option>
              <option value="Core">Core Static Hubs</option>
              <option value="Fuel">Daily Fuel Prices</option>
              <option value="Gold">Live Gold Rates</option>
              <option value="Exams">Sarkari Exams</option>
            </select>
          </div>

          {/* URL List Table */}
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>URL Location (Slug)</th>
                  <th>Vertical</th>
                  <th>Page Title Target</th>
                  <th>Priority</th>
                  <th>Changefreq</th>
                  <th>Visit</th>
                </tr>
              </thead>
              <tbody>
                {filteredUrls.map((u, idx) => {
                  const relativePath = u.loc.replace('https://google-antigravity.in', '');
                  return (
                    <tr key={idx}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {relativePath || '/'}
                      </td>
                      <td>
                        <span style={{ 
                          fontSize: '0.725rem', 
                          padding: '2px 6px', 
                          borderRadius: '4px',
                          fontWeight: 600,
                          background: u.vertical === 'Gold' ? 'var(--gold-bg)' : u.vertical === 'Fuel' ? 'var(--accent-blue-light)' : u.vertical === 'Exams' ? 'var(--red-bg)' : 'var(--bg-tertiary)',
                          color: u.vertical === 'Gold' ? 'var(--gold-primary)' : u.vertical === 'Fuel' ? 'var(--accent-blue)' : u.vertical === 'Exams' ? 'var(--red-primary)' : 'var(--text-primary)'
                        }}>
                          {u.vertical}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600, fontSize: '0.85rem' }}>{u.title}</td>
                      <td>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                          {u.priority}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{u.changefreq}</td>
                      <td>
                        <button
                          onClick={() => navigate(relativePath || '/')}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: 'var(--accent-blue)',
                            fontSize: '0.8rem',
                            fontWeight: 600
                          }}
                        >
                          <span>Open</span>
                          <ExternalLink size={12} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
