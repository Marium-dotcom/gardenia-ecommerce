import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getemail, getuserID } from "../../Redux/features/authslice";
import { DeleteTotal, selectCart, selectTotalPrice, selectTotalProduct } from "../../Redux/features/cartSlice";
import { selectShipping } from "../../Redux/features/checkoutSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function CheckoutForm() {


  const nav  = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const userID = useSelector(getuserID)
  const cartItem = useSelector(selectCart);
  const userMail = useSelector(getemail)
  const price = useSelector(selectTotalPrice)
  const quantity = useSelector(selectTotalProduct)
  const shipping = useSelector(selectShipping)

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);




  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    } }, [stripe]);


    
 

  



  function addOrderToDB(){

const today = new Date();
const date = today.toDateString()
const time = today.toLocaleTimeString()
const orderConfig = {
   userIDEN: userID,
  userMail,
  orderDate: date,
  orderTime: time,
  price,
  quantity,
  cartItem,
  created: JSON.stringify(Timestamp.now().toDate()),
  shipping:{
    government: shipping.government
  },
  product_status: 'order recieved',

}
    try {
      // Add a new document with a generated id.
    addDoc(collection(db, "previousOrders"),orderConfig) 
      toast.success("order added to firestore")
      dispatch(DeleteTotal())
      nav('./ConfirmOrder')}
      
  catch (error) {
toast.error(error.message) }}







const handleSubmit = async (e) => {
  e.preventDefault();

  if (!stripe || !elements) {
    // Stripe.js has not yet loaded.
    // Make sure to disable form submission until Stripe.js has loaded.
    return;

  }


  setIsLoading(true);
  

  const confirmPayment = await stripe
  .confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: "http://localhost:3000/cart/ShippingForm/Checkout/ConfirmOrder",
      
    },
    redirect:"if_required"
  })
  .then((result) => {
    if(result.error){
      toast.error(result.error.message)
      setMessage(result.error.message);
      return;

    } 
    
    if(result.paymentIntent){
      if(result.paymentIntent.status === "succeeded"){
        setIsLoading(false)
        toast.success("Order is successfully created")
        addOrderToDB()
      }

    }
  })

setIsLoading(false);  



};







return (
    <>
          <Navbar/>

    <h2 className="border w-75 m-auto my-3 rounded bg-light">Online Payment</h2>
    <form className="card p-3 w-75 m-auto bg-light" id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element"  />
      <button className="btn btn-success mt-3" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
    </>
  );
}