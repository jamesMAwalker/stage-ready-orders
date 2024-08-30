/**
 * * NOT IN USE *
 * This page is used to login with Auth.js which is currently a WIP.
 * Kept in place for future use.
 */

import { redirect } from 'next/navigation'

import { signIn } from '@/auth'
import { Button } from '@/shadcn/ui/button'

const LoginPage = () => {
  redirect('/') // temporarily using clerk over auth.js

  return (
    <div className='full flex-col-c gap-md'>
      <div className='shopify-logo w-[100px] mb-lg'>
        <img src='/shopify_logo_black.png' alt='Shopify logo' />
      </div>
      <form
        action={async () => {
          'use server'
          await signIn('shopify')
        }}
        className='SIGN_IN_FORM flex-col-c gap-md'
      >
        <h1 className='text-4xl font-bold'>
          Login with Shopify
        </h1>
        <Button
        >
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginPage
