import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 md:left-10 w-48 h-48 md:w-72 md:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-4 md:right-10 w-48 h-48 md:w-72 md:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-48 h-48 md:w-72 md:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl w-full text-center relative z-10 px-3 md:px-4">
        <div className="glass-strong rounded-2xl md:rounded-3xl shadow-soft-lg p-6 md:p-8 lg:p-12 xl:p-16 border border-white/20 mx-2">
          <div className="mb-4 md:mb-6">
            <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-3 md:mb-4 animate-bounce">🎄</div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-display font-extrabold mb-4 md:mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent leading-tight px-2">
            Year End Celebration
          </h1>
          <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 mb-6 md:mb-8 lg:mb-10 font-medium px-2">
            Christmas Quiz Challenge
          </p>
          <div className="space-y-4">
            <Link
              href="/admin"
              className="inline-block w-full md:w-auto px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-christmas-green to-emerald-500 text-white rounded-xl font-semibold text-base md:text-lg hover:shadow-glow hover:scale-105 transition-all duration-300 shadow-soft"
            >
              Admin Dashboard
            </Link>
            <p className="text-gray-600 mt-6 md:mt-8 text-sm md:text-base lg:text-lg px-2">
              Scan a QR code to answer a question! 📱
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

