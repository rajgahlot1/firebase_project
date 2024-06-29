import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useFirebase } from '../context/firebase'
const ListingPage = (e) => {
    const firebase= useFirebase();
  const [name,setname]= useState('')
  const [bnNumber, setbnNumber]= useState('')
const [price,setprice]= useState('');
const [coverPic,setcoverPic]= useState('');
const handleSubmit= async(e)=>{
    e.preventDefault();

    await firebase.handleCreateNewListing(name,bnNumber,price,coverPic)
}    
return (
    <div> <h1>Book</h1> 
    <form onSubmit={handleSubmit}>
           <input
             value={name}
             onChange={(e) => setname(e.target.value)}
             placeholder="ENTER BOOK name"
             type="name"
           />
           <input
             value={bnNumber}
             onChange={(e) => setbnNumber(e.target.value)}
             placeholder="ISBN number"
             type="text"
           />
           <input
             value={price}
             onChange={(e) => setprice(e.target.value)}
             placeholder="PRICE"
             type="text"
           />
           <input
            //  value={coverPic}
             onChange={(e) => setcoverPic(e.target.files[0])}
             placeholder=""
             type="file"
           />

<Button type="Submit" variant="danger" >creater</Button>

         </form>
       </div>
  )
}

export default ListingPage