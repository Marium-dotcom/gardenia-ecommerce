import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  PREVIOUS_ORDERS:[],
  totalprice:0

}

const prevOrderSlice = createSlice({
  name: "previousOrder",
  initialState,
  reducers: {

    ADD_PREVIOUS_ORDER(state,action){
      state.PREVIOUS_ORDERS = action.payload

    },
    CALC_TOTAL_ORDER_AMOUNT(state) {
      const array = [];
      state.PREVIOUS_ORDERS.map((item) => {
        const { price } = item;
        return array.push(price);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalprice = totalAmount;
    },


    
  },



});




export const {ADD_PREVIOUS_ORDER, CALC_TOTAL_ORDER_AMOUNT} = prevOrderSlice.actions
export const selectOrder = (state) => state.previousOrder.PREVIOUS_ORDERS
export const selectTotalOrderAmount = (state) => state.previousOrder.totalprice;

export default prevOrderSlice.reducer