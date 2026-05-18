import { useEffect, useRef, useState } from 'react'
import { startScanner, stopScanner } from './scanner.service'
import { getProductByCode } from '../services/api.service'
import type { Product } from '../types/product.types'

export const useScanner = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [isScanning, setIsScanning] = useState(false)
  const [code, setCode] = useState<string | null>(null)
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null)

  const start = () => {
    if (!videoRef.current) return

    setIsScanning(true)
    setError(null)

    startScanner(videoRef.current, {
      onResult: async (text) => {
        try {
          setCode(text);
          console.log(text)//Mostramos el codigo por consola 

          const foundProduct = await getProductByCode(text);
          console.log("Codigo enviado a backend")//Para ver cuanto tarda en responder el back

          setProduct(foundProduct);

        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Error obteniendo producto");
          }
        }
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

  return { videoRef, isScanning, code, error, start, stop, product }
}