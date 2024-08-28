import { createCategories } from "./categorize-products"

export async function getProducts() {
  const res = await fetch('/api/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await res.json()

  const productCategories = createCategories(data.products)

  const activeProductsByCategory = Object.entries(
    productCategories
  ).map(([_, { id, title, image, products }]) => {
    return {
      id,
      title,
      image,
      products: products.filter((p) => p.status === 'active')
    }
  })

  return activeProductsByCategory;
}
