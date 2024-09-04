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
  clerkError: string | null
  setClerkError: Dispatch<SetStateAction<string | null>>
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
  const [clerkError, setClerkError] = useState<string | null>(
    null
  )

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

    // check clerk BE for existing account
    const clerkRes = await fetch('/api/clerk-be', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    })
    const clerkStatus = await clerkRes.json()

    if (clerkStatus.status === 409) {
      return clerkStatus
    } else {
      return data
    }
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
      checkAccountStatus,
      clerkError,
      setClerkError
    }),
    [
      email,
      clerkError,
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
