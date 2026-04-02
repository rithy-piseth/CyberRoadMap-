import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import MoonImg from '../assets/images/Moon.png'
import SunImg from '../assets/images/Sun.png'
import LogoImg from '../assets/images/Logo.png'

export default function Navbar({ activePage = 'home' }) {
  const navigate = useNavigate()
  const { darkMode, toggleTheme, t } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const username = localStorage.getItem('username')
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
    setMenuOpen(false)
  }

  const navTo = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');

        .nav-link-item {
          color: ${t.textDim};
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 0.35rem 1rem;
          border-radius: 50px;
          transition: all 0.2s;
          font-family: 'Rajdhani', sans-serif;
          cursor: pointer;
          border: none;
          background: none;
          letter-spacing: 0.5px;
        }
        .nav-link-item:hover { color: ${t.teal}; background: ${t.tealDim}; }
        .nav-link-item.active { color: ${t.teal}; background: ${t.tealDim}; }

        .nav-toggle {
          width: 44px; height: 24px; border-radius: 12px;
          background: ${darkMode ? t.tealDim : '#cbd5e0'};
          border: 1px solid ${t.tealBorder};
          cursor: pointer; position: relative; transition: all 0.3s;
          flex-shrink: 0;
        }
        .nav-toggle-knob {
          position: absolute; top: 2px;
          width: 18px; height: 18px; border-radius: 50%;
          background: ${t.teal}; transition: all 0.3s;
          left: ${darkMode ? '22px' : '2px'};
        }
        .nav-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: ${t.tealDim};
          border: 1px solid ${t.tealBorder};
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; color: ${t.teal};
          font-family: 'Orbitron', monospace; font-weight: 700;
          cursor: pointer; transition: all 0.2s; flex-shrink: 0;
        }
        .nav-avatar:hover { border-color: ${t.tealMid}; background: ${t.tealDim}; }

        .logout-btn {
          background: none; border: 1px solid ${t.tealBorder};
          color: ${t.textDim}; font-family: 'Rajdhani', sans-serif;
          font-size: 0.85rem; cursor: pointer; padding: 0.3rem 0.9rem;
          border-radius: 6px; transition: all 0.2s; letter-spacing: 0.5px;
          white-space: nowrap;
        }
        .logout-btn:hover { border-color: ${t.errorBorder}; color: ${t.errorText}; }

        @keyframes fadeSlideDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes menuSlide { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }

        /* ── Hamburger button (mobile only) ── */
        .hamburger-btn {
          display: none;
          background: none;
          border: 1px solid ${t.tealBorder};
          color: ${t.teal};
          padding: 0.38rem 0.6rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.1rem;
          line-height: 1;
          transition: all 0.2s;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .hamburger-btn:hover { background: ${t.tealDim}; }

        /* ── Mobile dropdown menu ── */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 70px;
          left: 0; right: 0;
          background: ${t.navBg};
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid ${t.tealBorder};
          flex-direction: column;
          padding: 0.8rem 1.2rem 1.2rem;
          gap: 0.3rem;
          z-index: 99;
          animation: menuSlide 0.25s ease both;
        }
        .mobile-menu.open { display: flex; }

        .mobile-nav-btn {
          background: none;
          border: none;
          color: ${t.textDim};
          font-family: 'Rajdhani', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          text-align: left;
          transition: all 0.2s;
          letter-spacing: 0.5px;
          width: 100%;
        }
        .mobile-nav-btn:hover, .mobile-nav-btn.active { color: ${t.teal}; background: ${t.tealDim}; }

        .mobile-divider { height: 1px; background: ${t.tealBorder}; margin: 0.4rem 0; }

        .mobile-logout-btn {
          background: none;
          border: 1px solid ${t.errorBorder};
          color: ${t.errorText};
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.95rem;
          cursor: pointer;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          transition: all 0.2s;
          text-align: left;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-top: 0.2rem;
          width: 100%;
        }

        .nav-username {
          font-size: 0.9rem;
          color: ${t.textDim};
          font-family: 'Rajdhani', sans-serif;
          white-space: nowrap;
        }

        /* ── Responsive breakpoints ── */
        @media(max-width: 768px) {
          .nav-center-pill { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .nav-username { display: none !important; }
          .logout-btn { display: none !important; }
        }
        @media(max-width: 480px) {
          .nav-logo-text { display: none !important; }
          .nav-moon-sun { display: none !important; }
        }
      `}</style>

      {/* ── Main navbar ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.75rem 1.5rem',
        background: t.navBg,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${t.tealBorder}`,
        animation: 'fadeSlideDown 0.6s ease both',
        transition: 'background 0.3s, border-color 0.3s',
        minHeight: 70,
      }}>

        {/* Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', flexShrink: 0 }}
          onClick={() => navTo('/')}
        >
          <img
            src={LogoImg}
            alt="CyberRoadMap Logo"
            style={{ height: 46, width: 'auto', objectFit: 'contain' }}
          />
          <span className="nav-logo-text" style={{ fontFamily: "'Orbitron',monospace", fontSize: '0.95rem', fontWeight: 700, color: t.teal }}>
            CyberRoadMap
          </span>
        </div>

        {/* Center pill — desktop only, logged-in users */}
        {token && (
          <div className="nav-center-pill" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: t.tealDim, border: `1px solid ${t.tealBorder}`, borderRadius: 50, padding: '0.4rem 0.8rem', transition: 'all 0.3s' }}>
            <span style={{ color: t.tealMid, fontSize: '1rem', padding: '0 0.3rem' }}>☰</span>
            <button className={`nav-link-item ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => navTo('/dashboard')}>Dashboard</button>
            <div style={{ width: 1, height: 16, background: t.tealBorder }} />
            <button className={`nav-link-item ${activePage === 'profile' ? 'active' : ''}`} onClick={() => navTo('/profile')}>Profile</button>
            {localStorage.getItem('role') === 'admin' && <>
              <div style={{ width: 1, height: 16, background: t.tealBorder }} />
              <button className={`nav-link-item ${activePage === 'admin' ? 'active' : ''}`} onClick={() => navTo('/admin')} style={{ color: activePage === 'admin' ? t.teal : '#f6ad55' }}>⚙️ Admin</button>
            </>}
          </div>
        )}

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* Theme toggle */}
          <img
            className="nav-moon-sun"
            src={darkMode ? MoonImg : SunImg}
            alt={darkMode ? 'Moon' : 'Sun'}
            style={{ width: 26, height: 26, objectFit: 'cover' }}
          />
          <div className="nav-toggle" onClick={toggleTheme}>
            <div className="nav-toggle-knob" />
          </div>

          {token ? (
            <>
              <div className="nav-avatar" onClick={() => navTo('/profile')}>
                {(username || 'U').charAt(0).toUpperCase()}
              </div>
              <span className="nav-username">{username}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
              {/* Hamburger — mobile only */}
              <button className="hamburger-btn" onClick={() => setMenuOpen(p => !p)} aria-label="Toggle menu">
                {menuOpen ? '✕' : '☰'}
              </button>
            </>
          ) : (
            <>
              <button className="nav-link-item" onClick={() => navTo('/login')}>Login</button>
              <button
                onClick={() => navTo('/register')}
                style={{ background: t.teal, border: 'none', color: t.bg, fontFamily: "'Rajdhani',sans-serif", fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', padding: '0.5rem 1.1rem', borderRadius: 6, transition: 'all 0.2s', letterSpacing: '1px', whiteSpace: 'nowrap' }}
                onMouseOver={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = `0 4px 15px ${t.tealMid}` }}
                onMouseOut={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none' }}
              >Sign Up</button>
            </>
          )}
        </div>
      </nav>

      {/* ── Mobile slide-down menu ── */}
      {token && (
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <button className={`mobile-nav-btn ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => navTo('/dashboard')}>📊 Dashboard</button>
          <button className={`mobile-nav-btn ${activePage === 'profile' ? 'active' : ''}`} onClick={() => navTo('/profile')}>👤 Profile</button>
          {localStorage.getItem('role') === 'admin' && (
            <button className={`mobile-nav-btn ${activePage === 'admin' ? 'active' : ''}`} onClick={() => navTo('/admin')} style={{ color: '#f6ad55' }}>⚙️ Admin Panel</button>
          )}
          <div className="mobile-divider" />
          {/* Theme toggle row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 1rem' }}>
            <span style={{ color: t.textDim, fontFamily: "'Rajdhani',sans-serif", fontSize: '0.95rem', fontWeight: 600 }}>
              {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </span>
            <div className="nav-toggle" onClick={toggleTheme} style={{ flexShrink: 0 }}>
              <div className="nav-toggle-knob" />
            </div>
          </div>
          <div className="mobile-divider" />
          <button className="mobile-logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>
      )}
    </>
  )
}