import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { href: '#hero', label: 'Home' },
  { href: '#skills', label: 'Stack' },
  { href: '#projects', label: 'Work' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState('')

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
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono"
            style={{
              background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(191,95,255,0.2))',
              border: '1px solid rgba(0,245,255,0.3)',
              color: '#00f5ff',
            }}
          >
            UK
          </div>
          <span className="font-mono text-xs text-white/30">/dev</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs px-4 py-2 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* System status */}
        <div className="hidden md:flex items-center gap-4">
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
      </div>
    </nav>
  )
}
