import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind
} from '@react-email/components'

import { global, track } from './styles'

interface IOwnerEmail {
  customerName: string
  orderId: string
  orderDate: string
  lineItems: any[]
}

export const OwnerEmail = ({
  customerName,
  orderId,
  orderDate,
  lineItems
}: IOwnerEmail) => {
  const previewText = `New Order from: "${customerName}" on Stage Ready App!`

  const orderTotal = lineItems.reduce((acc, item) => {
    return acc + item.quantity * Number(item.price)
  }, 0)

  const parsedDate = new Date(orderDate)
  const formattedOrderDate = parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans px-2'>
          <Container className='border border-solid border-[#eaeaea] rounded my-[40px] mx-auto  max-w-[465px]'>
            <Section className='bg-black'>
              <Img
                src={`https://cdn.shopify.com/s/files/1/0590/7300/3681/files/StandingOCosmetics_Final_WhiteOnBlack.png?v=1629420769`}
                width='100'
                alt='Vercel'
                className='my-0 mx-auto'
              />
            </Section>
            <Heading className='text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0'>
              <span>
                We Have A New <br /> Stage Ready Order!
              </span>
            </Heading>
            <Text className='text-center text-black text-[14px] leading-[24px]'>
              Hello Standing O!
            </Text>
            <Text className='text-center px-[40px] text-black text-[14px] leading-[24px]'>
              <strong>{customerName}</strong> has placed an order
              via the <br /> Stage Ready app. Click the button
              below to take action on this order.
            </Text>
            <Section className='text-center mt-[32px] mb-[32px]'>
              <Button
                className='bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3'
                href={`https://admin.shopify.com/store/standing-o-cosmetics/draft_orders/${orderId}`}
              >
                View Order
              </Button>
            </Section>
            <Hr className='border border-solid border-[#eaeaea] my-[26px] mx-0 w-full' />
            <Section style={global.defaultPadding}>
              <Text className='text-lg font-bold mb-4 text-center'>
                Order Preview
              </Text>
              <Row
                style={{
                  display: 'inline-flex w-full'
                }}
              >
                <Column
                  className='ORDER_BLOCK display-block bg-black/5 m-[10px] p-[10px] border-solid !border !border-black/10 rounded-md'
                  style={{ width: '50%' }}
                >
                  <Text style={global.paragraphWithBold}>
                    Customer
                  </Text>
                  <Text style={track.number}>
                    {customerName}
                  </Text>
                </Column>
                <Column
                  className='ORDER_BLOCK display-block bg-black/5 m-[10px] p-[10px] border-solid !border !border-black/10 rounded-md'
                  style={{ width: '50%' }}
                >
                  <Text style={global.paragraphWithBold}>
                    Order Date
                  </Text>
                  <Text style={track.number}>{formattedOrderDate}</Text>
                </Column>
              </Row>
              <Row
                style={{
                  display: 'inline-flex w-full',
                  marginBottom: 40
                }}
              >
                <Column
                  className='ORDER_BLOCK bg-black/5 display-block m-[10px] p-[10px] border-solid !border !border-black/10 rounded-md'
                  style={{ width: '50%' }}
                >
                  <Text style={global.paragraphWithBold}>
                    Order ID
                  </Text>
                  <Text style={track.number}>{orderId}</Text>
                </Column>
                <Column
                  className='ORDER_BLOCK bg-green-500/20 text-green-700 display-block m-[10px] p-[10px] border-solid !border !border-black/10 rounded-md'
                  style={{ width: '50%' }}
                >
                  <Text style={global.paragraphWithBold}>
                    Order Total
                  </Text>
                  <Text style={track.number}>${orderTotal}.00</Text>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

OwnerEmail.PreviewProps = {
  customerName: 'James Walker',
  orderId: '1045347991713',
  orderDate: 'Sep, 7th, 2024',
  lineItems: []
} as IOwnerEmail

export default OwnerEmail
