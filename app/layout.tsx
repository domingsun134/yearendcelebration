import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SnowAnimation from '@/components/SnowAnimation'
import ChristmasMusic from '@/components/ChristmasMusic'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Year End Celebration - Christmas Quiz',
  description: 'Scan QR codes to answer Christmas questions!',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SnowAnimation />
        <ChristmasMusic />
        {children}
      </body>
    </html>
  )
}

