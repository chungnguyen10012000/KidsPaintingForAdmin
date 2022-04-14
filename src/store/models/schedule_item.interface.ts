export interface IScheduleItem {
    id: number;
    schedule_id: number;
    lesson_time: string;
    date_of_week: number;
}

export enum ScheduleItemModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}