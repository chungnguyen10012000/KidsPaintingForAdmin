import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeSchedule } from "../../../store/actions/schedule.actions";

export function deleteSchedule(id) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                `/api/v1/schedule/${id}`, {
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
                dispatch(removeSchedule(id))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}