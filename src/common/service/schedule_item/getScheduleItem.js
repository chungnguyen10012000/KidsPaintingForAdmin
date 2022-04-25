import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeScheduleItemAll, initialScheduleItem, addScheduleItem } from "../../../store/actions/schedule_item.actions";

export function getScheduleItem() {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/schedule-item", {
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
                dispatch(removeScheduleItemAll())
                data.map((ele, index) => {
                    if (index === 0){
                        return dispatch(initialScheduleItem(ele));
                    }
                    else{
                        return dispatch(addScheduleItem(ele))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}