import './styles/tailwind.css'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/home'
import Register from './pages/register'
import useStore from './store'
import { useEffect } from 'react'

function App({ idx, ceramic }) {
  const store = useStore()

  useEffect(() => {
    if (idx && !store.idx) {
      store.setIdx(idx)
    }
    if (idx && !store.ceramic) {
      store.setCeramic(ceramic)
    }
  }, [idx, ceramic, store])

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
