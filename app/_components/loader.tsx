import React from 'react'

export const Loader = () => {
  return (
    <div className='flex-col-c w-full h-[80vh]'>
      <img
        src='/images/soc-logo.png'
        alt='logo'
        className='w-[10vw] h-auto animate-pulse'
      />
    </div>
  )
}
