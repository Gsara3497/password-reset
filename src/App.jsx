import React from 'react'
import { BrowserRouter, Routes, Route, Navigate }  from 'react-router-dom'
import Home from './components/Home'
import SignIn from './components/SignIn'
import ForgotPassword from './components/forgotPassword'
import Dashboard from './components/Dashboard'
import Create from './components/Create'

function App() {
  return <>
  <div id='wrapper'>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/signup' element={<Create />}/>
      <Route path='/login' element={<SignIn />}/>
      <Route path='/forgotpassword' element={<ForgotPassword />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  </BrowserRouter>

  </div>
  </>
}

export default App