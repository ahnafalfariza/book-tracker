import React, { useState } from 'react'
import { generateMnemonic } from 'bip39'
import { genKeyPairFromSeed } from 'skynet-js'
import useStore from '../store'
import IdentityWallet from 'identity-wallet'
import fromString from 'uint8arrays/from-string'

const Register = () => {
  const { idx, ceramic } = useStore()
  const [fullname, setFullname] = useState('')

  const _register = async () => {
    // generate new mnemonic with length 256
    const mnemonic = generateMnemonic(256)
    console.log(mnemonic)

    const { privateKey, publicKey } = genKeyPairFromSeed(mnemonic)
    const seed = fromString(privateKey, 'base16')

    console.log('create new wallet')
    const wallet = await IdentityWallet.create({
      ceramic: ceramic,
      seed: seed,
      getPermission() {
        return Promise.resolve([])
      },
    })

    console.log('authenticating...')
    await idx.authenticate({
      authProvider: wallet.getDidProvider(),
    })

    console.log('authenticated!')
    try {
      console.log('set data!')
      await idx.set('user', {
        fullname: fullname,
        publicKey: publicKey,
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="text-red-900 text-3xl">Register</div>
      </div>
      <div>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <button disabled={fullname.length === 0} onClick={_register}>
          Register
        </button>
      </div>
    </div>
  )
}

export default Register
