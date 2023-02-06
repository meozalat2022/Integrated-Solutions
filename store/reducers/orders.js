import Order from "../../model/Order";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
    orders: []
};

export default (state = initialState, action)=>{
    switch (action.type){
        case ADD_ORDER:
           return{
            orders: action.order
           }
    }
    return state
};



