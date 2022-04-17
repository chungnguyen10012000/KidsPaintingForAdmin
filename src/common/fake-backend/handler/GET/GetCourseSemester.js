import { courseSemesterList } from "../../database/data/course_semester"
import { CourseSemester } from "../../database/model/course_semester"

const contexParse = (res) => {
    const courses = []
    res.forEach(element => {
        courses.push(new CourseSemester(element))
    });
    return courses
}

export function getCourseSemester(ok) {
    const fakeCourseList = contexParse(courseSemesterList)
    return ok(fakeCourseList);
}