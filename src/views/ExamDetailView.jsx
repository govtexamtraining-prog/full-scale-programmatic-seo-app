import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  ExternalLink, 
  Download, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  IndianRupee, 
  BookOpen, 
  FileText,
  Share2,
  Check,
  Globe,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useLiveData } from '../context/LiveDataContext';
import { getExamByOrgAndSlug, SARKARI_EXAMS } from '../data/examData';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';
import UpiPaymentModal from '../components/UpiPaymentModal';
import AffiliateBanner from '../components/AffiliateBanner';

export default function ExamDetailView({ orgSlug, postSlug, navigate }) {
  const { getExam, examsData } = useLiveData();
  const exam = getExam(orgSlug, postSlug) || getExamByOrgAndSlug(orgSlug, postSlug);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);

  if (!exam) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div style={{ background: 'var(--red-bg)', color: 'var(--red-primary)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
          <AlertCircle size={24} />
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Exam Notification Record Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
          We could not locate <code>{orgSlug}/{postSlug}</code>. Please browse active exams below or search by organization.
        </p>
        <button 
          onClick={() => navigate('/exam-schedules')}
          style={{ background: 'var(--accent-blue)', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: 600 }}
        >
          View All Sarkari Exams
        </button>
      </div>
    );
  }

  const allExams = examsData || SARKARI_EXAMS;
  const relatedExams = allExams.filter(e => e.id !== exam.id).slice(0, 4);

  const isJob = exam.category === 'jobs';
  const isAdmitCard = exam.category === 'admit-card';
  const isResult = exam.category === 'results';

  const primaryActionText = isJob 
    ? "Apply Online Direct" 
    : isAdmitCard 
    ? "Download Hall Ticket Direct" 
    : "Check Result / Scorecard Direct";

  const primaryActionColor = isJob 
    ? 'linear-gradient(135deg, #dc2626, #b91c1c)' 
    : isAdmitCard 
    ? 'linear-gradient(135deg, #1e40af, #1d4ed8)' 
    : 'linear-gradient(135deg, #065f46, #047857)';

  const handleShare = () => {
    const shareText = `📋 ${exam.org} ${exam.postName} (2026 Notification):\nVacancies: ${exam.vacancies > 0 ? exam.vacancies : 'Eligiblity'}\nLast Date: ${exam.lastDateToApply}\nDirect Apply & PDF: ${window.location.href}`;
    navigator.clipboard.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div>
      <Breadcrumbs 
        items={[
          { label: "Sarkari Exams", path: "/exam-schedules" },
          exam.isCentral 
            ? { label: "Central Govt", path: "/exam-schedules/central" }
            : { label: exam.stateName, path: `/exam-schedules/state/${exam.stateSlug}` },
          { label: exam.org, path: "/exam-schedules" },
          { label: exam.postName, path: `/exam-schedules/${orgSlug}/${postSlug}` }
        ]} 
        navigate={navigate} 
      />

      <AdSlot slotType="leaderboard" slotId="exam-detail-top-ad" />

      {/* Header with Prominent Apply CTA */}
      <div style={{ 
        background: 'var(--bg-secondary)', 
        border: '1px solid var(--bg-card-border)', 
        borderRadius: '16px', 
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ 
                background: isJob ? '#dc2626' : isAdmitCard ? '#1e40af' : '#065f46', 
                color: 'white', 
                fontWeight: 800, 
                fontSize: '0.8rem', 
                padding: '2px 8px', 
                borderRadius: '4px' 
              }}>
                {exam.org}
              </span>
              <span 
                onClick={() => navigate(exam.isCentral ? '/exam-schedules/central' : `/exam-schedules/state/${exam.stateSlug}`)}
                style={{ 
                  fontSize: '0.75rem', 
                  color: '#00f0ff',
                  background: 'rgba(0, 240, 255, 0.1)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {exam.stateName}
              </span>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                {exam.orgFullName}
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', lineHeight: 1.25, marginBottom: '0.5rem' }}>
              {exam.org} {exam.postName}
            </h1>

            <p className="speakable-summary" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '750px', lineHeight: 1.5 }}>
              Official Sarkari Public Notification. Total Vacancies: <strong>{exam.vacancies > 0 ? exam.vacancies.toLocaleString('en-IN') : 'Eligibility Entrance'}</strong>. Last Date to Apply: <strong>{exam.lastDateToApply}</strong>. Minimum Qualification: <strong>{exam.qualification}</strong>.
            </p>

            {/* VEO & GEO Quick Answer Box: Engineered for Voice Assistant Snippets & Generative AI Overviews */}
            <div className="speakable-answer" style={{
              marginTop: '0.75rem',
              padding: '0.75rem 1rem',
              background: 'rgba(220, 38, 38, 0.08)',
              borderLeft: '4px solid #dc2626',
              borderRadius: '0 8px 8px 0',
              fontSize: '0.86rem',
              lineHeight: 1.5,
              color: 'var(--text-primary)'
            }}>
              <strong>Voice & Search Summary:</strong> {exam.org} is recruiting for {exam.postName} with {exam.vacancies > 0 ? `${exam.vacancies.toLocaleString('en-IN')} vacancies` : 'national entrance eligibility'}. The scheduled exam date is <strong>{exam.examDate}</strong>. Application status: <strong>{exam.admitCardStatus || 'Live'}</strong>. Official registration is active at {exam.officialWebsite}.
            </div>
          </div>

          {/* Action CTAs with Direct Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', minWidth: '220px' }}>
            <a 
              href={exam.applyLink} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: primaryActionColor,
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                textDecoration: 'none'
              }}
            >
              <span>{primaryActionText}</span>
              <ExternalLink size={16} />
            </a>

            <a 
              href={exam.notificationPdfLink || exam.officialWebsite} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--bg-card-border)',
                padding: '10px 18px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.85rem',
                textDecoration: 'none'
              }}
            >
              <Download size={15} />
              <span>Official Notification PDF</span>
            </a>

            <a 
              href={exam.officialWebsite} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'transparent',
                color: 'var(--accent-blue)',
                border: '1px dashed var(--bg-card-border)',
                padding: '8px 14px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.8rem',
                textDecoration: 'none'
              }}
            >
              <Globe size={14} />
              <span>Official {exam.org} Website</span>
            </a>

            <button
              onClick={handleShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                padding: '4px'
              }}
            >
              {copiedShare ? <Check size={14} style={{ color: 'var(--green-primary)' }} /> : <Share2 size={14} />}
              <span>{copiedShare ? "Link copied!" : "Share Notification"}</span>
            </button>
          </div>
        </div>

        {/* Status Highlight Banner */}
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '0.85rem 1.25rem', 
          background: 'var(--bg-tertiary)', 
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} style={{ color: 'var(--accent-blue)' }} />
            <span>Registration Deadline: <strong style={{ color: '#dc2626' }}>{exam.lastDateToApply}</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} style={{ color: 'var(--green-primary)' }} />
            <span>Admit Card Status: <strong>{exam.admitCardStatus}</strong></span>
          </div>
        </div>

        {/* Digital Solved Test Papers UPI Purchase Banner */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1.25rem 1.5rem',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.25rem' }}>
              <span style={{ 
                fontSize: '0.68rem', 
                fontWeight: 800, 
                background: 'var(--accent-indigo)', 
                color: 'white', 
                padding: '2px 7px', 
                borderRadius: '4px',
                letterSpacing: '0.04em'
              }}>
                2026 DIGITAL PREP PACK
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--green-primary)', fontWeight: 600 }}>
                ⚡ Instant Unlock via UPI
              </span>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {exam.org} Official Solved Papers & Quick Revision Cheatsheet
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Includes 10-Year Solved Papers, High-Yield Formula Sheets & Cut-off Predictions (PDF Bundle).
            </p>
          </div>

          <button
            onClick={() => setIsUpiModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              padding: '11px 20px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.9rem',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 16px rgba(99, 102, 241, 0.35)'
            }}
          >
            <IndianRupee size={16} />
            <span>Instant UPI Pay & Download (₹49)</span>
          </button>
        </div>
      </div>

      {/* Structured Details Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {/* Important Dates Box */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <Calendar size={18} style={{ color: 'var(--accent-blue)' }} />
            <span>Important Recruitment Dates</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--bg-card-border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Notification Release Date:</span>
              <span style={{ fontWeight: 600 }}>{exam.notificationDate}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--bg-card-border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Last Date to Apply Online:</span>
              <span style={{ fontWeight: 700, color: '#dc2626' }}>{exam.lastDateToApply}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--bg-card-border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Exam Date / Hall Ticket:</span>
              <span style={{ fontWeight: 600 }}>{exam.examDate}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span style={{ color: 'var(--text-muted)' }}>Result Declaration:</span>
              <span style={{ fontWeight: 600, color: 'var(--green-primary)' }}>{exam.resultStatus}</span>
            </div>
          </div>
        </div>

        {/* Eligibility & Salary Box */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <Users size={18} style={{ color: 'var(--green-primary)' }} />
            <span>Eligibility, Age Limit & Salary</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--bg-card-border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Education Qualification:</span>
              <span style={{ fontWeight: 600, textAlign: 'right' }}>{exam.qualification}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--bg-card-border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Age Limit:</span>
              <span style={{ fontWeight: 600, textAlign: 'right' }}>{exam.ageLimit}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--bg-card-border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Application Fee:</span>
              <span style={{ fontWeight: 600 }}>{exam.applicationFee}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span style={{ color: 'var(--text-muted)' }}>Pay Scale / Remuneration:</span>
              <span style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>{exam.salaryScale}</span>
            </div>
          </div>
        </div>
      </div>

      {/* DIRECT OFFICIAL USEFUL LINKS TABLE (Sarkari Result Standard) */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} style={{ color: 'var(--accent-blue)' }} />
          <span>Official Useful Links Hub ({exam.org} Portal)</span>
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Direct verified links to official government recruitment portals without intermediate redirects
        </p>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Service / Action</th>
                <th>Official Government Link</th>
                <th>Status / Verification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700 }}>
                  Apply Online (Registration & Form Submission)
                </td>
                <td>
                  <a 
                    href={exam.applyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: 'var(--accent-blue)', 
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>Click Here to Apply Direct</span>
                    <ExternalLink size={13} />
                  </a>
                </td>
                <td>
                  <span style={{ background: 'var(--green-bg)', color: 'var(--green-primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>
                    Active Portal
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>Download Admit Card / Hall Ticket</td>
                <td>
                  <a 
                    href={exam.admitCardLink || exam.applyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: 'var(--accent-blue)', 
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>Click Here for Hall Ticket</span>
                    <Download size={13} />
                  </a>
                </td>
                <td>
                  <span style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', padding: '2px 8px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>
                    {exam.admitCardStatus ? 'Available / Live' : 'Link Active'}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>Check Result & Scorecard PDF</td>
                <td>
                  <a 
                    href={exam.resultPdfLink || exam.officialWebsite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: 'var(--accent-blue)', 
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>Click Here for Result PDF</span>
                    <ExternalLink size={13} />
                  </a>
                </td>
                <td>
                  <span style={{ background: 'rgba(0, 255, 157, 0.15)', color: '#00ff9d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>
                    Official Merit List
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>Official Answer Key & Objection Portal</td>
                <td>
                  <a 
                    href={exam.answerKeyLink || exam.officialWebsite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: 'var(--accent-blue)', 
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>Click Here for Answer Key</span>
                    <ExternalLink size={13} />
                  </a>
                </td>
                <td>
                  <span style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.78rem' }}>
                    {exam.answerKeyStatus || 'Official Keys'}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>Download Official Notification PDF</td>
                <td>
                  <a 
                    href={exam.notificationPdfLink || exam.officialWebsite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: 'var(--accent-blue)', 
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>Click Here for Notification PDF</span>
                    <ExternalLink size={13} />
                  </a>
                </td>
                <td>
                  <span style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.78rem' }}>
                    Official Circular
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>Official Authority Portal ({exam.org})</td>
                <td>
                  <a 
                    href={exam.officialWebsite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: 'var(--accent-blue)', 
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>{exam.officialWebsite.replace('https://', '')}</span>
                    <ExternalLink size={13} />
                  </a>
                </td>
                <td>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    Govt Portal
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Syllabus & Exam Pattern Overview */}
      <section className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
          <BookOpen size={18} style={{ color: 'var(--accent-blue)' }} />
          <span>Syllabus & Selection Pattern Summary</span>
        </h2>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          {exam.syllabusSummary}
        </p>

        {exam.selectionProcess && (
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--bg-card-border)',
            borderRadius: '10px',
            padding: '1rem',
            marginTop: '1rem'
          }}>
            <strong style={{ fontSize: '0.85rem', color: '#00f0ff', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Selection Process Stages:
            </strong>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
              {exam.selectionProcess}
            </p>
          </div>
        )}
      </section>

      {/* FAQs Section for Google Snippets & Aspirants */}
      {exam.faqs && exam.faqs.length > 0 && (
        <section className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <FileText size={18} style={{ color: '#00ff9d' }} />
            <span>Frequently Asked Questions ({exam.org} {exam.postName})</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {exam.faqs.map((faq, idx) => (
              <div key={idx} style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--bg-card-border)' }}>
                <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                  Q: {faq.q}
                </h4>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Fixed Ad Placement */}
      <AdSlot slotType="mpu" slotId="exam-detail-mpu" />

      {/* Verified Sarkari Exam Preparation Affiliate Banners */}
      <AffiliateBanner category="exam" limit={2} variant="bento" />

      {/* Cross-linking to other Sarkari exams */}
      <section className="crosslink-section">
        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>
          Related Government Exam Micro-Keywords
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Targeting high-intent student and job-seeker search queries
        </p>

        <div className="crosslink-grid">
          {relatedExams.map(re => (
            <button 
              key={re.id}
              className="crosslink-chip" 
              onClick={() => navigate(`/exam-schedules/${re.orgSlug}/${re.postSlug}`)}
            >
              <span>{re.org} {re.postName.slice(0, 24)}...</span>
              <ArrowRight size={13} />
            </button>
          ))}
          <button 
            className="crosslink-chip" 
            onClick={() => navigate('/fuel-prices')}
          >
            <span>Daily Fuel Price Hub</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </section>

      {/* UPI Payment Modal */}
      <UpiPaymentModal 
        isOpen={isUpiModalOpen}
        onClose={() => setIsUpiModalOpen(false)}
        exam={exam}
      />
    </div>
  );
}
