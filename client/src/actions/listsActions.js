export const REQUEST_LISTS_SUCCESS = "REQUEST_LISTS_SUCCESS";
export const REQUEST_LISTS_FAILURE = "REQUEST_LISTS_FAILURE";

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
                console.log("json", json);
                dispatch(listCreationSuccess(json));
            })
            .catch((err) => {
                console.log("dispatch list creation error", err, err.status, err.statusText);
                dispatch(listCreationFailure(err));
            });

    };
}


export function requestListsSuccess(data) {
    return {
        type: REQUEST_LISTS_SUCCESS,
        data
    };
}
export function requestListsFailure(error) {
    return {
        type: REQUEST_LISTS_FAILURE,
        error
    };
}


export function fetchLists() {
    return (dispatch) => {
        const token = localStorage.getItem("token");

        return fetch(`/api/lists?token=${token}`)
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then((json) => {
                console.log("should call request lists success", json);
                dispatch(requestListsSuccess(json));
                //dispatch to update the state with new list
            })
            .catch((err) => {
                console.log("dispatch fetch lists error", err.status, err.statusText);
                dispatch(requestListsFailure(err));
            });
    };
}
