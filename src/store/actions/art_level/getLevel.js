import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeLevelAll, initialLevel, addLevel } from "./levels.actions";

export function getLevel() {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/art-level", {
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
                dispatch(removeLevelAll())
                data.map((ele, index) => {
                    if (index === 0){
                        return dispatch(initialLevel(ele));
                    }
                    else{
                        return dispatch(addLevel(ele))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}