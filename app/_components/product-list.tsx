import { ProductItem } from './product-item'

export const ProductList = ({ products }: { products: IProductItem[] }) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-md auto-rows-auto w-full'>
      {products?.map((product: IProductItem) => {
        return (
          <ProductItem key={`${product.id}`} product={product} />
        )
      })}
    </div>
  )
}
