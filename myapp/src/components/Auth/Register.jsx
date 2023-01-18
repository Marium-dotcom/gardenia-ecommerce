import React from 'react'
import  {useState} from 'react'
import Wavy from '../../Assets/reg.png'
import { useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../Firebase/config'


export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cPass, setcPass] = useState('')
  const navigate = useNavigate()

function RegisterUser(e){
e.preventDefault()
if (password !== cPass){
toast.error('Password do not match')
}
//....... AUTH



   createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    toast.success("Success")
    navigate("/login")
  })
  .catch((error) => {

    // ..
    toast.error(error.message)
  });

}





  return (
    <div>  
      <ToastContainer/>
        <div className="d-flex flex-column justify-content-center align-items-center">
    <img className="imgLogin" src={Wavy} alt="" />
    <form onSubmit={RegisterUser}> 
    <input className="d-block my-2 rounded border-bottom border-light" value={email} onChange={(e)=> setEmail(e.target.value)} type="email" required placeholder="email.." />
    <input className="d-block my-2 rounded border-bottom border-light" value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="password.." required  />
    <input className="d-block my-2 rounded border-bottom border-light" value={cPass}  onChange={(e)=> setcPass(e.target.value)} type="password" required placeholder="Confirm password.." />

    <button className="btn btn-primary my-3" type="submit">Sign up</button>
    </form>
  </div></div>
  )
}
