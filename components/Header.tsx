'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { nav, site } from '@/lib/content'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // 首頁 hero 是淺色，還沒捲動時選單用深色字
  const light = usePathname() === '/' && !scrolled && !open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-white/10 bg-ink/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="" width={32} height={32} className="rounded-md" />
          <span className={`text-[15px] font-bold tracking-wide transition-colors ${light ? 'text-ink' : 'text-white'}`}>
            {site.name}
            <span className={`ml-2 hidden font-display text-xs font-medium tracking-normal sm:inline ${light ? 'text-ink/40' : 'text-white/50'}`}>
              Cerana
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="主選單">
          {nav.map(item => (
            <Link key={item.href} href={item.href} className={`text-sm transition-colors ${light ? 'text-ink/70 hover:text-ink' : 'text-white/70 hover:text-honey'}`}>
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${light ? 'bg-ink text-white hover:bg-honey hover:text-ink' : 'bg-honey text-ink hover:bg-white'}`}
          >
            免費諮詢
          </Link>
        </nav>

        <button
          type="button"
          className={`-mr-2 p-2 md:hidden ${light ? 'text-ink' : 'text-white'}`}
          aria-label={open ? '關閉選單' : '開啟選單'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 pb-6 pt-2 md:hidden" aria-label="行動版選單">
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/5 py-3 text-white/80"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-honey py-3 text-center font-bold text-ink"
          >
            免費諮詢
          </Link>
        </nav>
      )}
    </header>
  )
}
