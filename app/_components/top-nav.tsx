import Link from 'next/link'
import {
  SignedIn,
  UserButton
} from '@clerk/nextjs'

export const TopNav = () => {
  return (
    <nav className='TOP_NAV flex items-center justify-between z-50 text-white bg-brand h-min w-full fixed inset-0 p-sm flex'>
      <Link href={'/'} className='font-bold'>
        <img src='/images/soc-logo__white-text.png' alt='logo' className='w-[8vw] h-auto' /> 
      </Link>
      <SignedIn>
        <UserButton className='px-md py-xs font-bold text-black bg-white rounded-md' />
      </SignedIn>
    </nav>
  )
}
