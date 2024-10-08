import { PRODUCT_LS_KEY } from "./_keys"

export function getProductCategoryFromLS(categoryName: string) {
  const products = localStorage.getItem(PRODUCT_LS_KEY)
  if (products) {
    const parsedProducts = JSON.parse(products)
    const thisCategory = parsedProducts.find((category: IProductCategory) => {
      return category.id === categoryName;
    })
    return thisCategory;
  }
}