import boardsReducer from '../reducers/boardsReducer';
import deepFreeze from 'deep-freeze';
import { CARD_TOGGLE_SUCCESS, CARD_CREATION_SUCCESS, CARD_UPDATE_SUCCESS } from '../actions/boardsActions';
it('adds a new card to the cards arrays of a list', function(){
    const initialState = {
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
    const action = {
        type: CARD_CREATION_SUCCESS,
        data: {
            id: 2,
            list_id: 1,
            completed: false
        }
    };
    const finalState = {
        error:null,
        data: [{
            Lists: [
                {
                    id: 1,
                    Cards: [
                        {
                            id: 1,
                            completed: false
                        },
                        {
                            id: 2,
                            list_id: 1,
                            completed: false
                        }
                    ]
                }
            ],
            id: 1
        }]
    };
    deepFreeze(initialState);
    deepFreeze(action);
    
    expect(boardsReducer(initialState, action)).toEqual(finalState)
})
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
        type: CARD_UPDATE_SUCCESS,
        data: {
            id: 1,
            completed: false,
        }
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
    deepFreeze(action);
    
    expect(boardsReducer(initialState, action)).toEqual(finalState)
})
it("updates the card at a specified id", function(){
    const initialState = {
        error:null,
        data: [{
            Lists: [{
                id: 1,
                Cards: [{
                    id: 1,
                    completed: true,
                    description: "thisisbefore"
                }]
            }],
            id: 1
        }]
    };
    const action = {
        type: CARD_UPDATE_SUCCESS,
        data: {
            id: 1,
            completed: false,
            description: "thisisafter"
        }
    };
    const finalState = {
        error:null,
        data: [{
            Lists: [{
                id: 1,
                Cards: [{
                    id: 1,
                    completed: false,
                    description: "thisisafter"
                }]
            }],
            id: 1
        }]
    };
    deepFreeze(initialState);
    deepFreeze(action);
    
    expect(boardsReducer(initialState, action)).toEqual(finalState)
})