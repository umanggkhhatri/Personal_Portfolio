import { useEffect, useRef, useState } from 'react'

const TECH_STACK = [
  { name: 'React', icon: '⚛', color: '#61dafb' },
  { name: 'TypeScript', icon: 'TS', color: '#3178c6' },
  { name: 'Next.js', icon: '▲', color: '#e8eaed' },
  { name: 'Tailwind CSS', icon: '🎨', color: '#38bdf8' },
  { name: 'Node.js', icon: '⬢', color: '#68a063' },
  { name: 'Python', icon: '🐍', color: '#ffd43b' },
  { name: 'Firebase', icon: '🔥', color: '#ff9800' },
  { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
  { name: 'C++', icon: '⚙', color: '#00599c' },
  { name: 'Docker', icon: '🐳', color: '#2496ed' },
  { name: 'GraphQL', icon: '◆', color: '#e535ab' },
  { name: 'Redis', icon: '●', color: '#dc382d' },
  { name: 'Rust', icon: '🦀', color: '#f74c00' },
  { name: 'Three.js', icon: '△', color: '#00f5ff' },
  { name: 'LangChain', icon: '⛓', color: '#bf5fff' },
  { name: 'AWS', icon: '☁', color: '#ff9900' },
]

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

export default function TechOrbit() {
  const row1 = TECH_STACK.slice(0, 8)
  const row2 = TECH_STACK.slice(8, 16)

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Section label */}
      <div className="text-center mb-16 px-8">
        <p className="section-label mb-4">// tech_stack.config</p>
        <h2 className="font-brutal text-5xl md:text-6xl font-bold gradient-text">
          Arsenal
        </h2>
        <p className="font-mono text-sm text-white/40 mt-4">
          const stack = {'{'} frontend, backend, ai, systems {'}'};
        </p>
      </div>

      {/* Marquee rows */}
      <div className="flex flex-col gap-5">
        <MarqueeRow items={row1} reverse={false} />
        <MarqueeRow items={row2} reverse={true} />
      </div>

      {/* Gradient fades on sides */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-obsidian-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-obsidian-950 to-transparent z-10" />

      {/* Decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-cyan-glow/40 to-transparent" />
    </section>
  )
}
