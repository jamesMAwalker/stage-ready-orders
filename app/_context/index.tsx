import { ReactNode } from 'react'
import { CartProvider } from './cart.context'
import { CustomerProvider } from './customer.context'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <CustomerProvider>
      <CartProvider>{children}</CartProvider>
    </CustomerProvider>
  )
}
