'use client'

import { useEffect, useState } from 'react'
import { ProductItem } from './product-item'
import Link from 'next/link'

export const ProductCategoryList = () => {
  const [productCategories, setProductCategories] =
    useState<any>([])
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

      function createCategories(data: IProductItem[]) {
        const categories: {
          [key: string]: {
            image: string
            title: string
            products: IProductItem[]
          }
        } = {
          lips: {
            image: '/images/lips.png',
            title: 'Lips',
            products: []
          },
          lashes: {
            image: '/images/lashes.jpg',
            title: 'Lashes',
            products: []
          },
          eyeshadow: {
            image: '/images/eyeshadow.jpg',
            title: 'Eyeshadow',
            products: []
          },
          kits: {
            image: '/images/kits.jpg',
            title: 'Kits',
            products: []
          },
          lipDuo: {
            image: '/images/lipduo.webp',
            title: 'Lip & Liner Duo',
            products: []
          },
          accessories: {
            image: '/images/accessories.jpg',
            title: 'Accessories',
            products: []
          }
        }

        data.forEach((product: IProductItem) => {
          if (product.title.toLowerCase().includes('duo')) {
            // Filter Lip Duo
            categories.lipDuo.products.push(product)
          } else if (
            // Filter Lips
            product.title.toLowerCase().includes('lip') &&
            !product.title.toLowerCase().includes('duo')
          ) {
            categories.lips.products.push(product)
          } else if (
            // Filter Lashes
            product.title.toLowerCase().includes('lash') ||
            product.title.toLowerCase().includes('mascara')
          ) {
            categories.lashes.products.push(product)
          } else if (
            // Filter Eyeshadow
            product.title.toLowerCase().includes('shadow') ||
            product.title.toLowerCase().includes('palette')
          ) {
            categories.eyeshadow.products.push(product)
          } else if (
            // Filter Kits
            product.title.toLowerCase().includes('kit') &&
            !product.title.toLowerCase().includes('lash')
          ) {
            categories.kits.products.push(product)
          } else {
            // Filter Accessories
            categories.accessories.products.push(product)
          }
        })

        return categories
      }

      const productCategories = createCategories(data.products)
      console.log(
        '🚀 ~ getProducts ~ productCategories:',
        productCategories
      )

      const activeProductsByCategory = Object.entries(
        productCategories
      ).map(([_, { title, image, products }]) => {
        return {
          title,
          image,
          products: products.filter((p) => p.status === 'active')
        }
      })

      setProductCategories(activeProductsByCategory)
      console.log(
        '🚀 ~ activeProductsByCategory ~ activeProductsByCategory:',
        activeProductsByCategory
      )

      const activeProducts = data.products.filter(
        (p: IProductItem) => p.status === 'active'
      )

      setProducts(activeProducts)
    }
    getProducts()
  }, [])

  return (
    <section className='flex-col-tl gap-md full lg:p-md rounded-md'>
      <h2 className='text-2xl font-bold'>Product Categories</h2>
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 auto-rows-auto gap-md'>
        {productCategories.map(
          ({ title, image, products }: any) => {
            if (products.length === 0) return null;

            return (
              <Link
                className='CATEGORY_CARD group transition-all isolate w-full aspect-square relative flex-col-bl p-md rounded-lg overflow-clip'
                href={`/product/${title}`}
                key={title}
              >
                <div className='TEXT_WRAP flex-col-bl gap-ms z-20'>
                  <span className='text-4xl transition-all group-hover:text-white text-slate-700 font-bold uppercase'>
                    {title}
                  </span>
                  <span className='QUANTITY uppercase text-xl '>
                    {products.length} ▪ products
                  </span>
                </div>
                <div className='SHADE absolute transition-all bg-slate-300/50 group-hover:bg-slate-900/40 full inset-0 z-10' />
                <img
                  src={image}
                  alt={title}
                  className='st_image center transition-all group-hover:translate-x-[-50%] group-hover:translate-y-[-50%] group-hover:scale-105'
                />
              </Link>
            )
          }
        )}
      </div>
      
    </section>
  )
}
