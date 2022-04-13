export class Course {
    constructor(courseJson) {
        this.courseID = courseJson.courseID
        this.courseName = courseJson.courseName
        this.courseDescription = courseJson.courseDescription
        this.coursePrice = courseJson.coursePrice
        this.courseImg = courseJson.courseImg
        this.courseAmount = courseJson.courseAmount
    }
}