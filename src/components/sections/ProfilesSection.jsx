import profiles from '../../data/profiles.json'
import achievements from '../../data/achievements.json'

export default function ProfilesSection() {
  return (
    <section id="profiles" className="relative py-32 px-8 md:px-20 overflow-hidden">
      <div
        className="absolute top-0 left-16 right-16 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), rgba(191,95,255,0.3), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto mb-16">
        <p className="section-label mb-4">{profiles.label}</p>
        <h2 className="font-brutal text-5xl md:text-6xl font-bold text-white">
          Coding Profiles &{' '}
          <span className="gradient-text">Achievements</span>
        </h2>
        <p className="font-mono text-sm text-white/40 mt-4">{profiles.subtitle}</p>
      </div>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
        {profiles.platforms.map(platform => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="neumorphic-card rounded-2xl p-6 group hover:border-cyan-500/20 transition-all duration-300"
            data-cursor
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-mono text-sm font-bold mb-4"
              style={{
                background: 'rgba(0,245,255,0.08)',
                border: '1px solid rgba(0,245,255,0.15)',
                color: '#00f5ff',
              }}
            >
              {platform.icon}
            </div>
            <h3 className="font-brutal text-lg font-bold text-white group-hover:text-cyan-glow transition-colors">
              {platform.name}
            </h3>
            <p className="font-mono text-xs text-cyan-glow/70 mt-1">@{platform.username}</p>
            <p className="font-mono text-xs text-white/30 mt-3 leading-relaxed">
              {platform.description}
            </p>
            <span className="inline-block mt-4 font-mono text-xs text-white/20 group-hover:text-violet-glow transition-colors">
              Visit profile →
            </span>
          </a>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <p className="section-label mb-4">{achievements.label}</p>
        <h3 className="font-brutal text-3xl font-bold text-white mb-8">{achievements.title}</h3>
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
                className="neumorphic-card rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 group"
                data-cursor={item.url ? true : undefined}
              >
                <div>
                  <h4 className="font-brutal text-lg font-semibold text-white group-hover:text-cyan-glow transition-colors">
                    {item.title}
                  </h4>
                  <p className="font-mono text-xs text-violet-glow mt-1">
                    {item.issuer} · {item.date}
                  </p>
                  <p className="font-mono text-sm text-white/40 mt-2 max-w-2xl">
                    {item.description}
                  </p>
                </div>
                {item.url && (
                  <span className="font-mono text-xs text-white/30 shrink-0">View →</span>
                )}
              </Wrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
