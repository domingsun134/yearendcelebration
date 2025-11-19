'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Question } from '@/lib/supabase'
import { QRCodeSVG } from 'qrcode.react'
import QRCode from 'qrcode'
import Link from 'next/link'

export default function PrintQRPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [baseUrl, setBaseUrl] = useState('')

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
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2 max-w-7xl mx-auto">
          This will print {questions.length} stocking templates with QR codes.
        </p>
      </div>

      {/* Print content */}
      <div className="print-container p-4">
        {questions.map((question) => (
          <div key={question.id} className="print-page mb-8">
            {/* Back side (with QR) */}
            <div className="stocking-template back">
              {baseUrl ? (
                <SVGTemplateWithQR
                  key={`${question.id}-${baseUrl}`}
                  questionId={question.id}
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
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: letter;
            margin: 0.5in;
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
            min-height: 9in;
            gap: 1in;
          }

          .print-page:last-child {
            page-break-after: auto;
          }

          .stocking-template {
            width: 100%;
            max-width: 4in;
            margin: 0 auto;
            page-break-inside: avoid;
          }

          .stocking-template.front {
            margin-bottom: 0;
          }

          .stocking-template.back {
            margin-top: 0;
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
            max-width: 400px;
          }
        }
      `}</style>
    </>
  )
}

// Back side of stocking (with QR code)
function StockingBack({ questionId, qrValue }: { questionId: number; qrValue: string }) {
  const patternId = `cuff-pattern-back-${questionId}`

  return (
    <div className="relative w-full" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <svg
        viewBox="0 0 400 600"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={patternId} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 0 10 L 20 10" stroke="#2d5016" strokeWidth="2" fill="none" />
            <path d="M 5 0 L 10 10 L 15 0" stroke="#2d5016" strokeWidth="2" fill="none" />
          </pattern>
        </defs>

        {/* Main stocking shape - red body */}
        <path
          d="M 50 100 L 50 180 Q 50 200 60 220 L 80 280 Q 100 400 120 500 Q 140 550 200 580 Q 260 550 280 500 Q 300 400 320 280 L 340 220 Q 350 200 350 180 L 350 100 L 200 50 Z"
          fill="#dc2626"
          stroke="#000"
          strokeWidth="3"
        />

        {/* Cuff - green background */}
        <rect x="50" y="100" width="300" height="80" fill="#166534" stroke="#000" strokeWidth="3" />

        {/* Cuff pattern overlay */}
        <rect x="50" y="100" width="300" height="80" fill={`url(#${patternId})`} opacity="0.3" />

        {/* Cream band on cuff */}
        <rect x="50" y="140" width="300" height="20" fill="#fef3c7" stroke="#000" strokeWidth="2" />

        {/* Yellow dots on cuff */}
        {[70, 110, 150, 190, 230, 270, 310, 330].map((x, i) => (
          <circle key={i} cx={x} cy={150} r="4" fill="#fbbf24" stroke="#000" strokeWidth="1" />
        ))}

        {/* Wavy line separating cuff from body */}
        <path
          d="M 50 180 Q 100 175 150 180 T 250 180 T 350 180"
          stroke="#166534"
          strokeWidth="3"
          fill="none"
        />

        {/* Text: YEAR END CELEBRATION */}
        <text
          x="200"
          y="220"
          fontSize="18"
          fontWeight="bold"
          fill="#fef3c7"
          stroke="#000"
          strokeWidth="0.5"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
        >
          YEAR END
        </text>
        <text
          x="200"
          y="245"
          fontSize="18"
          fontWeight="bold"
          fill="#fef3c7"
          stroke="#000"
          strokeWidth="0.5"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
        >
          CELEBRATION
        </text>

        {/* White border around QR area */}
        <rect
          x="120"
          y="255"
          width="160"
          height="160"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          rx="5"
        />

        {/* Stars */}
        <Star x={100} y={280} size={18} fill="#fbbf24" stroke="#000" strokeWidth={1} />
        <Star x={300} y={280} size={18} fill="#fbbf24" stroke="#000" strokeWidth={1} />

        {/* Atom symbol */}
        <g transform="translate(150, 430)">
          <circle cx="0" cy="0" r="6" fill="#fbbf24" stroke="#fff" strokeWidth="2" />
          <ellipse cx="0" cy="0" rx="20" ry="12" fill="none" stroke="#fff" strokeWidth="2" />
          <ellipse cx="0" cy="0" rx="20" ry="12" fill="none" stroke="#fff" strokeWidth="2" transform="rotate(60)" />
          <ellipse cx="0" cy="0" rx="20" ry="12" fill="none" stroke="#fff" strokeWidth="2" transform="rotate(120)" />
        </g>

        {/* Large snowflake */}
        <Snowflake x={250} y={450} size={30} stroke="#fff" strokeWidth={2} />

        {/* Small asterisk */}
        <text x={320} y={420} fontSize="14" fill="#fff" stroke="#000" strokeWidth="0.5" textAnchor="middle">*</text>

        {/* Small dots */}
        {[
          { x: 100, y: 480 }, { x: 110, y: 500 }, { x: 105, y: 520 },
          { x: 290, y: 480 }, { x: 300, y: 500 }
        ].map((pos, i) => (
          <circle key={i} cx={pos.x} cy={pos.y} r="2" fill="#fff" stroke="#000" strokeWidth="0.5" />
        ))}

        {/* Green stripe on toe */}
        <path
          d="M 50 500 Q 100 520 150 500 Q 200 480 200 500"
          fill="#166534"
          stroke="#000"
          strokeWidth="2"
        />

        {/* Green section on heel */}
        <path
          d="M 280 500 Q 320 510 340 520 Q 350 530 350 550"
          fill="#166534"
          stroke="#000"
          strokeWidth="2"
        />
      </svg>

      {/* QR Code overlay - positioned absolutely over the SVG */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: '30%',
          top: '42.5%',
          width: '40%',
          paddingTop: '40%', // Maintain square aspect ratio
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: 'white',
            borderRadius: '5px',
            padding: '6px',
          }}
        >
          <QRCodeSVG
            value={qrValue}
            size={150}
            level="H"
            includeMargin={false}
            style={{
              width: 'calc(100% - 12px)',
              height: 'calc(100% - 12px)',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
        </div>
      </div>
    </div>
  )
}

// SVG Template with QR Code component
function SVGTemplateWithQR({ questionId, qrValue }: { questionId: number; qrValue: string }) {
  const [svgContent, setSvgContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Don't generate if qrValue is empty or invalid
    if (!qrValue || qrValue.trim() === '') {
      console.warn('QR value is empty for question:', questionId)
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    console.log('Generating QR code for question:', questionId, 'URL:', qrValue)

    // Generate QR code as data URL
    const generateQR = QRCode.toDataURL(qrValue, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      margin: 1,
      width: 1024,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })

    // Load SVG template
    const loadSVG = fetch('/Untitled presentation.svg')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load SVG: ${res.statusText}`)
        }
        return res.text()
      })

    // Wait for both to complete
    Promise.all([generateQR, loadSVG])
      .then(([dataUrl, svgText]) => {
        // Replace QR code in SVG
        const parser = new DOMParser()
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')

        // Find the image element on the RIGHT sock (rightmost position)
        // We want to replace only the QR code on the right sock, not the left sock
        let imageElement: Element | null = null
        const xlinkNS = 'http://www.w3.org/1999/xlink'

        // Get viewBox to determine the center point
        const svgRoot = svgDoc.documentElement
        const viewBox = svgRoot.getAttribute('viewBox')
        let viewBoxWidth = 960 // default from the SVG
        if (viewBox) {
          const parts = viewBox.split(' ')
          if (parts.length >= 3) {
            viewBoxWidth = parseFloat(parts[2]) || 960
          }
        }
        const centerX = viewBoxWidth / 2
        // Use a more conservative threshold - right sock should be clearly on the right
        const rightThreshold = viewBoxWidth * 0.55 // 55% from left, so x > 528 for 960px width

        // Get ALL image elements (not just ones with href, in case href is missing)
        const allImages = svgDoc.getElementsByTagName('image')
        console.log(`Found ${allImages.length} total image element(s) in SVG`)

        const imagesWithPositions: Array<{ element: Element; x: number; hasHref: boolean }> = []

        // Calculate position for each image element
        for (let i = 0; i < allImages.length; i++) {
          const img = allImages[i]
          const xlinkHref = img.getAttributeNS(xlinkNS, 'href')
          const regularHref = img.getAttribute('href')
          const hasHref = !!(xlinkHref || regularHref)

          // Calculate the actual x position considering all transforms
          let xPos = 0

          // Get x attribute directly from image
          const xAttr = img.getAttribute('x')
          if (xAttr) {
            xPos = parseFloat(xAttr) || 0
          }

          // Walk up the parent chain to accumulate transforms
          let parent = img.parentElement
          let scaleX = 1
          let cumulativeX = xPos

          while (parent && parent !== svgRoot) {
            const transform = parent.getAttribute('transform')
            if (transform) {
              // Check for translate(x, y)
              const translateMatch = transform.match(/translate\(([^,]+)\s*,\s*([^)]+)\)/)
              if (translateMatch) {
                cumulativeX += parseFloat(translateMatch[1]) || 0
              }

              // Check for matrix(a, b, c, d, e, f)
              // matrix(scaleX, skewY, skewX, scaleY, translateX, translateY)
              const matrixMatch = transform.match(/matrix\(([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^)]+)\)/)
              if (matrixMatch) {
                const matrixScaleX = parseFloat(matrixMatch[1]) || 1
                const matrixTranslateX = parseFloat(matrixMatch[5]) || 0
                // Apply scale to current position, then add translation
                cumulativeX = cumulativeX * matrixScaleX + matrixTranslateX
                scaleX *= matrixScaleX
              }
            }
            parent = parent.parentElement
          }

          imagesWithPositions.push({ element: img, x: cumulativeX, hasHref })
          console.log(`Image ${i}: final x position = ${cumulativeX.toFixed(2)}, has href = ${hasHref}, is on right = ${cumulativeX >= rightThreshold}`)
        }

        // Filter to only images on the right side (past threshold)
        const rightSideImages = imagesWithPositions.filter(img => img.x >= rightThreshold)

        if (rightSideImages.length > 0) {
          // If multiple images on right, prefer ones with href (actual QR codes)
          const withHref = rightSideImages.filter(img => img.hasHref)
          if (withHref.length > 0) {
            // Sort by x position descending, take the rightmost one
            withHref.sort((a, b) => b.x - a.x)
            imageElement = withHref[0].element
            console.log(`Using rightmost image with href at x=${withHref[0].x.toFixed(2)}`)
          } else {
            // No href, but still use rightmost
            rightSideImages.sort((a, b) => b.x - a.x)
            imageElement = rightSideImages[0].element
            console.log(`Using rightmost image (no href) at x=${rightSideImages[0].x.toFixed(2)}`)
          }
        } else if (imagesWithPositions.length > 1) {
          // No images on right side, but multiple images exist - use rightmost overall
          imagesWithPositions.sort((a, b) => b.x - a.x)
          imageElement = imagesWithPositions[0].element
          console.warn(`No images found on right side (threshold: ${rightThreshold}). Using rightmost overall at x=${imagesWithPositions[0].x.toFixed(2)}`)
        } else if (imagesWithPositions.length === 1) {
          // Only one image - check if it's on the right
          const img = imagesWithPositions[0]
          if (img.x >= rightThreshold) {
            imageElement = img.element
            console.log(`Found 1 image on right side at x=${img.x.toFixed(2)}`)
          } else {
            console.warn(`Found 1 image but it's on the left side (x=${img.x.toFixed(2)}, threshold=${rightThreshold}). Not replacing.`)
            setSvgContent(svgText)
            setIsLoading(false)
            return
          }
        }

        if (imageElement) {
          // Check for mirroring (negative scale x) in parent transforms and fix it
          // This is necessary because the template might use mirroring for the right sock,
          // which makes QR codes unscannable
          let parent = imageElement.parentElement
          while (parent && parent !== svgRoot) {
            const transform = parent.getAttribute('transform')
            if (transform) {
              // Check for matrix(a, b, c, d, e, f)
              // We handle both comma-separated and space-separated values
              const matrixMatch = transform.match(/matrix\(([^,\s]+)[,\s]+([^,\s]+)[,\s]+([^,\s]+)[,\s]+([^,\s]+)[,\s]+([^,\s]+)[,\s]+([^)\s]+)\)/)

              if (matrixMatch) {
                const a = parseFloat(matrixMatch[1])

                // If scale X (a) is negative, it's mirrored
                if (a < 0) {
                  console.log('Found mirrored transform, fixing for QR code...')
                  const imgWidth = parseFloat(imageElement.getAttribute('width') || '0')

                  if (imgWidth > 0) {
                    // Calculate new parameters to un-mirror while keeping position
                    // Original: x' = a*x + e (where a is negative)
                    // Range [0, W] maps to [e, e + a*W] (note: e + a*W is smaller than e)
                    // Visual left edge is e + a*W, visual right edge is e

                    // New: X' = A*x + E (where A is positive -a)
                    // We want 0 to map to visual left edge: E = e + a*W

                    const e = parseFloat(matrixMatch[5])
                    const newA = Math.abs(a)
                    const newE = e + (a * imgWidth)

                    // Reconstruct matrix with new values
                    // Keep other values (b, c, d, f) same
                    const b = matrixMatch[2]
                    const c = matrixMatch[3]
                    const d = matrixMatch[4]
                    const f = matrixMatch[6]

                    const newMatrix = `matrix(${newA} ${b} ${c} ${d} ${newE} ${f})`
                    parent.setAttribute('transform', newMatrix)
                    console.log(`Fixed transform: ${transform} -> ${newMatrix}`)
                  }
                }
              }
            }
            parent = parent.parentElement
          }

          // Replace the href with new QR code
          // Set xlink:href using namespace (correct way for SVG)
          imageElement.setAttributeNS(xlinkNS, 'href', dataUrl)

          // Also set regular href as fallback for modern browsers
          imageElement.setAttribute('href', dataUrl)

          // Update the SVG content
          const serializer = new XMLSerializer()
          const updatedSvg = serializer.serializeToString(svgDoc.documentElement)
          setSvgContent(updatedSvg)

          console.log('QR code replaced successfully for question:', questionId)
        } else {
          console.error('Could not find image element in SVG template')
          setSvgContent(svgText)
        }
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Error loading template or generating QR for question', questionId, ':', err)
        setIsLoading(false)
      })
  }, [qrValue, questionId])

  if (isLoading || !svgContent) {
    return (
      <div className="w-full h-auto flex items-center justify-center" style={{ minHeight: '540px' }}>
        <div className="text-gray-500">Loading template...</div>
      </div>
    )
  }

  return (
    <div
      className="w-full h-auto"
      style={{ maxWidth: '960px', margin: '0 auto' }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  )
}

// Star component
function Star({ x, y, size, fill, stroke, strokeWidth }: { x: number; y: number; size: number; fill: string; stroke: string; strokeWidth: number }) {
  const points = []
  const outerRadius = size
  const innerRadius = size * 0.4

  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5 - Math.PI / 2
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    const px = x + radius * Math.cos(angle)
    const py = y + radius * Math.sin(angle)
    points.push(`${px},${py}`)
  }

  return (
    <polygon
      points={points.join(' ')}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  )
}

// Snowflake component
function Snowflake({ x, y, size, stroke, strokeWidth }: { x: number; y: number; size: number; stroke: string; strokeWidth: number }) {
  const branches = 6
  const branchLength = size

  return (
    <g transform={`translate(${x}, ${y})`}>
      {Array.from({ length: branches }).map((_, i) => {
        const angle = (i * 360) / branches
        return (
          <g key={i} transform={`rotate(${angle})`}>
            <line x1="0" y1="0" x2="0" y2={-branchLength} stroke={stroke} strokeWidth={strokeWidth} />
            <line x1="0" y1={-branchLength * 0.3} x2={-branchLength * 0.2} y2={-branchLength * 0.4} stroke={stroke} strokeWidth={strokeWidth} />
            <line x1="0" y1={-branchLength * 0.3} x2={branchLength * 0.2} y2={-branchLength * 0.4} stroke={stroke} strokeWidth={strokeWidth} />
            <line x1="0" y1={-branchLength * 0.6} x2={-branchLength * 0.15} y2={-branchLength * 0.7} stroke={stroke} strokeWidth={strokeWidth} />
            <line x1="0" y1={-branchLength * 0.6} x2={branchLength * 0.15} y2={-branchLength * 0.7} stroke={stroke} strokeWidth={strokeWidth} />
          </g>
        )
      })}
      <circle cx="0" cy="0" r="3" fill={stroke} stroke={stroke} strokeWidth={strokeWidth} />
    </g>
  )
}

