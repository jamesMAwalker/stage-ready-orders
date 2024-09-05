'use client';

import { ProductCategoryList } from '@/components/product-category-list'
import { useUser } from '@clerk/clerk-react'
import { redirect } from 'next/navigation'

export default function OrderPage() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) {
    redirect('/sign-in')
  }

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
