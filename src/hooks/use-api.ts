import { useState, useCallback } from 'react'

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  initialData?: T
}

interface UseApiReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
  execute: (...args: any[]) => Promise<T | void>
  reset: () => void
}

export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions<T> = {}
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(options.initialData || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(
    async (...args: any[]): Promise<T | void> => {
      try {
        setLoading(true)
        setError(null)
        
        const result = await apiFunction(...args)
        setData(result)
        
        if (options.onSuccess) {
          options.onSuccess(result)
        }
        
        return result
      } catch (err: any) {
        const errorMessage = err.message || 'An error occurred'
        setError(errorMessage)
        
        if (options.onError) {
          options.onError(err)
        }
        
        throw err
      } finally {
        setLoading(false)
      }
    },
    [apiFunction, options]
  )

  const reset = useCallback(() => {
    setData(options.initialData || null)
    setLoading(false)
    setError(null)
  }, [options.initialData])

  return {
    data,
    loading,
    error,
    execute,
    reset
  }
}