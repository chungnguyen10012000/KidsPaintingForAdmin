import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "./users.action";

export function fetchProducts() {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/user/1", {
                    method: "GET"
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
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}