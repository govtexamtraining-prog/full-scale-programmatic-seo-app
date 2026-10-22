import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  LogOut, 
  Users, 
  IndianRupee, 
  TrendingUp, 
  Layers, 
  Settings, 
  MessageCircle, 
  Phone, 
  Download, 
  Trash2, 
  Check, 
  Edit3, 
  ExternalLink, 
  ToggleLeft, 
  ToggleRight, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Key,
  Database,
  ArrowRight,
  Filter,
  Search,
  Sparkles,
  Zap,
  Coins
} from 'lucide-react';
import { useMonetization } from '../context/MonetizationContext';
import { useLiveData } from '../context/LiveDataContext';

export default function AdminView({ navigate }) {
  const { 
    settings, 
    updateSettings, 
    isAdminAuthenticated, 
    loginAdmin, 
    logoutAdmin,
    leads,
    updateLeadStatus,
    deleteLead,
    exportLeadsToCsv,
    transactions,
    updateTransactionStatus,
    totalRevenue,
    affiliates,
    toggleAffiliate,
    updateAffiliate
  } = useMonetization();

  const { goldData, nationalGoldAvg, fetchLiveData } = useLiveData();

  // Local component state
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'leads' | 'transactions' | 'affiliates' | 'settings'

  // Leads filter & search
  const [leadFilterStatus, setLeadFilterStatus] = useState('all');
  const [leadSearchQuery, setLeadSearchQuery] = useState('');

  // Editing affiliate state
  const [editingAffiliateId, setEditingAffiliateId] = useState(null);
  const [affiliateFormData, setAffiliateFormData] = useState({});

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(settings);
  const [settingsSavedMsg, setSettingsSavedMsg] = useState(false);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setAuthError('Please enter Admin PIN or Password');
      return;
    }

    const res = loginAdmin(pinInput);
    if (!res.success) {
      setAuthError(res.message);
    } else {
      setAuthError('');
      setPinInput('');
    }
  };

  // Handle Save Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSavedMsg(true);
    setTimeout(() => setSettingsSavedMsg(false), 2500);
  };

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    const matchesStatus = leadFilterStatus === 'all' || lead.status === leadFilterStatus;
    const matchesSearch = leadSearchQuery === '' || 
      lead.fullName.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
      lead.city.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
      lead.phone.includes(leadSearchQuery) ||
      lead.service.toLowerCase().includes(leadSearchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // If not authenticated, render sleek obsidian login screen
  if (!isAdminAuthenticated) {
    return (
      <div style={{ maxWidth: '440px', margin: '4rem auto', padding: '0 1rem' }}>
        <div 
          className="bento-card"
          style={{
            padding: '2.5rem 2rem',
            textAlign: 'center',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--bg-card-border)',
            borderRadius: '24px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.4)'
          }}
        >
          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            background: 'rgba(99, 102, 241, 0.12)', 
            color: 'var(--accent-indigo)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1.5rem',
            border: '1px solid rgba(99, 102, 241, 0.25)'
          }}>
            <Lock size={30} />
          </div>

          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
            Admin Master Console
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
            Manage incoming WhatsApp leads, UPI earnings, dynamic affiliate links & pSEO configurations.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {authError && (
              <div style={{ 
                background: 'var(--red-bg)', 
                color: 'var(--red-primary)', 
                padding: '0.65rem', 
                borderRadius: '8px', 
                fontSize: '0.825rem' 
              }}>
                {authError}
              </div>
            )}

            <div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: 'var(--bg-primary)', 
                border: '1px solid var(--bg-card-border)', 
                borderRadius: '10px', 
                padding: '0.75rem 1rem' 
              }}>
                <Key size={18} style={{ color: 'var(--text-muted)' }} />
                <input 
                  type="password"
                  placeholder="Enter Admin PIN or Password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    width: '100%',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    textAlign: 'center',
                    letterSpacing: '0.2em'
                  }}
                  autoFocus
                />
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                Default Access PIN: <strong style={{ color: 'var(--accent-indigo)' }}>2026</strong>
              </div>
            </div>

            <button
              type="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                padding: '13px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.95rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(99, 102, 241, 0.35)'
              }}
            >
              <Unlock size={16} />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--bg-card-border)', paddingTop: '1rem' }}>
            <button 
              onClick={() => navigate('/')}
              style={{ background: 'transparent', color: 'var(--text-muted)', fontSize: '0.825rem', border: 'none', cursor: 'pointer' }}
            >
              ← Return to Public Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Top Admin Header Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '1rem',
        marginBottom: '2rem',
        paddingBottom: '1.25rem',
        borderBottom: '1px solid var(--bg-card-border)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              background: 'linear-gradient(135deg, #10b981, #059669)', 
              color: 'white', 
              fontSize: '0.68rem', 
              fontWeight: 800, 
              padding: '2px 8px', 
              borderRadius: '4px',
              letterSpacing: '0.04em'
            }}>
              AUTHENTICATED
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Session Active • Full App Controls
            </span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.3rem', letterSpacing: '-0.02em' }}>
            Master Administration Console
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            onClick={() => navigate('/')}
            style={{ 
              background: 'var(--bg-tertiary)', 
              border: '1px solid var(--bg-card-border)', 
              color: 'var(--text-primary)', 
              padding: '8px 14px', 
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            View Live Site
          </button>
          <button 
            onClick={logoutAdmin}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(244, 63, 94, 0.15)', 
              border: '1px solid rgba(244, 63, 94, 0.3)', 
              color: 'var(--red-primary)', 
              padding: '8px 14px', 
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <LogOut size={14} />
            <span>Lock & Logout</span>
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        overflowX: 'auto', 
        paddingBottom: '0.5rem',
        marginBottom: '2rem' 
      }}>
        {[
          { id: 'overview', label: 'Command Overview', icon: TrendingUp },
          { id: 'leads', label: `WhatsApp Leads (${leads.length})`, icon: MessageCircle },
          { id: 'transactions', label: `UPI Orders (₹${totalRevenue})`, icon: IndianRupee },
          { id: 'affiliates', label: `Affiliate Offers (${affiliates.length})`, icon: Sparkles },
          { id: 'settings', label: 'App & Payment Settings', icon: Settings }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '10px',
                border: isActive ? '1px solid var(--accent-indigo)' : '1px solid var(--bg-card-border)',
                background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-secondary)',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={16} style={{ color: isActive ? 'var(--accent-indigo)' : 'inherit' }} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div>
          {/* KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <div className="bento-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
                <span>TOTAL LEADS CAPTURED</span>
                <Users size={16} style={{ color: 'var(--accent-indigo)' }} />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 900, marginTop: '0.5rem', color: 'var(--text-primary)' }}>
                {leads.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--green-primary)', marginTop: '0.25rem' }}>
                {leads.filter(l => l.status === 'new').length} New Enquiries Pending
              </div>
            </div>

            <div className="bento-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
                <span>TOTAL UPI REVENUE</span>
                <IndianRupee size={16} style={{ color: 'var(--green-primary)' }} />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 900, marginTop: '0.5rem', color: 'var(--green-primary)' }}>
                ₹{totalRevenue.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {transactions.length} Verified Digital Prep Sales
              </div>
            </div>

            <div className="bento-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
                <span>ACTIVE AFFILIATE BANNERS</span>
                <Sparkles size={16} style={{ color: '#fbbf24' }} />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 900, marginTop: '0.5rem', color: 'var(--text-primary)' }}>
                {affiliates.filter(a => a.active).length} / {affiliates.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Rupeek, Jar, Testbook, Adda247
              </div>
            </div>

            <div className="bento-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
                <span>pSEO ACTIVE COVERAGE</span>
                <Layers size={16} style={{ color: 'var(--accent-indigo)' }} />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 900, marginTop: '0.5rem', color: 'var(--text-primary)' }}>
                750+
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Districts in 28 States & 8 UTs
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Recent Leads Widget */}
            <div className="bento-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Recent WhatsApp Leads</h3>
                <button 
                  onClick={() => setActiveTab('leads')}
                  style={{ fontSize: '0.78rem', color: 'var(--accent-indigo)', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                >
                  View All ({leads.length}) →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {leads.slice(0, 3).map(lead => (
                  <div key={lead.id} style={{ 
                    background: 'var(--bg-tertiary)', 
                    border: '1px solid var(--bg-card-border)', 
                    borderRadius: '10px', 
                    padding: '0.85rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <strong style={{ fontSize: '0.9rem' }}>{lead.fullName}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {lead.service} • {lead.city}
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/91${lead.phone}?text=${encodeURIComponent(`Hi ${lead.fullName}, contacting you regarding your enquiry for ${lead.service}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: '#25D366',
                        color: 'white',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        textDecoration: 'none'
                      }}
                    >
                      <MessageCircle size={13} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent UPI Transactions */}
            <div className="bento-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Recent UPI Sales</h3>
                <button 
                  onClick={() => setActiveTab('transactions')}
                  style={{ fontSize: '0.78rem', color: 'var(--accent-indigo)', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                >
                  View All ({transactions.length}) →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {transactions.slice(0, 3).map(tx => (
                  <div key={tx.id} style={{ 
                    background: 'var(--bg-tertiary)', 
                    border: '1px solid var(--bg-card-border)', 
                    borderRadius: '10px', 
                    padding: '0.85rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <strong style={{ fontSize: '0.875rem' }}>{tx.examTitle}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        UTR: {tx.utrNumber.slice(-8)} • {tx.timestamp}
                      </div>
                    </div>
                    <div style={{ fontWeight: 900, color: 'var(--green-primary)', fontSize: '1.1rem' }}>
                      ₹{tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WHATSAPP LEADS MANAGER */}
      {activeTab === 'leads' && (
        <div className="bento-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>WhatsApp Leads Manager</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Real-time customer enquiries submitted from Home Services, Coaching, Legal & Wellness pages.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={exportLeadsToCsv}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--bg-card-border)',
                  color: 'var(--text-primary)',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.825rem',
                  cursor: 'pointer'
                }}
              >
                <Download size={14} />
                <span>Export to CSV</span>
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-primary)', border: '1px solid var(--bg-card-border)', borderRadius: '8px', padding: '0.5rem 0.85rem' }}>
              <Search size={15} style={{ color: 'var(--text-muted)' }} />
              <input 
                type="text"
                placeholder="Search leads by customer name, city, phone, or service..."
                value={leadSearchQuery}
                onChange={(e) => setLeadSearchQuery(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['all', 'new', 'contacted', 'converted'].map(status => (
                <button
                  key={status}
                  onClick={() => setLeadFilterStatus(status)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    border: leadFilterStatus === status ? '1px solid var(--accent-indigo)' : '1px solid var(--bg-card-border)',
                    background: leadFilterStatus === status ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-tertiary)',
                    color: leadFilterStatus === status ? 'var(--text-primary)' : 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Leads Table */}
          {filteredLeads.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              No leads match your active search or filter.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--bg-card-border)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '10px' }}>Lead ID</th>
                    <th style={{ padding: '10px' }}>Customer Name</th>
                    <th style={{ padding: '10px' }}>Phone (+91)</th>
                    <th style={{ padding: '10px' }}>Target Service & City</th>
                    <th style={{ padding: '10px' }}>Slot</th>
                    <th style={{ padding: '10px' }}>Status</th>
                    <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map(lead => {
                    const waText = encodeURIComponent(
                      `Hi ${lead.fullName}, thank you for contacting UrbanSarkari regarding *${lead.service}* in *${lead.city}* (Tracking ID: ${lead.id}). How can we assist you today?`
                    );
                    const waLink = `https://wa.me/91${lead.phone}?text=${waText}`;

                    return (
                      <tr key={lead.id} style={{ borderBottom: '1px solid var(--bg-card-border)' }}>
                        <td style={{ padding: '12px 10px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-indigo)' }}>
                          {lead.id}
                        </td>
                        <td style={{ padding: '12px 10px' }}>
                          <strong>{lead.fullName}</strong>
                          {lead.notes && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              "{lead.notes}"
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '12px 10px', fontFamily: 'var(--font-mono)' }}>
                          +91 {lead.phone}
                        </td>
                        <td style={{ padding: '12px 10px' }}>
                          <div><strong>{lead.service}</strong></div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📍 {lead.locality}, {lead.city}</div>
                        </td>
                        <td style={{ padding: '12px 10px' }}>
                          <span style={{ fontSize: '0.75rem', background: 'var(--bg-tertiary)', padding: '3px 7px', borderRadius: '4px' }}>
                            {lead.slot === 'immediate' ? '⚡ 15m' : lead.slot}
                          </span>
                        </td>
                        <td style={{ padding: '12px 10px' }}>
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            style={{
                              background: lead.status === 'new' ? 'rgba(99, 102, 241, 0.2)' : lead.status === 'converted' ? 'var(--green-bg)' : 'var(--bg-tertiary)',
                              color: lead.status === 'new' ? 'var(--accent-indigo)' : lead.status === 'converted' ? 'var(--green-primary)' : 'var(--text-primary)',
                              border: '1px solid var(--bg-card-border)',
                              borderRadius: '6px',
                              padding: '4px 8px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="lost">Lost</option>
                          </select>
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '6px' }}>
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Chat on WhatsApp"
                              style={{
                                background: '#25D366',
                                color: 'white',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                textDecoration: 'none'
                              }}
                            >
                              <MessageCircle size={13} />
                              <span>WhatsApp</span>
                            </a>
                            <a
                              href={`tel:+91${lead.phone}`}
                              title="Call"
                              style={{
                                background: 'var(--bg-tertiary)',
                                border: '1px solid var(--bg-card-border)',
                                color: 'var(--text-primary)',
                                padding: '6px 8px',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <Phone size={13} />
                            </a>
                            <button
                              onClick={() => deleteLead(lead.id)}
                              title="Delete Lead"
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-muted)',
                                padding: '6px',
                                cursor: 'pointer'
                              }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: UPI ORDERS & TRANSACTIONS */}
      {activeTab === 'transactions' && (
        <div className="bento-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Digital Test Papers UPI Ledger</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Direct student purchases of 2026 Solved Papers & High-Yield Cheatsheet bundles.
              </p>
            </div>

            <div style={{ 
              background: 'var(--green-bg)', 
              color: 'var(--green-primary)', 
              padding: '8px 16px', 
              borderRadius: '8px', 
              fontWeight: 800,
              fontSize: '1rem'
            }}>
              Total Revenue: ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--bg-card-border)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px' }}>Order ID</th>
                  <th style={{ padding: '10px' }}>Target Exam</th>
                  <th style={{ padding: '10px' }}>Amount</th>
                  <th style={{ padding: '10px' }}>UPI Reference (UTR)</th>
                  <th style={{ padding: '10px' }}>Date & Time</th>
                  <th style={{ padding: '10px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id} style={{ borderBottom: '1px solid var(--bg-card-border)' }}>
                    <td style={{ padding: '12px 10px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-indigo)' }}>
                      {tx.id}
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      <strong>{tx.examTitle}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Organized by {tx.examOrg}</div>
                    </td>
                    <td style={{ padding: '12px 10px', fontWeight: 800, color: 'var(--green-primary)', fontSize: '1rem' }}>
                      ₹{tx.amount}
                    </td>
                    <td style={{ padding: '12px 10px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      {tx.utrNumber}
                    </td>
                    <td style={{ padding: '12px 10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {tx.timestamp}
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      <span style={{ 
                        background: tx.status === 'verified' ? 'var(--green-bg)' : 'var(--bg-tertiary)', 
                        color: tx.status === 'verified' ? 'var(--green-primary)' : 'var(--text-muted)', 
                        padding: '3px 8px', 
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}>
                        {tx.status === 'verified' ? '✓ Verified' : tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: AFFILIATE LINKS & BANNERS */}
      {activeTab === 'affiliates' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Affiliate Banners & Referral URLs</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Customize the destination affiliate links (Cuelinks, EarnKaro, Testbook, Rupeek) and toggle banners across the app.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {affiliates.map(aff => {
              const isEditing = editingAffiliateId === aff.id;

              return (
                <div key={aff.id} className="bento-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ 
                        fontSize: '0.72rem', 
                        fontWeight: 800, 
                        background: 'rgba(255,255,255,0.06)', 
                        color: aff.accentColor || 'var(--text-primary)', 
                        padding: '3px 8px', 
                        borderRadius: '4px' 
                      }}>
                        {aff.badge}
                      </span>

                      <button
                        onClick={() => toggleAffiliate(aff.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: aff.active ? 'var(--green-primary)' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {aff.active ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                        <span>{aff.active ? "Enabled" : "Disabled"}</span>
                      </button>
                    </div>

                    {!isEditing ? (
                      <>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.4rem' }}>{aff.title}</h3>
                        <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                          {aff.description}
                        </p>
                        <div style={{ background: 'var(--bg-tertiary)', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', marginBottom: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Target URL: </span>
                          <code style={{ color: 'var(--accent-indigo)' }}>{aff.url}</code>
                        </div>
                      </>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Offer Title</label>
                          <input 
                            type="text"
                            value={affiliateFormData.title ?? aff.title}
                            onChange={(e) => setAffiliateFormData({ ...affiliateFormData, title: e.target.value })}
                            style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--bg-card-border)', borderRadius: '6px', padding: '6px 8px', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Badge Text</label>
                          <input 
                            type="text"
                            value={affiliateFormData.badge ?? aff.badge}
                            onChange={(e) => setAffiliateFormData({ ...affiliateFormData, badge: e.target.value })}
                            style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--bg-card-border)', borderRadius: '6px', padding: '6px 8px', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Your Affiliate / Referral Link</label>
                          <input 
                            type="text"
                            value={affiliateFormData.url ?? aff.url}
                            onChange={(e) => setAffiliateFormData({ ...affiliateFormData, url: e.target.value })}
                            style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--bg-card-border)', borderRadius: '6px', padding: '6px 8px', color: 'var(--text-primary)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {!isEditing ? (
                      <button
                        onClick={() => {
                          setEditingAffiliateId(aff.id);
                          setAffiliateFormData(aff);
                        }}
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--bg-card-border)',
                          color: 'var(--text-primary)',
                          padding: '8px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        <Edit3 size={13} />
                        <span>Edit Link & Copy</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            updateAffiliate(aff.id, affiliateFormData);
                            setEditingAffiliateId(null);
                          }}
                          style={{
                            flex: 1,
                            background: 'var(--accent-indigo)',
                            color: 'white',
                            padding: '8px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingAffiliateId(null)}
                          style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--bg-card-border)',
                            color: 'var(--text-muted)',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: APP & PAYMENT SETTINGS */}
      {activeTab === 'settings' && (
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div className="bento-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.4rem' }}>
              App & Monetization Settings
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
              Configure your receiving UPI handle, WhatsApp lead forwarding number, and default test prep package price.
            </p>

            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {settingsSavedMsg && (
                <div style={{ 
                  background: 'var(--green-bg)', 
                  color: 'var(--green-primary)', 
                  padding: '0.75rem 1rem', 
                  borderRadius: '8px', 
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <CheckCircle2 size={16} />
                  <span>Settings successfully saved and synchronized across the platform!</span>
                </div>
              )}

              {/* WhatsApp Forwarding Number */}
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Admin WhatsApp Forwarding Number (with 91 country code)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-primary)', border: '1px solid var(--bg-card-border)', borderRadius: '8px', padding: '0.65rem 0.85rem' }}>
                  <MessageCircle size={16} style={{ color: '#25D366' }} />
                  <input 
                    type="text"
                    value={settingsForm.adminWhatsAppNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, adminWhatsAppNumber: e.target.value })}
                    style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}
                  />
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  All website leads generate a direct WhatsApp message to this number.
                </span>
              </div>

              {/* Merchant UPI ID */}
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Merchant UPI ID (For Digital Study Pack Payments)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-primary)', border: '1px solid var(--bg-card-border)', borderRadius: '8px', padding: '0.65rem 0.85rem' }}>
                  <IndianRupee size={16} style={{ color: 'var(--accent-indigo)' }} />
                  <input 
                    type="text"
                    value={settingsForm.merchantUpiId}
                    onChange={(e) => setSettingsForm({ ...settingsForm, merchantUpiId: e.target.value })}
                    placeholder="e.g. yourname@okhdfcbank or merchant@upi"
                    style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}
                  />
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Used to generate live dynamic QR codes and GPay/PhonePe deep links.
                </span>
              </div>

              {/* Merchant Display Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Merchant Payee Name
                </label>
                <input 
                  type="text"
                  value={settingsForm.merchantName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, merchantName: e.target.value })}
                  style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--bg-card-border)', borderRadius: '8px', padding: '0.65rem 0.85rem', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                />
              </div>

              {/* Test Paper Price */}
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Digital Test Paper Price (INR ₹)
                </label>
                <input 
                  type="number"
                  value={settingsForm.testPaperPrice}
                  onChange={(e) => setSettingsForm({ ...settingsForm, testPaperPrice: Number(e.target.value) })}
                  style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--bg-card-border)', borderRadius: '8px', padding: '0.65rem 0.85rem', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                />
              </div>

              {/* Change Admin PIN */}
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Admin Security PIN
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-primary)', border: '1px solid var(--bg-card-border)', borderRadius: '8px', padding: '0.65rem 0.85rem' }}>
                  <Key size={16} style={{ color: 'var(--text-muted)' }} />
                  <input 
                    type="text"
                    value={settingsForm.adminPin}
                    onChange={(e) => setSettingsForm({ ...settingsForm, adminPin: e.target.value })}
                    style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem', letterSpacing: '0.15em' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '0.5rem',
                  padding: '13px',
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
                  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.35)'
                }}
              >
                <Check size={16} />
                <span>Save Admin Configuration</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
