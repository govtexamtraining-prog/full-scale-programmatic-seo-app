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
              <span>UrbanSarkari</span>
            </div>
            <p style={{ lineHeight: 1.6, marginBottom: '1rem', fontSize: '0.825rem' }}>
              India's premier Sarkari Result & verified doorstep services hub. Real-time official examination circulars, instant admit cards, and verified local home services across 750+ Indian districts.
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

          {/* 1. Sarkari Exam Board */}
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
              Sarkari Exam Board 2026
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.825rem' }}>
              <li><button onClick={() => navigate('/exam-schedules/upsc/civil-services-ias-prelims-2026')} style={{ color: 'inherit' }}>UPSC IAS Prelims 2026</button></li>
              <li><button onClick={() => navigate('/exam-schedules/ssc/cgl-tier-1-2026')} style={{ color: 'inherit' }}>SSC CGL Tier-1 Notification</button></li>
              <li><button onClick={() => navigate('/exam-schedules/ibps/po-recruitment-2026')} style={{ color: 'inherit' }}>IBPS PO 2026 Admit Card</button></li>
              <li><button onClick={() => navigate('/exam-schedules/rrb/assistant-loco-pilot-alp-2026')} style={{ color: 'inherit' }}>Railway RRB ALP Vacancy</button></li>
              <li><button onClick={() => navigate('/exam-schedules/tnpsc/group-4-services-vao-2026')} style={{ color: 'inherit' }}>TNPSC Group 4 VAO 2026</button></li>
              <li><button onClick={() => navigate('/exam-schedules')} style={{ color: '#dc2626', fontWeight: 700 }}>All Active Sarkari Exams →</button></li>
            </ul>
          </div>

          {/* 2. Home Services & Utilities */}
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
              Home Services & Utilities
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.825rem' }}>
              <li><button onClick={() => navigate('/home-services/ac-repair-service/tamil-nadu/coimbatore')} style={{ color: 'inherit' }}>AC Repair in Coimbatore</button></li>
              <li><button onClick={() => navigate('/home-services/electrician-services/tamil-nadu/chennai')} style={{ color: 'inherit' }}>Electricians in Chennai</button></li>
              <li><button onClick={() => navigate('/home-services/plumbing-services/delhi/delhi')} style={{ color: 'inherit' }}>Doorstep Plumbers Delhi</button></li>
              <li><button onClick={() => navigate('/home-services/pest-control-sanitization/karnataka/bengaluru')} style={{ color: 'inherit' }}>Pest Control Bengaluru</button></li>
              <li><button onClick={() => navigate('/home-services/house-painting-waterproofing/maharashtra/mumbai')} style={{ color: 'inherit' }}>House Painting Mumbai</button></li>
              <li><button onClick={() => navigate('/home-services')} style={{ color: '#ea580c', fontWeight: 700 }}>All Home Services Hub →</button></li>
            </ul>
          </div>

          {/* 3. Coaching & Education Academies */}
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
              Coaching & Entrance Prep
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.825rem' }}>
              <li><button onClick={() => navigate('/coaching-institutes/upsc-ias-coaching/delhi/delhi')} style={{ color: 'inherit' }}>UPSC IAS Coaching Delhi</button></li>
              <li><button onClick={() => navigate('/coaching-institutes/neet-jee-coaching/tamil-nadu/chennai')} style={{ color: 'inherit' }}>NEET & JEE Coaching Chennai</button></li>
              <li><button onClick={() => navigate('/coaching-institutes/bank-po-clerk-coaching/maharashtra/mumbai')} style={{ color: 'inherit' }}>Bank PO Classes Mumbai</button></li>
              <li><button onClick={() => navigate('/coaching-institutes/spoken-english-communication/karnataka/bengaluru')} style={{ color: 'inherit' }}>Spoken English Bengaluru</button></li>
              <li><button onClick={() => navigate('/coaching-institutes')} style={{ color: '#2563eb', fontWeight: 700 }}>Browse All Academies →</button></li>
            </ul>
          </div>

          {/* 4. Professional (Legal, Tax & CA) */}
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
              Legal, Tax & CA Retainers
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.825rem' }}>
              <li><button onClick={() => navigate('/legal-tax-services/gst-registration-filing/karnataka/bengaluru')} style={{ color: 'inherit' }}>GST Registration Bengaluru</button></li>
              <li><button onClick={() => navigate('/legal-tax-services/property-lawyer-consultation/maharashtra/mumbai')} style={{ color: 'inherit' }}>Property Lawyers Mumbai</button></li>
              <li><button onClick={() => navigate('/legal-tax-services/chartered-accountant-audit/delhi/delhi')} style={{ color: 'inherit' }}>CA & Audit Services Delhi</button></li>
              <li><button onClick={() => navigate('/legal-tax-services/trademark-ip-filing/tamil-nadu/chennai')} style={{ color: 'inherit' }}>Trademark Filing Chennai</button></li>
              <li><button onClick={() => navigate('/legal-tax-services')} style={{ color: '#7c3aed', fontWeight: 700 }}>Legal & CA Directory →</button></li>
            </ul>
          </div>

          {/* 5. Wellness, Gyms & Lifestyle */}
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
              Wellness & Gyms Hub
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.825rem' }}>
              <li><button onClick={() => navigate('/wellness-fitness/gyms-fitness-centers/maharashtra/mumbai')} style={{ color: 'inherit' }}>Top Gyms in Mumbai</button></li>
              <li><button onClick={() => navigate('/wellness-fitness/yoga-meditation-studios/tamil-nadu/chennai')} style={{ color: 'inherit' }}>Yoga Studios in Chennai</button></li>
              <li><button onClick={() => navigate('/wellness-fitness/ayurvedic-spa-wellness/karnataka/bengaluru')} style={{ color: 'inherit' }}>Ayurvedic Spa Bengaluru</button></li>
              <li><button onClick={() => navigate('/wellness-fitness/crossfit-functional-training/delhi/delhi')} style={{ color: 'inherit' }}>CrossFit Centers Delhi</button></li>
              <li><button onClick={() => navigate('/wellness-fitness')} style={{ color: '#10b981', fontWeight: 700 }}>Wellness Directory →</button></li>
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
            <strong>Public Service Information Notice:</strong>
          </div>
          <p>
            UrbanSarkari is an independent public portal and verified local business intelligence directory. We are not officially affiliated with the Government of India, the Union Public Service Commission, State Public Service Commissions, or listed commercial institutes. Examination candidates are advised to verify details with official government gazettes. Local service listings, reviews, and estimates are aggregated from registered regional providers.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/exam-schedules')} style={{ color: 'inherit' }}>Sarkari Board</button>
              <button onClick={() => navigate('/home-services')} style={{ color: 'inherit' }}>Home Services</button>
              <button onClick={() => navigate('/coaching-institutes')} style={{ color: 'inherit' }}>Coaching Hub</button>
              <button onClick={() => navigate('/legal-tax-services')} style={{ color: 'inherit' }}>Legal & CA</button>
              <button onClick={() => navigate('/wellness-fitness')} style={{ color: 'inherit' }}>Wellness Hub</button>
              <button onClick={() => navigate('/admin')} style={{ color: 'var(--accent-indigo)', fontWeight: 800 }}>⚡ Admin Console</button>
            </div>
          </div>

          {/* AdSense Compliance Trust Links */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.75rem', borderTop: '1px solid var(--bg-card-border)', paddingTop: '0.75rem', fontSize: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/privacy-policy')} style={{ color: 'var(--text-muted)' }}>Privacy Policy</button>
              <button onClick={() => navigate('/terms-of-service')} style={{ color: 'var(--text-muted)' }}>Terms of Service</button>
              <button onClick={() => navigate('/about-us')} style={{ color: 'var(--text-muted)' }}>About Us</button>
              <button onClick={() => navigate('/contact-us')} style={{ color: 'var(--text-muted)' }}>Contact Us</button>
              <button onClick={() => navigate('/disclaimer')} style={{ color: 'var(--text-muted)' }}>Disclaimer</button>
            </div>
            <span style={{ color: 'var(--text-muted)' }}>© 2026 UrbanSarkari (India Public Data & Doorstep Services Portal). All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
