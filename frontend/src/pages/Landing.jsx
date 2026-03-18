import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import API from '../api/config'

export default function Landing() {
  const navigate = useNavigate()
  const [teams, setTeams] = useState([])
  const [darkMode, setDarkMode] = useState(true)

  const t = darkMode ? {
    bg: '#060d1f', bg2: '#0a1628',
    card: 'rgba(10,22,40,0.85)',
    teal: '#64ffda', tealDim: 'rgba(100,255,218,0.08)',
    tealMid: 'rgba(100,255,218,0.4)', tealBorder: 'rgba(100,255,218,0.2)',
    text: '#ccd6f6', textDim: '#8892b0',
    navBg: 'rgba(6,13,31,0.9)',
    gridColor: 'rgba(100,255,218,0.07)',
  } : {
    bg: '#f0f4f8', bg2: '#e2e8f0',
    card: 'rgba(255,255,255,0.95)',
    teal: '#0d7377', tealDim: 'rgba(13,115,119,0.08)',
    tealMid: 'rgba(13,115,119,0.4)', tealBorder: 'rgba(13,115,119,0.2)',
    text: '#1a202c', textDim: '#4a5568',
    navBg: 'rgba(240,244,248,0.95)',
    gridColor: 'rgba(13,115,119,0.06)',
  }

  useEffect(() => {
    API.get('/api/specialists/teams')
      .then(res => {
        const raw = res.data.data
        const grouped = {}
        raw.forEach(row => {
          const key = row.team_name
          if (!grouped[key]) {
            grouped[key] = {
              name: row.team_name,
              slug: row.team_slug,
              description: row.team_description,
              specialists: []
            }
          }
          if (row.specialist_name) {
            const exists = grouped[key].specialists.find(s => s.name === row.specialist_name)
            if (!exists) {
              grouped[key].specialists.push({
                name: row.specialist_name,
                slug: row.specialist_slug,
                income: row.avg_income
              })
            }
          }
        })
        setTeams(Object.values(grouped))
      })
      .catch(err => console.error('Teams fetch error:', err))
  }, [])

  const isBlue = (name) => name?.toLowerCase().includes('blue')

  return (
    <div style={{ minHeight:'100vh', background:t.bg, color:t.text, fontFamily:"'Rajdhani',sans-serif", overflowX:'hidden', transition:'all 0.3s' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        .grid-bg { position:fixed; inset:0; background-image: linear-gradient(${t.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${t.gridColor} 1px, transparent 1px); background-size:60px 60px; pointer-events:none; z-index:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
        .fade-0{animation:fadeUp 0.7s ease both}
        .fade-1{animation:fadeUp 0.7s ease 0.15s both}
        .fade-2{animation:fadeUp 0.7s ease 0.3s both}
        .fade-3{animation:fadeUp 0.7s ease 0.45s both}
        .nav-link { color:${t.textDim}; text-decoration:none; font-size:0.95rem; font-weight:500; padding:0.4rem 1.2rem; border-radius:50px; transition:all 0.2s; font-family:'Rajdhani',sans-serif; }
        .nav-link:hover { color:${t.teal}; background:${t.tealDim}; }
        .nav-link.active { color:${t.teal}; }
        .btn-explore { background:${t.tealDim}; border:1px solid ${t.teal}; color:${t.teal}; font-family:'Orbitron',monospace; font-size:0.9rem; font-weight:700; cursor:pointer; padding:1rem 3rem; border-radius:4px; letter-spacing:3px; text-transform:uppercase; transition:all 0.3s; }
        .btn-explore:hover { box-shadow:0 0 30px ${t.tealMid}; transform:translateY(-2px); background:rgba(100,255,218,0.12); }
        .team-card { border-radius:14px; padding:2rem; overflow:hidden; transition:all 0.3s; backdrop-filter:blur(10px); position:relative; }
        .team-card:hover { transform:translateY(-6px); box-shadow:0 25px 50px rgba(0,0,0,0.2); }
        .spec-visible { display:flex; align-items:center; gap:0.8rem; padding:0.7rem 1rem; border-radius:8px; border:1px solid ${t.tealBorder}; background:${t.tealDim}; margin-bottom:0.5rem; transition:all 0.2s; }
        .spec-visible:hover { border-color:${t.tealMid}; transform:translateX(4px); }
        .spec-locked { display:flex; align-items:center; gap:0.8rem; padding:0.7rem 1rem; border-radius:8px; border:1px dashed ${t.tealBorder}; background:${t.tealDim}; margin-bottom:0.5rem; filter:blur(4px); opacity:0.35; pointer-events:none; }
        .stat-card { text-align:center; padding:2rem; border:1px solid ${t.tealBorder}; border-radius:12px; background:${t.card}; transition:all 0.3s; backdrop-filter:blur(10px); }
        .stat-card:hover { border-color:${t.tealMid}; transform:translateY(-4px); box-shadow:0 15px 40px rgba(0,0,0,0.1); }
        .btn-login { background:none; border:none; color:${t.textDim}; font-family:'Rajdhani',sans-serif; font-size:0.95rem; font-weight:500; cursor:pointer; padding:0.4rem 1rem; border-radius:6px; transition:color 0.2s; letter-spacing:0.5px; }
        .btn-login:hover { color:${t.teal}; }
        .btn-signup { background:${t.teal}; border:none; color:${t.bg}; font-family:'Rajdhani',sans-serif; font-size:0.95rem; font-weight:700; cursor:pointer; padding:0.5rem 1.4rem; border-radius:6px; transition:all 0.2s; letter-spacing:1px; }
        .btn-signup:hover { transform:translateY(-1px); box-shadow:0 4px 20px ${t.tealMid}; }
        .btn-unlock { background:none; border:1px solid; font-family:'Rajdhani',sans-serif; font-size:0.85rem; font-weight:600; cursor:pointer; padding:0.4rem 1.4rem; border-radius:4px; letter-spacing:1px; transition:all 0.2s; }
        @media(max-width:768px){ .teams-grid{grid-template-columns:1fr!important} .stats-grid{grid-template-columns:1fr!important} .nav-center{display:none!important} }
      `}</style>

      <div className="grid-bg" />
      {darkMode && <>
        <div style={{ position:'fixed', width:500, height:500, borderRadius:'50%', filter:'blur(100px)', background:'radial-gradient(circle,#0d7377,transparent 70%)', top:-150, left:-150, opacity:0.2, pointerEvents:'none', zIndex:0 }} />
        <div style={{ position:'fixed', width:400, height:400, borderRadius:'50%', filter:'blur(100px)', background:'radial-gradient(circle,#14a085,transparent 70%)', bottom:-100, right:-100, opacity:0.15, pointerEvents:'none', zIndex:0 }} />
      </>}

      {/* NAVBAR */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.2rem 3rem', background:t.navBg, backdropFilter:'blur(12px)', borderBottom:`1px solid ${t.tealBorder}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', fontFamily:"'Orbitron',monospace", fontSize:'1.1rem', fontWeight:700, color:t.teal }}>
          <div style={{ width:32, height:32, border:`2px solid ${t.teal}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, background:t.tealDim, clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)' }}>⬡</div>
          Cyber.road
        </div>

        <div className="nav-center" style={{ display:'flex', alignItems:'center', gap:'0.5rem', background:t.tealDim, border:`1px solid ${t.tealBorder}`, borderRadius:50, padding:'0.4rem 1rem' }}>
          <a className="nav-link active" href="/">Home</a>
          <div style={{ width:1, height:20, background:t.tealBorder }} />
          <a className="nav-link" href="/assessment">Find Suitable Path</a>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
          {/* Theme Toggle */}
          <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
            <span style={{ fontSize:'1rem' }}>{darkMode ? '🌙' : '☀️'}</span>
            <div
              onClick={() => setDarkMode(!darkMode)}
              style={{ width:44, height:24, borderRadius:12, background:darkMode ? t.tealDim : '#cbd5e0', border:`1px solid ${t.tealBorder}`, cursor:'pointer', position:'relative', transition:'all 0.3s' }}
            >
              <div style={{ position:'absolute', top:2, left: darkMode ? 22 : 2, width:18, height:18, borderRadius:'50%', background:t.teal, transition:'all 0.3s' }} />
            </div>
          </div>
          <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
          <button className="btn-signup" onClick={() => navigate('/register')}>Sign Up</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position:'relative', zIndex:1, minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'6rem 2rem 4rem' }}>
        <div className="fade-0" style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', border:`1px solid ${t.tealMid}`, borderRadius:50, padding:'0.3rem 1rem', fontSize:'0.8rem', color:t.teal, letterSpacing:'2px', textTransform:'uppercase', marginBottom:'2rem' }}>
          <div style={{ width:6, height:6, background:t.teal, borderRadius:'50%', animation:'pulse 2s infinite' }} />
          Cybersecurity Career Platform
        </div>

        <h1 className="fade-1" style={{ fontFamily:"'Orbitron',monospace", fontSize:'clamp(3rem,8vw,6rem)', fontWeight:900, lineHeight:1.05, letterSpacing:'-1px', marginBottom:'1rem' }}>
          <span style={{ color:t.teal }}>Cyber</span><br />
          <span style={{ color:'transparent', WebkitTextStroke:`1px ${t.tealMid}` }}>Security</span>
        </h1>

        <p className="fade-2" style={{ fontSize:'clamp(1rem,2vw,1.2rem)', color:t.textDim, maxWidth:600, lineHeight:1.7, marginBottom:'2.5rem', fontWeight:400 }}>
          Cybersecurity is the practice of protecting computers, networks, and data from cyber threats.
          Find your <span style={{ color:t.teal, fontWeight:600 }}>perfect career path</span> through a clear, step-by-step roadmap.
        </p>

        <button className="btn-explore fade-2" onClick={() => navigate('/register')}>Explore</button>

        <p className="fade-3" style={{ marginTop:'1.5rem', fontSize:'0.9rem', color:t.textDim, maxWidth:480, lineHeight:1.6 }}>
          Explore the possible career paths in cybersecurity and learn the essential skills
          and knowledge required for each path through a clear, step-by-step roadmap.
        </p>
      </section>

      {/* TEAMS PREVIEW */}
      <section style={{ position:'relative', zIndex:1, padding:'3rem 2rem 5rem', maxWidth:1100, margin:'0 auto' }}>
        <p style={{ textAlign:'center', fontFamily:"'Orbitron',monospace", fontSize:'0.7rem', letterSpacing:'4px', color:t.teal, textTransform:'uppercase', marginBottom:'0.8rem' }}>Career Paths</p>
        <h2 style={{ textAlign:'center', fontFamily:"'Orbitron',monospace", fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:700, marginBottom:'3rem', color:t.text }}>Choose Your Side</h2>

        <div className="teams-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem' }}>
          {teams.length === 0 ? (
            <div style={{ gridColumn:'1/-1', textAlign:'center', color:t.textDim, padding:'3rem', fontFamily:"'Orbitron',monospace", fontSize:'0.9rem' }}>
              Loading career paths...
            </div>
          ) : teams.map(team => {
            const blue = isBlue(team.name)
            const accent = blue ? '#4fc3f7' : '#ff6b6b'
            const accentDim = blue ? 'rgba(79,195,247,0.1)' : 'rgba(255,107,107,0.1)'
            const accentBorder = blue ? 'rgba(79,195,247,0.25)' : 'rgba(255,107,107,0.25)'

            return (
              <div key={team.name} className="team-card" style={{ background:t.card, border:`1px solid ${accentBorder}` }}>
                {/* top accent */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${accent},transparent)` }} />

                {/* header */}
                <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem' }}>
                  <div style={{ width:50, height:50, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', background:accentDim, border:`1px solid ${accentBorder}` }}>
                    {blue ? '🛡️' : '⚔️'}
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Orbitron',monospace", fontSize:'1.1rem', fontWeight:700, color:accent }}>{team.name}</div>
                    <div style={{ fontSize:'0.8rem', color:t.textDim, marginTop:'0.2rem' }}>{blue ? 'Defensive Security' : 'Offensive Security'}</div>
                  </div>
                </div>

                <p style={{ fontSize:'0.9rem', color:t.textDim, lineHeight:1.6, marginBottom:'1.5rem' }}>{team.description}</p>

                {/* specialists */}
                <div style={{ position:'relative', minHeight:180 }}>
                  {team.specialists.map((s, i) => (
                    <div key={i} className={i < 2 ? 'spec-visible' : 'spec-locked'}>
                      <div style={{ width:8, height:8, borderRadius:'50%', background:accent, flexShrink:0 }} />
                      <span style={{ fontSize:'0.9rem', fontWeight:500, color:t.text, flex:1 }}>{s.name}</span>
                      {i < 2 && s.income && (
                        <span style={{ fontSize:'0.75rem', color:t.textDim }}>{s.income.split('/')[0].split('-')[0].trim()}</span>
                      )}
                    </div>
                  ))}

                  {/* lock overlay */}
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'4rem 1rem 1rem', background:`linear-gradient(to top, ${t.bg} 50%, transparent)`, display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem' }}>
                    <div style={{ fontSize:'1.5rem' }}>🔒</div>
                    <p style={{ fontSize:'0.82rem', color:t.textDim, textAlign:'center' }}>Sign up to unlock all specialists and learning paths</p>
                    <button className="btn-unlock" onClick={() => navigate('/register')} style={{ color:accent, borderColor:accent }}>
                      Unlock Access →
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* STATS */}
      <section style={{ position:'relative', zIndex:1, padding:'2rem 2rem 5rem', maxWidth:900, margin:'0 auto' }}>
        <div className="stats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}>
          {[{ num:'6+', label:'Career Specializations' }, { num:'AI', label:'Powered Path Analysis' }, { num:'100%', label:'Free Forever' }].map((s, i) => (
            <div key={i} className="stat-card">
              <span style={{ fontFamily:"'Orbitron',monospace", fontSize:'2.2rem', fontWeight:900, color:t.teal, display:'block' }}>{s.num}</span>
              <div style={{ fontSize:'0.85rem', color:t.textDim, letterSpacing:'1px', marginTop:'0.3rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position:'relative', zIndex:1, textAlign:'center', padding:'2rem', borderTop:`1px solid ${t.tealBorder}`, color:t.textDim, fontSize:'0.85rem', letterSpacing:'0.5px' }}>
        Built for cybersecurity learners — <span style={{ color:t.teal }}>Cyber.road</span> © 2025
      </footer>
    </div>
  )
}