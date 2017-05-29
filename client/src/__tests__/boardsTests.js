//action creators
import deepFreeze from 'deep-freeze';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import boardsReducer from '../reducers/boardsReducer';

import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


import {
    REQUEST_BOARDS,
    REQUEST_BOARDS_SUCCESS,
    BOARD_CREATION_SUCCESS,
    BOARD_REMOVAL_SUCCESS,
    UPDATE_CARD_SUCCESS,
    fetchBoardsCreator,
    boardsFetchCall,
    requestBoards
}
from '../actions/boardsActions';
xit("requests board data", function() {
    const initialState = {
        data: [],
        error: null,
        isFetching: false
    };
    const action = {
        type: REQUEST_BOARDS
    };
    const finalState = {
        data: [],
        isFetching: true,
        error: null
    };
    deepFreeze(initialState);
    deepFreeze(action);
    expect(boardsReducer(initialState, action)).toEqual(finalState);
})
it("adds all board data from server", function() {
    const initialState = {
        data: [],
        error: null,
    };
    const action = {
        type: REQUEST_BOARDS_SUCCESS,
        data: ["b1", "b2"]
    };
    const finalState = {
        data: ["b1", "b2"],
        error: null
    };
    deepFreeze(initialState);
    deepFreeze(action);
    expect(boardsReducer(initialState, action)).toEqual(finalState);
})
it("add a new board to the list", function() {
    const initialState = {
        data: [],
        error: null,
    };
    const action = {
        type: BOARD_CREATION_SUCCESS,
        data: {
            name: "board1"
        }
    };
    const finalState = {
        data: [{
            name: "board1"
        }],
        error: null
    };
    deepFreeze(initialState);
    deepFreeze(action);
    expect(boardsReducer(initialState, action)).toEqual(finalState);
});
it("removes a board from the data by board id", function() {
    const initialState = {
        data: [{
            id: 1,
            name: "board1"
        },
        {
            id: 2,
            name: "board2"
        }],
        error: null,
    };
    const action = {
        type: BOARD_REMOVAL_SUCCESS,
        data: 1
    };
    const finalState = {
        data: [{
            id: 2,
            name: "board2"
        }],
        error: null
    };
    deepFreeze(initialState);
    deepFreeze(action);
    expect(boardsReducer(initialState, action)).toEqual(finalState);
});







//HOW NOT TO WRITE TESTS FOR REDUCERS
// xdescribe("fetchBoards", function() {
//     let spyOne;
//     let spyTwo;
//     let spyThree;
//     let fetchBoards;
//     beforeEach(() => {
//         spyOne = jest.fn();
//         spyTwo = jest.fn();
//         spyThree = jest.fn();
//     });
//     it("calls spyOne", function() {
//         fetchBoards = fetchBoardsCreator(spyOne, spyTwo, spyThree, boardsFetchCall, Promise.resolve);
//         console.log("fetchboards function", typeof fetchBoards());
//         const store = mockStore({
//             boards: {}
//         });
//         return store.dispatch(fetchBoards("hello"))
//             .then((response) => {
                
//                 console.log("promise handled", store.getActions());
//                 expect(spyOne.mock.calls.length).toBe(1);
//             })
//             // .catch((error) => {
//             //     console.log("failure returned");
//             //     done();
//             // })
//     })
//     xit("calls spyTwo with successful resolve", function(done) {
//         fetchBoards = fetchBoardsCreator(spyOne, spyTwo, spyThree, boardsFetchCall, Promise.resolve);
//         store.dispatch(fetchBoards("hello"))
//             .then((response) => {
//                 console.log("promise handled");
//                 expect(spyTwo.mock.calls.length).toBe(1);
//                 done();
//             })
//             .catch((error) => {
//                 console.log("failure returned");
//                 done();
//             })
//     })
//     xit("calls spyThree with rejection", function(done) {
//         fetchBoards = fetchBoardsCreator(spyOne, spyTwo, spyThree, boardsFetchCall, Promise.reject);
//         store.dispatch(fetchBoards("hello"))
//             .then((response) => {
//                 console.log("promise handled");
//                 expect(spyThree.mock.calls.length).toBe(1);
//                 done();
//             })
//             .catch((error) => {
//                 console.log("failure returned");
//                 done();
//             })
//     })
// })
