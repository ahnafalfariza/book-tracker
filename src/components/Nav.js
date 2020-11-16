import React from 'react'
import { NavLink } from 'react-router-dom'
import { parseImgUrl } from '../utils/common'
import useStore from '../store'

const Nav = () => {
  const { userId, userData } = useStore()

  return (
    <nav>
      <div className="max-w-5xl m-auto p-4">
        <div className="w-full flex items-center">
          <div className="w-1/4">Booksky</div>
          <div className="w-2/4">
            <input placeholder="Search book title" />
          </div>
          <div className="w-1/4 flex justify-end">
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
        </div>
        {userId && (
          <div className="max-w-md mx-auto mt-8 w-full flex items-center justify-between">
            <div>
              <NavLink
                className="text-gray-300 opacity-50"
                activeClassName="opacity-100"
                to="/"
                exact
              >
                Library
              </NavLink>
            </div>
            <div>
              <NavLink
                className="text-gray-300 opacity-50"
                activeClassName="opacity-100"
                to="/explore"
                exact
              >
                Explore
              </NavLink>
            </div>
            <div>
              <NavLink
                className="text-gray-300 opacity-50"
                activeClassName="opacity-100"
                to={`/${userId}`}
              >
                Profile
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav
