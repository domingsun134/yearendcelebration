'use client'

import { useState, useEffect, useRef } from 'react'

export default function ChristmasMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [hasError, setHasError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const hasStartedRef = useRef(false)
  const listenersAttachedRef = useRef(false)

  // Function to start playing music - accessible globally
  const startMusic = useRef(() => {
    const audio = audioRef.current
    if (!audio || hasStartedRef.current) return
    
    // Only start if not already playing and volume is greater than 0 (not muted)
    if (audio.paused && audio.volume > 0) {
      hasStartedRef.current = true
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.log('Failed to play music:', error)
            hasStartedRef.current = false
          })
      } else {
        // If play() returned undefined, reset the flag
        hasStartedRef.current = false
      }
    }
  })

  // Attach global event listeners once on mount
  useEffect(() => {
    if (listenersAttachedRef.current) return

    const handleFirstInteraction = () => {
      startMusic.current()
    }

    // Attach to multiple event types and targets for maximum coverage
    const events = ['click', 'touchstart', 'mousedown', 'keydown']
    const targets = [window, document]

    events.forEach(event => {
      targets.forEach(target => {
        target.addEventListener(event, handleFirstInteraction, { once: true, passive: true, capture: true })
      })
    })

    listenersAttachedRef.current = true

    return () => {
      // Cleanup is handled by { once: true }
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Set initial volume
    audio.volume = volume

    // Handle audio events
    const handleEnded = () => {
      // Loop the music
      audio.currentTime = 0
      audio.play().catch(() => {
        // Auto-play was prevented
      })
    }

    const handleError = () => {
      setHasError(true)
      setIsPlaying(false)
    }

    const handleCanPlay = () => {
      setHasError(false)
    }

    const handlePlay = () => {
      setIsPlaying(true)
      hasStartedRef.current = true
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    // Try to auto-play immediately
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
          hasStartedRef.current = true
        })
        .catch(() => {
          // Auto-play was prevented by browser policy
          // Listeners are already attached, will start on first user interaction
        })
    }

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [volume])

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    // This is a user interaction, so try to start music first
    startMusic.current()

    if (isMuted) {
      audio.volume = volume
      setIsMuted(false)
      // Try to play if it was paused
      if (audio.paused) {
        hasStartedRef.current = true
        audio.play().catch(() => {
          hasStartedRef.current = false
        })
      }
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This is a user interaction, so try to start music first
    startMusic.current()
    
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    const audio = audioRef.current
    if (audio && !isMuted) {
      audio.volume = newVolume
      // Try to start music if it's paused
      if (audio.paused) {
        hasStartedRef.current = true
        audio.play().catch(() => {
          hasStartedRef.current = false
        })
      }
    }
  }

  // Don't show the player if there's an error loading the music
  if (hasError) {
    return null
  }

  return (
    <>
      {/* 
        Music source: You can replace this URL with your own Christmas music file.
        Place your music file in the public folder and use: /your-music-file.mp3
        Or use any publicly accessible MP3 URL.
      */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://jmvqdimidxrsrpiintpk.supabase.co/storage/v1/object/sign/music/jingle-bells-original-song-4k--lyrics-christmas-song.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80N2RmYTFhNS02MDZhLTRhZWEtYWFiZi0yNTIxMGQ0MzYwMWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtdXNpYy9qaW5nbGUtYmVsbHMtb3JpZ2luYWwtc29uZy00ay0tbHlyaWNzLWNocmlzdG1hcy1zb25nLm1wMyIsImlhdCI6MTc2MzU1Nzg5MSwiZXhwIjoxNzY4NzQxODkxfQ.4yLcd3dziIcCdl5ahdJAEyYY8qOK7q4KZVt35SqlLQ8"
      />
    </>
  )
}

