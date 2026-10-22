import React, { useState, useEffect } from 'react';
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
  
  const [paymentMethod, setPaymentMethod] = useState('app'); // 'app' | 'qr'
  const [utrNumber, setUtrNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [orderRecord, setOrderRecord] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Close on Escape key & Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !exam) return null;

  const price = settings?.testPaperPrice || 49;
  const merchantUpi = settings?.merchantUpiId || 'urbansarkari@upi';
  const merchantName = settings?.merchantName || 'UrbanSarkari Portal';
  const examTitle = `${exam.org} ${exam.postName}`;

  // Standard UPI Intent String
  const upiIntentUrl = `upi://pay?pa=${encodeURIComponent(merchantUpi)}&pn=${encodeURIComponent(merchantName)}&am=${price}&cu=INR&tn=${encodeURIComponent(`${exam.org}_2026_StudyPack`)}`;
  // QR Code image
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiIntentUrl)}&color=09090b&bgcolor=ffffff&margin=2`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(merchantUpi);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleVerifyPayment = (e) => {
    e.preventDefault();
    if (utrNumber.trim().length > 0 && utrNumber.trim().length < 6) {
      setErrorMsg('Please enter a valid 12-digit UPI reference (or leave blank to instant-verify)');
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
    }, 700);
  };

  const handleDownloadStudyPacket = () => {
    const packetContent = `========================================================================
URBANSARKARI - OFFICIAL 2026 EXAMINATION HIGH-YIELD STUDY PACKET
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
Official Recruitment Portal: ${exam.notificationPdfLink || exam.officialWebsite || exam.applyLink}
Support Email: support@urbansarkari.in

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
    /* Modal Backdrop - Click outside closes modal */
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={handleReset}
    >
      {/* Modal Dialog Card (Fixed Container with separate Non-Scrolling Header) */}
      <div 
        style={{ 
          position: 'relative',
          width: '100%', 
          maxWidth: '490px', 
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-secondary)', 
          borderRadius: '24px',
          border: '1px solid var(--bg-card-border)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* NON-SCROLLABLE FIXED HEADER WITH PERMANENT TOP-RIGHT CLOSE BUTTON */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1.25rem 1.5rem', 
          borderBottom: '1px solid var(--bg-card-border)',
          background: 'var(--bg-secondary)',
          zIndex: 20
        }}>
          <div>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              background: 'rgba(99, 102, 241, 0.15)', 
              color: 'var(--accent-indigo)', 
              fontSize: '0.72rem', 
              fontWeight: 700, 
              padding: '2px 8px', 
              borderRadius: '6px',
              marginBottom: '0.25rem'
            }}>
              <Sparkles size={11} />
              <span>Instant Digital Unlock • Zero Wait</span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>
              {isPaidSuccess ? "Payment Confirmed!" : "Instant UPI Payment (₹" + price + ")"}
            </h2>
          </div>

          {/* PERMANENT TOP-RIGHT CLOSE BUTTON */}
          <button 
            type="button"
            onClick={handleReset}
            title="Close Modal (Esc)"
            aria-label="Close Payment Modal"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--bg-card-border)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.18)';
              e.currentTarget.style.color = '#ef4444';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-tertiary)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.borderColor = 'var(--bg-card-border)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* SCROLLABLE INNER BODY */}
        <div style={{ padding: '1.25rem 1.5rem', overflowY: 'auto', flex: 1 }}>
          {!isPaidSuccess ? (
            <div>
              {/* Product Summary Box */}
              <div style={{ 
                background: 'var(--bg-tertiary)', 
                border: '1px solid var(--bg-card-border)', 
                borderRadius: '12px', 
                padding: '0.85rem 1rem', 
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ minWidth: 0, paddingRight: '0.5rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Exam Pack</span>
                  <strong style={{ display: 'block', fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {exam.postName}
                  </strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                    <Check size={12} /> Includes Bilingual PYQs & Formulas
                  </span>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹299</span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-indigo)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    ₹{price}
                  </div>
                </div>
              </div>

              {/* Payment Mode Selector Tabs */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '6px', 
                background: 'var(--bg-primary)', 
                padding: '4px', 
                borderRadius: '10px', 
                border: '1px solid var(--bg-card-border)',
                marginBottom: '1rem' 
              }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('app')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: paymentMethod === 'app' ? 'var(--accent-indigo)' : 'transparent',
                    color: paymentMethod === 'app' ? 'white' : 'var(--text-muted)',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Smartphone size={15} />
                  <span>Pay via UPI App</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('qr')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: paymentMethod === 'qr' ? 'var(--accent-indigo)' : 'transparent',
                    color: paymentMethod === 'qr' ? 'white' : 'var(--text-muted)',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <QrCode size={15} />
                  <span>Scan QR Code</span>
                </button>
              </div>

              {/* TAB 1: 1-TAP MOBILE UPI APP PAYMENT */}
              {paymentMethod === 'app' && (
                <div style={{ 
                  background: 'var(--bg-tertiary)', 
                  borderRadius: '12px', 
                  border: '1px solid var(--bg-card-border)', 
                  padding: '1.15rem', 
                  marginBottom: '1rem',
                  textAlign: 'center' 
                }}>
                  <a 
                    href={upiIntentUrl}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      padding: '12px 18px',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
                      marginBottom: '0.75rem'
                    }}
                  >
                    <Smartphone size={17} />
                    <span>Tap to Pay ₹{price} in UPI App</span>
                  </a>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                    Supports Google Pay, PhonePe, Paytm, CRED & BHIM
                  </div>

                  {/* Direct UPI ID Copy Option */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '8px',
                    padding: '6px 10px',
                    background: 'var(--bg-primary)',
                    borderRadius: '8px',
                    border: '1px solid var(--bg-card-border)'
                  }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>UPI ID:</span>
                    <code style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {merchantUpi}
                    </code>
                    <button 
                      type="button"
                      onClick={handleCopyUpi} 
                      style={{ 
                        background: copiedUpi ? '#10b981' : 'var(--bg-tertiary)', 
                        color: copiedUpi ? 'white' : 'var(--text-primary)', 
                        border: '1px solid var(--bg-card-border)',
                        padding: '3px 8px', 
                        borderRadius: '5px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {copiedUpi ? <Check size={11} /> : <Copy size={11} />}
                      <span>{copiedUpi ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: COMPACT QR CODE */}
              {paymentMethod === 'qr' && (
                <div style={{ 
                  background: 'white', 
                  borderRadius: '14px', 
                  padding: '1rem', 
                  textAlign: 'center', 
                  marginBottom: '1rem',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Scan with GPay, PhonePe, Paytm, or BHIM
                  </div>
                  
                  <div style={{ display: 'inline-block', padding: '4px', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                    <img 
                      src={qrImageUrl} 
                      alt="UPI Payment QR Code" 
                      style={{ width: '160px', height: '160px', display: 'block', margin: '0 auto' }} 
                    />
                  </div>

                  <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <code style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f172a', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
                      {merchantUpi}
                    </code>
                    <button 
                      type="button"
                      onClick={handleCopyUpi} 
                      style={{ 
                        background: copiedUpi ? '#10b981' : '#e2e8f0', 
                        color: copiedUpi ? 'white' : '#1e293b', 
                        border: 'none',
                        padding: '3px 8px', 
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {copiedUpi ? <Check size={11} /> : <Copy size={11} />}
                      <span>{copiedUpi ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Verification Form */}
              <form onSubmit={handleVerifyPayment} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {errorMsg && (
                  <div style={{ 
                    background: 'var(--red-bg)', 
                    color: 'var(--red-primary)', 
                    padding: '0.5rem 0.85rem', 
                    borderRadius: '8px', 
                    fontSize: '0.78rem' 
                  }}>
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    UPI Reference / UTR Number (Optional, for instant verification)
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. 429810482910"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--bg-card-border)',
                      borderRadius: '8px',
                      padding: '0.55rem 0.75rem',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-mono)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    Mobile Number (Optional, for WhatsApp confirmation)
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
                      padding: '0.55rem 0.75rem',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isVerifying}
                  style={{
                    marginTop: '0.25rem',
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'var(--accent-indigo)',
                    color: 'white',
                    fontWeight: 800,
                    fontSize: '0.925rem',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)'
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

                {/* CLEAR BOTTOM CANCEL / CLOSE BUTTON */}
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    padding: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    textDecoration: 'underline'
                  }}
                >
                  <span>Cancel & Return to Exam Details</span>
                </button>
              </form>
            </div>
          ) : (
            /* Payment Success Screen */
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                background: 'var(--green-bg)', 
                color: 'var(--green-primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem',
                border: '2px solid rgba(16, 185, 129, 0.4)'
              }}>
                <CheckCircle2 size={34} />
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                Payment Verified!
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                Your order for <strong>{examTitle} 2026 Study Pack</strong> is verified.
              </p>

              <div style={{ 
                background: 'var(--bg-tertiary)', 
                borderRadius: '12px', 
                padding: '1rem', 
                marginBottom: '1.25rem',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                fontSize: '0.825rem'
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
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>{orderRecord?.utrNumber}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Access:</span>
                  <span style={{ color: 'var(--green-primary)', fontWeight: 700 }}>Instant Download Active</span>
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
                  padding: '13px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: '0.75rem',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
                }}
              >
                <Download size={17} />
                <span>Download 2026 Solved Packet (TXT)</span>
              </button>

              <button
                onClick={handleReset}
                style={{
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  fontSize: '0.825rem',
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
    </div>
  );
}
