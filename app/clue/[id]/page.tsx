'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { clues } from '@/data/clues'

export default function CluePage() {
  const params = useParams()
  const router = useRouter()
  const clueId = params.id as string

  const clue = useMemo(() => clues.find((entry) => entry.id === clueId), [clueId])

  if (!clue) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-strong rounded-3xl shadow-soft-lg p-6 md:p-10 text-center border border-white/10 max-w-lg w-full bg-white/70 backdrop-blur-xl">
          <div className="text-5xl md:text-6xl mb-4">🧦</div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-800 mb-4">
            Clue not found!
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            We couldn&apos;t find that clue. Try scanning another QR code or return to the start.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.back()}
              className="px-5 py-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl font-semibold text-gray-800 hover:shadow-glow transition-all duration-300"
            >
              Go Back
            </button>
            <Link
              href="/"
              className="px-5 py-3 bg-gradient-to-r from-christmas-green to-emerald-500 text-white rounded-xl font-semibold hover:shadow-glow transition-all duration-300"
            >
              Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-purple-100 opacity-70 pointer-events-none"></div>
      <div className="glass-strong rounded-3xl shadow-soft-lg p-6 md:p-10 lg:p-12 text-center border border-white/10 max-w-3xl w-full relative z-10 bg-white/80 backdrop-blur-2xl">
        <div className="text-6xl md:text-7xl mb-6">🎅🧦</div>
        <p className="text-sm uppercase tracking-[0.4em] text-gray-500 font-semibold mb-4">
          Treasure Hunt Clue
        </p>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-5 leading-tight">
          {clue.title}
        </h1>
        <div className="text-xl md:text-2xl text-gray-700 font-semibold mb-8 whitespace-pre-line leading-relaxed">
          {clue.description}
        </div>
        <p className="text-base md:text-lg text-gray-600 mb-8">
          Follow the clue to find your next surprise! 🎁
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gradient-to-r from-christmas-green to-emerald-500 text-white rounded-xl font-semibold hover:shadow-glow transition-all duration-300"
          >
            Got it!
          </button>
        </div>
      </div>
      <div className="absolute -top-10 left-5 text-7xl opacity-20 pointer-events-none">🎅</div>
      <div className="absolute bottom-4 right-8 text-8xl opacity-20 pointer-events-none">🧦</div>
    </main>
  )
}

