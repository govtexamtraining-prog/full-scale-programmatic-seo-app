import React, { useState } from 'react';
import { Coins, ArrowRight, ShieldCheck, Filter, Search, Info, Radio } from 'lucide-react';
import { useLiveData } from '../context/LiveDataContext';
import { STATES_AND_CITIES } from '../data/cities';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';

export default function GoldVerticalView({ navigate }) {
  const [filterState, setFilterState] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { goldData, nationalGoldAvg, lastSyncTime, liveDataSource } = useLiveData();

  const goldList = Object.values(goldData).filter(item => {
    const matchesState = filterState === 'all' || item.stateSlug === filterState;
    const matchesSearch = item.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.stateName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Live Gold & Silver Rates", path: "/gold-rates" }]} navigate={navigate} />

      <AdSlot slotType="leaderboard" slotId="gold-vertical-top-ad" />

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--gold-bg)', color: 'var(--gold-primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          <Radio size={12} className="spin-anim" /> Live Spot Bullion Rate: {lastSyncTime} ({liveDataSource})
        </div>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
          Live Gold & Precious Metal Rates in India Today
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '800px' }}>
          Real-time 24 Carat pure gold, 22 Carat (BIS 916) jewellery bullion, and fine silver rates across 30+ Indian cities. Fetched automatically on page load.
        </p>
      </div>

      {/* Key Metric Cards */}
      <div className="metrics-grid">
        <div className="metric-card glass-panel gold">
          <div className="metric-header">
            <span>22K Gold (1 Gram)</span>
            <Coins size={16} />
          </div>
          <div className="metric-val">₹{nationalGoldAvg.gold22kAvg.toLocaleString('en-IN')}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BIS 916 Hallmarked Jewellery Standard</span>
        </div>

        <div className="metric-card glass-panel gold">
          <div className="metric-header">
            <span>22K Gold (8g Sovereign / Pavan)</span>
            <Coins size={16} />
          </div>
          <div className="metric-val">₹{(nationalGoldAvg.gold22kAvg * 8).toLocaleString('en-IN')}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Wedding & Bullion Multiplier</span>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-header">
            <span>24K Pure Gold (10g Tola)</span>
            <Coins size={16} />
          </div>
          <div className="metric-val">₹{(nationalGoldAvg.gold24kAvg * 10).toLocaleString('en-IN')}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>999 Fineness Pure Bullion</span>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-header">
            <span>Silver (1 KG Bar)</span>
            <Coins size={16} />
          </div>
          <div className="metric-val">₹{(nationalGoldAvg.silverAvg * 1000).toLocaleString('en-IN')}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>₹{nationalGoldAvg.silverAvg.toFixed(2)} / gram</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--bg-card-border)', borderRadius: '8px', padding: '0.5rem 1rem', flex: 1, minWidth: '240px' }}>
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search city or state for gold rates..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-primary)', width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} style={{ color: 'var(--text-muted)' }} />
          <select 
            className="form-select"
            value={filterState} 
            onChange={(e) => setFilterState(e.target.value)}
            style={{ width: 'auto', minWidth: '180px' }}
          >
            <option value="all">All Indian States</option>
            {STATES_AND_CITIES.map(s => (
              <option key={s.stateSlug} value={s.stateSlug}>{s.stateName}</option>
            ))}
          </select>
        </div>
      </div>

      {/* City-wise Gold Table */}
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>City / Bullion Market</th>
              <th>State</th>
              <th>22K Gold (1g)</th>
              <th>22K Gold (8g Pavan)</th>
              <th>24K Pure (1g)</th>
              <th>Silver (1g)</th>
              <th>Local Market Notice</th>
              <th>Hyper-Local Page</th>
            </tr>
          </thead>
          <tbody>
            {goldList.map(city => (
              <tr key={city.cityId}>
                <td style={{ fontWeight: 700 }}>
                  <button 
                    onClick={() => navigate(`/gold-rates/${city.stateSlug}/${city.citySlug}`)}
                    style={{ color: 'inherit', textAlign: 'left' }}
                  >
                    {city.cityName}
                  </button>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{city.stateName}</td>
                <td style={{ fontWeight: 700, color: 'var(--gold-primary)' }}>₹{city.gold22kPerGram.toLocaleString('en-IN')}</td>
                <td style={{ fontWeight: 700 }}>₹{(city.gold22kPerGram * 8).toLocaleString('en-IN')}</td>
                <td style={{ fontWeight: 700 }}>₹{city.gold24kPerGram.toLocaleString('en-IN')}</td>
                <td style={{ color: 'var(--text-muted)' }}>₹{city.silverPerGram.toFixed(2)}</td>
                <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{city.jewellersAssociation}</td>
                <td>
                  <button
                    onClick={() => navigate(`/gold-rates/${city.stateSlug}/${city.citySlug}`)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: 'var(--accent-blue)',
                      fontWeight: 600,
                      fontSize: '0.825rem'
                    }}
                  >
                    <span>Full Calculator</span>
                    <ArrowRight size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
