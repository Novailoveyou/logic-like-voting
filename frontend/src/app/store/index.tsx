'use client'

import { createContext, useRef, useContext } from 'react'
import type { ComponentProps, JSX } from 'react'
import { useStore as useZustandStore } from 'zustand'
import { createStore } from './store'
import type { Store } from './model'

type StoreApi = ReturnType<typeof createStore>

type StoreProviderProps = Pick<
  Required<ComponentProps<keyof JSX.IntrinsicElements>>,
  'children'
>

const StoreContext = createContext<StoreApi | undefined>(undefined)

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<StoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createStore()
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = (() => {
  let storeRef: StoreApi | undefined

  const useStoreHook = <T,>(selector: (store: Store) => T) => {
    const storeContext = useContext(StoreContext)

    if (!storeContext) {
      throw new Error(`useStore must be used within StoreProvider`)
    }

    if (!storeRef) {
      storeRef = storeContext
    }

    return useZustandStore(storeContext, selector)
  }

  useStoreHook.getState = () => {
    if (!storeRef) {
      throw new Error(
        `useStore.getState can only be called after useStore has been used in a component`,
      )
    }
    return storeRef.getState()
  }

  useStoreHook.setState = (partial: Partial<Store>) => {
    if (!storeRef) {
      throw new Error(
        `useStore.setState can only be called after useStore has been used in a component`,
      )
    }
    storeRef.setState(partial)
  }

  useStoreHook.subscribe = (
    listener: (state: Store, prevState: Store) => void,
  ) => {
    if (!storeRef) {
      throw new Error(
        `useStore.subscribe can only be called after useStore has been used in a component`,
      )
    }
    return storeRef.subscribe(listener)
  }

  return useStoreHook
})()
