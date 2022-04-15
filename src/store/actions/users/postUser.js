import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "./users.action";

export function postUser(data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/user", {
                    method: "GET",
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
                console.log(data)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}