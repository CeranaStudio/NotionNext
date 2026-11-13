import type { Metadata } from 'next'
import { CaseCard, CTA, Eyebrow } from '@/components/ui'
import { cases } from '@/lib/content'

export const metadata: Metadata = {
  title: '合作案例',
  description: '製造業、大學、醫療院所、補習班與國中的數位轉型與 AI 導入案例。'
}

export default function CasesPage() {
  return (
    <>
      <section className="honeycomb bg-ink pt-16">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <Eyebrow dark>合作案例</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-black leading-tight text-white sm:text-5xl">
            已經在現場運作的系統
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/60">
            每個案例都從一個具體的痛點開始。為保護客戶隱私，以下僅標示產業與規模。
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <CaseCard key={c.slug} c={c} index={i} />
          ))}
        </div>
      </section>
      <CTA />
    </>
  )
}
