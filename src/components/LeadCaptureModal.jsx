import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Send,
  User,
  MapPin,
  Calendar,
  FileText
} from 'lucide-react';

export default function LeadCaptureModal({ 
  isOpen, 
  onClose, 
  service, 
  niche, 
  city, 
  provider 
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    locality: provider?.locality || '',
    preferredSlot: 'immediate',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadId, setLeadId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const cityName = city?.name || "Your City";
  const serviceName = service?.name || niche?.name || "Service";

  const getModalTitles = () => {
    switch (niche?.monetizationType) {
      case 'student-acquisition':
        return {
          title: `Apply for Free Counseling & Syllabus`,
          subtitle: `Get 2026 fee structure, scholarship test details & 1-on-1 counseling for ${cityName}`,
          ctaButton: "Book Free 1-on-1 Trial Class",
          iconBadge: "🎓 Admission Open 2026"
        };
      case 'retainer-lead':
        return {
          title: `Book Confidential Consultation`,
          subtitle: `Connect with a verified Advocate / Chartered Accountant in ${cityName}`,
          ctaButton: "Schedule Consultation Call",
          iconBadge: "⚖️ Confidential & Verified"
        };
      case 'subscription-ad':
        return {
          title: `Claim 1-Day Free Guest Pass`,
          subtitle: `Experience top facilities, trainer floor access & zero commitment in ${cityName}`,
          ctaButton: "Claim My Free Guest Pass",
          iconBadge: "🎟️ 100% Free Pass"
        };
      default: // lead-call / home-services
        return {
          title: `Get Instant Callback in 15 Mins`,
          subtitle: `Zero booking fee. Verified technician dispatched to your doorstep in ${cityName}`,
          ctaButton: "Send Instant Callback Request",
          iconBadge: "⚡ 30-Min Rapid Dispatch"
        };
    }
  };

  const meta = getModalTitles();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `GA-${Math.floor(100000 + Math.random() * 900000)}`;
      setLeadId(generatedId);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({ fullName: '', phone: '', locality: '', preferredSlot: 'immediate', notes: '' });
    onClose();
  };

  return (
    <div 
      className="inspector-drawer" 
      style={{ alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
      onClick={handleReset}
    >
      <div 
        className="glass-panel" 
        style={{ 
          width: '100%', 
          maxWidth: '520px', 
          background: 'var(--bg-secondary)', 
          padding: '2rem', 
          borderRadius: '16px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.3)',
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              background: niche?.bgColor || 'var(--accent-blue-light)', 
              color: niche?.color || 'var(--accent-blue)', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              padding: '3px 8px', 
              borderRadius: '4px',
              marginBottom: '0.4rem'
            }}>
              <Sparkles size={12} />
              <span>{meta.iconBadge}</span>
            </div>
            <h2 style={{ fontSize: '1.35rem', lineHeight: 1.3 }}>{meta.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              {meta.subtitle}
            </p>
          </div>
          <button 
            onClick={handleReset}
            style={{ color: 'var(--text-muted)', padding: '6px', borderRadius: '6px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Selected Service / Provider Banner */}
        <div style={{ 
          background: 'var(--bg-tertiary)', 
          border: '1px solid var(--bg-card-border)', 
          borderRadius: '10px', 
          padding: '0.75rem 1rem', 
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.85rem'
        }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Target Service: </span>
            <strong>{serviceName}</strong>
          </div>
          <div style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>
            📍 {cityName}
          </div>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {errorMsg && (
              <div style={{ 
                background: 'var(--red-bg)', 
                color: 'var(--red-primary)', 
                padding: '0.65rem 1rem', 
                borderRadius: '8px', 
                fontSize: '0.85rem' 
              }}>
                {errorMsg}
              </div>
            )}

            {/* Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Your Full Name <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-primary)', border: '1px solid var(--bg-card-border)', borderRadius: '8px', padding: '0.65rem 0.85rem' }}>
                <User size={16} style={{ color: 'var(--text-muted)' }} />
                <input 
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                10-Digit Mobile Number (For Call / WhatsApp Confirmation) <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-primary)', border: '1px solid var(--bg-card-border)', borderRadius: '8px', padding: '0.65rem 0.85rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-muted)' }}>+91</span>
                <input 
                  type="tel"
                  maxLength={10}
                  placeholder="98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            {/* Locality */}
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Your Neighborhood / Locality in {cityName}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-primary)', border: '1px solid var(--bg-card-border)', borderRadius: '8px', padding: '0.65rem 0.85rem' }}>
                <MapPin size={16} style={{ color: 'var(--text-muted)' }} />
                <input 
                  type="text"
                  placeholder={`e.g. ${provider?.locality || "Main Street / Area"}`}
                  value={formData.locality}
                  onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                  style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            {/* Preferred Slot */}
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Preferred Callback / Appointment Timing
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { id: 'immediate', label: '⚡ Urgent (15m)' },
                  { id: 'today', label: 'Today Evening' },
                  { id: 'weekend', label: 'Weekend / Later' }
                ].map(slot => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredSlot: slot.id })}
                    style={{
                      padding: '8px 4px',
                      fontSize: '0.78rem',
                      borderRadius: '6px',
                      border: formData.preferredSlot === slot.id 
                        ? `2px solid ${niche?.color || 'var(--accent-blue)'}` 
                        : '1px solid var(--bg-card-border)',
                      background: formData.preferredSlot === slot.id 
                        ? (niche?.bgColor || 'var(--accent-blue-light)') 
                        : 'var(--bg-primary)',
                      color: formData.preferredSlot === slot.id 
                        ? (niche?.color || 'var(--accent-blue)') 
                        : 'var(--text-primary)',
                      fontWeight: 600
                    }}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Points */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.25rem 0' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} style={{ color: 'var(--green-primary)' }} /> Zero Spam Call Policy
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} style={{ color: 'var(--accent-blue)' }} /> 30-Day Guarantee
              </span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                marginTop: '0.5rem',
                padding: '12px',
                borderRadius: '8px',
                background: niche?.color || 'var(--accent-blue)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              {isSubmitting ? (
                <span>Dispatching Your Request...</span>
              ) : (
                <>
                  <span>{meta.ctaButton}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Success Screen */
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '50%', 
              background: 'var(--green-bg)', 
              color: 'var(--green-primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 1rem' 
            }}>
              <CheckCircle2 size={32} />
            </div>

            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.35rem' }}>Request Confirmed!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Your verified enquiry has been dispatched. A verified specialist in <strong>{cityName}</strong> is reviewing your request.
            </p>

            <div style={{ 
              background: 'var(--bg-tertiary)', 
              borderRadius: '8px', 
              padding: '1rem', 
              marginBottom: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.85rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Lead Tracking ID:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>{leadId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Customer Name:</span>
                <strong>{formData.fullName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Contact:</span>
                <strong>+91 {formData.phone}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Expected Response:</span>
                <span style={{ color: 'var(--green-primary)', fontWeight: 600 }}>Within 15 minutes</span>
              </div>
            </div>

            {/* Direct Call Hotlink */}
            {provider?.phoneCall && (
              <a
                href={provider.phoneCall}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'var(--green-primary)',
                  color: 'white',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  marginBottom: '1rem'
                }}
              >
                <Phone size={16} />
                <span>Call {provider.name} Directly</span>
              </a>
            )}

            <button
              onClick={handleReset}
              style={{
                background: 'transparent',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Done & Return to Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
