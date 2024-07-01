import React, { useEffect } from 'react'
import { useFirebase } from '../context/firebase'

const ViewOrder = () => {
        const firebase= useFirebase()
        useEffect(()=>{
firebase.fetchMyOrders()?.then((books)=> console.log(books.docs))
    },[])
  return (
    <div>ViewOrder</div>
  )
}

export default ViewOrder