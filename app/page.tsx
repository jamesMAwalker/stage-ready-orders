// @ts-nocheck

'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'

import { animate } from '@/animation'

import { WelcomeHeader } from '@/components/welcome-header'
import { LinkButton } from '@/components/link-button'
import { Separator } from '@/shadcn/ui/separator'
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
          This site is for team managers and studio owners who
          need to order large quantities of products.{' '}
        </p>
        <p className='STAGE_READY_BLOCK p-md bg-gradient-to-l from-[#dcfbcb] to-[#bff4ef] border border-neutral-300 rounded-md flex-col-c gap-ms my-sm  text-center w-full'>
          <span className='font-bold flex-col-c'>
            {' '}
            To use this site, you must be an approved member of the
            <a
              className='text-purple-800 hover:text-purple-600 underline'
              target='_blank'
              href='https://standingocosmetics.com/pages/stage-ready-studio'
            >
              {' '}
              Standing O Stage Ready Program.
            </a>
          </span>
          <span className=''>
            If you have not already been approved for the Stage
            Ready program, visit the link below to apply for
            access.
          </span>
          <LinkButton
            href={
              'https://api.collabs.shopify.com/creator/signup/community_application/D6APXfVLVP4?origin=THEME_EXTENSION'
            }
            text={'Apply For Stage Ready →'}
            classes='bg-purple-900 hover:bg-purple-700 text-white transition-all' 
          />
        </p>
        <div className='SIGN_UPIN_BLOCK flex-col-c gap-ms p-md border border-neutral-300 rounded-md text-center'>
          <p>
            <strong>
              Once you have been approved for Stage Ready
            </strong>
            , return to this site and sign up with your Stage
            Ready email address.
          </p>
          <div className='BUTTONS_CONTAINER flex-col-c gap-sm w-full'>
            <Link href={'/sign-up'} className='w-full'>
              <Button className='bg-transparent border border-brand text-brand hover:bg-brand/10 w-full'>Go To Sign Up →</Button>
            </Link>
          </div>
        </div>
        <div className='flex-c gap-[.5ch] text-muted-foreground'>
          <span>Already have an account?</span>
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
