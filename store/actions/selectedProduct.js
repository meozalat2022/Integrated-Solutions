export const SELECTED_PRODUCT = "SELECTED_PRODUCT";

import { collection, getDocs, getDoc , query, where, doc } from 'firebase/firestore'
import { db } from '../../config';





export const fetchSelectedProduct = (itemId)=>{
    return async dispatch=>{
        try {
            const productCollction = doc(db, "Product", itemId)
            const getProduct = await getDoc(productCollction).then((doc)=>{
                const data = doc.data()
                data.id = doc.id
                return data 
            })
            dispatch({type: SELECTED_PRODUCT, selectedProduct: getProduct})
            
        } catch (error) {
            console.log("Error", error)
        }
    }
}




