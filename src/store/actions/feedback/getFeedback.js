import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeFeedbackAll, initialFeedback, addFeedback } from "./feedback.actions";

export function getFeedback() {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/feedback", {
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
                dispatch(removeFeedbackAll())
                data.map((ele, index) => {
                    if (index === 0){
                        return dispatch(initialFeedback(ele));
                    }
                    else{
                        return dispatch(addFeedback(ele))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}