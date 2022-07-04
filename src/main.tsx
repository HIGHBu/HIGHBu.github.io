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
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/gallery_ui/" element={<App/>}/>
          <Route path="/gallery_ui/show/:path" element={<Exhibitshow/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
