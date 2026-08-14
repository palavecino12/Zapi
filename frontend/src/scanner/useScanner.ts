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
        //Si ya estamos procesando un código, ignoramos esta detección (pero la cámara sigue prendida)
        if (isProcessingRef.current) return
        isProcessingRef.current = true
        setLoading(true)
        //Ya NO llamamos stopScanner() ni setIsScanning(false) acá: la cámara sigue viva y siguen entrando frames

        try {
          setCode(text);
          console.log(text)//Eliminar cuando ya funcione todo bien

          const foundProduct = await getProductByCode(text);
          console.log("Codigo enviado a backend")//Eliminar cuando ya funcione todo bien

          setProduct(foundProduct);

        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Error obteniendo producto");
          }
        } finally {
          setLoading(false)
          //Esperamos 1 segundo antes de liberar el lock, para dar un respiro antes del próximo escaneo
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

  //Frena el service. Acá SÍ apagamos la cámara, porque es una acción explícita del usuario/desmontaje.
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