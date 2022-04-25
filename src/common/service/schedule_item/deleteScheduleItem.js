import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeScheduleItem } from "../../../store/actions/schedule_item.actions";

export function deleteScheduleItem(id) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                `/api/v1/schedule-item/${id}`, {
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
                dispatch(removeScheduleItem(id))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}