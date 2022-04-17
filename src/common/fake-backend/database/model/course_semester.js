export class CourseSemester {
    constructor(courseSemesterJson) {
        this.id = courseSemesterJson.id
        this.schedule_id = courseSemesterJson.schedule_id
        this.course_id = courseSemesterJson.course_id
    }
}