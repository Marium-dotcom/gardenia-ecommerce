import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import  { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../Firebase/config'

const useFetchCustom = (collectionName) => {

  const [displayDatabase, setdisplayDatabase] = useState([])


      
  async function getData() {
      try {
        //access the db
        const dataRef =  collection(db, collectionName)
          //choose how to display it (by date)
        const q = query(dataRef, orderBy("created","desc"))
        
  
        // monitor query
        onSnapshot(q  ,(snap) => {
        
        //catch the whole docs by mapping to display em
        const customData = snap.docs.map((doc)=>({
          //generated id
          id: doc.id,
          //copy
          ...doc.data()
          
        
        }))
        
        //item
  
        setdisplayDatabase(customData)
        
     
  
        });
  
  
  }
  
      
       catch (error) {
        toast.error(error.message)
      }
  }
  

    useEffect(() => {
      getData() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ ])

    return {displayDatabase}

  
}

export default useFetchCustom
