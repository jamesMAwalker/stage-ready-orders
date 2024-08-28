import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { SignedIn } from '@clerk/nextjs'

import { twm } from '@/lib/twm'
import { Providers } from './_context'

import { MenuFooter } from './_components/menu-footer'
import { TopNav } from './_components/top-nav'
import { Toaster } from '@/shadcn/ui/toaster'

import '@/style/global.scss'

const poppins = Poppins({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Stage Ready Orders',
  description:
    'Order high-end cosmetics for your team or studio.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <html lang='en'>
        <body
          className={twm(
            poppins.className,
            'BODY relative flex-col-sbc overflow-clip min-h-screen h-screen'
          )}
        >
          <TopNav />
          <div className='LAYOUT_OUTER overflow-y-scroll h-full w-[var(--layout-width)] flex-tl border-r border-l border-neutral-300 px-md pb-[25vh]'>
            <main className='LAYOUT_INNER w-full flex min-h-screen flex-col items-center justify-start gap-8 p-md pt-xxl'>
              {children}
            </main>
          </div>
          <SignedIn>
            <MenuFooter />
          </SignedIn>
          <Toaster />
        </body>
      </html>
    </Providers>
  )
}
