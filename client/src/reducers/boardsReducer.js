import { REQUEST_BOARDS, REQUEST_BOARDS_SUCCESS, ADD_ONE_BOARD } from '../actions/boardsActions';

const INITIAL_STATE = {
    error: null,
    isFetching: false,
    data: []
};

export default function boardsReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case REQUEST_BOARDS:
            return {
                ...state,
                error: null,
                isFetching: true
            };
        case REQUEST_BOARDS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data
            };
        case ADD_ONE_BOARD:
            return {
                ...state,
                data: [
                    ...state.data,
                    action.data
                ]
            };
        default:
            return state;
    }
}