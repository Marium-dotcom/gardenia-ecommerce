import {doc} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer ,toast} from 'react-toastify'
import { db, storage } from '../../Firebase/config'
import { deleteDoc } from "firebase/firestore";
import { deleteObject, ref } from 'firebase/storage'
import Notiflix from 'notiflix'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_PRODUCTS, selectProduct } from '../../Redux/features/productSlice'
import useFetchCustom from '../../useCustomHook/useFetchCustom'
import Sidebar from './Sidebar'
import Search from '../Home/Search/Search'
import { FILTER_BY_SEARCH, selectFilter } from '../../Redux/features/filterSlice'
import PaginationLogic from '../Pagination/PaginationLogic'

export default function ViewProducts() {
 
 


  //view product by custom hook
    const {displayDatabase} = useFetchCustom("products")

 const   productz  = useSelector(selectProduct)

// dispatch
const dispatch = useDispatch();

  useEffect(() => {
    
  dispatch(ADD_PRODUCTS({
    productz: displayDatabase
  }))
  
    
  }, [dispatch,displayDatabase])
  
  console.log(productz);
  const searched = useSelector(selectFilter)
  const [search, setSearch] = useState('')
  
  

   useEffect(() => {
     dispatch(FILTER_BY_SEARCH({productz,search})    )
   
     
   }, [dispatch,productz,search])

  //delete product

  async function delProduct(id,imgURL){
    await deleteDoc(doc(db, "products", id));

    const storageREF = ref(storage, imgURL)

    await deleteObject(storageREF)
    
    toast.success("Deleted")

  }

  function confirmDelete(id,imgURL){
    Notiflix.Confirm.show(
      'Confirm Deleting',
      'are you sure?',
      'Yes',
      'No',
      function okCb() {
        delProduct(id,imgURL)
      },
      function cancelCb() {
      },
      { titleColor: "red",
        okButtonBackground: "red",
        
        width: '320px',
        borderRadius: '8px',
        // etc...
      },
    );

  }
  

      // pagination logic here
      const [currentPage, setCurrentPage] = useState(1)
      const [itemPerPage] = useState(9)
      // calculations 
      const lastIndexInPage = currentPage * itemPerPage
      const firstIndexInPage = lastIndexInPage - itemPerPage
      const currentItem = searched.slice(firstIndexInPage, lastIndexInPage)
  
  

  return (
    <div>
      <ToastContainer/>
      <Sidebar/>
      <Search  value={search} onChange={(e)=>setSearch(e.target.value)}/>

          <div className="container ">
            <div className="row .overflow-hidden" >
              <div className="scrollable overflow-auto">
      {currentItem.map((products,i)=> {

        return (
          <>

        <div key={i} className="col-sm-12 col-md-6 col-lg-4 d-inline-block card">
        <img width='250px' height='300' src={products.imgURL}  alt={products.name} />
        <p >{products.name}</p>
        <Link to={`/Admin/AddProduct/${products.id}`}> <i className="fa fa-edit mx-2 text-success" style={{ fontSize: '1.3em' }} /></Link> <Link to=""> 
        <i onClick={()=> confirmDelete(products.id,products.imgURL)} className="fa fa-trash text-danger" style={{ fontSize: '1.3em' }} /></Link>
        </div>
      
        </>
        )
      })}
    </div></div></div>
    <div className="w-50 m-auto ">
    <PaginationLogic currentPage={currentPage}  itemPerPage={itemPerPage} setCurrentPage={setCurrentPage} totalProducts={searched.length}/> 
  </div>  </div>
  )
}
