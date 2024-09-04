import { LoaderIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

import { useShopifyStatusContext } from '@/context/shopify-status.context'
import { animate } from '@/animation'

import { cn } from '@/shadcn/utils'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from '@/shadcn/ui/form'
import { Input } from '@/shadcn/ui/input'

export const SignUpForm = () => {
  const {
    setEmail,
    eligibilityStatus,
    setEligibilityStatus,
    checkingAccountStatus,
    form
  } = useShopifyStatusContext()

  return (
    <Form {...form}>
      <form
        className='BUTTON_WRAP w-full flex-col-c justify-between h-min '
        onSubmit={(e) => {
          e.preventDefault()
          console.log('prevented default!')
        }}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='FORM_ITEM flex-col-c box-border !h-auto !space-y-0 relative w-full lg:w-[30vw]'>
              <FormControl>
                <>
                  <Input
                    autoFocus
                    className='w-full box-border border border-brand'
                    placeholder='Shopify Email Address...'
                    {...field}
                    {...form.register('email', {
                      onChange: (e: any) => {
                        setEmail(e.target.value)
                        if (eligibilityStatus) {
                          setEligibilityStatus(null)
                        }
                      }
                    })}
                  />
                  {checkingAccountStatus && (
                    <LoaderIcon className='absolute top-[20%] right-[2.5%] text-black/50 animate-pulse animate-spin' />
                  )}
                </>
              </FormControl>
              <AnimatePresence>
                {eligibilityStatus && (
                  <motion.div
                    {...animate()}
                    className='ANIMATION_WRAP w-full text-center'
                  >
                    <FormDescription
                      className={cn(
                        'FORM_DESC mt-md p-sm rounded-md w-full',
                        eligibilityStatus.code === 'VALID_LOGIN'
                          ? 'text-green-700 bg-green-500/10'
                          : 'text-orange-700 bg-orange-500/10'
                      )}
                    >
                      {eligibilityStatus.message}
                    </FormDescription>
                  </motion.div>
                )}
              </AnimatePresence>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
