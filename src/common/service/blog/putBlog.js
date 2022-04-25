import { fetchDataRequest, fetchDataSuccess, fetchDataError, editBlog } from "../../../store/actions/blogs.actions";

export function putBlog(id, data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                `/api/v1/blog/${id}`, {
                    method: "PUT",
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
                console.log(id)
                dispatch(fetchDataSuccess(data))
                dispatch(editBlog(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}