import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import StarsRating from 'react-star-rate';

import { ADD_TO_CART, Dec_CART, totalProducts,selectCart } from '../../../Redux/features/cartSlice';
import useFetchCustom from '../../../useCustomHook/useFetchCustom';
import useFetchDetails from '../../../useCustomHook/useFetchDetails';
import Navbar from '../../Navbar/Navbar';


export default function ProductDetail() {
const [productDetails, setProductDetails] = useState()
let {idParam } =useParams()
const dispatch = useDispatch()
const cartItems = useSelector(selectCart);
const {displayDatabase} = useFetchCustom("orders review")
const {details} = useFetchDetails("products" , idParam)

useEffect(() => {
  
setProductDetails(details)

}, [details])




const cart = cartItems.find((cart) => cart.id === idParam);
const reviews = displayDatabase.filter((rev)=> rev.productID === idParam)
const isCartAdded = cartItems.findIndex((cart) => {
  return cart.id === idParam;
});






 

  function addToCart(productDetails){
    dispatch(ADD_TO_CART(productDetails))
    dispatch(totalProducts())

    }

  function decreaseCart(productDetails){
    dispatch(Dec_CART(productDetails))
    dispatch(totalProducts())


  }


  




  
  return ( 

    <>
    <Navbar/>
    <div className='card w-75 m-auto bg-light mt-5'>
      <div className="card-body">
    <h3>{productDetails? productDetails.name : null }</h3>  
    <p className='w-75 m-auto'><em> {productDetails? productDetails.description : null }</em></p>  
      <img className='d-block p-5 m-auto' src={productDetails?.imgURL? productDetails.imgURL : null} width="300" alt={productDetails?.name? productDetails.name : null} />


      {isCartAdded < 0 ? null :    
      <div>
<button className="btn" onClick={()=> decreaseCart(productDetails)}>-</button>
{cart.productQuantity}
<button className="btn" onClick={()=> addToCart(productDetails)}>+
</button>
</div> 
}

<button className="btn btn-success" onClick={()=> addToCart(productDetails)}>Add to cart</button>


    </div>
</div>
<div>
  <h3>Reviews</h3>
  {reviews.length > 0 ?
     reviews.map((rev)=>{return(<>
      <p>{<StarsRating
      
      value={rev.stars}/>}</p>
      <p>review: {rev.review}</p>
      <p>by: {rev.userName? rev.userName : "not known"}</p>
     </>)})
:"no reviews yet"}

</div>

</>  )
}
