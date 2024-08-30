'use client'

import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

import { Button } from '@/shadcn/ui/button'
import { Loader } from '@/components/loader'

export default function Home() {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return <Loader />
  }

  useEffect(() => {
    if (isSignedIn) {
      redirect('/orders')
    }
  }, [isSignedIn])

  return (
    <>
      <div className='SIGNIN_WRAP  w-full h-[80vh] flex-col-c gap-lg'>
        <h1 className='flex-col-c gap-md'>
          <span>
            <img
              src='/images/soc-logo.png'
              alt='logo'
              className=' h-auto'
            />
          </span>
          <span className='text-4xl font-bold'>
            Welcome to Standing O Cosmetics
          </span>
          <span className='text-2xl uppercase'>
            Stage Ready Program Ordering
          </span>
          <Link href='/sign-up'>
            <Button>Get Started</Button>
          </Link>
        </h1>
      </div>
    </>
  )
}
