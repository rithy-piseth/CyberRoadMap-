import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import API from '../api/config'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');

  :root {
    --navy: #060d1f;
    --navy2: #0a1628;
    --teal: #64ffda;
    --teal-dim: #64ffda33;
    --teal-mid: #64ffda88;
    --text: #ccd6f6;
    --text-dim: #8892b0;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .landing-root {
    min-height: 100vh;
    background: var(--navy);
    font-family: 'Rajdhani', sans-serif;
    color: var(--text);
    overflow-x: hidden;
  }

  /* ── GRID BACKGROUND ── */
  .grid-bg {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(var(--teal-dim) 1px, transparent 1px),
      linear-gradient(90deg, var(--teal-dim) 1px, transparent 1px);
    background-size: 60px 60px;
    opacity: 0.18;
    pointer-events: none;
    z-index: 0;
  }

  /* glow orbs */
  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }
  .orb-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, #0d7377 0%, transparent 70%);
    top: -150px; left: -150px; opacity: 0.25;
  }
  .orb-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #14a085 0%, transparent 70%);
    bottom: -100px; right: -100px; opacity: 0.2;
  }

  /* ── NAVBAR ── */
  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 3rem;
    background: rgba(6, 13, 31, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--teal-dim);
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: 'Orbitron', monospace;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--teal);
    text-decoration: none;
    letter-spacing: 1px;
  }

  .logo-icon {
    width: 32px; height: 32px;
    border: 2px solid var(--teal);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    background: var(--teal-dim);
  }

  .nav-center {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(100, 255, 218, 0.05);
    border: 1px solid var(--teal-dim);
    border-radius: 50px;
    padding: 0.4rem 1rem;
  }

  .nav-link {
    color: var(--text);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    padding: 0.4rem 1.2rem;
    border-radius: 50px;
    transition: all 0.2s;
    letter-spacing: 0.5px;
  }
  .nav-link:hover, .nav-link.active {
    color: var(--teal);
    background: var(--teal-dim);
  }

  .nav-divider {
    width: 1px; height: 20px;
    background: var(--teal-dim);
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .btn-login {
    background: none;
    border: none;
    color: var(--text);
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0.4rem 1rem;
    border-radius: 6px;
    transition: color 0.2s;
    letter-spacing: 0.5px;
  }
  .btn-login:hover { color: var(--teal); }

  .btn-signup {
    background: var(--teal);
    border: none;
    color: var(--navy);
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    padding: 0.5rem 1.4rem;
    border-radius: 6px;
    transition: all 0.2s;
    letter-spacing: 1px;
  }
  .btn-signup:hover {
    background: #4ee8c4;
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(100,255,218,0.3);
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 6rem 2rem 4rem;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--teal-mid);
    border-radius: 50px;
    padding: 0.3rem 1rem;
    font-size: 0.8rem;
    color: var(--teal);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 2rem;
    animation: fadeDown 0.8s ease both;
  }

  .badge-dot {
    width: 6px; height: 6px;
    background: var(--teal);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.3); }
  }

  .hero-title {
    font-family: 'Orbitron', monospace;
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -1px;
    margin-bottom: 1rem;
    animation: fadeDown 0.8s ease 0.1s both;
  }

  .title-cyber { color: var(--teal); }
  .title-security {
    color: transparent;
    -webkit-text-stroke: 1px var(--teal-mid);
  }

  .hero-subtitle {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: var(--text-dim);
    max-width: 600px;
    line-height: 1.7;
    margin-bottom: 2.5rem;
    font-weight: 400;
    animation: fadeDown 0.8s ease 0.2s both;
  }

  .hero-subtitle span { color: var(--teal); font-weight: 600; }

  .btn-explore {
    position: relative;
    background: var(--teal-dim);
    border: 1px solid var(--teal);
    color: var(--teal);
    font-family: 'Orbitron', monospace;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    padding: 1rem 3rem;
    border-radius: 4px;
    letter-spacing: 3px;
    text-transform: uppercase;
    transition: all 0.3s;
    overflow: hidden;
    animation: fadeDown 0.8s ease 0.3s both;
  }

  .btn-explore::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(100,255,218,0.15), transparent);
    transition: left 0.5s;
  }

  .btn-explore:hover::before { left: 100%; }
  .btn-explore:hover {
    background: rgba(100,255,218,0.15);
    box-shadow: 0 0 30px rgba(100,255,218,0.25), inset 0 0 20px rgba(100,255,218,0.05);
    transform: translateY(-2px);
  }

  .hero-desc {
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: var(--text-dim);
    max-width: 480px;
    line-height: 1.6;
    animation: fadeDown 0.8s ease 0.4s both;
  }

  /* ── TEAMS PREVIEW ── */
  .teams-section {
    position: relative;
    z-index: 1;
    padding: 5rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-label {
    text-align: center;
    font-family: 'Orbitron', monospace;
    font-size: 0.7rem;
    letter-spacing: 4px;
    color: var(--teal);
    text-transform: uppercase;
    margin-bottom: 0.8rem;
  }

  .section-title {
    text-align: center;
    font-family: 'Orbitron', monospace;
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 700;
    margin-bottom: 3rem;
    color: var(--text);
  }

  .teams-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .team-card {
    position: relative;
    border: 1px solid var(--teal-dim);
    border-radius: 12px;
    padding: 2rem;
    background: rgba(10, 22, 40, 0.8);
    overflow: hidden;
    transition: all 0.3s;
  }

  .team-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
  }

  .team-card.blue::before { background: linear-gradient(90deg, transparent, #4fc3f7, transparent); }
  .team-card.red::before { background: linear-gradient(90deg, transparent, #ff6b6b, transparent); }

  .team-card:hover {
    border-color: var(--teal-mid);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }

  .team-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .team-icon {
    width: 48px; height: 48px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem;
  }

  .team-card.blue .team-icon { background: rgba(79, 195, 247, 0.15); border: 1px solid rgba(79,195,247,0.3); }
  .team-card.red .team-icon { background: rgba(255, 107, 107, 0.15); border: 1px solid rgba(255,107,107,0.3); }

  .team-name {
    font-family: 'Orbitron', monospace;
    font-size: 1.1rem;
    font-weight: 700;
  }
  .team-card.blue .team-name { color: #4fc3f7; }
  .team-card.red .team-name { color: #ff6b6b; }

  .team-desc {
    font-size: 0.9rem;
    color: var(--text-dim);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .specialists-preview {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .specialist-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.6rem 0.8rem;
    border-radius: 6px;
    background: rgba(100, 255, 218, 0.03);
    border: 1px solid transparent;
    transition: all 0.2s;
    cursor: default;
  }

  .specialist-item.locked {
    filter: blur(3px);
    pointer-events: none;
    opacity: 0.5;
  }

  .spec-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .team-card.blue .spec-dot { background: #4fc3f7; }
  .team-card.red .spec-dot { background: #ff6b6b; }

  .spec-name {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text);
  }

  .lock-overlay {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 3rem 2rem 2rem;
    background: linear-gradient(to top, rgba(6,13,31,0.95) 60%, transparent);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .lock-icon {
    font-size: 1.5rem;
    margin-bottom: 0.3rem;
  }

  .lock-text {
    font-size: 0.85rem;
    color: var(--text-dim);
    text-align: center;
  }

  .btn-unlock {
    margin-top: 0.5rem;
    background: none;
    border: 1px solid var(--teal);
    color: var(--teal);
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0.4rem 1.2rem;
    border-radius: 4px;
    letter-spacing: 1px;
    transition: all 0.2s;
  }
  .btn-unlock:hover {
    background: var(--teal-dim);
  }

  /* ── STATS ── */
  .stats-section {
    position: relative;
    z-index: 1;
    padding: 3rem 2rem 5rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .stat-card {
    text-align: center;
    padding: 2rem;
    border: 1px solid var(--teal-dim);
    border-radius: 10px;
    background: rgba(10, 22, 40, 0.6);
    transition: all 0.3s;
  }

  .stat-card:hover {
    border-color: var(--teal-mid);
    transform: translateY(-3px);
  }

  .stat-number {
    font-family: 'Orbitron', monospace;
    font-size: 2.2rem;
    font-weight: 900;
    color: var(--teal);
    display: block;
  }

  .stat-label {
    font-size: 0.85rem;
    color: var(--text-dim);
    letter-spacing: 1px;
    margin-top: 0.3rem;
  }

  /* ── FOOTER ── */
  .landing-footer {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 2rem;
    border-top: 1px solid var(--teal-dim);
    color: var(--text-dim);
    font-size: 0.85rem;
    letter-spacing: 0.5px;
  }

  .footer-teal { color: var(--teal); }

  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .navbar { padding: 1rem 1.5rem; }
    .nav-center { display: none; }
    .teams-grid { grid-template-columns: 1fr; }
    .stats-grid { grid-template-columns: 1fr; }
    .hero-title { font-size: 2.5rem; }
  }
`

export default function Landing() {
  const navigate = useNavigate()
  const [teams, setTeams] = useState([])
  const styleRef = useRef(null)

  useEffect(() => {
    // inject styles
    const el = document.createElement('style')
    el.textContent = styles
    document.head.appendChild(el)
    styleRef.current = el

    // fetch teams preview
    API.get('/api/specialists/teams')
      .then(res => {
        const raw = res.data.data
        const grouped = {}
        raw.forEach(row => {
          if (!grouped[row.team_name]) {
            grouped[row.team_name] = {
              name: row.team_name,
              slug: row.team_slug,
              description: row.team_description,
              specialists: []
            }
          }
          if (row.specialist_name) {
            grouped[row.team_name].specialists.push(row.specialist_name)
          }
        })
        setTeams(Object.values(grouped))
      })
      .catch(() => {})

    return () => document.head.removeChild(el)
  }, [])

  const isBlue = (name) => name?.toLowerCase().includes('blue')

  return (
    <div className="landing-root">
      <div className="grid-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* NAVBAR */}
      <nav className="navbar">
        <a className="nav-logo" href="/">
          <div className="logo-icon">⬡</div>
          Cyber.road
        </a>
        <div className="nav-center">
          <a className="nav-link active" href="/">Home</a>
          <div className="nav-divider" />
          <a className="nav-link" href="/assessment">Find Suitable Path</a>
        </div>
        <div className="nav-right">
          <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
          <button className="btn-signup" onClick={() => navigate('/register')}>Sign Up</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">
          <div className="badge-dot" />
          Cybersecurity Career Platform
        </div>
        <h1 className="hero-title">
          <span className="title-cyber">Cyber</span>
          <br />
          <span className="title-security">Security</span>
        </h1>
        <p className="hero-subtitle">
          Cybersecurity is the practice of protecting computers, networks, and data from cyber threats.
          Find your <span>perfect career path</span> and learn the essential skills through a clear,
          step-by-step roadmap.
        </p>
        <button className="btn-explore" onClick={() => navigate('/register')}>
          Explore
        </button>
        <p className="hero-desc">
          Explore the possible career paths in cybersecurity and learn the essential skills
          and knowledge required for each path through a clear, step-by-step roadmap.
        </p>
      </section>

      {/* TEAMS PREVIEW */}
      <section className="teams-section">
        <p className="section-label">Career Paths</p>
        <h2 className="section-title">Choose Your Side</h2>
        <div className="teams-grid">
          {teams.map((team) => (
            <div key={team.name} className={`team-card ${isBlue(team.name) ? 'blue' : 'red'}`}>
              <div className="team-header">
                <div className="team-icon">
                  {isBlue(team.name) ? '🛡️' : '⚔️'}
                </div>
                <div>
                  <div className="team-name">{team.name}</div>
                </div>
              </div>
              <p className="team-desc">{team.description}</p>
              <div className="specialists-preview">
                {team.specialists.slice(0, 2).map((s, i) => (
                  <div key={i} className="specialist-item">
                    <div className="spec-dot" />
                    <span className="spec-name">{s}</span>
                  </div>
                ))}
                {team.specialists.slice(2).map((s, i) => (
                  <div key={i} className="specialist-item locked">
                    <div className="spec-dot" />
                    <span className="spec-name">{s}</span>
                  </div>
                ))}
              </div>
              <div className="lock-overlay">
                <div className="lock-icon">🔒</div>
                <p className="lock-text">Sign up to unlock all specialists and learning paths</p>
                <button className="btn-unlock" onClick={() => navigate('/register')}>
                  Unlock Access
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">6+</span>
            <div className="stat-label">Career Specializations</div>
          </div>
          <div className="stat-card">
            <span className="stat-number">AI</span>
            <div className="stat-label">Powered Path Analysis</div>
          </div>
          <div className="stat-card">
            <span className="stat-number">100%</span>
            <div className="stat-label">Free Forever</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        Built for cybersecurity learners — <span className="footer-teal">Cyber.road</span> © 2025
      </footer>
    </div>
  )
}