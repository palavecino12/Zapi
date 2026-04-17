import { useEffect, useRef, useState } from 'react'
import { startScanner, stopScanner } from './scanner.service'

export const useScanner = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [isScanning, setIsScanning] = useState(false)
  const [code, setCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const start = () => {
    if (!videoRef.current) return

    setIsScanning(true)
    setError(null)

    startScanner(videoRef.current, {
      onResult: (text) => {
        setCode(text)
        // importante: no frenamos automáticamente
        // para lectura continua tipo supermercado
      },
      onError: () => {
        setError('Error al escanear')
      }
    })
  }

  const stop = () => {
    stopScanner()
    setIsScanning(false)
  }

  useEffect(() => {
    return () => {
      stopScanner()
    }
  }, [])

  return {
    videoRef,
    isScanning,
    code,
    error,
    start,
    stop
  }
}