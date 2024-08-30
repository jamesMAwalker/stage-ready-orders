'use client';

import { PRODUCT_LS_KEY } from "./_keys";


export function getProductCategoryFromLS(
  categoryName: string
) {
  const products = localStorage.getItem(PRODUCT_LS_KEY)
  if (products) {
    const parsedProducts = JSON.parse(products)

    if (!parsedProducts) return null;
    
    return parsedProducts.find(
      (cat: any) => cat.id === categoryName
    )
  } else {
    throw new Error('Products not found in local storage')
  }
}

