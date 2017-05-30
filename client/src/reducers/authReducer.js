import { AUTH_USER, AUTH_REQUEST, UNAUTH_USER } from '../actions/authActions';

const INITIAL_STATE = {
    isAuth: false,
    error: null,
    isFetching: false
};

export default function authReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case AUTH_REQUEST:
            return {
                ...state,
                error: null,
                isFetching: true
            };
        case AUTH_USER:
            return {
                ...state,
                isAuth: true,
                isFetching: false
            };
        case UNAUTH_USER:
            return {
                ...state,
                isAuth: false
            };
        default:
            return state;
    }
}