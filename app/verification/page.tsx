'use client';

import { useEffect, useState } from 'react'
import {
  ClerkLoaded,
  useClerk,
  useSignUp
} from '@clerk/clerk-react'
import {
  EmailLinkErrorCode,
  isEmailLinkError
} from '@clerk/clerk-react/errors'


function VerificationPage() {
  const [verificationStatus, setVerificationStatus] =
    useState('loading')

  const { handleEmailLinkVerification } = useClerk()

  useEffect(() => {
    async function verify() {
      try {
        await handleEmailLinkVerification({
          redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/waiting`,
          redirectUrlComplete: `${process.env.NEXT_PUBLIC_BASE_URL}/orders`
        })
        // If we're not redirected at this point, it means
        // that the flow has completed on another device.
        setVerificationStatus('verified')
      } catch (err: any) {
        // Verification has failed.
        let status = 'failed'
        if (
          isEmailLinkError(err) &&
          err.code === EmailLinkErrorCode.Expired
        ) {
          status = 'expired'
        }
        setVerificationStatus(status)
      }
    }
    verify()
  }, [])

  if (verificationStatus === 'loading') {
    return <div>Loading...</div>
  }

  if (verificationStatus === 'failed') {
    return <div>Email link verification failed</div>
  }

  if (verificationStatus === 'expired') {
    return <div>Email link expired</div>
  }

  return (
    <ClerkLoaded>
      <div>
        Successfully signed up. Return to the original tab to
        continue.
      </div>
    </ClerkLoaded>
  )
}

export default VerificationPage