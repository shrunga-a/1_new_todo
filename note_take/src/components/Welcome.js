import React, { useState, useEffect} from 'react'
import { signInWithEmailAndPassword , onAuthStateChanged, createUserWithEmailAndPassword} from "firebase/auth"

import {auth} from '../firebase'
import {useHistory, useNavigate} from "react-router-dom";
export default function Welcome() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: '',
    confirmemail: '',
    password: '',
    confirmpassword: '',
  })
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) =>{
      if(user){
        navigate('/Home');
      }
    });


  },[]);


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

  const handleRegister = () => {
    if(registerInformation.email !== registerInformation.confirmemail){
      alert("Email address is not same")
      return
    }else if (registerInformation.password !== registerInformation.confirmpassword)
    {
      alert("Password is not same")
      return
    }

    createUserWithEmailAndPassword(auth, registerInformation.email,registerInformation.password).then(()=>{
      navigate("/Home");
    })
    .catch((err)=> alert(err.message));


  };

  return (
    <div className='welcome'>
      <h1>Write A note</h1>
      <div className='login-register-container'>
      {isRegistering ? (
        <>
        
        <input type='email' placeholder='Email' value={registerInformation.email}
         onChange={(e)=>{ setRegisterInformation({...registerInformation, email: e.target.value })}}/>
        <input type='email' placeholder='Confirm email' value={registerInformation.confirmemail} 
        onChange={(e)=>{ setRegisterInformation({...registerInformation, confirmemail: e.target.value })}}/>
        <input type='password' placeholder='Password' value={registerInformation.password} 
        onChange={(e)=>{ setRegisterInformation({...registerInformation, password: e.target.value })}}/>
        
        <input type='password' placeholder='Confirm password' value={registerInformation.confirmpassword} 
        onChange={(e)=>{ setRegisterInformation({...registerInformation, confirmpassword: e.target.value })}}
        
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
