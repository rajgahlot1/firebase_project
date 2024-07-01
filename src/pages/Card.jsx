import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';

function BasicExample(props) {
const firebase= useFirebase();
const navigate= useNavigate();

const [url,seturl]= useState(null)
useEffect(()=>{
firebase.getImageURL(props.imageURL).then((url) =>seturl(url))
},[])
    return (
        
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {props.displayName} build on {props.price} the card title and make up the
          bulk of the card's content
        </Card.Text>
        <Button onClick={e=>navigate(`/firebase_project/book/view/${props.id}`)} variant="primary">View</Button>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;