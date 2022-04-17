import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeCourse } from "./courses.actions";

export function deleteCourse(id) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                `/api/v1/course/${id}`, {
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
                dispatch(removeCourse(id))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}