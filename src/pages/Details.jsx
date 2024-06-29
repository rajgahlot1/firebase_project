import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { useFirebase } from '../context/firebase';

const Details = () => {
const params= useParams();
const firebase= useFirebase()
const [ data,setdata]= useState(null)
const [url,setURL]= useState(null)
useEffect(()=>{
firebase.getBookById(params.bookId).then((value)=>setdata(value.data()))
},[])
useEffect(()=>{
  if(data){ const imageURL= data.imageURL
    firebase.getImageURL(imageURL).then((url)=> setURL(url))
  }
},[data])
if(data===null) return <h1>Loading</h1>
    return (
    <div>Details
      <h2>{data.name}</h2>
      <h4>{data.price}</h4>
<h4>{data.displayName}</h4>
<p>{data.userEmail}</p>
      <img src={url} alt="" />
    <button >Buy Now</button>
    </div>
  )
}

export default Details