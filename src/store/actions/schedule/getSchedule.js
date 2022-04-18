import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeScheduleAll, initialSchedule, addSchedule } from "./schedule.actions";

export function getSchedule() {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/schedule", {
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
                dispatch(removeScheduleAll())
                data.map((ele, index) => {
                    if (index === 0){
                        return dispatch(initialSchedule(ele));
                    }
                    else{
                        return dispatch(addSchedule(ele))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}