import * as SU from '@clerk/elements/sign-up'
import * as SI from '@clerk/elements/sign-in'

export const SignUpClerkVerificationStep = ({ type }: { type: 'SIGN_UP' | 'SIGN_IN' }) => { 
  const EL = type === 'SIGN_UP' ? SU : SI

  return (
    <>
      <EL.Step
        name='verifications'
        className='VERIFICATION_STEP_CONTAINER flex-col-c gap-md'
      >
        <SU.Strategy name='email_link'>
          <h1 className='text-center'>Check your email!</h1>
          <p className='text-center'>
            Click the link in the email we sent you to verify
            your email address.
          </p>
        </SU.Strategy>
      </EL.Step>
    </>
  )
}
