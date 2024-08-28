import { HeaderButtons } from '@/app/components/HeaderButtons'
import { CookiesProvider } from 'next-client-cookies/server'

export default function Header() {
  return <header className={'flex flex-row justify-between shadow-md space-x-6 px-16 py-3 min-w-full bg-white/60'}>
    <CookiesProvider><HeaderButtons /></CookiesProvider>
  </header>
}