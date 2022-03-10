import { IUser, UserModificationStatus } from "../models/user.interface";

export const EDIT_USER: string = "EDIT_USER";
export const ADD_USER: string = "ADD_USER";
export const REMOVE_USER: string = "REMOVE_USER";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const CHANGE_USER_PENDING_EDIT: string = "CHANGE_USER_PENDING_EDIT";
export const CLEAR_USER_PENDING_EDIT: string = "CLEAR_USER_PENDING_EDIT";

export function addUser(user: IUser): IAddUserActionType {
    return { type: ADD_USER, user: user };
}

export function removeUser(user: IUser): IRemoveUserActionType {
    return { type: REMOVE_USER, user: user };
}

export function editUser(user: IUser): IEditUserActionType {
    return { type: EDIT_USER, user: user };
}

export function setModificationState(value: UserModificationStatus): ISetModificationStateActionUser {
    return { type: SET_MODIFICATION_STATE, value: value };
}

export function changeSelectedUser(user: IUser): IChangeSelectedUserActionType {
    return { type: CHANGE_USER_PENDING_EDIT, user: user };
}

export function clearSelectedUser(): IClearSelectedUserActionType {
    return { type: CLEAR_USER_PENDING_EDIT };
}



interface IEditUserActionType { type: string, user: IUser };
interface IAddUserActionType { type: string, user: IUser };
interface IRemoveUserActionType { type: string, user: IUser };
interface ISetModificationStateActionUser { type: string, value:  UserModificationStatus};
interface IChangeSelectedUserActionType { type: string, user: IUser };
interface IClearSelectedUserActionType { type: string };

