import { fetchDataRequest, fetchDataSuccess, fetchDataError, addCourse } from "../../../store/actions/courses.actions";

export function postCourse(data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/course", {
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
                dispatch(addCourse(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}