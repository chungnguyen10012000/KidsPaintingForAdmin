export interface IBlog {
    id: number;
    name: string;
    description: string;
}

export enum BlogModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}