import { SkynetClient, genKeyPairFromSeed } from 'skynet-js'

const client = new SkynetClient('https://siasky.net/')
const mnemonic =
  'wait eternal sphere excuse lift ozone brother curtain imitate chalk pear sound impulse badge kind vibrant arena regret broken ghost error amazing wild welcome'
const { privateKey, publicKey } = genKeyPairFromSeed(mnemonic)
const dataKey = 'skybook::library'

export const addToLibrary = async (data, callback = () => {}) => {
  try {
    await client.db.setJSON(privateKey, dataKey, data)
    callback()
  } catch (error) {
    console.log(error)
  }
}

export const getLibrary = async () => {
  try {
    const { data } = await client.db.getJSON(publicKey, dataKey)
    return data
  } catch (error) {
    console.log(error)
  }
}
