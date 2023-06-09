import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider.jsx'
import { RecipeProvider } from './contexts/GptProvider.jsx'
import { ChakraProvider } from '@chakra-ui/react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <RecipeProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </RecipeProvider>
    </AuthProvider>
  </BrowserRouter>
)
