import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/antd.css'
import './scss'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Exhibitshow } from './components/Exhibitshow'
import 'virtual:windi.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={import.meta.env.BASE_URL} element={<App/>}/>
          <Route path={import.meta.env.BASE_URL+"/show/:path"} element={<Exhibitshow/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
)
