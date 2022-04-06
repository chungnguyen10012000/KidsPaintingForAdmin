export interface ICourseSemester {
    courseId: number;
    courseTemplate: string;
    time: string;
    timeLesson: string;
}

export enum CourseSemesterModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}