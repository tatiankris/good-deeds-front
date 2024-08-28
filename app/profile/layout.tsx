import { CookiesProvider } from 'next-client-cookies/server'

export default function ProfileLayout({
                                      children, ...rest
                                    }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CookiesProvider>
      {children}
    </CookiesProvider>
  )
}
