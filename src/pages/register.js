import React, { useState } from 'react'
import { generateMnemonic } from 'bip39'
import useStore from '../store'
import { login, saveProfile } from '../utils/skynet'
import randomQuotes from 'random-quotes'
import { Link, useHistory } from 'react-router-dom'
import Modal from '../components/Modal'

const mnemonic = generateMnemonic(256)

const Register = () => {
  const history = useHistory()
  const { setUserId, setUserData } = useStore()
  const [fullname, setFullname] = useState('')
  const [showModal, setShowModal] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const _register = async () => {
    setIsSubmitting(true)
    try {
      const { publicKey } = await login(mnemonic)
      const quote = randomQuotes()
      const profile = {
        fullname: fullname,
        bio: `${quote.body} \n\n-${quote.author}`,
      }
      await saveProfile(profile)
      window.localStorage.setItem('mnemonic', mnemonic)
      setUserData(profile)
      setUserId(publicKey)
      history.push('/explore')
    } catch (err) {
      console.log(err)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {showModal === 'mnemonic' && (
        <Modal close={(_) => setShowModal(null)} closeOnBgClick={false} closeOnEscape={false}>
          <div className="mx-auto max-w-md">
            <div className="w-full relative bg-dark-primary-800 rounded-md shadow-md overflow-hidden py-4">
              <div className="absolute z-10 right-0 top-0 px-4 py-2">
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
              <div className="p-4">
                <p className="text-center">
                  Hey <b>{fullname}</b>!
                </p>
                <p className="mt-2 text-center">
                  This is your seed phrase. Please keep it in save place as this is the only way to access/recover your
                  account.
                </p>
                <p className="mt-4 font-bold">Seed Phrase</p>
                <div className="border-2 border-dark-primary-100 rounded-md p-2">
                  <p className="">{mnemonic}</p>
                </div>
                <p className="mt-2 text-sm text-center opacity-75">
                  We do not store the seed phrase and can not help you recover it
                </p>
                <button
                  className="mt-8 w-full p-2 text-gray-100 font-medium bg-dark-primary-100 rounded-md"
                  disabled={fullname.length === 0 || isSubmitting}
                  onClick={_register}
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
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
            <p className="font-bold text-xl">Sign Up to your account</p>
          </div>
          <div className="mt-4">
            <input placeholder="Fullname" type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
          </div>
          <button
            className="mt-20 w-full p-2 text-gray-100 font-medium bg-dark-primary-100 rounded-md"
            disabled={fullname.length === 0}
            onClick={(_) => setShowModal('mnemonic')}
          >
            Register
          </button>
          <div className="text-center mt-4">
            <Link to="/login">
              <p className="font-medium">Have an account? Login</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
