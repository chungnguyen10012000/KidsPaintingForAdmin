import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeCourseAll, initialCourse, addCourse } from "./courses.actions";

export function getCourse() {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/course", {
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
                dispatch(removeCourseAll())
                data.map((ele, index) => {
                    if (index === 0){
                        return dispatch(initialCourse(ele));
                    }
                    else{
                        return dispatch(addCourse(ele))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}