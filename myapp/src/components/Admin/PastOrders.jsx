import React from 'react'
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectOrder } from '../../Redux/features/prevOrderSlice';
import useFetchCustom from '../../useCustomHook/useFetchCustom';
import adminStyles from './CSS/Admin.module.css'

export default function PastOrders() {

    const userPrevOrders = useSelector(selectOrder)
    console.log(userPrevOrders);
    const {displayDatabase} = useFetchCustom("previousOrders")
  return (
<div className={`container ms-5 table-responsive-lg`}>
<table className= " w-50 m-auto border table table-success table-striped table-hover">
 <thead>
 <tr>
  <th>Edit Status</th>
  <th>Date Purchased</th>
  <th>Order ID</th>
  </tr></thead>
  {displayDatabase.map((item)=>{return(
  <> 
  <tbody>
  <tr>

    <td className="text-danger">{item.product_status == 'Delivered'? <h5 className='text-success'>{item.product_status}</h5>:<h5 className='text-danger'>{item.product_status}</h5> } </td>
     <td>{item.orderDate}</td>
   <td>   <Link to={`OrderData/${item.id}`}>{item.id}</Link></td>
  </tr></tbody>

  </>) }) }

 
</table>  </div>)
}