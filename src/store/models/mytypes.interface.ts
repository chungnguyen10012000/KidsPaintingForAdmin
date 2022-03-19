export interface IMytype {
    typeId: number;
    typeName: string;
}

export enum MytypeModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}