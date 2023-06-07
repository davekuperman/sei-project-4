import { useState } from 'react'
import { Route, Routes, NavLink } from 'react-router-dom'
import { useAuth } from './contexts/AuthProvider'

import LoginForm from './Components/LoginForm'
import Logout from './Components/Logout'
import SignUp from './Pages/Signup'
import HomePage from './Pages/HomePage'
import RecipesPage from './Pages/RecipesPage'

function App() {
  const { user } = useAuth()
  console.log('User:', user)
  return (
    <>
    <h1>PantryPilot</h1>
    <nav>
    <NavLink to="/"> Home </NavLink>
        {user && (
          <>
            <NavLink to="/recipes">Recipes</NavLink> 
            <Logout />
          </>
        )}
        {!user && (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
          </>
        )}
    </nav>
    <Routes>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/" element={<HomePage />}></Route>
      {user && <Route path="/recipes" element={<RecipesPage />} />} 
    </Routes>
    
    </>
  )
}

export default App
