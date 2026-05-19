import profiles from '../../data/profiles.json'
import achievements from '../../data/achievements.json'
import SectionAccent3D from '../three/SectionAccent3D.jsx'

export default function ProfilesSection() {
  return (
    <section id="profiles" className="relative py-28 px-6 md:px-12 lg:px-16 overflow-hidden bg-surface/50">
      <SectionAccent3D className="bottom-10 -left-16 md:left-10" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <p className="section-label mb-4">{profiles.label}</p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-3">
          Coding Profiles & <span className="gradient-text">Achievements</span>
        </h2>
        <p className="font-sans text-base text-muted mb-12 max-w-xl">{profiles.subtitle}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {profiles.platforms.map(platform => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card rounded-2xl p-6 group"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-semibold font-mono bg-accent-soft text-accent border border-border mb-4">
                {platform.icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                {platform.name}
              </h3>
              <p className="font-mono text-xs text-accent mt-1">@{platform.username}</p>
              <p className="font-sans text-sm text-muted mt-3 leading-relaxed">{platform.description}</p>
              <span className="inline-block mt-4 font-sans text-sm text-muted group-hover:text-accent transition-colors">
                Visit profile →
              </span>
            </a>
          ))}
        </div>

        <p className="section-label mb-4">{achievements.label}</p>
        <h3 className="font-display text-2xl font-semibold text-foreground mb-6">{achievements.title}</h3>
        <div className="flex flex-col gap-4">
          {achievements.items.map((item, index) => {
            const Wrapper = item.url ? 'a' : 'div'
            const wrapperProps = item.url
              ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
              : {}

            return (
              <Wrapper
                key={`${item.title}-${index}`}
                {...wrapperProps}
                className="surface-card rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 group"
              >
                <div>
                  <h4 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {item.title}
                  </h4>
                  <p className="font-sans text-sm text-accent mt-1">
                    {item.issuer} · {item.date}
                  </p>
                  <p className="font-sans text-sm text-muted mt-2 max-w-2xl">{item.description}</p>
                </div>
                {item.url && <span className="font-sans text-sm text-muted shrink-0">View →</span>}
              </Wrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
