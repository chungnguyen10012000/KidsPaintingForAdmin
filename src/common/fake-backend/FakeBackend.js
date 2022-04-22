import { getUser } from "./handler/GET/GetAdmin";
import { postUser } from "./handler/POST/PostUser";
import { login } from "./handler/POST/login";
import { getBlog } from "./handler/GET/GetBlog";
import { postBlog } from "./handler/POST/postBlog";
import { putBlog } from "./handler/PUT/putBlog";
import { deleteBlog } from "./handler/DELETE/deleteBlog";
import { getFeedback } from "./handler/GET/GetFeedback";
import { getArtType } from "./handler/GET/GetArtType";
import { postArtType } from "./handler/POST/postArtType";
import { putArtType } from "./handler/PUT/putArtType";
import { deleteArtType } from "./handler/DELETE/deleteArtType";
import { getLevel } from "./handler/GET/GetLevel";
import { postLevel } from "./handler/POST/postLevel"
import { putLevel } from "./handler/PUT/putLevel";
import { deleteLevel } from "./handler/DELETE/deleteLevel";
import { getContest } from "./handler/GET/GetContest";
import { postContest } from "./handler/POST/postContest";
import { deleteContest } from "./handler/DELETE/deleteContest";
import { putContest } from "./handler/PUT/putContest";
import { getSemester } from "./handler/GET/GetSemester";
import { postSemester } from "./handler/POST/postSemester";
import { deleteSemester } from "./handler/DELETE/deleteSemester";
import { putSemester } from "./handler/PUT/putSemester";
import { deleteLessonTime } from "./handler/DELETE/deleteLessonTime";
import { putLessonTime } from "./handler/PUT/putLessonTime";
import { postLessonTime } from "./handler/POST/postLessonTime";
import { getLessonTime } from "./handler/GET/GetLessonTime";
import { getSchedule } from "./handler/GET/GetSchedule";
import { postSchedule } from "./handler/POST/postSchedule";
import { deleteSchedule } from "./handler/DELETE/deleteSchedule";
import { putSchedule } from "./handler/PUT/putSchedule";
import { getScheduleItem } from "./handler/GET/GetScheduleItem";
import { postScheduleItem } from "./handler/POST/postScheduleItem";
import { deleteScheduleItem } from "./handler/DELETE/deleteScheduleItem";
import { putScheduleItem } from "./handler/PUT/putScheduleItem";
import { getCourse } from "./handler/GET/GetCourse";
import { postCourse } from "./handler/POST/postCourse";
import { deleteCourse } from "./handler/DELETE/deleteCourse";
import { putCourse } from "./handler/PUT/putCourse";
import { getCourseSemester } from "./handler/GET/GetCourseSemester";
import { postCourseSemester } from "./handler/POST/postCourseSemester";
import { deleteCourseSemester } from "./handler/DELETE/deleteCourseSemester";
import { putCourseSemester } from "./handler/PUT/putCourseSemester";
import { getUserById } from "./handler/GET/GetUserById";
import { getTeacher } from "./handler/GET/GetTeacher";
import { getStaff } from "./handler/GET/GetStaff";
import { getSuperAdmin } from "./handler/GET/GetSuperAdmin";


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
                        return postUser(body,created);
                    case url.endsWith(`${path}/user`) && method === 'GET':
                        return getUser(ok);
                    case url.match(new RegExp('/user/\\d+$')) && method === 'GET':
                        return getUserById(ok);
                    case url.match(new RegExp('/user/\\d+$')) && method === 'DELETE':
                        return null;
                    case url.endsWith('/semester') && method === "GET": 
                        return getSemester(ok);
                    case url.endsWith('/semester') && method === "POST":
                        return postSemester(body, created);
                    case url.match(new RegExp('/semester/\\d+$')) && method === "DELETE":
                        return deleteSemester(deleted);
                    case url.match(new RegExp('/semester/\\d+$')) && method === "PUT":
                        return putSemester(body, created);
                    case url.endsWith('/lesson-time') && method === "GET": 
                        return getLessonTime(ok);
                    case url.endsWith('/lesson-time') && method === "POST":
                        return postLessonTime(body, created);
                    case url.match(new RegExp('/lesson-time/\\d+$')) && method === "DELETE":
                        return deleteLessonTime(deleted);
                    case url.match(new RegExp('/lesson-time/\\d+$')) && method === "PUT":
                        return putLessonTime(body, created);
                    case url.endsWith('/schedule') && method === "GET": 
                        return getSchedule(ok);
                    case url.endsWith('/schedule') && method === "POST":
                        return postSchedule(body, created);
                    case url.match(new RegExp('/schedule/\\d+$')) && method === "DELETE":
                        return deleteSchedule(deleted);
                    case url.match(new RegExp('/schedule/\\d+$')) && method === "PUT":
                        return putSchedule(body, created);
                    case url.endsWith('/schedule-item') && method === "GET": 
                        return getScheduleItem(ok);
                    case url.endsWith('/schedule-item') && method === "POST":
                        return postScheduleItem(body,created);
                    case url.match(new RegExp('/schedule-item/\\d+$')) && method === "DELETE":
                        return deleteScheduleItem(deleted);
                    case url.match(new RegExp('/schedule-item/\\d+$')) && method === "PUT":
                        return putScheduleItem(body, created);
                    case url.endsWith('/art-type') && method === "GET": 
                        return getArtType(ok);
                    case url.endsWith('/art-type') && method === "POST":
                        return postArtType(body,created);
                    case url.match(new RegExp('/art-type/\\d+$')) && method === "DELETE":
                        return deleteArtType(deleted);
                    case url.match(new RegExp('/art-type/\\d+$')) && method === "PUT":
                        return putArtType(body, created);
                    case url.endsWith('/art-level') && method === "GET": 
                        return getLevel(ok);
                    case url.endsWith('/art-level') && method === "POST":
                        return postLevel(body, created);
                    case url.match(new RegExp('/art-level/\\d+$')) && method === "DELETE":
                        return deleteLevel(deleted);
                    case url.match(new RegExp('/art-level/\\d+$')) && method === "PUT":
                        return putLevel(body, created);
                    case url.endsWith('/course') && method === "GET": 
                        return getCourse(ok);
                    case url.endsWith('/course') && method === "POST":
                        return postCourse(body,created);
                    case url.match(new RegExp('/course/\\d+$')) && method === "DELETE":
                        return deleteCourse(deleted);
                    case url.match(new RegExp('/course/\\d+$')) && method === "PUT":
                        return putCourse(body, created);
                    case url.endsWith('/course-semester') && method === "GET": 
                        return getCourseSemester(ok);
                    case url.endsWith('/course-semester') && method === "POST":
                        return postCourseSemester(body, created);
                    case url.match(new RegExp('/course-semester/\\d+$')) && method === "DELETE":
                        return deleteCourseSemester(deleted);
                    case url.match(new RegExp('/course-semester/\\d+$')) && method === "PUT":
                        return putCourseSemester(body, created);
                    case url.endsWith('/contest') && method === "GET": 
                        return getContest(ok);
                    case url.endsWith('/contest') && method === "POST":
                        return postContest(body, created);
                    case url.match(new RegExp('/contest/\\d+$')) && method === "DELETE":
                        return deleteContest(deleted);
                    case url.match(new RegExp('/contest/\\d+$')) && method === "PUT":
                        return putContest(body, created);
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
                    case url.endsWith('/teacher') && method === "GET": 
                        return getTeacher(ok);
                    case url.endsWith('/staff') && method === "GET": 
                        return getStaff(ok);
                    case url.endsWith('/super-admin') && method === "GET": 
                        return getSuperAdmin(ok);
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