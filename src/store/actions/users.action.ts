import { IUser, UserModificationStatus } from "../models/user.interface";

export const EDIT_USER: string = "EDIT_USER";
export const ADD_USER: string = "ADD_USER";
export const REMOVE_USER: string = "REMOVE_USER";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const CHANGE_USER_PENDING_EDIT: string = "CHANGE_USER_PENDING_EDIT";
export const CLEAR_USER_PENDING_EDIT: string = "CLEAR_USER_PENDING_EDIT";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_USER_ALL: string = "REMOVE_USER_ALL";
export const INITIAL_USER: string = "INITIAL_USER";
export const FIND_USER_BY_ID: string = "FIND_USER_BY_ID";
export const FIND_USER_BY_USERNAME: string = "FIND_USER_BY_USERNAME";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(user: IUser) {
    return {
        type: FETCH_DATA_SUCCESS,
        user
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialUser(user: IUser): IInitialUserActionType {
    return { type: INITIAL_USER, user: user };
}

export function removeUserAll(): IRemoveUserAllActionType {
    return { type: REMOVE_USER_ALL };
}

export function addUser(user: IUser): IAddUserActionType {
    return { type: ADD_USER, user: user };
}

export function removeUser(id: number): IRemoveUserActionType {
    return { type: REMOVE_USER, id: id };
}

export function findUserById(user: IUser): IFindUserByIdActionType {

    return { type: FIND_USER_BY_ID, user: user}
}

export function findUserByUsername(user: IUser): IFindUserByUsernameActionType {
    return { type: FIND_USER_BY_ID, user: user}
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
interface IRemoveUserActionType { type: string, id: number };
interface IFindUserByIdActionType { type: string, user: IUser };
interface IFindUserByUsernameActionType { type: string, user: IUser };
interface ISetModificationStateActionUser { type: string, value: UserModificationStatus };
interface IChangeSelectedUserActionType { type: string, user: IUser };
interface IClearSelectedUserActionType { type: string };
interface IRemoveUserAllActionType { type: string }
interface IInitialUserActionType {type: string, user: IUser}

