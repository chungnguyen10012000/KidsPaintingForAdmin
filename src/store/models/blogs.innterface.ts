export interface IBlog {
    id: number;
    name: string;
    description: string;
    image_url: string;
}

export enum BlogModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}