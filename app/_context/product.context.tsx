'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { useGetCategorizedProducts } from './hooks/useGetCategorizedProducts'
import { setProductsByCategoryLS } from './helpers/set-products-by-category-LS'
import { PRODUCT_LS_KEY } from './helpers/_keys'

const ProductState = createContext<{
  categorizedProducts: IProductItem[] | null
} | null>(null)

export function useCartContext() {
  const context = useContext(ProductState)
  if (context === null) {
    throw new Error(
      'useProductContext must be used within a ProductProvider'
    )
  }

  return context
}

export function ProductProvider({
  children
}: {
  children: ReactNode
}) {
  const [categorizedProducts, setCategorizedProducts] =
    useState<any>([])

  useGetCategorizedProducts({
    productsSetter: setCategorizedProducts
  })

  useEffect(() => {
    setProductsByCategoryLS(categorizedProducts)
  }, [categorizedProducts])

  const value = useMemo(
    () => ({
      categorizedProducts
    }),
    [categorizedProducts]
  )

  return (
    <ProductState.Provider value={value}>
      {children}
    </ProductState.Provider>
  )
}
