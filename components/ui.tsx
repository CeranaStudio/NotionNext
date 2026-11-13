import Link from 'next/link'
import type { CaseStudy } from '@/lib/content'

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-sm font-medium ${dark ? 'text-white/55' : 'text-muted'}`}>
      <span className={`h-px w-8 ${dark ? 'bg-honey' : 'bg-honey-deep'}`} aria-hidden="true" />
      {children}
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
  center = false
}: {
  eyebrow: string
  title: React.ReactNode
  text?: string
  dark?: boolean
  center?: boolean
}) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-4 text-balance text-3xl font-black leading-tight tracking-tight sm:text-4xl ${dark ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </h2>
      {text && <p className={`mt-4 text-base leading-relaxed ${dark ? 'text-white/60' : 'text-ink-soft'}`}>{text}</p>}
    </div>
  )
}

export function CaseCard({ c, index }: { c: CaseStudy; index: number }) {
  return (
    <Link
      href={`/cases/${c.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_20px_40px_-20px_rgba(22,20,15,0.25)] sm:p-7"
    >
      <span className="absolute inset-x-0 top-0 h-1" style={{ background: c.accent }} aria-hidden="true" />
      <div className="flex items-center justify-between text-xs">
        <span className="rounded-full px-2.5 py-1 font-bold" style={{ background: `${c.accent}1a`, color: c.accent }}>
          {c.industry}
        </span>
        <span className="font-display text-muted">CASE {String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="mt-5 text-balance text-lg font-bold leading-snug text-ink">{c.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.summary}</p>
      <div className="mt-auto pt-6">
        {c.metric ? (
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-ink">{c.metric.value}</span>
            <span className="text-sm text-muted">{c.metric.label}</span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {c.results.slice(0, 3).map(r => (
              <span key={r} className="rounded-md bg-paper-2 px-2 py-1 text-xs text-ink-soft">
                {r}
              </span>
            ))}
          </div>
        )}
        <div className="mt-5 flex items-center gap-1.5 text-sm font-bold text-ink">
          看案例
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className="transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export function CTA() {
  return (
    <section className="honeycomb bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 py-20 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-balance text-3xl font-black leading-tight text-white sm:text-4xl">
            心動不如行動，<span className="text-honey">先聊聊你的流程</span>
          </h2>
          <p className="mt-3 text-white/60">第一次諮詢免費。想法不完整也沒關係，我們幫你找出最值得先做的那一步。</p>
        </div>
        <Link
          href="/#contact"
          className="shrink-0 rounded-full bg-honey px-7 py-3.5 font-bold text-ink transition hover:bg-white"
        >
          預約免費諮詢
        </Link>
      </div>
    </section>
  )
}
