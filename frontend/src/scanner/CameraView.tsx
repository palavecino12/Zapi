import { useEffect, useRef } from 'react'
import { useScanner } from './useScanner'
import { CameraGuide } from './ScanGuide';
import { Spinner } from '../components/feedback/Spinner';
import { ErrorModal } from '../components/feedback/ErrorModal';
import type { Product } from '../types/productType';

interface CameraProps {
    mode: "client" | "admin";
    onScanProduct?: (product: Product) => void
    onScanCode?: (code: string, existProduct: boolean) => void
}

export const CameraView = ({ mode, onScanCode, onScanProduct }: CameraProps) => {

    const { videoRef, start, stop, product, loading, error, code, existProduct } = useScanner({ mode })

    //Siempre apuntan a la última versión de los callbacks del padre
    const onScanCodeRef = useRef(onScanCode)
    const onScanProductRef = useRef(onScanProduct)

    useEffect(() => {
        onScanCodeRef.current = onScanCode
        onScanProductRef.current = onScanProduct
    })

    useEffect(() => {
        start()
        return () => stop()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    // Cliente: al detectar un producto lo añadimos al carrito
    useEffect(() => {
        if (mode === "client" && product) {
            onScanProductRef.current?.(product)
        }
    }, [mode, product])

    // Admin: avisamos al padre recién cuando la consulta terminó sin error
    useEffect(() => {
        if (mode === "admin" && code && !loading && !error) {
            onScanCodeRef.current?.(code, existProduct)
        }
    }, [mode, code, loading, error, existProduct])

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full">
                <div className="relative w-full max-w-md aspect-video bg-black overflow-hidden shadow-lg rounded-xl">
                    <video ref={videoRef} className="w-full h-full object-cover" playsInline autoPlay muted />
                    {loading
                        ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-md">
                                <Spinner />
                            </div>
                        )
                        : <CameraGuide />
                    }
                </div>
            </div>

            <ErrorModal error={error} />
        </>
    )
}