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
  MessageCircle,
  FileText
} from 'lucide-react';
import { useMonetization } from '../context/MonetizationContext';

export default function LeadCaptureModal({ 
  isOpen, 
  onClose, 
  service, 
  niche, 
  city, 
  provider 
}) {
  const { addLead, settings } = useMonetization();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    locality: provider?.locality || '',
    preferredSlot: 'immediate',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadResult, setLeadResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const cityName = city?.name || "Your City";
  const stateName = city?.state || "India";
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
          title: `Book Instant Doorstep Service`,
          subtitle: `Zero booking advance. Verified specialist dispatched to your doorstep in ${cityName}`,
          ctaButton: "Confirm & Request Callback",
          iconBadge: "⚡ 15-Min Rapid Callback"
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
      // Save lead to shared database & generate WhatsApp payload
      const result = addLead({
        fullName: formData.fullName,
        phone: formData.phone,
        locality: formData.locality || cityName,
        city: cityName,
        state: stateName,
        service: serviceName,
        niche: niche?.slug || 'home-services',
        slot: formData.preferredSlot,
        notes: formData.notes
      });

      setLeadResult(result);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 500);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({ fullName: '', phone: '', locality: '', preferredSlot: 'immediate', notes: '' });
    setErrorMsg('');
    setLeadResult(null);
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
          borderRadius: '20px',
          border: '1px solid var(--bg-card-border)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
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
              background: niche?.bgColor || 'rgba(99, 102, 241, 0.15)', 
              color: niche?.color || 'var(--accent-indigo)', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              padding: '3px 8px', 
              borderRadius: '6px',
              marginBottom: '0.4rem',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <Sparkles size={12} />
              <span>{meta.iconBadge}</span>
            </div>
            <h2 style={{ fontSize: '1.35rem', lineHeight: 1.3, fontWeight: 800 }}>{meta.title}</h2>
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
          marginBottom: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.85rem'
        }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Target Service: </span>
            <strong>{serviceName}</strong>
          </div>
          <div style={{ color: 'var(--accent-indigo)', fontWeight: 600 }}>
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
                Your Full Name <span style={{ color: '#f43f5e' }}>*</span>
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
                10-Digit Mobile Number (For Call & WhatsApp Confirmation) <span style={{ color: '#f43f5e' }}>*</span>
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
                Preferred Callback Timing
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
                      borderRadius: '8px',
                      border: formData.preferredSlot === slot.id 
                        ? `2px solid ${niche?.color || 'var(--accent-indigo)'}` 
                        : '1px solid var(--bg-card-border)',
                      background: formData.preferredSlot === slot.id 
                        ? (niche?.bgColor || 'rgba(99, 102, 241, 0.15)') 
                        : 'var(--bg-primary)',
                      color: formData.preferredSlot === slot.id 
                        ? (niche?.color || 'var(--accent-indigo)') 
                        : 'var(--text-primary)',
                      fontWeight: 600
                    }}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Specific Requirement / Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Describe your issue or questions (e.g. 1.5 ton split AC, or need fee details)..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                style={{
                  width: '100%',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--bg-card-border)',
                  borderRadius: '8px',
                  padding: '0.65rem 0.85rem',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  resize: 'none'
                }}
              />
            </div>

            {/* Trust Points */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} style={{ color: 'var(--green-primary)' }} /> Zero Spam Policy
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} style={{ color: 'var(--accent-indigo)' }} /> Fast Verified Response
              </span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                marginTop: '0.5rem',
                padding: '13px',
                borderRadius: '10px',
                background: niche?.color || 'var(--accent-indigo)',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.95rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
              }}
            >
              {isSubmitting ? (
                <span>Routing to Verified Specialist...</span>
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
          <div style={{ textAlign: 'center', padding: '1.25rem 0' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%', 
              background: 'var(--green-bg)', 
              color: 'var(--green-primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 1.25rem',
              border: '2px solid rgba(16, 185, 129, 0.4)'
            }}>
              <CheckCircle2 size={34} />
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.35rem' }}>Request Confirmed!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              Your enquiry has been dispatched. A verified specialist in <strong>{cityName}</strong> is reviewing your ticket.
            </p>

            <div style={{ 
              background: 'var(--bg-tertiary)', 
              borderRadius: '12px', 
              padding: '1rem', 
              marginBottom: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.85rem',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Lead Tracking ID:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-indigo)' }}>
                  {leadResult?.leadId}
                </strong>
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
                <span style={{ color: 'var(--text-muted)' }}>Expected Callback:</span>
                <span style={{ color: 'var(--green-primary)', fontWeight: 600 }}>Within 15 minutes</span>
              </div>
            </div>

            {/* Direct WhatsApp Hotlink */}
            {leadResult?.waUrl && (
              <a
                href={leadResult.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#25D366',
                  color: 'white',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  marginBottom: '1rem',
                  boxShadow: '0 4px 16px rgba(37, 211, 102, 0.35)'
                }}
              >
                <MessageCircle size={18} />
                <span>Open Instant Chat on WhatsApp</span>
              </a>
            )}

            {/* Direct Call Hotlink */}
            {provider?.phoneCall && (
              <a
                href={provider.phoneCall}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--bg-card-border)',
                  color: 'var(--text-primary)',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  marginBottom: '1rem'
                }}
              >
                <Phone size={15} />
                <span>Call {provider.name} Directly (+91)</span>
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
              Done & Return to Directory
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
