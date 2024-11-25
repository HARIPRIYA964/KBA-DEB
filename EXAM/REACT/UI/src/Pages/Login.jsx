import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

const Login = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const loginSubmit =async (e) => {
        e.preventDefault();
        const loginDetails = {
            username,
            password
        }
        const res = await fetch('/api/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
                },
                body:JSON.stringify(loginDetails),
                credentials: 'include'
        })
        if(res.ok){
            const data = await res.json();
            toast.success(`Logged in as: ${data.userType}`);
            navigate('/home')


        }
    }
  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
  <div className="bg-blue-200 p-10 rounded-lg shadow-xl max-w-sm w-[400px]">
    <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center">Login</h2>
    <form onSubmit={loginSubmit}>
    <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">UserName</label>
                <input type="text" 
                id="name"
                name="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-[260px] py-2 border rounded-lg '
                 />
        
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input type="text" 
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-[260px] py-2 border  rounded-lg'
                 />
        
        </div>
        <div className="flex items-center justify-between mb-6">
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 "
        >Login
        </button>
      </div>
      <p className="text-center">
        Already have an account? {' '}
        <Link to="/signup" className="text-purple-700 hover:underline">
        signup</Link>
      </p>
   
    </form>
    </div>
    </div>
  )
}

export default Login
