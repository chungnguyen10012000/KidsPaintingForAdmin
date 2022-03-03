export interface IClass {
    id: number;
    name: string;
    course: number;
    teacher_id: number;
    amount: number;
}

export enum ClassModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}