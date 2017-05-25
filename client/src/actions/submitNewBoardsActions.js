export const SUBMIT_BOARD_CREATION_REQUEST = "SUBMIT_BOARD_CREATION_REQUEST";
export const BOARD_CREATION_SUCCESS = "BOARD_CREATION_SUCCESS";
export const BOARD_CREATION_FAILURE = "BOARD_CREATION_FAILURE";

export function boardCreationSuccess(){
    return {
        type: BOARD_CREATION_SUCCESS
    };
}

export function boardCreationFailure(error){
    return {
        type: BOARD_CREATION_FAILURE,
        error
    };
}

export function boardCreationRequest(){
    return {
        type: SUBMIT_BOARD_CREATION_REQUEST
    };
}


export function requestBoardCreation(form) {
    return (dispatch) => {
        
        dispatch(boardCreationRequest());
        
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
                dispatch(boardCreationSuccess());
                return json;
                //dispatch to update the state with new board
            })
            .catch((err) => {
                console.log("dispatch auth error", err, err.status, err.statusText);
                dispatch(boardCreationFailure(err));
            });
        
    };
}
