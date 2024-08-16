'use client'

import { useCartContext } from '../_context/cart.context'
import { BadgeItem } from './cart-badge'
import { CartMenu } from './cart-menu'

export const MenuFooter = () => {
  const { cartContent } = useCartContext()

  return (
    <div className='MENU_FOOTER flex items-center justify-between gap-md fixed border-t border-neutral-400 bottom-0 bg-neutral-50 w-full p-md'>
      <CartMenu />
      {cartContent !== null && (
        <BadgeItem
          text={`Your Cart - ${cartContent?.length} Item${
            cartContent?.length > 1 ? 's' : ''
          }`}
        />
      )}
    </div>
  )
}
