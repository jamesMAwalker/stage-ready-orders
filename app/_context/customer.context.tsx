'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { customer1 } from '../_mock-customers/customer-1'

const CustomerState = createContext<{
  customer: ICustomer | null
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
  const [customer, setCustomer] = useState<ICustomer | null>(
    null
  )

  const value = useMemo(
    () => ({
      customer,
      setCustomer
    }),
    [customer, setCustomer]
  )

  useEffect(() => {
    if (customer === null) {
      setCustomer(customer1)
    }
  }, [])
  

  return (
    <CustomerState.Provider value={value}>
      {children}
    </CustomerState.Provider>
  )
}
