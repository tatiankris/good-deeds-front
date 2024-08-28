'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function RedirectAuthLink() {
  const pathname = usePathname()
  const title = pathname === '/login' ? 'Don\'t have an account yet?' : 'Already have an account?'
  const link = pathname === '/login' ? <Link className={'underline text-sm text-blue-500 hover:text-blue-600'} href={'/register'}>Sign Up</Link> : <Link className={'underline text-sm text-blue-500 hover:text-blue-600'} href={'/login'}>Sign In</Link>
  return (
    <div className={'mt-6 text-sm text-gray-600'}>{title} {link}</div>
  )
}