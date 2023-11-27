import React, { useState, useEffect} from 'react'
import { signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth"

import {auth} from '../firebase'
import {useHistory, useNavigate} from "react-router-dom";
export default function Welcome() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) =>{
      if(user){
        navigate('/Home');
      }
    })


  })


  const handleEmailChange = (e) => {
       setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {

    setPassword(e.target.value);
  };

  const handleSignIn = () => {

    signInWithEmailAndPassword(auth, email, password).then(()=>
   {
    navigate('/Home')
   } ).catch((err)=> alert(err.message));
  }

  const handleRegister = () => {};

  return (
    <div className='welcome'>
      <h1>Write A note</h1>
      <div className='login-register-container'>
      {isRegistering ? (
        <>
        
        <input type='email' placeholder='Email' />
        <input type='email' placeholder='Confirm email' />
        <input type='password' placeholder='Password'/>
        
        <input type='password' placeholder='Confirm password'
        
       />
        <button onClick={handleRegister}> Register</button>
        <button onClick={()=> setIsRegistering(false)}> Go Back
        
        
        </button>
      </>

      ) : (
        <>
        <input type='email' onChange={handleEmailChange} valu={email}/>
        <input type='password'onChange={handlePasswordChange} value={password}/>
        <button onClick={handleSignIn}> Sign In</button>
       <button onClick={()=> setIsRegistering(true)}> Creat new account</button>
      
        
        
        
        </>


      )
        
        
        
        
        
        
    
        
        
        



      }
      
      </div>
      
    </div>
  )
}
