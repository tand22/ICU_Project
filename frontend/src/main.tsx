import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Outcome from './outcome/Outcome'
import './index.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<App />}/>
    <Route path='/outcome' element={<Outcome />}/>
  </Routes>
  </BrowserRouter>
)
