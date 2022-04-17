import { lessonTimeList } from "../../database/data/lesson_time"
import { LessonTime } from "../../database/model/lesson_time"

const contexParse = (res) => {
    const lesson_times = []
    res.forEach(element => {
        lesson_times.push(new LessonTime(element))
    });
    return lesson_times
}

export function getLessonTime(ok) {
    const fakeLessonTimeList = contexParse(lessonTimeList)
    return ok(fakeLessonTimeList);
}