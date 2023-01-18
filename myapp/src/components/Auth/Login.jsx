import { useNavigate } from 'react-router-dom';
import React , {useState} from 'react'
import Wavy from '../../Assets/login.png'
import '../Auth/auth.css'
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword  } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import {Link} from 'react-router-dom'
import { getURL } from '../../Redux/features/authslice';
import { useSelector } from 'react-redux';




export default function Login() {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()
  const myURL = useSelector(getURL)
  // check if user logged in after cart or not

  function redirectTo(){
    if (myURL.includes("cart")){
      nav("/cart")
    }
    else{ 
      nav("/")
    }
   }


  const auth = getAuth();
//login with google

  const provider = new GoogleAuthProvider();


  function signinWithGoogle() {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    toast.success("Success")
    redirectTo()

    // ...
  }).catch((error) => {
    // Handle Errors here.
  toast.error(error.message)

    // ...
  })}




  function loginUser(e){
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    toast.success("Success")
    redirectTo()

  })
  .catch((error) => {
    toast.error("Not correct entries")
  });


  }

  
  return (
    <>
    <ToastContainer/>
        <div className="d-flex flex-column justify-content-center align-items-center">
      <img className="imgLogin" src={Wavy} alt="" />
      <form onSubmit={loginUser}>
      <input className="d-block my-2 rounded border-bottom border-light" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required placeholder="email.." />
      <input className="d-block my-2 rounded border-bottom border-light" value={password} onChange={(e)=> setPassword(e.target.value)} type="password" required placeholder="password.." />
      <button className="btn btn-primary" type="submit">Login</button>
      <Link to='/reset'><p>Reset Password</p></Link>
      </form>
      <button className='btn btn-danger' onClick={signinWithGoogle}>Login with google</button>
      <p>dont have an account? <Link to="/Register">Register</Link></p>
    </div>
</>
  )
}
