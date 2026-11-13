import Link from 'next/link'
import ContactForm from '@/components/ContactForm'
import { CaseCard, Eyebrow, SectionHeading } from '@/components/ui'
import { cases, faqs, hero, plans, process, services, site, team, testimonials } from '@/lib/content'

const serviceIcons: Record<string, React.ReactNode> = {
  workflow: <path d="M4 5h7v6H4zM13 13h7v6h-7zM7.5 11v4.5H13M16.5 13V8.5H11" />,
  factory: <path d="M3 20V9l5 3V9l5 3V9l5 3V4h3v16zM7 16h2M11 16h2M15 16h2" />,
  ai: <path d="M12 3l2.2 5.3L19.5 10l-5.3 2.2L12 17.5l-2.2-5.3L4.5 10l5.3-1.7zM18 16l.9 2.1L21 19l-2.1.9L18 22l-.9-2.1L15 19l2.1-.9z" />,
  edge: <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5" />
}

const industries = Array.from(new Set(cases.map(c => c.industry)))

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="honeycomb relative overflow-hidden bg-ink pt-16">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-honey/20 blur-[120px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
          <Eyebrow dark>{hero.eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-balance text-[1.95rem] font-black leading-[1.2] tracking-tight text-white sm:text-6xl">
            {hero.title[0]}
            <br />
            <span className="text-honey">{hero.title[1]}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">{hero.text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/#contact" className="rounded-full bg-honey px-7 py-3.5 font-bold text-ink transition hover:bg-white">
              預約免費諮詢
            </Link>
            <Link
              href="/cases"
              className="rounded-full border border-white/20 px-7 py-3.5 font-bold text-white transition hover:border-honey hover:text-honey"
            >
              看合作案例
            </Link>
          </div>

          <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3">
            {hero.stats.map(s => (
              <div key={s.label} className="bg-ink/80 p-6 backdrop-blur">
                <dt className="text-sm text-white/60">{s.label}</dt>
                <dd className="mt-2 font-display text-4xl font-bold text-white">{s.value}</dd>
                <dd className="mt-1 text-xs text-white/40">{s.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Industries strip */}
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-6 sm:px-6">
          <span className="text-xs font-bold tracking-widest text-muted">服務過的產業</span>
          {industries.map(i => (
            <span key={i} className="text-sm font-bold text-ink-soft">
              {i}
            </span>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="服務項目"
          title="從一個痛點開始，做到看得見的成效"
          text="不賣套裝軟體。我們先看懂你的現場流程，再決定要做系統、自動化，還是 AI。"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <article key={s.key} className="rounded-2xl border border-line bg-white p-7 transition hover:border-ink/20">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-honey">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    {serviceIcons[s.key]}
                  </svg>
                </div>
                <span className="font-display text-sm text-muted">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.text}</p>
              <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm text-ink-soft">
                {s.points.map(p => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-honey" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="合作案例"
              title="不同產業，同一個目標：少做重工"
              text="以下案例皆已上線使用，為保護客戶隱私僅標示產業。"
            />
            <Link href="/cases" className="shrink-0 text-sm font-bold text-ink underline-offset-4 hover:underline">
              全部案例 →
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((c, i) => (
              <CaseCard key={c.slug} c={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="合作流程" title="四個步驟，每一步都看得到東西" />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {process.map((p, i) => (
            <li key={p.title} className="bg-white p-7">
              <div className="font-display text-5xl font-bold text-honey">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionHeading
            dark
            center
            eyebrow="服務方案"
            title="依專案規模彈性報價"
            text="以下為起始價格，實際報價依需求訪談後提供，不另收諮詢費。"
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {plans.map(p => {
              const hot = Boolean(p.tag)
              return (
                <article
                  key={p.title}
                  className={`relative flex flex-col rounded-2xl p-8 ${
                    hot ? 'bg-honey text-ink lg:-my-4 lg:py-12' : 'bg-ink-2 text-white ring-1 ring-white/10'
                  }`}
                >
                  {p.tag && (
                    <span className="absolute right-6 top-6 rounded-full bg-ink px-3 py-1 text-xs font-bold text-honey">
                      {p.tag}
                    </span>
                  )}
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className={`mt-1 text-sm ${hot ? 'text-ink/70' : 'text-white/50'}`}>{p.header}</p>
                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className={`text-sm ${hot ? 'text-ink/70' : 'text-white/50'}`}>NT$</span>
                    <span className="text-5xl font-black">{p.price}</span>
                    <span className={`text-sm ${hot ? 'text-ink/70' : 'text-white/50'}`}>起</span>
                  </div>
                  <ul className={`mt-8 space-y-3 border-t pt-6 text-sm ${hot ? 'border-ink/15' : 'border-white/10'}`}>
                    {p.features.map(f => (
                      <li key={f} className="flex gap-2.5">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          className={`shrink-0 ${hot ? 'text-ink' : 'text-honey'}`}
                          aria-hidden="true"
                        >
                          <path d="M5 12l5 5L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-10">
                    <Link
                      href="/#contact"
                      className={`block rounded-full py-3 text-center font-bold transition ${
                        hot ? 'bg-ink text-white hover:bg-ink-2' : 'bg-white/10 text-white hover:bg-honey hover:text-ink'
                      }`}
                    >
                      立即諮詢
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="客戶回饋" title="我們的客戶怎麼說" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map(t => (
            <figure key={t.name} className="flex flex-col rounded-2xl border border-line bg-white p-7">
              <svg width="28" height="22" viewBox="0 0 28 22" className="text-honey" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M0 22V12.3C0 5.7 3.6 1.5 10.8 0l1.3 2.6C8.2 3.8 6.3 6.2 6 9.6h5.5V22zm16 0V12.3C16 5.7 19.6 1.5 26.8 0l1.2 2.6c-3.9 1.2-5.8 3.6-6 7h5.5V22z"
                />
              </svg>
              <blockquote className="mt-5 flex-1 leading-relaxed text-ink-soft">{t.text}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-bold text-honey">
                  {t.name[0]}
                </span>
                <span>
                  <span className="block font-bold">{t.name}</span>
                  <span className="block text-sm text-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="team" className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionHeading
            eyebrow="團隊"
            title="一支什麼都能接住的技術團隊"
            text="產品、軟體、SRE、物聯網、Web3——不同背景的工程師，讓我們能從現場硬體一路做到雲端 AI。"
          />
          <ul className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {team.map(m => (
              <li key={m.name} className="group">
                <div className="aspect-square overflow-hidden rounded-2xl bg-line">
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div className="mt-3 font-bold">{m.name}</div>
                <div className="text-sm text-muted">{m.role}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ + Contact */}
      <section className="mx-auto grid max-w-6xl gap-16 px-4 py-24 sm:px-6 lg:grid-cols-2">
        <div id="faq">
          <SectionHeading eyebrow="常見問題" title="開始之前，你可能想知道" />
          <div className="mt-10 divide-y divide-line border-y border-line">
            {faqs.map(f => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-bold">
                  {f.q}
                  <span className="mt-1 text-honey-deep transition-transform group-open:rotate-45" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <div id="contact">
          <SectionHeading eyebrow="聯絡我們" title="告訴我們你卡在哪裡" text={`一個工作天內回覆。也可以直接寫信到 ${site.email}。`} />
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
