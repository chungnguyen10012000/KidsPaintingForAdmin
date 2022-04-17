import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeSemester } from "./semester.actions";

export function deleteSemester(id) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                `/api/v1/semester/${id}`, {
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
                dispatch(removeSemester(id))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}