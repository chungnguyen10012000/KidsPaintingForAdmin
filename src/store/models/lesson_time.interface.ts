export interface ILessonTime {
    id: number;
    start_time: string;
    end_time: string;
}

export enum LessonTimeModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}