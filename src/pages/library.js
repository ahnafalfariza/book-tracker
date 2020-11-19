import React, { useEffect, useState } from 'react'

import useStore from '../store'
import { getLibrary } from '../utils/skynet'
import { Link } from 'react-router-dom'
import Book from '../components/Book'
import BookModal from '../components/BookModal'

const Library = () => {
  const { booksData, setBooksData, userId } = useStore((state) => state)
  const [showModal, setShowModal] = useState(null)
  const [detailBook, setDetailBook] = useState(null)
  const [bookFilter, setBookFilter] = useState('all')

  useEffect(() => {
    if (userId) {
      getLibrary().then((res) => {
        if (res) {
          setBooksData(res)
        }
      })
    }
  }, [setBooksData, userId])

  const onPressBook = (bookData) => {
    setShowModal('detail')
    setDetailBook(bookData)
  }

  const onCloseModal = () => {
    setShowModal(false)
    setDetailBook(null)
  }

  return (
    <div className="flex flex-col max-w-5xl m-auto px-4">
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
              <Book book={res} onClick={(_) => onPressBook(res)} />
            </div>
          ))}
      </div>
      {showModal === 'detail' && <BookModal bookData={detailBook} onClose={onCloseModal} />}
    </div>
  )
}

export default Library
