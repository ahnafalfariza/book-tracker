import React, { useState } from 'react'
import { genKeyPairFromSeed } from 'skynet-js'
import useStore from '../store'
import IdentityWallet from 'identity-wallet'
import fromString from 'uint8arrays/from-string'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()

  const { idx, ceramic } = useStore()
  const [mnemonic, setMnemonic] = useState('')

  const _login = async () => {
    if (mnemonic.split(' ').length !== 24) {
      alert('Invalid mnemonic')
      return
    }
    const { privateKey } = genKeyPairFromSeed(mnemonic)
    const seed = fromString(privateKey, 'base16')

    console.log('create new wallet')
    const wallet = await IdentityWallet.create({
      ceramic: ceramic,
      seed: seed,
      getPermission() {
        return Promise.resolve([])
      },
    })

    const didProvider = wallet.getDidProvider()
    window.localStorage.setItem('mnemonic', mnemonic)

    console.log('authenticating...')
    await idx.authenticate({
      authProvider: didProvider,
    })

    console.log('authenticated!')
    try {
      console.log('get data!')
      const userData = await idx.get('user')
      console.log(userData)
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="text-red-900 text-3xl">Login</div>
      </div>
      <div>
        <input
          type="text"
          value={mnemonic}
          onChange={(e) => setMnemonic(e.target.value)}
        />
        <button disabled={mnemonic.length === 0} onClick={_login}>
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
