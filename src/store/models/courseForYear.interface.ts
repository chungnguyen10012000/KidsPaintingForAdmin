export interface ICourseForYear {
    courseId: number;
    courseName: string;
    semester: string;
    time: string;
}

export enum CourseForYearModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}