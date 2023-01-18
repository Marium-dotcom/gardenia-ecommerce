import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import StarsRating from 'react-star-rate'
import { toast } from 'react-toastify'
import { db } from '../../Firebase/config'
import { getuserID, getusername } from '../../Redux/features/authslice'
import { selectProduct } from '../../Redux/features/productSlice'
import Navbar from '../Navbar/Navbar'




export default function ProductRating() {
  
  let {idParam } =useParams()
const [review, setReview] = useState('')
const [stars, setStars] = useState()
  const product = useSelector(selectProduct)
  const userName = useSelector(getusername)
  const userID = useSelector(getuserID)
  const rateProduct = product.find((item) => item.id === idParam)

  function sendReview(e){
    setReview(e.target.value)

  }

function handleReview(e){
e.preventDefault()

const today = new Date();
const date = today.toDateString()

const reviewConfig = {
userID,
orderDate: date,
stars,
review,
userName,
productID: idParam,
created:date



}

  try {
    // Add a new document with a generated id.
  addDoc(collection(db, "orders review"),reviewConfig) 
    toast.success("review added successfully")
    setReview("")
    setStars(0)
    }
    
catch (error) 
{
toast.error(error.message) 
}
}










  return (
    <>

    <Navbar/>
    <h1>Product Rating</h1>
    <h3>{rateProduct?.name? rateProduct.name : "null"}</h3>
    <img src={rateProduct?.imgURL? rateProduct.imgURL : null} width={150} alt="" />
    <form onSubmit={handleReview}>
    <StarsRating
    value={stars}
    onChange={stars=> setStars(stars)}
/>
        

    
      <input className='d-block w-50 m-auto p-3 rounded' placeholder="Review here" type="text" value={review} onChange={(e)=>sendReview(e)} />
      <button className="btn btn-primary mt-3 "type="submit">Send Review</button>
    
    </form>

  </>)
}
