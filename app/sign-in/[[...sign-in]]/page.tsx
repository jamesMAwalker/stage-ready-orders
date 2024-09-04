'use client'

import Link from 'next/link'
import * as SI from '@clerk/elements/sign-in'

import { Separator } from '@/shadcn/ui/separator'
import { WelcomeHeader } from '@/components/welcome-header'
import { SignInForm } from '@/components/sign-in-form'
import { SignInClerkVerificationStep } from '@/components/sign-in-clerk-verification'

const SignInPage = () => {
  return (
    <SI.Root>
      <div className='SIGNIN_WRAP  w-full h-[80vh] flex-col-c gap-md lg:gap-lg'>
        <div className='WELCOME_CONTAINER flex-col-c gap-md'>
          <WelcomeHeader />
          <div className='SIGN_UP_CONTAINER w-full lg:w-1/2 flex-col-c gap-md'>
            <p className='flex-col-c gap-sm text-center'>
              <span>
                Enter your Shopify account email to sign in. You
                will recieve an email with a link to continue to
                the orders page.
              </span>
            </p>
          </div>
        </div>
        <SignInForm />
        <SignInClerkVerificationStep />
        <div className='flex-c gap-[.5ch] text-muted-foreground'>
          <span>Don't have an account?</span>
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
