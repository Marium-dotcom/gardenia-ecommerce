import {Link, useNavigate} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {useDispatch, useSelector} from 'react-redux'
import { REMOVE_USER, SET_ACTIVE_USER } from '../../Redux/features/authslice';
import { ToastContainer, toast } from 'react-toastify';
import HideRoutes from '../../HideRoutes/HideRoutes';
import HideLoggedin from '../../HideRoutes/HideLoggedin';
import { selectCart, selectTotalProduct, totalProducts } from '../../Redux/features/cartSlice';
import { AdminOnlyReach } from '../../HideRoutes/AdminRoutes';
import './Navbar.css'

export default function Navbar() {

  const dispatch = useDispatch()

  const totalProduct = useSelector(selectTotalProduct);
  const cartItem = useSelector(selectCart);

  useEffect(() => {
    dispatch(totalProducts())
  }, [dispatch,cartItem])
  

  const [nameToken, setNameToken] = useState('')
  const nav = useNavigate()
  const auth = getAuth();

function onChangeAuthState(){

  onAuthStateChanged(auth, (user) => {

  if (user) {
    // User is signed in

    setNameToken(user.email)
        // .. event
        dispatch(SET_ACTIVE_USER({
          isLoggedin:true,
          email: user.email,
          username: user.displayName,
          userID: user.uid
        }))
  } else {
    // User is signed out
    // ...    
    setNameToken('')
    dispatch(REMOVE_USER())
  }
});}
  


function sgnOut(){
  signOut(auth).then(() => {
    // Sign-out successful.
    toast.success("Logged out successfully")
    nav('/login')
  }).catch((error) => {
    // An error happened.

  });
}


useEffect(() => {
  
  onChangeAuthState()
  
}, [])

return (


<>
<ToastContainer/>
<nav className="navbar navbar-expand-lg  navbarColor">
    <div className="container">
  <h3 className='text-warning me-4 '><em> <b>  Gardenia</b></em></h3>
  <HideRoutes>
  <span className="">Hi, {nameToken.split('@')[0]} <i class="fa fa-heart text-danger" aria-hidden="true"></i> </span></HideRoutes>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarNav">
  <div className="mx-auto"></div>

    <ul className="navbar-nav">
    <li className="nav-item">
      <button className="btn btn-outline-danger ">
        <Link className='text-decoration-none text-dark' to='/Products'>Shop</Link>
        </button></li>

      <li className="nav-item">

        <Link to='/' className="nav-link" href="#">Home </Link>
      </li>



      <li className="nav-item navitem">
        <Link to='/contact' className="nav-link" href="#">Contact us</Link>
      </li>
      <HideLoggedin>
      <li className="nav-item navitem">
        <Link to='/login' className="nav-link" href="#">Login</Link>
      </li>

      <li className="nav-item">
        <Link to="Register" className="nav-link" href="#">Register</Link>
      </li></HideLoggedin>
      <li className="nav-item">
        <Link to='/cart' className="nav-link" href="#">{totalProduct===0? "":` (${totalProduct}) item(s) in `} Cart  </Link>
      </li>

  
    
<HideRoutes>
<li className="nav-item">
        <Link onClick={sgnOut} to='/' className="nav-link" href="#">Logout</Link>
      </li>

      <li className="nav-item">
        <Link className='nav-link' to="/PrevOrders">Orders History</Link>
      </li>
    </HideRoutes>

   
      <li className="nav-item"> <AdminOnlyReach>
        <button className="btn btn-danger">
        <Link to='/Admin' className=" text-decoration-none text-dark ">Dashboard <i class="fa fa-dashboard" aria-hidden="true"></i></Link>  </button>  </AdminOnlyReach>
      </li>

    </ul>
</div>  </div>



</nav>
</>
    )
}