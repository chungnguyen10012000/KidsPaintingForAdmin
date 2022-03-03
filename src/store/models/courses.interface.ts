export interface ICourse {
    id: number;
    name: string;
    description: string;
    type: string;
    level: string;
    price: number;
}

export enum CourseModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}