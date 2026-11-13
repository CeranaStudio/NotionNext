'use client'

import { useState } from 'react'
import { contactServices, site } from '@/lib/content'

type Status = 'idle' | 'sending' | 'sent' | 'fallback'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [services, setServices] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const toggle = (s: string) => setServices(prev => (prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]))

  const mailto = () => {
    const subject = `官網諮詢：${name}`
    const body = `姓名：${name}\n聯絡方式：${contact}\n需求：${services.join('、') || '未選擇'}\n\n${message}`
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), 8000)
      const res = await fetch(site.contactWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          contact,
          contactType: contact.includes('@') ? 'email' : 'phone',
          services,
          message,
          submittedAt: new Date().toISOString()
        }),
        signal: ctrl.signal
      })
      clearTimeout(timer)
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('fallback')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-line">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-honey text-ink">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12l5 5L19 7" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-bold">已收到，謝謝你！</h3>
        <p className="mt-2 text-ink-soft">我們會在一個工作天內與你聯繫。</p>
      </div>
    )
  }

  const field =
    'w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none transition placeholder:text-muted focus:border-ink focus:bg-white'

  return (
    <form onSubmit={submit} className="rounded-2xl bg-white p-6 ring-1 ring-line sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold">怎麼稱呼你</span>
          <input required value={name} onChange={e => setName(e.target.value)} className={field} placeholder="王小姐 / 陳經理" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold">Email 或電話</span>
          <input
            required
            value={contact}
            onChange={e => setContact(e.target.value)}
            className={field}
            placeholder="name@company.com"
          />
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-bold">想聊的方向（可複選）</legend>
        <div className="flex flex-wrap gap-2">
          {contactServices.map(s => {
            const on = services.includes(s)
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggle(s)}
                aria-pressed={on}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                  on ? 'border-ink bg-ink text-white' : 'border-line bg-paper text-ink-soft hover:border-ink/40'
                }`}
              >
                {s}
              </button>
            )
          })}
        </div>
      </fieldset>

      <label className="mt-5 block">
        <span className="mb-1.5 block text-sm font-bold">簡單描述你的需求</span>
        <textarea
          rows={4}
          value={message}
          onChange={e => setMessage(e.target.value)}
          className={field}
          placeholder="例如：每月排課都靠 Excel，想改成線上系統…"
        />
      </label>

      {status === 'fallback' && (
        <div className="mt-5 rounded-xl bg-honey-soft/60 p-4 text-sm text-ink">
          表單暫時送不出去。請改用 Email，內容已幫你填好：
          <a href={mailto()} className="ml-1 font-bold underline">
            寄信給我們
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 w-full rounded-full bg-ink py-3.5 font-bold text-white transition hover:bg-ink-2 disabled:opacity-60"
      >
        {status === 'sending' ? '送出中…' : '送出，等我們聯繫'}
      </button>
      <p className="mt-3 text-center text-xs text-muted">
        或直接寫信到{' '}
        <a href={`mailto:${site.email}`} className="underline">
          {site.email}
        </a>
      </p>
    </form>
  )
}
