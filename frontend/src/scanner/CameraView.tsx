import { useEffect } from 'react'
import { useScanner } from './useScanner'

export const CameraView = () => {
    const { videoRef, start, stop, code } = useScanner()

    useEffect(() => {
        start()
        return () => stop()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center w-full">

            {/* Contenedor cámara */}
            <div className="relative w-full max-w-md aspect-video bg-black rounded-xl overflow-hidden shadow-lg">

                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                />

                {/* Línea de escaneo (horizontal) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[90%] h-[2px] bg-red-500 opacity-80" />
                </div>

            </div>

            {/* Resultado */}
            {code && (
                <div className="mt-4 text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded">
                    Código: {code}
                </div>
            )}
        </div>
    )
}

