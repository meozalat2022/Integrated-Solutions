export const FETCH_USER = 'FETCH_USER';
export const SIGNOUT = "SIGNOUT";
export const USERSESSION = "USERSESSION";

import {collection, doc, getDoc, onSnapshot , where } from "firebase/firestore";
import { db } from '../../config';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export const fetchAuthUser = (userId)=>{
  try {
    const id = userId
    return async dispatch=>{
        const userDoc = onSnapshot (doc(db, "User", userId), (doc)=>{
            const userData = doc.data()
            dispatch({type: FETCH_USER, authUser: userData})
        })
    }
    
  } catch (error) {
    console.log("Error", error)
  }
}

export const authUserSignOut = ()=>{
    return dispatch=>{
        signOut(auth).then(() => {
            dispatch({type: SIGNOUT})
            console.log("user signed out")
          }).catch((error) => {
            // An error happened.
          });
    }
}

export const userLoggedInSession = ()=>{
    return dispatch=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              dispatch({type: USERSESSION, authuserID: uid})
              console.log("session user",user)
              // ...
            } else {
              // User is signed out
              // ...
            }
          });
    }
}


