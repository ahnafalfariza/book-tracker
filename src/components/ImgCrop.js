import React, { useState, useEffect, useRef } from 'react'
import { readFileAsUrl } from '../utils/common'

let cropper = null
let height = 0

const ImgCrop = ({
  input,
  type = 'square',
  size = {
    width: 1080,
    height: 1080,
  },
  left,
  right,
}) => {
  const offsetY = 16
  const containerRef = useRef(null)
  const [imgUrl, setImgUrl] = useState('')
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    const readImg = async () => {
      const imgUrl = await readFileAsUrl(input)
      setImgUrl(imgUrl)
    }
    readImg()
  }, [input])

  useEffect(() => {
    if (containerRef) {
      height = containerRef.current.offsetWidth - offsetY
    }
  }, [containerRef])

  useEffect(() => {
    if (typeof window !== 'undefined' && imgUrl.length > 0) {
      const Croppie = require('croppie')
      const vWidth = height * (size.width / size.height)
      const vHeight = height
      cropper = new Croppie(document.getElementById('new-img'), {
        boundary: { width: `100%`, height: vHeight },
        viewport: { width: vWidth, height: vHeight, type: type },
      })
      setFirstLoad(false)
    }
  }, [imgUrl, size, type])

  const _right = async (e) => {
    e.preventDefault()

    const newFile = await cropper.result({
      type: 'blob',
      size: size,
      format: 'jpeg',
    })
    newFile.lastModifiedDate = new Date()
    newFile.name = input.name
    const newImg = await readFileAsUrl(newFile)

    right({
      type: 'img',
      body: newImg,
      payload: {
        imgFile: newFile,
        imgUrl: newImg,
      },
    })
  }

  const _left = () => {
    left()
  }

  return (
    <div
      id="new-modal-bg"
      className={`${!firstLoad ? `visible` : `invisible`}
      fixed inset-0 z-50 flex items-center
      `}
      style={{
        backgroundColor: `rgba(0,0,0,0.86)`,
      }}
    >
      <div className="max-w-sm m-auto p-4 w-full">
        <div className="bg-gray-100 w-full rounded-md overflow-hidden">
          <div className="flex justify-between items-center w-full h-12 bg-dark-12 px-2">
            <div className="w-8 flex items-center">
              <button onClick={(_) => _left()}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.9999 17.6979L10.8484 22.8494L9.15137 21.1523L14.3028 16.0009L9.15137 10.8494L10.8484 9.15234L15.9999 14.3038L21.1514 9.15234L22.8484 10.8494L17.697 16.0009L22.8484 21.1523L21.1514 22.8494L15.9999 17.6979Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-auto overflow-hidden px-2 font-bold">
              Edit Image
            </div>
            <div className="w-8 flex items-center justify-end">
              <button>
                <svg
                  onClick={(e) => _right(e)}
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                    fill="#E13128"
                  />
                  <circle cx="16" cy="16" r="16" fill="#E13128" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.7061 19.2929L22.999 10L24.4132 11.4142L13.7061 22.1213L7.99902 16.4142L9.41324 15L13.7061 19.2929Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            ref={containerRef}
            className="relative w-full"
            style={{
              minHeight: `${height}px`,
            }}
          >
            <div>
              <img id="new-img" src={imgUrl} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImgCrop
