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
      // console.log('set data!')
      // await idx.set('user', params)
      // console.log('saved!')
      setUserData(params)
      afterSubmit()
    } catch (err) {
      console.log(err)
    }
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
          <input
            className="absolute inset-0 opacity-0"
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
        >
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default EditProfile
