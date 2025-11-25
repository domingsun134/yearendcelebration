'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Question } from '@/lib/supabase'
import { QRCodeSVG } from 'qrcode.react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { regretMessages } from '@/data/regret-messages'
import { clues } from '@/data/clues'
import { crackTheCodes } from '@/data/crack-the-code'

export default function PrintQRPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [baseUrl, setBaseUrl] = useState('')
  const [loggingOut, setLoggingOut] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin)
    }
    fetchQuestions()
  }, [])

  async function fetchQuestions() {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('id')

      if (error) throw error
      setQuestions(data || [])
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setLoading(false)
    }
  }

  function handlePrint() {
    window.print()
  }

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('Error logging out:', error)
      alert('Failed to log out. Please try again.')
    } finally {
      setLoggingOut(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-strong rounded-2xl md:rounded-3xl shadow-soft-lg p-6 md:p-12 text-center border border-white/20">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-christmas-green mx-auto mb-4"></div>
          <div className="text-base md:text-xl font-semibold text-gray-700">Loading questions...</div>
        </div>
      </main>
    )
  }

  return (
    <>
      {/* Print controls - hidden when printing */}
      <div className="no-print p-4 bg-white border-b shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            🎄 Print QR Code Templates
          </h1>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-gradient-to-r from-christmas-green to-emerald-500 text-white rounded-xl font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300 shadow-soft"
            >
              🖨️ Print All
            </button>
              <Link
                href="/admin"
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300 shadow-soft"
              >
                ← Back to Admin
              </Link>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300 shadow-soft disabled:opacity-50 disabled:hover:scale-100"
              >
                {loggingOut ? 'Logging out...' : 'Logout'}
              </button>
          </div>
        </div>
          <p className="text-sm text-gray-600 mt-2 max-w-7xl mx-auto">
            This will print {questions.length} quiz QR code stockings plus {regretMessages.length} regret QR code stockings plus {clues.length} clue QR code stockings plus {crackTheCodes.length} crack the code templates.
          </p>
      </div>

      {/* Print content */}
        <div className="print-container p-4">
          {questions.map((question) => (
            <div key={question.id} className="print-page mb-8">
              {/* Stocking Pair (Left and Right) */}
              <div className="stocking-template">
                {baseUrl ? (
                  <StockingPair
                    label={`Question ${question.id}`}
                    qrValue={`${baseUrl}/question/${question.unique_id}`}
                  />
                ) : (
                  <div className="w-full h-auto flex items-center justify-center" style={{ minHeight: '540px' }}>
                    <div className="text-gray-500">Loading...</div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {regretMessages.map((message) => (
            <div key={message.id} className="print-page mb-8">
              <div className="stocking-template">
                {baseUrl ? (
                  <StockingPair
                    label={message.title}
                    qrValue={`${baseUrl}/regret/${message.id}`}
                  />
                ) : (
                  <div className="w-full h-auto flex items-center justify-center" style={{ minHeight: '540px' }}>
                    <div className="text-gray-500">Loading...</div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {clues.map((clue) => (
            <div key={clue.id} className="print-page mb-8">
              <div className="stocking-template">
                {baseUrl ? (
                  <StockingPair
                    label={clue.title}
                    qrValue={`${baseUrl}/clue/${clue.id}`}
                  />
                ) : (
                  <div className="w-full h-auto flex items-center justify-center" style={{ minHeight: '540px' }}>
                    <div className="text-gray-500">Loading...</div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {crackTheCodes.map((code) => (
            <div key={code.id} className="print-page mb-8">
              <div className="stocking-template">
                {baseUrl ? (
                  <CrackTheCodeTemplate
                    label={code.title}
                    qrValue={`${baseUrl}/crack-the-code/${code.id}`}
                  />
                ) : (
                  <div className="w-full h-auto flex items-center justify-center" style={{ minHeight: '540px' }}>
                    <div className="text-gray-500">Loading...</div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0.2in;
          }

          body {
            background: white !important;
            margin: 0;
            padding: 0;
          }
          
          .no-print {
            display: none !important;
          }

          .print-container {
            margin: 0;
            padding: 0;
            width: 100%;
          }

          .print-page {
            page-break-after: always;
            page-break-inside: avoid;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100vh;
          }

          .print-page:last-child {
            page-break-after: auto;
          }

          .stocking-template {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Ensure QR codes print properly */
          svg {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }

        @media screen {
          .print-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }

          .print-page {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            margin-bottom: 40px;
            padding: 30px;
            border: 2px dashed #ccc;
            border-radius: 8px;
            background: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }

          .stocking-template {
            width: 100%;
            max-width: 900px;
          }
        }
      `}</style>
    </>
  )
}

function StockingPair({ label, qrValue }: { label: string; qrValue: string }) {
  return (
    <div className="flex flex-row items-center justify-center gap-4 w-full">
      <StockingRight label={label} qrValue={qrValue} />
    </div>
  )
}

function StockingRight({ label, qrValue }: { label: string; qrValue: string }) {
  return (
    <div className="relative w-full" style={{ maxWidth: '400px' }}>
      <Image
        src="/sock-right.png"
        alt={`Right Sock for ${label}`}
        width={411}
        height={508}
        className="w-full h-auto"
        priority
      />

      {/* Year End Celebration text overlay - positioned at the top green section */}
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{
          left: '32%',
          top: '4%',
          transform: 'translateX(-50%)',
          width: '80%',
        }}
      >
        <div
          className="text-white text-center"
          style={{
            fontFamily: "'Palatino', 'Palatino Linotype', 'Book Antiqua', 'Georgia', serif",
            fontSize: 'clamp(15px, 3.2vw, 24px)',
            fontWeight: '700',
            letterSpacing: '0.2em',
            textShadow: '3px 3px 8px rgba(0, 0, 0, 0.7), 1px 1px 2px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.1)',
            lineHeight: '1.4',
            textTransform: 'uppercase',
            fontStyle: 'italic',
            WebkitTextStroke: '0.3px rgba(0, 0, 0, 0.5)',
            fontVariant: 'small-caps',
          }}
        >
          <div style={{ marginBottom: '4px' }}>YEAR END</div>
          <div>CELEBRATION</div>
        </div>
      </div>

      {/* QR Code overlay - positioned absolutely over the Image */}
      {/* Adjusted position based on the visual placeholder in the image */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: '18%',
          top: '36%',
          width: '30%',
          aspectRatio: '1/1',
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            // No background needed as the image likely has a white box
            // But we can keep a small padding if needed
          }}
        >
          <QRCodeSVG
            value={qrValue}
            size={150}
            level="H"
            includeMargin={false}
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
        </div>
      </div>
    </div>
  )
}

function CrackTheCodeTemplate({ label, qrValue }: { label: string; qrValue: string }) {
  return (
    <div className="relative w-full" style={{ maxWidth: '500px' }}>
      <Image
        src="/crack-the-code-template.png"
        alt={`Crack the Code for ${label}`}
        width={500}
        height={700}
        className="w-full h-auto"
        priority
      />

      {/* QR Code overlay - positioned absolutely over the Image */}
      {/* Positioned at the white square area in the upper part of the red teardrop */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: '50%',
          top: '22%',
          transform: 'translateX(-50%)',
          width: '38%',
          aspectRatio: '1/1',
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            // No background needed as the image already has a white box
          }}
        >
          <QRCodeSVG
            value={qrValue}
            size={200}
            level="H"
            includeMargin={false}
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
        </div>
      </div>
    </div>
  )
}



