'use client'

import { ShoppingCartIcon } from 'lucide-react'

import { useCartContext } from '../_context/cart.context'
import { BadgeItem } from './cart-badge'
import { CartMenu } from './cart-menu'

export const MenuFooter = () => {
  const { cartContent } = useCartContext()

  return (
    <div className='MENU_FOOTER flex items-center justify-between gap-md fixed border-t border-neutral-400 bottom-0 bg-neutral-50 w-full p-ms lg:p-md'>
      <CartMenu />
      {cartContent !== null && (
        <BadgeItem classes='flex-c gap-sm'>
          <ShoppingCartIcon />
          <span>▪</span>
          <span>
            {cartContent?.length} Item
            {cartContent?.length > 1 ? 's' : ''}
          </span>
        </BadgeItem>
      )}
    </div>
  )
}
