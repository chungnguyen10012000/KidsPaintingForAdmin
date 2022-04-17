import { semesterList } from "../../database/data/semester"
import { Semester } from "../../database/model/semester"

const contexParse = (res) => {
    const semesters = []
    res.forEach(element => {
        semesters.push(new Semester(element))
    });
    return semesters
}

export function getSemester(ok) {
    const fakeSemesterList = contexParse(semesterList)
    return ok(fakeSemesterList);
}