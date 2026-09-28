import { useEffect } from 'react'
import { useScanner } from './useScanner'
import { CameraGuide } from './ScanGuide';
import { Spinner } from '../components/feedback/Spinner';
import { ErrorModal } from '../components/feedback/ErrorModal';
import type { Product } from '../types/productType';

interface CameraProps {
    mode: "client" | "admin";
    onScanProduct?: (product: Product) => void
    onScanCode?: (code: string) => void
}

export const CameraView = ({ mode, onScanCode, onScanProduct }: CameraProps) => {

    const { videoRef, start, stop, product, loading, error, code } = useScanner({mode})

    //Cada vez que montamos el componente inicamos la deteccion.
    useEffect(() => {
        start()
        return () => stop()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    //Al momento que detecta un producto lo añadimos al carrito:
    useEffect(() => {
        if (mode === "client" && product && onScanProduct) {
            console.log("cliente")
            onScanProduct(product)
        }
    }, [mode, product, onScanProduct]);

    //Al momento de detectar un codigo lo mandamos al componente padre
    useEffect(() => {
        if (mode === "admin" && code && onScanCode) {
            console.log("admin")
            onScanCode(code)
        }
    }, [mode, code, onScanCode])

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full">
                <div className="relative w-full max-w-md aspect-video bg-black overflow-hidden shadow-lg">
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

            {/* Modal para advetir de un problema no mayor */}
            <ErrorModal error={error} />
        </>

    )
}