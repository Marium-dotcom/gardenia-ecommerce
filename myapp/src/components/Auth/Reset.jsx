import React , {useState} from 'react'
import Wavy from '../../Assets/Wavy_Gen-01_Single-07.jpg'
import {  getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast,ToastContainer } from 'react-toastify';

export default function Reset() {
  const [email, setEmail] = useState('')
  const auth = getAuth();

  function resetPassword(e){
  
    e.preventDefault()
  
    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
      toast.success("Check your email")

    })
    .catch((error) => {

      toast.error(error.message)
      // ..
    });
  }


  return (
    <>
    <ToastContainer/>
    <div className="d-flex flex-column justify-content-center align-items-center">
    <img className="imgLogin" src={Wavy} alt="" />

    <form onSubmit={resetPassword}>
    <input className="d-block my-2 rounded border-bottom border-light" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required placeholder="email.." />
    <button    className="btn btn-primary my-3"  type="submit">Reset </button>
    </form>

    
  </div></>
  )
}
