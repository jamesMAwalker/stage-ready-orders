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

function updateCartLS(cartContent: ILineItem[] | null = null) {
  localStorage.setItem(CART_LS_KEY, JSON.stringify(cartContent))
}

function checkLSforCart(setCartContent: any) {
  const cart = localStorage.getItem(CART_LS_KEY)

  setCartContent((prv: any) => {
    if (!!cart) return prv;
    return JSON.parse(cart ?? '{}')
  })
}

export function CartProvider({
  children
}: {
  children: ReactNode
}) {
  const [cartContent, setCartContent] = useState<
    ILineItem[] | null
  >(null)

  useEffect(() => {
    checkLSforCart(setCartContent)
  }, [])

  useEffect(() => {
    if (cartContent !== null) {
      updateCartLS(cartContent)
    }
  }, [cartContent])

  // const value = useMemo(
  //   () => ({
  //     cartContent,
  //     setCartContent
  //   }),
  //   [cartContent]
  // )
  const value = { cartContent, setCartContent }

  return (
    <CartState.Provider value={value}>
      {children}
    </CartState.Provider>
  )
}
