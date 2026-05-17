import { BrowserMultiFormatReader } from '@zxing/browser'
import type { IScannerControls } from '@zxing/browser'

const codeReader = new BrowserMultiFormatReader()

let controls: IScannerControls | null = null

export interface ScannerCallbacks {
  onResult: (text: string) => void
  onError?: (err: unknown) => void
}

export const startScanner = async (
  videoElement: HTMLVideoElement,
  { onResult, onError }: ScannerCallbacks
) => {
  try {
    //evita múltiples instancias activas
    stopScanner()

    const devices = await BrowserMultiFormatReader.listVideoInputDevices()

    //Buscamos la cámara trasera incluyendo términos en español para que el celular no use la frontal
    const backCamera = devices.find(d => {
      const label = d.label.toLowerCase();
      return label.includes('back') || label.includes('trasera') || label.includes('environment');
    }) || devices[0];

    controls = await codeReader.decodeFromVideoDevice(
      backCamera.deviceId,
      videoElement,
      (result, err) => {
        if (result) {
          onResult(result.getText())
        }

        //ignoramos errores normales de escaneo
        if (err) return
      }
    )
  } catch (error) {
    onError?.(error)
  }
}

export const stopScanner = () => {
  if (controls) {
    controls.stop()
    controls = null
  }
}