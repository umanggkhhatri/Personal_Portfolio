import { useState } from 'react'
import projectsData from '../data/projects.json'

/* ─── Badge ──────────────────────────────────────────────── */
const BADGE_CLASSES = {
  cyan:   'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  violet: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  green:  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
}

function ProjectBadge({ badge }) {
  if (!badge) return null
  const cls = BADGE_CLASSES[badge.variant] || BADGE_CLASSES.cyan
  return (
    <span className={`font-mono text-xs px-3 py-1 rounded-full ${cls}`}>
      {badge.text}
    </span>
  )
}

/* ─── Link Buttons ───────────────────────────────────────── */
function ProjectLinks({ links }) {
  if (!links) return null
  return (
    <div className="flex gap-3 mt-auto pt-4 flex-wrap">
      {links.demo && (
        <a
          href={links.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="cyber-btn text-xs py-2.5 px-5"
        >
          Live Demo →
        </a>
      )}
      {links.repo && (
        <a
          href={links.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs px-5 py-2.5 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943"/>
          </svg>
          View on GitHub
        </a>
      )}
    </div>
  )
}

/* ─── Featured Card (LocalRAG) ───────────────────────────── */
function FeaturedCard({ project }) {
  const titleLines = Array.isArray(project.title) ? project.title : [project.title]

  return (
    <div className="neumorphic-card rounded-2xl overflow-hidden group relative h-full flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none" />

      <div className="relative p-8 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <span className="section-label block mb-2">{project.label}</span>
            <h3 className="font-brutal text-3xl font-bold text-white leading-tight">
              {titleLines[0]}
              {titleLines[1] && (
                <>
                  <br />
                  <span className="gradient-text">{titleLines[1]}</span>
                </>
              )}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.15)' }}
            >
              {project.icon}
            </div>
            <ProjectBadge badge={project.badge} />
          </div>
        </div>

        {/* Description */}
        <p className="text-white/55 font-mono text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Highlight */}
        {project.highlight && (
          <div
            className="rounded-xl px-4 py-3 mb-5 font-mono text-xs"
            style={{ background: 'rgba(0,245,255,0.04)', border: '1px solid rgba(0,245,255,0.1)', color: '#00f5ff' }}
          >
            💡 {project.highlight}
          </div>
        )}

        {/* Stats */}
        {project.stats && (
          <div className="grid grid-cols-3 gap-3 mb-5">
            {project.stats.map(s => (
              <div
                key={s.label}
                className="rounded-xl p-3 text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="font-mono text-lg font-bold text-cyan-glow">{s.value}</div>
                <div className="font-mono text-xs text-white/30">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tags.map(t => (
            <span
              key={t}
              className="font-mono text-xs px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(0,245,255,0.06)',
                border: '1px solid rgba(0,245,255,0.12)',
                color: '#00f5ff',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <ProjectLinks links={project.links} />
      </div>
    </div>
  )
}

/* ─── Terminal Card (Droidrun) ───────────────────────────── */
function TerminalCard({ project }) {
  const { terminal } = project
  return (
    <div className="terminal-card h-full scanline-container group flex flex-col">
      {/* Window chrome */}
      <div className="terminal-header flex-shrink-0">
        <div className="terminal-dot bg-red-500" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-green-500" />
        <span className="font-mono text-xs text-white/30 ml-2">{terminal.filename}</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs text-green-400">{terminal.status}</span>
        </div>
      </div>

      {/* Terminal output */}
      <div className="p-5 flex flex-col gap-1 font-mono text-sm flex-1 overflow-hidden">
        {terminal.lines.map((line, i) => (
          <div
            key={i}
            className="flex gap-3 opacity-0"
            style={{ animation: `fadeInUp 0.4s ease forwards ${i * 0.1}s` }}
          >
            <span style={{ color: line.color, minWidth: '14px', flexShrink: 0 }}>{line.prefix}</span>
            <span className="text-white/70 group-hover:text-white/90 transition-colors truncate">
              {line.text}
            </span>
          </div>
        ))}
        <div className="flex gap-3 mt-2">
          <span className="text-cyan-glow">$</span>
          <span className="text-white/40"><span className="blink">█</span></span>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-t border-cyan-500/10 p-4 grid grid-cols-3 gap-3 flex-shrink-0">
        {terminal.stats.map(stat => (
          <div key={stat.label} className="text-center">
            <div className="font-mono text-base font-bold text-cyan-glow">{stat.value}</div>
            <div className="font-mono text-xs text-white/30">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Description + tags + links */}
      <div className="px-5 pb-5 flex flex-col gap-3 flex-shrink-0">
        <p className="text-white/45 font-mono text-xs leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(t => (
            <span
              key={t}
              className="font-mono text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.1)', color: '#00f5ff' }}
            >
              {t}
            </span>
          ))}
        </div>
        <ProjectLinks links={project.links} />
      </div>
    </div>
  )
}

/* ─── Platform Card (Prashikshan) ────────────────────────── */
function PlatformCard({ project }) {
  const { platform } = project
  const [activeRole, setActiveRole] = useState(0)

  return (
    <div
      className="glass rounded-2xl overflow-hidden group relative h-full flex flex-col"
      style={{ border: '1px solid rgba(0,245,255,0.08)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 p-5 border-b border-white/5 flex-shrink-0">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.2)' }}
        >
          {platform.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-brutal text-base font-semibold text-white">{platform.name}</div>
          <div className="font-mono text-xs text-white/40 truncate">{platform.subtitle}</div>
        </div>
        <ProjectBadge badge={project.badge} />
      </div>

      {/* Role switcher */}
      <div className="flex gap-1.5 p-4 border-b border-white/5 flex-shrink-0">
        {platform.roles.map((role, i) => (
          <button
            key={role}
            type="button"
            onClick={() => setActiveRole(i)}
            className={`font-mono text-xs px-3 py-1.5 rounded-lg transition-all duration-200 ${
              activeRole === i
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25'
                : 'bg-white/3 text-white/40 border border-white/8 hover:text-white/60'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Feature grid */}
      <div className="p-4 grid grid-cols-2 gap-3 flex-1">
        {platform.features.map(f => (
          <div
            key={f.label}
            className="rounded-xl p-3 flex items-center gap-3 transition-all duration-200 group/feat hover:scale-[1.02]"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span className="text-lg">{f.icon}</span>
            <span className="font-mono text-xs text-white/60">{f.label}</span>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="px-5 pb-2">
        <p className="text-white/45 font-mono text-xs leading-relaxed">{project.description}</p>
      </div>

      {/* Tags */}
      <div className="px-5 pb-2 flex flex-wrap gap-1.5">
        {project.tags.map(t => (
          <span
            key={t}
            className="font-mono text-xs px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(191,95,255,0.06)', border: '1px solid rgba(191,95,255,0.12)', color: '#bf5fff' }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="px-5 pb-5">
        <ProjectLinks links={project.links} />
      </div>
    </div>
  )
}

/* ─── Dispatcher ─────────────────────────────────────────── */
function ProjectCard({ project }) {
  switch (project.type) {
    case 'featured':  return <FeaturedCard project={project} />
    case 'terminal':  return <TerminalCard project={project} />
    case 'platform':  return <PlatformCard project={project} />
    default:          return null
  }
}

/* ─── Section ────────────────────────────────────────────── */
export default function ProjectsShowcase() {
  const { label, title, subtitle, projects } = projectsData

  return (
    <section id="projects" className="relative py-28 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="mb-16">
        <p className="section-label mb-4">{label}</p>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
            <span className="text-foreground">{title[0]}</span>
            <br />
            <span className="gradient-text">{title[1]}</span>
          </h2>
          <p className="font-sans text-base text-muted max-w-xs">{subtitle}</p>
        </div>
      </div>

      {/* Bento grid */}
      <div
        id="projects-bento"
        className="grid gap-5"
        style={{ gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'auto' }}
      >
        {projects.map(project => {
          const minHeight = project.gridRow >= 2 ? 'min-h-[520px]' : 'min-h-[460px]'
          return (
            <div
              key={project.id}
              style={{
                gridColumn: `span ${project.gridColumn}`,
                gridRow: `span ${project.gridRow ?? 1}`,
              }}
              className={minHeight}
            >
              {/* Label + badge row (for non-featured) */}
              {project.type !== 'featured' && (
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="section-label block mb-1">{project.label}</span>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {Array.isArray(project.title) ? project.title.join(' ') : project.title}
                    </h3>
                  </div>
                  {project.type !== 'platform' && <ProjectBadge badge={project.badge} />}
                </div>
              )}
              <div className={project.type !== 'featured' ? 'h-[calc(100%-60px)]' : 'h-full'}>
                <ProjectCard project={project} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 900px) {
          #projects-bento > div {
            grid-column: span 12 !important;
            grid-row: span 1 !important;
          }
        }
      `}</style>
    </section>
  )
}
