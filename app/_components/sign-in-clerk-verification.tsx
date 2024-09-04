import * as SI from '@clerk/elements/sign-in'
import * as CC from '@clerk/elements/common'

export const SignInClerkVerificationStep = () => {
  return (
    <SI.Step name='verifications' className='lg:w-1/2'>
      <SI.Strategy name='email_link'>
        <CC.GlobalError className='block text-sm text-red-600' />
        <div className='FLEX_WRAP border p-md px-lg rounded-md bg-green-500/10 flex-col-c gap-sm'>
          <h2 className='EMAIL_NOTIFY text-center text-xl font-bold'>
            Check Your Email!
          </h2>
          <p className='text-center '>
            Click the link in the email we sent you to continue
            to the orders page.
          </p>
        </div>
      </SI.Strategy>
    </SI.Step>
  )
}
