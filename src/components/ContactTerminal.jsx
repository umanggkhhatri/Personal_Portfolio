import { useState, useRef } from 'react'

const FIELDS = [
  { id: 'name', label: 'name', placeholder: 'your_name' },
  { id: 'email', label: 'email', placeholder: 'your@email.dev' },
  { id: 'project', label: 'project_type', placeholder: 'web_app | ai_automation | systems' },
]

export default function ContactTerminal() {
  const [values, setValues] = useState({ name: '', email: '', project: '', message: '' })
  const [focused, setFocused] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [lines, setLines] = useState([
    { text: 'Secure channel established.', color: '#00f5ff' },
    { text: 'Awaiting input...', color: '#7b8fff' },
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setLines(prev => [
      ...prev,
      { text: `> Routing message from ${values.name || 'anonymous'}...`, color: '#00f5ff' },
    ])
    setTimeout(() => {
      setLines(prev => [
        ...prev,
        { text: '✓ Encrypted. Transmitted. Acknowledged.', color: '#00ff88' },
      ])
      setSending(false)
      setSubmitted(true)
    }, 1800)
  }

  return (
    <section id="contact" className="relative py-32 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="section-label mb-4">// establish_connection</p>
          <h2 className="font-brutal text-5xl md:text-6xl font-bold text-white">
            Let's{' '}
            <span className="gradient-text">Build</span>
          </h2>
          <p className="font-mono text-sm text-white/30 mt-4">
            Open to high-impact roles & collaboration opportunities.
          </p>
        </div>

        {/* Frosted terminal window */}
        <div className="glass-strong rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(0,245,255,0.1)' }}>
          {/* Title bar */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5"
            style={{ background: 'rgba(0,245,255,0.03)' }}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 text-center font-mono text-xs text-white/20">
              contact_protocol.sh — encrypted channel
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-xs text-green-400">SECURE</span>
            </div>
          </div>

          {/* Log output */}
          <div className="px-6 py-4 border-b border-white/5 font-mono text-xs">
            {lines.map((line, i) => (
              <div key={i} style={{ color: line.color }} className="flex items-center gap-2">
                <span className="text-white/20">[{String(i).padStart(2, '0')}]</span>
                {line.text}
              </div>
            ))}
          </div>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
              <div className="grid md:grid-cols-3 gap-5">
                {FIELDS.map(field => (
                  <div key={field.id} className="flex flex-col gap-2">
                    <label className="font-mono text-xs text-white/30">
                      <span className="text-cyan-glow">$</span> {field.label}
                    </label>
                    <input
                      id={field.id}
                      type="text"
                      placeholder={field.placeholder}
                      value={values[field.id]}
                      onChange={e => setValues(v => ({ ...v, [field.id]: e.target.value }))}
                      onFocus={() => setFocused(field.id)}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-transparent font-mono text-sm text-white/80 outline-none py-3 px-4 rounded-lg transition-all duration-200"
                      style={{
                        border: `1px solid ${focused === field.id ? 'rgba(0,245,255,0.4)' : 'rgba(255,255,255,0.06)'}`,
                        background: focused === field.id ? 'rgba(0,245,255,0.03)' : 'rgba(255,255,255,0.02)',
                        boxShadow: focused === field.id ? '0 0 20px rgba(0,245,255,0.08)' : 'none',
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-white/30">
                  <span className="text-cyan-glow">$</span> message
                </label>
                <textarea
                  id="message"
                  placeholder="Describe your project or opportunity..."
                  rows={5}
                  value={values.message}
                  onChange={e => setValues(v => ({ ...v, message: e.target.value }))}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent font-mono text-sm text-white/80 outline-none py-3 px-4 rounded-lg transition-all duration-200 resize-none"
                  style={{
                    border: `1px solid ${focused === 'message' ? 'rgba(0,245,255,0.4)' : 'rgba(255,255,255,0.06)'}`,
                    background: focused === 'message' ? 'rgba(0,245,255,0.03)' : 'rgba(255,255,255,0.02)',
                    boxShadow: focused === 'message' ? '0 0 20px rgba(0,245,255,0.08)' : 'none',
                  }}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-mono text-xs text-white/20">
                  {'>>'} End-to-end encrypted via TLS 1.3
                </span>
                <button
                  type="submit"
                  disabled={sending}
                  className="cyber-btn"
                  style={{ opacity: sending ? 0.6 : 1 }}
                >
                  {sending ? 'Transmitting...' : 'Send Message →'}
                </button>
              </div>
            </form>
          ) : (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="font-brutal text-2xl font-bold text-cyan-glow mb-2">Transmission Received</h3>
              <p className="font-mono text-sm text-white/40">I'll get back to you within 24 hours.</p>
            </div>
          )}
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-8 mt-12">
          {[
            { label: 'GitHub', icon: '⌥', href: '#' },
            { label: 'LinkedIn', icon: '◈', href: '#' },
            { label: 'Twitter', icon: '◉', href: '#' },
            { label: 'Email', icon: '◎', href: 'mailto:hello@dev.io' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 font-mono text-sm text-white/30 hover:text-cyan-glow transition-colors duration-200"
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
