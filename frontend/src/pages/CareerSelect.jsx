import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/config'
import Navbar from '../components/Navbar'
import { useTheme } from '../context/ThemeContext'
import KnowPathImg from '../assets/images/Know_Path.png'
import NotSureImg from '../assets/images/Not_Sure.png'

export default function CareerSelect() {
  const navigate = useNavigate()
  const { t, darkMode } = useTheme()
  const [hoveredCard, setHoveredCard] = useState(null)
  const [particles, setParticles] = useState([])
  const [loaded, setLoaded] = useState(false)
  const username = localStorage.getItem('username') || 'Explorer'

  useEffect(() => {
    const p = Array.from({ length: 18 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 3 + 1, duration: Math.random() * 8 + 6, delay: Math.random() * 4 }))
    setParticles(p)
    setTimeout(() => setLoaded(true), 100)
  }, [])

  const handleChoice = async (choice) => {
    if (choice === 'yes') { navigate('/dashboard') }
    else {
      try { await API.post('/api/career/choose', { path_name: 'unknown' }) } catch (e) {}
      navigate('/assessment')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, fontFamily: "'Rajdhani',sans-serif", overflowX: 'hidden', position: 'relative', transition: 'all 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes floatUp { 0%,100%{transform:translateY(0) rotate(0deg);opacity:0.4} 50%{transform:translateY(-25px) rotate(180deg);opacity:0.7} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 15px ${t.tealDim}} 50%{box-shadow:0 0 30px ${t.tealMid}} }
        @keyframes bracketFloat { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-3px,3px)} }

        .choice-card {
          position: relative; background: ${t.card};
          border: 1px solid ${t.tealBorder}; border-radius: 16px;
          padding: 2rem 1.5rem; cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden; backdrop-filter: blur(10px); text-align: center;
          flex: 1; min-width: 0;
        }
        .choice-card:hover { transform: translateY(-8px) scale(1.02); border-color: ${t.tealMid}; box-shadow: 0 20px 60px ${t.tealDim}; }

        .card-scan { position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${t.teal},transparent);opacity:0;transition:opacity 0.3s }
        .choice-card:hover .card-scan { opacity:1;animation:scan 2s linear infinite }
        @keyframes scan { 0%{transform:translateY(-50px)} 100%{transform:translateY(200px)} }

        .explore-btn {
          position: relative; background: ${t.tealDim};
          border: 1px solid ${t.tealBorder}; border-radius: 10px;
          color: ${t.teal}; font-family: 'Rajdhani', sans-serif;
          font-size: 1rem; font-weight: 600; padding: 0.7rem 1.5rem;
          cursor: pointer; letter-spacing: 1px; transition: all 0.3s;
          animation: glowPulse 3s ease-in-out infinite; width: 100%;
        }
        .explore-btn:hover { border-color: ${t.tealMid}; transform: translateY(-2px); }

        /* ── Cards container ── */
        .cards-container {
          display: flex;
          gap: 0;
          max-width: 700px;
          width: 100%;
        }

        /* ── Vertical OR divider (desktop) ── */
        .or-divider-v {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          flex-shrink: 0;
          width: 50px;
        }
        .or-divider-line-v {
          width: 1px;
          flex: 1;
          background: linear-gradient(to bottom, transparent, ${t.tealBorder}, transparent);
        }
        .or-text {
          color: ${t.tealMid};
          font-size: 0.75rem;
          letter-spacing: 2px;
          font-family: 'Orbitron', monospace;
          white-space: nowrap;
        }

        /* ── Horizontal OR divider (mobile) ── */
        .or-divider-h {
          display: none;
          flex-direction: row;
          align-items: center;
          gap: 0.8rem;
          width: 100%;
          padding: 0.3rem 0;
        }
        .or-divider-line-h {
          height: 1px;
          flex: 1;
          background: linear-gradient(to right, transparent, ${t.tealBorder}, transparent);
        }

        /* ── Responsive ── */
        @media(max-width: 600px) {
          .cards-container { flex-direction: column !important; max-width: 100% !important; }
          .or-divider-v { display: none !important; }
          .or-divider-h { display: flex !important; }
          .choice-card { padding: 1.5rem 1.2rem; }
          .choice-card-img { width: 120px !important; height: 120px !important; }
          .explore-btn { font-size: 0.9rem; }
        }
        @media(max-width: 480px) {
          .question-box { padding: 1.3rem 1.5rem !important; }
          .career-main { padding: 5rem 1.2rem 3rem !important; }
        }
      `}</style>

      {particles.map(p => (
        <div key={p.id} style={{ position: 'fixed', left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: '50%', background: darkMode ? 'rgba(100,255,218,0.4)' : 'rgba(13,115,119,0.2)', animation: `floatUp ${p.duration}s ease-in-out ${p.delay}s infinite`, pointerEvents: 'none', zIndex: 0 }} />
      ))}
      {darkMode && <>
        <div style={{ position: 'fixed', width: 600, height: 600, borderRadius: '50%', filter: 'blur(120px)', background: 'radial-gradient(circle,rgba(13,115,119,0.3),transparent 70%)', top: -200, left: -200, pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'fixed', width: 400, height: 400, borderRadius: '50%', filter: 'blur(100px)', background: 'radial-gradient(circle,rgba(20,160,133,0.2),transparent 70%)', bottom: -100, right: -100, pointerEvents: 'none', zIndex: 0 }} />
      </>}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: `linear-gradient(${t.gridColor} 1px,transparent 1px),linear-gradient(90deg,${t.gridColor} 1px,transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none', zIndex: 0 }} />

      <Navbar activePage="assessment" />

      <main className="career-main" style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem 4rem', textAlign: 'center' }}>

        {/* Badge */}
        <div style={{ animation: loaded ? 'fadeSlideUp 0.7s ease both' : 'none', marginBottom: '0.8rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: `1px solid ${t.tealMid}`, borderRadius: 50, padding: '0.3rem 1rem', fontSize: '0.75rem', color: t.teal, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            <div style={{ width: 5, height: 5, background: t.teal, borderRadius: '50%' }} />
            Career Path Setup
          </div>
        </div>

        <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: 'clamp(1.6rem, 5vw, 3rem)', fontWeight: 900, color: t.text, lineHeight: 1.1, marginBottom: '1rem', animation: loaded ? 'fadeSlideUp 0.7s ease 0.1s both' : 'none' }}>
          Welcome, <span style={{ color: t.teal }}>{username}</span>
        </h1>

        <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', color: t.textDim, maxWidth: 520, lineHeight: 1.7, marginBottom: '2.5rem', animation: loaded ? 'fadeSlideUp 0.7s ease 0.2s both' : 'none', padding: '0 0.5rem' }}>
          Before we begin, help us understand where you're starting from so we can guide you to the right cybersecurity career path.
        </p>

        {/* Question box */}
        <div style={{ position: 'relative', marginBottom: '2.5rem', animation: loaded ? 'fadeSlideUp 0.7s ease 0.3s both' : 'none', width: '100%', maxWidth: 500 }}>
          <div style={{ position: 'absolute', top: -16, left: -24, color: t.tealMid, fontSize: '1.8rem', animation: 'bracketFloat 3s ease-in-out infinite' }}>╭</div>
          <div style={{ position: 'absolute', bottom: -16, right: -24, color: t.tealMid, fontSize: '1.8rem', animation: 'bracketFloat 3s ease-in-out infinite 0.5s' }}>╯</div>
          <div className="question-box" style={{ background: t.card, border: `1px solid ${t.tealBorder}`, borderRadius: 16, padding: '1.8rem 2rem', backdropFilter: 'blur(10px)' }}>
            <p style={{ fontFamily: "'Orbitron',monospace", fontSize: 'clamp(0.8rem, 1.8vw, 1.05rem)', color: t.text, letterSpacing: '0.5px', lineHeight: 1.6 }}>
              Do you already know which<br />
              <span style={{ color: t.teal }}>cybersecurity career path</span> suits you?
            </p>
          </div>
        </div>

        {/* ── Cards + OR divider ── */}
        <div className="cards-container" style={{ animation: loaded ? 'fadeSlideUp 0.7s ease 0.4s both' : 'none' }}>
          {/* Card 1 — Yes */}
          <div className="choice-card" onClick={() => handleChoice('yes')} onMouseEnter={() => setHoveredCard('yes')} onMouseLeave={() => setHoveredCard(null)}>
            <div className="card-scan" />
            <img className="choice-card-img" src={KnowPathImg} alt="Know Path" style={{ width: 160, height: 160, objectFit: 'contain', marginBottom: '1rem' }} />
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', fontWeight: 700, color: hoveredCard === 'yes' ? t.teal : t.text, marginBottom: '0.8rem', transition: 'color 0.3s' }}>Yes, I know</div>
            <p style={{ fontSize: 'clamp(0.82rem, 1.5vw, 0.9rem)', color: t.textDim, lineHeight: 1.6, marginBottom: '1.5rem' }}>I already have a career path in mind. Take me directly to the dashboard to explore.</p>
            <button className="explore-btn">Go to Dashboard →</button>
          </div>

          {/* Vertical OR — hidden on mobile */}
          <div className="or-divider-v">
            <div className="or-divider-line-v" />
            <span className="or-text">OR</span>
            <div className="or-divider-line-v" />
          </div>

          {/* Horizontal OR — shown on mobile */}
          <div className="or-divider-h">
            <div className="or-divider-line-h" />
            <span className="or-text">OR</span>
            <div className="or-divider-line-h" />
          </div>

          {/* Card 2 — No */}
          <div className="choice-card" onClick={() => handleChoice('no')} onMouseEnter={() => setHoveredCard('no')} onMouseLeave={() => setHoveredCard(null)}>
            <div className="card-scan" />
            <img className="choice-card-img" src={NotSureImg} alt="Not Sure" style={{ width: 160, height: 160, objectFit: 'contain', marginBottom: '1rem' }} />
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', fontWeight: 700, color: hoveredCard === 'no' ? t.teal : t.text, marginBottom: '0.8rem', transition: 'color 0.3s' }}>Not sure yet</div>
            <p style={{ fontSize: 'clamp(0.82rem, 1.5vw, 0.9rem)', color: t.textDim, lineHeight: 1.6, marginBottom: '1.5rem' }}>Help me find my path! Answer a few questions and our AI will recommend the best career for me.</p>
            <button className="explore-btn">Find My Path →</button>
          </div>
        </div>

        <p style={{ marginTop: '2rem', fontSize: '0.82rem', color: t.textMuted, letterSpacing: '1px', animation: loaded ? 'fadeSlideUp 0.7s ease 0.5s both' : 'none' }}>
          You can always change this later in your profile
        </p>
      </main>
    </div>
  )
}