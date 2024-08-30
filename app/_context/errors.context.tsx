'use client'

import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  Dispatch,
} from 'react'
import { ERROR_LS_KEY } from './helpers/_keys'

const ErrorState = createContext<{
  error: IError | null
  setError: Dispatch<SetStateAction<IError | null>>
  setErrorLS: (arg: IError | null) => void
} | null>(null)

export function useErrorContext() {
  const context = useContext(ErrorState)
  if (context === null) {
    throw new Error(
      'useError must be used within an ErrorProvider'
    )
  }

  return context
}

export function ErrorProvider({
  children
}: {
  children: ReactNode
}) {
  const [error, setError] = useState<IError | null>(null)

  function setErrorLS(error: IError | null) {
    localStorage.setItem(ERROR_LS_KEY, JSON.stringify(error))
  }
  
  useEffect(() => {
    const errorTimeOut = 5000
    const errorLS = localStorage.getItem(ERROR_LS_KEY)
    const errorData = errorLS ? JSON.parse(errorLS) : null
    
    if (errorData) {
      setError(errorData)
      setTimeout(() => {
        console.log('remove error from local storage')
        localStorage.removeItem(ERROR_LS_KEY)
      }, errorTimeOut)
    }
  }, [])

  const value = useMemo(
    () => ({
      error,
      setError,
      setErrorLS
    }),
    [error]
  )

  return (
    <ErrorState.Provider value={value}>
      {children}
    </ErrorState.Provider>
  )
}
