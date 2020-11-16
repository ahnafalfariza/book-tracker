import React from 'react'
import Modal from './Modal'

const BookModal = ({ bookData, onClose }) => {
  console.log(bookData)
  return (
    <Modal close={onClose}>
      <div className="max-w-xl w-full px-4 py-2 bg-gray-100 m-auto rounded-md">
        <h1>Book Detail</h1>
        {bookData.imageLinks && <img src={bookData.imageLinks.thumbnail} alt="Book Cover" />}
        <h1>{bookData.title}</h1>
        {/* <h1>{bookData.isbn}</h1> */}
        {bookData.authors && <h1>by. {bookData.authors.join(',')}</h1>}
        <h1>{bookData.publisher}</h1>
        <h1>{bookData.publishedDate}</h1>
        <h1>{bookData.description}</h1>
        <h1>{bookData.pageCount}</h1>
        <h1>{bookData.categories}</h1>
      </div>
    </Modal>
  )
}

export default BookModal
