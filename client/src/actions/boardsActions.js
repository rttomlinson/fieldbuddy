export const REQUEST_BOARDS = "REQUEST_BOARDS";
export const REQUEST_BOARDS_SUCCESS = "REQUEST_BOARDS_SUCCESS";
export const REQUEST_BOARDS_FAILURE = "REQUEST_BOARDS_FAILURE";

export const ADD_ONE_BOARD = "ADD_ONE_BOARD";

export function addOneBoard(data) {
    return {
        type: ADD_ONE_BOARD,
        data
    };
}

export function requestBoardsSuccess(data) {
    return {
        type: REQUEST_BOARDS_SUCCESS,
        data
    };
}

export function requestBoardsFailure(error) {
    return {
        type: REQUEST_BOARDS_FAILURE,
        error
    };
}

export function requestBoards() {
    return {
        type: REQUEST_BOARDS
    };
}


export function boardsFetchCall(onSuccess, onFailure, typeOfPromise, ...args) {
    // console.log("typeof native promise", Promise.reject);
    // console.log("typeof passed promise", typeOfPromise);
    // console.log("are they equal?", Promise.reject === typeOfPromise);

    //Cannot call promise directly from variable
    //But able to assign it then call
    //This returns error: TypeError: function resolve() { [native code] } called on non-object
    //at reject (native)
    //Promise.reject = typeOfPromise;
    // return Promise.resolve(...args)
    return typeOfPromise(...args)
        .then((response) => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        })
        .then((json) => {
            console.log("json", json);
            onSuccess(json);
            //dispatch to update the state with new board
        })
        .catch((err) => {
            console.log("dispatch auth error", err, err.status, err.statusText);
            onFailure(err);
        });
}



export function fetchBoardsCreator(fnFetch, fnSuccess, fnError, fnPromiseCreator, typeOfPromise) {
    return () => {
        return (dispatch) => {
            //call fnFetch to kick it off
            dispatch(fnFetch());
            let newfnSuccess = (data) => {
                dispatch(fnSuccess(data));
            };
            let newfnError = (error) => {
                dispatch(fnError(error));
            };
            const apiEndpoint = '/api/boards/';
            const token = localStorage.getItem('token');
            const apiWithToken = `${apiEndpoint}?token=${token}`;
            return fnPromiseCreator(newfnSuccess, newfnError, typeOfPromise, apiWithToken);
        };
    };
}

const fetchBoards = fetchBoardsCreator(requestBoards, requestBoardsSuccess, requestBoardsFailure, boardsFetchCall, fetch);

export default fetchBoards;
