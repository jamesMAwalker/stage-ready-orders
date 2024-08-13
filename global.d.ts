declare interface IProductItem {
  id: Number
  title: String
  body_html: String
  vendor: String
  product_type: String
  created_at: String
  handle: String
  updated_at: String
  published_at: String
  template_suffix: String | ''
  published_scope: String
  tags: String
  status: String
  admin_graphql_api_id: String
  variants: IProductVariant[]
  options: IProductOption[]
  images: IProductImage[]
  image: IProductImage
}

declare interface IProductVariant {
  product_id: Number
  id: Number
  title: String
  price: String
  position: Number
  inventory_policy: String
  compare_at_price: String | null
  option1: String
  option2: String| null
  option3: String| null
  created_at: String
  updated_at: String
  taxable: Boolean
  barcode: String | ''
  fulfillment_service: String
  grams: Number
  inventory_management: String
  requires_shipping: Boolean
  sku: String| ''
  weight: Number
  weight_unit: String
  inventory_item_id: Number
  inventory_quantity: Number
  old_inventory_quantity: Number
  admin_graphql_api_id: String
  image_id: String| null
}

declare interface IProductOption {
  product_id: Number
  id: Number
  name: String
  position: Number
  values: String[]
}

declare interface IProductImage {
  id: Number
  alt: String
  position: Number
  product_id: Number
  created_at: String
  updated_at: String
  admin_graphql_api_id: String
  width: Number
  height: Number
  src: String
  variant_ids: String[]
}