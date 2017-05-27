import boardsReducer from '../reducers/boardsReducer';
import deepFreeze from 'deep-freeze';
import { CARD_TOGGLE_SUCCESS } from '../actions/boardsActions';

it('toggles the card at an id', function() {
    const initialState = {
        error:null,
        data: [{
            Lists: [{
                id: 1,
                Cards: [{
                    id: 1,
                    completed: true
                }]
            }],
            id: 1
        }]
    };
    const action = {
        type: CARD_TOGGLE_SUCCESS,
        data: 1
    };
    const finalState = {
        error:null,
        data: [{
            Lists: [{
                id: 1,
                Cards: [{
                    id: 1,
                    completed: false
                }]
            }],
            id: 1
        }]
    };
    deepFreeze(initialState);
    deepFreeze(finalState);
    
    expect(boardsReducer(initialState, action)).toEqual(finalState)
})