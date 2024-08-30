import * as React from 'react'
import {
  Body,
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
  Text
} from '@react-email/components'

import {
  paddingX,
  paddingY,
  paragraph,
  global,
  main,
  container,
  track,
  message,
  adressTitle,
  categories,
  footer
} from './styles'


const shopUrl = 'https://standingocosmetics.com'

interface IOrderEmailProps {
  customerName: string
  customerAddress: string
  orderId: string
  orderDate: string
  lineItems: any[]
}

export const InvoiceEmail = ({
  customerName,
  customerAddress,
  orderId,
  orderDate,
  lineItems
}: IOrderEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Get your order summary, estimated delivery date and more
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section
          style={{ ...track.container, background: '#000' }}
        >
          <Row>
            <Img
              src={`https://cdn.shopify.com/s/files/1/0590/7300/3681/files/StandingOCosmetics_Final_WhiteOnBlack.png?v=1629420769`}
              width='200'
              alt='Standing O Cosmetics logo'
              style={{ margin: 'auto' }}
            />
          </Row>
        </Section>
        <Hr style={global.hr} />
        <Section style={message}>
          <Heading style={global.heading}>
            Your Order Is Confirmed!
          </Heading>
          <Text style={global.text}>
            Your order has been successfully submitted to
            <br /> Standing O Cosmetics.
          </Text>
          <Text style={{ ...global.text, marginTop: 24 }}>
            We will review your order and apply discounts based
            on our wholesale pricing tier. Typical processing
            time is 2-5 business days. We will send you an email
            with the final invoice.
          </Text>
        </Section>
        <Hr style={global.hr} />
        <Section style={global.defaultPadding}>
          <Text style={adressTitle}>
            Customer Name: {customerName}
          </Text>
          {customerAddress && (
            <Text style={{ ...global.text, fontSize: 14 }}>
              Shipping to: {customerAddress}
            </Text>
          )}
        </Section>
        <Hr style={global.hr} />
        <Section
          style={{
            ...paddingX,
            paddingTop: '40px',
            paddingBottom: '40px'
          }}
        >
          {lineItems?.map((item: IProductItem, idx: number) => {
            const isFirst = idx === 0

            return (
              <Row key={item.id.toString()}>
                <Column
                  style={{
                    paddingTop: isFirst ? '0px' : '20px'
                  }}
                >
                  <Img
                    src={item.image as unknown as string}
                    alt={item.title as unknown as string}
                    style={{ float: 'left' }}
                    width='260px'
                  />
                </Column>
                <Column
                  style={{
                    verticalAlign: 'bottom',
                    paddingLeft: '12px'
                  }}
                >
                  <Text
                    style={{ ...paragraph, fontWeight: '500' }}
                  >
                    ${item.quantity.toString()} × {item.title}
                  </Text>
                  <Text style={{ ...paragraph }}>
                    ${Number(item.price) * Number(item.quantity)}
                    .00
                  </Text>
                </Column>
              </Row>
            )
          })}
          <Hr style={{ ...global.hr, marginTop: '20px' }} />
          <Row
            style={{
              display: 'inline-flex',
              width: '100%',
              marginBottom: 40
            }}
          >
            <Column align='left' style={{ width: '170px' }}>
              <Text>Order Total:</Text>
            </Column>
            <Column
              align='left'
              style={{ width: '170px' }}
            ></Column>
            <Column align='right' style={{ width: '170px' }}>
              <Text style={global.paragraphWithBold}>
                $
                {lineItems?.reduce((acc, item) => {
                  return (
                    acc +
                    Number(item.quantity) * Number(item.price)
                  )
                }, 0)}
                .00
              </Text>
            </Column>
          </Row>
        </Section>
        <Hr style={global.hr} />
        <Section style={global.defaultPadding}>
          <Row
            style={{ display: 'inline-flex', marginBottom: 40 }}
          >
            <Column style={{ width: '170px' }}>
              <Text style={global.paragraphWithBold}>
                Order Number
              </Text>
              <Text style={track.number}>{orderId}</Text>
            </Column>
            <Column>
              <Text style={global.paragraphWithBold}>
                Order Date
              </Text>
              <Text style={track.number}>{orderDate}</Text>
            </Column>
          </Row>
        </Section>
        <Hr style={global.hr} />
        <Hr style={global.hr} />
        <Hr style={global.hr} />
        <Section style={paddingY}>
          <Row>
            <Text style={global.heading}>
              standingocosmetics.com
            </Text>
          </Row>
          <Row style={categories.container}>
            <Column align='center'>
              <Link
                href={`${shopUrl}/collections/kit-collection`}
                style={categories.text}
              >
                Kits
              </Link>
            </Column>
            <Column align='center'>
              <Link
                href={`${shopUrl}/collections/matte-eyeshadow-palette/PALETTE`}
                style={categories.text}
              >
                Eyeshadow
              </Link>
            </Column>
            <Column align='center'>
              <Link
                href={`${shopUrl}/collections/eye-lashes-collection/lash`}
                style={categories.text}
              >
                Lashes
              </Link>
            </Column>
            <Column align='center'>
              <Link
                href={`${shopUrl}/collections/liquid-lipstick-liners`}
                style={categories.text}
              >
                Lips
              </Link>
            </Column>
          </Row>
        </Section>
        <Hr style={{ ...global.hr, marginTop: '12px' }} />
        <Section style={paddingY}>
          <Row>
            <Text style={footer.text}>
              © 2024 Standing O Cosmetics, Inc. All Rights
              Reserved.
            </Text>
          </Row>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default InvoiceEmail


