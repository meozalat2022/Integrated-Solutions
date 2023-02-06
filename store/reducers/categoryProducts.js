import { SET_CATEGORYPRODUCTS } from "../actions/categoryProducts";
const initialState = {
    availableCategoryProducts: []
};

export default (state = initialState, action)=>{
    switch (action.type){
        case SET_CATEGORYPRODUCTS:
            return{
                availableCategoryProducts: action.categoryProduct
            }
    }
    return state
};