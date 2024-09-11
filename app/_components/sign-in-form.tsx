import { AnimatePresence, motion } from 'framer-motion'
import * as SI from '@clerk/elements/sign-in'
import * as CC from '@clerk/elements/common'

import { useShopifyStatusContext } from '@/context/shopify-status.context'
import { animate } from '@/animation'
import { LoaderIcon } from 'lucide-react'


export const SignInForm = () => {
    const {
      email,
      setEmail,
      eligibilityStatus,
      setEligibilityStatus,
      checkingAccountStatus
    } = useShopifyStatusContext()

  return (
    <>
      <SI.Step
        name='start'
        className='flex-col-c gap-md !h-auto !space-y-0 relative w-[80vw] lg:w-[30vw]'
      >
        <CC.Field
          className='relative w-full flex-col-c gap-md'
          name='identifier'
        >
          <CC.Input
            type='email'
            required
            placeholder='Shopify Email Address...'
            className='w-full px-md py-sm rounded-md border border-brand'
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
          <CC.FieldError className='block w-full p-sm text-center rounded-md flex-c bg-orange-500/20 text-orange-700' />
        </CC.Field>
        {eligibilityStatus &&
          eligibilityStatus.code !== 'VALID_LOGIN' && (
            <div className='flex-col-c gap-sm p-sm text-balance rounded-md w-full bg-orange-500/20 text-orange-700'>
              <p>{eligibilityStatus.message}</p>
            </div>
          )}
        <SI.Action
          submit
          className='w-full bg-brand rounded-md text-white font-semibold p-sm'
        >
          Sign In
        </SI.Action>
      </SI.Step>
    </>
  )
}
