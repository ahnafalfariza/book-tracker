import React, { useEffect, useState } from 'react'
import { BrowserBarcodeReader } from '@zxing/library'

import Modal from './Modal'

const ScanBarcodeModal = ({ onFinish, onClose }) => {
  const [selectedDeviceId, setSelectedDeviceId] = useState(null)
  const [listInputDevice, setListInputDevice] = useState([])

  useEffect(() => {
    const codeReader = new BrowserBarcodeReader()
    codeReader.getVideoInputDevices().then((videoInputDevices) => {
      console.log(videoInputDevices)
      setListInputDevice(videoInputDevices)
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
  }, [onFinish, selectedDeviceId])

  return (
    <Modal close={onClose}>
      <div className="max-w-xl w-full px-4 py-2 bg-black m-auto rounded-md">
        <h1>Scan Barcode</h1>
        <div>
          <label>Change video source:</label>
          <select value={selectedDeviceId} onChange={(event) => setSelectedDeviceId(event.target.value)}>
            {listInputDevice.map((cam) => (
              <option key={cam.deviceId} value={cam.deviceId}>
                {cam.label}
              </option>
            ))}
          </select>
        </div>
        <video id="video" width="900" height="900"></video>
      </div>
    </Modal>
  )
}

export default ScanBarcodeModal
