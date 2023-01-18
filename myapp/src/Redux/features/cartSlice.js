import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';


const initialState = {
    cartItem: sessionStorage.getItem('cartItem')? JSON.parse(sessionStorage.getItem('cartItem')) : [],
    cartTotalProducts: 0,
    cartTotalPrice:0,
}

const cartSlice = createSlice({
  name: "mycart",
  initialState,
  reducers: {

    ADD_TO_CART(state, action){


        const {id, name} = action.payload


        const cartIndex = state.cartItem.findIndex((item)=> item.id === id)

        //check if cart is empty
        if (cartIndex>=0){

        state.cartItem[cartIndex].productQuantity +=1
        
        }
        // fill in cart
        else {
            const tempCart = {...action.payload, productQuantity:1}
            state.cartItem.push(tempCart)
            toast.success(`${name} Added to your cart` )
        }

        
        sessionStorage.setItem('cartItem',JSON.stringify(state.cartItem)) 
    },  
    
    Dec_CART(state,action) {

        
       const {id} = action.payload
       const cartIndex = state.cartItem.findIndex((item)=> item.id === id)


       if ( state.cartItem[cartIndex].productQuantity>1){
        state.cartItem[cartIndex].productQuantity-=1
        toast.info("decreased")
        }
        // fill in cart
        else if (state.cartItem[cartIndex].productQuantity===1)
        {
        
            const removeItem = state.cartItem.filter((item)=>item.id !== id)
            state.cartItem = removeItem
            toast.info("removed")

    
        }
         
        sessionStorage.setItem('cartItem',JSON.stringify(state.cartItem))

        


    },
Delete(state, action){
        const removeItem = state.cartItem.filter((item)=>item.id !== action.payload.id)
        state.cartItem = removeItem
        toast.info("All product removed")
        sessionStorage.setItem('cartItem',JSON.stringify(state.cartItem))

    },

DeleteTotal(state, action) {
        state.cartItem = []
        toast.info("deleted")
        sessionStorage.setItem('cartItem',JSON.stringify(state.cartItem))

    },
    CalculateTotal(state, action){
        const arr = []
        state.cartItem.map((item)=> {
            const {price, productQuantity} = item
            let total = price * productQuantity
            return arr.push(total)
        })
       let finalTotal = arr.reduce((a,b)=>{
        return a + b
       },0) 
       state.cartTotalPrice = finalTotal
    },

       totalProducts(state, action){
        const arr = []
        state.cartItem.map((item)=> {
            const { productQuantity} = item
            let totalQ =  productQuantity
            return arr.push(totalQ)
        })
       let finalTotalQ = arr.reduce((a,b)=>{
        return a + b
       },0) 

       state.cartTotalProducts = finalTotalQ

       },

   
  }
});

export const {ADD_TO_CART, Dec_CART, DeleteTotal,Delete, CalculateTotal,totalProducts} = cartSlice.actions
export const selectCart = state => state.mycart.cartItem
export const selectTotalProduct = state => state.mycart.cartTotalProducts
export const selectTotalPrice = state => state.mycart.cartTotalPrice
export default cartSlice.reducer