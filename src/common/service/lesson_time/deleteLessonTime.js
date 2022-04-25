import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeLessonTime } from "../../../store/actions/lesson_time.actions";

export function deleteLessonTime(id) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                `/api/v1/lesson-time/${id}`, {
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
                dispatch(removeLessonTime(id))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}