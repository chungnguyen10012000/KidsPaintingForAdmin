import { fetchDataRequest, fetchDataSuccess, fetchDataError, editLevel } from "../../../store/actions/levels.actions";

export function putLevel(id, data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                `/api/v1/art-level/${id}`, {
                    method: "PUT",
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
                console.log(id)
                dispatch(fetchDataSuccess(data))
                dispatch(editLevel(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}