import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import useStore from '../store'
import { addToLibrary, getLibrary } from '../utils/skynet'
import ChooseLibraryModal from '../components/ChooseLibraryModal'
import BookModal from '../components/BookModal'
import ManualAddModal from '../components/ManualAddModal'
import ScanBarcodeModal from '../components/ScanBarcodeModal'
import { convertMetaDataGoogle, convertMetaDataNYT } from '../utils/common'

const Explore = () => {
  const [searchResult, setSearchResult] = useState(null)
  const [showModal, setshowModal] = useState(false)
  const [detailBook, setDetailBook] = useState(null)
  const [fictionRecom, setFictionRecom] = useState(null)
  const [nonFictionRecom, setNonFictionRecom] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const { userId, booksData, setBooksData } = useStore((state) => state)

  useEffect(() => {
    if (userId) {
      getLibrary().then((res) => {
        if (res) {
          setBooksData(res)
        }
      })
      getFictionRecomm()
      getNonFictionRecomm()
    }
  }, [setBooksData, userId])

  const onSearch = (query) => {
    if (query !== '') {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=en&maxResults=20`)
        .then((res) => res.json())
        .then((data) => setSearchResult(data.items.map((item) => convertMetaDataGoogle(item))))
        .catch((err) => console.log(err))
    } else {
      setSearchResult(null)
    }
  }

  const getFictionRecomm = () => {
    fetch(
      'https://api.nytimes.com/svc/books/v3/lists/current/e-book-fiction.json?api-key=RjYkR7egFmmMAxpAh2jTTpWPZLSXocJ6'
    )
      .then((res) => res.json())
      .then((res) => setFictionRecom(res.results.books.map((item) => convertMetaDataNYT(item))))
  }

  const getNonFictionRecomm = () => {
    fetch(
      'https://api.nytimes.com/svc/books/v3/lists/current/e-book-nonfiction.json?api-key=RjYkR7egFmmMAxpAh2jTTpWPZLSXocJ6'
    )
      .then((res) => res.json())
      .then((res) => setNonFictionRecom(res.results.books.map((item) => convertMetaDataNYT(item))))
  }

  const onPressAdd = (bookData) => {
    setshowModal('add')
    setDetailBook(bookData)
  }

  const onPressBook = (bookData) => {
    setshowModal('detail')
    setDetailBook(bookData)
  }

  const onCloseModal = () => {
    setshowModal(false)
    setDetailBook(null)
  }

  const addBook = async (libraryType = 'readingList', book = detailBook) => {
    let newData = booksData
    let newBook = { ...book, libraryType: libraryType }

    if (isBookInLibrary(book.id)) {
      const index = newData.findIndex((x) => x.id === book.id)
      newData[index].libraryType = libraryType
    } else {
      newData.push(newBook)
    }

    setIsLoading(true)
    await addToLibrary(newData)
    setBooksData(newData)
    setIsLoading(false)
    onCloseModal()

    console.log(await getLibrary())
  }

  const isBookInLibrary = (id) => {
    return booksData.some((bookData) => bookData.id === id)
  }

  const onFinishScanBarcode = (isbn) => {
    onSearch(isbn)
    onCloseModal()
  }

  return (
    <div className="flex flex-col max-w-4xl m-auto">
      <h1>Explore</h1>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/5">
          <div>
            <Link to="/explore">Explore</Link>
          </div>
          <div>
            <Link to="/">Library</Link>
          </div>
        </div>
        <div className="w-full md:w-4/5">
          <form>
            <input
              type="text"
              onChange={(event) => onSearch(event.target.value)}
              className="border-2 border-black mb-3"
            />
          </form>
          <button onClick={() => setshowModal('manualAdd')}>Manual add</button>
          <button onClick={() => setshowModal('scan')}>Scan barcode</button>
          {searchResult ? (
            searchResult.map((result) => (
              <div key={result.id} className="flex flex-col justify-between my-4">
                <div>
                  <button onClick={() => onPressBook(result)}>
                    {result.imageLinks && <img src={result.imageLinks.thumbnail} alt="Book Cover" />}
                    {result.title}
                  </button>
                </div>
                {result.authors && <h1>by. {result.authors.join(',')}</h1>}
                <div>
                  <button onClick={() => onPressAdd(result)}>
                    {isBookInLibrary(result.id) ? 'Added' : 'Add to Library'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>
              {fictionRecom && (
                <div>
                  <div>fiction recom</div>
                  {fictionRecom.map((result) => (
                    <div key={result.id} className="flex flex-col justify-between my-4">
                      <div>
                        <button onClick={() => onPressBook(result)}>
                          {result.imageLinks && <img src={result.imageLinks.thumbnail} alt="Book Cover" />}
                          {result.title}
                        </button>
                      </div>
                      {result.authors && <h1>by. {result.authors.join(',')}</h1>}
                      <div>
                        <button onClick={() => onPressAdd(result)}>
                          {isBookInLibrary(result.id) ? 'Added' : 'Add to Library'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {nonFictionRecom && (
                <div>
                  <div>non fiction recom</div>
                  {nonFictionRecom.map((result) => (
                    <div key={result.id} className="flex flex-col justify-between my-4">
                      <div>
                        <button onClick={() => onPressBook(result)}>
                          {result.imageLinks && <img src={result.imageLinks.thumbnail} alt="Book Cover" />}
                          {result.title}
                        </button>
                      </div>
                      {result.authors && <h1>by. {result.authors.join(',')}</h1>}
                      <div>
                        <button onClick={() => onPressAdd(result)}>
                          {isBookInLibrary(result.id) ? 'Added' : 'Add to Library'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {showModal === 'add' && (
            <ChooseLibraryModal
              isLoading={isLoading}
              onClose={onCloseModal}
              bookTitle={detailBook.title}
              authors={detailBook.authors}
              header={'Add Book'}
              onPress={addBook}
            />
          )}
          {showModal === 'detail' && (
            <BookModal bookData={detailBook} onClose={onCloseModal} onPressAdd={() => onPressAdd(detailBook)} />
          )}
          {showModal === 'manualAdd' && (
            <ManualAddModal onClose={onCloseModal} onPressAdd={addBook} isLoading={isLoading} />
          )}
          {showModal === 'scan' && <ScanBarcodeModal onClose={onCloseModal} onFinish={onFinishScanBarcode} />}
        </div>
      </div>
    </div>
  )
}

export default Explore
