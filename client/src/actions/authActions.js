export const AUTH_USER = "AUTH_USER";
export const UNAUTH_USER = "UNAUTH_USER";
export const AUTH_REQUEST = "AUTH_REQUEST";


export function authorizeUser() {
    return {
        type: AUTH_USER
    };
}
export function sendAuthRequest(){
    return {
        type: AUTH_REQUEST
    };
}


export function requestUserAuthorization(form) {
    return (dispatch) => {
        dispatch(sendAuthRequest());
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
        });

        const _options = {
            headers: myHeaders,
            method: 'post',
            body: JSON.stringify(form)
        }
        return fetch('/auth/login', _options)
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then((json) => {
                console.log("json", json);
                localStorage.setItem("token", json.token);
                window.location = '/dashboard/boards';
                console.log("called authorize user");
            })
            .catch((err) => {
                console.log("err", err);
                //currently not doing any error checking
                console.log("dispatch auth error", err.status, err.statusText);
            });
    };
}
