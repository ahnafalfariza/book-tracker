import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import Modal from '../components/Modal'
import { Scrollbars } from 'react-custom-scrollbars'

import useStore from '../store'
import { addToLibrary, getLibrary } from '../utils/skynet'
import { Link } from 'react-router-dom'
import Book from '../components/Book'

const Library = () => {
  const { booksData, setBooksData } = useStore((state) => state)
  const [showModal, setShowModal] = useState(null)
  const [activeBookId, setActiveBookId] = useState()
  const [activeTab, setActiveTab] = useState('readingStatus')
  const [readingStatusLoader, setReadingStatusLoader] = useState(null)
  const [bookFilter, setBookFilter] = useState('all')

  useEffect(() => {
    getLibrary().then((res) => {
      if (res) {
        setBooksData(res)
      }
    })
  }, [setBooksData])

  const onChangeStatus = async (value) => {
    setReadingStatusLoader(value)
    const newData = booksData
    const idx = _getActiveBookIdx(activeBookId)
    newData[idx].libraryType = value
    await addToLibrary(newData)
    setBooksData(newData)
    setReadingStatusLoader(null)
  }

  const _setActiveBook = (id) => {
    setActiveBookId(id)
    setShowModal('activeBook')
  }

  const _getActiveBookIdx = (id) => {
    return booksData.findIndex((book) => book.id === id)
  }

  const activeBookIdx = _getActiveBookIdx(activeBookId)

  return (
    <div className="flex flex-col max-w-5xl m-auto px-4">
      {showModal === 'activeBook' && (
        <Modal close={(_) => setShowModal(null)}>
          <div className="mx-auto max-w-md w-full h-full max-h-screen py-6">
            <div className="w-full h-full relative bg-dark-primary-800 rounded-md shadow-md overflow-hidden py-4">
              <div className="absolute z-10 right-0 top-0 px-4 py-2">
                <div
                  className="bg-dark-primary-700 hover:bg-dark-primary-600 transition-all duration-100 rounded-full p-2 shadow-lg cursor-pointer"
                  onClick={(_) => setShowModal(null)}
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

              <Scrollbars autoHide className="opacity-100">
                <div className="px-4">
                  <div className="mx-auto w-40">
                    <div
                      className="relative rounded-lg overflow-hidden"
                      style={{
                        paddingBottom: `153%`,
                      }}
                    >
                      <img
                        className="w-full absolute"
                        src={booksData[activeBookIdx].imageLinks.thumbnail}
                        alt={booksData[activeBookIdx].title}
                      />
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <h4 className="text-lg font-bold">{booksData[activeBookIdx].title}</h4>
                    <p className="mt-1 opacity-75">{booksData[activeBookIdx].authors[0]}</p>
                  </div>
                  <div className="flex -mx-2">
                    <div
                      className={`cursor-pointer opacity-50
                        ${activeTab === 'readingStatus' && 'opacity-100'}
                      `}
                      onClick={(_) => setActiveTab('readingStatus')}
                    >
                      <h4 className="text-lg font-semibold mt-4 px-2">Reading Status</h4>
                    </div>
                    <div
                      className={`cursor-pointer opacity-50
                        ${activeTab === 'bookInfo' && 'opacity-100'}
                      `}
                      onClick={(_) => setActiveTab('bookInfo')}
                    >
                      <h4 className="text-lg font-semibold mt-4 px-2">Book Info</h4>
                    </div>
                  </div>
                  {activeTab === 'readingStatus' && (
                    <div className="mt-2">
                      <div className="flex flex-wrap -mx-2">
                        <div className="w-full my-1">
                          <div
                            onClick={(_) => onChangeStatus('readingList')}
                            className="flex justify-between cursor-pointer px-2 py-2 rounded-md hover:bg-dark-primary-900"
                          >
                            <div
                              className={`flex items-center opacity-50 ${
                                booksData[activeBookIdx].libraryType === 'readingList' && 'opacity-100'
                              }`}
                            >
                              <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clip-path="url(#clip0)">
                                    <path
                                      d="M22.2879 8.29238C22.1908 7.56281 22.1771 6.30623 22.8548 5.88429C22.8669 5.87655 22.8759 5.86538 22.8865 5.85578C23.4405 5.67858 23.8239 5.4299 23.523 5.09527L15.3504 2.63281L2.11727 4.47264C2.11727 4.47264 0.601904 4.68923 0.737274 7.04353C0.810761 8.3249 1.21265 8.95419 1.56411 9.2639L0.478208 9.59115C0.176811 9.92578 0.560146 10.1745 1.11423 10.3514C1.12476 10.3613 1.13365 10.3724 1.14596 10.3802C1.82318 10.8025 1.81014 12.0589 1.71273 12.7886C-0.720145 13.4794 0.153175 13.7046 0.153175 13.7046L0.68685 13.8337C0.311465 14.1729 -0.0613411 14.8162 0.00849295 16.0362C0.143935 18.39 1.38863 18.5525 1.38863 18.5525L10.0483 21.3672L23.1191 18.2012C23.1191 18.2012 23.9927 17.9758 21.5592 17.2849C21.4614 16.5563 21.4478 15.3 22.1266 14.8766C22.139 14.8691 22.1481 14.8577 22.1582 14.8483C22.7123 14.6711 23.0954 14.4226 22.7943 14.088L22.2262 13.9164C22.6051 13.6879 23.1742 13.0908 23.2634 11.5397C23.3249 10.4728 23.0466 9.84793 22.7244 9.48006L23.8473 9.20832C23.8474 9.20875 24.721 8.98327 22.2879 8.29238ZM11.3549 8.26223L13.5529 7.81049L20.981 6.28402L22.0877 6.0564C21.7341 6.7036 21.7489 7.58931 21.8074 8.15859C21.8202 8.28737 21.835 8.40497 21.8493 8.49436L20.638 8.79554L11.2625 11.1279L11.3549 8.26223ZM1.91314 10.553L3.01967 10.7806L10.1533 12.2471L10.7765 12.3747L12.6454 12.7588L12.7376 15.6245L3.10161 13.2272L2.15165 12.9911C2.16561 12.9016 2.18037 12.7841 2.19376 12.655C2.25192 12.0861 2.26703 11.2002 1.91314 10.553ZM1.48325 6.93022C1.46985 6.30401 1.58144 5.85112 1.80699 5.62092C1.95052 5.47395 2.11992 5.44337 2.23609 5.44337C2.29747 5.44337 2.34167 5.45189 2.34468 5.45189L8.0465 7.31076L10.8912 8.23823L10.7979 11.1239L2.81733 8.88651L2.39617 8.76854C2.3807 8.76417 2.35972 8.76116 2.34353 8.76045C2.31065 8.75808 1.52164 8.68546 1.48325 6.93022ZM10.069 20.117L1.66746 17.7615C1.65192 17.757 1.63115 17.754 1.61496 17.7532C1.58151 17.751 0.792139 17.6784 0.753963 15.9236C0.740354 15.2966 0.852518 14.8442 1.07763 14.6138C1.22153 14.4668 1.39099 14.4362 1.50695 14.4362C1.56848 14.4362 1.61253 14.4444 1.61575 14.4444C1.61575 14.4444 1.61611 14.4444 1.61575 14.4444L10.1617 17.2312L10.069 20.117ZM21.078 17.1512C21.0913 17.2804 21.106 17.3978 21.1204 17.4873L10.5334 20.1211L10.6259 17.2554L12.8893 16.79L13.2236 16.8709L14.4765 16.4637L20.2516 15.2769L21.3587 15.0492C21.0048 15.6963 21.0195 16.5824 21.078 17.1512ZM21.6612 13.2566C21.6419 13.257 21.6227 13.2596 21.6046 13.2654L20.8061 13.4889L13.2033 15.6207L13.1103 12.735L15.6047 11.9215L21.6446 9.95171C21.6454 9.95135 21.9623 9.88095 22.195 10.1175C22.4201 10.3477 22.5319 10.8006 22.5187 11.4268C22.4793 13.1815 21.6899 13.2544 21.6612 13.2566Z"
                                      fill="black"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0">
                                      <rect width="24" height="23.9999" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <p className="ml-4 text-xl">Reading List</p>
                            </div>
                            {readingStatusLoader === 'readingList' && (
                              <div className="w-8">
                                <ReactLoading color={'white'} height="100%" width="100%" />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="w-full my-1">
                          <div
                            onClick={(_) => onChangeStatus('readingNow')}
                            className="flex justify-between cursor-pointer px-2 py-2 rounded-md hover:bg-dark-primary-900"
                          >
                            <div
                              className={`flex items-center opacity-50 ${
                                booksData[activeBookIdx].libraryType === 'readingNow' && 'opacity-100'
                              }`}
                            >
                              <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M23.0057 9.90219V8.45354L22.8973 8.05141C22.8664 8.00312 22.3827 7.16085 21.4146 6.29483C20.68 5.63779 19.6319 4.96334 18.3052 4.67915V2.01855C12.4781 2.44048 11.8686 7.01519 11.8686 7.01519V7.05715C11.8638 7.06189 11.8575 7.06823 11.8528 7.07377C11.6438 6.83075 11.3905 6.56477 11.0904 6.29483C10.1239 5.43197 8.62933 4.53508 6.66218 4.53508C4.69266 4.53508 3.21314 5.43514 2.26638 6.30037C1.31882 7.17035 0.854938 8.01737 0.827231 8.06566L0.725114 8.45354V9.90219H0V21.9821H24V9.90219H23.0057V9.90219ZM4.29685 19.5313C4.93885 19.1521 5.71937 18.8759 6.66376 18.8743C7.6042 18.8743 8.3966 19.1513 9.05284 19.5313H4.29685ZM11.0517 18.9796C10.0883 18.1294 8.60716 17.2523 6.66376 17.2523H6.6606C4.74807 17.2523 3.29943 18.1009 2.35504 18.9408V8.6839C2.52207 8.429 2.88541 7.92475 3.43558 7.43949C4.19315 6.77454 5.24758 6.16421 6.66376 6.16421C8.12032 6.16421 9.22858 6.81966 10.0067 7.51074C10.393 7.8543 10.6931 8.2034 10.8878 8.46146C10.9559 8.54933 11.0097 8.63166 11.0517 8.6934C11.0517 8.6934 11.0517 18.9796 11.0517 18.9796ZM16.9887 3.43316V4.53587V6.16421V15.5986C16.9887 15.5986 14.7952 15.2076 12.6998 17.109V8.6562V7.69914C12.6998 7.69914 13.4866 4.13373 16.9887 3.43316ZM14.6218 19.5313C15.2662 19.1521 16.0475 18.8759 16.9871 18.8743C17.9284 18.8743 18.7231 19.1513 19.3802 19.5313H14.6218ZM21.3798 18.9796C20.4116 18.1262 18.9337 17.2523 16.9871 17.2523C15.0762 17.2507 13.626 18.1009 12.6784 18.9408V18.8759C14.5007 16.4005 18.306 17.0591 18.306 17.0591V6.35657C19.1332 6.60276 19.81 7.04448 20.3356 7.50995C20.7235 7.8535 21.0156 8.2026 21.2104 8.46067C21.28 8.54854 21.3354 8.63086 21.379 8.69261V18.9796H21.3798Z"
                                    fill="black"
                                  />
                                </svg>
                              </div>
                              <p className="ml-4 text-xl">Reading Now</p>
                            </div>
                            {readingStatusLoader === 'readingNow' && (
                              <div className="w-8">
                                <ReactLoading color={'white'} height="100%" width="100%" />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="w-full my-1">
                          <div
                            onClick={(_) => onChangeStatus('finished')}
                            className="flex justify-between cursor-pointer px-2 py-2 rounded-md hover:bg-dark-primary-900"
                          >
                            <div
                              className={`flex items-center opacity-50 ${
                                booksData[activeBookIdx].libraryType === 'finished' && 'opacity-100'
                              }`}
                            >
                              <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M8.25 17.5H19.5833C20.3657 17.5 21 16.8844 21 16.125V2.375C21 1.61557 20.3657 1 19.5833 1H16.75H12.5H6.83333C5.26862 1 4 2.23114 4 3.75V17.5V18.875C4 21.1497 5.90644 23 8.25 23H19.5833C20.3657 23 21 22.3843 21 21.625C21 20.8657 20.3657 20.25 19.5833 20.25H8.25C7.46871 20.25 6.83333 19.6333 6.83333 18.875C6.83333 18.1167 7.46871 17.5 8.25 17.5ZM12.8692 12.639L18.2692 6.13902L16.7308 4.86098L11.9606 10.6029L9.62775 8.72159L8.37225 10.2784L11.4722 12.7784L12.2394 13.3971L12.8692 12.639Z"
                                    fill="black"
                                  />
                                </svg>
                              </div>
                              <p className="ml-4 text-xl">Finished</p>
                            </div>
                            {readingStatusLoader === 'finished' && (
                              <div className="w-8">
                                <ReactLoading color={'white'} height="100%" width="100%" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === 'bookInfo' && (
                    <div>
                      <h4 className="text-lg font-semibold mt-4">Description</h4>
                      <p className="mt-1 opacity-75 whitespace-pre-line text-sm">
                        {booksData[activeBookIdx].description?.replaceAll('.', '.\n\n') || 'No description available.'}
                      </p>
                      <hr className="mt-2 border-white opacity-50" />
                      <div className="mt-2 flex justify-between">
                        <p className="opacity-75">Publisher</p>
                        <p>{booksData[activeBookIdx].publisher}</p>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <p className="opacity-75">Published</p>
                        <p>{booksData[activeBookIdx].publishedDate?.split('-')[0] || 'Not Available'}</p>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <p className="opacity-75">ISBN</p>
                        <p>{booksData[activeBookIdx].isbn[0].identifier}</p>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <p className="opacity-75">Pages</p>
                        <p>{booksData[activeBookIdx].pageCount || 'Not available'}</p>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <p className="opacity-75">Category</p>
                        <p>{booksData[activeBookIdx].categories || 'Not available'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Scrollbars>
            </div>
          </div>
        </Modal>
      )}
      <div className="flex justify-between">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">My Library</h1>
        </div>
        <div className="flex items-center -mx-2">
          <div className="px-2 hidden md:block">
            <Link to="/explore">
              <h4 className="text-primary-color font-medium">+ Add Book</h4>
            </Link>
          </div>
          <div className="px-2">
            <select
              value={bookFilter}
              onChange={(e) => setBookFilter(e.target.value)}
              className="bg-dark-primary-800 outline-none p-2 rounded-md text-gray-300"
            >
              <option defaultValue value="all">
                All
              </option>
              <option value="readingList">Reading List</option>
              <option value="readingNow">Reading Now</option>
              <option value="finished">Finished</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-4">
        {booksData
          .filter((book) => (bookFilter === 'all' ? true : bookFilter === book.libraryType))
          .map((res, idx) => (
            <div key={idx} className="w-1/2 md:w-1/4 p-4">
              <Book idx={idx} book={res} onClick={(_) => _setActiveBook(res.id)} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Library
