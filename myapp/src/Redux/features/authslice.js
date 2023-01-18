import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isLoggedin: false,
    email: null,
    username: null,
    userID: null,
    previousURL: ""
    
}


const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
        SET_ACTIVE_USER:(state,action) =>{
        const {email,username,userID} = action.payload
        state.isLoggedin = true
        state.email = email
        state.username = username
        state.userID = userID
        
  
    },

        REMOVE_USER:(state) => {
      state.isLoggedin = false
      state.email = null
      state.username = null
      state.userID = null

    },
    previousLink(state, action){
      state.previousURL = action.payload
    }
  }
});

export const {SET_ACTIVE_USER , REMOVE_USER, previousLink} = authslice.actions
export const getisLoggedin = (state) => state.auth.isLoggedin
export const getURL = (state) => state.auth.previousURL
export const getemail = (state) => state.auth.email
export const getusername = (state) => state.auth.username
export const getuserID = (state) => state.auth.userID

export default authslice.reducer