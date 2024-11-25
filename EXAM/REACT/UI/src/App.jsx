import React from 'react'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route,} from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      </>

  ))
  return (
   <RouterProvider router={router} />
  )
}

export default App
