import { BrowserMultiFormatReader } from '@zxing/browser'
import type { IScannerControls } from '@zxing/browser'
import { DecodeHintType, BarcodeFormat } from '@zxing/library'

//Codigos y QRs que necesitamos detectar, para alivianar la deteccion.
const hints = new Map()
hints.set(DecodeHintType.POSSIBLE_FORMATS, [
  BarcodeFormat.QR_CODE,
  BarcodeFormat.EAN_13,
  BarcodeFormat.EAN_8,
  BarcodeFormat.UPC_A,
  BarcodeFormat.UPC_E,
  BarcodeFormat.CODE_128,
  BarcodeFormat.CODE_39,
])
//Crea instancia del lector.
const codeReader = new BrowserMultiFormatReader(hints)

let controls: IScannerControls | null = null//Almacenamos el control fuera de la funcion.
let activeVideoElement: HTMLVideoElement | null = null

//Contador que identifica cada intento de arranque.
let requestIdCounter = 0

export interface ScannerCallbacks {
  onResult: (text: string) => void
  onError?: (err: unknown) => void
}

interface ExtendedMediaTrackConstraintSet extends MediaTrackConstraintSet {
  focusMode?: 'continuous' | 'manual' | 'single-shot' | 'none'
}

//(PRINCIPAL)
export const startScanner = async (videoElement: HTMLVideoElement, { onResult, onError }: ScannerCallbacks) => {
  stopScanner()//Limpiamos por las dudas antes de arrancar (esto también invalida cualquier start anterior en curso).
  const requestId = requestIdCounter

  activeVideoElement = videoElement

  try {
    //Almacena una lista de camaras disponibles.
    const devices = await BrowserMultiFormatReader.listVideoInputDevices()
    //Intetamos usar solo la camara trasera.
    const backCamera = devices.find(d => {
      const label = d.label.toLowerCase();
      return label.includes('back') || label.includes('trasera') || label.includes('environment');
    }) || devices[0];

    //Control del lector.
    const newControls = await codeReader.decodeFromConstraints(
      {
        video: {
          deviceId: backCamera?.deviceId ? { exact: backCamera.deviceId } : undefined,
          facingMode: backCamera?.deviceId ? undefined : { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
          advanced: [
            { focusMode: 'continuous' } as ExtendedMediaTrackConstraintSet
          ]
        }
      },
      videoElement,
      (result, err) => {
        if (result) {
          onResult(result.getText())
        }
        if (err) return
      }
    )

    if (requestId !== requestIdCounter) {
      newControls.stop()
      const stream = videoElement.srcObject as MediaStream | null
      stream?.getTracks().forEach(track => track.stop())
      if (videoElement.srcObject) videoElement.srcObject = null
      return
    }

    controls = newControls
  } catch (error) {
    onError?.(error)
  }
}

export const stopScanner = () => {
  requestIdCounter++ //Invalida cualquier startScanner que esté en curso.

  //Frena los controles de zxing.
  if (controls) {
    controls.stop()
    controls = null
  }

  //Frena manualmente los tracks del stream, por si zxing no lo hizo.
  if (activeVideoElement?.srcObject) {
    const stream = activeVideoElement.srcObject as MediaStream
    stream.getTracks().forEach(track => track.stop())
    activeVideoElement.srcObject = null
  }

  activeVideoElement = null
}