import { useEffect } from 'react'
import { useScanner } from './useScanner'
import { useCart } from '../cart/useCart';
import { CameraGuide } from './ScanGuide';
import { Spinner } from '../components/feedback/Spinner';

export const CameraView = () => {

    const { videoRef, start, stop, product, loading } = useScanner()
    const { addItem } = useCart();

    //Cada vez que montamos el componente inicamos la deteccion.
    useEffect(() => {
        start()
        return () => stop()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    //Al momento que detecta un producto lo añadimos al carrito:
    useEffect(() => {
        if (product) {
            addItem(product)
        }
    }, [product]);

    return (
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
    )
}