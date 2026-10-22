import React, { useState } from 'react';
import { Calculator, ShieldCheck, Info } from 'lucide-react';

export default function GoldCalculator({ defaultCityData }) {
  const [purity, setPurity] = useState('22k'); // 24k | 22k | 18k
  const [weight, setWeight] = useState(8); // default 8g = 1 Sovereign
  const [weightUnit, setWeightUnit] = useState('grams'); // grams | sovereign | tola
  const [makingChargesPct, setMakingChargesPct] = useState(10); // 10%

  const ratePerGram = purity === '24k' 
    ? (defaultCityData?.gold24kPerGram || 14725)
    : purity === '22k'
    ? (defaultCityData?.gold22kPerGram || 13490)
    : (defaultCityData?.gold18kPerGram || 11044);

  // Compute grams based on unit
  const effectiveGrams = weightUnit === 'sovereign' 
    ? weight * 8 
    : weightUnit === 'tola' 
    ? weight * 10 
    : weight;

  const rawGoldCost = effectiveGrams * ratePerGram;
  const makingCharges = (rawGoldCost * (makingChargesPct / 100));
  const hallmarkingFee = 45; // Standard BIS hallmarking charge per article
  const subtotalBeforeGst = rawGoldCost + makingCharges + hallmarkingFee;
  const gstAmount = subtotalBeforeGst * 0.03; // 3% GST
  const grandTotal = subtotalBeforeGst + gstAmount;

  return (
    <div className="calc-card" style={{ marginTop: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ background: 'var(--gold-bg)', color: 'var(--gold-primary)', padding: '6px', borderRadius: '8px' }}>
            <Calculator size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem' }}>Gold & Jewellery Billing Calculator</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Accurate breakdown with Making Charges, BIS Hallmarking & 3% GST
            </p>
          </div>
        </div>
        <span style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px', 
          fontSize: '0.75rem', 
          background: 'var(--gold-bg)', 
          color: 'var(--gold-primary)', 
          padding: '3px 8px', 
          borderRadius: '4px',
          fontWeight: 700 
        }}>
          <ShieldCheck size={14} /> BIS 916 Compliant
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Gold Purity</label>
          <select 
            className="form-select" 
            value={purity} 
            onChange={(e) => setPurity(e.target.value)}
          >
            <option value="24k">24 Karat (99.9% Pure Gold)</option>
            <option value="22k">22 Karat (91.6% Hallmarked Jewellery)</option>
            <option value="18k">18 Karat (75.0% Diamond Studded)</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Unit of Weight</label>
          <select 
            className="form-select" 
            value={weightUnit} 
            onChange={(e) => setWeightUnit(e.target.value)}
          >
            <option value="grams">Grams (g)</option>
            <option value="sovereign">Pavan / Sovereign (8g each)</option>
            <option value="tola">Tola (10g each)</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Quantity / Weight</label>
          <input 
            type="number" 
            className="form-input" 
            value={weight} 
            min="0.1" 
            step="0.5"
            onChange={(e) => setWeight(Math.max(0.1, parseFloat(e.target.value) || 0))}
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Making Charges ({makingChargesPct}%)</label>
          <input 
            type="range" 
            min="5" 
            max="25" 
            value={makingChargesPct} 
            onChange={(e) => setMakingChargesPct(Number(e.target.value))}
            style={{ width: '100%', marginTop: '8px' }}
          />
        </div>
      </div>

      {/* Invoice Calculation Breakdown Box */}
      <div style={{ 
        background: 'var(--bg-tertiary)', 
        borderRadius: '10px', 
        padding: '1.25rem',
        border: '1px solid var(--bg-card-border)' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>
            Base Gold Cost ({effectiveGrams.toFixed(2)}g @ ₹{ratePerGram.toLocaleString('en-IN')}/g):
          </span>
          <span style={{ fontWeight: 600 }}>₹{Math.round(rawGoldCost).toLocaleString('en-IN')}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Making / Wastage Charges ({makingChargesPct}%):</span>
          <span style={{ fontWeight: 600 }}>+₹{Math.round(makingCharges).toLocaleString('en-IN')}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Mandatory BIS Hallmarking Fee:</span>
          <span style={{ fontWeight: 600 }}>+₹{hallmarkingFee}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>GST on Total Invoice (3.0%):</span>
          <span style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>+₹{Math.round(gstAmount).toLocaleString('en-IN')}</span>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '0.75rem', 
          paddingTop: '0.75rem', 
          borderTop: '1px dashed var(--bg-card-border)',
          alignItems: 'baseline'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Final Estimated Invoice Amount
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--green-primary)' }}>
              *Subject to exact jeweller craftsmanship & wastage rates
            </div>
          </div>
          <div style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '1.75rem', 
            fontWeight: 800, 
            color: 'var(--gold-primary)' 
          }}>
            ₹{Math.round(grandTotal).toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    </div>
  );
}
