import site from '../data/site.json'

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6 md:px-12 lg:px-16 bg-surface/30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-sans text-sm text-muted">{site.footer.copyright}</p>
        <div className="flex items-center gap-2 font-sans text-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-600 dark:text-emerald-400">Available for opportunities</span>
        </div>
        <p className="font-sans text-sm text-muted">{site.footer.tagline}</p>
      </div>
    </footer>
  )
}
