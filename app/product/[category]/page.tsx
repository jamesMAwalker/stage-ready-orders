'use client'

import React, { useEffect, useState } from 'react'

import { ProductList } from '@/app/_components/product-list'
import { getProductCategoryFromLS } from '@/app/_context/helpers/get-product-category-LS'
import { useProductContext } from '@/app/_context/product.context'
import Link from 'next/link'

const ProductCategoryPage = ({
  params
}: {
  params: { category: string }
}) => {
  const { product } = useProductContext()
  const [productCategory, setProductCategory] =
    useState<IProductCategory | null>(null)

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
      <div className='PAGE_HEADER flex justify-between items-center w-full gap-md'>
        <h1 className='text-4xl font-bold'>
          {productCategory?.title} Collection
        </h1>
        <Link
          href={'/product'}
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
