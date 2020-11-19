import React from 'react'

const Book = ({ book, onClick }) => {
  return (
    <div onClick={(_) => onClick()}>
      <div
        className="book relative rounded-lg overflow-hidden cursor-pointer bg-dark-primary-100"
        style={{
          paddingBottom: `153%`,
        }}
      >
        <img className="w-full h-full absolute object-cover" src={book.imageLinks.thumbnail} alt={book.title} />
        <div
          className="info absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%)`,
          }}
        >
          <div className="w-full h-full flex items-end p-2">
            <div className="text">
              <p
                className="text-lg font-bold overflow-hidden"
                style={{
                  maxHeight: `112px`,
                }}
              >
                {book.title}
              </p>
              {book.authors && <p className="opacity-75">by {book.authors[0]}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book
