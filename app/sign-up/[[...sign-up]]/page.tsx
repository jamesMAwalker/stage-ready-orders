import React from 'react'
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <>
      <div className='SIGNIN_WRAP  w-full h-[80vh] flex-col-c gap-md lg:gap-lg'>
        <div className='flex-col-c gap-md'>
          <h1 className='flex-col-c gap-md'>
            <div className='w-full flex flex-col lg:flex-row items-center justify-center mb-md gap-md '>
              <span className='flex-c h-[4vh] lg:h-[40px]'>
                <img
                  src='/images/soc-logo.png'
                  alt='logo'
                  className='scale-110'
                />
              </span>
              <span className='w-[25vw] mt-sm h-[.5px] lg:h-full lg:w-[.5px] bg-neutral-400'></span>
              <span className='flex-c w-1/2 lg:w-[175px] h-auto'>
                <img
                  src='/images/shopify-logo.png'
                  alt='logo'
                  className='h-auto w-auto h-[5vh]'
                />
              </span>
            </div>
            <span className='text-4xl text-center'>
              Stage Ready Program Ordering
            </span>
          </h1>
          <p className='text-center'>
            Use the email associated with your Shopify account to
            sign up.
          </p>
        </div>
        <SignUp />
      </div>
    </>
  )
}

export default SignUpPage