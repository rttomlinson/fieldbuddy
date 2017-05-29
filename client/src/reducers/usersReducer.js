import { FETCH_USERS_SUCCESS } from '../actions/usersActions';

const INITIAL_STATE = {
    data: []
};

export default function usersReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
}