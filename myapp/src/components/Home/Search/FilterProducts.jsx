import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_BY_CATEGORY } from '../../../Redux/features/filterSlice'
import { selectProduct } from '../../../Redux/features/productSlice'

export default function FilterProducts() {
    let dispatch = useDispatch() 
    let productz = useSelector(selectProduct)

  const [category, setCategory,] = useState("All products")



function getCategory(e){
    const {value} = e.target
    setCategory(value)
}


function categoryFilter(e){
e.preventDefault()

}


useEffect(() => {
    dispatch(FILTER_BY_CATEGORY({productz,category}))

}, [dispatch,productz,category])




  return (

  <div className="filter-products container overflow-hidden">

<form className='d-flex justify-content-start align-items-center ' onSubmit={categoryFilter}>


<input value="All Products"  default onChange={(e)=>getCategory(e)} name="category" type="radio"/>
<label className='me-3' for="All"> All Products </label> 

<input  value="OutDoor"   onChange={(e)=>getCategory(e)} name="category" type="radio"/>
<label className='me-3' for="OutDoor"> Outdoor Plants </label> 
<input value="Indoor"  onChange={(e)=>getCategory(e)} name="category" type="radio" />  
<label className='me-3'> Indoor Plants </label>   
<input value="Trees"  onChange={(e)=>getCategory(e)} name="category" type="radio"/>
<label className='me-3'>Trees</label>  
<input  value="Potsandothers" onChange={(e)=>getCategory(e)} name="category" type="radio"/>
<label>Other</label>  

</form>



</div>
  )
}
