import React, { useState } from 'react';
import { 
  Coins, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Share2, 
  Check, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle,
  Fuel,
  Sparkles,
  Radio
} from 'lucide-react';
import { useLiveData } from '../context/LiveDataContext';
import { getCityBySlugs, ALL_CITIES } from '../data/cities';
import Breadcrumbs from '../components/Breadcrumbs';
import GoldCalculator from '../components/Calculators/GoldCalculator';
import AdSlot from '../components/AdSlot';
import AffiliateBanner from '../components/AffiliateBanner';

export default function GoldCityView({ stateSlug, citySlug, navigate }) {
  const { getGoldForCity, goldData, lastSyncTime, liveDataSource } = useLiveData();
  const cityGold = getGoldForCity(stateSlug, citySlug);
  const cityInfo = getCityBySlugs(stateSlug, citySlug);
  const [copiedShare, setCopiedShare] = useState(false);

  if (!cityGold || !cityInfo) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>Gold Rate Information Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          We could not locate bullion records for <code>{stateSlug}/{citySlug}</code>.
        </p>
        <button 
          onClick={() => navigate('/gold-rates')}
          style={{ background: 'var(--accent-blue)', color: 'white', padding: '8px 16px', borderRadius: '6px' }}
        >
          Return to Gold Directory
        </button>
      </div>
    );
  }

  // Weight multipliers for 22K and 24K
  const weights = [
    { label: "1 Gram", grams: 1 },
    { label: "8 Grams (1 Sovereign / Pavan)", grams: 8 },
    { label: "10 Grams (1 Tola)", grams: 10 },
    { label: "100 Grams (1 Bar)", grams: 100 },
    { label: "1 Kilogram (1000g)", grams: 1000 }
  ];

  // Neighboring cities
  const neighborCities = ALL_CITIES.filter(c => 
    c.stateSlug === stateSlug && c.slug !== citySlug
  ).slice(0, 4);

  const handleShare = () => {
    const shareText = `🪙 Today's Live Gold Rates in ${cityGold.cityName} (${cityGold.stateName}):\n22K (916): ₹${cityGold.gold22kPerGram}/g (₹${(cityGold.gold22kPerGram * 8).toLocaleString('en-IN')} per 8g Sovereign)\n24K Pure: ₹${cityGold.gold24kPerGram}/g\nSilver: ₹${cityGold.silverPerGram}/g\nAuto-synchronized at ${lastSyncTime || '06:00 AM IST'} via Google Antigravity. Check live: ${window.location.href}`;
    navigator.clipboard.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div>
      <Breadcrumbs 
        items={[
          { label: "Gold Rates", path: "/gold-rates" },
          { label: cityGold.stateName, path: "/gold-rates" },
          { label: `${cityGold.cityName} Gold`, path: `/gold-rates/${stateSlug}/${citySlug}` }
        ]} 
        navigate={navigate} 
      />

      <AdSlot slotType="leaderboard" slotId="gold-city-top-ad" />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
            <MapPin size={15} style={{ color: 'var(--gold-primary)' }} />
            <span>{cityGold.stateName}, India • Affiliated to {cityGold.jewellersAssociation}</span>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '3px', 
              background: 'var(--gold-bg)', 
              color: 'var(--gold-primary)', 
              padding: '1px 6px', 
              borderRadius: '4px', 
              fontSize: '0.7rem', 
              fontWeight: 700 
            }}>
              <Radio size={9} className="spin-anim" /> Live {lastSyncTime}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.2 }}>
            {cityGold.cityName} Gold Rates Today (October 2026)
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.4rem' }}>
            Current Live 22 Karat (BIS 916), 24 Karat Pure Bullion & Fine Silver Spot Prices in {cityGold.cityName}. Automatically updated on page visit.
          </p>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--bg-card-border)',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-secondary)'
          }}
        >
          {copiedShare ? <Check size={16} style={{ color: 'var(--green-primary)' }} /> : <Share2 size={16} />}
          <span>{copiedShare ? "Rate Copied to Clipboard!" : "Share Today's Gold Rates"}</span>
        </button>
      </div>

      {/* Commodity Metric Cards */}
      <div className="metrics-grid">
        {/* 22K Gram */}
        <div className="metric-card glass-panel gold">
          <div className="metric-header">
            <span>22K Gold (1 Gram)</span>
            <Coins size={16} />
          </div>
          <div className="metric-val" style={{ color: 'var(--gold-primary)' }}>
            ₹{cityGold.gold22kPerGram.toLocaleString('en-IN')}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BIS 916 Hallmark Standard</span>
            <span className="metric-change up">+₹{cityGold.change22k} today</span>
          </div>
        </div>

        {/* 22K 8g Sovereign */}
        <div className="metric-card glass-panel gold">
          <div className="metric-header">
            <span>22K Gold (8g Sovereign)</span>
            <Coins size={16} />
          </div>
          <div className="metric-val" style={{ color: 'var(--gold-primary)' }}>
            ₹{(cityGold.gold22kPerGram * 8).toLocaleString('en-IN')}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1 Pavan (Wedding Standard)</span>
            <span className="metric-change up">+₹{cityGold.change22k * 8}</span>
          </div>
        </div>

        {/* 24K Pure Gold */}
        <div className="metric-card glass-panel">
          <div className="metric-header">
            <span>24K Pure Gold (1 Gram)</span>
            <Coins size={16} />
          </div>
          <div className="metric-val">₹{cityGold.gold24kPerGram.toLocaleString('en-IN')}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>999 Purity Bullion</span>
            <span className="metric-change up">+₹{cityGold.change24k} today</span>
          </div>
        </div>

        {/* Silver per Gram */}
        <div className="metric-card glass-panel">
          <div className="metric-header">
            <span>Silver Rate (1 Gram)</span>
            <Coins size={16} />
          </div>
          <div className="metric-val">₹{cityGold.silverPerGram.toFixed(2)}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>₹{(cityGold.silverPerGram * 1000).toLocaleString('en-IN')} / 1kg Bar</span>
            <span className="metric-change up">+₹0.50/g</span>
          </div>
        </div>
      </div>

      {/* WEIGHT CONVERSION MULTIPLES TABLE */}
      <section style={{ marginTop: '2.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '0.35rem' }}>
          {cityGold.cityName} Gold Rate Weight Multiples Matrix
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Dynamic calculation across standard Indian purchase weights (1g, 8g Sovereign, 10g Tola, 100g, 1kg)
        </p>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Standard Purchase Weight</th>
                <th>22 Karat (Hallmarked 916)</th>
                <th>24 Karat (99.9% Pure)</th>
                <th>18 Karat (Diamond Jewellery)</th>
                <th>Pure Silver Equivalent</th>
              </tr>
            </thead>
            <tbody>
              {weights.map((w, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700 }}>{w.label}</td>
                  <td style={{ fontWeight: 700, color: 'var(--gold-primary)' }}>
                    ₹{(cityGold.gold22kPerGram * w.grams).toLocaleString('en-IN')}
                  </td>
                  <td style={{ fontWeight: 700 }}>
                    ₹{(cityGold.gold24kPerGram * w.grams).toLocaleString('en-IN')}
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>
                    ₹{(cityGold.gold18kPerGram * w.grams).toLocaleString('en-IN')}
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>
                    ₹{(cityGold.silverPerGram * w.grams).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Jewellery Invoice Calculator */}
      <GoldCalculator defaultCityData={cityGold} />

      {/* LOCAL JEWELLER MARKET WARNING & HALLMARKING NOTICE */}
      <section style={{ 
        marginTop: '2.5rem', 
        padding: '1.5rem', 
        background: 'var(--gold-bg)', 
        border: '1px solid rgba(217, 119, 6, 0.25)', 
        borderRadius: '12px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
          <ShieldCheck size={20} />
          <span>Consumer Advisory: Mandatory BIS 6-Digit HUID Hallmarking in {cityGold.cityName}</span>
        </div>
        <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          As per Government of India and Bureau of Indian Standards (BIS) directives, no retail jeweller in <strong>{cityGold.cityName}</strong> or {cityGold.stateName} is permitted to sell gold jewellery without a certified 6-digit alphanumeric <strong>HUID (Hallmark Unique Identification Number)</strong>.
        </p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
          <li>✓ <strong>Check 3 Hallmark Stamps:</strong> (1) BIS Logo, (2) Purity mark (22K916 or 18K750), and (3) Unique 6-digit HUID code.</li>
          <li>✓ <strong>Verify on BIS Care App:</strong> Buyers can verify the authenticity of any gold article instantly by typing the HUID code into the official "BIS Care" smartphone app before paying making charges.</li>
          <li>✓ <strong>Live Feed Source:</strong> {liveDataSource} & {cityGold.jewellersAssociation}.</li>
        </ul>
      </section>

      {/* Verified Gold Loan & 24K Digital Gold Affiliate Offers */}
      <AffiliateBanner category="gold" limit={2} variant="bento" />

      {/* Internal Cross-Linking Grid */}
      <section className="crosslink-section">
        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>
          Cross-Link Directory: Other Rates in {cityGold.cityName} & {cityGold.stateName}
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          High-intent micro-keyword hubs automatically inter-connected
        </p>

        <div className="crosslink-grid">
          <button 
            className="crosslink-chip" 
            onClick={() => navigate(`/fuel-prices/${stateSlug}/${citySlug}`)}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Fuel size={14} style={{ color: 'var(--accent-blue)' }} />
              <span>{cityGold.cityName} Daily Fuel Prices</span>
            </span>
            <ArrowRight size={13} />
          </button>

          {neighborCities.map(nc => (
            <button 
              key={nc.id}
              className="crosslink-chip" 
              onClick={() => navigate(`/gold-rates/${nc.stateSlug}/${nc.slug}`)}
            >
              <span>{nc.name} Gold Rates</span>
              <ArrowRight size={13} />
            </button>
          ))}

          <button 
            className="crosslink-chip" 
            onClick={() => navigate('/exam-schedules')}
          >
            <span>Sarkari Result 2026</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </section>
    </div>
  );
}
