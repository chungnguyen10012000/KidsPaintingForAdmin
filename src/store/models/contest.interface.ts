export interface IContest {
    id: number;
    name: string;
    description: string;
    type: string;
    level: string;
    status: string;
    amount: number;
    hasBeginDate: string;
    hasExpiryDate: string;
    teacher: string;
}

export enum ContestModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}