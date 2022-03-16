export interface IMyClass {
    id: number;
    name: string;
    course: string;
    teacher_id: string;
    amount: number;
}

export enum MyClassModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    lesson = 3,
}