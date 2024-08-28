import React from 'react'
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <>
      <div className='SIGNIN_WRAP  w-full h-[80vh] flex-col-c gap-lg'>
        <div className='flex-col-c gap-md'>
          <h1 className='flex-col-c gap-md'>
            <div className='flex-c mb-md gap-md '>
              <span className='flex-c h-[5vh]'>
                <img
                  src='/images/soc-logo.png'
                  alt='logo'
                  className='scale-110'
                />
              </span>
              <span className="h-full w-[.5px] bg-neutral-400"></span>
              <span className='flex-c h-[5vh]'>
                <img
                  src='/images/shopify-logo.png'
                  alt='logo'
                  className='h-full w-full'
                />
              </span>
            </div>
            <span className='text-4xl'>
              Stage Ready Program Ordering
            </span>
          </h1>
          <p className='font-'>
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