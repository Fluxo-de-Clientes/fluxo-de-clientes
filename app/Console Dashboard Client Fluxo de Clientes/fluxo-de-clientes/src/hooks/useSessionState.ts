import { useApp } from '../app/store'
import type { Dispatch, SetStateAction } from 'react'
export function useSessionState<T>(key: string, initial: T): [T, Dispatch<SetStateAction<T>>] {
  const app = useApp()
  const value = (app.sessionData[key] as T | undefined) ?? initial
  const set: Dispatch<SetStateAction<T>> = (next) =>
    app.setSessionData(key, (old) =>
      typeof next === 'function'
        ? (next as (previous: T) => T)((old as T | undefined) ?? initial)
        : next,
    )
  return [value, set]
}
