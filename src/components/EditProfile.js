import React, { useEffect, useState } from 'react'
import ImgCrop from './ImgCrop'
import useStore from '../store'
import { saveProfile, upload } from '../utils/skynet'
import { parseImgUrl } from '../utils/common.js'
import { genKeyPairFromSeed } from 'skynet-js'

const EditProfile = ({ afterSubmit = () => {} }) => {
  const { userId, userData, setUserData } = useStore()
  const [fullname, setFullname] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('')
  const [publicKey, setPublicKey] = useState('')
  const [imgFile, setImgFile] = useState(null)
  const [showImgCrop, setShowImgCrop] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const _getUserData = async () => {
      console.log(userData)
      setFullname(userData.fullname || '')
      setBio(userData.bio || '')
      setAvatar(userData.avatar || '')
      setPublicKey(userData.publicKey || '')
    }
    if (userId && userData) {
      _getUserData()
    }
  }, [userId, userData])

  const _submit = async () => {
    setIsSubmitting(true)
    const params = {
      fullname: fullname,
      bio: bio,
      avatar: avatar,
      publicKey: publicKey,
    }

    // if avatar then upload to sia first
    if (imgFile) {
      params.avatar = await upload(imgFile)
    }

    // if publicKey not found, generate via its mnemonic
    if (publicKey.length === 0) {
      const mnemonic = window.localStorage.getItem('mnemonic')
      const { publicKey } = genKeyPairFromSeed(mnemonic)
      params.publicKey = publicKey
    }

    try {
      await saveProfile(params)
      setUserData(params)
      afterSubmit()
    } catch (err) {
      console.log(err)
    }
    setIsSubmitting(false)
  }

  const _setImg = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setImgFile(e.target.files[0])
      setShowImgCrop(true)
    }
  }

  return (
    <div>
      {showImgCrop && (
        <ImgCrop
          input={imgFile}
          size={{
            width: 512,
            height: 512,
          }}
          type="circle"
          left={(_) => {
            setImgFile(null)
            setShowImgCrop(false)
          }}
          right={(res) => {
            setShowImgCrop(false)
            setImgFile(res.payload.imgFile)
            setAvatar(res.payload.imgUrl)
          }}
        />
      )}
      <div className="flex items-center justify-center">
        <div className="text-white-100 font-bold text-3xl">Edit Profile</div>
      </div>
      <div>
        <div className="mx-auto mt-8 w-32 h-32 overflow-hidden rounded-full relative border border-dark-primary-500 bg-dark-primary-600">
          <img src={parseImgUrl(avatar)} alt="" />
          <div className=" absolute inset-0 flex items-center justify-center bg-opacity-50 bg-dark-primary-900">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.93702 5.84538C7.00787 5.74688 7.08656 5.62631 7.18689 5.46372C7.22355 5.40433 7.32349 5.23944 7.39792 5.11665L7.39798 5.11654L7.4818 4.97841C8.31079 3.62239 8.91339 3 10 3H14C15.0866 3 15.6892 3.62239 16.5182 4.97841L16.6021 5.11664C16.6765 5.23943 16.7765 5.40433 16.8131 5.46372C16.9134 5.62631 16.9921 5.74688 17.063 5.84538C17.1097 5.91033 17.1505 5.96194 17.1838 6H20C21.6569 6 23 7.34315 23 9V18C23 19.6569 21.6569 21 20 21H4C2.34315 21 1 19.6569 1 18V9C1 7.34315 2.34315 6 4 6H6.8162C6.84949 5.96194 6.8903 5.91033 6.93702 5.84538ZM4 8C3.44772 8 3 8.44772 3 9V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V9C21 8.44772 20.5523 8 20 8H17C16.3357 8 15.8876 7.63641 15.4394 7.01326C15.3363 6.86988 15.2341 6.71332 15.1111 6.51409C15.069 6.44583 14.9596 6.26536 14.8846 6.14152L14.8118 6.02159C14.3595 5.28172 14.0867 5 14 5H10C9.91327 5 9.6405 5.28172 9.1882 6.02159L9.11543 6.14152L9.11502 6.14219C9.03998 6.26601 8.93092 6.44596 8.88887 6.51409C8.76592 6.71332 8.66375 6.86988 8.56061 7.01326C8.11237 7.63641 7.66434 8 7 8H4ZM20 10C20 10.5523 19.5523 11 19 11C18.4477 11 18 10.5523 18 10C18 9.44772 18.4477 9 19 9C19.5523 9 20 9.44772 20 10ZM7 13C7 15.7614 9.23858 18 12 18C14.7614 18 17 15.7614 17 13C17 10.2386 14.7614 8 12 8C9.23858 8 7 10.2386 7 13ZM15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
                fill="#bcbcbc"
              />
            </svg>
          </div>
          <input
            className="cursor-pointer p-0 absolute inset-0 opacity-0"
            onClick={(e) => {
              e.target.value = null
            }}
            type="file"
            onChange={(e) => _setImg(e)}
          />
        </div>
        <input
          className="mt-4 bg-dark-primary-600"
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Fullname"
        />
        <textarea
          className="mt-4 bg-dark-primary-600 h-24 resize-none"
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
        />
        <button
          className="mt-8 w-full bg-purple-600 font-bold p-4 rounded-xl"
          onClick={_submit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving Profile...' : 'Edit Profile'}
        </button>
      </div>
    </div>
  )
}

export default EditProfile
