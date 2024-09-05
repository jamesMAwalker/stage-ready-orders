// @ts-nocheck

'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import { set, useForm } from 'react-hook-form'
import { z } from 'zod'
import { LoaderIcon } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'

import { cn } from '@/shadcn/utils'
import { Button } from '@/shadcn/ui/button'
import { Loader } from '@/components/loader'
import { Input } from '@/shadcn/ui/input'
import { Separator } from '@/shadcn/ui/separator'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shadcn/ui/form'

import { animate } from '@/animation'
import { WelcomeHeader } from './_components/welcome-header'

export default function Home() {
  const { isSignedIn } = useUser()

  if (isSignedIn) {
    redirect('/orders')
  }

  return (
    <>
      <div className='HOME_PAGE_WRAP  w-full lg:w-1/2 h-[80vh] flex-col-c gap-md'> 
        <WelcomeHeader />
        <p className='text-center w-full'>
          Welcome to Stage Ready Orders! You can use this site to
          place orders for your team or studio. Click the button
          below to get started.
        </p>
        <Link href={'/sign-up'} className='w-full'>
          <Button className='w-full'>Get Started</Button>
        </Link>
        <Link href={'/sign-in'} className='w-full'>
          <Button className='w-full border bg-transparent border-brand hover:text-white hover:bg-brand text-brand' variant='outline'>Sign In</Button>
        </Link>
      </div>
    </>
  )
}
