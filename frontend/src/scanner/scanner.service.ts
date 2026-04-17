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
    // evita múltiples instancias activas
    stopScanner()

    const devices = await BrowserMultiFormatReader.listVideoInputDevices()

    const backCamera =
      devices.find(d => d.label.toLowerCase().includes('back')) || devices[0]

    controls = await codeReader.decodeFromVideoDevice(
      backCamera.deviceId,
      videoElement,
      (result, err) => {
        if (result) {
          onResult(result.getText())
        }

        // ignoramos errores normales de escaneo
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