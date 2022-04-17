import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeMytype } from "./mytypes.actions";

export function deleteArtType(id) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                `/api/v1/art-type/${id}`, {
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
                dispatch(removeMytype(id))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}