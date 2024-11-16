'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'
import * as SI from '@clerk/elements/sign-in'

import { SignInForm } from '@/components/sign-in-form'
import { Separator } from '@/shadcn/ui/separator'
import { WelcomeHeader } from '@/components/welcome-header'
import { SignInClerkVerificationStep } from '@/components/sign-in-clerk-verification'

const SignInPage = () => {
  const { isSignedIn } = useUser()
  const router = useRouter()
  // if (isSignedIn) {
    //   redirect('/orders')
    // }
   useEffect(() => {
     if (isSignedIn) {
       router.push('/orders') // Use router.push for navigation inside an effect
     }
   }, [isSignedIn, router])

  return (
    <SI.Root>
      <div className='SIGNIN_WRAP  w-full h-[80vh] flex-col-c gap-md'>
        <div className='WELCOME_CONTAINER flex-col-c gap-md'>
          <WelcomeHeader />
          <div className='SIGN_UP_CONTAINER w-full  flex-col-c gap-md'>
            <p className='w-full text-center'>
              Enter your <strong>Stage Ready approved</strong>{' '}
              email to sign in. <br /> You will recieve an email
              with a verification link to continue to the orders page.
            </p>
          </div>
        </div>
        <SignInForm />
        <SignInClerkVerificationStep />
        <div className='flex-c gap-[.5ch] text-muted-foreground'>
          <span>Don&apos;t have an account?</span>
          <Link
            href={'/sign-up'}
            className='text-sm hover:underline text-brand'
          >
            Sign up.
          </Link>
        </div>
      </div>
    </SI.Root>
  )
}

export default SignInPage
