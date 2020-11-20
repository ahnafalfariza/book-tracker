import React, { useEffect, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/library'

import Modal from './Modal'

const ScanBarcodeModal = ({ onFinish, onClose }) => {
  const [selectedDeviceId, setSelectedDeviceId] = useState(null)
  const [listInputDevice, setListInputDevice] = useState([])

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader()
    codeReader.listVideoInputDevices().then((videoInputDevices) => {
      setListInputDevice(videoInputDevices)
      codeReader
        .decodeOnceFromVideoDevice(selectedDeviceId, 'video')
        .then((result) => {
          console.log(result)
          console.assert(result)
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
      <div className="max-w-xl w-full p-4 bg-dark-primary-800 m-auto rounded-md relative">
        <div className="absolute right-0 top-0 px-4 py-2">
          <div
            className="bg-dark-primary-700 hover:bg-dark-primary-600 transition-all duration-100 rounded-full p-2 shadow-lg cursor-pointer"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.0002 18.8285L7.41436 27.4142L4.58594 24.5858L13.1717 16L4.58594 7.41424L7.41436 4.58582L16.0002 13.1716L24.5859 4.58582L27.4144 7.41424L18.8286 16L27.4144 24.5858L24.5859 27.4142L16.0002 18.8285Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-semibold">Scan Barcode</h3>
        <div className="mt-2 ">
          <select
            className="cursor-pointer bg-dark-primary-700 outline-none p-2 rounded-md text-gray-300"
            value={selectedDeviceId}
            onChange={(event) => setSelectedDeviceId(event.target.value)}
          >
            {listInputDevice.map((cam) => (
              <option key={cam.deviceId} value={cam.deviceId}>
                {cam.label}
              </option>
            ))}
          </select>
        </div>
        <video className="mt-4 rounded-md bg-dark-primary-100" id="video" width="900" height="900"></video>
      </div>
    </Modal>
  )
}

export default ScanBarcodeModal
