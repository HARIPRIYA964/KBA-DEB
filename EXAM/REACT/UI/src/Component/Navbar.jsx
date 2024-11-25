import React from 'react'
import {Link} from 'react-router-dom'
import getUserType from '../utils/Auth'


const Navbar = () => {
  const userType = getUserType()
  return (
    <div className='bg-purple-100 text-purple-950 grid grid-cols-1 md:grid-cols-2 p-3 shadow-md'>
    <div className='flex justify-center md:justify-end items-center mt-2 md:mt-0 space-x-5 md:space-x-10'>
        <Link to='/home' className='ml-20'>Home</Link>
        {userType ==='admin' &&<Link to='/add-booking' className='ml-20'>Add Booking</Link>}
        <Logout />
    </div>
</div>

  )
}
