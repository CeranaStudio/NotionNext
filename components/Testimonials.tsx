import Carousel from '@/components/Carousel'
import { testimonials } from '@/lib/content'

export default function Testimonials() {
  return (
    <div className="mt-12">
      <Carousel label="客戶回饋">
        {testimonials.map(t => (
          <figure key={t.name} className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
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
      </Carousel>
    </div>
  )
}
