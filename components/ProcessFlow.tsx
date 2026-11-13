'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { workflowSteps } from '@/lib/content'

// 合作流程圖：左側一條線，往下滾動時被填滿，走到哪一步就點亮哪一步；簽約點畫成線上的獨立節點。
export default function ProcessFlow() {
  const root = useRef<HTMLDivElement>(null)
  const nodes = useRef<(HTMLElement | null)[]>([])
  const [fill, setFill] = useState(0)
  const [lit, setLit] = useState<boolean[]>([])
  const [still, setStill] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStill(true)
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const el = root.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const px = Math.max(0, Math.min(rect.height, window.innerHeight * 0.62 - rect.top))
      setFill(px)
      setLit(nodes.current.map(n => (n ? n.offsetTop + 20 <= px : false)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  let n = -1
  const on = (i: number) => still || lit[i]
  const register = (el: HTMLElement | null) => {
    n += 1
    nodes.current[n] = el
    return n
  }

  return (
    <div ref={root} className="relative mt-14">
      {/* rail */}
      <div className="absolute bottom-6 left-[19px] top-5 w-[2px] rounded bg-line" aria-hidden="true" />
      <div
        className="absolute left-[19px] top-5 w-[2px] rounded bg-honey transition-[height] duration-150 ease-out"
        style={{ height: still ? 'calc(100% - 44px)' : Math.max(0, fill - 20) }}
        aria-hidden="true"
      />

      <ol className="space-y-6">
        {workflowSteps.map((step, si) => {
          const contractIdx = step.contract ? register(null) : -1
          const stepIdx = register(null)
          return (
            <Fragment key={step.title}>
              {step.contract && (
                <li
                  ref={el => {
                    nodes.current[contractIdx] = el
                  }}
                  className="relative flex items-center gap-4 pl-0"
                >
                  <span
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-dashed transition-colors duration-500 ${
                      on(contractIdx) ? 'border-honey bg-honey text-ink' : 'border-line bg-paper text-muted'
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                      <path d="M14 3v5h5M9 13h6M9 17h3" />
                    </svg>
                  </span>
                  <div
                    className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-full px-4 py-2 transition-all duration-500 ${
                      on(contractIdx) ? 'bg-ink text-white' : 'bg-paper-2 text-muted'
                    }`}
                  >
                    <span className="text-xs font-bold tracking-widest text-honey">簽約</span>
                    <span className="font-bold">{step.contract.label}</span>
                    <span className="text-sm opacity-70">{step.contract.note}</span>
                  </div>
                </li>
              )}

              <li
                ref={el => {
                  nodes.current[stepIdx] = el
                }}
                className="relative flex gap-4"
              >
                <span
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold transition-all duration-500 ${
                    on(stepIdx) ? 'bg-ink text-honey shadow-[0_0_0_6px_rgba(242,183,5,0.18)]' : 'bg-white text-muted ring-2 ring-line'
                  }`}
                >
                  {String(si + 1).padStart(2, '0')}
                </span>
                <div
                  className={`flex-1 rounded-2xl border bg-white p-6 transition-all duration-500 sm:p-7 ${
                    on(stepIdx) ? 'translate-y-0 border-ink/15 opacity-100 shadow-[0_18px_40px_-24px_rgba(22,20,15,0.35)]' : 'translate-y-3 border-line opacity-45'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    {!step.contract && si === 0 && (
                      <span className="rounded-full bg-paper-2 px-3 py-1 text-xs font-bold text-ink-soft">不用簽約</span>
                    )}
                    {!step.contract && si > 0 && (
                      <span className="rounded-full bg-paper-2 px-3 py-1 text-xs font-bold text-ink-soft">同一份開發合約</span>
                    )}
                  </div>
                  <p className="mt-2 leading-relaxed text-ink-soft">{step.text}</p>

                  {step.outputs.length > 0 && (
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold tracking-widest text-muted">你會拿到</span>
                      {step.outputs.map(o => (
                        <span key={o} className="rounded-md bg-honey-soft/60 px-2.5 py-1 text-sm text-ink">
                          {o}
                        </span>
                      ))}
                    </div>
                  )}

                  {step.options && (
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {step.options.map((o, oi) => (
                        <div key={o.title} className="rounded-xl border border-line bg-paper p-5">
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink font-display text-xs font-bold text-honey">
                              {oi === 0 ? 'A' : 'B'}
                            </span>
                            <span className="font-bold">{o.title}</span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{o.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            </Fragment>
          )
        })}
      </ol>
    </div>
  )
}
