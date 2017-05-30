import deepFreeze from 'deep-freeze';

import {FETCH_USERS_SUCCESS} from '../actions/usersActions';
import usersReducer from '../reducers/usersReducer';

it("populates the users on the store", function(){
    const initialState = {
        data: []
    }
    const action = {
        type: FETCH_USERS_SUCCESS,
        data: [
            {
                id: 1,
                username: "JohnBoy"
            },
            {
                id: 2,
                username: "BuddyBoy"
            }
        ]
    }
    const finalState = {
        data: [
            {
                id: 1,
                username: "JohnBoy"
            },
            {
                id: 2,
                username: "BuddyBoy"
            }
        ]
    }
    deepFreeze(initialState);
    deepFreeze(action);
    
    
    expect(usersReducer(initialState, action)).toEqual(finalState);
})