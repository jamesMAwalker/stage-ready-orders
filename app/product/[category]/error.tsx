'use client'

import { Button } from '@/shadcn/ui/button'
import { useEffect } from 'react'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='flex-col-c gap-md h-[80vh]'>
      <h2 className='font-bold text-4xl'>Error Loading Collection!</h2>
      <Button
        onClick={
          () => reset()
        }
      >
        Try again ↻
      </Button>
    </div>
  )
}
