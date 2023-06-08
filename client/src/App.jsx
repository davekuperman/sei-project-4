import { useState } from 'react'
import { Route, Routes, NavLink } from 'react-router-dom'
import { useAuth } from './contexts/AuthProvider'

import LoginForm from './Components/LoginForm'
import Logout from './Components/Logout'
import SignUp from './Pages/Signup'
import HomePage from './Pages/HomePage'
import RecipesPage from './Pages/RecipesPage'
import IngredientInputForm from './Components/IngredientInputForm'

function App() {
  const { user } = useAuth()
  console.log('User:', user)
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const handleFormSubmit = (ingredients) => {
    // Perform any necessary validation or processing before submitting the form
  };

  const handleRecipeGenerated = (recipe) => {
    setGeneratedRecipe(recipe);
  };

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
      {user && (
          <Route path="/recipes" element={<RecipesPage />}></Route>
        )}
        <Route
          path="/generate-recipe"
          element={
            <IngredientInputForm
              onFormSubmit={handleFormSubmit}
              onRecipeGenerated={handleRecipeGenerated}
            />
          }
        ></Route>
      </Routes>
      {generatedRecipe && (
        <div>
          <h2>Generated Recipe:</h2>
          <pre>{JSON.stringify(generatedRecipe, null, 2)}</pre>
        </div>
      )}
    </>
  )
}

export default App