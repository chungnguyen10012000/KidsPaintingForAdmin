import { fetchDataRequest, fetchDataSuccess, fetchDataError, addLessonTime } from "./lesson_time.actions";

export function postLessonTime(data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/lesson-time", {
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
                dispatch(addLessonTime(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}