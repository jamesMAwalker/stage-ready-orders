import Link from 'next/link'

export const TopNav = () => {
  return (
    <nav className='TOP_NAV z-50 text-white bg-black h-min w-full fixed inset-0 p-ms flex'>
      <Link href={'/'} className='font-bold'>
        Standing O Cosmetics
      </Link>
    </nav>
  )
}
