import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import IDXWrapper from './utils/idx'

const idxWrapper = new IDXWrapper()

idxWrapper.init().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App _idx={idxWrapper.idx} _ceramic={idxWrapper.ceramic} />
    </React.StrictMode>,
    document.getElementById('root')
  )
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
