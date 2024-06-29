// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from "bootstrap";
// import { useFirebase } from "../context/firebase";
// import { useState } from "react";
// const RegisterPage = () => {
// const firebase= useFirebase();
// const [email, setemail]= useState('')
// const [password, setpassword]= useState('')

// const handleSubmit= async(e)=>{
//     e.preventDefault();
//    await firebase.signupUserWithEmailAndPassword(email, password)
// }
// console.log(firebase)
//   return (
//     <>
//       <form action="">
//         <input value={email} onChange={()=>setemail((e)=>e.target.value)} placeholder="email"  type="email" />
//         <input value={password} onChange={()=>setpassword((e)=>e.target.value)} placeholder="password"  type="password" />
//         <button  type="Submit" onClick={handleSubmit}> Create Account</button>
//       </form>
//     </>
//   );
// };
// export default RegisterPage;
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useFirebase } from "../context/firebase";
import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate= useNavigate();
  const firebase = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.signupUserWithEmailAndPassword(email, password);
console.log('register successfull')  
};
useEffect(()=>{
  if(firebase.isLoggedIn){
navigate('/')    
  }
})
  return (
    <>
    <h1>Sign up page    </h1>
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
        <Button type="submit">Create Account</Button>
      </form>
        </>
  );
};

export default RegisterPage;
