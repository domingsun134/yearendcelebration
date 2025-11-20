import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_COOKIE_NAME = process.env.ADMIN_COOKIE_NAME || 'admin-auth'
const LOGIN_PATH = '/admin/login'
const ADMIN_HOME_PATH = '/admin'

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request
  const pathname = nextUrl.pathname
  const search = nextUrl.search
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginRoute = pathname === LOGIN_PATH
  const isAuthenticated = cookies.get(ADMIN_COOKIE_NAME)?.value === 'true'

  if (!isAdminRoute) {
    return NextResponse.next()
  }

  if (!isAuthenticated && !isLoginRoute) {
    const loginUrl = new URL(LOGIN_PATH, request.url)
    if (pathname !== ADMIN_HOME_PATH || search) {
      loginUrl.searchParams.set('from', `${pathname}${search}`)
    }
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthenticated && isLoginRoute) {
    const redirectUrl = new URL(ADMIN_HOME_PATH, request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

