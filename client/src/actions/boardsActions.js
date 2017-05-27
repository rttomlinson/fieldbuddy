export const REQUEST_BOARDS_SUCCESS = "REQUEST_BOARDS_SUCCESS";
export const REQUEST_BOARDS_FAILURE = "REQUEST_BOARDS_FAILURE";

export const BOARD_CREATION_SUCCESS = "BOARD_CREATION_SUCCESS";
export const BOARD_CREATION_FAILURE = "BOARD_CREATION_FAILURE";

export function boardCreationSuccess(data) {
    return {
        type: BOARD_CREATION_SUCCESS,
        data
    };
}
export function boardCreationFailure(error) {
    return {
        type: BOARD_CREATION_FAILURE,
        error
    };
}

export function requestBoardCreation(form) {
    return (dispatch) => {

        const token = localStorage.getItem("token");
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
        });

        const _options = {
            headers: myHeaders,
            method: 'post',
            body: JSON.stringify(form)
        }
        return fetch(`/api/boards/new?token=${token}`, _options)
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then((json) => {
                console.log("board creation success json");
                dispatch(boardCreationSuccess(json.board));
            })
            .catch((err) => {
                console.log("dispatch boards creation error", err);
                dispatch(boardCreationFailure(err));
            });

    };
}


export const LIST_CREATION_SUCCESS = "LIST_CREATION_SUCCESS";
export const LIST_CREATION_FAILURE = "LIST_CREATION_FAILURE";

export function listCreationSuccess(data) {
    return {
        type: LIST_CREATION_SUCCESS,
        data
    };
}
export function listCreationFailure(error) {
    return {
        type: LIST_CREATION_FAILURE,
        error
    };
}

export function requestListCreation(form) {
    return (dispatch) => {
        
        const token = localStorage.getItem("token");
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
        });

        const _options = {
            headers: myHeaders,
            method: 'post',
            body: JSON.stringify(form)
        }
        return fetch(`/api/lists/new?token=${token}`, _options)
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then((json) => {
                console.log("lists creation success json", json);
                dispatch(listCreationSuccess(json.list));
            })
            .catch((err) => {
                console.log("dispatch lists creation error", err);
                dispatch(listCreationFailure(err));
            });

    };
}


export const CARD_CREATION_SUCCESS = "CARD_CREATION_SUCCESS";
export const CARD_CREATION_FAILURE = "CARD_CREATION_FAILURE";

export function cardCreationSuccess(data) {
    return {
        type: CARD_CREATION_SUCCESS,
        data
    };
}
export function cardCreationFailure(error) {
    return {
        type: CARD_CREATION_FAILURE,
        error
    };
}

export function requestCardCreation(form) {
    return (dispatch) => {
        
        const token = localStorage.getItem("token");
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
        });

        const _options = {
            headers: myHeaders,
            method: 'post',
            body: JSON.stringify(form)
        }
        return fetch(`/api/cards/new?token=${token}`, _options)
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then((json) => {
                console.log("cards creation success json", json);
                dispatch(cardCreationSuccess(json.card));
            })
            .catch((err) => {
                console.log("dispatch cards creation error", err);
                dispatch(cardCreationFailure(`Error: ${err.status} - ${err.statusText}`));
            });

    };
}


export const CARD_TOGGLE_SUCCESS = "CARD_TOGGLE_SUCCESS";
export const CARD_TOGGLE_FAILURE = "CARD_TOGGLE_FAILURE";

export function cardToggleSuccess(data) {
    return {
        type: CARD_TOGGLE_SUCCESS,
        data
    };
}
export function cardToggleFailure(error) {
    return {
        type: CARD_TOGGLE_FAILURE,
        error
    };
}

export function requestCardToggle(form) {
    return (dispatch) => {
        
        const token = localStorage.getItem("token");
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
        });

        const _options = {
            headers: myHeaders,
            method: 'post',
            body: JSON.stringify(form)
        }
        return fetch(`/api/cards/new?token=${token}`, _options)
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then((json) => {
                console.log("cards creation success json", json);
                dispatch(cardToggleSuccess(json.card));
            })
            .catch((err) => {
                console.log("dispatch cards creation error", err);
                dispatch(cardToggleFailure(`Error: ${err.status} - ${err.statusText}`));
            });

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


export function fetchBoards() {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        console.log("Fetching all data...");

        return fetch(`/api/boards?token=${token}`)
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then((json) => {
                console.log("should call request boards success", json);
                dispatch(requestBoardsSuccess(json));
                //dispatch to update the state with new board
            })
            .catch((err) => {
                console.log("dispatch baords fetch error", err, err.status, err.statusText);
                dispatch(requestBoardsFailure(err));
            });
    };
}
