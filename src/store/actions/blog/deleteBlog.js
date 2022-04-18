import { fetchDataRequest, fetchDataSuccess, fetchDataError,  removeBlog } from "./blogs.actions";

export function deleteBlog(id) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                `/api/v1/blog/${id}`, {
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
                dispatch(removeBlog(id))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}