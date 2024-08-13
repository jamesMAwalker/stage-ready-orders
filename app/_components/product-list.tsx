'use client'

import { Card } from '@/shadcn/ui/card'
import { useEffect, useState } from 'react'
import { ProductItem } from './product-item'

export const ProductList = () => {
  const [products, setProducts] = useState<IProductItem[] | []>(
    []
  )

  useEffect(() => {
    async function getProducts() {
      const res = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()
      console.log('🚀 ~ getProducts ~ data:', data)

      const activeProducts = data.products.filter(
        (p: IProductItem) => p.status === 'active'
      )

      setProducts(activeProducts)
    }
    getProducts()
  }, [])

  return (
    <section className='flex-col-tl gap-md full p-md rounded-md'>
      <h2 className='text-2xl font-bold'>ProductList</h2>
      <div className='grid grid-cols-3 gap-md auto-rows-auto w-full'>
        {products?.map((product: IProductItem) => {
          return (
            <ProductItem
              key={`${product.id}`}
              product={product}
            />
          )
        })}
      </div>
    </section>
  )
}
