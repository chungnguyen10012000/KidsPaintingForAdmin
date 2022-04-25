import { fetchDataRequest, fetchDataSuccess, fetchDataError, addContest } from "../../../store/actions/contest.actions";

export function postContest(data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/contest", {
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
                dispatch(addContest(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}