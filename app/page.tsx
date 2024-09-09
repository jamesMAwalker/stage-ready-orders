// @ts-nocheck

'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'

import { animate } from '@/animation'

import { WelcomeHeader } from './_components/welcome-header'
import { Button } from '@/shadcn/ui/button'

export default function HomePage() {
  const { isSignedIn } = useUser()

  if (isSignedIn) {
    redirect('/orders')
  }

  return (
    <>
      <div className='HOME_PAGE_WRAP  w-full lg:w-1/2 h-[80vh] flex-col-c gap-md'>
        <WelcomeHeader />
        <p className='flex-col-c text-center w-full'>
          <span>Welcome to Stage Ready Orders!</span>
          <span>
            You can use this site to place orders for your team
            or studio.
          </span>
          <span> Click the button below to get started.</span>
        </p>
        <Link href={'/sign-up'} className='w-full'>
          <Button className='w-full'>Get Started</Button>
        </Link>
        <Link href={'/sign-in'} className='w-full'>
          <Button
            className='w-full border bg-transparent border-brand hover:text-white hover:bg-brand text-brand'
            variant='outline'
          >
            Sign In
          </Button>
        </Link>
      </div>
    </>
  )
}
