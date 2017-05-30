export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export function fetchUsersSuccess(data) {
    return {
        type: FETCH_USERS_SUCCESS,
        data
    };
}

export function fetchUsersFailure(error) {
    return {
        type: FETCH_USERS_FAILURE,
        error
    };
}


export function fetchUsers(token) {
    return (dispatch) => {
        console.log("fetchUsers getting called");
        if (!token) {
            token = localStorage.getItem('token');
        }
        return fetch(`/api/users?token=${token}`)
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then((json) => {
                dispatch(fetchUsersSuccess(json.users));
            })
            .catch((error) => {
                dispatch(fetchUsersFailure(error));
            })
    }
}
