import React, { useState } from 'react';
import { 
  Fuel, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Share2, 
  Check, 
  HelpCircle,
  Clock,
  Shield,
  Layers,
  Coins,
  Radio
} from 'lucide-react';
import { useLiveData } from '../context/LiveDataContext';
import { getCityBySlugs, ALL_CITIES } from '../data/cities';
import Breadcrumbs from '../components/Breadcrumbs';
import FuelTripCalculator from '../components/Calculators/FuelTripCalculator';
import AdSlot from '../components/AdSlot';

export default function FuelCityView({ stateSlug, citySlug, navigate }) {
  const { getFuelForCity, fuelData, lastSyncTime } = useLiveData();
  const cityFuel = getFuelForCity(stateSlug, citySlug);
  const cityInfo = getCityBySlugs(stateSlug, citySlug);
  const [copiedShare, setCopiedShare] = useState(false);

  if (!cityFuel || !cityInfo) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>City Fuel Rate Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          We could not locate fuel data for <code>{stateSlug}/{citySlug}</code>.
        </p>
        <button 
          onClick={() => navigate('/fuel-prices')}
          style={{ background: 'var(--accent-blue)', color: 'white', padding: '8px 16px', borderRadius: '6px' }}
        >
          Return to Fuel Directory
        </button>
      </div>
    );
  }

  // Neighboring cities calculation
  const neighborCities = ALL_CITIES.filter(c => 
    c.stateSlug === stateSlug && c.slug !== citySlug
  ).slice(0, 4);

  // Check cheaper neighboring cities dynamically
  const cheaperNeighbors = neighborCities.filter(c => {
    const f = fuelData[c.id];
    return f && f.petrolPrice < cityFuel.petrolPrice;
  });

  const handleShare = () => {
    const shareText = `⛽ Today's Live Fuel Rates in ${cityFuel.cityName} (${cityFuel.stateName}):\nPetrol: ₹${cityFuel.petrolPrice.toFixed(2)}/L\nDiesel: ₹${cityFuel.dieselPrice.toFixed(2)}/L\nAuto-synchronized at ${lastSyncTime || '06:00 AM IST'} via Google Antigravity. Check live: ${window.location.href}`;
    navigator.clipboard.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div>
      <Breadcrumbs 
        items={[
          { label: "Fuel Prices", path: "/fuel-prices" },
          { label: cityFuel.stateName, path: "/fuel-prices" },
          { label: `${cityFuel.cityName} Rates`, path: `/fuel-prices/${stateSlug}/${citySlug}` }
        ]} 
        navigate={navigate} 
      />

      <AdSlot slotType="leaderboard" slotId="fuel-city-top-ad" />

      {/* City Fuel Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
            <MapPin size={15} style={{ color: 'var(--accent-blue)' }} />
            <span>{cityFuel.stateName}, India • Tier {cityInfo.tier} Territory</span>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '3px', 
              background: 'var(--green-bg)', 
              color: 'var(--green-primary)', 
              padding: '1px 6px', 
              borderRadius: '4px', 
              fontSize: '0.7rem', 
              fontWeight: 700 
            }}>
              <Radio size={9} className="spin-anim" /> Live {lastSyncTime}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.2 }}>
            {cityFuel.cityName} Fuel Prices Today (October 2026)
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.4rem' }}>
            Current Live Petrol, Diesel & CNG Prices in {cityFuel.cityName}. Automatically updated on page visit.
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
          <span>{copiedShare ? "Rate Copied to Clipboard!" : "Share Today's Rates"}</span>
        </button>
      </div>

      {/* Key Metric Rates: Petrol vs Diesel */}
      <div className="metrics-grid">
        {/* Petrol Card */}
        <div className="metric-card glass-panel">
          <div className="metric-header">
            <span>Petrol Price</span>
            <Fuel size={16} />
          </div>
          <div className="metric-val">₹{cityFuel.petrolPrice.toFixed(2)}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Per Liter in {cityFuel.cityName}</span>
            <span className={`metric-change ${cityFuel.petrolChange > 0 ? 'up' : cityFuel.petrolChange < 0 ? 'down' : 'flat'}`}>
              {cityFuel.petrolChange > 0 ? `+₹${cityFuel.petrolChange.toFixed(2)}` : cityFuel.petrolChange < 0 ? `-₹${Math.abs(cityFuel.petrolChange).toFixed(2)}` : 'Live Feed'}
            </span>
          </div>
        </div>

        {/* Diesel Card */}
        <div className="metric-card glass-panel green">
          <div className="metric-header">
            <span>Diesel Price</span>
            <Fuel size={16} />
          </div>
          <div className="metric-val" style={{ color: 'var(--green-primary)' }}>₹{cityFuel.dieselPrice.toFixed(2)}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Per Liter in {cityFuel.cityName}</span>
            <span className={`metric-change ${cityFuel.dieselChange > 0 ? 'up' : cityFuel.dieselChange < 0 ? 'down' : 'flat'}`}>
              {cityFuel.dieselChange > 0 ? `+₹${cityFuel.dieselChange.toFixed(2)}` : cityFuel.dieselChange < 0 ? `-₹${Math.abs(cityFuel.dieselChange).toFixed(2)}` : 'Live Feed'}
            </span>
          </div>
        </div>

        {/* CNG Price */}
        <div className="metric-card glass-panel">
          <div className="metric-header">
            <span>CNG Auto Fuel</span>
            <Fuel size={16} />
          </div>
          <div className="metric-val">₹{cityFuel.cngPrice.toFixed(2)}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Per Kilogram</span>
            <span className="metric-change flat">Clean Mobility</span>
          </div>
        </div>

        {/* LPG Cylinder */}
        <div className="metric-card glass-panel">
          <div className="metric-header">
            <span>Domestic LPG (14.2kg)</span>
            <Fuel size={16} />
          </div>
          <div className="metric-val">₹{cityFuel.lpgPrice.toFixed(2)}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Subsidized / Non-Sub</span>
            <span className="metric-change flat">Monthly Revision</span>
          </div>
        </div>
      </div>

      {/* 7-DAY HISTORICAL TREND & PRICE BREAKDOWN MATRIX */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        {/* 7-Day Trend Chart Simulator */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>
            7-Day Historical Trend in {cityFuel.cityName}
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Daily price track records verified via dynamic IOCL/BPCL/HPCL public feeds
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {cityFuel.history7Days.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  background: idx === cityFuel.history7Days.length - 1 ? 'var(--accent-blue-light)' : 'var(--bg-tertiary)',
                  fontSize: '0.85rem'
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{item.date}</span>
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  <span>Petrol: <strong>₹{item.petrol.toFixed(2)}</strong></span>
                  <span style={{ color: 'var(--green-primary)' }}>Diesel: <strong>₹{item.diesel.toFixed(2)}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* State Tax & Cost Breakdown Component */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>
            Retail Petrol Price Anatomy ({cityFuel.cityName})
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Official regulatory breakdown of base crude, excise duty & {cityFuel.stateName} VAT
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--bg-card-border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Base Crude Refined Cost:</span>
              <span style={{ fontWeight: 600 }}>₹{cityFuel.breakdown.basePrice.toFixed(2)} / L</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--bg-card-border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Central Excise Duty (Govt of India):</span>
              <span style={{ fontWeight: 600 }}>₹{cityFuel.breakdown.centralExcise.toFixed(2)} / L</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--bg-card-border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>State VAT ({cityFuel.stateName}):</span>
              <span style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>₹{cityFuel.breakdown.stateVat.toFixed(2)} / L</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--bg-card-border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Dealer Commission (Pump Owner):</span>
              <span style={{ fontWeight: 600 }}>₹{cityFuel.breakdown.dealerCommission.toFixed(2)} / L</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', fontWeight: 800, fontSize: '1.05rem' }}>
              <span>Final Pump Price Today:</span>
              <span style={{ color: 'var(--accent-blue)' }}>₹{cityFuel.petrolPrice.toFixed(2)} / L</span>
            </div>
          </div>
        </div>
      </div>

      {/* CHEAPER NEARBY CITIES WIDGET */}
      <section style={{ marginTop: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin style={{ color: 'var(--green-primary)' }} />
          <span>Cheaper Nearby Fuel Stations & Inter-City Comparison</span>
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Compare today's rates in neighbouring districts of {cityFuel.stateName} to save on bulk refueling
        </p>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nearby City</th>
                <th>Distance Hub</th>
                <th>Petrol Rate</th>
                <th>Price Difference</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {neighborCities.map(neighbor => {
                const nFuel = fuelData[neighbor.id];
                if (!nFuel) return null;
                const diff = nFuel.petrolPrice - cityFuel.petrolPrice;
                const isCheaper = diff < 0;

                return (
                  <tr key={neighbor.id}>
                    <td style={{ fontWeight: 700 }}>{neighbor.name}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{neighbor.stateName}</td>
                    <td style={{ fontWeight: 700 }}>₹{nFuel.petrolPrice.toFixed(2)}/L</td>
                    <td>
                      {isCheaper ? (
                        <span style={{ color: 'var(--green-primary)', fontWeight: 700, background: 'var(--green-bg)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>
                          ₹{Math.abs(diff).toFixed(2)} Cheaper
                        </span>
                      ) : diff === 0 ? (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Identical</span>
                      ) : (
                        <span style={{ color: 'var(--red-primary)', fontSize: '0.8rem' }}>
                          +₹{diff.toFixed(2)} Higher
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => navigate(`/fuel-prices/${neighbor.stateSlug}/${neighbor.slug}`)}
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--accent-blue)',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>Check {neighbor.name}</span>
                        <ArrowRight size={12} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fuel Trip Cost Calculator */}
      <FuelTripCalculator currentCityData={cityFuel} fuelType="petrol" />

      {/* Internal Cross-Linking Grid */}
      <section className="crosslink-section">
        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>
          Explore Related Micro-Data in {cityFuel.cityName}
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Targeted hyper-local programmatic pages with zero crawl orphan pages
        </p>

        <div className="crosslink-grid">
          <button 
            className="crosslink-chip" 
            onClick={() => navigate(`/gold-rates/${stateSlug}/${citySlug}`)}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Coins size={14} style={{ color: 'var(--gold-primary)' }} />
              <span>{cityFuel.cityName} Live Gold Rates</span>
            </span>
            <ArrowRight size={13} />
          </button>

          {neighborCities.map(nc => (
            <button 
              key={nc.id}
              className="crosslink-chip" 
              onClick={() => navigate(`/fuel-prices/${nc.stateSlug}/${nc.slug}`)}
            >
              <span>{nc.name} Petrol & Diesel</span>
              <ArrowRight size={13} />
            </button>
          ))}

          <button 
            className="crosslink-chip" 
            onClick={() => navigate('/exam-schedules')}
          >
            <span>Central & State Sarkari Exams</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </section>
    </div>
  );
}
