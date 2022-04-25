import { fetchDataRequest, fetchDataSuccess, fetchDataError,addLevel } from "../../../store/actions/levels.actions";

export function postLevel(data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/art-level", {
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
                console.log(data)
                dispatch(fetchDataSuccess(data))
                dispatch(addLevel(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}