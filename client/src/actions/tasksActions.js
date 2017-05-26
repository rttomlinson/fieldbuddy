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
                console.log("json", json);
                dispatch(boardCreationSuccess(json));
            })
            .catch((err) => {
                console.log("dispatch auth error", err, err.status, err.statusText);
                dispatch(boardCreationFailure(err));
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
                console.log("dispatch auth error", err.status, err.statusText);
                dispatch(requestBoardsFailure(err));
            });
    };
}
