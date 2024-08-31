import Link from 'next/link'
import { SignedIn } from '@clerk/nextjs'

import { UserButton } from './user-button'

export const TopNav = () => {
  return (
    <nav className='TOP_NAV flex items-center justify-between z-50 text-white bg-brand h-min w-full fixed inset-0 p-sm flex'>
      <Link href={'/'} className='font-bold'>
        <img
          src='/images/soc-logo__white-text.png'
          alt='logo'
          className='w-[120px] lg:w-[8vw] h-auto mt-[-1vh]'
        />
      </Link>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  )
}
