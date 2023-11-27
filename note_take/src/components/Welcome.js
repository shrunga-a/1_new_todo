import React, { useState, useEffect} from 'react'
import { signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth"

import {auth} from '../firebase'
import {useHistory, useNavigate} from "react-router-dom";
export default function Welcome() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <div className='welcome'>
      <h1>Write A note</h1>
      <div className='login-container'>
      <input type='email' onChange={handleEmailChange} valu={email}/>
      <input type='password'onChange={handlePasswordChange} value={password}/>
      <button onClick={handleSignIn}> Sign In</button>
      <a href=""> Creat new account</a>
      
    
      </div>
      Welcome
    </div>
  )
}
