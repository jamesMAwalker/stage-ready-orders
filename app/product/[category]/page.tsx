'use client'

import React, { useEffect, useState } from 'react'

import { ProductList } from '@/app/_components/product-list'
import { getProductCategoryFromLS } from '@/app/_context/helpers/get-product-category-LS'

const ProductCategoryPage = ({
  params
}: {
  params: { category: string }
}) => {
  const [productCategory, setProductCategory] = useState<IProductCategory | null>(null)
  
  
  useEffect(() => {
    const categoryData = getProductCategoryFromLS(
      params.category
    )
  
    if (categoryData) {
      setProductCategory(categoryData)
    }
  }, [params.category])
  

  return (
    <div className='pt-xl full flex-col-tl gap-md'>
      <h1 className='w-full text-4xl font-bold'>{productCategory?.title} Collection</h1>  
      {productCategory && (
        <ProductList
          products={productCategory.products}
        />
      )}
    </div>
  )
}

export default ProductCategoryPage
