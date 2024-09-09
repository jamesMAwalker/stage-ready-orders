import React from 'react'

export const WelcomeHeader = () => {
  return (
    <>
      <div className='w-full flex flex-col lg:flex-row items-center justify-center mb-md gap-md '>
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
      <h1 className='HEADER_CONTAINER flex-col-c my-md uppercase gap-md text-center'>
        <span className='text-xl lg:text-2xl'>Welcome To</span>
        <span className='text-3xl lg:text-4xl font-bold'>
          Stage Ready Orders
        </span>
        <span className='uppercase'>
          By Standing O Cosmetics
        </span>
      </h1>
    </>
  )
}
