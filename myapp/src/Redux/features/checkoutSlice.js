import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    shippingAdress:{}

}

const checkout = createSlice({
  name: "checking",
  initialState,
  reducers: {
    SAVE_ADDRESS(state, action){
      state.shippingAdress = action.payload 
    
    }
  }
});

export const {SAVE_ADDRESS} = checkout.actions
export const selectShipping = (state) => state.checking.shippingAdress

export default checkout.reducer