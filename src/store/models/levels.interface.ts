export interface ILevel {
    id: number;
    name: string;
}

export enum LevelModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}