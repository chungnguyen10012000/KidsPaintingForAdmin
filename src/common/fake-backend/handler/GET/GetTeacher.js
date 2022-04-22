import { teacherList } from "../../database/data/teacher"
import { User } from "../../database/model/user"

const contexParse = (res) => {
    const teachers = []
    res.forEach(element => {
        teachers.push(new User(element))
    });
    return teachers
}

export function getTeacher(ok) {
    const fakeTeacherList = contexParse(teacherList)
    return ok(fakeTeacherList);
}