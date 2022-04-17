export interface ICourseSemester {
    id: number;
    course_id: number;
    schedule_id: number;
}

export enum CourseSemesterModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}