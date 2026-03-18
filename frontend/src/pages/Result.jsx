import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/config'
import Navbar from '../components/Navbar'
import { useTheme } from '../context/ThemeContext'

export default function Result() {
  const navigate = useNavigate()
  const { t, darkMode } = useTheme()
  const [result, setResult] = useState(null)
  const [particles, setParticles] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const p = Array.from({ length:15 }, (_,i) => ({ id:i, x:Math.random()*100, y:Math.random()*100, size:Math.random()*3+1, duration:Math.random()*8+6, delay:Math.random()*4 }))
    setParticles(p)
    const saved = localStorage.getItem('assessmentResult')
    if (saved) { setResult(JSON.parse(saved)); setTimeout(() => setVisible(true), 100) }
    else navigate('/assessment')
  }, [])

  const handleExplore = async () => {
    if (result) { try { await API.post('/api/career/choose', { path_name: result.recommended_path }) } catch (e) {} }
    navigate('/dashboard')
  }

  const isRedTeam = result?.team?.toLowerCase().includes('red')
  const teamColor = isRedTeam ? t.red : t.blue
  const teamColorDim = isRedTeam ? t.redDim : t.blueDim
  const teamColorBorder = isRedTeam ? t.redBorder : t.blueBorder
  const teamIcon = isRedTeam ? '⚔️' : '🛡️'

  return (
    <div style={{ minHeight:'100vh', background:t.bg, color:t.text, fontFamily:"'Rajdhani',sans-serif", overflowX:'hidden', position:'relative', transition:'all 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        @keyframes floatUp{0%,100%{transform:translateY(0) rotate(0deg);opacity:0.4}50%{transform:translateY(-25px) rotate(180deg);opacity:0.7}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 20px ${t.tealDim}}50%{box-shadow:0 0 50px ${t.tealMid}}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}
        @keyframes countUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .trait-badge{display:inline-flex;align-items:center;gap:0.4rem;padding:0.4rem 1rem;border-radius:50px;border:1px solid ${t.tealBorder};background:${t.tealDim};font-size:0.85rem;color:${t.teal};font-weight:500}
        .explore-btn{background:${t.teal};border:none;color:${t.bg};font-family:'Orbitron',monospace;font-size:0.9rem;font-weight:700;cursor:pointer;padding:1rem 3rem;border-radius:8px;letter-spacing:2px;transition:all 0.3s;animation:glowPulse 2s ease-in-out infinite}
        .explore-btn:hover{opacity:0.9;transform:translateY(-3px);box-shadow:0 10px 30px ${t.tealMid}}
        .retry-btn{background:none;border:1px solid ${t.tealBorder};color:${t.textDim};font-family:'Rajdhani',sans-serif;font-size:0.9rem;font-weight:500;cursor:pointer;padding:0.7rem 2rem;border-radius:8px;transition:all 0.2s;letter-spacing:1px}
        .retry-btn:hover{border-color:${t.tealMid};color:${t.text}}
      `}</style>

      {particles.map(p => (<div key={p.id} style={{ position:'fixed', left:`${p.x}%`, top:`${p.y}%`, width:p.size, height:p.size, borderRadius:'50%', background:darkMode?'rgba(100,255,218,0.4)':'rgba(13,115,119,0.15)', animation:`floatUp ${p.duration}s ease-in-out ${p.delay}s infinite`, pointerEvents:'none', zIndex:0 }} />))}
      {darkMode && <><div style={{ position:'fixed', width:600, height:600, borderRadius:'50%', filter:'blur(120px)', background:'radial-gradient(circle,rgba(13,115,119,0.3),transparent 70%)', top:-200, left:-200, pointerEvents:'none', zIndex:0 }} /><div style={{ position:'fixed', width:400, height:400, borderRadius:'50%', filter:'blur(100px)', background:`radial-gradient(circle,${isRedTeam?'rgba(255,107,107,0.1)':'rgba(79,195,247,0.1)'},transparent 70%)`, bottom:-100, right:-100, pointerEvents:'none', zIndex:0 }} /></>}
      <div style={{ position:'fixed', inset:0, backgroundImage:`linear-gradient(${t.gridColor} 1px,transparent 1px),linear-gradient(90deg,${t.gridColor} 1px,transparent 1px)`, backgroundSize:'60px 60px', pointerEvents:'none', zIndex:0 }} />

      <Navbar />

      <main style={{ position:'relative', zIndex:1, minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'6rem 2rem 4rem' }}>
        {result && (
          <div style={{ width:'100%', maxWidth:680, textAlign:'center' }}>
            <div style={{ animation:visible?'fadeSlideUp 0.6s ease both':'none', marginBottom:'1.5rem' }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', border:`1px solid ${t.tealMid}`, borderRadius:50, padding:'0.4rem 1.2rem', fontSize:'0.75rem', color:t.teal, letterSpacing:'3px', textTransform:'uppercase' }}>
                <div style={{ width:6, height:6, background:t.teal, borderRadius:'50%' }} />
                Analysis Complete
              </div>
            </div>

            <h1 style={{ fontFamily:"'Orbitron',monospace", fontSize:'clamp(1rem,2.5vw,1.5rem)', fontWeight:700, color:t.textDim, marginBottom:'0.5rem', animation:visible?'fadeSlideUp 0.6s ease 0.1s both':'none' }}>
              Your suitable path is
            </h1>

            <div style={{ animation:visible?'scaleIn 0.7s cubic-bezier(0.175,0.885,0.32,1.275) 0.2s both':'none', margin:'1rem 0 1.5rem' }}>
              <h2 style={{ fontFamily:"'Orbitron',monospace", fontSize:'clamp(2rem,5vw,3.2rem)', fontWeight:900, color:t.teal, lineHeight:1.1, textShadow:darkMode?`0 0 40px ${t.tealMid}`:'none' }}>
                {result.recommended_path}
              </h2>
            </div>

            <div style={{ animation:visible?'fadeSlideUp 0.6s ease 0.3s both':'none', marginBottom:'2rem' }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:'0.8rem', background:teamColorDim, border:`1px solid ${teamColorBorder}`, borderRadius:50, padding:'0.5rem 1.5rem' }}>
                <span style={{ fontSize:'1.2rem' }}>{teamIcon}</span>
                <span style={{ fontFamily:"'Orbitron',monospace", fontSize:'0.85rem', fontWeight:700, color:teamColor, letterSpacing:'1px' }}>{result.team}</span>
              </div>
            </div>

            <div style={{ background:t.card, border:`1px solid ${teamColorBorder}`, borderRadius:20, padding:'2rem', backdropFilter:'blur(12px)', marginBottom:'2rem', position:'relative', overflow:'hidden', animation:visible?'fadeSlideUp 0.6s ease 0.4s both':'none', transition:'all 0.3s' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${teamColor},transparent)` }} />

              <div style={{ marginBottom:'1.8rem' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1rem' }}>
                  <div style={{ width:3, height:20, background:t.teal, borderRadius:2 }} />
                  <span style={{ fontFamily:"'Orbitron',monospace", fontSize:'0.75rem', letterSpacing:'2px', color:t.teal, textTransform:'uppercase' }}>Why this path</span>
                </div>
                <p style={{ fontSize:'1rem', color:t.textDim, lineHeight:1.8, textAlign:'left' }}>{result.reason}</p>
              </div>

              {result.key_traits?.length > 0 && (
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1rem' }}>
                    <div style={{ width:3, height:20, background:t.teal, borderRadius:2 }} />
                    <span style={{ fontFamily:"'Orbitron',monospace", fontSize:'0.75rem', letterSpacing:'2px', color:t.teal, textTransform:'uppercase' }}>Your key traits</span>
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'0.6rem' }}>
                    {result.key_traits.map((trait,i) => (
                      <div key={i} className="trait-badge" style={{ animation:visible?`countUp 0.4s ease ${0.5+i*0.1}s both`:'none' }}>✦ {trait}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem', animation:visible?'fadeSlideUp 0.6s ease 0.6s both':'none' }}>
              <button className="explore-btn" onClick={handleExplore}>Explore Your Learning Path →</button>
              <button className="retry-btn" onClick={() => navigate('/assessment')}>Retake Assessment</button>
            </div>

            <p style={{ marginTop:'2rem', fontSize:'0.82rem', color:t.textMuted, animation:visible?'fadeSlideUp 0.6s ease 0.7s both':'none' }}>
              This recommendation is saved to your profile. You can retake the assessment anytime.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}