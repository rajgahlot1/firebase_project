import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import Home  from './pages/Home'
import ListingPage from './pages/List'
import Details from './pages/Details'
const App = () => {
  return (
<Routes>
<Route path='/' element={<Home />} />

  <Route path='/register' element={<RegisterPage />} />
  <Route path='/login' element={<LoginPage />} />
  <Route path='/book/list' element={<ListingPage />} />
  <Route path='/book/view/:bookId' element={<Details />} />


</Routes>
  )
}

export default App