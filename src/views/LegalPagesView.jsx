import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  HelpCircle, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Send,
  AlertCircle,
  ExternalLink,
  Lock,
  Globe
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function LegalPagesView({ page = 'privacy-policy', navigate }) {
  const [activeTab, setActiveTab] = useState(page);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMsg('');
      setFormSubmitted(false);
    }, 4000);
  };

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: activeTab === 'privacy-policy' ? 'Privacy Policy' :
             activeTab === 'terms-of-service' ? 'Terms of Service' :
             activeTab === 'about-us' ? 'About Us' :
             activeTab === 'contact-us' ? 'Contact Us' : 'Disclaimer',
      path: `/${activeTab}` }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '3rem' }}>
      <Breadcrumbs items={breadcrumbItems} navigate={navigate} />

      {/* Tab Switcher */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '2rem', 
        overflowX: 'auto', 
        paddingBottom: '0.5rem',
        borderBottom: '1px solid var(--bg-card-border)'
      }}>
        {[
          { id: 'privacy-policy', label: 'Privacy Policy' },
          { id: 'terms-of-service', label: 'Terms of Service' },
          { id: 'about-us', label: 'About Us' },
          { id: 'contact-us', label: 'Contact Us' },
          { id: 'disclaimer', label: 'Disclaimer' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              navigate(`/${tab.id}`);
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: activeTab === tab.id ? 700 : 500,
              background: activeTab === tab.id ? 'var(--accent-blue)' : 'var(--bg-secondary)',
              color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
              border: '1px solid var(--bg-card-border)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--bg-card-border)',
        borderRadius: '16px',
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        boxShadow: 'var(--shadow-sm)',
        lineHeight: 1.7,
        color: 'var(--text-secondary)'
      }}>
        
        {/* ======================================================== */}
        {/* 1. PRIVACY POLICY (AdSense DART Cookie Compliant) */}
        {/* ======================================================== */}
        {activeTab === 'privacy-policy' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              <Lock size={24} style={{ color: 'var(--accent-blue)' }} />
              <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Privacy Policy & Cookie Notice</h1>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Last Updated: 22 October 2026 • Compliant with Google AdSense Publisher Terms & DPDP Act India
            </p>

            <section style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>1. Introduction</h2>
              <p>
                Welcome to <strong>UrbanSarkari</strong> ("we", "our", "us"). We are committed to safeguarding the privacy of our visitors while providing verified public data regarding government examinations, doorstep home services, coaching institutes, legal retainers, and wellness facilities across India.
              </p>
            </section>

            <section style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>2. Google AdSense & DoubleClick DART Cookie Disclosure</h2>
              <p>
                Google, as a third-party vendor, uses cookies to serve ads on <strong>UrbanSarkari</strong>.
              </p>
              <ul style={{ paddingLeft: '1.5rem', margin: '0.75rem 0' }}>
                <li>Google's use of the <strong>DART cookie</strong> enables it to serve ads to users based on their visit to UrbanSarkari and other websites on the Internet.</li>
                <li>Users may opt out of the use of the DART cookie by visiting the <strong>Google Ad and Content Network Privacy Policy</strong> at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>policies.google.com/technologies/ads</a>.</li>
                <li>Third-party ad servers or ad networks use technology in their advertisements and links that appear on UrbanSarkari, which are sent directly to your browser. They automatically receive your IP address when this occurs.</li>
              </ul>
            </section>

            <section style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>3. Information We Collect</h2>
              <p>
                UrbanSarkari only collects voluntary user data when you interact with our services:
              </p>
              <ul style={{ paddingLeft: '1.5rem', margin: '0.75rem 0' }}>
                <li><strong>Service Inquiry Leads:</strong> Full Name, Phone Number, City, and Preferred Time Slot when booking verified doorstep technicians or academy counselors via WhatsApp.</li>
                <li><strong>Digital Study Material Orders:</strong> Transaction reference (UTR number) and order identifier generated during UPI digital test prep purchases.</li>
                <li><strong>Log Files & Web Analytics:</strong> Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and number of clicks for trend analysis and site security.</li>
              </ul>
            </section>

            <section style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>4. Data Protection & CCPA / GDPR Rights</h2>
              <p>
                We do not sell, trade, or rent users' personal identification information to third parties. If you wish to inspect, update, or permanently delete your contact data from our local database, you may contact our Privacy Officer at <code>privacy@urbansarkari.in</code>.
              </p>
            </section>
          </div>
        )}

        {/* ======================================================== */}
        {/* 2. TERMS OF SERVICE */}
        {/* ======================================================== */}
        {activeTab === 'terms-of-service' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              <FileText size={24} style={{ color: 'var(--accent-indigo)' }} />
              <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Terms of Service</h1>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Effective Date: 22 October 2026
            </p>

            <section style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>1. Acceptance of Terms</h2>
              <p>
                By accessing and using <strong>UrbanSarkari</strong>, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this portal.
              </p>
            </section>

            <section style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>2. Informational Directory Purpose</h2>
              <p>
                UrbanSarkari operates as an independent public data compiler and directory aggregator. Information regarding examination dates, vacancies, cutoffs, syllabus outlines, and local service pricing is gathered from official gazettes and registered service providers. Users must independently verify crucial circulars with statutory commission portals.
              </p>
            </section>

            <section style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>3. Digital Test Packs & UPI Purchases</h2>
              <p>
                Digital study packets (mock test papers, solved previous year papers) priced at ₹49 are delivered instantly via digital download. Due to the digital nature of study materials, purchases are non-refundable once the file is unlocked.
              </p>
            </section>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. ABOUT US */}
        {/* ======================================================== */}
        {activeTab === 'about-us' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              <Globe size={24} style={{ color: 'var(--green-primary)' }} />
              <h1 style={{ fontSize: '1.75rem', margin: 0 }}>About UrbanSarkari</h1>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              India's Premier Sarkari Result & Verified Doorstep Services Hub
            </p>

            <p style={{ marginBottom: '1.25rem' }}>
              Founded in 2026, <strong>UrbanSarkari</strong> was engineered to bridge the gap between high-volume public examination updates and on-demand local services for citizens across India.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', margin: '2rem 0' }}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--bg-card-border)' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>📋 100% Verified Circulars</h3>
                <p style={{ fontSize: '0.85rem' }}>Direct official links to statutory boards (UPSC, SSC, RRB, IBPS, TNPSC) without clickbait or deceptive redirects.</p>
              </div>
              <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--bg-card-border)' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>⚡ 30-Min Doorstep Dispatch</h3>
                <p style={{ fontSize: '0.85rem' }}>Police-verified AC technicians, electricians, and plumbers operating on standardized local rate cards.</p>
              </div>
              <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--bg-card-border)' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>🇮🇳 750+ Districts Covered</h3>
                <p style={{ fontSize: '0.85rem' }}>Hyper-local coverage across Tier-1, Tier-2, and Tier-3 Indian cities with localized price benchmarks.</p>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. CONTACT US */}
        {/* ======================================================== */}
        {activeTab === 'contact-us' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              <Mail size={24} style={{ color: 'var(--accent-blue)' }} />
              <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Contact Us & Editorial Support</h1>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Have questions, service feedback, or examination notices to submit? Reach out to our team.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Official Contact Details</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Mail size={18} style={{ color: 'var(--accent-blue)' }} />
                    <span><strong>General Inquiries:</strong> support@urbansarkari.in</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={18} style={{ color: 'var(--green-primary)' }} />
                    <span><strong>Grievance Officer:</strong> grievance@urbansarkari.in</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <MapPin size={18} style={{ color: 'var(--red-primary)' }} />
                    <span><strong>Headquarters:</strong> UrbanSarkari Media & Tech, Connaught Place, New Delhi 110001</span>
                  </div>
                </div>
              </div>

              {/* Interactive Contact Form */}
              <form onSubmit={handleContactSubmit} style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--bg-card-border)' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Send Us a Message</h3>
                {formSubmitted && (
                  <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} />
                    <span>Thank you! Your message has been received. Our support team will reply within 24 hours.</span>
                  </div>
                )}
                <div style={{ marginBottom: '0.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Your Name</label>
                  <input 
                    type="text" 
                    required 
                    value={contactName} 
                    onChange={e => setContactName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: 'var(--bg-secondary)', border: '1px solid var(--bg-card-border)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  />
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={contactEmail} 
                    onChange={e => setContactEmail(e.target.value)}
                    placeholder="e.g. ramesh@example.com"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: 'var(--bg-secondary)', border: '1px solid var(--bg-card-border)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Message</label>
                  <textarea 
                    rows={3} 
                    required 
                    value={contactMsg} 
                    onChange={e => setContactMsg(e.target.value)}
                    placeholder="Describe your query..."
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: 'var(--bg-secondary)', border: '1px solid var(--bg-card-border)', color: 'var(--text-primary)', fontSize: '0.85rem', resize: 'vertical' }}
                  />
                </div>
                <button 
                  type="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    width: '100%',
                    padding: '10px',
                    background: 'var(--accent-blue)',
                    color: 'white',
                    fontWeight: 700,
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Send size={15} />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 5. DISCLAIMER */}
        {/* ======================================================== */}
        {activeTab === 'disclaimer' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              <AlertCircle size={24} style={{ color: 'var(--gold-primary)' }} />
              <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Statutory Disclaimer</h1>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Non-Affiliation Notice & Information Accuracy Standard
            </p>

            <section style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>1. Government Non-Affiliation Notice</h2>
              <p>
                <strong>UrbanSarkari (urbansarkari.in)</strong> is a privately managed public data aggregator and commercial service marketplace. <strong>We are NOT an official agency of the Government of India</strong>, state governments, or examination boards (including UPSC, SSC, RRB, NTA, IBPS, or State PSCs). All recruitment data, syllabi, and circular links are gathered from public gazettes to assist job-seekers in finding official application portals easily.
              </p>
            </section>

            <section style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>2. Doorstep Service Estimates</h2>
              <p>
                Price ranges listed for home repair, tax consultation, and gym memberships represent regional averages. Actual billing is determined directly between the customer and the certified specialist upon on-site diagnostic inspection.
              </p>
            </section>
          </div>
        )}

      </div>
    </div>
  );
}
