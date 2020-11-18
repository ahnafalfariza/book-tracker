import React, { useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { useParams } from 'react-router-dom'
import Book from '../components/Book'
import Modal from '../components/Modal'
import { parseImgUrl } from '../utils/common'
import { getLibrary, getProfile } from '../utils/skynet'

const Profile = () => {
  const { userId } = useParams()
  const [userData, setUserData] = useState({})
  const [activeTab, setActiveTab] = useState('readingList')
  const [userReadingList, setUserReadingList] = useState([])
  const [userReadingNow, setUserReadingNow] = useState([])
  const [userFinished, setUserFinished] = useState([])
  const [bookList, setBookList] = useState([])
  const [showModal, setShowModal] = useState(null)
  const [activeBookId, setActiveBookId] = useState(-1)

  useEffect(() => {
    const _getData = async () => {
      const profile = await getProfile(userId)
      if (profile) {
        setUserData(profile)
      }
      const library = await getLibrary(userId)
      setBookList(library)
      if (library) {
        const readingList = library.filter((book) => book.libraryType === 'readingList')
        setUserReadingList(readingList)
        const readingNow = library.filter((book) => book.libraryType === 'readingNow')
        setUserReadingNow(readingNow)
        const finished = library.filter((book) => book.libraryType === 'finished')
        setUserFinished(finished)
      }
    }
    if (userId) {
      _getData()
    }
  }, [userId])

  const _showBookDetail = (id) => {
    setShowModal('bookDetail')
    setActiveBookId(id)
  }

  const _getActiveBookIdx = (id) => {
    return bookList.findIndex((book) => book.id === id)
  }

  const activeBookIdx = _getActiveBookIdx(activeBookId)

  return (
    <div>
      {showModal === 'bookDetail' && (
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
                        src={bookList[activeBookIdx].imageLinks.thumbnail}
                        alt={bookList[activeBookIdx].title}
                      />
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <h4 className="text-lg font-bold">{bookList[activeBookIdx].title}</h4>
                    <p className="mt-1 opacity-75">{bookList[activeBookIdx].authors[0]}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mt-4">Description</h4>
                    <p className="mt-1 opacity-75 whitespace-pre-line text-sm">
                      {bookList[activeBookIdx].description?.replaceAll('.', '.\n\n') || 'No description available.'}
                    </p>
                    <hr className="mt-2 border-white opacity-50" />
                    <div className="mt-2 flex justify-between">
                      <p className="opacity-75">Publisher</p>
                      <p>{bookList[activeBookIdx].publisher}</p>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <p className="opacity-75">Published</p>
                      <p>{bookList[activeBookIdx].publishedDate?.split('-')[0] || 'Not Available'}</p>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <p className="opacity-75">ISBN</p>
                      <p>{bookList[activeBookIdx].isbn[0].identifier}</p>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <p className="opacity-75">Pages</p>
                      <p>{bookList[activeBookIdx].pageCount || 'Not available'}</p>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <p className="opacity-75">Category</p>
                      <p>{bookList[activeBookIdx].categories || 'Not available'}</p>
                    </div>
                  </div>
                </div>
              </Scrollbars>
            </div>
          </div>
        </Modal>
      )}
      <div className="px-4 max-w-3xl mx-auto">
        <div className="mx-auto mt-8 w-32 h-32 overflow-hidden rounded-full relative border border-dark-primary-500 bg-dark-primary-600">
          {userData.avatar && <img src={parseImgUrl(userData.avatar)} alt={`${userData.fullname}'s avatar`} />}
        </div>
        <div className="text-center mt-4">
          <h4 className="text-xl font-bold">{userData.fullname}</h4>
          <p className="opacity-75 mt-1">{userData.bio}</p>
        </div>
        <div className="mt-8">
          <div className="flex -mx-2">
            <div
              className={`cursor-pointer opacity-50 w-1/3
                        ${activeTab === 'readingList' && 'opacity-100'}
                      `}
              onClick={(_) => setActiveTab('readingList')}
            >
              <h4 className="text-lg font-semibold text-center">Reading List</h4>
            </div>
            <div
              className={`cursor-pointer opacity-50 w-1/3
                        ${activeTab === 'readingNow' && 'opacity-100'}
                      `}
              onClick={(_) => setActiveTab('readingNow')}
            >
              <h4 className="text-lg font-semibold text-center">Reading Now</h4>
            </div>
            <div
              className={`cursor-pointer opacity-50 w-1/3
                        ${activeTab === 'finished' && 'opacity-100'}
                      `}
              onClick={(_) => setActiveTab('finished')}
            >
              <h4 className="text-lg font-semibold text-center">Finished</h4>
            </div>
          </div>
          <div className="mt-4">
            {activeTab === 'readingList' && (
              <div className="flex flex-wrap -mx-4">
                {userReadingList.map((book, idx) => {
                  return (
                    <div key={book.id} className="w-1/2 md:w-1/3 px-4">
                      <Book book={book} onClick={(_) => _showBookDetail(book.id)} />
                    </div>
                  )
                })}
              </div>
            )}
            {activeTab === 'readingNow' && (
              <div className="flex flex-wrap -mx-4">
                {userReadingNow.map((book, idx) => {
                  return (
                    <div key={book.id} className="w-1/2 md:w-1/3 px-4">
                      <Book book={book} onClick={(_) => _showBookDetail(book.id)} />
                    </div>
                  )
                })}
              </div>
            )}
            {activeTab === 'finished' && (
              <div className="flex flex-wrap -mx-4">
                {userFinished.map((book) => {
                  return (
                    <div key={book.id} className="w-1/2 md:w-1/3 px-4">
                      <Book book={book} onClick={(_) => _showBookDetail(book.id)} />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
