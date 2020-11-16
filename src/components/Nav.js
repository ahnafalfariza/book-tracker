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
        <Modal
          close={(_) => setShowModal(null)}
          closeOnBgClick={false}
          closeOnEscape={false}
        >
          <div className="mx-auto max-w-md">
            <div className="bg-dark-primary-800 rounded-md shadow-md p-4 relative">
              <div className="absolute right-0 top-0 px-4 py-2">
                <div onClick={(_) => setShowModal(null)}>X</div>
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
                  className="w-8 h-8 overflow-hidden rounded-full"
                >
                  <img
                    className="object-cover"
                    alt={`${userData.fullname}'s avatar`}
                    src={parseImgUrl(userData.avatar)}
                  />
                </div>
                {showUserModal && (
                  <div
                    ref={navRef}
                    className="absolute z-10 w-40 right-0 bg-dark-primary-600 p-2 rounded-md shadow-md"
                  >
                    <div>
                      <div
                        onClick={(_) => {
                          setShowUserModal(false)
                          setShowModal('editProfile')
                        }}
                      >
                        <p className="py-1">Edit Profile</p>
                      </div>
                      <div onClick={_logout}>
                        <p className="py-1">Logout</p>
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
