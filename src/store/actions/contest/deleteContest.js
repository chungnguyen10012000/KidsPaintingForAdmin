import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeContest } from "./contest.actions";

export function deleteContest(id) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                `/api/v1/contest/${id}`, {
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
                dispatch(removeContest(id))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}