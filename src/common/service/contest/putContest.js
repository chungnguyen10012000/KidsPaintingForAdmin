import { fetchDataRequest, fetchDataSuccess, fetchDataError, editContest } from "../../../store/actions/contest.actions";

export function putContest(id, data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                `/api/v1/contest/${id}`, {
                    method: "PUT",
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
                console.log(id)
                dispatch(fetchDataSuccess(data))
                dispatch(editContest(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}