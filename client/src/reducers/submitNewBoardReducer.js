import { SUBMIT_BOARD_CREATION_REQUEST, BOARD_CREATION_SUCCESS, BOARD_CREATION_FAILURE } from '../actions/submitNewBoardsActions';


const INITIAL_STATE = {
        success: null,
        error: null,
        isRequesting: false
};

export default function submitNewBoardReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case SUBMIT_BOARD_CREATION_REQUEST:
            return {
                ...state,
                error: null,
                success: null,
                isRequesting: true
            };
        case BOARD_CREATION_SUCCESS:
            return {
                ...state,
                success: true,
                isRequesting: false
            };
        case BOARD_CREATION_FAILURE:
            return {
                ...state,
                error: "Board not made",
                isRequesting: false
            };
        default:
            return state;
    }
}