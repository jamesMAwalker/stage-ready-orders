import { NextResponse } from 'next/server';
import { createClerkClient } from '@clerk/backend';
import { ELoginStatus } from '@/enums';

const secretKey = process.env.CLERK_SECRET_KEY

export async function POST(req: Request) {
  const { email } = await req.json()

  const clerkBE = createClerkClient({ secretKey })

  try {
    const res = await clerkBE.users.getUserList({
      emailAddress: [email!],
    })

    const isExistingUser = res.data.length > 0

    if (isExistingUser) {
      return NextResponse.json({
        status: 409,
        message: ELoginStatus.EXISTING_CLERK_ACCOUNT
      })
    } else {
      return NextResponse.json({
        status: 200,
        message: ELoginStatus.VALID_LOGIN,
      })
    }

  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: 'Server error!'
    })
  }
}