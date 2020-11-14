import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Modal from '../components/Modal'
import useStore from '../store'
import { addToLibrary, getLibrary } from '../utils/skynet'

const Explore = () => {
  const [searchResult, setSearchResult] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const [detailBook, setDetailBook] = useState(null)
  const [choosenLibrary, setChoosenLibrary] = useState(undefined)

  const [isLoading, setIsLoading] = useState(false)

  const { booksData, setBooksData } = useStore((state) => state)

  const onSearch = (event) => {
    const query = event.target.value
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((res) => res.json())
      .then((data) => setSearchResult(data.items.map((res) => res.volumeInfo)))
      .catch((err) => console.log(err))
  }

  const chooseLibrary = (event) => {
    setChoosenLibrary(event.target.value)
  }

  const onPressBook = (bookData) => {
    setShowDetail(true)
    setDetailBook(bookData)
  }

  const onCloseDetail = () => {
    setShowDetail(false)
    setDetailBook(null)
    setChoosenLibrary(null)
  }

  const addBook = async () => {
    const newData = booksData
    newData.push({ ...detailBook, libraryType: choosenLibrary })

    setIsLoading(true)
    await addToLibrary(newData)
    setBooksData(newData)
    setIsLoading(false)

    console.log(await getLibrary())
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
            <Link to="/library">Library</Link>
          </div>
        </div>
        <div className="w-full md:w-4/5">
          <form>
            <input
              type="text"
              onChange={onSearch}
              className="border-2 border-black mb-3"
            />
          </form>
          {searchResult &&
            searchResult.map((result) => (
              <div className="flex flex-row justify-between">
                <p onClick={() => console.log(result.title)}>{result.title}</p>
                <button
                  className="px-1 right-0"
                  onClick={() => onPressBook(result)}
                >
                  Add to Library
                </button>
              </div>
            ))}
          {showDetail && (
            <Modal close={onCloseDetail}>
              <div className="max-w-xl w-full px-4 py-2 bg-gray-100 m-auto rounded-md">
                <h1>{detailBook.title}</h1>
                <h2>by {detailBook.authors}</h2>
                <form onSubmit={!isLoading ? addBook : null}>
                  <div className="flex flex-col">
                    <label>
                      Choose your library
                      <select value={choosenLibrary} onChange={chooseLibrary}>
                        <option disabled selected value>
                          {'  -- select an option --  '}
                        </option>
                        <option value="readingList">Reading List</option>
                        <option value="readingNow">Reading Now</option>
                        <option value="finished">Finished</option>
                      </select>
                    </label>
                    <button type="submit">
                      {isLoading ? 'Loading' : 'Add Book'}
                    </button>
                  </div>
                </form>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}

export default Explore
