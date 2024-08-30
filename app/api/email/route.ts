import { Resend } from 'resend'
import { NextResponse } from 'next/server';

import { InvoiceEmail } from '@/email/invoice';
import OwnerEmail from '@/email/owner';

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { 
    to,
    subject,
    customerName,
    customerAddress,
    shopifyOrderId,
    orderId,
    orderDate,
    lineItems 
  } = await request.json()

  try {
    await resend.emails.send({
      from: 'no-reply@stageready.standingocosmetics.com',
      to,
      subject,
      react: InvoiceEmail({
        customerName,
        customerAddress,
        orderId,
        orderDate,
        lineItems
      })
    })

    await resend.emails.send({
      from: 'stageready.orders@stageready.standingocosmetics.com',
      to: 'standingocosmetics@gmail.com',
      subject,
      react: OwnerEmail({
        customerName,
        orderId: shopifyOrderId,
        orderDate,
        lineItems,
      })
    })
 
    return NextResponse.json({
      status: 200,
      message: 'Email sent successfully!'
    })
    
  } catch (error) {
    
    NextResponse.json({
      status: 500,
      message: 'Error sending email!'
    })
  }

}