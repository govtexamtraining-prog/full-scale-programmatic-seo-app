import React, { useState } from 'react';
import { Fuel, Navigation, IndianRupee, Sparkles } from 'lucide-react';

export default function FuelTripCalculator({ currentCityData, fuelType = "petrol" }) {
  const [distanceKm, setDistanceKm] = useState(120);
  const [mileageKmpl, setMileageKmpl] = useState(16);
  const [selectedFuel, setSelectedFuel] = useState(fuelType); // petrol | diesel

  const fuelRate = selectedFuel === 'petrol' 
    ? (currentCityData?.petrolPrice || 101.38)
    : (currentCityData?.dieselPrice || 92.95);

  const litersNeeded = (distanceKm / (mileageKmpl || 1));
  const totalCost = litersNeeded * fuelRate;
  const costPerKm = totalCost / (distanceKm || 1);

  return (
    <div className="calc-card" style={{ marginTop: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ background: 'var(--accent-blue-light)', color: 'var(--accent-blue)', padding: '6px', borderRadius: '8px' }}>
            <Navigation size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem' }}>Trip Fuel Cost & Mileage Estimator</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Calculate exact fuel expenses based on {currentCityData?.cityName || "Local"} rates
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Fuel Type</label>
          <select 
            className="form-select"
            value={selectedFuel} 
            onChange={(e) => setSelectedFuel(e.target.value)}
          >
            <option value="petrol">Petrol (₹{currentCityData?.petrolPrice?.toFixed(2) || '101.38'}/L)</option>
            <option value="diesel">Diesel (₹{currentCityData?.dieselPrice?.toFixed(2) || '92.95'}/L)</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Total Trip Distance (km)</label>
          <input 
            type="number" 
            className="form-input" 
            value={distanceKm} 
            min="1" 
            onChange={(e) => setDistanceKm(Math.max(1, parseFloat(e.target.value) || 0))}
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Vehicle Mileage (km/L)</label>
          <input 
            type="number" 
            className="form-input" 
            value={mileageKmpl} 
            min="1" 
            onChange={(e) => setMileageKmpl(Math.max(1, parseFloat(e.target.value) || 1))}
          />
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
        gap: '1rem',
        background: 'var(--bg-tertiary)',
        padding: '1.25rem',
        borderRadius: '10px',
        border: '1px solid var(--bg-card-border)'
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Fuel Required
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800 }}>
            {litersNeeded.toFixed(2)} <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Liters</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Cost Per Kilometer
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-blue)' }}>
            ₹{costPerKm.toFixed(2)} <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>/ km</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Total Estimated Trip Cost
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--green-primary)' }}>
            ₹{Math.round(totalCost).toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    </div>
  );
}
