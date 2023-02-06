export const SET_BRAND = 'SET_BRAND';
import {collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../config';


export const fetchBrands = ()=>{
    return async dispatch =>{
        try {
            const brandCollection = collection(db, "Brand");
            const getBrands = getDocs(brandCollection);
            const brands = (await getBrands).docs.map(item=>{
                const data = item.data()
                data.id = item.id
                return data
            })
            dispatch({type: SET_BRAND, brand: brands})
            
        } catch (error) {
            console.log("Error", error)
        }
    }
}