import React, { useState, useEffect } from 'react';
import { 
  Swords, 
  Shield, 
  Zap, 
  Download, 
  ExternalLink, 
  Sparkles, 
  Flame, 
  Crosshair, 
  FileText, 
  Layers, 
  ChevronRight, 
  ArrowRight, 
  Maximize2, 
  Minimize2, 
  Smartphone, 
  Monitor, 
  Volume2, 
  VolumeX, 
  Award, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Star, 
  Compass, 
  BookOpen, 
  User, 
  Terminal,
  Wifi,
  BatteryCharging
} from 'lucide-react';

// Daily Motivational Quotes for Retro Arcade Dialogue Box
const ARCADE_QUOTES = [
  { id: 1, text: "The path to Mastery is paved with Discipline. Slay your Exams!", author: "SARKARI ORACLE" },
  { id: 2, text: "Failure is not Game Over. It's just a checkpoint reload. Grind again!", author: "VETERAN OFFICER" },
  { id: 3, text: "Every syllabus chapter cleared is +500 XP. Top 0.1% rank within reach.", author: "QUEST DISPATCH" },
  { id: 4, text: "Level 99 Boss: UPSC Prelims. Weapon of Choice: Relentless Revision. Victory: Inevitable.", author: "WAR ROOM CHIEF" },
  { id: 5, text: "The merit list isn't luck — it's compiled code of your late-night commits.", author: "SYSTEM AI" },
  { id: 6, text: "Focus your radar. Target locked on Central & State notifications.", author: "RADAR COMMAND" }
];

// Boss-Battle Event Nodes on the Quest Calendar Timeline
const BOSS_EVENT_NODES = [
  {
    id: 'boss-upsc-prelims',
    title: 'UPSC CIVIL SERVICES PRELIMS',
    code: 'UPSC CSE 2026',
    date: 'MAY 24',
    time: '09:30 IST',
    year: '2026',
    badge: 'RAID BOSS 01',
    tier: 'TIER EX // LEVEL 99',
    bossType: 'WORLD BOSS',
    icon: 'swords',
    accentColor: '#ff007f', // hot magenta
    readinessPct: 78,
    countdown: '28d 14h 22m',
    lootDrop: '1,056 Elite IAS / IPS Officer Vacancies',
    hpBar: '78% PREPARED',
    difficulty: 'NIGHTMARE',
    orgSlug: 'upsc',
    postSlug: 'civil-services-ias-prelims-2026',
    applyLink: 'https://upsconline.nic.in',
    pdfLink: 'https://upsc.gov.in/examinations/active-examinations',
    briefing: 'Paper I (GS 200 Marks) + Paper II (CSAT 33% qualifying). Negative marking 1/3rd. Target cutoff estimate: 89 - 94 Marks.'
  },
  {
    id: 'boss-ssc-cgl',
    title: 'SSC CGL TIER-1 MEGA EVENT',
    code: 'SSC CGL 2026',
    date: 'SEP 15',
    time: '10:00 IST',
    year: '2026',
    badge: 'ELITE TITAN',
    tier: 'LEVEL 85 BOSS',
    bossType: 'MINIBOSS EVENT',
    icon: 'shield',
    accentColor: '#00f0ff', // electric teal
    readinessPct: 62,
    countdown: '74d 08h 15m',
    lootDrop: '17,727 Central Officer Cadre Posts',
    hpBar: '62% CHARGING',
    difficulty: 'HARD',
    orgSlug: 'ssc',
    postSlug: 'cgl-tier-1-2026',
    applyLink: 'https://ssc.gov.in',
    pdfLink: 'https://ssc.gov.in/notices',
    briefing: '100 Questions, 200 Marks in 60 mins. High-speed reasoning, quantitative aptitude, English comprehension & general awareness.'
  },
  {
    id: 'boss-rrb-ntpc',
    title: 'RAILWAYS RRB NTPC CBT-1',
    code: 'RRB CEN 05/2026',
    date: 'OCT 20',
    time: '11:30 IST',
    year: '2026',
    badge: 'RAIL OVERLORD',
    tier: 'LEVEL 75 BOSS',
    bossType: 'DUNGEON RAID',
    icon: 'zap',
    accentColor: '#00ff9d', // neon emerald
    readinessPct: 91,
    countdown: '112d 19h 40m',
    lootDrop: '11,558 Station Master & Traffic Posts',
    hpBar: '91% LOCKED',
    difficulty: 'MEDIUM-HARD',
    orgSlug: 'rrb',
    postSlug: 'rrb-ntpc-graduate-2026',
    applyLink: 'https://www.rrbapply.gov.in',
    pdfLink: 'https://www.indianrailways.gov.in',
    briefing: 'Computer Based Test across 15 regional languages. 100 questions testing mathematics, general intelligence & current affairs.'
  },
  {
    id: 'boss-upprpb-police',
    title: 'UP POLICE SI & CONSTABLE',
    code: 'UPPRPB 2026',
    date: 'JUN 28',
    time: '08:00 IST',
    year: '2026',
    badge: 'TACTICAL SQUAD',
    tier: 'LEVEL 70 SQUAD',
    bossType: 'HORDE BATTLE',
    icon: 'crosshair',
    accentColor: '#ff007f', // magenta
    readinessPct: 45,
    countdown: '42d 06h 10m',
    lootDrop: '60,244 State Constabulary Positions',
    hpBar: '45% CHARGING',
    difficulty: 'TACTICAL',
    orgSlug: 'upprpb',
    postSlug: 'up-police-constable-2026',
    applyLink: 'https://uppbpb.gov.in',
    pdfLink: 'https://uppbpb.gov.in',
    briefing: 'OMR offline test: 150 questions (300 marks). Physical standard test & 4.8 km endurance run follows written qualification.'
  },
  {
    id: 'boss-bpsc-71st',
    title: 'BPSC 71ST COMBINED PRELIMS',
    code: 'BPSC CCE 2026',
    date: 'DEC 13',
    time: '12:00 IST',
    year: '2026',
    badge: 'PROVINCIAL BOSS',
    tier: 'LEVEL 80 TITAN',
    bossType: 'STATE OVERLORD',
    icon: 'flame',
    accentColor: '#ffb703', // gold
    readinessPct: 35,
    countdown: '180d 02h 45m',
    lootDrop: '1,929 Sub-Divisional Officer Roles',
    hpBar: '35% CHARGING',
    difficulty: 'HARD',
    orgSlug: 'bpsc',
    postSlug: 'bpsc-70th-cce-prelims-2026',
    applyLink: 'https://bpsc.bih.nic.in',
    pdfLink: 'https://bpsc.bih.nic.in',
    briefing: 'Single paper objective general studies (150 questions, 150 marks). Negative marking 1/3rd. Focus on Bihar history & economy.'
  }
];

// Collectible Digital Loot Cards for Downloadable PDF Resources
const DIGITAL_LOOT_CARDS = [
  {
    id: 'loot-upsc-syllabus',
    title: 'Civil Services 2026 Master Syllabus & Blueprint',
    shortName: 'UPSC CSE 2026 MASTER SYLLABUS',
    rarity: 'legendary', // legendary | epic | rare | special
    rarityLabel: 'LEGENDARY LOOT',
    rarityColor: '#ffb703',
    version: 'v3.2',
    size: '18.5 MB',
    powerLevel: 99,
    claims: '142k Claims',
    category: 'Syllabus & Blueprints',
    org: 'UPSC',
    downloadUrl: 'https://upsc.gov.in/examinations/active-examinations',
    description: 'Complete paper-wise GS Paper I to IV micro-topic index, CSAT decision matrix, and official 2026 marking guidelines.'
  },
  {
    id: 'loot-ssc-cgl-notification',
    title: 'SSC CGL 2026 Official Circular & Post Code Matrix',
    shortName: 'SSC CGL MASTER DIRECTORY',
    rarity: 'epic',
    rarityLabel: 'EPIC ITEM',
    rarityColor: '#ff007f',
    version: 'v2.1',
    size: '12.4 MB',
    powerLevel: 88,
    claims: '215k Claims',
    category: 'Official Notification',
    org: 'SSC',
    downloadUrl: 'https://ssc.gov.in/notices',
    description: 'Post-wise pay level breakdown, state vacancy allocation, Tier-1 & Tier-2 normalized cutoff formulas.'
  },
  {
    id: 'loot-rrb-ntpc-handbook',
    title: 'RRB NTPC CEN 05/2026 Complete Candidate Guide',
    shortName: 'RRB NTPC DUNGEON BLUEPRINT',
    rarity: 'epic',
    rarityLabel: 'EPIC ITEM',
    rarityColor: '#ff007f',
    version: 'v2.0',
    size: '9.1 MB',
    powerLevel: 84,
    claims: '98k Claims',
    category: 'Candidate Handbook',
    org: 'RRB',
    downloadUrl: 'https://www.indianrailways.gov.in',
    description: 'Medical fitness A2/A3 norms for Station Master, typing skill test rules, and CBT-1 to CBT-2 transition scores.'
  },
  {
    id: 'loot-uppolice-admitcard',
    title: 'UP Police Constable City Intimation & Hall Ticket Slip',
    shortName: 'TACTICAL CITY ALLOTMENT SLIP',
    rarity: 'rare',
    rarityLabel: 'RARE DROP',
    rarityColor: '#00f0ff',
    version: 'v1.0',
    size: '4.3 MB',
    powerLevel: 76,
    claims: '310k Claims',
    category: 'Admit Card & Hall Ticket',
    org: 'UPPRPB',
    downloadUrl: 'https://uppbpb.gov.in',
    description: 'Official biometric reporting timings, test venue QR codes, and photo identity verification rules.'
  },
  {
    id: 'loot-tnpsc-otr-circular',
    title: 'TNPSC Group-1 OTR & Prelims Hall Ticket Circular',
    shortName: 'TAMIL NADU PSC EXAM PASS',
    rarity: 'rare',
    rarityLabel: 'RARE DROP',
    rarityColor: '#00f0ff',
    version: 'v1.2',
    size: '3.8 MB',
    powerLevel: 75,
    claims: '64k Claims',
    category: 'Hall Ticket Circular',
    org: 'TNPSC',
    downloadUrl: 'https://apply.tnpscexams.in',
    description: 'Aadhaar linked One-Time Registration rules, bilingual question format, and Chennai/Madurai center matrix.'
  },
  {
    id: 'loot-bpsc-key',
    title: 'BPSC 70th CCE Final Answer Key & Cut-Off Ledger',
    shortName: 'OFFICIAL SCORING CIPHER',
    rarity: 'special',
    rarityLabel: 'SPECIAL KEY',
    rarityColor: '#00ff9d',
    version: 'v1.0',
    size: '2.9 MB',
    powerLevel: 72,
    claims: '88k Claims',
    category: 'Answer Key & Cutoffs',
    org: 'BPSC',
    downloadUrl: 'https://bpsc.bih.nic.in',
    description: 'Question booklet Series A, B, C, D master key with panel-verified disputed answer resolutions.'
  }
];

export default function CyberpunkExamQuestHub({ navigate, onFilterCategory }) {
  const [isMobileFrame, setIsMobileFrame] = useState(false); // Can toggle between iPhone Frame and Fullscreen HUD
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [selectedBoss, setSelectedBoss] = useState(BOSS_EVENT_NODES[0]);
  const [lootRarityFilter, setLootRarityFilter] = useState('all');
  const [claimedLootIds, setClaimedLootIds] = useState(new Set());
  const [activeDockTab, setActiveDockTab] = useState('dashboard');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Web Audio 8-bit Synthesizer Sound Effects (Pure browser audio, zero external file dependency)
  const playSfx = (type = 'click') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'loot') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.06); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.12); // G5
        osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.18); // C6
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'boss') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  };

  const handleNextQuote = () => {
    playSfx('click');
    setCurrentQuoteIndex(prev => (prev + 1) % ARCADE_QUOTES.length);
  };

  const handleSelectBoss = (boss) => {
    playSfx('boss');
    setSelectedBoss(boss);
  };

  const handleClaimLoot = (loot) => {
    playSfx('loot');
    setClaimedLootIds(prev => new Set([...prev, loot.id]));
    window.open(loot.downloadUrl, '_blank', 'noopener,noreferrer');
  };

  // Filter loot cards by selected rarity
  const filteredLoot = DIGITAL_LOOT_CARDS.filter(card => {
    if (lootRarityFilter === 'all') return true;
    return card.rarity === lootRarityFilter;
  });

  const activeQuote = ARCADE_QUOTES[currentQuoteIndex];

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      {/* Top Cyberpunk Command Controls Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        background: 'rgba(5, 7, 12, 0.95)',
        border: '1px solid rgba(0, 240, 255, 0.25)',
        borderRadius: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: '10px', 
            height: '10px', 
            borderRadius: '50%', 
            background: '#00f0ff', 
            boxShadow: '0 0 10px #00f0ff',
            animation: 'pulse 1.5s infinite' 
          }} />
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontWeight: 800, 
            fontSize: '0.85rem', 
            color: '#00f0ff', 
            letterSpacing: '0.08em' 
          }}>
            CYBERPUNK HUD // UNREAL ENGINE UI 2026
          </span>
          <span style={{ 
            background: 'rgba(255, 0, 127, 0.2)', 
            color: '#ff007f', 
            border: '1px solid rgba(255, 0, 127, 0.4)',
            fontSize: '0.65rem',
            fontFamily: 'var(--font-mono)',
            padding: '1px 6px',
            borderRadius: '4px',
            fontWeight: 800
          }}>
            DARK MODE OBSIDIAN
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Sound FX Toggle */}
          <button
            onClick={() => { setSoundEnabled(!soundEnabled); playSfx('click'); }}
            style={{
              background: soundEnabled ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: soundEnabled ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
              color: soundEnabled ? '#00f0ff' : 'var(--text-muted)',
              padding: '5px 9px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700
            }}
            title={soundEnabled ? '8-bit Audio SFX Enabled' : 'Audio SFX Muted'}
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span>SFX {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* iOS Mobile Simulator vs Fullscreen HUD View Switch */}
          <button
            onClick={() => { setIsMobileFrame(!isMobileFrame); playSfx('click'); }}
            className="cb-chamfer-button"
            style={{
              background: isMobileFrame ? 'linear-gradient(135deg, #ff007f, #b80058)' : 'linear-gradient(135deg, #00f0ff, #0099cc)',
              color: '#000000',
              border: 'none',
              padding: '6px 14px',
              fontSize: '0.75rem',
              fontWeight: 900,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {isMobileFrame ? <Monitor size={13} /> : <Smartphone size={13} />}
            <span>{isMobileFrame ? 'WIDESCREEN HUD' : 'iOS MOBILE VIEW'}</span>
          </button>
        </div>
      </div>

      {/* Main Container: Conditioned on isMobileFrame */}
      <div className={isMobileFrame ? 'cb-ios-viewport' : ''}>
        {/* iOS Dynamic Island & Status Bar (Visible in mobile frame mode) */}
        {isMobileFrame && (
          <>
            <div className="cb-dynamic-island">
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff007f', boxShadow: '0 0 6px #ff007f' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#111827' }} />
              <span style={{ fontSize: '0.62rem', color: '#00f0ff', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>LIVE</span>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '0.4rem 1.75rem 0.6rem', 
              color: 'var(--text-secondary)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700
            }}>
              <span style={{ color: '#ffffff', fontWeight: 900 }}>14:00</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.65rem' }}>5G</span>
                <Wifi size={12} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#00ff9d' }}>
                  <BatteryCharging size={13} />
                  <span style={{ fontSize: '0.68rem' }}>98%</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Cyberpunk Main Canvas */}
        <div 
          className="cb-grid-bg" 
          style={{ 
            padding: isMobileFrame ? '0.75rem 1rem 1.5rem' : '1.75rem 1.5rem 2rem',
            border: isMobileFrame ? 'none' : '1.5px solid rgba(0, 240, 255, 0.25)',
            borderRadius: isMobileFrame ? '0' : '16px',
            boxShadow: isMobileFrame ? 'none' : '0 15px 45px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 240, 255, 0.08)'
          }}
        >
          {/* USER GAMER HUD PROFILE HEADER */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Holographic Avatar Ring */}
              <div style={{
                position: 'relative',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff007f, #00f0ff)',
                padding: '2px',
                boxShadow: '0 0 16px rgba(0, 240, 255, 0.6)'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: '#05070c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}>
                  <User size={22} style={{ color: '#00f0ff' }} />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '-2px',
                  right: '-2px',
                  background: '#ff007f',
                  color: '#ffffff',
                  fontSize: '0.55rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 900,
                  padding: '1px 4px',
                  borderRadius: '4px',
                  border: '1px solid #000'
                }}>
                  42
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontWeight: 900, 
                    fontSize: '1rem', 
                    color: '#ffffff',
                    letterSpacing: '0.04em'
                  }}>
                    EXAM QUEST HUB
                  </span>
                  <span style={{
                    background: 'rgba(0, 240, 255, 0.15)',
                    color: '#00f0ff',
                    fontSize: '0.62rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '1px 6px',
                    borderRadius: '3px',
                    fontWeight: 800,
                    border: '1px solid rgba(0, 240, 255, 0.4)'
                  }}>
                    iOS HUD v4.0
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                  RANK: SPECIAL AGENT // <span style={{ color: '#ffb703' }}>8,450 XP TO IAS CADRE</span>
                </div>
              </div>
            </div>

            {/* Micro-Charging Status Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: '#00f0ff', fontWeight: 800 }}>
                  RADAR SCANNER
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  SYNCED 24 OCT 2026
                </div>
              </div>
              <div style={{ 
                width: '42px', 
                height: '7px', 
                background: 'rgba(255, 255, 255, 0.08)', 
                borderRadius: '3px', 
                overflow: 'hidden',
                border: '1px solid rgba(0, 240, 255, 0.4)'
              }}>
                <div 
                  className="cb-charging-bar" 
                  style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #00f0ff, #ff007f)' }} 
                />
              </div>
            </div>
          </div>

          {/* 1. FLOATING RETRO ARCADE DIALOGUE BOX (Daily Motivational Oracle) */}
          <div className="cb-arcade-dialogue" style={{ padding: '1.15rem 1.35rem', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Terminal size={14} style={{ color: '#00f0ff' }} />
                <span style={{ 
                  color: '#00f0ff', 
                  fontFamily: 'var(--font-mono)', 
                  fontWeight: 900, 
                  fontSize: '0.76rem', 
                  letterSpacing: '0.08em' 
                }}>
                  [QUEST LOG // {activeQuote.author}]&gt;
                </span>
              </div>
              <span style={{ 
                fontSize: '0.65rem', 
                fontFamily: 'var(--font-mono)', 
                color: '#ff007f', 
                fontWeight: 800 
              }}>
                DISPATCH #{currentQuoteIndex + 1}/{ARCADE_QUOTES.length}
              </span>
            </div>

            <div style={{ 
              fontSize: 'clamp(0.92rem, 2vw, 1.05rem)', 
              fontWeight: 800, 
              color: '#ffffff', 
              lineHeight: 1.45,
              fontFamily: 'var(--font-mono)',
              minHeight: '44px'
            }}>
              "{activeQuote.text}"
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.65rem' }}>
              <button
                onClick={handleNextQuote}
                className="cb-chamfer-button"
                style={{
                  background: 'linear-gradient(90deg, rgba(255, 0, 127, 0.2), rgba(0, 240, 255, 0.2))',
                  border: '1px solid #00f0ff',
                  color: '#00f0ff',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>&gt;[PRESS START / NEXT]</span>
                <ChevronRight size={12} />
              </button>
            </div>
          </div>

          {/* 2. INTERACTIVE "EXAM QUEST CALENDAR" (Glowing Boss-Battle Event Nodes on Timeline) */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '0.85rem',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#00f0ff', fontSize: '1.1rem', fontWeight: 900 }}>&gt;</span>
                <h2 style={{ 
                  fontSize: '1.15rem', 
                  fontWeight: 900, 
                  margin: 0, 
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em'
                }}>
                  EXAM QUEST CALENDAR
                </h2>
                <span style={{
                  fontSize: '0.62rem',
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(255, 0, 127, 0.2)',
                  color: '#ff007f',
                  border: '1px solid rgba(255, 0, 127, 0.4)',
                  padding: '1px 6px',
                  borderRadius: '3px',
                  fontWeight: 800
                }}>
                  BOSS BATTLE TIMELINE
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  MICRO-CHARGING:
                </span>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <div 
                      key={i} 
                      style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '2px', 
                        background: i <= 4 ? '#00f0ff' : 'rgba(255, 255, 255, 0.1)',
                        boxShadow: i <= 4 ? '0 0 6px #00f0ff' : 'none'
                      }} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Glowing Connecting Vector Line */}
            <div className="cb-vector-line" style={{ marginBottom: '0.75rem' }} />

            {/* Horizontal Timeline Track */}
            <div className="cb-timeline-track">
              {BOSS_EVENT_NODES.map((boss) => {
                const isSelected = selectedBoss?.id === boss.id;
                const isMagenta = boss.accentColor === '#ff007f';

                return (
                  <div
                    key={boss.id}
                    onClick={() => handleSelectBoss(boss)}
                    className={`cb-boss-card ${isMagenta ? 'cb-magenta-boss' : ''}`}
                    style={{
                      background: isSelected 
                        ? (isMagenta ? 'rgba(35, 10, 24, 0.95)' : 'rgba(10, 25, 38, 0.95)')
                        : 'rgba(12, 17, 28, 0.92)',
                      borderColor: isSelected ? boss.accentColor : undefined,
                      boxShadow: isSelected 
                        ? `0 0 30px ${isMagenta ? 'rgba(255, 0, 127, 0.5)' : 'rgba(0, 240, 255, 0.5)'}` 
                        : undefined
                    }}
                  >
                    {/* Top Row: Date & Boss Icon */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                      <div style={{ 
                        background: 'rgba(0, 0, 0, 0.6)', 
                        border: `1px solid ${boss.accentColor}55`, 
                        borderRadius: '8px',
                        padding: '4px 8px',
                        textAlign: 'center',
                        minWidth: '55px'
                      }}>
                        <div style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 800 }}>
                          {boss.date.split(' ')[0]}
                        </div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 900, color: boss.accentColor, lineHeight: 1 }}>
                          {boss.date.split(' ')[1]}
                        </div>
                        <div style={{ fontSize: '0.55rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                          {boss.time}
                        </div>
                      </div>

                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: `${boss.accentColor}22`,
                        border: `1.5px solid ${boss.accentColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: boss.accentColor,
                        boxShadow: `0 0 12px ${boss.accentColor}55`
                      }}>
                        {boss.icon === 'swords' && <Swords size={18} />}
                        {boss.icon === 'shield' && <Shield size={18} />}
                        {boss.icon === 'zap' && <Zap size={18} />}
                        {boss.icon === 'crosshair' && <Crosshair size={18} />}
                        {boss.icon === 'flame' && <Flame size={18} />}
                      </div>
                    </div>

                    {/* Boss Node Title & Badge */}
                    <div style={{
                      fontSize: '0.62rem',
                      fontFamily: 'var(--font-mono)',
                      color: boss.accentColor,
                      fontWeight: 800,
                      letterSpacing: '0.04em'
                    }}>
                      [{boss.badge}]
                    </div>

                    <div style={{ 
                      fontSize: '0.88rem', 
                      fontWeight: 900, 
                      color: '#ffffff', 
                      lineHeight: 1.25, 
                      margin: '4px 0 8px' 
                    }}>
                      {boss.title}
                    </div>

                    {/* Micro-Charging HP Bar */}
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '3px' }}>
                        <span>READINESS:</span>
                        <span style={{ color: boss.accentColor, fontWeight: 800 }}>{boss.hpBar}</span>
                      </div>
                      <div style={{ 
                        height: '6px', 
                        background: 'rgba(255, 255, 255, 0.08)', 
                        borderRadius: '3px', 
                        overflow: 'hidden',
                        border: `1px solid ${boss.accentColor}44`
                      }}>
                        <div 
                          className="cb-charging-bar"
                          style={{ 
                            width: `${boss.readinessPct}%`, 
                            height: '100%', 
                            background: `linear-gradient(90deg, ${boss.accentColor}, #ffffff)` 
                          }} 
                        />
                      </div>
                    </div>

                    {/* Countdown Timer */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      fontSize: '0.65rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                      paddingTop: '6px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#ffffff' }}>
                        <Clock size={11} style={{ color: boss.accentColor }} />
                        {boss.countdown}
                      </span>
                      <span style={{ 
                        color: boss.accentColor, 
                        fontWeight: 800, 
                        fontSize: '0.62rem' 
                      }}>
                        {isSelected ? 'LOCKED ON' : 'SELECT NODE'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SELECTED BOSS BATTLE DOSSIER DRAWER */}
            {selectedBoss && (
              <div 
                className="cb-chamfer-box"
                style={{
                  background: 'rgba(9, 13, 22, 0.95)',
                  border: `1.5px solid ${selectedBoss.accentColor}`,
                  borderRadius: '10px',
                  padding: '1.25rem 1.35rem',
                  marginTop: '1rem',
                  boxShadow: `0 10px 30px rgba(0, 0, 0, 0.8), 0 0 25px ${selectedBoss.accentColor}33`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '0.68rem', 
                        background: `${selectedBoss.accentColor}25`, 
                        color: selectedBoss.accentColor,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: 800,
                        border: `1px solid ${selectedBoss.accentColor}55`
                      }}>
                        {selectedBoss.tier}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        TARGET DATE: {selectedBoss.date} {selectedBoss.year}
                      </span>
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff' }}>
                      {selectedBoss.title}
                    </div>
                  </div>

                  {/* Loot Reward Matrix */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 183, 3, 0.4)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Star size={14} style={{ color: '#ffb703' }} />
                    <span style={{ fontSize: '0.78rem', color: '#ffb703', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                      LOOT YIELD: {selectedBoss.lootDrop}
                    </span>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.55, margin: '0 0 1rem' }}>
                  {selectedBoss.briefing}
                </p>

                {/* Tactile Action Buttons */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <a
                    href={selectedBoss.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cb-chamfer-button"
                    style={{
                      background: `linear-gradient(135deg, ${selectedBoss.accentColor}, #ffffff)`,
                      color: '#000000',
                      padding: '8px 16px',
                      fontSize: '0.8rem',
                      fontWeight: 900,
                      fontFamily: 'var(--font-mono)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>ENGAGE BOSS // APPLY ONLINE</span>
                    <ExternalLink size={12} />
                  </a>

                  <a
                    href={selectedBoss.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cb-chamfer-button"
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'var(--text-primary)',
                      padding: '8px 14px',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Download size={13} />
                    <span>OFFICIAL BRIEFING PDF</span>
                  </a>

                  {navigate && (
                    <button
                      onClick={() => navigate(`/exam-schedules/${selectedBoss.orgSlug}/${selectedBoss.postSlug}`)}
                      className="cb-chamfer-button"
                      style={{
                        background: 'transparent',
                        border: `1px solid ${selectedBoss.accentColor}`,
                        color: selectedBoss.accentColor,
                        padding: '8px 14px',
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      <span>FULL INTEL &amp; SYLLABUS &rarr;</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 3. HIGH-TECH INVENTORY LIST FOR DOWNLOADABLE PDF RESOURCES (Collectible Digital Loot Cards) */}
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '1rem',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#ff007f', fontSize: '1.1rem', fontWeight: 900 }}>&gt;</span>
                <h2 style={{ 
                  fontSize: '1.15rem', 
                  fontWeight: 900, 
                  margin: 0, 
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em'
                }}>
                  RESOURCE INVENTORY
                </h2>
                <span style={{
                  fontSize: '0.62rem',
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(0, 240, 255, 0.2)',
                  color: '#00f0ff',
                  border: '1px solid rgba(0, 240, 255, 0.4)',
                  padding: '1px 6px',
                  borderRadius: '3px',
                  fontWeight: 800
                }}>
                  DOWNLOADABLE PDF LOOT
                </span>
              </div>

              {/* Rarity Filter Tactile Toggle Switches */}
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: 'ALL LOOT' },
                  { id: 'legendary', label: '★ LEGENDARY', color: '#ffb703' },
                  { id: 'epic', label: '◆ EPIC', color: '#ff007f' },
                  { id: 'rare', label: '● RARE', color: '#00f0ff' }
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => { setLootRarityFilter(r.id); playSfx('click'); }}
                    style={{
                      background: lootRarityFilter === r.id ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.4)',
                      color: lootRarityFilter === r.id ? (r.color || '#ffffff') : 'var(--text-muted)',
                      border: lootRarityFilter === r.id ? `1.5px solid ${r.color || '#ffffff'}` : '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: lootRarityFilter === r.id && r.color ? `0 0 10px ${r.color}55` : 'none'
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Glowing Vector Line */}
            <div className="cb-vector-line-magenta" style={{ marginBottom: '1.25rem' }} />

            {/* Collectible Digital Loot Cards Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobileFrame ? '1fr' : 'repeat(auto-fill, minmax(min(270px, 100%), 1fr))', 
              gap: '1rem' 
            }}>
              {filteredLoot.map(card => {
                const isClaimed = claimedLootIds.has(card.id);
                const rarityClass = 
                  card.rarity === 'legendary' ? 'cb-loot-legendary' :
                  card.rarity === 'epic' ? 'cb-loot-epic' :
                  card.rarity === 'rare' ? 'cb-loot-rare' : 'cb-loot-special';

                return (
                  <div key={card.id} className={`cb-loot-card ${rarityClass}`}>
                    <div>
                      {/* Top Rarity Ribbon & Power Stat */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{
                          fontSize: '0.62rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 900,
                          color: card.rarityColor,
                          background: `${card.rarityColor}20`,
                          border: `1px solid ${card.rarityColor}66`,
                          padding: '2px 7px',
                          borderRadius: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          {card.rarity === 'legendary' && <Star size={10} />}
                          {card.rarity === 'epic' && <Sparkles size={10} />}
                          {card.rarity === 'rare' && <Zap size={10} />}
                          <span>{card.rarityLabel}</span>
                        </span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ 
                            fontSize: '0.62rem', 
                            color: 'var(--text-muted)', 
                            fontFamily: 'var(--font-mono)' 
                          }}>
                            PWR: <strong style={{ color: '#ffffff' }}>{card.powerLevel}</strong>
                          </span>
                          <span style={{
                            fontSize: '0.58rem',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--text-muted)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '1px 5px',
                            borderRadius: '3px'
                          }}>
                            {card.version}
                          </span>
                        </div>
                      </div>

                      {/* PDF Icon & Title */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '0.65rem' }}>
                        <div style={{
                          width: '38px',
                          height: '42px',
                          borderRadius: '6px',
                          background: `${card.rarityColor}18`,
                          border: `1px solid ${card.rarityColor}55`,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <FileText size={18} style={{ color: card.rarityColor }} />
                          <span style={{ fontSize: '0.52rem', fontFamily: 'var(--font-mono)', fontWeight: 900, color: card.rarityColor }}>
                            PDF
                          </span>
                        </div>

                        <div>
                          <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: card.rarityColor, fontWeight: 800 }}>
                            [{card.org}] • {card.category}
                          </div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.3 }}>
                            {card.title}
                          </div>
                        </div>
                      </div>

                      <p style={{ 
                        fontSize: '0.74rem', 
                        color: 'var(--text-muted)', 
                        lineHeight: 1.45, 
                        margin: '0 0 0.85rem' 
                      }}>
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom Metadata & Claim Loot Button */}
                    <div>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-muted)',
                        marginBottom: '0.65rem',
                        paddingTop: '6px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                      }}>
                        <span>SIZE: {card.size}</span>
                        <span>{card.claims}</span>
                      </div>

                      <button
                        onClick={() => handleClaimLoot(card)}
                        className="cb-chamfer-button"
                        style={{
                          width: '100%',
                          background: isClaimed 
                            ? 'linear-gradient(135deg, rgba(0, 255, 157, 0.25), rgba(0, 255, 157, 0.1))'
                            : `linear-gradient(135deg, ${card.rarityColor}, ${card.rarity === 'legendary' ? '#e69500' : '#8800ff'})`,
                          color: isClaimed ? '#00ff9d' : '#000000',
                          border: isClaimed ? '1px solid #00ff9d' : 'none',
                          padding: '8px 12px',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 900,
                          letterSpacing: '0.04em',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        {isClaimed ? (
                          <>
                            <CheckCircle2 size={13} />
                            <span>LOOT CLAIMED // RE-DOWNLOAD</span>
                          </>
                        ) : (
                          <>
                            <Download size={13} />
                            <span>CLAIM LOOT // GET OFFICIAL PDF</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. BOTTOM iOS GAMING DOCK (When in Mobile Frame mode) */}
        {isMobileFrame && (
          <>
            <div className="cb-ios-dock">
              <button 
                onClick={() => { setActiveDockTab('dashboard'); playSfx('click'); }} 
                className={`cb-dock-tab ${activeDockTab === 'dashboard' ? 'is-active' : ''}`}
              >
                <Compass size={17} />
                <span>DASHBOARD</span>
              </button>

              <button 
                onClick={() => { setActiveDockTab('quests'); playSfx('click'); }} 
                className={`cb-dock-tab ${activeDockTab === 'quests' ? 'is-active' : ''}`}
              >
                <Swords size={17} />
                <span>QUESTS</span>
              </button>

              <button 
                onClick={() => { setActiveDockTab('inventory'); playSfx('click'); }} 
                className={`cb-dock-tab ${activeDockTab === 'inventory' ? 'is-active' : ''}`}
              >
                <Layers size={17} />
                <span>LOOT PDF</span>
              </button>

              <button 
                onClick={() => { setActiveDockTab('profile'); playSfx('click'); }} 
                className={`cb-dock-tab ${activeDockTab === 'profile' ? 'is-active' : ''}`}
              >
                <Award size={17} />
                <span>XP RANK</span>
              </button>
            </div>
            <div className="cb-ios-home-bar" />
          </>
        )}
      </div>
    </div>
  );
}
