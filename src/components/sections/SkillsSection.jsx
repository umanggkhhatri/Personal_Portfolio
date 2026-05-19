import skillsData from '../../data/skills.json'
import courseworkData from '../../data/coursework.json'

function TechBadge({ tech }) {
  return (
    <div className="tech-badge" style={{ '--badge-color': tech.color }}>
      <span style={{ color: tech.color, fontSize: '1rem' }}>{tech.icon}</span>
      <span>{tech.name}</span>
    </div>
  )
}

function MarqueeRow({ items, reverse }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden">
      <div
        className={`marquee-track ${reverse ? 'marquee-track-reverse' : ''}`}
        style={{ gap: '16px' }}
      >
        {doubled.map((tech, i) => (
          <TechBadge key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const items = skillsData.items
  const midpoint = Math.ceil(items.length / 2)
  const row1 = items.slice(0, midpoint)
  const row2 = items.slice(midpoint)

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="text-center mb-16 px-8">
        <p className="section-label mb-4">{skillsData.label}</p>
        <h2 className="font-brutal text-5xl md:text-6xl font-bold gradient-text">
          {skillsData.title}
        </h2>
        <p className="font-mono text-sm text-white/40 mt-4">{skillsData.subtitle}</p>
      </div>

      <div className="flex flex-col gap-5 mb-24">
        <MarqueeRow items={row1} reverse={false} />
        <MarqueeRow items={row2} reverse={true} />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-obsidian-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-obsidian-950 to-transparent z-10" />

      <div id="coursework" className="max-w-6xl mx-auto px-8 md:px-20 relative z-20">
        <p className="section-label mb-4">{courseworkData.label}</p>
        <h3 className="font-brutal text-3xl font-bold text-white mb-8">
          {courseworkData.title}
        </h3>
        <div className="grid sm:grid-cols-2 gap-5">
          {courseworkData.courses.map(course => (
            <article key={course.code} className="neumorphic-card rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="font-mono text-xs text-cyan-glow">{course.code}</span>
                  <h4 className="font-brutal text-lg font-semibold text-white mt-1">
                    {course.name}
                  </h4>
                </div>
                {course.grade && (
                  <span
                    className="font-mono text-xs px-2.5 py-1 rounded-full shrink-0"
                    style={{
                      background: 'rgba(0,245,255,0.06)',
                      border: '1px solid rgba(0,245,255,0.12)',
                      color: '#00f5ff',
                    }}
                  >
                    {course.grade}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {course.topics.map(topic => (
                  <span
                    key={topic}
                    className="font-mono text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-cyan-glow/40 to-transparent" />
    </section>
  )
}
