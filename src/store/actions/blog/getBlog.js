import { fetchDataRequest, fetchDataSuccess, fetchDataError,  removeBlogAll, initialBlog, addBlog } from "./blogs.actions";

export function getBlog() {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/blog", {
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
                dispatch(removeBlogAll())
                data.map((ele, index) => {
                    if (index === 0){
                        return dispatch(initialBlog(ele));
                    }
                    else{
                        return dispatch(addBlog(ele))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}