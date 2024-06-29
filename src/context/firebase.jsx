// import { getAuth } from "firebase/auth";
// import { createContext, useContext } from "react";
// import { initializeApp } from "firebase/app";
// import { createUserWithEmailAndPassword } from "firebase/auth";

// const FirebaseContext= createContext(null);
// const firebaseConfig = {
//   apiKey: "AIzaSyCC5_BXFBbJyYBinClVrhcd3h3o746tzas",
//   authDomain: "bookify-8a6a4.firebaseapp.com",
//   projectId: "bookify-8a6a4",
//   storageBucket: "bookify-8a6a4.appspot.com",
//   messagingSenderId: "610823513912",
//   appId: "1:610823513912:web:278dbec1c9958df3a603cd"
// };

// // Initialize Firebase
// export const firebaseApp = initializeApp(firebaseConfig);
// const firebaseAuth = getAuth(firebaseApp)
//  const useFirebase=()=> useContext(FirebaseContext)
//  const FirebaseProvider= (props)=>{
//     const signupUserWithEmailAndPassword= (email,password)=>{
//         createUserWithEmailAndPassword(firebaseAuth, email, password)
//     }
//     return <FirebaseContext.Provider>{props.children}</FirebaseContext.Provider>
// }
// export {FirebaseProvider, useFirebase}
import { createContext, useContext, useEffect, useState } from "react";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCC5_BXFBbJyYBinClVrhcd3h3o746tzas",
  authDomain: "bookify-8a6a4.firebaseapp.com",
  projectId: "bookify-8a6a4",
  storageBucket: "bookify-8a6a4.appspot.com",
  messagingSenderId: "610823513912",
  appId: "1:610823513912:web:278dbec1c9958df3a603cd",
};
export const useFirebase = () => useContext(FirebaseContext);
export const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleprovider = new GoogleAuthProvider();
const FirebaseContext = createContext(null);
const firestore= getFirestore(firebaseApp);
const storage= getStorage(firebaseApp)
const FirebaseProvider = (props) => {
const [user, setuser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setuser(user);
      else setuser(null);
    });
  }, []);
  const signupUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      console.log(userCredential);
      // handle userCredential, e.g., userCredential.user
    } catch (error) {
      console.error("Error signing up with email and password", error);
    }
  };
  const signinUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      console.log(userCredential);
      // handle userCredential, e.g., userCredential.user
    } catch (error) {
      console.error("Error signing up with email and password", error);
    }
  };
  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleprovider);
console.log(user)
  const handleCreateNewListing= async (name ,isbn ,price ,cover)=>{
  const imageRef= ref(storage, `uploads/images/${Date.now()}-${cover.name}`)
  const uploadres = await uploadBytes(imageRef, cover)
await addDoc(collection(firestore, 'books'),{
  name, isbn, price, imageURL: uploadres.ref.fullPath, userId: user.uid, userEmail: user.email, displayname: user.displayName, photoURL: user.photoURL
})
}
const listAllBooks= async()=>{
  return await getDocs(collection(firestore, 'books')) 
}
const getBookById=async (id)=> {
  const docRef= doc(firestore  ,'books', id)
const result= await getDoc(docRef)
return result;
}
const getImageURL= (path)=>{
  return getDownloadURL(ref(storage, path))
}
  const isLoggedIn = user ? true : false;
  return (
    <FirebaseContext.Provider
      value={{
        isLoggedIn,
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        listAllBooks,
        handleCreateNewListing,
        getImageURL,
        getBookById
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseProvider };
