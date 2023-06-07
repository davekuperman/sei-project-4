import { useState } from 'react'
import { Route, Routes, NavLink } from 'react-router-dom'
import { useAuth } from './contexts/AuthProvider'

import LoginForm from './Components/LoginForm'
import Logout from './Components/Logout'
import SignUp from './Pages/Signup'
import HomePage from './Pages/HomePage'

function App() {
  const { user } = useAuth()
  console.log('User:', user)
  return (
    <>
    <h1>PantryPilot</h1>
    <nav>
      <NavLink to="/"> Home </NavLink>
      <NavLink to="/login" >Log in</NavLink>
      <NavLink to="/signup" >Sign up</NavLink>
      {user && <Logout />}
    </nav>
    <Routes>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
    
    </>
  )
}

export default App
