'use client'

import { useCustomerContext } from '../_context/customer.context'
import { useCartContext } from '../_context/cart.context'

import { Button } from '@/shadcn/ui/button'
import { Label } from '@/shadcn/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/shadcn/ui/sheet'

export function CartMenu() {
  const { customer } = useCustomerContext()
  const { cartContent } = useCartContext()
  
  function createDraftOrder({
    customerData,
    currentCart
  }: {
    customerData: ICustomer
    currentCart: ILineItem[]
  }) {
    const order = {
      line_items: currentCart.map((item: ILineItem) => {
        return {
          variant_id: item.variant_id,
          quantity: item.quantity,
          price: item.price
        }
      }),
      ...customerData
    }

    return order
  }

  async function handleSumbit() {
    if (customer && cartContent) {
      const order = createDraftOrder({
        customerData: customer,
        currentCart: cartContent
      })

      console.log('🚀 ~ handleSumbit ~ order:', order)

      const res = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order: order
        })
      })

      const data = await res.json()
      console.log('🚀 ~ handleSumbit ~ data:', data)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='default'>Review Order</Button>
      </SheetTrigger>
      <SheetContent className='flex-col-tl gap-md'>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            Make changes to your cart here. Click submit when
            you&#39;re ready to submit your order.
          </SheetDescription>
        </SheetHeader>
        {!!cartContent?.length && <div className='flex-col-tl max-h-[70vh] overflow-scroll divide-dashed divide-y-[.5px] divide-neutral-400 gap-sm p-sm bg-neutral-100 rounded-md w-full'>
          {cartContent?.map((item: ILineItem) => {
            return (
              <CartItem
                key={item.product_id.toString()}
                item={item}
              />
            )
          })}
        </div>}
        <SheetFooter className='w-full'>
          <SheetClose asChild>
            <Button
              type='submit'
              className='w-full'
              onClick={handleSumbit}
              disabled={!cartContent?.length}
            >
              {!cartContent?.length ? 'Add an Item to Submit' : 'Submit Order'} 
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

const CartItem = ({ item }: { item: ILineItem }) => {
  return (
    <div className='flex-col-tl pl-sm border-neutral-300 gap-sm w-full'>
      <Label
        htmlFor='name'
        className='py-sm text-right flex-tl gap-sm'
      >
        <span>{item.quantity}</span>
        <span>&times;</span>
        <span>{item.title}</span>
      </Label>
      <span className='font-bold text-neutral-500 text-sm'>
        ${item.price}
      </span>
    </div>
  )
}
