import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import Home  from './pages/Home'
import ListingPage from './pages/List'
import ViewOrder from './pages/ViewOrder'
import Details from './pages/Details'
const App = () => {
  return (
<Routes>
<Route path='firebase_project/' element={<Home />} />

  <Route path='firebase_project/register' element={<RegisterPage />} />
  <Route path='firebase_project/login' element={<LoginPage />} />
  <Route path='firebase_project/book/list' element={<ListingPage />} />
  <Route path='firebase_project/book/view/:bookId' element={<Details />} />
  <Route path='firebase_project/book/orders' element={<ViewOrder />} />



</Routes>
  )
}

export default App