import { getTeacher } from "./handler/GET/GetUser";
import { PostUser } from "./handler/POST/PostUser";


const path = "/api/v1"


export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const { method, headers } = opts;
        const body = opts.body && JSON.parse(opts.body);

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith(`${path}/auth`) && method === 'POST':
                        return null;
                    case url.endsWith(`${path}/user`) && method === 'POST':
                        return PostUser(created);
                    case url.endsWith(`${path}/user`) && method === 'GET':
                        return getTeacher(ok);
                    case url.match(new RegExp('/user/\\d+$')) && method === 'GET':
                        console.log(url)
                        return getTeacher(ok);
                    case url.match(/\/user\/\d+$/) && method === 'DELETE':
                        return null;
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

            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }
            
        })
    }
}