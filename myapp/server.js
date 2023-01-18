require("dotenv").config()
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SK )

// This is your test secret API key.
const app = express();

app.use(cors())
app.use(express.json());
const path = require("path");

app.get("/",(req, res) => {
  res.send("backend there ;)")
})

app.use(express.static("public"));
const arr = []


const calculateOrderAmount = (items) => {

items.map((item)=> {
    const {price, productQuantity} = item
    let total = price * productQuantity
    return arr.push(total)
})


let finalTotal = arr.reduce((a,b)=>{
return a + b
},0)


return finalTotal * 100;
};


app.post("/create-payment-intent", async (req, res) => {
  const { description,shipping,items} = req.body;
  
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "egp",
    automatic_payment_methods: {
      enabled: true,
    }

    ,description,
 
    


  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });

});

const PORT = process.env.PORT || 4242

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}` ));