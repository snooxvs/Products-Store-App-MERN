import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import { Box, createTheme, ThemeProvider } from '@mui/material'
import Navbar from './components/Navbar'
import {Navigate} from 'react-router-dom'

const App = () => {
  
  const [theme,setTheme] = useState('light')
  const darkTheme = createTheme({
    palette: {
      mode: theme
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
    <Box color={'text.primary'} bgcolor={'background.default'}>
      <BrowserRouter>
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      </BrowserRouter>
    </Box>
    </ThemeProvider> 
  )
}

export default App