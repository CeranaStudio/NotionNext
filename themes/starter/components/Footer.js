import { siteConfig } from '@/lib/config'
import SocialButton from '@/themes/fukasawa/components/SocialButton'
import { Logo } from './Logo'
import { SVGFooterCircleBG } from './svg/SVGFooterCircleBG'
import Link from 'next/link'

/* eslint-disable @next/next/no-img-element */
export const Footer = props => {
  // const footerPostCount = siteConfig('STARTER_FOOTER_POST_COUNT', 2)
  // const latestPosts = props?.latestPosts
  //   ? props?.latestPosts.slice(0, footerPostCount)
  //   : []
  // const STARTER_FOOTER_LINK_GROUP = siteConfig('STARTER_FOOTER_LINK_GROUP', [])
  return (
    <>
      {/* <!-- ====== Footer Section Start --> */}
      <footer
        className='wow fadeInUp relative z-10 bg-[#090E34]'
        data-wow-delay='.15s'
      >
        {/* 底部版权信息相关 */}
        <div className='mt-8 border-t border-[#8890A4] border-opacity-40 py-6'>
          <div className='container'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
              <div className='flex flex-col md:flex-row items-center gap-4 text-sm text-gray-7'>
                <span>© {new Date().getFullYear()} {siteConfig('TITLE')}. All Rights Reserved.</span>
                <span className='hidden md:inline'>|</span>
                <span>營業人名稱：東蜂工作室</span>
                <span className='hidden md:inline'>|</span>
                <span>統一編號：95292891</span>
              </div>
              
              <div className='flex items-center gap-4 text-sm'>
                <Link
                  href={siteConfig('STARTER_FOOTER_PRIVACY_POLICY_URL', '')}
                  className='text-gray-7 hover:text-white hover:underline'>
                  {siteConfig('STARTER_FOOTER_PRIVACY_POLICY_TEXT', '隱私權政策')}
                </Link>
                {/* <Link
                  href={siteConfig('STARTER_FOOTER_PRIVACY_LEGAL_NOTICE_URL', '')}
                  className='text-gray-7 hover:text-white hover:underline'>
                  {siteConfig('STARTER_FOOTER_PRIVACY_LEGAL_NOTICE_TEXT', '法律聲明')}
                </Link> */}
                <Link
                  href={siteConfig('STARTER_FOOTER_PRIVACY_TERMS_OF_SERVICE_URL', '')}
                  className='text-gray-7 hover:text-white hover:underline'>
                  {siteConfig('STARTER_FOOTER_PRIVACY_TERMS_OF_SERVICE_TEXT', '服務條款')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer 背景 */}
        <div>
          {/* <span className='absolute left-0 top-0 z-[-1]'>
            <img src='/images/starter/footer/shape-1.svg' alt='' />
          </span>

          <span className='absolute bottom-0 right-0 z-[-1]'>
            <img src='/images/starter/footer/shape-3.svg' alt='' />
          </span> */}

          <span className='absolute right-0 top-0 z-[-1]'>
            <SVGFooterCircleBG />
          </span>
        </div>
      </footer>
      {/* <!-- ====== Footer Section End --> */}
    </>
  )
}
