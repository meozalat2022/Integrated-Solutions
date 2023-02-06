export const ADD_ORDER = 'ADD_ORDER';
import { doc, addDoc } from "firebase/firestore";
import { db } from '../../config';

export const addOrder = (cartItems, totalAmount, userId)=>{
    return async dispatch=>{
        try {
            const orderCollection = doc(db, "Order")
            const response = await addDoc(orderCollection, {
                total: totalAmount,
                userId: userId,
                products: {productId: cartItems.productId, 
                            price: cartItems.productPrice, 
                            title: cartItems.productTitle, 
                            quantity: cartItems.quantity
                        }
            })
            dispatch({type: ADD_ORDER, order: {}})
            
        } catch (error) {
            console.log("Error", error)
        }
    }

};























