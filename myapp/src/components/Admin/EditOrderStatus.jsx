import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../Firebase/config';
import { getuserID } from '../../Redux/features/authslice';
import useFetchDetails from '../../useCustomHook/useFetchDetails';


export default function EditOrderStatus({order , idParam}) {

const [status, setStatus] = useState()
const nav = useNavigate()

function statusSetter(e){

 e.preventDefault()
  const orderConfig = {
    userIDEN: order.userIDEN,
    userMail: order.userMail,
    orderDate: order.orderDate,
    orderTime: order.orderTime,
    price: order.price,
    quantity: order.quantity,
    cartItem: order.cartItem,
    created: JSON.stringify(Timestamp.now().toDate()),
    shipping:{
      government: order.shipping.government
    },
    product_status: status,
  
  }
      try {
        // Add a new document with a generated id.
      setDoc(doc(db, "previousOrders", idParam),orderConfig) 
        toast.success("order status  changed")
        nav('/Admin')
      }
        
    catch (error) {
  toast.error(error.message) }
}



  function handleStatus(e){
    const {value} = e.target
    setStatus(value)
  }


  
  return (
<form onSubmit={(e,id)=>statusSetter(e,id)}>
  <fieldset>
    <legend>Select order-status:</legend>
    <div>
           
    <input type="radio" name="status"   value="Order Recieved" onChange={(e)=>handleStatus(e)} />
      <label >Order Recieved</label>
    <input type="radio" name="status"  value="Out for delivery" onChange={(e)=>handleStatus(e)} />
      <label >Out for delivery</label>

      <input type="radio"  name="status" value="Delivered" onChange={(e)=>handleStatus(e)} />
      <label >Delivered</label>

      <input type="radio" name="status" value="Cancelled" onChange={(e)=>handleStatus(e)}/>
      <label >Cancelled</label>

    
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </fieldset>
</form>  )
}
