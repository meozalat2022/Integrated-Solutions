export const SET_CATEGORIES = "SET_CATEGORIES";
import {collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../config';

export const fetchCategories = ()=>{
    return async dispatch =>{
        try {
            const categoryCollection = collection(db, "Category");
            const getCategories = getDocs(categoryCollection);
            const categories = (await getCategories).docs.map(item=>{
                const data = item.data();
                data.id = item.id
                return data;
            })
            dispatch({type: SET_CATEGORIES, category: categories})
            
        } catch (error) {
            console.log("Error", error)
        }
    }
}




