'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { CART_LS_KEY } from './helpers/_keys'

const CartState = createContext<{
  cartContent: ILineItem[] | null
  setCartContent: (arg: ILineItem[] | null) => void
} | null>(null)

export function useCartContext() {
  const context = useContext(CartState)
  if (context === null) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}

export function CartProvider({
  children
}: {
  children: ReactNode
}) {
  const [cartContent, setCartContent] = useState<
    ILineItem[] | null
  >(null)

  function checkLSforCart() {
    const cart = localStorage.getItem(CART_LS_KEY)
    if (cart) {
      setCartContent(JSON.parse(cart))
    }
  }

  function updateCartLS() {
    localStorage.setItem(CART_LS_KEY, JSON.stringify(cartContent))
  }

  useEffect(() => {
    checkLSforCart()
  }, [])

  useEffect(() => {
    if (cartContent !== null) {
      updateCartLS()
    }
  }, [cartContent])

  const value = useMemo(
    () => ({
      cartContent,
      setCartContent
    }),
    [cartContent, setCartContent]
  )

  return (
    <CartState.Provider value={value}>
      {children}
    </CartState.Provider>
  )
}
