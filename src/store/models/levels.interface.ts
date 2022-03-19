export interface ILevel {
    levelId: number;
    levelName: string;
}

export enum LevelModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}