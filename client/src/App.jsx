import { useState } from 'react'
import { Route, Routes, NavLink } from 'react-router-dom'
import { useAuth } from './contexts/AuthProvider'

import {
  Box,
  Heading,
  Link,
  Flex,
  Spacer,
  Button,
} from '@chakra-ui/react'

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
      <Box p={4} bg="orange.200">
        <Flex alignItems="center">
          <Heading as="h1" size="xl" mr={4} color="yellow.800">
            PantryPilot
          </Heading>
          <Spacer />
          <nav>
            {!user && (
              <>
                <Link as={NavLink} to="/login" mr={2} color="yellow.800" fontWeight="bold" _hover={{ color: 'yellow.600' }}> Log in</Link>
                <Link as={NavLink} to="/signup" mr={2} color="yellow.800" fontWeight="bold" _hover={{ color: 'yellow.600' }} > Sign up  </Link>
              </>
            )}
            {user && (
              <>
                <Link as={NavLink} to="/" mr={2} color="yellow.800" fontWeight="bold" _hover={{ color: 'yellow.600' }}> Home </Link>
                <Link as={NavLink} to="/recipes" mr={2} color="yellow.800" fontWeight="bold" _hover={{ color: 'yellow.600' }}> Recipes </Link>
                <Logout />
              </>
            )}
          </nav>
        </Flex>
      </Box>
      <Box p={4} bg="yellow.50">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          {user && <Route path="/recipes" element={<RecipesPage />} />}
          {user && <Route path="/" element={<HomePage />} />}
        </Routes>
      </Box>
    </>
  )
}

export default App