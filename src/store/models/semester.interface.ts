export interface ISemester {
    id: number;
    year: string;
    name: string;
    description: string;
}

export enum SemesterModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
}