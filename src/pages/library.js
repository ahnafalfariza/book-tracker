import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import Book from '../components/Book'
import useStore from '../store'
import { addToLibrary, getLibrary } from '../utils/skynet'

const Library = () => {
  const { booksData, setBooksData } = useStore((state) => state)

  useEffect(() => {
    getLibrary().then((res) => setBooksData(res))
  }, [setBooksData])

  const onChangeStatus = async (index, value) => {
    const newData = booksData
    booksData[index].libraryType = value
    await addToLibrary(newData)
    setBooksData(newData)
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
            <Link to="/library">Library</Link>
          </div>
        </div>
        <div className="w-full md:w-4/5">
          {booksData.map((res, index) => (
            <div>
              <h1>{res.title}</h1>
              <h1>{res.libraryType}</h1>
              <select onChange={(event) => onChangeStatus(index, event.target.value)}>
                <option disabled selected value>
                  {'  -- select an option --  '}
                </option>
                <option value="readingList">Reading List</option>
                <option value="readingNow">Reading Now</option>
                <option value="finished">Finished</option>
              </select>
            </div>
          ))}
          <Book />
        </div>
      </div>
    </div>
  )
}

export default Library
