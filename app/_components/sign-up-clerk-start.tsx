import { AnimatePresence, motion } from 'framer-motion'
import * as CC from '@clerk/elements/common'
import * as SU from '@clerk/elements/sign-up'

import { animate } from '@/animation'
import { useShopifyStatusContext } from '@/context/shopify-status.context'

import { Button } from '@/shadcn/ui/button'

export function SignUpClerkStartStep() {
  const { email, eligibilityStatus, setEligibilityStatus } =
    useShopifyStatusContext()

  return (
    <SU.Step name='start' className='CLERK_START_STEP w-full'>
      <CC.Field
        name='emailAddress'
        className='CLERK_HIDDEN_FIELD hidden'
      >
        <CC.Label>Email</CC.Label>
        <CC.Input type='email' value={email || ''} />
      </CC.Field>
      <AnimatePresence>
        {eligibilityStatus?.code === 'VALID_LOGIN' && (
          <motion.div
            {...animate()}
            className='ANIMATION_WRAP w-full'
          >
            <SU.Action
              submit
              className='w-full bg-brand rounded-md text-white font-semibold p-sm'
            >
              Sign Up
            </SU.Action>
          </motion.div>
        )}
        {eligibilityStatus?.code ===
          'NOT_A_SHOPIFY_CUSTOMER' && (
          <motion.div
            {...animate()}
            className='ANIMATION_WRAP w-full'
          >
            <Button type='submit' className='w-full'>
              <a href={eligibilityStatus.link}>
                {eligibilityStatus.buttonText}
              </a>
            </Button>
          </motion.div>
        )}
        {eligibilityStatus?.code ===
          'NOT_A_STAGE_READY_CUSTOMER' && (
          <motion.div
            {...animate()}
            className='ANIMATION_WRAP w-full'
          >
            <Button type='submit' className='w-full'>
              <a href={eligibilityStatus.link}>
                {eligibilityStatus.buttonText}
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </SU.Step>
  )
}
