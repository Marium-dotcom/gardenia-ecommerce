import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { db } from '../Firebase/config';


const useFetchDetails = (collectionName, detailID) => {

    const [details, setDetails] = useState()


    async function getDetails(){
    const docRef = doc(db, collectionName, detailID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());

    let object = { 
    id: detailID,
    ...docSnap.data()
    }
    setDetails(object)

    } 

    
    
    else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }}

    useEffect(() => {
      
    getDetails()

    }, [])
    

  return (
{details}    )
}

export default useFetchDetails