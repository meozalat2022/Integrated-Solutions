
import { SELECTED_PRODUCT } from '../actions/selectedProduct';
const initialState={
    AvailableSelectedProduct: {}
}

export default (state = initialState, action)=>{
    switch(action.type){
        case SELECTED_PRODUCT:
            return{
                AvailableSelectedProduct: action.selectedProduct
            }
    }
    return state
}