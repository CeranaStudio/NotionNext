'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

const SERVICE_OPTIONS = [
  { id: 'website', label: '官網設計' },
  { id: 'digital-transformation', label: '數位轉型' },
  { id: 'mobile-app', label: '手機 APP 開發' },
  { id: 'poc', label: '開發 POC 產品' },
  { id: 'automation', label: '流程自動化' },
  { id: 'ai-solution', label: 'AI 智慧化解決方案' },
  { id: 'other', label: '其他' }
]

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    contactType: 'email',
    services: [],
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const isDev = process.env.NODE_ENV === 'development'
    const endpoint = isDev
      ? 'https://n8n.cerana.tech/webhook-test/6ca95608-4b4a-4148-bc5b-1974802663e6'
      : 'https://n8n.cerana.tech/webhook/6ca95608-4b4a-4148-bc5b-1974802663e6'

    const payload = {
      name: formData.name,
      contact: formData.contact,
      contactType: formData.contactType,
      services: formData.services.map(id => SERVICE_OPTIONS.find(s => s.id === id)?.label),
      message: formData.message,
      submittedAt: new Date().toISOString()
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setSubmitStatus('success')
        setTimeout(() => {
          onClose()
          setFormData({
            name: '',
            contact: '',
            contactType: 'email',
            services: [],
            message: ''
          })
          setSubmitStatus(null)
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold leading-6 text-gray-900 dark:text-white mb-4"
                >
                  聯繫我們
                </Dialog.Title>

                {submitStatus === 'success' ? (
                  <div className="text-center py-8">
                    <div className="text-green-500 text-5xl mb-4">✓</div>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      感謝您的聯繫！我們會盡快與您聯繫。
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* 稱呼 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        您的稱呼 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="如：鄭先生、劉小姐"
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    {/* 聯絡方式 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        聯絡方式 <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-4 mb-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="contactType"
                            value="email"
                            checked={formData.contactType === 'email'}
                            onChange={(e) => setFormData(prev => ({ ...prev, contactType: e.target.value }))}
                            className="mr-2"
                          />
                          <span className="text-gray-700 dark:text-gray-300">Email</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="contactType"
                            value="phone"
                            checked={formData.contactType === 'phone'}
                            onChange={(e) => setFormData(prev => ({ ...prev, contactType: e.target.value }))}
                            className="mr-2"
                          />
                          <span className="text-gray-700 dark:text-gray-300">手機</span>
                        </label>
                      </div>
                      <input
                        type={formData.contactType === 'email' ? 'email' : 'tel'}
                        value={formData.contact}
                        onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                        placeholder={formData.contactType === 'email' ? '請輸入您的 Email' : '請輸入您的手機號碼'}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    {/* 服務項目 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        想了解的服務 <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SERVICE_OPTIONS.map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => handleServiceToggle(service.id)}
                            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                              formData.services.includes(service.id)
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {service.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 備註 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        補充說明（選填）
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="請簡述您的需求或想法..."
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                      />
                    </div>

                    {/* 錯誤訊息 */}
                    {submitStatus === 'error' && (
                      <p className="text-red-500 text-sm">
                        提交失敗，請稍後再試或直接來信聯繫我們。
                      </p>
                    )}

                    {/* 按鈕 */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || formData.services.length === 0 || !formData.name.trim()}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? '提交中...' : '送出'}
                      </button>
                    </div>
                  </form>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
