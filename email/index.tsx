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
import * as React from 'react'

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
              // height='80'
              alt='Standing O Cosmetics logo'
              style={{ margin: 'auto' }}
            />
          </Row>
        </Section>
        <Hr style={global.hr} />
        <Section style={message}>
          <Heading style={global.heading}>
            Your Order is Confirmed!
          </Heading>
          <Text style={global.text}>
            Your order has been successfully submitted to
            <br /> Standing O Cosmetics.
          </Text>
          <Text style={{ ...global.text, marginTop: 24 }}>
            We will review your order and apply discounts based
            on your account status. Typical processing time is
            2-5 business days. We will send you an email with the
            tracking number once your order is confirmed.
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
              <Row>
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

const paddingX = {
  paddingLeft: '40px',
  paddingRight: '40px'
}

const paddingY = {
  paddingTop: '22px',
  paddingBottom: '22px'
}

const paragraph = {
  margin: '0',
  lineHeight: '2'
}

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY
  },
  paragraphWithBold: { ...paragraph, fontWeight: 'bold' },
  heading: {
    fontSize: '32px',
    lineHeight: '1.3',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: '-1px'
  } as React.CSSProperties,
  text: {
    ...paragraph,
    color: '#747474',
    fontWeight: '500'
  },
  button: {
    border: '1px solid #929292',
    fontSize: '16px',
    textDecoration: 'none',
    padding: '10px 0px',
    width: '220px',
    display: 'block',
    textAlign: 'center',
    fontWeight: 500,
    color: '#000'
  } as React.CSSProperties,
  hr: {
    borderColor: '#E5E5E5',
    margin: '0'
  }
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
}

const container = {
  margin: '10px auto',
  width: '600px',
  maxWidth: '100%',
  border: '1px solid #E5E5E5'
}

const track = {
  container: {
    padding: '22px 40px',
    backgroundColor: '#F7F7F7'
  },
  number: {
    margin: '12px 0 0 0',
    fontWeight: 500,
    lineHeight: '1.4',
    color: '#6F6F6F'
  }
}

const message = {
  padding: '40px 74px',
  textAlign: 'center'
} as React.CSSProperties

const adressTitle = {
  ...paragraph,
  fontSize: '15px',
  fontWeight: 'bold'
}

const recomendationsText = {
  margin: '0',
  fontSize: '15px',
  lineHeight: '1',
  paddingLeft: '10px',
  paddingRight: '10px'
}

const recomendations = {
  container: {
    padding: '20px 0'
  },
  product: {
    verticalAlign: 'top',
    textAlign: 'left' as const,
    paddingLeft: '2px',
    paddingRight: '2px'
  },
  title: {
    ...recomendationsText,
    paddingTop: '12px',
    fontWeight: '500'
  },
  text: {
    ...recomendationsText,
    paddingTop: '4px',
    color: '#747474'
  }
}

const menu = {
  container: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '20px',
    backgroundColor: '#F7F7F7'
  },
  content: {
    ...paddingY,
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  title: {
    paddingLeft: '20px',
    paddingRight: '20px',
    fontWeight: 'bold'
  },
  text: {
    fontSize: '13.5px',
    marginTop: 0,
    fontWeight: 500,
    color: '#000'
  },
  tel: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '32px',
    paddingBottom: '22px'
  }
}

const categories = {
  container: {
    width: '370px',
    margin: 'auto',
    paddingTop: '12px'
  },
  text: {
    fontWeight: '500',
    color: '#000'
  }
}

const footer = {
  policy: {
    width: '166px',
    margin: 'auto'
  },
  text: {
    margin: '0',
    color: '#AFAFAF',
    fontSize: '13px',
    textAlign: 'center'
  } as React.CSSProperties
}
