'use client'

import { Children, useCallback, useEffect, useRef, useState } from 'react'

// 左右滑動的輪播：放得下就並排、放不下才滑動；自動前進、可拖、有圓點與箭頭，不會上下堆疊。
export default function Carousel({
  children,
  label,
  itemClassName = 'w-[85%] sm:w-[calc(50%-10px)] lg:w-[calc((100%-40px)/3)]',
  interval = 6000
}: {
  children: React.ReactNode
  label: string
  itemClassName?: string
  interval?: number
}) {
  const items = Children.toArray(children)
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [overflow, setOverflow] = useState(false)
  const [atEnd, setAtEnd] = useState(false)
  const [paused, setPaused] = useState(false)

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    setOverflow(el.scrollWidth > el.clientWidth + 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
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

  const next = useCallback(() => go(atEnd ? 0 : active + 1), [go, atEnd, active])
  const prev = useCallback(() => go(active === 0 ? items.length - 1 : active - 1), [go, active, items.length])

  useEffect(() => {
    if (!overflow || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(next, interval)
    return () => clearInterval(id)
  }, [overflow, paused, next, interval])

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onFocus={() => setPaused(true)}
    >
      <div
        ref={track}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-2 pt-1 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        aria-roledescription="carousel"
        aria-label={label}
      >
        {items.map((child, i) => (
          <div
            key={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${items.length}`}
            className={`shrink-0 snap-start ${itemClassName}`}
          >
            {child}
          </div>
        ))}
      </div>

      {overflow && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`第 ${i + 1} 則`}
                aria-current={active === i}
                className={`h-2 rounded-full transition-all ${active === i ? 'w-7 bg-ink' : 'w-2 bg-line hover:bg-muted'}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {[
              { label: '上一則', fn: prev, d: 'M15 6l-6 6 6 6' },
              { label: '下一則', fn: next, d: 'M9 6l6 6-6 6' }
            ].map(b => (
              <button
                key={b.label}
                type="button"
                onClick={b.fn}
                aria-label={b.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-ink"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d={b.d} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
