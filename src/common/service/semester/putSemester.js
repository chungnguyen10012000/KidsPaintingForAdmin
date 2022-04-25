import { fetchDataRequest, fetchDataSuccess, fetchDataError, editSemester } from "../../../store/actions/semester.actions";

export function putSemester(id, data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                `/api/v1/semester/${id}`, {
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
                dispatch(editSemester(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}