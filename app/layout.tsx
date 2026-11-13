import type { Metadata, Viewport } from 'next'
import { Noto_Sans_TC, Space_Grotesk } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { site } from '@/lib/content'
import './globals.css'

const noto = Noto_Sans_TC({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto'
})

const grotesk = Space_Grotesk({
  weight: ['500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grotesk'
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}｜${site.tagline}`, template: `%s｜${site.name}` },
  description: site.description,
  keywords: site.keywords,
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    siteName: site.name,
    title: `${site.name}｜${site.tagline}`,
    description: site.description,
    url: site.url,
    images: ['/logo.png']
  }
}

export const viewport: Viewport = { themeColor: '#16140f' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW" className={`${noto.variable} ${grotesk.variable}`}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
