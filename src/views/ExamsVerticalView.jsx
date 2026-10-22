import React, { useState } from 'react';
import { GraduationCap, ArrowRight, Search, Filter, Calendar, Users, Briefcase, ExternalLink, Download, Bell, Radio, Sparkles } from 'lucide-react';
import { SARKARI_EXAMS, SARKARI_NEWS_ALERTS } from '../data/examData';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';

export default function ExamsVerticalView({ navigate }) {
  const [filterOrg, setFilterOrg] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExams = SARKARI_EXAMS.filter(exam => {
    const matchesOrg = filterOrg === 'all' || exam.orgSlug === filterOrg;
    const matchesCategory = filterCategory === 'all' || exam.category === filterCategory;
    const matchesSearch = exam.postName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exam.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exam.qualification.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesOrg && matchesCategory && matchesSearch;
  });

  const jobsList = filteredExams.filter(e => e.category === 'jobs');
  const admitCardList = filteredExams.filter(e => e.category === 'admit-card');
  const resultsList = filteredExams.filter(e => e.category === 'results');

  return (
    <div>
      <Breadcrumbs items={[{ label: "Sarkari Exam Schedules & Results 2026", path: "/exam-schedules" }]} navigate={navigate} />

      <AdSlot slotType="leaderboard" slotId="exams-vertical-top-ad" />

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
          Upcoming Exam Schedules, Admit Cards & Results (2026)
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '800px' }}>
          Central and State Government recruitment notifications for UPSC, SSC, IBPS Banking, Indian Railways (RRB), and State PSCs. Fast Sarkari format with direct registration links and PDF circulars.
        </p>
      </div>

      {/* LIVE 2026 SARKARI BREAKING BULLETINS & CIRCULARS */}
      <section style={{ 
        background: 'var(--bg-secondary)', 
        border: '1px solid var(--bg-card-border)', 
        borderRadius: '16px', 
        padding: '1.25rem 1.5rem', 
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '4px', 
              background: 'rgba(220, 38, 38, 0.15)', 
              color: '#dc2626', 
              padding: '3px 8px', 
              borderRadius: '6px', 
              fontSize: '0.75rem', 
              fontWeight: 800 
            }}>
              <Radio size={12} className="spin-anim" />
              LIVE 2026 BULLETINS
            </span>
            <strong style={{ fontSize: '0.95rem' }}>Latest Official Recruitment Circulars & Exam Calendar</strong>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Updated Today (22 Oct 2026)</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
          {SARKARI_NEWS_ALERTS.map(news => (
            <a
              key={news.id}
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--bg-card-border)',
                borderRadius: '10px',
                padding: '0.85rem',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.4rem',
                transition: 'transform 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ 
                  background: 'rgba(255,255,255,0.06)', 
                  color: 'var(--accent-indigo)', 
                  fontSize: '0.7rem', 
                  fontWeight: 800, 
                  padding: '2px 6px', 
                  borderRadius: '4px' 
                }}>
                  [{news.org}] {news.badge}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{news.date}</span>
              </div>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4, margin: 0 }}>
                {news.title}
              </p>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-indigo)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                <span>Official Authority Circular</span>
                <ExternalLink size={11} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--bg-card-border)', borderRadius: '8px', padding: '0.5rem 1rem', flex: 1, minWidth: '240px' }}>
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search exam, post title, or qualification..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-primary)', width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} style={{ color: 'var(--text-muted)' }} />
          <select 
            className="form-select"
            value={filterOrg} 
            onChange={(e) => setFilterOrg(e.target.value)}
            style={{ width: 'auto', minWidth: '160px' }}
          >
            <option value="all">All Organizations</option>
            <option value="upsc">UPSC</option>
            <option value="ssc">SSC</option>
            <option value="ibps">IBPS Banking</option>
            <option value="rrb">Railways RRB</option>
            <option value="tnpsc">TNPSC</option>
            <option value="nta">NTA</option>
          </select>

          <select 
            className="form-select"
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ width: 'auto', minWidth: '160px' }}
          >
            <option value="all">All 3 Legacy Columns</option>
            <option value="jobs">Latest Jobs Only</option>
            <option value="admit-card">Admit Card Only</option>
            <option value="results">Results Only</option>
          </select>
        </div>
      </div>

      {/* 3-COLUMN SARKARI GRID */}
      <div className="sarkari-grid">
        {/* Column 1: Latest Jobs */}
        {(filterCategory === 'all' || filterCategory === 'jobs') && (
          <div className="sarkari-col">
            <div className="sarkari-col-header">
              <span>LATEST JOBS (ACTIVE NOTIFICATIONS)</span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                {jobsList.length}
              </span>
            </div>
            <div className="sarkari-item-list">
              {jobsList.map(job => (
                <div key={job.id} className="sarkari-item">
                  <a 
                    href={`/exam-schedules/${job.orgSlug}/${job.postSlug}`}
                    onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${job.orgSlug}/${job.postSlug}`); }}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div className="sarkari-item-title">
                      <span style={{ color: '#dc2626', fontWeight: 800 }}>[{job.org}]</span> {job.postName}
                    </div>
                    <div className="sarkari-item-meta" style={{ flexWrap: 'wrap' }}>
                      <span>Last Date: <strong>{job.lastDateToApply}</strong></span>
                      <span>• {job.vacancies > 0 ? `${job.vacancies.toLocaleString('en-IN')} Vacancies` : 'Exam'}</span>
                    </div>
                    <div style={{ marginTop: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Eligibility: {job.qualification}
                    </div>
                  </a>

                  {/* Direct Action Links */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '0.65rem', flexWrap: 'wrap' }}>
                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: '#dc2626',
                        color: 'white',
                        padding: '4px 9px',
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <span>Apply Online Direct</span>
                      <ExternalLink size={11} />
                    </a>
                    <a
                      href={`/exam-schedules/${job.orgSlug}/${job.postSlug}`}
                      onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${job.orgSlug}/${job.postSlug}`); }}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--bg-card-border)',
                        padding: '4px 9px',
                        borderRadius: '4px'
                      }}
                    >
                      Full Details
                    </a>
                  </div>
                </div>
              ))}
              {jobsList.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No matching jobs found
                </div>
              )}
            </div>
          </div>
        )}

        {/* Column 2: Admit Card */}
        {(filterCategory === 'all' || filterCategory === 'admit-card') && (
          <div className="sarkari-col">
            <div className="sarkari-col-header">
              <span>ADMIT CARD / HALL TICKET</span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                {admitCardList.length}
              </span>
            </div>
            <div className="sarkari-item-list">
              {admitCardList.map(card => (
                <div key={card.id} className="sarkari-item">
                  <a 
                    href={`/exam-schedules/${card.orgSlug}/${card.postSlug}`}
                    onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${card.orgSlug}/${card.postSlug}`); }}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div className="sarkari-item-title">
                      <span style={{ color: '#1e40af', fontWeight: 800 }}>[{card.org}]</span> {card.postName}
                    </div>
                    <div className="sarkari-item-meta">
                      <span style={{ color: 'var(--green-primary)', fontWeight: 600 }}>● {card.admitCardStatus}</span>
                    </div>
                    <div style={{ marginTop: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Exam Date: {card.examDate}
                    </div>
                  </a>

                  {/* Direct Action Links */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '0.65rem', flexWrap: 'wrap' }}>
                    <a
                      href={card.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: '#1e40af',
                        color: 'white',
                        padding: '4px 9px',
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <span>Download Hall Ticket</span>
                      <Download size={11} />
                    </a>
                    <a
                      href={`/exam-schedules/${card.orgSlug}/${card.postSlug}`}
                      onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${card.orgSlug}/${card.postSlug}`); }}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--bg-card-border)',
                        padding: '4px 9px',
                        borderRadius: '4px'
                      }}
                    >
                      Exam Timetable
                    </a>
                  </div>
                </div>
              ))}
              {admitCardList.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No matching admit cards found
                </div>
              )}
            </div>
          </div>
        )}

        {/* Column 3: Results */}
        {(filterCategory === 'all' || filterCategory === 'results') && (
          <div className="sarkari-col">
            <div className="sarkari-col-header">
              <span>RESULTS & SCORE CARDS</span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                {resultsList.length}
              </span>
            </div>
            <div className="sarkari-item-list">
              {resultsList.map(result => (
                <div key={result.id} className="sarkari-item">
                  <a 
                    href={`/exam-schedules/${result.orgSlug}/${result.postSlug}`}
                    onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${result.orgSlug}/${result.postSlug}`); }}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div className="sarkari-item-title">
                      <span style={{ color: '#065f46', fontWeight: 800 }}>[{result.org}]</span> {result.postName}
                    </div>
                    <div className="sarkari-item-meta">
                      <span style={{ color: 'var(--green-primary)', fontWeight: 600 }}>● {result.resultStatus}</span>
                    </div>
                    <div style={{ marginTop: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Total Posts: {result.vacancies.toLocaleString('en-IN')}
                    </div>
                  </a>

                  {/* Direct Action Links */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '0.65rem', flexWrap: 'wrap' }}>
                    <a
                      href={result.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: '#065f46',
                        color: 'white',
                        padding: '4px 9px',
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <span>Check Scorecard</span>
                      <ExternalLink size={11} />
                    </a>
                    <a
                      href={`/exam-schedules/${result.orgSlug}/${result.postSlug}`}
                      onClick={(e) => { e.preventDefault(); navigate(`/exam-schedules/${result.orgSlug}/${result.postSlug}`); }}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--bg-card-border)',
                        padding: '4px 9px',
                        borderRadius: '4px'
                      }}
                    >
                      Cut-off Marks
                    </a>
                  </div>
                </div>
              ))}
              {resultsList.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No matching results found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
