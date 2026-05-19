import education from '../../data/education.json'

export default function EducationSection() {
  return (
    <section id="education" className="relative py-32 px-8 md:px-20 overflow-hidden">
      <div
        className="absolute top-0 left-16 right-16 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), rgba(191,95,255,0.3), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto mb-16">
        <p className="section-label mb-4">{education.label}</p>
        <h2 className="font-brutal text-5xl md:text-6xl font-bold gradient-text">
          {education.title}
        </h2>
        <p className="font-mono text-sm text-white/40 mt-4">{education.subtitle}</p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {education.entries.map((entry, index) => (
          <article
            key={`${entry.institution}-${index}`}
            className="neumorphic-card rounded-2xl p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h3 className="font-brutal text-2xl md:text-3xl font-bold text-white">
                  {entry.institution}
                </h3>
                <p className="font-mono text-sm text-cyan-glow mt-1">{entry.degree}</p>
              </div>
              <div className="font-mono text-xs text-white/40 md:text-right">
                <p>{entry.period}</p>
                <p className="mt-1">{entry.location}</p>
                {entry.gpa && (
                  <p className="mt-2 text-violet-glow">GPA: {entry.gpa}</p>
                )}
              </div>
            </div>

            {entry.highlights?.length > 0 && (
              <ul className="space-y-2">
                {entry.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 font-mono text-sm text-white/50"
                  >
                    <span className="text-cyan-glow mt-0.5">▸</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
