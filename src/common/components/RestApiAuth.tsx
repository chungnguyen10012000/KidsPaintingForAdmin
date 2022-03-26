import { postRestApiWithToken, getDomain } from "../util/RestAPI.util"

export function RestApiAuth(res: Response) {
    if (res.status === 200) {
        return res.json()
    }
    else if (res.status === 403) {
        postRestApiWithToken(getDomain('auth/refresh'), JSON.stringify({
            "refreshToken": localStorage.getItem('refresh_token')
        }))
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('access_token', data.accessToken) // Authorization
                localStorage.setItem('refresh_token', data.refreshToken)
                //window.location.reload();
            })
    }
}