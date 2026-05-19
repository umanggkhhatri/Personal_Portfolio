import { useState, useEffect } from 'react'
import site from '../data/site.json'

const NAV_ITEMS = [
  { href: '#home', label: 'Home' },
  { href: '#education', label: 'Education' },
  { href: '#profiles', label: 'Profiles' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: false }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(8,13,26,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,245,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        <a href="#home" className="flex items-center gap-3" onClick={closeMenu}>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono"
            style={{
              background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(191,95,255,0.2))',
              border: '1px solid rgba(0,245,255,0.3)',
              color: '#00f5ff',
            }}
          >
            {site.initials}
          </div>
          <span className="font-mono text-xs text-white/30">/dev</span>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs px-3 py-2 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex lg:hidden items-center gap-4">
          <a
            href="#contact"
            className="font-mono text-xs px-4 py-2 rounded-lg transition-all duration-200"
            style={{
              background: 'rgba(0,245,255,0.08)',
              border: '1px solid rgba(0,245,255,0.2)',
              color: '#00f5ff',
            }}
          >
            Hire Me →
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="font-mono text-xs text-white/60 px-3 py-2 rounded-lg border border-white/10"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <span className="font-mono text-xs text-white/20">{time}</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-xs text-green-400/70">available</span>
          </div>
          <a
            href="#contact"
            className="font-mono text-xs px-4 py-2 rounded-lg transition-all duration-200"
            style={{
              background: 'rgba(0,245,255,0.08)',
              border: '1px solid rgba(0,245,255,0.2)',
              color: '#00f5ff',
            }}
          >
            Hire Me →
          </a>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="font-mono text-xs text-white/60 px-3 py-2 rounded-lg border border-white/10"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="lg:hidden border-t border-white/5 px-6 py-6"
          style={{ background: 'rgba(8,13,26,0.95)', backdropFilter: 'blur(24px)' }}
        >
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="font-mono text-sm px-4 py-3 rounded-lg text-white/50 hover:text-white/90 hover:bg-white/5 transition-all"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="font-mono text-sm px-4 py-3 rounded-lg text-cyan-glow mt-2"
              style={{
                background: 'rgba(0,245,255,0.08)',
                border: '1px solid rgba(0,245,255,0.2)',
              }}
            >
              Hire Me →
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
