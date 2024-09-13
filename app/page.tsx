'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'

import { WelcomeHeader } from '@/components/welcome-header'
import { LinkButton } from '@/components/link-button'
import { Button } from '@/shadcn/ui/button'

export default function HomePage() {
  const { isSignedIn } = useUser()

  if (isSignedIn) {
    redirect('/orders')
  }

  return (
    <>
      <div className='HOME_PAGE_WRAP pt-xxl lg:pt-0 w-full lg:w-1/2 h-[80vh] flex-col-c gap-sm'>
        <WelcomeHeader />
        <p className='text-center w-full flex-col-c gap-sm'>
          This site is for team directors and studio owners to
          place bulk orders.{' '}
        </p>
        <p className='STAGE_READY_BLOCK p-md bg-gradient-to-l from-[#dcfbcb] to-[#bff4ef] border border-neutral-300 rounded-md flex-col-c gap-ms my-sm  text-center w-full'>
          <span className='font-bold flex-col-c'>
            {' '}
            To use this site, you must be an approved member of
            the
            <a
              className='text-brand hover:text-brand_tertiary underline'
              target='_blank'
              href='https://standingocosmetics.com/pages/stage-ready-studio'
            >
              {' '}
              Standing O Stage Ready Program.
            </a>
          </span>
          <span className=''>
            If you have not already been approved for the Stage
            Ready Program, visit the link below to apply for
            access.
          </span>
          <LinkButton
            href={
              'https://api.collabs.shopify.com/creator/signup/community_application/D6APXfVLVP4?origin=THEME_EXTENSION'
            }
            text={'Apply For The Stage Ready Program →'}
            classes='bg-brand hover:bg-brand_tertiary text-white transition-all'
          />
        </p>
        <div className='SIGN_UPIN_BLOCK flex-col-c gap-ms p-md border border-neutral-300 rounded-md text-center'>
          <p>
            <strong>
              Once you have been approved for The Stage Ready
              Program
            </strong>
            , return to this site and use the email you used to
            sign up for The Stage Ready Program to create your
            ordering enabled account.
          </p>
          <div className='BUTTONS_CONTAINER flex-col-c gap-sm w-full'>
            <Link href={'/sign-up'} className='w-full'>
              <Button className='bg-transparent border border-brand text-brand hover:bg-brand/10 w-full'>
                Create Your Ordering Account →
              </Button>
            </Link>
          </div>
        </div>
        <div className='flex-c gap-[.5ch] text-muted-foreground'>
          <span>Already have an ordering enabled account?</span>
          <Link
            href={'/sign-in'}
            className='text-sm hover:underline text-brand'
          >
            Sign in.
          </Link>
        </div>
      </div>
    </>
  )
}
