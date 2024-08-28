'use client'

import { ProductList } from '@/app/_components/product-list'
import { useGetProductCategoryFromLS } from '@/app/_context/hooks/useGetProductCategory'
import React from 'react'

const ProductCategoryPage = ({
  params
}: {
  params: { category: string }
}) => {
  const category = useGetProductCategoryFromLS(params.category)

  return (
    <div className='pt-xl full flex-col-tl gap-md'>
      <h1 className='w-full text-4xl font-bold'>{category?.title} Collection</h1>  
      <ProductList products={category?.products} />
    </div>
  )
}

export default ProductCategoryPage
