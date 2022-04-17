import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeLessonTimeAll, initialLessonTime, addLessonTime } from "./lesson_time.actions";

export function getLessonTime() {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/lesson-time", {
                    method: "GET"
                }
            )
            .then( response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json()
            })
            .then (data => {
                dispatch(fetchDataSuccess(data))
                dispatch(removeLessonTimeAll())
                data.map((ele, index) => {
                    if (index === 0){
                        return dispatch(initialLessonTime(ele));
                    }
                    else{
                        return dispatch(addLessonTime(ele))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}