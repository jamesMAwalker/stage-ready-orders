import { NextResponse } from "next/server"
import { ELoginErrors } from "@/enums"

const storeUrl = process.env.SHOPIFY_STORE_DOMAIN
const password = process.env.SHOPIFY_ADMIN_API_PASSWORD as string

export async function POST(req: Request) {
  const { email } = await req.json()
  
  try {
    const res = await fetch(`https://${storeUrl}/admin/api/2024-07/customers/search.json?query=email:${email}`, {
      method: "GET",
      headers: {
        'X-Shopify-Access-Token': password,
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json()

    const shopify_customer = data.customers[0]
    const isStageReady = ['STUDIOSTAGEREADY', 'TEAMSTAGEREADY', 'STUDIOOWNER', 'STUDIO OWNER'].some(tag => {
      return shopify_customer.tags.includes(tag)
    })

    if (!shopify_customer) {
      throw new Error(ELoginErrors.NOT_A_SHOPIFY_CUSTOMER.code)
    }

    if (!isStageReady) {
      throw new Error(ELoginErrors.NOT_A_STAGE_READY_CUSTOMER.code)
    }

    return NextResponse.json({
      status: 200,
      shopify_customer: data.customers[0]
    })
  } catch (error: any) {
    const errorObj = ELoginErrors[error.message as string]
    console.log("🚀 ~ POST ~ errorObj:", errorObj)

    return NextResponse.json({
      status: 500,
      ...errorObj
    })
  }

}