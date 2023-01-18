import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { selectOrder } from '../../Redux/features/prevOrderSlice';
import useFetchDetails from '../../useCustomHook/useFetchDetails';
import EditOrderStatus from './EditOrderStatus';

export default function OrderData() {
    let {idParam} = useParams()
    let ShowOrder =useSelector(selectOrder)
    let filteredData = ShowOrder.filter((item)=> item.id === idParam)
    const [order, setOrder] = useState(null)
    
    const {details} = useFetchDetails('previousOrders', idParam)

 
useEffect(() => {
  
    setOrder(details)
 
}, [details])

console.log('====================================');
console.log(order);
console.log('====================================');




  return (
    <>
    <div>OrderData</div>
    <h5>{filteredData.map((item)=>item.cartItem.map((cart)=>{
        return(
    <>
    <table className="w-50 m-auto">
        <tr>
    <th>Product</th>
    <th>Price</th></tr>
    <tr>
    <td><img src={cart.imgURL} width={100} alt="" /></td>
    <td>{cart.price}EGP</td></tr>
    </table>

    </>)
    
}

))

    }</h5>


<h5><h3>Shipping address</h3> <h4>{order?.shipping?.government? order.shipping.government:"null"}</h4></h5>
<h5><h3> Status</h3> <h4>{order?.product_status? order.product_status : "null"}</h4></h5>



   <EditOrderStatus order={order} idParam={idParam}/>


    
    </>
  )
}
