import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const protectedRoutes = ['/users, /posts', '/', 'profile']
const publicRoutes = ['/login', '/register']

export function middleware(req: NextRequest) {

  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = cookies().get('session')?.value

  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL('/login', path))
  }

  if (isPublicRoute && cookie) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}
