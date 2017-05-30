//action creators
import deepFreeze from 'deep-freeze';

import { SUBMIT_BOARD_CREATION_REQUEST, BOARD_CREATION_SUCCESS, requestBoardCreation } from '../actions/submitNewBoardsActions';
import submitNewBoardReducer from '../reducers/submitNewBoardReducer';
it("adds one new board data from server", function() {
    const initialState = {
        success: null,
        error: null,
        isRequesting: true
    };
    const action = {
        type: BOARD_CREATION_SUCCESS
    };
    const finalState = {
        success: true,
        isRequesting: false,
        error: null
    };
    deepFreeze(initialState);
    deepFreeze(action);
    expect(submitNewBoardReducer(initialState, action)).toEqual(finalState);
})
it("sends request to add new board to the server database", function() {
    const initialState = {
        success: null,
        error: null,
        isRequesting: false
    };
    const action = {
        type: SUBMIT_BOARD_CREATION_REQUEST
    };
    const finalState = {
        success: null,
        isRequesting: true,
        error: null
    };
    deepFreeze(initialState);
    deepFreeze(action);
    expect(submitNewBoardReducer(initialState, action)).toEqual(finalState);
})

