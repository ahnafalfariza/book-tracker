import React, { useState } from 'react'
import useStore from '../store'
import { useHistory } from 'react-router-dom'
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
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center justify-center">
        <div className="font-bold text-3xl">Login</div>
      </div>
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
  )
}

export default Login
