import { fetchDataRequest, fetchDataSuccess, fetchDataError, addBlog } from "../../../store/actions/blogs.actions";

export function postBlog(data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/blog", {
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
                dispatch(addBlog(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}