// This component will only be rendered once per request on the server, but might be re-rendered multiple times on the client if there are stateful client components located above this component in the tree, or if this component also contains other mutable state that causes a re-render.

'use client'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/lib/redux/store'

interface Props {
  readonly children: ReactNode
}

export default function StoreProvider({ children }: Props) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
