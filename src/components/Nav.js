import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
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
          <div className="w-1/4">
            <div className="w-24">
              <svg width="100%" height="100%" viewBox="0 0 307 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M138 17.8146C99.4914 0.961439 85.7969 8.80286 69.1675 24C51.5381 8.80286 38.5086 0.990091 0 17.8432C7.25374 10.0904 25.7781 -11.6405 69.3896 8.23685C113.001 -11.6405 132.746 10.0618 138 17.8146Z"
                  fill="white"
                />
                <path
                  d="M2.176 63.048H10.816C10.9867 64.4987 11.648 65.8213 12.8 67.016C13.9947 68.168 15.552 69.0853 17.472 69.768C19.392 70.408 21.5467 70.728 23.936 70.728C26.112 70.728 27.904 70.4933 29.312 70.024C30.72 69.5547 31.7653 68.8933 32.448 68.04C33.1307 67.1867 33.472 66.1627 33.472 64.968C33.472 63.816 33.0453 62.9413 32.192 62.344C31.3387 61.704 29.9947 61.192 28.16 60.808C26.3253 60.3813 23.9147 59.9547 20.928 59.528C18.5813 59.1867 16.3627 58.7173 14.272 58.12C12.1813 57.48 10.3253 56.6693 8.704 55.688C7.12533 54.7067 5.86667 53.512 4.928 52.104C4.032 50.6533 3.584 48.9467 3.584 46.984C3.584 44.552 4.26667 42.4187 5.632 40.584C7.04 38.7493 9.10933 37.32 11.84 36.296C14.5707 35.272 17.92 34.76 21.888 34.76C27.8613 34.76 32.448 36.04 35.648 38.6C38.8907 41.1173 40.4693 44.5947 40.384 49.032H32.064C31.8933 46.5147 30.8267 44.7013 28.864 43.592C26.944 42.4827 24.512 41.928 21.568 41.928C18.8373 41.928 16.576 42.3333 14.784 43.144C13.0347 43.9547 12.16 45.3413 12.16 47.304C12.16 48.072 12.3733 48.7547 12.8 49.352C13.2267 49.9067 13.952 50.3973 14.976 50.824C16 51.2507 17.3867 51.656 19.136 52.04C20.8853 52.424 23.0613 52.808 25.664 53.192C28.096 53.5333 30.2933 54.0027 32.256 54.6C34.2613 55.1547 35.968 55.9013 37.376 56.84C38.8267 57.736 39.936 58.888 40.704 60.296C41.472 61.704 41.856 63.432 41.856 65.48C41.856 67.9973 41.1947 70.1947 39.872 72.072C38.592 73.9067 36.5867 75.336 33.856 76.36C31.168 77.384 27.6693 77.896 23.36 77.896C20.288 77.896 17.5787 77.576 15.232 76.936C12.8853 76.2533 10.8587 75.3573 9.152 74.248C7.44533 73.1387 6.05867 71.9227 4.992 70.6C3.92533 69.2773 3.15733 67.9547 2.688 66.632C2.26133 65.3093 2.09067 64.1147 2.176 63.048ZM48.8535 32.392H57.1735V77H48.8535V32.392ZM83.9895 45.192L65.0455 61.896L65.2375 56.776L85.4615 77H74.9015L57.3655 59.144L72.6615 45.192H83.9895ZM86.96 45.192H95.792L109.552 75.72L102.384 77L86.96 45.192ZM125.872 45.192L103.856 89.8H95.216L104.624 72.264L116.976 45.192H125.872ZM155.227 77.704C152.411 77.704 150 77.2133 147.995 76.232C145.99 75.208 144.368 73.8853 143.131 72.264C141.894 70.6 140.976 68.808 140.379 66.888C139.782 64.9253 139.483 63.0053 139.483 61.128C139.483 58.7813 139.76 56.6053 140.315 54.6C140.912 52.5947 141.83 50.8453 143.067 49.352C144.304 47.816 145.926 46.6213 147.931 45.768C149.936 44.9147 152.368 44.488 155.227 44.488C158.512 44.488 161.414 45.192 163.931 46.6C166.491 47.9653 168.496 49.8853 169.947 52.36C171.44 54.8347 172.187 57.7573 172.187 61.128C172.187 64.4133 171.44 67.3147 169.947 69.832C168.454 72.3067 166.427 74.248 163.867 75.656C161.307 77.0213 158.427 77.704 155.227 77.704ZM152.539 71.304C154.8 71.304 156.763 70.8773 158.427 70.024C160.091 69.1707 161.371 67.9973 162.267 66.504C163.206 64.968 163.675 63.176 163.675 61.128C163.675 58.056 162.694 55.5813 160.731 53.704C158.811 51.8267 156.08 50.888 152.539 50.888C150.064 50.888 147.91 51.2933 146.075 52.104C144.24 52.9147 142.811 54.088 141.787 55.624C140.806 57.1173 140.315 58.952 140.315 61.128C140.315 63.1333 140.806 64.904 141.787 66.44C142.768 67.976 144.176 69.1707 146.011 70.024C147.846 70.8773 150.022 71.304 152.539 71.304ZM140.315 32.392V68.808C140.315 70.1733 140.251 71.6453 140.123 73.224C139.995 74.76 139.867 76.0187 139.739 77H131.995V32.392H140.315ZM197.092 77.768C193.081 77.768 189.54 77.128 186.468 75.848C183.439 74.568 181.071 72.712 179.364 70.28C177.657 67.8053 176.804 64.776 176.804 61.192C176.804 57.608 177.657 54.5787 179.364 52.104C181.071 49.5867 183.439 47.688 186.468 46.408C189.54 45.128 193.081 44.488 197.092 44.488C201.103 44.488 204.601 45.128 207.588 46.408C210.617 47.688 212.985 49.5867 214.692 52.104C216.399 54.5787 217.252 57.608 217.252 61.192C217.252 64.776 216.399 67.8053 214.692 70.28C212.985 72.712 210.617 74.568 207.588 75.848C204.601 77.128 201.103 77.768 197.092 77.768ZM197.092 71.368C199.311 71.368 201.295 70.984 203.044 70.216C204.836 69.4053 206.244 68.2533 207.268 66.76C208.292 65.224 208.804 63.368 208.804 61.192C208.804 59.016 208.292 57.16 207.268 55.624C206.244 54.0453 204.857 52.8507 203.108 52.04C201.359 51.2293 199.353 50.824 197.092 50.824C194.873 50.824 192.868 51.2293 191.076 52.04C189.284 52.8507 187.855 54.024 186.788 55.56C185.764 57.096 185.252 58.9733 185.252 61.192C185.252 63.368 185.764 65.224 186.788 66.76C187.812 68.2533 189.22 69.4053 191.012 70.216C192.804 70.984 194.831 71.368 197.092 71.368ZM242.155 77.768C238.144 77.768 234.603 77.128 231.531 75.848C228.501 74.568 226.133 72.712 224.427 70.28C222.72 67.8053 221.867 64.776 221.867 61.192C221.867 57.608 222.72 54.5787 224.427 52.104C226.133 49.5867 228.501 47.688 231.531 46.408C234.603 45.128 238.144 44.488 242.155 44.488C246.165 44.488 249.664 45.128 252.651 46.408C255.68 47.688 258.048 49.5867 259.755 52.104C261.461 54.5787 262.315 57.608 262.315 61.192C262.315 64.776 261.461 67.8053 259.755 70.28C258.048 72.712 255.68 74.568 252.651 75.848C249.664 77.128 246.165 77.768 242.155 77.768ZM242.155 71.368C244.373 71.368 246.357 70.984 248.107 70.216C249.899 69.4053 251.307 68.2533 252.331 66.76C253.355 65.224 253.867 63.368 253.867 61.192C253.867 59.016 253.355 57.16 252.331 55.624C251.307 54.0453 249.92 52.8507 248.171 52.04C246.421 51.2293 244.416 50.824 242.155 50.824C239.936 50.824 237.931 51.2293 236.139 52.04C234.347 52.8507 232.917 54.024 231.851 55.56C230.827 57.096 230.315 58.9733 230.315 61.192C230.315 63.368 230.827 65.224 231.851 66.76C232.875 68.2533 234.283 69.4053 236.075 70.216C237.867 70.984 239.893 71.368 242.155 71.368ZM269.041 32.392H277.361V77H269.041V32.392ZM304.177 45.192L285.233 61.896L285.425 56.776L305.649 77H295.089L277.553 59.144L292.849 45.192H304.177Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
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
                  <div className="px-2 truncate w-24">
                    <p className="font-medium truncate">{userData.fullname}</p>
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
              <div>
                <Link to="/login">Login</Link>
              </div>
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
