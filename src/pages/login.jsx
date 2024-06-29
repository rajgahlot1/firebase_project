import React from 'react'

import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useFirebase } from "../context/firebase";
import { useState ,useEffect} from "react"; 

const Login= () => {
  const navigate= useNavigate();

  const firebase = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
useEffect(()=>{
  if(firebase.isLoggedIn){
navigate('/')    
  }
})
  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.signinUserWithEmailAndPassword(email, password);
    console.log("login successfull")
  };
  return (
    <div> <h1>Login page</h1>
 <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          type="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />
        <Button type="submit" onClick={firebase.signinWithGoogle}>Login Account</Button>
      </form>
      <h1>OR</h1>
      <Button variant="danger" onClick={firebase.signinWithGoogle}>sign in with goggle</Button>
    </div>
  )
}

export default Login