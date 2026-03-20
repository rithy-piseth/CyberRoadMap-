import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved !== null ? JSON.parse(saved) : true
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleTheme = () => setDarkMode(prev => !prev)

  const t = darkMode ? {
    // Dark theme
    bg:          '#060d1f',
    bg2:         '#0a1628',
    card:        'rgba(10,22,40,0.9)',
    cardHover:   'rgba(13,27,62,0.95)',
    teal:        '#64ffda',
    tealDim:     'rgba(100,255,218,0.08)',
    tealMid:     'rgba(100,255,218,0.4)',
    tealBorder:  'rgba(100,255,218,0.2)',
    text:        '#ccd6f6',
    textDim:     '#8892b0',
    textMuted:   'rgba(168,216,216,0.5)',
    navBg:       'rgba(6,13,31,0.92)',
    gridColor:   'rgba(100,255,218,0.06)',
    inputBg:     'rgba(100,255,218,0.05)',
    inputBorder: 'rgba(100,255,218,0.2)',
    errorBg:     'rgba(255,107,107,0.1)',
    errorBorder: 'rgba(255,107,107,0.3)',
    errorText:   '#ff6b6b',
    blue:        '#4fc3f7',
    blueDim:     'rgba(79,195,247,0.1)',
    blueBorder:  'rgba(79,195,247,0.25)',
    red:         '#ff6b6b',
    redDim:      'rgba(255,107,107,0.1)',
    redBorder:   'rgba(255,107,107,0.25)',
  } : {
    // Light theme
    bg:          '#f0f4f8',
    bg2:         '#e2e8f0',
    card:        'rgba(255,255,255,0.95)',
    cardHover:   'rgba(255,255,255,1)',
    teal:        '#0d7377',
    tealDim:     'rgba(13,115,119,0.08)',
    tealMid:     'rgba(13,115,119,0.4)',
    tealBorder:  'rgba(13,115,119,0.2)',
    text:        '#1a202c',
    textDim:     '#4a5568',
    textMuted:   'rgba(74,85,104,0.6)',
    navBg:       'rgba(240,244,248,0.95)',
    gridColor:   'rgba(13,115,119,0.05)',
    inputBg:     'rgba(13,115,119,0.05)',
    inputBorder: 'rgba(13,115,119,0.2)',
    errorBg:     'rgba(229,62,62,0.08)',
    errorBorder: 'rgba(229,62,62,0.3)',
    errorText:   '#c53030',
    blue:        '#2b6cb0',
    blueDim:     'rgba(43,108,176,0.1)',
    blueBorder:  'rgba(43,108,176,0.25)',
    red:         '#c53030',
    redDim:      'rgba(197,48,48,0.1)',
    redBorder:   'rgba(197,48,48,0.25)',
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, t }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)