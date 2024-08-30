'use client'

import React from 'react'
import { useAuth } from '@clerk/clerk-react'
import { CircleUserRoundIcon } from 'lucide-react'

import { useCustomerContext } from '../_context/customer.context'

import { Button } from '@/shadcn/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shadcn/ui/popover'
import { Badge } from '@/shadcn/ui/badge'
import { checkStageReady } from '@/helpers/check-stage-ready'

export const UserButton = () => {
  const { signOut } = useAuth()
  const { customer } = useCustomerContext()

  const isStageReady = checkStageReady(customer)

  return (
    <Popover>
      <PopoverTrigger asChild>
        {customer && (
          <Button
            variant={'secondary'}
            className='flex-c gap-sm'
          >
            <CircleUserRoundIcon />
            {customer.first_name}
            &nbsp;
            {customer.last_name}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='MODAL_CONTENT flex-col-c gap-ms'>
          <div className='full space-y-2'>
            <h4 className='flex-tl !items-center gap-sm font-medium leading-none'>
              Your Account
              {isStageReady && (
                <Badge className='border-green-500 text-green-500 bg-transparent !rounded-md !p-xs'>
                  Stage Ready
                </Badge>
              )}
            </h4>
            {customer && (
              <p className='text-sm text-muted-foreground'>
                {customer.email}
              </p>
            )}
          </div>
          <div className='flex-tl w-full'>
            <div className='w-full flex-c items-center gap-4'>
              <Button variant={'outline'} className='w-full'>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
