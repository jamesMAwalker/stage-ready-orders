'use client'

import { useEffect, useState } from 'react'
import { TrashIcon } from 'lucide-react'

import { useCustomerContext } from '../_context/customer.context'
import { useCartContext } from '../_context/cart.context'
import { CART_LS_KEY } from '../_context/helpers/_keys'
import { createDraftOrder } from './helpers/create-draft-order'

import { useToast } from '@/shadcn/ui/use-toast'
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
  const { toast } = useToast()
  const { customer } = useCustomerContext()
  const { cartContent, setCartContent } = useCartContext()
  const [cartTotal, setCartTotal] = useState(0)

  async function handleSumbit() {
    if (customer && cartContent) {
      const order = createDraftOrder({
        customerData: customer,
        currentCart: cartContent
      })

      toast({ title: 'Submitting...' })

      // Submit order to Shopify
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

      // Clear cart
      if (data.status === 200) {
        window.localStorage.setItem(CART_LS_KEY, '[]')
        setCartContent(null)
        toast({
          title: 'Order Submitted!',
          description: 'We will email confirmation.'
        })
      }

      // Extract order data for email template
      const {
        name: orderId,
        email,
        customer: shopifyCustomer,
        billing_address,
        line_items,
        created_at
      } = data.data.draft_order

      // Map images from cart to line items
      const itemsWithImages = line_items.map(
        (item: ILineItem) => {
          return {
            ...item,
            image: cartContent.find(
              (curItem) =>
                curItem.product_id.toString() ===
                item.product_id.toString()
            )?.image
          }
        }
      )

      // Send confirmation email
      const emailRes = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: email,
          subject: `Order ${orderId} Confirmation`,
          customerName: `${shopifyCustomer.first_name} ${shopifyCustomer.last_name}`,
          customerAddress: billing_address,
          orderId,
          orderDate: created_at,
          lineItems: itemsWithImages
        })
      })
    }
  }

  useEffect(() => {
    if (!cartContent) return

    const total = cartContent?.reduce((acc, item) => {
      return acc + item.quantity * Number(item.price)
    }, 0)

    setCartTotal(Number(total))
  }, [cartContent])

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
        {!!cartContent?.length && (
          <div className='flex-col-tl max-h-[65vh] overflow-scroll divide-dashed divide-y-[.5px] divide-neutral-400 gap-sm p-sm bg-neutral-100 rounded-md w-full'>
            {cartContent?.map((item: ILineItem) => {
              return (
                <CartItem
                  key={item.product_id.toString()}
                  item={item}
                />
              )
            })}
          </div>
        )}
        {!!cartContent?.length && (
          <div className='TOTAL_PRICE w-full p-sm flex-col-tl bg-green-800/10 text-green-950 rounded-md'>
            Order Total: ${cartTotal}.00
          </div>
        )}
        <SheetFooter className='w-full'>
          <Button
            type='submit'
            className='w-full'
            onClick={handleSumbit}
            disabled={!cartContent?.length}
          >
            {!cartContent?.length
              ? 'Add an Item to Submit'
              : 'Submit Order'}
          </Button>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

const CartItem = ({ item }: { item: ILineItem }) => {
  const { setCartContent, cartContent } = useCartContext()

  function handleDeleteItem() {
    if (!cartContent) return

    const newCartContent = cartContent.filter(
      (curItem: ILineItem) => {
        return curItem.product_id !== item.product_id
      }
    )

    setCartContent(newCartContent)
  }

  function handleUpdateQuantity(crement: number, id: String) {
    if (!cartContent) return

    // Delete if quanity is 1
    if (crement === -1 && item.quantity <= 1) {
      handleDeleteItem()
      return
    }

    // No action if quantity is > 50
    if (crement === 1 && item.quantity >= 50) {
      return
    }

    const newCartContent = cartContent.map(
      (curItem: ILineItem) => {
        if (curItem.product_id === item.product_id) {
          return {
            ...item,
            quantity: item.quantity + crement
          }
        } else {
          return curItem
        }
      }
    )

    setCartContent(newCartContent)
  }

  return (
    <div className='flex-col-tl pl-sm border-neutral-300 gap-sm w-full'>
      <Label
        htmlFor='name'
        className='py-sm flex-col-tl text-right flex-tl gap-sm'
      >
        <p className='font-bold'>{item.title}</p>
        <div className='flex-c gap-sm'>
          <span
            className='cursor-pointer'
            onClick={() =>
              handleUpdateQuantity(1, item.product_id)
            }
          >
            +
          </span>
          <span>{item.quantity}</span>
          <span
            className='cursor-pointer'
            onClick={() =>
              handleUpdateQuantity(-1, item.product_id)
            }
          >
            -
          </span>
        </div>
      </Label>
      <div className='w-full flex-c justify-between font-bold text-neutral-500 text-sm'>
        <span>${Number(item.price) * item.quantity}</span>
        <TrashIcon
          onClick={() => handleDeleteItem()}
          className='text-destructive cursor-pointer hover:text-red-800'
        />
      </div>
    </div>
  )
}
