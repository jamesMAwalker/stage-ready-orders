import { NextResponse } from "next/server"
import { ELoginErrors, ELoginStatus } from "@/enums"
import { checkStageReady } from "@/helpers/check-stage-ready"

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
    const isStageReady = checkStageReady(shopify_customer)

    if (!shopify_customer) {
      return NextResponse.json({
        status: 500,
        message: ELoginStatus.NOT_A_STAGE_READY_CUSTOMER
      })
    } else if (!isStageReady) {
      return NextResponse.json({
        status: 500,
        message: ELoginStatus.NOT_A_STAGE_READY_CUSTOMER
      })
    } else {
      return NextResponse.json({
        status: 200,
        message: ELoginStatus.VALID_LOGIN,
      })
    }

  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: 'Server error!'
    })
  }

}