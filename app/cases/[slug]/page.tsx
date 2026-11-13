import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CTA, Eyebrow } from '@/components/ui'
import { cases } from '@/lib/content'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return cases.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = cases.find(x => x.slug === slug)
  if (!c) return {}
  return { title: c.title, description: c.summary }
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params
  const idx = cases.findIndex(x => x.slug === slug)
  if (idx < 0) notFound()
  const c = cases[idx]
  const next = cases[(idx + 1) % cases.length]

  return (
    <>
      <section className="honeycomb relative overflow-hidden bg-ink pt-16">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-30 blur-[110px]"
          style={{ background: c.accent }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
          <Link href="/cases" className="text-sm text-white/50 hover:text-honey">
            ← 所有案例
          </Link>
          <div className="mt-8">
            <Eyebrow dark>
              {c.industry}・{c.client}
            </Eyebrow>
          </div>
          <h1 className="mt-5 max-w-4xl text-balance text-3xl font-black leading-tight text-white sm:text-5xl">
            {c.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">{c.summary}</p>
          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-8">
            <div>
              <div className="text-xs tracking-widest text-white/40">導入成果</div>
              <div className="mt-1 font-bold text-white">{c.product}</div>
            </div>
            {c.metric && (
              <div>
                <div className="text-xs tracking-widest text-white/40">{c.metric.label}</div>
                <div className="mt-1 font-display text-3xl font-bold text-honey">{c.metric.value}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          <h2 className="text-2xl font-black">
            <span className="block font-display text-sm font-medium text-honey-deep">01</span>
            導入前的狀況
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {c.challenges.map(ch => (
              <li key={ch} className="flex gap-3 rounded-xl border border-line bg-white p-5 leading-relaxed text-ink-soft">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-paper-2 text-xs font-bold text-muted"
                  aria-hidden="true"
                >
                  ✕
                </span>
                {ch}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[280px_1fr]">
          <h2 className="text-2xl font-black">
            <span className="block font-display text-sm font-medium text-honey-deep">02</span>
            我們怎麼做
          </h2>
          <ol className="space-y-4">
            {c.solutions.map((s, i) => (
              <li key={s.title} className="grid gap-4 rounded-2xl border border-line bg-white p-6 sm:grid-cols-[56px_1fr]">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl font-display text-lg font-bold text-white"
                  style={{ background: c.accent }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[280px_1fr]">
          <h2 className="text-2xl font-black">
            <span className="block font-display text-sm font-medium text-honey-deep">03</span>
            帶來的改變
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {c.results.map(r => (
              <li key={r} className="flex items-center gap-3 rounded-xl bg-ink p-5 font-bold text-white">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="shrink-0 text-honey"
                  aria-hidden="true"
                >
                  <path d="M5 12l5 5L19 7" />
                </svg>
                {r}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={`/cases/${next.slug}`}
          className="group mt-24 flex items-center justify-between gap-6 rounded-2xl border border-line bg-white p-7 transition hover:border-ink/30"
        >
          <div>
            <div className="text-xs font-bold tracking-widest text-muted">下一個案例・{next.industry}</div>
            <div className="mt-2 text-balance text-lg font-bold">{next.title}</div>
          </div>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="shrink-0 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </article>

      <CTA />
    </>
  )
}
