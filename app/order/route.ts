import { NextResponse } from "next/server"

export default async function GET() {
  const shopifyApiUrl = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2023-01/products.json`

  try {
    const res = await fetch(shopifyApiUrl, {
      method: "GET",
      headers: {
        'X-Shopify-Access-Token':
          process.env.SHOPIFY_ADMIN_API_PASSWORD as string,
        'Content-Type': 'application/json'
      }
    })

    const data = res.json()

    return NextResponse.json({ status: 200, ...data })

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message })
  }

}