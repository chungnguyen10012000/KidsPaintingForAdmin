export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    sex: string;
    dateOfDay:  string;
    address: string;
    phone: string;
    password: string;
    userStatus: boolean;
    avatar: string;
}

export enum UserModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}