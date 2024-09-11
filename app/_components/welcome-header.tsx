import React from 'react'

export const WelcomeHeader = () => {
  return (
    <>
      <div className='w-full lg:scale-50 flex flex-col lg:flex-row items-center justify-center gap-sm'>
        <span className='flex-c h-[4vh] lg:h-[40px]'>
          <img
            src='/images/soc-logo.png'
            alt='logo'
            className='scale-110'
          />
        </span>
        <span className='flex-c w-1/2 lg:w-[175px] h-auto'>
          <img
            src='/images/shopify-logo.png'
            alt='logo'
            className='h-auto w-auto lg:h-[5vh]'
          />
        </span>
      </div>
      <h1 className='HEADER_CONTAINER flex-col-c uppercase gap-ms text-center'>
        <span className='text-sm lg:text-md'>Welcome To</span>
        <span className='text-xl lg:text-2xl font-bold'>
          Stage Ready Orders
        </span>
        <span className='uppercase text-sm tracking-widest'>
          By Standing O Cosmetics
        </span>
      </h1>
    </>
  )
}
