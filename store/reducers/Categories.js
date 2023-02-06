import { SET_CATEGORIES } from "../actions/Categories";

const initialState = {
    availableCategory: []
};

export default (state = initialState, action)=>{
    switch(action.type){
        case SET_CATEGORIES:
            return{
                availableCategory: action.category
            }
    }
    return state
};
