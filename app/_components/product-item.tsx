import * as React from 'react'

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
import Image from 'next/image'

export function ProductItem({
  product
}: {
  product: IProductItem
}) {
  const hasMultipleVariants = product.variants.length > 1

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
                <Select>
                  <SelectTrigger id='variant'>
                    <SelectValue placeholder='Select' />
                  </SelectTrigger>
                  <SelectContent position='popper'>
                    {product.variants.map(
                      (variant: IProductVariant) => {
                        return (
                          <SelectItem
                            value={variant.title.toString()}
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
            type='number'
            min={1}
          />
          <Label htmlFor='name'>Quantity</Label>
        </div>
        <Button variant={'default'}>Add</Button>
      </CardFooter>
    </Card>
  )
}
