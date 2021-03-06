import { fetchDataRequest, fetchDataSuccess, fetchDataError, addCourseSemester } from "../../../store/actions/course_for_semester.actions";

export function postCourseSemester(data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/course-semester", {
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
                dispatch(addCourseSemester(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}