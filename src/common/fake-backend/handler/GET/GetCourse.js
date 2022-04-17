import { courseList } from "../../database/data/course"
import { Course } from "../../database/model/course"

const contexParse = (res) => {
    const courses = []
    res.forEach(element => {
        courses.push(new Course(element))
    });
    return courses
}

export function getCourse(ok) {
    const fakeCourseList = contexParse(courseList)
    return ok(fakeCourseList);
}