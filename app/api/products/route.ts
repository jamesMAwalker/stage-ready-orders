import { NextResponse } from "next/server"

const storeUrl = process.env.SHOPIFY_STORE_DOMAIN
const password = process.env.SHOPIFY_ADMIN_API_PASSWORD as string

export async function GET() {
  const shopifyApiUrl = `https://${storeUrl}/admin/api/2023-01/products.json`

  try {
    const res = await fetch(shopifyApiUrl, {
      method: "GET",
      headers: {
        'X-Shopify-Access-Token':
          password,
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json()
    console.log("🚀 ~ GET ~ data:", data)

    return NextResponse.json({ status: 200, ...data })

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message })
  }

}