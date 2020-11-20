import './styles/tailwind.css'
import 'croppie/croppie.css'

import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { getProfile, login } from './utils/skynet'
import Home from './pages/home'
import Register from './pages/register'
import Explore from './pages/explore'
import useStore from './store'
import Login from './pages/login'
import Library from './pages/library'
import Profile from './pages/profile'

import Nav from './components/Nav'
import Footer from './components/Footer'

function App() {
  const { setUserId, setUserData } = useStore()

  useEffect(() => {
    const _authUser = async () => {
      const mnemonic = window.localStorage.getItem('mnemonic')
      if (!mnemonic) {
        return
      }

      const { publicKey } = await login(mnemonic)

      setUserId(publicKey)

      // // development only
      try {
        const profile = await getProfile()
        if (profile) {
          setUserData(profile)
        }
      } catch (err) {
        console.log(err)
      }
    }
    _authUser()
  }, [setUserId, setUserData])

  return (
    <Router>
      <div>
        <div className="max-w-5xl m-auto">
          <Nav />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/library" exact>
              <Library />
            </Route>
            <Route path="/explore" exact>
              <Explore />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/:userId">
              <Profile />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
