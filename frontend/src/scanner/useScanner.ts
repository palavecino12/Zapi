import { useEffect, useRef, useState } from 'react'
import { startScanner, stopScanner } from './scannerService'
import { getProductByCode } from '../services/productServices'
import type { Product } from '../types/productType'

export const useScanner = () => {

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const hasScannedRef = useRef(false) //Ref para evitar detecciones múltiples

  const [isScanning, setIsScanning] = useState(false)
  const [code, setCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null)

  const start = () => {
    if (!videoRef.current) return

    //Resetea los estados cuando arranca la deteccion.
    hasScannedRef.current = false
    setIsScanning(true)
    setError(null)
    setCode(null)
    setProduct(null)

    startScanner(videoRef.current, {
      //Primer callback: en caso de exito mandamos el codigo al back y almacenamos el producto.
      onResult: async (text) => {
        //Si ya tenemos un valor almacenado no seguimos.
        if (hasScannedRef.current) return
        hasScannedRef.current = true
        //Cortamos el escaneo apenas detectamos algo válido
        stopScanner()
        setIsScanning(false)
        setLoading(true)

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
    stopScanner()
    setIsScanning(false)
  }

  useEffect(() => {
    return () => {
      stopScanner()
    }
  }, [])

  return { videoRef, isScanning, code, loading, error, start, stop, product }
}