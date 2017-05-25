//action creators
import deepFreeze from 'deep-freeze';


import {
    AUTH_USER,
    AUTH_REQUEST,
    UNAUTH_USER,
    authorizeUser
}
from '../actions/authActions';
import authReducer from '../reducers/authReducer';
it("auths user", () => {
    const initialState = {
        isAuth: false,
        error: null,
        isFetching: true
    };
    const action = {
        type: AUTH_USER
    };
    const finalState = {
        isAuth: true,
        isFetching: false,
        error: null
    };
    deepFreeze(initialState);
    deepFreeze(action);
    expect(authReducer(initialState, action)).toEqual(finalState);
});
it("unauths user", () => {
    const initialState = {
        isAuth: true,
        error: null,
        isFetching: false,
        token: "hello"
    };
    const action = {
        type: UNAUTH_USER,
    };
    const finalState = {
        isAuth: false,
        isFetching: false,
        error: null,
        token: null
    };
    deepFreeze(initialState);
    deepFreeze(action);
    expect(authReducer(initialState, action)).toEqual(finalState);
});
it("requests user auth", () => {
    const initialState = {
        isAuth: false,
        error: null,
        isFetching: false
    };
    const action = {
        type: AUTH_REQUEST
    };
    const finalState = {
        isAuth: false,
        isFetching: true,
        error: null
    };
    deepFreeze(initialState);
    deepFreeze(action);
    expect(authReducer(initialState, action)).toEqual(finalState);
});
it("create an authorize user action", function() {
    const action = {
        type: AUTH_USER
    };
    expect(authorizeUser()).toEqual(action);
});