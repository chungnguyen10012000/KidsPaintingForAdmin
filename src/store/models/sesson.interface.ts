export interface ISesson {
    id: number;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    currentDay: string;
}

export enum SessonModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    lesson = 3,
}