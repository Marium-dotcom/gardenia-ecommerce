import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getuserID } from '../../Redux/features/authslice';
import { ADD_PREVIOUS_ORDER } from '../../Redux/features/prevOrderSlice';

import useFetchCustom from '../../useCustomHook/useFetchCustom';
import Navbar from '../Navbar/Navbar';

export default function PrevOrders() {
    
    const dispatch = useDispatch();
    const {displayDatabase} = useFetchCustom("previousOrders")
    let uid = useSelector(getuserID)

    const userFilter =  displayDatabase.filter((e)=> e.userIDEN === uid)
   
useEffect(() => {
  dispatch(ADD_PREVIOUS_ORDER(displayDatabase))


}, [dispatch,displayDatabase])




  return (

    <>
     <Navbar/>


     <div className={`container  table-responsive-lg`}>
<table className= " w-50 m-auto border table table-success table-striped table-hover">
<thead>
  <tr>
  <th>Product</th>
  <th>Price</th>
  <th>Status</th>
  <th>date purchased</th>
  <th>Rate</th>
  </tr></thead>
  {userFilter.map((item)=>item.cartItem.map((cart)=>{return(
  <> 
      <tbody>

  <tr>
    <td>{cart.name}</td>
    <td>{cart.price}</td>
    <td>{item.product_status}</td>
    <td>{item.orderDate}</td>
    <td><Link className='text-decoration-none ' to={`/ProductRating/${cart.id}`}> Rate</Link></td>
  </tr></tbody>

  </>) })) }

 
</table>

</div>
{/* <h5>{cart.name}, Cost: {cart.price}</h5> */}

</>        
  
  )
}
