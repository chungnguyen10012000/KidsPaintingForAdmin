import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeArtTypeAll, initialArtType, addMytype } from "./mytypes.actions";

export function getArtType() {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/art-type", {
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
                dispatch(removeArtTypeAll())
                data.map((ele, index) => {
                    if (index === 0){
                        return dispatch(initialArtType(ele));
                    }
                    else{
                        return dispatch(addMytype(ele))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}