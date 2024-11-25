import React from 'react'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route,} from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import Home from './Pages/Home'
import Courses from './Pages/Courses'
import Contact from './Pages/Contact'
import Updatecourse from './Pages/Updatecourse'
import Coursepage, {courseLoader} from './Pages/Coursepage'
import Notfound from './Pages/Notfound'
import Addcourse from './Pages/Addcourse'

const App = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
        {/*Public Routes*/}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/*Protected Routes*/}
        <Route element ={<AuthLayout />}>
          <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add-course" element={<Addcourse />} />
          <Route
            path="/edit-course/:id"
            element={<Updatecourse />}
            loader={courseLoader} 
            />
            <Route 
              path = "/course/:id"
              element={<Coursepage />}
              loader={courseLoader}
              />
              </Route>
              </Route>
              {/* Not found route*/}
              <Route path="*" element ={<Notfound />} />
        </>
      )
    );
  return (
    <RouterProvider router={router} />
  )
}

export default App