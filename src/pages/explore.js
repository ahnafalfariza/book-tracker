import React, { useEffect, useState } from 'react'

import useStore from '../store'
import { addToLibrary, getLibrary } from '../utils/skynet'
import BookModal from '../components/BookModal'
import ManualAddModal from '../components/ManualAddModal'
import ScanBarcodeModal from '../components/ScanBarcodeModal'
import { convertMetaDataGoogle, convertMetaDataNYT } from '../utils/common'
import Book from '../components/Book'

const recomList = [
  'combined-print-and-e-book-fiction',
  'combined-print-and-e-book-nonfiction',
  'hardcover-fiction',
  'hardcover-nonfiction',
  'trade-fiction-paperback',
  'mass-market-paperback',
  'paperback-nonfiction',
  'e-book-fiction',
  'e-book-nonfiction',
  'hardcover-advice',
  'paperback-advice',
  'advice-how-to-and-miscellaneous',
  'hardcover-graphic-books',
  'paperback-graphic-books',
  'manga',
  'combined-print-fiction',
  'combined-print-nonfiction',
  'chapter-books',
  'childrens-middle-grade',
  'childrens-middle-grade-e-book',
  'childrens-middle-grade-hardcover',
  'childrens-middle-grade-paperback',
  'paperback-books',
  'picture-books',
  'series-books',
  'young-adult',
  'young-adult-e-book',
  'young-adult-hardcover',
  'young-adult-paperback',
  'animals',
  'audio-fiction',
  'audio-nonfiction',
  'business-books',
  'celebrities',
  'crime-and-punishment',
  'culture',
  'education',
  'espionage',
  'expeditions-disasters-and-adventures',
  'fashion-manners-and-customs',
  'food-and-fitness',
  'games-and-activities',
  'graphic-books-and-manga',
  'hardcover-business-books',
  'health',
  'humor',
  'indigenous-americans',
  'relationships',
  'mass-market-monthly',
  'middle-grade-paperback-monthly',
  'paperback-business-books',
  'family',
  'hardcover-political-books',
  'race-and-civil-rights',
  'religion-spirituality-and-faith',
  'science',
  'sports',
  'travel',
  'young-adult-paperback-monthly',
]

const Explore = () => {
  const [searchResult, setSearchResult] = useState(null)
  const [showModal, setshowModal] = useState(false)
  const [detailBook, setDetailBook] = useState(null)
  const [fictionRecom, setFictionRecom] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const { userId, booksData, setBooksData } = useStore((state) => state)

  useEffect(() => {
    if (userId) {
      getLibrary().then((res) => {
        if (res) {
          setBooksData(res)
        }
      })
      const rndIdx = Math.floor(Math.random() * recomList.length)
      getBookRecomm(recomList[rndIdx])
      // getFictionRecomm()
      // getNonFictionRecomm()
    }
  }, [setBooksData, userId])

  const onSearch = (query) => {
    if (query !== '') {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&filter=ebooks&langRestrict=en&maxResults=20&printType=books&orderBy=relevance`
      )
        .then((res) => res.json())
        .then((data) => setSearchResult(data.items.map((item) => convertMetaDataGoogle(item))))
        .catch((err) => console.log(err))
    } else {
      setSearchResult(null)
    }
  }

  const getBookRecomm = (listName) => {
    fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json?api-key=RjYkR7egFmmMAxpAh2jTTpWPZLSXocJ6`
    )
      .then((res) => res.json())
      .then((res) => setFictionRecom(res.results.books.map((item) => convertMetaDataNYT(item))))
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
    return booksData.find((bookData) => bookData.id === id)
  }

  const onPressBook = (bookData) => {
    setshowModal('detail')
    setDetailBook(bookData)
  }

  const onCloseModal = () => {
    setshowModal(false)
    setDetailBook(null)
  }

  const onFinishScanBarcode = (isbn) => {
    onSearch(isbn)
    onCloseModal()
  }

  return (
    <div className="flex flex-col max-w-5xl m-auto px-4">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-2/5 flex items-center">
          <h1 className="text-3xl font-bold">Explore</h1>
          <svg
            className="ml-2 cursor-pointer"
            onClick={(_) => {
              const rndIdx = Math.floor(Math.random() * recomList.length)
              getBookRecomm(recomList[rndIdx])
            }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.5858 7.99992L17.0093 7.99991C14.9891 8.01872 14.1695 8.88229 12.849 11.7638C12.7006 12.0884 12.6217 12.2608 12.5478 12.4205C10.7759 16.2488 8.96371 17.9389 5 18H3V16L4.98456 16.0001C7.99779 15.9536 9.24866 14.787 10.7328 11.5804C10.8046 11.4253 10.8813 11.2575 11.0308 10.9306C12.6438 7.41088 13.9561 6.02825 17 5.99995H17.5858L16.2929 4.70706L17.7071 3.29285L21.4142 6.99995L17.7071 10.7071L16.2929 9.29285L17.5858 7.99992ZM17.5858 18H17C15.067 17.982 13.8323 17.4179 12.7755 16.1071C13.1678 15.543 13.5362 14.9169 13.8909 14.2284C14.7313 15.5397 15.5624 15.9865 17.0093 16L17.5858 16L16.2929 14.7071L17.7071 13.2928L21.4142 17L17.7071 20.7071L16.2929 19.2928L17.5858 18ZM4.98456 7.99983C7.02213 8.03129 8.25385 8.57489 9.29676 9.9151C9.62455 9.21035 9.95039 8.57236 10.2864 7.99914C8.998 6.66595 7.39018 6.03678 5 5.99995H3V7.99995L4.98456 7.99983Z"
              fill="#F8F8F8"
            />
          </svg>
        </div>
        <div className="mt-2 md:mt-0 flex justify-end w-full md:w-3/5">
          <div className="md:max-w-md w-full flex items-center bg-dark-primary-800 rounded-md pr-2">
            <input
              placeholder="Search book title"
              type="text"
              onChange={(event) => onSearch(event.target.value)}
              className=""
            />
            <div onClick={() => setshowModal('scan')} className="w-8 cursor-pointer">
              <svg width="100%" height="100%" viewBox="0 0 381 284" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.54018 68.0595C13.2568 68.0595 17.0804 64.236 17.0804 59.5194V24.7047C17.0804 20.5005 20.5005 17.0804 24.7047 17.0804H52.9792C57.6958 17.0804 61.5194 13.2568 61.5194 8.54018C61.5194 3.82356 57.6958 4.47653e-08 52.9792 4.47653e-08H24.7047C11.0819 -0.000813306 0 11.0819 0 24.7047V59.5194C0 64.2352 3.82356 68.0595 8.54018 68.0595Z"
                  fill="#F8F8F8"
                />
                <path
                  d="M52.9792 266.203H24.7047C20.5005 266.203 17.0804 262.783 17.0804 258.579V223.764C17.0804 219.047 13.2568 215.224 8.54018 215.224C3.82356 215.224 0 219.047 0 223.764V258.579C0 272.201 11.0819 283.283 24.7047 283.283H52.9792C57.6958 283.283 61.5194 279.46 61.5194 274.743C61.5194 270.027 57.6958 266.203 52.9792 266.203Z"
                  fill="#F8F8F8"
                />
                <path
                  d="M356.004 0H327.729C323.012 0 319.189 3.82356 319.189 8.54018C319.189 13.2568 323.012 17.0804 327.729 17.0804H356.004C360.209 17.0804 363.629 20.5005 363.629 24.7047V59.5194C363.629 64.236 367.452 68.0595 372.169 68.0595C376.886 68.0595 380.709 64.236 380.709 59.5194V24.7047C380.709 11.0827 369.626 0 356.004 0Z"
                  fill="#F8F8F8"
                />
                <path
                  d="M372.169 215.224C367.452 215.224 363.629 219.047 363.629 223.764V258.579C363.629 262.783 360.209 266.203 356.004 266.203H327.729C323.012 266.203 319.189 270.027 319.189 274.743C319.189 279.46 323.012 283.283 327.729 283.283H356.004C369.626 283.283 380.709 272.201 380.709 258.579V223.764C380.709 219.047 376.886 215.224 372.169 215.224Z"
                  fill="#F8F8F8"
                />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M67 117.5V37H83V117.5H67Z" fill="#F8F8F8" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M107 117.5V37H139V117.5H107Z" fill="#F8F8F8" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M163 117.5V37H179V117.5H163Z" fill="#F8F8F8" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M203 117.5V37H235V117.5H203Z" fill="#F8F8F8" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M259 117.5V37H275V117.5H259Z" fill="#F8F8F8" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M299 117.5V37H315V117.5H299Z" fill="#F8F8F8" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M67 246.5V166H83V246.5H67Z" fill="#F8F8F8" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M107 246.5V166H139V246.5H107Z" fill="#F8F8F8" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M163 246.5V166H179V246.5H163Z" fill="#F8F8F8" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M203 246.5V166H235V246.5H203Z" fill="#F8F8F8" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M259 246.5V166H275V246.5H259Z" fill="#F8F8F8" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M299 246.5V166H315V246.5H299Z" fill="#F8F8F8" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M341.5 149.5H40V133.5H341.5V149.5Z" fill="#F8F8F8" />
              </svg>
            </div>
          </div>
          {/* <button className="bg-purple-600 font-bold p-2 rounded-md" onClick={() => setshowModal('manualAdd')}>
            <p className="text-sm">+ Custom</p>
          </button> */}
        </div>
      </div>
      <div className="mt-4">
        {searchResult ? (
          <div className="flex flex-wrap -mx-4">
            {searchResult.map((result) => (
              <div key={result.id} className="w-1/2 md:w-1/4 p-4">
                <Book book={result} onClick={(_) => onPressBook(result)} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            {fictionRecom && (
              <div>
                <div className="flex flex-wrap -mx-4">
                  {fictionRecom.map((result) => (
                    <div key={result.id} className="w-1/2 md:w-1/4 p-4">
                      <Book book={result} onClick={(_) => onPressBook(result)} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {showModal === 'detail' && <BookModal bookData={detailBook} onClose={onCloseModal} />}
        {showModal === 'manualAdd' && (
          <ManualAddModal onClose={onCloseModal} onPressAdd={addBook} isLoading={isLoading} />
        )}
        {showModal === 'scan' && <ScanBarcodeModal onClose={onCloseModal} onFinish={onFinishScanBarcode} />}
      </div>
    </div>
  )
}

export default Explore
