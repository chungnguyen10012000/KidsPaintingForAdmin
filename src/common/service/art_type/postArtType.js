import { fetchDataRequest, fetchDataSuccess, fetchDataError,addMytype } from "../../../store/actions/mytypes.actions";

export function postArtType(data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/art-type", {
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
                dispatch(addMytype(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}