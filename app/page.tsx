import Link from 'next/link'
import Carousel from '@/components/Carousel'
import ContactForm from '@/components/ContactForm'
import ServiceArt from '@/components/ServiceArt'
import Testimonials from '@/components/Testimonials'
import { CaseCard, Eyebrow, SectionHeading } from '@/components/ui'
import { cases, faqs, hero, plans, process, services, site, team } from '@/lib/content'

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
        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28">
          <Eyebrow dark>{hero.eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-balance text-[1.95rem] font-black leading-[1.2] tracking-tight text-white sm:text-6xl">
            {hero.title[0]}
            <br />
            <span className="text-honey">{hero.title[1]}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">{hero.text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/#contact"
              className="rounded-full bg-honey px-7 py-3.5 font-bold text-ink transition hover:bg-white"
            >
              預約免費諮詢
            </Link>
            <Link
              href="/cases"
              className="rounded-full border border-white/20 px-7 py-3.5 font-bold text-white transition hover:border-honey hover:text-honey"
            >
              看合作案例
            </Link>
          </div>
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
            <article
              key={s.key}
              className="overflow-hidden rounded-2xl border border-line bg-white transition hover:border-ink/20"
            >
              <div className="border-b border-line p-3">
                <ServiceArt name={s.key} />
              </div>
              <div className="p-7 pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <span className="font-display text-sm text-muted">0{i + 1}</span>
                </div>
                <p className="mt-2 leading-relaxed text-ink-soft">{s.text}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm text-ink-soft">
                  {s.points.map(p => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-honey" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
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
            <Link
              href="/cases"
              className="shrink-0 self-start rounded-full border border-ink/20 px-5 py-2.5 md:self-auto text-sm font-bold text-ink transition hover:border-ink hover:bg-ink hover:text-white"
            >
              看更多案例 →
            </Link>
          </div>
          <div className="mt-12">
            <Carousel label="合作案例" interval={5000}>
              {cases.map((c, i) => (
                <CaseCard key={c.slug} c={c} index={i} />
              ))}
            </Carousel>
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
            title="兩種方案，起價清楚"
            text="依專案有沒有硬體分成兩種。以下為起始價格，正式報價於需求訪談後提供，諮詢不收費。"
          />
          <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
            {plans.map(p => {
              const hot = Boolean(p.tag)
              return (
                <article
                  key={p.title}
                  className={`relative flex flex-col rounded-2xl p-8 ${
                    hot ? 'bg-honey text-ink' : 'bg-ink-2 text-white ring-1 ring-white/10'
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
                        hot
                          ? 'bg-ink text-white hover:bg-ink-2'
                          : 'bg-white/10 text-white hover:bg-honey hover:text-ink'
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
        <Testimonials />
      </section>

      {/* Team */}
      <section id="team" className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionHeading
            eyebrow="團隊"
            title="一支什麼都能接住的技術團隊"
            text="成員來自政大、交大、台大，待過 LINE、Google、NVIDIA、台積電、研華與 SoC Labs，從現場硬體一路做到雲端 AI。"
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
                <div className="mt-1 text-sm leading-relaxed text-muted">{m.bio}</div>
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
          <SectionHeading
            eyebrow="聯絡我們"
            title="告訴我們你卡在哪裡"
            text={`一個工作天內回覆。也可以直接寫信到 ${site.email}。`}
          />
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
