import { REQUEST_BOARDS_FAILURE, REQUEST_BOARDS_SUCCESS, BOARD_CREATION_SUCCESS, BOARD_CREATION_FAILURE, LIST_CREATION_FAILURE, LIST_CREATION_SUCCESS, CARD_CREATION_SUCCESS, CARD_CREATION_FAILURE } from '../actions/boardsActions';

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
        case LIST_CREATION_SUCCESS:
            let boardIndex = state.data.findIndex((board) => {
                return board.id == action.data.board_id;
            });
            let board = {
                ...state.data[boardIndex]
            };
            let boardList = [
                ...board.Lists,
                action.data
            ];
            board = {
                ...board,
                Lists: boardList
            };
            return {
                ...state,
                data: [
                    ...state.data.slice(0, boardIndex),
                    board,
                    ...state.data.slice(boardIndex + 1)
                ]
            };
        case LIST_CREATION_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case CARD_CREATION_SUCCESS:
            console.log("successful card creation");
            // let boardIndex = state.data.findIndex((board) => {
            //     return board.id == action.data.board_id;
            // });
            // let board = {
            //     ...state.data[boardIndex]
            // };
            // let boardList = [
            //     ...board.Lists,
            //     action.data
            // ];
            // board = {
            //     ...board,
            //     Lists: boardList
            // };
            // return {
            //     ...state,
            //     data: [
            //         ...state.data.slice(0, boardIndex),
            //         board,
            //         ...state.data.slice(boardIndex + 1)
            //     ]
            // };
            return {
                ...state
            };
        case CARD_CREATION_FAILURE:
            console.log("card creation failure");
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}