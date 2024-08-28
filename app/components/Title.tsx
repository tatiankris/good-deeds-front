'use client'

import { usePathname } from 'next/navigation'

export function Title() {
  const pathname = usePathname()
  const title = pathname === '/login' ? 'Sign In' : 'Sign Up'
  return (
    <h1 className={'text-lg font-bold mb-5'}>{title}</h1>
  )
}