import { NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const ADMIN_COOKIE_NAME = process.env.ADMIN_COOKIE_NAME || 'admin-auth'
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 6 // 6 hours

export async function POST(request: Request) {
  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: 'Admin password is not configured on the server.' },
      { status: 500 }
    )
  }

  let body: { password?: string } = {}

  try {
    body = await request.json()
  } catch {
    // ignore JSON parse errors and fall through to invalid credentials response
  }

  const { password } = body

  if (!password || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: 'true',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE_SECONDS,
    path: '/',
  })

  return response
}

