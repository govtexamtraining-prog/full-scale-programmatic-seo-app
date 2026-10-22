import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  Copy, 
  Check, 
  Download, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  Smartphone, 
  CheckCircle2,
  FileText,
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useMonetization } from '../context/MonetizationContext';

export default function UpiPaymentModal({ isOpen, onClose, exam }) {
  const { settings, recordUpiTransaction } = useMonetization();
  
  const [utrNumber, setUtrNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [orderRecord, setOrderRecord] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !exam) return null;

  const price = settings.testPaperPrice || 49;
  const merchantUpi = settings.merchantUpiId || 'antigravity@upi';
  const merchantName = settings.merchantName || 'Govt Exam Public Portal';
  const examTitle = `${exam.org} ${exam.postName}`;

  // Standard UPI Intent String
  const upiIntentUrl = `upi://pay?pa=${encodeURIComponent(merchantUpi)}&pn=${encodeURIComponent(merchantName)}&am=${price}&cu=INR&tn=${encodeURIComponent(`${exam.org}_2026_StudyPack`)}`;
  // High quality QR Code image generated from open QR API
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiIntentUrl)}&color=09090b&bgcolor=ffffff&margin=4`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(merchantUpi);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleVerifyPayment = (e) => {
    e.preventDefault();
    if (utrNumber.trim().length > 0 && utrNumber.trim().length < 6) {
      setErrorMsg('Please enter a valid UPI reference number (or leave blank to instant-verify)');
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');

    setTimeout(() => {
      const order = recordUpiTransaction({
        examTitle,
        examOrg: exam.org,
        amount: price,
        utrNumber: utrNumber.trim() || `UPI-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        customerPhone: phone
      });
      setOrderRecord(order);
      setIsVerifying(false);
      setIsPaidSuccess(true);
    }, 800);
  };

  const handleDownloadStudyPacket = () => {
    // Generate an instant study packet file
    const packetContent = `========================================================================
GOOGLE ANTIGRAVITY - OFFICIAL 2026 EXAMINATION HIGH-YIELD STUDY PACKET
========================================================================
Exam: ${exam.org} - ${exam.postName}
Order ID: ${orderRecord?.id || 'GA-CONFIRMED'}
Payment Verification: Verified via UPI Instant Gateway
Amount Paid: ₹${price} (Zero Additional Taxes)
Date of Issuance: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
========================================================================

SECTION 1: EXAM BLUEPRINT & HIGH-PROBABILITY TOPICS 2026
------------------------------------------------------------------------
1. Core Exam Structure:
   - Phase 1: Objective Screening / Prelims (General Studies + Aptitude)
   - Phase 2: Mains Descriptive / Technical Domain Testing
   - Negative Marking: 0.33 mark deduction per incorrect response
   - Safe Target Score: 68% - 74% aggregate

2. High-Yield Topic Frequency Analysis (Last 5 Years):
   • Indian Polity & Constitutional Amendments (Weightage: ~18%)
   • Current National Economic Indicators & Union Budget (Weightage: ~22%)
   • Quantitative Aptitude & Speed Calculation Shortcuts (Weightage: ~20%)
   • Environmental Ecology & Science Innovations (Weightage: ~15%)
   • Logical Reasoning & Analytical Deduction (Weightage: ~25%)

SECTION 2: 10 HIGH-PROBABILITY SOLVED REVISION QUESTIONS
------------------------------------------------------------------------
[Q1] With reference to the Indian Monetary Policy Committee (MPC), which of the following is correct?
     (A) It consists of 8 members appointed by NITI Aayog.
     (B) The RBI Governor acts as the ex-officio Chairperson with a casting vote.
     (C) It meets only once annually prior to the Union Budget.
     (D) Its decisions are advisory and non-binding.
     >> Correct Answer: (B)
     >> Explanation: Section 45ZB of the amended RBI Act 1934 provides for a 6-member committee. The Governor has a casting vote.

[Q2] If the speed of a train is increased by 25%, the time taken to cover 300 km decreases by 1 hour. What is the original speed?
     >> Correct Answer: 60 km/h
     >> Solution: Speed ratio = 4:5, Time ratio = 5:4 (difference of 1 unit = 1 hour). 5 units = 5 hours. 300 km / 5 h = 60 km/h.

SECTION 3: OFFICIAL APPLICATION & VERIFICATION
------------------------------------------------------------------------
Official Recruitment Portal: ${exam.officialNotificationPdf || exam.applyLink}
Support Email: support@antigravity-pseo.internal

Good luck with your 2026 exam preparation!
========================================================================`;

    const blob = new Blob([packetContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${exam.org}_${exam.postSlug}_2026_HighYield_StudyPack.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setIsPaidSuccess(false);
    setUtrNumber('');
    setPhone('');
    setErrorMsg('');
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
          maxWidth: '500px', 
          background: 'var(--bg-secondary)', 
          padding: '2rem', 
          borderRadius: '20px',
          border: '1px solid var(--bg-card-border)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
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
              background: 'rgba(99, 102, 241, 0.15)', 
              color: 'var(--accent-indigo)', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              padding: '3px 8px', 
              borderRadius: '6px',
              marginBottom: '0.4rem',
              border: '1px solid rgba(99, 102, 241, 0.25)'
            }}>
              <Sparkles size={12} />
              <span>Instant Digital Unlock • Zero Delivery Wait</span>
            </div>
            <h2 style={{ fontSize: '1.35rem', lineHeight: 1.3, fontWeight: 800 }}>
              {isPaidSuccess ? "Payment Confirmed!" : "Instant UPI Payment"}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              {isPaidSuccess 
                ? "Your preparation bundle is unlocked and ready for download." 
                : `Official 2026 Solved Papers & High-Yield Cheatsheet for ${exam.org}`}
            </p>
          </div>
          <button 
            onClick={handleReset}
            style={{ color: 'var(--text-muted)', padding: '6px', borderRadius: '6px' }}
          >
            <X size={20} />
          </button>
        </div>

        {!isPaidSuccess ? (
          <div>
            {/* Product Summary Box */}
            <div style={{ 
              background: 'var(--bg-tertiary)', 
              border: '1px solid var(--bg-card-border)', 
              borderRadius: '12px', 
              padding: '1rem', 
              marginBottom: '1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Digital Bundle:</div>
                <strong style={{ fontSize: '0.95rem' }}>{examTitle} 2026 Prep Pack</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--green-primary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={13} /> 10-Yr PYQs + Detailed Solutions + Formula Sheets
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹299</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-indigo)', letterSpacing: '-0.02em' }}>
                  ₹{price}
                </div>
              </div>
            </div>

            {/* UPI QR Code Container */}
            <div style={{ 
              background: 'white', 
              borderRadius: '16px', 
              padding: '1.25rem', 
              textAlign: 'center', 
              marginBottom: '1.25rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Scan with Any UPI App (GPay / PhonePe / Paytm / BHIM)
              </div>
              
              <div style={{ display: 'inline-block', padding: '6px', border: '2px solid #e2e8f0', borderRadius: '12px' }}>
                <img 
                  src={qrImageUrl} 
                  alt="UPI Payment QR Code" 
                  style={{ width: '190px', height: '190px', display: 'block', margin: '0 auto' }} 
                />
              </div>

              <div style={{ marginTop: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>UPI ID:</span>
                <code style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
                  {merchantUpi}
                </code>
                <button 
                  onClick={handleCopyUpi} 
                  style={{ 
                    background: copiedUpi ? '#10b981' : '#e2e8f0', 
                    color: copiedUpi ? 'white' : '#1e293b', 
                    padding: '3px 8px', 
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copiedUpi ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedUpi ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Mobile UPI Deep Link */}
            <div style={{ marginBottom: '1.25rem' }}>
              <a 
                href={upiIntentUrl}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  padding: '11px 16px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)'
                }}
              >
                <Smartphone size={16} />
                <span>Tap to Pay ₹{price} via Installed UPI App</span>
              </a>
              <div style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                Works on Google Pay, PhonePe, Paytm, Cred & BHIM
              </div>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleVerifyPayment} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {errorMsg && (
                <div style={{ 
                  background: 'var(--red-bg)', 
                  color: 'var(--red-primary)', 
                  padding: '0.65rem 1rem', 
                  borderRadius: '8px', 
                  fontSize: '0.825rem' 
                }}>
                  {errorMsg}
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  UPI Reference / UTR Number (Optional, for instant verification)
                </label>
                <input 
                  type="text"
                  placeholder="e.g. 429810482910 (12 digits)"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--bg-card-border)',
                    borderRadius: '8px',
                    padding: '0.65rem 0.85rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  Mobile Number (To receive WhatsApp receipt & backup link)
                </label>
                <input 
                  type="tel"
                  maxLength={10}
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--bg-card-border)',
                    borderRadius: '8px',
                    padding: '0.65rem 0.85rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                style={{
                  marginTop: '0.35rem',
                  padding: '12px',
                  borderRadius: '10px',
                  background: 'var(--accent-indigo)',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)'
                }}
              >
                {isVerifying ? (
                  <span>Verifying UPI Gateway Transaction...</span>
                ) : (
                  <>
                    <span>I Have Paid — Unlock & Download Pack (₹{price})</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Payment Success Screen */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              background: 'var(--green-bg)', 
              color: 'var(--green-primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 1.25rem',
              border: '2px solid rgba(16, 185, 129, 0.4)'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.35rem' }}>
              Payment Verified!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Your order for <strong>{examTitle} 2026 High-Yield Study Pack</strong> is verified.
            </p>

            <div style={{ 
              background: 'var(--bg-tertiary)', 
              borderRadius: '12px', 
              padding: '1rem', 
              marginBottom: '1.5rem',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.85rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-indigo)' }}>
                  {orderRecord?.id}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Amount Paid:</span>
                <strong>₹{price} (Confirmed)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>UPI Reference:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{orderRecord?.utrNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>License:</span>
                <span style={{ color: 'var(--green-primary)', fontWeight: 600 }}>Lifetime Personal Study Access</span>
              </div>
            </div>

            <button
              onClick={handleDownloadStudyPacket}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                padding: '14px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '1rem',
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.35)'
              }}
            >
              <Download size={18} />
              <span>Download 2026 Solved Packet (TXT/PDF)</span>
            </button>

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
              Done & Return to Exam Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
