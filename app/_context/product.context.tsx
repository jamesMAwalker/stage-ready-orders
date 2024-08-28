'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { setProductsByCategoryLS } from './helpers/set-products-by-category-LS'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getProducts } from './helpers/get-products'
import { useCustomerContext } from './customer.context'

const ProductState = createContext<{
  product: {
    categories: IProductCategory[] | null
    status: {
      loading: boolean
      success: boolean
      error: boolean
    }
  }
} | null>(null)

export function useProductContext() {
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
  const queryClient = useQueryClient()
  const { customer } = useCustomerContext()
  const [product, setProduct] = useState<{
    categories: IProductCategory[] | null
    status: {
      loading: boolean
      success: boolean
      error: boolean
    }
  }>({
    categories: null,
    status: { loading: true, success: false, error: false }
  })

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })

  useEffect(() => {
    if (customer && isSuccess && data) {
      setProduct({
        categories: data,
        status: {
          loading: isLoading,
          success: isSuccess,
          error: isError
        }
      })
    }
  }, [customer, isSuccess, isLoading, data, isError])

  useEffect(() => {
    if (product.categories) {
      setProductsByCategoryLS(product.categories)
    }
  }, [product.categories])

  const value = useMemo(
    () => ({
      product
    }),
    [product]
  )

  return (
    <ProductState.Provider value={value}>
      {children}
    </ProductState.Provider>
  )
}
