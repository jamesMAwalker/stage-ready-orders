'use client';

import { ProductCategoryList } from '@/components/product-category-list'
import { useUser } from '@clerk/clerk-react'
import { redirect, useRouter } from 'next/navigation'
import { useEffect } from 'react';

export default function OrderPage() {
  const { isSignedIn } = useUser()

  const router = useRouter()

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in') // Use router.push for navigation inside an effect
    }
  }, [isSignedIn, router])

  return (
    <>
      <h1 className='flex-col-c text-2xl mt-lg text-center'>
        <span className='font-bold text-center'>Standing O Cosmetics</span>
        <span className='font-light'>
          {' '}
          Stage Ready Order Form
        </span>
      </h1>
      <p className='text-lg text-center lg:text-center w'>
        Welcome Stage Ready customer! To get started, select from
        the products below. When you&#39;re ready to submit your
        order, click the submit button. Your order will be saved,
        and we will contact you for confirmation after applying
        your program discount.
      </p>
      <ProductCategoryList />
    </>
  )
}
