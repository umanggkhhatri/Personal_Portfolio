import { useEffect, useRef, useState, Suspense, lazy } from 'react'
import Navbar from './components/Navbar.jsx'
import TechOrbit from './components/TechOrbit.jsx'
import ProjectsShowcase from './components/ProjectsShowcase.jsx'
import ContactTerminal from './components/ContactTerminal.jsx'

const HeroScene = lazy(() => import('./components/HeroScene.jsx'))

/* ── Typewriter hook ── */
function useTypewriter(texts, speed = 80, pause = 2200) {
  const [display, setDisplay] = useState('')
  const [textIdx, setTextIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIdx]
    let timeout

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setTextIdx(i => (i + 1) % texts.length)
    }

    setDisplay(current.substring(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, textIdx, texts, speed, pause])

  return display
}

/* ── Custom Cursor ── */
function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let animId

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dot) {
        dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      }
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ring) {
        ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      }
      animId = requestAnimationFrame(animate)
    }

    const onEnterLink = () => {
      if (ring) {
        ring.style.width = '56px'
        ring.style.height = '56px'
        ring.style.borderColor = 'rgba(191,95,255,0.7)'
        ring.style.marginLeft = '-10px'
        ring.style.marginTop = '-10px'
      }
    }

    const onLeaveLink = () => {
      if (ring) {
        ring.style.width = '36px'
        ring.style.height = '36px'
        ring.style.borderColor = 'rgba(0,245,255,0.5)'
        ring.style.marginLeft = '0'
        ring.style.marginTop = '0'
      }
    }

    window.addEventListener('mousemove', onMove)
    animId = requestAnimationFrame(animate)

    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

/* ── Hero Section ── */
function HeroSection({ scrollY }) {
  const taglines = [
    'high-performance architectures',
    'AI-driven automation systems',
    'real-time data pipelines',
    'intelligent full-stack products',
  ]
  const typed = useTypewriter(taglines)

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      {/* Three.js Canvas — full BG */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-obsidian-950" />}>
          <HeroScene scrollY={scrollY} />
        </Suspense>
      </div>

      {/* Radial vignette */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(4,8,16,0.7) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-8 md:px-20 lg:px-32">
        <div className="max-w-3xl">
          {/* Status pill */}
          <div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8 font-mono text-xs"
            style={{
              background: 'rgba(0,245,255,0.06)',
              border: '1px solid rgba(0,245,255,0.15)',
            }}
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/50">Available for work</span>
            <span className="text-white/20">·</span>
            <span className="text-cyan-glow">Open to opportunities</span>
          </div>

          {/* Main headline */}
          <h1 className="font-brutal font-bold leading-[0.95] mb-6">
            <span
              className="block text-white"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            >
              Full-Stack
            </span>
            <span
              className="block gradient-text"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            >
              Engineering
            </span>
            <span
              className="block text-white/80"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            >
              & AI Automation.
            </span>
          </h1>

          {/* Typewriter tagline */}
          <div className="flex items-center gap-2 mb-10 font-mono text-sm md:text-base text-white/40">
            <span>{'>'}</span>
            <span>Building</span>
            <span className="text-cyan-glow">{typed}</span>
            <span className="text-cyan-glow blink">|</span>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="cyber-btn">
              View My Work
            </a>
            <a
              href="#contact"
              className="font-mono text-sm px-8 py-3.5 rounded-sm text-white/50 hover:text-white/80 transition-all duration-200 flex items-center gap-2"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              Let's Talk <span className="text-violet-glow">→</span>
            </a>
          </div>

          {/* Stats row */}
          <div className="flex gap-10 mt-16 pt-8 border-t border-white/5">
            {[
              { val: '4+', label: 'Years exp.' },
              { val: '20+', label: 'Projects shipped' },
              { val: '99.9%', label: 'Uptime avg.' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="font-brutal text-2xl font-bold text-cyan-glow">{stat.val}</div>
                <div className="font-mono text-xs text-white/30 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="font-mono text-xs text-white/20 tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-cyan-500/40 to-transparent" />
      </div>
    </section>
  )
}

/* ── About / Stats strip ── */
function AboutStrip() {
  return (
    <section className="relative py-24 px-8 md:px-20 overflow-hidden">
      {/* Horizontal glowing line */}
      <div
        className="absolute top-0 left-16 right-16 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), rgba(191,95,255,0.3), transparent)' }}
      />

      <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        <div>
          <p className="section-label mb-4">// about_me.json</p>
          <h2 className="font-brutal text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Architecting the<br />
            <span className="gradient-text">impossible.</span>
          </h2>
          <p className="font-mono text-sm text-white/40 leading-relaxed mb-6">
            I engineer systems at the boundary of performance and intelligence —
            from sub-millisecond C++ execution engines to production-grade AI agents
            that scale to millions of users.
          </p>
          <p className="font-mono text-sm text-white/40 leading-relaxed">
            Every line of code is intentional. Every architecture decision is principled.
            I build software that doesn't just work — it dominates.
          </p>
        </div>

        {/* Spec card */}
        <div className="neumorphic-card rounded-2xl p-8">
          <p className="section-label mb-6">system.specs</p>
          <div className="space-y-4">
            {[
              { key: 'specialization', val: 'Full-Stack · AI · Systems' },
              { key: 'primary_langs', val: 'TypeScript, Python, C++' },
              { key: 'domains', val: 'Web, HFT, Healthcare, AI' },
              { key: 'architecture', val: 'Microservices, Event-driven' },
              { key: 'status', val: 'Open to Work ✓' },
            ].map(({ key, val }) => (
              <div key={key} className="flex gap-4 font-mono text-sm border-b border-white/5 pb-3">
                <span className="text-cyan-glow/60 min-w-[140px]">{key}</span>
                <span className="text-white/60">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-8 md:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-mono text-xs text-white/20">
          © 2026 · Built with React + Three.js + Tailwind · Neumorphic-Cyber
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400/60">All systems operational</span>
        </div>
        <div className="font-mono text-xs text-white/20">
          Designed to dominate.
        </div>
      </div>
    </footer>
  )
}

/* ── App ── */
export default function App() {
  const scrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => { scrollY.current = window.scrollY }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#040810' }}>
      {/* Background effects */}
      <div className="noise-overlay" />
      <div className="grid-lines" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Ambient glows */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          top: '-20vh',
          left: '-20vw',
          width: '70vw',
          height: '70vh',
          background: 'radial-gradient(ellipse, rgba(0,245,255,0.04) 0%, transparent 70%)',
        }}
      />
      <div
        className="fixed pointer-events-none z-0"
        style={{
          bottom: '-20vh',
          right: '-20vw',
          width: '70vw',
          height: '70vh',
          background: 'radial-gradient(ellipse, rgba(191,95,255,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <HeroSection scrollY={scrollY} />
        <AboutStrip />
        <TechOrbit />
        <ProjectsShowcase />
        <ContactTerminal />
      </main>

      <Footer />
    </div>
  )
}
