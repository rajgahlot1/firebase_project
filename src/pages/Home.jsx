import React, { useEffect, useState } from 'react'
import NavDropdownExample from './Navbar'
import { useFirebase } from '../context/firebase'
import BasicExample from './Card'
import { CardGroup } from 'react-bootstrap';

const Home = () => {
  const firebase= useFirebase();
  const [books,setbooks]= useState([]);  
  useEffect(()=>{
firebase.listAllBooks().then((books)=>setbooks(books.docs))
  },[])
  
    return (
    <div>
        <NavDropdownExample/>
<div>listBooks here</div>
<CardGroup>
    {books.map(book=><BasicExample key={book.id} id={book.id} {...book.data()}/>)}
    </CardGroup>
    </div>
  )
}

export default Home