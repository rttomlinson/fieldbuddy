import 'isomorphic-fetch';
//---------------------------------&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&--------------------------------
//BOARDS
//---------------------------------&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&--------------------------------
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



export const BOARD_REMOVAL_SUCCESS = "BOARD_REMOVAL_SUCCESS";
export const BOARD_REMOVAL_FAILURE = "BOARD_REMOVAL_FAILURE";

export function boardRemovalSuccess(data) {
    return {
        type: BOARD_REMOVAL_SUCCESS,
        data
    };
}
export function boardRemovalFailure(error) {
    return {
        type: BOARD_REMOVAL_FAILURE,
        error
    };
}

export function requestBoardRemoval(boardId, token) {
    return (dispatch) => {
        // const token = localStorage.getItem("token");
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
        });

        const _options = {
            headers: myHeaders,
            method: 'post',
            body: JSON.stringify({boardId, _method: "DELETE"})
        }
        return fetch(`/api/boards?token=${token}`, _options)
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.status
            })
            .then((status) => {
                console.log("boardDeletion success json", status);
                dispatch(boardRemovalSuccess(boardId));
            })
            .catch((err) => {
                console.log("dispatch boardDeletion error", err);
                dispatch(boardRemovalFailure(`Error: ${err.status} - ${err.statusText}`));
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


//---------------------------------&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&--------------------------------
//Lists
//---------------------------------&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&--------------------------------


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

//---------------------------------&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&--------------------------------
//CARDS
//---------------------------------&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&--------------------------------



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


// export const CARD_TOGGLE_SUCCESS = "CARD_TOGGLE_SUCCESS";
// export const CARD_TOGGLE_FAILURE = "CARD_TOGGLE_FAILURE";

// export function cardToggleSuccess(data) {
//     return {
//         type: CARD_TOGGLE_SUCCESS,
//         data
//     };
// }
// export function cardToggleFailure(error) {
//     return {
//         type: CARD_TOGGLE_FAILURE,
//         error
//     };
// }

// export function requestCardToggle(form) {
//     return (dispatch) => {
        
//         const token = localStorage.getItem("token");
//         const myHeaders = new Headers({
//             'Content-Type': 'application/json'
//         });

//         const _options = {
//             headers: myHeaders,
//             method: 'post',
//             body: JSON.stringify(form)
//         }
//         return fetch(`/api/cards/new?token=${token}`, _options)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw response;
//                 }
//                 return response.json();
//             })
//             .then((json) => {
//                 console.log("cards creation success json", json);
//                 dispatch(cardToggleSuccess(json.card));
//             })
//             .catch((err) => {
//                 console.log("dispatch cards creation error", err);
//                 dispatch(cardToggleFailure(`Error: ${err.status} - ${err.statusText}`));
//             });

//     };
// }

export const CARD_UPDATE_SUCCESS = "CARD_UPDATE_SUCCESS";
export const CARD_UPDATE_FAILURE = "CARD_UPDATE_FAILURE";

export function cardUpdateSuccess(data) {
    return {
        type: CARD_UPDATE_SUCCESS,
        data
    };
}
export function cardUpdateFailure(error) {
    return {
        type: CARD_UPDATE_FAILURE,
        error
    };
}

export function requestCardUpdate(form, token, cardId) {
    return (dispatch) => {
        console.log("calling requestCardUpdate");
        
        //const token = localStorage.getItem("token");
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
        });

        const _options = {
            headers: myHeaders,
            method: 'post',
            body: JSON.stringify(form)
        }
        return fetch(`/api/cards/${cardId}?token=${token}&_method=PUT`, _options)
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then((json) => {
                console.log("cards update success json", json);
                dispatch(cardUpdateSuccess(json.card));
            })
            .catch((err) => {
                console.log("dispatch update card error", err);
                dispatch(cardUpdateFailure(`Error: ${err.status} - ${err.statusText}`));
            });

    };
}

//---------------------------------&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&--------------------------------
//BOARDMEMBERS
//---------------------------------&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&--------------------------------

export const BOARDMEMBER_ADD_SUCCESS = "BOARDMEMBER_ADD_SUCCESS";
export const BOARDMEMBER_ADD_FAILURE = "BOARDMEMBER_ADD_FAILURE";

export function boardmemberAddSuccess(data) {
    return {
        type: BOARDMEMBER_ADD_SUCCESS,
        data
    };
}
export function boardmemberAddFailure(error) {
    return {
        type: BOARDMEMBER_ADD_FAILURE,
        error
    };
}

export function requestAddBoardmember(boardId, memberId, token) {
    return (dispatch) => {
        if (!token) {
            token = localStorage.getItem('token');
        }
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
        });
        const _options = {
            headers: myHeaders,
            method: 'post',
            body: JSON.stringify({
                boardId,
                memberId
            })
        };
        return fetch(`/api/boards/${boardId}/users?token=${token}`, _options)
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then((json) => {
                console.log("boardmembers add success json", json);
                dispatch(boardmemberAddSuccess(json.boardmember));
            })
            .catch((err) => {
                console.log("boardmembers add failure error", err);
                dispatch(boardmemberAddFailure(`Error: ${err.status} - ${err.statusText}`));
            });
    }
}


export const BOARDMEMBER_REMOVE_SUCCESS = "BOARDMEMBER_REMOVE_SUCCESS";
export const BOARDMEMBER_REMOVE_FAILURE = "BOARDMEMBER_REMOVE_FAILURE";

export function boardmemberRemoveSuccess(data) {
    return {
        type: BOARDMEMBER_REMOVE_SUCCESS,
        data
    };
}
export function boardmemberRemoveFailure(error) {
    return {
        type: BOARDMEMBER_REMOVE_FAILURE,
        error
    };
}


export function requestRemoveBoardmember(boardId, memberId, token) {
    return (dispatch) => {
        if (!token) {
            token = localStorage.getItem('token');
        }
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
        });

        const _options = {
            headers: myHeaders,
            method: 'post',
            body: JSON.stringify({
                boardId,
                memberId
            })
        };
        return fetch(`/api/boards/${boardId}/users?token=${token}&_method=DELETE`, _options)
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response;
            })
            .then((json) => {
                console.log("boardmembers add success json");
                dispatch(boardmemberRemoveSuccess({boardId, memberId}));
            })
            .catch((err) => {
                console.log("boardmembers add failure error", err);
                dispatch(boardmemberRemoveFailure(`Error: ${err.status} - ${err.statusText}`));
            });
    }
}