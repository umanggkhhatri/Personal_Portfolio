import { useState } from 'react'
import contact from '../data/contact.json'

export default function ContactTerminal() {
  const [values, setValues] = useState({ name: '', email: '', project: '', message: '' })
  const [focused, setFocused] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
    }, 1200)
  }

  const inputClass = id =>
    `w-full bg-background font-sans text-sm text-foreground outline-none py-3 px-4 rounded-xl transition-all border ${
      focused === id
        ? 'border-accent shadow-glow'
        : 'border-border hover:border-accent/30'
    }`

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label mb-4">{contact.label}</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
            {contact.headline[0]}{' '}
            <span className="gradient-text">{contact.headline[1]}</span>
          </h2>
          <p className="font-sans text-base text-muted mt-4">{contact.subtitle}</p>
          <a
            href={`mailto:${contact.email}`}
            className="inline-block mt-4 font-sans text-sm font-medium text-accent hover:underline"
          >
            {contact.email}
          </a>
        </div>

        <div className="glass-panel-strong rounded-2xl p-8 md:p-10">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid md:grid-cols-3 gap-5">
                {contact.form.fields.map(field => (
                  <div key={field.id} className="flex flex-col gap-2">
                    <label className="font-mono text-xs text-muted uppercase tracking-wide" htmlFor={field.id}>
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.id === 'email' ? 'email' : 'text'}
                      placeholder={field.placeholder}
                      value={values[field.id]}
                      onChange={e => setValues(v => ({ ...v, [field.id]: e.target.value }))}
                      onFocus={() => setFocused(field.id)}
                      onBlur={() => setFocused(null)}
                      className={inputClass(field.id)}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-muted uppercase tracking-wide" htmlFor="message">
                  message
                </label>
                <textarea
                  id="message"
                  placeholder={contact.form.messagePlaceholder}
                  rows={5}
                  value={values.message}
                  onChange={e => setValues(v => ({ ...v, message: e.target.value }))}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  className={`${inputClass('message')} resize-none`}
                />
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" disabled={sending} className="btn-primary" style={{ opacity: sending ? 0.7 : 1 }}>
                  {sending ? 'Sending...' : 'Send Message →'}
                </button>
              </div>
            </form>
          ) : (
            <div className="py-12 text-center">
              <div className="text-4xl mb-4 text-accent">✓</div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-2">Message sent</h3>
              <p className="font-sans text-muted">{contact.successMessage}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
