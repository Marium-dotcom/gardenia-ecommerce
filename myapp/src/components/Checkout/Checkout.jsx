import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getemail } from '../../Redux/features/authslice';

import { CalculateTotal, selectCart, selectTotalPrice, totalProducts } from '../../Redux/features/cartSlice';
import CheckoutForm from './CheckoutForm';

export default function Checkout() {
  // const stripePromise = loadStripe("pk_test_51MBtl3LMg96aBFfDIvKanBAxukpZyyUtd3FVL9hR3zpSDTvXbxXrtt2uGdenMfhGdslaoetI2Ayb8cdZSW4A0Pyd00vS6orX1s")
  const [stripePromise] = useState(() => loadStripe("pk_test_51MBtl3LMg96aBFfDIvKanBAxukpZyyUtd3FVL9hR3zpSDTvXbxXrtt2uGdenMfhGdslaoetI2Ayb8cdZSW4A0Pyd00vS6orX1s"))

    const [clientSecret, setClientSecret] = useState('')
    const myEmail = useSelector(getemail)
    const totalPrice = useSelector(selectTotalPrice)
    const cartItem = useSelector(selectCart);
    const dispatch = useDispatch()
    

useEffect(() => {
    dispatch(CalculateTotal())
    dispatch(totalProducts())

},[dispatch, cartItem])

const description = `eStore Payment email: ${myEmail}, amount: ${totalPrice}`
      useEffect(() => {
      // Create PaymentI ntent as soon as the page loads
      fetch("http://localhost:4242/create-payment-intent",

      {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ 
        items: cartItem,
        userMail: myEmail,
        description,

         }),

        

        

      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);
  
    const appearance = {
    theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };


  return (
    <div className="App">
      {clientSecret && (
        <Elements  options={options}  stripe={stripePromise} >
          <CheckoutForm/>
        </Elements>
      )}

    </div>

  )
}

