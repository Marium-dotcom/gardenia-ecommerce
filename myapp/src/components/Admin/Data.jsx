import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_PREVIOUS_ORDER, CALC_TOTAL_ORDER_AMOUNT, selectOrder, selectTotalOrderAmount } from '../../Redux/features/prevOrderSlice'
import { ADD_PRODUCTS, selectProduct } from '../../Redux/features/productSlice'
import { BsCashCoin } from "react-icons/bs";
import {  BiLineChart } from "react-icons/bi";
import {  RiPlantFill } from "react-icons/ri";

import useFetchCustom from '../../useCustomHook/useFetchCustom'
import {Chart} from './Chart'


export default function Data() {

    let {displayDatabase} = useFetchCustom('products')
    let order = useFetchCustom('previousOrders')
    let totalEarn = useSelector(selectTotalOrderAmount)
    let ordercount = useSelector(selectOrder)
    let totalProducts = useSelector(selectProduct)
    let top= order.displayDatabase.map(item =>item.cartItem.map(itm => itm.name))
    let topProduct =  top.flat().filter((item,index)=>{ return top.flat().indexOf(item) !== index})
    
    let dispatch = useDispatch()
  
    useEffect(() => {
    dispatch(ADD_PRODUCTS({productz: displayDatabase}))
    dispatch(ADD_PREVIOUS_ORDER(order.displayDatabase))
    dispatch(CALC_TOTAL_ORDER_AMOUNT())
    }, [dispatch, displayDatabase, order])


    
return (
<>
<div className="d-flex justify-content-center flex-column w-50 m-auto">
<div className="card m-1 bg-primary text-white"><h3 className="card-body "> <p className="text-start"> Top <br/> Sold :</p>  <p className="text-end"> #1 {topProduct[0]} <br/> #2 {topProduct[1]} <br/> #3 {topProduct[2]} <i class="fa fa-shopping-cart" aria-hidden="true"></i></p>  </h3> </div>

<div className="card m-1 bg-success text-white"><h3 className="card-body">Earnings: {totalEarn}EGP <BsCashCoin/></h3></div>
<div className="card m-1 bg-warning text-white"><h3 className="card-body ">Orders: {ordercount.length} <BiLineChart/></h3></div>
<div className="card m-1 bg-info text-white"><h3 className="card-body"> Products: {totalProducts.length} <RiPlantFill/></h3></div>
</div><Chart />


</>
  )
}
