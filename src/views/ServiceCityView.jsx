import React, { useState } from 'react';
import { 
  Wrench, 
  GraduationCap, 
  Briefcase, 
  HeartPulse, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Star, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  MapPin, 
  ArrowRight,
  ExternalLink,
  Zap,
  Info
} from 'lucide-react';
import { getNicheBySlug, getServiceBySlugs, getVerifiedProvidersForCity } from '../data/servicesData';
import { getCityBySlugs, getStateBySlug } from '../data/cities';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import LeadCaptureModal from '../components/LeadCaptureModal';

export default function ServiceCityView({ 
  nicheSlug, 
  serviceSlug = null, 
  stateSlug, 
  citySlug, 
  navigate 
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const niche = getNicheBySlug(nicheSlug);
  const city = getCityBySlugs(stateSlug, citySlug);
  const state = getStateBySlug(stateSlug);

  // If serviceSlug is provided, find exact service; else default to the primary service of this niche
  const service = serviceSlug 
    ? getServiceBySlugs(nicheSlug, serviceSlug) 
    : niche?.services[0];

  if (!niche || !city) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div style={{ background: 'var(--red-bg)', color: 'var(--red-primary)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
          <AlertCircle size={24} />
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Service Directory Hub Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          We could not locate <code>{nicheSlug}/{citySlug}</code>.
        </p>
        <button 
          onClick={() => navigate('/services')}
          style={{ background: 'var(--accent-blue)', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: 600 }}
        >
          View All Services Directory
        </button>
      </div>
    );
  }

  const cityName = city.name;
  const stateName = city.stateName || state?.stateName || "India";
  const serviceName = service ? service.name : niche.name;
  const shortServiceName = service ? service.shortName : niche.shortName;

  // Generate verified local providers
  const providers = getVerifiedProvidersForCity(cityName, city.slug, shortServiceName, niche.id);

  const handleOpenLeadModal = (provider = null) => {
    setSelectedProvider(provider);
    setIsModalOpen(true);
  };

  const getIcon = (iconName, color) => {
    const props = { size: 24, style: { color } };
    switch (iconName) {
      case 'Wrench': return <Wrench {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'HeartPulse': return <HeartPulse {...props} />;
      default: return <Wrench {...props} />;
    }
  };

  // Breadcrumbs
  const breadcrumbItems = [
    { label: "India Services", path: "/services" },
    { label: niche.shortName, path: `/${niche.slug}` },
    { label: `${cityName}`, path: `/${niche.slug}/${city.stateSlug}/${city.slug}` }
  ];
  if (service && serviceSlug) {
    breadcrumbItems.push({ 
      label: service.shortName, 
      path: `/${niche.slug}/${service.slug}/${city.stateSlug}/${city.slug}` 
    });
  }

  // Sibling services in this niche
  const siblingServices = niche.services.filter(s => s.slug !== service?.slug);

  // Neighboring cities
  const neighborSlugs = city.neighbors || [];
  const neighborCities = neighborSlugs.map(nSlug => {
    return {
      slug: nSlug,
      name: nSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    };
  });

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} navigate={navigate} />

      <AdSlot slotType="leaderboard" slotId="service-city-top-ad" />

      {/* HERO SECTION */}
      <div style={{ 
        background: 'var(--bg-secondary)', 
        border: '1px solid var(--bg-card-border)', 
        borderRadius: '16px', 
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.65rem' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '8px', 
                background: niche.bgColor, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                {getIcon(niche.iconName, niche.color)}
              </div>
              <span style={{ 
                background: niche.bgColor, 
                color: niche.color, 
                fontWeight: 700, 
                fontSize: '0.78rem', 
                padding: '2px 8px', 
                borderRadius: '4px' 
              }}>
                {niche.shortName} • {cityName}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                📍 {cityName}, {stateName}
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', lineHeight: 1.25, marginBottom: '0.75rem' }}>
              {serviceName} in {cityName}
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '780px', lineHeight: 1.6 }}>
              Looking for top-rated, certified <strong>{shortServiceName}</strong> in {cityName}? Compare verified local specialists, transparent rate cards, and book immediate service or free counseling with a 30-day guarantee.
            </p>

            {/* Key Trust Badges */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '1rem', 
              marginTop: '1.25rem',
              fontSize: '0.825rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} style={{ color: 'var(--green-primary)' }} />
                <span><strong>100%</strong> Verified Pros</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} style={{ color: 'var(--accent-blue)' }} />
                <span><strong>{service?.avgResponseTime || '30 Mins'}</strong> Response</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Star size={16} style={{ color: 'var(--gold-primary)' }} />
                <span><strong>{service?.satisfactionRate || '98.5%'}</strong> Rating ({service?.reviewsCount || '300'}+ reviews)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={16} style={{ color: niche.color }} />
                <span><strong>{service?.basePriceRange || 'Best Market Rate'}</strong></span>
              </div>
            </div>
          </div>

          {/* Instant Call / Lead Action Box */}
          <div style={{ 
            background: 'var(--bg-tertiary)', 
            border: '1px solid var(--bg-card-border)', 
            borderRadius: '12px', 
            padding: '1.5rem',
            minWidth: '260px',
            maxWidth: '320px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: niche.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ⚡ Instant Booking & Callback
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>
              {niche.monetizationType === 'student-acquisition' 
                ? "Admissions Open 2026" 
                : niche.monetizationType === 'subscription-ad'
                ? "Free Guest Pass Ready"
                : "Doorstep Pro Ready"}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Technicians & counselors active in {cityName} right now.
            </p>

            <button
              onClick={() => handleOpenLeadModal(providers[0])}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: niche.color,
                color: 'white',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.95rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <span>{niche.ctaPrimary}</span>
              <ArrowRight size={16} />
            </button>

            {providers[0]?.phoneCall && (
              <a
                href={providers[0].phoneCall}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--bg-card-border)',
                  padding: '9px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  textDecoration: 'none'
                }}
              >
                <Phone size={14} style={{ color: 'var(--green-primary)' }} />
                <span>Call {providers[0].phoneDisplay}</span>
              </a>
            )}

            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              🔒 Zero spam • Free consultation
            </div>
          </div>
        </div>
      </div>

      {/* VERIFIED LOCAL PROVIDERS LIST */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={22} style={{ color: 'var(--green-primary)' }} />
              <span>Verified {shortServiceName} Specialists in {cityName}</span>
            </h2>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Government ID verified, background-checked and customer-rated professionals serving {cityName} localities
            </p>
          </div>
          <span style={{ fontSize: '0.78rem', background: 'var(--green-bg)', color: 'var(--green-primary)', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
            ● {providers.length} Verified Available
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {providers.map((pro, index) => (
            <div 
              key={pro.id}
              className="glass-panel"
              style={{ 
                padding: '1.5rem', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                borderLeft: index === 0 ? `4px solid ${niche.color}` : undefined
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{pro.businessName}</h3>
                      <span title="Verified Professional" style={{ color: 'var(--accent-blue)', display: 'inline-flex' }}>
                        <CheckCircle2 size={16} fill="var(--accent-blue-light)" />
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <MapPin size={13} />
                      <span>{pro.locality}, {cityName} ({pro.yearsInBusiness} yrs in service)</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--gold-bg)', color: 'var(--gold-primary)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700, fontSize: '0.825rem' }}>
                      <Star size={12} fill="currentColor" />
                      <span>{pro.rating}</span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {pro.reviewsCount} ratings
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', margin: '0.75rem 0' }}>
                  {pro.badges.map((b, bIdx) => (
                    <span 
                      key={bIdx}
                      style={{ 
                        fontSize: '0.7rem', 
                        background: 'var(--bg-tertiary)', 
                        padding: '2px 7px', 
                        borderRadius: '4px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Operating: {pro.openHours} • Instant Doorstep Support
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <a
                  href={pro.phoneCall}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    background: 'var(--green-primary)',
                    color: 'white',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textDecoration: 'none'
                  }}
                >
                  <Phone size={14} />
                  <span>Call Pro</span>
                </a>

                <button
                  onClick={() => handleOpenLeadModal(pro)}
                  style={{
                    flex: 1.2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    background: niche.color,
                    color: 'white',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span>{niche.ctaSecondary}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICE RATE CARD & PRICE MATRIX (Crucial for Google Ranking & Featured Snippets) */}
      {service && service.rateCard && (
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={20} style={{ color: niche.color }} />
                <span>{service.name} Standard Rate Card in {cityName} (2026)</span>
              </h2>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Transparent pricing chart for residential, educational, and commercial services in {cityName}
              </p>
            </div>
            <span style={{ fontSize: '0.75rem', background: 'var(--bg-tertiary)', padding: '4px 10px', borderRadius: '4px' }}>
              Standard Market Rates
            </span>
          </div>

          <div className="data-table-wrapper" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Service Module / Scope</th>
                  <th>Estimated Price in {cityName}</th>
                  <th>Typical Duration</th>
                  <th>Warranty / Assurance</th>
                  <th>Book Now</th>
                </tr>
              </thead>
              <tbody>
                {service.rateCard.map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700 }}>{item.service}</td>
                    <td>
                      <span style={{ fontWeight: 800, color: 'var(--green-primary)', fontSize: '0.95rem' }}>
                        {item.price}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.duration}</td>
                    <td>
                      <span style={{ background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 600 }}>
                        {item.warranty || 'Verified Workmanship'}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleOpenLeadModal()}
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          background: niche.color,
                          color: 'white',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <span>Select</span>
                        <ArrowRight size={11} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* MID-CONTENT ADVERTISEMENT */}
      <AdSlot slotType="mpu" slotId="service-city-mid-ad" />

      {/* WHY CHOOSE VERIFIED EXPERTS IN CITY */}
      <section className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Info size={20} style={{ color: 'var(--accent-blue)' }} />
          <span>Why Choose Verified {shortServiceName} via Google Antigravity in {cityName}?</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', fontSize: '0.875rem' }}>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
              1. 100% Background Checked Local Pros
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Every partner listed in {cityName} undergoes Aadhaar, police background verification, and trade qualification audits before taking customer calls.
            </p>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
              2. Fixed Transparent Pricing (No Hidden Surcharges)
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Never haggle over rates. All services follow our standardized {cityName} rate card with digital invoices and genuine manufacturer spare parts.
            </p>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
              3. 30-Day Post-Service Guarantee
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              If any repaired part malfunctions or you encounter recurring issues within 30 days, we dispatch a technician for free re-inspection.
            </p>
          </div>
        </div>
      </section>

      {/* DYNAMIC FAQ ACCORDION (Google FAQPage Schema Target) */}
      {service && service.faqs && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
            Frequently Asked Questions: {shortServiceName} in {cityName}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Common questions regarding charges, guarantees, and service timings in {cityName}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              const question = faq.q.replace(/{city}/g, cityName);
              const answer = faq.a.replace(/{city}/g, cityName);

              return (
                <div 
                  key={idx}
                  className="glass-panel"
                  style={{ 
                    padding: '1.25rem', 
                    cursor: 'pointer',
                    border: isOpen ? `1px solid ${niche.color}` : '1px solid var(--bg-card-border)'
                  }}
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {question}
                    </h3>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                  {isOpen && (
                    <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* HYPER-LOCAL CROSSLINKING */}
      <section className="crosslink-section">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>
          Other Verified Services in {cityName}
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Internal semantic links designed for maximum search crawler discovery across {cityName}
        </p>

        <div className="crosslink-grid" style={{ marginBottom: '1.5rem' }}>
          {siblingServices.map(sib => (
            <button
              key={sib.slug}
              className="crosslink-chip"
              onClick={() => navigate(`/${niche.slug}/${sib.slug}/${city.stateSlug}/${city.slug}`)}
            >
              <span>{sib.name} in {cityName}</span>
              <ArrowRight size={13} />
            </button>
          ))}
          <button
            className="crosslink-chip"
            onClick={() => navigate(`/fuel-prices/${city.stateSlug}/${city.slug}`)}
          >
            <span>{cityName} Daily Fuel Price</span>
            <ArrowRight size={13} />
          </button>
          <button
            className="crosslink-chip"
            onClick={() => navigate(`/gold-rates/${city.stateSlug}/${city.slug}`)}
          >
            <span>{cityName} Live 22K Gold Rate</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Neighboring cities */}
        {neighborCities.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              {shortServiceName} in Nearby Cities ({stateName})
            </h3>
            <div className="crosslink-grid">
              {neighborCities.map(nc => (
                <button
                  key={nc.slug}
                  className="crosslink-chip"
                  onClick={() => navigate(`/${niche.slug}/${service?.slug || 'all'}/${city.stateSlug}/${nc.slug}`)}
                >
                  <MapPin size={12} style={{ color: 'var(--accent-blue)' }} />
                  <span>{shortServiceName} in {nc.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={service}
        niche={niche}
        city={city}
        provider={selectedProvider}
      />
    </div>
  );
}
