import { fetchDataRequest, fetchDataSuccess, fetchDataError, addScheduleItem } from "./schedule_item.actions";

export function postScheduleItem(data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/schedule-item", {
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
                dispatch(addScheduleItem(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}