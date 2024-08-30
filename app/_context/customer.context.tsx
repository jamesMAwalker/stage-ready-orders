'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { redirect } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'
import { useClerk } from '@clerk/nextjs'

import { useToast } from '@/shadcn/ui/use-toast'
import { useErrorContext } from './errors.context'
import { ELoginErrors } from '@/enums'

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
  const { toast } = useToast()
  const { signOut } = useClerk()
  const { setError } = useErrorContext()

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
            // attempt to get customer from Shopify
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

            // handle login errors
            if (!data.shopify_customer) {
              const errorData = ELoginErrors[data.code as string]
              setError(errorData)

              toast({
                variant: 'destructive',
                title: errorData.title,
                description: errorData.message
              })

              setTimeout(() => {
                redirect('/sign-in')
              }, 5000)

              return;
            }

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
