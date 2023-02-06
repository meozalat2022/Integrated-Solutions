import { FETCH_USER, SIGNOUT, USERSESSION} from '../actions/authUser'

const initialState = {
    currentUser: null,
    authuserId: null
}

export default(state = initialState, action)=>{
    switch(action.type){
        case FETCH_USER:
            return{
                ...state,
                currentUser: action.authUser,
            }
        case USERSESSION:
            return{
                authuserId: action.authuserID
            }
        case SIGNOUT:
            return {
                currentUser: null,
                authuserId: null
            }
    }
    return state;
} 