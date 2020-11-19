import { SkynetClient, genKeyPairFromSeed } from 'skynet-js'

const client = new SkynetClient('https://siasky.net/')
let privateKey,
  publicKey = ''
const dataKey = 'skybook::library'

export const login = async (_mnemonic) => {
  const keyPair = genKeyPairFromSeed(_mnemonic)
  privateKey = keyPair.privateKey
  publicKey = keyPair.publicKey
  return keyPair
}

export const addToLibrary = async (data, callback = () => {}) => {
  try {
    await client.db.setJSON(privateKey, dataKey, data)
    callback()
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getLibrary = async (_publicKey) => {
  try {
    const { data } = await client.db.getJSON(_publicKey || publicKey, dataKey)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const profileDataKey = 'skybook::profile'
export const saveProfile = async (data, callback = () => {}) => {
  try {
    await client.db.setJSON(privateKey, profileDataKey, data)
    callback()
  } catch (error) {
    console.log(error)
    throw error
  }
}
export const getProfile = async (_publicKey) => {
  try {
    const { data } = await client.db.getJSON(_publicKey || publicKey, profileDataKey)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const upload = async (file) => {
  try {
    const res = await client.uploadFile(file)
    const link = res.split(':')[1]
    const protocol = 'sia://'
    return protocol + link
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const resetData = async () => {
  try {
    await client.db.setJSON(privateKey, dataKey, [])
  } catch (error) {
    console.log(error)
    throw error
  }
}
