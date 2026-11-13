'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

// 首頁 hero：淺色、編輯風。大字標題裡的「舊工具」輪流出現又被劃掉，換成「好用的系統」。
const olds = ['Excel', '紙本表單', 'LINE 群組', '手抄紀錄', '老師傅的經驗']

export default function Hero() {
  const [i, setI] = useState(0)
  const [struck, setStruck] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStruck(true)
      return
    }
    setStruck(false)
    const a = setTimeout(() => setStruck(true), 900)
    const b = setTimeout(() => setI(v => (v + 1) % olds.length), 2600)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [i])

  return (
    <section className="relative overflow-hidden border-b border-line bg-paper pt-16">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28">
        <h1 className="text-[2.3rem] font-black leading-[1.15] tracking-tight text-ink sm:text-7xl">
          把
          <span className="relative mx-2 inline-block text-muted">
            <span key={i} className="inline-block animate-[fadeUp_.5s_ease-out]">
              {olds[i]}
            </span>
            <span
              className="absolute left-0 top-[55%] h-[0.12em] rounded-full bg-honey transition-all duration-500 ease-out"
              style={{ width: struck ? '100%' : '0%' }}
              aria-hidden="true"
            />
          </span>
          <br />
          換成
          <span className="relative mx-2 inline-block">
            <span className="absolute inset-x-[-0.1em] bottom-[0.08em] h-[0.42em] -skew-x-6 bg-honey/70" aria-hidden="true" />
            <span className="relative">真的好用的系統</span>
          </span>
        </h1>

        <div className="mt-12 grid gap-10 border-t border-line pt-10 md:grid-cols-[1.3fr_1fr]">
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
            東蜂科技為中小企業、學校與醫療院所打造客製化系統與 AI 工具。先做 POC 試給你看，有效再往下走。
          </p>
          <div className="flex flex-wrap items-start gap-3 md:justify-end">
            <Link href="/#contact" className="rounded-full bg-ink px-7 py-3.5 font-bold text-white transition hover:bg-honey hover:text-ink">
              預約免費諮詢
            </Link>
            <Link href="/cases" className="rounded-full px-7 py-3.5 font-bold text-ink ring-1 ring-ink/20 transition hover:ring-ink">
              看合作案例
            </Link>
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(.3em)}to{opacity:1;transform:none}}`}</style>
    </section>
  )
}
