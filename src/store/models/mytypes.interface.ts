export interface IMytype {
    id: number;
    name: string;
}

export enum MytypeModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}