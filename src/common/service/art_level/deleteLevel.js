import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeLevel } from "../../../store/actions/levels.actions";

export function deleteLevel(id) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                `/api/v1/art-level/${id}`, {
                    method: "DELETE"
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
                dispatch(removeLevel(id))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}