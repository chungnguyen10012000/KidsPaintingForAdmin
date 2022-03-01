export interface IContest {
    id: number;
    name: string;
    description: string;
    amount: number;
    hasBeginDate: string;
    hasExpiryDate: string;
}

export enum ContestModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}