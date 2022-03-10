export interface IUser {
    id: number;
    fullName: string;
    email: string;
    sex: string;
    dateOfDay:  string;
    address: string;
    phone: string;
    password: string;
}

export enum UserModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}