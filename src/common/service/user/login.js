import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "../../../store/actions/users.action";
import { history } from "../../helper/history";
import jwt_decode from "jwt-decode";

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
                alert(`Đăng nhập thành công!`)
                //console.log(data)
                var x = data
                console.log(x.accessToken)
                var decoded = jwt_decode(x.accessToken)
                //console.log(decoded)
                localStorage.setItem('email', decoded.username)
                localStorage.setItem('authorities', decoded.authorities)
                localStorage.setItem('role', decoded.authorities[0])
                if (decoded.authorities[0] === "ROLE_ADMIN"){
                    history.push({pathname: '/admin/home', state: {isAdmin: "admin"}})
                }
                else if (decoded.authorities[0] === "ROLE_SUPER_ADMIN"){
                    history.push({pathname: '/super-admin/home', state: {isAdmin: "super-admin"}})
                }
                else if (decoded.authorities[0] === "ROLE_STAFF"){
                    history.push({pathname: '/staff/home', state: {isAdmin: "employee"}})
                }
                else if (decoded.authorities[0] === "ROLE_STAFF"){
                    history.push({pathname: '/employee/home', state: {isAdmin: "employee"}})
                }
                else if (decoded.authorities[0] === "ROLE_TEACHER"){
                    history.push({pathname: '/teacher/home', state: {isAdmin: "teacher"}})
                }
                window.location.reload(false)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}