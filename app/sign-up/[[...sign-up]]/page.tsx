'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'
import * as SU from '@clerk/elements/sign-up'

import { WelcomeHeader } from '@/components/welcome-header'
import { SignUpForm } from '@/components/sign-up-form'
import { SignUpClerkStartStep } from '@/components/sign-up-clerk-start'
import { SignUpClerkVerificationStep } from '@/components/sign-up-clerk-verification'
import { SignUpClerkStartStepALT } from '@/app/_components/sign-up-clerk-start-ALT'
import { ELoginStatus } from '@/enums'

export default function SignUpPage() {
  const { isSignedIn } = useUser()

  if (isSignedIn) {
    redirect('/orders')
  }

  const srLink = ELoginStatus.NOT_A_STAGE_READY_CUSTOMER.link

  return (
    <SU.Root>
      <div className='SIGN_UP_WRAP  w-full h-[80vh] flex-col-c gap-md'>
        <WelcomeHeader />
        <div className='SIGN_UP_CONTAINER w-full lg:w-1/2 flex-col-c gap-md'>
          <p className='flex-col-c gap-sm text-center'>
            <span>
              Enter your{' '}
              <strong>Stage Ready approved email.</strong>
              <br />
              If your email is not yet approved, you can follow{' '}
              <a href={srLink} target='_blank' className='font-bold text-purple-800 hover:text-purple-600 hover:underline'> 
                this link
              </a>{' '}
              to sign up for the Stage Ready Program.
            </span>
          </p>

          {/* <SignUpForm /> */}
          {/* <SignUpClerkStartStep /> */}
          <SignUpClerkStartStepALT />
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
