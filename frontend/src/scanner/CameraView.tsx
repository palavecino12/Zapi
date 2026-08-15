import { useEffect, useState } from 'react'
import { useScanner } from './useScanner'
import { useCart } from '../cart/useCart';
import { CameraGuide } from './ScanGuide';
import { Spinner } from '../components/feedback/Spinner';
import { InfoModal } from '../components/feedback/InfoModal';

export const CameraView = () => {

    const { videoRef, start, stop, product, loading, error } = useScanner()
    const { addItem } = useCart();

    //Para manejar el error del escaner. Usamos un modal ya que los problemas de escaner no son muy importantes.
    const [openModal, setOpenModal] = useState(false)
    const [prevError, setPrevError] = useState(error)
    if (error !== prevError) {
        setPrevError(error)
        if (error) setOpenModal(true)
    }

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

            {/* Modal para confirmar la eliminacion de un usuario */}
            <InfoModal open={openModal} onAccept={() => setOpenModal(false)} >
                <h1>{error}</h1>
            </InfoModal>
        </>

    )
}