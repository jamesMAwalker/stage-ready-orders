'use client'

import { ShoppingCartIcon } from 'lucide-react'

import { useCartContext } from '../_context/cart.context'
import { BadgeItem } from './cart-badge'
import { CartMenu } from './cart-menu'

export const MenuFooter = () => {
  const { cartContent } = useCartContext()

  const totalQauntity = cartContent?.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)

  return (
    <div className='MENU_FOOTER flex items-center justify-between gap-md fixed border-t border-neutral-400 bottom-0 bg-neutral-50 w-full p-ms lg:p-md'>
      <CartMenu />
      {cartContent && cartContent?.length > 0 && (
        <BadgeItem classes='flex-c gap-sm border-green-500 rounded-md'>
          <ShoppingCartIcon />
          <span>▪</span>
          <span>
            {totalQauntity} Item
            {Number(totalQauntity) > 1 ? 's' : ''}
          </span>
        </BadgeItem>
      )}
    </div>
  )
}
