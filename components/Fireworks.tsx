'use client'

import { useCallback, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { loadSlim } from '@tsparticles/slim'
import { loadEmittersPlugin } from '@tsparticles/plugin-emitters'
import type { Engine } from '@tsparticles/engine'

// Dynamically import Particles to avoid SSR issues
const Particles = dynamic(() => import('@tsparticles/react').then((mod) => mod.Particles), {
  ssr: false,
})

interface FireworksProps {
  show: boolean
}

export default function Fireworks({ show }: FireworksProps) {
  const [isClient, setIsClient] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => setIsReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const particlesInit = useCallback(async (engine: Engine) => {
    try {
      await loadSlim(engine)
      await loadEmittersPlugin(engine)
    } catch (error) {
      console.error('Error loading particles:', error)
    }
  }, [])

  if (!show || !isClient || !isReady) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <Particles
        id="fireworks"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 120,
          fullScreen: {
            enable: false,
          },
          particles: {
            color: {
              value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FFD93D', '#6BCF7F'],
            },
            move: {
              enable: true,
              outModes: {
                default: 'destroy',
              },
              speed: {
                min: 1,
                max: 3,
              },
              gravity: {
                enable: true,
                acceleration: 0.2,
              },
            },
            number: {
              density: {
                enable: true,
              },
              value: 0,
            },
            opacity: {
              value: { min: 0.5, max: 1 },
              animation: {
                enable: true,
                speed: 0.5,
                sync: false,
                destroy: 'none',
              },
            },
            shape: {
              type: ['circle', 'triangle', 'star'],
            },
            size: {
              value: { min: 3, max: 8 },
              animation: {
                enable: true,
                speed: 1,
                sync: false,
              },
            },
          },
          detectRetina: true,
          emitters: [
          {
            life: {
              count: 0,
              duration: {
                sync: true,
                value: 6,
              },
              delay: {
                sync: true,
                value: 0,
              },
            },
            rate: {
              delay: {
                sync: true,
                value: 0.2,
              },
              quantity: 80,
            },
            position: {
              x: 20,
              y: 30,
            },
            spawnColor: {
              value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FFD93D', '#6BCF7F'],
            },
            startCount: 0,
            size: {
              width: 0,
              height: 0,
            },
            particles: {
              shape: {
                type: ['circle', 'triangle', 'star'],
              },
              color: {
                value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FFD93D', '#6BCF7F'],
              },
              size: {
                value: { min: 3, max: 8 },
              },
              move: {
                enable: true,
                outModes: {
                  default: 'destroy',
                },
                speed: {
                  min: 2,
                  max: 6,
                },
                gravity: {
                  enable: true,
                  acceleration: 0.2,
                },
              },
            },
          },
          {
            life: {
              count: 0,
              duration: {
                sync: true,
                value: 6,
              },
              delay: {
                sync: true,
                value: 0.5,
              },
            },
            rate: {
              delay: {
                sync: true,
                value: 0.2,
              },
              quantity: 80,
            },
            position: {
              x: 20,
              y: 30,
            },
            spawnColor: {
              value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FFD93D', '#6BCF7F'],
            },
            startCount: 0,
            size: {
              width: 0,
              height: 0,
            },
            particles: {
              shape: {
                type: ['circle', 'triangle', 'star'],
              },
              color: {
                value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FFD93D', '#6BCF7F'],
              },
              size: {
                value: { min: 3, max: 8 },
              },
              move: {
                enable: true,
                outModes: {
                  default: 'destroy',
                },
                speed: {
                  min: 2,
                  max: 6,
                },
                gravity: {
                  enable: true,
                  acceleration: 0.2,
                },
              },
            },
          },
          {
            life: {
              count: 0,
              duration: {
                sync: true,
                value: 6,
              },
              delay: {
                sync: true,
                value: 1,
              },
            },
            rate: {
              delay: {
                sync: true,
                value: 0.2,
              },
              quantity: 80,
            },
            position: {
              x: 20,
              y: 30,
            },
            spawnColor: {
              value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FFD93D', '#6BCF7F'],
            },
            startCount: 0,
            size: {
              width: 0,
              height: 0,
            },
            particles: {
              shape: {
                type: ['circle', 'triangle', 'star'],
              },
              color: {
                value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FFD93D', '#6BCF7F'],
              },
              size: {
                value: { min: 3, max: 8 },
              },
              move: {
                enable: true,
                outModes: {
                  default: 'destroy',
                },
                speed: {
                  min: 2,
                  max: 6,
                },
                gravity: {
                  enable: true,
                  acceleration: 0.2,
                },
              },
            },
          },
          {
            life: {
              count: 0,
              duration: {
                sync: true,
                value: 6,
              },
              delay: {
                sync: true,
                value: 1.5,
              },
            },
            rate: {
              delay: {
                sync: true,
                value: 0.2,
              },
              quantity: 80,
            },
            position: {
              x: 20,
              y: 30,
            },
            spawnColor: {
              value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FFD93D', '#6BCF7F'],
            },
            startCount: 0,
            size: {
              width: 0,
              height: 0,
            },
            particles: {
              shape: {
                type: ['circle', 'triangle', 'star'],
              },
              color: {
                value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FFD93D', '#6BCF7F'],
              },
              size: {
                value: { min: 3, max: 8 },
              },
              move: {
                enable: true,
                outModes: {
                  default: 'destroy',
                },
                speed: {
                  min: 2,
                  max: 6,
                },
                gravity: {
                  enable: true,
                  acceleration: 0.2,
                },
              },
            },
          },
          {
            life: {
              count: 0,
              duration: {
                sync: true,
                value: 6,
              },
              delay: {
                sync: true,
                value: 2,
              },
            },
            rate: {
              delay: {
                sync: true,
                value: 0.2,
              },
              quantity: 80,
            },
            position: {
              x: 20,
              y: 30,
            },
            spawnColor: {
              value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FFD93D', '#6BCF7F'],
            },
            startCount: 0,
            size: {
              width: 0,
              height: 0,
            },
            particles: {
              shape: {
                type: ['circle', 'triangle', 'star'],
              },
              color: {
                value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FFD93D', '#6BCF7F'],
              },
              size: {
                value: { min: 3, max: 8 },
              },
              move: {
                enable: true,
                outModes: {
                  default: 'destroy',
                },
                speed: {
                  min: 2,
                  max: 6,
                },
                gravity: {
                  enable: true,
                  acceleration: 0.2,
                },
              },
            },
          },
          {
            life: {
              count: 0,
              duration: {
                sync: true,
                value: 6,
              },
              delay: {
                sync: true,
                value: 2.5,
              },
            },
            rate: {
              delay: {
                sync: true,
                value: 0.2,
              },
              quantity: 80,
            },
            position: {
              x: 20,
              y: 30,
            },
            spawnColor: {
              value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FFD93D', '#6BCF7F'],
            },
            startCount: 0,
            size: {
              width: 0,
              height: 0,
            },
            particles: {
              shape: {
                type: ['circle', 'triangle', 'star'],
              },
              color: {
                value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FFD93D', '#6BCF7F'],
              },
              size: {
                value: { min: 3, max: 8 },
              },
              move: {
                enable: true,
                outModes: {
                  default: 'destroy',
                },
                speed: {
                  min: 2,
                  max: 6,
                },
                gravity: {
                  enable: true,
                  acceleration: 0.2,
                },
              },
            },
          },
          {
            life: {
              count: 0,
              duration: {
                sync: true,
                value: 6,
              },
              delay: {
                sync: true,
                value: 3,
              },
            },
            rate: {
              delay: {
                sync: true,
                value: 0.2,
              },
              quantity: 80,
            },
            position: {
              x: 20,
              y: 30,
            },
            spawnColor: {
              value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FFD93D', '#6BCF7F'],
            },
            startCount: 0,
            size: {
              width: 0,
              height: 0,
            },
            particles: {
              shape: {
                type: ['circle', 'triangle', 'star'],
              },
              color: {
                value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FFD93D', '#6BCF7F'],
              },
              size: {
                value: { min: 3, max: 8 },
              },
              move: {
                enable: true,
                outModes: {
                  default: 'destroy',
                },
                speed: {
                  min: 2,
                  max: 6,
                },
                gravity: {
                  enable: true,
                  acceleration: 0.2,
                },
              },
            },
          },
          {
            life: {
              count: 0,
              duration: {
                sync: true,
                value: 6,
              },
              delay: {
                sync: true,
                value: 3.5,
              },
            },
            rate: {
              delay: {
                sync: true,
                value: 0.2,
              },
              quantity: 80,
            },
            position: {
              x: 20,
              y: 30,
            },
            spawnColor: {
              value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FFD93D', '#6BCF7F'],
            },
            startCount: 0,
            size: {
              width: 0,
              height: 0,
            },
            particles: {
              shape: {
                type: ['circle', 'triangle', 'star'],
              },
              color: {
                value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FFD93D', '#6BCF7F'],
              },
              size: {
                value: { min: 3, max: 8 },
              },
              move: {
                enable: true,
                outModes: {
                  default: 'destroy',
                },
                speed: {
                  min: 2,
                  max: 6,
                },
                gravity: {
                  enable: true,
                  acceleration: 0.2,
                },
              },
            },
          },
        ],
      }}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}

