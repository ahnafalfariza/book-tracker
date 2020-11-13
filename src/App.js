import { genKeyPairFromSeed } from 'skynet-js'
// import { generateMnemonic } from 'bip39'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import './styles/tailwind.css'
import Home from './pages/home'
import Register from './pages/register'

function App() {
  // generate new mnemonic with length 256
  // const mnemonic = generateMnemonic(256)
  // console.log(mnemonic)

  const mnemonic = `wait eternal sphere excuse lift ozone brother curtain imitate chalk pear sound impulse badge kind vibrant arena regret broken ghost error amazing wild welcome`

  const y = genKeyPairFromSeed(mnemonic)
  console.log(y)

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
