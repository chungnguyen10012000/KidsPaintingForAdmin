export interface IExercise {
    id: number;
    name: string;
    body: string;
    weight: number;
    maxSubmit: number;
}

export enum ExerciseModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}