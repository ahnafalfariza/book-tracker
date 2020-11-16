import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Book from '../components/Book'
import ChooseLibraryModal from '../components/ChooseLibraryModal'
import useStore from '../store'
import { addToLibrary, getLibrary, resetData } from '../utils/skynet'

const Home = () => {
  const { booksData, setBooksData } = useStore((state) => state)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getLibrary().then((res) => setBooksData(res))
  }, [setBooksData])

  const onPressLibraryType = (index) => {
    setShowModal(true)
  }

  const onCloseLibraryType = () => {
    setShowModal(false)
  }

  const onChangeStatus = async (index, value) => {
    const newData = booksData
    newData[index].libraryType = value
    setIsLoading(true)
    await addToLibrary(newData)
    setBooksData(newData)
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col max-w-4xl m-auto">
      <h1>My Library</h1>
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
          {/* <button onClick={() => resetData()}>Reset</button> */}
          {booksData.map((res, index) => (
            <div key={res.id}>
              <h1>{res.title}</h1>
              <div>
                <button onClick={onPressLibraryType}>{res.libraryType}</button>
              </div>
              {showModal && (
                <ChooseLibraryModal
                  isLoading={isLoading}
                  onClose={onCloseLibraryType}
                  bookTitle={res.title}
                  authors={res.authors}
                  header={'Add Book'}
                  onPress={(value) => {
                    onChangeStatus(index, value)
                  }}
                />
              )}
              {/* <select onChange={(event) => onChangeStatus(index, event.target.value)}>
                <option disabled selected value>
                  {'  -- select an option --  '}
                </option>
                <option value="readingList">Reading List</option>
                <option value="readingNow">Reading Now</option>
                <option value="finished">Finished</option>
              </select> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
