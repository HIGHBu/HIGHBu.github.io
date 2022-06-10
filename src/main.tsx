import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import './scss'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Exhibitshow } from './components/Exhibitshow'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="show/:eid" element={<Exhibitshow/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
,document.getElementById('root')!)
