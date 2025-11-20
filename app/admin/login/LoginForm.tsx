'use client'

import { FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const redirectTo = searchParams.get('from') || '/admin'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Login failed. Please try again.')
      }

      router.push(redirectTo)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-christmas-green/10 to-sky-200/30 p-4">
      <div className="w-full max-w-md glass-strong rounded-3xl shadow-soft-lg border border-white/20 p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">Admin Login</h1>
          <p className="text-gray-600">Enter the admin password to continue.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-christmas-green focus:outline-none"
              placeholder="••••••••"
              autoComplete="current-password"
              autoFocus
            />
          </div>
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-christmas-green to-emerald-500 hover:shadow-glow hover:scale-[1.01] transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className="text-center mt-6 text-sm text-gray-600">
          <Link href="/" className="text-christmas-green font-semibold hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

