import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './features/authslice'
import productReducer from './features/productSlice'
import filterReducer from './features/filterSlice'
import cartReducer from './features/cartSlice'
import checkOutReducer from './features/checkoutSlice'
import previousReducer from './features/prevOrderSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ["auth","mycart"]
}


  const userPersistConfig  = {
    key: 'auth',
    storage,
    blacklist: ['isLoggedin', 'email']
  }

  const cartPersistConfig  = {
    key: 'mycart',
    storage,
    blacklist: ['cartItem']
  }
const rootReducer = combineReducers(
 {
    auth:  persistReducer(userPersistConfig , authReducer),
    item:   productReducer,
    filter: filterReducer,
    mycart:  persistReducer(cartPersistConfig , cartReducer),
    checking: checkOutReducer,
    previousOrder: previousReducer,

    
 }   
)






  const persistedReducer = persistReducer(rootPersistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer ,
    middleware: [thunk]
})

export const persistor = persistStore(store)