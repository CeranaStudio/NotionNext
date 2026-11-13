'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { testimonials } from '@/lib/content'

// 寬螢幕三張並排；放不下時變成左右滑動的輪播（自動前進、可拖、有圓點），不會上下堆疊。
export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [overflow, setOverflow] = useState(false)
  const [paused, setPaused] = useState(false)

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    setOverflow(el.scrollWidth > el.clientWidth + 4)
    const cards = Array.from(el.children) as HTMLElement[]
    const left = el.scrollLeft
    let best = 0
    cards.forEach((c, i) => {
      if (Math.abs(c.offsetLeft - el.offsetLeft - left) < Math.abs(cards[best].offsetLeft - el.offsetLeft - left)) best = i
    })
    setActive(best)
  }, [])

  const go = useCallback((i: number) => {
    const el = track.current
    if (!el) return
    const card = el.children[i] as HTMLElement | undefined
    if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    measure()
    const el = track.current
    el?.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      el?.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  useEffect(() => {
    if (!overflow || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => go((active + 1) % testimonials.length), 6000)
    return () => clearInterval(id)
  }, [overflow, paused, active, go])

  return (
    <div
      className="mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div
        ref={track}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        aria-roledescription="carousel"
        aria-label="客戶回饋"
      >
        {testimonials.map((t, i) => (
          <figure
            key={t.name}
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${testimonials.length}`}
            className="flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border border-line bg-white p-7 sm:w-[calc(50%-10px)] lg:w-[calc((100%-40px)/3)]"
          >
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

      {overflow && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => go(i)}
                aria-label={`第 ${i + 1} 則回饋`}
                aria-current={active === i}
                className={`h-2 rounded-full transition-all ${active === i ? 'w-7 bg-ink' : 'w-2 bg-line hover:bg-muted'}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {[-1, 1].map(d => (
              <button
                key={d}
                type="button"
                onClick={() => go((active + d + testimonials.length) % testimonials.length)}
                aria-label={d < 0 ? '上一則' : '下一則'}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-ink"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d={d < 0 ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
