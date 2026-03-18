import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/config'
import Navbar from '../components/Navbar'
import { useTheme } from '../context/ThemeContext'

export default function Admin() {
  const navigate = useNavigate()
  const { t, darkMode } = useTheme()
  const [resources, setResources] = useState([])
  const [specialists, setSpecialists] = useState([])
  const [levels, setLevels] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ level_id: '', title: '', url: '', type: 'article' })
  const [editId, setEditId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [msg, setMsg] = useState('')
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role !== 'admin') { navigate('/dashboard'); return }

    const p = Array.from({ length: 10 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 3 + 1, duration: Math.random() * 8 + 6, delay: Math.random() * 4,
    }))
    setParticles(p)
    loadData()
  }, [])

  const loadData = () => {
    Promise.all([
      API.get('/api/admin/resources'),
      API.get('/api/specialists/teams')
    ]).then(([resRes, teamsRes]) => {
      setResources(resRes.data.data)

      // Build specialists list
      const specs = {}
      const lvls = []
      teamsRes.data.data.forEach(row => {
        if (row.specialist_name && !specs[row.specialist_id]) {
          specs[row.specialist_id] = row.specialist_name
        }
      })
      setSpecialists(specs)
      setLoading(false)
    }).catch(() => setLoading(false))

    // Load levels
    API.get('/api/specialists/teams').then(res => {
      // We'll get levels from the specialist endpoint
    })
  }

  const loadLevels = (specialistSlug) => {
    API.get(`/api/specialists/${specialistSlug}`).then(res => {
      setLevels(res.data.levels)
      setForm(prev => ({ ...prev, level_id: '' }))
    })
  }

  const showMsg = (text) => {
    setMsg(text)
    setTimeout(() => setMsg(''), 3000)
  }

  const handleAdd = async () => {
    if (!form.level_id || !form.title || !form.url) { showMsg('❌ All fields required'); return }
    try {
      await API.post('/api/admin/resources', form)
      showMsg('✅ Resource added!')
      setForm({ level_id: '', title: '', url: '', type: 'article' })
      loadData()
    } catch { showMsg('❌ Failed to add') }
  }

  const handleEdit = (r) => {
    setEditId(r.id)
    setEditForm({ title: r.title, url: r.url, type: r.type })
  }

  const handleUpdate = async (id) => {
    try {
      await API.put(`/api/admin/resources/${id}`, editForm)
      showMsg('✅ Updated!')
      setEditId(null)
      loadData()
    } catch { showMsg('❌ Failed to update') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this resource?')) return
    try {
      await API.delete(`/api/admin/resources/${id}`)
      showMsg('✅ Deleted!')
      loadData()
    } catch { showMsg('❌ Failed to delete') }
  }

  const typeIcons = { video: '🎥', article: '📄', course: '🎓', tool: '🛠️' }

  return (
    <div style={{ minHeight:'100vh', background:t.bg, color:t.text, fontFamily:"'Rajdhani',sans-serif", overflowX:'hidden', position:'relative', transition:'all 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        @keyframes floatUp { 0%,100%{transform:translateY(0) rotate(0deg);opacity:0.4} 50%{transform:translateY(-25px) rotate(180deg);opacity:0.7} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .admin-input { width:100%; padding:0.7rem 1rem; background:${t.inputBg}; border:1px solid ${t.inputBorder}; border-radius:8px; color:${t.text}; font-family:'Rajdhani',sans-serif; font-size:0.95rem; outline:none; transition:all 0.2s; }
        .admin-input:focus { border-color:${t.teal}; box-shadow:0 0 0 3px ${t.tealDim}; }
        .admin-input::placeholder { color:${t.textDim}; }
        .resource-row { display:grid; grid-template-columns:1fr 1fr auto auto; align-items:center; gap:0.8rem; padding:1rem; border-radius:10px; border:1px solid ${t.tealBorder}; background:${t.card}; margin-bottom:0.6rem; transition:all 0.2s; }
        .resource-row:hover { border-color:${t.tealMid}; }
        .edit-btn { background:${t.tealDim}; border:1px solid ${t.tealBorder}; color:${t.teal}; font-family:'Rajdhani',sans-serif; font-size:0.85rem; font-weight:600; cursor:pointer; padding:0.4rem 0.9rem; border-radius:6px; transition:all 0.2s; }
        .edit-btn:hover { border-color:${t.tealMid}; }
        .del-btn { background:${t.errorBg}; border:1px solid ${t.errorBorder}; color:${t.errorText}; font-family:'Rajdhani',sans-serif; font-size:0.85rem; font-weight:600; cursor:pointer; padding:0.4rem 0.9rem; border-radius:6px; transition:all 0.2s; }
        .del-btn:hover { opacity:0.8; }
        .save-btn { background:${t.teal}; border:none; color:${t.bg}; font-family:'Rajdhani',sans-serif; font-size:0.85rem; font-weight:700; cursor:pointer; padding:0.4rem 0.9rem; border-radius:6px; transition:all 0.2s; }
        .save-btn:hover { opacity:0.85; }
      `}</style>

      {particles.map(p => (
        <div key={p.id} style={{ position:'fixed', left:`${p.x}%`, top:`${p.y}%`, width:p.size, height:p.size, borderRadius:'50%', background:darkMode?'rgba(100,255,218,0.4)':'rgba(13,115,119,0.15)', animation:`floatUp ${p.duration}s ease-in-out ${p.delay}s infinite`, pointerEvents:'none', zIndex:0 }} />
      ))}
      {darkMode && <>
        <div style={{ position:'fixed', width:500, height:500, borderRadius:'50%', filter:'blur(120px)', background:'radial-gradient(circle,rgba(13,115,119,0.25),transparent 70%)', top:-150, left:-150, pointerEvents:'none', zIndex:0 }} />
      </>}
      <div style={{ position:'fixed', inset:0, backgroundImage:`linear-gradient(${t.gridColor} 1px,transparent 1px),linear-gradient(90deg,${t.gridColor} 1px,transparent 1px)`, backgroundSize:'60px 60px', pointerEvents:'none', zIndex:0 }} />

      <Navbar />

      <main style={{ position:'relative', zIndex:1, padding:'6rem 2rem 4rem', maxWidth:1100, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom:'2.5rem', animation:'fadeSlideUp 0.6s ease both' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', border:`1px solid ${t.tealMid}`, borderRadius:50, padding:'0.3rem 1rem', fontSize:'0.75rem', color:t.teal, letterSpacing:'3px', textTransform:'uppercase', marginBottom:'1rem' }}>
            <div style={{ width:5, height:5, background:t.teal, borderRadius:'50%' }} />
            Admin Panel
          </div>
          <h1 style={{ fontFamily:"'Orbitron',monospace", fontSize:'clamp(1.5rem,4vw,2.2rem)', fontWeight:900, color:t.text }}>
            Resource Manager
          </h1>
        </div>

        {/* Notification */}
        {msg && (
          <div style={{ background: msg.startsWith('✅') ? t.tealDim : t.errorBg, border:`1px solid ${msg.startsWith('✅') ? t.tealBorder : t.errorBorder}`, borderRadius:8, padding:'0.8rem 1rem', marginBottom:'1.5rem', color: msg.startsWith('✅') ? t.teal : t.errorText, fontSize:'0.9rem' }}>
            {msg}
          </div>
        )}

        {/* Add resource form */}
        <div style={{ background:t.card, border:`1px solid ${t.tealBorder}`, borderRadius:16, padding:'1.5rem', marginBottom:'2rem', backdropFilter:'blur(10px)', animation:'fadeSlideUp 0.6s ease 0.1s both' }}>
          <div style={{ fontSize:'0.75rem', color:t.textDim, letterSpacing:'2px', textTransform:'uppercase', marginBottom:'1.2rem', fontFamily:"'Orbitron',monospace" }}>
            Add New Resource
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1rem' }}>
            <div>
              <label style={{ display:'block', fontSize:'0.8rem', color:t.textDim, marginBottom:'0.4rem', letterSpacing:'1px', textTransform:'uppercase' }}>Specialist Slug</label>
              <input
                className="admin-input"
                placeholder="e.g. pentest, soc-analyst"
                onChange={e => loadLevels(e.target.value)}
              />
            </div>
            <div>
              <label style={{ display:'block', fontSize:'0.8rem', color:t.textDim, marginBottom:'0.4rem', letterSpacing:'1px', textTransform:'uppercase' }}>Level</label>
              <select className="admin-input" value={form.level_id} onChange={e => setForm({...form, level_id: e.target.value})}>
                <option value="">Select level</option>
                {levels.map(l => <option key={l.id} value={l.id}>{l.level_name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display:'block', fontSize:'0.8rem', color:t.textDim, marginBottom:'0.4rem', letterSpacing:'1px', textTransform:'uppercase' }}>Title</label>
              <input className="admin-input" placeholder="Resource title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:'0.8rem', color:t.textDim, marginBottom:'0.4rem', letterSpacing:'1px', textTransform:'uppercase' }}>Type</label>
              <select className="admin-input" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option value="article">📄 Article</option>
                <option value="video">🎥 Video</option>
                <option value="course">🎓 Course</option>
                <option value="tool">🛠️ Tool</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom:'1rem' }}>
            <label style={{ display:'block', fontSize:'0.8rem', color:t.textDim, marginBottom:'0.4rem', letterSpacing:'1px', textTransform:'uppercase' }}>URL</label>
            <input className="admin-input" placeholder="https://..." value={form.url} onChange={e => setForm({...form, url: e.target.value})} />
          </div>

          <button
            onClick={handleAdd}
            style={{ background:t.teal, border:'none', color:t.bg, fontFamily:"'Orbitron',monospace", fontSize:'0.85rem', fontWeight:700, cursor:'pointer', padding:'0.8rem 2rem', borderRadius:8, letterSpacing:'2px', transition:'all 0.2s' }}
            onMouseOver={e => { e.target.style.opacity='0.85'; e.target.style.transform='translateY(-1px)' }}
            onMouseOut={e => { e.target.style.opacity='1'; e.target.style.transform='none' }}
          >
            + Add Resource
          </button>
        </div>

        {/* Resources list */}
        <div style={{ animation:'fadeSlideUp 0.6s ease 0.2s both' }}>
          <div style={{ fontSize:'0.75rem', color:t.textDim, letterSpacing:'2px', textTransform:'uppercase', marginBottom:'1rem', fontFamily:"'Orbitron',monospace" }}>
            All Resources ({resources.length})
          </div>

          {loading ? (
            <div style={{ textAlign:'center', color:t.teal, padding:'2rem', fontFamily:"'Orbitron',monospace", fontSize:'0.85rem', letterSpacing:'2px' }}>Loading...</div>
          ) : resources.length === 0 ? (
            <div style={{ textAlign:'center', color:t.textDim, padding:'2rem', border:`1px dashed ${t.tealBorder}`, borderRadius:12 }}>No resources yet.</div>
          ) : resources.map(r => (
            <div key={r.id} className="resource-row">
              {editId === r.id ? (
                <>
                  <input className="admin-input" value={editForm.title} onChange={e => setEditForm({...editForm, title:e.target.value})} />
                  <input className="admin-input" value={editForm.url} onChange={e => setEditForm({...editForm, url:e.target.value})} />
                  <select className="admin-input" value={editForm.type} onChange={e => setEditForm({...editForm, type:e.target.value})} style={{ width:'auto' }}>
                    <option value="article">📄 Article</option>
                    <option value="video">🎥 Video</option>
                    <option value="course">🎓 Course</option>
                    <option value="tool">🛠️ Tool</option>
                  </select>
                  <div style={{ display:'flex', gap:'0.4rem' }}>
                    <button className="save-btn" onClick={() => handleUpdate(r.id)}>Save</button>
                    <button className="edit-btn" onClick={() => setEditId(null)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div style={{ fontSize:'0.9rem', fontWeight:600, color:t.text }}>{typeIcons[r.type]} {r.title}</div>
                    <div style={{ fontSize:'0.78rem', color:t.textDim, marginTop:'0.2rem' }}>{r.specialist_name} → {r.level_name}</div>
                  </div>
                  <div style={{ fontSize:'0.8rem', color:t.textDim, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    <a href={r.url} target="_blank" rel="noreferrer" style={{ color:t.teal, textDecoration:'none' }}>{r.url}</a>
                  </div>
                  <button className="edit-btn" onClick={() => handleEdit(r)}>Edit</button>
                  <button className="del-btn" onClick={() => handleDelete(r.id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}