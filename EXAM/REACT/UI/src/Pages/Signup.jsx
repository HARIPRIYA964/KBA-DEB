import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType,setUserType] = useState('');
    const navigate = useNavigate();
    const signupSubmit = async (e) => {
        e.preventDefault();
        const userDetails = {
            username,
            email,
            password,
            userType
        }
        console.log(userDetails);
        try{
          const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(userDetails)
        })
        if(res.ok){
            alert('Signup Successfull');
            navigate('/')
        }
        else{
            alert('Signup Failed');
        }
      }
      catch(error){
        console.error(error);
      }
    }
  return (
  <div className="bg-white flex items-center justify-center mt-32">
  <div className="bg-blue-200 p-10 rounded-lg shadow-xl max-w-sm ">
    <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center">Sign Up</h2>
    <form onSubmit={signupSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">UserName</label>
                <input type="text" 
                id="name"
                name="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-[300px] py-2 border rounded-lg'
                 />
        
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">Email</label>
                <input type="text" 
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-[300px] py-2 border rounded-lg'
                 />
        
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input type="text" 
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-[300px] py-2 border rounded-lg'
                 />
        
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userType">User Type</label>
        <select type="text" 
                id="userType"
                name="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className='w-[300px] py-2 border rounded-lg'
                 >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                 </select>
        </div>
        <div className="flex items-center justify-between mb-6">
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 "
        >
          Sign Up
        </button>
      </div>
      <p className="text-center">
        Already have an account? {' '}
        <Link to="/" className="text-purple-700 hover:underline">
        Login</Link>
      </p>
   
    </form>

   </div>
   </div>
  )
}

export default Signup
