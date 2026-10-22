import React, { useState } from 'react';
import { Fuel, ArrowRight, TrendingUp, TrendingDown, Search, Filter, Radio } from 'lucide-react';
import { useLiveData } from '../context/LiveDataContext';
import { STATES_AND_CITIES } from '../data/cities';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSlot from '../components/AdSlot';

export default function FuelVerticalView({ navigate }) {
  const [filterState, setFilterState] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { fuelData, nationalFuelAvg, lastSyncTime } = useLiveData();

  const fuelList = Object.values(fuelData).filter(item => {
    const matchesState = filterState === 'all' || item.stateSlug === filterState;
    const matchesSearch = item.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.stateName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Daily Fuel Prices (Petrol & Diesel)", path: "/fuel-prices" }]} navigate={navigate} />

      <AdSlot slotType="leaderboard" slotId="fuel-vertical-top-ad" />

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--green-bg)', color: 'var(--green-primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          <Radio size={12} className="spin-anim" /> Live OMC Feeds Synchronized: {lastSyncTime}
        </div>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
          Daily Fuel Prices in India Today (October 2026)
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '800px' }}>
          Live retail prices of Petrol and Diesel across 30+ major Indian municipal territories. Automatically fetched and calibrated with state VAT & central excise breakdown.
        </p>
      </div>

      {/* Quick Summary Cards */}
      <div className="metrics-grid">
        <div className="metric-card glass-panel">
          <div className="metric-header">
            <span>National Average Petrol</span>
            <Fuel size={16} />
          </div>
          <div className="metric-val">₹{nationalFuelAvg.petrolAverage.toFixed(2)}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Updated {lastSyncTime || '06:00 AM IST'}</span>
        </div>

        <div className="metric-card glass-panel green">
          <div className="metric-header">
            <span>National Average Diesel</span>
            <Fuel size={16} />
          </div>
          <div className="metric-val">₹{nationalFuelAvg.dieselAverage.toFixed(2)}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Updated {lastSyncTime || '06:00 AM IST'}</span>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-header">
            <span>Lowest Petrol Rate</span>
            <TrendingDown size={16} style={{ color: 'var(--green-primary)' }} />
          </div>
          <div className="metric-val">₹{nationalFuelAvg.lowestPetrol.price.toFixed(2)}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {nationalFuelAvg.lowestPetrol.city} ({nationalFuelAvg.lowestPetrol.state})
          </span>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-header">
            <span>Highest Petrol Rate</span>
            <TrendingUp size={16} style={{ color: 'var(--red-primary)' }} />
          </div>
          <div className="metric-val">₹{nationalFuelAvg.highestPetrol.price.toFixed(2)}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {nationalFuelAvg.highestPetrol.city} ({nationalFuelAvg.highestPetrol.state})
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--bg-card-border)', borderRadius: '8px', padding: '0.5rem 1rem', flex: 1, minWidth: '240px' }}>
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search city or state..." 
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

      {/* High-Contrast Comparison Table */}
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>City / Location</th>
              <th>State</th>
              <th>Petrol Rate (₹/L)</th>
              <th>Diesel Rate (₹/L)</th>
              <th>CNG (₹/kg)</th>
              <th>24h Fluctuation</th>
              <th>Hyper-Local Page</th>
            </tr>
          </thead>
          <tbody>
            {fuelList.map(city => (
              <tr key={city.cityId}>
                <td style={{ fontWeight: 700 }}>
                  <button 
                    onClick={() => navigate(`/fuel-prices/${city.stateSlug}/${city.citySlug}`)}
                    style={{ color: 'inherit', textAlign: 'left' }}
                  >
                    {city.cityName}
                  </button>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{city.stateName}</td>
                <td style={{ fontWeight: 700, fontSize: '1rem' }}>₹{city.petrolPrice.toFixed(2)}</td>
                <td style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--green-primary)' }}>₹{city.dieselPrice.toFixed(2)}</td>
                <td style={{ color: 'var(--text-muted)' }}>₹{city.cngPrice.toFixed(2)}</td>
                <td>
                  <span className={`metric-change ${city.petrolChange > 0 ? 'up' : city.petrolChange < 0 ? 'down' : 'flat'}`}>
                    {city.petrolChange > 0 ? `+₹${city.petrolChange.toFixed(2)}` : city.petrolChange < 0 ? `-₹${Math.abs(city.petrolChange).toFixed(2)}` : 'Live'}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/fuel-prices/${city.stateSlug}/${city.citySlug}`)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: 'var(--accent-blue)',
                      fontWeight: 600,
                      fontSize: '0.825rem'
                    }}
                  >
                    <span>View Rate & Taxes</span>
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
