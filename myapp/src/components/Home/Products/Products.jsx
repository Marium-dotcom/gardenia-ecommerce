import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ADD_TO_CART } from '../../../Redux/features/cartSlice';
import { FILTER_BY_SEARCH , FILTER_BY_SORT, selectFilter } from '../../../Redux/features/filterSlice';
import { ADD_PRODUCTS, selectProduct } from '../../../Redux/features/productSlice';
import useFetchCustom from '../../../useCustomHook/useFetchCustom';
import Navbar from '../../Navbar/Navbar';
import PaginationLogic from '../../Pagination/PaginationLogic';
import FilterProducts from '../Search/FilterProducts';
import Search from '../Search/Search';
import Sort from '../Search/Sort';

export default function Products() {

  
    const dispatch = useDispatch();

    //view product by custom hook
      const {displayDatabase} = useFetchCustom("products")
      const   productz  = useSelector(selectProduct)
  // dispatch to display all products for main user
    useEffect(() => {
      
    dispatch(ADD_PRODUCTS({
      productz: displayDatabase
    }))
    
      
    }, [dispatch,displayDatabase])
        
  



    //search state 
    const [search, setSearch] = useState("")
        //select 
    const filtered = useSelector(selectFilter)
    

    useEffect(() => {
      dispatch(FILTER_BY_SEARCH({productz,search}))}
     
    , [dispatch,productz, search])
    
    
    //sorting
    const [sort, setSort] = useState('Latest')
    useEffect(() => {
      dispatch(FILTER_BY_SORT({productz,sort}))}
     
    , [dispatch,productz, sort])


    // pagination logic here
    const [currentPage, setCurrentPage] = useState(1)
    const [itemPerPage] = useState(3)
    // calculations 
    const lastIndexInPage = currentPage * itemPerPage
    const firstIndexInPage = lastIndexInPage - itemPerPage
    const currentItem = filtered.slice(firstIndexInPage, lastIndexInPage)






    function addToCart(itm){
    dispatch(ADD_TO_CART(itm))
    console.log(itm);
    }


    return (
     <>
<Navbar/>
      {/* <p>{filtered.length} products found</p> */}
<div className="container ">
  <div className='d-flex  justify-content-between'>
  <Search value={search} onChange={(e)=> setSearch(e.target.value)}/>
      <Sort value={sort} onChange={(e)=> setSort(e.target.value)}/></div>
      </div>
      
      <FilterProducts />
  <div className="container ">

            <div className="row " >
{currentItem.map((itm,index)=>{


return (

  <>



<div key={index}  className="col-sm-12 col-md-12 col-lg-4 d-inline-block">
  <div className="card m-2">
    <div  >
      <Link to={`/product/details/${itm.id}`} ><img height='500px' width='350px' className="imgview" src={itm.imgURL}  alt={itm.name} /></Link>  
        <p >{itm.name}</p>
        <p >{itm.price}EGP</p>
        <button  className="btn btn-success" onClick={()=> addToCart(itm)}>Add to cart</button>
        </div></div>
     </div>
     </>
)}
)}

</div>
    </div>
<PaginationLogic currentPage={currentPage}  itemPerPage={itemPerPage} setCurrentPage={setCurrentPage} totalProducts={filtered.length}/> 
</>)
}
