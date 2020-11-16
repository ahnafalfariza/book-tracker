import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import ChooseLibraryModal from '../components/ChooseLibraryModal'
import useStore from '../store'
import { addToLibrary, getLibrary, resetData } from '../utils/skynet'

const Home = () => {
  const { booksData, setBooksData } = useStore((state) => state)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [detailBook, setDetailBook] = useState(null)

  useEffect(() => {
    getLibrary().then((res) => setBooksData(res))
  }, [setBooksData])

  const onPressLibraryType = (index) => {
    setDetailBook(index)
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
    setShowModal(false)
  }

  const getLabelName = (type) => {
    switch (type) {
      case 'finished':
        return 'Finished'
      case 'readingNow':
        return 'Reading Now'
      case 'readingList':
        return 'Reading List'
      default:
        break
    }
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
          <button onClick={() => resetData()}>Reset</button>
          {booksData.map((res, index) => (
            <div key={res.id} className="my-4">
              <h1>{res.title}</h1>
              <div>
                <button onClick={() => onPressLibraryType(index)}>{getLabelName(res.libraryType)}</button>
              </div>
            </div>
          ))}
          {showModal && (
            <ChooseLibraryModal
              isLoading={isLoading}
              onClose={onCloseLibraryType}
              bookTitle={booksData[detailBook].title}
              authors={booksData[detailBook].authors}
              header={'Update Library'}
              onPress={(value) => {
                onChangeStatus(detailBook, value)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
