import { Suspense, lazy } from 'react'
import useTypewriter from '../../hooks/useTypewriter.js'
import home from '../../data/home.json'
import site from '../../data/site.json'

const HeroScene = lazy(() => import('../HeroScene.jsx'))

export default function HomeSection({ scrollY }) {
  const typed = useTypewriter(home.taglines)
  const primaryCta = home.ctas.find(c => c.primary)
  const secondaryCta = home.ctas.find(c => !c.primary)

  return (
    <>
      <section
        id="home"
        className="relative w-full min-h-screen flex items-center overflow-hidden"
        style={{ paddingTop: '80px' }}
      >
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-obsidian-950" />}>
            <HeroScene scrollY={scrollY} />
          </Suspense>
        </div>

        <div
          className="absolute inset-0 z-1 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(4,8,16,0.7) 100%)',
          }}
        />

        <div className="relative z-10 w-full px-8 md:px-20 lg:px-32">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8 font-mono text-xs"
              style={{
                background: 'rgba(0,245,255,0.06)',
                border: '1px solid rgba(0,245,255,0.15)',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/50">{site.availability.status}</span>
              <span className="text-white/20">·</span>
              <span className="text-cyan-glow">{site.availability.detail}</span>
            </div>

            <h1 className="font-brutal font-bold leading-[0.95] mb-6">
              <span
                className="block text-white"
                style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
              >
                {home.headline[0]}
              </span>
              <span
                className="block gradient-text"
                style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
              >
                {home.headline[1]}
              </span>
              <span
                className="block text-white/80"
                style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
              >
                {home.headline[2]}
              </span>
            </h1>

            <div className="flex items-center gap-2 mb-10 font-mono text-sm md:text-base text-white/40">
              <span>{'>'}</span>
              <span>Building</span>
              <span className="text-cyan-glow">{typed}</span>
              <span className="text-cyan-glow blink">|</span>
            </div>

            <div className="flex flex-wrap gap-4">
              {primaryCta && (
                <a href={primaryCta.href} className="cyber-btn">
                  {primaryCta.label}
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="font-mono text-sm px-8 py-3.5 rounded-sm text-white/50 hover:text-white/80 transition-all duration-200 flex items-center gap-2"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {secondaryCta.label} <span className="text-violet-glow">→</span>
                </a>
              )}
            </div>

            <div className="flex gap-10 mt-16 pt-8 border-t border-white/5">
              {home.stats.map(stat => (
                <div key={stat.label}>
                  <div className="font-brutal text-2xl font-bold text-cyan-glow">{stat.value}</div>
                  <div className="font-mono text-xs text-white/30 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <span className="font-mono text-xs text-white/20 tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-cyan-500/40 to-transparent" />
        </div>
      </section>

      <section className="relative py-24 px-8 md:px-20 overflow-hidden">
        <div
          className="absolute top-0 left-16 right-16 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), rgba(191,95,255,0.3), transparent)' }}
        />

        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div>
            <p className="section-label mb-4">{home.about.label}</p>
            <h2 className="font-brutal text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {home.about.title[0]}
              <br />
              <span className="gradient-text">{home.about.title[1]}</span>
            </h2>
            {home.about.bio.map((paragraph, i) => (
              <p
                key={i}
                className={`font-mono text-sm text-white/40 leading-relaxed${i < home.about.bio.length - 1 ? ' mb-6' : ''}`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="neumorphic-card rounded-2xl p-8">
            <p className="section-label mb-6">system.specs</p>
            <div className="space-y-4">
              {home.specs.map(({ key, value }) => (
                <div key={key} className="flex gap-4 font-mono text-sm border-b border-white/5 pb-3">
                  <span className="text-cyan-glow/60 min-w-[140px]">{key}</span>
                  <span className="text-white/60">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
