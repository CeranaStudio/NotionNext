import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="honeycomb flex min-h-[80vh] items-center bg-ink pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="font-display text-7xl font-bold text-honey">404</div>
        <h1 className="mt-4 text-3xl font-black text-white">找不到您要的頁面</h1>
        <p className="mt-3 text-white/60">頁面可能已搬家。舊的文章都整理到合作案例了。</p>
        <div className="mt-8 flex gap-3">
          <Link href="/" className="rounded-full bg-honey px-6 py-3 font-bold text-ink">
            返回首頁
          </Link>
          <Link href="/cases" className="rounded-full border border-white/20 px-6 py-3 font-bold text-white">
            合作案例
          </Link>
        </div>
      </div>
    </section>
  )
}
