export const SET_PROMOTIONPRODUCTS = 'SET_PROMOTIONPRODUCTS';

import {collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../config';



export const fetchPromotionProducts = ()=>{
    return async dispatch =>{
        try {
            const promotionCollction = query(collection(db, "Product"), where("promotionRate", ">", 0));
            const getPromotionProducts = getDocs(promotionCollction);
            const promotionProducts = (await getPromotionProducts).docs.map((item)=>{
                const data = item.data();
                data.id = item.id;
                return data
            })
            dispatch({type: SET_PROMOTIONPRODUCTS, promotion: promotionProducts})
            
        } catch (error) {
            console.log("Error", error)
        }

    }
}