import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeCourseSemesterAll, initialCourseSemester, addCourseSemester } from "./course_for_semester.actions";

export function getCourseSemester() {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/course-semester", {
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
                dispatch(removeCourseSemesterAll())
                data.map((ele, index) => {
                    if (index === 0){
                        return dispatch(initialCourseSemester(ele));
                    }
                    else{
                        return dispatch(addCourseSemester(ele))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}