import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import * as CC from '@clerk/elements/common'
import * as SU from '@clerk/elements/sign-up'

import { animate } from '@/animation'
import { useShopifyStatusContext } from '@/context/shopify-status.context'

import { Button } from '@/shadcn/ui/button'
import { LinkButton } from './link-button'

export function SignUpClerkStartStep() {
  const { email, eligibilityStatus } = useShopifyStatusContext()

  return (
    <SU.Step name='start' className='CLERK_START_STEP w-full'>
      <CC.Field name='emailAddress'>
        <CC.FieldError className='hidden' />
        <CC.Label className='hidden'>Email</CC.Label>
        <CC.Input
          className='hidden'
          type='email'
          value={email || ''}
        />
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
          'EXISTING_CLERK_ACCOUNT' && (
          <Link href={eligibilityStatus.link!}>
            <motion.div
              {...animate()}
              className='ANIMATION_WRAP w-full'
            >
              <Button className='w-full'>
                {eligibilityStatus.buttonText}
              </Button>
            </motion.div>
          </Link>
        )}
        {eligibilityStatus?.code ===
          'NOT_A_SHOPIFY_CUSTOMER' && (
          <LinkButton
            href={eligibilityStatus.link?.toString()!}
            text={eligibilityStatus.buttonText?.toString()!}
          />
        )}
        {eligibilityStatus?.code ===
          'NOT_A_STAGE_READY_CUSTOMER' && (
          <LinkButton 
            href={eligibilityStatus.link?.toString()!}
            text={eligibilityStatus.buttonText?.toString()!}
          />
        )}
      </AnimatePresence>
    </SU.Step>
  )
}
