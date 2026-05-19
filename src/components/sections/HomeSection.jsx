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
        className="relative w-full min-h-screen flex items-center overflow-hidden pt-24"
      >
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
        <div className="absolute inset-0 bg-background/40 dark:bg-background/60 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 bg-accent-soft border border-border">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-sans text-sm text-muted">{site.availability.status}</span>
              <span className="text-muted/40">·</span>
              <span className="font-sans text-sm font-medium text-accent">
                {site.availability.detail}
              </span>
            </div>

            <h1 className="font-display font-semibold leading-[1.05] mb-6 text-foreground">
              <span className="block text-[clamp(2.5rem,6vw,4.5rem)]">{home.headline[0]}</span>
              <span className="block text-[clamp(2.5rem,6vw,4.5rem)] gradient-text">
                {home.headline[1]}
              </span>
              <span className="block text-[clamp(1.5rem,3.5vw,2.25rem)] text-muted mt-1">
                {home.headline[2]}
              </span>
            </h1>

            <p className="font-sans text-base md:text-lg text-muted mb-8 max-w-lg leading-relaxed">
              Building{' '}
              <span className="text-accent font-medium">{typed}</span>
              <span className="text-accent blink">|</span>
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              {primaryCta && (
                <a href={primaryCta.href} className="btn-primary">
                  {primaryCta.label}
                </a>
              )}
              {secondaryCta && (
                <a href={secondaryCta.href} className="btn-secondary">
                  {secondaryCta.label} →
                </a>
              )}
            </div>

            <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
              {home.stats.map(stat => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-semibold text-accent">{stat.value}</div>
                  <div className="font-sans text-sm text-muted mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[min(420px,50vh)] lg:h-[min(520px,70vh)] rounded-2xl overflow-hidden">
            <Suspense
              fallback={
                <div className="w-full h-full rounded-2xl bg-surface border border-border animate-pulse" />
              }
            >
              <HeroScene scrollY={scrollY} />
            </Suspense>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-muted tracking-widest">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-accent/50 to-transparent" />
        </div>
      </section>

      <section className="relative py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="section-divider mb-16 max-w-4xl" />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="section-label mb-4">{home.about.label}</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6 leading-tight">
              {home.about.title[0]}
              <br />
              <span className="gradient-text">{home.about.title[1]}</span>
            </h2>
            {home.about.bio.map((paragraph, i) => (
              <p
                key={i}
                className={`font-sans text-base text-muted leading-relaxed${i < home.about.bio.length - 1 ? ' mb-5' : ''}`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="surface-card rounded-2xl p-8">
            <p className="section-label mb-6">At a glance</p>
            <div className="space-y-4">
              {home.specs.map(({ key, value }) => (
                <div
                  key={key}
                  className="flex flex-col sm:flex-row sm:gap-4 font-sans text-sm border-b border-border pb-3 last:border-0"
                >
                  <span className="text-accent font-medium min-w-[140px] capitalize">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className="text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
