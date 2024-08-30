import { useState } from 'react'
import Image from 'next/image'

import { useCartContext } from '@/app/_context/cart.context'

import { useToast } from '@/shadcn/ui/use-toast'
import { Button } from '@/shadcn/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shadcn/ui/card'
import { Skeleton } from '@/shadcn/ui/skeleton'
import { Input } from '@/shadcn/ui/input'
import { Label } from '@/shadcn/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shadcn/ui/select'

export function ProductItem({
  product
}: {
  product: IProductItem
}) {
  const { cartContent, setCartContent } = useCartContext()
  const [quantity, setQuantity] = useState(1)
  const [variant, setVariant] = useState<number>(0)
  const { toast } = useToast()

  const hasMultipleVariants = product.variants.length > 1
  const price = product.variants[variant].price

  function createLineItem({
    product,
    quantity,
    variant
  }: {
    product: IProductItem
    quantity: number
    variant: number
  }) {
    const lineItem: ILineItem = {
      product_id: product.id.toString(),
      variant_id: product.variants[variant].id.toString(),
      custom: true,
      price: product.variants[variant].price,
      image: product.image?.src,
      title: product.title,
      quantity
    }

    return lineItem
  }

  function handleAddToCart() {
    // Update Quantity
    const itemInCart = cartContent?.find(
      (item: ILineItem) =>
        item.product_id === product.id.toString()
    )

    if (itemInCart && cartContent?.length) {
      itemInCart.quantity += 1
      setCartContent([...cartContent])

      toast({
        title: 'Quantity Updated!',
        description: `${itemInCart.title} × ${itemInCart.quantity}`
      })

      return
    }

    // New Item
    const newLIneItem: ILineItem = createLineItem({
      product,
      quantity,
      variant: variant || 0
    })

    const prevCart = cartContent ?? []

    const newCartContent = [...prevCart, newLIneItem]
    setCartContent(newCartContent)
    toast({
      title: 'Item Added!',
      description: `${newLIneItem.title}`
    })
  }

  return (
    <Card className='flex-col-tl w-full h-auto rounded-md border-none bg-slate-200 p-ms gap-ms'>
      <div className='IMG_WRAP rounded-md overflow-clip relative w-full aspect-square'>
        <Image
          src={
            product.image?.src.toString() ??
            '/images/lipstick-placeholder.png'
          }
          alt={
            product.image?.alt.toString() ??
            'product placeholder'
          }
          className='st_image aspect-square'
          fill
        />
      </div>
      <div className='HEADER_WRAP flex-col-tl py-sm gap-sm'>
        <CardHeader className='p-0'>
          <CardTitle className='text-lg font-bold'>
            {product.title}
          </CardTitle>
        </CardHeader>
        <p className='PRICE text-neutral-500 font-bold'>
          ${price}
        </p>
      </div>
      {hasMultipleVariants && (
        <CardContent>
          <form>
            <div className='FORM_INNER grid w-full items-center gap-4'>
              <div className='flex items-center justify-start  space-y-1.5'>
                <Label htmlFor='framework'>
                  Product Variant
                </Label>
                <Select
                  onValueChange={(value) =>
                    setVariant(Number(value))
                  }
                >
                  <SelectTrigger id='variant'>
                    <SelectValue placeholder='Select' />
                  </SelectTrigger>
                  <SelectContent position='popper'>
                    {product.variants.map(
                      (
                        variant: IProductVariant,
                        idx: number
                      ) => {
                        return (
                          <SelectItem
                            value={idx.toString()}
                            key={variant.id.toString()}
                          >
                            {variant.title}
                          </SelectItem>
                        )
                      }
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
      )}
      <CardFooter className='flex mt-auto w-full p-sm pt-sm rounded-md items-center bg-slate-300 justify-between'>
        <div className='flex items-center  gap-sm'>
          <Input
            id='name'
            className='w-[5ch] px-2'
            placeholder='1'
            value={quantity}
            onChange={(e) => {
              setQuantity(Number(e.target.value))
            }}
            type='number'
            min={1}
          />
          <Label htmlFor='name'>Quantity</Label>
        </div>
        <Button onClick={handleAddToCart} variant={'default'}>
          Add
        </Button>
      </CardFooter>
    </Card>
  )
}

ProductItem.Skeleton = function ProductItemSkeleton() {
  return (
    <div className='ITEM_SKELETON flex flex-col w-full h-auto'>
      <Skeleton className='h-[250px] w-full rounded-md' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
    </div>
  )
}
