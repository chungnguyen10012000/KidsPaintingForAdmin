export interface ISemester {
    id: number;
    number: number;
    year: string;
    name: string;
    description: string;
    start_time: string;
    end_time: string;
}

export enum SemesterModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
}