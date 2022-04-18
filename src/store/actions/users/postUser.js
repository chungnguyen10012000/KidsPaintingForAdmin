import { fetchDataRequest, fetchDataSuccess, fetchDataError, addUser } from "./users.action";

export function postUser(data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/user", {
                    method: "POST",
                    body: JSON.stringify(data)
                }
            )
            .then( response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json()
            })
            .then (data => {
                dispatch(fetchDataSuccess(data))
                dispatch(addUser(data))
                console.log(data)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}