import {
    REQUEST_BOARDS_FAILURE,
    REQUEST_BOARDS_SUCCESS,
    BOARD_CREATION_SUCCESS,
    BOARD_CREATION_FAILURE,
    LIST_CREATION_FAILURE,
    LIST_CREATION_SUCCESS,
    CARD_CREATION_SUCCESS,
    CARD_CREATION_FAILURE,
    CARD_TOGGLE_SUCCESS
}
from '../actions/boardsActions';

const INITIAL_STATE = {
    error: null,
    data: []
};

export default function boardsReducer(state = INITIAL_STATE, action) {
    let board, boardIndex, boardList, listCards, listWithCardIndex, cardIndex, cardId;
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
        case LIST_CREATION_SUCCESS:
            boardIndex = state.data.findIndex((board) => {
                return board.id == action.data.board_id;
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
            console.log("boardIndex", boardIndex);
            console.log("Index of list within board", listWithCardIndex);
            board = {
                ...state.data[boardIndex]
            };
            boardList = {
                ...board.Lists[listWithCardIndex]
            };
            listCards = [
                ...boardList.Cards
            ];
            cardIndex = listCards.findIndex((card) => {
                return card.id == action.data.id;
            });
            let card = {
                ...listCards[cardIndex],
                completed: !card.completed
            };
            listCards = [
                ...boardList.Cards.slice(0, cardIndex),
                card,
                ...boardList.Cards.slice(cardIndex + 1)
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
        case CARD_TOGGLE_SUCCESS:
            cardId = action.data;
            boardIndex = state.data.findIndex((board) => {
                listWithCardIndex = board.Lists.findIndex((list) => {
                    cardIndex = list.Cards.findIndex((card) => {
                        return action.data == card.id;
                    });
                    
                    return cardIndex > -1;
                });
                return listWithCardIndex > -1;
            });
            board = {
                ...state.data[boardIndex]
            };
            boardList = {
                ...board.Lists[listWithCardIndex]
            };
            let listCards = {
                ...boardList.Cards[cardIndex],
                completed: !boardList.Cards[cardIndex].completed
            };
            let cardsOfList = [
                ...boardList.Cards.slice(0, cardIndex),
                listCards,
                ...boardList.Cards.slice(cardIndex + 1)
            ];
            boardList = {
                ...boardList,
                Cards: cardsOfList
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
