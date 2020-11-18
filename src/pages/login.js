import React, { useState } from 'react'
import useStore from '../store'
import { Link, useHistory } from 'react-router-dom'
import { getProfile, login } from '../utils/skynet'

const Login = () => {
  const history = useHistory()

  const { setUserId, setUserData } = useStore()
  const [mnemonic, setMnemonic] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const _login = async () => {
    setIsSubmitting(true)
    if (mnemonic.split(' ').length !== 24) {
      alert('Invalid mnemonic')
      return
    }
    const { publicKey } = await login(mnemonic)

    const profile = await getProfile(publicKey)
    setUserData(profile)

    window.localStorage.setItem('mnemonic', mnemonic)

    try {
      getProfile(publicKey)
      setUserId(publicKey)
      history.push('/explore')
    } catch (err) {
      console.log(err)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center flex-wrap">
        <div className="w-full md:w-3/5 relative">
          <div
            className="w-full "
            style={{
              paddingBottom: `60%`,
            }}
          >
            <img
              className="bg-dark-primary-300 absolute w-full h-full object-cover rounded-lg overflow-hidden"
              src="/library.jpg"
              alt="SkyBook Hero"
            />
          </div>
        </div>
        <div className="w-full md:w-2/5 pl-0 md:pl-8">
          <div className="mt-4 md:mt-0">
            <div className="text-gray-100 font-bold text-3xl">Skybook</div>
            <p className="text-lg">Read it. Track it.</p>
          </div>
          <div className="mt-8">
            <p className="font-bold text-xl">Log in to your account</p>
          </div>
          <div>
            <div className="mt-4">
              <textarea
                className="resize-none h-24"
                type="text"
                placeholder="Seed phrase"
                value={mnemonic}
                onChange={(e) => setMnemonic(e.target.value)}
              />
              <button
                className="mt-4 w-full p-2 text-gray-100 font-medium bg-dark-primary-100 rounded-md"
                disabled={mnemonic.length === 0 || isSubmitting}
                onClick={_login}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/register">
              <p className="font-medium">Don't have an account? Register</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
