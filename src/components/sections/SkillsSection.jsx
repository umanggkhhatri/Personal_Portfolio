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
    <section id="skills" className="relative py-28 overflow-hidden">
      <div className="text-center mb-14 px-6">
        <p className="section-label mb-4">{skillsData.label}</p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold gradient-text">
          {skillsData.title}
        </h2>
        <p className="font-sans text-base text-muted mt-3">{skillsData.subtitle}</p>
      </div>

      <div className="flex flex-col gap-5 mb-20 relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <MarqueeRow items={row1} reverse={false} />
        <MarqueeRow items={row2} reverse={true} />
      </div>

      <div id="coursework" className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <p className="section-label mb-4">{courseworkData.label}</p>
        <h3 className="font-display text-2xl font-semibold text-foreground mb-8">
          {courseworkData.title}
        </h3>
        <div className="grid sm:grid-cols-2 gap-5">
          {courseworkData.courses.map(course => (
            <article key={course.code} className="surface-card rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="font-mono text-xs text-accent">{course.code}</span>
                  <h4 className="font-display text-lg font-semibold text-foreground mt-1">{course.name}</h4>
                </div>
                {course.grade && (
                  <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-accent-soft text-accent border border-border shrink-0">
                    {course.grade}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {course.topics.map(topic => (
                  <span
                    key={topic}
                    className="font-sans text-xs px-2.5 py-1 rounded-full bg-accent-soft text-muted border border-border"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
