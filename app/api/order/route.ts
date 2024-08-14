import { NextResponse } from "next/server"

const storeUrl = process.env.SHOPIFY_STORE_DOMAIN
const password = process.env.SHOPIFY_ADMIN_API_PASSWORD as string

export async function POST(req: Request) {
  const { order } = await req.json()
  console.log("🚀 ~ POST ~ order:", order)

  
  const res = await fetch(`https://${storeUrl}/admin/api/2024-01/draft_orders.json`, {
    method: "POST",
    headers: {
      'X-Shopify-Access-Token': password,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      draft_order: order
    })
  })

  const data = await res.json()
  console.log('🚀 ~ POST ~ data:', data)
  
  return NextResponse.json({
    status: 200,
    message: 'Testing!'
  })
}