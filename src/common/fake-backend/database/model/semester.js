export class Semester {
    constructor(semesterJson) {
        this.id = semesterJson.id
        this.name = semesterJson.name
        this.number = semesterJson.number
        this.year = semesterJson.year
        this.description = semesterJson.description
        this.start_time = semesterJson.start_time
        this.end_time = semesterJson.end_time
    }
}