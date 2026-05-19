import site from '../data/site.json'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-8 md:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-mono text-xs text-white/20">
          {site.footer.copyright} · Neumorphic-Cyber
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400/60">All systems operational</span>
        </div>
        <div className="font-mono text-xs text-white/20">
          {site.footer.tagline}
        </div>
      </div>
    </footer>
  )
}
