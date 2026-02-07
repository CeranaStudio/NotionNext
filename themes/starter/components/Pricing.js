'use client'

import { useState } from 'react'
import { siteConfig } from '@/lib/config'
import ContactModal from './ContactModal'

/**
 * 現代化價格板塊
 * @returns
 */
export const Pricing = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const plans = [
    {
      title: siteConfig('STARTER_PRICING_1_TITLE'),
      price: siteConfig('STARTER_PRICING_1_PRICE'),
      currency: siteConfig('STARTER_PRICING_1_PRICE_CURRENCY'),
      period: siteConfig('STARTER_PRICING_1_PRICE_PERIOD'),
      header: siteConfig('STARTER_PRICING_1_HEADER'),
      features: siteConfig('STARTER_PRICING_1_FEATURES')?.split(',') || [],
      buttonText: siteConfig('STARTER_PRICING_1_BUTTON_TEXT'),
      buttonUrl: siteConfig('STARTER_PRICING_1_BUTTON_URL'),
      featured: false
    },
    {
      title: siteConfig('STARTER_PRICING_2_TITLE'),
      price: siteConfig('STARTER_PRICING_2_PRICE'),
      currency: siteConfig('STARTER_PRICING_2_PRICE_CURRENCY'),
      period: siteConfig('STARTER_PRICING_2_PRICE_PERIOD'),
      header: siteConfig('STARTER_PRICING_2_HEADER'),
      features: siteConfig('STARTER_PRICING_2_FEATURES')?.split(',') || [],
      buttonText: siteConfig('STARTER_PRICING_2_BUTTON_TEXT'),
      buttonUrl: siteConfig('STARTER_PRICING_2_BUTTON_URL'),
      tag: siteConfig('STARTER_PRICING_2_TAG'),
      featured: true
    },
    {
      title: siteConfig('STARTER_PRICING_3_TITLE'),
      price: siteConfig('STARTER_PRICING_3_PRICE'),
      currency: siteConfig('STARTER_PRICING_3_PRICE_CURRENCY'),
      period: siteConfig('STARTER_PRICING_3_PRICE_PERIOD'),
      header: siteConfig('STARTER_PRICING_3_HEADER'),
      features: siteConfig('STARTER_PRICING_3_FEATURES')?.split(',') || [],
      buttonText: siteConfig('STARTER_PRICING_3_BUTTON_TEXT'),
      buttonUrl: siteConfig('STARTER_PRICING_3_BUTTON_URL'),
      featured: false
    }
  ]

  return (
    <>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <section
        id='pricing'
        className='relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 lg:py-28'>
      {/* 背景裝飾 */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl'></div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        {/* 標題區 */}
        <div className='text-center max-w-3xl mx-auto mb-8'>
          <span className='inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-primary bg-primary/10 rounded-full'>
            {siteConfig('STARTER_PRICING_TITLE')}
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
            {siteConfig('STARTER_PRICING_TEXT_1')}
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            {siteConfig('STARTER_PRICING_TEXT_2')}
          </p>
        </div>

        {/* 免費諮詢 */}
        <div className='flex justify-center mb-8'>
          <div className='inline-flex items-center gap-3 px-6 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full'>
            <span className='px-2 py-0.5 text-xs font-bold bg-green-500 text-white rounded'>FREE</span>
            <span className='text-sm text-gray-700 dark:text-gray-300'>
              <span className='font-semibold'>顧問諮詢</span> — 免費評估您的需求與可行方案
            </span>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className='text-sm font-medium text-green-600 dark:text-green-400 hover:underline cursor-pointer'>
              預約諮詢 →
            </button>
          </div>
        </div>

        {/* 價格卡片 */}
        <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group rounded-2xl p-8 transition-all duration-300 ${
                plan.featured
                  ? 'bg-gradient-to-br from-primary to-blue-600 text-white shadow-2xl shadow-primary/25 scale-105 z-10'
                  : 'bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl hover:-translate-y-1'
              }`}>
              {/* 熱門標籤 */}
              {plan.tag && (
                <div className='absolute -top-4 left-1/2 -translate-x-1/2'>
                  <span className='inline-block px-4 py-1 text-sm font-bold bg-yellow-400 text-gray-900 rounded-full shadow-lg'>
                    {plan.tag}
                  </span>
                </div>
              )}

              {/* 方案名稱 */}
              <div className='mb-6'>
                <h3 className={`text-xl font-bold mb-2 ${
                  plan.featured ? 'text-white' : 'text-gray-900 dark:text-white'
                }`}>
                  {plan.title}
                </h3>
                <p className={`text-sm ${
                  plan.featured ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {plan.header}
                </p>
              </div>

              {/* 價格 */}
              <div className='mb-8'>
                <div className='flex items-baseline gap-1'>
                  <span className={`text-lg font-medium ${
                    plan.featured ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    {plan.currency}
                  </span>
                  <span className={`text-4xl lg:text-5xl font-bold tracking-tight ${
                    plan.featured ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg ${
                    plan.featured ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* 功能列表 */}
              <ul className='space-y-4 mb-8'>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className='flex items-start gap-3'>
                    <svg
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        plan.featured ? 'text-white' : 'text-primary'
                      }`}
                      fill='currentColor'
                      viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className={`text-sm ${
                      plan.featured ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {feature.trim()}
                    </span>
                  </li>
                ))}
              </ul>

              {/* 按鈕 */}
              <button
                onClick={() => setIsContactModalOpen(true)}
                className={`block w-full py-3.5 px-6 text-center font-semibold rounded-xl transition-all duration-300 cursor-pointer ${
                  plan.featured
                    ? 'bg-white text-primary hover:bg-gray-100 shadow-lg'
                    : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                }`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
