import React from 'react';
import { Zap, Shield, FileText, ExternalLink, MapPin } from 'lucide-react';
import { STATES_AND_CITIES } from '../data/cities';

export default function Footer({ navigate }) {
  return (
    <footer style={{ 
      background: 'var(--bg-secondary)', 
      borderTop: '1px solid var(--bg-card-border)',
      padding: '3rem 1.5rem 6rem', // extra bottom padding for sticky ad
      fontSize: '0.875rem',
      color: 'var(--text-muted)'
    }}>
      <div className="container" style={{ padding: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
              <div className="brand-badge" style={{ width: '28px', height: '28px' }}>
                <Zap size={16} />
              </div>
              <span>Google Antigravity</span>
            </div>
            <p style={{ lineHeight: 1.6, marginBottom: '1rem', fontSize: '0.825rem' }}>
              India's premier programmatic public data aggregator. Real-time fuel price monitoring, live BIS 916 gold rates, and fast Sarkari examination schedules across Indian states.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', background: 'var(--bg-tertiary)', padding: '3px 8px', borderRadius: '4px' }}>
                ⚡ Sub-100ms Hydration
              </span>
              <span style={{ fontSize: '0.75rem', background: 'var(--bg-tertiary)', padding: '3px 8px', borderRadius: '4px' }}>
                🇮🇳 100% Indian Public Data
              </span>
            </div>
          </div>

          {/* Quick Fuel Hub Links */}
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
              Top Daily Fuel Hubs
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.825rem' }}>
              <li><button onClick={() => navigate('/fuel-prices/tamil-nadu/chennai')} style={{ color: 'inherit' }}>Petrol Price in Chennai Today</button></li>
              <li><button onClick={() => navigate('/fuel-prices/tamil-nadu/coimbatore')} style={{ color: 'inherit' }}>Coimbatore Fuel & Diesel Rates</button></li>
              <li><button onClick={() => navigate('/fuel-prices/maharashtra/mumbai')} style={{ color: 'inherit' }}>Mumbai Daily Petrol Rate</button></li>
              <li><button onClick={() => navigate('/fuel-prices/karnataka/bengaluru')} style={{ color: 'inherit' }}>Bengaluru Petrol & Diesel Prices</button></li>
              <li><button onClick={() => navigate('/fuel-prices/delhi/delhi')} style={{ color: 'inherit' }}>New Delhi Capital Fuel Rates</button></li>
              <li><button onClick={() => navigate('/fuel-prices/telangana/hyderabad')} style={{ color: 'inherit' }}>Hyderabad Fuel Prices Today</button></li>
            </ul>
          </div>

          {/* Quick Gold Hub Links */}
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
              Live 22K/24K Gold Hubs
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.825rem' }}>
              <li><button onClick={() => navigate('/gold-rates/tamil-nadu/chennai')} style={{ color: 'inherit' }}>Chennai 22K Gold Rate Per Gram</button></li>
              <li><button onClick={() => navigate('/gold-rates/tamil-nadu/coimbatore')} style={{ color: 'inherit' }}>Coimbatore 1 Sovereign Gold Price</button></li>
              <li><button onClick={() => navigate('/gold-rates/maharashtra/mumbai')} style={{ color: 'inherit' }}>Mumbai IBJA Gold 24K Spot Price</button></li>
              <li><button onClick={() => navigate('/gold-rates/karnataka/bengaluru')} style={{ color: 'inherit' }}>Bengaluru Hallmarked Gold Rates</button></li>
              <li><button onClick={() => navigate('/gold-rates/gujarat/ahmedabad')} style={{ color: 'inherit' }}>Ahmedabad Silver & Gold Rates</button></li>
              <li><button onClick={() => navigate('/gold-rates/west-bengal/kolkata')} style={{ color: 'inherit' }}>Kolkata Bullion & 22 Carat Rates</button></li>
            </ul>
          </div>

          {/* Sarkari Exam Micro-Keywords */}
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
              Trending Sarkari Exams
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.825rem' }}>
              <li><button onClick={() => navigate('/exam-schedules/upsc/civil-services-ias-prelims-2026')} style={{ color: 'inherit' }}>UPSC IAS Prelims 2026</button></li>
              <li><button onClick={() => navigate('/exam-schedules/ssc/cgl-tier-1-2026')} style={{ color: 'inherit' }}>SSC CGL Tier-1 Notification</button></li>
              <li><button onClick={() => navigate('/exam-schedules/ibps/po-recruitment-2026')} style={{ color: 'inherit' }}>IBPS PO 2026 Admit Card</button></li>
              <li><button onClick={() => navigate('/exam-schedules/rrb/assistant-loco-pilot-alp-2026')} style={{ color: 'inherit' }}>Railway RRB ALP Vacancy</button></li>
              <li><button onClick={() => navigate('/exam-schedules/tnpsc/group-4-services-vao-2026')} style={{ color: 'inherit' }}>TNPSC Group 4 VAO 2026</button></li>
            </ul>
          </div>

          {/* High-Traffic Niches & Services */}
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
              High-Traffic Niches
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.825rem' }}>
              <li><button onClick={() => navigate('/home-services/ac-repair-service/tamil-nadu/coimbatore')} style={{ color: 'inherit' }}>AC Repair in Coimbatore</button></li>
              <li><button onClick={() => navigate('/home-services/electrician-services/tamil-nadu/chennai')} style={{ color: 'inherit' }}>Electricians in Chennai</button></li>
              <li><button onClick={() => navigate('/coaching-institutes/upsc-ias-coaching/delhi/delhi')} style={{ color: 'inherit' }}>UPSC Coaching in Delhi</button></li>
              <li><button onClick={() => navigate('/legal-tax-services/gst-registration-filing/karnataka/bengaluru')} style={{ color: 'inherit' }}>GST Registration Bengaluru</button></li>
              <li><button onClick={() => navigate('/wellness-fitness/gyms-fitness-centers/maharashtra/mumbai')} style={{ color: 'inherit' }}>Top Gyms in Mumbai</button></li>
              <li><button onClick={() => navigate('/services')} style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Traffic Density Matrix Hub →</button></li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Public Data Source Notice */}
        <div style={{ 
          borderTop: '1px solid var(--bg-card-border)', 
          paddingTop: '1.5rem', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.75rem',
          fontSize: '0.775rem' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
            <Shield size={14} />
            <strong>Public Information Disclaimer:</strong>
          </div>
          <p>
            Google Antigravity is an independent public programmatic aggregator and is not officially affiliated with the Government of India, the Union Public Service Commission, Indian Oil Corporation, Bharat Petroleum, or Hindustan Petroleum. Fuel prices and gold bullion rates are aggregated from published public exchange feeds daily at 06:00 AM IST. Examination candidates are advised to verify details with official recruitment gazettes.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            <span>© 2026 Google Antigravity (India Public Micro-Data Engine). All rights reserved.</span>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/sitemap.xml')} style={{ color: 'inherit' }}>Sitemap XML</button>
              <button onClick={() => navigate('/fuel-prices')} style={{ color: 'inherit' }}>Fuel Matrix</button>
              <button onClick={() => navigate('/gold-rates')} style={{ color: 'inherit' }}>Gold Index</button>
              <button onClick={() => navigate('/exam-schedules')} style={{ color: 'inherit' }}>Sarkari Grid</button>
              <button onClick={() => navigate('/admin')} style={{ color: 'var(--accent-indigo)', fontWeight: 800 }}>⚡ Admin Console</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
