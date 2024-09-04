'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { set, useForm } from 'react-hook-form'

const ShopifyStatusState = createContext<{
  email: string | null
  setEmail: Dispatch<SetStateAction<string | null>>
  eligibilityStatus: ILoginStatus | null
  setEligibilityStatus: Dispatch<
    SetStateAction<ILoginStatus | null>
  >
  checkingAccountStatus: boolean
  setCheckingAccountStatus: Dispatch<SetStateAction<boolean>>
  form: any
  checkAccountStatus: (values: any) => any
} | null>(null)

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address'
  })
})

export function useShopifyStatusContext() {
  const context = useContext(ShopifyStatusState)
  if (context === null) {
    throw new Error(
      'useError must be used within an ShopifyStatusProvider'
    )
  }

  return context
}

export function ShopifyStatusProvider({
  children
}: {
  children: ReactNode
}) {
  const [email, setEmail] = useState<string | null>('')
  const [eligibilityStatus, setEligibilityStatus] =
    useState<ILoginStatus | null>(null)
  const [checkingAccountStatus, setCheckingAccountStatus] =
    useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email!
    }
  })

  async function checkAccountStatus(
    values: z.infer<typeof formSchema>
  ) {
    const res = await fetch('/api/account-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    })

    const data = await res.json()

    return data
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (email) {
        setCheckingAccountStatus(true)
        const isValid = formSchema.safeParse({ email }).success

        if (isValid) {
          {
            ;(async () => {
              const status = await checkAccountStatus({ email }) // Call function when typing has stopped and email is valid
              console.log('🚀 ~ ; ~ status:', status)
              setEligibilityStatus(status.message)
              setCheckingAccountStatus(false)
            })()
          }
        }
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [email, setEligibilityStatus])

  const value = useMemo(
    () => ({
      email,
      setEmail,
      eligibilityStatus,
      setEligibilityStatus,
      checkingAccountStatus,
      setCheckingAccountStatus,
      form,
      checkAccountStatus
    }),
    [
      email,
      eligibilityStatus,
      checkingAccountStatus,
      checkAccountStatus
    ]
  )

  return (
    <ShopifyStatusState.Provider value={value}>
      {children}
    </ShopifyStatusState.Provider>
  )
}