import React, { useState } from 'react'
import Sidebar from './Sidebar'
import addStyle from './CSS/Add.module.css'

import './Admin.jsx'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { collection,  addDoc, Timestamp, setDoc, doc } from "firebase/firestore"; 
import { db } from '../../Firebase/config';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import  { selectProduct } from '../../Redux/features/productSlice';
import {  useSelector } from 'react-redux';

export default function AddProduct() {

  let initialState = {
    name: '',
    price: 0,
    description: '',
    category: '',
    imgURL: '',
    created: '' ,
  }



  const {idParam} = useParams()

const products = useSelector(selectProduct)
console.log(products)
const productEdit = products.find((item) => item.id === idParam);
console.log(productEdit);



const [product, setProduct] = useState(()=> {
  const newState = detect(idParam,
    {...initialState},
    productEdit)
    return newState;
})









  const storage = getStorage();
  const nav = useNavigate() 

  function detect(idParam,f1, f2)
  {
    if(idParam === "NewProduct")
    {
    return f1
    }

    else
    {     

      return f2
    }

  }
  
  
  
    

 



  function handleInput(e) {
    const {value , name} = e.target
    setProduct({...product, [name]: value})
  }

async  function handleImage(e){
    const file = e.target.files[0]
    const storageRef = await ref(storage, `eStore/${Date.now()}_${file.name}`)
    
// Upload the file and metadata
const uploadTask = uploadBytesResumable(storageRef, file)
// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      setProduct({...product, imgURL: downloadURL})
      toast.success('images uploaded successfully');
    });
  }
);
};


 function addProdct(e) {
 

  e.preventDefault()
    try {
      // Add a new document with a generated id.
     addDoc(collection(db, "products"), {
    name: product.name,
    price: Number(product.price),
    description: product.description,
    category: product.category,
    imgURL: product.imgURL,
    created: JSON.stringify(Timestamp.now()),
      }

      )


          toast.success("Successfully added")
          setProduct(    {
...initialState    } 

)




  
          nav('/Admin/ViewProducts')
          
  
  }
  
  
  catch (error) {
toast.error(error.message)
  }


}



async function editProduct(e){
  e.preventDefault()
 try {
  // Add a new document in collection "cities"
await setDoc(doc(db, "products", idParam), {
  name: product.name,
  price: Number(product.price),
  description: product.description,
  category: product.category,
  imgURL: product.imgURL,
  created: productEdit.created,
  edited:  JSON.stringify(Timestamp.now())
  

});

nav("/Admin/ViewProducts")
 } catch (error) {
  
 }
}


  return (
    <div>
      <Sidebar/>

      <div className={`${addStyle.mainAdd} container card mt-5 text-center bg-light text-primary`}>
      <form  onSubmit={detect(idParam, addProdct, editProduct)}>

        <h2 className='my-4 bg-success text-white rounded w-50 m-auto'>{detect(idParam, "Add New Product", "Edit")}</h2>
        <input className='d-block w-50 m-auto mb-2' required type="text" name="name" value={product.name} onChange={(e) =>handleInput(e)} placeholder="Plant's name" />
        <input className='d-block w-50 m-auto mb-2' required type="text" name="price" value={product.price} onChange={(e) =>handleInput(e)} placeholder="Price"/>
        <input className='d-block w-50 m-auto mb-2' required type="text" name="description" value={product.description} onChange={(e) =>handleInput(e)}placeholder="Description" />
        <label   htmlFor="category">Choose a category:</label>
        <select className='d-block w-50 m-auto mb-2' required name="category" value={product.category} onChange={(e) => handleInput(e)}>
        <option value="OutDoor">OutDoor Plants</option>
        <option value="Indoor">Indoor Plants</option>
        <option value="Trees">Trees</option>
        <option value="Potsandothers">Pots and others</option>
        </select>
        <input className='d-block w-50 m-auto mb-2' required type="file" name="image" accept="image/*"   onChange={(e) => handleImage(e)}/>
        <input className='d-block w-50 m-auto mb-2' type="text" name="imgURL" value={product.imgURL} onChange={(e) => handleImage(e)}/>
        <button className={`${addStyle.button} mt-5 mb-5`} type="submit">{detect(idParam, "Add", "Edit")}</button>
        </form>

    </div></div>
  )
}
