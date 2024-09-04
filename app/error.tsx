'use client';

import { useEffect } from 'react'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <div className='flex flex-col items-center justify-center mt-xl p-md bg-orange-500/10 text-orange-700'>
      <h2 className='text-center'>Something went wrong!</h2>
      <button
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
