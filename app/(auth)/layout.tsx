import { Title } from '@/app/components/Title'
import { RedirectAuthLink } from '@/app/components/RedirectAuthLink'
import { CookiesProvider } from 'next-client-cookies/server'

export default function AuthLayout({
  children, ...rest
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='flex items-center flex-col mt-20'>
      <Title />
      <div
        className='flex shadow-lg bg-gray-50 flex-col p-4 border border-neutral-800/40 rounded-md min-h-[260px] min-w-[400px]'>
        <CookiesProvider>{children}</CookiesProvider>

      </div>
      <RedirectAuthLink />
    </section>
  )
}
