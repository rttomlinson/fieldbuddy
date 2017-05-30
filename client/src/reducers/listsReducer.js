import { REQUEST_LISTS_FAILURE, REQUEST_LISTS_SUCCESS, LIST_CREATION_SUCCESS, LIST_CREATION_FAILURE } from '../actions/listsActions';

const INITIAL_STATE = {
    error: null,
    data: []
};

export default function listsReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case REQUEST_LISTS_SUCCESS:
            return {
                ...state,
                data: action.data
            };
        case REQUEST_LISTS_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case LIST_CREATION_SUCCESS:
            return {
                ...state,
                data: [
                    ...state.data,
                    action.data
                ]
            };
        case LIST_CREATION_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}