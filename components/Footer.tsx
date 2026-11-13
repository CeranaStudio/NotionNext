import Link from 'next/link'
import { nav, site } from '@/lib/content'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-white/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="" width={36} height={36} className="rounded-md" />
            <div>
              <div className="font-bold text-white">{site.name}</div>
              <div className="font-display text-xs text-white/40">{site.nameEn}</div>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">以創新科技，為企業打造智慧化未來。</p>
          <a href={`mailto:${site.email}`} className="mt-4 inline-block text-sm text-honey hover:underline">
            {site.email}
          </a>
          <div className="mt-1 text-sm">{site.location}</div>
        </div>

        <div>
          <div className="text-xs font-bold tracking-widest text-white/40">網站導覽</div>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map(item => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-honey">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-xs text-white/40 sm:flex-row sm:justify-between sm:px-6">
          <span>
            © {site.since}–{year} {site.name} {site.nameEn}
          </span>
          <span>{site.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
