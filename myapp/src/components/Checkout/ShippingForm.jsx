import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectTotalPrice, selectTotalProduct } from '../../Redux/features/cartSlice'
import { SAVE_ADDRESS } from '../../Redux/features/checkoutSlice'
import Navbar from '../Navbar/Navbar'
export default function Checkout() {

  const dispatch = useDispatch();
  let TotalPrice = useSelector(selectTotalPrice)
  let TotalProduct = useSelector(selectTotalProduct)

  let initialState = { 
    name: '',
    phone : '',
    city : '',
    streetAddress : '',
    government : ''
}
  
  let [shipping, setShipping] = useState({...initialState})

  function handleInput(e) {
    const {value , name} = e.target
    setShipping({...shipping, [name]: value})



  }



  function handleForm(e) {
e.preventDefault()
dispatch(SAVE_ADDRESS(shipping))




  }
 


  return (
<>
<Navbar/>

<h2>Shipping address</h2>
<div className="card p-3 w-50 m-auto">
<form className='card-body d-flex flex-column ' onSubmit={handleForm}>
  <input placeholder="name" type="text" name="name" value={shipping.name}onChange={(e)=>handleInput(e)}/>
  <input className='my-2' placeholder='phone' type="number" name="phone" value={shipping.phone} onChange={(e)=>handleInput(e)}/>
  <input placeholder="city" type="text" name="city" value={shipping.city} onChange={(e)=>handleInput(e)}/>
  <input className='my-2' placeholder="street Address" type="text" name="streetAddress" value={shipping.streetAddress} onChange={(e)=>handleInput(e)}/>
  <input placeholder="government" type="text" name="government" value={shipping.government} onChange={(e)=>handleInput(e)}/>
  <button className='btn btn-success rounded w-75 m-auto mt-2' type="submit" enabled="true"><Link className='text-white text-decoration-none' to="Checkout"> submit</Link></button>
</form>


<div className="checkout bg-primary w-100 m-auto text-white rounded"> 
  <p><Link className="text-white text-decoration-none" to="/"> <i className="fa fa-arrow-left"/> continue shopping</Link></p>
  <h3>Total {TotalPrice}</h3>
  <p>{TotalProduct} Product(s)</p>
</div> </div>

</>
  )
}
