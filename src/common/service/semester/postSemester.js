import { fetchDataRequest, fetchDataSuccess, fetchDataError, addSemester } from "../../../store/actions/semester.actions";

export function postSemester(data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/semester", {
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
                dispatch(addSemester(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}