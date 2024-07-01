import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { useFirebase } from '../context/firebase';

const Details = () => {
const params= useParams();
const firebase= useFirebase()
const [ data,setdata]= useState(null)
const [qty, setqty]= useState(1)
const [url,setURL]= useState(null)
useEffect(()=>{
firebase.getBookById(params.bookId).then((value)=>setdata(value.data()))
},[])
useEffect(() => {
  if (data && data.imageURL) {
    firebase.getImageURL(data.imageURL).then((url) => setURL(url));
  }
}, [data, firebase]);
const placeOrder= async()=>{
  const result= await firebase.placeOrder(params.bookId, qty)
console.log('order placed', result);
// return result
}
if(data===null) return <h1>Loading</h1>
    return (
    <div>Details
      <h2>{data.name}</h2>
      <h4>{data.price}</h4>
<h4>{data.displayName}</h4>
<p>{data.userEmail}</p>
      <img src={url} alt="" />
      <form action=""><input value={qty} onChange={(e)=>setqty(e.target.value)} type="number" /></form>
    <button onClick={placeOrder}>Buy Now</button>
    </div>
  )
}
export default Details