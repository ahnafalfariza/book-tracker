import React from 'react'
import { Link } from 'react-router-dom'
import { parseImgUrl } from '../utils/common'
import useStore from '../store'

const Nav = () => {
  const { userId, userData } = useStore()

  return (
    <nav>
      <div className="flex">
        <div>Booksky</div>
        <div>
          <input placeholder="Search book title" />
        </div>
        {userId ? (
          <div>
            <div className="w-8 h-8 overflow-hidden rounded-full">
              <img
                className="object-cover"
                alt={`${userData.fullname}'s avatar`}
                src={parseImgUrl(userData.avatar)}
              />
            </div>
          </div>
        ) : (
          <div>Login</div>
        )}
      </div>
      {userId && (
        <div className="flex">
          <div>
            <Link to="/">Library</Link>
          </div>
          <div>
            <Link to="/explore">Explore</Link>
          </div>
          <div>
            <Link to={`/${userId}`}>Profile</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav
