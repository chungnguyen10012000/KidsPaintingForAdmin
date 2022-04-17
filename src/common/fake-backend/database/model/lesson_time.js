export class LessonTime {
    constructor(lessonTimeJson) {
        this.id = lessonTimeJson.id
        this.start_time = lessonTimeJson.start_time
        this.end_time = lessonTimeJson.end_time
    }
}