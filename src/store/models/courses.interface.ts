export interface ICourse {
    courseId: number;
    courseName: string;
    courseDescription: string;
    courseType: string;
    courseLevel: string;
    coursePrice: number;
    maxCourseParticipant: number;
    sumOfSesson: number;
    time: string;
}

export enum CourseModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}