export function createDraftOrder({
  customerData,
  currentCart
}: {
  customerData: IShopifyCustomer
  currentCart: ILineItem[]
}) {
  const order = {
    line_items: currentCart.map((item: ILineItem) => {
      return {
        variant_id: item.variant_id,
        quantity: item.quantity,
        price: item.price
      }
    }),
    ...customerData
  }

  return order
}
