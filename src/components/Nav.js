import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { parseImgUrl } from '../utils/common'
import useStore from '../store'
import Modal from './Modal'
import EditProfile from './EditProfile'

const Nav = () => {
  const navRef = useRef()
  const location = useLocation()
  const { userId, userData } = useStore()
  const [showUserModal, setShowUserModal] = useState(false)
  const [showModal, setShowModal] = useState(null)

  useEffect(() => {
    const onClickEv = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowUserModal(false)
      }
    }

    if (showUserModal) {
      document.body.addEventListener('click', onClickEv)
    }

    return () => {
      document.body.removeEventListener('click', onClickEv)
    }
  }, [showUserModal])

  useEffect(() => {
    setShowUserModal(false)
  }, [location])

  const _logout = () => {
    window.localStorage.removeItem('mnemonic')
    window.location.replace(window.location.origin + window.location.pathname)
  }

  return (
    <nav>
      {showModal === 'editProfile' && (
        <Modal close={(_) => setShowModal(null)} closeOnBgClick={false} closeOnEscape={false}>
          <div className="mx-auto max-w-md">
            <div className="bg-dark-primary-800 rounded-md shadow-md p-4 relative">
              <div className="absolute right-0 top-0 px-4 py-2">
                <div
                  className="bg-dark-primary-700 hover:bg-dark-primary-600 transition-all duration-100 rounded-full p-2 shadow-lg cursor-pointer"
                  onClick={(_) => setShowModal(null)}
                >
                  <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.0002 18.8285L7.41436 27.4142L4.58594 24.5858L13.1717 16L4.58594 7.41424L7.41436 4.58582L16.0002 13.1716L24.5859 4.58582L27.4144 7.41424L18.8286 16L27.4144 24.5858L24.5859 27.4142L16.0002 18.8285Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <EditProfile afterSubmit={(_) => setShowModal(null)} />
            </div>
          </div>
        </Modal>
      )}
      <div className="max-w-5xl m-auto p-4">
        <div className="w-full flex items-center">
          <div className="w-1/4">Booksky</div>
          <div className="w-2/4">
            <input placeholder="Search book title" />
          </div>
          <div className="w-1/4 flex justify-end">
            {userId ? (
              <div className="relative">
                <div
                  onClick={(_) => setShowUserModal(true)}
                  className="flex items-center cursor-pointer bg-dark-primary-800 hover:bg-dark-primary-700 rounded-md border-dark-primary-600 border p-2 select-none transition-all duration-100 ease-in"
                >
                  <div className="w-6 h-6 overflow-hidden rounded-full">
                    <img
                      className="object-cover"
                      alt={`${userData.fullname}'s avatar`}
                      src={parseImgUrl(userData.avatar)}
                    />
                  </div>
                  <div className="px-2 truncate w-24 overflow-hidden">
                    <p className="font-medium">{userData.fullname}</p>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.293 7.29291L20.7072 8.70712L12.0001 17.4142L3.29297 8.70712L4.70718 7.29291L12.0001 14.5858L19.293 7.29291Z"
                      fill="white"
                    />
                  </svg>
                </div>

                {showUserModal && (
                  <div
                    ref={navRef}
                    className="absolute z-10 w-40 right-0 bg-dark-primary-600 rounded-md shadow-md mt-2 p-2"
                  >
                    <div className="relative z-0">
                      <div
                        onClick={(_) => {
                          setShowUserModal(false)
                          setShowModal('editProfile')
                        }}
                        className="py-2 px-2 cursor-pointer rounded-md hover:bg-dark-primary-500"
                      >
                        <p className="font-medium">Edit Profile</p>
                      </div>
                      <div onClick={_logout} className="py-2 px-2 cursor-pointer rounded-md hover:bg-dark-primary-500">
                        <p className="font-medium">Logout</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>Login</div>
            )}
          </div>
        </div>
        {userId && (
          <div className="max-w-md mx-auto mt-8 w-full flex items-center justify-between">
            <div>
              <NavLink className="text-gray-300 opacity-50" activeClassName="opacity-100" to="/library" exact>
                Library
              </NavLink>
            </div>
            <div>
              <NavLink className="text-gray-300 opacity-50" activeClassName="opacity-100" to="/explore" exact>
                Explore
              </NavLink>
            </div>
            <div>
              <NavLink className="text-gray-300 opacity-50" activeClassName="opacity-100" to={`/${userId}`}>
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
