import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeBlogAll, addBlog, initialBlog } from "./blogs.actions";

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
                data.map((ele) => {
                    return dispatch(addBlog(ele))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}