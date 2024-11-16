'use client'

import React, { useEffect, useState } from 'react'

import { ProductList } from '@/app/_components/product-list'
import { getProductCategoryFromLS } from '@/app/_context/helpers/get-product-category-LS'
import { useProductContext } from '@/app/_context/product.context'
import Link from 'next/link'
import { useShopifyStatusContext } from '@/app/_context/shopify-status.context'
import { useCustomerContext } from '@/app/_context/customer.context'
import { useCartContext } from '@/app/_context/cart.context'
import { useErrorContext } from '@/app/_context/errors.context'
import LoadingPage from '@/app/loading'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'

const ProductCategoryPage = ({
  params
}: {
  params: { category: string }
}) => {
  const { form, email, clerkError } = useShopifyStatusContext()
  const { customer } = useCustomerContext()
  const { cartContent } = useCartContext()
  const { error } = useErrorContext()
  const { product } = useProductContext()

  const [productCategory, setProductCategory] =
    useState<IProductCategory | null>(null)

  const { isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in') // Use router.push for navigation inside an effect
    }
  }, [isSignedIn, router])

  useEffect(() => {
    if (product.status.success) {
      const categoryData = getProductCategoryFromLS(
        params.category
      )

      if (categoryData) {
        setProductCategory(categoryData)
      }
    }
  }, [params.category, product.status.success])

  return (
    <div className='pt-xl full flex-col-tl gap-md'>
      <div className='PAGE_HEADER flex flex-col-reverse items-start justify-start lg:flex-row lg:justify-between lg:items-center w-full gap-md'>
        <h1 className='text-4xl font-bold'>
          {productCategory?.title} Collection
        </h1>
        <Link
          href={'/orders'}
          className='text-sm text-muted-foreground hover:text-brand'
        >
          Back to product categories &nbsp; →
        </Link>
      </div>
      {productCategory && (
        <ProductList products={productCategory.products} />
      )}
    </div>
  )
}

export default ProductCategoryPage
