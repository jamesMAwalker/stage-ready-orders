'use client'

import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import { CartProvider } from './cart.context'
import { CustomerProvider } from './customer.context'
import { ErrorProvider } from './errors.context'
import { ProductProvider } from './product.context'

export const Providers = ({
  children
}: {
  children: ReactNode
}) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ClerkProvider>
        <ErrorProvider>
          <CustomerProvider>
            <CartProvider>
              <ProductProvider>{children}</ProductProvider>
            </CartProvider>
          </CustomerProvider>
        </ErrorProvider>
      </ClerkProvider>
    </QueryClientProvider>
  )
}
