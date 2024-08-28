import { ProductCategoryList } from '@/components/product-category-list'

export default async function OrderPage() {
  return (
    <>
      <h1 className='text-4xl'>
        <span className='font-bold'>Standing O Cosmetics: </span>
        <span className='font-light'>
          {' '}
          Stage Ready Order Form
        </span>
      </h1>
      <p className='text-lg text-left lg:text-center w'>
        Welcome Stage Ready customer! To get started, select from
        the products below. When you&#39;re ready to submit your
        order, click the submit button. Your order will be saved,
        and we will contact you for confirmation after applying
        your program discount.
      </p>
      <ProductCategoryList />
    </>
  )
}
