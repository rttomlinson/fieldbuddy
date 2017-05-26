import { REQUEST_BOARDS_FAILURE, REQUEST_BOARDS_SUCCESS, BOARD_CREATION_SUCCESS, BOARD_CREATION_FAILURE } from '../actions/boardsActions';

const INITIAL_STATE = {
    error: null,
    data: []
};

export default function boardsReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case REQUEST_BOARDS_SUCCESS:
            return {
                ...state,
                data: action.data
            };
        case REQUEST_BOARDS_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case BOARD_CREATION_SUCCESS:
            return {
                ...state,
                data: [
                    ...state.data,
                    action.data
                ]
            };
        case BOARD_CREATION_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}