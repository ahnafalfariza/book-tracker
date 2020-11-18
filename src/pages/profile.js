import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Book from '../components/Book'
import { parseImgUrl } from '../utils/common'
import { getLibrary, getProfile } from '../utils/skynet'

const Profile = () => {
  const { userId } = useParams()
  const [userData, setUserData] = useState({})
  const [activeTab, setActiveTab] = useState('readingList')
  const [userReadingList, setUserReadingList] = useState([])
  const [userReadingNow, setUserReadingNow] = useState([])
  const [userFinished, setUserFinished] = useState([])

  useEffect(() => {
    const _getData = async () => {
      const profile = await getProfile(userId)
      if (profile) {
        setUserData(profile)
      }
      const library = await getLibrary(userId)
      if (library) {
        const readingList = library.filter((book) => book.libraryType === 'readingList')
        setUserReadingList(readingList)
        const readingNow = library.filter((book) => book.libraryType === 'readingNow')
        setUserReadingNow(readingNow)
        const finished = library.filter((book) => book.libraryType === 'finished')
        setUserFinished(finished)
      }
    }
    if (userId) {
      _getData()
    }
  }, [userId])

  return (
    <div>
      <div className="px-4 max-w-3xl mx-auto">
        <div className="mx-auto mt-8 w-32 h-32 overflow-hidden rounded-full relative border border-dark-primary-500 bg-dark-primary-600">
          {userData.avatar && <img src={parseImgUrl(userData.avatar)} alt={`${userData.fullname}'s avatar`} />}
        </div>
        <div className="text-center mt-4">
          <h4 className="text-xl font-bold">{userData.fullname}</h4>
          <p className="opacity-75 mt-1">{userData.bio}</p>
        </div>
        <div className="mt-8">
          <div className="flex -mx-2">
            <div
              className={`cursor-pointer opacity-50 w-1/3
                        ${activeTab === 'readingList' && 'opacity-100'}
                      `}
              onClick={(_) => setActiveTab('readingList')}
            >
              <h4 className="text-lg font-semibold text-center">Reading List</h4>
            </div>
            <div
              className={`cursor-pointer opacity-50 w-1/3
                        ${activeTab === 'readingNow' && 'opacity-100'}
                      `}
              onClick={(_) => setActiveTab('readingNow')}
            >
              <h4 className="text-lg font-semibold text-center">Reading Now</h4>
            </div>
            <div
              className={`cursor-pointer opacity-50 w-1/3
                        ${activeTab === 'finished' && 'opacity-100'}
                      `}
              onClick={(_) => setActiveTab('finished')}
            >
              <h4 className="text-lg font-semibold text-center">Finished</h4>
            </div>
          </div>
          <div className="mt-4">
            {activeTab === 'readingList' && (
              <div className="flex flex-wrap -mx-4">
                {userReadingList.map((book, idx) => {
                  return (
                    <div key={book.id} className="w-1/2 md:w-1/3 px-4">
                      <Book book={book} onClick={(_) => {}} />
                    </div>
                  )
                })}
              </div>
            )}
            {activeTab === 'readingNow' && (
              <div className="flex flex-wrap -mx-4">
                {userReadingNow.map((book, idx) => {
                  return (
                    <div key={book.id} className="w-1/2 md:w-1/3 px-4">
                      <Book book={book} onClick={(_) => {}} />
                    </div>
                  )
                })}
              </div>
            )}
            {activeTab === 'finished' && (
              <div className="flex flex-wrap -mx-4">
                {userFinished.map((book) => {
                  return (
                    <div key={book.id} className="w-1/2 md:w-1/3 px-4">
                      <Book book={book} onClick={(_) => {}} />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
