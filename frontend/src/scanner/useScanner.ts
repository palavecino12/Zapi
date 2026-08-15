//Este hook maneja el escaneo de codigo de barra, cuando se obtiene un codigo numerico
//se hace la llamada al service para traer el producto.
import { useEffect, useRef, useState } from 'react'
import { startScanner, stopScanner } from './scannerService'
import { getProductByCode } from '../services/productServices'
import type { Product } from '../types/productType'

export const useScanner = () => {

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const isProcessingRef = useRef(false) //Ref para evitar detecciones múltiples MIENTRAS se procesa una (no apaga la cámara)
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null) //Ref al timeout de espera post-producto, para poder cancelarlo si hace falta

  const [isScanning, setIsScanning] = useState(false)
  const [code, setCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null)

  const start = () => {
    if (!videoRef.current) return

    //Resetea los estados cuando arranca la deteccion.
    isProcessingRef.current = false
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    setIsScanning(true)
    setError(null)
    setCode(null)
    setProduct(null)

    startScanner(videoRef.current, {
      //Primer callback: en caso de exito mandamos el codigo al back y almacenamos el producto.
      onResult: async (text) => {
        //Si ya estamos procesando un código, ignoramos esta deteccion.
        if (isProcessingRef.current) return
        isProcessingRef.current = true
        setLoading(true)
        setError(null)

        try {
          setCode(text);

          const foundProduct = await getProductByCode(text);

          setProduct(foundProduct);

        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Error obteniendo producto");
          }
        } finally {
          setLoading(false)
          //Esperamos 1 segundo antes de liberar el lock, sino repite el codigo del producto.
          resumeTimeoutRef.current = setTimeout(() => {
            isProcessingRef.current = false
          }, 1000)
        }
      },
      //Segundo callback: Se dispara si hay un error al iniciar la camara.
      onError: () => {
        setError('Error al escanear')
      }
    })
  }

  //Frena el service.
  const stop = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    stopScanner()
    setIsScanning(false)
  }

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
      stopScanner()
    }
  }, [])

  return { videoRef, isScanning, code, loading, error, start, stop, product }
}