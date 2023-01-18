import React from 'react'
import Data from './Data';
import Sidebar from './Sidebar';
import adminStyle from './CSS/Admin.module.css'

import useFetchCustom from '../../useCustomHook/useFetchCustom';

export default function Admin() {

   const {displayDatabase} = useFetchCustom('previousOrders')
   const top= displayDatabase.map(item =>item.cartItem.map(itm => itm.name))



//* calculates no. of orders 

let final = top.flat().reduce((acc,val)=>{
    acc[val] = (acc[val] || 0) + 1
    return acc
    },[])

    console.log('====================================');
    console.log(final);
    console.log('====================================');





return (
    <div className={adminStyle.bg}>
  
  <h1 className="text-white"> Dashboard</h1>
    <Sidebar/>
<Data/>

    </div>
)
}
