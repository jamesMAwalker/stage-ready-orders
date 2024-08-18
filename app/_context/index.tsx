import { ReactNode } from 'react'
import { CartProvider } from './cart.context'
import { CustomerProvider } from './customer.context'
import { ProductProvider } from './product.context'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <CustomerProvider>
      <CartProvider>
        <ProductProvider>
          {children}
        </ProductProvider>
      </CartProvider>
    </CustomerProvider>
  )
}
