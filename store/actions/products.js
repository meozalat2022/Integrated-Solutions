export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_PROMOTIONPRODUCTS = 'SET_PROMOTIONPRODUCTS';
export const GET_BRAND_PRODUCTS = 'GET_BRAND_PRODUCTS';

import {collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../config';

export const fetchProducts = ()=>{
    return async dispatch =>{
        try {
            const productCollection = query(collection(db, "Product"));
            const getProducts = getDocs(productCollection);
            const products = (await getProducts).docs.map((item)=>{
                const data = item.data();
                data.id = item.id
                return data;
            })
            dispatch({type: SET_PRODUCTS, product: products})
            
        } catch (error) {
            console.log("Error", error)
        }

    }
}








