import BRAND from '../../data/brand';
import { SET_BRAND } from '../actions/Brands';
const initialState = {
    availableBrands : []
};

export default (state = initialState, action)=>{
    switch(action.type){
        case SET_BRAND:
            return{
                availableBrands: action.brand
            }
    }
    return state
}