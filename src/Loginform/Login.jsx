import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
   const navigate =useNavigate();
   const [username,setUsername]=useState('');
   const [password,setPassword]=useState('');
   const handleUsernameChange = (e) =>{
      const newUser = e.target.value;
      setUsername(newUser);
   }
   const handlepassword =(e)=>{
      const newpassword =e.target.value;
      setPassword(newpassword);
   }
   const validatepassword =() =>{
      if (password.length<8){
       alert('Password must be at least 8 characters long.');
       return false;
      }
      const upperCase =/[A-Z]/;
      const lowerCase =/[a-z]/;
      const specialChar = /[!@#$%^&*(),.?"":{}|<>]/;
      const numberRge =/\d/;
      if (
         !upperCase.test(password) ||
         !lowerCase.test(password) ||
         !specialChar.test(password) ||
         !numberRge.test(password) 
      ){
         alert(
         'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number. '
         );
         return false;
      }
      return true;
   };
   const handleSubmit =(e) =>{
      e.preventDefault();
      if(validatepassword()){
         console.log('Login Successful!');
         navigate('/booking');
      }
   };

  return (
    <div className='wrapper'>
       <form  onSubmit={handleSubmit}>
        <h1>Welcome</h1>
<div className='input-box'>
   <input type='text' placeholder='Username' value={username}
   onChange={handleUsernameChange} required/>
   <i className="fa-solid fa-user"></i>
</div>
<div className='input-box'>
   <input type='password' placeholder='Password' 
   value={password} onChange={handlepassword} required/>
   <i className="fa-solid fa-lock"></i>
</div>

<button type='submit'>Login</button>

       </form>
      
    </div>
  );
}

export default Login;
