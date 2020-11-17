import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import useStore from '../store'
import { addToLibrary, getLibrary } from '../utils/skynet'
import ChooseLibraryModal from '../components/ChooseLibraryModal'
import BookModal from '../components/BookModal'
import ManualAddModal from '../components/ManualAddModal'
import ScanBarcodeModal from '../components/ScanBarcodeModal'

const Explore = () => {
  const [searchResult, setSearchResult] = useState(null)
  const [showModal, setshowModal] = useState(false)
  const [detailBook, setDetailBook] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const { booksData, setBooksData } = useStore((state) => state)

  useEffect(() => {
    getLibrary().then((res) => setBooksData(res))
  }, [setBooksData])

  const onSearch = (query) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=en&maxResults=20`)
      .then((res) => res.json())
      .then((data) => setSearchResult(data.items))
      .catch((err) => console.log(err))
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

  const convertMetaData = (bookData) => {
    return {
      id: bookData.id,
      title: bookData.volumeInfo.title,
      authors: bookData.volumeInfo.authors,
      publisher: bookData.volumeInfo.publisher,
      publishedDate: bookData.volumeInfo.publishedDate,
      isbn: bookData.volumeInfo.industryIdentifiers,
      description: bookData.volumeInfo.description,
      pageCount: bookData.volumeInfo.pageCount,
      categories: bookData.volumeInfo.categories,
      imageLinks: bookData.volumeInfo.imageLinks,
    }
  }

  const addBook = async (libraryType = 'readingList', book = detailBook, convert = true) => {
    let newData = booksData
    let newBook = convert ? convertMetaData(book) : book
    newBook = { ...newBook, libraryType: libraryType }

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
          {searchResult &&
            searchResult.map((result) => (
              <div key={result.id} className="flex flex-col justify-between my-4">
                <div>
                  <button onClick={() => onPressBook(result)}>
                    {result.volumeInfo.imageLinks && (
                      <img src={result.volumeInfo.imageLinks.thumbnail} alt="Book Cover" />
                    )}
                    {result.volumeInfo.title}
                  </button>
                </div>
                {result.volumeInfo.authors && <h1>by. {result.volumeInfo.authors.join(',')}</h1>}
                <div>
                  <button onClick={() => onPressAdd(result)}>
                    {isBookInLibrary(result.id) ? 'Added' : 'Add to Library'}
                  </button>
                </div>
              </div>
            ))}
          {showModal === 'add' && (
            <ChooseLibraryModal
              isLoading={isLoading}
              onClose={onCloseModal}
              bookTitle={detailBook.volumeInfo.title}
              authors={detailBook.volumeInfo.authors}
              header={'Add Book'}
              onPress={addBook}
            />
          )}
          {showModal === 'detail' && <BookModal bookData={convertMetaData(detailBook)} onClose={onCloseModal} />}
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
