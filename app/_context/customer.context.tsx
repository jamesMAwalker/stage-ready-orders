'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useUser } from '@clerk/clerk-react'

const CustomerState = createContext<{
  customer: any | null
} | null>(null)

export function useCustomerContext() {
  const context = useContext(CustomerState)
  if (context === null) {
    throw new Error(
      'useCustomer must be used within a customerProvider'
    )
  }

  return context
}

export function CustomerProvider({
  children
}: {
  children: ReactNode
}) {
  const { isSignedIn, user, isLoaded } = useUser()
  const [customer, setCustomer] = useState<any | null>(null)
  
  useEffect(() => {
    if (isSignedIn && isLoaded) {
      const email =
        user?.primaryEmailAddress?.emailAddress ||
        user.emailAddresses[0].emailAddress

      {
        ;(async () => {
          try {
            const res = await fetch('/api/customers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email
              })
            })
            const data = await res.json()

            setCustomer(data.shopify_customer)
          } catch (error: any) {
            console.log('🚀 ~ ; ~ error:', error)
          }
        })()
      }
    }
  }, [isSignedIn, isLoaded])

   const value = useMemo(
     () => ({
       customer,
       setCustomer
     }),
     [customer, setCustomer]
   )

  return (
    <CustomerState.Provider value={value}>
      {children}
    </CustomerState.Provider>
  )
}
