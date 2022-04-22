import { fetchDataRequest, fetchDataSuccess, fetchDataError, initialUser, removeUserAll, addUser } from "./users.action";

export function getTeacher() {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/teacher", {
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
                dispatch(removeUserAll())
                data.map((ele, index) => {
                    if (index === 0){
                        return dispatch(initialUser(ele));
                    }
                    else{
                        return dispatch(addUser(ele))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}