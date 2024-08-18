'use client'

import { useEffect } from 'react'

export const useGetCategorizedProducts = ({
  productsSetter
}: {
  productsSetter: any 
}) => {

  useEffect(() => {
    async function getProducts() {
      const res = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()

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

      const activeProductsByCategory = Object.entries(
        productCategories
      ).map(([_, { title, image, products }]) => {
        return {
          title,
          image,
          products: products.filter((p) => p.status === 'active')
        }
      })

      productsSetter(activeProductsByCategory)
    }
    getProducts()
  }, [])
}
