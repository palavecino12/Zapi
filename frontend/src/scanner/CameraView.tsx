import { useEffect } from 'react'
import { useScanner } from './useScanner'
import { useCart } from '../cart/useCart';

export const CameraView = () => {

    const { videoRef, start, stop, product } = useScanner()
    const { addItem } = useCart();

    //Cada vez que montamos el componente inicamos la deteccion.
    useEffect(() => {
        start()
        return () => stop()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    //Al momento que detecta un producto redirigimos:
    useEffect(() => {
        if (product) {
            addItem(product)
        }
    }, [product]);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="relative w-full max-w-md aspect-video bg-black overflow-hidden shadow-lg">
                <video ref={videoRef} className="w-full h-full object-cover" playsInline autoPlay muted />
                <div className="absolute inset-0 pointer-events-none">
                    {/* Superior izquierda */}
                    <div
                        className={`absolute top-10 left-15 h-10 w-10 border-t-[4px] border-l-[4px] 
                        rounded-tl-lg opacity-55`} />
                    {/* Superior derecha */}
                    <div
                        className={`absolute top-10 right-15 h-10 w-10 border-t-[4px] border-r-[4px]
                        rounded-tr-lg opacity-55`}
                    />
                    {/* Inferior izquierda */}
                    <div
                        className={`absolute bottom-10 left-15 h-10 w-10 border-b-[4px] border-l-[4px]
                        rounded-bl-lg opacity-55`}
                    />
                    {/* Inferior derecha */}
                    <div
                        className={`absolute bottom-10 right-15 h-10 w-10 border-b-[4px] border-r-[4px]
                        rounded-br-lg opacity-55`}
                    />
                </div>
            </div>
        </div>
    )
}