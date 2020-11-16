import './styles/tailwind.css'
import 'croppie/croppie.css'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/home'
import Register from './pages/register'
import useStore from './store'
import Login from './pages/login'

import { useEffect } from 'react'
import { genKeyPairFromSeed } from 'skynet-js'
import fromString from 'uint8arrays/from-string'
import IdentityWallet from 'identity-wallet'
import EditProfile from './pages/EditProfile'
import Nav from './components/Nav'

function App({ _idx, _ceramic }) {
  const {
    idx,
    setIdx,
    ceramic,
    setCeramic,
    setUserId,
    setUserData,
  } = useStore()

  useEffect(() => {
    if (_idx && !idx) {
      setIdx(_idx)
    }
    if (_ceramic && !ceramic) {
      setCeramic(_ceramic)
    }
  }, [_idx, _ceramic, idx, ceramic, setIdx, setCeramic])

  useEffect(() => {
    const _authUser = async () => {
      const mnemonic = window.localStorage.getItem('mnemonic')
      console.log(mnemonic)
      const { privateKey } = genKeyPairFromSeed(mnemonic)
      console.log(privateKey)
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
      const userData = await idx.get('user')
      console.log(userData)
      setUserData(userData)
      setUserId(idx.id)
    }

    if (idx) {
      _authUser()
    }
  }, [ceramic, idx, setUserId, setUserData])

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/me/edit" exact>
            <EditProfile />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
