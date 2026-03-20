import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/config'
import Navbar from '../components/Navbar'
import { useTheme } from '../context/ThemeContext'

export default function Specialist() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const { t, darkMode } = useTheme()
  const [specialist, setSpecialist] = useState(null)
  const [levels, setLevels] = useState([])
  const [activeTab, setActiveTab] = useState('projects')
  const [activeLevel, setActiveLevel] = useState(0)
  const [levelContent, setLevelContent] = useState({})
  const [loading, setLoading] = useState(true)
  const [particles, setParticles] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const p = Array.from({ length: 12 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 3 + 1, duration: Math.random() * 8 + 6, delay: Math.random() * 4,
    }))
    setParticles(p)

    API.get(`/api/specialists/${slug}`)
      .then(res => {
        setSpecialist(res.data.specialist)
        setLevels(res.data.levels)
        setLoading(false)
        setTimeout(() => setLoaded(true), 100)

        // Load content for first level
        if (res.data.levels.length > 0) {
          loadLevelContent(res.data.levels[0].id)
        }
      })
      .catch(() => {
        setLoading(false)
        navigate('/dashboard')
      })
  }, [slug])

  const loadLevelContent = (levelId) => {
    if (levelContent[levelId]) return
    API.get(`/api/specialists/level/${levelId}`)
      .then(res => {
        setLevelContent(prev => ({ ...prev, [levelId]: res.data }))
      })
      .catch(() => {})
  }

  const handleLevelChange = (index) => {
    setActiveLevel(index)
    loadLevelContent(levels[index].id)
  }

  const isBlue = specialist?.team_name?.toLowerCase().includes('blue')
  const accent = isBlue ? (darkMode ? '#4fc3f7' : '#2b6cb0') : (darkMode ? '#ff6b6b' : '#c53030')
  const accentDim = isBlue ? t.blueDim : t.redDim
  const accentBorder = isBlue ? t.blueBorder : t.redBorder

  const currentLevel = levels[activeLevel]
  const currentContent = currentLevel ? levelContent[currentLevel.id] : null

  const levelColors = ['#64ffda', '#4fc3f7', '#f093fb', '#f5576c']
  const levelIcons = ['🌱', '⚡', '🔥', '👑']

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden', position: 'relative', transition: 'all 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        @keyframes floatUp { 0%,100%{transform:translateY(0) rotate(0deg);opacity:0.4} 50%{transform:translateY(-25px) rotate(180deg);opacity:0.7} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeSlideDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 15px ${t.tealDim}} 50%{box-shadow:0 0 35px ${t.tealMid}} }

        .level-btn {
          display: flex; align-items: center; gap: 0.6rem;
          padding: 0.7rem 1.2rem; border-radius: 50px;
          border: 1px solid ${t.tealBorder};
          background: none; cursor: pointer;
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.9rem; font-weight: 600;
          color: ${t.textDim}; transition: all 0.2s;
          white-space: nowrap;
        }
        .level-btn:hover { border-color: ${t.tealMid}; color: ${t.text}; }
        .level-btn.active { background: ${t.tealDim}; border-color: ${t.teal}; color: ${t.teal}; }

        .tab-btn {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.7rem 1.5rem; border-radius: 8px;
          border: none; background: none; cursor: pointer;
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.95rem; font-weight: 600;
          color: ${t.textDim}; transition: all 0.2s;
          letter-spacing: 0.5px;
          border-bottom: 2px solid transparent;
        }
        .tab-btn:hover { color: ${t.text}; }
        .tab-btn.active { color: ${t.teal}; border-bottom-color: ${t.teal}; }

        .content-card {
          display: flex; align-items: flex-start; gap: 1rem;
          padding: 1.2rem 1.4rem; border-radius: 12px;
          border: 1px solid ${t.tealBorder};
          background: ${t.card};
          transition: all 0.25s; margin-bottom: 0.8rem;
        }
        .content-card:hover {
          border-color: ${t.tealMid};
          transform: translateX(4px);
          box-shadow: 0 4px 20px ${t.tealDim};
        }

        .resource-link {
          text-decoration: none; display: flex; align-items: flex-start;
          gap: 1rem; padding: 1.2rem 1.4rem; border-radius: 12px;
          border: 1px solid ${t.tealBorder}; background: ${t.card};
          transition: all 0.25s; margin-bottom: 0.8rem; color: inherit;
        }
        .resource-link:hover {
          border-color: ${t.teal};
          transform: translateX(4px);
          box-shadow: 0 4px 20px ${t.tealDim};
        }

        .cert-link {
          text-decoration: none; display: flex; align-items: center;
          gap: 1rem; padding: 1.2rem 1.4rem; border-radius: 12px;
          border: 1px solid ${t.tealBorder}; background: ${t.card};
          transition: all 0.25s; margin-bottom: 0.8rem; color: inherit;
        }
        .cert-link:hover {
          border-color: ${accent};
          transform: translateX(4px);
          box-shadow: 0 4px 20px ${accentDim};
        }

        .fade-0 { animation: fadeSlideUp 0.6s ease both; }
        .fade-1 { animation: fadeSlideUp 0.6s ease 0.1s both; }
        .fade-2 { animation: fadeSlideUp 0.6s ease 0.2s both; }
        .fade-3 { animation: fadeSlideUp 0.6s ease 0.3s both; }
      `}</style>

      {/* Particles */}
      {particles.map(p => (
        <div key={p.id} style={{ position: 'fixed', left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: '50%', background: darkMode ? 'rgba(100,255,218,0.4)' : 'rgba(13,115,119,0.15)', animation: `floatUp ${p.duration}s ease-in-out ${p.delay}s infinite`, pointerEvents: 'none', zIndex: 0 }} />
      ))}

      {darkMode && <>
        <div style={{ position: 'fixed', width: 500, height: 500, borderRadius: '50%', filter: 'blur(120px)', background: `radial-gradient(circle,${isBlue ? 'rgba(79,195,247,0.15)' : 'rgba(255,107,107,0.15)'},transparent 70%)`, top: -150, right: -150, pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'fixed', width: 400, height: 400, borderRadius: '50%', filter: 'blur(100px)', background: 'radial-gradient(circle,rgba(13,115,119,0.2),transparent 70%)', bottom: -100, left: -100, pointerEvents: 'none', zIndex: 0 }} />
      </>}

      <div style={{ position: 'fixed', inset: 0, backgroundImage: `linear-gradient(${t.gridColor} 1px,transparent 1px),linear-gradient(90deg,${t.gridColor} 1px,transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none', zIndex: 0 }} />

      <Navbar activePage="dashboard" />

      {loading ? (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.teal, fontFamily: "'Orbitron',monospace", fontSize: '0.9rem', letterSpacing: '2px' }}>
          Loading...
        </div>
      ) : specialist && (
        <main style={{ position: 'relative', zIndex: 1, padding: '6rem 2rem 4rem', maxWidth: 1000, margin: '0 auto' }}>

          {/* Back button */}
          <button
            onClick={() => navigate('/dashboard')}
            className={loaded ? 'fade-0' : ''}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: t.textDim, fontFamily: "'Rajdhani',sans-serif", fontSize: '0.9rem', cursor: 'pointer', marginBottom: '2rem', padding: 0, transition: 'color 0.2s' }}
            onMouseOver={e => e.currentTarget.style.color = t.teal}
            onMouseOut={e => e.currentTarget.style.color = t.textDim}
          >
            ← Back to Dashboard
          </button>

          {/* Hero card */}
          <div className={loaded ? 'fade-1' : ''} style={{ background: t.card, border: `1px solid ${accentBorder}`, borderRadius: 20, padding: '2rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden', backdropFilter: 'blur(10px)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                {/* Team badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: accentDim, border: `1px solid ${accentBorder}`, borderRadius: 50, padding: '0.3rem 1rem', fontSize: '0.75rem', color: accent, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  <span>{isBlue ? '🛡️' : '⚔️'}</span>
                  {specialist.team_name}
                </div>

                <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: 'clamp(1.5rem,4vw,2.5rem)', fontWeight: 900, color: t.text, marginBottom: '1rem', lineHeight: 1.1 }}>
                  {specialist.name}<span style={{ color: accent }}>.</span>
                </h1>

                <p style={{ fontSize: '1rem', color: t.textDim, lineHeight: 1.7, maxWidth: 600 }}>
                  {specialist.description}
                </p>
              </div>

              {/* Income badge */}
              {specialist.avg_income && (
                <div style={{ background: accentDim, border: `1px solid ${accentBorder}`, borderRadius: 12, padding: '1rem 1.5rem', textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.7rem', color: t.textDim, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Avg Income</div>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '0.95rem', fontWeight: 700, color: accent }}>💰 {specialist.avg_income}</div>
                </div>
              )}
            </div>
          </div>

          {/* Level selector */}
          <div className={loaded ? 'fade-2' : ''} style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', color: t.textDim, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.8rem', fontFamily: "'Orbitron',monospace" }}>
              Learning Path
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {levels.map((level, i) => (
                <button
                  key={level.id}
                  className={`level-btn ${activeLevel === i ? 'active' : ''}`}
                  onClick={() => handleLevelChange(i)}
                  style={{ borderColor: activeLevel === i ? levelColors[i] : t.tealBorder, color: activeLevel === i ? levelColors[i] : t.textDim, background: activeLevel === i ? `${levelColors[i]}15` : 'none' }}
                >
                  <span>{levelIcons[i]}</span>
                  {level.level_name}
                </button>
              ))}
            </div>
          </div>

          {/* Tab bar */}
          <div className={loaded ? 'fade-3' : ''} style={{ display: 'flex', gap: '0.5rem', borderBottom: `1px solid ${t.tealBorder}`, marginBottom: '1.5rem' }}>
            {[
              { key: 'projects', label: 'Projects', icon: '📁' },
              { key: 'certificates', label: 'Certificates', icon: '🏆' },
              { key: 'resources', label: 'Resources', icon: '📚' },
            ].map(tab => (
              <button
                key={tab.key}
                className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ minHeight: 300 }}>
            {!currentContent ? (
              <div style={{ textAlign: 'center', color: t.teal, fontFamily: "'Orbitron',monospace", fontSize: '0.85rem', letterSpacing: '2px', padding: '3rem' }}>
                Loading content...
              </div>
            ) : (

              /* PROJECTS TAB */
              activeTab === 'projects' && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: t.textDim, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.2rem', fontFamily: "'Orbitron',monospace" }}>
                    {levels[activeLevel]?.level_name} Projects
                  </div>
                  {currentContent.projects?.length === 0 ? (
                    <div style={{ textAlign: 'center', color: t.textDim, padding: '2rem', border: `1px dashed ${t.tealBorder}`, borderRadius: 12 }}>
                      No projects added yet for this level.
                    </div>
                  ) : currentContent.projects?.map((p, i) => (
                    <div key={i} className="content-card" style={{ animationDelay: `${i * 0.05}s` }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: `${levelColors[activeLevel]}20`, border: `1px solid ${levelColors[activeLevel]}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                        {levelIcons[activeLevel]}
                      </div>
                      <div>
                        <div style={{ fontSize: '1rem', fontWeight: 600, color: t.text, marginBottom: '0.3rem' }}>{p.title}</div>
                        {p.description && <div style={{ fontSize: '0.88rem', color: t.textDim, lineHeight: 1.6 }}>{p.description}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* CERTIFICATES TAB */}
            {activeTab === 'certificates' && currentContent && (
              <div>
                <div style={{ fontSize: '0.75rem', color: t.textDim, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.2rem', fontFamily: "'Orbitron',monospace" }}>
                  {levels[activeLevel]?.level_name} Certificates
                </div>
                {currentContent.certificates?.length === 0 ? (
                  <div style={{ textAlign: 'center', color: t.textDim, padding: '2rem', border: `1px dashed ${t.tealBorder}`, borderRadius: 12 }}>
                    No certificates added yet for this level.
                  </div>
                ) : currentContent.certificates?.map((c, i) => (
                  <a key={i} href={c.url} target="_blank" rel="noreferrer" className="cert-link">
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: accentDim, border: `1px solid ${accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                      🏆
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: t.text, marginBottom: '0.2rem' }}>{c.name}</div>
                      {c.provider && <div style={{ fontSize: '0.82rem', color: t.textDim }}>{c.provider}</div>}
                    </div>
                    <div style={{ color: accent, fontSize: '0.85rem', opacity: 0.7 }}>↗</div>
                  </a>
                ))}
              </div>
            )}

            {/* RESOURCES TAB */}
            {activeTab === 'resources' && currentContent && (
              <div>
                <div style={{ fontSize: '0.75rem', color: t.textDim, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.2rem', fontFamily: "'Orbitron',monospace" }}>
                  {levels[activeLevel]?.level_name} Resources
                </div>
                {currentContent.resources?.length === 0 ? (
                  <div style={{ textAlign: 'center', color: t.textDim, padding: '2rem', border: `1px dashed ${t.tealBorder}`, borderRadius: 12 }}>
                    No resources added yet for this level.
                  </div>
                ) : currentContent.resources?.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noreferrer" className="resource-link">
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: t.tealDim, border: `1px solid ${t.tealBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                      {r.type === 'video' ? '🎥' : r.type === 'course' ? '🎓' : r.type === 'tool' ? '🛠️' : '📄'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: t.text, marginBottom: '0.2rem' }}>{r.title}</div>
                      <div style={{ fontSize: '0.78rem', color: t.textDim, textTransform: 'uppercase', letterSpacing: '1px' }}>{r.type}</div>
                    </div>
                    <div style={{ color: t.teal, fontSize: '0.85rem', opacity: 0.7 }}>↗</div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  )
}