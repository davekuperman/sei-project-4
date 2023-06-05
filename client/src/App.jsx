import { useState } from 'react'
import { Route, Routes, NavLink } from 'react-router-dom'

import LoginForm from './Components/LoginForm'

function App() {

  return (
    <>
    <h1>Recipe generator</h1>
    <nav>
      <NavLink to="/login" >Login</NavLink>
    </nav>
    <Routes>
      <Route path="/login" element={<LoginForm />}></Route>
    </Routes>
    
    </>
  )
}

export default App
