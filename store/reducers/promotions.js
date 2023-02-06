import { SET_PROMOTIONPRODUCTS } from "../actions/promotions";
const initialState = {
    promotionProducts: [],
};

export default (state = initialState, action)=>{
    switch (action.type){
       
        case SET_PROMOTIONPRODUCTS:
            return {
                promotionProducts: action.promotion
            }
    }
    return state
};


