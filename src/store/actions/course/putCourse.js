import { fetchDataRequest, fetchDataSuccess, fetchDataError, editCourse } from "./courses.actions";

export function putCourse(id, data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                `/api/v1/course/${id}`, {
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
                dispatch(editCourse(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}