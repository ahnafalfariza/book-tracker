import React, { useEffect } from 'react'
import Modal from './Modal'

import { BrowserBarcodeReader } from '@zxing/library'

const ScanBarcodeModal = ({ onFinish, onClose }) => {
  useEffect(() => {
    const codeReader = new BrowserBarcodeReader()
    codeReader.getVideoInputDevices().then((videoInputDevices) => {
      console.log(videoInputDevices)
      let selectedDeviceId = videoInputDevices[0].deviceId
      codeReader
        .decodeOnceFromVideoDevice(selectedDeviceId, 'video')
        .then((result) => {
          console.log(result)
          onFinish(result.text)
        })
        .catch((err) => {
          console.error(err)
        })
    })
    return () => codeReader.reset()
  }, [onFinish])

  return (
    <Modal close={onClose}>
      <div className="max-w-xl w-full px-4 py-2 bg-black m-auto rounded-md">
        <h1>Scan Barcode</h1>
        <video id="video" width="900" height="900"></video>
      </div>
    </Modal>
  )
}

export default ScanBarcodeModal
