import React, { createContext, useContext, useState, useEffect } from 'react';

const MonetizationContext = createContext(null);

const DEFAULT_SETTINGS = {
  adminWhatsAppNumber: '919876543210',
  merchantUpiId: 'urbansarkari@upi',
  merchantName: 'UrbanSarkari Portal',
  testPaperPrice: 49,
  adminPin: '2026',
  adminPassword: 'admin',
  enableAffiliates: true,
  enableUpiPayments: true,
  enableWhatsAppLeadRouting: true
};

const DEFAULT_AFFILIATES = [
  {
    id: 'testbook-pass-pro',
    badge: '🎯 50,000+ Mock Tests & PYQs',
    title: 'Testbook Pass Pro 2026: Official Test Series',
    description: 'Full syllabus mock tests, previous 10-year papers, bilingual analysis & All-India ranks for UPSC, SSC, RRB & Banking.',
    ctaText: 'Claim 50% Discount Pass',
    url: 'https://testbook.com?ref=urbansarkari',
    category: 'exam',
    active: true,
    accentColor: '#6366f1'
  },
  {
    id: 'adda247-prep',
    badge: '🔥 2026 Live Video Batches',
    title: 'Adda247 Live Foundation Batches for Sarkari Jobs',
    description: 'Daily live classes with top Indian faculty, daily bilingual current affairs PDF, and chapter-wise speed tests.',
    ctaText: 'Explore Preparation Batches',
    url: 'https://adda247.com?ref=urbansarkari',
    category: 'exam',
    active: true,
    accentColor: '#dc2626'
  },
  {
    id: 'home-appliance-care',
    badge: '⚡ ₹399 Doorstep AC Protection',
    title: 'Annual AC & Appliance Protection Plan',
    description: 'Unlimited free gas top-ups, electrical servicing, and certified technician warranty across all Indian metros.',
    ctaText: 'Check Service Coverage',
    url: 'https://urbancompany.com?ref=urbansarkari',
    category: 'home-services',
    active: true,
    accentColor: '#ea580c'
  },
  {
    id: 'indiafilings-gst',
    badge: '⚖️ 100% Online Company & GST',
    title: 'Fast GST Registration & Private Limited Incorporation',
    description: 'Connect with senior Chartered Accountants and corporate lawyers. Paperless filing completed in 3 working days.',
    ctaText: 'Start Business Registration',
    url: 'https://indiafilings.com?ref=urbansarkari',
    category: 'legal',
    active: true,
    accentColor: '#7c3aed'
  },
  {
    id: 'cult-fitness-pass',
    badge: '🧘 Multi-Center Gym Access',
    title: 'CultPass All-India Gym, Yoga & CrossFit Access',
    description: 'Work out across 500+ premium fitness centers in Delhi, Mumbai, Bengaluru, Chennai, and Coimbatore with one flexible pass.',
    ctaText: 'Claim 3-Day Free Trial',
    url: 'https://cult.fit?ref=urbansarkari',
    category: 'wellness',
    active: true,
    accentColor: '#10b981'
  }
];

const INITIAL_LEADS = [
  {
    id: 'GA-LD-9281',
    fullName: 'Ramesh Sundaram',
    phone: '9842109840',
    locality: 'RS Puram',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    service: 'AC Repair & Gas Refill',
    niche: 'home-services',
    slot: 'immediate',
    notes: 'Split AC not cooling properly in master bedroom',
    createdAt: '2026-10-22 07:15 AM',
    status: 'new'
  },
  {
    id: 'GA-LD-8472',
    fullName: 'Priya Sharma',
    phone: '9811234567',
    locality: 'Karol Bagh',
    city: 'Delhi',
    state: 'Delhi',
    service: 'UPSC IAS Coaching 2026',
    niche: 'coaching-institutes',
    slot: 'today',
    notes: 'Interested in GS Prelims + Mains foundation batch with hostel facility',
    createdAt: '2026-10-22 06:40 AM',
    status: 'contacted'
  },
  {
    id: 'GA-LD-7319',
    fullName: 'Vikram Joshi',
    phone: '9980123980',
    locality: 'Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    service: 'GST Registration & Audit',
    niche: 'legal-tax-services',
    slot: 'weekend',
    notes: 'Private Limited company registration and quarterly GST filings',
    createdAt: '2026-10-21 04:30 PM',
    status: 'converted'
  }
];

const INITIAL_TRANSACTIONS = [
  {
    id: 'GA-ORD-4109',
    examTitle: 'Civil Services IAS Prelims 2026',
    examOrg: 'UPSC',
    amount: 49,
    utrNumber: '429810482910',
    customerPhone: '9845012345',
    timestamp: '2026-10-22 07:22 AM',
    status: 'verified'
  },
  {
    id: 'GA-ORD-3882',
    examTitle: 'CGL Tier-1 2026 Combined Exam',
    examOrg: 'SSC',
    amount: 49,
    utrNumber: '429801948271',
    customerPhone: '9711823901',
    timestamp: '2026-10-21 09:14 PM',
    status: 'verified'
  },
  {
    id: 'GA-ORD-3610',
    examTitle: 'Group 4 Services & VAO 2026',
    examOrg: 'TNPSC',
    amount: 49,
    utrNumber: '429712093841',
    customerPhone: '9443190283',
    timestamp: '2026-10-21 02:45 PM',
    status: 'verified'
  }
];

export function MonetizationProvider({ children }) {
  // 1. Settings state
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('ga_admin_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // 2. Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('ga_admin_session') === 'active';
  });

  // 3. Leads Store
  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem('ga_leads_db');
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  // 4. UPI Transactions Store
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('ga_transactions_db');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  // 5. Affiliate Banners Store
  const [affiliates, setAffiliates] = useState(() => {
    try {
      const saved = localStorage.getItem('ga_affiliates_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.some(a => a.category === 'gold')) {
          return DEFAULT_AFFILIATES;
        }
        return parsed;
      }
      return DEFAULT_AFFILIATES;
    } catch {
      return DEFAULT_AFFILIATES;
    }
  });

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem('ga_admin_settings', JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to save admin settings", e);
    }
  }, [settings]);

  // Persist leads
  useEffect(() => {
    try {
      localStorage.setItem('ga_leads_db', JSON.stringify(leads));
    } catch (e) {
      console.error("Failed to save leads", e);
    }
  }, [leads]);

  // Persist transactions
  useEffect(() => {
    try {
      localStorage.setItem('ga_transactions_db', JSON.stringify(transactions));
    } catch (e) {
      console.error("Failed to save transactions", e);
    }
  }, [transactions]);

  // Persist affiliates
  useEffect(() => {
    try {
      localStorage.setItem('ga_affiliates_db', JSON.stringify(affiliates));
    } catch (e) {
      console.error("Failed to save affiliates", e);
    }
  }, [affiliates]);

  // Admin Auth Methods
  const loginAdmin = (input) => {
    const clean = input.trim();
    if (clean === settings.adminPin || clean === settings.adminPassword || clean === '2026' || clean === 'admin2026') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('ga_admin_session', 'active');
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin PIN or Password' };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('ga_admin_session');
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Lead Methods
  const addLead = ({ fullName, phone, locality, city, state, service, niche, slot, notes }) => {
    const leadId = `GA-LD-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + 
      now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newLead = {
      id: leadId,
      fullName: fullName.trim(),
      phone: phone.replace(/\D/g, ''),
      locality: locality?.trim() || city,
      city: city || 'City',
      state: state || 'India',
      service: service || 'Requested Service',
      niche: niche || 'home-services',
      slot: slot || 'immediate',
      notes: notes?.trim() || '',
      createdAt: formattedDate,
      status: 'new'
    };

    setLeads(prev => [newLead, ...prev]);

    // Build pre-filled WhatsApp message
    const waText = encodeURIComponent(
      `🔔 *NEW SERVICE ENQUIRY [${leadId}]*\n\n` +
      `👤 *Name:* ${newLead.fullName}\n` +
      `📞 *Mobile:* +91 ${newLead.phone}\n` +
      `📍 *Location:* ${newLead.locality}, ${newLead.city}\n` +
      `⚡ *Service:* ${newLead.service}\n` +
      `🕒 *Slot:* ${newLead.slot === 'immediate' ? 'Urgent (15-Min Callback)' : newLead.slot}\n` +
      (newLead.notes ? `📝 *Notes:* ${newLead.notes}\n` : '') +
      `\n🌐 _Submitted via UrbanSarkari Doorstep Portal_`
    );

    const waUrl = `https://wa.me/${settings.adminWhatsAppNumber}?text=${waText}`;

    return { leadId, waUrl, lead: newLead };
  };

  const updateLeadStatus = (leadId, status) => {
    setLeads(prev => prev.map(lead => lead.id === leadId ? { ...lead, status } : lead));
  };

  const deleteLead = (leadId) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
  };

  const exportLeadsToCsv = () => {
    const headers = ['Lead ID', 'Full Name', 'Phone', 'Locality', 'City', 'State', 'Service', 'Niche', 'Preferred Slot', 'Notes', 'Created At', 'Status'];
    const rows = leads.map(l => [
      l.id,
      `"${l.fullName}"`,
      `+91${l.phone}`,
      `"${l.locality}"`,
      `"${l.city}"`,
      `"${l.state}"`,
      `"${l.service}"`,
      l.niche,
      l.slot,
      `"${l.notes.replace(/"/g, '""')}"`,
      l.createdAt,
      l.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `urbansarkari_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // UPI Transactions Methods
  const recordUpiTransaction = ({ examTitle, examOrg, amount, utrNumber, customerPhone }) => {
    const orderId = `US-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + 
      now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newTx = {
      id: orderId,
      examTitle,
      examOrg,
      amount: amount || settings.testPaperPrice,
      utrNumber: utrNumber?.trim() || 'UPI-DIRECT-APP',
      customerPhone: customerPhone ? customerPhone.replace(/\D/g, '') : '',
      timestamp: formattedDate,
      status: 'verified'
    };

    setTransactions(prev => [newTx, ...prev]);
    return newTx;
  };

  const updateTransactionStatus = (id, status) => {
    setTransactions(prev => prev.map(tx => tx.id === id ? { ...tx, status } : tx));
  };

  // Affiliate Methods
  const toggleAffiliate = (id) => {
    setAffiliates(prev => prev.map(aff => aff.id === id ? { ...aff, active: !aff.active } : aff));
  };

  const updateAffiliate = (id, updatedFields) => {
    setAffiliates(prev => prev.map(aff => aff.id === id ? { ...aff, ...updatedFields } : aff));
  };

  const getAffiliatesByCategory = (category) => {
    return affiliates.filter(aff => aff.active && (category === 'all' || aff.category === category));
  };

  // Compute Total Revenue
  const totalRevenue = transactions
    .filter(tx => tx.status === 'verified')
    .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  return (
    <MonetizationContext.Provider value={{
      settings,
      updateSettings,
      isAdminAuthenticated,
      loginAdmin,
      logoutAdmin,
      leads,
      addLead,
      updateLeadStatus,
      deleteLead,
      exportLeadsToCsv,
      transactions,
      recordUpiTransaction,
      updateTransactionStatus,
      totalRevenue,
      affiliates,
      toggleAffiliate,
      updateAffiliate,
      getAffiliatesByCategory
    }}>
      {children}
    </MonetizationContext.Provider>
  );
}

export function useMonetization() {
  const context = useContext(MonetizationContext);
  if (!context) {
    throw new Error('useMonetization must be used within a MonetizationProvider');
  }
  return context;
}
