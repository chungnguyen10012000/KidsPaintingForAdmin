export interface IBlog {
    id: number;
    email: string;
    description: string;
}

export enum BlogModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}