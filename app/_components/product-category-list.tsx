'use client'

import Link from 'next/link'

import { useProductContext } from '../_context/product.context'
import { Skeleton } from '@/shadcn/ui/skeleton'

export const ProductCategoryList = () => {
  const {
    product: { status, categories }
  } = useProductContext()

  if (status.error) {
    return (
      <div className='flex-col-c gap-md rounded-md w-full h-[400px] bg-red-500/10'>
        <h4 className='text-2xl text-red-900 italic font bold'>
          Error loading product categories!
        </h4>
        <p className='text-red-900'>
          Please reload your browser.
        </p>
      </div>
    )
  }

  return (
    <section className='flex-col-tl gap-md full lg:p-md rounded-md'>
      <h2 className='text-2xl font-bold'>Product Categories</h2>
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 auto-rows-auto gap-md'>
        {!categories?.length ? (
          <>
            {Array.from({ length: 8 }).map((_: any) => {
              return (
                <ProductCategoryCard.Skeleton
                  key={Math.random()}
                />
              )
            })}
          </>
        ) : (
          <>
            {categories?.map((category: IProductCategory) => {
              return (
                <ProductCategoryCard
                  category={category}
                  key={category.id as string}
                />
              )
            })}
          </>
        )}
      </div>
    </section>
  )
}

function ProductCategoryCard({
  category
}: {
  category: IProductCategory
}) {
  const { id, title, image, products } = category

  return (
    <Link
      className='CATEGORY_CARD group transition-all isolate w-full aspect-square relative flex-col-bl p-md rounded-lg overflow-clip'
      href={`/product/${id}`}
    >
      <div className='TEXT_WRAP flex-col-bl gap-ms z-20'>
        <span className='text-4xl transition-all group-hover:text-white text-slate-700 font-bold uppercase'>
          {title}
        </span>
        <span className='QUANTITY uppercase text-xl '>
          {products.length} ▪ products
        </span>
      </div>
      <div className='SHADE absolute transition-all bg-slate-300/50 group-hover:bg-slate-900/40 full inset-0 z-10' />
      <img
        src={image as string}
        alt={title as string}
        className='st_image center transition-all group-hover:translate-x-[-50%] group-hover:translate-y-[-50%] group-hover:scale-105'
      />
    </Link>
  )
}

ProductCategoryCard.Skeleton =
  function ProductCategoryCardSkeleton() {
    return (
      <div className='CATEGORY_SKELETON group transition-all isolate w-full aspect-square relative flex-col-bl p-md rounded-lg overflow-clip'>
        <div className='TEXT_WRAP flex-col-bl gap-ms z-20'>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[200px]' />
        </div>
        <Skeleton className='SHADE absolute transition-all bg-brand/40 full inset-0 z-10' />
        <Skeleton className='st_image center transition-all group-hover:translate-x-[-50%] group-hover:translate-y-[-50%] group-hover:scale-105' />
      </div>
    )
  }
