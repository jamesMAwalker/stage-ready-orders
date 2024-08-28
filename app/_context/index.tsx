'use client'

import { ReactNode } from 'react'
import { CartProvider } from './cart.context'
import { CustomerProvider } from './customer.context'
import { ProductProvider } from './product.context'
import { ClerkProvider } from '@clerk/nextjs'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

export const Providers = ({
  children
}: {
  children: ReactNode
}) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ClerkProvider>
        <CustomerProvider>
          <CartProvider>
            <ProductProvider>{children}</ProductProvider>
          </CartProvider>
        </CustomerProvider>
      </ClerkProvider>
    </QueryClientProvider>
  )
}
