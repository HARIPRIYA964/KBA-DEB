import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import getUseType from '../utils/Auth';

const AuthLayout = () => {
    const userType = getUseType();
    if(!userType){
        return <Navigate to ='/' />
    }
  return <Outlet />
  
}

export default AuthLayout
