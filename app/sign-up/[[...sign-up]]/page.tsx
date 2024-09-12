'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'
import * as SU from '@clerk/elements/sign-up'

import { ELoginStatus } from '@/enums'

import { WelcomeHeader } from '@/components/welcome-header'
import { SignUpClerkVerificationStep } from '@/components/sign-up-clerk-verification'
import { SignUpClerkStartStepALT } from '@/app/_components/sign-up-clerk-start-ALT'


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
          <p className='flex-col-c gap-md text-center'>
            <span className='border border-neutral-300 bg-brand/5 rounded-md p-sm'>
              Enter your{' '}
              <strong>Stage Ready Program approved email</strong>{' '}
              to create your ordering enabled account. After you
              submit your email, you will receive an email with a
              link to verify your email address, which will then
              take you to the ordering page.
            </span>
            <span>
              {' '}
              If your email is not yet approved, you can follow{' '}
              <a
                href={srLink}
                target='_blank'
                className='font-bold text-purple-800 hover:text-purple-600 hover:underline'
              >
                this link
              </a>{' '}
              to sign up for the Stage Ready Program.
            </span>
          </p>

          <SignUpClerkStartStepALT />
          <SignUpClerkVerificationStep type={'SIGN_UP'} />

          <div className='flex-c gap-[.5ch] text-muted-foreground'>
            <span>
              Already have an ordering enabled account?
            </span>
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
