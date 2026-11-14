// 案例頁的圖片、PDF、影片都放在 public/cases/<slug>/，build 時讀進來（靜態輸出，只在 server 端執行）。
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

export type CaseAssets = {
  shots: { src: string; caption: string }[]
  slides: { src: string; label: string }[]
  pdf?: string
  video?: string
  poster?: string
}

const readJson = <T,>(file: string, fallback: T): T => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as T
  } catch {
    return fallback
  }
}

export function getCaseAssets(slug: string): CaseAssets {
  const dir = path.join(process.cwd(), 'public', 'cases', slug)
  const url = (f: string) => `/cases/${slug}/${f}`
  // 檔案換新但網址不變時，瀏覽器會沿用快取（max-age 4 小時），所以加上內容雜湊當版本號
  const versioned = (f: string) => {
    const hash = crypto.createHash('md5').update(fs.readFileSync(path.join(dir, f))).digest('hex').slice(0, 8)
    return `${url(f)}?v=${hash}`
  }
  const has = (f: string) => fs.existsSync(path.join(dir, f))
  const shots = readJson<{ file: string; caption: string }[]>(path.join(dir, 'shots.json'), [])
  const slides = readJson<{ file: string; label: string }[]>(path.join(dir, 'slides.json'), [])
  return {
    shots: shots.filter(s => has(s.file)).map(s => ({ src: url(s.file), caption: s.caption })),
    slides: slides.filter(s => has(s.file)).map(s => ({ src: url(s.file), label: s.label })),
    pdf: has(`${slug}.pdf`) ? versioned(`${slug}.pdf`) : undefined,
    video: has(`${slug}.mp4`) ? versioned(`${slug}.mp4`) : undefined,
    poster: has('poster.webp') ? versioned('poster.webp') : undefined
  }
}

export const slideByLabel = (a: CaseAssets, label: string) => a.slides.find(s => s.label.includes(label))
