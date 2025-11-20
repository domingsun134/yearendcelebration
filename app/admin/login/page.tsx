import { Suspense } from 'react'
import { LoginForm } from './LoginForm'

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-christmas-green/10 to-sky-200/30 p-4">
          <div className="glass-strong rounded-3xl shadow-soft-lg border border-white/20 px-8 py-6 text-center text-gray-700">
            Loading...
          </div>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  )
}

