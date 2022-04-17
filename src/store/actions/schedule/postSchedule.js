import { fetchDataRequest, fetchDataSuccess, fetchDataError,addSchedule } from "./schedule.actions";

export function postSchedule(data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/schedule", {
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
                dispatch(addSchedule(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}