import {
    REQUEST_BOARDS_FAILURE,
    REQUEST_BOARDS_SUCCESS,
    BOARD_CREATION_SUCCESS,
    BOARD_CREATION_FAILURE,
    BOARD_REMOVAL_SUCCESS,
    LIST_CREATION_FAILURE,
    LIST_CREATION_SUCCESS,
    CARD_CREATION_SUCCESS,
    CARD_CREATION_FAILURE,
    CARD_UPDATE_SUCCESS,
    BOARDMEMBER_ADD_SUCCESS,
    BOARDMEMBER_REMOVE_SUCCESS
}
from '../actions/boardsActions';
import * as helpers from '../helpers';



const INITIAL_STATE = {
    error: null,
    data: []
};

export default function boardsReducer(state = INITIAL_STATE, action) {
    let board, boardIndex, boardList, listCards, listWithCardIndex, listIndex, cardIndex, cardId, Boards, boardMembers, boardMemberIndex;
    switch (action.type) {
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
        case BOARD_REMOVAL_SUCCESS:
            boardIndex = state.data.findIndex((board) => {
                return action.data == board.id;
            });
            
            //if board was not found, just return the current state
            if (boardIndex === -1) {
                return state;
            }
            
            return {
                ...state,
                data: [
                    ...state.data.slice(0, boardIndex),
                    ...state.data.slice(boardIndex + 1)
                ]
            };
        case LIST_CREATION_SUCCESS:
            boardIndex = state.data.findIndex((board) => {
                return board.id == action.data.boardId;
            });
            board = {
                ...state.data[boardIndex]
            };
            boardList = [
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

            boardIndex = state.data.findIndex((board) => {
                listWithCardIndex = board.Lists.findIndex((list) => {
                    return list.id == action.data.list_id;
                });
                return listWithCardIndex > -1;
            });
            board = {
                ...state.data[boardIndex]
            };
            boardList = {
                ...board.Lists[listWithCardIndex]
            };
            listCards = [
                ...boardList.Cards,
                action.data
            ];
            boardList = {
                ...boardList,
                Cards: listCards
            };

            board = {
                ...board,
                Lists: [
                    ...board.Lists.slice(0, listWithCardIndex),
                    boardList,
                    ...board.Lists.slice(listWithCardIndex + 1)
                ]
            };
            return {
                ...state,
                data: [
                    ...state.data.slice(0, boardIndex),
                    board,
                    ...state.data.slice(boardIndex + 1)
                ]
            };
        case CARD_UPDATE_SUCCESS:
            cardId = action.data.id;
            Boards = state.data;
            const cardPath = helpers.findCardPathById(cardId, Boards);
            [boardIndex, listIndex, cardIndex] = cardPath.split(':');
            //Cast each to numbers
            boardIndex = +boardIndex;
            listIndex = +listIndex;
            cardIndex = +cardIndex;
            let newCards = [
                ...Boards[boardIndex].Lists[listIndex].Cards.slice(0, cardIndex),
                action.data,
                ...Boards[boardIndex].Lists[listIndex].Cards.slice(cardIndex + 1)
            ];
            let newList = {
                ...Boards[boardIndex].Lists[listIndex],
                Cards: newCards
            };
            let newLists = [
                ...Boards[boardIndex].Lists.slice(0, listIndex),
                newList,
                ...Boards[boardIndex].Lists.slice(listIndex + 1)
            ];
            let newBoard = {
                ...Boards[boardIndex],
                Lists: newLists
            };
            let stateToReturn = {
                ...state,
                data: [
                    ...Boards.slice(0, boardIndex),
                    newBoard,
                    ...Boards.slice(boardIndex + 1)
                ]
            };
            console.log("state to be returned", stateToReturn);
            return stateToReturn;

        // case CARD_TOGGLE_SUCCESS:
        //     cardId = action.data;
        //     boardIndex = state.data.findIndex((board) => {
        //         listWithCardIndex = board.Lists.findIndex((list) => {
        //             cardIndex = list.Cards.findIndex((card) => {
        //                 return action.data == card.id;
        //             });
                    
        //             return cardIndex > -1;
        //         });
        //         return listWithCardIndex > -1;
        //     });
        //     board = {
        //         ...state.data[boardIndex]
        //     };
        //     boardList = {
        //         ...board.Lists[listWithCardIndex]
        //     };
        //     listCards = {
        //         ...boardList.Cards[cardIndex],
        //         completed: !boardList.Cards[cardIndex].completed
        //     };
        //     let cardsOfList = [
        //         ...boardList.Cards.slice(0, cardIndex),
        //         listCards,
        //         ...boardList.Cards.slice(cardIndex + 1)
        //     ];
        //     boardList = {
        //         ...boardList,
        //         Cards: cardsOfList
        //     };
        //     board = {
        //         ...board,
        //         Lists: [
        //             ...board.Lists.slice(0, listWithCardIndex),
        //             boardList,
        //             ...board.Lists.slice(listWithCardIndex + 1)
        //         ]
        //     };
        //     return {
        //         ...state,
        //         data: [
        //             ...state.data.slice(0, boardIndex),
        //             board,
        //             ...state.data.slice(boardIndex + 1)
        //         ]
        //     };
        case CARD_CREATION_FAILURE:
            console.log("card creation failure");
            return {
                ...state,
                error: action.error
            };
        case BOARDMEMBER_ADD_SUCCESS:
            console.log("adding new board member");
            Boards = state.data;
            boardIndex = state.data.findIndex((board) => {
                return board.id == action.data.boardId;
            });
            if (boardIndex === -1) {
                //should probably log an error?
                return state;
            }
            //create new boardmembers array
            boardMembers = [
                    ...Boards[boardIndex].Boardmembers,
                    action.data
            ];
            //create new board with new Boardmembers array
            board = {
                ...Boards[boardIndex],
                Boardmembers: boardMembers
            };
            //create new boards array with slice, order is not necessarily important at this time
            Boards = [
                ...Boards.slice(0, boardIndex),
                board,
                ...Boards.slice(boardIndex + 1)
            ];
            //replace the data prop with the new Boards array
            return {
                ...state,
                data: Boards
            };
         case BOARDMEMBER_REMOVE_SUCCESS:
            console.log("removing board member");
            Boards = state.data;
            boardIndex = state.data.findIndex((board) => {
                return board.id == action.data.boardId;
            });
            if (boardIndex === -1) {
                
                //should probably log an error?
                //board of this id does not exist
                return state;
            }
            boardMemberIndex = Boards[boardIndex].Boardmembers.findIndex((boardMember) => {
                return boardMember.memberId == action.data.memberId;
            });
            if (boardMemberIndex === -1) {
                //should probably log an error?
                //boardMember does not exist at this board
                return state;
            }
            //create new boardmembers array
            boardMembers = [
                    ...Boards[boardIndex].Boardmembers.slice(0, boardMemberIndex),
                    ...Boards[boardIndex].Boardmembers.slice(boardMemberIndex + 1)
            ];
            //create new board with new Boardmembers array
            board = {
                ...Boards[boardIndex],
                Boardmembers: boardMembers
            };
            //create new boards array with slice, order is not necessarily important at this time
            Boards = [
                ...Boards.slice(0, boardIndex),
                board,
                ...Boards.slice(boardIndex + 1)
            ];
            //replace the data prop with the new Boards array
            return {
                ...state,
                data: Boards
            };   
        default:
            return state;
    }
}
