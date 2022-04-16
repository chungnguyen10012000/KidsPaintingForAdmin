import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "./users.action";
import { history } from "../../../common/helper/history";

export function login(data) {
    return dispatch => {
        dispatch(fetchDataRequest());
        fetch(
                "/api/v1/auth", {
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
                dispatch(fetchDataSuccess(data))
                alert(`${data[0].username} đăng nhập thành công!`)
                localStorage.setItem('email', data[0].role)
                localStorage.setItem('permission', data[0].permission)
                localStorage.setItem('role', data[0].role)
                history.push({pathname: `/${data[0].role}/home`, state: {isAdmin: false}})
                window.location.reload(false)
                console.log(data)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}