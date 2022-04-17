import { getTeacher } from "./handler/GET/GetUser";
import { PostUser } from "./handler/POST/PostUser";
import { login } from "./handler/POST/login";
import { getBlog } from "./handler/GET/GetBlog";
import { postBlog } from "./handler/POST/postBlog";
import { putBlog } from "./handler/PUT/putBlog";
import { deleteBlog } from "./handler/DELETE/deleteBlog";
import { getFeedback } from "./handler/GET/GetFeedback";


const path = "/api/v1"


export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        // const { method, headers } = opts;
        const { method } = opts;
        const body = opts.body && JSON.parse(opts.body);

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith(`${path}/auth`) && method === 'POST':
                        return login(body, created);
                    case url.endsWith(`${path}/user`) && method === 'POST':
                        return PostUser(created);
                    case url.endsWith(`${path}/user`) && method === 'GET':
                        return getTeacher(ok);
                    case url.match(new RegExp('/user/\\d+$')) && method === 'GET':
                        return getTeacher(ok);
                    case url.match(new RegExp('/user/\\d+$')) && method === 'DELETE':
                        return null;
                    case url.endsWith('/semester') && method === "GET": 
                        return null;
                    case url.endsWith('/semester') && method === "POST":
                        return null;
                    case url.match(new RegExp('/semester/\\d+$')) && method === "DELETE":
                        return null;
                    case url.match(new RegExp('/semester/\\d+$')) && method === "PUT":
                        return null;
                    case url.endsWith('/lesson-time') && method === "GET": 
                        return null;
                    case url.endsWith('/lesson-time') && method === "POST":
                        return null;
                    case url.match(new RegExp('/lesson-time/\\d+$')) && method === "DELETE":
                        return null;
                    case url.match(new RegExp('/lesson-time/\\d+$')) && method === "PUT":
                        return null;
                    case url.endsWith('/schedule') && method === "GET": 
                        return null;
                    case url.endsWith('/schedule') && method === "POST":
                        return null;
                    case url.match(new RegExp('/schedule/\\d+$')) && method === "DELETE":
                        return null;
                    case url.match(new RegExp('/schedule/\\d+$')) && method === "PUT":
                        return null;
                    case url.endsWith('/schedule-item') && method === "GET": 
                        return null;
                    case url.endsWith('/schedule-item') && method === "POST":
                        return null;
                    case url.match(new RegExp('/schedule-item/\\d+$')) && method === "DELETE":
                        return null;
                    case url.match(new RegExp('/schedule-item/\\d+$')) && method === "PUT":
                        return null;
                    case url.endsWith('/art-type') && method === "GET": 
                        return null;
                    case url.endsWith('/art-type') && method === "POST":
                        return null;
                    case url.match(new RegExp('/art-type/\\d+$')) && method === "DELETE":
                        return null;
                    case url.match(new RegExp('/art-type/\\d+$')) && method === "PUT":
                        return null;
                    case url.endsWith('/art-level') && method === "GET": 
                        return null;
                    case url.endsWith('/art-level') && method === "POST":
                        return null;
                    case url.match(new RegExp('/art-level/\\d+$')) && method === "DELETE":
                        return null;
                    case url.match(new RegExp('/art-level/\\d+$')) && method === "PUT":
                        return null;
                    case url.endsWith('/course') && method === "GET": 
                        return null;
                    case url.endsWith('/course') && method === "POST":
                        return null;
                    case url.match(new RegExp('/course/\\d+$')) && method === "DELETE":
                        return null;
                    case url.match(new RegExp('/course/\\d+$')) && method === "PUT":
                        return null;
                    case url.endsWith('/course-semester') && method === "GET": 
                        return null;
                    case url.endsWith('/course-semester') && method === "POST":
                        return null;
                    case url.match(new RegExp('/course-semester/\\d+$')) && method === "DELETE":
                        return null;
                    case url.match(new RegExp('/course-semester/\\d+$')) && method === "PUT":
                        return null;
                    case url.endsWith('/contest') && method === "GET": 
                        return null;
                    case url.endsWith('/contest') && method === "POST":
                        return null;
                    case url.match(new RegExp('/contest/\\d+$')) && method === "DELETE":
                        return null;
                    case url.match(new RegExp('/contest/\\d+$')) && method === "PUT":
                        return null;
                    case url.endsWith('/feedback') && method === "GET": 
                        return getFeedback(ok);
                    case url.endsWith('/feedback') && method === "POST":
                        return null;
                    case url.match(new RegExp('/feedback/\\d+$')) && method === "DELETE":
                        return null;
                    case url.match(new RegExp('/feedback/\\d+$')) && method === "PUT":
                        return null;
                    case url.endsWith('/blog') && method === "GET": 
                        return getBlog(ok);
                    case url.endsWith('/blog') && method === "POST":
                        return postBlog(body, created);
                    case url.match(new RegExp('/blog/\\d+$')) && method === "DELETE":
                        return deleteBlog(deleted);
                    case url.match(new RegExp('/blog/\\d+$')) && method === "PUT":
                        return putBlog(body, created);
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // helper function
            function ok(body) {
                resolve({status: 200, ok: true, text: () => Promise.resolve(JSON.stringify(body)), json: () => Promise.resolve(body) });
            }

            function created(body) {
                resolve({status: 201, ok: true, text: () => Promise.resolve(JSON.stringify(body)), json: () => Promise.resolve(body) });
            }

            function deleted() {
                resolve({status: 202, ok: true, text: () => Promise.resolve(JSON.stringify(body)), json: () => Promise.resolve(body) });
            }

            /*  function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            } */
            
        })
    }
}