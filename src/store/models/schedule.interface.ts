export interface ISchedule {
    id: number;
    creator_id: string;
    name: string;
    description: string;
}

export enum ScheduleModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}