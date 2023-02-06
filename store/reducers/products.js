import { SET_PRODUCTS, SET_PROMOTIONPRODUCTS, SET_CATEGORYPRODUCTS } from "../actions/products";
const initialState = {
    availableProducts: [],
    promotionProducts: [],
    availableCategoryProducts: []
};

export default (state = initialState, action)=>{
    switch (action.type){
        case SET_PRODUCTS:
            return{
                availableProducts: action.product
            }
        case SET_PROMOTIONPRODUCTS:
            return {
                promotionProducts: action.promotion
            }
        case SET_CATEGORYPRODUCTS:
            return{
                availableCategoryProducts: action.categoryProduct
            }
    }
    return state
};


