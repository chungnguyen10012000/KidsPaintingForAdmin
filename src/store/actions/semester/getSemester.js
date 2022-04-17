import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeSemesterAll, initialSemester, addSemester } from "./semester.actions";

export function getSemester() {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/semester", {
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
                dispatch(removeSemesterAll())
                data.map((ele, index) => {
                    if (index === 0){
                        return dispatch(initialSemester(ele));
                    }
                    else{
                        return dispatch(addSemester(ele))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}