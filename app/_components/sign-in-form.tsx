import * as SI from '@clerk/elements/sign-in'
import * as CC from '@clerk/elements/common'

export const SignInForm = () => {
  return (
    <>
      <SI.Step
        name='start'
        className='flex-col-c gap-md !h-auto !space-y-0 relative w-[80vw] lg:w-[30vw]'
      >
        <CC.Field className='w-full' name='identifier'>
          <CC.Input
            type='email'
            required
            placeholder='Shopify Email Address...'
            className='w-full px-md py-sm rounded-md border border-brand'
          />
          <CC.FieldError className='mt-2 block text-xs text-red-600' />
        </CC.Field>
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
