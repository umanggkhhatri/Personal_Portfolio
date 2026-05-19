import education from '../../data/education.json'
import SectionAccent3D from '../three/SectionAccent3D.jsx'

export default function EducationSection() {
  return (
    <section id="education" className="relative py-28 px-6 md:px-12 lg:px-16 overflow-hidden">
      <SectionAccent3D className="top-10 -right-20 md:right-10" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="section-divider mb-16 max-w-md" />
        <p className="section-label mb-4">{education.label}</p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-3">
          {education.title}
        </h2>
        <p className="font-sans text-base text-muted mb-12 max-w-xl">{education.subtitle}</p>

        <div className="flex flex-col gap-6">
          {education.entries.map((entry, index) => (
            <article key={`${entry.institution}-${index}`} className="surface-card rounded-2xl p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-foreground">
                    {entry.institution}
                  </h3>
                  <p className="font-sans text-sm text-accent font-medium mt-1">{entry.degree}</p>
                </div>
                <div className="font-sans text-sm text-muted md:text-right">
                  <p>{entry.period}</p>
                  <p className="mt-1">{entry.location}</p>
                  {entry.gpa && <p className="mt-2 text-accent font-medium">GPA: {entry.gpa}</p>}
                </div>
              </div>
              {entry.highlights?.length > 0 && (
                <ul className="space-y-2">
                  {entry.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 font-sans text-sm text-muted">
                      <span className="text-accent mt-0.5">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
