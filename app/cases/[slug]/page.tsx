import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CTA, Eyebrow } from '@/components/ui'
import { getCaseAssets, slideByLabel } from '@/lib/caseAssets'
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
  const a = getCaseAssets(slug)
  const cover = slideByLabel(a, '封面')
  return { title: c.title, description: c.summary, openGraph: cover ? { images: [cover.src] } : undefined }
}

// 文章裡穿插的投影片頁
function SlideFigure({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="my-12 -mx-4 sm:mx-0">
      <img
        src={src}
        alt={caption}
        loading="lazy"
        width={1600}
        height={900}
        className="w-full bg-ink shadow-[0_24px_60px_-30px_rgba(22,20,15,0.55)] sm:rounded-2xl"
      />
      <figcaption className="mt-3 px-4 text-center text-sm text-muted sm:px-0">{caption}</figcaption>
    </figure>
  )
}

function SectionTitle({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <h2 className="mt-20 flex items-baseline gap-3 text-2xl font-black sm:text-3xl">
      <span className="font-display text-base font-medium text-honey-deep">{n}</span>
      {children}
    </h2>
  )
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params
  const idx = cases.findIndex(x => x.slug === slug)
  if (idx < 0) notFound()
  const c = cases[idx]
  const next = cases[(idx + 1) % cases.length]
  const a = getCaseAssets(slug)
  const before = slideByLabel(a, '以前')
  const result = slideByLabel(a, '成效')

  return (
    <>
      <section className="honeycomb relative overflow-hidden bg-ink pt-16">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-30 blur-[110px]"
          style={{ background: c.accent }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-4 pb-14 pt-14 sm:px-6 sm:pt-20">
          <Link href="/cases" className="text-sm text-white/50 hover:text-honey">
            ← 所有案例
          </Link>
          <div className="mt-8">
            <Eyebrow dark>
              {c.industry}・{c.client}
            </Eyebrow>
          </div>
          <h1 className="mt-5 text-balance text-3xl font-black leading-tight text-white sm:text-5xl">{c.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-white/65">{c.summary}</p>
          <div className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-6 border-t border-white/10 pt-8">
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
            {a.pdf && (
              <a
                href={a.pdf}
                download
                className="ml-auto rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-white transition hover:border-honey hover:text-honey"
              >
                下載案例簡報 PDF
              </a>
            )}
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24 pt-12 sm:px-6">
        {a.video && (
          <figure className="-mx-4 mb-4 sm:mx-0">
            <video
              src={a.video}
              poster={a.poster}
              controls
              playsInline
              preload="none"
              className="w-full bg-ink sm:rounded-2xl"
            />
            <figcaption className="mt-3 px-4 text-center text-sm text-muted sm:px-0">一分鐘看完這個案例</figcaption>
          </figure>
        )}

        <SectionTitle n="01">導入前的狀況</SectionTitle>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">在導入系統之前，團隊每天要面對這些事：</p>
        <ul className="mt-6 space-y-3">
          {c.challenges.map(ch => (
            <li key={ch} className="flex gap-3 leading-relaxed text-ink-soft">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-muted" aria-hidden="true" />
              {ch}
            </li>
          ))}
        </ul>
        {before && <SlideFigure src={before.src} caption="以前 → 現在：每一道工序怎麼被取代" />}

        <SectionTitle n="02">我們怎麼做</SectionTitle>
        <ol className="mt-8 space-y-8">
          {c.solutions.map((s, i) => (
            <li key={s.title} className="grid gap-4 sm:grid-cols-[48px_1fr]">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl font-display text-lg font-bold text-white"
                style={{ background: c.accent }}
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-1.5 text-lg leading-relaxed text-ink-soft">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        {a.shots.length > 0 && (
          <div className="my-14 rounded-3xl bg-paper-2 p-5 sm:p-8">
            <div className="text-sm font-bold text-muted">實際畫面</div>
            <div
              className={`mt-5 grid gap-6 ${a.shots.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} ${
                a.shots.length > 3 ? 'lg:grid-cols-3' : ''
              }`}
            >
              {a.shots.map(s => (
                <figure key={s.src} className="flex flex-col">
                  <div className="flex flex-1 items-center justify-center overflow-hidden rounded-2xl bg-white p-3 ring-1 ring-line">
                    <img src={s.src} alt={s.caption} loading="lazy" className="max-h-[440px] w-auto max-w-full object-contain" />
                  </div>
                  <figcaption className="mt-3 text-sm leading-relaxed text-ink-soft">{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        <SectionTitle n="03">帶來的改變</SectionTitle>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {c.results.map(r => (
            <li key={r} className="flex items-center gap-3 rounded-xl bg-ink p-5 font-bold text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0 text-honey" aria-hidden="true">
                <path d="M5 12l5 5L19 7" />
              </svg>
              {r}
            </li>
          ))}
        </ul>
        {result && <SlideFigure src={result.src} caption="導入之後" />}

        {a.pdf && (
          <a
            href={a.pdf}
            download
            className="group mt-16 flex items-center justify-between gap-6 rounded-2xl border border-line bg-white p-6 transition hover:border-ink/30"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-honey" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                </svg>
              </span>
              <div>
                <div className="font-bold">下載完整案例簡報（PDF）</div>
                <div className="text-sm text-muted">五頁看完導入前後與實際畫面，方便轉給團隊討論</div>
              </div>
            </div>
            <span className="text-sm font-bold transition-transform group-hover:translate-x-1">↓</span>
          </a>
        )}

        <Link
          href={`/cases/${next.slug}`}
          className="group mt-6 flex items-center justify-between gap-6 rounded-2xl border border-line bg-white p-6 transition hover:border-ink/30"
        >
          <div>
            <div className="text-xs font-bold tracking-widest text-muted">下一個案例・{next.industry}</div>
            <div className="mt-2 text-balance text-lg font-bold">{next.title}</div>
          </div>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </article>

      <CTA />
    </>
  )
}
