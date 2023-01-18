import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productz: []
}


const productSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
     ADD_PRODUCTS: (state, action) => {
     state.productz = action.payload.productz
  
     } 
  }
});

export const {ADD_PRODUCTS} = productSlice.actions
export const selectProduct = (state) => state.item.productz
export default productSlice.reducer



