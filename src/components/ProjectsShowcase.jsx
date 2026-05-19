import projectsData from '../data/projects.json'

const BADGE_STYLES = {
  cyan: {
    background: 'rgba(0,245,255,0.08)',
    border: '1px solid rgba(0,245,255,0.2)',
    color: '#00f5ff',
  },
  violet: {
    background: 'rgba(191,95,255,0.08)',
    border: '1px solid rgba(191,95,255,0.2)',
    color: '#bf5fff',
  },
  green: {
    background: 'rgba(100,255,100,0.08)',
    border: '1px solid rgba(100,255,100,0.2)',
    color: '#00ff88',
  },
}

function ProjectBadge({ badge }) {
  if (!badge) return null
  const style = BADGE_STYLES[badge.variant] || BADGE_STYLES.cyan
  return (
    <span
      className="font-mono text-xs px-3 py-1 rounded-full"
      style={style}
    >
      {badge.text}
    </span>
  )
}

function TerminalCard({ terminal }) {
  return (
    <div className="terminal-card h-full scanline-container group">
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-green-500" />
        <span className="font-mono text-xs text-white/30 ml-2">{terminal.filename}</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs text-green-400">{terminal.status}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-1.5 font-mono text-sm flex-1">
        {terminal.lines.map((line, i) => (
          <div
            key={i}
            className="flex gap-3 opacity-0"
            style={{ animation: `fadeInUp 0.4s ease forwards ${i * 0.12}s` }}
          >
            <span style={{ color: line.color, minWidth: '14px' }}>{line.prefix}</span>
            <span className="text-white/70 group-hover:text-white/90 transition-colors">
              {line.text}
            </span>
          </div>
        ))}
        <div className="flex gap-3 mt-2">
          <span className="text-cyan-glow">$</span>
          <span className="text-white/40">
            <span className="blink">█</span>
          </span>
        </div>
      </div>

      <div className="border-t border-cyan-500/10 p-4 grid grid-cols-3 gap-4">
        {terminal.stats.map(stat => (
          <div key={stat.label} className="text-center">
            <div className="font-mono text-lg font-bold text-cyan-glow">{stat.value}</div>
            <div className="font-mono text-xs text-white/30">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GlassCard({ glass }) {
  return (
    <div
      className="glass h-full rounded-2xl overflow-hidden group relative"
      style={{ border: '1px solid rgba(0,245,255,0.08)' }}
    >
      <div className="flex items-center justify-between p-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400/20 to-violet-500/20 flex items-center justify-center text-sm">
            {glass.icon}
          </div>
          <div>
            <div className="font-brutal text-sm font-semibold text-white">{glass.name}</div>
            <div className="font-mono text-xs text-white/30">{glass.subtitle}</div>
          </div>
        </div>
        <div className="flex gap-1.5">
          {glass.tabs.map(t => (
            <span key={t} className="font-mono text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-3">
          {glass.metrics.map(item => (
            <div
              key={item.label}
              className="rounded-xl p-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="font-mono text-xs text-white/30 mb-1">{item.label}</div>
              <div className="font-brutal text-xl font-bold" style={{ color: item.color }}>
                {item.value}
              </div>
              <div className="font-mono text-xs mt-1" style={{ color: item.color }}>
                {item.trend} today
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-xl p-3"
          style={{ background: 'rgba(0,245,255,0.03)', border: '1px solid rgba(0,245,255,0.06)' }}
        >
          <div className="font-mono text-xs text-white/30 mb-2">{glass.chartLabel}</div>
          <svg viewBox="0 0 200 40" className="w-full h-10 overflow-visible">
            <polyline
              points="0,20 20,20 30,5 40,35 50,20 70,20 80,10 90,30 100,20 130,20 140,8 150,32 160,20 200,20"
              fill="none"
              stroke="#00f5ff"
              strokeWidth="1.5"
              className="drop-shadow-[0_0_4px_#00f5ff]"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

function CppCard({ cpp }) {
  return (
    <div className="neumorphic-card rounded-2xl h-full overflow-hidden group" style={{ background: '#050a0f' }}>
      <div className="flex items-center gap-2 p-4 border-b border-white/5">
        <div className="terminal-dot bg-red-500" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-green-500" />
        <span className="font-mono text-xs text-white/20 ml-1">{cpp.filename}</span>
        <div className="ml-auto flex items-center gap-3">
          <span className="font-mono text-xs px-2 py-0.5 rounded bg-violet-500/15 text-violet-400">
            {cpp.language}
          </span>
          <span className="font-mono text-xs text-white/20">{cpp.latency}</span>
        </div>
      </div>

      <div className="p-5 font-mono text-xs leading-relaxed overflow-hidden">
        {cpp.code.split('\n').map((line, i) => (
          <div key={i} className="flex gap-4 group/line hover:bg-white/2 px-1 rounded transition-colors">
            <span className="text-white/15 select-none w-4 text-right flex-shrink-0">{i + 1}</span>
            <span
              className="text-white/60"
              dangerouslySetInnerHTML={{
                __html: line
                  .replace(/\/\/.*/g, m => `<span style="color:#5a6a8a">${m}</span>`)
                  .replace(
                    /\b(template|auto|class|return|if|noexcept|include)\b/g,
                    m => `<span style="color:#bf5fff">${m}</span>`,
                  )
                  .replace(
                    /\b(Order|OrderBook|AlgoExecutor|Signal|FIFO)\b/g,
                    m => `<span style="color:#00f5ff">${m}</span>`,
                  )
                  .replace(/"[^"]*"/g, m => `<span style="color:#00ff88">${m}</span>`)
                  .replace(/#\w+/g, m => `<span style="color:#ff9800">${m}</span>`),
              }}
            />
          </div>
        ))}
      </div>

      <div className="border-t border-white/5 p-4 grid grid-cols-3 gap-3">
        {cpp.stats.map(stat => (
          <div key={stat.label} className="text-center">
            <div className="font-mono text-base font-bold" style={{ color: '#bf5fff' }}>
              {stat.value}
            </div>
            <div className="font-mono text-xs text-white/25">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FeaturedCard({ project }) {
  const titleLines = Array.isArray(project.title) ? project.title : [project.title]

  return (
    <div className="neumorphic-card rounded-2xl overflow-hidden group relative h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5" />
      <div className="relative p-8 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="section-label mb-2 block">{project.label}</span>
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
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.15)' }}
            >
              {project.icon}
            </div>
          </div>
          <p className="text-white/50 font-mono text-sm leading-relaxed max-w-sm">
            {project.description}
          </p>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap gap-2 mb-6">
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
          <div className="flex gap-3">
            {project.links?.demo && (
              <a href={project.links.demo} className="cyber-btn text-xs py-2.5 px-5">
                View Project →
              </a>
            )}
            {project.links?.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs px-5 py-2.5 rounded text-white/40 hover:text-white/70 transition-colors"
              >
                GitHub ↗
              </a>
            )}
            {!project.links?.demo && !project.links?.repo && (
              <>
                <button type="button" className="cyber-btn text-xs py-2.5 px-5">
                  View Project →
                </button>
                <button
                  type="button"
                  className="font-mono text-xs px-5 py-2.5 rounded text-white/40 hover:text-white/70 transition-colors"
                >
                  GitHub ↗
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }) {
  switch (project.type) {
    case 'terminal':
      return <TerminalCard terminal={project.terminal} />
    case 'glass':
      return <GlassCard glass={project.glass} />
    case 'cpp':
      return <CppCard cpp={project.cpp} />
    case 'featured':
      return <FeaturedCard project={project} />
    default:
      return null
  }
}

export default function ProjectsShowcase() {
  const { label, title, subtitle, projects } = projectsData

  return (
    <section id="projects" className="relative py-32 px-6 md:px-16">
      <div className="mb-20">
        <p className="section-label mb-4">{label}</p>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2 className="font-brutal text-5xl md:text-7xl font-bold leading-none">
            <span className="text-white">{title[0]}</span>
            <br />
            <span className="gradient-text">{title[1]}</span>
          </h2>
          <p className="font-mono text-sm text-white/30 max-w-xs">{subtitle}</p>
        </div>
      </div>

      <div
        id="projects-bento"
        className="grid gap-5"
        style={{ gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'auto' }}
      >
        {projects.map(project => {
          const isFeatured = project.type === 'featured'
          const minHeight = project.gridRow > 1 ? 'min-h-[480px]' : 'min-h-[360px]'

          return (
            <div
              key={project.id}
              style={{ gridColumn: `span ${project.gridColumn}`, gridRow: `span ${project.gridRow}` }}
              className={minHeight}
            >
              {isFeatured ? (
                <FeaturedCard project={project} />
              ) : (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="section-label block mb-1">{project.label}</span>
                      <h3 className="font-brutal text-2xl font-bold text-white">{project.title}</h3>
                    </div>
                    <ProjectBadge badge={project.badge} />
                  </div>
                  <div className="flex-1">
                    <ProjectCard project={project} />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

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
