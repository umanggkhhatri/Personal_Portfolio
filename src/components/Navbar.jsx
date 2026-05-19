import { useState, useEffect } from 'react'
import site from '../data/site.json'
import ThemeToggle from './ThemeToggle.jsx'

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
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-panel border-b border-border shadow-card' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-4 max-w-7xl mx-auto">
        <a href="#home" className="flex items-center gap-3 group" onClick={closeMenu}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold font-display bg-accent-soft text-accent border border-border group-hover:shadow-glow transition-shadow">
            {site.initials}
          </div>
          <span className="font-sans text-sm font-medium text-muted hidden sm:block">
            {site.name}
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="font-sans text-sm px-3 py-2 rounded-lg text-muted hover:text-foreground hover:bg-accent-soft transition-all"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="#contact" className="btn-primary text-sm py-2.5 px-5 hidden sm:inline-flex">
            Hire Me
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden font-sans text-sm px-3 py-2 rounded-lg border border-border text-muted hover:text-foreground"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden glass-panel-strong border-t border-border px-6 py-6">
          <div className="flex flex-col gap-1 max-w-7xl mx-auto">
            {NAV_ITEMS.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="font-sans text-base px-4 py-3 rounded-lg text-muted hover:text-foreground hover:bg-accent-soft transition-all"
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={closeMenu} className="btn-primary mt-3 text-center">
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
