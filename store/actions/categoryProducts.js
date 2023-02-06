export const SET_CATEGORYPRODUCTS = "SET_CATEGORYPRODUCTS";

import {collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../config';


export const fetchCategoryProducts = (catId)=>{
    
    return async dispatch=>{
        try {
            const categoryProductsCollection = query(collection(db, "Product"), where("categories", "array-contains", catId))
            const getCategoryProducts = getDocs(categoryProductsCollection);
            const categoryProducts = (await getCategoryProducts).docs.map(item=>{
                const data = item.data();
                data.id = item.id;
                return data
            })
            dispatch({type: SET_CATEGORYPRODUCTS, categoryProduct: categoryProducts})
            
        } catch (error) {
            console.log("Error", error)
        }
    }
}