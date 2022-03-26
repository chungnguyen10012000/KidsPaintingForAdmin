export interface IFeedBack {
    id: number;
    email: string;
    description: string;
}

export enum FeedBackModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}