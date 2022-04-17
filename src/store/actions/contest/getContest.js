import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeContestAll, initialContest, addContest } from "./contest.actions";

export function getContest() {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/contest", {
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
                dispatch(removeContestAll())
                data.map((ele, index) => {
                    if (index === 0){
                        return dispatch(initialContest(ele));
                    }
                    else{
                        return dispatch(addContest(ele))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}