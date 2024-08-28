'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore, store } from '@/app/lib/store'

export default function StoreProvider({
                                        children,
                                      }: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  const currentStore =  storeRef.current || makeStore()

  return <Provider store={store}>{children}</Provider>
}