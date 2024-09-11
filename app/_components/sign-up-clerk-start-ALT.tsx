'use client'

import { AnimatePresence, motion } from 'framer-motion'
import * as CC from '@clerk/elements/common'
import * as SU from '@clerk/elements/sign-up'

import { animate } from '@/animation'
import { useShopifyStatusContext } from '@/context/shopify-status.context'

import { LoaderIcon } from 'lucide-react'

export function SignUpClerkStartStepALT() {
  const {
    email,
    setEmail,
    eligibilityStatus,
    setEligibilityStatus,
    checkingAccountStatus
  } = useShopifyStatusContext()

  return (
    <SU.Step
      name='start'
      className='CLERK_START_STEP flex-col-c gap-md w-full'
    >
      <CC.Field name='emailAddress' className='relative w-full'>
        <CC.Label className='hidden'>Email</CC.Label>
        <CC.Input
          className='w-full border-brand/50 py-xs px-sm border rounded-md'
          type='email'
          placeholder='Shopify Email Address...'
          value={email || ''}
          onChange={(e) => {
            setEmail(e.target.value)
            if (eligibilityStatus) {
              setEligibilityStatus(null)
            }
          }}
        />
        <AnimatePresence>
          {checkingAccountStatus && (
            <motion.div
              {...animate()}
              className='absolute right-0 top-0 h-full  aspect-square flex-c '
            >
              <LoaderIcon className='text-blue-500/50 animate-pulse animate-spin' />
            </motion.div>
          )}
        </AnimatePresence>
      </CC.Field>
      {eligibilityStatus &&
        eligibilityStatus.code !== 'VALID_LOGIN' && (
          <div className='flex-col-c gap-sm p-sm text-balance rounded-md w-full bg-orange-500/20 text-orange-700'>
            <p>{eligibilityStatus.message}</p>
          </div>
        )}
      <SU.Action
        submit
        disabled={eligibilityStatus?.code !== 'VALID_LOGIN'}
        className='w-full bg-brand rounded-md text-white font-semibold p-sm disabled:opacity-80 disabled:cursor-not-allowed'
      >
        Sign Up
      </SU.Action>
    </SU.Step>
  )
}
