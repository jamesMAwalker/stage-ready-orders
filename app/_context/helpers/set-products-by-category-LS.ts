import { PRODUCT_LS_KEY } from "./_keys"

export function setProductsByCategoryLS(categorizedProducts: any) {
  localStorage.setItem(
    PRODUCT_LS_KEY,
    JSON.stringify(categorizedProducts)
  )
}