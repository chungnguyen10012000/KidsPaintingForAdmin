import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeCourseSemester } from "./course_for_semester.actions";

export function deleteCourseSemester(id) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                `/api/v1/course-semester/${id}`, {
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
                dispatch(removeCourseSemester(id))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}