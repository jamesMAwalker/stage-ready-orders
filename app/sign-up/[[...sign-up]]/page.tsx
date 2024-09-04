'use client'

import Link from 'next/link'
import * as SU from '@clerk/elements/sign-up'

import { WelcomeHeader } from '@/components/welcome-header'
import { SignUpForm } from '@/components/sign-up-form'
import { SignUpClerkStartStep } from '@/components/sign-up-clerk-start'
import { SignUpClerkVerificationStep } from '@/components/sign-up-clerk-verification'

export default function SignUpPage() {
  return (
    <SU.Root>
      <div className='SIGN_UP_WRAP  w-full h-[80vh] flex-col-c gap-md'>
        <WelcomeHeader />
        <div className='SIGN_UP_CONTAINER w-full lg:w-1/2 flex-col-c gap-md'>
          <p className='flex-col-c gap-sm text-center'>
            <span>
              Enter your Shopify account email below. If your
              account is eligible, you can continue to sign up.
              Otherwise follow the instructions that appear below
              to get an eligible account.
            </span>
          </p>

          <SignUpForm />
          <SignUpClerkStartStep />
          <SignUpClerkVerificationStep type={'SIGN_UP'} />

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
      </div>
    </SU.Root>
  )
}
