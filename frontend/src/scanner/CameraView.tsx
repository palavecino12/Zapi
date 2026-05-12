import { useEffect } from 'react'
import { useScanner } from './useScanner'
import { useNavigate } from 'react-router-dom';

export const CameraView = () => {
    const { videoRef, start, stop, product } = useScanner()

    const navigate = useNavigate();

    //Iniciar scanner
    useEffect(() => {
        start()
        return () => stop()
    }, [])

    //Redirigir cuando se encuentre un producto
    useEffect(() => {
        if (product) {
            navigate("/product", {
                state: {
                    product,
                },
            });
        }
    }, [product]);

    return (
        <div className="flex flex-col items-center justify-center w-full">

            {/* Contenedor cámara */}
            <div className="relative w-full max-w-md aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover" />

                {/* Línea de escaneo (horizontal) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[90%] h-[2px] bg-red-500 opacity-80" />
                </div>
            </div>
        </div>
    )
}
