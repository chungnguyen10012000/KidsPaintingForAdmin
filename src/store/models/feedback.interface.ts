export interface IFeedBack {
    id: number;
    email: string;
    content: string;
}

export enum FeedBackModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}