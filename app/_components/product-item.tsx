import { useEffect, useState } from 'react'
import Image from 'next/image'

import { useCartContext } from '@/app/_context/cart.context'

import { useToast } from '@/shadcn/ui/use-toast'
import { Button } from '@/shadcn/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shadcn/ui/card'
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
  const [variant, setVariant] = useState<number | null>(0)
  const { toast } = useToast()

  const hasMultipleVariants = product.variants.length > 1

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
      image: product.image?.src.toString(),
      title: product.title,
      quantity
    }

    return lineItem
  }

  function handleAddToCart() {
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

  useEffect(() => {
    console.log('quantity changed: ', quantity)
  }, [quantity])

  useEffect(() => {
    console.log('cartContent changed: ', cartContent)
  }, [cartContent])

  useEffect(() => {
    console.log('variant changed: ', variant)
  }, [variant])

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
      <CardHeader>
        <CardTitle className='text-lg font-bold'>
          {product.title}
        </CardTitle>
      </CardHeader>
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
